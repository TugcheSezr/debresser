// Bas-koppeling: zet een offerteaanvraag van de website om naar het formaat van Bas (CRM van De Bresser,
// De Kievit en Brocken). Bron: help.bas.app artikel 16650207, rechtstreeks koppelen zonder Zapier.
// Bas kent geen sleutel: de API-URL plus websiteCode IS het geheim. Die staan alleen in de Vercel-omgeving
// (BAS_URL, BAS_CODE, Sensitive, alleen Production) en komen nooit in de browser, de repo of de logs.
// Ontwerp en eisen: 53-ONTWERP v9 en 64-EISEN v2 in het dossier bas-koppeling-20261028.
import { checkBotId } from './_botid-server.mjs';
import site from './_bas-site.mjs';

// Host van de Bas-API, gemeten in de API-URL die Bas toont (één URL voor alle koppelingen; de code verschilt per koppeling).
const BAS_HOST = 'api.bas.app';
const MAX_BODY = 16000; // bytes JSON
const BOTID_MS = 5000;
const BAS_MS = 8000;
const MAX_NOTITIE = 3000;
const MAX_WAARDE = 500; // per notitiewaarde, behalve de vrije opmerking

const TUSSENVOEGSELS = new Set(['van', 'de', 'der', 'den', 'het', "'t", 'ter', 'ten', 'te', 'in', 'op', 'onder', 'aan',
  'bij', 'uit', 'voor', 'la', 'le', 'du', 'da', 'di', 'del', 'dos', 'des', 'von', 'zu', 'vd', 'v.d.', "'s"]);

// Formuliervelden die als tekst in de notitie gaan; al het andere (sleutels, onderwerp, honeypot, onbekende velden) niet.
// Bas zet de notitie onder "Voor de klant" en de klant ziet die, dus alleen wat de klant zelf invulde; interne velden
// (Pagina, Bron, Pro-dienst, Pro-stad, Pro-pagina, Bronpagina, Landerpad) staan alleen in de Web3Forms-mail.
// De vrije opmerking staat achteraan, zodat een lange tekst bij het afkappen alleen zichzelf inkort.
const NOTITIEVELDEN = ['Dienst', 'Soort offerte', 'Type woning of pand', 'Offerte bespreken', 'Offerte ontvangen via',
  'Hoe heeft u ons gevonden', 'Inschatting via dozencalculator', 'Inschatting via m3-calculator',
  'Prijsindicatie via verhuisprijscalculator', 'Datum nog onbekend', 'Bestemming onbekend of buitenland',
  'Bestemming nog onbekend', 'Opmerkingen', 'Opmerking'];
// Alleen deze velden mogen meer regels hebben; elders wordt een regelovergang een spatie.
const MEERREGELIG = new Set(['Opmerkingen', 'Opmerking']);

// Keuzes uit "Type woning of pand" (De Kievit) naar de buildingType-waarden die Bas accepteert.
const WONINGTYPE = { 'Appartement': 'apartment', 'Eengezinswoning': 'house', 'Studio / kamer': 'studio',
  'Tussenwoning': 'terraced-house', 'Vrijstaande woning': 'detached-house', 'Kantoor / bedrijf': 'office' };

// Adres zoals de adreszoekers het in het veld zetten: "Oppe Brik 30, 5953PB Reuver" (PDOK) of "Wetstraat 16, 1000 Brussel".
// Toevoeging: letters ("12 A", "1a"), na - of / ("1-5", "16/3") of een Belgisch busnummer ("16 bus 3").
const ADRES = /^(.+?)\s+(\d{1,5})(?:\s*([a-z]{1,4})|\s*([-\/])\s*([a-z0-9]{1,4})|\s+bus\s*([a-z0-9]{1,4}))?\s*,\s*(\d{4})(\s?)([a-z]{2})?\s+(.+)$/i;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Alleen tekst telt. Een regelovergang (ook NEL en de Unicode-regelscheiders) wordt een spatie, in een opmerking een
// nieuwe regel; tabs worden een spatie; andere controle- en opmaaktekens (Cc, Cf, zoals richtingstekens), losse surrogaten
// (Cs, een halve emoji) en < > gaan eruit.
function schoon(s, meerregelig = false) {
  if (typeof s !== 'string') return '';
  return s.replace(/\r\n?|[\n\v\f\x85\p{Zl}\p{Zp}]/gu, meerregelig ? '\n' : ' ').replace(/\t/g, ' ')
    .replace(/(?!\n)[\p{Cc}\p{Cf}\p{Cs}<>]/gu, '').trim();
}

