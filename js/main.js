// Markeer dat JavaScript aan staat, zodat de CSS de reveal-animaties kan klaarzetten.
document.documentElement.className += ' js';

document.addEventListener('DOMContentLoaded', function () {

// Hero-video: bron pas zetten als hij echt getoond wordt (desktop, geen reduced-motion), 1280-versie tot 1280px breed.
// WCAG 2.2.2: de film duurt 35 s en herhaalt zichzelf, dus er hoort een knop bij om hem stop te zetten.
(function(){var v=document.querySelector('.hero__video'),k=document.getElementById('heroVideoKnop');if(!v)return;var mq=matchMedia('(min-width:761px) and (prefers-reduced-motion:no-preference)');function toon(){if(!k)return;k.hidden=!mq.matches||!v.src;}function start(){if(!mq.matches||v.src)return;v.src=v.dataset[innerWidth>1280?'src':'srcKlein'];v.play().catch(function(){});toon();}if(k)k.addEventListener('click',function(){var uit=!v.paused;if(uit)v.pause();else v.play().catch(function(){});k.setAttribute('aria-pressed',uit?'true':'false');k.querySelector('.hero__videoknop__lbl').textContent=uit?'Film afspelen':'Film pauzeren';k.querySelector('svg').innerHTML=uit?'<path d=\'M2 1l9 6-9 6z\'/>':'<rect x=\'1\' y=\'1\' width=\'3.5\' height=\'12\' rx=\'1\'/><rect x=\'7.5\' y=\'1\' width=\'3.5\' height=\'12\' rx=\'1\'/>';});if(document.readyState==='complete')start();else addEventListener('load',start);mq.addEventListener('change',function(){start();toon();});})();
// Topbar wordt solide zodra je voorbij de hero scrolt; reveal per element en per groep (Feitsma-patroon).
(function(){
  var bar=document.getElementById('topbar');
  var onScroll=function(){bar.classList.toggle('is-stuck',window.scrollY>40)};
  onScroll();addEventListener('scroll',onScroll,{passive:true});
  var hero=document.querySelectorAll('.hero [data-reveal]');
  requestAnimationFrame(function(){hero.forEach(function(e){e.classList.add('in')})});
  var rest=[].slice.call(document.querySelectorAll('[data-reveal]')).filter(function(e){return !e.closest('.hero')});
  var groepen=[].slice.call(document.querySelectorAll('[data-reveal-groep]'));
  if(!('IntersectionObserver' in window)){rest.forEach(function(e){e.classList.add('in')});groepen.forEach(function(g){[].forEach.call(g.children,function(k){k.classList.add('in')})});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.16,rootMargin:'0px 0px -8% 0px'});
  rest.forEach(function(e){io.observe(e)});
  var ioG=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;[].forEach.call(x.target.children,function(k,i){k.style.transitionDelay=Math.min(i*70,560)+'ms';k.classList.add('in')});ioG.unobserve(x.target)})},{threshold:0,rootMargin:'0px 0px -6% 0px'});
  groepen.forEach(function(g){ioG.observe(g)});
})();

// Hero-kop: "Geweldig in" wisselt tussen verhuizen, opslag en logistiek, net als op debresser.nl.
// Bij reduced motion blijft het eerste woord gewoon staan.
(function(){
  var el=document.querySelector('.hero__wissel');if(!el)return;
  var woorden=(el.dataset.woorden||'').split('|').filter(Boolean);if(woorden.length<2)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var i=0;
  setInterval(function(){
    el.classList.add('is-weg');
    setTimeout(function(){i=(i+1)%woorden.length;el.textContent=woorden[i];el.classList.remove('is-weg')},260);
  },2600);
})();

