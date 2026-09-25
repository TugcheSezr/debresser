# Briefing beeld: homepage De Kievit Verhuizingen (Top Movers-beeld)

Regie: sessie shahabmorshedian-43 (HTML, copy, QA). Deze brief is voor de beeld-terminal.

## Context

- Repo `~/website-kieviet`. Nieuwe map `site/` = kopie van de Heerlijk Thuis Ads-lander
  (`~/mijnheerlijkthuis-landing/verhuizen/`). Doel: homepage van De Kievit Verhuizingen (Venlo,
  aangesloten bij Top Movers, sinds 1 juni 2024 onderdeel van De Bresser Verhuizingen) als exacte
  kopie van die lander, volledig in de Top Movers-huisstijl en met Top Movers-beeld.
- Jij levert ALLE foto's en cutouts in `site/assets/img/` met EXACT dezelfde bestandsnamen en maten
  als de HT-lander, zodat de HTML ze zonder wijziging oppakt. Alt-teksten schrijf ik, op basis van
  jouw manifest.
- Bronnen: `topmovers/fotos/` (86 echte Top Movers-foto's) en `de-kievit-nl/fotos-kievit/` (10).
  Contactvel met nummers: `site/_werk/beeld/sheet1.jpg` en `sheet2.jpg` (nummers 0-85 = topmovers/fotos
  op alfabet, 86-95 = fotos-kievit). Nummers hieronder verwijzen daarnaar.
- NIET gebruiken: `topmovers/fotos-leden/` (trucks en panden van andere leden), `de-kievit-nl/team/`
  (De Bresser-personeel), beelden waarop het logo "Erkende Project Verhuizers"/EPV prominent leesbaar
  is (bv. nr 17 TOPMOVERS-36), CO2-Prestatieladder-logo, "100% elektrisch"-belettering (geen
  elektrisch-claim voor Venlo). Geen namen van personen.
- Werkwijze: skill `/foto-optimalisatie` (Skill tool, lees hem). Route: ECHT-EERST. Alle slots komen
  uit echte Top Movers-foto's; cutouts = echte foto uitknippen (Vision fg-mask + persoonsmasker,
  tools staan in `site/_werk/`: cutout.py, cut_situatie.py, cut_duo.py, fgmask.swift, personmask.swift,
  gekopieerd uit mijnheerlijkthuis-landing/brand/fotos/tools). Genereren met Nano Banana alleen als een
  slot echt niet uit de bank te halen is; dan met TM-polo en logo als referentie, key uit memory
  `reference_google_api_key.md` (nooit in de repo, nooit in output).

## Slots (bestandsnaam en maat exact als HT; doelvak staat in site/assets/css/style.css)

