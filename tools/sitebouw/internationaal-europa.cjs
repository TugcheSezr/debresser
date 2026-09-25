/* Internationale verhuizing, blok "Internationale verhuizing binnen Europa" (klantwens 25 september 2026).
   De generator zet de tekst over de hele breedte. Nu staat hij links en rechts een foto van een eigen
   wagen in een bergdorp in Frankrijk ("grote stad of juist een bergdorp"). Het kader snijdt de foto
   links en onder af; de uitsnede van de wagen (assets/img/internationaal/wagen-bergdorp-vrij.webp,
   imgly, zelfde maat als de foto) ligt erop, zodat de wagen links onder uit het kader naar voren komt.
   Rechtsboven een kaartje met de vlaggen van de meubelroutes uit de tekst: Nederland, België en
   Luxemburg. De tekst zelf blijft zoals hij is. De sectie houdt haar klasse, dus "Banden per sectie"
   in style.css geeft haar nog steeds de Diepblauwe band.
   CSS: css/internationaal-europa.css (prefix ive-). Draait in NABEWERKING van bouw.cjs.
   Los draaien op een bestaande pagina (ook nog een keer): node internationaal-europa.cjs ../../internationale-verhuizing.html */
const fs = require('fs');

function internationaalEuropa(h) {
  const kop = '<h2 class="kop">Internationale verhuizing binnen Europa<\\/h2>';
  const m = h.match(new RegExp('<section class="sectie sectie--creme2">\\s*<div class="wrap">\\s*(' + kop + ')\\s*(<div class="db-tekst">[\\s\\S]*?<\\/div>)\\s*<\\/div>\\s*<\\/section>'))
    || h.match(new RegExp('<section class="sectie sectie--creme2">\\s*<div class="wrap">\\s*<div class="blok blok--vlak ive">\\s*<div class="blok__tekst" data-reveal>\\s*(' + kop + ')\\s*(<div class="db-tekst">[\\s\\S]*?<\\/div>)\\s*<\\/div>[\\s\\S]*?<\\/section>'));
  if (!m) throw new Error('internationale-verhuizing.html internationaal-europa: blok "Internationale verhuizing binnen Europa" niet gevonden');
  const blok = `<section class="sectie sectie--creme2">
  <div class="wrap">
    <div class="blok blok--vlak ive">
      <div class="blok__tekst" data-reveal>
      ${m[1]}
      ${m[2]}
      </div>
      <figure class="blok__foto ive-foto" data-reveal><img class="ive-foto__beeld" src="assets/img/site/Frankrijk-Verhuizen-Transport-bedrijf-1024x804.jpg" alt="De Bresser verhuiswagen in Frankrijk" width="1024" height="804" loading="lazy" decoding="async"><img class="ive-foto__wagen" src="assets/img/internationaal/wagen-bergdorp-vrij.webp" alt="" aria-hidden="true" width="1024" height="804" loading="lazy" decoding="async"><div class="ive-route" aria-hidden="true"><span class="ive-route__vlaggen"><span class="db-vlag db-vlag--nl"></span><span class="db-vlag db-vlag--be"></span><span class="db-vlag db-vlag--lu"></span></span><span class="ive-route__tekst"><b>Meerdere keren per week</b>Nederland, België en Luxemburg</span></div></figure>
    </div>
  </div>
</section>`;
  h = h.replace(m[0], () => blok);
  if (!h.includes('css/internationaal-europa.css')) h = h.replace('</head>', '<link rel="stylesheet" href="css/internationaal-europa.css">\n</head>');
  return h;
}

module.exports = internationaalEuropa;

if (require.main === module) {
  const bestand = process.argv[2];
  if (!bestand) throw new Error('gebruik: node internationaal-europa.cjs <pad naar internationale-verhuizing.html>');
  fs.writeFileSync(bestand, internationaalEuropa(fs.readFileSync(bestand, 'utf8')));
  console.log('internationaal-europa toegepast op', bestand);
}
