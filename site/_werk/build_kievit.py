#!/usr/bin/env python3
"""Bouwt site/index.html (homepage De Kievit Verhuizingen) uit de Heerlijk Thuis-lander.

Werkwijze: de bron (verhuizen/index.html van mijnheerlijkthuis-landing) wordt vers ingelezen, de
paden gaan naar /assets/, en daarna wordt per sectie de inhoud vervangen door de Kievit-inhoud.
De HTML-structuur en de klassen blijven identiek, zodat de CSS (Top Movers-omzetting door de
huisstijl-sessie) er zonder wijziging op past. Alle feiten en claims komen uit
onderzoek/07 en onderzoek/08 (hoofdstuk 08 sectie 2.1 = toegestane claims) en uit het
Klantenvertellen-profiel 1034282 (letterlijke reviews, peildatum 28-08-2026).

Draaien: python3 site/_werk/build_kievit.py   (vanuit ~/website-kieviet)
"""
import re, sys, pathlib

import adresveld
import css_min
import navigatie
import snoei

BRON = pathlib.Path.home() / "mijnheerlijkthuis-landing/verhuizen/index.html"
SITE = pathlib.Path(__file__).resolve().parents[1]


def svg_maat(rel):
    """(breedte, hoogte) uit de viewBox van een svg in site/, voor de width/height-attributen."""
    m = re.search(r'viewBox="[\d.\-]+ [\d.\-]+ ([\d.]+) ([\d.]+)"', (SITE / rel).read_text(encoding="utf-8"))
    return (round(float(m.group(1))), round(float(m.group(2)))) if m else (100, 100)


def sterren(cijfer, extra=""):
    """Sterrenrij zoals Klantenvertellen hem toont: cijfer/2, dus een 9 is vier hele plus een halve."""
    vol, half = cijfer // 2, cijfer % 2
    uit = []
    for i in range(5):
        k = "" if i < vol else (" sterren__s--half" if half and i == vol else " sterren__s--leeg")
        uit.append(f'<span class="sterren__s{k}"><svg class="sterren__leeg"><use href="#i-star"/></svg>'
                   f'<svg class="sterren__vol"><use href="#i-star"/></svg></span>')
    return (f'<span class="sterren{extra}" role="img" aria-label="{cijfer} van de 10">'
            + "".join(uit) + "</span>")


KVW, KVH = svg_maat("assets/img/keurmerk/klantenvertellen.svg")
DOEL = pathlib.Path(__file__).resolve().parents[1] / "index.html"
BUSTER = sys.argv[1] if len(sys.argv) > 1 else navigatie.BUSTER

# style.min.css is style.css zonder commentaar; hier schrijven zodat hij nooit achterloopt.
_v, _n = css_min.schrijf()
print(f"css: {_v:,} -> {_n:,} bytes (style.min.css)")

TEL = "077 - 32 32 100"
TELHREF = "tel:0773232100"
WA = "https://wa.me/31773232100"   # OPEN: klant moet bevestigen dat dit nummer WhatsApp heeft
MAIL = "info@de-kievit.nl"
KV = "https://www.klantenvertellen.nl/reviews/1034282/erkende_verhuizer_de_kievit_verhuizingen_top+movers"
OEV = "https://www.erkendeverhuizers.nl/lid/de-kievit-verhuizingen-top-movers/"

s = BRON.read_text(encoding="utf-8")
s = s.replace("/verhuizen/assets/", "/assets/")


def vervang_blok(tekst, start_marker, eind_tag, nieuw):
    """Vervangt het blok dat met start_marker begint tot en met de eerstvolgende eind_tag."""
    i = tekst.index(start_marker)
    j = tekst.index(eind_tag, i) + len(eind_tag)
    return tekst[:i] + nieuw + tekst[j:]


def vervang1(tekst, oud, nieuw):
    n = tekst.count(oud)
    assert n == 1, f"{n}x gevonden: {oud[:70]!r}"
    return tekst.replace(oud, nieuw)


def vervang_alle(tekst, oud, nieuw, minimaal=1):
    n = tekst.count(oud)
    assert n >= minimaal, f"{n}x gevonden (minimaal {minimaal}): {oud[:70]!r}"
    return tekst.replace(oud, nieuw)


# ---------------------------------------------------------------- dozencalculator: geen harde grenzen
# De drie velden van de uitklapper staan IN het offerteformulier en hebben geen name, dus ze worden
# niet meeverstuurd. Elke harde grens erop kan het versturen wel blokkeren: bij 52 m2 (step="5")
# keurde de browser het veld af en ging het formulier niet weg, en omdat de uitklapper dan is
# dichtgeklapt zag de bezoeker geen melding. Bij Feitsma liepen twee bezoekers daarop vast
# (09-09-2026); kievit.js verzamelt zelf alles wat checkValidity() afkeurt, dus hier gebeurde
# hetzelfde met "Controleer woonoppervlak." naar een veld dat niemand ziet. De rekenkern begrenst
# de uitkomst zelf al (5 tot 400 dozen) en leest de velden met parseInt.
s = vervang1(s, '<input id="lf-m2" type="number" inputmode="numeric" value="90" min="10" max="600" step="5">',
             '<input id="lf-m2" type="number" inputmode="numeric" value="90">')
s = vervang1(s, '<input id="lf-kamers" type="number" inputmode="numeric" value="3" min="0" max="20">',
             '<input id="lf-kamers" type="number" inputmode="numeric" value="3">')
s = vervang1(s, '<input id="lf-bewoners" type="number" inputmode="numeric" value="2" min="1" max="15">',
             '<input id="lf-bewoners" type="number" inputmode="numeric" value="2">')
# Het losse blok staat buiten elk formulier en blokkeert dus niets, maar stapte wel per vijf meter.
s = vervang1(s, '<input id="c-m2" type="number" inputmode="numeric" value="90" min="10" max="600" step="5">',
             '<input id="c-m2" type="number" inputmode="numeric" value="90" min="10" max="600" step="1">')


# ---------------------------------------------------------------- head
HEAD = f'''<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Verhuisbedrijf Venlo | De Kievit Verhuizingen</title>
<meta name="description" content="Erkende Verhuizer in Venlo voor Noord- en Midden-Limburg: particuliere en zakelijke verhuizingen, inpakservice, montage en inboedelopslag. Klantcijfer 9,4.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="theme-color" content="#00A19B">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<script>document.documentElement.className+=' js'</script>
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/notosans-300-700-latin.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/poppins-700-latin.woff2" crossorigin>
<link rel="preload" as="image" href="/assets/img/hero-bg-1920.webp" imagesrcset="/assets/img/hero-bg-1280.webp 1280w, /assets/img/hero-bg-1920.webp 1920w" imagesizes="100vw" media="(min-width:761px)" fetchpriority="high">
<link rel="preload" as="image" href="/assets/img/hero-bg-mobiel.webp" media="(max-width:760px)" fetchpriority="high">
<link rel="preload" as="image" href="/assets/img/team-cutout-trio-g4-1600.webp" imagesrcset="/assets/img/team-cutout-trio-g4-900.webp 900w, /assets/img/team-cutout-trio-g4-1600.webp 1600w" imagesizes="(max-width:1080px) 92vw, 740px" fetchpriority="low">
<link rel="stylesheet" href="/assets/css/style.min.css?v={BUSTER}">
<script src="/assets/js/kievit.js?v={BUSTER}" defer></script>
<link rel="canonical" href="{navigatie.DOMEIN}/">
<meta property="og:url" content="{navigatie.DOMEIN}/">
<meta property="og:type" content="website">
<meta property="og:locale" content="nl_NL">
<meta property="og:title" content="Verhuisbedrijf in Venlo en Noord- en Midden-Limburg | De Kievit Verhuizingen">
<meta property="og:description" content="Erkende Verhuizer en lid van Top Movers. Particulier en zakelijk verhuizen, in- en uitpakservice, montage en inboedelopslag. Beoordeeld met een 9,4 op Klantenvertellen. Vraag gratis een offerte aan.">
<meta property="og:image" content="{navigatie.DOMEIN}/assets/img/og.jpg">
<script type="application/ld+json">
{{"@context":"https://schema.org","@graph":[
{{"@type":"Organization","@id":"{navigatie.DOMEIN}/#organisatie","name":"De Bresser Verhuizingen B.V.","url":"https://www.debresser.nl/","identifier":{{"@type":"PropertyValue","propertyID":"KvK","value":"18014730"}}}},
{{"@type":"MovingCompany","@id":"{navigatie.DOMEIN}/#bedrijf","name":"De Kievit Verhuizingen","alternateName":"De Kievit Verhuizingen Top Movers","url":"{navigatie.DOMEIN}/","parentOrganization":{{"@id":"{navigatie.DOMEIN}/#organisatie"}},"memberOf":{{"@type":"Organization","name":"Top Movers Nederland B.V.","url":"https://www.topmovers.nl/"}},"telephone":"+31773232100","email":"{MAIL}","image":"{navigatie.DOMEIN}/assets/img/og.jpg","address":{{"@type":"PostalAddress","streetAddress":"Van Coehoornstraat 11","postalCode":"5916 PH","addressLocality":"Venlo","addressCountry":"NL"}},"areaServed":["Venlo","Blerick","Tegelen","Belfeld","Reuver","Velden","Venray","Horst","Panningen","Baarlo","Maasbree","Roermond","Weert"],"openingHoursSpecification":[{{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"08:00","closes":"17:00"}}],"sameAs":["{OEV}","{KV}","https://nl.linkedin.com/company/de-kievit-verhuizingen","https://www.topmovers.nl/vestigingen/de-kievit-verhuizingen/"]}},
{{"@type":"WebSite","@id":"{navigatie.DOMEIN}/#website","url":"{navigatie.DOMEIN}/","name":"De Kievit Verhuizingen","inLanguage":"nl-NL","publisher":{{"@id":"{navigatie.DOMEIN}/#bedrijf"}}}},
{{"@type":"WebPage","@id":"{navigatie.DOMEIN}/#pagina","url":"{navigatie.DOMEIN}/","name":"Verhuisbedrijf Venlo","isPartOf":{{"@id":"{navigatie.DOMEIN}/#website"}},"about":{{"@id":"{navigatie.DOMEIN}/#bedrijf"}},"inLanguage":"nl-NL"}}
]}}
</script>
</head>'''
s = vervang_blok(s, "<head>", "</head>", HEAD)

# ---------------------------------------------------------------- topbar en menu (site/_werk/navigatie.py)
TOPBAR = navigatie.topbar_html("#offerte", huidig="/") + "\n\n" + navigatie.drawer_html("#offerte", huidig="/")
s = vervang_blok(s, '<header class="topbar"', "</header>", TOPBAR)

