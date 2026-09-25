#!/usr/bin/env python3
"""Schrijft de pagina /m3-calculator/ (hoeveel kubieke meter is mijn inboedel) naar
site/_werk/paginas/m3-calculator.html; build_paginas.py zet die HTML tussen paginakop en footer.
Daarnaast blijft site/_werk/blok-m3-calculator.html (alleen het rekenblok) bestaan als terugval
voor de INHOUD-tabel in build_paginas.py.

De 76 items in 9 kamers en het rekenmodel (aantal maal een vaste inhoud per item, afgerond op
2 decimalen) zijn overgenomen van de m3-calculator van feitsma.nl (~/feitsma-www/_pages/
m3-calculator.html, getest met test/m3-calculator.test.js), die het weer van
studentverhuisservice.nl heeft. De rijen worden hier gegenereerd; wie een item of een kamer wil
wijzigen doet dat in KAMERS en draait het script opnieuw. De tekst op de pagina is eigen tekst.
Feiten: opname door de verhuisadviseur (ook per videogesprek, gratis en vrijblijvend) en
de opslag in houten kisten of 20/25 ft-containers komen uit ~/kievit-faq/FEITEN-KIEVIT.md, herleid op
debresser.nl/videogesprek/ en de-kievit.nl/inboedelopslag (controleer-light 28-08); het
gemiddelde van 25 m3 uit onderzoek-erkende-verhuizers/bronnen/erkendeverhuizers.nl/kosten-verhuisbedrijf.txt.
De offerteknoppen brengen het totaal via /?m3=..#offerte naar het formulier op de homepage, dat het in
het verborgen veld zet (calc-IIFE in build_kievit.py).
Herontwerp 29-08 (brief _werk/paginabeeld/BRIEF-HERONTWERP.md, sessie -64): elke sectie een visuele partner,
precies twee staande foto's (m3-laadbak links in de intro, m3-opname rechts bij de opname), de
vergelijking als cijferkaarten en een tweede samenvattingskaart in het slotblok.
Draaien vanuit de repo-root: python3 site/_werk/blok_m3.py"""
import html
from pathlib import Path

import navigatie

WERK = Path(__file__).resolve().parent
DOEL_BLOK = WERK / "blok-m3-calculator.html"
DOEL_PAGINA = WERK / "paginas" / "m3-calculator.html"
EV_BRON = "https://www.erkendeverhuizers.nl/kosten-verhuisbedrijf/"

KAMERS = [
    ("woonkamer", "Woonkamer", [("Dozen", .1), ("2-zitsbank", 1), ("3-zitsbank", 1.5), ("Armstoel", .5), ("Bijzettafel", .2),
                                ("Bureau", 1), ("Dressoir", 1), ("Eettafel", .75), ("Fauteuil", .5), ("Kast", 1), ("Meubel klein", .3),
                                ("Planten", .1), ("Salontafel", .4), ("Schilderijen", .15), ("Secretaire", .5), ("Stoel", .2), ("TV", .4),
                                ("Vloerkleed", .5), ("Wandmeubel", 1)]),
    ("slaapkamer", "Slaapkamer", [("Dozen", .1), ("1-persoons bed", .3), ("2-persoons bed", .7), ("Babybad", .2), ("Box", .2),
                                  ("Bureau", 1), ("Commode", 1), ("Garderobe groot", .6), ("Garderobe klein", .4), ("Groot speelgoed", .5),
                                  ("Kaptafel", .6), ("Kinderstoel", .15), ("Ledikant", .4), ("Linnenkast 2-deurs", 1), ("Linnenkast 3-deurs", 2),
                                  ("Matras", .1), ("Nachtkast", .3), ("Ombouw", .5), ("Stereo", .2), ("Stoel", .2), ("TV", .4)]),
    ("badkamer", "Badkamer", [("Dozen", .1), ("Droger", .6), ("Kast", 1), ("Wasmachine", .6)]),
    ("studeerkamer", "Studeerkamer", [("Dozen", .1), ("Boekenkast", 1), ("Bureau", 1), ("Computer", .25), ("Stoel", .2)]),
    ("keuken", "Keuken", [("Dozen", .1), ("Afwasmachine", .5), ("Buffetkast", 1), ("Eethoek", 1), ("Fornuis", .5), ("Kast", 1),
                          ("Koelkast", .5), ("Magnetron", .3), ("Oven", .3), ("Vriezer", .5)]),
    ("schuur", "Schuur", [("Dozen", .1), ("Fiets groot", .5), ("Fiets klein", .3), ("Ladder", .3), ("Tuingereedschap", .5), ("Werkbank", 1)]),
    ("tuin", "Tuin", [("Hout", .1), ("Plantenbak", .5), ("Tuintafels", .75)]),
    ("zolder", "Zolder", [("Dozen", .1), ("Bed", .3), ("Kampeerspullen", 1), ("Kast", 1), ("Kerstspullen", .5), ("Wieg", .5)]),
    ("anders", "Anders", [("Diversen klein", .5), ("Diversen groot", 1)]),
]
HULP = {"anders": "Tel hier wat nergens anders past: klein is een halve kuub, groot een hele."}

MIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
FOTO_LAADBAK = ('<figure class="blok__foto" data-reveal>\n'
                '        <img src="/assets/img/m3-laadbak-1140.webp" srcset="/assets/img/m3-laadbak-760.webp 760w, /assets/img/m3-laadbak-1140.webp 1140w" sizes="(max-width:860px) 90vw, 560px" width="1140" height="1710" alt="Volle laadbak van een verhuiswagen met dozen tot het dak en meubels in verhuisdekens" decoding="async">\n'
                '        <figcaption>Uw kubieke meters, in de wagen</figcaption>\n'
                '      </figure>')
FOTO_OPNAME = ('<figure class="blok__foto" data-reveal>\n'
               '        <img src="/assets/img/m3-opname-1140.webp" srcset="/assets/img/m3-opname-760.webp 760w, /assets/img/m3-opname-1140.webp 1140w" sizes="(max-width:860px) 90vw, 560px" width="1140" height="1710" alt="Verhuisadviseur van De Kievit neemt met een klant de inboedel in de woonkamer op" loading="lazy" decoding="async">\n'
               '        <figcaption>De adviseur telt het samen met u na</figcaption>\n'
               '      </figure>')
WA_FOTO = f"{navigatie.WA}?text=Hallo%2C%20ik%20stuur%20u%20foto%27s%20van%20mijn%20woning%20voor%20een%20inschatting%20van%20de%20inboedel."


def m3_tekst(v):
    return f"{v:g}".replace(".", ",")


def rij(naam, v):
    n = html.escape(naam)
    return (f'        <div class="m3rij" data-m3="{v:g}">\n'
            f'          <div class="m3rij__wat"><span class="m3rij__naam">{n}</span><span class="m3rij__maat">{m3_tekst(v)} m&sup3; per stuk</span></div>\n'
            f'          <div class="m3rij__tel">\n'
            f'            <button type="button" class="m3rij__knop" data-stap="-1" aria-label="1 {n} minder">{MIN}</button>\n'
            f'            <input type="number" inputmode="numeric" min="0" max="99" value="0" aria-label="Aantal {n}">\n'
            f'            <button type="button" class="m3rij__knop" data-stap="1" aria-label="1 {n} meer">{PLUS}</button>\n'
            f'          </div>\n'
            f'        </div>\n')


tabs = "".join(
    f'      <button type="button" class="m3tab" role="tab" id="tab-{k}" aria-controls="paneel-{k}" aria-selected="{"true" if i == 0 else "false"}">'
    f'<span>{label}</span><span class="m3tab__som" data-kamersom>0 m&sup3;</span></button>\n'
    for i, (k, label, _) in enumerate(KAMERS))
panelen = "".join(
    f'    <div class="m3paneel" role="tabpanel" id="paneel-{k}" aria-labelledby="tab-{k}" data-kamer="{label}"{"" if i == 0 else " hidden"}>\n'
    + (f'      <p class="m3paneel__hulp">{HULP[k]}</p>\n' if k in HULP else "")
    + '      <div class="m3paneel__rijen">\n' + "".join(rij(n, v) for n, v in items) + '      </div>\n    </div>\n'
    for i, (k, label, items) in enumerate(KAMERS))

