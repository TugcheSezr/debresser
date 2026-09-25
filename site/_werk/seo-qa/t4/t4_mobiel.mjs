// Mobiele en CWV-pas: node _werk/seo-qa/t4/t4_mobiel.mjs [--ijk] [basis-url]
//
// Twee metingen:
//  1. horizontale overflow op 390px over ALLE routes, met de schuldige elementen erbij;
//  2. LCP per sjabloon, drie runs, mediaan.
//
// Waarom geen Lighthouse voor de LCP: er draaien vanavond meerdere Claude-sessies op deze
// machine en een vreemde Chrome laat de score instorten. Een directe LCP-meting via
// PerformanceObserver is smaller maar reproduceerbaar, en ik rapporteer hem als LABwaarde op
// een DEV-SERVER: geen Vercel, geen echte netwerklatentie, geen CDN. Dat is een ondergrens
// voor de werkelijkheid, geen voorspelling ervan.
//
// Viewport via Emulation.setDeviceMetricsOverride en niet via --window-size: onder ~500px
// klemt de vensterbreedte en meet je stilletjes 500px terwijl je 390 dacht te meten.
import {spawn} from 'node:child_process';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';

const IJK = process.argv.includes('--ijk');
const BASIS = (process.argv.find(a => a.startsWith('http')) || 'http://127.0.0.1:4740').replace(/\/$/, '');
const HIER = path.dirname(new URL(import.meta.url).pathname);

const KAND = [
  ...(fs.existsSync(path.join(os.homedir(), 'Library/Caches/ms-playwright'))
      ? fs.readdirSync(path.join(os.homedir(), 'Library/Caches/ms-playwright'))
          .filter(d => d.startsWith('chromium_headless_shell'))
          .map(d => path.join(os.homedir(), 'Library/Caches/ms-playwright', d,
                              'chrome-headless-shell-mac-arm64/chrome-headless-shell'))
      : []),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];
const BIN = KAND.find(p => fs.existsSync(p));
if (!BIN) { console.error('geen chrome gevonden'); process.exit(2); }

const poort = 9400 + Math.floor(Math.random() * 400);
const udd = fs.mkdtempSync(path.join(os.tmpdir(), 't4-'));
const chrome = spawn(BIN, ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  `--remote-debugging-port=${poort}`, `--user-data-dir=${udd}`], {stdio: 'ignore'});
const slaap = ms => new Promise(r => setTimeout(r, ms));
for (let i = 0; i < 60; i++) { try { await (await fetch(`http://127.0.0.1:${poort}/json/version`)).json(); break; } catch { await slaap(200); } }

const doel = await (await fetch(`http://127.0.0.1:${poort}/json/new?about:blank`, {method: 'PUT'})).json();
const ws = new WebSocket(doel.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const open = new Map(); const gebeurtenissen = [];
ws.onmessage = e => { const m = JSON.parse(e.data);
  if (m.id && open.has(m.id)) { const {res, rej} = open.get(m.id); open.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); }
  else if (m.method) gebeurtenissen.push(m); };
const stuur = (methode, params = {}) => new Promise((res, rej) => { const i = ++id; open.set(i, {res, rej}); ws.send(JSON.stringify({id: i, method: methode, params})); });
const ev = async expr => (await stuur('Runtime.evaluate', {expression: expr, returnByValue: true, awaitPromise: true})).result.value;

await stuur('Page.enable'); await stuur('Runtime.enable'); await stuur('Network.enable');
await stuur('Network.setCacheDisabled', {cacheDisabled: true});

// De LCP-observer moet er staan VOOR de pagina laadt, anders mis je de entry.
await stuur('Page.addScriptToEvaluateOnNewDocument', {source: `
  window.__lcp = 0;
  new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.startTime; })
    .observe({type: 'largest-contentful-paint', buffered: true});`});

async function ga(url) {
  await stuur('Page.navigate', {url});
  for (let i = 0; i < 120; i++) { if (gebeurtenissen.find(e => e.method === 'Page.loadEventFired')) break; await slaap(50); }
  gebeurtenissen.length = 0;
  await ev('document.fonts.ready.then(()=>1)');
}

const OVERFLOW = `(() => {
  const de = document.documentElement;
  const over = de.scrollWidth - de.clientWidth;
  const schuldig = [];
  if (over > 0) {
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > de.clientWidth + 1 || r.left < -1) {
        const s = getComputedStyle(el);
        if (s.position === 'fixed' || s.visibility === 'hidden' || s.display === 'none') continue;
        schuldig.push(el.tagName.toLowerCase() + (el.className && typeof el.className === 'string'
          ? '.' + el.className.trim().split(/\\s+/).slice(0,2).join('.') : '')
          + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']');
      }
    }
  }
  return JSON.stringify({over, breedte: de.clientWidth, schuldig: [...new Set(schuldig)].slice(0, 6)});
})()`;

