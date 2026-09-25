#!/usr/bin/env python3
"""De navigatie van de De Bresser-site: menuboom, footer en vaste gegevens als data, plus de HTML
voor topbalk, drawer en het navigatiescript.

Eén waarheid voor build_paginas.py (alle pagina's, ook de homepage en 404.html). De boom volgt
sitemap-debresser/sitemap-de-bresser.md (ronde 2): hooguit twee niveaus, de oude subpagina's zijn
secties (ankers) op hun niveau-2-pagina. "Diensten" heeft sinds 25-09-2026 een eigen overzichtspagina
(/diensten/, wens gebruiker); de zes dienstpagina's blijven op niveau 1.

Een pagina toevoegen of een label wijzigen doe je HIER. Een route verschijnt pas in menu, footer en
sitemap zodra hij in VRIJGEGEVEN staat EN er een bronbestand voor is (_werk/paginas/<route>.html).
"""

import pathlib
from urllib.parse import quote_plus

BUSTER = "20260925-2100"

# Het voorkeursdomein, met www. canonical, sitemap.xml, robots.txt en de schema-@id's voeren
# allemaal dit domein; de apex redirect in vercel.json naar www.
DOMEIN = "https://www.debresser.nl"

NAAM = "De Bresser"
PAYOFF = "Erkende verhuizers &amp; uw partner in full service logistiek"
TEL = "+31 (0)13 52 82 372"
TELHREF = "tel:+31135282372"
# Klantenvertellen, het reviewprofiel van De Bresser (1038076; NIET 1034282 = De Kievit, NIET 1034815 = Stoof).
# Een bron voor de score in de topbalk, in het headerformulier en in home #reviews, zodat ze niet uit elkaar lopen.
# Nagekeken op de profielpagina (schema.org aggregateRating) op 25-09-2026 12:47: ratingValue 9 van 10,
# reviewCount 1538. Werk deze vier bij als het profiel verandert.
KV_URL = "https://www.klantenvertellen.nl/reviews/1038076/erkende_verhuizer_de_bresser_verhuizingen_bv"
KV_CIJFER = "9"
KV_STERREN = "9"          # klasse sb-sterren--9: 90% van de vijf sterren gevuld
KV_AANTAL = "1.538"
# "Beveelt ons aan" op dezelfde profielpagina, nagekeken 25-09-2026 14:36: 97 % (Tugches site noemt 93%, dat klopt
# niet meer). Voor het keurmerkenlabel in het headerformulier en de kerncijfers op home.
KV_AANBEVELING = "97"
MAIL = "info@debresser.nl"
KVK = "18014730"
BTW = "NL0055.15.452.B.01"
# GAT: nog geen Web3Forms-key voor De Bresser. De oude key bezorgde op info@de-kievit.nl en is op verzoek
# van de gebruiker leeggemaakt (25-09-2026). debresser.nl zelf gebruikt Formidable Forms Pro (WordPress, geen
# publieke key). Zolang dit leeg is, versturen de formulieren niets en tonen ze bellen of mailen als uitweg
# (site.js). Een eigen key maken op info@debresser.nl en hier invullen.
WEB3FORMS = ""

LOGO = "/assets/img/merk/logo-debresser.png"          # 243x240, bijgesneden uit de aangeleverde PNG
LOGO_WIT = "/assets/img/merk/logo-debresser-wit.png"
LOGO_MAAT = 'width="243" height="240"'

# ---------------------------------------------------------------- de boom
# (href, label). Het menu toont alleen de zes diensten; de secties van een dienst (de ankers uit
# sitemap-de-bresser.md §2) staan sinds 25-09-2026 als kaartenraster (sb-diensten, #aanbod) bovenaan
# de dienstpagina zelf en niet meer in het menu (verzoek gebruiker: "diensten simpeler").
DIENSTEN = [
    ("/verhuizen/", "Verhuizen"),
    ("/opslag/", "Opslag"),
    ("/meubelprojecten/", "Meubelprojecten"),
    ("/gebouwbeheer/", "Gebouwbeheer"),
    ("/assetmanagement/", "Assetmanagement"),
    ("/duurzame-werkomgeving/", "Duurzame werkomgeving"),
]

VACATURES = [("/vacature/verhuizer/", "Verhuizer"),
             ("/vacature/chauffeur-verhuizingen-c-ce/", "Chauffeur verhuizingen (C/CE)")]

