// Netwerk- en paintcheck van de hero-video: node check_video.mjs <url> <breedte> [reduced]
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const [,, url, widthArg, reduced] = process.argv; const width = +widthArg || 1440;
const KAND = [path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'), '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const BIN = KAND.find(p => fs.existsSync(p)); const port = 9300 + Math.floor(Math.random()*500); const udd = fs.mkdtempSync(path.join(os.tmpdir(), 'hv-'));
const chrome = spawn(BIN, ['--headless=new','--disable-gpu','--no-sandbox','--autoplay-policy=no-user-gesture-required',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--window-size=1440,900'], {stdio:'ignore'});
const sleep = ms => new Promise(r=>setTimeout(r,ms)); let version=null;
for (let i=0;i<50;i++){ try{ version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); break;}catch{ await sleep(200);} }
const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {method:'PUT'})).json();
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0; const pending=new Map(); const reqs=[];
ws.onmessage = e => { const m = JSON.parse(e.data); if(m.id && pending.has(m.id)){ const {res,rej}=pending.get(m.id); pending.delete(m.id); m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);} else if(m.method==='Network.requestWillBeSent'){ reqs.push({url:m.params.request.url, t:m.params.timestamp}); } };
const send = (method, params={}) => new Promise((res,rej)=>{ const i=++id; pending.set(i,{res,rej}); ws.send(JSON.stringify({id:i,method,params})); });
const ev = async (expression) => (await send('Runtime.evaluate',{expression, returnByValue:true, awaitPromise:true})).result.value;
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable'); await send('Network.setCacheDisabled',{cacheDisabled:true});
await send('Emulation.setDeviceMetricsOverride',{width, height:900, deviceScaleFactor:1, mobile: width<800});
if(reduced) await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion', value:'reduce'}]});
await send('Page.navigate',{url}); await sleep(5000);
const info = await ev(`JSON.stringify((()=>{const v=document.querySelector('.hero__video');const paint=performance.getEntriesByType('paint').map(p=>[p.name,Math.round(p.startTime)]);const res=performance.getEntriesByType('resource').filter(r=>/\\.mp4/.test(r.name)).map(r=>[r.name.split('/').pop(),Math.round(r.startTime)]);return {video:!!v, display:v?getComputedStyle(v).display:null, src:v?v.currentSrc.split('/').pop():null, paused:v?v.paused:null, tijd:v?+v.currentTime.toFixed(2):null, readyState:v?v.readyState:null, paint, mp4:res, rm:matchMedia('(prefers-reduced-motion: reduce)').matches, w:innerWidth}})())`);
const t0 = reqs.length? reqs[0].t : 0; const mp4reqs = reqs.filter(r=>/\.mp4/.test(r.url)).map(r=>r.url.split('/').pop()+' @'+Math.round((r.t-t0)*1000)+'ms');
console.log(JSON.stringify({breedte:width, reduced:!!reduced, mp4Requests:mp4reqs, ...JSON.parse(info)}));
ws.close(); chrome.kill(); fs.rmSync(udd,{recursive:true,force:true,maxRetries:5,retryDelay:200});
