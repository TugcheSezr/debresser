#!/usr/bin/env python3
"""Schrijft de pagina /veelgestelde-vragen/ naar site/_werk/paginas/veelgestelde-vragen.html (build_paginas.py
zet die HTML tussen paginakop en footer).

Bron van elk antwoord: onderzoek/bronteksten/kievit-faq/FEITEN-KIEVIT.md (bedrijfsfeiten en de branchevoorwaarden
van Erkende Verhuizers, AVVV/AVBV/AVB 2025 en 2020). Deze pagina is canoniek voor de algemene vragen. Tot 30-08-2026 stonden de zeven
standaardvragen hier bewust NIET, omdat zij al op de homepage en de dienstenpagina's stonden. Dat is omgedraaid:
die zeven stonden daarmee dertien keer op de site en nul keer op de FAQ-pagina, dus doorverwijzen kon niet. Vijf
ervan staan nu hier; "Wat kost een verhuizing?" en "Leveren jullie verhuisdozen?" zijn inhoudelijk al gedekt door
"Waarom staan er geen prijzen op de website?" en "Wanneer komen de verhuisdozen, en wanneer gaan ze weer weg?" en
zijn daarom niet nog eens toegevoegd. Het gedeelde blok op de dertien routes staat in build_kievit.py en moet door
T1 worden teruggebracht; tot dat gebeurt is de duplicatie tijdelijk hoger, niet lager. De route-eigen FAQ's van
/verhuischecklist/, /inpaktips/, /dozencalculator/ en /m3-calculator/ blijven op hun eigen route.
Geen prijzen, geen termijnen die niet in de voorwaarden staan, geen diensten die niet in de dienstenlijst staan.
Draaien vanuit de repo-root: python3 site/_werk/blok_veelgestelde_vragen.py"""
import html
from pathlib import Path

import navigatie

WERK = Path(__file__).resolve().parent
DOEL = WERK / "paginas" / "veelgestelde-vragen.html"
WA_VRAAG = f"{navigatie.WA}?text=Hallo%2C%20ik%20heb%20een%20vraag%20die%20niet%20in%20de%20veelgestelde%20vragen%20staat%3A%20"
MAIL = "info@de-kievit.nl"