BLOG = [
    "/2026/06/11/samen-bouwen-aan-succes/",
    "/2025/11/19/de-bresser-verwelkomt-brocken-verhuizingen/",
    "/2025/11/06/verhuizen-met-kinderen/",
    "/2024/03/29/de-populairste-reden-om-te-verhuizen/",
    "/2024/03/29/nieuw-qwiek-snooze-reinigingsservice/",
    "/2024/03/29/interne-verhuizing/",
    "/2024/03/29/verhuislift-maakt-alles-makkelijker/",
    "/2024/03/29/de-drie-grootste-verhuisblunders/",
    "/2024/03/29/spullen-weg-doen-waarom-is-het-zo-moeilijk/",
    "/2024/03/29/waarom-verhuizen-met-een-erkende-verhuizer/",
    "/2024/03/29/inhuren-professionals-kan-stressniveau-verminderen/",
]

# Het hoofdmenu. Diensten opent het paneel met de zes diensten; is /diensten/ live, dan is het label een link
# naar die pagina (zoals Vacatures en zoals het De Kievit-menu), anders alleen een knop.
MENU = [
    {"label": "Diensten", "href": "/diensten/", "diensten": True},
    {"label": "Over ons", "href": "/over-ons/"},
    {"label": "Vacatures", "href": "/overzicht-vacatures/", "kinderen": VACATURES},
    {"label": "Blog", "href": "/blog/"},
    {"label": "Contact", "href": "/contact/"},
]
OFFERTE = "/offerte/"

# De 41 plaats- en vestigingspagina's (sitemap-de-bresser.md §4), alfabetisch. Ze stonden in het Snelmenu
# van de footer; dat blok is er op 25-09-2026 uit. Nu alleen nog in sitemap.xml en de labels hieronder.
PLAATSEN = [
    ("/verhuisbedrijf-baarle-nassau/", "Baarle-Nassau"), ("/verhuisbedrijf-bavel/", "Bavel"),
    ("/bergen-op-zoom/", "Bergen op Zoom"), ("/verhuisbedrijf-best/", "Best"),
    ("/verhuisbedrijf-boxtel/", "Boxtel"), ("/breda/", "Breda"),
    ("/de-bresser-brussel/", "Brussel"), ("/verhuisbedrijf-den-bosch/", "Den Bosch"),
    ("/verhuisbedrijf-dongen/", "Dongen"), ("/verhuisbedrijf-dordrecht/", "Dordrecht"),
    ("/verhuisbedrijf-drunen/", "Drunen"), ("/verhuisbedrijf-eindhoven/", "Eindhoven"),
    ("/verhuisbedrijf-etten-leur/", "Etten-Leur"), ("/verhuisbedrijf-goirle/", "Goirle"),
    ("/verhuisbedrijf-helvoirt/", "Helvoirt"), ("/verhuisbedrijf-hilvarenbeek/", "Hilvarenbeek"),
    ("/verhuisbedrijf-kaatsheuvel/", "Kaatsheuvel"), ("/verhuisbedrijf-maastricht/", "Maastricht"),
    ("/verhuisbedrijf-moerdijk/", "Moerdijk"), ("/verhuisbedrijf-oirschot/", "Oirschot"),
    ("/verhuisbedrijf-oisterwijk/", "Oisterwijk"), ("/verhuisbedrijf-oosterhout/", "Oosterhout"),
    ("/verhuisbedrijf-oss/", "Oss"), ("/verhuisbedrijf-oudenbosch/", "Oudenbosch"),
    ("/verhuisbedrijf-poppel/", "Poppel (BE)"), ("/verhuisbedrijf-raamsdonksveer/", "Raamsdonksveer"),
    ("/verhuisbedrijf-roermond/", "Roermond"), ("/roosendaal/", "Roosendaal"),
    ("/verhuisbedrijf-rucphen/", "Rucphen"), ("/verhuisbedrijf-schijndel/", "Schijndel"),
    ("/verhuisbedrijf-sint-oedenrode/", "Sint-Oedenrode"), ("/verhuisbedrijf-steenbergen/", "Steenbergen"),
    ("/verhuisbedrijf-tilburg/", "Tilburg"), ("/verhuisbedrijf-udenhout/", "Udenhout"),
    ("/verhuisbedrijf-venlo/", "Venlo"), ("/verhuisbedrijf-vlijmen/", "Vlijmen"),
    ("/verhuisbedrijf-vught/", "Vught"), ("/verhuisbedrijf-waalwijk/", "Waalwijk"),
    ("/verhuisbedrijf-weert/", "Weert"), ("/verhuisbedrijf-zevenbergen/", "Zevenbergen"),
    ("/verhuisbedrijf-zundert/", "Zundert"),
]

