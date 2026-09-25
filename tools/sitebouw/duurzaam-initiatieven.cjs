'use strict';
// duurzaam-verhuizen.html, "Duurzaam verhuizen 2025 / Samen werken aan een betere wereld" (sessie tugce-14, 25 september 2026).
// De live pagina heeft de kop en de zeven initiatieven als drie losse secties (kop, 4 kaarten, 3 kaarten) met
// getekende icoontjes. Hier wordt dat één sectie in de opzet van de dienstkaarten: sectiekop in het midden en
// zeven kaarten met een echte foto, genummerd 01-07. Teksten komen uit de gegenereerde pagina en blijven gelijk.
// CSS: css/duurzaam-initiatieven.css (prefix dzi); foto's: assets/img/duurzaam-initiatieven/<naam>-{400,760,1120}.webp.
// Wordt vanuit NABEWERKING in bouw.cjs aangeroepen; los draaien: node duurzaam-initiatieven.cjs ../../duurzaam-verhuizen.html
const fs = require('fs');

// Per initiatief (herkend aan de kop): foto, maat van de 760-versie, grootste versie, uitsnede en beschrijving.
const FOTO = [
  [/^Afvalverwerking/, 'afvalverwerking', 567, 1120, '50% 60%', 'Verhuizer van De Bresser vouwt karton op bij de bus, naast de containers voor karton en folie'],
  [/^Elektrisch wagenpark/, 'elektrisch-wagenpark', 567, 1120, '40% 55%', 'Elektrische verhuiswagen van De Bresser aan de laadpaal, twee verhuizers met herbruikbare kratten'],
  [/^Verpakkings/, 'verpakkingsmaterialen', 507, 760, '50% 50%', 'Stapels platte verhuisdozen van gerecycled karton'],
  [/^Training/, 'training', 567, 1120, '50% 62%', 'Medewerkers van De Bresser in overleg aan een grote tafel'],
  [/^Duurzame partners/, 'duurzame-partners', 507, 760, '50% 62%', 'Hub van De Bresser met opslagcontainers en een heftruck'],
  [/^CO2-compensatie/, 'co2-compensatie', 342, 1120, '42% 55%', 'Verhuiswagen van De Bresser op een weg tussen bossen en groene heuvels'],
  [/^Een tweede kans/, 'tweede-kans', 554, 760, '50% 45%', 'Oude fauteuils en stoelen in de verhuiswagen, klaar voor een tweede leven'],
];

module.exports = function (h) {
  if (h.includes('class="sectie dzi"')) return h;
  const fout = (wat) => { throw new Error('duurzaam-verhuizen.html nabewerking: ' + wat); };
  const blok = h.match(/<section class="sectie sectie--creme2">\s*<div class="wrap">\s*<p class="label">(Duurzaam verhuizen 2025)<\/p>\s*<h3 class="kop kop--sub">([\s\S]*?)<\/h3>\s*<div class="db-tekst"><p>([\s\S]*?)<\/p><\/div>\s*<\/div>\s*<\/section>(\s*<section class="sectie[^"]*">\s*<div class="wrap">\s*<div class="diensten[^"]*">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>){2}/);
  if (!blok) fout('kop "Duurzaam verhuizen 2025" met de twee kaartensecties erna niet gevonden');
  const kaarten = [...blok[0].matchAll(/<div class="dienst" data-reveal><div class="dienst__nis"><img [^>]*><span class="dienst__nr" aria-hidden="true">\d+<\/span><\/div><div class="dienst__tekst"><h3>([\s\S]*?)<\/h3>([\s\S]*?)<\/div><\/div>/g)];
  if (kaarten.length !== FOTO.length) fout('verwacht ' + FOTO.length + ' initiatieven, gevonden ' + kaarten.length);
  const html = kaarten.map(([, kop, tekst], i) => {
    const f = FOTO.find(([re]) => re.test(kop.trim()));
    if (!f) fout('geen foto voor initiatief "' + kop + '"');
    const [, naam, hoogte, max, pos, alt] = f;
    const breed = i === kaarten.length - 1;
    const pad = 'assets/img/duurzaam-initiatieven/' + naam;
    const srcset = [400, 760, 1120].filter((w) => w <= max).map((w) => `${pad}-${w}.webp ${w}w`).join(', ');
    const sizes = breed ? '(min-width:1101px) 560px, (min-width:561px) 92vw, calc(100vw - 40px)' : '(min-width:1101px) 280px, (min-width:561px) 46vw, calc(100vw - 40px)';
    const nr = String(i + 1).padStart(2, '0');
    return `      <div class="dienst${breed ? ' dzi__breed' : ''}" data-reveal><div class="dienst__nis"><img src="${pad}-760.webp" srcset="${srcset}" sizes="${sizes}" width="760" height="${hoogte}" alt="${alt}" style="object-position:${pos}" loading="lazy" decoding="async"><span class="dienst__nr" aria-hidden="true">${nr}</span></div><div class="dienst__tekst"><h3>${kop}</h3>${tekst}</div></div>`;
  }).join('\n');
  h = h.split(blok[0]).join(`<section class="sectie dzi" id="initiatieven" aria-labelledby="initiatieven-kop">
  <div class="wrap">
    <div class="sectiekop sectiekop--midden" data-reveal>
      <p class="label">${blok[1]}</p>
      <h2 class="kop" id="initiatieven-kop">${blok[2]}</h2>
      <p class="intro">${blok[3]}</p>
    </div>
    <div class="diensten dzi__kaarten">
${html}
    </div>
  </div>
</section>`);
  if (!h.includes('css/duurzaam-initiatieven.css')) h = h.replace('</head>', '<link rel="stylesheet" href="css/duurzaam-initiatieven.css">\n</head>');
  return h;
};

if (require.main === module) {
  const bestand = process.argv[2];
  if (!bestand) { console.error('gebruik: node duurzaam-initiatieven.cjs <pad naar duurzaam-verhuizen.html>'); process.exit(1); }
  fs.writeFileSync(bestand, module.exports(fs.readFileSync(bestand, 'utf8')));
  console.log('duurzaam-initiatieven: bijgewerkt', bestand);
}
