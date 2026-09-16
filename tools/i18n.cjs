#!/usr/bin/env node
/* =====================================================================
   De Bresser · Engelse versie van de site bouwen
   Gebruik (vanuit de projectmap):
     node tools/i18n.cjs extract   teksten per NL-pagina naar tools/i18n/nl/*.json
     node tools/i18n.cjs build     EN-pagina's opbouwen uit NL + tools/i18n/en/*.json
     node tools/i18n.cjs check     EN-pagina's controleren op Nederlandse resten

   Vertalingen staan per pagina in tools/i18n/en/<nl-bestand>.json als
   { "Nederlandse tekst": "English text" }. Header, footer en mobiele balk
   gebruiken tools/i18n/en/_chrome.json. Bestandsnamen: tools/en-map.json.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(__dirname, 'i18n');
const MAP = JSON.parse(fs.readFileSync(path.join(__dirname, 'en-map.json'), 'utf8'));
const REV = Object.fromEntries(Object.entries(MAP).map(([nl, en]) => [en, nl]));

// data-label: veldnaam in de samenvatting na verzenden; data-vacature: tekst in het sollicitatiebericht
const TEXT_ATTRS = ['alt', 'title', 'aria-label', 'placeholder', 'data-label', 'data-vacature'];
const META_KEYS = /(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"/;
const JSON_KEYS = new Set(['name', 'description', 'headline', 'text', 'title', 'label', 'jobTitle', 'articleBody', 'reviewBody', 'about', 'slogan', 'alternativeHeadline', 'employmentType', 'occupationalCategory', 'serviceType', 'category', 'caption', 'disambiguatingDescription']);

const norm = s => s.replace(/\s+/g, ' ').trim();
const hasWords = s => /[A-Za-zÀ-ÿ]{2,}/.test(s.replace(/&[a-z]+;|&#\d+;/gi, ''));
const skipText = s => !hasWords(s) || /^(https?:|mailto:|tel:|www\.)\S+$/.test(s) || /^[\w.+-]+@[\w.-]+$/.test(s);

/* Doorloopt alle vertaalbare stukken; fn(tekst, soort) geeft de vervanging terug */
function walk(html, fn) {
  const re = /<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]+>/g;
  let out = '', last = 0, m;
  const text = t => {
    const core = norm(t);
    if (!core || skipText(core)) return t;
    const r = fn(core, 'text');
    if (r == null || r === core) return t;
    const lead = t.match(/^\s*/)[0], trail = t.match(/\s*$/)[0];
    return lead + r + trail;
  };
  while ((m = re.exec(html))) {
    out += text(html.slice(last, m.index));
    let tag = m[0];
    if (tag.startsWith('<script')) {
      const open = tag.match(/^<script\b[^>]*>/)[0];
      if (/application\/(ld\+)?json/.test(open)) {
        const body = tag.slice(open.length, -'</script>'.length);
        try {
          const data = JSON.parse(body);
          const tr = (v, k) => {
            if (typeof v === 'string') {
              if (!JSON_KEYS.has(k) || skipText(norm(v))) return v;
              const r = fn(norm(v), 'json');
              return r == null ? v : r;
            }
            if (Array.isArray(v)) return v.map(x => tr(x, k));
            if (v && typeof v === 'object') { for (const key of Object.keys(v)) v[key] = tr(v[key], key); }
            return v;
          };
          const indent = (body.match(/\n(\s*)\S/) || [, '  '])[1];
          const json = JSON.stringify(tr(data, ''), null, 2).replace(/\n/g, '\n' + indent.slice(0, Math.max(0, indent.length - 2)));
          tag = open + '\n' + indent.slice(0, Math.max(0, indent.length - 2)) + json + '\n' + indent.slice(0, Math.max(0, indent.length - 2)) + '</script>';
        } catch (e) { /* geen geldige JSON: laten staan */ }
      }
    } else if (tag[1] !== '!' && !tag.startsWith('<style')) {
      tag = tag.replace(/\s([a-z-]+)="([^"]*)"/g, (all, name, val) => {
        const translatable = TEXT_ATTRS.includes(name) || (name === 'content' && tag.startsWith('<meta') && META_KEYS.test(tag));
        if (!translatable) return all;
        const core = norm(val);
        if (!core || skipText(core)) return all;
        const r = fn(core, 'attr');
        return r == null ? all : ` ${name}="${r.replace(/"/g, '&quot;')}"`;
      });
    }
    out += tag;
    last = re.lastIndex;
  }
  return out + text(html.slice(last));
}

