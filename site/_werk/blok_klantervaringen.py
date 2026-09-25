#!/usr/bin/env python3
"""Schrijft de pagina /klantervaringen/ naar site/_werk/paginas/klantervaringen.html (build_paginas.py zet
die HTML tussen paginakop en footer) en de reviewdata voor de knop "Meer beoordelingen tonen" naar
site/assets/data/klantenvertellen-reviews.json.

Harde regel: geen enkele review is bedacht of herschreven. Alle beoordelingen komen letterlijk uit
site/_werk/klantenvertellen-reviews-20260829.json, op 29-08-2026 met klantenvertellen_ophalen.py opgehaald van het
Klantenvertellen-profiel 1034282 (alle pagina's van het profiel, nieuwste eerst), met naam, woonplaats, datum,
cijfer, kop en tekst zoals daar. Opzet sinds 29-08 (Shahab: "overal max 3 reviews laten zien en bij uitklappen
meer, hou het compact"): per bron een blok met de scoretegel en de drie nieuwste beoordelingen met toelichting;
de knop eronder laadt de rest in stappen van twaalf uit de JSON in assets/data, zodat de pagina licht blijft.
De sitebrede cijfers (9,4 uit 779, 99 procent beveelt aan, 9,5 over twaalf maanden uit 60) zijn de peiling van
28-08-2026 die de hele site gebruikt; wijzigen doet regie sitebreed. Klantenvertellen zelf toont op 29-08 "100%"
beveelt aan en de profiellijst bevat 796 beoordelingen tegen 779 in de teller; hier staan de sitebrede cijfers.
Google: de score (4,5 van 5 uit 42 reviews) is op 29-08-2026 afgelezen op de vermelding op Google Maps
(site/_werk/google-reviews-20260829.json). De reviewteksten van Google staan er NIET: de Places API is in het
Google-project niet ingeschakeld en Google Maps geeft een headless browser alleen de beperkte weergave. Komt er
een bestand met reviews (lijst "reviews" in die JSON, velden naam, sterren 1-5, datum, tekst), dan rendert dit
script ze automatisch als kaarten met dezelfde knop. Trustoo en Trustpilot hebben geen profiel van De Kievit
(gecontroleerd 29-08-2026), dus daar is geen blok voor.
"Meest genoemd" komt uit onderzoek/bronteksten/kievit-faq/FEITEN-KIEVIT.md (Reputatie).
De cutout reviews-pc-man naast de intro (werkwijze__top, variant --staand in style.css regel ~1658) is op 29-08 door een
peer-sessie in de gegenereerde pagina gezet en daarna hier overgenomen, zodat hij een nieuwe run overleeft.
Draaien vanuit de repo-root: python3 site/_werk/blok_klantervaringen.py"""
import html
import re
import unicodedata
import json
from pathlib import Path

import navigatie

WERK = Path(__file__).resolve().parent
SITE = WERK.parent
DOEL = WERK / "paginas" / "klantervaringen.html"
DATA = SITE / "assets" / "data"
BRON = json.loads((WERK / "klantenvertellen-reviews-20260829.json").read_text(encoding="utf-8"))
KV = BRON["bron"]
GOOGLE = json.loads((WERK / "google-reviews-20260829.json").read_text(encoding="utf-8"))
MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]

# sitebrede cijfers (peiling 28-08-2026, dezelfde als index.html); alleen sitebreed wijzigen
KV_CIJFER, KV_AANTAL, KV_AANBEVELING, KV_12M, KV_12M_AANTAL = "9,4", 779, 99, "9,5", 60
TOON, STAP = 6, 12                      # zichtbaar in de HTML (twee rijen van drie), en per klik erbij

REVIEWS = sorted(BRON["reviews"], key=lambda r: r["datum"], reverse=True)
# De zes zichtbare kaarten zijn met de hand gekozen (Shahab 29-08: "de beste en mooiste"): cijfer 10, een
# verhaal met inhoud, spreiding over soorten verhuizingen, en geen overlap met de vijf reviews op de homepage
# of de vier citaten in "Wat terugkomt". Sleutel = (naam, plaats, datum) zoals op Klantenvertellen.
KEUZE = [("J.", "Sevenum/Hoogeveen", "2026-04-04"), ("Ben", "Lomm", "2026-01-02"), ("E. Billekens", "Venlo", "2025-12-27"),
         ("M.", "Reuver", "2025-12-15"), ("Bart", "Venlo", "2025-10-24"), ("Esther", "Echt", "2025-09-16")]
ZICHTBAAR = [next(r for r in REVIEWS if (r["naam"], r["plaats"], r["datum"]) == k) for k in KEUZE][:TOON]