# Vestigingen (bevindingen.md §3, van debresser.nl/contact/). Telefoon None = niet eenduidig.
# Brussel: Belgisch nummer zoals op debresser.nl/contact/ ("T +32 (0)26 – 701894", href tel:003226701894),
# 25-09-2026 op verzoek van de gebruiker ("Belgian number").
VESTIGINGEN = [
    ("Tilburg (hoofdkantoor)", "Herastraat 9", "5047 TX Tilburg", "+31 (0)13 54 25 935", "/verhuisbedrijf-tilburg/"),
    ("Oisterwijk", "Schijfstraat 13", "5061 KA Oisterwijk", "+31 (0)13 52 82 372", "/verhuisbedrijf-oisterwijk/"),
    ("Breda", "Mijkenbroek 46", "4824 AC Breda", "+31 (0)76 52 24 100", "/breda/"),
    ("Venlo", "Coehoornstraat 11", "5916 PH Venlo", "+31 (0)77 32 32 100", "/verhuisbedrijf-venlo/"),
    ("Reeuwijk", "Edisonstraat 1A-B", "2811 EM Reeuwijk", None, None),
    ("Brussel", "Bazellaan 8", "1140 Evere, België", "+32 (0)26 – 701894", "/de-bresser-brussel/"),
]

# Routelinks per vestiging (25-09-2026, wens gebruiker: "Route links for all branches"). Oisterwijk houdt
# de eigen kaartpin van debresser.nl (dc controleerde de hele site: de enige); de andere vijf krijgen een
# Google Maps-route naar het adres hierboven (Maps URLs, api=1). In de footer als "Route" bij de
# vestiging, in de schema als hasMap.
EIGEN_ROUTE = {
    "Oisterwijk": "https://maps.app.goo.gl/fiTtYM83db5SjHLLA",   # De Bresser, Schijfstraat 13, Oisterwijk
}
ROUTEPLANNER = {n: EIGEN_ROUTE.get(n) or "https://www.google.com/maps/dir/?api=1&destination="
                   + quote_plus(f"{s}, {pc}") for n, s, pc, _, _ in VESTIGINGEN}

FOOTER_LINKS = [("/faq/", "FAQ"), ("/privacyverklaring/", "Privacyverklaring")]

# De voorwaarden-PDF's staan sinds 25-09-2026 op de site zelf (site/downloads/), ongewijzigd gedownload van
# debresser.nl. Het oude adres onder /wp-content/uploads/ staat erachter; vercel.json stuurt dat met een 301
# naar het nieuwe, want offertes en mails die al verstuurd zijn linken ernaar. De bouwer weigert een
# link naar debresser.nl/wp-content.
VOORWAARDEN = [
    ("Voorwaarden verhuizingen", "/downloads/voorwaarden-verhuizingen.pdf"),              # 2019/10/AVVV-PV05-AVBV-AVHD.pdf
    ("Algemene vervoerscondities", "/downloads/algemene-vervoerscondities.pdf"),          # 2024/04/6010-Algemene-Vervoerscondities-A4-web-2.pdf
    ("Voorwaarden bedrijfsverhuizing", "/downloads/voorwaarden-bedrijfsverhuizing.pdf"),  # 2019/10/Algemene-voorwaarden-voor-Bedrijfsverhuizingen.pdf
    ("Voorwaarden logistieke services", "/downloads/voorwaarden-logistieke-services.pdf"),  # 2024/04/Logistieke-Services-Voorwaarden-LSV-2.pdf
    ("CMR conditions", "/downloads/cmr-conditions.pdf"),                                  # 2024/04/CMR-Conditions-English-2.pdf
    ("Opslagvoorwaarden", "/downloads/opslagvoorwaarden.pdf"),                            # 2025/10/Nederlandse-Opslagvoorwaarden-De-Bresser-opslag-zakelijk.pdf
]