/* Header, footer, mobiele balk en skip-link */
function chromeParts(html) {
  const parts = [];
  for (const re of [/<a class="skip-link"[\s\S]*?<\/a>/, /<header\b[\s\S]*?<\/header>/, /<footer\b[\s\S]*?<\/footer>/, /<div class="mobilebar">[\s\S]*?<\/div>/]) {
    const m = html.match(re);
    if (m) parts.push(m[0]);
  }
  return parts;
}

const nlPages = () => Object.keys(MAP).filter(f => fs.existsSync(path.join(ROOT, f)));
const readJson = (f, fallback) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : fallback);

function extract() {
  fs.mkdirSync(path.join(DIR, 'nl'), { recursive: true });
  fs.mkdirSync(path.join(DIR, 'en'), { recursive: true });
  const chrome = new Set();
  for (const f of nlPages()) {
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const part of chromeParts(html)) walk(part, s => { chrome.add(s); });
  }
  let total = 0;
  const todo = [];
  for (const f of nlPages()) {
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const segs = new Set();
    walk(html, s => { if (!chrome.has(s)) segs.add(s); });
    const done = readJson(path.join(DIR, 'en', f.replace(/\.html$/, '.json')), {});
    const list = [...segs];
    const open = list.filter(s => !(s in done));
    fs.writeFileSync(path.join(DIR, 'nl', f.replace(/\.html$/, '.json')), JSON.stringify(list, null, 1));
    total += list.join('').length;
    if (open.length) todo.push(`${f}: ${open.length}`);
  }
  fs.writeFileSync(path.join(DIR, 'nl', '_chrome.json'), JSON.stringify([...chrome], null, 1));
  const cdone = readJson(path.join(DIR, 'en', '_chrome.json'), {});
  const copen = [...chrome].filter(s => !(s in cdone)).length;
  console.log(`${nlPages().length} pagina's, ${chrome.size} vaste teksten (${copen} open), ${Math.round(total / 1000)} kB paginatekst`);
  console.log(todo.length ? 'Nog te vertalen:\n  ' + todo.join('\n  ') : 'Alles vertaald.');
}

function localLinks(html, from, to) {
  return html.replace(/(href|action)="([^"#?:]+\.html)([#?][^"]*)?"/g, (all, attr, file, rest) => {
    const target = from[file];
    return target ? `${attr}="${target}${rest || ''}"` : all;
  });
}

