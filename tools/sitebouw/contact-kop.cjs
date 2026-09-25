/* Contact, eerste blok (25 september 2026): opzet naar het contactblok van De Reus.
   Links een witte kaart met telefoon en e-mail en daaronder de kaart van Oisterwijk met adres en route,
   rechts het formulier met een kantoorfoto erboven; het hoofd van de medewerker steekt boven de kaart uit
   (medewerker-uit.webp). De kop staat links boven, zodat het hele blok op één scherm past (1536x730).
   Wordt vanuit NABEWERKING in bouw.cjs aangeroepen.
   De teksten, links en het formulier komen uit het blok dat de generator maakt (dus van debresser.nl);
   alleen de opmaak verandert. Openingstijden en WhatsApp staan niet op debresser.nl en zitten er dus niet in.
   CSS: css/contact-kop.css; interactieve kaart: js/main.js blok "Contact, eerste blok".
   Los draaien op een bestaande pagina: node contact-kop.cjs ../../contact.html */
const fs = require('fs');

const ADRES = 'Schijfstraat 13<br>5061 KA Oisterwijk';

function contactKop(h) {
  const fout = (wat) => { throw new Error('contact.html contact-kop: niet gevonden: ' + wat); };
  const pak = (bron, re, wat) => { const m = bron.match(re); if (!m) fout(wat); return m; };

  const sec = pak(h, /<section class="sectie">\s*<div class="wrap">\s*<div class="db-twee db-twee--form">[\s\S]*?<\/section>/, 'eerste sectie (db-twee--form)')[0];
  const kop = pak(sec, /<h2 class="kop">([\s\S]*?)<\/h2>/, 'kop')[1];
  const lead = pak(sec, /<div class="db-tekst">(<p>[\s\S]*?<\/p>)<\/div>/, 'inleiding')[1];
  const mail = pak(sec, /<h2 class="db-h3">(E-mail)<\/h2>\s*<ul class="db-vinklijst"><li><a href="(mailto:[^"]+)">([\s\S]*?)<\/a><\/li><\/ul>/, 'e-mail');
  const tel = pak(sec, /<h2 class="db-h3">(Telefoon)<\/h2>\s*<ul class="db-vinklijst"><li><a href="(tel:[^"]+)">([\s\S]*?)<\/a><\/li><\/ul>/, 'telefoon');
  const formKop = pak(sec, /<h3 class="db-formkaart__kop">([\s\S]*?)<\/h3>/, 'formulierkop')[1];
  const formIntro = pak(sec, /<div class="db-formkaart__intro">([\s\S]*?)<\/div>/, 'formulierintro')[1];
  let form = pak(sec, /<form class="lf db-form"[\s\S]*?<\/form>/, 'formulier')[0];
  if (!h.includes(ADRES)) fout('adres ' + ADRES + ' (staat bij Locaties)');

  // e-mail over de hele breedte (op brede schermen naast naam en telefoon), knop en privacyregel naast elkaar onderaan
  form = form.replace(/<div class="lf__field">(<label for="[^"]+">E-mailadres)/, '<div class="lf__field lf__field--breed ckb-form__mail">$1');
  const html = pak(form, /\s*<div class="lf__html">[\s\S]*?<\/div>/, 'privacyregel')[0];
  const acties = pak(form, /\s*<div class="lf__actions">[\s\S]*?<\/div>/, 'verzendknop')[0];
  form = form.replace(acties, '').replace(html, () => `\n          <div class="ckb-form__voet">${acties.trimEnd()}${html.trimEnd()}</div>`);

  const blok = `<section class="sectie ckb" aria-labelledby="ckb-titel">
  <div class="wrap">
    <div class="ckb__grid">
      <div class="ckb__links">
        <div class="ckb__kop" data-reveal>
          <p class="label">Contact</p>
          <h2 class="kop" id="ckb-titel">${kop}</h2>
          <div class="intro">${lead}</div>
        </div>
        <div class="ckb-info" data-reveal>
          <div class="ckb-info__rij">
            <span class="ckb-info__ico" aria-hidden="true"><svg><use href="#i-phone"/></svg></span>
            <div><h3 class="ckb-info__label">${tel[1]}</h3><a class="ckb-info__groot" href="${tel[2]}">${tel[3]}</a></div>
          </div>
          <div class="ckb-info__rij">
            <span class="ckb-info__ico" aria-hidden="true"><svg><use href="#i-mail"/></svg></span>
            <div><h3 class="ckb-info__label">${mail[1]}</h3><a class="ckb-info__link" href="${mail[2]}">${mail[3]}</a></div>
          </div>
        </div>
        <figure class="ckb-kaart" data-reveal>
          <div class="ckb-kaart__beeld" data-ckb-kaart>
            <img src="assets/img/contact-kop/kaart-oisterwijk.webp" alt="Kaart van Oisterwijk met De Bresser aan de Schijfstraat" width="720" height="640" loading="lazy" decoding="async">
            <span class="ckb-kaart__pin ckb-pin" aria-hidden="true"><b>De Bresser</b></span>
            <a class="ckb-kaart__knop" href="https://www.openstreetmap.org/?mlat=51.58260&amp;mlon=5.19253#map=17/51.58260/5.19253" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.1 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.1-3.6-8.5S9.6 5.8 12 3.5z"/></svg><span>Bekijk interactieve kaart</span></a>
          </div>
          <figcaption class="ckb-kaart__adres">
            <span class="ckb-kaart__ico" aria-hidden="true"><svg><use href="#i-pin"/></svg></span>
            <span>
              <address>${ADRES}</address>
              <a class="ckb-kaart__route" href="https://www.google.com/maps/dir/?api=1&amp;destination=Schijfstraat+13,+5061+KA+Oisterwijk" target="_blank" rel="noopener">Route plannen<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
            </span>
          </figcaption>
        </figure>
        <p class="ckb-kaart__bron">Kaartgegevens: &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap-bijdragers</a></p>
      </div>
      <div class="ckb-form" id="formulier" data-reveal>
        <div class="ckb-form__foto">
          <div class="ckb-form__kader"><img src="assets/img/contact-kop/medewerker.webp" alt="" width="1200" height="522" loading="lazy" decoding="async"></div>
          <img class="ckb-form__uit" src="assets/img/contact-kop/medewerker-uit.webp" alt="" width="1200" height="214" loading="lazy" decoding="async">
        </div>
        <div class="ckb-form__body">
          <h3 class="ckb-form__kop">${formKop}</h3>
          <div class="ckb-form__intro">${formIntro}</div>
          ${form}
        </div>
      </div>
    </div>
  </div>
</section>`;

  h = h.replace(sec, () => blok);
  if (!h.includes('css/contact-kop.css')) h = h.replace('</head>', '<link rel="stylesheet" href="css/contact-kop.css">\n</head>');
  return h;
}

module.exports = contactKop;

if (require.main === module) {
  const bestand = process.argv[2];
  if (!bestand) throw new Error('gebruik: node contact-kop.cjs <pad naar contact.html>');
  fs.writeFileSync(bestand, contactKop(fs.readFileSync(bestand, 'utf8')));
  console.log('contact-kop toegepast op', bestand);
}