# ---------------------------------------------------------------- hero
HERO = '''<section class="hero" aria-labelledby="hero-titel">
  <picture class="hero__bg">
    <source media="(max-width:760px)" srcset="/assets/img/hero-bg-mobiel.webp" width="900" height="1200">
    <img src="/assets/img/hero-bg-1920.webp" srcset="/assets/img/hero-bg-1280.webp 1280w, /assets/img/hero-bg-1920.webp 1920w" sizes="100vw" width="1920" height="1280" alt="" fetchpriority="high" decoding="async">
  </picture>
  <video class="hero__video" muted loop playsinline preload="none" aria-hidden="true" data-src="/assets/video/hero-echt-1920.mp4" data-src-klein="/assets/video/hero-echt-1280.mp4"></video>
  <div class="hero__veil" aria-hidden="true"></div>
  <div class="hero__grain" aria-hidden="true"></div>
  <picture class="hero__pic">
    <img class="hero__person" src="/assets/img/team-cutout-trio-g4-1600.webp" srcset="/assets/img/team-cutout-trio-g4-900.webp 900w, /assets/img/team-cutout-trio-g4-1600.webp 1600w" sizes="(max-width:1080px) 92vw, 740px" width="1600" height="915" alt="Drie medewerkers van Top Movers met de duim omhoog" fetchpriority="high" decoding="async">
  </picture>
  <button class="hero__videoknop" id="heroVideoKnop" type="button" hidden aria-pressed="false">
    <svg viewBox="0 0 12 14" aria-hidden="true"><rect x="1" y="1" width="3.5" height="12" rx="1"/><rect x="7.5" y="1" width="3.5" height="12" rx="1"/></svg>
    <span class="hero__videoknop__lbl">Film pauzeren</span>
  </button>
  <div class="wrap">
    <div class="hero__content">
      <span class="eyebrow" data-reveal>Erkende Verhuizer in Venlo</span>
      <h1 class="hero__title hero__title--merk" id="hero-titel" data-reveal style="transition-delay:.08s">De Kievit Verhuizingen<span class="hero__title__sub">verhuisbedrijf in <em>Venlo</em> en heel Noord- en Midden-Limburg</span></h1>
          </div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="hero"', "</section>", HERO)

# ---------------------------------------------------------------- offerte-pill
OFFERTE = f'''<section class="offerte-overlay" id="prijs" aria-label="Offerte aanvragen">
  <div class="of-wrap">
    <div class="of-box">
      <div class="of-trust keurmerken" data-reveal-groep aria-label="Beoordelingen en keurmerk">
        <a class="keurmerk keurmerk--kv keurmerk--score" href="{KV}" target="_blank" rel="noopener nofollow" aria-label="9,4 op Klantenvertellen"><img src="/assets/img/keurmerk/klantenvertellen.svg" alt="Beoordeeld op Klantenvertellen" width="{KVW}" height="{KVH}"><span class="keurmerk__cijfer">9,4</span></a>
        <a class="keurmerk keurmerk--ev" href="{OEV}" target="_blank" rel="noopener nofollow"><img src="/assets/img/keurmerk/erkende-verhuizers-wit.svg" alt="Erkende Verhuizers" width="400" height="200"></a>
        <span class="keurmerk keurmerk--tekst"><span class="keurmerk__kop">779</span><span class="keurmerk__sub">beoordelingen, 99% beveelt aan</span></span>
      </div>
      <h2 class="of-title">Uw offerte, gratis en vrijblijvend</h2>
      <p class="of-sub">Een persoonlijke prijs van het verhuisbedrijf dat Venlo al sinds 1910 kent. Vertel kort waar u vandaan komt, waar u naartoe gaat en wanneer u de sleutel krijgt, dan nemen wij binnen 24 uur contact met u op en ontvangt u een offerte waarin precies staat wat wij doen en wat het kost.</p>
      <form class="of-form" id="ofForm" action="#offerte">
        <div class="of-pill">
          <label class="of-field"><span>Van</span><input id="of-van" type="text" placeholder="Postcode + huisnummer" autocomplete="street-address"></label>
          <span class="of-divider" aria-hidden="true"></span>
          <label class="of-field"><span>Naar</span><input id="of-naar" type="text" placeholder="Postcode + huisnummer" autocomplete="street-address"></label>
          <span class="of-divider" aria-hidden="true"></span>
          <label class="of-field"><span>Wanneer</span><input id="of-datum" type="date" aria-label="Verhuisdatum"></label>
          <span class="of-divider" aria-hidden="true"></span>
          <label class="of-field"><span>Type woning</span>
            <select id="of-woning" aria-label="Type woning">
              <option value="">Kies woning</option>
              <option>Appartement</option>
              <option>Eengezinswoning</option>
              <option>Studio / kamer</option>
              <option>Tussenwoning</option>
              <option>Vrijstaande woning</option>
              <option>Kantoor / bedrijf</option>
              <option>Anders</option>
            </select>
          </label>
          <button class="of-cta" type="submit">Offerte aanvragen<svg aria-hidden="true"><use href="#i-caret"/></svg></button>
        </div>
      </form>
    </div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="offerte-overlay"', "</section>", OFFERTE)

# ---------------------------------------------------------------- trust
TRUST = '''<section class="trust" aria-label="Kerncijfers">
  <div class="wrap trust__in">
    <div class="trust__item"><span class="trust__ico"><svg viewBox="0 0 100 100" aria-hidden="true"><use href="#ik-rating"/></svg></span><span><b>9,4 op Klantenvertellen</b>779 beoordelingen, 99% beveelt aan</span></div>
    <div class="trust__item"><span class="trust__ico"><svg viewBox="0 0 100 100" aria-hidden="true"><use href="#ik-medaille"/></svg></span><span><b>Erkende Verhuizer</b>Garantiecertificaat en verzekerde inboedel</span></div>
    <div class="trust__item"><span class="trust__ico"><svg viewBox="0 0 100 100" aria-hidden="true"><use href="#ik-huis"/></svg></span><span><b>Sinds 1910 in Venlo</b>meer dan honderd jaar verhuiservaring</span></div>
    <div class="trust__item"><span class="trust__ico"><svg viewBox="0 0 100 100" aria-hidden="true"><use href="#ik-team"/></svg></span><span><b>Lid van Top Movers</b>landelijk netwerk van erkende verhuizers</span></div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="trust"', "</section>", TRUST)

# ---------------------------------------------------------------- diensten
DIENSTEN = f'''<section class="sectie ring" id="diensten" aria-labelledby="diensten-kop">
  <div class="wrap">
    <div class="sectiekop sectiekop--midden" data-reveal>
      <p class="label">Verhuisservice</p>
      <h2 class="kop" id="diensten-kop">Wat wij voor u regelen</h2>
      <p class="intro">Van een compleet verzorgde verhuizing tot alleen het zware werk: u kiest wat u uit handen geeft en wat u liever zelf doet. Onze verhuisadviseur komt vooraf bij u langs, brengt de inboedel in kaart en maakt een plan, zodat op de verhuisdag iedereen weet wat er moet gebeuren. Hieronder ziet u waar u bij De Kievit voor terecht kunt, van verhuisdozen en inpakken tot montage, inboedelopslag en zakelijke verhuizingen.</p>
    </div>
    <div class="diensten">
      <a class="dienst" href="{navigatie.toon_href("/particulier-verhuizen/")}" data-reveal><div class="dienst__nis"><img src="/assets/img/dienst-compleet-760.webp" srcset="/assets/img/dienst-compleet-400.webp 400w, /assets/img/dienst-compleet-760.webp 760w, /assets/img/dienst-compleet-1120.webp 1120w" sizes="(min-width:901px) 380px, (min-width:561px) 44vw, calc(100vw - 60px)" width="760" height="435" alt="Twee verhuizers van Top Movers dragen samen een kast" loading="lazy" decoding="async"><span class="dienst__nr" aria-hidden="true">01</span></div><div class="dienst__tekst"><h3>Complete verhuizing</h3><p>Lokaal, door heel Nederland of over de grens: ons verhuisteam laadt, vervoert en zet alles veilig op zijn plek in uw nieuwe woning. Kwetsbare meubels gaan in verhuisdekens de wagen in, en is het trapgat te smal, dan kijken wij of een verhuislift uitkomst biedt. Wat er bij een particuliere verhuizing precies is geregeld, staat op die pagina.</p></div></a>
      <a class="dienst" href="{navigatie.toon_href("/inpakservice/")}" data-reveal style="transition-delay:.06s"><div class="dienst__nis"><img src="/assets/img/dienst-inpak-760.webp" srcset="/assets/img/dienst-inpak-400.webp 400w, /assets/img/dienst-inpak-760.webp 760w, /assets/img/dienst-inpak-1120.webp 1120w" sizes="(min-width:901px) 380px, (min-width:561px) 44vw, calc(100vw - 60px)" width="760" height="435" alt="Verhuizer van Top Movers pakt een plant in, tussen verhuisdozen van Top Movers" loading="lazy" decoding="async"><span class="dienst__nr" aria-hidden="true">02</span></div><div class="dienst__tekst"><h3>In- en uitpakservice en verhuisdozen</h3><p>Wij leveren de verhuisdozen en pakken op verzoek uw hele inboedel zorgvuldig in, van glaswerk en servies tot de inhoud van de kasten. Op elke doos komt een etiket met de kamer waar hij heen moet, en na de verhuizing halen wij de lege dozen weer bij u op.</p></div></a>
      <a class="dienst" href="{navigatie.toon_href("/montage-demontage/")}" data-reveal style="transition-delay:.12s"><div class="dienst__nis"><img src="/assets/img/dienst-montage-760.webp" srcset="/assets/img/dienst-montage-400.webp 400w, /assets/img/dienst-montage-760.webp 760w, /assets/img/dienst-montage-1120.webp 1120w" sizes="(min-width:901px) 380px, (min-width:561px) 44vw, calc(100vw - 60px)" width="760" height="435" alt="Verhuizer van Top Movers monteert een hanglamp" loading="lazy" decoding="async"><span class="dienst__nr" aria-hidden="true">03</span></div><div class="dienst__tekst"><h3>Demontage en montage</h3><p>Kasten, bedden en boxsprings halen wij bij u thuis uit elkaar en zetten wij op het nieuwe adres weer in elkaar. Ook het aansluiten van uw wasmachine of koelkast nemen wij mee, zodat u meteen kunt beginnen met wonen.</p></div></a>
      <a class="dienst" href="{navigatie.toon_href("/inboedelopslag/")}" data-reveal><div class="dienst__nis"><img src="/assets/img/dienst-opslag-760.webp" srcset="/assets/img/dienst-opslag-400.webp 400w, /assets/img/dienst-opslag-760.webp 760w, /assets/img/dienst-opslag-1120.webp 1120w" sizes="(min-width:901px) 380px, (min-width:561px) 44vw, calc(100vw - 60px)" width="760" height="435" alt="Opslagcontainer met verhuisdozen van Top Movers" loading="lazy" decoding="async"><span class="dienst__nr" aria-hidden="true">04</span></div><div class="dienst__tekst"><h3>Inboedelopslag</h3><p>Zit er tijd tussen uw oude en uw nieuwe woning, of verhuist u tijdelijk naar het buitenland? Uw inboedel gaat in houten opslagkisten of een eigen 20 ft of 25 ft container, tot u hem weer nodig heeft. Van een enkel meubelstuk tot een complete inboedel, tijdelijk of voor langere tijd.</p></div></a>
      <a class="dienst" href="{navigatie.toon_href("/kantoorverhuizing/")}" data-reveal style="transition-delay:.06s"><div class="dienst__nis"><img src="/assets/img/dienst-zakelijk-760.webp" srcset="/assets/img/dienst-zakelijk-400.webp 400w, /assets/img/dienst-zakelijk-760.webp 760w, /assets/img/dienst-zakelijk-1120.webp 1120w" sizes="(min-width:901px) 380px, (min-width:561px) 44vw, calc(100vw - 60px)" width="760" height="435" alt="Verhuizer van Top Movers rijdt een rolcontainer met verhuiskratten door een kantoor" loading="lazy" decoding="async"><span class="dienst__nr" aria-hidden="true">05</span></div><div class="dienst__tekst"><h3>Zakelijke verhuizing</h3><p>Kantoren, praktijken, scholen en zorginstellingen verhuizen wij volgens een draaiboek, buiten uw werktijden als dat moet. Rolcontainers, archiefbakken en computerboxen zorgen dat uw mensen op de eerste werkdag gewoon weer aan de slag kunnen.</p></div></a>
      <a class="dienst" href="{navigatie.toon_href("/werkwijze/")}" data-reveal style="transition-delay:.12s" data-wa-plan><div class="dienst__nis"><img src="/assets/img/dienst-plan-760.webp" srcset="/assets/img/dienst-plan-400.webp 400w, /assets/img/dienst-plan-760.webp 760w, /assets/img/dienst-plan-1120.webp 1120w" sizes="(min-width:901px) 380px, (min-width:561px) 44vw, calc(100vw - 60px)" width="760" height="435" alt="Verhuisadviseur van Top Movers schudt een klant de hand" loading="lazy" decoding="async"><span class="dienst__nr" aria-hidden="true">06</span></div><div class="dienst__tekst"><h3>Verhuisplan aan huis</h3><p>Voor de verhuizing komt onze verhuisadviseur bij u langs om de inboedel, de verdieping en de bereikbaarheid van beide adressen te bekijken. Daarna weet u precies wat wij doen en wat het kost: een offerte zonder verrassingen achteraf.</p></div></a>
    </div>
    <div class="wa-rij" data-reveal><a class="btn btn--wa btn--groen" href="{WA}?text=Hallo%2C%20ik%20weet%20nog%20niet%20welke%20onderdelen%20van%20de%20verhuizing%20ik%20uit%20handen%20wil%20geven.%20Kunt%20u%20meedenken%3F" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Welke dienst past? App ons</a></div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="sectie ring" id="diensten"', "</section>", DIENSTEN)

