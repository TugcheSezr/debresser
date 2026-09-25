'use strict';
// Dienstoverzichten (verhuizen, opslag, meubelprojecten, gebouwbeheer, assetmanagement) in de opzet
// van het sjabloon: aanbod als fotokaarten met nummer, werkwijze als genummerde stappen, formulier
// als leadblock, "Complete service" als Nachtblauw blok met vinkjes, "Waarom" als zeker-kaart.
// Alle teksten, links en foto's komen uit de gegenereerde pagina; hier verandert alleen de opmaak.
// Stijl: css/diensten-overzicht.css (prefix dov-). Aangeroepen vanuit NABEWERKING in bouw.cjs.
// Sessie tugce-b0, 25 september 2026.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
// Foto op een aanbodkaart = de pagina-hero van de pagina waar de kaart heen gaat.
const HERO_SLUG = { 'diensten-verhuizen': 'verhuizen', 'diensten-opslag': 'opslag' };
const VINK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

function fout(bestand, wat) {
  throw new Error(bestand + ' diensten-overzicht: ' + wat);
}

// Knoppen uit een knoprij: [{ html, href, label, groen }]
function knoppen(html) {
  return [...html.matchAll(/<a class="btn([^"]*)" href="([^"]*)">([\s\S]*?)<\/a>/g)].map((m) => ({
    html: m[0],
    href: m[2],
    label: m[3].replace(/<svg[\s\S]*?<\/svg>/g, '').trim(),
    groen: /btn--groen/.test(m[1]),
  }));
}

// Contact- en offerteknoppen blijven knoppen; de rest wordt een fotokaart.
function isActie(k) {
  return k.groen || /^(offerte|contact)\.html$/.test(k.href);
}

function groen(k) {
  return k.groen ? k.html : k.html.replace('class="btn btn--goud"', 'class="btn btn--goud btn--groen"');
}

function kaart(bestand, k, i) {
  const slug = k.href.replace(/\.html$/, '');
  const foto = HERO_SLUG[slug] || slug;
  if (!fs.existsSync(path.join(ROOT, 'assets/img/page-hero', foto + '-960.webp'))) fout(bestand, 'geen pagina-hero voor ' + k.href);
  const vertraging = i % 3 ? ` style="transition-delay:.${String(i % 3 * 6).padStart(2, '0')}s"` : '';
  return `<a class="dienst" href="${k.href}" data-reveal${vertraging}><div class="dienst__nis"><img src="assets/img/page-hero/${foto}-960.webp" width="960" height="720" alt="" loading="lazy" decoding="async"><span class="dienst__nr" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span></div><div class="dienst__tekst"><h3>${k.label}</h3></div></a>`;
}

// Eerste sectie na de hero: tekst links + aanbodknoppen rechts (db-twee) wordt kop, intro en kaarten.
function aanbod(bestand, h) {
  const m = h.match(/<section class="sectie">\s*<div class="wrap">\s*<div class="db-twee">\s*<div class="db-twee__kol"><h2 class="kop">([\s\S]*?)<\/h2>\s*<div class="db-tekst">([\s\S]*?)<\/div>(?:\s*<div class="knoprij">([\s\S]*?)<\/div>)?<\/div>\s*<div class="db-twee__kol"><h3 class="kop kop--sub">([\s\S]*?)<\/h3>\s*<div class="knoprij db-knoppen">([\s\S]*?)<\/div><\/div>\s*<\/div>\s*<\/div>\s*<\/section>/);
  if (!m) fout(bestand, 'aanbodsectie (db-twee met db-knoppen) niet gevonden');
  const [geheel, kop, tekst, tekstKnoppen, aanbodKop, aanbodKnoppen] = m;
  const alle = knoppen(aanbodKnoppen);
  const kaarten = alle.filter((k) => !isActie(k));
  const acties = alle.filter(isActie);
  if (kaarten.length < 2) fout(bestand, 'te weinig aanbodkaarten (' + kaarten.length + ')');
  const onderTekst = tekstKnoppen ? `\n      <div class="knoprij dov-knoprij">${tekstKnoppen}</div>` : '';
  const html = `<section class="sectie ring dov-aanbod" id="aanbod" aria-labelledby="aanbod-kop">
  <div class="wrap">
    <div class="sectiekop sectiekop--midden" data-reveal>
      <h2 class="kop" id="aanbod-kop">${kop}</h2>
      <div class="intro dov-intro">${tekst}</div>${onderTekst}
    </div>
    <h3 class="label dov-label" data-reveal>${aanbodKop}</h3>
    <div class="diensten dov-kaarten dov-kaarten--${kaarten.length}">
      ${kaarten.map((k, i) => kaart(bestand, k, i)).join('\n      ')}
    </div>${acties.length ? `\n    <div class="wa-rij dov-acties" data-reveal>${acties.map(groen).join('')}</div>` : ''}
  </div>
  <img src="assets/img/deco/pijl-weg.svg" alt="" width="20" height="13" loading="lazy" decoding="async" class="dov-deco dov-deco--pijl">
</section>`;
  return h.replace(geheel, html);
}

