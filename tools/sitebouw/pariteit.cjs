/* Vergelijkt de tekst van elke lokale pagina met debresser.nl.
   Live: de Elementor-inhoud van de pagina. Lokaal: <main>. Header en footer tellen niet mee.
   Meldt zinnen die live staan maar lokaal ontbreken, en zinnen die lokaal extra zijn. */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const S = require('./site.js');
const LIVE = process.env.LIVE_DIR || path.join(__dirname, 'live');
const DOEL = process.env.DOEL || path.join(__dirname, '..', '..');

const norm = (s) => s.replace(/\u00a0/g, ' ').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
function zinnen(txt) {
  // eerst per regel (blokelement), daarna per zin
  return txt.split(/\n+/).flatMap((r) => norm(r).split(/(?<=[.!?])\s+/)).map((z) => z.trim()).filter((z) => z.length > 2);
}
function tekstVan($, el) {
  const $e = $(el).clone();
  $e.find('script,style,noscript,svg,iframe,select option').remove();
  $e.find('br').replaceWith(' ');
  // blokelementen als regelscheiding
  $e.find('p,li,h1,h2,h3,h4,h5,h6,div,summary,label,legend,figcaption,td,th,a,button,span.elementor-button-text,b,time').each((_, n) => { $(n).prepend('\n').append('\n'); });
  return $e.text();
}

const rapport = [];
let totaalMist = 0, totaalExtra = 0;
for (const f of fs.readdirSync(LIVE).filter((f) => f.endsWith('.html') && f !== 'home.html')) {
  const slug = f.replace(/\.html$/, '').replace(/__/g, '/');
  const bestand = S.fileFor(slug);
  const $l = cheerio.load(fs.readFileSync(path.join(LIVE, f), 'utf8'));
  const root = $l('[data-elementor-type="wp-page"],[data-elementor-type="wp-post"],[data-elementor-type="single-post"]').first();
  root.find('.frm_screen_reader, .frm_verify, legend.frm_screen_reader, [aria-hidden=true], .elementor-widget-pp-breadcrumbs, [data-widget_type^="formidable"] input[type=hidden], .frm_verify, [data-widget_type^="rating"], [data-widget_type^="social-icons"], [data-widget_type^="image"] img').remove();
  const $o = cheerio.load(fs.readFileSync(path.join(DOEL, bestand), 'utf8'));
  $o('.pk__kruim, .lf__hp, .db-form__melding, [aria-hidden=true], .dienst__meer').remove();
  // het honeypot-veld is voor bezoekers onzichtbaar
  const live = zinnen(tekstVan($l, root)).filter((z) => !/^Indien je een mens bent/.test(z));
  const lokaal = zinnen(tekstVan($o, $o('main')));
  const lokaalSet = new Set(lokaal), liveSet = new Set(live);
  const lokaalAlles = norm(lokaal.join(' '));
  const liveAlles = norm(live.join(' '));
  const mist = [...liveSet].filter((z) => !lokaalSet.has(z) && !lokaalAlles.includes(z));
  const extra = [...lokaalSet].filter((z) => !liveSet.has(z) && !liveAlles.includes(z));
  totaalMist += mist.length; totaalExtra += extra.length;
  if (mist.length || extra.length) rapport.push(`## ${bestand}  (mist ${mist.length}, extra ${extra.length})\n` + mist.map((z) => '  - MIST: ' + z.slice(0, 140)).join('\n') + (mist.length && extra.length ? '\n' : '') + extra.map((z) => '  + EXTRA: ' + z.slice(0, 140)).join('\n'));
}
fs.writeFileSync(path.join(__dirname, 'pariteit.txt'), rapport.join('\n\n'));
console.log('pagina\'s met verschil:', rapport.length, '| ontbrekende zinnen:', totaalMist, '| extra zinnen:', totaalExtra);