// Afkappen op hele tekens: valt de grens midden in een emoji, dan gaat de losse helft eraf.
function kap(s, n) {
  return s.slice(0, n).replace(/\p{Cs}$/u, '');
}

export function splitsNaam(naam) {
  const delen = schoon(naam).split(/\s+/).filter(Boolean);
  if (!delen.length) return null;
  const lastName = delen.pop();
  let i = delen.length;
  while (i > 0 && TUSSENVOEGSELS.has(delen[i - 1].toLowerCase())) i--;
  return { firstName: delen.slice(0, i).join(' '), middleName: delen.slice(i).join(' '), lastName };
}

export function parseAdres(tekst, land) {
  const ruw = schoon(tekst);
  // De adreszoeker van de BE-site zet ", Nederland" achter een Nederlands adres.
  const nederland = /,\s*nederland$/i.test(ruw);
  const s = ruw.replace(/,\s*nederland$/i, '');
  // Geen echt adres is zo lang; de grens houdt ook de reguliere expressie snel bij vijandige invoer.
  if (s.length > 200) return null;
  const m = ADRES.exec(s);
  if (!m) return null;
  const [, straat, nummer, letterToevoeging, teken, naTeken, bus, cijfers, spatie, letters, plaats] = m;
  // Nog een deel na de plaats ("Wien, Oostenrijk", "Brussel, België") noemt een ander land of iets onbekends.
  if (plaats.includes(',')) return null;
  // Op de BE-site komt "Meir 1-11" van Photon: een reeks huisnummers van één gebouw, geen toevoeging.
  if (land === 'BE' && teken === '-') return null;
  if (letters) {
    // Twee letters na de cijfers kunnen ook het begin van de plaats zijn: "3800 St Truiden", "8660De Panne", "7587de Lutte".
    // Een hoofdletter met een kleine letter is dat altijd; De, La, Le, St en It ook na een spatie, of in kleine letters
    // zonder spatie. In hoofdletters zonder spatie blijven ze postcodeletters, want zo schrijft PDOK ze ("1012LE").
    const gemengd = letters !== letters.toUpperCase() && letters !== letters.toLowerCase();
    const lijstwoord = /^(de|la|le|st|it)$/i.test(letters);
    if (gemengd || (lijstwoord && (spatie || letters === letters.toLowerCase()))) return null;
    // Op de BE-site telt een Nederlandse postcode alleen als het adres Nederland noemt, zoals de adreszoeker van die site het schrijft.
    if (land === 'BE' && !nederland) return null;
  } else if (nederland) return null; // Een adres in Nederland zonder postcodeletters is onvolledig.
  // Een getal of huisnummer in de straat ("Plein 1944 12", "Kerkstraat 12 A 1", "Wetstraat 16A bus 3") maakt onzeker wat
  // het huisnummer is. Een wegnummer ("Rijksweg A2") mag wel, een rangtelwoord ("1e Helmersstraat") alleen als eerste
  // woord van een straat met meer woorden: verderop is "12E" een huisnummer met huisletter ("Kerkstraat 12E bus 3").
  const woorden = straat.split(/\s+/);
  const rangtelwoord = (w, i) => i === 0 && woorden.length > 1 && /^\d+(e|de|ste)$/i.test(w);
  if (woorden.some((w, i) => /^\d/.test(w) && !rangtelwoord(w, i))) return null;
  const toevoeging = letterToevoeging || naTeken || (bus ? `bus ${bus}` : '');
  // Een postcode zonder letters is Belgisch en telt alleen op de Belgische site.
  const country = letters ? 'NL' : land === 'BE' ? 'BE' : null;
  if (!country) return null;
  return { streetName: straat.trim(), houseNumber: nummer, houseNumberAddition: toevoeging,
    zipCode: cijfers + (letters ? letters.toUpperCase() : ''), city: plaats.trim(), country };
}

export function normaliseerTelefoon(tel, land) {
  let s = schoon(tel).replace(/\(0\)/g, '').replace(/[\s.\-()\/]/g, '');
  if (s.startsWith('00')) s = '+' + s.slice(2);
  // Nationaal nummer: een Nederlands nummer heeft altijd 10 cijfers, een Belgisch 9, of 10 als het mobiel is (04).
  // Op de Belgische site is een nummer van 10 cijfers zonder 04 dus Nederlands.
  if (s.startsWith('0')) s = (land === 'BE' && (s.length === 9 || s.startsWith('04')) ? '+32' : '+31') + s.slice(1);
  if (!/^\+[1-9]\d{7,14}$/.test(s)) return null;
  if (s.startsWith('+31') && s.length !== 12) return null;
  if (s.startsWith('+32') && (s.length < 11 || s.length > 12)) return null;
  return s;
}

