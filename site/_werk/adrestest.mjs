// Bewijst het gedrag van de twee adresvelden in het offerteformulier (9-09-2026):
// keuzelijst uit PDOK, muis- en toetsenbordkeuze, de eis van postcode + plaats, de uitweg voor
// buitenland/onbekend, en wat er daadwerkelijk in de POST naar Web3Forms staat.
//
// Gebruik: node _werk/adrestest.mjs [basis-url]      standaard http://127.0.0.1:4740
// Zelfde opzet als formulierpost.mjs: echte Chrome via CDP, web3forms geblokkeerd op netwerkniveau
// zodat er niets het apparaat verlaat, en de body wordt uit requestWillBeSent gelezen (dat vuurt
// voor de blokkade). PDOK wordt WEL echt bevraagd; zonder internet faalt deze test terecht.
//
// Waarom een muisklik op coordinaten en niet element.click(): dat is tegelijk de enige controle op
// de CSS. De keuzelijst hangt absoluut onder het veld en moet boven de rest van het formulier
// liggen; wordt hij afgeknipt of afgedekt, dan wijst elementFromPoint een ander element aan.
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASIS=(process.argv[2]||'http://127.0.0.1:4740').replace(/\/$/,'');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const port=9400+Math.floor(Math.random()*300); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'adr-'));
const chrome=spawn(BIN,['--headless=new','--disable-gpu','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${udd}`],{stdio:'ignore'});
for(let i=0;i<80;i++){try{await(await fetch(`http://127.0.0.1:${port}/json/version`)).json();break}catch{await sleep(200)}}
const t=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0; const p=new Map(); let reqs=[], evs=[], excepties=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);
  if(m.id&&p.has(m.id)){const{res,rej}=p.get(m.id);p.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result)}
  else if(m.method==='Network.requestWillBeSent')reqs.push(m.params);
  else if(m.method==='Runtime.exceptionThrown')excepties.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);
  else if(m.method)evs.push(m)};
const send=(me,pa={})=>new Promise((res,rej)=>{const i=++id;p.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:me,params:pa}))});
const ev=async x=>(await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true})).result.value;

let goed=0, stuk=[];
const eis=(naam,ok,toelichting)=>{ok?goed++:stuk.push(naam);console.log(`  ${ok?'PASS':'FAIL'}  ${naam}${toelichting?'  ('+toelichting+')':''}`)};

await send('Page.enable'); await send('Runtime.enable');
await send('Network.enable',{maxPostDataSize:65536});
await send('Network.setBlockedURLs',{urls:['*api.web3forms.com*']});

async function open(pad,breed=1440,hoog=900,mobiel=false){
  reqs=[]; evs=[];
  await send('Emulation.setDeviceMetricsOverride',{width:breed,height:hoog,deviceScaleFactor:1,mobile:mobiel});
  await send('Page.navigate',{url:BASIS+pad});
  for(let i=0;i<150;i++){if(evs.find(e=>e.method==='Page.loadEventFired'))break; await sleep(100)}
  await sleep(600);
}
// Typen zoals een bezoeker: insertText geeft een echt input-event, dus de debounce en de keuring lopen mee.
// Twee keer scrollen met een pauze ertussen: het blok komt met een reveal-animatie (transform) in
// beeld, en tijdens die animatie landt scrollIntoView een paar honderd pixels naast de plek waar
// het veld daarna staat. Zonder die pauze meet je de stand van halverwege de animatie.
async function typ(id,tekst){
  const heen=`(function(){document.getElementById('${id}').scrollIntoView({block:'center'});return 1})()`;
  await ev(heen); await sleep(600); await ev(heen); await sleep(300);
  await ev(`(function(){var e=document.getElementById('${id}');e.focus();e.value='';return 1})()`);
  await send('Input.insertText',{text:tekst});
}
async function toets(key,code,windowsVirtualKeyCode){
  for(const type of ['rawKeyDown','keyUp'])await send('Input.dispatchKeyEvent',{type,key,code,windowsVirtualKeyCode,nativeVirtualKeyCode:windowsVirtualKeyCode});
}
const lijst=async id=>await ev(`(function(){var l=document.getElementById('${id}-keuzes');
  return {open:!l.hidden,n:l.children.length,eerste:l.children[0]?l.children[0].textContent:null,
          expanded:document.getElementById('${id}').getAttribute('aria-expanded')}})()`);
