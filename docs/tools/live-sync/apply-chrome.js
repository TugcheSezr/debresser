/* Zet de header (menu zoals debresser.nl), footer (met snelmenu) en mobiele balk
   uit site.js op bestaande, met de hand gemaakte pagina's. Verwijdert de topbar
   (die bestaat niet op de live site) en zet oude anker-links om naar de losse pagina's.
   Gebruik: node apply-chrome.js <repo-map> pagina.html [pagina.html ...] */
const fs = require('fs');
const path = require('path');
const S = require('./site.js');

const ANCHORS = {
  'diensten-verhuizen.html#bedrijfsverhuizen': 'zakelijke-verhuizing.html',
  'diensten-verhuizen.html#particulier-verhuizen': 'particuliere-verhuizing.html',
  'diensten-verhuizen.html#internationale-verhuizingen': 'internationale-verhuizing.html',
  'diensten-verhuizen.html#zorgverhuizing': 'zorg-verhuizing.html',
  'diensten-verhuizen.html#duurzaam-verhuizen': 'duurzaam-verhuizen.html',
  'diensten-opslag.html#zakelijk': 'zakelijke-opslag.html',
  'diensten-opslag.html#particulier': 'particuliere-opslag.html',
  'diensten-opslag.html#diy-opslag': 'particuliere-opslag.html#diy-opslag',
  'diensten-meubelprojecten.html#meubeltransport': 'meubeltransport.html',
  'diensten-meubelprojecten.html#veilingen': 'veilingen.html',
  'diensten-meubelprojecten.html#montageservice': 'meubelmontage.html',
  'diensten-gebouwbeheer.html#onderhoud': 'gebouwbeheer-onderhoud.html',
  'diensten-gebouwbeheer.html#verduurzamen': 'gebouwbeheer-verduurzamen.html',
  'diensten-gebouwbeheer.html#huismeester': 'gebouwbeheer-huismeester.html',
  'diensten-assetmanagement.html#inventarisatie': 'assetmanagement-inventarisatie.html',
  'diensten-assetmanagement.html#wms-en-meubelpaspoort': 'assetmanagement-wms-en-meubelpaspoort.html',
  'diensten-assetmanagement.html#opslag-assets': 'assetmanagement-opslag-assets.html',
  'diensten-assetmanagement.html#inkoop-en-verkoop-assets': 'assetmanagement-inkoop-en-verkoop-assets.html',
  'diensten-assetmanagement.html#circulair-meubilair': 'assetmanagement-circulair-meubilair.html'
};

const [repo, ...files] = process.argv.slice(2);
for (const file of files) {
  const p = path.join(repo, file);
  let html = fs.readFileSync(p, 'utf8');
  const before = html;

  // topbar weg
  html = html.replace(/(<!-- =+\s*UTILITY-BALK\s*=+ -->\s*)?<div class="topbar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*/, '');
  // header vervangen (id="header" van de homepage behouden)
  html = html.replace(/<header class="header header--overlay"( id="header")?>[\s\S]*?\n<\/header>/, (m, id) => S.header(file).replace('<header class="header header--overlay">', `<header class="header header--overlay"${id || ''}>`));
  // footer + mobiele balk vervangen
  html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>\s*(<!-- Mobiel: vaste actiebalk onderin -->\s*)?<div class="mobilebar">[\s\S]*?<\/div>/, S.footer());
  // anker-links naar losse pagina's
  for (const [from, to] of Object.entries(ANCHORS)) html = html.split(`href="${from}"`).join(`href="${to}"`);

  if (html !== before) { fs.writeFileSync(p, html); console.log('bijgewerkt', file); } else console.log('ongewijzigd', file);
}
