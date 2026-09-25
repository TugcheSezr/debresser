// Bouwt index.html: tien varianten voor "De Bresser een eeuw in ontwikkeling" (100-jarig-jubileum.html).
// Teksten zijn letterlijk die van de pagina; alleen opbouw en stijl verschillen. Draaien: node _bouw.cjs
const fs = require('fs');
const path = require('path');

const IMG = '../../assets/img/';
const JAREN = [
  { j: '1923', f: 'geschiedenis/1923-paard-en-wagen-oisterwijk.webp', w: 960, h: 600, pos: '50% 62%',
    t: 'Cis de Bresser richt De Bresser op en start als vervoersbedrijf in de John. Lenartzstraat in Oisterwijk.' },
  { j: '1951', f: 'tijdlijn/1951-vervoer-tweede-generatie.webp', w: 900, h: 675, pos: '24% 58%',
    t: 'De tweede generatie, zoon Jan de Bresser, zet het bedrijf voort als vervoers- en verhuisbedrijf.' },
  { j: '1983', f: 'geschiedenis/1983-verhuiswagen-jaren-tachtig.webp', w: 960, h: 600, pos: '50% 58%',
    t: 'Jan en Nico de Bresser nemen het bedrijf van hun vader Jan over en zo is de derde generatie actief geworden.' },
  { j: '1995', f: 'tijdlijn/1995-containerloods-tilburg.webp', w: 900, h: 579, pos: '52% 50%',
    t: 'De Bresser neemt verhuisbedrijf Horsten en Van Disseldorp in Tilburg over en opent haar tweede vestiging en containerloods op de Vossenberg in Tilburg.' },
  { j: '2009', f: 'tijdlijn/2009-zorgvervoer-tentbed.webp', w: 900, h: 600, pos: '48% 55%',
    t: 'In dit jaar wordt het eerste tentbed vervoerd door De Bresser, dit wordt later een groot onderdeel van de dienstverlening.' },
  { j: '2011', f: 'geschiedenis/2011-team-de-bresser.webp', w: 960, h: 600, pos: '52% 55%',
    t: 'Tomas Brands neemt De Bresser over van de derde en laatste generatie Jan de Bresser, deze gaat met welverdiend pensioen.' },
  { j: '2015', f: 'tijdlijn/2015-oisterwijk-wasserij.webp', w: 900, h: 600, pos: '45% 50%',
    t: 'De Bresser opent een wasserij voor medische hulpmiddelen in Oisterwijk.' },
  { j: '2017', f: 'tijdlijn/2017-stoof-breda.webp', w: 900, h: 569, pos: '50% 55%',
    t: 'De Bresser neemt Stoof Verhuizingen in Breda over en opent daar een derde vestiging.' },
  { j: '2020', f: 'tijdlijn/2020-ontzorgd-verhuizen.webp', w: 900, h: 675, pos: '66% 62%',
    t: 'De Bresser start het nieuwe label Ontzorgd Verhuizen. Dit is een specifieke dienstverlening voor alles rondom verhuizingen voor senioren.' },
  { j: '2022', f: 'tijdlijn/2022-logistieke-hubs.webp', w: 900, h: 404, pos: '72% 55%',
    t: 'In Zwolle en Alphen aan de Rijn worden twee hubs geopend voor de logistieke tak van het bedrijf.' },
  { j: '2023', f: 'tijdlijn/2023-hub-brussel.webp', w: 640, h: 427, pos: '50% 60%',
    t: 'Een derde logistieke hub is dit jaar geopend in Brussel.' },
];

// Uitstappen: welk deel van de foto het kader laat zien (fx, fy = linkerbovenhoek als fractie van de foto,
// s = fotobreedte / kaderbreedte). Wat boven het kader uitsteekt komt uit uit/<jaar>.webp.
const UIT = JSON.parse(fs.readFileSync(path.join(__dirname, 'uit.json'), 'utf8'));

const KOP = 'De Bresser een eeuw in ontwikkeling';
const LABEL = '<p class="label">Sinds 1923</p>';
const esc = (s) => s.replace(/&/g, '&amp;');