# (anker, label in het register, kop, intro, [(vraag, antwoord-html)])
GROEPEN = [
    ("offerte", "Offerte en prijs", "Over de offerte en de prijs", "Wat u vooraf kunt verwachten, en waarom het antwoord op de prijsvraag altijd maatwerk is.", [
        ("Waarom staan er geen prijzen op de website?",
         "Omdat wij geen vaste tarieven hanteren: elke verhuizing krijgt een offerte op maat. De prijs hangt af van wat u uitbesteedt, de hoeveelheid spullen, de afstand, de verdieping en de datum, en dat weten wij pas na de opname. U ziet dus vooraf precies wat de verhuizing kost, maar niet als een lijstprijs op de site."),
        ("Wat staat er precies in de offerte?",
         "Volgens de voorwaarden van Erkende Verhuizers vermeldt de offerte altijd de werkzaamheden, de prijs inclusief btw, of wij met een all-in prijs of met een richtprijs werken, het moment en de wijze van betaling, de verzekering van uw inboedel tot 100.000 euro, de datum met het verwachte tijdsbeslag en de voorwaarden die gelden. Staat er iets niet in wat u wel besproken heeft, vraag er dan om voordat u tekent."),
        ("Kost de opname aan huis iets?",
         "Nee. Het bezoek van de verhuisadviseur en de offerte die daaruit volgt zijn gratis en vrijblijvend. U zit nergens aan vast totdat u de offerte accepteert."),
        ("Kan ik een offerte krijgen zonder dat er iemand langskomt?",
         "Ja. De inventarisatie van uw inboedel kan ook via een videogesprek, of op basis van wat u ons per e-mail stuurt. Voor een grote of ingewikkelde verhuizing raden wij het bezoek aan huis wel aan, omdat de adviseur dan ook de trap, de doorgangen en de plek voor de wagen ziet."),
        ("Wat maakt een verhuizing duurder of goedkoper?",
         "Vooral wat u zelf doet en wat u uitbesteedt: inpakken, demontage en montage, opslag. Daarnaast wegen de hoeveelheid spullen en de grootte van de woning, de afstand, een eventuele verhuislift, een parkeervergunning en het moment mee: een weekend, een feestdag of het einde van de maand kost meer dan een doordeweekse dag midden in de maand. Met de <a href=\"/m3-calculator/\">m3-calculator</a> krijgt u alvast een beeld van uw inboedel."),
    ]),
    ("vooraf", "Voor de verhuisdag", "In de weken voor de verhuizing", "De dozen, de taakverdeling en wat wij van u moeten weten.", [
        ("Hoe ver van tevoren moet ik de verhuizing aanvragen?",
         "Zodra uw verhuisdatum bekend is. Hoe eerder u contact opneemt, hoe meer keuze u heeft in data; doordeweeks en buiten het einde van de maand is er de meeste ruimte. Verhuizen in het weekend is in overleg mogelijk. Zit u krap in de tijd, bel dan gerust, want soms lukt het alsnog om op korte termijn iets vrij te maken. Hoe het daarna loopt, staat bij <a href=\"/werkwijze/#zo-werkt-het\">onze werkwijze</a>."),
        ("Halen jullie meubels uit elkaar en zetten jullie ze weer in elkaar?",
         "Ja, demontage en montage horen bij onze service. Kasten, bedden en boxsprings gaan bij u thuis uit elkaar en staan op het nieuwe adres weer klaar. Geef bij de opname aan om welke meubels het gaat, dan houden wij daar in de planning en de offerte rekening mee. Wat er onder dit werk valt, leest u bij <a href=\"/diensten/#d-montage-demontage\">montage en demontage</a>."),
        ("Wanneer komen de verhuisdozen, en wanneer gaan ze weer weg?",
         "De dozen bezorgen wij enkele weken voor de verhuizing, zodat u rustig kunt inpakken. Na de verhuizing halen wij de lege dozen weer bij u op; een belletje dat ze leeg zijn is genoeg. Hoeveel u er nodig heeft, rekent u uit met de <a href=\"/dozencalculator/\">dozencalculator</a>."),
        ("Kan ik ook alleen het zware werk uitbesteden?",
         "Ja. U kiest zelf tussen een complete verhuisservice en alleen het zware werk, waarbij u het inpakken en uitpakken zelf doet. Beide beginnen met een verhuisplan op maat, zodat op de verhuisdag duidelijk is wie wat doet."),
        ("Verhuizen jullie ook op zaterdag of zondag?",
         "In overleg kan dat. Houd er rekening mee dat een weekend, net als een feestdag en het einde van de maand, in de prijs zwaarder weegt dan een doordeweekse dag."),
        ("Wat moet ik vooraf aan jullie melden?",
         "Volgens de voorwaarden van Erkende Verhuizers meldt u vooraf alles met een bijzonder risico: apparaten waarvoor de fabrikant beveiligingsmaatregelen voorschrijft, voorwerpen van bijzondere waarde zoals kunst, waardevolle verzamelingen en vuurwapens, en bijzonderheden over de nieuwe woning. Gevaarlijke stoffen moet u altijd vooraf melden; anders mogen wij ze weigeren."),
        ("Wie regelt de parkeerplek voor de verhuiswagen?",
         "Bij de opname bespreken wij waar de wagen kan staan. Is daarvoor een ontheffing of een parkeervergunning nodig, dan vraagt u die aan bij uw eigen gemeente; de termijn en de kosten verschillen per gemeente, dus kijk daar op tijd naar. Meer over wat u zelf regelt leest u in de <a href=\"/verhuischecklist/\">verhuischecklist</a>."),
    ]),
    ("verhuisdag", "Op de verhuisdag", "Op de dag zelf", "Uw rol, de extra's en het afrekenen.", [
        ("Moet ik zelf aanwezig zijn bij het laden en lossen?",
         "Het is verstandig dat u of iemand namens u bij het laden en bij het afleveren aanwezig is. Dan kunt u aanwijzingen geven over wat waar moet komen, en zichtbare schade meldt u volgens de voorwaarden bij de aflevering zelf."),
        ("Sluiten jullie de wasmachine aan en hangen jullie de lampen op?",
         "Ja, dat hoort bij onze service: witgoed aansluiten, lampen en schilderijen ophangen, en kasten en apparatuur meteen op de juiste plek zetten. Geef bij de opname aan wat u wilt laten doen, dan staat het in de offerte. Zie ook <a href=\"/diensten/#d-montage-demontage\">montage en demontage</a>."),
        ("Hoe en wanneer betaal ik?",
         "U betaalt na de verhuizing, per bank. Contant geld hoeft u niet in huis te halen en vooruitbetalen voor werk dat nog gedaan moet worden hoeft evenmin. De voorwaarden gaan uit van betaling bij aflevering, maar staan uitdrukkelijk toe daar iets anders over af te spreken; bij ons is dat de vaste afspraak."),
    ]),
    ("schade", "Verzekering, schade en annuleren", "Als er iets misgaat, of iets verandert", "De regels hiervoor komen uit de voorwaarden van Erkende Verhuizers, niet uit een huisregel. Ze gelden voor elke particuliere verhuizing die wij doen.", [
        ("Is mijn inboedel verzekerd tijdens de verhuizing?",
         "Ja. Als Erkende Verhuizer werken wij volgens de Algemene Voorwaarden voor Verhuizingen, en daarin is uw inboedel tijdens de verhuizing verzekerd. U ontvangt bovendien een Garantiecertificaat: dat beschermt uw aanbetaling en garandeert dat de verhuizing doorgaat, ook als er bij ons iets misgaat. De verzekerde bedragen per gebied en de uitzonderingen staan op <a href=\"/verzekering/#bedragen\">verzekering</a>; de voorwaardentekst zelf vindt u onder <a href=\"/algemene-voorwaarden/#avvv\">AVVV 2025</a>."),
        ("Wat doe ik als er iets beschadigd blijkt?",
         "Zichtbare schade meldt u bij de aflevering; daarna is het verstandig om de schade binnen twee werkdagen ook schriftelijk of per e-mail te melden. Blijft een melding langer dan veertien dagen uit, dan geldt de verhuizing als zonder waarneembare schade uitgevoerd. Uw inboedel is bij een verhuizing binnen Nederland verzekerd tot 100.000 euro op nieuwwaarde; hoe dat werkt leest u bij <a href=\"/verzekering/\">verzekering</a>."),
        ("Hoe hoog is het eigen risico bij schade?",
         "Schade tot en met 50 euro is voor uw eigen rekening. Daarboven geldt de verzekering tot 100.000 euro op nieuwwaarde; is de dagwaarde van iets minder dan 40 procent van de nieuwwaarde, dan wordt de dagwaarde vergoed."),
        ("Zijn sieraden, kunst en verzamelingen ook gedekt?",
         "Deels, met grenzen: bij diefstal van sieraden maximaal 5.000 euro per gebeurtenis, en kostbaarheden en waardevolle verzamelingen vallen tot 20.000 euro binnen het verzekerde bedrag. Antiek en zeldzame voorwerpen worden tegen marktwaarde vergoed. Is uw collectie meer waard, meld dat dan vooraf en overweeg een aparte verzekering."),
        ("Kan ik de verhuizing nog annuleren?",
         "Ja, maar tegen een vergoeding die oploopt naarmate de datum dichterbij komt: tot 30 dagen vooraf 15 procent van de verhuisprijs, tussen 30 en 14 dagen 50 procent, tussen 14 en 7 dagen 75 procent en binnen 7 dagen het volledige bedrag. Kunnen wij zelf niet op de afgesproken dag en tijd komen, dan mag u de overeenkomst kosteloos opzeggen."),
        ("En als we er samen niet uitkomen?",
         "Dan legt u de klacht eerst bij ons neer. Komen wij er niet uit, dan kunt u binnen twaalf maanden naar de Geschillencommissie Verhuizen, die met een bindend advies beslist. Hoe dat precies gaat staat bij <a href=\"/klachtenregeling/\">klachtenregeling</a>."),
    ]),
    ("opslag", "Opslag", "Over inboedelopslag", "Voor wie tussen twee woningen zit, of gewoon ruimte tekortkomt.", [
        ("Kan mijn inboedel tijdelijk worden opgeslagen?",
         "Ja, tijdelijk of voor langere tijd. Handig als de sleuteloverdracht van uw nieuwe woning later valt dan de oplevering van de oude, of als u een tijd naar het buitenland gaat. Op de afgesproken dag brengen wij alles naar uw nieuwe adres. Voor opslag gelden de <a href=\"/algemene-voorwaarden/#avbv\">bewaarnemingsvoorwaarden</a> van Erkende Verhuizers; hoe de dienst werkt staat bij <a href=\"/diensten/#d-inboedelopslag\">inboedelopslag</a>."),
        ("Breng ik mijn spullen zelf naar de opslag, of halen jullie ze op?",
         "Dat bepaalt u. Wij kunnen uw inboedel ophalen en in de opslag zetten, maar u kunt hem ook zelf brengen. De spullen gaan in houten opslagkisten of in een eigen 20 ft- of 25 ft-container, in een verwarmd pand dat beveiligd is tegen brand en inbraak. Wat er tijdens de opslag verzekerd is en hoe lang, staat in de voorwaarden voor bewaarneming; zie ook onze <a href=\"/verzekering/\">verzekeringspagina</a>. Meer over de dienst bij <a href=\"/diensten/#d-inboedelopslag\">inboedelopslag</a>."),
        ("Hoe meld ik schade aan spullen die uit de opslag komen?",
         "Volgens de opslagvoorwaarden van Erkende Verhuizers meldt u zichtbare schade bij of direct na de teruggave, en niet-zichtbare schade uiterlijk binnen veertien dagen na de teruggave, schriftelijk of per e-mail. Gaat de opslag mee als onderdeel van een verhuizing binnen Nederland, dan zijn uw spullen de eerste twaalf maanden verzekerd op dezelfde voorwaarden als tijdens de verhuizing. Bij een verhuizing binnen Europa geldt die dekking de eerste dertig dagen. Wilt u daarna verzekerd blijven, dan kan dat tegen vergoeding; spreek dat af voordat de termijn afloopt."),
    ]),
    ("zakelijk", "Zakelijk en verder weg", "Bedrijven, en verhuizingen over de grens", "Voor een bedrijfsverhuizing gelden andere regels dan voor een particuliere, en over de grens komt er meer bij kijken.", [
        ("Verhuizen jullie ook buiten Venlo?",
         "Ja. Wij verhuizen in heel Noord- en Midden-Limburg, bijvoorbeeld in Blerick, Tegelen, Venray, Horst, Panningen, Reuver en Roermond, en door de rest van Nederland. Als lid van Top Movers werken wij daarbij samen met collega-leden door het hele land. Ook over de grens kunt u bij ons terecht; zie <a href=\"/diensten/#d-internationale-verhuizing\">internationale verhuizing</a>."),
        ("Gelden voor een bedrijfsverhuizing andere voorwaarden?",
         "Ja. Voor bedrijven en instellingen gelden de bedrijfsverhuisvoorwaarden: de aansprakelijkheid is beperkt tot 50.000 euro per wagenzending (en per verhuizing binnen een gebouw), u kunt vooraf schriftelijk een hogere waarde opgeven, en zichtbare schade meldt u direct bij aanneming met een voorbehoud, niet-zichtbare schade binnen een week. Ook annuleren kent een eigen staffel, gerekend in werkdagen."),
        ("Verhuizen jullie ook archieven en computers?",
         "Ja. Voor een bedrijfsverhuizing werken wij met rolcontainers, archiefbakken en computerboxen, en wij verzorgen ook archiefverhuizing en archiefopslag. Elk project krijgt een draaiboek dat het werk zo min mogelijk stilzet. Zie <a href=\"/diensten/#d-kantoorverhuizing\">kantoorverhuizing</a>."),
        ("Verhuizen jullie ook naar Belgi&euml;, Duitsland of verder in Europa?",
         "Ja. Vanuit onze organisatie rijden wekelijks wagens naar Duitsland, Frankrijk, Zwitserland en Oostenrijk, en naar Engeland verhuizen wij inclusief de douaneafhandeling. Binnen Europa is uw inboedel volgens de voorwaarden verzekerd tot ten minste 5.000 euro; voor een hogere dekking maken wij afspraken op maat. Meer op <a href=\"/diensten/#d-internationale-verhuizing\">internationale verhuizing</a>."),
    ]),
]