// 3D-tilt op de CTA-kaart boven de footer ([data-tilt]), overgenomen uit github.com/OranjeLift-Tech/debresser.
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  function bindTilt(el) {
    var max = parseFloat(el.getAttribute('data-tilt')) || 8;
    var raf = null;
    el.addEventListener('pointermove', function (e) {
      if (!finePointer.matches || reduceMotion.matches) return;
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        el.style.setProperty('--ry', ((px - .5) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((.5 - py) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
    });
    el.addEventListener('pointerleave', function () {
      if (raf) cancelAnimationFrame(raf);
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }
  document.querySelectorAll('[data-tilt]').forEach(bindTilt);
})();

// Offerte-pill bovenin: waarden overzetten naar het formulier onderaan en erheen springen (Feitsma).
// Staat er geen formulier op de pagina (homepage De Bresser), dan gaat de pill gewoon naar offerte.html.
(function(){
  var top=document.getElementById('ofForm');if(!top)return;
  var map=[['of-van','lf-van'],['of-naar','lf-naar'],['of-datum','lf-datum'],['of-woning','lf-woning']];
  top.addEventListener('submit',function(e){
    if(!document.getElementById('lfForm'))return;
    e.preventDefault();
    map.forEach(function(p){var from=document.getElementById(p[0]),to=document.getElementById(p[1]);if(from&&to&&from.value)to.value=from.value});
    var target=document.getElementById('offerte');if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
    var naam=document.getElementById('lf-naam');if(naam)setTimeout(function(){naam.focus({preventScroll:true})},600);
  });
})();

// Datum en het vinkje "weet ik nog niet" sluiten elkaar uit, in twee richtingen (Feitsma).
(function(){
  var vink=document.getElementById('lf-geendatum'),datum=document.getElementById('lf-datum');if(!vink||!datum)return;
  vink.addEventListener('change',function(){if(vink.checked)datum.value=''});
  ['input','change','focus'].forEach(function(e){datum.addEventListener(e,function(){if(vink.checked&&(e==='focus'||datum.value))vink.checked=false})});
})();

// Web3Forms: knop op slot tijdens versturen, succesblok in de plaats van het formulier, bij een fout de
// melding met bellen of mailen als uitweg (Feitsma-patroon). Key staat als hidden veld in het formulier.
(function(){
  var f=document.getElementById('lfForm');if(!f||f.dataset.w)return;f.dataset.w=1;
  var fout=document.getElementById('lf-fout');
  var lijst=document.getElementById('lf-foutlijst'), lijstUl=document.getElementById('lf-foutvelden');
  f.noValidate=true;   // pas nu uit: draait dit script niet, dan controleert de browser zelf
  var NAAM={'lf-naam':'uw naam','lf-tel':'uw telefoonnummer','lf-mail':'uw e-mailadres',
            'lf-van':'het adres waar u nu woont','lf-naar':'het adres waar u naartoe verhuist'};
  function veldnaam(el){
    if(NAAM[el.id])return NAAM[el.id];
    var v=el.closest('.lf__field'), sp=v&&v.querySelector('span');
    return sp?sp.textContent.trim().toLowerCase():'dit veld';
  }
  function melding(el){
    var v=el.validity;
    if(v.valueMissing)return 'Vul '+veldnaam(el)+' in.';
    if(v.typeMismatch&&el.type==='email')return 'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.';
    if(v.patternMismatch&&el.type==='tel')return 'Vul een telefoonnummer in van minstens acht cijfers, bijvoorbeeld 06 12 34 56 78.';
    if(v.customError)return el.validationMessage;   // adresveld.py zet die tekst
    return 'Controleer '+veldnaam(el)+'.';
  }
  function wisFouten(){
    lijst.hidden=true; lijstUl.innerHTML='';
    [].forEach.call(f.querySelectorAll('[aria-invalid="true"]'),function(el){
      el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby');});
  }
  function toonFouten(){
    wisFouten();
    var stuk=[].filter.call(f.elements,function(el){return el.willValidate&&!el.checkValidity()});
    if(!stuk.length)return true;
    stuk.forEach(function(el){
      if(!el.id)return;
      var id=el.id+'-fout', li=document.createElement('li'), a=document.createElement('a');
      li.id=id; a.href='#'+el.id; a.textContent=melding(el);
      a.addEventListener('click',function(ev){ev.preventDefault();el.focus();});
      li.appendChild(a); lijstUl.appendChild(li);
      el.setAttribute('aria-invalid','true');
      el.setAttribute('aria-describedby',id);
    });
    lijst.hidden=false; lijst.focus();
    return false;
  }
  // Herstelt iemand een fout veld, dan verdwijnt de markering van dat veld meteen.
  f.addEventListener('input',function(e){
    var el=e.target;
    if(el.getAttribute('aria-invalid')==='true'&&el.willValidate&&el.checkValidity()){
      var li=document.getElementById(el.id+'-fout'); if(li)li.remove();
      el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby');
      if(!lijstUl.children.length)lijst.hidden=true;
    }
  });
  f.addEventListener('submit',function(e){
    e.preventDefault();fout.hidden=true;
    if(!toonFouten())return;
    wisFouten();
    var b=f.querySelector('button[type=submit]'),o=b?b.innerHTML:'';
    if(b){b.disabled=true;b.textContent='Versturen...'}
    function mis(){if(b){b.disabled=false;b.innerHTML=o}fout.hidden=false}
    var d=new FormData(f);
    if(d.get('botcheck')){return}
    d.delete('botcheck');
    Array.from(d.keys()).forEach(function(k){if(!d.getAll(k).join('').trim())d.delete(k)});
    var re=f.querySelector('input[type=email]');if(re&&re.value)d.append('replyto',re.value);
    d.append('Pagina',document.title);
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Accept':'application/json'},body:d})
      .then(function(r){return r.json()})
      .then(function(res){
        if(!res.success)return mis();
        if(window.kvFormConversie)window.kvFormConversie();
        f.innerHTML='<div class="lf__done" role="status"><strong>Bedankt, uw aanvraag is verstuurd.</strong><br>Wij nemen zo snel mogelijk contact met u op. Liever direct? Bel <a href="tel:0773232100">077 - 32 32 100</a> of mail naar <a href="mailto:info@de-kievit.nl">info@de-kievit.nl</a>.</div>';
      })
      .catch(mis);
  });
})();

// Verhuisdozen-calculator, twee bedieningen op een rekenkern (1-op-1 pro.feitsma.nl).
// Rekenmodel van studentverhuisservice.nl: m2 x factor per pakgedrag + opslag per kamer en per bewoner,
// bandbreedte 0,9x tot 1,15x, advies is het midden. Extra's schalen mee met bewoners (boeken, kleding,
// hobby) of met m2 (volle berging). Boven de 50 afgerond op vijftallen.
(function(){
  var FACTOR={licht:.35,gemiddeld:.5,zwaar:.65},KAMER={licht:6,gemiddeld:9,zwaar:12},BEWONER={licht:3,gemiddeld:5,zwaar:7};
  var clamp=function(n,a,b){return Math.max(a,Math.min(b,n))};
  function bereken(inv){
    var basis=inv.m2*FACTOR[inv.pack]+inv.kamers*KAMER[inv.pack]+inv.bewoners*BEWONER[inv.pack];
    var TOESLAG={boeken:4*inv.bewoners,kleding:2.5*inv.bewoners,hobby:3*inv.bewoners,bergruimte:.08*inv.m2};
    inv.extras.forEach(function(k){basis+=TOESLAG[k]||0});
    var min=Math.round(clamp(basis*.9,5,300)),max=Math.round(clamp(basis*1.15,8,400)),ruw=(min+max)/2;
    var advies=ruw>=50?Math.round(ruw/5)*5:Math.round(ruw);
    return {advies:advies,min:min,max:max,boeken:Math.max(1,Math.round(advies*.25)),garderobe:inv.extras.indexOf('kleding')>-1?Math.max(1,Math.round(inv.bewoners*1.5)):0};
  }
  function lees(pre,wortel){
    var g=function(n,val){var e=document.getElementById(pre+n);var v=parseInt(e&&e.value,10);return isNaN(v)?val:v};
    var sel=document.getElementById(pre+'pack');
    return {m2:g('m2',90),kamers:g('kamers',3),bewoners:g('bewoners',2),pack:sel?sel.value:'gemiddeld',spullen:sel?sel.selectedOptions[0].textContent.toLowerCase():'gemiddeld',extras:Array.from(wortel.querySelectorAll('input[type=checkbox]:checked')).map(function(c){return c.value})};
  }
  function zin(inv,r){return inv.m2+' m\u00b2, '+inv.kamers+' kamer'+(inv.kamers===1?'':'s')+', '+inv.bewoners+' bewoner'+(inv.bewoners===1?'':'s')+', inboedel '+inv.spullen+(inv.extras.length?', veel '+inv.extras.join(' en '):'')+', ongeveer '+r.advies+' dozen ('+r.min+' tot '+r.max+')'}
  var verborgen=document.getElementById('lf-calc');
  function zetVerborgen(waarde){if(!verborgen)return;verborgen.value=waarde||'';if(waarde)verborgen.setAttribute('name','Inschatting via dozencalculator');else verborgen.removeAttribute('name')}
  var blok=document.querySelector('.calc__card'),laatsteBlok=null;
  if(blok){
    var toonBlok=function(){
      var inv=lees('c-',blok),r=bereken(inv);
      document.getElementById('c-getal').textContent=r.advies+' dozen';
      document.getElementById('c-bereik').textContent='reken op '+r.min+' tot '+r.max;
      document.getElementById('c-detail').textContent='Waarvan ongeveer '+r.boeken+' boekendozen'+(r.garderobe?' en '+r.garderobe+' garderobedozen':'')+'. Dit is een indicatie.';
      laatsteBlok={inv:inv,r:r};
    };
    ['input','change'].forEach(function(e){blok.addEventListener(e,function(ev){if(ev.target.matches('input,select'))toonBlok()})});
    toonBlok();
  }
  var uitklap=document.getElementById('lfcalc'),titel=document.getElementById('lfcalc-titel'),okKnop=document.getElementById('lfcalc-ok'),wisKnop=document.getElementById('lfcalc-wis');
  var STANDAARDTITEL='Ik weet nog niet hoeveel dozen ik nodig heb';
  function huidig(){var inv=lees('lf-',uitklap);return {inv:inv,r:bereken(inv)}}
  function markeer(aan,advies){uitklap.classList.toggle('is-toegevoegd',!!aan);wisKnop.hidden=!aan;okKnop.textContent=aan?'Toegevoegd':'Schatting toevoegen aan mijn aanvraag';titel.textContent=aan?'Schatting toegevoegd: ongeveer '+advies+' dozen. Klik om aan te passen.':STANDAARDTITEL}
  function toonForm(){
    if(!uitklap)return;var h=huidig();
    document.getElementById('lfcalc-uit').innerHTML='U heeft ongeveer <strong>'+h.r.advies+' dozen</strong> nodig, reken op '+h.r.min+' tot '+h.r.max+'. Waarvan ongeveer '+h.r.boeken+' boekendozen'+(h.r.garderobe?' en '+h.r.garderobe+' garderobedozen':'')+'.';
    if(uitklap.classList.contains('is-toegevoegd')){zetVerborgen('');markeer(false)}
  }
  function voegToe(sluiten){var h=huidig();zetVerborgen(zin(h.inv,h.r));markeer(true,h.r.advies);if(sluiten)uitklap.open=false}
  if(uitklap){
    ['input','change'].forEach(function(e){uitklap.addEventListener(e,function(ev){if(ev.target.matches('input,select'))toonForm()})});
    uitklap.addEventListener('toggle',function(){if(uitklap.open)toonForm()});
    okKnop.addEventListener('click',function(){voegToe(true)});
    wisKnop.addEventListener('click',function(){zetVerborgen('');markeer(false)});
    toonForm();
  }
  // Komt de bezoeker van /dozencalculator/, dan staat zijn invoer in de URL: uitklap vullen en de schatting meteen toevoegen.
  var q=new URLSearchParams(location.search);
  if(uitklap&&q.get('m2')){
    ['m2','kamers','bewoners','pack'].forEach(function(k){var el=document.getElementById('lf-'+k);if(el&&q.get(k))el.value=q.get(k)});
    var ex=(q.get('extras')||'').split(',');uitklap.querySelectorAll('input[type=checkbox]').forEach(function(c){c.checked=ex.indexOf(c.value)>-1});
    toonForm();voegToe(true);
  }
  // Komt de bezoeker van /m3-calculator/, dan staat het volume in de URL: als schatting in de aanvraag zetten.
  if(verborgen&&q.get('m3')){verborgen.value='Inboedel ongeveer '+q.get('m3')+' m3 volgens de m3-calculator';verborgen.setAttribute('name','Inschatting via m3-calculator')}
  var knop=document.getElementById('c-naar-offerte');
  if(knop)knop.addEventListener('click',function(e){
    e.preventDefault();
    if(laatsteBlok&&uitklap){
      var i=laatsteBlok.inv;
      document.getElementById('lf-m2').value=i.m2;document.getElementById('lf-kamers').value=i.kamers;document.getElementById('lf-bewoners').value=i.bewoners;document.getElementById('lf-pack').value=i.pack;
      uitklap.querySelectorAll('input[type=checkbox]').forEach(function(c){c.checked=i.extras.indexOf(c.value)>-1});
      toonForm();voegToe(true);
    }
    var doel=document.getElementById('offerte');
    if(!doel&&laatsteBlok){var i2=laatsteBlok.inv,q2=new URLSearchParams({m2:i2.m2,kamers:i2.kamers,bewoners:i2.bewoners,pack:i2.pack,extras:i2.extras.join(',')});location.href='/?'+q2.toString()+'#offerte';return}
    if(doel)doel.scrollIntoView({behavior:'smooth',block:'start'});
    var naam=document.getElementById('lf-naam');if(naam)setTimeout(function(){naam.focus({preventScroll:true})},600);
  });
})();
// Adresaanvulling op de twee offertevelden (9-09-2026). Bron: PDOK Locatieserver v3_1, open data
// van BZK/Kadaster, gratis en zonder sleutel. Typen op postcode + huisnummer geeft daar precies een
// treffer ("5953pb 30" -> "Oppe Brik 30, 5953PB Reuver"), typen op straat + plaats meestal ook.
// Aanleiding: er kwamen aanvragen binnen zonder postcode en zonder woonplaats.
// De eis zelf (postcode plus een naam in de tekst) wordt hieronder lokaal gecontroleerd, dus een
// bezoeker kan altijd verder, ook als PDOK niet antwoordt.
(function(){
  var API='https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?fq=type:adres&rows=6&q=';
  var PC=/[1-9][0-9]{3}\s?[a-z]{2}/i;
  // Per veld een eigen tekst: de foutenlijst zet ze onder elkaar, en twee keer dezelfde regel
  // vertelt de bezoeker niet welk van de twee adressen hij moet aanvullen.
  var FOUT={'lf-van':'Het adres waar u nu woont mist de postcode of de plaats. Kies uw adres uit de lijst.',
            'lf-naar':'Het adres waar u naartoe verhuist mist de postcode of de plaats. Kies het uit de lijst, of zet het vinkje bij Nog onbekend of buitenland.'};
  function compleet(v){
    var m=String(v).match(PC);
    // Postcode EN een naam ernaast: "5953PB 30" is dus niet genoeg, "Oppe Brik 30, 5953PB Reuver" wel.
    return !!m&&/[a-z]{3,}/i.test(String(v).replace(m[0],' '));
  }
  function keur(el){
    if(!el||!el.setCustomValidity)return;
    el.setCustomValidity(el.required&&el.value.trim()&&!compleet(el.value)?(FOUT[el.id]||''):'');
  }
  function haal(q,klaar){
    // "5953PB30" zonder spatie vindt PDOK niet; met een spatie ervoor wel.
    q=q.replace(/([1-9][0-9]{3})\s*([a-z]{2})\s*/i,'$1$2 ');
    fetch(API+encodeURIComponent(q),{headers:{Accept:'application/json'}})
      .then(function(r){return r.json()})
      .then(function(j){klaar(((j&&j.response&&j.response.docs)||[]).map(function(d){return d.weergavenaam}).filter(Boolean))})
      .catch(function(){klaar(null)});   // niet kunnen kijken mag een aanvraag nooit tegenhouden
  }
  // Staat er precies EEN adres tegenover wat iemand typte, dan vullen wij het zelf aan. Bij meer
  // treffers gebeurt er niets: een gok zet het verkeerde adres in de offerte.
  function aanvullen(el){
    var q=el&&el.value.trim();
    if(!q||compleet(q))return;
    haal(q,function(namen){
      if(!namen||namen.length!==1||document.activeElement===el)return;
      el.value=namen[0];keur(el);
    });
  }
  function koppel(el){
    var lijst=document.getElementById(el.id+'-keuzes');if(!lijst)return;
    var timer=null,opties=[],actief=-1;
    function sluit(){
      lijst.hidden=true;lijst.innerHTML='';opties=[];actief=-1;
      el.setAttribute('aria-expanded','false');el.removeAttribute('aria-activedescendant');
    }
    function markeer(){
      [].forEach.call(lijst.children,function(li,i){
        li.setAttribute('aria-selected',i===actief?'true':'false');
        if(i===actief){el.setAttribute('aria-activedescendant',li.id);li.scrollIntoView({block:'nearest'})}
      });
    }
    function kies(naam){el.value=naam;sluit();keur(el);el.focus()}
    function toon(namen){
      lijst.innerHTML='';opties=namen.slice(0,6);actief=-1;
      opties.forEach(function(naam,i){
        var li=document.createElement('li');
        li.id=el.id+'-keuze-'+i;li.className='lf__keuze';li.textContent=naam;
        li.setAttribute('role','option');li.setAttribute('aria-selected','false');
        // mousedown, niet click: anders is het veld al geblurd voor de keuze binnen is.
        li.addEventListener('mousedown',function(ev){ev.preventDefault();kies(naam)});
        li.addEventListener('click',function(ev){ev.preventDefault();kies(naam)});
        lijst.appendChild(li);
      });
      lijst.hidden=!opties.length;
      el.setAttribute('aria-expanded',opties.length?'true':'false');
      // Het formulier staat onderaan de pagina: staat het veld laag in beeld, dan valt de lijst
      // eronder buiten het scherm. Gemeten 9-09-2026 op 1440x900: de eerste regel begon op 903px
      // in een venster van 900. block:'nearest' schuift alleen zoveel als nodig is.
      if(opties.length)setTimeout(function(){lijst.scrollIntoView({block:'nearest'})},0);
    }
    el.addEventListener('input',function(){
      keur(el);
      var q=el.value.trim();
      clearTimeout(timer);
      if(q.length<5){sluit();return}
      timer=setTimeout(function(){
        haal(q,function(namen){
          if(document.activeElement!==el||el.value.trim()!==q)return;   // intussen verder getypt
          if(!namen||!namen.length||(namen.length===1&&namen[0]===el.value)){sluit();return}
          toon(namen);
        });
      },220);
    });
    el.addEventListener('keydown',function(e){
      if(lijst.hidden||!opties.length)return;
      var k=e.key;
      if(k==='ArrowDown'||k==='Down'){e.preventDefault();actief=(actief+1)%opties.length;markeer()}
      else if(k==='ArrowUp'||k==='Up'){e.preventDefault();actief=actief<1?opties.length-1:actief-1;markeer()}
      else if(k==='Enter'&&actief>-1){e.preventDefault();kies(opties[actief])}
      else if(k==='Escape'||k==='Esc'){sluit()}
    });
    el.addEventListener('blur',function(){setTimeout(sluit,150);aanvullen(el)});
    keur(el);
  }
  var van=document.getElementById('lf-van'),naar=document.getElementById('lf-naar');
  if(van)koppel(van);
  if(naar)koppel(naar);

  // Het vinkje bij "Naar" haalt de eis van dat veld af, voor wie nog geen bestemming heeft of naar
  // het buitenland verhuist (daar past geen Nederlandse postcode bij). De getypte tekst blijft
  // staan, want juist bij het buitenland is dat de enige informatie die er is. Vult iemand daarna
  // alsnog een compleet Nederlands adres in, dan gaat het vinkje vanzelf uit.
  var vink=document.getElementById('lf-geenadres');
  if(vink&&naar){
    var zet=function(){naar.required=!vink.checked;keur(naar)};
    vink.addEventListener('change',zet);
    naar.addEventListener('input',function(){if(vink.checked&&compleet(naar.value)){vink.checked=false;zet()}});
    zet();
  }

  // De pill in de hero zet zijn waarden in dit formulier; die zijn dan nog niet aangevuld.
  var pill=document.getElementById('ofForm');
  if(pill)pill.addEventListener('submit',function(){setTimeout(function(){aanvullen(van);aanvullen(naar)},0)});

  // Vangnet: een waarde die NIET door de bezoeker is getypt (de pill, autofill van de browser,
  // terug in de geschiedenis) geeft geen input-event, dus is er dan ook niet gekeurd. Deze
  // luisteraar staat in de capture-fase op het document en gaat daarmee voor de submit-handler
  // van het formulier zelf uit, ongeacht in welke volgorde de scripts zijn ingeladen.
  document.addEventListener('submit',function(e){
    if(e.target&&e.target.id==='lfForm'){keur(van);keur(naar)}
  },true);
})();
// Navigatie: mega-menu op desktop, uitschuifmenu op mobiel (opzet feitsma.nl).
(function(){
  var items=[].slice.call(document.querySelectorAll('.nav__links li.has-mega'));
  var timer=null;
  function zet(li,open){
    li.classList.toggle('is-open',open);
    var knop=li.querySelector('.nav__trigger');
    if(knop)knop.setAttribute('aria-expanded',open?'true':'false');
    if(open)items.forEach(function(a){if(a!==li)zet(a,false)});
  }
  function sluitAlles(){items.forEach(function(li){zet(li,false)})}
  items.forEach(function(li){
    li.addEventListener('mouseenter',function(){clearTimeout(timer);zet(li,true)});
    li.addEventListener('mouseleave',function(){timer=setTimeout(function(){zet(li,false)},140)});
    li.addEventListener('focusin',function(){clearTimeout(timer);zet(li,true)});
    li.addEventListener('focusout',function(e){if(!li.contains(e.relatedTarget))zet(li,false)});
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.nav__links'))sluitAlles()});

  var drawer=document.getElementById('navDrawer'),knop=document.getElementById('navToggle');
  var dicht=document.getElementById('navClose'),scrim=document.getElementById('navScrim');
  var paneel=drawer&&drawer.querySelector('.drawer__panel'),vorige=null;
  function focusbaar(){
    if(!paneel)return[];
    return [].slice.call(paneel.querySelectorAll('a[href],button:not([disabled]),summary,[tabindex]:not([tabindex="-1"])'))
      .filter(function(e){return e.getClientRects().length>0});
  }
  function zetDrawer(open){
    if(!drawer)return;
    drawer.classList.toggle('is-open',open);
    drawer.setAttribute('aria-hidden',open?'false':'true');
    document.body.classList.toggle('drawer-open',open);
    document.body.style.overflow=open?'hidden':'';
    if(knop)knop.setAttribute('aria-expanded',open?'true':'false');
    if(open){vorige=document.activeElement;if(dicht)dicht.focus()}
    else if(vorige){vorige.focus();vorige=null}
  }
  if(knop)knop.addEventListener('click',function(){zetDrawer(true)});
  if(dicht)dicht.addEventListener('click',function(){zetDrawer(false)});
  if(scrim)scrim.addEventListener('click',function(){zetDrawer(false)});
  if(drawer)drawer.addEventListener('click',function(e){if(e.target.closest('a'))zetDrawer(false)});
  document.addEventListener('keydown',function(e){
    if(e.key==='Tab'&&drawer&&drawer.classList.contains('is-open')){
      var f=focusbaar();if(!f.length)return;
      var eerste=f[0],laatste=f[f.length-1];
      if(e.shiftKey&&(document.activeElement===eerste||!paneel.contains(document.activeElement))){e.preventDefault();laatste.focus()}
      else if(!e.shiftKey&&document.activeElement===laatste){e.preventDefault();eerste.focus()}
      return;
    }
    if(e.key!=='Escape')return;
    sluitAlles();
    if(drawer&&drawer.classList.contains('is-open'))zetDrawer(false);
  });
  addEventListener('resize',function(){if(innerWidth>1080&&drawer&&drawer.classList.contains('is-open'))zetDrawer(false)});
})();

// Formulieren op de subpagina's (offerte, contact, vacatures): versturen naar api/verzend.php zonder de pagina te verlaten.
// Buiten een webserver (file://) werkt PHP niet; dan opent het e-mailprogramma met de ingevulde gegevens.
(function(){
  document.querySelectorAll('form.db-form').forEach(function(form){
    var melding=form.querySelector('.db-form__melding');
    function zeg(tekst,fout){if(!melding)return;melding.hidden=false;melding.textContent=tekst;melding.classList.toggle('is-fout',!!fout)}
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!form.reportValidity())return;
      var knop=form.querySelector('button[type=submit]');
      if(location.protocol==='file:'){
        var regels=[];new FormData(form).forEach(function(v,k){if(typeof v==='string'&&v&&k!=='website_url')regels.push(k+': '+v)});
        location.href='mailto:info@debresser.nl?subject='+encodeURIComponent(form.dataset.form||'Formulier website')+'&body='+encodeURIComponent(regels.join('\n'));
        return;
      }
      if(knop)knop.disabled=true;
      fetch(form.action,{method:'POST',body:new FormData(form)})
        .then(function(r){return r.json()})
        .then(function(d){if(d&&d.ok){form.querySelectorAll('input:not([type=hidden]),select,textarea').forEach(function(el){if(el.type==='checkbox'||el.type==='radio')el.checked=false;else el.value=''});zeg('Bedankt voor uw bericht! Wij nemen zo snel mogelijk contact met u op.')}else zeg((d&&d.bericht)||'Het versturen is niet gelukt. Bel ons op +31 (0)13 52 82 372 of mail naar info@debresser.nl.',true)})
        .catch(function(){zeg('Het versturen is niet gelukt. Bel ons op +31 (0)13 52 82 372 of mail naar info@debresser.nl.',true)})
        .then(function(){if(knop)knop.disabled=false});
    });
  });
})();


// Contact, Locaties: wereldbol (MapLibre, globe-projectie) in plaats van de platte NL-afbeelding.
// Overgenomen uit github.com/OranjeLift-Tech/debresser (main.js blok 17a): de bol draait even,
// draait naar Europa en vliegt naar de vestigingen. Kaartjes rechts en pinnen lichten samen op;
// klik op een kaartje vliegt ernaartoe. Geen WebGL of MapLibre laadt niet: de afbeelding blijft staan.
(function(){
  var fig=document.querySelector('[data-db-bol]');if(!fig)return;
  var sectie=fig.closest('section');
  var PLAATS={oisterwijk:[5.19253,51.58260],tilburg:[5.01356,51.58918],breda:[4.75461,51.60675],venlo:[6.18544,51.38918],reeuwijk:[4.71758,52.04074],brussel:[4.41736,50.87354]};
  var NR={oisterwijk:'01',tilburg:'02',breda:'03',venlo:'04',reeuwijk:'05',brussel:'06'};
  var ESRI='https://server.arcgisonline.com/ArcGIS/rest/services/';
  var MAPLIBRE='https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/';
  var START={center:[-40,30],zoom:0.9};
  var reduce=matchMedia('(prefers-reduced-motion: reduce)');
  var ICOON={alle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',wereld:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.1 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.1-3.6-8.5S9.6 5.8 12 3.5z"/></svg>'};
  try{if(!(window.WebGL2RenderingContext&&document.createElement('canvas').getContext('webgl2')))return}catch(e){return}
  var items=[].slice.call(sectie.querySelectorAll('[data-loc]'));

  function laad(klaar){
    if(window.maplibregl)return klaar();
    var l=document.createElement('link');l.rel='stylesheet';l.href=MAPLIBRE+'maplibre-gl.css';document.head.appendChild(l);
    var s=document.createElement('script');s.src=MAPLIBRE+'maplibre-gl.js';s.onload=klaar;document.head.appendChild(s);
  }

  function bouw(){
    var ml=window.maplibregl,box=document.createElement('div');
    box.className='db-bol__kaart is-bol';
    box.setAttribute('aria-label','Kaart met de vestigingen van De Bresser');
    fig.appendChild(box);
    var bbox=[[180,90],[-180,-90]];
    Object.keys(PLAATS).forEach(function(id){var p=PLAATS[id];bbox[0][0]=Math.min(bbox[0][0],p[0]);bbox[0][1]=Math.min(bbox[0][1],p[1]);bbox[1][0]=Math.max(bbox[1][0],p[0]);bbox[1][1]=Math.max(bbox[1][1],p[1])});
    function pad(){return Math.round(Math.max(48,Math.min(box.clientWidth,box.clientHeight)*0.12))}
    var grof=matchMedia('(pointer: coarse)').matches,map;
    try{
      map=new ml.Map({
        container:box,
        style:{
          version:8,
          projection:{type:'globe'},
          sky:{'sky-color':'#020d41','horizon-color':'#33bcfa','fog-color':'#ebeff4','sky-horizon-blend':0.6,'horizon-fog-blend':0.6,'fog-ground-blend':0.8,'atmosphere-blend':['interpolate',['linear'],['zoom'],0,1,4,0.8,6,0]},
          sources:{
            beeld:{type:'raster',tileSize:256,maxzoom:19,tiles:[ESRI+'World_Imagery/MapServer/tile/{z}/{y}/{x}'],attribution:'Kaart &copy; Esri, HERE, Garmin, &copy; OpenStreetMap-bijdragers'},
            straat:{type:'raster',tileSize:256,maxzoom:19,tiles:[ESRI+'World_Street_Map/MapServer/tile/{z}/{y}/{x}']}
          },
          layers:[
            {id:'ruimte',type:'background',paint:{'background-color':'#020d41'}},
            // van ver satellietbeeld, dichterbij gaat het over in de straatkaart
            {id:'beeld',type:'raster',source:'beeld',maxzoom:8,paint:{'raster-opacity':['interpolate',['linear'],['zoom'],5,1,7,0]}},
            {id:'straat',type:'raster',source:'straat',minzoom:4.5,paint:{'raster-opacity':['interpolate',['linear'],['zoom'],5,0,7,1]}}
          ]
        },
        center:START.center,zoom:START.zoom,
        attributionControl:{compact:true},
        scrollZoom:false,dragPan:!grof,dragRotate:false,pitchWithRotate:false,touchPitch:false,fadeDuration:0
      });
    }catch(e){box.remove();return}
    map.touchZoomRotate.disableRotation();
    map.addControl(new ml.NavigationControl({showCompass:false}),'top-right');

    var pinnen={};
    Object.keys(PLAATS).forEach(function(id){
      var item=sectie.querySelector('[data-loc="'+id+'"]');
      var naam=item?(item.matches('h3')?item:item.querySelector('h3')).textContent:id;
      var el=document.createElement('div');
      el.className='db-pin';el.title=naam;
      el.innerHTML='<span class="db-pin__naam">'+naam+'</span><span class="db-pin__kop"><b>'+NR[id]+'</b></span><span class="db-pin__puls"></span>';
      el.addEventListener('click',function(e){e.stopPropagation();actief(id);vlieg(id);if(item)item.scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'nearest'})});
      new ml.Marker({element:el,anchor:'center'}).setLngLat(PLAATS[id]).addTo(map);
      pinnen[id]=el;
    });
    function actief(id){
      items.forEach(function(it){it.classList.toggle('is-actief',it.getAttribute('data-loc')===id)});
      Object.keys(pinnen).forEach(function(k){pinnen[k].classList.toggle('is-actief',k===id);pinnen[k].style.zIndex=k===id?2:1});
    }
    map.on('zoom',function(){box.classList.toggle('is-bol',map.getZoom()<5)});

    var draai=null,ronde=0;
    function stop(){ronde++;if(draai){cancelAnimationFrame(draai);draai=null}}
    function naarAlle(duur){map.fitBounds(bbox,{padding:pad(),maxZoom:9,curve:1.5,duration:reduce.matches?0:duur,essential:false})}
    function vlieg(id){stop();map.flyTo({center:PLAATS[id],zoom:13,duration:reduce.matches?0:1800,essential:false})}
    // bol draait een stukje, draait naar Europa en vliegt dan naar Brabant
    function rondje(){
      stop();var mijn=ronde;
      map.jumpTo(START);box.classList.add('is-bol');
      if(reduce.matches){setTimeout(function(){if(mijn===ronde)naarAlle(0)},1200);return}
      var t0=performance.now(),vorige=t0;
      (function stap(nu){
        if(mijn!==ronde)return;
        var c=map.getCenter();map.setCenter([c.lng+(nu-vorige)*0.035,c.lat]);vorige=nu;
        if(nu-t0<1600){draai=requestAnimationFrame(stap);return}
        draai=null;
        map.flyTo({center:[5,51.2],zoom:2.4,duration:1800,essential:false});
        map.once('moveend',function(){if(mijn===ronde)naarAlle(3000)});
      })(t0);
    }
    ['mousedown','touchstart'].forEach(function(ev){box.addEventListener(ev,stop,{passive:true})});

    items.forEach(function(it){
      var id=it.getAttribute('data-loc');
      it.addEventListener('mouseenter',function(){actief(id)});
      it.addEventListener('click',function(e){if(e.target.closest('a'))return;actief(id);vlieg(id)});
    });

    var knoppen=document.createElement('div');knoppen.className='db-bol__knoppen';
    [[ICOON.alle,'Alle locaties',function(){stop();naarAlle(1600)}],[ICOON.wereld,'Wereldbeeld',rondje]].forEach(function(k){
      var b=document.createElement('button');b.type='button';b.className='db-bol__knop';b.innerHTML=k[0]+k[1];b.addEventListener('click',k[2]);knoppen.appendChild(b);
    });
    fig.appendChild(knoppen);
    actief('oisterwijk');

    map.once('load',function(){
      map.resize();
      // pas starten als de kaart echt in beeld is, zodat je de vlucht ziet
      var gezien=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;gezien.disconnect();rondje()},{threshold:0.45});
      gezien.observe(box);
    });
    map.on('error',function(){if(!map.loaded()){box.remove();knoppen.remove()}});
    addEventListener('resize',function(){map.resize()});
  }

  if(!('IntersectionObserver' in window))return laad(bouw);
  var io=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;io.disconnect();laad(bouw)},{rootMargin:'600px 0px'});
  io.observe(fig);
})();


