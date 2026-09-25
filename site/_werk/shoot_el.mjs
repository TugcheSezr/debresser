// Element-screenshot met transparante achtergrond: node _werk/shoot_el.mjs <url> <schaal> <selector=uit.png> ...
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const [,, url, schaalArg, ...paren] = process.argv; const schaal = +schaalArg || 2;
const KAND = [path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'), '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const BIN = KAND.find(p => fs.existsSync(p)); const port = 9300 + Math.floor(Math.random()*500); const udd = fs.mkdtempSync(path.join(os.tmpdir(), 'hs-'));
const chrome = spawn(BIN, ['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--window-size=1400,900','--hide-scrollbars'], {stdio:'ignore'});
const sleep = ms => new Promise(r=>setTimeout(r,ms)); let v=null;
for (let i=0;i<50;i++){ try{ v = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); break;}catch{ await sleep(200);} }
const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {method:'PUT'})).json();
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0; const pending=new Map(); const events=[];
ws.onmessage = e => { const m = JSON.parse(e.data); if(m.id && pending.has(m.id)){ const {res,rej}=pending.get(m.id); pending.delete(m.id); m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);} else if(m.method){ events.push(m); } };
const send = (method, params={}) => new Promise((res,rej)=>{ const i=++id; pending.set(i,{res,rej}); ws.send(JSON.stringify({id:i,method,params})); });
const ev = async (expression) => (await send('Runtime.evaluate',{expression, returnByValue:true, awaitPromise:true})).result.value;
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1400, height:900, deviceScaleFactor:schaal, mobile:false});
await send('Emulation.setDefaultBackgroundColorOverride',{color:{r:0,g:0,b:0,a:0}});
await send('Page.navigate',{url}); for(let i=0;i<100;i++){ if(events.find(e=>e.method==='Page.loadEventFired')) break; await sleep(100); }
await ev('document.fonts.ready.then(()=>1)'); await sleep(300);
for (const paar of paren){ const [sel, uit] = paar.split('='); const r = JSON.parse(await ev(`JSON.stringify(document.querySelector('${sel}').getBoundingClientRect())`));
  const shot = await send('Page.captureScreenshot',{format:'png', clip:{x:r.x,y:r.y,width:r.width,height:r.height,scale:schaal}, captureBeyondViewport:true});
  fs.writeFileSync(uit, Buffer.from(shot.data,'base64')); console.log(uit, Math.round(r.width*schaal), Math.round(r.height*schaal)); }
ws.close(); chrome.kill(); try{fs.rmSync(udd,{recursive:true,force:true})}catch{}
