// Bouwt index.html: tien stijlvarianten voor het blok "Gerelateerde diensten" (9 NL-dienstpagina's).
// Elke variant toont het echte blok twee keer, met de echte html uit de pagina's:
//   A = gebouwbeheer-onderhoud (Diepblauwe band, net als 6 andere pagina's), 5 diensten + Offerte aanvragen
//   B = zakelijke-verhuizing (witte band), 5 diensten
// De varianten veranderen alleen CSS (varianten.css); de foto per dienst komt uit de href.
// Draaien: node _bouw.cjs (in deze map).
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..');

// Echte sectie met .db-knoppen uit een pagina halen, plus de plek (S1, S2, ...) tussen de secties in main
function blokUit(pagina) {
  const html = fs.readFileSync(path.join(ROOT, pagina), 'utf8');
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const stukken = main.split('<section').slice(1).map(s => '<section' + s.slice(0, s.indexOf('</section>') + 10));
  const secties = stukken.filter(s => /^<section class="sectie[ "]/.test(s));
  const i = secties.findIndex(s => s.includes('db-knoppen'));
  const sectie = secties[i]
    .replace(/href="(?!#|https?:|tel:|mailto:)([^"]+)"/g, 'href="../../$1"')
    .replace(/src="assets\//g, 'src="../../assets/');
  return { sectie, plek: i + 1 };
}
const DEMO = [
  { pagina: 'gebouwbeheer-onderhoud.html', toon: 'donker', uitleg: 'Zoals op gebouwbeheer-onderhoud: Diepblauwe band. Zo staat het blok op 7 van de 9 pagina\'s (alle gebouwbeheer- en assetmanagementpagina\'s).' },
  { pagina: 'zakelijke-verhuizing.html', toon: 'licht', uitleg: 'Zoals op zakelijke-verhuizing: witte band (zakelijke-opslag staat op Mist en heeft 4 diensten).' }
].map(d => ({ ...d, ...blokUit(d.pagina) }));

// Foto per dienst = de hero van die pagina; uitsnede (imgly) alleen van het onderwerp vooraan.
// hk = afstand kruin → schouders als fractie van de fotohoogte (met de hand geschat)
const maten = JSON.parse(fs.readFileSync(path.join(__dirname, 'uit.json'), 'utf8'));
const FOTO = {
  'gebouwbeheer-verduurzamen.html': ['gebouwbeheer-verduurzamen', 0.2],
  'gebouwbeheer-huismeester.html': ['gebouwbeheer-huismeester', 0.1],
  'diensten-assetmanagement.html': ['assetmanagement', 0.13],
  'diensten-opslag.html': ['opslag', 0.1],
  'diensten-verhuizen.html': ['verhuizen', 0.09],
  'internationale-verhuizing.html': ['internationale-verhuizing', 0.12],
  'zakelijke-opslag.html': ['zakelijke-opslag', 0.2],
  'meubeltransport.html': ['meubeltransport', 0.1],
  'diensten-gebouwbeheer.html': ['gebouwbeheer', 0.08]
};
// Varianten met mensen uit het kader: [id, verhouding kader, gewenste uitstap (deel van kaderhoogte), max. zoom]
const POP = [['v03', 3 / 2, 0.3, 3], ['v05', 5 / 4, 0.3, 3], ['v07', 3 / 4, 0.26, 4.5], ['v10', 16 / 9, 0.24, 1.9]];
const r4 = n => +n.toFixed(4);
let css = `/* Gegenereerd door _bouw.cjs: foto, uitsnede en plaatsing per dienst (niet met de hand bewerken) */\n`;
for (const [href, [naam]] of Object.entries(FOTO)) {
  const m = maten[naam];
  css += `.gv .db-knoppen > a[href$="/${href}"] { --foto: url(../../assets/img/page-hero/${naam}-960.webp); --uit: url(uit/${naam}.webp); --ar: ${m.ar}; --hy: ${m.hy}; --fx: ${m.fx}; }\n`;
}
for (const [id, arF, t, zmax] of POP) {
  for (const [href, [naam, hk]] of Object.entries(FOTO)) {
    const { ar, hy } = maten[naam];
    let yc = hy + hk;
    let z = Math.max(1, t * ar / (arF * hk), ar / (arF * (1 - yc)));
    if (z > zmax) { z = Math.max(zmax, 1, ar / arF); yc = Math.min(yc, 1 - ar / (arF * z)); }
    css += `#${id} .db-knoppen > a[href$="/${href}"] { --z: ${r4(z)}; --yc: ${r4(yc)}; }\n`;
  }
}
fs.writeFileSync(path.join(__dirname, 'fotos.css'), css);