CSS = """<style>
  /* Alleen voor /m3-calculator/ (prefix m3): stappen, kamertabs, tellers, de plakkende samenvatting en de
     rekenverantwoording. Gedeelde klassen (sectie, wrap, label, kop, intro, blok, usps, faq, btn) uit style.css. */
  .m3stappen{list-style:none;margin:1.6rem 0 0;padding:0;display:grid;grid-template-columns:1fr;gap:.9rem;counter-reset:m3stap}
  .m3stappen li{counter-increment:m3stap;background:var(--wit);border:1px solid var(--lijn);border-radius:var(--r);padding:1.1rem 1.2rem 1.1rem 3.6rem;position:relative;box-shadow:var(--schaduw-kaart)}
  .m3stappen li::before{content:counter(m3stap);position:absolute;left:1.1rem;top:1rem;width:1.8rem;height:1.8rem;border-radius:50%;background:var(--goud-licht);color:var(--goud-diep);font:700 .95rem/1.8rem var(--font-titel);text-align:center}
  .m3stappen b{display:block;font-family:var(--font-titel);font-size:1.02rem;color:var(--ant)}
  .m3stappen span{display:block;margin-top:.2rem;font-size:.95rem;color:var(--ant-zacht);line-height:1.5}

  .m3{padding-block:0 clamp(2.6rem,5vw,4rem)}
  .m3__grid{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:clamp(1.2rem,2.5vw,2rem);align-items:start}
  .m3__aanname{margin:1.4rem 0 0;padding:1rem 1.2rem;border-left:4px solid var(--goud);background:var(--wit);border-radius:0 12px 12px 0;font-size:.92rem;line-height:1.6;color:var(--ant-zacht)}
  .m3__aanname b{color:var(--ant)}
  .m3__aanname a,.m3fout__bron a{color:var(--goud-diep);font-weight:700;text-decoration:underline;text-underline-offset:3px}

  .m3tabs{display:flex;flex-wrap:wrap;gap:.5rem}
  .m3tab{display:inline-flex;align-items:center;gap:.55rem;padding:.42rem .48rem .42rem .95rem;border:1px solid var(--lijn);border-radius:999px;
    background:var(--wit);font:inherit;font-weight:700;font-size:.92rem;color:var(--ant);cursor:pointer;box-shadow:var(--schaduw-kaart);
    transition:border-color .15s var(--ease),color .15s var(--ease)}
  .m3tab:hover{border-color:var(--goud);color:var(--goud-diep)}
  .m3tab__som{font-size:.76rem;font-weight:700;color:var(--ant-zacht);background:var(--creme-2);border-radius:999px;padding:.26rem .6rem}
  .m3tab__som.is-actief{color:var(--goud-diep);background:var(--goud-licht)}
  .m3tab[aria-selected="true"]{background:var(--goud-diep);border-color:var(--goud-diep);color:var(--wit)}
  .m3tab[aria-selected="true"] .m3tab__som{background:rgba(255,255,255,.2);color:var(--wit)}

  .m3paneel{background:var(--wit);border:1px solid var(--lijn);border-radius:var(--r);box-shadow:var(--schaduw-kaart);margin-top:1rem;padding:.4rem 1.3rem 1.1rem}
  .m3paneel__hulp{margin:.7rem 0 0;font-size:.88rem;color:var(--ant-zacht)}
  .m3paneel__rijen{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:2rem}
  .m3rij{display:flex;align-items:center;gap:.8rem;padding:.52rem 0;border-top:1px solid var(--lijn)}
  .m3paneel__rijen .m3rij:nth-child(-n+2){border-top:0}
  .m3rij__wat{display:flex;flex-direction:column;gap:.05rem;min-width:0}
  .m3rij__naam{font-weight:600;font-size:.95rem;color:var(--ant)}
  .m3rij__maat{font-size:.78rem;color:var(--ant-zacht)}
  .m3rij__tel{margin-left:auto;flex:none;display:flex;align-items:center;gap:.3rem}
  .m3rij__knop{width:32px;height:32px;border:1px solid var(--lijn);border-radius:10px;background:var(--wit);color:var(--ant);display:grid;place-items:center;cursor:pointer;
    transition:border-color .15s var(--ease),color .15s var(--ease)}
  .m3rij__knop:hover{border-color:var(--goud);color:var(--goud-diep)}
  .m3rij__knop svg{width:14px;height:14px}
  .m3rij__tel input{width:44px;height:32px;border:1px solid var(--lijn);border-radius:10px;text-align:center;font:inherit;font-weight:700;color:var(--ant);background:var(--wit);
    -moz-appearance:textfield;appearance:textfield}
  .m3rij__tel input::-webkit-outer-spin-button,.m3rij__tel input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
  .m3rij.is-actief .m3rij__naam{color:var(--goud-diep)}
  .m3rij.is-actief input{border-color:var(--goud);color:var(--goud-diep)}

  .m3sum{position:sticky;top:96px;background:var(--bruin);color:var(--creme);border-radius:var(--r);box-shadow:var(--schaduw);padding:clamp(1.3rem,2.5vw,1.7rem)}
  .m3sum .label{color:var(--teal-op-navy);margin:0}
  .m3sum__cijfer{display:flex;align-items:baseline;gap:.4rem;margin-top:.6rem}
  .m3sum__cijfer b{font-family:var(--font-display);font-weight:700;line-height:1;font-size:clamp(2.6rem,5vw,3.4rem);color:var(--teal-op-navy)}
  .m3sum__cijfer span{font-size:1.15rem;font-weight:700;color:rgba(246,244,236,.75)}
  .m3sum__lijst{list-style:none;margin:1rem 0 0;padding:0}
  .m3sum__lijst li{display:flex;justify-content:space-between;gap:1rem;padding:.42rem 0;border-top:1px solid rgba(246,244,236,.18);font-size:.9rem}
  .m3sum__lijst li span:first-child{color:rgba(246,244,236,.8)}
  .m3sum__lijst li span:last-child{font-weight:700;white-space:nowrap}
  .m3sum__leeg{margin:1rem 0 0;padding-top:.6rem;border-top:1px solid rgba(246,244,236,.18);font-size:.9rem;color:rgba(246,244,236,.7)}
  .m3sum__acties{display:flex;flex-direction:column;gap:.6rem;margin-top:1.3rem}
  .m3sum__acties .btn{width:100%}
  .m3sum__wis{margin-top:1rem;background:none;border:0;padding:0;cursor:pointer;font:inherit;font-size:.85rem;color:rgba(246,244,236,.7);text-decoration:underline}
  .m3sum__wis:hover{color:var(--creme)}

  .m3cijfers{margin-top:clamp(2rem,4vw,3rem)}
  .m3fout__bron{margin:1.4rem 0 0;font-size:.95rem;color:var(--ant-zacht);max-width:70ch}
  .m3sum--slot{position:static;align-self:center}

  @media (max-width:1000px){.m3__grid{grid-template-columns:1fr}.m3sum{position:static}}
  @media (max-width:720px){.m3paneel__rijen{grid-template-columns:1fr}.m3paneel__rijen .m3rij:nth-child(2){border-top:1px solid var(--lijn)}}
</style>"""

