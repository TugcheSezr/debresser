/* Zet de taalkeuze (NL / EN) in de header van alle pagina's, of werkt hem bij.
   Gebruik: node apply-lang.js <repo-map> */
const fs = require('fs');
const path = require('path');
const S = require('./site.js');

const repo = process.argv[2];
for (const file of fs.readdirSync(repo).filter((f) => f.endsWith('.html'))) {
  const p = path.join(repo, file);
  let html = fs.readFileSync(p, 'utf8');
  const before = html;
  html = html.replace(/\s*<div class="lang" data-lang>[\s\S]*?<\/ul>\s*<\/div>/, '');
  html = html.replace(/(<div class="header__cta">)(\s*)(<a class="header-tel")/, (m, a, ws, b) => `${a}${ws}${S.langSwitch(file)}${ws}${b}`);
  if (!html.includes('data-lang')) { console.log('GEEN header__cta', file); continue; }
  if (html !== before) { fs.writeFileSync(p, html); console.log('bijgewerkt', file); }
}
