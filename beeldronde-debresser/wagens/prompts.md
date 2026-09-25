# Goedgekeurde De Bresser-vrachtwagens met belettering

Versie 2 en 3, goedgekeurd voor de site op 24-09-2026 (ronde 4, `wagen-debresser-r4-20260924`):
"Goedgekeurd voor de site: versie 2 en 3". Nog geen plek op de site gekozen: losse wagen zonder mensen,
liggend 3:2, voor een brede fotoplek of paginahero.

## LET OP: drie punten die nog open staan

De goedgekeurde beelden dragen de tekst die nu op de echte wagen staat. Deze drie punten zijn door de
gebruiker nog niet beslist; verandert er een, dan verandert het beeld en moet het opnieuw worden goedgekeurd.

1. **Vestigingen** (onderrand laadbak): `OISTERWIJK 013 - 528 23 72`, `TILBURG 013 - 542 59 35`,
   `BREDA 076 - 8200233`. Venlo, Brussel en Reeuwijk ontbreken.
2. **Nummer van Breda**: `076 - 8200233` staat op de wagen (en dus op deze beelden); op /contact/ staat
   `076 52 24 100`.
3. **Logistieke regel**: `FULL SERVICE IN LOGISTIEK / GEWELDIG IN VERHUIZEN` (achteraan op de laadbak en op
   de deur, uit het logobestand), terwijl de logistieke tak in 2024 verkocht is.

Verder: de slogan in de band, `ONS VERVOER WORDT / ENKEL UITGEVOERD MET / DE SCHOONSTE MOTOREN!!!`, is
overgenomen van de echte wagen; het is een milieuclaim die niet is nagetrokken.

## Bestanden

| bestand | md5 |
|---|---|
| `wagen-2-bij-de-loods.png` | 4d23e0b18a163439f50e11e3929462fa |
| `wagen-3-onderweg-in-brabant.png` | b539aa1f132d50ea90bf60160119a9de |
| `werk/versie-2.jpg` (ruw, zonder belettering) | 312e141cc5d221be4d0dd892ab9afbd4 |
| `werk/versie-3.jpg` (ruw, zonder belettering) | 838c1f464432ec285e74b43167eb9ce7 |
| `werk/merk-op-wagen.py` | 3cf61236692a6baf4b5a2e3db41b5c29 |
| `werk/logos/2024-07_De-Bresser-Logo-2024.png` | 888b308d99eac175d580e4cbda73f96c |
| `werk/logos/2024-06_Erkende-verhuizers-De-Bresser@300x.png` | 947a1e2010d325dc8d5d3105fdcf36fc |
| `werk/logos/2024-03_De-Bresser-Top-movers.png` | 1eef878714b2ad043a2391e8dd575b42 |
| `werk/ronde-r4.json` (het recept) | 291359596bbe645855649709694a2e44 |
| `werk/wagen-debresser.txt` (promptblok wagen) | c30c58ab3c4004c0ae8dd2383bb22ecb |
| `werk/licht-camera-wagen.txt` (promptblok licht en camera) | 9265bed64650341e9d854102a6d703a3 |
| `werk/ref-debresser-wagen-parijs-zonder-tekst.jpg` (referentie) | b5a24394cd0ed1a25000f64b66c31d35 |

Beelden 2528x1696 (3:2, 2K). Lettertype: `C:/Windows/Fonts/bahnschrift.ttf` (md5 6e51210b3c6c475b7c5c2090c91d0f3d),
het Windows-systeemlettertype; niet meegekopieerd, want Microsoft staat verspreiden niet toe. Het staat op elke
Windows 10/11-machine; controleer de md5 voor je opnieuw zet.

## Hoe de beelden gemaakt zijn

Model `gemini-3-pro-image-preview` via de skill image-versions (`ronde.py`), 3:2 op 2K. Referentie: een echte
wagenfoto van debresser.nl (Parijs) met de opdruk eraf gehaald, `werk/ref-debresser-wagen-parijs-zonder-tekst.jpg`.
Geen tekst in het prompt: de wagen kwam zonder letters uit de generator en de belettering is er daarna op gezet
met de echte logobestanden. Rondes: 1 (vijf versies, 2 en 3 gehouden: "add the branding"), 2 (belettering),
3 en 4 (alleen het front: "the de bresser brand should be centered", "still not centered, more to the left").

### Belettering (zelfde plan op beide, naar de echte wagen en het merkboek)

- **Laadbak linksboven**: logo Erkende Verhuizers (het bestand is alleen wit; ingekleurd: katrol oranje
  (252,120,43), tekst donkerblauw (3,39,97), gemeten op de wagenfoto uit Tilburg), daaronder DE BRESSER /
  GROUP OF COMPANIES met beeldmerk (woordmerk en beeldmerk uit het logo 2024; `GROUP OF COMPANIES` in Bahnschrift).
