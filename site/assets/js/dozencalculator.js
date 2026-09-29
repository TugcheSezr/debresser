// Dozencalculator op /dozencalculator/ (28-09-2026). Zelfde rekenkern als de dozenschatting in het offerteformulier
// (site.js, #lfcalc), zodat de knop naar /offerte/ daar hetzelfde getal toevoegt. Los bestand in plaats van inline, zodat
// de Content-Security-Policy geen extra scripthash nodig heeft. Geen fetch, geen formulier, niets wordt verstuurd.
// De invoer staat in een div, niet in een form: er is niets om te versturen, ook niet met Enter.
// Leeg of onzin telt als 0; negatief wordt 0; hoogstens 9999, zodat er nooit NaN of Infinity op het scherm komt.
(function(){
  var FACTOR={licht:.35,gemiddeld:.5,zwaar:.65},KAMER={licht:6,gemiddeld:9,zwaar:12},BEWONER={licht:3,gemiddeld:5,zwaar:7};
  var PRIJS=4.5; // verhuisdoos, per stuk inclusief btw (tarieven particulier 2026)
  var clamp=function(n,a,b){return Math.max(a,Math.min(b,n))};
  function getal(v){var n=Math.round(parseFloat(String(v==null?'':v).replace(',','.')));return isFinite(n)?clamp(n,0,9999):0}
  function bereken(inv){
    var pack=FACTOR[inv.pack]?inv.pack:'gemiddeld';
    var basis=inv.m2*FACTOR[pack]+inv.kamers*KAMER[pack]+inv.bewoners*BEWONER[pack];
    var TOESLAG={boeken:4*inv.bewoners,kleding:2.5*inv.bewoners,hobby:3*inv.bewoners,bergruimte:.08*inv.m2};
    inv.extras.forEach(function(k){basis+=TOESLAG[k]||0});
    var min=Math.round(clamp(basis*.9,5,300)),max=Math.round(clamp(basis*1.15,8,400)),ruw=(min+max)/2;
    var advies=ruw>=50?Math.round(ruw/5)*5:Math.round(ruw);
    return {advies:advies,min:min,max:max,boeken:Math.max(1,Math.round(advies*.25)),
      garderobe:inv.extras.indexOf('kleding')>-1?Math.max(1,Math.round(inv.bewoners*1.5)):0,euro:Math.round(advies*PRIJS)};
  }
  if(typeof document==='undefined'){if(typeof module!=='undefined')module.exports={bereken:bereken,getal:getal};return}
  var form=document.getElementById('dzc-form');
  if(!form)return;
  var $=function(id){return document.getElementById(id)};
  function lees(){
    return {m2:getal($('dzc-m2').value),kamers:getal($('dzc-kamers').value),bewoners:getal($('dzc-bewoners').value),
      pack:$('dzc-pack').value,extras:[].slice.call(form.querySelectorAll('input[type=checkbox]:checked')).map(function(c){return c.value})};
  }
  function toon(){
    var inv=lees(),r=bereken(inv);
    $('dzc-advies').textContent=r.advies;
    $('dzc-marge').textContent=r.min+' tot '+r.max;
    $('dzc-boeken').textContent=r.boeken;
    $('dzc-garderobe').textContent=r.garderobe;
    $('dzc-garderobe-rij').hidden=!r.garderobe;
    $('dzc-euro').textContent=r.euro.toLocaleString('nl-NL');
    var q='m2='+inv.m2+'&kamers='+inv.kamers+'&bewoners='+inv.bewoners+'&pack='+encodeURIComponent(FACTOR[inv.pack]?inv.pack:'gemiddeld')
      +(inv.extras.length?'&extras='+encodeURIComponent(inv.extras.join(',')):'');
    $('dzc-naar-offerte').href='/offerte/?'+q+'#offerte';
  }
  form.addEventListener('input',toon);
  form.addEventListener('change',toon);
  form.classList.add('dzc-form--aan');
  toon();
})();
