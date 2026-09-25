// Bewijst dat een CORRECT ingevuld formulier zijn POST echt afvuurt en niet door de
// (9-09-2026: de twee adressen moeten sindsdien postcode en plaats bevatten, anders houdt de
//  keuring van _werk/adresveld.py ze tegen; het gedrag daarvan staat in _werk/adrestest.mjs.)
// Gebruik: node _werk/formulierpost.mjs [basis-url]   standaard http://127.0.0.1:4740
// Basis-url meegeven als je in een tweede werkkopie zit; stond hier hard op een poort.
// Dit is de enige controle die bewijst dat het formulier ECHT verstuurt. De HTML-asserts van
// build_paginas.py blijven namelijk groen ook als /assets/js/kievit.js helemaal niet laadt.
// toegankelijkheidslaag wordt tegengehouden. Geen fetch-stub: het echte netwerkverkeer wordt
// afgevangen met de Network-domain van CDP, en web3forms.com is geblokkeerd zodat er niets
// het apparaat verlaat. requestWillBeSent vuurt voor de blokkade, dus de body is zichtbaar.
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASIS=(process.argv[2]||'http://127.0.0.1:4740').replace(/\/$/,'');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const port=9400+Math.floor(Math.random()*300); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'net-'));
const chrome=spawn(BIN,['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`],{stdio:'ignore'});
for(let i=0;i<80;i++){try{await(await fetch(`http://127.0.0.1:${port}/json/version`)).json();break}catch{await sleep(200)}}
const t=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0; const p=new Map(); let reqs=[], gefaald=[], evs=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);
  if(m.id&&p.has(m.id)){const{res,rej}=p.get(m.id);p.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result)}
  else if(m.method==='Network.requestWillBeSent')reqs.push(m.params);
  else if(m.method==='Network.loadingFailed')gefaald.push(m.params);
  else if(m.method)evs.push(m)};
const send=(me,pa={})=>new Promise((res,rej)=>{const i=++id;p.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:me,params:pa}))});
const ev=async x=>(await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true})).result.value;
await send('Page.enable'); await send('Runtime.enable');
await send('Network.enable',{maxPostDataSize:65536});
await send('Network.setBlockedURLs',{urls:['*api.web3forms.com*']});   // niets verlaat dit apparaat
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});

for(const pad of ['/','/contact/']){
  reqs=[]; gefaald=[]; evs=[];
  await send('Page.navigate',{url:BASIS+pad});
  for(let i=0;i<150;i++){if(evs.find(e=>e.method==='Page.loadEventFired'))break; await sleep(100)}
  await sleep(700);
  const route = pad==='/' ? 'build_kievit.py, nabewerking op de bron'
                          : 'build_paginas.py, formulier_toegankelijk() op de handgeschreven kopie';
  await ev(`(function(){var f=document.getElementById('lfForm');
    f.querySelector('#lf-van').value='Van Coehoornstraat 11, 5911BR Venlo';
    f.querySelector('#lf-naar').value='Stationsplein 1, 6041CX Roermond';
    f.querySelector('#lf-naam').value='Test Persoon';
    f.querySelector('#lf-tel').value='06 12345678';
    f.querySelector('#lf-mail').value='test@example.com';
    f.querySelector('button[type=submit]').click();return 1})()`);
  await sleep(2500);
  const w=reqs.filter(r=>r.request.url.includes('web3forms'));
  console.log('\n===== '+pad+'  ('+route+') =====');
  console.log('POSTs naar web3forms:', w.length);
  for(const r of w){
    console.log('  methode/url :', r.request.method, r.request.url);
    console.log('  hasPostData :', r.request.hasPostData);
    const body=(r.request.postData||'');
    const velden=[...body.matchAll(/name="([^"]+)"\r?\n\r?\n([^\r\n]*)/g)].map(m=>m[1]+'='+m[2]);
    console.log('  body-velden :', velden.join(' | '));
    console.log('  body-bytes  :', body.length);
  }
  const f=gefaald.filter(x=>reqs.find(r=>r.requestId===x.requestId&&r.request.url.includes('web3forms')));
  console.log('  geblokkeerd :', f.map(x=>x.blockedReason||x.errorText).join(', ')||'(niet geblokkeerd)');
  console.log('  foutenlijst zichtbaar na verzendpoging:', await ev(`(function(l){return l?!l.hidden:'weg'})(document.getElementById('lf-foutlijst'))`));
  console.log('  melding op het scherm:', await ev(`(function(x){return x&&!x.hidden?x.textContent.trim().slice(0,60):'(geen)'})(document.getElementById('lf-fout'))`));
}
ws.close(); chrome.kill(); try{fs.rmSync(udd,{recursive:true,force:true})}catch{}
process.exit(0);