# De merken onderaan de footer, zoals in de footer van debresser.nl (25-09-2026) en in die volgorde:
# (sleutel, naam, logo, breedte, hoogte, link, rel). Alle logo's zijn de witte bestanden van debresser.nl
# zelf; Fedemac en IAM staan daar zonder link, dus hier ook.
FOOTER_MERKEN = [
    ("ev", "Erkende Verhuizers", "/assets/img/keurmerk/erkende-verhuizers-wit.svg", 165, 80,
     "https://www.erkendeverhuizers.nl/", "noopener nofollow"),
    ("epv", "Erkende Projectverhuizers", "/assets/img/merk/erkende-projectverhuizers-wit.webp", 211, 96,
     "https://www.erkendeprojectverhuizers.nl/", "noopener nofollow"),
    ("tm", "Top Movers", "/assets/img/merk/topmovers-wit.png", 336, 160, "https://www.topmovers.nl/", "noopener"),
    ("fedemac", "Fedemac European Movers", "/assets/img/merk/fedemac-wit.webp", 768, 156, None, None),
    ("iam", "IAM International Association of Movers", "/assets/img/merk/iam-wit.webp", 300, 166, None, None),
]

# De eigen profielen van De Bresser, zoals debresser.nl ze linkt (alleen op /100-jarig-jubileum/, 25-09-2026).
# De footer zet ze als laatste regel in de kolom De Bresser; de schema neemt ze over als sameAs.
SOCIAL = [
    ("Instagram", "https://www.instagram.com/de_bresser/"),
    ("Facebook", "https://www.facebook.com/debresserverhuizingen/"),
    ("LinkedIn", "https://www.linkedin.com/company/debresser-verhuizingen-logistiek/"),
]

# De vrachtwagen achter de footer-claim: de groene wagen aan de bosrand, goedgekeurd 25-09 ("Goedgekeurd voor de
# site: versie 2"), bron beeldronde-debresser/wagens/footer-groen/. In assets/img/footer/ op 800/1200/1600/2400px,
# in de volle verhouding van het beeld (2,36 : 1). De andere goedgekeurde wagen staat ernaast als "wagen-onderweg".
FOOTER_WAGEN = "wagen-groen"

# Labels voor routes die in het menu een andere naam dragen dan hun paginatitel; de echte titel komt
# uit de TITEL-regel van het bronbestand (build_paginas.bron_meta).
LABELS = dict(DIENSTEN)
LABELS.update({h: l for h, l in VACATURES})
LABELS.update({h: l for h, l in PLAATSEN})
LABELS.update({m["href"]: m["label"] for m in MENU if m["href"]})
LABELS.update({h: l for h, l in FOOTER_LINKS})
LABELS.update({OFFERTE: "Offerte", "/faq/": "Veelgestelde vragen"})

# Menuouder voor het kruimelpad: (label, href of None).
OUDERS = {h: ("Diensten", "/diensten/") for h, _ in DIENSTEN}
OUDERS.update({h: ("Vacatures", "/overzicht-vacatures/") for h, _ in VACATURES})
OUDERS.update({h: ("Blog", "/blog/") for h in BLOG})


def paginas():
    """Alle routes van de boom (zonder de homepage), in menuvolgorde, dan footer en plaatsen."""
    uit = ["/diensten/"] + [h for h, _ in DIENSTEN] + ["/over-ons/", "/overzicht-vacatures/"] + [h for h, _ in VACATURES]
    uit += ["/blog/"] + BLOG + ["/contact/", OFFERTE] + [h for h, _ in FOOTER_LINKS] + [h for h, _ in PLAATSEN]
    assert len(uit) == len(set(uit)) == 68, f"{len(uit)} routes, plan zegt 68 plus de homepage"
    return uit