if (IJK) {
  // Een controle die niets kan vinden bewijst niets: forceer overflow en eis dat hij hem ziet.
  await stuur('Emulation.setDeviceMetricsOverride', {width: 390, height: 844, deviceScaleFactor: 2, mobile: true});
  await ga(BASIS + '/');
  const schoon = JSON.parse(await ev(OVERFLOW));
  console.log(`  ${schoon.over === 0 ? 'ok  ' : 'let op'} nulmeting: viewport ${schoon.breedte}px, overflow ${schoon.over}px`);
  console.log(`  ${schoon.breedte === 390 ? 'ok  ' : 'DOOD'} viewport is echt 390 en niet stilletjes 500 (setDeviceMetricsOverride)`);
  await ev(`(()=>{const d=document.createElement('div');d.style.cssText='width:900px;height:20px';
            document.body.appendChild(d);return 1})()`);
  const stuk = JSON.parse(await ev(OVERFLOW));
  console.log(`  ${stuk.over > 0 ? 'ok  ' : 'DOOD'} met een ingespoten div van 900px: overflow ${stuk.over}px, schuldige = ${stuk.schuldig[0] || 'GEEN'}`);
  const lcp = await ev('window.__lcp');
  console.log(`  ${lcp > 0 ? 'ok  ' : 'DOOD'} LCP-observer levert een waarde: ${Math.round(lcp)}ms`);
  console.log(`\nIJKING ${stuk.over > 0 && lcp > 0 && stuk.schuldig.length && schoon.breedte === 390 ? 'GESLAAGD' : 'MISLUKT'}`);
  ws.close(); chrome.kill(); try { fs.rmSync(udd, {recursive: true, force: true}); } catch {}
process.exit(0);
}

const routes = Object.keys(JSON.parse(fs.readFileSync(path.join(HIER, 't4-baseline.json'), 'utf8')).paginas).sort();
const uit = {overflow: {}, lcp: {}};

await stuur('Emulation.setDeviceMetricsOverride', {width: 390, height: 844, deviceScaleFactor: 2, mobile: true});
let metOverflow = 0;
for (const r of routes) {
  await ga(BASIS + r);
  const o = JSON.parse(await ev(OVERFLOW));
  uit.overflow[r] = o;
  if (o.over > 0) { metOverflow++; console.log(`  OVERFLOW ${r}  +${o.over}px  ${o.schuldig.join(' | ')}`); }
}
console.log(`390px: ${metOverflow} van ${routes.length} routes met horizontale overflow`);

const SJABLONEN = ['/', '/diensten/', '/piano-verhuizen/', '/contact/', '/m3-calculator/', '/klantervaringen/'];

// ZONDER rem is dit geen LCP maar "hoe snel kan deze Mac verven": de eerste ronde gaf 60-76ms
// op localhost, en dat als groen rapporteren is misleidender dan niet meten. Daarom hetzelfde
// mobiele profiel dat Lighthouse gebruikt: 4x CPU-vertraging en traag-4G (1,6 Mbit down,
// 750 kbit up, 150 ms RTT). Blijft een LABwaarde op een dev-server zonder CDN en zonder echte
// afstand tot de server; het is een ondergrens, geen voorspelling van Vercel.
await stuur('Emulation.setCPUThrottlingRate', {rate: 4});
await stuur('Network.emulateNetworkConditions', {offline: false, latency: 150,
  downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8});
console.log('\nLCP (mobiel 390px, 4x CPU-rem + traag-4G, dev-server, 3 runs, mediaan):');
for (const r of SJABLONEN) {
  const runs = [];
  for (let i = 0; i < 3; i++) { await ga(BASIS + r); await slaap(400); runs.push(await ev('window.__lcp')); }
  runs.sort((a, b) => a - b);
  const med = Math.round(runs[1]);
  uit.lcp[r] = {mediaan: med, runs: runs.map(x => Math.round(x))};
  console.log(`  ${med > 2500 ? 'BOVEN 2500' : 'onder 2500'}  ${String(med).padStart(5)}ms  ${r}  (runs ${runs.map(x => Math.round(x)).join('/')})`);
}
fs.writeFileSync(path.join(HIER, 't4-mobiel.json'), JSON.stringify(uit, null, 1));
console.log('\n-> t4-mobiel.json');
ws.close(); chrome.kill();
try { fs.rmSync(udd, {recursive: true, force: true}); } catch {}
