/* Contact, Locaties (25 september 2026): wereldbol links, vestigingen rechts als nette kaarten.
   De generator zet onder de kaart nog een tweede lijst met dezelfde vestigingen (van debresser.nl);
   die valt weg, de kaarten rechts blijven. Elke vestiging krijgt het nummer van zijn pin op de bol
   (NR in js/main.js), het adres en de telefoon als pil. Teksten en telefoonlinks blijven zoals ze zijn.
   Draait in NABEWERKING na de vlaggen en data-loc (bouw.cjs) en na contact-kop.cjs.
   CSS: css/contact-locaties.css; de bol zelf: js/main.js blok "Contact, Locaties: wereldbol".
   Los draaien op een bestaande pagina: node contact-locaties.cjs ../../contact.html */
const fs = require('fs');

function contactLocaties(h) {
  const fout = (wat) => { throw new Error('contact.html contact-locaties: niet gevonden: ' + wat); };
  const pak = (bron, re, wat) => { const m = bron.match(re); if (!m) fout(wat); return m; };

  const sec = pak(h, /<section class="sectie sectie--creme2">\s*<div class="wrap">\s*<div class="sectiekop" data-reveal><h2 class="kop">Locaties<\/h2><\/div>[\s\S]*?<\/section>/, 'sectie Locaties')[0];
  const bol = pak(sec, /<figure class="blok__foto db-bol" data-db-bol data-reveal>[\s\S]*?<\/figure>/, 'wereldbol (figure data-db-bol)')[0];
  const landNl = pak(sec, /<h3 class="kop kop--sub db-land">(<span class="db-vlag db-vlag--nl"[^>]*><\/span>[^<]+)<\/h3>/, 'kop Nederland')[1];
  const landBe = pak(sec, /<h3 class="kop kop--sub db-land">(<span class="db-vlag db-vlag--be"[^>]*><\/span>[^<]+)<\/h3>/, 'kop België')[1];

  // adres = alles voor de eerste telefoonlink; "T" en het nummer staan op debresser.nl soms in twee links
  const vestiging = (id, naam, p) => {
    const links = [...p.matchAll(/<a href="(tel:[^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    if (!links.length) fout('telefoon bij ' + naam);
    const adres = p.slice(0, p.indexOf('<a ')).replace(/(<br>\s*)+$/, '');
    return { id, naam, adres, tel: links[0][1], nummer: links.map((l) => l[2]).join('') };
  };
  const nl = [...sec.matchAll(/<article class="db-kaart" data-loc="([a-z]+)" data-reveal><h3 class="db-h3">([^<]+)<\/h3>\s*<div class="db-tekst"><p>([\s\S]*?)<\/p><\/div><\/article>/g)]
    .map((m) => vestiging(m[1], m[2], m[3]));
  if (nl.length !== 5) fout('vijf vestigingen in Nederland (gevonden: ' + nl.length + ')');
  const be = pak(sec, /<h3 class="db-h3" data-loc="([a-z]+)">([^<]+)<\/h3>\s*<div class="db-tekst"><p>([\s\S]*?)<\/p><\/div>/, 'vestiging België');
  const brussel = vestiging(be[1], be[2], be[3]);

  let nr = 0;
  const kaart = (v) => `
            <li class="vst-kaart" data-loc="${v.id}">
              <div class="vst-kaart__kop">
                <span class="vst-kaart__nr" aria-hidden="true">${String(++nr).padStart(2, '0')}</span>
                <h3 class="vst-kaart__naam">${v.naam}</h3>
                <svg class="vst-kaart__pin" aria-hidden="true"><use href="#i-pin"/></svg>
              </div>
              <address>${v.adres}</address>
              <a class="vst-kaart__tel" href="${v.tel}"><svg aria-hidden="true"><use href="#i-phone"/></svg><span>${v.nummer}</span></a>
            </li>`;
  const groep = (land, lijst) => `
        <div class="vst-groep">
          <h3 class="kop kop--sub db-land vst-groep__kop" data-reveal>${land}</h3>
          <ul class="vst-kaarten" data-reveal-groep>${lijst.map(kaart).join('')}
          </ul>
        </div>`;

  const blok = `<section class="sectie sectie--creme2 vst" id="locaties" aria-labelledby="vst-titel">
  <div class="wrap">
    <div class="sectiekop" data-reveal><h2 class="kop" id="vst-titel">Locaties</h2></div>
    <div class="vst__bord">
      ${bol.replace('class="blok__foto db-bol"', 'class="blok__foto db-bol vst__bol"')}
      <div class="vst__lijst">${groep(landNl, nl)}${groep(landBe, [brussel])}
      </div>
    </div>
  </div>
</section>`;

  h = h.replace(sec, () => blok);
  if (!h.includes('css/contact-locaties.css')) h = h.replace('</head>', '<link rel="stylesheet" href="css/contact-locaties.css">\n</head>');
  return h;
}

module.exports = contactLocaties;

if (require.main === module) {
  const bestand = process.argv[2];
  if (!bestand) throw new Error('gebruik: node contact-locaties.cjs <pad naar contact.html>');
  fs.writeFileSync(bestand, contactLocaties(fs.readFileSync(bestand, 'utf8')));
  console.log('contact-locaties toegepast op', bestand);
}