const waarde=async id=>await ev(`document.getElementById('${id}').value`);
const posts=()=>reqs.filter(r=>r.request.url.includes('web3forms'));
const velden=r=>[...(r.request.postData||'').matchAll(/name="([^"]+)"\r?\n\r?\n([^\r\n]*)/g)].map(m=>m[1]+'='+m[2]);
async function vulRest(){
  await ev(`(function(){var f=document.getElementById('lfForm');
    f.querySelector('#lf-naam').value='Test Persoon';
    f.querySelector('#lf-tel').value='06 12345678';
    f.querySelector('#lf-mail').value='test@example.com';return 1})()`);
}
const verzend=async()=>{await ev(`document.querySelector('#lfForm button[type=submit]').click();1`);await sleep(1200)};
const foutlijst=async()=>await ev(`(function(l){return l&&!l.hidden?l.textContent.replace(/\\s+/g,' ').trim():''})(document.getElementById('lf-foutlijst'))`);

for(const pad of ['/','/contact/']){
  console.log(`\n===== ${pad} =====`);

  // 1. keuzelijst en muiskeuze
  await open(pad);
  await typ('lf-van','5953pb 30');
  await sleep(1400);
  const l1=await lijst('lf-van');
  eis('lijst-opent-bij-postcode-huisnummer',l1.open&&l1.n===1,`${l1.n} regel(s): ${l1.eerste}`);
  eis('officiele-schrijfwijze-in-de-lijst',l1.eerste==='Oppe Brik 30, 5953PB Reuver',String(l1.eerste));
  eis('aria-expanded-staat-open',l1.expanded==='true',String(l1.expanded));
  const punt=await ev(`(function(){var li=document.getElementById('lf-van-keuze-0'),r=li.getBoundingClientRect();
    var x=Math.round(r.left+r.width/2),y=Math.round(r.top+r.height/2),el=document.elementFromPoint(x,y);
    return {x:x,y:y,raak:el===li,geraakt:el?el.tagName+'.'+el.className:'(niets, punt ligt buiten het venster)',
            inbeeld:r.top>=0&&r.bottom<=innerHeight,rect:[Math.round(r.top),Math.round(r.bottom),innerHeight]}})()`);
  eis('keuze-is-echt-aanklikbaar',punt.raak&&punt.inbeeld,
      `punt raakt ${punt.geraakt}; regel van ${punt.rect[0]} tot ${punt.rect[1]}px in een venster van ${punt.rect[2]}px`);
  for(const type of ['mousePressed','mouseReleased'])
    await send('Input.dispatchMouseEvent',{type,x:punt.x,y:punt.y,button:'left',clickCount:1});
  await sleep(300);
  eis('muisklik-vult-het-veld',await waarde('lf-van')==='Oppe Brik 30, 5953PB Reuver',await waarde('lf-van'));
  eis('lijst-dicht-na-keuze',!(await lijst('lf-van')).open);

  // 1b. een volle lijst (zes regels) moet ook helemaal zichtbaar blijven: het formulier zit in
  //     .leadblock__card met overflow:hidden, dus een te lange lijst zou onderin afgeknipt worden.
  await typ('lf-van','dorpsstraat 1');
  await sleep(1500);
  const lv=await lijst('lf-van');
  const laatste=await ev(`(function(){var l=document.getElementById('lf-van-keuzes'),li=l.children[l.children.length-1];
    if(!li)return null;var r=li.getBoundingClientRect(),x=Math.round(r.left+r.width/2),y=Math.round(r.top+r.height/2);
    var el=document.elementFromPoint(x,y);
    return {raak:el===li,geraakt:el?el.tagName+'.'+el.className:'(buiten beeld)',onder:Math.round(r.bottom),vh:innerHeight}})()`);
  eis('volle-lijst-niet-afgeknipt',lv.n>=5&&laatste&&laatste.raak,
      `${lv.n} regels, laatste raakt ${laatste&&laatste.geraakt}, onderkant op ${laatste&&laatste.onder} van ${laatste&&laatste.vh}px`);

  // 2. toetsenbordkeuze op het tweede veld, met het adres uit de klacht van 9-9
  await typ('lf-naar','huissen 25 baarlo');
  await sleep(1400);
  const l2=await lijst('lf-naar');
  eis('lijst-opent-bij-straat-plaats',l2.open&&l2.n>=1,`${l2.n} regel(s): ${l2.eerste}`);
  await toets('ArrowDown','ArrowDown',40); await sleep(120);
  eis('pijltje-markeert-een-regel',await ev(`document.getElementById('lf-naar').getAttribute('aria-activedescendant')==='lf-naar-keuze-0'`));
  await toets('Enter','Enter',13); await sleep(300);
  eis('enter-vult-het-veld',await waarde('lf-naar')==='Huissen 25, 5991PX Baarlo',await waarde('lf-naar'));

  // 3. de eis zelf: adres zonder postcode komt er niet doorheen
  await open(pad);
  await ev(`(function(){var f=document.getElementById('lfForm');
    f.querySelector('#lf-van').value='Oppe brik 30, reuver';
    f.querySelector('#lf-naar').value='Huissen 25, baarlo';return 1})()`);
  await vulRest(); await verzend();
  const tekst=await foutlijst();
  eis('zonder-postcode-geen-verzending',posts().length===0,`${posts().length} POST(s)`);
  eis('zonder-postcode-eigen-melding-per-veld',
      /adres waar u nu woont mist de postcode/.test(tekst)&&/adres waar u naartoe verhuist mist de postcode/.test(tekst),
      tekst.slice(0,150));
  eis('beide-adressen-gemarkeerd',await ev(`document.querySelectorAll('#lfForm [aria-invalid="true"]').length===2`));

  // 4. compleet adres gaat wel de deur uit, met postcode en plaats in de POST
  await open(pad);
  await ev(`(function(){var f=document.getElementById('lfForm');
    f.querySelector('#lf-van').value='Oppe Brik 30, 5953PB Reuver';
    f.querySelector('#lf-naar').value='Huissen 25, 5991PX Baarlo';return 1})()`);
  await vulRest(); await verzend();
  const w=posts();
  eis('compleet-adres-verstuurt',w.length===1,`${w.length} POST(s)`);
  if(w.length){
    const v=velden(w[0]);
    eis('postcode-en-plaats-in-de-mail',
        v.includes('Verhuizen van=Oppe Brik 30, 5953PB Reuver')&&v.includes('Verhuizen naar=Huissen 25, 5991PX Baarlo'),
        v.filter(x=>x.startsWith('Verhuizen')).join(' | '));
  }

  // 5. buitenland of nog onbekend: het vinkje haalt de eis eraf en laat de tekst staan
  await open(pad);
  await ev(`(function(){var f=document.getElementById('lfForm');
    f.querySelector('#lf-van').value='Oppe Brik 30, 5953PB Reuver';
    f.querySelector('#lf-naar').value='Berlijn, Duitsland';return 1})()`);
  await vulRest(); await verzend();
  eis('buitenland-zonder-vinkje-geblokkeerd',posts().length===0,`${posts().length} POST(s)`);
  await ev(`(function(){var v=document.getElementById('lf-geenadres');v.checked=true;
    v.dispatchEvent(new Event('change',{bubbles:true}));return 1})()`);
  await verzend();
  const w2=posts();
  eis('buitenland-met-vinkje-verstuurt',w2.length===1,`${w2.length} POST(s)`);
  if(w2.length){
    const v=velden(w2[0]);
    eis('vinkje-en-tekst-staan-in-de-mail',
        v.includes('Verhuizen naar=Berlijn, Duitsland')&&v.includes('Bestemming onbekend of buitenland=ja'),
        v.filter(x=>/Verhuizen naar|Bestemming/.test(x)).join(' | '));
  }
}

