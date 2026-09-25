// Bouwt index.html: tien varianten van "Hoe we te werk gaan / Assetmanagement" (diensten-assetmanagement.html #werkwijze).
// Tekst, knoppen en vragen komen letterlijk uit de gegenereerde pagina. Draai: node _bouw.cjs
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const bron = fs.readFileSync(path.join(ROOT, 'diensten-assetmanagement.html'), 'utf8');

const sectie = bron.match(/<section class="sectie sectie--creme2 dov-werkwijze[\s\S]*?<\/section>/)[0];
const sprite = bron.match(/<svg class="svg-sprite"[\s\S]*?<\/svg>/)[0];
const label = sectie.match(/<p class="label">([\s\S]*?)<\/p>/)[1];
const kop = sectie.match(/<h2 class="kop"[^>]*>([\s\S]*?)<\/h2>/)[1];

const schoon = (s) =>
  s
    .replace(/ data-reveal/g, '')
    .replace(/ style="transition-delay:[^"]*"/g, '')
    .replace(/href="(?!#|https?:|tel:|mailto:)([^"]+)"/g, 'href="../../$1"');

const ol = sectie.match(/<ol class="stappen[^"]*">([\s\S]*?)<\/ol>/)[1];
const stappen = ol
  .split(/<li class="stap"[^>]*>/)
  .slice(1)
  .map((deel) => {
    deel = deel.replace(/<\/li>\s*$/, '');
    const nr = deel.match(/<span class="stap__nr"[^>]*>(\d+)<\/span>/)[1];
    const h3 = deel.match(/<h3>([\s\S]*?)<\/h3>/)[1];
    let rest = deel.slice(deel.indexOf('</h3>') + 5);
    let knop = '';
    const k = rest.indexOf('<div class="knoprij">');
    if (k > -1) {
      knop = rest.slice(k).trim();
      rest = rest.slice(0, k);
    }
    return { nr, h3, tekst: schoon(rest.trim()), knop: schoon(knop) };
  });
if (stappen.length !== 3) throw new Error('verwacht 3 stappen, gevonden ' + stappen.length);

// Echte foto's van de eigen subpagina's + bestaande imgly-uitsnedes (zelfde maat als de foto).
// s = zoom (fotobreedte / kaderbreedte), fx/fy = linkerboven van het kader in fracties van de foto, p = fotoverhouding.
const FOTO = [
  { src: 'site/Asset-management-De-Bresser.jpg', uit: 'mens-pop/Asset-management-De-Bresser.webp', p: 1000 / 667, s: 1.4, fx: 0.113, fy: 0.26 },
  { src: 'site/Anne-Kienhuis-Facilitair-medewerker-1024x683.jpg', uit: 'mens-pop/Anne-Kienhuis-Facilitair-medewerker-1024x683.webp', p: 1024 / 683, s: 1.4, fx: 0.05, fy: 0.26 },
  { src: 'site/Montage-service-zakelijk-meubeltransport-2-naast-elkaar-1024x682.jpg', uit: 'mens-pop/Montage-service-zakelijk-meubeltransport-2-naast-elkaar-1024x682.webp', p: 1024 / 682, s: 1.4, fx: 0.286, fy: 0.27 },
];
const IMG = '../../assets/img/';
const foto = (i, over = {}) => {
  const f = { ...FOTO[i], ...over };
  const st = `--p:${f.p.toFixed(4)};--s:${f.s};--fx:${f.fx};--fy:${f.fy}${f.a ? `;--a:${f.a}` : ''}`;
  return `<figure class="awp" style="${st}"><span class="awp__raam"><img src="${IMG}${f.src}" alt="" loading="lazy" decoding="async"></span><span class="awp__boven" aria-hidden="true"><img src="${IMG}${f.uit}" alt="" loading="lazy" decoding="async"></span></figure>`;
};

