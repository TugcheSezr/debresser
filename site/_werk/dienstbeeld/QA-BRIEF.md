# QA-brief dienstbeeld De Kievit (voor de controle-agents)

Je beoordeelt gegenereerde foto's voor de dienstpagina's van De Kievit Verhuizingen (Venlo, lid van Top
Movers). Elke foto ligt als `raw/<id>.png` (2K). De scene-opdracht per id lees je met
`cd ~/website-kieviet/site/_werk/dienstbeeld && GEMINI_API_KEY=x ALLEEN_PROMPT=1 python3 gen_dienst.py <id>`
(het deel na "Scene:" is de bedoelde scene; de blokken ervoor en erna zijn de regels).

Je verandert NIETS aan de foto's, je genereert niets en je roept geen API aan. Je kijkt en je oordeelt.

## Zo kijk je (per foto, minimaal 10 seconden echt kijken)
1. Bekijk het hele beeld (Read op de png).
2. Maak met PIL 100%-crops van ALLE plekken met opdruk en bekijk die ook: het lockup op wagen of
   container, elke borstprint op een polo, elke doosopdruk die groter is dan ~80 px, elk vel papier,
   scherm, bord of kenteken. Bewaar ze als `qa/crops/<id>-<n>.png` en Read ze. Lees letters HARDOP: spel
   T-O-P en M-O-V-E-R-S. Kijk ook naar de achtergrond (posters, containers, andere dozen).
3. Ga dan pas naar het oordeel.

## Waar je op let, in deze volgorde
A. **Scenariologica**: klopt het verhaal met de scene-opdracht? Verhuizers dragen de antracietgrijze polo
   met Top Movers-borstprint; klanten, bewoners, verpleegkundigen en managers dragen GEEN bedrijfskleding.
   Een overdracht is klant-naar-bedrijf. Aantal personen en hun rollen zoals gevraagd.
B. **Vakregels**: tillen met de buik NAAR de last en de armen voor het lichaam; nooit iets op rug of
   schouder; laadklep ACHTEROP de wagen (nooit zijkant); rolcontainer rechtop op vier wielen; hondje
   ONDER het meubel, niemand staat erop; dozen rechtop, nooit liggend op een zijkant; GEEN spanbanden,
   touwen, folie of plakband, ook niet in de laadbak; niemand meet iets op; schilderijen/kunst volledig
   ingepakt (niets van doek of lijst zichtbaar); vleugelpoten allemaal los OF allemaal eraan; steekwagen
   met de schep onder de last; panden en kamers schoon en heel; geen oordopjes.
C. **Merk en tekst op 100%**:
   - Wagen/container: lockup TOP boven, MOVERS eronder iets naar rechts, ALLE letters dezelfde kleur
     (zwart); de O van TOP is NIET teal; de teal swoosh loopt ONDER de letters en eindigt in een pijlpunt
     rechts van MOVERS; verder GEEN tekst, telefoonnummer, webadres, badges of keurmerklogo's op de wagen;
     teal skirt en teal achterkant mogen; kenteken onleesbaar. Laadklep met gele reling achterop.
   - Polo: borstprint links op de borst, wit TOP / wit MOVERS met teal swoosh, precies EEN keer, niet
     gespiegeld, niet op de rug, geen bij op het shirt, geen pet, geen hi-vis, geen naamlabel.
   - Dozen: kraft met honingraat-zeshoeken langs de randen, lockup TOP/MOVERS met de gele bij, twee kleine
     regels eronder mogen zacht zijn maar geen leesbare onzin vormen; GEEN plakband over de naad (de flappen
     vouwen in elkaar); NIETS met de hand op de doos geschreven, geen stickers, geen labels, geen kamernamen;
     dozen rechtop. Kleine dozen ver weg: minstens herkenbaar TOP MOVERS.
   - Nergens: EPV/PPV, CO2-Prestatieladder, ISO, VCA, Fedemac, IAM, "100% elektrisch", ledennamen van andere
     Top Movers-leden (Van der Ent, P.A. van Rooyen, Holwerda), "Erkende Verhuizers"-badge op de wagen.
   - Papier, schermen, borden, kentekens: geen leesbare woorden. Onleesbare strepen zijn goed.
D. **Mensen**: niemand kijkt in de lens; geen brede grijns of lachen, geen duimen omhoog; lichte glimlach of
   geconcentreerd is goed (Shahab: "vrolijk maar niet te vrolijk, gewoon positief"); huid met porien, geen
   wasachtige huid, geen rode vlekken; handen kloppen (vijf vingers, echt contact met wat ze vasthouden,
   spanning onder een zware last); twee personen zijn niet dezelfde man; leeftijd past bij de rol.
E. **Beeld**: Nederland (geen Amerikaanse huizen, stopcontacten, borden); licht helder maar niet fel, geen
   HDR, geen CGI/illustratie-look; niemand aan hand of voet afgesneden door de rand; staand beeld (2:3):
   onderwerp in de middenbaan en bruikbaar in een vak dat iets smaller en hoger uitsnijdt; liggend beeld
   (3:2): bruikbaar als bannercrop uit de middenbaan.

## Oordeel per foto
- **goed**: zo te gebruiken.
- **let**: bruikbaar na een kleine retouche; beschrijf EXACT wat en waar (bijv. "gewichtslabel op de
  onderste doos linksonder leest 'Nax 30 kg'", "borstprint gespiegeld", "teal O in TOP op de container").
- **fout**: valt af of moet opnieuw; zeg waarom en geef een concrete prompt-aanpassing.

## Uitvoer
Schrijf EEN bestand `qa/<code>.json` (code = eerste drie letters van de ids, bijv. `par`):
```json
{"par1-laadklep-steekwagen": {"oordeel": "let", "tekst": "kort oordeel in het Nederlands, max 220 tekens",
  "retouche": "wat en waar, of leeg", "opnieuw": "waarom en welke prompt-aanpassing, of leeg"}, ...}
```
Alle 7 ids van je dienst moeten erin staan. Geen andere bestanden aanmaken behalve de crops.
Meld daarna in je eindrapport per id het oordeel in een regel, plus wat je in het algemeen zag
(bijv. "de O van TOP is op 3 van 7 wagens teal"). Geen tabellen nodig.
