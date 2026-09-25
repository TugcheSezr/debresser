# Opdracht: de tien Over ons-pagina's uitwerken

Vijf terminals, regie bij sessie `shahabmorshedian-2a`. Werkmap `~/website-kieviet`, devserver
draait op http://127.0.0.1:4740 (map `site/`). Je mag binnen je eigen sessie subagenten inzetten;
per pagina onderzoek, schrijven en controle uit elkaar trekken werkt goed.

## Verdeling

| Sessie | Pagina's |
|---|---|
| `-05` | `/over-de-kievit/` en `/werkwijze/` |
| `-9f` | `/duurzaamheid/` en `/vacatures/` |
| `-6f` | `/erkende-verhuizer/`, `/verzekering/` en `/klachtenregeling/` |
| `-26` | `/klantervaringen/` en `/veelgestelde-vragen/` |
| `-2a` | `/certificeringen/` plus de regie en de integratiecontrole |

## Werkafspraken (dezelfde als bij de vorige ronde, ze hielden)

**Jij schrijft alleen in `site/_werk/paginas/<slug>.html`**, een bestand per pagina. Dat bestand
wordt de inhoud van de pagina; balk, paginakop, footer en scripts komen er automatisch omheen.
Bouwen: `python3 site/_werk/build_paginas.py` vanuit `~/website-kieviet`.

**Niet aanraken:** `navigatie.py`, `build_kievit.py`, `build_paginas.py`, `index.html`,
`blok-*.html` (die worden bij elke build overschreven), en de bestanden van andere sessies.

**`assets/css/style.css` is gedeeld: alleen appenden**, met een commentaarkop die zegt van welke
pagina de regels zijn en een eigen klasseprefix. Lees het bestand vlak voor je appendt. Wijzig
nooit een bestaande regel. **Bump de cache-buster niet**, dat doet de regie aan het eind.

## Bronnen per pagina, gebruik ze

Er ligt bijna 7.000 regels onderzoek. Verzin niets; wat je niet uit een bron kunt halen laat je weg.

| Pagina | Begin hier |
|---|---|
| `/over-de-kievit/` | `onderzoek/07-de-kievit-en-de-bresser.md`, `onderzoek/02-leden-en-vestigingen.md`, het historieblok op de homepage (1910 advertentie, 1923 De Bresser, 2024 samen verder), `de-kievit-nl/paginastructuur.md` |
| `/werkwijze/` | de sectie `#werkwijze` op de homepage (vier stappen), `onderzoek/03-diensten.md`, `onderzoek/08-implicaties-website-kieviet.md` |
| `/duurzaamheid/` | `onderzoek/05-duurzaamheid-mvo-werkgever.md` en de brondocumenten in `onderzoek/bronteksten/duurzaamheid/` (CO2-Prestatieladder, energiemanagementplan, duurzaamheidsverslag 2025) |
| `/vacatures/` | `onderzoek/05-duurzaamheid-mvo-werkgever.md` (werkgeversdeel), de twee vacatures in `de-kievit-nl/paginastructuur.md`, erkend leerbedrijf voor chauffeur wegvervoer |
| `/erkende-verhuizer/` | `onderzoek-erkende-verhuizers/01-organisatie-en-keurmerk.md`, `02-avvv-2025-particulier.md`, `06-de-kievit-status-en-nieuwe-site.md` |
| `/certificeringen/` | `onderzoek/04-certificaten-garanties-voorwaarden.md`, het bestaande blok in `_werk/blok-certificeringen.html` |
| `/verzekering/` | `onderzoek-erkende-verhuizers/02-avvv-2025-particulier.md`, `03-avbv-avhd-pv05-opslag.md`, `04-zakelijk-avb-epv-lsv-cmr.md` |
| `/klachtenregeling/` | `onderzoek-erkende-verhuizers/05-geschillen-wet-toezicht.md` |
| `/klantervaringen/` | de reviewsectie op de homepage (letterlijke Klantenvertellen-reviews, peildatum 28-08-2026), profiel 1034282 |
| `/veelgestelde-vragen/` | `onderzoek/bronteksten/kievit-faq/FEITEN-KIEVIT.md` en de FAQ op de homepage |

Vaste feiten: De Kievit Verhuizingen, Van Coehoornstraat 11, 5916 PH Venlo, 077 - 32 32 100,
info@de-kievit.nl, verhuizer sinds 1910, Erkende Verhuizer, lid van Top Movers, sinds 1 juni 2024
onderdeel van De Bresser Verhuizingen, 9,4 uit 779 beoordelingen op Klantenvertellen, werkgebied
Noord- en Midden-Limburg.

## Ontwerptaal: kies uit wat er al staat

