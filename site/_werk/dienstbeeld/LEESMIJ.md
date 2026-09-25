# Beeld voor de elf dienstpagina's

Opdracht Shahab, 29-08-2026: "voor al deze pagina's ga je per pagina foto's genereren; als je een bus
ziet moet het een Top Movers-bus zijn, als je verhuizers ziet moeten ze in de kleding van Top Movers,
gebruik een gezonde mix van verhuizers die in de skills staan, vrolijke foto's maar niet te vrolijk,
gewoon positief, ook zonnig, niet te zonnig, dozen moeten ook altijd Top Movers zijn, mag niet op
geschreven worden. Doe maar 7 foto's per dienst."

**77 kandidaten, 7 per dienst.** Per dienst 5 staand (2:3) voor het `.blok__foto`-vak naast tekst en
2 liggend (3:2) voor een paginahero of een breed vak.

**Galerij:** http://127.0.0.1:4740/_werk/dienstbeeld/galerij.html
(schakelaar bovenin toont elk beeld volledig, in het desktopvak of in het mobiele vak; klik een beeld
voor het volle formaat; onder elke kaart staat het QA-oordeel).

## Scope

Alleen deze map plus `refs/` is aangeraakt. Geen CSS, geen pagina's, geen scripts van andere sessies,
niets gecommit. De map `_werk/paginabeeld/` is van sessie f4 (de vier "Zelf voorbereiden"-pagina's) en
is ongemoeid gelaten.

## Route

Generatief, `gemini-3-pro-image-preview` op **2K** (tekst in beeld, dus geen 1K en geen 4K).
Referenties per scene, in deze volgorde:

| referentie | waarvoor | herkomst |
|---|---|---|
| `_werk/hero-venlo/ref-dozen.jpg` | de verhuisdoos, altijd EERSTE referentie | echte TM-fotografie |
| `_werk/paginabeeld/refs/ref-polo.jpg` | de borstprint op de polo | crop uit `2025-11_TopMovers-mannen-header3` |
| `refs/ref-wagen.jpg` | de bakwagen (zijkant, teal skirt, klep achterop) | crop uit `2025-09_IMG_0179`, EV-logo weggewerkt |
| `refs/ref-container.jpg` | de opslagcontainer | crop uit `2021-10_opslag-TOPMOVERS-46`, code/ledennaam weg |
| `refs/ref-logo.jpg` | het woordmerk op wit | `topmovers/logos-certificaten/2021-09_TOP-MOVERS-LOGO-RGB.png` |
| `~/.claude/skills/foto-optimalisatie/objecten/*.png` | steekwagen, hondje, rolcontainer, krat, archief- en computerbox | propbibliotheek van de skill |
| `gezichten-mix/kop-01 t/m 19` | gezichten, in een mix per scene | mixbibliotheek, akkoord ligt er |

`maak_refs.py` bouwt de drie eigen referenties uit de beeldbank (retouches deterministisch, met
`vul_diffusie`). `gen_dienst.py` bevat de 77 scenes plus de ankerblokken; `web.py` maakt de
galerijversies, `sheet.py` de contactvellen, `galerij.py` de keuzepagina, `retouche.py` doet een
NBP-edit met het viercontract en composit alleen de gewijzigde regio terug.

Draaien (key nooit in een bestand, altijd uit de omgeving):

    export GEMINI_API_KEY=$(grep -o 'AIza[A-Za-z0-9_-]*' ~/.claude/projects/-Users-shahabmorshedian/memory/reference_google_api_key.md | head -1)
    python3 gen_dienst.py            # alles, of: python3 gen_dienst.py par ops1
    python3 web.py && python3 galerij.py

## QA

Elf controle-agents hebben elk hun dienst op 100 procent nagelezen (opdruk letter voor letter,
scenariologica, vakregels, gezichten, NL-setting); de oordelen staan per beeld in `qa/<code>.json` en
samengevoegd in `qa.json`. Ronde 1: 5 goed, 51 let, 21 fout. De 21 afvallers zijn opnieuw gegenereerd
met aangescherpte ankers, en wat daarna nog fout was een derde keer.

**Wat er structureel misging (en nu in de ankers staat):**
1. Het promptwoord "lockup" werd twee keer letterlijk op de wagen en de dozen gezet. Overal vervangen
   door "the printed name" / "the lettering".
2. De twee kleine regels onder het dooslogo worden leesbare onzin zodra een doos groter dan ~150 px is.
   Nu gevraagd als "too small to read, a soft grey blur".
3. De borstprint verhaspelt onder ~90 px; de bij van de doos lekt naar het shirt; er verschijnt een
   derde regel of een mouwembleem. Anker uitgebreid, en bij kleine figuren wordt de print nu uit beeld
   gehouden (van achteren of in profiel).
4. Een van achteren geziene polo krijgt spontaan een grote rugprint. Nu expliciet verboden.
5. In laadbakken verschijnen spanbanden en een leesbaar kenteken. Nu in het wagen-anker.
6. Het model verzint lettering op het paneel boven de cabine en op cabinedeuren. Nu expliciet kaal.
7. Merknamen op gereedschap (Makita), Apple-logo's, Dell-logo's, containercodes: nu in de vaste regels.

**Wat blijft:** de exacte vorm van de swoosh drift (soms een dikke glimlachboog of een ring om de
woorden) en de gele bij ontbreekt weleens op een doos ver weg. Dat is retouchewerk op de GEKOZEN
platen, niet op alle 77: NBP-edit met het viercontract plus regio-composit (`retouche.py`), of
deterministisch herkleuren zoals bij de teal O van `int6` (zie `klaar/`).

## Keuze

Kies per dienst uit de galerij met de nummers, bijvoorbeeld "par: 1, 4 en 6". Daarna:
1. alleen de gekozen platen retoucheren volgens het `retouche`-veld in `qa.json`;
2. leveren als webp in twee maten naar `site/assets/img/` (staand 760x1140 en 1140x1710, liggend
   1120x641 en 1680x962), met alt en figcaption;
3. de dienstpagina's inrichten met `.blok__foto` (staand) en het brede vak (liggend), links en rechts
   afwisselend, nooit twee keer dezelfde foto op een pagina.

## Mappen

`raw/` bronplaten 2K (de afgekeurde versies staan in `raw/ronde1/` en `raw/ronde2/`),
`klaar/` geretoucheerde versies (die winnen automatisch in `web.py` en de galerij),
`web/` galerijversies, `sheets/` contactvellen, `qa/` de oordelen en de crops, `edit/` NBP-edits.
`raw/`, `web/`, `sheets/`, `edit/` en `klaar/` staan in `.gitignore`: de scripts en de oordelen horen
in de repo, de 400 MB aan platen niet.