# ---------------------------------------------------------------- opslag-band
OPSLAG = f'''<section class="opslag" id="opslag" aria-labelledby="opslag-kop">
  <div class="opslag__band" aria-hidden="true"><img class="opslag__mark" src="/assets/img/mark-wit.svg" alt="" width="494" height="507"><img class="opslag__script" src="/assets/img/logo-topmovers-wit.svg" alt="" width="813" height="387"></div>
  <div class="opslag__lijn" aria-hidden="true"></div>
  <div class="wrap opslag__in">
    <div class="opslag__kaart" data-reveal>
      <p class="label">Inboedelopslag</p>
      <h2 class="kop" id="opslag-kop">Even geen plek? Wij slaan uw inboedel op</h2>
      <p class="intro">Tijdelijk of voor langere tijd: uw inboedel staat bij De Kievit in houten opslagkisten of een eigen container. Op de afgesproken dag brengen wij alles naar uw nieuwe adres.</p>
      <div class="knoprij"><a class="btn btn--goud btn--groen" href="#offerte">Vraag opslag aan</a><a class="btn btn--omlijnd" href="{TELHREF}">Bel {TEL}</a></div>
    </div>
    <div class="opslag__fig"><img class="opslag__persoon" src="/assets/img/duo-opslag-1600.webp" srcset="/assets/img/duo-opslag-1000.webp 1000w, /assets/img/duo-opslag-1600.webp 1600w" sizes="(max-width:900px) 94vw, 640px" width="1600" height="1663" alt="Twee verhuizers van Top Movers stapelen verhuisdozen" loading="lazy" decoding="async"></div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="opslag"', "</section>", OPSLAG)

# ---------------------------------------------------------------- dozenkaart
DOZEN = f'''<section class="dozen" id="dozen">
  <div class="wrap">
    <div class="dozen__card" data-reveal>
      <div class="dozen__body">
        <span class="eyebrow">Verhuisdozen en inpakken</span>
        <h2>Verhuisdozen krijgt u van ons</h2>
        <p>U hoeft niet zelf naar dozen te zoeken. Wij brengen stevige verhuisdozen ruim voor de verhuizing bij u langs, met etiketten voor de kamer waar ze heen moeten, en halen ze na afloop weer op. Wilt u het inpakken ook uit handen geven, dan pakt ons team al uw spullen zorgvuldig in. Op de verhuisdag staat alles klaar en gaat het veilig mee in de wagen.</p>
        <p class="wa-rij wa-rij--links"><a class="btn btn--wa" href="{WA}?text=Hallo%2C%20ik%20wil%20verhuisdozen%20van%20De%20Kievit.%20Ik%20denk%20dat%20ik%20er%20ongeveer%20...%20nodig%20heb." target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>App uw aantal dozen</a></p>
      </div>
      <div class="dozen__media">
        <img src="/assets/img/dozen-vak-1100.webp" srcset="/assets/img/dozen-vak-700.webp 700w, /assets/img/dozen-vak-1100.webp 1100w" sizes="(max-width:860px) 90vw, 460px" alt="Verhuizer van Top Movers naast verhuisdozen op het plateau van de verhuislift" width="1100" height="1100" loading="lazy" decoding="async">
        <div class="badge"><span class="badge__ab">&#10003;</span><span class="badge__abk">Verhuisdozen geregeld</span></div>
      </div>
    </div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="dozen"', "</section>", DOZEN)

# ---------------------------------------------------------------- calculator (alleen nummer en merk)
s = vervang1(s, "Bij het bezoek aan huis nemen wij de schatting samen met u door en passen wij hem aan als dat nodig is.",
             "Bij de opname aan huis neemt onze verhuisadviseur de schatting samen met u door en past hij hem aan als dat nodig is.")

# ---------------------------------------------------------------- venster (direct een offerte)
VENSTER = f'''<section class="venster" id="offerte-per-mail" aria-labelledby="venster-kop">
  <img class="venster__mark" src="/assets/img/mark-wit.svg" alt="" aria-hidden="true" width="494" height="507">
  <div class="wrap venster__in">
    <div class="venster__tekst" data-reveal>
      <p class="label">Direct een offerte</p>
      <h2 class="kop" id="venster-kop">Benieuwd naar de kosten? Vraag vandaag nog een offerte aan</h2>
      <p class="intro">Vul vrijblijvend het offerteformulier in. Wij nemen binnen 24 uur contact met u op om de details door te nemen: de verdieping, het trapgat, of er ingepakt moet worden en of er meubels uit elkaar moeten. Zo krijgt u een prijs die bij uw situatie past en niet bij een gemiddelde. De offerte is gratis en verplicht u tot niets. Liever eerst overleggen? Dat kan via <a href="/contact/">contact</a>.</p>
      <div class="knoprij"><a class="btn btn--goud btn--groen" href="#offerte">Offerte aanvragen</a><a class="btn btn--omlijnd" href="{TELHREF}">Bel {TEL}</a></div>
    </div>
    <div class="venster__fig">
      <div class="venster__boog" aria-hidden="true"></div>
      <img class="venster__persoon" src="/assets/img/figuur-duo-lachen-1100.webp" srcset="/assets/img/figuur-duo-lachen-700.webp 700w, /assets/img/figuur-duo-lachen-1100.webp 1100w" sizes="(max-width:900px) 94vw, 487px" width="1100" height="907" alt="Twee lachende mannen, een in oranje veiligheidshesje en een verhuizer in Top Movers-polo, arm om elkaar" loading="lazy" decoding="async">
    </div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="venster"', "</section>", VENSTER)

# ---------------------------------------------------------------- werkwijze
WERKWIJZE = f'''<section class="sectie sectie--creme2" id="werkwijze" aria-labelledby="werkwijze-kop">
  <div class="wrap">
    <div class="werkwijze__top">
      <div class="sectiekop" data-reveal>
        <p class="label">Zo werkt het</p>
        <h2 class="kop" id="werkwijze-kop">Zo verloopt uw verhuizing</h2>
        <p class="intro">Vier stappen, en bij elke stap weet u waar u aan toe bent. Van het eerste telefoontje tot het moment dat de laatste doos binnen staat houdt u hetzelfde aanspreekpunt in Venlo, zodat u nooit opnieuw uw verhaal hoeft te doen.</p>
      </div>
      <figure class="werkwijze__wagen" data-reveal aria-hidden="true">
        <img src="/assets/img/wagen-werkwijze-1400.webp" srcset="/assets/img/wagen-werkwijze-900.webp 900w, /assets/img/wagen-werkwijze-1400.webp 1400w" sizes="(max-width:900px) 88vw, 46vw" width="1400" height="883" alt="" loading="lazy" decoding="async">
      </figure>
    </div>
    <ol class="stappen">
      <li class="stap" data-reveal><span class="stap__nr" aria-hidden="true">01</span><h3>Neem contact op</h3><p>Bel {TEL} of vraag online een offerte aan. Vertel kort waar u vandaan komt, waar u naartoe gaat en wanneer u wilt verhuizen. Wij kijken meteen of die datum nog vrij is en wat er nodig is aan mensen, materiaal en tijd.</p></li>
      <li class="stap" data-reveal style="transition-delay:.06s"><span class="stap__nr" aria-hidden="true">02</span><h3>Opname aan huis</h3><p>Onze verhuisadviseur komt bij u langs en maakt een plan: welke meubels uit elkaar moeten, wat er ingepakt wordt en waar de wagen kan staan. U ontvangt daarna een gratis en vrijblijvende offerte waarin precies staat wat wij doen en wat het kost.</p></li>
      <li class="stap" data-reveal style="transition-delay:.12s"><span class="stap__nr" aria-hidden="true">03</span><h3>Inpakken en verhuizen</h3><p>Op de verhuisdag pakt het team in, demonteert wat nodig is en brengt alles veilig naar uw nieuwe adres. Kwetsbare stukken gaan in verhuisdekens de wagen in en de dozen komen per kamer bij elkaar te staan, zodat u op het nieuwe adres niet hoeft te zoeken.</p></li>
      <li class="stap" data-reveal style="transition-delay:.18s"><span class="stap__nr" aria-hidden="true">04</span><h3>Thuis in uw nieuwe woning</h3><p>Meubels gemonteerd, wasmachine aangesloten, dozen op hun plek. U betaalt pas na de verhuizing, per bank op factuur, en de lege verhuisdozen halen wij later weer bij u op.</p></li>
    </ol>
    <div class="wa-rij" data-reveal><a class="btn btn--wa" href="{WA}?text=Hallo%2C%20ik%20wil%20mijn%20verhuizing%20in%20gang%20zetten.%20Wanneer%20kan%20de%20verhuisadviseur%20langskomen%3F" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Begin met een appje</a></div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="sectie sectie--creme2" id="werkwijze"', "</section>", WERKWIJZE)

# ---------------------------------------------------------------- waarom + team van de homepage af
# De blokken "Verhuizen zonder verhuisstress" en "Vakmensen met een verhuisdiploma" staan sinds
# 28-aug-2026 niet meer op de homepage maar op elke dienstenpagina. De HTML woont nu in
# _werk/build_paginas.py; hier gaat de hele sectie eruit, inclusief de lege regel erachter.
s = vervang_blok(s, '<section class="sectie" id="waarom"', "</section>\n\n", "")

