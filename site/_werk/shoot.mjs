// Screenshot-tool: node _werk/shoot.mjs <url> <breedte> <uit.png>
// Start playwright's chrome-headless-shell, forceert alle [data-reveal] zichtbaar, zet de viewport op
// documenthoogte en knipt in stroken van 1600px (captureBeyondViewport:false). Schrijft ook <uit>.json
// met de sectieposities en de scrollWidth-check.
import {spawn} from 'node:child_process';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const [,, url, widthArg, out] = process.argv;
const width = +widthArg || 1440;
const KAND = [path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const BIN = KAND.find(p => fs.existsSync(p));   // playwright's shell staat niet op elke Mac; val terug op Chrome
if(!BIN) throw new Error('geen chrome gevonden');
const port = 9300 + Math.floor(Math.random()*500);
const udd = fs.mkdtempSync(path.join(os.tmpdir(), 'hs-'));
const chrome = spawn(BIN, ['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--window-size=1440,900','--hide-scrollbars'], {stdio:'ignore'});
const sleep = ms => new Promise(r=>setTimeout(r,ms));
let version=null;
for (let i=0;i<50;i++){ try{ version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); break;}catch{ await sleep(200);} }
if(!version){ chrome.kill(); throw new Error('chrome start faalt'); }
const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {method:'PUT'})).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);
let id=0; const pending=new Map(); const events=[];
ws.onmessage = e => { const m = JSON.parse(e.data); if(m.id && pending.has(m.id)){ const {res,rej}=pending.get(m.id); pending.delete(m.id); m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);} else if(m.method){ events.push(m); } };
const send = (method, params={}) => new Promise((res,rej)=>{ const i=++id; pending.set(i,{res,rej}); ws.send(JSON.stringify({id:i,method,params})); });
const ev = async (expression) => (await send('Runtime.evaluate',{expression, returnByValue:true, awaitPromise:true})).result.value;
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
await send('Network.setCacheDisabled',{cacheDisabled:true});
await send('Emulation.setDeviceMetricsOverride',{width, height:900, deviceScaleFactor:1, mobile:false});
await send('Page.navigate',{url});
for(let i=0;i<100;i++){ if(events.find(e=>e.method==='Page.loadEventFired')) break; await sleep(100); }
await ev('document.fonts.ready.then(()=>1)');
await ev(`document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('in'));1`);
await ev(`Promise.all([...document.images].map(i=>{i.loading='eager'; return Promise.race([i.decode().catch(()=>0), new Promise(r=>setTimeout(r,4000))])})).then(()=>1)`);
await sleep(300);
let h=0;
for(let i=0;i<6;i++){ const nh=await ev('document.documentElement.scrollHeight'); if(nh===h) break; h=nh; await send('Emulation.setDeviceMetricsOverride',{width, height:h, deviceScaleFactor:1, mobile:false}); await sleep(250); }
const secs = await ev(`JSON.stringify([...document.querySelectorAll('header, main > section, footer')].map(s=>{const r=s.getBoundingClientRect(); return {id:s.id||s.className.split(' ')[0], top:Math.round(r.top+scrollY), h:Math.round(r.height)}}))`);
const sw = await ev('JSON.stringify({sw:document.documentElement.scrollWidth, cw:document.documentElement.clientWidth, bodySw:document.body.scrollWidth})');
fs.writeFileSync(out.replace(/\.png$/,'.json'), JSON.stringify({height:h, scroll:JSON.parse(sw), secties:JSON.parse(secs)}));
console.log('breedte', width, 'hoogte', h, 'scroll', sw);
const parts=[];
for(let y=0;y<h;y+=1600){ const ch=Math.min(1600,h-y); const shot = await send('Page.captureScreenshot',{format:'png', clip:{x:0,y,width,height:ch,scale:1}, captureBeyondViewport:false}); const f=out.replace(/\.png$/,`.part${parts.length}.png`); fs.writeFileSync(f, Buffer.from(shot.data,'base64')); parts.push(f); }
fs.writeFileSync(out.replace(/\.png$/,'.parts.txt'), parts.join('\n'));
ws.close(); chrome.kill(); try{fs.rmSync(udd,{recursive:true,force:true})}catch{}