const VARIANTEN = [
  ['Fotolijst', 'Eén witte kaart met regels: foto van de dienst, naam, pijlrondje. Offerte als groene regel onderaan.'],
  ['Fototegels', 'Tegels met de foto van elke dienst, naam op een Nachtblauwe schaduw onderin. Offerte = groene tegel.'],
  ['Mensen uit de kaart', 'Witte fotokaarten; de medewerker in de foto steekt boven de kaart uit. Niets beweegt.'],
  ['Doorzichtig verloop', 'Zoals Werkwijze en de FAQ: doorzichtige panelen op de blauwe band, ronde foto, witte tekst.'],
  ['Fotoafdruk', 'Elke dienst als afdruk met witte rand en dikte, licht gekanteld; de mensen stappen over de rand.'],
  ['Index met nummers', 'Redactionele lijst: groot nummer, naam, kleine foto rechts. Rustig en goed leesbaar.'],
  ['Staande panelen', 'Staande foto\'s met een naamplaat; de mensen steken boven het paneel uit.'],
  ['Kaart met kopband', 'De kolom wordt één kaart met een Nachtblauwe kopband; de diensten zijn platen met dikte.'],
  ['Pillen met foto', 'De huidige knoppen, maar met een fotorondje, gewone hoofdletters en een pijlrondje. Kleinste stap.'],
  ['Uitgelicht + lijst', 'De eerste dienst groot met een uitstappende medewerker, de rest als compacte lijst ernaast.']
];
const demo = (d, nr) => {
  const leeg = '<section class="sectie" hidden></section>\n'.repeat(d.plek - 1);
  return `  <p class="gv-demo__uitleg">${d.uitleg}</p>
  <div class="subpagina gv-demo gv-demo--${d.toon}"><main>
${leeg}${d.sectie}
  </main></div>`;
};
const blok = ([naam, uitleg], i) => {
  const nr = String(i + 1).padStart(2, '0');
  return `
<section class="gv gv--${nr}" id="v${nr}" aria-label="Variant ${nr}: ${naam}">
  <div class="gv__bar"><span class="gv__nr">${nr}</span><h2 class="gv__naam">${naam}</h2><p class="gv__uitleg">${uitleg}</p></div>
${DEMO.map(d => demo(d, nr)).join('\n')}
</section>`;
};
const sprite = fs.readFileSync(path.join(ROOT, 'gebouwbeheer-onderhoud.html'), 'utf8').match(/<svg[^>]*>\s*<symbol[\s\S]*?<\/svg>/)[0];
const html = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gerelateerde diensten: 10 varianten</title>
<meta name="robots" content="noindex">
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="fotos.css">
<link rel="stylesheet" href="varianten.css">
</head>
<body>
${sprite}
<nav class="gv-nav" aria-label="Varianten">
  <span class="gv-nav__titel">Gerelateerde diensten</span>
  <a href="#v00"><b>00</b> Zoals nu</a>
  ${VARIANTEN.map(([naam], i) => { const nr = String(i + 1).padStart(2, '0'); return `<a href="#v${nr}"><b>${nr}</b> ${naam}</a>`; }).join('\n  ')}
</nav>
<header class="gv-intro wrap">
  <h1>Gerelateerde diensten: tien varianten</h1>
  <p>Dit blok staat op 9 dienstpagina's. Elke variant toont het twee keer, met de echte html en teksten: op de Diepblauwe band (7 pagina's) en op een witte band. De foto bij elke dienst is de hero van die dienstpagina; in 03, 05, 07 en 10 stapt de medewerker uit het kader. Alleen de stijl verschilt, de links blijven gelijk. Niets beweegt: hover verandert alleen kleur.</p>
</header>

<section class="gv gv--00" id="v00" aria-label="Zoals nu">
  <div class="gv__bar"><span class="gv__nr">00</span><h2 class="gv__naam">Zoals nu</h2><p class="gv__uitleg">Ter vergelijking: pilknoppen in hoofdletters.</p></div>
${DEMO.map(d => demo(d, '00')).join('\n')}
</section>
${VARIANTEN.map(blok).join('\n')}
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html + fotos.css geschreven', DEMO.map(d => d.pagina + ' S' + d.plek).join(', '));