# ---------------------------------------------------------------- reviews (letterlijk van Klantenvertellen, peildatum 28-08-2026)
# Opzet in de Klantenvertellen-stijl: de kop van de reviewer (het veld oneLiner op het profiel) staat boven
# de tekst, het cijfer wordt ook als sterren getoond (cijfer/2, hun eigen omrekening) en de keurmerken staan
# groot op wit in het cijferpaneel. De uitgelichte review is de langste van de vijf.
REVIEWS = f'''<section class="sectie reviews" id="reviews" aria-labelledby="reviews-kop">
  <div class="wrap">
    <div class="sectiekop" data-reveal>
      <p class="label">Reviews</p>
      <h2 class="kop" id="reviews-kop">Wat klanten over ons zeggen</h2>
      <p class="intro">Letterlijk overgenomen van ons profiel op Klantenvertellen, het onafhankelijke reviewplatform van Erkende Verhuizers. Met naam, woonplaats en datum, zonder er iets aan te veranderen. Alle beoordelingen staan op <a href="/klantervaringen/">klantervaringen</a>. Klanten geven ons gemiddeld een 9,4 uit 779 beoordelingen en 99 procent beveelt ons aan; over de laatste twaalf maanden is het een 9,5.</p>
    </div>
    <div class="reviews__hoofd">
      <figure class="uitgelicht" data-reveal>
        {sterren(10, " sterren--xl")}
        <blockquote>Vandaag hebben we kennisgemaakt met het team van de Kievit. Onder tropische omstandigheden verzorgden zij de verhuizing van het nostalgische Rosarum in Venlo naar het klooster aan de Waterloostraat in Steyl. We kunnen wel stellen dat het Kievit-team een absolute topprestatie heeft geleverd. Dankjewel mannen, groot respect voor jullie inzet en professionaliteit!</blockquote>
        <figcaption><span class="uitgelicht__av" aria-hidden="true">H</span><span class="uitgelicht__wie"><b>Huub Hendrickx, Venlo</b><span><time datetime="2026-06-19">19 juni 2026</time> &middot; cijfer 10 op Klantenvertellen</span></span></figcaption>
      </figure>
      <aside class="scorepaneel" data-reveal style="transition-delay:.06s">
        <p class="scorepaneel__cijfer"><b>9,4</b><span>uit 779 beoordelingen</span></p>
        {sterren(9)}
        <ul class="scorepaneel__feiten">
          <li><b>99%</b> beveelt ons aan</li>
          <li><b>9,5</b> laatste 12 maanden</li>
          <li><b>60</b> beoordelingen dit jaar</li>
        </ul>
        <div class="scorepaneel__keurmerken">
          <a href="{KV}" target="_blank" rel="noopener nofollow" aria-label="Ons profiel op Klantenvertellen"><img src="/assets/img/keurmerk/klantenvertellen.svg" alt="Klantenvertellen" width="{KVW}" height="{KVH}" loading="lazy" decoding="async"></a>
          <a href="{OEV}" target="_blank" rel="noopener nofollow" aria-label="Onze ledenpagina bij Erkende Verhuizers"><img src="/assets/img/keurmerk/erkende-verhuizers.svg" alt="Erkende Verhuizers" width="400" height="200" loading="lazy" decoding="async"></a>
        </div>
      </aside>
    </div>
    <ul class="rgrid">
      <li class="review" data-reveal>
        <p class="review__rate">{sterren(10)}<b>10</b></p>
        <h3>De verhuizing liep geweldig, ondanks de hitte</h3>
        <p class="review__tekst">De verhuizing werd gedaan door een team vriendelijke keihardwerkende mannen die goed samenwerkten. Ondanks de hitte was de klus redelijk snel geklaard. Veel dank en respect!</p>
        <p class="review__wie"><b>Peter, Helden</b><time datetime="2026-07-01">1 juli 2026</time></p>
      </li>
      <li class="review" data-reveal style="transition-delay:.06s">
        <p class="review__rate">{sterren(9)}<b>9</b></p>
        <h3>Harde werkers, deskundige verhuizers</h3>
        <p class="review__tekst">Het is een deskundig verhuisteam die ons geholpen heeft met verhuizen. Harde werkers ondanks dat het erg warm was die dag. Ik zou ze iedereen aanbevelen.</p>
        <p class="review__wie"><b>Bertie, Sevenum</b><time datetime="2026-06-26">26 juni 2026</time></p>
      </li>
      <li class="review" data-reveal style="transition-delay:.12s">
        <p class="review__rate">{sterren(9)}<b>9</b></p>
        <h3>Vakkundige aanpak met goede adviezen</h3>
        <p class="review__tekst">Gebruikmaken van een verhuisbedrijf bespaart veel ellende achteraf. Demontage bed en kasten en de montage snel en goed uitgevoerd. Aansluiten van witgoed en waterpas opstellen is een gewaardeerde service. De Topmovers verhuisdozen met etiketten zorgen voor onbeschadigd transport en goede herkenbaarheid inhoud, etiketten makkelijk te verwijderen zonder doos te beschadigen.</p>
        <p class="review__wie"><b>Huib, Horst</b><time datetime="2026-06-26">26 juni 2026</time></p>
      </li>
      <li class="review" data-reveal style="transition-delay:.18s">
        <p class="review__rate">{sterren(10)}<b>10</b></p>
        <h3>Vakwerk, alles prima en snel geregeld.</h3>
        <p class="review__tekst">Vriendelijke medewerkers die mee denken. Alles werd bekwaam netjes en snel gedaan, ik had me niet beter kunnen wensen.</p>
        <p class="review__wie"><b>Mien, Gennep</b><time datetime="2026-05-01">1 mei 2026</time></p>
      </li>
    </ul>
    <div class="reviews__voet" data-reveal>
      <p class="reviews__meer"><a href="{KV}" target="_blank" rel="noopener nofollow">Alle 779 beoordelingen lezen op Klantenvertellen<svg aria-hidden="true"><use href="#i-arrow"/></svg></a></p>
      <div class="wa-rij"><a class="btn btn--wa btn--groen" href="{WA}?text=Hallo%2C%20ik%20las%20de%20reviews.%20Ik%20wil%20graag%20een%20offerte%20voor%20mijn%20verhuizing." target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Vraag het ons via WhatsApp</a></div>
    </div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="sectie reviews"', "</section>", REVIEWS)

# ---------------------------------------------------------------- ringen: aangesloten bij Top Movers
# Beeld en tekst vormen een geheel via de kaart: de kaart van Nederland (Top Movers-beeldbank, staat al in
# het teal met dezelfde stippelcirkels als de rest van de huisstijl), Venlo gepind en de verhuizers die van
# de kaart de tekst in stappen. Zo staat "lokaal plus landelijk" er ook in beeld.
RINGEN = f'''<section class="ringen" id="ringen" aria-labelledby="ringen-kop">
  <div class="wrap ringen__in">
    <div class="ringen__beeld" data-reveal>
      <img class="ringen__kaart" src="/assets/img/kaart-nederland.webp" width="860" height="999" alt="Kaart van Nederland met het landelijke netwerk van Top Movers" loading="lazy" decoding="async">
      <span class="ringen__pin">Venlo</span>
      <img class="ringen__duo" src="/assets/img/figuur-duo-dozen-1600.webp" srcset="/assets/img/figuur-duo-dozen-900.webp 900w, /assets/img/figuur-duo-dozen-1600.webp 1600w" sizes="(max-width:900px) 94vw, 400px" width="1600" height="976" alt="Twee verhuizers met witte Top Movers-verhuisdozen" loading="lazy" decoding="async">
      <img class="zegel ringen__zegel" src="/assets/img/deco/stempel-topmovers.webp" alt="" width="600" height="600" loading="lazy" decoding="async">
    </div>
    <div class="ringen__tekst" data-reveal>
      <p class="label">Aangesloten bij Top Movers</p>
      <h2 class="kop" id="ringen-kop">Lokaal verhuisbedrijf, landelijk netwerk</h2>
      <p class="intro">De Kievit is aangesloten bij Top Movers, een landelijk samenwerkingsverband van erkende verhuisbedrijven. Voor u betekent dat de persoonlijke aanpak van een Venloos bedrijf, met de slagkracht van een netwerk als uw verhuizing verder gaat dan Limburg.</p>
      <p class="intro">Verhuist u naar de andere kant van het land, naar Duitsland of verder weg, dan werken wij samen met collega-leden van Top Movers, stuk voor stuk Erkende Verhuizers, onder dezelfde voorwaarden.</p>
      <div class="knoprij"><a class="btn btn--goud btn--groen" href="#offerte">Zullen we kennismaken?</a><a class="btn btn--lijn" href="{TELHREF}">Bel {TEL}</a></div>
    </div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="ringen"', "</section>", RINGEN)

# ---------------------------------------------------------------- checklist (gerichte vervangingen in het grote blok)
s = vervang1(s, 'Vul uw verhuisdatum in en kies uw situatie, dan zet de lijst er zelf de juiste data bij. Vink af wat gedaan is; de lijst onthoudt uw voortgang op dit apparaat, dus u kunt hem gerust tussendoor sluiten en later verder gaan. Huurt u, koopt u of verhuist u een bedrijf? Filter de lijst, dan blijven alleen de punten staan die voor u gelden.',
             'Vul uw verhuisdatum in en kies uw situatie, dan zet de lijst er zelf de juiste data bij. Vink af wat gedaan is; de lijst onthoudt uw voortgang op dit apparaat, dus u kunt hem gerust tussendoor sluiten en later verder gaan. Huurt u, koopt u of verhuist u een bedrijf? Filter de lijst, dan blijven alleen de punten staan die voor u gelden. Alles wat De Kievit voor u kan doen, staat erbij.')
s = vervang_alle(s, 'ht-verhuischecklist', 'kievit-verhuischecklist', 10)
s = vervang_alle(s, '<span class="vcl-badge ht">Heerlijk Thuis</span>', '<span class="vcl-badge ht">De Kievit</span>', 3)
s = vervang1(s, 'Vraag hierboven een vrijblijvende offerte aan, dan komt ons verhuisteam langs voor een verhuisplan.',
             'Vraag hierboven een gratis offerte aan, dan komt onze verhuisadviseur langs voor een verhuisplan.')
s = vervang1(s, 'Gebruik de dozencalculator hierboven. Ons verhuisteam voorziet u van verhuisdozen en pakt op verzoek alles in.',
             'Gebruik de dozencalculator hierboven. De Kievit levert de verhuisdozen en pakt op verzoek alles voor u in.')
s = vervang1(s, 'Past de bank door het trappenhuis? Wij bekijken het tijdens het bezoek aan huis en nemen zo nodig een verhuislift mee.',
             'Past de bank door het trappenhuis? Wij bekijken het bij de opname aan huis en kijken of er een verhuislift nodig is.')
s = vervang1(s, '<span class="t">Verbouwing of schilderwerk in de nieuwe woning inplannen</span><span class="vcl-badge ht">De Kievit</span><span class="u">Wilt u eerst verbouwen of schilderen? Onze verbouwservice plant het voor de verhuisdag in, zodat u in een klaar huis aankomt.</span>',
             '<span class="t">Tijdelijke opslag regelen als de data niet aansluiten</span><span class="vcl-badge ht">De Kievit</span><span class="u">Krijgt u de sleutel later dan u de oude woning moet opleveren, of wordt er eerst nog geschilderd? Dan slaan wij uw inboedel tijdelijk op in een opslagkist of eigen container.</span>')
s = vervang1(s, 'Bed, grote kast of tafel: demontage en montage doet ons verhuisteam. Zet het in uw aanvraag, dan nemen wij het mee in het plan.',
             'Bed, grote kast of tafel: demontage en montage doet ons verhuisteam. Zet het in uw aanvraag, dan nemen wij het mee in de offerte.')
s = vervang1(s, "Mijn verhuischecklist (Heerlijk Thuis), nog te doen:", "Mijn verhuischecklist (De Kievit Verhuizingen), nog te doen:")

# ---------------------------------------------------------------- vierkant: eruit
# "Goed voorbereid verhuizen" staat sinds 28-aug niet meer op de homepage (keuze Shahab).
# De sectie komt uit de bronlander, dus hij moet er hier actief uit geknipt worden.
s = vervang_blok(s, '<section class="vierkant"', "</section>", "")

# ---------------------------------------------------------------- inpaktips (alleen intro, merk en knop)
s = vervang1(s, 'Pakt u zelf in? Goed ingepakt is half verhuisd: de verhuizers laden sneller, er breekt onderweg niets en u vindt op het nieuwe adres alles meteen terug. Hieronder staan tien tips uit de praktijk, van hoe zwaar u een doos maakt tot wat u beter apart houdt voor de eerste avond. Liever alles uit handen geven? Kies dan de inpakservice, dan pakken wij al uw spullen zorgvuldig voor u in.',
             'Pakt u zelf in? Goed ingepakt is half verhuisd: de verhuizers laden sneller, er breekt onderweg niets en u vindt op het nieuwe adres alles meteen terug. Hieronder staan tien tips uit de praktijk van ons verhuisteam, van hoe zwaar u een doos maakt tot wat u beter apart houdt voor de eerste avond. Liever alles uit handen geven? Kies dan onze in- en uitpakservice, dan pakken wij al uw spullen zorgvuldig voor u in.')
s = vervang1(s, 'Demonteren wij het meubel, dan doen wij dat ook zo, dus u vindt alles terug waar het hoort.',
             'Demonteert ons verhuisteam het meubel, dan doen wij dat ook zo, dus u vindt alles terug waar het hoort.')

s = vervang1(s, 'vullen de wagen efficient op', 'vullen de wagen effici&euml;nt op')

