// Verhuischecklist op /verhuischecklist/ (verplaatst 29-09-2026, SEC-07). Stond inline in paginas/verhuischecklist.html;
// los bestand zodat de Content-Security-Policy geen extra scripthash nodig heeft, zoals dozencalculator.js en
// m3-calculator.js. Geladen met defer (build_paginas.py, bij data-vck): het draait na het parsen, dus [data-vck],
// #vck-datum en #vck-stand bestaan al. Geen fetch, niets wordt verstuurd.
// Verhuischecklist: afvinken, datum per blok, filter huur of koop, voortgang. Alles blijft in deze browser (localStorage).
(function(){
  var root=document.querySelector('[data-vck]');if(!root)return;
  var SLEUTEL='debresser-verhuischecklist';
  var fases=[].slice.call(root.querySelectorAll('.vcl-fase')),tabs=[].slice.call(root.querySelectorAll('.vcl-tab'));
  var chips=[].slice.call(root.querySelectorAll('.vcl-chip')),items=[].slice.call(root.querySelectorAll('.vcl-item'));
  var datum=document.getElementById('vck-datum'),stand=document.getElementById('vck-stand'),balk=root.querySelector('.vcl-bar span');
  var st={af:{},datum:'',voor:'alles',fase:0};
  try{var o=JSON.parse(localStorage.getItem(SLEUTEL)||'{}');if(o&&typeof o==='object'){st.af=o.af||{};st.datum=o.datum||'';st.voor=/^(huur|koop)$/.test(o.voor)?o.voor:'alles'}}catch(e){}
  function bewaar(){try{localStorage.setItem(SLEUTEL,JSON.stringify({af:st.af,datum:st.datum,voor:st.voor}))}catch(e){}}
  var MAAND=['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
  function toonDatum(){
    var d=st.datum&&/^\d{4}-\d{2}-\d{2}$/.test(st.datum)?new Date(st.datum+'T12:00:00'):null;
    fases.forEach(function(f){
      var p=f.querySelector('.vcl-datum');
      if(!d||isNaN(d)){p.hidden=true;p.textContent='';return}
      var n=parseInt(f.getAttribute('data-dagen'),10),x=new Date(d.getTime()+n*864e5);
      var t=x.getDate()+' '+MAAND[x.getMonth()]+' '+x.getFullYear();
      p.textContent=n<0?'Vanaf '+t:(n===0?'Op '+t:'Vanaf '+t);p.hidden=false;
    });
  }
  function telling(){
    var tot=0,af=0;
    fases.forEach(function(f,i){
      var z=[].filter.call(f.querySelectorAll('.vcl-item'),function(it){return !it.classList.contains('verborgen')});
      var k=z.filter(function(it){return it.querySelector('input').checked}).length;
      tot+=z.length;af+=k;tabs[i].querySelector('.n').textContent=k+'/'+z.length;
    });
    stand.textContent=af+' van '+tot+' afgerond';
    balk.style.width=(tot?Math.round(af/tot*100):0)+'%';
  }
  function filter(){
    chips.forEach(function(c){var aan=c.getAttribute('data-voor')===st.voor;c.classList.toggle('aan',aan);c.setAttribute('aria-pressed',aan?'true':'false')});
    items.forEach(function(it){var w=it.getAttribute('data-woon');it.classList.toggle('verborgen',!!w&&st.voor!=='alles'&&w!==st.voor)});
    telling();
  }
  function toonFase(i,focus){
    st.fase=Math.max(0,Math.min(fases.length-1,i));
    fases.forEach(function(f,j){f.classList.toggle('aan',j===st.fase)});
    tabs.forEach(function(t,j){var aan=j===st.fase;t.classList.toggle('aan',aan);t.setAttribute('aria-pressed',aan?'true':'false')});
    if(focus){var h=fases[st.fase].querySelector('h3');h.setAttribute('tabindex','-1');h.focus({preventScroll:true});root.scrollIntoView({block:'start'})}
  }
  items.forEach(function(it){
    var c=it.querySelector('input'),code=it.getAttribute('data-code');
    c.checked=!!st.af[code];it.classList.toggle('klaar',c.checked);
    c.addEventListener('change',function(){if(c.checked)st.af[code]=1;else delete st.af[code];it.classList.toggle('klaar',c.checked);bewaar();telling()});
  });
  tabs.forEach(function(t,i){t.addEventListener('click',function(){toonFase(i,false)})});
  chips.forEach(function(c){c.addEventListener('click',function(){st.voor=c.getAttribute('data-voor');bewaar();filter()})});
  [].forEach.call(root.querySelectorAll('[data-stap]'),function(b){b.addEventListener('click',function(){toonFase(st.fase+parseInt(b.getAttribute('data-stap'),10),true)})});
  datum.value=st.datum;
  datum.addEventListener('change',function(){st.datum=datum.value||'';bewaar();toonDatum()});
  root.querySelector('[data-actie="print"]').addEventListener('click',function(){window.print()});
  root.querySelector('[data-actie="leeg"]').addEventListener('click',function(){
    if(!window.confirm('Alle vinkjes en de verhuisdatum wissen?'))return;
    st.af={};st.datum='';datum.value='';items.forEach(function(it){it.querySelector('input').checked=false;it.classList.remove('klaar')});bewaar();toonDatum();telling();
  });
  root.classList.add('vck-aan');
  toonDatum();filter();toonFase(0,false);
})();
