// Meet de hero-boxen op 390px met en zonder de team-cutout geladen (CLS-diagnose).
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const url=process.argv[2]; const BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9600+Math.floor(Math.random()*90); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'hs-'));
const chrome=spawn(BIN,['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--hide-scrollbars'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms)); let v=null;
for(let i=0;i<50;i++){try{v=await(await fetch(`http://127.0.0.1:${port}/json/version`)).json();break;}catch{await sleep(200);}}
const t=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();const ev2=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){const{res,rej}=p.get(m.id);p.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);}else if(m.method)ev2.push(m);};
const send=(me,pa={})=>new Promise((res,rej)=>{const i=++id;p.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:me,params:pa}));});
const ev=async x=>(await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true})).result.value;
await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:2,mobile:true});
const meet=`(()=>{const r=s=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.top),Math.round(b.width),Math.round(b.height)]};
 return JSON.stringify({hero:r('.hero'),wrap:r('.hero .wrap'),pic:r('.hero__pic'),person:r('.hero__person'),h1:r('.hero__title'),fonts:document.fonts.status,img:(()=>{const i=document.querySelector('.hero__person');return [i.complete,i.naturalWidth,i.naturalHeight]})()})})()`;
for(const blok of [['team-cutout','fonts'],['team-cutout'],['fonts'],[]]){
  await send('Network.setBlockedURLs',{urls:blok.map(b=>b==='fonts'?'*.woff2':'*'+b+'*')});
  ev2.length=0; await send('Page.navigate',{url});
  for(let i=0;i<100;i++){if(ev2.find(e=>e.method==='Page.loadEventFired'))break;await sleep(100);}
  await sleep(500);
  console.log('geblokkeerd', JSON.stringify(blok), '->', await ev(meet));
}
ws.close();chrome.kill();