# ---------------------------------------------------------------- wonen -> alles voor verhuizen + werkgebied
WONEN = f'''<section class="sectie" id="wonen" aria-labelledby="wonen-kop">
  <div class="wrap">
    <div class="blok blok--paneel">
      <div class="blok__tekst" data-reveal>
        <p class="label">Particulier en zakelijk</p>
        <h2 class="kop" id="wonen-kop">E&eacute;n verhuisbedrijf voor alles wat u verhuist</h2>
        <p class="intro">Bij De Kievit kunt u terecht voor uw particuliere verhuizing, een bedrijfs- of projectverhuizing, inboedelopslag en een verhuizing naar het buitenland. U krijgt dezelfde planner, hetzelfde team en dezelfde voorwaarden, of u nu een appartement in Blerick verhuist of een kantoor met dertig werkplekken.</p>
        <ul class="d4">
          <li><img src="/assets/img/deco/verhuiswagen.svg" alt="" width="70" height="67" loading="lazy" decoding="async"><div><b>Particulier verhuizen</b><span>van studio tot villa</span></div></li>
          <li><img src="/assets/img/deco/zakelijk.svg" alt="" width="70" height="67" loading="lazy" decoding="async"><div><b>Zakelijk verhuizen</b><span>kantoor, zorg en onderwijs</span></div></li>
          <li><img src="/assets/img/deco/opslag.svg" alt="" width="70" height="67" loading="lazy" decoding="async"><div><b>Inboedelopslag</b><span>opslagkisten en containers</span></div></li>
          <li><img src="/assets/img/deco/internationaal.svg" alt="" width="70" height="67" loading="lazy" decoding="async"><div><b>Internationaal verhuizen</b><span>Duitsland, Belgi&euml; en Engeland</span></div></li>
        </ul>
      </div>
      <figure class="blok__foto" data-reveal>
        <img src="/assets/img/familie-1200.webp" srcset="/assets/img/familie-800.webp 800w, /assets/img/familie-1200.webp 1200w" sizes="(max-width:860px) 90vw, 560px" alt="Twee verhuizers van Top Movers rijden een kast op een meubelhondje bij de laadklep van de verhuiswagen" width="1200" height="800" loading="lazy" decoding="async">
        <figcaption>Ook voor uw bedrijfsverhuizing</figcaption>
      </figure>
    </div>

    <div class="blok blok--vlak" id="werkgebied">
      <figure class="blok__foto" data-reveal>
        <img src="/assets/img/huisje-1200.webp" srcset="/assets/img/huisje-800.webp 800w, /assets/img/huisje-1200.webp 1200w" sizes="(max-width:860px) 90vw, 560px" alt="Verhuiswagen van Top Movers op een landweg" width="1200" height="900" loading="lazy" decoding="async">
      </figure>
      <div class="blok__tekst" data-reveal>
        <p class="label">Werkgebied</p>
        <h2 class="kop">Verhuizen in Venlo en heel Noord- en Midden-Limburg</h2>
        <p class="intro">Vanuit Venlo verhuizen wij in de hele regio: van Venray en Horst tot Tegelen, Reuver en Roermond, en over de grens in Duitsland en Belgi&euml;. Als lid van Top Movers regelen wij ook verhuizingen naar de rest van Nederland, samen met collega-leden die net als wij Erkende Verhuizer zijn.</p>
        <ul class="plaatsen">
          <li><svg aria-hidden="true"><use href="#i-pin"/></svg>Venlo</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Blerick</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Tegelen</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Belfeld</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Reuver</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Velden</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Venray</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Horst</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Lottum</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Maasbree</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Baarlo</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Panningen</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Roermond</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Echt</li><li><svg aria-hidden="true"><use href="#i-pin"/></svg>Nederweert</li>
        </ul>
        <p style="margin-top:1.2rem;color:var(--ant-zacht)">Verhuist u naar Duitsland? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen, geldt het Nederlandse Garantiecertificaat van Erkende Verhuizers, net als bij een verhuizing binnen Nederland.</p>
        <div class="knoprij blok__cta"><a class="btn btn--lijn" href="{TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>Bel {TEL}</a><a class="btn btn--wa btn--groen" href="{WA}?text=Hallo%2C%20ik%20verhuis%20van%20...%20naar%20...%20Verhuizen%20jullie%20daarheen%3F" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>App ons uw adressen</a></div>
      </div>
    </div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="sectie" id="wonen"', "</section>", WONEN)

# ---------------------------------------------------------------- faq
FAQ = f'''<section class="sectie ring sectie--creme2" id="faq" aria-labelledby="faq-kop">
  <div class="wrap">
    <div class="sectiekop sectiekop--midden" data-reveal>
      <p class="label">Veelgestelde vragen</p>
      <h2 class="kop" id="faq-kop">Goed om te weten</h2>
    </div>
    <div class="faq" data-reveal>
      <details><summary>Wat kost een verhuizing?<span class="faq__tk" aria-hidden="true"></span></summary><p>Dat hangt af van de grootte van uw inboedel, de afstand, de verdieping en de extra's die u kiest, zoals inpakken, montage of opslag. Een tweekamerappartement op de begane grond is nu eenmaal iets anders dan een eengezinswoning met een volle zolder. Daarom komt onze verhuisadviseur eerst bij u langs of vult u het formulier in. U ontvangt een gratis en vrijblijvende offerte waarin precies staat wat wij doen en wat het kost, en u betaalt pas na de verhuizing, per bank op factuur.</p></details>
      <details><summary>Leveren jullie verhuisdozen?<span class="faq__tk" aria-hidden="true"></span></summary><p>Ja. Wij brengen de verhuisdozen ruim voor de verhuizing bij u langs, zodat u rustig kunt beginnen, en halen de lege dozen na afloop weer op. Wilt u het inpakken ook uit handen geven, dan pakt ons team al uw spullen zorgvuldig in, van glaswerk en servies tot de inhoud van de kasten.</p></details>
      <details><summary>Halen jullie meubels uit elkaar en zetten jullie ze weer in elkaar?<span class="faq__tk" aria-hidden="true"></span></summary><p>Ja, demontage en montage horen bij onze service. Kasten, bedden en boxsprings gaan bij u thuis uit elkaar en staan op het nieuwe adres weer klaar; ook uw wasmachine of koelkast sluiten wij aan. Geef bij de opname aan om welke meubels het gaat, dan houden wij daar in de planning en de offerte rekening mee.</p></details>
      <details><summary>Kan mijn inboedel tijdelijk worden opgeslagen?<span class="faq__tk" aria-hidden="true"></span></summary><p>Ja. Uw inboedel gaat in houten opslagkisten of een eigen 20 ft of 25 ft container, tijdelijk of voor langere tijd. Handig als de sleuteloverdracht van uw nieuwe woning later valt dan de oplevering van de oude, of als u een tijd naar het buitenland gaat. Op de afgesproken dag brengen wij alles naar uw nieuwe adres. Voor opslag gelden de bewaarnemingsvoorwaarden van Erkende Verhuizers.</p></details>
      <details><summary>Is mijn inboedel verzekerd tijdens de verhuizing?<span class="faq__tk" aria-hidden="true"></span></summary><p>Ja. Als Erkende Verhuizer werken wij volgens de Algemene Voorwaarden voor Verhuizingen. Daarin is uw inboedel tijdens een verhuizing binnen Nederland verzekerd tot ten minste 100.000 euro op nieuwwaarde. U ontvangt bovendien een Garantiecertificaat: dat beschermt uw aanbetaling en garandeert dat de verhuizing doorgaat, ook als er bij ons iets misgaat. Komt u er met ons onverhoopt niet uit, dan kunt u terecht bij de Geschillencommissie Verhuizen.</p></details>
      <details><summary>Hoe ver van tevoren moet ik de verhuizing aanvragen?<span class="faq__tk" aria-hidden="true"></span></summary><p>Hoe eerder u contact opneemt, hoe meer keuze u heeft in data; doordeweeks en buiten het einde van de maand is er het meeste ruimte. Neem in elk geval contact op zodra uw verhuisdatum bekend is, dan plannen wij de opname en de verhuisdag in. Verhuizen in het weekend is in overleg mogelijk, en zit u krap in de tijd, bel dan gerust: soms lukt het alsnog om op korte termijn iets vrij te maken.</p></details>
      <details><summary>Verhuizen jullie ook buiten Venlo?<span class="faq__tk" aria-hidden="true"></span></summary><p>Ja. Wij verhuizen in heel Noord- en Midden-Limburg, bijvoorbeeld in Blerick, Tegelen, Venray, Horst, Panningen, Reuver en Roermond, en door de rest van Nederland. Ook internationaal kunt u bij ons terecht, zoals voor een verhuizing naar Duitsland, Belgi&euml; of Engeland. Als lid van Top Movers werken wij daarbij samen met collega-leden door het hele land.</p></details>
    </div>
    <div class="wa-rij" data-reveal><a class="btn btn--wa btn--groen" href="{WA}?text=Hallo%2C%20ik%20heb%20een%20vraag%20over%20de%20verhuizing%3A%20" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>Andere vraag? App ons</a></div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="sectie ring sectie--creme2" id="faq"', "</section>", FAQ)

# ---------------------------------------------------------------- split: sinds 1910
SPLIT = '''<section class="hist5" id="historie" aria-labelledby="hist-kop">
  <div class="wrap hist5__in">
    <div class="hist5__tekst" data-reveal>
      <p class="label">Sinds 1910</p>
      <h2 class="kop" id="hist-kop">Meer dan honderd jaar verhuizen vanuit Venlo</h2>
      <p class="intro">Het begon op 12 maart 1910 met een grote meubelwagen. Vijf generaties lang bleef De Kievit een familiebedrijf. Het hele verhaal staat op <a href="/over-ons/">over ons</a>.</p>
      <ol class="hist5__tl">
        <li><span class="hist5__jaar">1910</span><div><h3>Een grote meubelwagen</h3><p>H. de Kievit &amp; Zoon beveelt zich in Venlo aan voor verhuizingen en transporten, binnen- en buitenlands.</p></div></li>
        <li><span class="hist5__jaar">1923</span><div><h3>De Bresser begint</h3><p>In Brabant start het familiebedrijf dat ruim een eeuw later De Kievit overneemt.</p></div></li>
        <li><span class="hist5__jaar">2024</span><div><h3>Samen verder met De Bresser</h3><p>Sinds 1 juni deel van De Bresser Verhuizingen; het hele Venlose team ging mee.</p></div></li>
        <li><span class="hist5__jaar">Nu</span><div><h3>Erkende Verhuizer in Venlo</h3><p>Dezelfde verhuizers aan uw deur, lid van Top Movers.</p></div></li>
      </ol>
      <div class="knoprij"><a class="btn btn--goud btn--groen" href="#offerte">Vrijblijvende verhuisofferte</a></div>
    </div>
    <div class="hist5__stapel" aria-label="Drie beelden uit het archief van De Kievit">
      <figure class="pol pol--trucks">
        <img src="/assets/img/historie-trucks-960.webp" srcset="/assets/img/historie-trucks-960.webp 960w, /assets/img/historie-trucks-1600.webp 1600w" sizes="(max-width:900px) 94vw, 580px" width="1600" height="900" alt="Historische foto: twee vrachtwagens van Firma W. de Kievit en Zonen, internationale transporten en verhuizingen, Venlo" loading="lazy" decoding="async">
        <figcaption>Firma W. de Kievit &amp; Zonen</figcaption>
      </figure>
      <figure class="pol pol--kar">
        <img src="/assets/img/historie-kar-staand-600.webp" srcset="/assets/img/historie-kar-staand-600.webp 600w, /assets/img/historie-kar-staand-1000.webp 1000w" sizes="(max-width:900px) 46vw, 300px" width="1000" height="1250" alt="Historische foto: een jongen trekt een kar met kinderen erop, naast het paard voor het pand van W. de Kievit, Expeditie en Verhuizingen" loading="lazy" decoding="async">
        <figcaption>Paard en wagen voor de zaak</figcaption>
      </figure>
      <figure class="pol pol--ad">
        <img src="/assets/img/historie-advertentie-300.webp" width="300" height="475" alt="Krantenadvertentie uit 1910: H. de Kievit en Zoon, expediteur te Venlo, maakt bekend dat hij een grote meubelwagen heeft aangeschaft" loading="lazy" decoding="async">
        <figcaption>Advertentie, 12 maart 1910</figcaption>
      </figure>
    </div>
  </div>
</section>'''
s = vervang_blok(s, '<section class="split"', "</section>", SPLIT)

# ---------------------------------------------------------------- leadblock (formulier)
s = vervang1(s, 'alt="Verhuizer draagt een grote monstera naar buiten, zijn collega loopt lachend mee bij de verhuiswagen"',
             'alt="Drie medewerkers van Top Movers met de duim omhoog in een kantoorgang"')
s = vervang1(s, '<p class="lead-p">Vul uw gegevens in, dan sturen wij u een vrijblijvende offerte. Hoe meer u kwijt kunt over uw woning, hoe scherper de prijs.</p>',
             '<p class="lead-p">Vul uw gegevens in, dan ontvangt u een gratis en vrijblijvende offerte. Hoe meer u kwijt kunt over uw woning en inboedel, hoe preciezer de prijs.</p>')
s = vervang1(s, '''        <a class="lead-google" href="https://trustoo.nl/zuid-holland/vlaardingen/verhuisbedrijf/bt-verhuisservice/" target="_blank" rel="noopener nofollow" aria-label="9,9 op Trustoo uit 87 beoordelingen">
          <img class="lead-google__logo" src="/assets/img/keurmerk/trustoo.svg" alt="" width="334" height="74" loading="lazy">
          <span class="lead-google__stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <strong>9,9</strong>
          <span class="lead-google__cnt">uit 87 beoordelingen</span>
        </a>''',
             f'''        <a class="lead-google" href="{KV}" target="_blank" rel="noopener nofollow" aria-label="9,4 op Klantenvertellen uit 779 beoordelingen">
          <svg class="lead-google__logo" aria-hidden="true" viewBox="0 0 100 100"><use href="#ik-rating"/></svg>
          <span class="lead-google__stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <strong>9,4</strong>
          <span class="lead-google__cnt">uit 779 beoordelingen op Klantenvertellen</span>
        </a>''')
# De BRON is de lander van Heerlijk Thuis en draagt DIENS Web3Forms-key. Die moet er hier uit,
# anders lopen de offerteaanvragen van De Kievit naar de inbox van een ander bedrijf. Vervangen op
# PATROON en niet op de oude waarde: de bron is een andere repo die zijn key zonder overleg wisselt.
s, _nk = re.subn(r'(name="access_key" value=")[^"]*(")', rf'\g<1>{navigatie.WEB3FORMS}\g<2>', s)
assert _nk == 1, f"{_nk}x access_key in de bron, verwacht 1"

s = vervang1(s, 'value="Nieuwe offerteaanvraag via de verhuizen-lander van Heerlijk Thuis"', 'value="Nieuwe offerteaanvraag via de website van De Kievit Verhuizingen"')
s = vervang1(s, 'value="Heerlijk Thuis offerteformulier"', 'value="De Kievit Verhuizingen offerteformulier"')
s = vervang1(s, '''              <option>Ik zag een verhuiswagen van Heerlijk Thuis</option>
              <option>Via onze makelaar of hypotheekadviseur</option>
              <option>Via Facebook of Instagram</option>''',
             '''              <option>Ik zag een verhuiswagen van De Kievit</option>
              <option>Via Top Movers of Erkende Verhuizers</option>
              <option>Via de makelaar of een bedrijf</option>
              <option>Via Facebook, Instagram of LinkedIn</option>''')
