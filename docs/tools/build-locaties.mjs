/* Bouwt de Locaties-sectie voor contact.html: echte NL/BE-contouren (Natural Earth 1:50m
   via world-atlas), pinnen op de echte vestigingen, kaarten met ongewijzigde gegevens. */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { geoMercator, geoPath } from 'd3-geo';
const require = createRequire(import.meta.url);
const topo = require('topojson-client');
const world = require('world-atlas/countries-50m.json');

const ROOT = 'C:/Users/tugce/Documents/GitHub/debresser/debresser/';
const W = 600, H = 660;

const countries = topo.feature(world, world.objects.countries).features;
const byId = id => countries.find(f => f.id === id);
/* alleen Europees Nederland (geen Caribische delen) */
function europeOnly(f) {
  const g = f.geometry;
  if (g.type !== 'MultiPolygon') return f;
  return { ...f, geometry: { type: 'MultiPolygon', coordinates: g.coordinates.filter(p => p[0][0][0] > 0 && p[0][0][1] > 45) } };
}
const nl = europeOnly(byId('528'));
const be = byId('056');
const ctx = ['276', '250', '442'].map(byId).map(europeOnly);

const projection = geoMercator().fitExtent([[48, 36], [W - 48, H - 36]], { type: 'FeatureCollection', features: [nl, be] });
const path = geoPath(projection).digits(1);
const border = topo.mesh(world, world.objects.countries, (a, b) => (a.id === '528' && b.id === '056') || (a.id === '056' && b.id === '528'));

/* vestigingen: gegevens exact zoals op debresser.nl / huidige contactpagina */
const locs = [
  { key: 'oisterwijk', group: 'nl', city: 'Oisterwijk', lines: ['Schijfstraat 13', '5061 KA Oisterwijk'], tel: '+31135282372', telText: 'T +31 (0)13 52 82 372', ll: [5.1905, 51.5796], label: 'r' },
  { key: 'tilburg', group: 'nl', city: 'Tilburg', lines: ['Herastraat 9', '5047 TX Tilburg'], tel: '+31135425935', telText: 'T +31 (0)13 54 25 935', ll: [5.0296, 51.5867], label: 't' },
  { key: 'breda', group: 'nl', city: 'Breda', lines: ['Mijkenbroek 46', '4824 AC Breda'], tel: '+31765224100', telText: 'T +31 (0)76 52 24 100', ll: [4.8120, 51.6010], label: 'l' },
  { key: 'venlo', group: 'nl', city: 'Venlo', lines: ['Coehoornstraat 11', '5916 PH Venlo'], tel: '+31773232100', telText: 'T +31 (0)77 32 32 100', ll: [6.1540, 51.3860], label: 'r' },
  { key: 'reeuwijk', group: 'nl', city: 'Reeuwijk', lines: ['Edisonstraat 1A-B', '2811EM, Reeuwijk'], tel: '+31135425935', telText: 'T +31 (0)13 54 25 935', ll: [4.7250, 52.0520], label: 'l' },
  { key: 'brussel', group: 'be', city: 'Brussel', lines: ['Bazellaan 8', '1140 Evere, België'], tel: '+32026701894', telText: 'T +32 (0)26 – 701894', ll: [4.4120, 50.8730], label: 'r' }
];
locs.forEach(l => { const [x, y] = projection(l.ll); l.x = x; l.y = y; });
const hq = locs[0];
const pct = v => (v * 100).toFixed(2) + '%';
const I = (n, s) => s.split('\n').map(l => (l ? ' '.repeat(n) + l : l)).join('\n');

const depth = [8, 6.5, 5, 3.5, 2].map((d, i) => `<use class="loc-map__side" href="#loc-shape" transform="translate(0 ${d})"/>`).join('\n');
const routes = locs.slice(1).map(l => {
  const mx = (hq.x + l.x) / 2, my = (hq.y + l.y) / 2;
  const dist = Math.hypot(l.x - hq.x, l.y - hq.y);
  const c = [mx, my - Math.max(26, dist * 0.42)];
  return `<path class="loc-route" data-loc="${l.key}" d="M${hq.x.toFixed(1)} ${hq.y.toFixed(1)}Q${c[0].toFixed(1)} ${c[1].toFixed(1)} ${l.x.toFixed(1)} ${l.y.toFixed(1)}"/>`;
}).join('\n');
const dots = locs.map(l => `<g class="loc-dot" data-loc="${l.key}" transform="translate(${l.x.toFixed(1)} ${l.y.toFixed(1)})"><ellipse class="loc-dot__ring" rx="16" ry="16"/><circle class="loc-dot__core" r="4.5"/></g>`).join('\n');
const pins = locs.map(l => `<span class="loc-pin loc-pin--${l.label}" data-loc="${l.key}" style="left:${pct(l.x / W)};top:${pct(l.y / H)}"><span class="loc-pin__stem"></span><span class="loc-pin__head"></span><span class="loc-pin__label">${l.city}</span></span>`).join('\n');

