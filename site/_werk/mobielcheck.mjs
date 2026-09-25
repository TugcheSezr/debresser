import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const url=process.argv[2]; const BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9870+Math.floor(Math.random()*30); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'hs-'));
const chrome=spawn(BIN,['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--hide-scrollbars'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms)); let v=null;
for(let i=0;i<50;i++){try{v=await(await fetch(`http://127.0.0.1:${port}/json/version`)).json();break;}catch{await sleep(200);}}
const t=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();const ev2=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){const{res,rej}=p.get(m.id);p.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);}else if(m.method)ev2.push(m);};
const send=(me,pa={})=>new Promise((res,rej)=>{const i=++id;p.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:me,params:pa}));});
const ev=async x=>(await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true})).result.value;
await send('Page.enable');await send('Runtime.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
for(const w of [390,500,600,700,820,899,1024,1360]){
  await send('Emulation.setDeviceMetricsOverride',{width:w,height:900,deviceScaleFactor:1,mobile:false});
  ev2.length=0; await send('Page.navigate',{url});
  for(let i=0;i<100;i++){if(ev2.find(e=>e.method==='Page.loadEventFired'))break;await sleep(100);}
  await ev(`document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('in'));1`); await sleep(400);
  console.log(w+'px ->', await ev(`(()=>{const figs=['.ringen__duo','.vierkant__duo','.venster__persoon','.split__trio'];
    const knoppen=[...document.querySelectorAll('.btn')].map(e=>e.getBoundingClientRect()).filter(r=>r.width>4);
    const bots=[];
    for(const s of figs){const e=document.querySelector(s); if(!e) continue; const f=e.getBoundingClientRect();
      const n=knoppen.filter(b=>!(b.right<f.left+2||b.left>f.right-2||b.bottom<f.top+2||b.top>f.bottom-2)).length;
      if(n) bots.push(s+':'+n);}
    return JSON.stringify({overlap:bots.length?bots:'geen'})})()`));
}
ws.close();chrome.kill();