s = vervang1(s, '''Het versturen is niet gelukt. Bel ons op <a href="tel:0103037271">010 - 303 72 71</a> of mail naar <a href="mailto:info@mijnheerlijkthuis.nl">info@mijnheerlijkthuis.nl</a>.''',
             f'''Het versturen is niet gelukt. Bel ons op <a href="{TELHREF}">{TEL}</a> of mail naar <a href="mailto:{MAIL}">{MAIL}</a>.''')

# ---------------------------------------------------------------- footer
# De dienstenkolom linkte naar secties van de homepage (#diensten, #wonen, #opslag, #dozen,
# #werkgebied); op een dienstpagina sprong je daarmee terug naar de homepage in plaats van naar de
# dienst zelf. Het zijn nu de echte pagina's uit het menu, met het label uit navigatie.titel(),
# zodat footer en topnavigatie niet uiteen kunnen lopen (Shahab, 29-08).
# De onderbalk: dezelfde zes pagina's als navigatie.VOET, in dezelfde volgorde. De voorwaarden
# staan sinds 29-aug voluit op /algemene-voorwaarden/, dus de balk linkt niet meer weg naar
# erkendeverhuizers.nl en de privacyverklaring niet meer naar de oude site de-kievit.nl.
FOOTER_LEGAL = "\n".join(f'        <a href="{h}">{label}</a>' for h, label in navigatie.VOET)

FOOTER_DIENSTEN = "\n".join(
    f'            <li><a href="{navigatie.toon_href(h)}">{navigatie.titel(h)}</a></li>'
    for h in ["/particulier-verhuizen/", "/kantoorverhuizing/", "/inboedelopslag/",
              "/inpakservice/", "/montage-demontage/", "/internationale-verhuizing/"])

FOOTER = f'''<footer class="footer">
  <div class="footer__media" aria-hidden="true">
    <img src="/assets/img/footer-avond-1600.webp" srcset="/assets/img/footer-avond-900.webp 900w, /assets/img/footer-avond-1600.webp 1600w" sizes="100vw" alt="" width="1600" height="1073" loading="lazy" decoding="async">
  </div>
  <div class="wrap">
    <div class="footer__claim">
      <p class="eyebrow">De Kievit Verhuizingen</p>
      <h2>Zorgeloos verhuizen begint met een belletje</h2>
      <p>Vertel waar u vandaan komt en waar u heen gaat, dan rekenen wij de rest uit. Weet u nog niet alles zeker? Vul in wat u wel weet, de rest nemen wij telefonisch met u door.</p>
      <a class="footer__tel" href="{TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>{TEL}</a>
      <div class="footer__knoppen">
        <a class="btn btn--goud btn--lg" href="#offerte"><svg aria-hidden="true"><use href="#i-caret"/></svg>Offerte aanvragen</a>
        <a class="btn btn--wa btn--lg btn--groen" href="{WA}?text=Hallo%2C%20ik%20stuur%20u%20foto%27s%20van%20mijn%20woning%20voor%20een%20prijsindicatie." target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-wa"/></svg>App ons de foto's</a>
      </div>
    </div>
  </div>
  <div class="footer__onder">
    <div class="wrap">
      <div class="footer__rooster">
        <div>
          <p>De Kievit Verhuizingen is Erkende Verhuizer en aangesloten bij Top Movers, een landelijk samenwerkingsverband van erkende verhuisbedrijven. Sinds 1 juni 2024 onderdeel van De Bresser Verhuizingen.</p>
        </div>
        <div>
          <h2>Venlo</h2>
          <address>De Kievit Verhuizingen<br>Van Coehoornstraat 11<br>5916 PH Venlo<br><a href="mailto:{MAIL}">{MAIL}</a></address>
          <p>ma t/m vr 08:00 - 17:00<br>verhuizen in het weekend in overleg</p>
        </div>
        <div>
          <h2>Diensten</h2>
          <ul>
{FOOTER_DIENSTEN}
          </ul>
        </div>
        <div>
          <h2>Meer</h2>
          <ul>
            <li><a href="{OEV}" target="_blank" rel="noopener nofollow">Ledenpagina Erkende Verhuizers</a></li>
            <li><a href="{KV}" target="_blank" rel="noopener nofollow">Reviews op Klantenvertellen</a></li>
            <li><a href="https://www.topmovers.nl/" target="_blank" rel="noopener">Top Movers</a></li>
            <li><a href="https://www.debresser.nl/" target="_blank" rel="noopener">De Bresser Verhuizingen</a></li>
            <li><a href="https://nl.linkedin.com/company/de-kievit-verhuizingen" target="_blank" rel="noopener">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__merken">
        <a class="merk merk--ev" href="{OEV}" target="_blank" rel="noopener nofollow"><img src="/assets/img/keurmerk/erkende-verhuizers-mono.svg" alt="Erkende Verhuizers, ledenpagina De Kievit" width="165" height="80" loading="lazy" decoding="async"></a>
        <span class="merk merk--kievit"><img src="/assets/img/deco/logo-kievit-wit.svg" alt="De Kievit Verhuizingen" width="1520" height="1040" loading="lazy" decoding="async"></span>
        <a class="merk merk--tm" href="https://www.topmovers.nl/" target="_blank" rel="noopener"><img src="/assets/img/deco/logo-topmovers-wit.svg" alt="Top Movers" width="813" height="387" loading="lazy" decoding="async"></a>
        <a class="merk merk--niwo" href="/certificeringen/"><img src="/assets/img/keurmerk/niwo-wit.webp" alt="NIWO, Eurovergunning op naam van De Bresser Verhuizingen" width="249" height="102" loading="lazy" decoding="async"></a>
        <a class="merk merk--vca" href="/certificeringen/"><img src="/assets/img/keurmerk/vca-wit.webp" alt="VCA, binnen het certificeringstraject van Top Movers" width="267" height="120" loading="lazy" decoding="async"></a>
        <a class="merk merk--iso" href="/certificeringen/"><img src="/assets/img/keurmerk/iso9001-wit.webp" alt="ISO 9001, certificaat op naam van Top Movers Nederland" width="174" height="174" loading="lazy" decoding="async"></a>
        <a class="merk merk--iso" href="/certificeringen/"><img src="/assets/img/keurmerk/iso14001-wit.webp" alt="ISO 14001, certificaat op naam van Top Movers Nederland" width="174" height="174" loading="lazy" decoding="async"></a>
      </div>
    </div>
  </div>
  <div class="footer__balk">
    <div class="wrap">
      <small>&copy; 2026 De Kievit Verhuizingen &middot; Onderdeel van De Bresser Verhuizingen B.V. &middot; KvK 18014730 &middot; Btw-id NL0055.15.452.B.01 &middot; Uw Venlose vakverhuizer sinds 1910</small>
      <div class="footer__legal">
{FOOTER_LEGAL}
        <span class="footer__credit">Gemaakt door <a href="https://www.oranjelift.nl/" target="_blank" rel="noopener">Shan Morshedian</a></span>
      </div>
    </div>
  </div>
</footer>'''
s = vervang_blok(s, '<footer class="footer">', "</footer>", FOOTER)

# ---------------------------------------------------------------- keurmerkblokken: sinds 28-aug op /certificeringen/, niet meer op de homepage
# Zelfde recept als inpaktips: de tekst staat hier, build_paginas.py zet _werk/blok-certificeringen.html op de pagina.
KEURMERK = """<section class="zeker" aria-labelledby="zeker-kop">
  <svg style="display:none" aria-hidden="true"><symbol id="z-ok" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol></svg>
  <div class="wrap">
    <div class="zeker__card">
      <div class="zeker__head">
        <a class="zeker__logo" href="https://www.erkendeverhuizers.nl/lid/de-kievit-verhuizingen-top-movers/" target="_blank" rel="noopener nofollow" aria-label="De Kievit Verhuizingen in het register van Erkende Verhuizers">
          <img src="/assets/img/keurmerk/erkende-verhuizers-wit.svg" alt="Erkende Verhuizers" width="165" height="80" loading="lazy">
        </a>
        <div class="zeker__intro">
          <span class="eyebrow">Wij zijn Erkende Verhuizer</span>
          <h2 id="zeker-kop">Acht zekerheden die u er gratis bij krijgt</h2>
          <p>Erkende Verhuizers is de brancheorganisatie van de Nederlandse verhuisbranche. Het keurmerk mag alleen worden gevoerd door bedrijven die aan de eisen voldoen, en De Kievit Verhuizingen staat in het ledenregister. Wat dat u oplevert, staat hieronder.</p>
        </div>
        <img class="zeker__merk" src="/assets/img/deco/logo-kievit-wit.svg" alt="De Kievit Verhuizingen" width="1520" height="1040" loading="lazy">
      </div>
      <ol class="zeker__list">
        <li><span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>In het register van Erkende Verhuizers</b>Met een eigen vermelding in het ledenregister van de Organisatie voor Erkende Verhuizers.</span></li>
        <li><span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Garantiecertificaat bij elke verhuizing</b>Verplicht bij elke particuliere verhuizing, en tegelijk uw verzekeringspolis.</span></li>
        <li><span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Verzekerd tot 100.000 euro</b>Uw verhuisgoederen zijn binnen Nederland verzekerd op nieuwwaarde.</span></li>
        <li><span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Aanbetaling terug bij faillissement</b>Tot 25 procent van de verhuisprijs: maximaal 1.000 euro binnen Nederland en 2.000 euro binnen Europa.</span></li>
        <li><span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Uw verhuizing gaat door</b>Voor consumenten binnen Nederland: gaan wij failliet, dan wijst de organisatie een andere Erkende Verhuizer aan.</span></li>
        <li><span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Opslag meeverzekerd</b>Bij een verhuizing binnen Nederland is opslag de eerste twaalf maanden verzekerd als tijdens de verhuizing.</span></li>
        <li><span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Onafhankelijke geschillencommissie</b>De Geschillencommissie Verhuizen, met voor consumenten binnen Nederland een nakomingsgarantie tot 10.000 euro per bindend advies.</span></li>
        <li><span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Ook net over de grens</b>Verhuizingen naar Nedersaksen en Noordrijn-Westfalen vallen onder het Nederlandse Garantiecertificaat.</span></li>
      </ol>
      <div class="zeker__cta">
        <a class="btn btn--goud btn--groen btn--lg" href="#offerte">Vrijblijvende verhuisofferte</a>
        <a class="zeker__link" href="https://www.erkendeverhuizers.nl/waarom-erkende-verhuizer/" target="_blank" rel="noopener nofollow">Lees meer over het keurmerk</a>
      </div>
      <p class="zeker__bron">Volgens de Algemene Voorwaarden Verhuizingen (AVVV 2025) en het Garantiecertificaat van de Organisatie voor Erkende Verhuizers.</p>
    </div>
  </div>
</section>

<section class="tm" aria-labelledby="tm-kop">
  <svg style="display:none" aria-hidden="true">
    <symbol id="tm-hex" viewBox="0 0 64 64"><polygon points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5" fill="#00A19B"/><path d="M21 33l7.5 7.5L44 25" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  </svg>
  <div class="tm__raat" aria-hidden="true"><img src="/assets/img/deco/honingraat.svg" alt="" width="400" height="280" loading="lazy"></div>
  <div class="wrap tm__in">
    <div class="tm__tekst">
      <img class="tm__logo" src="/assets/img/logo-topmovers.svg" alt="Top Movers" width="813" height="225" loading="lazy">
      <p class="label">Aangesloten bij Top Movers</p>
      <h2 class="kop" id="tm-kop">Een landelijk netwerk, met een eigen vestiging in Venlo</h2>
      <p class="intro">Top Movers is een landelijk samenwerkingsverband van zelfstandige, erkende verhuisbedrijven, vrijwel allemaal familiebedrijven. De Kievit Verhuizingen is de vestiging voor Noord- en Midden-Limburg.</p>
      <div class="tm__cta">
        <a class="btn btn--goud btn--groen" href="#offerte">Vrijblijvende verhuisofferte</a>
        <a class="tm__link" href="https://www.topmovers.nl/vestigingen/de-kievit-verhuizingen/" target="_blank" rel="noopener">Onze vestigingspagina bij Top Movers</a>
      </div>
    </div>
    <ul class="tm__lijst">
      <li><span class="tm__hex"><svg aria-hidden="true"><use href="#tm-hex"/></svg></span><div><b>Erkende verhuisbedrijven, door het hele land</b><p>Elke Top Movers-vestiging is een zelfstandig, erkend verhuisbedrijf. Verhuist u ver weg, dan staat ook daar een vestiging voor u klaar.</p></div></li>
      <li><span class="tm__hex"><svg aria-hidden="true"><use href="#tm-hex"/></svg></span><div><b>Eigen vestiging voor Noord- en Midden-Limburg</b><p>Bij Top Movers is De Kievit de vestiging voor de postcodes 5800 tot en met 5999: van Venray en Horst tot Venlo, Blerick, Tegelen en Baarlo.</p></div></li>
      <li><span class="tm__hex"><svg aria-hidden="true"><use href="#tm-hex"/></svg></span><div><b>Herkenbaar aan de verhuisdozen</b><p>Dezelfde Top Movers-dozen en -wagens als bij alle vestigingen, en de verhuizers van De Kievit aan uw deur.</p></div></li>
    </ul>
  </div>
  <div class="tm__bij" aria-hidden="true"><img src="/assets/img/deco/bij.svg" alt="" width="133" height="68" loading="lazy"></div>
</section>"""
(SITE / "_werk/blok-certificeringen.html").write_text(KEURMERK, encoding="utf-8")