// Formulierkaart (db-formkaart) als leadblock: beeld links, formulier op het blauwe paneel rechts.
function leadblock(bestand, formkaart, media) {
  const kop = (formkaart.match(/<h3 class="db-formkaart__kop">([\s\S]*?)<\/h3>/) || [])[1];
  const intro = (formkaart.match(/<div class="db-formkaart__intro">[\s\S]*?<\/div>/) || [''])[0];
  const form = (formkaart.match(/<form class="lf db-form"[\s\S]*?<\/form>/) || [])[0];
  if (!kop || !form) fout(bestand, 'formulierkaart zonder kop of formulier');
  return `<section class="leadblock dov-lead" id="contact" aria-labelledby="contact-kop">
  <div class="wrap">
    <div class="leadblock__card" data-reveal>
      ${media}
      <div class="leadblock__panel">
        <h2 id="contact-kop">${kop}</h2>${intro ? '\n        ' + intro : ''}
        ${form}
      </div>
    </div>
  </div>
</section>`;
}

function formkaartUit(bestand, html) {
  const start = html.indexOf('<div class="db-formkaart" data-reveal>');
  if (start < 0) fout(bestand, 'db-formkaart niet gevonden');
  const eind = html.indexOf('</form>', start);
  const sluit = html.indexOf('</div>', eind);
  if (eind < 0 || sluit < 0) fout(bestand, 'einde van db-formkaart niet gevonden');
  return html.slice(start, sluit + 6);
}

// Genummerde stappen: "<h3>1. Titel</h3>" krijgt een groot nummer; "1. " blijft voor schermlezers.
function stap(nr, titel, inhoud, i) {
  const vertraging = i % 5 ? ` style="transition-delay:.${String(i % 5 * 6).padStart(2, '0')}s"` : '';
  return `<li class="stap" data-reveal${vertraging}><span class="stap__nr" aria-hidden="true">${String(nr).padStart(2, '0')}</span><h3><span class="dov-sr">${nr}. </span>${titel}</h3>${inhoud}</li>`;
}

function stapKaarten(bestand, html) {
  const lijst = [...html.matchAll(/<article class="db-kaart db-kaart--stap" data-reveal><h3>(\d+)\. ([\s\S]*?)<\/h3>([\s\S]*?)<\/article>/g)];
  if (lijst.length < 3) fout(bestand, 'te weinig stappen (' + lijst.length + ')');
  return lijst.map(([, nr, titel, inhoud], i) => stap(nr, titel, inhoud.trim(), i));
}

function sectiekop(bestand, html) {
  const m = html.match(/<div class="sectiekop" data-reveal><p class="label">([\s\S]*?)<\/p>\s*<h2 class="kop">([\s\S]*?)<\/h2><\/div>/);
  if (!m) fout(bestand, 'sectiekop van de werkwijze niet gevonden');
  return { label: m[1], kop: m[2] };
}

// Tweede sectie (sectie--creme2) tot aan de reviews of de CTA-band.
function tweede(bestand, h) {
  const start = h.indexOf('<section class="sectie sectie--creme2">');
  if (start < 0) fout(bestand, 'tweede sectie (sectie--creme2) niet gevonden');
  const eind = h.indexOf('</section>', start) + 10;
  return { start, eind, html: h.slice(start, eind) };
}

