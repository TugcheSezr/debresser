import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const [,,url,sel]=process.argv; const BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9700+Math.floor(Math.random()*200); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'hs-'));
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
for(const w of [1360,1024,900,390]){
  await send('Emulation.setDeviceMetricsOverride',{width:w,height:900,deviceScaleFactor:1,mobile:false});
  ev2.length=0; await send('Page.navigate',{url});
  for(let i=0;i<100;i++){if(ev2.find(e=>e.method==='Page.loadEventFired'))break;await sleep(100);}
  await sleep(400);
  const r=await ev(`(()=>{const e=document.querySelector('${sel}');const b=e.getBoundingClientRect();
    const i=e.querySelector('img')||e;return JSON.stringify({w:Math.round(b.width),h:Math.round(b.height),nw:i.naturalWidth,nh:i.naturalHeight,op:getComputedStyle(i).objectPosition})})()`);
  console.log(w+'px viewport ->', r);
}
ws.close();chrome.kill();
