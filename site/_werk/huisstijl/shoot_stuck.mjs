// Topbar in gescrolde stand (is-stuck) vastleggen: node site/_werk/huisstijl/shoot_stuck.mjs <url> <breedte> <uit.png>
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const [,, url, widthArg, out] = process.argv; const width = +widthArg || 1440;
const KAND = [path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'), '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const BIN = KAND.find(p => fs.existsSync(p)); const port = 9300 + Math.floor(Math.random()*500); const udd = fs.mkdtempSync(path.join(os.tmpdir(), 'hs-'));
const chrome = spawn(BIN, ['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--window-size=1440,900','--hide-scrollbars'], {stdio:'ignore'});
const sleep = ms => new Promise(r=>setTimeout(r,ms)); let version=null;
for (let i=0;i<50;i++){ try{ version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); break;}catch{ await sleep(200);} }
const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {method:'PUT'})).json();
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0; const pending=new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if(m.id && pending.has(m.id)){ const {res,rej}=pending.get(m.id); pending.delete(m.id); m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);} };
const send = (method, params={}) => new Promise((res,rej)=>{ const i=++id; pending.set(i,{res,rej}); ws.send(JSON.stringify({id:i,method,params})); });
const ev = async (expression) => (await send('Runtime.evaluate',{expression, returnByValue:true, awaitPromise:true})).result.value;
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable'); await send('Network.setCacheDisabled',{cacheDisabled:true});
await send('Emulation.setDeviceMetricsOverride',{width, height:900, deviceScaleFactor:1, mobile:false});
await send('Page.navigate',{url}); await sleep(2500); await ev('document.fonts.ready.then(()=>1)');
await ev('document.querySelector(".topbar").classList.add("is-stuck"); 1'); await sleep(900);
const m = await ev('JSON.stringify((()=>{const t=document.querySelector(".topbar");const l=t.querySelector(".topbar__logo img+img")||t.querySelector(".topbar__logo img");const r=l.getBoundingClientRect();const b=t.querySelector(".btn").getBoundingClientRect();const rv=t.querySelector(".topbar__reviews");return {bar:t.getBoundingClientRect().height,logo:[r.width,r.height],btn:[b.width,b.height],reviews:rv?getComputedStyle(rv).display:null,font:getComputedStyle(document.body).fontFamily,h1:getComputedStyle(document.querySelector("h1")).fontFamily,nr:getComputedStyle(document.querySelector(".stap__nr")).fontFamily}})())');
console.log(m);
const shot = await send('Page.captureScreenshot',{format:'png',clip:{x:0,y:0,width,height:140,scale:1}});
fs.writeFileSync(out, Buffer.from(shot.data,'base64')); ws.close(); chrome.kill(); fs.rmSync(udd,{recursive:true,force:true,maxRetries:5,retryDelay:200});