def samenvatting(extra_klasse=""):
    """De navy kaart met het totaal. Staat twee keer op de pagina; het script werkt alle exemplaren bij."""
    return f"""<aside class="m3sum{extra_klasse}" data-reveal aria-label="Uw schatting">
        <p class="label">Uw schatting</p>
        <div class="m3sum__cijfer" aria-live="polite">
          <b data-m3totaal>0</b><span>m&sup3;</span>
        </div>
        <ul class="m3sum__lijst" data-m3lijst hidden></ul>
        <p class="m3sum__leeg" data-m3leeg>Nog niets geteld. Kies een kamer en tel uw spullen; hier verschijnt dan de verdeling.</p>
        <div class="m3sum__acties">
          <a class="btn btn--goud btn--groen" data-m3offerte href="/#offerte"><svg aria-hidden="true"><use href="#i-caret"/></svg>Offerte met deze schatting</a>
          <a class="btn btn--wa" data-m3wa href="{navigatie.WA}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>App uw schatting door</a>
        </div>
        <button type="button" class="m3sum__wis" data-m3wis>Alles op nul zetten</button>
      </aside>"""


CALC = f"""<section class="m3" aria-label="Inboedel berekenen in kubieke meters">
  <div class="wrap">
    <div class="m3__grid">
      <div class="m3__kamers" data-reveal>
        <div class="m3tabs" role="tablist" aria-label="Kamers">
{tabs}        </div>

{panelen}      </div>

      {samenvatting()}
    </div>

    <p class="m3__aanname" data-reveal><b>Zo rekent de calculator.</b> Elk item heeft een vaste inhoud in kubieke meters, die staat er steeds bij
    (een 3-zitsbank telt voor 1,5 m&sup3;, een verhuisdoos voor 0,1 m&sup3;). De calculator vermenigvuldigt het aantal met die inhoud, telt per kamer en
    in totaal op en rondt af op twee decimalen. De inhoud per item komt uit het rekenmodel van
    <a href="https://www.studentverhuisservice.nl/" target="_blank" rel="noopener nofollow">studentverhuisservice.nl</a>. Het is een schatting van het
    laadvolume, geen meting; de opname door onze verhuisadviseur is bepalend voor de offerte.</p>
  </div>
</section>"""