export function geldigeDatum(s, vandaag) {
  s = schoon(s);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(s + 'T00:00:00Z');
  if (isNaN(d) || d.toISOString().slice(0, 10) !== s) return null;
  const van = new Date(vandaag + 'T00:00:00Z');
  const tot = new Date(van);
  tot.setUTCFullYear(tot.getUTCFullYear() + 2);
  return d >= van && d <= tot ? s : null;
}

function adresBlok(adres, extra) {
  const { houseNumberAddition, ...rest } = adres;
  return { ...extra, ...rest, ...(houseNumberAddition ? { houseNumberAddition } : {}) };
}

// site: { websiteCode, land: 'NL' | 'BE', bron: 'www.de-kievit.nl' }. Geeft null als Bas de aanvraag zou weigeren (geen naam).
export function bouwBasPayload(velden, site, vandaag) {
  const v = k => schoon(velden[k], MEERREGELIG.has(k));
  const naamTekst = kap(v('Naam'), 100);
  const naam = splitsNaam(naamTekst);
  if (!naam) return null;
  const notitie = [`Aanvraag via ${site.bron}`, `Naam: ${naamTekst}`];
  // Vervolgregels van een opmerking springen in, zodat geen regel kan beginnen als een veld ("Aanvraag via ...").
  const losseTekst = (k, waarde = v(k)) => {
    if (!waarde) return;
    if (!MEERREGELIG.has(k)) waarde = kap(waarde, MAX_WAARDE);
    notitie.push(`${k}: ${waarde.replace(/\n/g, '\n  ')}`);
  };

  const bedrijf = kap(v('Bedrijfsnaam'), 100);
  const customer = { relationType: bedrijf ? 'business' : 'private' };
  if (bedrijf) customer.companyName = bedrijf;
  if (naam.firstName) customer.firstName = naam.firstName;
  if (naam.middleName) customer.middleName = naam.middleName;
  customer.lastName = naam.lastName;
  const email = v('E-mail');
  if (email.length <= 254 && EMAIL.test(email)) customer.emailAddress = email;
  else losseTekst('E-mail', kap(email, 254));
  const telRuw = v('Telefoon');
  const telefoon = telRuw.length <= 32 ? normaliseerTelefoon(telRuw, site.land) : null;
  if (telefoon) customer.phoneNumber = telefoon;
  // Bij een nationaal nummer is het land aangenomen; dan staat de ruwe waarde er ook bij.
  if (!telefoon || /^0[1-9]/.test(telRuw.replace(/\D/g, ''))) losseTekst('Telefoon', kap(telRuw, 32));
  customer.region = site.land;

  const payload = { websiteCode: site.websiteCode, customer };
  const datum = geldigeDatum(v('Gewenste datum'), vandaag);
  // Met de voorlopige afspraak uit toont Bas de datum nergens (gemeten 28-10); daarom staat hij ook in de notitie.
  if (datum) {
    payload.preferredMovingDate = datum;
    losseTekst('Gewenste datum', datum.split('-').reverse().join('-'));
  } else losseTekst('Gewenste datum');

  // De ingevulde adrestekst gaat altijd in de notitie, zodat kantoor een verkeerde splitsing kan zien.
  const adressen = [];
  const van = parseAdres(v('Verhuizen van'), site.land);
  const type = v('Type woning of pand');
  const woning = Object.hasOwn(WONINGTYPE, type) && WONINGTYPE[type];
  if (van) adressen.push(adresBlok(van, { addressType: 'from', primary: true, ...(woning ? { buildingType: woning } : {}) }));
  losseTekst('Verhuizen van');
  const naar = parseAdres(v('Verhuizen naar'), site.land);
  if (naar) adressen.push(adresBlok(naar, { addressType: 'to' }));
  losseTekst('Verhuizen naar');
  if (adressen.length) payload.addresses = adressen;

  NOTITIEVELDEN.forEach(k => losseTekst(k));
  payload.customerNotes = kap(notitie.join('\n'), MAX_NOTITIE);
  return payload;
}

const TE_LAAT = Symbol('te laat');

function binnen(ms, belofte) {
  let wekker;
  const tijd = new Promise((_, nee) => { wekker = setTimeout(() => nee(TE_LAAT), ms); });
  return Promise.race([belofte, tijd]).finally(() => clearTimeout(wekker));
}

