import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const url=process.argv[2]; const BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9850+Math.floor(Math.random()*40); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'hs-'));
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
await send('Emulation.setDeviceMetricsOverride',{width:1360,height:900,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url}); for(let i=0;i<100;i++){if(ev2.find(e=>e.method==='Page.loadEventFired'))break;await sleep(100);}
await ev(`document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('in'));1`); await sleep(500);
console.log(await ev(`(()=>{const secs=[...document.querySelectorAll('main>section,body>section')];
  const r=[];
  for(let i=0;i<secs.length-1;i++){
    const a=secs[i], b=secs[i+1];
    const ab=a.getBoundingClientRect(), bb=b.getBoundingClientRect();
    // laatste zichtbare inhoud in a, eerste in b
    const laatste=[...a.querySelectorAll('*')].filter(e=>e.offsetParent!==null&&e.getBoundingClientRect().height>4).map(e=>e.getBoundingClientRect().bottom);
    const eerste=[...b.querySelectorAll('*')].filter(e=>e.offsetParent!==null&&e.getBoundingClientRect().height>4).map(e=>e.getBoundingClientRect().top);
    if(!laatste.length||!eerste.length) continue;
    const gat=Math.round(Math.min(...eerste)-Math.max(...laatste));
    r.push({van:a.id||a.className.split(' ')[0], naar:b.id||b.className.split(' ')[0], gat});
  }
  return JSON.stringify(r,null,0)})()`));
ws.close();chrome.kill();