// Mensen uit de foto (mens-pop): in de fotokaders (figure.blok__foto) steken de medewerkers
// met hoofd en schouders boven het kader uit, alsof ze uit het scherm stappen. Niets beweegt.
// Werkwijze: dezelfde foto twee keer. Onder de echte foto in een venster (.mens-pop__raam) dat
// het kader afsnijdt; erboven de uitsnede zonder achtergrond (assets/img/mens-pop/<naam>.webp,
// gemaakt met imgly) die alleen boven het kader zichtbaar is. De foto wordt zo in het kader
// gelegd dat de kruin precies P px boven de bovenrand valt, dus er wordt nooit een hoofd afgesneden.
// Per foto: [uitsnede, bovenkant mensen (fractie van de hoogte), midden mensen (fractie van de breedte),
// per 2% van de breedte de bovenste rij met mens in % (99 = leeg)]. Met dat laatste wordt de foto
// zo opzij geschoven dat de zijkant van het kader niet door een hoofd loopt dat boven het kader uitsteekt.
// Is er boven het kader te weinig ruimte (kop of tekst vlak erboven), dan blijft de foto gewoon staan.
(function(){
  var MENS={"20190515DeBresser_0106LR.jpg":["20190515DeBresser_0106LR",0.084,0.712,"9999999999999999999999999999999999999999999999999999999999990808081215121010112328799999999999999999"],"Anne-Kienhuis-Facilitair-medewerker-1024x683.jpg":["Anne-Kienhuis-Facilitair-medewerker-1024x683",0.122,0.424,"9952515049494848484847474741342315141212121212131519273958636567687375777979797980999999999999999999"],"Asset-management-De-Bresser.jpg":["Asset-management-De-Bresser",0.108,0.631,"9999999999999999999999999959596099995857391611101011123033364299999978787880808282808181818281827982"],"De-Breser-particuliere-verhuizing.jpg":["De-Breser-particuliere-verhuizing",0.066,0.72,"9999999999999999999999999999999999999999999999999999994037343128252320181614121008070608269999999999"],"De-Bresser-Afbeelding-2-706x1024.png":["De-Bresser-Afbeelding-2-706x1024",0.258,0.506,"9999994139383732303030324142434241414099999999999999999956565451484038272626252626293536363741509999"],"De-Bresser-De-duurzame-werkomgeving-1024x868.jpg":["De-Bresser-De-duurzame-werkomgeving-1024x868",0.286,0.525,"9999999999999999999999999999999999999999993233322832323232333333999999999999999999999999999999999999"],"De-Bresser-Full-Service-Opslag.jpg":["De-Bresser-Full-Service-Opslag",0.211,0.539,"9999999999999999999999999999999999999966372622212121212530313132333646999999999999999999999999999999"],"De-Bresser-Huismeester-.jpg":["De-Bresser-Huismeester-",0.102,0.482,"9999999999999999999999999999211311101214263050484542272222222224438286999999999999999999999999999999"],"De-Bresser-Particuliere-verhuizingen-e1670931389225-790x1024.jpg":["De-Bresser-Particuliere-verhuizingen-e1670931389225-790x1024",0.316,0.38,"9999999999996461515050494951526051484341333131313238383942475658999999999999999999999999999999999999"],"De-Bresser-Senioren-verhuizing-683x1024.jpg":["De-Bresser-Senioren-verhuizing-683x1024",0.017,0.469,"9999999999754746464646474747471812100704030202010102030407090910101113141617192347769999999999999999"],"De-Bresser-Transport-Contact-e1711724004960.png":["De-Bresser-Transport-Contact-e1711724004960",0.026,0.48,"9975666666666564615956545149433633313029282827040302020202020202030406082425262627272930334357999999"],"De-Bresser-Transport--e1787651507557.jpg":["De-Bresser-Transport--e1787651507557",0.137,0.384,"9999999999494746464650535466664544444343361713131317242525274768769299999999999999999999999999999999"],"De-Bresser-Transport-foto.jpeg":["De-Bresser-Transport-foto",0.155,0.73,"9999999999999999999999999999999999999999999999524947474749535466464646454544321515151726262730547284"],"De-Bresser-Uw-verhuis-partner-1024x683.jpg":["De-Bresser-Uw-verhuis-partner-1024x683",0.161,0.437,"5961626340403938436060606059595249403529262736582019202622212223222228292825161617232528999999999999"],"De-Bresser-Verhuizingen-Brabant.jpg":["De-Bresser-Verhuizingen-Brabant",0.258,0.505,"9999994139383731303030324142434241404099999966999999999056565450473938272626252526293536363842499999"],"De-bresser-zakelijk-verhuizen-1024x683.jpg":["De-bresser-zakelijk-verhuizen-1024x683",0.072,0.407,"9999999999332623201508070707095861646667697299999191919970696969696971779999999999999999999999999999"],"Duurzaamheidsverslag-2022-TM-dubbel40-1024x725.jpg":["Duurzaamheidsverslag-2022-TM-dubbel40-1024x725",0.13,0.649,"9999999999999999999999999999706862605960626059581914131212131515131312121313141517182022242628313336"],"Gebouwenbeheer-De-Bresser-1024x683.jpg":["Gebouwenbeheer-De-Bresser-1024x683",0.281,0.437,"9999999999999999999999999999999956504847292828294447489999999999999999999999999999999999999999999999"],"Handyman-De-Bresser-1.jpg":["Handyman-De-Bresser-1",0.093,0.631,"9999999999999999999999999932323231313027272846454643434545454541402409091210111412111111111211131414"],"image.jpeg":["image",0.236,0.571,"9999999999999999999999999999994543312929303235353535353535353535353535353523232436389999999999999999"],"image-3.jpeg":["image-3",0.066,0.694,"9999999999999999999999999999999999999999999999999948424137343128252321181614121008070608259999999999"],"Logistiek-transport-meubels-internationaal.jpg":["Logistiek-transport-meubels-internationaal",0.106,0.667,"9999999999999999999999999999999999999999999999999999999999991013111111122899999999999999999999999999"],"Logistiek-transport-meubels-internationaal-1.jpg":["Logistiek-transport-meubels-internationaal-1",0.106,0.667,"9999999999999999999999999999999999999999999999999999999999991013111111122899999999999999999999999999"],"Montage-service-zakelijk-meubeltransport-2-naast-elkaar-1024x682.jpg":["Montage-service-zakelijk-meubeltransport-2-naast-elkaar-1024x682",0.142,0.751,"9999999999999999999999999999999999999999999999999999999999999999282624222121211714141599999999999999"],"Sander-Uphus.jpg":["Sander-Uphus",0.327,0.597,"9999999999999999999969666463626160595857515139363533333232323334353741626264687073778083868992949899"],"Verhuizen-Breda-Tilburg-910x1024.jpg":["Verhuizen-Breda-Tilburg-910x1024",0.299,0.424,"3840394949495858575756565655555554545455545353525251515048453129292931363840445056778399999999999999"]};
  var MAP='assets/img/mens-pop/';
  var figs=[].slice.call(document.querySelectorAll('figure.blok__foto'));
  var TEKST='h1,h2,h3,h4,h5,p,li,a,button,label,input,select,textarea,img,svg,figure,.btn';

  // vrije ruimte boven het kader: tot de onderkant van wat er in dezelfde kolom boven staat
  function ruimte(fig,r){
    var boven=null,sec=fig.closest('section')||document.body;
    [].forEach.call(sec.querySelectorAll(TEKST),function(el){
      if(fig.contains(el)||el.contains(fig))return;
      var b=el.getBoundingClientRect();
      if(!b.width||!b.height||b.bottom>r.top+1||b.right<=r.left||b.left>=r.right)return;
      if(boven===null||b.bottom>boven)boven=b.bottom;
    });
    if(boven===null)boven=sec.getBoundingClientRect().top;
    return r.top-boven;
  }

  function leg(fig,img,uit,d){
    var W=fig.clientWidth,H=fig.clientHeight,iw=img.naturalWidth,ih=img.naturalHeight;
    if(!W||!H||!iw||!ih)return;
    var r=fig.getBoundingClientRect();
    var P=Math.round(Math.min(64,Math.max(34,H*0.14)));
    P=Math.min(P,Math.floor(ruimte(fig,r)-10));
    var aan=P>=24;
    fig.classList.toggle('is-mens-pop',aan);
    if(!aan)P=0;
    // foto zo groot dat hij het kader vult met de kruin P px boven de bovenrand
    var Ph=Math.max((H+P)/(1-d[1]),W*ih/iw),Pw=Ph*iw/ih;
    var boven=-(d[1]*Ph+P);
    if(!aan)boven=-Math.max(0,Math.min(d[1]*Ph-8,(Ph-H)/2));
    var FT=-boven/Ph,ideaal=Math.min(0,Math.max(W-Pw,W/2-d[2]*Pw)),links=ideaal,beste=1e9;
    function kruin(f){var b=Math.floor(f*50),t=99;for(var k=b-1;k<=b+1;k++){if(k<0||k>49)continue;var v=+d[3].substr(k*2,2);if(v<t)t=v}return t/100}
    // kolommen met een hoofd of schouders: tot 12% onder de hoogste kruin
    var kopgrens=Math.round((d[1]+0.12)*100);
    function kop(k){return +d[3].substr(k*2,2)<=kopgrens}
    var mens=0;for(var k=0;k<50;k++)if(kop(k))mens++;mens=Math.max(mens,1);
    for(var x=W-Pw;x<=0.5;x+=Math.max(2,(Pw-W)/150)){
      // zo veel mogelijk hoofden in beeld, zo dicht mogelijk bij het midden
      var zicht=0;for(var k=Math.max(0,Math.ceil(-x/Pw*50));k<Math.min(50,Math.floor((W-x)/Pw*50));k++)if(kop(k))zicht++;
      var kost=Math.abs(x-ideaal)/Pw*0.5-zicht/mens*1.5;
      // zijkant door een hoofd boven het kader = zwaar; door een mens in het kader = licht (liefst in een tussenruimte)
      [-x/Pw,(W-x)/Pw].forEach(function(e){var t=kruin(e);if(t<FT)kost+=(FT-t)*20;else if(t<0.99&&e>0.01&&e<0.99)kost+=0.3});
      if(kost<beste){beste=kost;links=Math.min(0,x)}
    }
    [img,uit].forEach(function(el){el.style.width=Pw+'px';el.style.height=Ph+'px';el.style.left=links+'px';el.style.top=boven+'px'});
    // de uitsnede alleen boven het kader laten zien, niet opzij of eronder
    var F=-boven;
    uit.style.clipPath='inset(0px '+(Pw+links-W)+'px '+Math.max(0,Ph-F-H)+'px '+(-links)+'px)';
  }

  figs.forEach(function(fig){
    var img=fig.querySelector(':scope > img');if(!img)return;
    var naam=decodeURIComponent((img.getAttribute('src')||'').split('/').pop());
    var d=MENS[naam];if(!d)return;
    if(getComputedStyle(img).objectFit!=='cover')return;
    var raam=document.createElement('div');raam.className='mens-pop__raam';
    fig.insertBefore(raam,img);raam.appendChild(img);
    var uit=document.createElement('img');uit.className='mens-pop__uit';uit.alt='';uit.setAttribute('aria-hidden','true');uit.decoding='async';
    uit.src=MAP+d[0]+'.webp';
    fig.appendChild(uit);
    fig.classList.add('mens-pop');
    function zet(){leg(fig,img,uit,d)}
    if(img.complete&&img.naturalWidth)zet();else img.addEventListener('load',zet);
    if('ResizeObserver' in window)new ResizeObserver(zet).observe(fig);
    addEventListener('load',zet);
  });
})();

});