# Routes die gebouwd mogen worden. Mijn eigen bronnen staan er vast in; de routes van debresser-8f
# komen erbij per batch die hij als klaar meldt. Een route buiten deze set wordt niet gebouwd en
# nergens gelinkt.
VRIJGEGEVEN = {"/over-ons/", "/contact/", "/diensten/"}                     # /diensten/: 25-09-2026
# Batches van debresser-8f, vrijgegeven zodra die sessie een batch klaar meldde (24-09-2026).
VRIJGEGEVEN |= {h for h, _ in DIENSTEN}                                       # 1: diensten
VRIJGEGEVEN |= {OFFERTE}                                                       # 2: offerte
VRIJGEGEVEN |= {"/overzicht-vacatures/"} | {h for h, _ in VACATURES}           # 3: vacatures
VRIJGEGEVEN |= {"/faq/", "/privacyverklaring/"}                                # 4
VRIJGEGEVEN |= {"/blog/"} | set(BLOG)                                          # 5: blog
VRIJGEGEVEN |= {"/verhuisbedrijf-tilburg/", "/verhuisbedrijf-oisterwijk/", "/breda/", "/verhuisbedrijf-venlo/",
                "/de-bresser-brussel/", "/verhuisbedrijf-vlijmen/", "/verhuisbedrijf-vught/",
                "/verhuisbedrijf-waalwijk/", "/verhuisbedrijf-weert/", "/verhuisbedrijf-zevenbergen/",
                "/verhuisbedrijf-zundert/"}                                    # 6a
VRIJGEGEVEN |= {"/verhuisbedrijf-oss/", "/verhuisbedrijf-oudenbosch/", "/verhuisbedrijf-poppel/",
                "/verhuisbedrijf-raamsdonksveer/", "/verhuisbedrijf-roermond/", "/verhuisbedrijf-rucphen/",
                "/verhuisbedrijf-schijndel/", "/verhuisbedrijf-sint-oedenrode/", "/verhuisbedrijf-steenbergen/",
                "/verhuisbedrijf-udenhout/"}                                   # 6b
# 6c en 6d kwamen niet meer over voor de pauze van 24-09; debresser-d8 gaf ze 25-09 door, nagelopen
# met 8f's controleer.py (0 fouten).
VRIJGEGEVEN |= {"/roosendaal/", "/verhuisbedrijf-den-bosch/", "/verhuisbedrijf-etten-leur/",
                "/verhuisbedrijf-goirle/", "/verhuisbedrijf-oirschot/", "/bergen-op-zoom/",
                "/verhuisbedrijf-baarle-nassau/", "/verhuisbedrijf-bavel/", "/verhuisbedrijf-best/",
                "/verhuisbedrijf-boxtel/"}                                     # 6c
VRIJGEGEVEN |= {"/verhuisbedrijf-dongen/", "/verhuisbedrijf-dordrecht/", "/verhuisbedrijf-drunen/",
                "/verhuisbedrijf-eindhoven/", "/verhuisbedrijf-helvoirt/", "/verhuisbedrijf-hilvarenbeek/",
                "/verhuisbedrijf-kaatsheuvel/", "/verhuisbedrijf-maastricht/", "/verhuisbedrijf-moerdijk/",
                "/verhuisbedrijf-oosterhout/"}                                 # 6d

_PAGINAS = pathlib.Path(__file__).resolve().parent / "paginas"


def bron(href):
    return _PAGINAS / f"{href.strip('/')}.html"


def live(href):
    """Staat deze route op de site? Vrijgegeven en met een bronbestand."""
    h = h_norm(href)
    return h == "/" or (h in VRIJGEGEVEN and bron(h).exists())


def telhref(t):
    """'+31 (0)13 54 25 935' -> 'tel:+31135425935'."""
    return "tel:" + t.replace("(0)", "").replace(" ", "").replace("-", "").replace("–", "")


def absoluut(pad):
    return DOMEIN + pad


def h_norm(h):
    return (h or "").split("#")[0].split("?")[0] or "/"


def _huidig(href, huidig):
    """aria-current="page" op de link naar de pagina waar de bezoeker staat (WCAG 4.1.2)."""
    return ' aria-current="page"' if huidig and href and "#" not in href and h_norm(href) == h_norm(huidig) else ""