const nr = (s) => `<span class="stap__nr" aria-hidden="true">${s.nr}</span>`;
const h3 = (s) => `<h3>${s.h3}</h3>`;
const li = (inhoud) => `      <li class="stap">${inhoud}</li>`;
const lijst = (items, extra = '') => `    <ol class="stappen dov-stappen dov-stappen--3${extra}">\n${items.join('\n')}\n    </ol>`;
const sectiekop = (n) => `<div class="sectiekop"><p class="label">${label}</p><h2 class="kop" id="k${n}">${kop}</h2></div>`;
const deco = `<img src="${IMG}deco/huis-pijl.svg" alt="" width="133" height="68" loading="lazy" decoding="async" class="dov-deco dov-deco--huis">`;

const standaard = (s, i) => li(nr(s) + h3(s) + s.tekst + s.knop);

const VARIANTEN = [
  {
    naam: 'Fotokaarten, de mens stapt uit de foto',
    uitleg: 'Drie witte kaarten met dikte op Mist. Elke stap krijgt de echte foto van zijn eigen subpagina; de medewerker steekt boven de foto en de kaart uit. Het stapnummer zit als pil over de foto.',
    klasse: 'aw-los aw1',
    ol: () => lijst(stappen.map((s, i) => li(foto(i) + nr(s) + h3(s) + s.tekst + s.knop))),
  },
  {
    naam: 'Diepblauwe band, doorzichtige panelen',
    uitleg: 'Zoals Werkwijze op diensten-verhuizen en Het proces op veilingen: Diepblauwe band met één lijnruit, drie panelen met een doorzichtig verloop, groene bovenrand en witte tekst. Geen foto.',
    klasse: 'aw-los aw-donker aw2',
    ol: () => lijst(stappen.map(standaard)),
  },
  {
    naam: 'Schuine naad, uit de foto',
    uitleg: 'Bovenaan Nachtblauw met een schuine naad naar Mist. De foto\'s liggen op de naad, de mensen steken in het Nachtblauw uit; een witte kaart schuift over de onderkant van de foto.',
    klasse: 'aw-los aw3',
    ol: () => lijst(stappen.map((s, i) => li(foto(i, { a: 4 / 3, s: 1.5, fy: 0.24, ...(i === 2 ? { fx: 0.333 } : {}) }) + `<div class="aw3__kaart">${nr(s) + h3(s) + s.tekst + s.knop}</div>`))),
  },
  {
    naam: 'Fotoafdruk',
    uitleg: 'De foto\'s als afdruk met witte rand, dikte en een lichte kanteling; de mensen stappen over de rand. Tekst direct op Mist, geen kaart. Zelfde aanpak als Onze diensten op de homepage.',
    klasse: 'aw-los aw4',
    ol: () => lijst(stappen.map((s, i) => li(`<div class="aw4__afdruk">${foto(i)}</div>` + nr(s) + h3(s) + s.tekst + s.knop))),
  },
  {
    naam: 'Route over de weg',
    uitleg: 'Een weg met wegmarkering loopt van stap 01 naar 03 en eindigt in een pijl. De nummers liggen als ronde borden op de weg, de kaarten hangen eronder. Geen foto.',
    klasse: 'aw-los aw5',
    ol: () => lijst(stappen.map(standaard)),
  },
  {
    naam: 'Redactionele rijen',
    uitleg: 'Het huidige lichte paneel, maar de stappen onder elkaar als rijen: nummer en titel links, tekst in het midden, foto rechts met de mens boven de rijlijn.',
    klasse: 'aw6',
    ol: () => lijst(stappen.map((s, i) => li(foto(i) + nr(s) + h3(s) + s.tekst + s.knop))),
  },
  {
    naam: 'Kopkaarten met kringloop',
    uitleg: 'Witte kaarten met een Diepblauwe kopband en dikte; groene pijlen tussen de stappen en een stippellijn van 03 terug naar 01 (circulair). Geen foto.',
    klasse: 'aw-los aw7',
    ol: () =>
      lijst(stappen.map((s) => li(`<div class="aw7__kop">${nr(s) + h3(s)}</div>` + s.tekst + s.knop))) +
      `\n    <div class="aw7__terug" aria-hidden="true"></div>`,
  },
  {
    naam: 'Magazijnfoto als achtergrond',
    uitleg: 'De hele band is een echte magazijnfoto onder Nachtblauw; daarop drie massieve witte kaarten met groene bovenrand.',
    klasse: 'aw-los aw-donker aw8',
    ol: () => lijst(stappen.map(standaard)),
  },
  {
    naam: 'Grote cijfers',
    uitleg: 'Nachtblauwe band, grote omlijnde cijfers in Hemelsblauw achter elke stap, witte tekst en dunne scheidslijnen. Typografisch, geen foto.',
    klasse: 'aw-donker aw9',
    ol: () => lijst(stappen.map(standaard)),
  },
  {
    naam: 'Foto links, stappen rechts',
    uitleg: 'Links de kop en één grote foto (Inventariseren) met de medewerker boven het kader; rechts de drie stappen als liggende kaarten met het nummer in een eigen kolom.',
    klasse: 'aw-los aw10',
    ol: () => lijst(stappen.map((s) => li(nr(s) + `<div class="aw10__tekst">${h3(s) + s.tekst + s.knop}</div>`))),
    wrap: (n, olHtml) =>
      `<div class="aw10__grid"><div class="aw10__links">${sectiekop(n)}${foto(0, { a: 1, s: 1.9, fx: 0.2, fy: 0.2 })}</div>\n${olHtml}</div>`,
  },
];