def faq(vragen):
    return "".join(f'      <details><summary>{v}<span class="faq__tk" aria-hidden="true"></span></summary><p>{a}</p></details>\n' for v, a in vragen)


register = "".join(f'      <li><a href="#vgv-{anker}">{label}<span>{len(vragen)}</span></a></li>\n' for anker, label, _, _, vragen in GROEPEN)
secties = ""
for i, (anker, label, kop, intro, vragen) in enumerate(GROEPEN):
    klas = "sectie" if i % 2 == 0 else "sectie sectie--creme2"
    secties += f"""<section class="{klas}" id="vgv-{anker}" aria-labelledby="vgv-{anker}-kop">
  <div class="wrap">
    <div class="sectiekop" data-reveal>
      <p class="label">{label}</p>
      <h2 class="kop" id="vgv-{anker}-kop">{kop}</h2>
      <p class="intro">{intro}</p>
    </div>
    <div class="faq" data-reveal>
{faq(vragen)}    </div>
  </div>
</section>

"""

CSS = """<style>
  /* Alleen voor /veelgestelde-vragen/ (prefix vgv): het onderwerpregister bovenaan en de afsluiting. */
  .vgv-register{list-style:none;margin:1.4rem 0 0;padding:0;display:flex;flex-wrap:wrap;gap:.55rem}
  .vgv-register a{display:inline-flex;align-items:center;gap:.5rem;padding:.55rem .95rem;border:1px solid var(--lijn);border-radius:999px;background:var(--wit);
    font:700 .9rem/1 var(--font-kop);color:var(--ant);text-decoration:none;box-shadow:var(--schaduw-kaart);transition:border-color .15s var(--ease),color .15s var(--ease)}
  .vgv-register a:hover{border-color:var(--goud);color:var(--goud-diep)}
  .vgv-register a span{font-size:.76rem;color:var(--goud-diep);background:var(--goud-licht);border-radius:999px;padding:.22rem .55rem}
  .vgv-slot{text-align:center;max-width:44rem;margin-inline:auto}
  .vgv-slot .knoprij{justify-content:center;margin-top:1.4rem}
  .vgv-slot .vgv-mail{display:block;margin-top:1rem;font-size:.95rem;color:var(--ant-zacht)}
  .vgv-slot .vgv-mail a{color:var(--goud-diep);font-weight:700;text-decoration:underline;text-underline-offset:3px}
</style>"""

