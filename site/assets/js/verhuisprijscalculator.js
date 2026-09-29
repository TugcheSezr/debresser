// Verhuisprijscalculator (28-09-2026), alleen op /verhuisprijscalculator/ (build_paginas.py hangt dit script aan data-vpc).
// De berekening is een port van build_quote uit de prijsmotor van De Bresser (pricing.py, versie 9 van 18 mei 2026, tarieven
// particulier 2026 inclusief btw). Alleen de onderdelen die de pagina vraagt: volume, postcodes, datum, woning, verdieping,
// verhuislift, piano, inpakservice, demontage, witgoed, dozen, opslag en afvoer. Dezelfde invoer als build_quote geeft dezelfde bedragen tot
// op de cent; toets: vergelijk met pricing.py op dezelfde invoer. Geen verzending, geen externe verzoeken.
(function(){
  'use strict';
  var R={
    manuren:65, verhuisauto:60, verhuislift:70, doos:4.5,
    opslag:{16:72.5,33:61.5,45:80}, witgoed:65, afkoppelen:35, demontage:55,
    appartement:75, begaandegrond:-50, piek:0.10, etage:0.10, piekVan:23, piekTot:36,
    inpak:22, piano:500, afvoer:55, basis:400, depot:5, kmPerCijfer:35, kmLokaal:20, perKm:1.4, vastKm:60,
    garantie:75, diesel:18, perUurPerMan:1.3, ploeg:3, minManuren:6, minUren:3, btw:0.21
  };

  // round() van Python: bij precies een half naar het even getal.
  function rond(x){var r=Math.round(x);return Math.abs(x%1)===0.5?2*Math.round(x/2):r}
  function r2(n){return rond(n*100)/100}
  function r1(n){return rond(n*10)/10}
  function cijfer(pc){var s=String(pc==null?'':pc).trim();return /^[0-9]/.test(s)?+s[0]:null}
  function km(van,naar){
    var a=cijfer(van),b=cijfer(naar);
    if(a===null&&b===null)return R.vastKm*2;
    var d1=a!==null?Math.abs(a-R.depot)*R.kmPerCijfer+R.kmLokaal:R.kmLokaal;
    var d2=a!==null&&b!==null?Math.abs(a-b)*R.kmPerCijfer+R.kmLokaal:R.kmLokaal;
    var d3=b!==null?Math.abs(b-R.depot)*R.kmPerCijfer+R.kmLokaal:R.kmLokaal;
    return rond(d1+d2+d3);
  }
  function isoWeek(s){
    var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(s||''));if(!m)return 0;
    var d=new Date(Date.UTC(+m[1],+m[2]-1,+m[3]));
    if(d.getUTCMonth()!==+m[2]-1||d.getUTCDate()!==+m[3])return 0;
    var dag=d.getUTCDay()||7;d.setUTCDate(d.getUTCDate()+4-dag);
    var jan1=new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil(((d-jan1)/864e5+1)/7);
  }

  // inp heeft de vorm van de QuoteInput van pricing.py (alleen de velden hierboven).
  function berekening(inp){
    var an=inp.analysis||{},acc=an.access||{},add=inp.add_ons||{};
    var volume=Math.max(5,an.total_estimated_volume_m3||0);
    var uren=Math.max(R.minUren,Math.ceil(volume/(R.perUurPerMan*R.ploeg)));
    var manuren=Math.max(R.minManuren,uren*R.ploeg);
    var bManuren=manuren*R.manuren;
    var afstand=km(inp.pickup_postcode,inp.dropoff_postcode);
    var bundel=bManuren+uren*R.verhuisauto+afstand*R.perKm+R.basis;
    var etage=acc.pickup_floor||0,lift=acc.has_elevator===true,verhuislift=acc.needs_furniture_lift===true;
    if(etage>0&&!lift&&!verhuislift)bundel+=etage*R.etage*bManuren;
    if(inp.housing_type==='apartment')bundel+=R.appartement;
    else if(inp.housing_type==='ground_floor')bundel+=R.begaandegrond;
    // specials stil in de eerste regel; de pagina kent alleen de piano (pricing.py: piano of vleugel, 500)
    var specials=(an.special_items||[]).map(function(x){return x.name});
    bundel+=specials.length*R.piano;
    var w=isoWeek(inp.move_date);
    if(w>=R.piekVan&&w<=R.piekTot)bundel*=1+R.piek;

    var regels=[{key:'verhuizen',specials:specials,subtotaal:bundel}];
    var demontage=(an.disassembly_items||[]).length;
    if(demontage>0)regels.push({key:'demontage',aantal:demontage,subtotaal:demontage*R.demontage});
    var wg=an.white_goods||[];
    if(wg.length>0){
      var af=wg.filter(function(x){return x.needs_disconnect}).length;
      regels.push({key:'witgoed',aantal:wg.length,afkoppelen:af,subtotaal:wg.length*R.witgoed+af*R.afkoppelen});
    }
    if(verhuislift)regels.push({key:'verhuislift',subtotaal:R.verhuislift});
    if(inp.packing_service===true)regels.push({key:'inpakservice',aantal:r1(volume),subtotaal:volume*R.inpak});
    var dozen=add.boxes_for_sale||0;
    if(dozen>0)regels.push({key:'verhuisdozen',aantal:dozen,subtotaal:dozen*R.doos});
    var om3=add.storage_m3,weken=add.storage_weeks||0;
    if(om3&&weken>0){var pw=om3===45?R.opslag[45]:om3===33?R.opslag[33]:R.opslag[16];regels.push({key:'opslag',m3:om3,aantal:weken,subtotaal:weken*pw})}
    if(add.debris_removal){var av=add.debris_volume_m3||2;regels.push({key:'afvoer',aantal:av,subtotaal:av*R.afvoer})}
    regels.push({key:'garantiecertificaat',subtotaal:R.garantie});
    regels.push({key:'dieselheffing',subtotaal:R.diesel});

    var totaal=regels.reduce(function(s,r){return s+r.subtotaal},0);
    var excl=totaal/(1+R.btw);
    return {
      regels:regels.map(function(r){var k={};for(var n in r)k[n]=r[n];k.subtotaal=r2(r.subtotaal);return k}),
      excl:r2(excl), btw:r2(totaal-excl), totaal:r2(totaal), volume:r2(volume), afstand:afstand
    };
  }

  if(typeof module!=='undefined'&&module.exports){module.exports=berekening;return}

  // ---------------------------------------------------------------- pagina
  var blok=document.querySelector('[data-vpc]');if(!blok)return;
  function $(id){return document.getElementById(id)}
  // leeg of onzin telt als 0; nooit negatief, nooit NaN
  function getal(id,max){var v=parseFloat(String($(id).value).replace(',','.'));return isFinite(v)&&v>0?Math.min(v,max):0}
  function heel(id,max){return Math.floor(getal(id,max))}
  var euro=new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR',maximumFractionDigits:0,minimumFractionDigits:0});
  var LABEL={verhuizen:'Verhuizing, alles inbegrepen',demontage:'Demontage',witgoed:'Witgoed',verhuislift:'Verhuislift',
    inpakservice:'Inpakservice, in- en uitpakken',verhuisdozen:'Verhuisdozen',opslag:'Opslag',afvoer:'Afvoer oud meubilair',
    garantiecertificaat:'Garantiecertificaat',dieselheffing:'Dieselheffing'};
  function uitleg(r){
    if(r.key==='verhuizen')return r.specials.length?'inclusief piano of vleugel':'';
    if(r.key==='demontage')return r.aantal+(r.aantal===1?' meubel':' meubels');
    if(r.key==='witgoed')return r.aantal+(r.aantal===1?' apparaat':' apparaten')+(r.afkoppelen?', '+r.afkoppelen+' afkoppelen':'');
    if(r.key==='inpakservice')return String(r.aantal).replace('.',',')+' m³';
    if(r.key==='verhuisdozen')return r.aantal+(r.aantal===1?' doos':' dozen');
    if(r.key==='opslag')return r.m3+' m³, '+r.aantal+(r.aantal===1?' week':' weken');
    if(r.key==='afvoer')return r.aantal+' m³';
    return '';
  }
  function invoer(){
    var wg=heel('vpc-witgoed',20),af=Math.min(heel('vpc-afkoppelen',20),wg),i,lijst=[];
    for(i=0;i<wg;i++)lijst.push({needs_disconnect:i<af});
    var dem=[];for(i=0;i<heel('vpc-demontage',50);i++)dem.push({});
    var om3=+$('vpc-opslag').value||0,afv=heel('vpc-afvoer',50);
    return {
      analysis:{total_estimated_volume_m3:getal('vpc-m3',300),disassembly_items:dem,white_goods:lijst,
        special_items:$('vpc-piano').checked?[{name:'Piano'}]:[],
        access:{pickup_floor:heel('vpc-etage',20),has_elevator:false,needs_furniture_lift:$('vpc-lift').checked}},
      pickup_postcode:$('vpc-van').value,dropoff_postcode:$('vpc-naar').value,move_date:$('vpc-datum').value,
      packing_service:$('vpc-inpak').checked,housing_type:$('vpc-woning').value,
      add_ons:{boxes_for_sale:heel('vpc-dozen',500),storage_m3:om3,storage_weeks:om3?heel('vpc-weken',104):0,
        debris_removal:afv>0,debris_volume_m3:afv}
    };
  }
  function toon(){
    var q=berekening(invoer());
    // hele euro's; de eerste regel neemt het afrondingsverschil, zodat de regels optellen tot het totaal
    var totaal=Math.round(q.totaal),rest=0,rijen=q.regels.map(function(r){var e=Math.round(r.subtotaal);rest+=e;return e});
    rijen[0]+=totaal-rest;
    $('vpc-totaal').textContent=euro.format(totaal);
    var ul=$('vpc-regels');ul.textContent='';
    q.regels.forEach(function(r,i){
      var li=document.createElement('li'),n=document.createElement('span'),b=document.createElement('b');
      n.textContent=LABEL[r.key];var u=uitleg(r);
      if(u){var s=document.createElement('small');s.textContent=u;n.appendChild(s)}
      b.textContent=euro.format(rijen[i]);li.appendChild(n);li.appendChild(b);ul.appendChild(li);
    });
    $('vpc-m3-min').hidden=!(getal('vpc-m3',300)<5);
    // de offerteknop geeft het volume alleen mee na een eigen invoer (of ?m3=) van minstens 1 m³; site.js zet het op
    // /offerte/ in de aanvraag. De beginwaarde van 25 m³ gaat dus niet mee.
    var v=r1(getal('vpc-m3',300));$('vpc-offerte').href='/offerte/'+(eigenM3&&v>=1?'?m3='+v:'')+'#offerte';
    var af=$('vpc-afkoppelen');af.max=String(heel('vpc-witgoed',20));
    $('vpc-weken-veld').hidden=!+$('vpc-opslag').value;
  }
  // ?m3= uit de m3-calculator: getal met punt, hoogstens één decimaal, 1 tot en met 300; anders negeren
  var eigenM3=false;
  var m=/^\?(?:.*&)?m3=([0-9]{1,3}(?:\.[0-9])?)(?:&|$)/.exec(location.search);
  if(m&&+m[1]>=1&&+m[1]<=300){$('vpc-m3').value=m[1];eigenM3=true;history.replaceState(null,'',location.pathname+location.hash)}
  $('vpc-m3').addEventListener('input',function(){eigenM3=true});
  blok.addEventListener('input',toon);blok.addEventListener('change',toon);
  toon();
})();