const foto = (d, extra = '') =>
  `<img src="${IMG}${d.f}" width="${d.w}" height="${d.h}" alt="" loading="lazy" decoding="async" style="object-position:${d.pos}"${extra}>`;

// Kader met uitstapper (alleen decoratief)
const uitFoto = (d, cls) => {
  const u = UIT[d.j];
  if (!u) return `<span class="${cls} uit uit--geen" aria-hidden="true"><span class="uit__raam">${foto(d)}</span></span>`;
  const st = `--s:${u.s};--fx:${u.fx};--fy:${u.fy};--p:${(d.w / d.h).toFixed(4)}`;
  return `<span class="${cls} uit" style="${st}" aria-hidden="true">` +
    `<span class="uit__raam"><img src="${IMG}${d.f}" width="${d.w}" height="${d.h}" alt="" loading="lazy" decoding="async"></span>` +
    `<span class="uit__boven"><img src="uit/${d.j}.webp" width="${d.w}" height="${d.h}" alt="" loading="lazy" decoding="async"></span></span>`;
};

const tekst = (d) => `<p>${esc(d.t)}</p>`;
const laatste = (i) => i === JAREN.length - 1;

const V = [];

// 01 Jaarkaarten
V.push({
  naam: 'Jaarkaarten',
  uitleg: 'De tijdlijn van de over-ons-pagina van de-kievit.nl: twee kolommen witte kaarten met een jaarpil. Elk jaar krijgt zijn eigen foto als dikke afdruk; 2023 sluit breed af.',
  html: `<section class="sectie ring ev1"><div class="wrap">
  <div class="sectiekop">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
  <ol class="ev1__kaarten">
${JAREN.map((d, i) => `    <li class="ev1__kaart${laatste(i) ? ' ev1__kaart--breed' : ''}"><span class="ev1__foto" aria-hidden="true">${foto(d)}</span><div><h3>${d.j}</h3>${tekst(d)}</div></li>`).join('\n')}
  </ol>
</div></section>`,
});

// 02 Lijn met afdrukken
V.push({
  naam: 'Lijn met afdrukken',
  uitleg: 'De historie-lijn van de homepage van de-kievit.nl (jaartal, stip, tekst) met per jaar een fotoafdruk ernaast. Tot en met 1983 zwart-wit, daarna komt de kleur erbij.',
  html: `<section class="sectie ev2"><div class="wrap">
  <div class="sectiekop sectiekop--midden">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
  <ol class="ev2__lijn">
${JAREN.map((d, i) => `    <li${+d.j <= 1983 ? ' class="is-oud"' : ''}><span class="ev2__jaar">${d.j}</span><div><h3>${d.j}</h3>${tekst(d)}</div><figure class="ev2__afdruk" aria-hidden="true">${foto(d)}<figcaption>${d.j}</figcaption></figure></li>`).join('\n')}
  </ol>
</div></section>`,
});

// 03 Zigzag
V.push({
  naam: 'Zigzag langs de middenlijn',
  uitleg: 'Een Diepblauwe lijn door het midden, de kaarten om en om links en rechts. Het jaartal staat als pil op de lijn, de foto ligt als plaat op de kaart.',
  html: `<section class="sectie ev3"><div class="wrap">
  <div class="sectiekop sectiekop--midden">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
  <ol class="ev3__zz">
${JAREN.map((d, i) => `    <li style="grid-row:${i + 1} / span 2"><span class="ev3__pil" aria-hidden="true">${d.j}</span><div class="ev3__kaart"><span class="ev3__foto" aria-hidden="true">${foto(d)}</span><h3>${d.j}</h3>${tekst(d)}</div></li>`).join('\n')}
  </ol>
</div></section>`,
});

// 04 Filmstrip
V.push({
  naam: 'Nachtblauwe filmstrip',
  uitleg: 'Een Nachtblauwe band met de eeuw als strook die je opzij schuift (swipe, scrollen of de pijlknoppen). Lijn met stippen bovenaan, groene jaartallen.',
  html: `<section class="sectie ring ev4"><div class="wrap">
  <div class="ev4__kop"><div class="sectiekop">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
    <div class="ev4__knoppen"><button type="button" class="ev4__knop" data-strip="-1" aria-label="Vorige jaren"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><button type="button" class="ev4__knop" data-strip="1" aria-label="Volgende jaren"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div></div>
  <ol class="ev4__strip" tabindex="0" aria-label="Tijdlijn 1923 tot 2023">
${JAREN.map((d) => `    <li><span class="ev4__stip" aria-hidden="true"></span><h3>${d.j}</h3><span class="ev4__foto" aria-hidden="true">${foto(d)}</span>${tekst(d)}</li>`).join('\n')}
  </ol>
</div></section>`,
});

