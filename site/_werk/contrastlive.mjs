// Tekstcontrast (WCAG 1.4.3) gemeten op de ECHT GERENDERDE pixels achter de tekst.
//
// Waarom niet uit de CSS: _werk/contrast.txt rekent kleurparen uit style.css, en een eerdere
// sweep zocht per tekstknoop de eerste voorouder met een DEKKENDE achtergrondkleur. Allebei
// gaan mis zodra er beeld tussen zit. De topbalk is doorzichtig en ligt over de herofoto, dus
// die tweede methode landde op de creme body en meldde "wit op #F6F4EC = 1,1:1" op acht
// pagina's. Dat is niet wat de bezoeker ziet en het sprak de pixelmeting van de balk tegen.
//
// Methode: alle glyphs onzichtbaar maken (kleur transparant, layout blijft identiek), de hele
// pagina fotograferen, die foto in een canvas leggen en per tekstknoop ALLE pixels onder zijn
// rechthoek bemonsteren. Gerapporteerd wordt de SLECHTSTE pixel, niet het gemiddelde, want een
// letter die toevallig op een lichte plek in de foto valt is het probleem.
//
// Let op: [data-reveal]-blokken staan op opacity:0 tot ze in beeld komen, en dan tekent de
// browser ook hun ACHTERGROND niet. Zonder die blokken zichtbaar te forceren bemonster je de
// body eronder en meld je creme-op-creme. Bij de ijking gaf dat 569 verzonnen treffers.
//
// Gebruik: node site/_werk/contrastlive.mjs [basis-URL] [breedte]
//          node site/_werk/contrastlive.mjs http://127.0.0.1:4740 1440
//          extra vlag --geenband zet .topbar::before uit; dat is de IJKING, want dan MOET de
//          balk zakken. Een sweep die alleen groen kan zeggen bewijst niets.
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const BASIS=(process.argv.find(a=>a.startsWith('http'))||'http://127.0.0.1:4740').replace(/\/$/,'');
const BREEDTE=+(process.argv.find(a=>/^\d+$/.test(a))||1440);
const GEENBAND=process.argv.includes('--geenband');
const BIN='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9600+Math.floor(Math.random()*300); const udd=fs.mkdtempSync(path.join(os.tmpdir(),'cl-'));
const chrome=spawn(BIN,['--headless=new','--disable-gpu','--no-sandbox','--force-device-scale-factor=1',
  `--remote-debugging-port=${port}`,`--user-data-dir=${udd}`,'--hide-scrollbars'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
for(let i=0;i<60;i++){try{await(await fetch(`http://127.0.0.1:${port}/json/version`)).json();break;}catch{await sleep(200);}}
const t=await(await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0;const p=new Map();const ev2=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){const{res,rej}=p.get(m.id);p.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result);}else if(m.method)ev2.push(m);};
const send=(me,pa={})=>new Promise((res,rej)=>{const i=++id;p.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:me,params:pa}));});
const ev=async x=>(await send('Runtime.evaluate',{expression:x,returnByValue:true,awaitPromise:true})).result.value;
await send('Page.enable');await send('Runtime.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});

const PAGINAS=['/','/diensten/','/particulier-verhuizen/','/contact/','/over-ons/','/duurzaamheid/',
  '/m3-calculator/','/veelgestelde-vragen/','/verhuischecklist/','/inpaktips/','/klantervaringen/','/werkwijze/'];
let totaalFout=0, totaalKnopen=0; const regels=[];
for(const pad of PAGINAS){
  await send('Emulation.setDeviceMetricsOverride',{width:BREEDTE,height:900,deviceScaleFactor:1,mobile:false});
  ev2.length=0; await send('Page.navigate',{url:BASIS+pad});
  for(let i=0;i<150;i++){if(ev2.find(e=>e.method==='Page.loadEventFired'))break;await sleep(100);}
  await sleep(700);
  // Het venster op paginahoogte zetten VOOR we de rechthoeken opmeten. De foto wordt in datzelfde
  // venster gemaakt, en de site gebruikt vh-maten (de hero is min-height:min(92vh,860px)), dus
  // meten op 900px hoog en fotograferen op 14000px hoog geeft twee verschillende layouts en dus
  // rechthoeken die naast de foto liggen. Bij de ijking leverde dat wit-op-wit van 1,00:1 op.
  const vol=await ev(`Math.min(document.documentElement.scrollHeight,16000)`);
  await send('Emulation.setDeviceMetricsOverride',{width:BREEDTE,height:vol,deviceScaleFactor:1,mobile:false});
  await sleep(500);
  if(GEENBAND) await ev(`(()=>{const s=document.createElement('style');s.id='ijk';s.textContent='.topbar::before{display:none!important}';document.head.appendChild(s);})()`);
  // 1. tekstknopen inventariseren (rechthoeken in documentcoordinaten)
  const knopen=JSON.parse(await ev(`(()=>{
    const uit=[]; const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    for(let n=w.nextNode();n;n=w.nextNode()){
      const tx=n.nodeValue.trim(); if(!tx) continue;
      const el=n.parentElement; if(!el) continue;
      if(!el.closest('.topbar')) continue;   // zie kop: deze sweep meet de topbalk over de herofoto
      const cs=getComputedStyle(el);
      if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0) continue;
      const m=cs.color.match(/[\\d.]+/g); if(!m) continue;
      const a=m.length>3?+m[3]:1; if(a<0.99) continue;
      const r=document.createRange(); r.selectNodeContents(n);
      for(const q of r.getClientRects()){
        if(q.width<2||q.height<2) continue;
        uit.push({t:tx.slice(0,40),kleur:[+m[0],+m[1],+m[2]],
          px:+cs.fontSize.replace('px',''),gew:cs.fontWeight,
          x:Math.round(q.left+scrollX),y:Math.round(q.top+scrollY),
          b:Math.round(q.width),h:Math.round(q.height)});
      }
    }
    return JSON.stringify(uit);})()`));
  // 2. glyphs onzichtbaar, layout intact, hele pagina fotograferen
  await ev(`(()=>{const s=document.createElement('style');s.id='glyphweg';
    s.textContent='*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important}'+'[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}';
    document.head.appendChild(s);})()`);
  await sleep(250);
  const shot=await send('Page.captureScreenshot',{format:'png',
    clip:{x:0,y:0,width:BREEDTE,height:vol,scale:1}});
  await ev(`document.getElementById('glyphweg')?.remove()`);
  // 3. foto in een canvas, per knoop de SLECHTSTE pixel onder zijn rechthoek
  const uitslag=JSON.parse(await ev(`(async()=>{
    const im=new Image(); im.src='data:image/png;base64,${shot.data}';
    await im.decode();
    const c=document.createElement('canvas'); c.width=im.width; c.height=im.height;
    c.getContext('2d').drawImage(im,0,0);
    const ctx=c.getContext('2d');
    const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
    const lum=q=>0.2126*f(q[0])+0.7152*f(q[1])+0.0722*f(q[2]);
    const ratio=(a,b)=>{const l1=lum(a),l2=lum(b);return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)};
    const knopen=${JSON.stringify(knopen)};
    const uit=[];
    for(const k of knopen){
      if(k.y+k.h>c.height||k.x+k.b>c.width) continue;
      const d=ctx.getImageData(k.x,k.y,k.b,k.h).data;
      let slechtste=99, slechtstePixel=null;
      for(let i=0;i<d.length;i+=4){
        const q=[d[i],d[i+1],d[i+2]];
        const r=ratio(k.kleur,q);
        if(r<slechtste){slechtste=r; slechtstePixel=q;}
      }
      const groot=(k.px>=24)||(k.px>=18.66&&+k.gew>=700);
      const eis=groot?3:4.5;
      uit.push({t:k.t,r:+slechtste.toFixed(2),eis,groot,kleur:k.kleur,achter:slechtstePixel,px:k.px,gew:k.gew});
    }
    return JSON.stringify(uit);})()`));
  const fout=uitslag.filter(u=>u.r<u.eis);
  totaalKnopen+=uitslag.length; totaalFout+=fout.length;
  regels.push(`${fout.length?'FOUT':'ok  '} ${pad.padEnd(28)} ${String(uitslag.length).padStart(4)} tekstknopen, ${fout.length} onder de eis`);
  for(const u of fout.sort((a,b)=>a.r-b.r).slice(0,6))
    regels.push(`        ${u.r.toFixed(2)}:1 (eis ${u.eis}) rgb(${u.kleur}) op de slechtste pixel rgb(${u.achter})  ${u.px}px/${u.gew}  ${JSON.stringify(u.t)}`);
}
console.log(regels.join('\n'));
console.log(`\n${PAGINAS.length} pagina's op ${BREEDTE}px, ${totaalKnopen} tekstknopen, ${totaalFout} onder de eis${GEENBAND?'  [IJKING: band uitgezet]':''}`);
ws.close();chrome.kill();
process.exit(totaalFout?1:0);
