// 100-jarig-jubileum.html, blok "De Bresser een eeuw in ontwikkeling" (sessie tugce-09, 25 september 2026).
// Maakt van de lijst ol.hist5__tl de Diepblauwe band met schuine bovenrand (ontwerp 08 uit _ontwerpen/eeuw-varianten).
// Elk jaar krijgt een fotokaart waar het onderwerp boven de rand uitstapt. Jaartallen en teksten komen uit de
// gegenereerde pagina en blijven dus gelijk aan debresser.nl. CSS: css/eeuw-tijdlijn.css.
// Wordt vanuit NABEWERKING in bouw.cjs aangeroepen; los draaien: node eeuw-tijdlijn.cjs ../../100-jarig-jubileum.html
const fs = require('fs');

// Per jaar: foto, breedte, hoogte, en welk deel ervan het 3:2-kader toont (s = fotobreedte / kaderbreedte,
// fx/fy = linkerbovenhoek als fractie van de foto). Wat daarboven ligt komt uit assets/img/eeuw-uit/<jaar>.webp.
const FOTO = {
  1923: ['geschiedenis/1923-paard-en-wagen-oisterwijk.webp', 960, 600, 2.319, 0.185, 0.54],
  1951: ['tijdlijn/1951-vervoer-tweede-generatie.webp', 900, 675, 1.852, 0, 0.52],
  1983: ['geschiedenis/1983-verhuiswagen-jaren-tachtig.webp', 960, 600, 1.524, 0.19, 0.3],
  1995: ['tijdlijn/1995-containerloods-tilburg.webp', 900, 579, 1.671, 0.4, 0.38],
  2009: ['tijdlijn/2009-zorgvervoer-tentbed.webp', 900, 600, 1.667, 0.4, 0.34],
  2011: ['geschiedenis/2011-team-de-bresser.webp', 960, 600, 2.05, 0.5, 0.48],
  2015: ['tijdlijn/2015-oisterwijk-wasserij.webp', 900, 600, 1.43, 0, 0.3],
  2017: ['tijdlijn/2017-stoof-breda.webp', 900, 569, 2.11, 0.4, 0.5],
  2020: ['tijdlijn/2020-ontzorgd-verhuizen.webp', 900, 675, 1.777, 0.42, 0.5],
  2022: ['tijdlijn/2022-logistieke-hubs.webp', 900, 404, 2.8, 0.56, 0.47],
  2023: ['tijdlijn/2023-hub-brussel.webp', 640, 427, 2.38, 0.38, 0.58],
};

function foto(jaar) {
  const f = FOTO[jaar];
  if (!f) return '';
  const [bron, w, h, s, fx, fy] = f;
  const maat = `width="${w}" height="${h}" alt="" loading="lazy" decoding="async"`;
  return `<span class="eeuw__foto" style="--s:${s};--fx:${fx};--fy:${fy};--p:${(w / h).toFixed(4)}" aria-hidden="true">`
    + `<span class="eeuw__raam"><img src="assets/img/${bron}" ${maat}></span>`
    + `<span class="eeuw__boven"><img src="assets/img/eeuw-uit/${jaar}.webp" ${maat}></span></span>`;
}

module.exports = function eeuwTijdlijn(h) {
  if (h.includes('class="sectie eeuw"')) return h;
  const blok = h.match(/<section class="sectie">\s*<div class="wrap">\s*<h3 class="kop kop--sub">(De Bresser een eeuw in ontwikkeling)<\/h3>\s*<ol class="hist5__tl db-tijdlijn" data-reveal>([\s\S]*?)<\/ol>\s*<\/div>\s*<\/section>/);
  if (!blok) throw new Error('100-jarig-jubileum.html nabewerking: tijdlijn "De Bresser een eeuw in ontwikkeling" niet gevonden');
  const jaren = [...blok[2].matchAll(/<li><span class="hist5__jaar"><\/span><div><h3>([\s\S]*?)<\/h3>([\s\S]*?)<\/div><\/li>/g)]
    .map(([, jaar, tekst]) => ({ jaar: jaar.trim(), tekst: tekst.replace(/<p>\s*(<em>\s*<\/em>)?\s*<\/p>/g, '').trim() }));
  if (jaren.length < 5) throw new Error('100-jarig-jubileum.html nabewerking: te weinig jaren in de tijdlijn (' + jaren.length + ')');
  for (const { jaar } of jaren) if (!FOTO[jaar]) console.warn('eeuw-tijdlijn: geen foto voor ' + jaar + ', kaart zonder foto');
  // bij 3 + 3 + ... + 2 kaarten loopt de laatste over twee kolommen, dan blijft er geen gat over
  const breed = jaren.length % 3 === 2;
  const kaarten = jaren.map(({ jaar, tekst }, i) =>
    `      <li class="eeuw__kaart${breed && i === jaren.length - 1 ? ' eeuw__kaart--breed' : ''}">${foto(jaar)}<div class="eeuw__tekst"><h3>${jaar}</h3>${tekst}</div></li>`).join('\n');
  h = h.split(blok[0]).join(`<section class="sectie eeuw" aria-labelledby="eeuw-kop">
  <div class="wrap">
    <div class="sectiekop"><p class="label">Sinds 1923</p><h3 class="kop kop--sub" id="eeuw-kop">${blok[1]}</h3></div>
  </div>
  <div class="eeuw__band">
    <div class="wrap">
      <ol class="eeuw__grid" data-reveal>
${kaarten}
      </ol>
    </div>
  </div>
</section>`);
  if (!h.includes('css/eeuw-tijdlijn.css')) h = h.replace('</head>', '<link rel="stylesheet" href="css/eeuw-tijdlijn.css">\n</head>');
  return h;
};

if (require.main === module) {
  const bestand = process.argv[2];
  if (!bestand) { console.error('gebruik: node eeuw-tijdlijn.cjs <pad naar 100-jarig-jubileum.html>'); process.exit(1); }
  fs.writeFileSync(bestand, module.exports(fs.readFileSync(bestand, 'utf8')));
  console.log('eeuw-tijdlijn: bijgewerkt', bestand);
}