const PIN_SVG = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>';
const TEL_SVG = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.5h3.5l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.5 1.5C10.6 20.5 3.5 13.4 3.5 5A1.5 1.5 0 0 1 5 3.5z"/></svg>';
let nr = 0;
const card = l => { nr++; return `<li class="loc-card" data-loc="${l.key}">
  <span class="loc-card__nr" aria-hidden="true">${String(nr).padStart(2, '0')}</span>
  <div class="loc-card__body"><h3>${l.city}</h3><address>${l.lines.join('<br>')}<br><a class="loc-card__tel" href="tel:${l.tel}">${TEL_SVG}<span>${l.telText}</span></a></address></div>
  <span class="loc-card__icon" aria-hidden="true">${PIN_SVG}</span>
</li>`; };

const section = `  <section class="section loc" id="locaties" aria-labelledby="loc-title">
    <svg class="bg-ruit bg-ruit--bl" viewBox="0 0 460 450" aria-hidden="true"><polygon points="190,114 340,34 340,234 190,316"/><polygon points="58,294 208,214 346,297 186,378"/><polygon points="268,134 422,220 422,402 268,318"/></svg>
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-head__text">
          <p class="eyebrow">Locaties</p>
          <h2 class="h2" id="loc-title">Locaties</h2>
        </div>
      </div>
      <div class="loc-board" data-loc-board>
        <div class="loc-map reveal" data-tilt="5">
          <div class="loc-map__stage">
            <svg class="loc-map__svg" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">
              <defs>
                <path id="loc-shape" d="${path(nl)}${path(be)}"/>
                <linearGradient id="loc-land" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6ee7b7"/><stop offset=".55" stop-color="#10b981"/><stop offset="1" stop-color="#0d9488"/></linearGradient>
                <linearGradient id="loc-land-be" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7dd3fc"/><stop offset=".6" stop-color="#38bdf8"/><stop offset="1" stop-color="#0e7490"/></linearGradient>
              </defs>
              <g class="loc-map__ctx">${ctx.map(f => `<path d="${path(f)}"/>`).join('')}</g>
${I(14, depth)}
              <path class="loc-map__land loc-map__land--nl" d="${path(nl)}"/>
              <path class="loc-map__land loc-map__land--be" d="${path(be)}"/>
              <path class="loc-map__border" d="${path(border)}"/>
              <g class="loc-map__routes">
${I(16, routes)}
              </g>
${I(14, dots)}
            </svg>
${I(12, pins)}
          </div>
        </div>
        <div class="loc-list">
          <div class="loc-group">
            <h3 class="h3 loc-group__title reveal"><span class="loc-flag loc-flag--nl" aria-hidden="true"></span>Nederland</h3>
            <ul class="loc-cards reveal-group">
${I(14, locs.filter(l => l.group === 'nl').map(card).join('\n'))}
            </ul>
          </div>
          <div class="loc-group">
            <h3 class="h3 loc-group__title reveal"><span class="loc-flag loc-flag--be" aria-hidden="true"></span>België</h3>
            <ul class="loc-cards reveal-group">
${I(14, locs.filter(l => l.group === 'be').map(card).join('\n'))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>`;

/* vervangen + controleren dat alle oude teksten en tel-links er nog zijn */
const file = ROOT + 'contact.html';
let html = fs.readFileSync(file, 'utf8');
const start = html.indexOf('  <section class="section section--mist" id="locaties"');
if (start < 0) throw new Error('Locaties-sectie niet gevonden (al vervangen?)');
const end = html.indexOf('</section>', start) + '</section>'.length;
const oldSec = html.slice(start, end);
const texts = h => h.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<br>/g, '\n').replace(/<[^>]+>/g, '\n').split('\n').map(t => t.trim()).filter(Boolean);
const hrefs = h => (h.match(/href="tel:[^"]+"/g) || []).sort().join(',');
const missing = texts(oldSec).filter(t => !texts(section).includes(t));
if (missing.length) throw new Error('Ontbrekende tekst: ' + missing.join(' | '));
if (hrefs(oldSec) !== hrefs(section)) throw new Error('tel-links wijken af');
console.log('teksten ok:', texts(oldSec).length, '| tel-links ok');
html = html.slice(0, start) + section + html.slice(end);
fs.writeFileSync(file, html);
console.log('contact.html bijgewerkt,', Math.round(section.length / 1024), 'kB sectie');
console.log(locs.map(l => l.key + ' ' + l.x.toFixed(0) + ',' + l.y.toFixed(0)).join(' | '));