PAGINA = f"""<!-- ============ /m3-calculator/: GEGENEREERD door _werk/blok_m3.py, niet met de hand bewerken ============
     Kamers en de inhoud per item staan in het script; de tekst hieronder ook. Wijzigen: script aanpassen en
     opnieuw draaien, daarna python3 site/_werk/build_paginas.py. -->
{CSS}

<section class="sectie" aria-labelledby="m3-intro-kop">
  <div class="wrap">
    <div class="blok blok--vlak">
      {FOTO_LAADBAK}
      <div class="blok__tekst" data-reveal>
        <p class="label">Inboedel in kubieke meters</p>
        <h2 class="kop" id="m3-intro-kop">Hoeveel kubieke meter is uw inboedel?</h2>
        <p class="intro">Verhuizers rekenen in kubieke meters: het laadvolume bepaalt welke wagen er komt en met hoeveel mensen wij
        staan. Met deze calculator loopt u uw huis kamer voor kamer door en telt u wat er mee moet. Het totaal groeit mee terwijl u
        telt. Zoekt u het aantal verhuisdozen in plaats van het volume? Daarvoor is er de
        <a href="/dozencalculator/">dozencalculator</a>.</p>
        <ol class="m3stappen">
          <li><b>Kies een kamer</b><span>Woonkamer, slaapkamer, keuken, schuur, zolder: elke kamer heeft een eigen tab met de spullen die er meestal staan.</span></li>
          <li><b>Tel wat mee gaat</b><span>Met de plus en de min, of typ het aantal. Wat u wegdoet of verkoopt, laat u op nul staan.</span></li>
          <li><b>Neem het getal mee</b><span>Uw totaal gaat met een klik mee in uw offerteaanvraag of in een WhatsApp-bericht aan ons.</span></li>
        </ol>
      </div>
    </div>
  </div>
</section>

{CALC}

<section class="sectie" aria-labelledby="m3-opname-kop">
  <div class="wrap">
    <div class="blok blok--paneel">
      <div class="blok__tekst" data-reveal>
        <p class="label">Wat wij met uw getal doen</p>
        <h2 class="kop" id="m3-opname-kop">Van uw schatting naar een offerte op maat</h2>
        <p class="intro">Het getal uit de calculator is een startpunt. Daarna maakt onze verhuisadviseur zelf een inventarisatie van uw
        inboedel in kubieke meters: bij u thuis, of als u dat handiger vindt via een videogesprek. Dat gesprek is gratis
        en vrijblijvend, en pas daarna staat het volume vast waarop de offerte is gebaseerd.</p>
        <p>De calculator rekent met een vaste inhoud per item, opgeteld over de items die u aanvinkt en afgerond op twee
        decimalen. Dit is versie 1 van dat model, nagelopen op 30 augustus 2026. De inhoudsmaten zijn kentallen en zijn
        niet getoetst aan afgeronde verhuizingen, dus voor uw eigen inboedel telt de inventarisatie, niet dit getal.</p>
        <ul class="d4">
          <li><img src="/assets/img/deco/verhuiswagen.svg" alt="" width="70" height="67" loading="lazy" decoding="async"><div><b>Wagen en team</b><span>het volume bepaalt de wagen en het aantal verhuizers</span></div></li>
          <li><img src="/assets/img/deco/checklist.svg" alt="" width="70" height="84" loading="lazy" decoding="async"><div><b>Opname op uw manier</b><span>bij u thuis of per videogesprek</span></div></li>
          <li><img src="/assets/img/deco/verhuisdoos.svg" alt="" width="70" height="67" loading="lazy" decoding="async"><div><b>Dozen erbij</b><span><a href="/dozencalculator/">reken uit hoeveel</a> u er nodig heeft</span></div></li>
          <li><img src="/assets/img/deco/opslag.svg" alt="" width="70" height="67" loading="lazy" decoding="async"><div><b>Past ook in opslag</b><span>in houten kisten of een 20 ft- of 25 ft-container</span></div></li>
        </ul>
      </div>
      {FOTO_OPNAME}
    </div>
  </div>
</section>

<section class="sectie sectie--creme2" aria-labelledby="m3-fout-kop">
  <div class="wrap">
    <div class="sectiekop" data-reveal>
      <p class="label">Scherper schatten</p>
      <h2 class="kop" id="m3-fout-kop">Vier dingen die bijna iedereen vergeet</h2>
    </div>
    <ul class="usps usps--rij" data-reveal>
      <li><span class="ico"><svg aria-hidden="true"><use href="#i-home"/></svg></span><div><h3>Wat het getal niet zegt</h3><p>Een piano, een kluis of een aquarium neemt weinig kuub in, maar vraagt om ander materieel en meer handen dan het volume doet vermoeden. Noem zulke stukken bij de opname, dan houdt de adviseur er in de planning rekening mee.</p></div></li>
      <li><span class="ico"><svg aria-hidden="true"><use href="#i-box"/></svg></span><div><h3>De dozen zelf</h3><p>Een doos telt voor 0,1 m&sup3;. Veertig dozen zijn dus vier kuub, ongeveer evenveel als een complete slaapkamer aan meubels.</p></div></li>
      <li><span class="ico"><svg aria-hidden="true"><use href="#i-check"/></svg></span><div><h3>De grote stukken</h3><p>Een linnenkast met drie deuren is 2 m&sup3;, een boekenkast of wandmeubel 1 m&sup3;. Twee kasten van drie deuren tellen samen al voor 4 m&sup3;, evenveel als veertig verhuisdozen.</p></div></li>
      <li><span class="ico"><svg aria-hidden="true"><use href="#i-plan"/></svg></span><div><h3>Wat niet mee gaat</h3><p>Verkoopt of weggeeft u iets voor de verhuizing, laat het dan op nul staan. Twijfelt u, tel het mee: een schatting die iets ruimer is, geeft op de verhuisdag geen verrassingen.</p></div></li>
    </ul>
    <div class="trust__in m3cijfers" data-reveal-groep>
      <div class="trust__item"><span class="trust__ico"><img src="/assets/img/deco/verhuiswagen.svg" alt="" width="40" height="38" loading="lazy" decoding="async"></span><span><b>25 m&sup3;</b>een gemiddelde inboedelverhuizing volgens Erkende Verhuizers</span></div>
      <div class="trust__item"><span class="trust__ico"><img src="/assets/img/deco/hart-huis.svg" alt="" width="40" height="37" loading="lazy" decoding="async"></span><span><b>Ongeveer 7 m&sup3;</b>een studio met een bed, een bank, een kast, een eettafel en dertig dozen</span></div>
      <div class="trust__item"><span class="trust__ico"><img src="/assets/img/deco/verhuisdoos.svg" alt="" width="40" height="38" loading="lazy" decoding="async"></span><span><b>0,1 m&sup3;</b>een verhuisdoos; veertig dozen zijn samen vier kuub</span></div>
      <div class="trust__item"><span class="trust__ico"><img src="/assets/img/deco/montage.svg" alt="" width="40" height="38" loading="lazy" decoding="async"></span><span><b>2 m&sup3;</b>een linnenkast met drie deuren; twee van die kasten zijn al vier kuub</span></div>
    </div>
    <p class="m3fout__bron" data-reveal>Het gemiddelde komt van de Organisatie voor Erkende Verhuizers (<a href="{EV_BRON}" target="_blank" rel="noopener nofollow">bron: erkendeverhuizers.nl</a>); de andere getallen zijn de rekenwaarden van deze calculator.</p>
  </div>
</section>

<section class="sectie ring" aria-labelledby="m3-faq-kop">
  <div class="wrap">
    <div class="sectiekop sectiekop--midden" data-reveal>
      <p class="label">Veelgestelde vragen</p>
      <h2 class="kop" id="m3-faq-kop">Over het berekenen van uw inboedel</h2>
    </div>
    <div class="faq" data-reveal>
      <details><summary>Hoe nauwkeurig is deze schatting?<span class="faq__tk" aria-hidden="true"></span></summary><p>Het is een schatting op basis van een vaste inhoud per item, geen meting. Voor een eerste indruk en voor uw offerteaanvraag is dat ruim voldoende. Het definitieve volume bepaalt onze verhuisadviseur bij de opname, en dat getal staat in de offerte.</p></details>
      <details><summary>Hoeveel kubieke meter is een gemiddelde inboedel?<span class="faq__tk" aria-hidden="true"></span></summary><p>De Organisatie voor Erkende Verhuizers noemt op basis van haar statistieken ongeveer 25 m&sup3; als gemiddelde inboedelverhuizing. Uw eigen getal kan daar flink van afwijken: een studio met een bed, een bank, een kast, een eettafel en dertig dozen komt in deze calculator op ongeveer 7 m&sup3;; bij een gezinswoning met meer kamers, grote kasten en veel meer dozen loopt het getal snel op.</p></details>
      <details><summary>Tellen de verhuisdozen ook mee in het volume?<span class="faq__tk" aria-hidden="true"></span></summary><p>Ja. Elke kamer heeft bovenaan een rij Dozen, en een doos telt voor 0,1 m&sup3;. Weet u nog niet hoeveel dozen u nodig heeft, gebruik dan eerst de <a href="/dozencalculator/">dozencalculator</a> en vul het aantal daarna hier in.</p></details>
      <details><summary>Moet ik alles tellen, ook wat ik nog wegdoe?<span class="faq__tk" aria-hidden="true"></span></summary><p>Nee, tel alleen wat er mee gaat naar het nieuwe adres. Spullen die u verkoopt, weggeeft of naar de milieustraat brengt, laat u op nul staan. Weet u het van iets nog niet zeker, tel het dan wel mee.</p></details>
      <details><summary>Kan de verhuisadviseur mijn inboedel ook op afstand opnemen?<span class="faq__tk" aria-hidden="true"></span></summary><p>Ja. De opname kan bij u thuis, maar ook via een videogesprek: u laat dan uw kamers zien en de adviseur maakt daarmee de inventarisatie. Aanvragen en het gesprek zijn gratis en vrijblijvend.</p></details>
      <details><summary>Wat gebeurt er met mijn schatting als ik een offerte aanvraag?<span class="faq__tk" aria-hidden="true"></span></summary><p>Klikt u op de knop Offerte met deze schatting, dan gaat het totaal mee naar het offerteformulier en komt het als "inschatting via m3-calculator" in uw aanvraag te staan. Onze binnendienst en de verhuisadviseur gebruiken dat getal als vertrekpunt voor het gesprek.</p></details>
    </div>
  </div>
</section>

<section class="sectie sectie--creme2" aria-labelledby="m3-slot-kop">
  <div class="wrap">
    <div class="blok">
      <div class="blok__tekst" data-reveal>
        <p class="label">Klaar met tellen?</p>
        <h2 class="kop" id="m3-slot-kop">Vraag een offerte aan met uw schatting erbij</h2>
        <p class="intro">Uw totaal gaat mee in de aanvraag, zodat wij het gesprek kunnen beginnen met een beeld van uw inboedel. Liever niet
        tellen? Stuur een paar foto's van uw kamers via WhatsApp, dan maken wij de eerste inschatting voor u.</p>
        <div class="knoprij blok__cta">
          <a class="btn btn--wa" href="{WA_FOTO}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Foto's appen</a>
          <a class="btn btn--lijn" href="{navigatie.TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>Bel {navigatie.TEL}</a>
        </div>
      </div>
      {samenvatting(" m3sum--slot")}
    </div>
  </div>
</section>

<script>
/* Rekenkern van de m3-calculator: som van aantal maal m3 per item, per kamer en totaal afgerond op 2 decimalen.
   Tabs en panelen staan in dezelfde volgorde, dus de koppeling loopt op index. */
(function () {{
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.m3tab'));
  var panelen = Array.prototype.slice.call(document.querySelectorAll('.m3paneel'));
  // de samenvatting staat twee keer op de pagina (naast de calculator en in het slotblok), dus alles per lijst
  var alle = function (sel) {{ return Array.prototype.slice.call(document.querySelectorAll(sel)); }};
  var totaalEls = alle('[data-m3totaal]'), lijstEls = alle('[data-m3lijst]'), leegEls = alle('[data-m3leeg]');
  var waEls = alle('[data-m3wa]'), offerteEls = alle('[data-m3offerte]');
  // Sinds 29-08 zet build_paginas.py het offerteformulier ook op deze pagina (PILL_PAGINAS). Staat het er, dan
  // moeten de knoppen NAAR BENEDEN springen in plaats van naar de homepage, en zetten we de schatting zelf in het
  // verborgen veld; zelfde veld en zelfde zin als het formulierscript bij ?m3= gebruikt, zodat de aanvraag er
  // hetzelfde uitziet waar de bezoeker ook vandaan komt. Zonder formulier blijft de oude route via de URL.
  // Elke keer opzoeken en niet een keer bovenaan: dit script staat VOOR het leadblock in de HTML, dus bij de
  // eerste aanroep bestaat #offerte nog niet.
  function lokaalVeldVan() {{ return document.getElementById('offerte') && document.getElementById('lf-calc'); }}
  var WA = '{navigatie.WA}';
  function fmt(v) {{ return (Math.round(v * 100) / 100).toLocaleString('nl-NL'); }}
  function herbereken() {{
    var totaal = 0, regels = [];
    panelen.forEach(function (paneel, i) {{
      var som = 0;
      paneel.querySelectorAll('.m3rij').forEach(function (rij) {{
        var n = parseInt(rij.querySelector('input').value, 10) || 0;
        som += n * parseFloat(rij.dataset.m3);
        rij.classList.toggle('is-actief', n > 0);
      }});
      som = Math.round(som * 100) / 100;
      totaal += som;
      var chip = tabs[i].querySelector('[data-kamersom]');
      chip.innerHTML = fmt(som) + ' m&sup3;';
      chip.classList.toggle('is-actief', som > 0);
      if (som > 0) regels.push([paneel.dataset.kamer, som]);
    }});
    totaal = Math.round(totaal * 100) / 100;
    var lijstHtml = regels.map(function (r) {{ return '<li><span>' + r[0] + '</span><span>' + fmt(r[1]) + ' m&sup3;</span></li>'; }}).join('');
    totaalEls.forEach(function (el) {{ el.textContent = fmt(totaal); }});
    lijstEls.forEach(function (el) {{ el.innerHTML = lijstHtml; el.hidden = regels.length === 0; }});
    leegEls.forEach(function (el) {{ el.hidden = regels.length > 0; }});
    var tekst = 'Hallo, volgens de m3-calculator op uw site is mijn inboedel ongeveer ' + fmt(totaal) + ' m3. Kan ik hiervoor een offerte krijgen?';
    waEls.forEach(function (a) {{ a.href = totaal > 0 ? WA + '?text=' + encodeURIComponent(tekst) : WA; }});
    var lokaalVeld = lokaalVeldVan();
    if (lokaalVeld) {{
      if (totaal > 0) {{
        lokaalVeld.value = 'Inboedel ongeveer ' + fmt(totaal) + ' m3 volgens de m3-calculator';
        lokaalVeld.setAttribute('name', 'Inschatting via m3-calculator');
      }} else {{
        lokaalVeld.value = '';
        lokaalVeld.removeAttribute('name');
      }}
      offerteEls.forEach(function (a) {{ a.href = '#offerte'; }});
    }} else {{
      // geen formulier op deze pagina: het formulier op de homepage leest ?m3= en zet de schatting in de aanvraag
      var doel = totaal > 0 ? '/?m3=' + encodeURIComponent(fmt(totaal)) + '#offerte' : '/#offerte';
      offerteEls.forEach(function (a) {{ a.href = doel; }});
    }}
  }}
  tabs.forEach(function (tab, i) {{
    tab.addEventListener('click', function () {{
      tabs.forEach(function (t, j) {{ t.setAttribute('aria-selected', j === i ? 'true' : 'false'); panelen[j].hidden = j !== i; }});
    }});
  }});
  document.addEventListener('click', function (e) {{
    var knop = e.target.closest('.m3rij__knop');
    if (!knop) return;
    var invoer = knop.parentElement.querySelector('input');
    var n = (parseInt(invoer.value, 10) || 0) + parseInt(knop.dataset.stap, 10);
    invoer.value = Math.min(99, Math.max(0, n));
    herbereken();
  }});
  document.addEventListener('input', function (e) {{
    if (e.target.matches('.m3rij__tel input')) {{
      var n = parseInt(e.target.value, 10);
      if (!isNaN(n)) e.target.value = Math.min(99, Math.max(0, n));
      herbereken();
    }}
  }});
  alle('[data-m3wis]').forEach(function (knop) {{
    knop.addEventListener('click', function () {{
      document.querySelectorAll('.m3rij__tel input').forEach(function (i) {{ i.value = 0; }});
      herbereken();
    }});
  }});
  herbereken();
  // het leadblock staat na dit script in de HTML; na het laden nog een keer, zodat de knoppen meteen goed staan
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', herbereken);
}})();
</script>
"""

# het losse rekenblok blijft bestaan als terugval voor de INHOUD-tabel; script en stijl gaan mee, anders rekent hij niet
BLOK = ("<!-- ============ M3-CALCULATOR, alleen het rekenblok (terugval; de volledige pagina staat in paginas/m3-calculator.html) ============ -->\n"
        + CSS + "\n\n" + CALC + "\n" + PAGINA[PAGINA.index("<script>"):])

for tekst in (PAGINA, BLOK):
    assert "—" not in tekst and "–" not in tekst, "em- of en-dash in de tekst"
DOEL_PAGINA.parent.mkdir(exist_ok=True)
DOEL_PAGINA.write_text(PAGINA, encoding="utf-8")
DOEL_BLOK.write_text(BLOK, encoding="utf-8")
print(f"{DOEL_PAGINA.relative_to(WERK.parent)}: {sum(len(i) for _, _, i in KAMERS)} items in {len(KAMERS)} kamers, {len(PAGINA.splitlines())} regels; {DOEL_BLOK.name} {len(BLOK.splitlines())} regels")