# ---------------------------------------------------------------- mobiele balk en script-teksten
s = vervang1(s, '''<div class="mcta" aria-label="Snel contact">
  <a class="btn btn--lijn" href="tel:0103037271"><svg aria-hidden="true"><use href="#i-phone"/></svg>Bellen</a>''',
             f'''<div class="mcta" aria-label="Snel contact">
  <a class="btn btn--lijn" href="{TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>Bellen</a>''')
s = vervang1(s, "if(window.htFormConversie)window.htFormConversie();", "if(window.kvFormConversie)window.kvFormConversie();")
s = vervang1(s, '''Liever direct? Bel <a href="tel:0103037271">010 - 303 72 71</a> of mail naar <a href="mailto:info@mijnheerlijkthuis.nl">info@mijnheerlijkthuis.nl</a>.''',
             f'''Liever direct? Bel <a href="{TELHREF}">{TEL}</a> of mail naar <a href="mailto:{MAIL}">{MAIL}</a>.''')

# ---------------------------------------------------------------- hero-video (V3 van -64, keuze Shahab 28-aug): bron alleen zetten als de video echt getoond wordt
s = vervang1(s, "<script>\n// Topbar wordt solide zodra je voorbij de hero scrolt",
             "<script>\n" + navigatie.NAV_JS + "\n// Hero-video: bron pas zetten als hij echt getoond wordt (desktop, geen reduced-motion), 1280-versie tot 1280px breed.\n// WCAG 2.2.2: de film duurt 35 s en herhaalt zichzelf, dus er hoort een knop bij om hem stop te zetten.\n(function(){var v=document.querySelector('.hero__video'),k=document.getElementById('heroVideoKnop');if(!v)return;var mq=matchMedia('(min-width:761px) and (prefers-reduced-motion:no-preference)');function toon(){if(!k)return;k.hidden=!mq.matches||!v.src;}function start(){if(!mq.matches||v.src)return;v.src=v.dataset[innerWidth>1280?'src':'srcKlein'];v.play().catch(function(){});toon();}if(k)k.addEventListener('click',function(){var uit=!v.paused;if(uit)v.pause();else v.play().catch(function(){});k.setAttribute('aria-pressed',uit?'true':'false');k.querySelector('.hero__videoknop__lbl').textContent=uit?'Film afspelen':'Film pauzeren';k.querySelector('svg').innerHTML=uit?'<path d=\\'M2 1l9 6-9 6z\\'/>':'<rect x=\\'1\\' y=\\'1\\' width=\\'3.5\\' height=\\'12\\' rx=\\'1\\'/><rect x=\\'7.5\\' y=\\'1\\' width=\\'3.5\\' height=\\'12\\' rx=\\'1\\'/>';});if(document.readyState==='complete')start();else addEventListener('load',start);mq.addEventListener('change',function(){start();toon();});})();\n// Topbar wordt solide zodra je voorbij de hero scrolt")

# ---------------------------------------------------------------- resterende telefoon- en WhatsApp-verwijzingen (calculator, checklist, inpaktips)
s = s.replace("tel:0103037271", TELHREF).replace("010 - 303 72 71", TEL).replace("https://wa.me/31103037271", WA)

# ---------------------------------------------------------------- artifacts (28-aug): bij op de dozenkaart, ster op het offertepaneel

# ---------------------------------------------------------------- historie naar boven
# Het historieblok stond onderaan, tussen de faq en het offerteformulier; het staat sinds 28-aug tussen
# de dienstenkaarten en het opslagblok (keuze Shahab). De bannerregel erboven hoort bij het leadblock en
# blijft dus staan; die labelt daarna weer de juiste sectie.
i_hist = s.index('<section class="hist5" id="historie"')
j_hist = s.index("</section>", i_hist) + len("</section>")
blok_hist = s[i_hist:j_hist]
s = s[:i_hist].rstrip("\n") + "\n\n" + s[j_hist:].lstrip("\n")
k_hist = s.index('<section class="opslag" id="opslag"')
s = s[:k_hist] + blok_hist + "\n\n" + s[k_hist:]

# ---------------------------------------------------------------- inpaktips naar de eigen pagina
# Het tipsblok staat sinds 28-aug niet meer op de homepage maar op /inpaktips/. Knippen gebeurt hier,
# na alle tekst- en telefoonvervangingen, en het blok gaat naar _werk/blok-inpaktips.html; build_paginas.py
# zet precies dat bestand op de pagina. Zo blijft er een versie van de tekst bestaan.
i_tips = s.index('<section class="sectie" id="inpaktips"')
j_tips = s.index("</section>", i_tips) + len("</section>")
(SITE / "_werk/blok-inpaktips.html").write_text(s[i_tips:j_tips], encoding="utf-8")
# De bannerregel erboven hoort bij deze sectie; laat je hem staan, dan labelt hij straks #wonen.
kop_tips = s.rfind("<!-- ============ INPAKTIPS", 0, i_tips)
begin_tips = kop_tips if kop_tips != -1 else i_tips
s = s[:begin_tips].rstrip("\n") + "\n\n" + s[j_tips:].lstrip("\n")

# ---------------------------------------------------------------- verhuischecklist naar de eigen pagina
# Zelfde recept als inpaktips: de checklist staat sinds 28-aug op /verhuischecklist/. Behalve de sectie
# gaat ook de bijbehorende IIFE mee (voortgang, fase, filter en datum in localStorage); die komt als
# <script> onder in het blokbestand te staan, zodat build_paginas.py hem vanzelf meeneemt.
i_vcl = s.index('<section class="sectie ring sectie--creme2" id="checklist"')
j_vcl = s.index("</section>", i_vcl) + len("</section>")
VCL = s[i_vcl:j_vcl]
s = s[:i_vcl].rstrip("\n") + "\n\n" + s[j_vcl:].lstrip("\n")
assert "data-checklist" in VCL, "checklistsectie niet compleet"

# De bannerregel erboven labelde de checklist; die staat nu boven #ringen en klopt dus niet meer.
banner = "<!-- ============ VERHUISCHECKLIST (opzet 1-op-1 pro.sprintkoeriers.nl) ============ -->\n"
assert s.count(banner) == 1, "checklistbanner niet gevonden"
i_ban = s.index(banner)
s = s[:i_ban].rstrip("\n") + "\n\n" + s[i_ban + len(banner):].lstrip("\n")

i_vjs = s.index("// Verhuischecklist (1-op-1 pro.sprintkoeriers.nl)")
j_vjs = s.index("})();", i_vjs) + len("})();")
VCL_JS = s[i_vjs:j_vjs]
s = s[:i_vjs] + s[j_vjs:]
assert "[data-checklist]" in VCL_JS, "checklistscript niet compleet"

# "hierboven" wees naar het offerteblok en de dozencalculator op de homepage; die staan hier niet meer
# boven de lijst. De offerteknop onderaan de lijst wijst al naar #offerte, dus daar volstaat het woord weg.
for oud, nw in (("Vraag hierboven een gratis offerte aan", "Vraag een gratis offerte aan"),
                ("Gebruik de dozencalculator hierboven.",
                 'Gebruik de <a href="/dozencalculator/">dozencalculator</a>.')):
    assert VCL.count(oud) == 1, f"niet gevonden: {oud}"
    VCL = VCL.replace(oud, nw)

# WCAG 1.4.1 en 4.1.2: bij de fase- en filterknoppen van de checklist gaf alleen de kleur aan welke
# aan stond. Voorleessoftware hoorde dat niet. De klasse "aan" krijgt er aria-pressed naast, in de
# HTML voor de beginstand en in het script voor elke wissel.
_vcl_n = len(re.findall(r'class="vcl-(?:tab|chip) aan"', VCL)) + len(re.findall(r'class="vcl-(?:tab|chip)"', VCL))
assert _vcl_n >= 10, f"{_vcl_n} fase/filterknoppen gevonden, minstens 10 verwacht"
VCL = re.sub(r'class="vcl-(tab|chip) aan"', r'class="vcl-\1 aan" aria-pressed="true"', VCL)
VCL = re.sub(r'class="vcl-(tab|chip)"', r'class="vcl-\1" aria-pressed="false"', VCL)

for _oud, _nw in (
    ("root.querySelectorAll('.vcl-tab').forEach(function(t){t.classList.toggle('aan',t.getAttribute('data-fase')===String(i))});",
     "root.querySelectorAll('.vcl-tab').forEach(function(t){var aan=t.getAttribute('data-fase')===String(i);"
     "t.classList.toggle('aan',aan);t.setAttribute('aria-pressed',aan?'true':'false')});"),
    ("filters.querySelectorAll('.vcl-chip').forEach(function(c){c.classList.toggle('aan',c.getAttribute('data-voor')===v)});",
     "filters.querySelectorAll('.vcl-chip').forEach(function(c){var aan=c.getAttribute('data-voor')===v;"
     "c.classList.toggle('aan',aan);c.setAttribute('aria-pressed',aan?'true':'false')});"),
):
    assert VCL_JS.count(_oud) == 1, f"checklist-script wijkt af: {_oud[:60]!r}"
    VCL_JS = VCL_JS.replace(_oud, _nw)

(SITE / "_werk/blok-verhuischecklist.html").write_text(
    VCL + "\n\n<script>\n" + VCL_JS + "\n</script>\n", encoding="utf-8")

# ---------------------------------------------------------------- dozencalculator naar de eigen pagina
# Zelfde recept: de sectie #calc staat sinds 28-aug op /dozencalculator/ (menu Voorbereiden). Het script
# blijft OOK op de homepage staan, want dezelfde IIFE bedient de uitklap-calculator in het offerteformulier
# (#lfcalc); het blokbestand krijgt een kopie. Op de eigen pagina is er geen formulier, dus daar brengt de
# knop "Offerte met deze gegevens" de invoer via de URL naar het formulier op de homepage, en de homepage
# leest die URL en zet de schatting meteen in de aanvraag.
s = vervang1(s, """    var doel=document.getElementById('offerte');if(doel)doel.scrollIntoView({behavior:'smooth',block:'start'});""",
"""    var doel=document.getElementById('offerte');
    if(!doel&&laatsteBlok){var i2=laatsteBlok.inv,q2=new URLSearchParams({m2:i2.m2,kamers:i2.kamers,bewoners:i2.bewoners,pack:i2.pack,extras:i2.extras.join(',')});location.href='/?'+q2.toString()+'#offerte';return}
    if(doel)doel.scrollIntoView({behavior:'smooth',block:'start'});""")
s = vervang1(s, """  var knop=document.getElementById('c-naar-offerte');""",
"""  // Komt de bezoeker van /dozencalculator/, dan staat zijn invoer in de URL: uitklap vullen en de schatting meteen toevoegen.
  var q=new URLSearchParams(location.search);
  if(uitklap&&q.get('m2')){
    ['m2','kamers','bewoners','pack'].forEach(function(k){var el=document.getElementById('lf-'+k);if(el&&q.get(k))el.value=q.get(k)});
    var ex=(q.get('extras')||'').split(',');uitklap.querySelectorAll('input[type=checkbox]').forEach(function(c){c.checked=ex.indexOf(c.value)>-1});
    toonForm();voegToe(true);
  }
  // Komt de bezoeker van /m3-calculator/, dan staat het volume in de URL: als schatting in de aanvraag zetten.
  if(verborgen&&q.get('m3')){verborgen.value='Inboedel ongeveer '+q.get('m3')+' m3 volgens de m3-calculator';verborgen.setAttribute('name','Inschatting via m3-calculator')}
  var knop=document.getElementById('c-naar-offerte');""")
