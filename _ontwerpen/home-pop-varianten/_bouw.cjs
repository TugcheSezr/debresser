// Bouwt index.html: tien stijlvarianten van de homepage-blokken "Onze diensten" en "Nieuws & Tips"
// met nieuwe foto's waarin mensen en wagens boven het kader uitsteken (pop.js). Teksten = de echte homepage.
// Draaien: node _bouw.cjs (in deze map).
const fs = require('fs'), path = require('path');
const DIENSTEN = [
  ['verhuizen', 'diensten-verhuizen.html', 'Verhuizen', 'Ontdek onze complete verhuisservice. Laat ons alle zorgen uit handen nemen terwijl we een vakkundige, zorgeloze en duurzame verhuizing garanderen.', 'Twee verhuizers van De Bresser dragen een verhuisdeken naar de verhuiswagen', 768, 512],
  ['opslag', 'diensten-opslag.html', 'Opslag', 'Of het nu gaat om tijdelijke opslag tijdens een verhuizing of voorraadbeheer voor uw bedrijf, wij bieden veilige en flexibele opslagoplossingen.', 'Heftruck van De Bresser bij de opslagcontainers in de loods', 1024, 659],
  ['meubelprojecten', 'diensten-meubelprojecten.html', 'Meubelprojecten', 'Het transporteren van meubels, het monteren ervan op locatie, of het afhandelen van veilingaankopen in het buitenland, De Bresser biedt complete oplossingen voor al uw meubelbehoeften.', 'Medewerker van De Bresser rijdt een kast op een steekwagen door het magazijn', 1000, 667],
  ['gebouwbeheer', 'diensten-gebouwbeheer.html', 'Gebouwbeheer', 'Stelt u zich voor: een kantooromgeving die niet alleen functioneel is, maar ook duurzaam en aangenaam om in te werken. Elke maand voeren we een quality-scan uit om ervoor te zorgen dat alles optimaal blijft functioneren.', 'Huismeesters van De Bresser stellen een bureau af', 900, 600],
  ['assetmanagement', 'diensten-assetmanagement.html', 'Assetmanagement', 'Het beheren van al uw assets in één overzicht: wij begrijpen dat. Met ons WMS en Meubelpaspoort brengen we niet alleen uw assets in kaart, maar minimaliseren we ook de CO2-voetafdruk en dragen we bij aan een efficiëntere circulaire economie.', 'Medewerker van De Bresser werkt aan haar bureau', 1024, 683],
  ['duurzaam', 'duurzame-werkomgeving.html', 'Duurzame werkomgeving', 'Met De Bresser als uw partner voor gebouw- en assetmanagement, heeft u altijd een betrouwbare ondersteuning, 24/7. Met één vast aanspreekpunt bespaart u tijd en geld, waardoor u zich kunt concentreren op de groei van uw bedrijf.', 'Medewerker van De Bresser voor de elektrische bedrijfsbus', 1024, 868, true]
];
const BERICHTEN = [
  ['brocken', 'blog-de-bresser-verwelkomt-brocken-verhuizingen.html', 'De Bresser verwelkomt Brocken Verhuizingen', 'Met veel trots mogen wij bekendmaken dat Brocken Verhuizingen uit Tilburg onderdeel is geworden van onze organisatie.', 556, 677],
  ['kinderen', 'blog-verhuizen-met-kinderen.html', 'Verhuizen met kinderen', 'Verhuizen is een spannende gebeurtenis — voor volwassenen, maar zeker ook voor kinderen. Lees hier hoe je er samen een positieve ervaring van maakt.', 1024, 687],
  ['reden', 'blog-de-populairste-reden-om-te-verhuizen.html', 'De populairste reden om te verhuizen!', 'De populairste redenen om te verhuizen zijn als volgt; Huwelijk of samenwonen, groter wonen, dichterbij werk en scheidingen of een relatiebreuk.', 1024, 725],
  ['qwiek', 'blog-nieuw-qwiek-snooze-reinigingsservice.html', 'Nieuw! Qwiek.snooze reinigingsservice', 'Uit het centraal bureau van statistieken is gebleken dat de meeste verhuizers mannen zijn, logisch hoor ik u denken maar wij hebben ook verhuis (sterren) in ons team!', 1024, 765],
  ['intern', 'blog-interne-verhuizing.html', 'Interne verhuizing', 'Wij verrichten al jaren interne verhuizingen voor verschillende bedrijven.', 1024, 767]
];
const VARIANTEN = [
  ['Zoals nu, nieuwe foto\'s', 'De huidige kaarten, alleen andere foto\'s: mensen, heftruck en bus steken boven de rand uit.'],
  ['Zachte kaarten', 'Afgeronde hoeken en een zachte schaduw; het nummer als groene pil in de foto.'],
  ['Wit op lichtblauw', 'Witte dienstkaarten op een lichtblauwe band, Diepblauwe titel, rond groen nummer op de fotorand.'],
  ['Nachtblauwe band', 'Donkere band met Diepblauwe kaarten; de uitstappers krijgen een diepere schaduw. Nieuws op lichtblauw.'],
  ['Fotoafdruk', 'Elke foto als afdruk met witte rand en dikte; de mensen stappen over de rand van de afdruk.'],
  ['Boogvenster', 'De foto in een boog, zoals het venster bij Over ons; wat in de hoeken valt, steekt eruit.'],
  ['Schuine naad', 'Schuine onderkant van de foto met een groene naad; het nummer ligt op de naad.'],
  ['Uitgelicht', 'Verhuizen en het eerste bericht groot, de rest eromheen.'],
  ['Liggende kaarten', 'Foto links, tekst rechts, twee kaarten naast elkaar.'],
  ['Redactioneel', 'Geen gekleurd paneel: afgeronde foto, groot omlijnd nummer, groene pilknop.']
];
const pijl = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
const dienstHtml = ([n, href, h3, p, alt, w, h, nieuw], i) =>
  `<a class="dienst" href="../../${href}"><div class="dienst__nis" data-pop="${n}"><img src="foto/${n}.webp" width="${w}" height="${h}" alt="${alt}" decoding="async"><span class="dienst__nr" aria-hidden="true">0${i + 1}</span>${nieuw ? '<span class="nieuw dienst__nieuw">Nieuw!</span>' : ''}</div><div class="dienst__tekst"><h3>${h3}</h3><p>${p}</p><span class="dienst__meer">Lees meer</span></div></a>`;