const PAGINA = {
  'diensten-verhuizen.html'(h) {
    const b = 'diensten-verhuizen.html';
    const s = tweede(b, h);
    const { label, kop } = sectiekop(b, s.html);
    const stappen = stapKaarten(b, s.html);
    const werkwijze = `<section class="sectie sectie--creme2 dov-werkwijze" id="werkwijze" aria-labelledby="werkwijze-kop">
  <div class="wrap">
    <div class="werkwijze__top">
      <div class="sectiekop" data-reveal>
        <p class="label">${label}</p>
        <h2 class="kop" id="werkwijze-kop">${kop}</h2>
      </div>
      <figure class="werkwijze__wagen dov-wagen" data-reveal aria-hidden="true"><img src="assets/img/zorg-pop/wagens-vrij.webp" width="1200" height="800" alt="" loading="lazy" decoding="async"></figure>
    </div>
    <ol class="stappen dov-stappen dov-stappen--${stappen.length}">
      ${stappen.join('\n      ')}
    </ol>
  </div>
</section>`;
    const media = '<div class="leadblock__media dov-lead__team" aria-hidden="true"><span class="dov-lead__boog"></span><img src="assets/img/team/verhuisteam-vrijstaand.webp" width="730" height="500" alt="" loading="lazy" decoding="async"></div>';
    const lead = leadblock(b, formkaartUit(b, s.html), media);
    return h.slice(0, s.start) + werkwijze + '\n\n' + lead + h.slice(s.eind);
  },

  'diensten-opslag.html'(h) {
    const b = 'diensten-opslag.html';
    const s = tweede(b, h);
    const foto = (s.html.match(/<figure class="blok__foto" data-reveal>(<img [^>]*>)<\/figure>/) || [])[1];
    if (!foto) fout(b, 'foto naast het formulier niet gevonden');
    const media = `<div class="leadblock__media dov-lead__foto">${foto}</div>`;
    return h.slice(0, s.start) + leadblock(b, formkaartUit(b, s.html), media) + h.slice(s.eind);
  },

  'diensten-meubelprojecten.html'(h) {
    const b = 'diensten-meubelprojecten.html';
    const s = tweede(b, h);
    const m = s.html.match(/<div class="blok__tekst" data-reveal>\s*<h3 class="kop kop--sub">([\s\S]*?)<\/h3>\s*<div class="db-tekst">([\s\S]*?)<\/div>\s*<ul class="db-vinklijst">([\s\S]*?)<\/ul>\s*<div class="knoprij">([\s\S]*?)<\/div>\s*<\/div>\s*<figure class="blok__foto" data-reveal>(<img [^>]*>)<\/figure>/);
    if (!m) fout(b, 'blok "Complete service" niet gevonden');
    const [, kop, tekst, lijst, knop, foto] = m;
    const vinken = [...lijst.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((x) => `<li><span class="ico">${VINK}</span><p class="dov-vink">${x[1]}</p></li>`);
    const html = `<section class="sectie dov-service" aria-labelledby="service-kop">
  <div class="wrap">
    <div class="blok blok--stapel blok--navy">
      <div class="blok__boven">
        <div class="blok__tekst" data-reveal>
          <h2 class="kop" id="service-kop">${kop}</h2>
          <div class="intro dov-intro">${tekst}</div>
        </div>
        <figure class="blok__foto dov-service__foto" data-reveal>${foto}</figure>
      </div>
      <ul class="usps usps--rij dov-vinken" data-reveal>
        ${vinken.join('\n        ')}
      </ul>
      <div class="knoprij blok__cta blok__cta--midden" data-reveal>${knop.replace('class="btn btn--goud"', 'class="btn btn--goud btn--groen"')}</div>
    </div>
  </div>
</section>`;
    return h.slice(0, s.start) + html + h.slice(s.eind);
  },

  'diensten-gebouwbeheer.html'(h) {
    const b = 'diensten-gebouwbeheer.html';
    const s = tweede(b, h);
    const vraag = (s.html.match(/<h3 class="kop kop--sub">([\s\S]*?)<\/h3>/) || [])[1];
    const delen = [...s.html.matchAll(/<h2 class="kop">([\s\S]*?)<\/h2>\s*<div class="db-tekst">([\s\S]*?)<\/div>/g)];
    if (!vraag || delen.length < 2) fout(b, 'sectie "Waarom" niet gevonden');
    const [eerste, ...rest] = delen;
    const html = `<section class="zeker dov-waarom" aria-labelledby="waarom-kop">
  <div class="wrap">
    <div class="zeker__card" data-reveal>
      <div class="zeker__head">
        <div class="zeker__intro">
          <h3 class="eyebrow">${vraag}</h3>
          <h2 id="waarom-kop">${eerste[1]}</h2>
          <div class="dov-waarom__tekst">${eerste[2]}</div>
        </div>
        <img class="zeker__merk dov-waarom__logo" src="assets/img/db/logo-compact-wit.webp" width="400" height="308" alt="" aria-hidden="true" loading="lazy" decoding="async">
      </div>
      <ul class="zeker__list dov-waarom__lijst">
        ${rest.map(([, k, t]) => `<li><span class="zeker__ok">${VINK}</span><div><h3>${k}</h3>${t}</div></li>`).join('\n        ')}
      </ul>
    </div>
  </div>
</section>`;
    return h.slice(0, s.start) + html + h.slice(s.eind);
  },

  'diensten-assetmanagement.html'(h) {
    const b = 'diensten-assetmanagement.html';
    const s = tweede(b, h);
    const { label, kop } = sectiekop(b, s.html);
    const stappen = stapKaarten(b, s.html);
    const html = `<section class="sectie sectie--creme2 dov-werkwijze dov-werkwijze--asset" id="werkwijze" aria-labelledby="werkwijze-kop">
  <div class="wrap">
    <div class="sectiekop" data-reveal>
      <p class="label">${label}</p>
      <h2 class="kop" id="werkwijze-kop">${kop}</h2>
    </div>
    <ol class="stappen dov-stappen dov-stappen--${stappen.length}">
      ${stappen.join('\n      ')}
    </ol>
  </div>
  <img src="assets/img/deco/huis-pijl.svg" alt="" width="133" height="68" loading="lazy" decoding="async" class="dov-deco dov-deco--huis">
</section>`;
    return h.slice(0, s.start) + html + h.slice(s.eind);
  },
};

module.exports = function dienstenOverzicht(bestand, h) {
  if (!PAGINA[bestand]) fout(bestand, 'onbekende pagina');
  if (h.includes('css/diensten-overzicht.css')) return h; // al omgezet
  if (!h.includes('</head>')) fout(bestand, '</head> niet gevonden');
  h = h.replace('</head>', '<link rel="stylesheet" href="css/diensten-overzicht.css">\n</head>');
  h = aanbod(bestand, h);
  return PAGINA[bestand](h);
};
