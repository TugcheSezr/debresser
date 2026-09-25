#!/usr/bin/env python3
"""De twee adresvelden van het offerteformulier: verplicht, met adresaanvulling uit PDOK.

Aanleiding (9-09-2026, De Bresser/backoffice via Shahab): sinds de site live staat komen er
aanvragen binnen met alleen "Huissen 25, baarlo" of zelfs alleen een straat, dus zonder postcode
en soms zonder woonplaats. Aafke Smetsers vroeg om postcode en woonplaats verplicht te maken.

Wat dit doet:
  1. "Van" en "Naar" waren vrije, optionele tekstvelden. Nu zijn ze verplicht en wordt de tekst
     pas geaccepteerd als er een postcode EN een naam (straat of plaats) in staat.
  2. Tijdens het typen zoekt de bezoeker zijn adres op in de PDOK Locatieserver (open data van
     BZK/Kadaster, gratis en zonder sleutel) en kiest hij het uit een lijst. Hij krijgt daarmee
     de officiele schrijfwijze: "Oppe Brik 30, 5953PB Reuver".
  3. "Naar" heeft een uitweg voor wie nog niet weet waarheen of naar het buitenland verhuist;
     dat vinkje haalt de eis van dat ene veld af en laat de getypte tekst staan.

De controle zelf (postcode + naam) draait lokaal in de browser en hangt dus NIET van PDOK af:
valt de dienst weg, dan verdwijnt alleen het gemak van de keuzelijst, niet de mogelijkheid om
een aanvraag te doen.

Twee bouwers gebruiken dit bestand, zodat de HTML op een plek staat: build_kievit.py zet de
velden op de homepage (en schrijft JS mee naar assets/js/kievit.js, dat op alle 34 pagina's
staat) en build_paginas.py zet dezelfde velden op de handgeschreven kopie van het formulier in
_werk/paginas/contact.html.
"""

# De bron (Heerlijk Thuis-lander) heeft per adres een label met een span en een los tekstveld.
_OUD = ('<label class="lf__field"><span>%s</span><input id="lf-%s" name="Verhuizen %s" type="text"'
        ' placeholder="Straat, nr + plaats" autocomplete="street-address"></label>')

# Een <ul role="listbox"> mag niet in een <label> staan (dat is geen phrasing content), dus het
# veld wordt een div met een eigen <label for>. Dat is dezelfde vorm als het datumveld hierboven
# en .lf__field>label[for] heeft in style.css al precies de opmaak van .lf__field>span.
# autocomplete staat uit: de autofill van de browser vult vaak alleen straat en huisnummer en zou
# als tweede lijst over onze keuzelijst heen komen.
_NIEUW = '''<div class="lf__field lf__adres">
              <label for="lf-%(id)s">%(label)s</label>
              <div class="lf__adresveld">
                <input id="lf-%(id)s" name="Verhuizen %(id)s" required type="text" placeholder="Postcode + huisnummer" autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="lf-%(id)s-keuzes">
                <ul class="lf__keuzes" id="lf-%(id)s-keuzes" role="listbox" aria-label="Gevonden adressen" hidden></ul>
              </div>%(extra)s
            </div>'''

_VINKJE = '''
              <label class="lf__optie"><input type="checkbox" id="lf-geenadres" name="Bestemming onbekend of buitenland" value="ja"><span>Nog onbekend of buitenland</span></label>'''

VELD_FIXES = [
    (_OUD % ("Van", "van", "van"), _NIEUW % {"id": "van", "label": "Van", "extra": ""}),
    (_OUD % ("Naar", "naar", "naar"), _NIEUW % {"id": "naar", "label": "Naar", "extra": _VINKJE}),
]

JS = """// Adresaanvulling op de twee offertevelden (9-09-2026). Bron: PDOK Locatieserver v3_1, open data
// van BZK/Kadaster, gratis en zonder sleutel. Typen op postcode + huisnummer geeft daar precies een
// treffer ("5953pb 30" -> "Oppe Brik 30, 5953PB Reuver"), typen op straat + plaats meestal ook.
// Aanleiding: er kwamen aanvragen binnen zonder postcode en zonder woonplaats.
// De eis zelf (postcode plus een naam in de tekst) wordt hieronder lokaal gecontroleerd, dus een
// bezoeker kan altijd verder, ook als PDOK niet antwoordt.
(function(){
  var API='https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?fq=type:adres&rows=6&q=';
  var PC=/[1-9][0-9]{3}\\s?[a-z]{2}/i;
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
    q=q.replace(/([1-9][0-9]{3})\\s*([a-z]{2})\\s*/i,'$1$2 ');
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
})();"""
