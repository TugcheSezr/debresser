// Werkt het menu echt: paneel open bij focus, drawer open/dicht, Escape, links kloppen.
// Gebruik: node _werk/navtest.mjs [basis-url]   standaard http://127.0.0.1:4740
// Die basis-url moet je meegeven als je in een tweede werkkopie zit. Tot 29-08-2026 stond de
// poort hier hard op 4740 en negeerde dit script een meegegeven argument, dus wie hem in zijn
// eigen kopie draaide toetste stilletjes de hoofdkopie en kreeg een groene uitslag over andermans
// werk. Dat is drie sessies overkomen op een avond. Zelfde patroon als _werk/stappentest.mjs.
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASIS=(process.argv[2]||'http://127.0.0.1:4740').replace(/\/$/,'');
const port=9700+Math.floor(Math.random()*200); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'hs-'));
const chrome=spawn(BIN,['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--hide-scrollbars'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms)); let v=null;
for(let i=0;i<60;i++){try{v=await(await fetch(`http://127.0.0.1:${port}/json/version`)).json();break;}catch{await sleep(200);}}
const t=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();const evs=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){const{res,rej}=p.get(m.id);p.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);}else if(m.method)evs.push(m);};
const send=(me,pa={})=>new Promise((res,rej)=>{const i=++id;p.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:me,params:pa}));});
const ev=async x=>(await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true})).result.value;
const toets=async k=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:k,code:k,windowsVirtualKeyCode:k==='Escape'?27:0});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:k,code:k});};
await send('Page.enable');await send('Runtime.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
await send('Emulation.setFocusEmulationEnabled',{enabled:true});
let fout=0; const ok=(naam,goed)=>{console.log((goed?'  ok   ':'  FOUT ')+naam); if(!goed)fout++};
for(const url of [BASIS+'/', BASIS+'/particulier-verhuizen/']){
  console.log(url);
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  evs.length=0; await send('Page.navigate',{url});
  for(let i=0;i<120;i++){if(evs.find(e=>e.method==='Page.loadEventFired'))break;await sleep(100);}
  await sleep(400);
  ok('4 menu-items', await ev(`document.querySelectorAll('.nav__links>li').length`)===4);
  await ev(`document.querySelectorAll('.nav__trigger')[0].focus()`); await sleep(250);
  ok('paneel opent bij focus', await ev(`document.querySelectorAll('.nav__links>li')[0].classList.contains('is-open')`));
  ok('aria-expanded true', await ev(`document.querySelectorAll('.nav__trigger')[0].getAttribute('aria-expanded')`)==='true');
  ok('paneel zichtbaar', await ev(`getComputedStyle(document.querySelector('.mega')).visibility`)==='visible');
  await toets('Escape'); await sleep(250);
  ok('Escape sluit paneel', !(await ev(`document.querySelectorAll('.nav__links>li')[0].classList.contains('is-open')`)));
  // drawer op mobiel
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await sleep(250);
  ok('hamburger zichtbaar', await ev(`getComputedStyle(document.getElementById('navToggle')).display`)!=='none');
  await ev(`document.getElementById('navToggle').click()`); await sleep(450);
  ok('drawer open', await ev(`document.getElementById('navDrawer').classList.contains('is-open')`));
  ok('focus in drawer', await ev(`document.getElementById('navDrawer').contains(document.activeElement)`));
  ok('body vergrendeld', await ev(`document.body.style.overflow`)==='hidden');
  await toets('Escape'); await sleep(450);
  ok('Escape sluit drawer', !(await ev(`document.getElementById('navDrawer').classList.contains('is-open')`)));
  ok('body weer los', await ev(`document.body.style.overflow`)==='');
}
console.log(fout?`${fout} FOUT`:'alles ok');
ws.close();chrome.kill(); process.exit(fout?1:0);