aantal = sum(len(v) for *_, v in GROEPEN)
PAGINA = f"""<!-- ============ /veelgestelde-vragen/: GEGENEREERD door _werk/blok_veelgestelde_vragen.py, niet met de hand bewerken ============
     Vragen en antwoorden staan in GROEPEN in het script; bron per antwoord is FEITEN-KIEVIT.md. -->
{CSS}

<section class="sectie" aria-labelledby="vgv-intro-kop">
  <div class="wrap">
    <div class="sectiekop" data-reveal>
      <p class="label">Veelgestelde vragen</p>
      <h2 class="kop" id="vgv-intro-kop">Wat wilt u weten voordat u met ons verhuist?</h2>
      <p class="intro">Hieronder staan {aantal} vragen die ons vaak gesteld worden, gegroepeerd van offerte tot opslag. Waar een antwoord uit de
      voorwaarden van Erkende Verhuizers komt, zeggen wij dat erbij: die regels gelden voor elke verhuizing die wij doen en zijn geen
      huisregel die wij zelf kunnen veranderen. Over dozen, inpakken, de checklist en de calculators hebben die pagina's hun eigen vragen.</p>
    </div>
    <ul class="vgv-register" data-reveal aria-label="Onderwerpen">
{register}    </ul>
  </div>
</section>

{secties}<section class="sectie" aria-labelledby="vgv-slot-kop">
  <div class="wrap">
    <div class="vgv-slot" data-reveal>
      <p class="label">Staat uw vraag er niet bij?</p>
      <h2 class="kop" id="vgv-slot-kop">Stel hem gewoon, dan krijgt u antwoord van iemand die het weet</h2>
      <p class="intro">Bel of app ons op werkdagen, of stuur een e-mail. Gaat uw vraag over uw eigen verhuizing, vraag dan meteen een
      offerte aan: dan neemt onze verhuisadviseur alles met u door.</p>
      <div class="knoprij">
        <a class="btn btn--goud btn--groen" href="/#offerte"><svg aria-hidden="true"><use href="#i-caret"/></svg>Offerte aanvragen</a>
        <a class="btn btn--wa" href="{WA_VRAAG}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Vraag via WhatsApp</a>
        <a class="btn btn--lijn" href="{navigatie.TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>Bel {navigatie.TEL}</a>
      </div>
      <span class="vgv-mail">Of mail naar <a href="mailto:{MAIL}">{MAIL}</a></span>
    </div>
  </div>
</section>
"""

assert "—" not in PAGINA and "–" not in PAGINA, "em- of en-dash in de tekst"
DOEL.parent.mkdir(exist_ok=True)
DOEL.write_text(PAGINA, encoding="utf-8")
print(f"{DOEL.relative_to(WERK.parent)}: {aantal} vragen in {len(GROEPEN)} groepen, {len(PAGINA.splitlines())} regels")
