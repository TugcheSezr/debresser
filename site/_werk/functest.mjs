// Functionele test via CDP: pill -> leadblock, dozencalculator (blok + uitklapper), checklist, en het
// Web3Forms-pad (lege submit blokkeert, gevulde submit met placeholder-key toont de foutmelding).
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const url=process.argv[2];
const KAND = [path.join(os.homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const BIN = KAND.find(p => fs.existsSync(p));   // playwright's shell staat niet op elke Mac; val terug op Chrome
if(!BIN) throw new Error('geen chrome gevonden');
const port=9800+Math.floor(Math.random()*100); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'hs-'));
const chrome=spawn(BIN,['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'],{stdio:'ignore'});
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
const ok=(naam,cond,extra='')=>console.log((cond?'OK  ':'FOUT')+' '+naam+(extra?' | '+extra:''));
// wacht tot de smooth-scroll uitgeraasd is in plaats van een vaste sleep: de pagina wordt langer
// naarmate er secties bij komen en dan haalt een vaste 900 ms het einde van de scroll niet meer.
const uitgeraasd = async (max=6000) => { let vorig=-1, gelijk=0, t=0;
  while(t<max){ const y=await ev('Math.round(scrollY)'); if(y===vorig){ if(++gelijk>=2) return y; } else { gelijk=0; vorig=y; }
    await sleep(150); t+=150; } return vorig; };
// 1 pill -> leadblock
await ev(`document.getElementById('of-van').value='Hoekerstraat 3, Vlaardingen';document.getElementById('of-naar').value='Pleinweg 1, Rotterdam';document.getElementById('of-woning').value='Appartement';document.querySelector('#ofForm .of-cta').click();1`);
await uitgeraasd();
ok('pill kopieert naar leadblock', await ev(`document.getElementById('lf-van').value==='Hoekerstraat 3, Vlaardingen' && document.getElementById('lf-naar').value==='Pleinweg 1, Rotterdam' && document.getElementById('lf-woning').value==='Appartement'`));
ok('pill scrolt naar #offerte', await ev(`Math.abs(document.getElementById('offerte').getBoundingClientRect().top)<200`), 'top='+await ev(`Math.round(document.getElementById('offerte').getBoundingClientRect().top)`));
// 2 calculator blok
const g0=await ev(`document.getElementById('c-getal').textContent`);
await ev(`var m=document.getElementById('c-m2');m.value=150;m.dispatchEvent(new Event('input',{bubbles:true}));1`);
const g1=await ev(`document.getElementById('c-getal').textContent`);
ok('calculator rekent live', g0!==g1 && /dozen/.test(g1), g0+' -> '+g1);
await ev(`document.getElementById('c-naar-offerte').click();1`); await uitgeraasd();
ok('calculator -> schatting in formulier', await ev(`document.getElementById('lfcalc').classList.contains('is-toegevoegd') && document.getElementById('lf-calc').getAttribute('name')==='Inschatting via dozencalculator' && /150 m/.test(document.getElementById('lf-calc').value)`), await ev(`document.getElementById('lf-calc').value`));
// 3 checklist
await ev(`document.querySelector('#kievit-verhuischecklist-0-0').click();1`); await sleep(200);
ok('checklist vinkje + teller', await ev(`document.querySelector('[data-teller]').textContent==='1 van 33 gedaan' && JSON.parse(localStorage.getItem('kievit-verhuischecklist')).taken['0-0']===true`), await ev(`document.querySelector('[data-teller]').textContent`));
await ev(`document.querySelector('.vcl-chip[data-voor="huur"]').click();1`); await sleep(200);
ok('checklist filter huur verbergt koop-items', await ev(`document.querySelector('.vcl-item[data-voor="koop"]').classList.contains('verborgen') && !document.querySelector('.vcl-item[data-voor="huur"]').classList.contains('verborgen')`), await ev(`document.querySelector('[data-teller]').textContent`));
await ev(`var d=document.querySelector('[data-verhuisdatum]');d.value='2026-10-15';d.dispatchEvent(new Event('change',{bubbles:true}));1`); await sleep(200);
ok('checklist datumlabel', await ev(`!document.querySelector('.vcl-fase[data-fase="0"] [data-datumlabel]').hidden && /Uiterlijk/.test(document.querySelector('.vcl-fase[data-fase="0"] [data-datumlabel]').textContent)`), await ev(`document.querySelector('.vcl-fase[data-fase="0"] [data-datumlabel]').textContent`));
await ev(`document.querySelector('.vcl-chip[data-voor="alles"]').click();1`);
// 4 formulier: lege submit
await ev(`document.getElementById('lf-naam').value='';document.getElementById('lf-tel').value='';document.getElementById('lf-mail').value='';document.querySelector('#lfForm button[type=submit]').click();1`); await sleep(800);
ok('lege submit: geen request', reqs.filter(r=>r.url.includes('web3forms')).length===0, 'ongeldig veld: '+await ev(`document.querySelector('#lfForm :invalid')?.name`));
// 5 formulier: gevuld
await ev(`document.getElementById('lf-naam').value='Test Persoon';document.getElementById('lf-tel').value='06 12345678';document.getElementById('lf-mail').value='test@example.com';document.querySelector('#lfForm button[type=submit]').click();1`); await sleep(5000);
const w=reqs.filter(r=>r.url.includes('web3forms')&&r.method==='POST');
ok('gevulde submit: POST naar web3forms', w.length===1, (w[0]?.postData||'').slice(0,160).replace(/\n/g,' '));
ok('placeholder-key: nette foutmelding', await ev(`!document.getElementById('lf-fout').hidden && !document.querySelector('#lfForm button[type=submit]').disabled`), await ev(`document.getElementById('lf-fout').textContent.trim().slice(0,80)`));
ok('schatting zit in de POST', /Inschatting via dozencalculator/.test(w[0]?.postData||''));
console.log('console:', cons.length?cons:'(leeg)');
ws.close(); chrome.kill(); try{fs.rmSync(udd,{recursive:true,force:true})}catch{}