i_calc = s.index('<!-- ============ VERHUISDOZEN-CALCULATOR')
j_calc = s.index("</section>", s.index('<section class="calc"', i_calc)) + len("</section>")
CALC = s[i_calc:j_calc]
# De calculator wordt uit de bron geknipt (hij gaat naar /dozencalculator/), maar Shahab wil hem
# 30-08-2026 OOK op de homepage, in plaats van het blok "Verhuisdozen krijgt u van ons". Dat blok
# vertelde wat wij doen; de calculator laat de bezoeker meteen zijn eigen antwoord berekenen en
# levert bovendien een ingevulde offerteaanvraag op. Het script eronder blijft ongemoeid: de
# staart van index.html draagt CALC_JS nog steeds, want dat wordt hieronder apart geknipt.
_i_dz = s.index('<section class="dozen" id="dozen"')
_j_dz = s.index("</section>", _i_dz) + len("</section>")
s = s[:_i_dz] + CALC + s[_j_dz:]
# en de oude plek van de calculator zelf leeghalen, anders staat hij er twee keer
_i2 = s.index('<!-- ============ VERHUISDOZEN-CALCULATOR', s.index(CALC[:60]) + len(CALC))
_j2 = s.index("</section>", s.index('<section class="calc"', _i2)) + len("</section>")
s = s[:_i2].rstrip("\n") + "\n\n" + s[_j2:].lstrip("\n")
assert s.count('id="calc"') == 1, f'calculator {s.count(chr(39)+"id="+chr(34)+"calc"+chr(34)+chr(39))} keer op de homepage'
assert 'id="dozen"' not in s, "het oude dozenblok staat er nog"
assert 'id="c-naar-offerte"' in CALC and 'id="calc"' in CALC, "calculatorsectie niet compleet"
i_cjs = s.index("// Verhuisdozen-calculator, twee bedieningen op een rekenkern")
j_cjs = s.index("})();", i_cjs) + len("})();")
CALC_JS = s[i_cjs:j_cjs]
assert "c-naar-offerte" in CALC_JS and "location.href='/?'" in CALC_JS, "calculatorscript niet compleet"
(SITE / "_werk/blok-dozencalculator.html").write_text(CALC + "\n\n<script>\n" + CALC_JS + "\n</script>\n", encoding="utf-8")
assert 'href="#calc"' not in s, "er wijst nog iets naar #calc op de homepage"

# ---------------------------------------------------------------- decoratieve artifacts (plaatser, 29-08-2026)
# Acht beelden uit assets/img/deco/, met de hand geplaatst door Shahab in _werk/plaatser.html, beide keren gezet
# op 1440px: zes om 16:34 en om 21:36 de twee in de hero erbij. De plaatser hangt elk beeld als LAATSTE KIND in
# de sectie zelf, niet in de .wrap; de percentages in de CSS horen dus bij de sectie eromheen en schalen mee.
# De bijbehorende regels staan aan het eind van
# assets/css/style.css onder dezelfde datum. LET OP: de footer wordt door build_paginas.py naar alle subpagina's
# gekopieerd, dus de bij daarin staat op de hele site en niet alleen op de homepage.
def plaats_deco(tekst, anker, sluit, *imgs):
    """Hangt decoratieve beelden als laatste kind in het element dat met `anker` begint."""
    i = tekst.index(anker)
    j = tekst.index(sluit, i)
    assert "<section" not in tekst[i + len(anker):j], f"geneste sectie na {anker[:44]!r}"
    return tekst[:j] + "".join(f"  {img}\n" for img in imgs) + tekst[j:]


def deco(bestand, klasse):
    b, h = svg_maat(f"assets/img/deco/{bestand}")
    return (f'<img src="/assets/img/deco/{bestand}" alt="" width="{b}" height="{h}" '
            f'loading="lazy" decoding="async" class="{klasse}">')


s = plaats_deco(s, '<section class="hero" aria-labelledby="hero-titel">', "</section>",
                deco("beeldmerk-topmovers.svg", "art-h1"), deco("kievit-vogel-wit.svg", "art-h2"))
s = plaats_deco(s, '<section class="sectie ring" id="diensten"', "</section>",
                deco("bij.svg", "art-1"), deco("pijl-weg.svg", "art-7"))
s = plaats_deco(s, '<section class="opslag" id="opslag"', "</section>", deco("huis-pijl.svg", "art-2"))
s = plaats_deco(s, '<section class="sectie reviews" id="reviews"', "</section>", deco("hart-huis.svg", "art-3"))
s = plaats_deco(s, '<section class="sectie ring sectie--creme2" id="faq"', "</section>", deco("kievit-vogel.svg", "art-4"))
s = plaats_deco(s, '<footer class="footer">', "</footer>", deco("bij.svg", "art-6"))
aantal_art = s.count('class="art-')
assert aantal_art == 8, f"{aantal_art} artifacts geplaatst, 8 verwacht"

# ---------------------------------------------------------------- toegankelijkheid van het offerteformulier
# Het formulier komt onveranderd uit de Heerlijk Thuis-bron; die bron hoort bij een ander project en
# blijft dus met rust. De koppeling veld <-> foutmelding zetten wij hier op de uitvoer, EEN keer,
# waarna build_paginas.py hem meeneemt naar alle 28 dienstpagina's.
#
# WCAG 3.3.1 Error Identification: de bron riep alleen f.reportValidity() aan. Dat zet wel de focus
# op het eerste foute veld, maar de melding is een native belletje dat vanzelf verdwijnt, het veld
# krijgt geen aria-invalid en er blijft nergens tekst staan. Vervangen door een foutenlijst met
# role="alert", aria-invalid op het veld en aria-describedby naar de regel die erover gaat.
# WCAG 2.5.3 Label in Name: bij de twee datumvelden stond zichtbaar "Wanneer" en aria-label
# "Verhuisdatum", dus de zichtbare naam zat niet in de toegankelijke naam.

FOUTLIJST_HTML = """<div class="lf__fout lf__foutlijst" id="lf-foutlijst" role="alert" hidden tabindex="-1" style="margin:0;background:#fff;border-radius:12px;padding:.8rem 1rem;color:var(--fout);font-weight:600">
            <p style="margin:0 0 .4rem">Er ontbreekt nog iets. Controleer deze velden:</p>
            <ul class="lf__fout--velden" id="lf-foutvelden"></ul>
          </div>"""

BRON_SUBMIT = """  var fout=document.getElementById('lf-fout');
  f.addEventListener('submit',function(e){
    e.preventDefault();fout.hidden=true;
    if(!f.reportValidity())return;"""

EIGEN_SUBMIT = """  var fout=document.getElementById('lf-fout');
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
    wisFouten();"""


def _eis(oud, nieuw, hoevaak=1):
    """Vervangt in s en klapt eruit zodra de bron niet meer is wat wij denken dat hij is."""
    global s
    n = s.count(oud)
    assert n == hoevaak, f"formulier-fix: {n}x gevonden, {hoevaak} verwacht bij {oud[:60]!r}"
    s = s.replace(oud, nieuw)


# Bij "Wanneer" stond de zichtbare tekst in een span die nergens aan hing: klikken erop deed niets.
# Een label met for= koppelt hem wel, en aria-label blijft de toegankelijke naam bepalen.
_eis('<div class="lf__field"><span>Wanneer</span>', '<div class="lf__field"><label for="lf-datum">Wanneer</label>')
# 2.4.1: doel van de skip-link focusbaar maken, zodat de focus ook echt verhuist in browsers
# die de focus-startpositie niet vanzelf meenemen (Safari).
_eis('<main id="top">', '<main id="top" tabindex="-1">')
_eis('aria-label="Verhuisdatum"', 'aria-label="Wanneer, gewenste verhuisdatum"', 2)
# novalidate zette de ingebouwde controle uit zonder er iets voor terug te geven zolang het script
# nog niet draaide. Weg uit de HTML; het script zet noValidate zelf.
_eis('<form class="lf" id="lfForm" action="https://api.web3forms.com/submit" method="POST" novalidate>',
     '<form class="lf" id="lfForm" action="https://api.web3forms.com/submit" method="POST">')
_eis('<p class="lf__fout" id="lf-fout" role="alert" hidden',
     FOUTLIJST_HTML + '\n          <p class="lf__fout" id="lf-fout" role="alert" hidden')
_eis(BRON_SUBMIT, EIGEN_SUBMIT)
# Verplichte adressen met postcode en woonplaats, plus de keuzelijst uit PDOK. Zie adresveld.py.
for _oud, _nieuw in adresveld.VELD_FIXES:
    _eis(_oud, _nieuw)

# ---------------------------------------------------------------- restcontrole: geen HT-resten meer
resten = [r for r in ("Heerlijk Thuis", "mijnheerlijkthuis", "0103037271", "010 - 303 72 71", "Vlaardingen", "trustoo", "Trustoo", "31103037271", "heerlijk-script", "Berend", "Boris", "Thijs")
          if r in s]
assert not resten, f"HT-resten: {resten}"
assert "—" not in s and "–" not in s, "em/en-dash gevonden"
# Het script dat op alle 34 pagina's woord voor woord hetzelfde is (het offerteformulier met
# de dozencalculator, en de navigatie) gaat naar /assets/js/kievit.js. Inline stond het 34 keer
# in het document zelf, dus zonder cachewinst tussen pagina's door: gemeten 29-08-2026 12.075
# bytes ruw, 4.234 gzipped, per pagina. Wat WEL per paginatype verschilt (de hero-video met
# zijn pauzeknop en de reveal met zijn hero-uitzondering) blijft inline staan.
#
# Dit knipt met opzet NA het blok 'toegankelijkheid van het offerteformulier' hierboven. Die
# fixes doen tekstvervangingen op de inline scripttekst in s; knippen wij eerder, dan vindt
# _eis() nul treffers en stopt de bouw met 'formulier-fix: 0x gevonden'. In deze volgorde reist
# de foutenlijst-afhandeling juist mee naar kievit.js en geldt hij ook op de handgeschreven
# kopieen van het formulier, wat inline nooit lukte.
#
# defer draait na het parsen, de inline staart tijdens. Dat mag hier: het zijn losse IIFE's
# zonder onderlinge afhankelijkheid, en de toegankelijkheidscode hangt alleen aan submit- en
# input-listeners, dus die heeft geen DOMContentLoaded-race.
_i = s.index("// Offerte-pill bovenin:")
_j = s.index("</script>", _i)
FORM_JS = s[_i:_j].rstrip()
s = s[:_i] + s[_j:]
_nav = navigatie.NAV_JS + "\n"
assert s.count(_nav) == 1, "NAV_JS staat niet precies een keer in de homepage"
s = s.replace(_nav, "")
(SITE / "assets/js").mkdir(parents=True, exist_ok=True)
(SITE / "assets/js/kievit.js").write_text(
    FORM_JS + "\n" + adresveld.JS + "\n" + navigatie.NAV_JS + "\n", encoding="utf-8")

# De sprite: eerst de VOLLEDIGE symbolenlijst wegschrijven, want build_paginas.py knipt de zijne
# daaruit. Pas daarna deze pagina snoeien, anders mist die bouwer straks een symbool.
_m = re.search(r'<svg width="0" height="0"[^>]*>.*?</svg>', s, re.S)
assert _m, "sprite niet gevonden in de homepage"
(SITE / "_werk/sprite.svg").write_text(_m.group(0), encoding="utf-8")
s = snoei.sprite(s)
# Interne build-comments horen in de bron en niet op de website (Shahab, keuze A bij punt 10).
# Op de homepage stonden er vijf boven de zestig tekens, waaronder drie die naar het project van een
# ANDERE klant verwijzen. Dezelfde regel als in build_paginas.py, met dezelfde uitzonderingen:
# script en style blijven ongemoeid, want daar kan een <!-- in een string zitten.
def _zonder_werkcommentaar(html):
    bewaard = []
    def _park(m):
        bewaard.append(m.group(0))
        return f"\x00{len(bewaard)-1}\x00"
    html = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", _park, html, flags=re.S)
    html = re.sub(r"\n?[ \t]*<!--(?:(?!-->).){61,}-->", "", html, flags=re.S)
    return re.sub(r"\x00(\d+)\x00", lambda m: bewaard[int(m.group(1))], html)

s = _zonder_werkcommentaar(s)
DOEL.write_text(s, encoding="utf-8")
print(f"geschreven: {DOEL} ({len(s.splitlines())} regels, buster {BUSTER})")