De homepage is de vormenbibliotheek. Neem een vorm over en vul hem met jouw inhoud; verzin geen
nieuwe kleuren en zo min mogelijk nieuwe CSS.

| Vorm | Waar hij op de homepage staat | Waar hij goed voor is |
|---|---|---|
| `.sectie` + `.sectiekop` | overal | label, kop, intro; de basis |
| `.sectie ring` | "Wat wij voor u regelen" | sectie met de ringdecoratie, voor een kaartenraster |
| `.blok blok--stapel blok--navy` | stond op "Waarom De Kievit" | navy paneel met tekst en foto, punten eronder |
| `.blok blok--paneel` | "Eén verhuisbedrijf voor alles" | lichtteal tekstpaneel naast een foto |
| `.blok blok--vlak` | "Verhuizen in Venlo" | foto met tealvlak dat er schuin achter uitsteekt |
| `.usps usps--rij` | onder de navyblokken | drie of vier punten met icoon, kop en tekst |
| `.hist5` | "Meer dan honderd jaar verhuizen" | tijdlijn met jaartallen en een stapel foto's |
| `.trust` | "Wat wij voor u regelen" | rij kerncijfers met icoon |
| `.zeker` | Erkende Verhuizers-paneel | navy paneel met een lijst afgevinkte zekerheden |
| `.opslag` | "Even geen plek?" | tealband schuin, navy kaart met knoppen, foto rechts |
| `.venster` | "Benieuwd naar de kosten?" | smal aandachtsblok met een enkele boodschap |
| `.reviews` | "Wat klanten over ons zeggen" | navy sectie met scorekaart en reviewkaarten |
| `.ringen` | "Lokaal verhuisbedrijf" | drie ringen met korte teksten |
| `.faq` | "Goed om te weten" | details/summary-accordeon |
| `.pk` | elke subpagina | de navy paginakop, staat er al automatisch |

Bij twijfel over vorm mag je naar `~/feitsma-www` kijken (`_pages/` en `assets/css/`) voor
inspiratie op opbouw en ritme, **niet** voor kleuren, teksten of merkelementen. Feitsma is rood,
De Kievit is Top Movers-teal.

Huisstijl: teal `#00A19B`, donkerteal `#006C68` voor gekleurde tekst op licht, paneelteal
`#00807A` voor vlakken met witte tekst, navy `#22314E`, geel `#FFD500` voor de belangrijkste knop
per sectie, creme `#F6F4EC`, lichtteal `#E5F3F3`. Tokens en gemeten contrastparen staan bovenin
`style.css` en in `_werk/contrast.txt`.

## Eisen aan de pagina

1. Kop die de vraag van de bezoeker benoemt, geen bedrijfsproza.
2. Drie tot zes secties met echte inhoud, afwisselend van vorm en met beeld links en rechts
   afwisselend waar je foto's gebruikt.
3. Iets concreets dat alleen op deze pagina staat: een lijst, een tijdlijn, een tabel, een
   accordeon. Een pagina met alleen lopende tekst is niet af.
4. Een FAQ-blokje van drie tot zes vragen die echt bij deze pagina horen.
5. Afsluiting met een duidelijke stap: offerte, bellen of appen.
6. **Tekst uniek per pagina.** Vormen mogen hergebruikt, zinnen niet. Ook niet tussen jouw eigen
   twee pagina's, en niet met de tien pagina's die er al staan.
7. Geen em-dashes en geen en-dashes.
8. Geen verzonnen prijzen, doorlooptijden, keurmerken of lokale claims. Bij twijfel weglaten.

## Beeld

Alleen als de pagina er beter van wordt. Kijk eerst of er al iets bruikbaars staat in
`site/assets/img/` of in de beeldbank (`de-kievit-nl/`, `topmovers/`). Genereer je toch, gebruik
dan de skill `/foto-optimalisatie` en volg hem echt. Key staat in
`~/.claude/projects/-Users-shahabmorshedian/memory/reference_google_api_key.md`. Kandidaten in
`site/_werk/beeld-<slug>/`, eindbestand als webp in `site/assets/img/` met jouw slug als prefix.
Let op het bekende faalpatroon: de kleine opdruk op Top Movers-dozen komt verhaspeld uit de
generator, het logo zelf niet. Voorbeeld in `site/_werk/hero-venlo/`.

## Voor je klaar zegt

1. Bouwen, en de pagina ophalen zoals een bezoeker hem krijgt.
2. Mobiel op 390px: geen horizontale overloop, alles leesbaar.
3. Geen dubbele `id`'s, geen anker zonder doel, geen dode link, geen ontbrekend bestand.
4. Draai `/controleer-light` per pagina.
5. Meld terug aan `shahabmorshedian-2a`: wat je bouwde, wat de controle zei, wat er open staat,
   en wat je als kruispagina-signaal ziet voor de anderen.
