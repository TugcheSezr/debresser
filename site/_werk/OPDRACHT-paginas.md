# Opdracht: vier voorbereidingspagina's volledig uitbouwen

Vier sessies, vier pagina's, een pagina per sessie. Coordinatie loopt via sessie
`shahabmorshedian-2a`. Werkmap: `~/website-kieviet`. Devserver draait al op
http://127.0.0.1:4740 (map `site/`).

| Pagina | Slug | Waar hij over gaat |
|---|---|---|
| Verhuischecklist | `/verhuischecklist/` | wat regel je wanneer, van opzeggen tot sleuteloverdracht |
| Inpaktips | `/inpaktips/` | hoe pak je in, per kamer en per soort spullen |
| Dozencalculator | `/dozencalculator/` | hoeveel verhuisdozen heb ik nodig |
| M3-calculator | `/m3-calculator/` | hoeveel kubieke meter is mijn inboedel |

De laatste twee lijken op elkaar maar zijn het niet: dozen tellen is iets anders dan
inboedelvolume schatten. Houd ze uit elkaar, ook in de tekst.

## Waar je schrijft

**Jij schrijft in precies een bestand: `site/_werk/paginas/<slug>.html`.**
Dat bestand bestaat nog niet, maak het aan. Alles wat erin staat wordt de inhoud van jouw
pagina; de balk, de paginakop, de footer en de scripts komen automatisch om je HTML heen.
Bouwen doe je met `python3 site/_werk/build_paginas.py` vanuit `~/website-kieviet`.

Wat er nu op je pagina staat is het blok dat uit de homepage geknipt is. Dat staat in
`site/_werk/blok-<slug>.html`. **Lees dat als startpunt, maar bewerk het NOOIT**: die bestanden
worden door `build_kievit.py` bij elke run overschreven. Kopieer wat je wilt houden naar jouw
eigen bestand en bouw daar verder.

## Wat je niet aanraakt

`navigatie.py`, `build_kievit.py`, `build_paginas.py`, `index.html`, `blok-*.html`, de mappen van
andere pagina's. Er werken vier sessies tegelijk in deze werkkopie; wie buiten zijn eigen bestand
schrijft, gooit werk van een ander weg.

`site/assets/css/style.css` is gedeeld. Heb je nieuwe CSS nodig, dan **alleen appenden** aan het
eind, met een commentaarkop die zegt van welke pagina de regels zijn, en een eigen klasseprefix
(bijvoorbeeld `.vcl-` voor de checklist). Lees het bestand vlak voor je appendt, want er zit
tussentijds werk van anderen in. Wijzig nooit een bestaande regel.

## Huisstijl

Top Movers: teal `#00A19B`, donkerteal `#006C68` voor gekleurde tekst op licht, paneelteal
`#00807A` voor grote vlakken met witte tekst, navy `#22314E`, geel `#FFD500` voor de meest
geklikte knop per sectie, creme `#F6F4EC`, lichtteal `#E5F3F3`. Alle tokens en de gemeten
contrastparen staan bovenin `style.css` en in `_werk/contrast.txt`. Verzin geen nieuwe kleuren.

Koppen Poppins 700, tekst Noto Sans, grote cijfers Zilla Slab. Hergebruik de bestaande klassen:
`.sectie`, `.sectie--creme2`, `.wrap`, `.label`, `.kop`, `.intro`, `.blok`, `.blok--navy`,
`.blok--paneel`, `.blok--vlak`, `.usps`, `.ring`, `.faq`, `.btn btn--goud btn--groen`, `.knoprij`.
Blokvormen mag je hergebruiken; **de tekst moet uniek zijn voor jouw pagina**, geen enkele zin
letterlijk van de homepage of van een andere pagina.

## Inhoudelijke eisen

Minimaal, in deze geest:
1. Een korte intro die de vraag van de bezoeker benoemt.
2. Het hoofdblok van de pagina: bij de calculators het werkende rekenblok, bij checklist en
   inpaktips de daadwerkelijke lijst of tips, echt bruikbaar en compleet.
3. Een of twee ondersteunende blokken (waarom via De Kievit, wat wij doen, veelgemaakte fouten).
4. Een FAQ-blokje van drie tot zes vragen die specifiek bij deze pagina horen.
5. Een afsluiting met een duidelijke call to action naar de offerte.

Vaste feiten die je mag gebruiken: De Kievit Verhuizingen, Van Coehoornstraat 11, 5916 PH Venlo,
telefoon 077 - 32 32 100, info@de-kievit.nl, verhuizer sinds 1910, Erkende Verhuizer, lid van
Top Movers, sinds 1 juni 2024 onderdeel van De Bresser, 9,4 uit 779 beoordelingen op
Klantenvertellen, werkgebied Noord- en Midden-Limburg.

**Verzin niets.** Geen prijzen, geen doorlooptijden, geen keurmerken, geen lokale claims die je
niet kunt staven uit `~/website-kieviet/onderzoek` of uit wat er al op de site staat. Bij twijfel
weglaten. Dit is een verboden handelspraktijk, geen stijlkwestie.

**Geen em-dashes en geen en-dashes.** Gebruik een gewone koppelstreep of een komma.

## Beeld

Alleen als de pagina er echt beter van wordt. Gebruik dan de skill `/foto-optimalisatie` en volg
hem echt, inclusief de sorteerregel en de QA. De API-key staat in
`~/.claude/projects/-Users-shahabmorshedian/memory/reference_google_api_key.md`.
Kandidaten in `site/_werk/beeld-<slug>/`, eindbestand als webp in `site/assets/img/` met jouw slug
als prefix, zodat niemand elkaars bestandsnamen pakt. Let op het bekende faalpatroon: de kleine
opdruk op Top Movers-dozen komt er verhaspeld uit, het logo zelf niet. Voorbeeld van de aanpak
staat in `site/_werk/hero-venlo/` (`gen_hero.py` en `retouche.py`).

## Voor je klaar zegt

1. `python3 site/_werk/build_paginas.py` en de pagina live bekijken op de devserver.
2. Mobiel testen op 390px breed: geen horizontale overloop, alles leesbaar.
3. Geen dubbele `id`'s op de pagina, geen anker dat nergens heen gaat.
4. Draai `/controleer-light` op je eigen pagina.
5. Meld terug aan `shahabmorshedian-2a` met: wat je hebt gebouwd, wat `/controleer-light` zei,
   en wat er nog open staat.
