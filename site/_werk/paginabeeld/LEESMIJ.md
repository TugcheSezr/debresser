# Beeld voor de vier "Zelf voorbereiden"-pagina's

Keuzeronde 29-08-2026. 20 kandidaten, 5 per pagina, wachten op de keuze van Shahab.

**Galerij:** http://127.0.0.1:4740/_werk/paginabeeld/galerij.html (schakelaar bovenin toont elk beeld
volledig, in het desktop-vak en in het mobiele vak).

## Scope van deze sessie

Alleen deze map is aangeraakt, plus `refs/ref-polo.jpg` (crop uit
`topmovers/fotos/2025-11_TopMovers-mannen-header3-groot.jpeg`). Geen CSS, geen pagina's, geen
generatorscripts van anderen, niets gecommit.

## Waarom staand (2:3)

Het fotovak op deze pagina's is `.blok__foto` en dat rekt mee met de tekstkolom. Gemeten op de
devserver met `getBoundingClientRect`:

| pagina | 1440px | 1000px | 390px |
|---|---|---|---|
| inpaktips | 479x736 (0,65) | 403x788 (0,51) | 307x384 (0,80) |
| m3-calculator | 524x917 (0,57) | 435x955 (0,46) | 358x448 (0,80) |

Nergens liggend dus. De liggende dienstfoto's die er nu staan (1120x641) verliezen in dat vak ruim
60% van hun breedte. 2:3 = 0,667 zit midden in het gemeten bereik.

## Route en gates

- Model `gemini-3-pro-image-preview`, 2:3 op 2K (tekst in beeld, dus geen 1K en geen 4K).
- Dozen als EERSTE referentie uit `_werk/hero-venlo/ref-dozen.jpg`; de kliksluiting-regel
  (geen plakband) staat als ABSOLUTE RULE 2 in het anker.
- Gezichten alleen uit de mixbibliotheek: kop-06, 09, 12, 14, 18, 19. In alle andere scenes staan
  mensen van achteren, in driekwart of buiten beeld gesneden, dus daar is geen gelijkenis in het spel.
- Wie-is-wie: de klant draagt altijd gewone kleding, nooit een bedrijfsshirt.

## QA-uitkomst (100%-lezing op de doosopdruk en de borstprint)

Opdruk volledig correct, inclusief "Aangesloten BIJ erkende verhuizers": chk3, chk4, doz3, doz4
(op een na), m33, inp1.
Naretoucheren voor livegang: doz1 (gewichtslabels "Nax. 38 kg", "MOV6RS"), m35 (tweede regel op de
doos), m34 (er staat een bij op de polo, die hoort alleen op de doos), chk2 en m32 (kleine borstprint
verhaspeld), chk1 en chk4 (onleesbare regels op het papieren vel).
Per beeld staat het oordeel onder de kaart in de galerij.

## Keuze van Shahab, 29-08-2026, en wat er geleverd is

Gekozen (twee per pagina): chk1 + chk3, inp1 + inp5, doz1 + doz2, m31 + m32.

Geleverd in `site/assets/img/`, twee maten per plaat (`-760` = 760x1140, `-1140` = 1140x1710, exact 2:3):
`checklist-keukentafel`, `checklist-dozen`, `inpak-borden`, `inpak-service`, `dozen-stapel`,
`dozen-bezorging`, `m3-laadbak`, `m3-opname`. Alt en figcaption staan in BRIEF-HERONTWERP.md.

**Retouche, route NBP-edit plus regio-composit** (`retouche_nbp.py` en `composit.py`; bronnen in
`edit/`, resultaat in `klaar/`, en `lever.py` pakt `klaar/` boven `raw/`):
- chk1: het vel op tafel zei "MOVEING CHECKIST" in het Engels. Nu alleen liniatuur en lege
  vinkvakjes met drie blauwe vinkjes, geen enkel woord. 4,8% van het beeld komt uit de edit.
- doz1: gewichtslabels waren "Nax. 38 kg", "Nan. 25 bg" en een "MOV6RS". Nu leest 4 van de 6
  "Max. 20 kg" en klopt MOVERS; twee kleine labels wijken nog af (een "hg" en een Cyrillische M).
  Op weergavegrootte is zo'n label 14 px breed.
- doz2: alle gewichtslabels lezen nu "Max. 20 kg", "MOVEBS" is "MOVERS" en de tagline klopt.
- m32: borstprint is nu scherp TOP MOVERS met de teal swoosh; 0,32% uit de edit.

Waarom composit en niet de hele edit: gemeten op doz2 was `diff>30` over 6,1% van het beeld en het
kroeshaar van de verhuizer was volledig opnieuw getekend terwijl er alleen doosopdruk gevraagd was.
Met een diff-masker binnen een vaste doos (grenzen afgelezen op een gridrender met ORIGINELE
coordinaten) blijft alles daarbuiten pixel voor pixel de bron; gemeten restlek buiten de doos is
4.203 resp. 6.237 px met een maximaal verschil van 45-79, allemaal in de feather langs de doosrand.

## Herontwerp van de pagina's

Loopt bij vier andere sessies, briefing in `BRIEF-HERONTWERP.md`: aa = verhuischecklist,
39 = inpaktips, 43 = dozencalculator, 64 = m3-calculator. Elk bewerkt alleen zijn eigen
`_werk/paginas/<slug>.html` en draait `build_paginas.py`.

## Contactpagina (29-08-2026, keuze man-3 / vrouw-3 / PC-2)

Geleverd als `site/assets/img/contact-bel-man`, `contact-bel-vrouw`, `contact-pc-man` (-700 en
-1100, transparante webp, strak op de alfa gesneden). Pagina: `site/_werk/paginas/contact.html`,
opzet naar Feitsma, elke figuur naast een tekstblok op een vlak waarvan de onderrand de heupsnede
opvangt. Galerij: `galerij-contact.html`. PC-1 (pc-man-a2) is door sessie -aa apart uitgeleverd als
`reviews-pc-man` voor /klantervaringen/.

**Let op (29-08 17:40):** `site/_werk/paginas/contact.html` wordt sinds die tijd MET DE HAND
onderhouden (sessie -aa, op verzoek van Shahab: navy paneel eraf, de twee bovenste blokken
gewisseld, geen vak achter de cutouts, vakken 25% kleiner). Het bouwscript waarmee ik de eerste
versie schreef staat in de sessie-scratchpad en is bovenaan gemarkeerd als NIET MEER DRAAIEN; het
zou het handwerk integraal overschrijven.