function langSwitch(html, nlFile, enFile, current) {
  const nlLink = `<li><a href="${nlFile}" hreflang="nl" lang="nl"${current === 'nl' ? ' aria-current="page"' : ''}><span class="lang__flag lang__flag--nl" aria-hidden="true"></span>Nederlands</a></li>`;
  const enLink = `<li><a href="${enFile}" hreflang="en" lang="en"${current === 'en' ? ' aria-current="page"' : ''}><span class="lang__flag lang__flag--en" aria-hidden="true"></span>English</a></li>`;
  html = html.replace(/(<ul class="lang__menu"[^>]*>)[\s\S]*?(<\/ul>)/g, (all, open, close) => `${open}\n            ${nlLink}\n            ${enLink}\n          ${close}`);
  const code = current === 'en' ? 'en' : 'nl';
  html = html.replace(/(<button class="lang__btn"[^>]*aria-label=")[^"]*(")/g, `$1${code === 'en' ? 'English – language switcher' : 'Nederlands – taalschakelaar'}$2`);
  html = html.replace(/(<button class="lang__btn"[\s\S]*?)<span class="lang__flag lang__flag--(?:nl|en)" aria-hidden="true"><\/span><span class="lang__code">(?:NL|EN)<\/span>/g,
    `$1<span class="lang__flag lang__flag--${code}" aria-hidden="true"></span><span class="lang__code">${code.toUpperCase()}</span>`);
  // hreflang in de head
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, '');
  const alt = `\n  <link rel="alternate" hreflang="nl" href="${nlFile}">\n  <link rel="alternate" hreflang="en" href="${enFile}">\n  <link rel="alternate" hreflang="x-default" href="${nlFile}">`;
  html = html.replace(/(<link rel="stylesheet"[^>]*>)(?![\s\S]*<link rel="stylesheet")/, `$1${alt}`);
  return html;
}

function build() {
  const chrome = readJson(path.join(DIR, 'en', '_chrome.json'), {});
  const extra = readJson(path.join(DIR, 'en', '_extra.json'), {});
  let n = 0;
  for (const f of nlPages()) {
    const enFile = MAP[f];
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    // NL-pagina: taalschakelaar naar de eigen EN-pagina
    const nl = langSwitch(src, f, enFile, 'nl');
    if (nl !== src) fs.writeFileSync(path.join(ROOT, f), nl);

    const dict = readJson(path.join(DIR, 'en', f.replace(/\.html$/, '.json')), {});
    let html = walk(nl, s => (s in dict ? dict[s] : s in chrome ? chrome[s] : s in extra ? extra[s] : null));
    // losse cijfers zonder woorden (9,1 → 9.1; 1.531 → 1,531)
    html = html.replace(/>(\s*)(\d{1,2}),(\d{1,2})(\s*)</g, '>$1$2.$3$4<').replace(/>(\s*)(\d{1,3})\.(\d{3})(\s*)</g, '>$1$2,$3$4<');
    html = html.replace(/<html lang="nl"/, '<html lang="en"');
    html = html.replace(/(<meta property="og:locale" content=")[^"]*/, '$1en_GB');
    html = html.replace(/"inLanguage":\s*"nl(-NL)?"/g, '"inLanguage": "en-GB"');
    html = localLinks(html, MAP);
    html = langSwitch(html, f, enFile, 'en');
    fs.writeFileSync(path.join(ROOT, enFile), html);
    n++;
  }
  console.log(`${n} Engelse pagina's gebouwd.`);
}

/* Veelvoorkomende Nederlandse woorden die in Engels niet horen */
const NL_WORDS = /\b(het|een|voor|wij|uw|onze|meer|bij|niet|ook|naar|worden|wordt|zijn|kunt|verhuizing|verhuizen|opslag|offerte|aanvragen|bekijk|lees|neem|contact op|meubels?|bedrijf|diensten|over ons|klanten|jaar|goed|alle|deze|zoals|welke|hoe|wat)\b/i;

function check() {
  let bad = 0;
  for (const f of nlPages()) {
    const enFile = MAP[f];
    if (!fs.existsSync(path.join(ROOT, enFile))) { console.log(`ONTBREEKT ${enFile}`); bad++; continue; }
    const html = fs.readFileSync(path.join(ROOT, enFile), 'utf8');
    const hits = new Set();
    walk(html, s => { if (NL_WORDS.test(s) && s.length > 3) hits.add(s); });
    const keep = readJson(path.join(DIR, 'en', '_keep.json'), []);
    const rest = [...hits].filter(s => !keep.includes(s));
    // taalschakelaar en hreflang mogen naar de NL-pagina wijzen
    const nlLinks = [...html.matchAll(/<(?:a|link)\b[^>]*>/g)].map(x => x[0]).filter(t => !/hreflang=/.test(t))
      .map(t => (t.match(/href="([^"#?:]+\.html)/) || [])[1]).filter(x => x && MAP[x]);
    if (rest.length || nlLinks.length) {
      bad++;
      console.log(`\n${enFile}`);
      rest.slice(0, 12).forEach(s => console.log('  NL? ' + s.slice(0, 110)));
      if (rest.length > 12) console.log(`  ... +${rest.length - 12}`);
      if (nlLinks.length) console.log('  NL-links: ' + [...new Set(nlLinks)].join(', '));
    }
  }
  console.log(bad ? `\n${bad} pagina's met aandachtspunten.` : 'Geen Nederlandse resten gevonden.');
}

({ extract, build, check }[process.argv[2]] || (() => console.log('gebruik: extract | build | check')))();