| # | Bestanden | Maat | Slot en doelvak | Kandidaat (nr contactvel) |
|---|---|---|---|---|
| 1 | hero-bg-1920.webp, hero-bg-1280.webp, hero-bg-mobiel.webp | 1920x1280, 1280x853, 900x1200 | hero rand-tot-rand, object-fit cover center top, donkere veil eroverheen; team-cutout staat ervoor | 85 (tm-header-3: open bakwagen bij bedrijfspand) of 83/84 |
| 2 | team-cutout-1600.webp, team-cutout-900.webp | 1600x778, 900x438 | uitgesneden team vanaf de heupen, breed, rechtsonder in de hero achter de offerte-pill | 81 (TopMovers-header1: drie mannen op bank met TM-tas voor de Mercedes): bank + mannen uitsnijden; alternatief 66/64 |
| 3 | dienst-compleet-{400,760,1120}.webp | ratio 760x435 | boognis, object-fit cover 332x190 | 3 (twee mannen dragen kast met TM-doos) |
| 4 | dienst-inpak-{400,760,1120}.webp | idem | idem | 40 (vrouw met BOEKENDOOS) |
| 5 | dienst-montage-{400,760,1120}.webp | idem | idem | 20 (twee mannen hangen tv) |
| 6 | dienst-opslag-{400,760,1120}.webp | idem | idem | 31 (opslagcontainer met TM-dozen; niet 33 "weglogo") |
| 7 | dienst-zakelijk-{400,760,1120}.webp | idem | idem | 15 (groene kratten op kantoor) of 25 |
| 8 | dienst-plan-{400,760,1120}.webp | idem | idem, "verhuisplan op locatie" | 68 (handdruk man/vrouw) of 57; check EPV-logo in beeld |
| 9 | duo-opslag-1600.webp, duo-opslag-1000.webp | 1600x1663, 1000x1039 | cutout twee verhuizers met dozen op de schuine band (opslag-blok), onderkant wordt via clip-path schuin afgesneden | 22 (twee mannen met TM-dozen bij de laadklep) |
| 10 | dozen-vak-1100.webp, dozen-vak-700.webp | 1100x1100, 700x700 | dozenkaart, vierkant, object-fit cover center 35% | 78 (man stapelt TM-dozen, 4000x6000) of 75 |
| 11 | figuur-tafel-1100.webp, figuur-tafel-700.webp | 1322x1100, 841x700 | cutout duo met meubel in een boog op donker vlak (venster-blok) | 3 of 20; zelfde opname nooit 2x op de pagina, dus verdeel met slot 3/5 |
| 12 | wagen-heerlijkthuis-1400.webp, wagen-heerlijkthuis-900.webp | 1400x883, 900x568 | cutout bakwagen rechts van de werkwijze-kop, drop-shadow | 38 (Volvo met TOP MOVERS-opdruk, driekwart) of 62 |
| 13 | team-boog-1200.webp, team-boog-800.webp | 1200x1789, 800x1193 (staand) | foto in boog, "verhuisteam aan het werk" | 41 (verhuizer met doos op de laadklep), staand gecropt |
| 14 | verhuisteam-1200.webp, verhuisteam-800.webp | 1200x800, 800x533 | teamfoto liggend in boog, object-position 65% 50% | 66 (mannen-header3) of 67; niet dezelfde opname als slot 2 |
| 15 | figuur-piano-1100.webp, figuur-piano-700.webp | 808x1100, 514x700 | cutout staande figuur voor cirkels (ringen-blok) | 15 (man duwt rolcontainer met groene kratten) of 41 |
| 16 | trap-scene-1000.webp, trap-scene-640.webp | 1000x1339, 640x857 | SCENE (geen cutout) in afgeronde rechthoek, object-fit cover center 34% | 9 (man met TM-doos op trap bij woning) of 39 |
| 17 | familie-1200.webp, familie-800.webp | 1200x800, 800x533 | foto in boog bij blok "Alles voor verhuizen" (particulier/zakelijk/opslag/internationaal) | 25 (inpakken op kantoor) of 29 |
| 18 | huisje-1200.webp, huisje-800.webp | 1200x900, 800x600 | foto in boog bij werkgebied Venlo en Limburg | 76 (TM-truck op landweg) of 73 |
| 19 | figuur-wasmachine-v2-1280.webp, figuur-wasmachine-v2-820.webp | 1280x1278, 820x819 | cutout figuur voor grote cirkel (split-blok) | 78 als slot 10 iets anders krijgt, anders 64 (twee mannen bij de truck) |
| 20 | leadblock-plant-1240.webp, leadblock-plant-820.webp | 1240x1848, 820x1222 (staand) | foto naast het formulier; boven 820px staand 504x775 object-position center top, eronder 16/10 liggend (50% 30%) | 75 (man op laadklep met TM-dozen) staand gecropt, of 56 |
| 21 | footer-avond-1600.webp, footer-avond-900.webp | 1600x1073, 900x604 | footer rand-tot-rand, donkere gradient eroverheen, object-position 58% 30% | 6 (truck bij zonsondergang; check dat er geen "100% elektrisch"-tekst leesbaar is) of 13 (truck aan zee) |
| 22 | og.jpg | 1200x630 | social-beeld | TM-truck of team |

Favicon, apple-touch-icon en logo's maakt de huisstijl-terminal, niet jij.

## Kwaliteit en oplevering

- webp q80-88, exacte maten, niet meer dan 1,3x opschalen. Cutouts volgens de skill: Vision-route,
  keykleur-decontaminatie niet nodig bij echte foto's, wel: alfa-randen schoon, ALLE ledematen erin,
  composit op donker controleren, geen achtergrondplaat, geen witte outline.
- `site/_werk/beeld-manifest.md`: per slot bron, crop, wat er te zien is (aantal personen, tekst op
  dozen/polo's/wagens, logo's), zodat ik alt-teksten en claims kan schrijven.
- `site/_werk/galerij-beeld.html`: per slot 2-3 kandidaten plus de gekozen default. Shahab kiest
  achteraf; jij zet je beste keuze als default in `site/assets/img/`.
- Volgorde: eerst slot 1, 2, 3-8 en 10 (boven de vouw), melden; dan de rest, melden.

## Regels

- Alleen schrijven in `site/assets/img/` en `site/_werk/` (jouw eigen bestanden). `site/index.html`
  is van de regie-sessie, `site/assets/css/style.css` van de huisstijl-terminal: niet aanraken.
- Geen git commit of push; de regie-sessie commit.
- Rapporteer via SendMessage naar `shahabmorshedian-43` bij elke mijlpaal en bij elk slot dat niet
  uit de bank te halen is (melden, niet stil weglaten).