// 6. mobiel: de lijst moet ook op 390px onder het veld passen en aanklikbaar zijn
console.log('\n===== / op 390x844 (mobiel) =====');
await open('/',390,844,true);
await typ('lf-van','5953pb 30');
await sleep(1400);
const lm=await lijst('lf-van');
eis('lijst-opent-op-mobiel',lm.open&&lm.n===1,`${lm.n} regel(s)`);
const pm=await ev(`(function(){var li=document.getElementById('lf-van-keuze-0'),r=li.getBoundingClientRect();
  var x=Math.round(r.left+r.width/2),y=Math.round(r.top+r.height/2),el=document.elementFromPoint(x,y);
  return {raak:el===li,geraakt:el?el.tagName+'.'+el.className:'(niets, punt ligt buiten het venster)',
          breed:Math.round(r.width),binnen:r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight,
          rect:[Math.round(r.top),Math.round(r.bottom),innerHeight]}})()`);
eis('lijst-past-en-is-raakbaar-op-mobiel',pm.raak&&pm.binnen,
    `${pm.breed}px breed, punt raakt ${pm.geraakt}, regel van ${pm.rect[0]} tot ${pm.rect[1]}px in een venster van ${pm.rect[2]}px`);

// 7. de pill in de hero geeft zijn waarde door en die wordt daarna aangevuld
console.log('\n===== offertepill in de hero =====');
await open('/');
await typ('of-van','5953pb 30');
await ev(`document.querySelector('#ofForm button[type=submit]').click();1`);
await sleep(1800);
eis('pill-waarde-wordt-aangevuld',await waarde('lf-van')==='Oppe Brik 30, 5953PB Reuver',await waarde('lf-van'));

eis('geen-uitzonderingen-in-de-console',excepties.length===0,excepties.join(' | ').slice(0,160));
console.log(`\n${goed} goed, ${stuk.length} fout${stuk.length?': '+stuk.join(', '):''}`);
ws.close(); chrome.kill(); try{fs.rmSync(udd,{recursive:true,force:true})}catch{}
process.exit(stuk.length?1:0);