CHEV = ('<svg class="nav__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" '
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>')


def _diensten_live():
    return [(h, l) for h, l in DIENSTEN if live(h)]


def _diensten_links():
    """De links onder Diensten: eerst "Alle diensten" als /diensten/ live is, dan de zes diensten."""
    return ([("/diensten/", "Alle diensten")] if live("/diensten/") else []) + _diensten_live()


def _mega_diensten(huidig):
    lis = "\n".join(f'                  <li><a href="{h}"{_huidig(h, huidig)}>{l}</a></li>' for h, l in _diensten_links())
    return f'''
          <div class="mega mega--1">
            <div class="mega__grid">
              <div class="mega__col">
                <ul>
{lis}
                </ul>
              </div>
            </div>
          </div>'''


def _mega_kinderen(item, huidig):
    links = [(f"Alle {item['label'].lower()}", item["href"])] + [(t, h) for h, t in item["kinderen"] if live(h)]
    lis = "\n".join(f'                  <li><a href="{h}"{_huidig(h, huidig)}>{t}</a></li>' for t, h in links)
    return f'''
          <div class="mega mega--1">
            <div class="mega__grid">
              <div class="mega__col">
                <ul>
{lis}
                </ul>
              </div>
            </div>
          </div>'''


def nav_html(huidig=None):
    """De <nav> met het mega-menu, voor in de topbalk. `huidig` = href van de pagina zelf."""
    items = []
    for item in MENU:
        if item.get("diensten"):
            if not _diensten_live():
                continue
            if live(item["href"]):
                trigger = (f'<a class="nav__trigger" href="{item["href"]}"{_huidig(item["href"], huidig)} '
                           f'aria-expanded="false">{item["label"]}{CHEV}</a>')
            else:
                trigger = f'<button class="nav__trigger" type="button" aria-expanded="false">{item["label"]}{CHEV}</button>'
            items.append(f'''        <li class="has-mega">
          {trigger}{_mega_diensten(huidig)}
        </li>''')
        elif not live(item["href"]):
            continue
        elif item.get("kinderen") and any(live(h) for h, _ in item["kinderen"]):
            items.append(f'''        <li class="has-mega">
          <a class="nav__trigger" href="{item["href"]}"{_huidig(item["href"], huidig)} aria-expanded="false">{item["label"]}{CHEV}</a>{_mega_kinderen(item, huidig)}
        </li>''')
        else:
            items.append(f'        <li><a href="{item["href"]}"{_huidig(item["href"], huidig)}>{item["label"]}</a></li>')
    return '''    <nav class="nav" aria-label="Hoofdnavigatie">
      <ul class="nav__links">
''' + "\n".join(items) + '''
      </ul>
    </nav>'''


def offerte_href():
    return OFFERTE if live(OFFERTE) else "/contact/"


def kv_badge(soort):
    """De Klantenvertellen-score als link naar het profiel: beeldmerk, cijfer en sterren op een regel. soort "topbar":
    wit op navy, voor het telefoonnummer; soort "hf1": wit label naast de keurmerken in het headerformulier. Het
    aantal staat in de tooltip en het aria-label. Cijfer en aantal komen uit KV_* hierboven."""
    titel = f"{KV_CIJFER} uit 10, {KV_AANTAL} beoordelingen op Klantenvertellen"
    klasse = "topbar__kv" if soort == "topbar" else "hf1-kv"
    return (f'<a class="{klasse}" href="{KV_URL}" target="_blank" rel="noopener" title="{titel}"'
            f' aria-label="Beoordeeld met een {titel} (opent in een nieuw tabblad)">'
            '<img class="kv-icoon" src="/assets/img/keurmerk/klantenvertellen-icoon.svg" alt="" width="20" height="18">'
            f'<b>{KV_CIJFER}</b><span class="sb-sterren sb-sterren--{KV_STERREN}"></span></a>')


def topbar_html(huidig=None):
    """De hele topbalk, met de overslaan-link ervoor (WCAG 2.4.1). Doel is <main id="top">.

    Huisstijl De Bresser: wit logopaneel dat over de hero valt, menu op navy, groene Offerte-knop."""
    return f'''<a class="skiplink" href="#top">Direct naar de inhoud</a>
<header class="topbar" id="topbar">
  <div class="wrap">
    <a class="topbar__logo" href="/" aria-label="De Bresser, naar de homepage">
      <img src="{LOGO}" alt="" {LOGO_MAAT}>
    </a>
{nav_html(huidig)}
    <div class="topbar__actions">
      {kv_badge("topbar")}
      <a class="topbar__tel" href="{TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>{TEL}</a>
      <a class="btn btn--offerte" href="{offerte_href()}"><svg aria-hidden="true"><use href="#i-caret"/></svg>Offerte</a>
    </div>
    <button class="nav-toggle" id="navToggle" aria-label="Menu openen" aria-expanded="false" aria-controls="navDrawer">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
    </button>
  </div>
</header>'''


def drawer_html(huidig=None):
    """Het uitschuifmenu voor mobiel; hoort direct na de topbalk, buiten de <header>."""
    groepen = []
    for item in MENU:
        if item.get("diensten"):
            d = _diensten_live()
            if not d:
                continue
            links = "\n".join(f'          <a href="{h}"{_huidig(h, huidig)}>{l}</a>' for h, l in _diensten_links())
            groepen.append(f'''        <details class="drawer__group">
          <summary>{item["label"]}</summary>
{links}
        </details>''')
        elif not live(item["href"]):
            continue
        elif item.get("kinderen") and any(live(h) for h, _ in item["kinderen"]):
            links = "\n".join(f'          <a href="{h}"{_huidig(h, huidig)}>{t}</a>'
                              for t, h in [(f"Alle {item['label'].lower()}", item["href"])]
                              + [(t, h) for h, t in item["kinderen"] if live(h)])
            groepen.append(f'''        <details class="drawer__group">
          <summary>{item["label"]}</summary>
{links}
        </details>''')
        else:
            groepen.append(f'        <a class="drawer__link" href="{item["href"]}"{_huidig(item["href"], huidig)}>{item["label"]}</a>')
    return f'''<div class="drawer" id="navDrawer" aria-hidden="true">
  <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer__head">
      <a class="drawer__logo" href="/" aria-label="De Bresser, naar de homepage">
        <img src="{LOGO}" alt="" {LOGO_MAAT}>
      </a>
      <button class="drawer__close" id="navClose" aria-label="Menu sluiten">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <nav class="drawer__nav" aria-label="Mobiele navigatie">
{chr(10).join(groepen)}
    </nav>
    <div class="drawer__foot">
      <a class="btn btn--offerte drawer__cta" href="{offerte_href()}"><svg aria-hidden="true"><use href="#i-caret"/></svg>Vrijblijvende offerte</a>
      <a class="drawer__tel" href="{TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>{TEL}</a>
      <a class="drawer__tel" href="mailto:{MAIL}"><svg aria-hidden="true"><use href="#i-mail"/></svg>{MAIL}</a>
    </div>
  </div>
  <button class="drawer__scrim" id="navScrim" tabindex="-1" aria-hidden="true"></button>
</div>'''


def footer_html():
    """De footer: afsluiter met belofte, knoppen en een De Bresser-vrachtwagen, dan vier kolommen (merk,
    diensten, De Bresser, voorwaarden), de vestigingen als rij van zes, de merken en de onderbalk.
    Het regio-blok met alle plaatspagina's is er op 25-09-2026 uit (wens gebruiker). Later die dag (wens
    gebruiker, ronde 4): de merken weer onderaan en groter, KvK en Btw op een regel, minder lege ruimte.
    Ronde 5 (wens gebruiker): het adres onder het logo is weg (staat al bij Vestigingen en in de claim),
    "Alle diensten" (/diensten/) staat in Diensten, en elke vestiging heeft een Route-link."""
    diensten = "\n".join(f'            <li><a href="{h}">{l}</a></li>' for h, l in _diensten_links())
    bedrijf = [("/over-ons/", "Over ons"), ("/overzicht-vacatures/", "Vacatures"), ("/blog/", "Blog"),
               ("/contact/", "Contact"), ("/faq/", "Veelgestelde vragen")]
    bedrijf = "\n".join(f'            <li><a href="{h}">{l}</a></li>' for h, l in bedrijf if live(h))
    if SOCIAL:
        s = [f'<a href="{u}" target="_blank" rel="noopener">{n}</a>' for n, u in SOCIAL]
        bedrijf += f'\n            <li>{s[0] if len(s) == 1 else ", ".join(s[:-1]) + " en " + s[-1]}</li>'
    def _vestiging(n, s, pc, t, p):
        naam = f'<a href="{p}">{n}</a>' if p and live(p) else n
        tel = f'<a href="{telhref(t)}">{t}</a>' if t else ""
        # de Route-link staat als laatste in de li; de CSS zet hem breed achter de straat, smal eronder
        route = (f'<a class="footer__route" href="{ROUTEPLANNER[n]}" target="_blank" rel="noopener" '
                 f'aria-label="Route naar De Bresser {n.split(" (")[0]} (Google Maps)">Route</a>') if n in ROUTEPLANNER else ""
        return f'          <li><b>{naam}</b><span>{s}</span><span>{pc}</span>{tel}{route}</li>'
    vest = "\n".join(_vestiging(*v) for v in VESTIGINGEN)
    voorwaarden = "\n".join(f'            <li><a href="{u}" target="_blank" rel="noopener">{l}</a></li>' for l, u in VOORWAARDEN)
    def _merk(k, naam, src, w, h, url, rel):
        img = f'<img src="{src}" alt="{naam}" width="{w}" height="{h}" loading="lazy" decoding="async">'
        if url:
            return f'        <a class="merk merk--{k}" href="{url}" target="_blank" rel="{rel}">{img}</a>'
        return f'        <span class="merk merk--{k}">{img}</span>'
    merken = "\n".join(_merk(*m) for m in FOOTER_MERKEN)
    legal = "\n".join(f'        <a href="{h}">{l}</a>' for h, l in FOOTER_LINKS if live(h))
    wagen = f"/assets/img/footer/{FOOTER_WAGEN}"
    return f'''<footer class="footer">
  <div class="footer__boven">
    <div class="footer__media" aria-hidden="true">
      <img src="{wagen}-1200.webp" srcset="{wagen}-800.webp 800w, {wagen}-1200.webp 1200w, {wagen}-1600.webp 1600w, {wagen}-2400.webp 2400w" sizes="100vw" alt="" width="1600" height="679" loading="lazy" decoding="async">
    </div>
    <div class="wrap">
      <div class="footer__claim">
        <p class="eyebrow">De Bresser, sinds 1923</p>
        <h2>Wij gaan altijd voor 100% tevreden klanten</h2>
        <p>Daarom staat eerlijkheid bij ons voorop. Vraag een vrijblijvende offerte aan of bel ons, dan denken wij met u mee.</p>
        <a class="footer__tel" href="{TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>{TEL}</a>
        <div class="footer__knoppen">
          <a class="btn btn--offerte btn--lg" href="{offerte_href()}"><svg aria-hidden="true"><use href="#i-caret"/></svg>Offerte aanvragen</a>
          <a class="btn btn--lijn-wit btn--lg" href="mailto:{MAIL}"><svg aria-hidden="true"><use href="#i-mail"/></svg>{MAIL}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="footer__onder">
    <div class="wrap">
      <div class="footer__rooster">
        <div class="footer__merk">
          <img class="footer__logo" src="{LOGO_WIT}" alt="De Bresser" {LOGO_MAAT} loading="lazy" decoding="async">
          <p>{PAYOFF}. Sinds 1923.</p>
        </div>
        <div>
          <h2>Diensten</h2>
          <ul>
{diensten}
          </ul>
        </div>
        <div>
          <h2>De Bresser</h2>
          <ul>
{bedrijf}
          </ul>
        </div>
        <div>
          <h2>Voorwaarden</h2>
          <ul>
{voorwaarden}
          </ul>
        </div>
      </div>
      <div class="footer__vestigingen">
        <h2>Vestigingen</h2>
        <ul class="footer__vest">
{vest}
        </ul>
      </div>
      <div class="footer__merken">
{merken}
      </div>
    </div>
  </div>
  <div class="footer__balk">
    <div class="wrap">
      <small>&copy; 2026 De Bresser B.V.<span class="footer__sep" aria-hidden="true"> &middot; </span><span class="footer__kvk">KvK {KVK} &middot; Btw {BTW}</span></small>
      <div class="footer__legal">
{legal}
        <span class="footer__credit">Gemaakt door <a href="https://www.linkedin.com/in/shan-morshedian-80339715a/" target="_blank" rel="nofollow noopener">Shan Morshedian</a></span>
      </div>
    </div>
  </div>
</footer>'''


def mcta_html():
    return f'''<div class="mcta" aria-label="Snel contact">
  <a class="btn btn--lijn" href="{TELHREF}"><svg aria-hidden="true"><use href="#i-phone"/></svg>Bellen</a>
  <a class="btn btn--offerte" href="{offerte_href()}"><svg aria-hidden="true"><use href="#i-caret"/></svg>Offerte</a>
</div>'''


# Mega-menu opent bij hover en bij focus; een knop zonder pagina (Diensten) opent ook bij een tik.
# Escape sluit alles, de drawer houdt de focus vast zolang hij open staat.
NAV_JS = '''// Navigatie: mega-menu op desktop, uitschuifmenu op mobiel.
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
    var k=li.querySelector('button.nav__trigger');
    if(k)k.addEventListener('click',function(){zet(li,!li.classList.contains('is-open'))});
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
})();'''
