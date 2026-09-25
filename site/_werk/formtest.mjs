// Formuliertest via CDP: (1) lege submit -> geen fetch, geen melding; (2) gevuld -> POST naar web3forms met
// placeholder-key -> nette foutmelding met bel/mail-uitwijk. Bewijst validatie, JS-handler en het foutpad.
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const url=process.argv[2];
const BIN=path.join(os.homedir(),'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell');
const port=9800+Math.floor(Math.random()*100); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'hs-'));
const chrome=spawn(BIN,['--headless','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let v=null; for(let i=0;i<50;i++){try{v=await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();break}catch{await sleep(200)}}
const t=await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0; const pend=new Map(); const reqs=[]; const cons=[];
ws.onmessage=e=>{const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){const {res,rej}=pend.get(m.id);pend.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result)} else if(m.method==='Network.requestWillBeSent'){reqs.push(m.params.request)} else if(m.method==='Runtime.exceptionThrown'){cons.push('EXC '+JSON.stringify(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text))} else if(m.method==='Runtime.consoleAPICalled'){cons.push(m.params.type+' '+m.params.args.map(a=>a.value).join(' '))}};
const send=(method,params={})=>new Promise((res,rej)=>{const i=++id;pend.set(i,{res,rej});ws.send(JSON.stringify({id:i,method,params}))});
const ev=async(expression)=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url}); await sleep(1500);
// 1) lege submit
await ev(`document.querySelector('#offerte form button[type=submit]').click(); 1`); await sleep(800);
const n1=reqs.filter(r=>r.url.includes('web3forms')).length;
const m1=await ev(`document.querySelector('#offerte .of__melding').className+' | '+document.querySelector('#offerte .of__melding').textContent`);
console.log('leeg: web3forms-requests', n1, '| melding:', m1, '| ongeldig veld:', await ev(`document.querySelector('#offerte form :invalid')?.name`));
// 2) gevuld
await ev(`(function(){const f=document.querySelector('#offerte form');const s=(n,v)=>{f.querySelector('[name='+n+']').value=v};s('naam','Test Persoon');s('telefoon','06 12345678');s('email','test@example.com');s('van','Vlaardingen');s('naar','Rotterdam');s('datum','eind oktober');f.querySelector('[name=woning]').value='Appartement';f.querySelectorAll('[name=extras]')[0].checked=true;f.querySelectorAll('[name=extras]')[3].checked=true;s('opmerkingen','Testaanvraag, niet opvolgen.');f.querySelector('button[type=submit]').click();return 1})()`);
await sleep(5000);
const w=reqs.filter(r=>r.url.includes('web3forms'));
console.log('gevuld: web3forms-requests', w.length, w.map(r=>r.method+' '+r.url+' body='+(r.postData||'').slice(0,220)));
console.log('melding:', await ev(`document.querySelector('#offerte .of__melding').className+' | '+document.querySelector('#offerte .of__melding').textContent`));
console.log('knop weer actief:', await ev(`!document.querySelector('#offerte form button[type=submit]').disabled`));
console.log('console:', cons.length?cons:'(leeg)');
ws.close(); chrome.kill(); try{fs.rmSync(udd,{recursive:true,force:true})}catch{}