def datum_nl(iso):
    j, m, d = iso.split("-")
    return f"{int(d)} {MAANDEN[int(m) - 1]} {j}"


def plaats_nl(p):
    return p.title() if p.isupper() else p


def sterren(cijfer, extra="", label=None):
    """cijfer op de schaal 1-10; vijf sterren, halve ster bij een oneven cijfer."""
    vol, half = cijfer // 2, cijfer % 2
    uit = []
    for i in range(5):
        k = "" if i < vol else (" sterren__s--half" if half and i == vol else " sterren__s--leeg")
        uit.append(f'<span class="sterren__s{k}"><svg class="sterren__leeg"><use href="#i-star"/></svg><svg class="sterren__vol"><use href="#i-star"/></svg></span>')
    return f'<span class="sterren{extra}" role="img" aria-label="{label or f"{cijfer} van de 10"}">' + "".join(uit) + "</span>"


def schoon(ruw):
    """Regeleinden normaliseren en een afsluitende regel met alleen hashtags weghalen.

    Die laatste regel is geen willekeurige opschoning. In de ophaal van 29-08 is precies EEN
    review afgekapt: Huub Hendrickx, 19-06-2026, eindigt op "#venlo #ste", midden in het woord
    Steyl. De review zelf is compleet (twee alinea's, eindigend op "inzet en professionaliteit!");
    alleen de hashtagregel eronder is halverwege gestopt. Hashtags zijn geen onderdeel van wat de
    klant over ons zegt, dus die regel valt weg in plaats van dat wij een half woord publiceren of
    zelf iets aanvullen. Er is nagegaan dat dit het enige record met zo'n regel is, en dat er geen
    vaste afkaplengte in de ophaal zit (langste tekst 1121 tekens, geen ophoping op een grens),
    dus er is geen reden om de hele ophaal te wantrouwen. Zie C15 in _werk/claims-register.md."""
    t = ruw.replace("\\n", "\n").replace("\r", "")
    regels = [r for r in t.split("\n") if r.strip()]
    if regels and re.fullmatch(r"(#\S+\s*)+", regels[-1].strip().replace("\u200b", "")):
        regels = regels[:-1]
    t = "\n".join(regels).rstrip().rstrip("\u200b").rstrip()
    # Achterblijvend renderresidu: een superscriptcijfer aan het eind van de laatste zin. In dit
    # corpus precies een geval, dezelfde review, die eindigt op "professionaliteit! !" met daar
    # een U+2079 achter. Unicodecategorie No (superscript- en breukcijfers) komt in geen enkele
    # andere van de 796 reviews aan het eind voor; klanttekens die er WEL toe doen, zoals een
    # duim-emoji, vallen in categorie So en blijven dus staan. Bewust smal gehouden.
    while t and unicodedata.category(t[-1]) == "No":
        t = t[:-1].rstrip()
    return t


def tekst(r):
    """Letterlijke tekst; alleen de regeleinden uit de bron worden regeleinden op de pagina."""
    return "<br>".join(html.escape(regel.strip()) for regel in schoon(r["tekst"]).split("\n") if regel.strip())


def kaart(r, vertraging=0):
    st = f' style="transition-delay:{vertraging}s"' if vertraging else ""
    kop = f'        <h3>{html.escape(r["titel"])}</h3>\n' if r.get("titel", "").strip() else ""
    return (f'      <article class="review" data-reveal{st}>\n'
            f'        <p class="review__rate">{sterren(r["cijfer"])}<b>{r["cijfer"]}</b></p>\n'
            f'{kop}'
            f'        <p class="review__tekst">{tekst(r)}</p>\n'
            f'        <p class="review__wie"><b>{html.escape(r["naam"])}, {html.escape(plaats_nl(r["plaats"]))}</b><time datetime="{r["datum"]}">{datum_nl(r["datum"])}</time></p>\n'
            f'      </article>\n')


def google_kaart(r, vertraging=0):
    """Google-review zoals geplakt: geen sterren per review en alleen een relatieve datum, dus die staan er niet
    verzonnen bij; wel de tekst letterlijk, de naam zoals op Google en 'geleden' gerekend vanaf de peildatum."""
    st = f' style="transition-delay:{vertraging}s"' if vertraging else ""
    return (f'      <article class="review" data-reveal{st}>\n'
            f'        <p class="review__rate"><img class="kev-g" src="/assets/img/keurmerk/google-g.svg" alt="" width="18" height="18" loading="lazy" decoding="async"><b>Google</b></p>\n'
            f'        <p class="review__tekst">{tekst(r)}</p>\n'
            f'        <p class="review__wie"><b>{html.escape(r["naam"])}</b><span>Op Google, {html.escape(r["datum_relatief"])}</span></p>\n'
            f'      </article>\n')