const sander = `<li><a class="bericht bericht--pop" href="../../blog-samen-bouwen-aan-succes.html"><span class="bericht__foto"><img src="../../assets/img/db/blog-samen-bouwen-kop.webp" width="640" height="462" alt="" decoding="async"><img class="bericht__pop" src="../../assets/img/db/blog-samen-bouwen-kop-vrijstaand.webp" width="640" height="462" alt="" aria-hidden="true" decoding="async"></span><span class="bericht__tekst"><h3>Samen bouwen aan succes</h3><p>Satelliet hospitality furniture en De Bresser al jaren een sterk team</p><span class="bericht__meer">Lees meer${pijl}</span></span></a></li>`;
const berichtHtml = ([n, href, h3, p, w, h]) =>
  `<li><a class="bericht" href="../../${href}"><span class="bericht__foto" data-pop="${n}"><img src="foto/${n}.webp" width="${w}" height="${h}" alt="" decoding="async"></span><span class="bericht__tekst"><h3>${h3}</h3><p>${p}</p><span class="bericht__meer">Lees meer${pijl}</span></span></a></li>`;
const blok = ([naam, uitleg], i) => {
  const nr = String(i + 1).padStart(2, '0');
  return `
<section class="hv hv--${nr}" id="v${nr}" aria-label="Variant ${nr}: ${naam}">
  <div class="hv__bar"><span class="hv__nr">${nr}</span><h2 class="hv__naam">${naam}</h2><p class="hv__uitleg">${uitleg}</p></div>
  <section class="sectie ring hv-d">
    <div class="wrap">
      <div class="sectiekop sectiekop--midden"><p class="label">Waar we goed in zijn</p><h2 class="kop">Onze diensten</h2></div>
      <div class="diensten">
        ${DIENSTEN.map(dienstHtml).join('\n        ')}
      </div>
    </div>
  </section>
  <section class="sectie sectie--creme2 hv-n">
    <div class="wrap">
      <div class="sectiekop"><p class="label">Blog</p><h2 class="kop">Nieuws &amp; Tips</h2></div>
      <ul class="nieuws">
        ${sander}
        ${BERICHTEN.map(berichtHtml).join('\n        ')}
      </ul>
    </div>
  </section>
</section>`;
};
const html = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Homepage diensten en nieuws: 10 varianten</title>
<meta name="robots" content="noindex">
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="varianten.css">
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M4 12h15m-6-6l6 6-6 6"/></symbol></svg>
<nav class="hv-nav" aria-label="Varianten">
  <span class="hv-nav__titel">Onze diensten + Nieuws &amp; Tips</span>
  ${VARIANTEN.map(([naam], i) => { const nr = String(i + 1).padStart(2, '0'); return `<a href="#v${nr}"><b>${nr}</b> ${naam}</a>`; }).join('\n  ')}
</nav>
<header class="hv-intro wrap">
  <h1>Tien varianten, nieuwe foto's</h1>
  <p>In elke variant steken de mensen en wagens boven de fotorand uit. Opbouw en teksten zijn de echte homepage-blokken (dezelfde kaarten als nu); alleen stijl en foto's verschillen. Foto's: eigen De Bresser-beeld, behalve <em>Verhuizen met kinderen</em> en <em>Qwiek</em> (uit de AI-beeldbank van de site: er is geen echte foto met kinderen of met een verhuisster). Sander blijft zoals hij is.</p>
</header>
${VARIANTEN.map(blok).join('\n')}
<script src="pop.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html', html.length);