- **Ernaast**: het Top Movers-logo.
- **In de groene band**: de slogan, in Bahnschrift Bold.
- **Achteraan**: het grote logo zonder kroon en zonder `SINDS 1923`, met `FULL SERVICE IN LOGISTIEK / GEWELDIG IN VERHUIZEN`.
- **Onderrand**: de drie vestigingen, in Bahnschrift.
- **Cabine**: op de deur DE BRESSER met de twee regels; beeldmerk op het paneel achter de deur; op het front onder
  de voorruit DE BRESSER / GROUP OF COMPANIES met beeldmerk, gecentreerd op de as van de wagen (Renault-logo,
  sleuf, grille): versie 2 op x 605 (logo x 497-713), versie 3 op x 830 (logo x 720-940). De zonneklep is leeg.
- Vlakken met een homografie op de wagen gezet, met de schaduw van de wagen eroverheen.

Belettering opnieuw zetten (overschrijft de twee beelden in deze map; deterministisch: dit gaf op 24-09-2026
precies dezelfde bestanden, md5 nagekeken):

    cd beeldronde-debresser/wagens/werk
    python merk-op-wagen.py . 2 ../wagen-2-bij-de-loods.png
    python merk-op-wagen.py . 3 ../wagen-3-onderweg-in-brabant.png

Andere tekst in een vak (een van de open punten): pas `SLOGAN`, `VESTIGINGEN` of het logobestand aan in
`merk-op-wagen.py`. Dat maakt er een ander beeld van: de gebruiker moet het dan opnieuw goedkeuren.

Opnieuw genereren (alleen als het nodig is, kost geld): `python ~/.claude/skills/image-versions/scripts/ronde.py
beeldronde-debresser/wagens/werk/ronde-r4.json`. Dat geeft nieuwe beelden, geen kopie van deze.

## Prompts woordelijk zoals gegenereerd

### Versie 2: Driekwart voor, bij de loods (`wagen-2-bij-de-loods.png`)

Verstuurd 24-09-2026 17:07, model gemini-3-pro-image-preview, met de referentiefoto als enig beeld.

```
ABSOLUTE RULE 1, THE TRUCK: the truck in the picture is the De Bresser moving truck of the attached reference photo, shown on its own: a modern white Renault T-style truck with a high white cab and a tall white box body on the same chassis (one rigid truck, not a tractor with a trailer), two axles, a silver-grey side skirt with toolboxes between the axles, and a tail lift folded up under the rear of the box. The livery is exactly the one in the reference photo and nothing more:
- On the side of the box body, a little above the middle of its height, runs ONE wide horizontal band of bright green (#3DE55A). The band begins FLUSH at the FRONT edge of the box, right behind the cab, with no white gap, and runs back toward the rear to a little past the middle of the box length. Only its REAR end, the end furthest from the cab, breaks apart into a loose cluster of glossy bright green 3D cubes of different sizes, a few of them floating just above and below the band, as if the band crumbles into blocks. So the solid part of the band is always near the cab and the cubes are always toward the back doors, on both sides of the truck.
- On the cab, a block of bright lime GREEN (#77F628, a light fresh green, clearly green and never yellow) fills the upper rear corner of the cab side behind the door window, with two or three small green cubes breaking off its top edge. It is the same family of green as the band, only a little lighter.
- Everything else on the truck is clean, plain white. The places where the company later puts its printed name and logos stay EMPTY WHITE: the upper front corner of the box, the whole rear third of the box side, the strip along the bottom of the box, the cab door, the panel above the windscreen and the cab front below the windscreen. The rear doors of the box are plain white.
ABSOLUTE RULE 2, NO TEXT: there are no letters, numbers, words, logos, symbols, badges, stickers or phone numbers anywhere on the truck, not in the green band, not on the cubes, not on the cab. The yellow Dutch licence plate is a plain yellow rectangle without readable characters. The only maker's sign is the small Renault diamond on the grille. No other readable text anywhere in the frame: street signs and shop signs are out of focus or turned away.
ABSOLUTE RULE 3, NO PEOPLE: this is a picture of the truck alone. There is nobody in the cab, nobody next to the truck, nobody on the pavement or in the background.
The truck is clean and well kept, freshly washed, but real: a little road dust low on the wheels and the side skirt, tyres that have driven.

The FIRST attached image shows the De Bresser moving truck with its green band, green cubes and green cab block; the printed lettering has been removed from this photo on purpose, so copy the truck, its proportions and the green shapes, not the Paris background. Use it only for that.

SCENE: The truck stands on grey brick pavers at the company depot on a business park, in front of a dark grey corrugated steel warehouse with a large closed roller door. Seen from the front three-quarter, from the front left corner, so the cab front and the whole left side of the box with the green band are visible, the box running away to the right. A pale blue sky with some light cloud above the warehouse roof. Afternoon sun from the right, the cab front in soft light.

Light: a bright, friendly Dutch day. The sun is out but softened by thin high cloud, so the light clearly comes from one side with soft-edged but visible shadows under the truck, colour temperature around 5600K, clean and neutral. Not harsh: no blown-out glare, no deep black shadows, no golden-hour orange, no dramatic sky, never a flat grey overcast. The white of the box keeps detail in the highlights.
Camera: documentary photograph from standing eye height at normal distance, 35mm, f/8 so the whole truck is sharp, natural handheld framing with a slight imperfection, no drone view, no fisheye, no wide-angle distortion, no tripod-perfect symmetry.
Composition for a wide LANDSCAPE photo on a website: the whole truck is in frame, nose to tail, with some room around it, and it sits in the middle band of the height so the picture may later be cropped to a wider banner. The green band and the cubes are large and crisp.
A real photograph, not an illustration, not 3D, not a render, not a CGI car advert. Visible sensor noise, true-to-life muted Dutch daylight colour, no HDR, no teal-and-orange grading, no vignette, no border. The Netherlands, not America: Dutch brick, Dutch street furniture, Dutch road markings.
Avoid: any letters, numbers or logos on the truck; a readable licence plate; people; a driver in the cab; a trailer; a second truck; straps or cargo showing; American trucks or roads; snow; rain; wet roads; harsh glare; cartoon or CGI look; glossy showroom render.

Photorealistic documentary photograph of one moving truck, aspect ratio 3:2, full-frame camera, natural colours.
```