# data voor de knop: alles, nieuwste eerst, alleen de velden die de kaart nodig heeft
DATA.mkdir(parents=True, exist_ok=True)
(DATA / "klantenvertellen-reviews.json").write_text(json.dumps(dict(
    bron=KV, opgehaald=BRON["opgehaald"],
    reviews=[dict(id=r["id"], naam=r["naam"], plaats=plaats_nl(r["plaats"]), datum=r["datum"], cijfer=r["cijfer"],
                  titel=r.get("titel", "").strip(), tekst=schoon(r["tekst"])) for r in REVIEWS]),
    ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

kaarten_kv = "".join(kaart(r, round(i * 0.06, 2)) for i, r in enumerate(ZICHTBAAR))
GETOOND_KV = ",".join(r["id"] for r in ZICHTBAAR)
WA_REVIEWS = f"{navigatie.WA}?text=Hallo%2C%20ik%20las%20de%20klantervaringen%20op%20uw%20site.%20Ik%20wil%20graag%20een%20offerte%20voor%20mijn%20verhuizing."
GP = GOOGLE["profiel"]
GOOGLE_REVIEWS = GOOGLE.get("reviews", [])
# De zes zichtbare Google-reviews zijn een keuze (Shahab: "de beste en mooiste"): volledige tekst, positief, met
# inhoud, zonder namen van medewerkers, gespreid over jaren; de rest staat alleen in de JSON. Geen knop "Meer":
# het blok is uitdrukkelijk een selectie, alle 42 staan op Google.
KEUZE_GOOGLE = ["g-kendra-hendrikx", "g-laury-traksel", "g-kikie-hendriks", "g-bircan-gunturcun", "g-rafke-manders-deenen", "g-n-l"]
google_zichtbaar = [next(r for r in GOOGLE_REVIEWS if r["id"] == k) for k in KEUZE_GOOGLE][:TOON]
kaarten_google = "".join(google_kaart(r, round(i * 0.06, 2)) for i, r in enumerate(google_zichtbaar))
google_sterren_cijfer = int(round(float(GP["sterren"].replace(",", ".")) * 2))

CSS = """<style>
  /* Alleen voor /klantervaringen/ (prefix kev): de vragenlijst, de citaatregels en het compacte reviewrooster.
     De rest (reviews, rgrid, scorepaneel, usps, faq) komt uit style.css. */
  .kev-lijst{list-style:none;margin:1.2rem 0 0;padding:0;display:grid;gap:.5rem;counter-reset:kev}
  .kev-lijst li{counter-increment:kev;position:relative;padding:.55rem .9rem .55rem 2.9rem;background:var(--wit);border:1px solid var(--lijn);border-radius:12px;font-size:.96rem;color:var(--ant)}
  .kev-lijst li::before{content:counter(kev);position:absolute;left:.8rem;top:.5rem;width:1.5rem;height:1.5rem;border-radius:50%;background:var(--goud-licht);color:var(--goud-diep);font:700 .82rem/1.5rem var(--font-titel);text-align:center}
  .kev-citaat{display:block;margin-top:.5rem;font-size:.9rem;color:var(--goud-diep)}
  .kev-citaat b{font-weight:600;color:var(--ant-zacht)}
  .kev-slot{text-align:center;max-width:44rem;margin-inline:auto}
  .kev-slot .knoprij{justify-content:center;margin-top:1.4rem}
  .kev-3{grid-template-columns:repeat(3,1fr)}
  .kev-3+.kev-3{margin-top:1.1rem}
  .kev-leeg{color:var(--kv-ink2);font-style:italic}
  .kev-meer{display:flex;justify-content:center;margin-top:1.4rem}
  .kev-klaar{margin:1.2rem 0 0;text-align:center;color:var(--ant-zacht);font-size:.95rem}
  /* De staande cutout naast de intro even hoog als de tekstkolom (Shahab 29-08: "veel te groot").
     Het beeld is 1100x1512, dus op volle kolombreedte werd het 742 px hoog tegen 450 px tekst. Absoluut
     plaatsen haalt het uit de flow: de rijhoogte komt dan alleen van de tekst en het beeld schaalt daarbinnen
     (contain, onderaan uitgelijnd). Onder 900px is het een kolom en geldt de gewone plaatsing weer. */
  .kev-fig{position:relative;align-self:stretch;min-height:0}
  .kev-fig img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:bottom center}
  @media(max-width:900px){
    .kev-fig{position:static;align-self:auto}
    .kev-fig img{position:static;width:auto;height:auto;max-height:26rem;margin-inline:auto}
  }
  /* Iconen komen uit de Shutterstock-bibliotheek (icoon-skill), uitgeknipt en gerecolord naar navy/teal:
     zie assets/img/icoon/. Ze staan als <img> in het ronde vlak van .usps .ico. */
  .usps .ico img{width:30px;height:30px;display:block}
  .kev-g{width:18px;height:18px;flex:none}
  .kev-merk1{grid-template-columns:1fr}
  .kev-merk1 img{max-width:9.5rem}
  .kev-vragen{row-gap:1.6rem}
  .kev-vragen .stap__nr{font-size:2.1rem;margin-bottom:.45rem}
  .kev-vragen .stap p{font-size:.95rem;line-height:1.5}
  .reviews .reviews__hoofd .sectiekop{margin-bottom:0}
  .reviews .scorepaneel .btn{margin-top:.2rem}
  @media(max-width:1099.98px){.kev-3{grid-template-columns:1fr 1fr}}
  @media(max-width:640px){.kev-3{grid-template-columns:1fr}}
</style>"""

JS = """<script>
// "Meer beoordelingen tonen": laadt de JSON uit assets/data een keer en zet er per klik twaalf kaarten bij, letterlijk uit de bron.
(function(){
  var M=['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function datum(iso){var d=iso.split('-');return parseInt(d[2],10)+' '+M[parseInt(d[1],10)-1]+' '+d[0]}
  function sterren(c,label){var vol=Math.floor(c/2),half=c%2,s='';for(var i=0;i<5;i++){var k=i<vol?'':(half&&i===vol?' sterren__s--half':' sterren__s--leeg');s+='<span class="sterren__s'+k+'"><svg class="sterren__leeg"><use href="#i-star"/></svg><svg class="sterren__vol"><use href="#i-star"/></svg></span>'}return '<span class="sterren" role="img" aria-label="'+label+'">'+s+'</span>'}
  function kaart(r,soort){
    var t=r.tekst&&r.tekst.trim()?esc(r.tekst.trim()).replace(/\\n+/g,'<br>'):'<span class="kev-leeg">Alleen een cijfer gegeven, zonder toelichting.</span>';
    if(soort==='google'){var c=Math.round(parseFloat(String(r.sterren).replace(',','.'))*2);return '<article class="review"><p class="review__rate">'+sterren(c,r.sterren+' van de 5')+'<b>'+esc(r.sterren)+'/5</b></p><p class="review__tekst">'+t+'</p><p class="review__wie"><b>'+esc(r.naam)+'</b><time datetime="'+esc(r.datum)+'">'+datum(r.datum)+'</time></p></article>'}
    return '<article class="review"><p class="review__rate">'+sterren(r.cijfer,r.cijfer+' van de 10')+'<b>'+r.cijfer+'</b></p>'+(r.titel?'<h3>'+esc(r.titel)+'</h3>':'')+'<p class="review__tekst">'+t+'</p><p class="review__wie"><b>'+esc(r.naam)+(r.plaats?', '+esc(r.plaats):'')+'</b><time datetime="'+esc(r.datum)+'">'+datum(r.datum)+'</time></p></article>';
  }
  document.querySelectorAll('[data-meer]').forEach(function(knop){
    var doel=document.getElementById(knop.getAttribute('data-meer')),bron=knop.getAttribute('data-bron'),soort=knop.getAttribute('data-soort'),stap=parseInt(knop.getAttribute('data-stap'),10)||12;
    var getoond=(knop.getAttribute('data-getoond')||'').split(','),lijst=null,i=0,label=knop.textContent;
    function toon(){
      var n=0,rij=document.createElement('div');rij.className='rgrid kev-3';
      while(i<lijst.length&&n<stap){var r=lijst[i++];if(getoond.indexOf(r.id)>-1)continue;rij.insertAdjacentHTML('beforeend',kaart(r,soort));n++}
      if(n){doel.appendChild(rij);doel.hidden=false}
      if(i>=lijst.length){var p=document.createElement('p');p.className='kev-klaar';p.textContent='Dat waren ze allemaal, tot en met de oudste van '+datum(lijst[lijst.length-1].datum)+'.';doel.appendChild(p);knop.parentNode.hidden=true}
    }
    knop.addEventListener('click',function(){
      if(lijst){toon();return}
      knop.disabled=true;knop.textContent='Laden...';
      fetch(bron).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(d){lijst=d.reviews||[];knop.disabled=false;knop.textContent=label;toon()})
        .catch(function(){knop.disabled=false;knop.textContent='Laden mislukt, probeer het nog eens'});
    });
  });
})();
</script>"""

google_blok_kaarten = ""
if google_zichtbaar:
    google_blok_kaarten = f"""    <div class="rgrid kev-3">
{kaarten_google}    </div>
    <div class="reviews__voet" data-reveal>
      <p class="reviews__meer"><a href="{GP["url"]}" target="_blank" rel="noopener nofollow">Alle {GP["reviews"]} reviews op Google lezen<svg aria-hidden="true"><use href="#i-caret"/></svg></a></p>
    </div>
"""
google_intro = (f'Ook op Google beoordelen klanten ons. Daar staat De Kievit op {GP["sterren"]} van de 5 sterren uit {GP["reviews"]} reviews '
                f'(peildatum {datum_nl(GOOGLE["opgehaald"])}). ' +
                ('Hieronder een selectie van zes, woord voor woord overgenomen; Google vermeldt bij een review alleen hoe lang geleden hij is geplaatst, gerekend vanaf die peildatum.' if google_zichtbaar else
                 'De reviews zelf leest u op onze vermelding op Google Maps; wij nemen ze hier pas over als dat rechtstreeks uit de bron kan.'))

PAGINA = f"""<!-- ============ /klantervaringen/: GEGENEREERD door _werk/blok_klantervaringen.py, niet met de hand bewerken ============
     Alle reviews staan letterlijk in _werk/klantenvertellen-reviews-20260829.json (Klantenvertellen-profiel 1034282, alle pagina's)
     en, voor de knop "Meer beoordelingen tonen", in assets/data/klantenvertellen-reviews.json. Google-score in
     _werk/google-reviews-20260829.json. Trustoo en Trustpilot: geen profiel van De Kievit (29-08-2026). -->
{CSS}

<section class="sectie" aria-labelledby="kev-intro-kop">
  <div class="wrap">
    <div class="werkwijze__top">
    <div class="sectiekop" data-reveal>
      <p class="label">Klantervaringen</p>
      <h2 class="kop" id="kev-intro-kop">Wat zeggen klanten over hun verhuizing met De Kievit?</h2>
      <p class="intro">Elke beoordeling op deze pagina is woord voor woord overgenomen van ons profiel op Klantenvertellen, met de
      naam, de woonplaats, de datum en het cijfer dat de klant zelf gaf. Wij hebben er niets aan veranderd: ook een 7 en een
      opmerking over een kras staan er gewoon in. U ziet eerst zes beoordelingen die wij zelf mooi vinden; met de knop eronder klapt u
      alle andere uit, van de nieuwste terug tot de eerste uit 2013. Daaronder staan onze reviews op Google.</p>
    </div>
      <!-- .werkwijze__wagen is de vrijstaande-cutout-figuur van de homepage; hier een mensen-cutout -->
      <figure class="werkwijze__wagen werkwijze__wagen--staand kev-fig" data-reveal aria-hidden="true">
        <img src="/assets/img/reviews-pc-man-1100.webp" srcset="/assets/img/reviews-pc-man-700.webp 700w, /assets/img/reviews-pc-man-1100.webp 1100w" sizes="(max-width:900px) 88vw, 46vw" width="1100" height="1512" alt="" loading="lazy" decoding="async">
      </figure>
    </div>
  </div>
</section>

<section class="sectie reviews" aria-labelledby="kev-reviews-kop">
  <div class="wrap">
    <div class="reviews__hoofd">
      <div class="sectiekop" data-reveal>
        <p class="label">Klantenvertellen</p>
        <h2 class="kop" id="kev-reviews-kop">Alle beoordelingen, onverkort</h2>
        <p class="intro">Klantenvertellen is het onafhankelijke reviewplatform van <a href="/erkende-verhuizer/">Erkende Verhuizers</a>. Een klant beantwoordt daar na de
        verhuizing een vaste vragenlijst; het cijfer en de aanbeveling komen daaruit voort. Klanten geven ons gemiddeld een {KV_CIJFER}
        uit {KV_AANTAL} beoordelingen en {KV_AANBEVELING} procent beveelt ons aan; over de laatste twaalf maanden is het een {KV_12M}.</p>
      </div>
      <aside class="scorepaneel" data-reveal style="transition-delay:.06s">
        <p class="scorepaneel__cijfer"><b>{KV_CIJFER}</b><span>uit {KV_AANTAL} beoordelingen</span></p>
        {sterren(9)}
        <ul class="scorepaneel__feiten">
          <li><b>{KV_AANBEVELING}%</b> beveelt ons aan</li>
          <li><b>{KV_12M}</b> laatste 12 maanden</li>
          <li><b>{KV_12M_AANTAL}</b> beoordelingen in die 12 maanden</li>
        </ul>
        <div class="scorepaneel__keurmerken">
          <a href="{KV}" target="_blank" rel="noopener nofollow" aria-label="Ons profiel op Klantenvertellen"><img src="/assets/img/keurmerk/klantenvertellen.svg" alt="Klantenvertellen" width="322" height="159" loading="lazy" decoding="async"></a>
          <a href="https://www.erkendeverhuizers.nl/lid/de-kievit-verhuizingen-top-movers/" target="_blank" rel="noopener nofollow" aria-label="Onze ledenpagina bij Erkende Verhuizers"><img src="/assets/img/keurmerk/erkende-verhuizers.svg" alt="Erkende Verhuizers" width="165" height="80" loading="lazy" decoding="async"></a>
        </div>
      </aside>
    </div>
    <div class="rgrid kev-3">
{kaarten_kv}    </div>
    <div id="kev-kv-meer" hidden></div>
    <div class="kev-meer" data-reveal><button type="button" class="btn btn--lijn" data-meer="kev-kv-meer" data-bron="/assets/data/klantenvertellen-reviews.json" data-soort="kv" data-stap="{STAP}" data-getoond="{GETOOND_KV}">Meer beoordelingen tonen</button></div>
    <div class="reviews__voet" data-reveal>
      <p class="reviews__meer"><a href="{KV}" target="_blank" rel="noopener nofollow">Ons profiel op Klantenvertellen bekijken<svg aria-hidden="true"><use href="#i-caret"/></svg></a></p>
      <div class="wa-rij"><a class="btn btn--wa btn--groen" href="{WA_REVIEWS}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Stel uw vraag via WhatsApp</a></div>
    </div>
  </div>
</section>

<section class="sectie reviews sectie--creme2" aria-labelledby="kev-google-kop">
  <div class="wrap">
    <div class="reviews__hoofd">
      <div class="sectiekop" data-reveal>
        <p class="label">Google</p>
        <h2 class="kop" id="kev-google-kop">Onze beoordeling op Google</h2>
        <p class="intro">{google_intro}</p>
      </div>
      <aside class="scorepaneel" data-reveal style="transition-delay:.06s">
        <p class="scorepaneel__cijfer"><b>{GP["sterren"]}</b><span>van de 5 sterren op Google</span></p>
        {sterren(google_sterren_cijfer, label=f'{GP["sterren"]} van de 5')}
        <ul class="scorepaneel__feiten">
          <li><b>{GP["reviews"]}</b> reviews op Google</li>
          <li><b>{datum_nl(GOOGLE["opgehaald"])}</b> peildatum</li>
        </ul>
        <div class="scorepaneel__keurmerken kev-merk1">
          <a href="{GP["url"]}" target="_blank" rel="noopener nofollow" aria-label="Onze vermelding op Google"><img src="/assets/img/keurmerk/google.svg" alt="Google" width="272" height="92" loading="lazy" decoding="async"></a>
        </div>
        <a class="btn btn--goud" href="{GP["url"]}" target="_blank" rel="noopener nofollow">Bekijk op Google<svg aria-hidden="true"><use href="#i-caret"/></svg></a>
      </aside>
    </div>
{google_blok_kaarten}  </div>
</section>

<section class="sectie sectie--creme2" aria-labelledby="kev-vaak-kop">
  <div class="wrap">
    <div class="sectiekop" data-reveal>
      <p class="label">Wat terugkomt</p>
      <h2 class="kop" id="kev-vaak-kop">Wat klanten het vaakst noemen</h2>
      <p class="intro">Drie dingen komen in de beoordelingen steeds terug: duidelijke communicatie, vriendelijke mensen en op tijd zijn. Hoe wij dat organiseren staat bij <a href="/werkwijze/">onze werkwijze</a>, en wie het uitvoert bij <a href="/over-ons/">over ons</a>.
      Daarnaast valt op hoe vaak klanten schrijven over een verhuizing die anders liep dan gepland.</p>
    </div>
    <ul class="usps usps--rij" data-reveal>
      <li><span class="ico"><img src="/assets/img/icoon/communicatie.svg" alt="" width="30" height="30" loading="lazy" decoding="async"></span><div><h3>Duidelijke communicatie</h3><p>Afspraken over tijd, prijs en aanpak die vooraf helder zijn en op de dag kloppen.<span class="kev-citaat">"Duidelijke communicatie, afspraken nagekomen" <b>P, Venlo</b></span></p></div></li>
      <li><span class="ico"><img src="/assets/img/icoon/mensen.svg" alt="" width="30" height="30" loading="lazy" decoding="async"></span><div><h3>Vriendelijke mensen</h3><p>De verhuizers, de adviseur en de binnendienst: klanten noemen de omgang net zo vaak als het werk zelf.<span class="kev-citaat">"Correcte en vriendelijke medewerkers" <b>J., Horst</b></span></p></div></li>
      <li><span class="ico"><img src="/assets/img/icoon/op-tijd.svg" alt="" width="30" height="30" loading="lazy" decoding="async"></span><div><h3>Op de afgesproken tijd</h3><p>De wagen staat er wanneer het is afgesproken, en er wordt doorgewerkt tot alles op zijn plek staat.<span class="kev-citaat">"De mannen waren op de afgesproken tijd aanwezig" <b>Jan, Horst aan de Maas</b></span></p></div></li>
      <li><span class="ico"><img src="/assets/img/icoon/meedenken.svg" alt="" width="30" height="30" loading="lazy" decoding="async"></span><div><h3>Meedenken als het anders loopt</h3><p>Een spoedverhuizing, een sterfgeval, veel meer spullen dan gedacht: juist dan telt hoe een team reageert.<span class="kev-citaat">"Tot zelfs op zondag was er contact" <b>Brigitte, Bilthoven</b></span></p></div></li>
    </ul>
  </div>
</section>

<section class="sectie" aria-labelledby="kev-hoe-kop">
  <div class="wrap">
    <div class="werkwijze__top" style="margin-bottom:clamp(1.6rem,3vw,2.4rem)">
      <div class="sectiekop" data-reveal>
        <p class="label">Hoe een beoordeling ontstaat</p>
        <h2 class="kop" id="kev-hoe-kop">Twaalf vragen na elke verhuizing</h2>
        <p class="intro">Klantenvertellen is het reviewplatform dat Erkende Verhuizers gebruiken. Een klant beoordeelt daar niet met
        een enkel cijfer, maar beantwoordt een vaste vragenlijst over de hele verhuizing, van het eerste advies tot de factuur.
        Het eindcijfer en het antwoord op de vraag of hij ons aanbeveelt komen daaruit voort. Dit zijn de vragen die elke klant krijgt.</p>
      </div>
      <!-- .werkwijze__wagen is de vrijstaande-cutout-figuur van de homepage, hier met mensen (klant en verhuizer) -->
      <figure class="werkwijze__wagen" data-reveal aria-hidden="true">
        <img src="/assets/img/figuur-duo-lachen-1100.webp" srcset="/assets/img/figuur-duo-lachen-700.webp 700w, /assets/img/figuur-duo-lachen-1100.webp 1100w" sizes="(max-width:900px) 88vw, 46vw" width="1100" height="907" alt="" loading="lazy" decoding="async">
      </figure>
    </div>
    <ol class="stappen kev-vragen">
      <li class="stap" data-reveal><span class="stap__nr" aria-hidden="true">01</span><p>Hoe beoordeelt u de voorbereiding van de verhuizing (advies, planning en afspraken vooraf)?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.04s"><span class="stap__nr" aria-hidden="true">02</span><p>Hoe beoordeelt u de communicatie met het verhuisbedrijf (bereikbaarheid, duidelijkheid en informatievoorziening)?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.08s"><span class="stap__nr" aria-hidden="true">03</span><p>In hoeverre heeft het verhuisbedrijf de gemaakte afspraken nagekomen?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.12s"><span class="stap__nr" aria-hidden="true">04</span><p>Hoe beoordeelt u de uitvoering van de verhuizing (vakmanschap, zorgvuldigheid en klantvriendelijkheid van het team)?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.16s"><span class="stap__nr" aria-hidden="true">05</span><p>Hoe beoordeelt u de flexibiliteit van het verhuisbedrijf bij wijzigingen of onvoorziene omstandigheden?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.2s"><span class="stap__nr" aria-hidden="true">06</span><p>Hoe beoordeelt u de duidelijkheid van de factuur en de aansluiting bij de vooraf gemaakte financi&euml;le afspraken?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.24s"><span class="stap__nr" aria-hidden="true">07</span><p>Hoe beoordeelt u de afhandeling van vragen, klachten en eventuele schade na afloop van de verhuizing?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.28s"><span class="stap__nr" aria-hidden="true">08</span><p>Hoe beoordeelt u de verhouding tussen prijs en geleverde kwaliteit?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.32s"><span class="stap__nr" aria-hidden="true">09</span><p>Wat is uw totaaloordeel over de dienstverlening van dit verhuisbedrijf?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.36s"><span class="stap__nr" aria-hidden="true">10</span><p>Ziet u nog verbeterpunten in de dienstverlening van het verhuisbedrijf?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.4s"><span class="stap__nr" aria-hidden="true">11</span><p>Bent u in de toekomst van plan om van deze diensten gebruik te maken?</p></li>
      <li class="stap" data-reveal style="transition-delay:0.44s"><span class="stap__nr" aria-hidden="true">12</span><p>Waar kent u Erkende Verhuizers van?</p></li>
    </ol>
  </div>
</section>

<section class="sectie ring sectie--creme2" aria-labelledby="kev-faq-kop">
  <div class="wrap">
    <div class="sectiekop sectiekop--midden" data-reveal>
      <p class="label">Veelgestelde vragen</p>
      <h2 class="kop" id="kev-faq-kop">Over deze beoordelingen</h2>
    </div>
    <div class="faq" data-reveal>
      <details><summary>Zijn deze beoordelingen echt?<span class="faq__tk" aria-hidden="true"></span></summary><p>Ja. Ze staan op ons profiel bij Klantenvertellen, een platform dat losstaat van ons bedrijf, en wij nemen ze hier over zonder er een woord aan te veranderen. Controleer het gerust: elke beoordeling is daar met dezelfde naam, plaats en datum terug te vinden.</p></details>
      <details><summary>Waarom staat er ook een 8 tussen?<span class="faq__tk" aria-hidden="true"></span></summary><p>Omdat wij niet alleen de hoogste cijfers laten zien. Een beoordeling met een 8 en een eerlijke opmerking over een kras zegt meer over ons dan een rij tienen zonder toelichting. Het gemiddelde over alle beoordelingen is een 9,4.</p></details>
      <details><summary>Waar lees ik alle 779 beoordelingen?<span class="faq__tk" aria-hidden="true"></span></summary><p>Hier op deze pagina. Onder de zes beoordelingen staat de knop "Meer beoordelingen tonen"; elke klik laadt er twaalf bij, van de nieuwste tot en met de oudste uit 2013. Ze staan ook op <a href="{KV}" target="_blank" rel="noopener nofollow">ons profiel bij Klantenvertellen</a>, met per beoordeling de antwoorden op de hele vragenlijst.</p></details>
      <details><summary>Kan ik na mijn verhuizing zelf een beoordeling schrijven?<span class="faq__tk" aria-hidden="true"></span></summary><p>Graag zelfs. Dat kan via hetzelfde profiel op Klantenvertellen. U beantwoordt dan de vragenlijst hierboven en uw beoordeling verschijnt daar met uw naam en woonplaats.</p></details>
      <details><summary>Waarom staan er klanten uit Bilthoven, Asten en Hoogeveen tussen?<span class="faq__tk" aria-hidden="true"></span></summary><p>Onze thuisregio is Noord- en Midden-Limburg, maar een verhuizing begint of eindigt vaak buiten die regio. Als lid van Top Movers en als onderdeel van De Bresser verhuizen wij door het hele land, en zo nodig in twee dagen, zoals de klant uit Sevenum die naar Hoogeveen ging.</p></details>
    </div>
  </div>
</section>

<section class="sectie" aria-labelledby="kev-slot-kop">
  <div class="wrap">
    <div class="kev-slot" data-reveal>
      <p class="label">Zelf ervaren?</p>
      <h2 class="kop" id="kev-slot-kop">Vraag een offerte aan, dan hoort u snel van ons</h2>
      <p class="intro">Onze verhuisadviseur komt bij u langs of bekijkt uw inboedel via een videogesprek, en u krijgt een offerte op maat.
      Gratis en zonder verplichtingen.</p>
      <div class="knoprij">
        <a class="btn btn--goud btn--groen" href="/#offerte"><svg aria-hidden="true"><use href="#i-caret"/></svg>Offerte aanvragen</a>
        <a class="btn btn--wa" href="{WA_REVIEWS}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>App ons</a>
        <a class="btn btn--lijn" href="{navigatie.TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>Bel {navigatie.TEL}</a>
      </div>
    </div>
  </div>
</section>
""" + JS + "\n"

assert "—" not in PAGINA and "–" not in PAGINA, "em- of en-dash in de tekst"
DOEL.parent.mkdir(exist_ok=True)
DOEL.write_text(PAGINA, encoding="utf-8")
print(f"{DOEL.relative_to(SITE.parent)}: {len(ZICHTBAAR)} Klantenvertellen-kaarten zichtbaar van {len(REVIEWS)} in assets/data, "
      f"{len(google_zichtbaar)} Google-kaarten (score {GP['sterren']} uit {GP['reviews']}), {len(PAGINA.splitlines())} regels")