const blokken = VARIANTEN.map((v, i) => {
  const n = String(i + 1).padStart(2, '0');
  const olHtml = v.ol();
  const binnen = v.wrap ? v.wrap(n, olHtml) : `${sectiekop(n)}\n${olHtml}`;
  return `<section class="aw" id="v${n}" aria-label="Variant ${n}: ${v.naam}">
  <div class="aw__bar"><span class="aw__nr">${n}</span><h2 class="aw__naam">${v.naam}</h2><p class="aw__uitleg">${v.uitleg}</p></div>
<section class="sectie sectie--creme2 dov-werkwijze dov-werkwijze--asset ${v.klasse}" aria-labelledby="k${n}">
  <div class="wrap">
    ${binnen}
  </div>
  ${deco}
</section>
</section>`;
});

const nav = VARIANTEN.map((v, i) => `  <a href="#v${String(i + 1).padStart(2, '0')}"><b>${String(i + 1).padStart(2, '0')}</b> ${v.naam}</a>`).join('\n');

const html = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Assetmanagement werkwijze: 10 varianten</title>
<meta name="robots" content="noindex">
<link rel="icon" href="../../assets/img/db/favicon-32.png" sizes="32x32" type="image/png">
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="../../css/diensten-overzicht.css">
<link rel="stylesheet" href="varianten.css">
</head>
<body class="subpagina">
${sprite}
<nav class="aw-nav" aria-label="Varianten">
  <span class="aw-nav__titel">Hoe we te werk gaan</span>
${nav}
</nav>
<header class="aw-intro wrap">
  <h1>Hoe we te werk gaan / Assetmanagement: tien varianten</h1>
  <p>Het blok van <a href="../../diensten-assetmanagement.html#werkwijze">diensten-assetmanagement.html</a>, tien keer anders opgebouwd in de De Bresser-kleuren. Teksten, knoppen en de drie vragen bij Distribueren zijn letterlijk die van de pagina. Waar een foto staat, is het een echte foto die al op de site staat (Inventariseren = de inventarisatiepagina, Digitaliseren = Anne Kienhuis, Distribueren = de meubelfoto van circulair meubilair). Boven elk blok staat de crème van Ons aanbod, eronder de witte CTA-band; er beweegt niets.</p>
</header>
<main>
${blokken.join('\n\n')}
</main>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html geschreven,', html.length, 'tekens');