// 05 Dienstkaarten
V.push({
  naam: 'Fotokaarten met Diepblauw vlak',
  uitleg: 'De dienstkaart van de-kievit.nl: foto boven, Diepblauw vlak eronder, het jaartal als groene plaat op de naad. 2023 ligt breed als slotkaart.',
  html: `<section class="sectie ev5"><div class="wrap">
  <div class="sectiekop">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
  <ol class="ev5__grid">
${JAREN.map((d, i) => `    <li class="ev5__kaart${laatste(i) ? ' ev5__kaart--breed' : ''}"><span class="ev5__foto" aria-hidden="true">${foto(d)}</span><div class="ev5__vlak"><h3>${d.j}</h3>${tekst(d)}</div></li>`).join('\n')}
  </ol>
</div></section>`,
});

// 06 Jaarkiezer
V.push({
  naam: 'Jaarkiezer met uitstapper',
  uitleg: 'Jaartallen als pilknoppen, daaronder één groot Diepblauw paneel. De foto steekt links uit het paneel en mensen, paard en wagens stappen boven de fotorand uit. Alleen klikken wisselt; er loopt niets vanzelf.',
  html: `<section class="sectie ev6"><div class="wrap">
  <div class="sectiekop sectiekop--midden">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
  <div class="ev6__pillen" role="tablist" aria-label="Kies een jaar">
${JAREN.map((d, i) => `    <button type="button" role="tab" id="ev6-tab-${d.j}" aria-controls="ev6-paneel-${d.j}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${d.j}</button>`).join('\n')}
  </div>
  <ol class="ev6__panelen">
${JAREN.map((d, i) => `    <li class="ev6__paneel" id="ev6-paneel-${d.j}" role="tabpanel" aria-labelledby="ev6-tab-${d.j}"${i ? ' hidden' : ''}>${uitFoto(d, 'ev6__foto')}<div class="ev6__tekst"><span class="ev6__teller" aria-hidden="true">${String(i + 1).padStart(2, '0')} / ${JAREN.length}</span><h3>${d.j}</h3>${tekst(d)}<div class="ev6__nav"><button type="button" class="btn ev6__vorige" data-stap="-1"${i === 0 ? ' disabled' : ''}>Vorige</button><button type="button" class="btn btn--goud btn--groen ev6__volgende" data-stap="1"${laatste(i) ? ' disabled' : ''}>Volgende</button></div></div></li>`).join('\n')}
  </ol>
</div></section>`,
});

// 07 Jaarboek
V.push({
  naam: 'Jaarboek',
  uitleg: 'Redactioneel: elk jaar een eigen regel met een groot jaartal (eeuw licht, jaar donker), de tekst in het midden en de foto als dikke afdruk rechts. Veel lucht, geen kaarten.',
  html: `<section class="sectie ev7"><div class="wrap">
  <div class="sectiekop">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
  <ol class="ev7__boek">
${JAREN.map((d) => `    <li><h3 aria-label="${d.j}"><span aria-hidden="true">${d.j.slice(0, 2)}</span><b aria-hidden="true">${d.j.slice(2)}</b></h3>${tekst(d)}<span class="ev7__foto" aria-hidden="true">${foto(d)}</span></li>`).join('\n')}
  </ol>
</div></section>`,
});

// 08 Schuine naad
V.push({
  naam: 'Schuine naad, uit de foto',
  uitleg: 'Kop op wit, daarna een Diepblauwe band met een schuine bovenrand. Op elke kaart stappen de mensen, het paard, de wagens of het pand boven de fotorand uit.',
  html: `<section class="sectie ev8"><div class="wrap">
  <div class="sectiekop">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
</div>
<div class="ev8__band"><div class="wrap">
  <ol class="ev8__grid">
${JAREN.map((d, i) => `    <li class="ev8__kaart${laatste(i) ? ' ev8__kaart--breed' : ''}">${uitFoto(d, 'ev8__foto')}<div class="ev8__tekst"><h3>${d.j}</h3>${tekst(d)}</div></li>`).join('\n')}
  </ol>
</div></div></section>`,
});

// 09 Toen en nu
const [eerste, ...rest] = JAREN;
const nu = rest.pop();
V.push({
  naam: 'Toen en nu',
  uitleg: 'Bovenaan 1923 en 2023 als één afdruk met een schuine witte naad en jaarplaatjes; de negen jaren ertussen als compacte fotokaarten in drie kolommen.',
  html: `<section class="sectie ev9"><div class="wrap">
  <div class="sectiekop">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
  <div class="ev9__toen-nu">
    <div class="ev9__afdruk" aria-hidden="true"><span class="ev9__helft ev9__helft--toen">${foto(eerste)}<b>${eerste.j}</b></span><span class="ev9__helft ev9__helft--nu">${foto(nu)}<b>${nu.j}</b></span></div>
    <div class="ev9__twee"><div><h3>${eerste.j}</h3>${tekst(eerste)}</div><div><h3>${nu.j}</h3>${tekst(nu)}</div></div>
  </div>
  <ol class="ev9__tussen">
${rest.map((d) => `    <li><span class="ev9__foto" aria-hidden="true">${foto(d)}</span><div><h3>${d.j}</h3>${tekst(d)}</div></li>`).join('\n')}
  </ol>
</div></section>`,
});

// 10 Route
V.push({
  naam: 'De route van 1923 naar 2023',
  uitleg: 'De eeuw als weg: asfalt met wegmarkering door het midden, elk jaartal op een blauw routebord, de kaarten om en om langs de berm.',
  html: `<section class="sectie ev10"><div class="wrap">
  <div class="sectiekop sectiekop--midden">${LABEL}<h3 class="kop kop--sub">${KOP}</h3></div>
  <ol class="ev10__route">
${JAREN.map((d, i) => `    <li style="grid-row:${i + 1} / span 2"><span class="ev10__bord" aria-hidden="true">${d.j}</span><div class="ev10__kaart"><span class="ev10__foto" aria-hidden="true">${foto(d)}</span><div><h3>${d.j}</h3>${tekst(d)}</div></div></li>`).join('\n')}
  </ol>
</div></section>`,
});

const nr = (i) => String(i + 1).padStart(2, '0');
const html = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Een eeuw in ontwikkeling: 10 varianten</title>
<meta name="robots" content="noindex">
<link rel="icon" href="../../assets/img/db/favicon-32.png" sizes="32x32" type="image/png">
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="varianten.css">
</head>
<body>
<nav class="ev-nav" aria-label="Varianten">
  <span class="ev-nav__titel">Een eeuw in ontwikkeling</span>
${V.map((v, i) => `  <a href="#v${nr(i)}"><b>${nr(i)}</b> ${v.naam}</a>`).join('\n')}
</nav>
<header class="ev-intro wrap">
  <h1>De Bresser een eeuw in ontwikkeling: tien varianten</h1>
  <p>Het blok van <a href="../../100-jarig-jubileum.html">100-jarig-jubileum.html</a>, tien keer anders opgebouwd met de patronen van de-kievit.nl (tijdlijnkaarten, historie-lijn, fotoafdrukken, dienstkaarten, pilknoppen) in de De Bresser-kleuren. De elf teksten zijn letterlijk die van de pagina. Elk jaar heeft een eigen foto uit assets/img/geschiedenis en assets/img/tijdlijn. Er beweegt niets vanzelf.</p>
</header>
${V.map((v, i) => `
<section class="ev ev--${nr(i)}" id="v${nr(i)}" aria-label="Variant ${nr(i)}: ${v.naam}">
  <div class="ev__bar"><span class="ev__nr">${nr(i)}</span><h2 class="ev__naam">${v.naam}</h2><p class="ev__uitleg">${v.uitleg}</p></div>
${v.html}
</section>`).join('\n')}
<script src="varianten.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html', html.length, 'tekens,', V.length, 'varianten');