function vandaagNL(nu) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date(nu));
}

// site: { bron, land, origins } uit _bas-site.mjs. Volgorde en logcodes: 53-ONTWERP v9 §3.
// Na de protocolcontroles krijgt de bezoeker altijd 204, ook als er niets naar Bas gaat, zodat een bot niet leert
// welke controle hem tegenhield. De Web3Forms-mail loopt los hiervan in de browser.
export function maakHandler({ fetch, nu, env, site, log, checkBotId, basHost = BAS_HOST, botidMs = BOTID_MS }) {
  return async function handler(request) {
    const begin = nu();
    const vercelId = request.headers.get('x-vercel-id') || '';
    const id = /^[A-Za-z0-9:_-]{1,100}$/.test(vercelId) ? vercelId : 'onbekend';
    const klaar = (code, status = 204) => {
      log(`bas-aanvraag ${code} ${nu() - begin}ms id=${id}`);
      return new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
    };

    if (request.method !== 'POST') return klaar('methode', 405);
    if (!/^application\/json\s*(;|$)/i.test(request.headers.get('content-type') || '')) return klaar('type', 415);
    let tekst;
    try { tekst = await request.text(); } catch { return klaar('lezen', 400); }
    if (Buffer.byteLength(tekst) > MAX_BODY) return klaar('te_groot', 413);
    let body = null;
    try { body = JSON.parse(tekst); } catch {}
    if (!body || typeof body !== 'object' || Array.isArray(body)) return klaar('geen_object', 400);

    // Op een preview mag ook de eigen deployment-URL: daar staat geen Bas-env, dus dat eindigt altijd bij noodstop.
    const origins = env.VERCEL_ENV === 'preview' && env.VERCEL_URL ? [...site.origins, `https://${env.VERCEL_URL}`] : site.origins;
    if (!origins.includes(request.headers.get('origin'))) return klaar('origin');
    if (body.botcheck) return klaar('honeypot');
    if (!splitsNaam(body.Naam)) return klaar('geen_naam');
    // Zonder deze header van de BotID-client is het oordeel altijd "bot"; overslaan scheelt een betaalde controle.
    if (!request.headers.get('x-is-human')) return klaar('botid_geen_header');

    // isDevelopment false: anders geeft het pakket stil "mens" terug als NODE_ENV niet 'production' is.
    let oordeel;
    try {
      oordeel = await binnen(botidMs, checkBotId({ developmentOptions: { isDevelopment: false },
        advancedOptions: { checkLevel: 'deepAnalysis' } }));
    } catch (e) {
      return klaar(e === TE_LAAT ? 'botid_timeout' : 'botid_fout');
    }
    // Een foutantwoord van is-bot met JSON (401, 500) geeft isBot undefined: dat is een storing, geen botoordeel.
    if (!oordeel || typeof oordeel.isBot !== 'boolean') return klaar('botid_fout');
    if (!(oordeel.isBot === false && oordeel.isHuman === true && oordeel.bypassed !== true)) return klaar('botid_bot');

    // Witruimte, zoals een regelovergang uit stdin, hoort niet bij de waarde.
    const basUrl = (env.BAS_URL || '').trim();
    const basCode = (env.BAS_CODE || '').trim();
    if (!basUrl || !basCode) return klaar('noodstop');
    let host = null;
    try {
      const url = new URL(basUrl);
      if (url.protocol === 'https:') host = url.host;
    } catch {}
    if (!basHost || host !== basHost) return klaar('bas_host');

    const payload = bouwBasPayload(body, { websiteCode: basCode, land: site.land, bron: site.bron }, vandaagNL(nu()));
    let r;
    try {
      r = await fetch(basUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), redirect: 'error', signal: AbortSignal.timeout(BAS_MS) });
    } catch (e) {
      return klaar(e && (e.name === 'TimeoutError' || e.name === 'AbortError') ? 'bas_timeout' : 'bas_fout');
    }
    // De inhoud van het antwoord wordt niet gelezen; afbreken geeft de verbinding meteen vrij.
    try { await r.body?.cancel(); } catch {}
    return klaar(r.status === 202 ? 'bas_202' : `bas_afgekeurd status=${r.status}`);
  };
}

let standaard;
export default {
  fetch(request) {
    standaard ||= maakHandler({ fetch: globalThis.fetch, nu: Date.now, env: process.env, site, log: console.log, checkBotId });
    return standaard(request);
  },
};
