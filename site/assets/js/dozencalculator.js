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
    zetInAanvraag(inv,r);
  }
  // 17-11-2026: de schatting gaat mee met de aanvraag. Zodra de bezoeker iets verandert of op de knop drukt, staat de
  // actuele schatting als blok in Opmerkingen van het offerteblok op deze pagina (zelfde opzet als op pro.debresser.nl);
  // site.js neemt dat blok mee naar /offerte/. Onaangeroerd gaat er niets mee. De eigen tekst van de bezoeker blijft staan.
  var opm=document.querySelector('#offerte-aanvragen #sb-ob-opm'),mee=false,geschreven='';   // geschreven: het blok zoals dit script het de vorige keer in het veld zette
  // 18-11-2026: wat de bezoeker in het blok typte, mag niet verdwijnen als het blok opnieuw wordt geschreven. Een klik in
  // Opmerkingen komt in het blok, want het veld toont het begin ervan. Regel: dit script gooit geen tekst weg die het niet
  // zelf schreef. blokPlek zoekt het blok in het veld. Typte de bezoeker in de begin- of de eindregel zelf, dan is die regel
  // niet meer te vinden; blokPlek gaat dan uit van het blok dat het script de vorige keer schreef (g) en zoekt het deel dat
  // voor of achter de getypte tekst nog staat. Staat daartussen een streepjesregel, dan is dat het blok van een andere
  // rekenhulp: dat blijft staan. blokEigen geeft wat er sinds de vorige keer in het blok bij kwam; de aanroeper zet dat achter
  // in het veld. Zonder vorige keer (g leeg) en bij een onaangeraakt blok verandert er niets.
  function blokPlek(v, B, E, g) {
    var b = v.indexOf(B), e = v.indexOf(E, b < 0 ? 0 : b), n = 0, deel, i;
    if (b >= 0 && e >= 0) return [b, e + E.length];
    if (!g || (b < 0 && e < 0)) return null;
    if (b >= 0) {   // de eindregel is geraakt: tel hoeveel van het vorige blok er vanaf het begin nog staat
      while (n < g.length && v.charAt(b + n) === g.charAt(n)) n++;
      deel = g.slice(n); i = deel.length > 4 ? v.indexOf(deel, b + n) : -1;
      return [b, i < 0 || v.slice(b + n, i).indexOf('--- ') >= 0 ? b + n : i + deel.length];
    }
    e += E.length;   // de beginregel is geraakt: tel hoeveel van het vorige blok er voor het eind nog staat
    while (n < g.length && n < e && v.charAt(e - 1 - n) === g.charAt(g.length - 1 - n)) n++;
    deel = g.slice(0, g.length - n); i = deel.length > 4 && e - n >= deel.length ? v.lastIndexOf(deel, e - n - deel.length) : -1;
    return [i < 0 || v.slice(i + deel.length, e - n).indexOf('--- ') >= 0 ? e - n : i, e];
  }
  function blokEigen(nu, g) {
    if (!g || nu === g) return '';
    var p = 0, s = 0, max = Math.min(nu.length, g.length);
    while (p < max && nu.charAt(p) === g.charAt(p)) p++;
    while (s < max - p && nu.charAt(nu.length - 1 - s) === g.charAt(g.length - 1 - s)) s++;
    return nu.slice(p, nu.length - s).trim();
  }
  var BEGIN='--- Dozenschatting ---',EIND='--- Einde dozenschatting ---';
  var SPULLEN={licht:'weinig',gemiddeld:'gemiddeld veel',zwaar:'veel'};
  function zetInAanvraag(inv,r){
    if(!opm||!mee)return;
    var blok=BEGIN+'\nOngeveer '+r.advies+' dozen ('+r.min+' tot '+r.max+'), waarvan '+r.boeken+' boekendozen'+(r.garderobe?' en '+r.garderobe+' garderobedozen':'')
      +'. Invoer: '+inv.m2+' m², '+inv.kamers+(inv.kamers===1?' kamer, ':' kamers, ')+inv.bewoners+(inv.bewoners===1?' bewoner, ':' bewoners, ')
      +(SPULLEN[inv.pack]||SPULLEN.gemiddeld)+' spullen'+(inv.extras.length?'; veel '+inv.extras.join(', '):'')
      +'. Indicatieve schatting, geen offerte.\n'+EIND;
    var v=opm.value,plek=blokPlek(v,BEGIN,EIND,geschreven),eigen=plek?blokEigen(v.slice(plek[0],plek[1]),geschreven):'';
    var nieuw=plek?v.slice(0,plek[0])+blok+v.slice(plek[1]):v+(v?'\n\n':'')+blok;
    if(eigen)nieuw+='\n\n'+eigen;
    if(nieuw!==v)opm.value=nieuw;
    geschreven=blok;
  }
  function aan(){mee=true}
  form.addEventListener('input',aan);
  form.addEventListener('change',aan);
  $('dzc-naar-offerte').addEventListener('click',function(){mee=true;toon()});
  form.addEventListener('input',toon);
  form.addEventListener('change',toon);
  form.classList.add('dzc-form--aan');
  toon();
})();