### Versie 3: Onderweg in Brabant (`wagen-3-onderweg-in-brabant.png`)

Verstuurd 24-09-2026 17:05, model gemini-3-pro-image-preview, met de referentiefoto als enig beeld.

```
ABSOLUTE RULE 1, THE TRUCK: the truck in the picture is the De Bresser moving truck of the attached reference photo, shown on its own: a modern white Renault T-style truck with a high white cab and a tall white box body on the same chassis (one rigid truck, not a tractor with a trailer), two axles, a silver-grey side skirt with toolboxes between the axles, and a tail lift folded up under the rear of the box. The livery is exactly the one in the reference photo and nothing more:
- On the side of the box body, a little above the middle of its height, runs ONE wide horizontal band of bright green (#3DE55A). It starts at the front edge of the box and runs back to a little past the middle of the box length, where its end breaks apart into a loose cluster of glossy bright green 3D cubes of different sizes, a few of them floating just above and below the band, as if the band crumbles into blocks.
- On the cab, a bright yellow-green block (#77F628) fills the upper rear corner of the cab side behind the door window, with two or three small green cubes breaking off its top edge.
- Everything else on the truck is clean, plain white. The places where the company later puts its printed name and logos stay EMPTY WHITE: the upper front corner of the box, the whole rear third of the box side, the strip along the bottom of the box, the cab door, the panel above the windscreen and the cab front below the windscreen. The rear doors of the box are plain white.
ABSOLUTE RULE 2, NO TEXT: there are no letters, numbers, words, logos, symbols, badges, stickers or phone numbers anywhere on the truck, not in the green band, not on the cubes, not on the cab. The yellow Dutch licence plate is a plain yellow rectangle without readable characters. The only maker's sign is the small Renault diamond on the grille. No other readable text anywhere in the frame: street signs and shop signs are out of focus or turned away.
ABSOLUTE RULE 3, NO PEOPLE: this is a picture of the truck alone. There is nobody in the cab, nobody next to the truck, nobody on the pavement or in the background.
The truck is clean and well kept, freshly washed, but real: a little road dust low on the wheels and the side skirt, tyres that have driven.

The FIRST attached image shows the De Bresser moving truck with its green band, green cubes and green cab block; the printed lettering has been removed from this photo on purpose, so copy the truck, its proportions and the green shapes, not the Paris background. Use it only for that.

SCENE: The truck drives along a straight two-lane provincial road through the Brabant countryside, flat green fields and a row of tall poplars along the road, a red-brick farmhouse far off. Seen from the verge at a slight angle from the front, the left side of the box with the green band toward the camera. The truck is sharp, the wheels show a little motion, the road surface grey asphalt with white edge lines. Bright midday light under thin high cloud.

Light: a bright, friendly Dutch day. The sun is out but softened by thin high cloud, so the light clearly comes from one side with soft-edged but visible shadows under the truck, colour temperature around 5600K, clean and neutral. Not harsh: no blown-out glare, no deep black shadows, no golden-hour orange, no dramatic sky, never a flat grey overcast. The white of the box keeps detail in the highlights.
Camera: documentary photograph from standing eye height at normal distance, 35mm, f/8 so the whole truck is sharp, natural handheld framing with a slight imperfection, no drone view, no fisheye, no wide-angle distortion, no tripod-perfect symmetry.
Composition for a wide LANDSCAPE photo on a website: the whole truck is in frame, nose to tail, with some room around it, and it sits in the middle band of the height so the picture may later be cropped to a wider banner. The green band and the cubes are large and crisp.
A real photograph, not an illustration, not 3D, not a render, not a CGI car advert. Visible sensor noise, true-to-life muted Dutch daylight colour, no HDR, no teal-and-orange grading, no vignette, no border. The Netherlands, not America: Dutch brick, Dutch street furniture, Dutch road markings.
Avoid: any letters, numbers or logos on the truck; a readable licence plate; people; a driver in the cab; a trailer; a second truck; straps or cargo showing; American trucks or roads; snow; rain; wet roads; harsh glare; cartoon or CGI look; glossy showroom render.

Photorealistic documentary photograph of one moving truck, aspect ratio 3:2, full-frame camera, natural colours.
```
