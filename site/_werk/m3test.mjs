// Functietest m3-calculator via CDP: tabs, plus/min, typen, totalen in BEIDE kaarten, links, wis-knop.
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const url=process.argv[2]; const W=parseInt(process.argv[3]||'1440',10);
const KAND=[path.join(os.homedir(),'Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'),'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const BIN=KAND.find(p=>fs.existsSync(p)); if(!BIN) throw new Error('geen chrome');
const port=9500+Math.floor(Math.random()*100); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'mt-'));
const chrome=spawn(BIN,['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
for(let i=0;i<75;i++){try{await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();break}catch{await sleep(200)}}
const t=await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0; const pend=new Map(); const cons=[];
ws.onmessage=e=>{const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){const {res,rej}=pend.get(m.id);pend.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result)} else if(m.method==='Runtime.exceptionThrown'){cons.push('EXC '+(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text))} else if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error'){cons.push('ERR '+m.params.args.map(a=>a.value).join(' '))}};
const send=(method,params={})=>new Promise((res,rej)=>{const i=++id;pend.set(i,{res,rej});ws.send(JSON.stringify({id:i,method,params}))});
const ev=async(expression)=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:W,height:900,deviceScaleFactor:1,mobile:W<600});
await send('Page.navigate',{url}); await sleep(1500);
let fouten=0; const ok=(naam,cond,extra='')=>{if(!cond)fouten++;console.log((cond?'OK  ':'FOUT')+' '+naam+(extra?' | '+extra:''))};
const kaarten=await ev(`document.querySelectorAll('.m3sum').length`); ok('twee samenvattingskaarten', kaarten===2, 'n='+kaarten);
ok('beide totalen starten op 0', await ev(`[...document.querySelectorAll('[data-m3totaal]')].every(e=>e.textContent==='0')`));
// plus-knop woonkamer: 3-zitsbank (1,5) twee keer, dozen (0,1) tien keer via typen
await ev(`(()=>{const rij=[...document.querySelectorAll('#paneel-woonkamer .m3rij')].find(r=>r.querySelector('.m3rij__naam').textContent==='3-zitsbank');rij.querySelector('[data-stap="1"]').click();rij.querySelector('[data-stap="1"]').click();return 1})()`);
await ev(`(()=>{const rij=[...document.querySelectorAll('#paneel-woonkamer .m3rij')].find(r=>r.querySelector('.m3rij__naam').textContent==='Dozen');const i=rij.querySelector('input');i.value='10';i.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
await sleep(100);
const tot1=await ev(`[...document.querySelectorAll('[data-m3totaal]')].map(e=>e.textContent)`);
ok('2x 3-zitsbank + 10 dozen = 4 m3 in beide kaarten', tot1.length===2&&tot1.every(v=>v==='4'), JSON.stringify(tot1));
ok('kamersom-chip woonkamer', await ev(`document.querySelector('#tab-woonkamer [data-kamersom]').textContent`)==='4 m³', await ev(`document.querySelector('#tab-woonkamer [data-kamersom]').textContent`));
// tab slaapkamer, linnenkast 3-deurs (2) een keer
await ev(`document.getElementById('tab-slaapkamer').click();1`); await sleep(50);
ok('tab wisselt paneel', await ev(`!document.getElementById('paneel-slaapkamer').hidden && document.getElementById('paneel-woonkamer').hidden && document.getElementById('tab-slaapkamer').getAttribute('aria-selected')==='true'`));
await ev(`(()=>{const rij=[...document.querySelectorAll('#paneel-slaapkamer .m3rij')].find(r=>r.querySelector('.m3rij__naam').textContent==='Linnenkast 3-deurs');rij.querySelector('[data-stap="1"]').click();return 1})()`); await sleep(50);
const tot2=await ev(`[...document.querySelectorAll('[data-m3totaal]')].map(e=>e.textContent)`);
ok('totaal 6 m3 in beide kaarten', tot2.every(v=>v==='6'), JSON.stringify(tot2));
const lijsten=await ev(`[...document.querySelectorAll('[data-m3lijst]')].map(l=>({hidden:l.hidden,tekst:l.textContent.replace(/\\s+/g,' ').trim()}))`);
ok('verdeling per kamer in beide lijsten', lijsten.length===2&&lijsten.every(l=>!l.hidden&&/Woonkamer4m³/.test(l.tekst.replace(/ /g,''))&&/Slaapkamer2m³/.test(l.tekst.replace(/ /g,''))), JSON.stringify(lijsten));
ok('leeg-tekst verborgen in beide kaarten', await ev(`[...document.querySelectorAll('[data-m3leeg]')].every(e=>e.hidden)`));
const wa=await ev(`[...document.querySelectorAll('[data-m3wa]')].map(a=>a.href)`);
ok('WhatsApp-links dragen het totaal', wa.length===2&&wa.every(h=>h.includes('wa.me/31773232100')&&decodeURIComponent(h).includes('ongeveer 6 m3')), wa[0].slice(0,90));
const off=await ev(`[...document.querySelectorAll('[data-m3offerte]')].map(a=>a.getAttribute('href'))`);
// sinds 29-08 staat het offerteformulier op deze pagina zelf: de knoppen springen ernaartoe en de schatting
// gaat direct in het verborgen veld, in plaats van via ?m3= naar de homepage
ok('offerte-links wijzen naar het formulier op de pagina', off.length===2&&off.every(h=>h==='#offerte'), JSON.stringify(off));
ok('schatting staat in het verborgen veld', await ev(`document.getElementById('lf-calc').value==='Inboedel ongeveer 6 m3 volgens de m3-calculator' && document.getElementById('lf-calc').getAttribute('name')==='Inschatting via m3-calculator'`), await ev(`document.getElementById('lf-calc').value`));
// min-knop en 99-grens
await ev(`(()=>{const rij=[...document.querySelectorAll('#paneel-slaapkamer .m3rij')].find(r=>r.querySelector('.m3rij__naam').textContent==='Linnenkast 3-deurs');rij.querySelector('[data-stap="-1"]').click();rij.querySelector('[data-stap="-1"]').click();return rij.querySelector('input').value})()`);
ok('min-knop stopt op 0', await ev(`[...document.querySelectorAll('#paneel-slaapkamer .m3rij')].find(r=>r.querySelector('.m3rij__naam').textContent==='Linnenkast 3-deurs').querySelector('input').value`)==='0');
await ev(`(()=>{const i=document.querySelector('#paneel-woonkamer .m3rij input');i.value='250';i.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
ok('typen boven 99 wordt 99', await ev(`document.querySelector('#paneel-woonkamer .m3rij input').value`)==='99');
// wis-knop in het SLOTBLOK zet alles op nul
await ev(`document.querySelector('.m3sum--slot [data-m3wis]').click();1`); await sleep(50);
const tot3=await ev(`[...document.querySelectorAll('[data-m3totaal]')].map(e=>e.textContent)`);
ok('wis-knop slotkaart zet beide op 0', tot3.every(v=>v==='0'), JSON.stringify(tot3));
ok('na wissen: veld leeg en naamloos', await ev(`document.getElementById('lf-calc').value==='' && !document.getElementById('lf-calc').getAttribute('name')`), await ev(`JSON.stringify([document.getElementById('lf-calc').value,document.getElementById('lf-calc').getAttribute('name')])`));
ok('sprite-iconen in gebruik bestaan', await ev(`[...document.querySelectorAll('main use')].every(u=>document.querySelector(u.getAttribute('href')))`), await ev(`[...new Set([...document.querySelectorAll('main use')].map(u=>u.getAttribute('href')))].join(',')`));
// lazy foto's eerst eager maken en afwachten, anders meet je op mobiel een beeld dat nog niet geladen is
await ev(`(()=>{document.querySelectorAll('.blok__foto img').forEach(i=>i.loading='eager');return 1})()`);
await ev(`Promise.all([...document.querySelectorAll('.blok__foto img')].map(i=>i.complete?1:new Promise(r=>{i.onload=r;i.onerror=r}))).then(()=>1)`);
ok('twee foto\'s, geen dubbele', await ev(`(()=>{const s=[...document.querySelectorAll('.blok__foto img')].map(i=>i.currentSrc.split('/').pop());return s.length===2&&new Set(s).size===2&&s.every(x=>/^m3-/.test(x))})()`), await ev(`[...document.querySelectorAll('.blok__foto img')].map(i=>i.currentSrc.split('/').pop()+' '+i.naturalWidth+'x'+i.naturalHeight).join(', ')`));
ok('deco-iconen laden', await ev(`(document.querySelectorAll('.trust__ico img,.d4 img').forEach(i=>i.loading='eager'),Promise.all([...document.querySelectorAll('.trust__ico img,.d4 img')].map(i=>i.complete?1:new Promise(r=>{i.onload=r;i.onerror=r}))).then(()=>[...document.querySelectorAll('.trust__ico img,.d4 img')].every(i=>i.naturalWidth>0)))`));
console.log('console:', cons.length?cons:'(leeg)', '| fouten:', fouten);
ws.close(); chrome.kill(); try{fs.rmSync(udd,{recursive:true,force:true})}catch{}
