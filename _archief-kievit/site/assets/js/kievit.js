// Offerte-pill bovenin: waarden overzetten naar het formulier onderaan en erheen springen (Feitsma).
(function(){
  var top=document.getElementById('ofForm');if(!top)return;
  var map=[['of-van','lf-van'],['of-naar','lf-naar'],['of-datum','lf-datum'],['of-woning','lf-woning']];
  top.addEventListener('submit',function(e){
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
