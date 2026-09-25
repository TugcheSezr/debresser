# Goedgekeurd: verhuizers aan het werk, dozen op het platform

Twee De Bresser-verhuizers laden de wagen: de oudere man (gezicht 09) staat op de laadklep en neemt een witte
verhuisdoos aan van de jonge man (gezicht 02) op de stoep. Goedgekeurd voor de site op 25-09-2026:
"Goedgekeurd voor de site: versie 2" (ronde 4, `werkers-aan-het-werk-r4-20260925`).

Liggend 3:2, 2528x1696. De uitsnede van de twee werkers met de doos staat op de site in home #reviews (zie onderaan).

Hoe het beeld tot stand kwam (alle tussenrondes zijn na de goedkeuring verwijderd):

1. Ronde 1 (24-09): vijf versies gegenereerd; versie 2 goedgekeurd zonder logo. Dat is `werk/versie-2.jpg`, het
   enige gegenereerde beeld; alles daarna is er als overlay op gezet, niets is opnieuw gegenereerd.
2. Ronde 2: het Top Movers-borstlogo op 09 (`werk/merk_borst.py`, `borst.json`, `logo-topmovers-borst.png` uit
   `maak_logo.py`). 02 staat met zijn rug naar de camera en krijgt geen logo. Notitie van de gebruiker:
   "Houden, aanpassen: versie 2 — add the branding on the truck".
3. Ronde 3: de belettering van de goedgekeurde vrachtwagens op de laadbak (`werk/merk-op-wagen.py`, een aangepaste
   kopie van `beeldronde-debresser/wagens/werk/merk-op-wagen.py`: bak 1,35 : 1, indeling gespiegeld omdat de band
   hier achteraan begint; geen groot logo (D), geen cabine, geen front). Notitie: "add branding to the box ."
4. Ronde 4: de opdruk van de echte De Bresser-doos op de lange zijde van de verhuisdoos (`werk/opdruk-op-doos.py`):
   logo zonder kroon en www.debresser.nl. Goedgekeurd.

Opnieuw maken (deterministisch; op 25-09-2026 nagerekend, alle drie de lagen byte voor byte gelijk):

```
cd werk
python merk_borst.py              # versie-2.jpg       -> versie-2-merk.png   (652996a8...)
python merk-op-wagen.py . 2       # versie-2-merk.png  -> versie-2-wagen.png  (1ffe6c2d...)
python opdruk-op-doos.py . 2      # versie-2-wagen.png -> versie-2-doos.png   (88f0d30f...)
```

`merk_borst.py` roept `dereus/_ai-beelden/gereedschap/merk-op-doos.py` aan (buiten deze repo). De logo's staan
in `werk/logos/` (kopie van `de-kievit-nl/logos/`); Bahnschrift komt uit Windows. `meet-bak-plat.png` en
`meet-doos-mouw.png` zijn de metingen van de laadbak en van de mouw voor de doos.

| bestand | md5 |
|---|---|
| `werkers-aan-het-werk-2-dozen-op-het-platform.png` | 88f0d30f3d04ef52022b229c1e7d42e8 |
| `werk/versie-2.jpg` (ruw, zonder logo's) | 81694d55a9da064464cda96fa989dfff |

**Nog open, niet beslist door de gebruiker.** Het beeld draagt de tekst van de echte wagen en de echte doos:

- vestigingen op de wagen: alleen Oisterwijk, Tilburg en Breda (Venlo, Brussel en Reeuwijk ontbreken);
- het nummer van Breda op de wagen: 076 - 8200233, terwijl /contact/ 076 52 24 100 zegt;
- ~~"FULL SERVICE IN LOGISTIEK" op de doos~~: beslist 25-09-2026, de gebruiker houdt de tekst ("Keep it");
- de slogan "ONS VERVOER WORDT ENKEL UITGEVOERD MET DE SCHOONSTE MOTOREN!!!" in de band is niet nagekeken.

Wordt een van deze beslist, draai dan het script van die laag en de lagen erna opnieuw met de nieuwe tekst; dat
is een ander beeld en moet opnieuw goedgekeurd worden.

Het prompt van het ruwe beeld, woordelijk zoals het in ronde 1 verstuurd is:

## Versie 2: Dozen op het platform (`werk/versie-2.jpg`)

Model gemini-3-pro-image-preview, verhouding 3:2, 2K, verstuurd 24-09-2026 17:41.

Beelden, in deze volgorde voor het prompt:
1. `C:\Users\arnas\Git_Repos\debresser\beeldronde-debresser\gezichten\gezicht-02-rood-haar-sproeten.jpg` (gezicht)
2. `C:\Users\arnas\Git_Repos\debresser\beeldronde-debresser\gezichten\gezicht-09-grijze-strepen-achterover.jpg` (gezicht)

```
NO TEXT AND NO LOGOS: no logo of any kind anywhere in the frame, not on clothing, boxes, vehicles, buildings or equipment; the company's own logos are added to the photograph later. No certification logo, no seal, no membership badge, no company name, no sustainability claim, no street sign with readable words. Any sign, poster, screen, phone display, newspaper, printed sheet, drawing, list or document is seen at a shallow angle or slightly out of focus, so that it reads as a page with lines on it and no single word can be made out. Licence plates are plain, turned away or out of focus. No text is added over the photograph.

COLOURS: the colours that belong to the company are the charcoal grey of the workwear, the clean white of the trucks, vans and boxes, and the bright green of the band on the trucks. White is truly white, not grey and not cream. Nobody wears orange, yellow or fluorescent safety colours, a hi-vis vest, or blue work clothes.

THE BOXES: every moving box is a WHITE corrugated cardboard moving box of real moving-box size, roughly 48 by 32 by 36 centimetres. It closes with interlocking folded top flaps, a self-closing lid, and it has oval hand holes in the two short sides. Every face of every box is plain, clean white cardboard with nothing printed on it: no logo, no lettering, no web address, no pictograms, no arrows, no codes; the real print is added to the photograph later. There is NEVER a strip of tape over the seam or anywhere else on a box, never a tape dispenser, never rope, strap, stretch film or string around a box. Nobody has written anything on any box: no marker words, no room names, no numbers, no stickers, no paper labels. A box that is set down stands upright and square on its bottom, never on its side, never tilted. The boxes are clean, at most one light scuff.

THE TRUCK: every truck in the picture is this company's moving truck: a clean white Renault T cab with a tall white box body on the same chassis. The box body carries one wide horizontal bright green band (#3DE55A) running from its front edge to about 55 percent of its length, where the band breaks apart into a scattered cluster of glossy green 3D cubes of different sizes. The cab has a bright green (#77F628) block on its rear corner with a few floating cubes. All other surfaces are plain white and empty: no text, no letters, no numbers, no logos, no phone numbers, no web address, no badges, no stickers on the cab doors, nothing on the panel above the cab, nothing on the rear doors. The licence plate is a plain yellow rectangle without readable characters. A tail lift, when there is one, sits at the BACK of the truck and is lowered flat to the ground when in use; never a lift on the side. Inside the box body the walls are bare: no ratchet straps, no hanging straps, no nets, no cords; furniture in there is wrapped only in grey moving blankets tucked in by hand, nothing tied around it.

Trade rules that must hold. Anyone carrying something carries it with the belly TOWARD the load and both arms in FRONT of the body; never with the back to the load, never a box or a piece of furniture on a shoulder or on the back. A box is set down upright on its bottom, never slid in lying on its side. Furniture travels wrapped in plain grey moving blankets held by hand, never with straps, ropes, cords, film or tape. A hand truck, dolly or rolling container is exactly the plain UNBRANDED one of the attached equipment reference when one is attached, used properly: the hand truck with its plate under the load and the user behind it, the dolly UNDER the furniture, the rolling container upright on its four wheels, nobody standing on any of them. Nobody is measuring anything with a tape measure. Tools, drills and equipment carry no maker's name. Buildings, stairwells and rooms are clean and well kept. No earbuds in anyone's ears.

THE WORKWEAR of a Dutch moving company, as its crew really wear it: every mover wears a charcoal-grey (#4B484F) cotton pique polo shirt with short sleeves, a two-button placket and a flat knit collar; black work trousers with knee pockets and a leg pocket; dark grey safety work shoes. The polo is COMPLETELY PLAIN charcoal: no logo, no emblem, no embroidery, no print, no badge and no lettering on the chest, the sleeves or the back, AND it has had a morning of work in it: the fabric is soft and hangs naturally, gentle creases at the waist and the elbows, the collar a little relaxed, faded a touch at the shoulder seams. Neat and clean, not ironed crisp, not new out of the packet. The left chest (the wearer's left, the right side of the picture when he faces the camera) is a clean, unobstructed area of plain fabric. No cap, no hi-vis, no gloves, no name tag, no watch with a brand, no earbuds. Every mover in the picture wears this.

- BOTH MOVERS ARE MEN, and they are the only two people in the picture. There is no woman and no third person.
- Person A is about 23, lanky and narrow-shouldered, a little taller; Person B is about 56, wiry and lean, with the calm economy of someone who has done this for thirty years. Both wear the same workwear.

- CHECK THE SHIRTS: both men wear the charcoal POLO shirt with a flat knit collar and a two-button placket, completely plain: no small emblem, badge, patch or embroidery anywhere on the chest. Neither of them wears a crew-neck T-shirt.
- CHECK THE BOXES, NO TAPE: these are new white folding boxes that close by themselves. The top flaps are folded into each other and the bottom flaps are folded into each other. There is NO adhesive tape anywhere on any box: no clear or shiny strip over a seam, no strip wrapping around an edge at the top or the bottom, no tape on the sides. Every seam and every edge shows only bare, matt white folded cardboard.
- Both men keep their mouths closed; no teeth are visible.

Person A (the younger mover, a lanky young man of about 23 with short messy copper-red hair, many freckles and sparse reddish stubble): use the FIRST attached image for face identity, age, skin and expression only; ignore its clothing, headwear and background.
Person B (the senior mover, a wiry Indo-Dutch man of about 56 with black hair with grey streaks combed back, clean-shaven, deep smile lines): use the SECOND attached image for face identity, age, skin and expression only; ignore its clothing, headwear and background.
The people must look clearly like different individuals.

SCENE: At the back of the company's white truck parked at the kerb of a Dutch residential street. Person B stands on the lowered tail lift platform and takes one white moving box from Person A, who lifts it up to him from the pavement with both hands under it. Behind Person B, inside the truck, stand a few pieces of furniture wrapped in grey moving blankets; there are no other boxes in view. Seen from the pavement slightly to the side and a little low, so the rear corner of the box body and the end of the green band with its cubes are in view. Midday light from the upper right under a clear blue sky.

Mood: positive and calm. The people are relaxed and content in their work: a light natural smile with the lips touching each other, or a friendly focused face; the mouth stays closed and no teeth are visible on anyone, never a wide grin, never laughing, no posed cheerfulness, no thumbs up, nobody looking at the camera.

Composition for a wide LANDSCAPE photo on a website: a horizontal frame that may later be cropped to a wider banner, so keep the subject and every face inside the middle band of the height, and leave room at the left and right. Nobody is cut off at a hand or a foot by the border. People who are small in the frame are seen from behind, in profile or turned to their work; a mover who faces the camera with the left chest of his polo in view is close to the camera, so that his chest is large in the frame.

Light: a bright, friendly day. The sun is out in a clear blue sky with a few white clouds, so the light is clearly directional from one side with soft-edged but visible shadows, colour temperature around 5600K, clean and neutral with a little warmth on the sunlit side, whites crisp and truly white. Not harsh: no blown-out midday glare, no deep black shadows, no golden-hour orange, no dramatic sky, never a flat grey overcast. Faces sit on their own shadow side or just beside the sunlit patch, never evenly lit.

Camera: documentary photograph at 35mm from standing chest height, aperture f/5.6 so the room or the street stays legible, 1/125s, natural handheld framing with a slight tilt, perspective from normal standing distance. No drone view, no fisheye, no tripod-perfect symmetry.

Imperfect framing on purpose: something ordinary is half in the way, a door frame darkening one edge, a chair or a bicycle cut off by the border, a coat over a bannister, a folded blanket on the floor. Lived in and in use, not tidied up for the photograph, not symmetrical, not a magazine interior, but clean and well kept.

A real photograph, not an illustration, not 3D, not a render, not a painting. Visible sensor noise, skin with pores and fine lines, healthy even skin without red patches, true-to-life colour in clear daylight with whites that are truly white, no HDR, no teal-and-orange grading, no glossy plastic skin, no magazine perfection, no vignette, no film border or frame around the picture. The people are ordinary working men of different builds, not models. Each hand has exactly four fingers and one thumb, every visible fingertip belongs to a hand that is itself in the frame, and the grip matches the weight of what it holds: under a heavy load the forearms show the effort. The Netherlands, not America: Dutch brick houses and window frames, Dutch power sockets, Dutch street furniture, yellow licence plates out of focus.

Avoid: text, letters, numbers, a logo, a watermark, a brand name, licence plate characters, stickers, garbled signage; a print, patch, badge or embroidery on any clothing; a hi-vis vest, orange or yellow safety colours, blue work clothes; tape, straps, ropes, cords or film on or around any box or piece of furniture; a box lying on its side; handwriting, marker words or paper labels on a box; certification seals; a wide grin or laughter; thumbs up; identical faces; distorted hands or extra fingers; relaxed hands under a heavy load; hands pressed against empty air; waxy or plastic skin; red blotches on cheeks; a burning table lamp in daylight; American houses, sockets or road signs; snow; rain; harsh glare; cartoon or CGI look.

Photorealistic editorial photograph, aspect ratio 3:2, full-frame camera, natural colours, realistic depth of field. An original scene with original people, not a real recognisable individual.
```

## Uitsnede van de twee werkers met de doos

Goedgekeurd 25-09-2026 op keuzepagina `_image-versions/home-beelden-20260925`, optie 2: "Option 2: two workers + box".
Staat op de site in home #reviews, rechts naast de reviewkaarten: `site/assets/img/beeld/werkers-duo-doos-uitsnede-1100.webp`
en `-700.webp` (hoogte in px).

| Bestand | Uit | Maat | md5 |
|---|---|---|---|
| `werkers-aan-het-werk-2-duo-uitsnede.png` | `werkers-aan-het-werk-2-dozen-op-het-platform.png` | 1034x1532 | 1fc1971e2323dbca0e9fcaf5729a6323 |

Zo gemaakt: uitsnede 300,0-1600,1696 van de bron, dan `python site/_werk/cutout_mat.py <uitsnede>.png <uit>.png --margin 30`,
daarna met de hand schoongemaakt: de gatenvorm tussen de figuren weggehaald, een donkere wig (lum < 115, y 676-691,
x 258-280) weg, en veegsporen bij de schoenen (alpha < 200 naar 0, onder y 1130, x >= 560).

# Goedgekeurd: verhuizers aan het werk 3, kratten door de gang

Kantoorverhuizing in een lichte gang met glazen deuren: de oudere man (gezicht 11) duwt een lage rolplank met vier
effen grijze kratten, de jonge man (gezicht 04) houdt de glazen deur voor hem open. Goedgekeurd voor de site op
25-09-2026: "Goedgekeurd voor de site: versie 5" (ronde `werkers-aan-het-werk-r5-20260925`; versie 1 tot en met 4
vielen af, de ronde is daarna verwijderd). Nog niet op de site: de gebruiker heeft nog niet gezegd waar het komt.

Liggend 3:2, 2528x1696. Het enige gegenereerde beeld is `werk/versie-3.jpg` (ronde r5, versie 5; die versie is een
keer opnieuw gegenereerd omdat 11 er eerst te jong uitzag). Daarna alleen het Top Movers-borstlogo op 04, met
`werk/merk_borst.py` en sleutel "3" in `werk/borst.json`. 11 staat en profil met zijn arm voor de linkerborst en
krijgt geen logo. Geen wagen en geen bedrukte doos in beeld, dus geen andere lagen en geen open tekstpunten.

Opnieuw maken (op 25-09-2026 nagerekend, byte voor byte gelijk):

```
cd werk
python merk_borst.py 3            # versie-3.jpg -> versie-3-merk.png (47af9a32...) = werkers-aan-het-werk-3-kratten-door-de-gang.png
```

| bestand | md5 |
|---|---|
| `werkers-aan-het-werk-3-kratten-door-de-gang.png` | 47af9a328c7f0589e0eca8bf791ebb87 |
| `werk/versie-3.jpg` (ruw, zonder logo) | dfecea8c77b7a5c16e883695f6a737c6 |

Het prompt van het ruwe beeld, woordelijk zoals het verstuurd is:

## Versie 3 (ronde r5, versie 5): Kratten door de gang (`werk/versie-3.jpg`)

Model gemini-3-pro-image-preview, verhouding 3:2, 2K, verstuurd 25-09-2026 14:03.

Beelden, in deze volgorde voor het prompt:
1. `C:\Users\arnas\Git_Repos\debresser\beeldronde-debresser\gezichten\gezicht-11-snor-kalend.jpg` (gezicht)
2. `C:\Users\arnas\Git_Repos\debresser\beeldronde-debresser\gezichten\gezicht-04-twists-snor.jpg` (gezicht)

```
NO TEXT AND NO LOGOS: no logo of any kind anywhere in the frame, not on clothing, boxes, vehicles, buildings or equipment; the company's own logos are added to the photograph later. No certification logo, no seal, no membership badge, no company name, no sustainability claim, no street sign with readable words. Any sign, poster, screen, phone display, newspaper, printed sheet, drawing, list or document is seen at a shallow angle or slightly out of focus, so that it reads as a page with lines on it and no single word can be made out. Licence plates are plain, turned away or out of focus. No text is added over the photograph.

COLOURS: the colours that belong to the company are the charcoal grey of the workwear, the clean white of the trucks, vans and boxes, and the bright green of the band on the trucks. White is truly white, not grey and not cream. Nobody wears orange, yellow or fluorescent safety colours, a hi-vis vest, or blue work clothes.

Trade rules that must hold. Anyone carrying something carries it with the belly TOWARD the load and both arms in FRONT of the body; never with the back to the load, never a box or a piece of furniture on a shoulder or on the back. A box is set down upright on its bottom, never slid in lying on its side. Furniture travels wrapped in plain grey moving blankets held by hand, never with straps, ropes, cords, film or tape. A hand truck, dolly or rolling container is exactly the plain UNBRANDED one of the attached equipment reference when one is attached, used properly: the hand truck with its plate under the load and the user behind it, the dolly UNDER the furniture, the rolling container upright on its four wheels, nobody standing on any of them. Nobody is measuring anything with a tape measure. Tools, drills and equipment carry no maker's name. Buildings, stairwells and rooms are clean and well kept. No earbuds in anyone's ears.

THE WORKWEAR of a Dutch moving company, as its crew really wear it: every mover wears a charcoal-grey (#4B484F) cotton pique polo shirt with short sleeves, a two-button placket and a flat knit collar; black work trousers with knee pockets and a leg pocket; dark grey safety work shoes. The polo is COMPLETELY PLAIN charcoal: no logo, no emblem, no embroidery, no print, no badge and no lettering on the chest, the sleeves or the back, AND it has had a morning of work in it: the fabric is soft and hangs naturally, gentle creases at the waist and the elbows, the collar a little relaxed, faded a touch at the shoulder seams. Neat and clean, not ironed crisp, not new out of the packet. The left chest (the wearer's left, the right side of the picture when he faces the camera) is a clean, unobstructed area of plain fabric. No cap, no hi-vis, no gloves, no name tag, no watch with a brand, no earbuds. Every mover in the picture wears this.

- BOTH MOVERS ARE MEN, and they are the only two people in the picture. There is no woman and no third person.
- Person A is about 44, medium build with a bit of a belly; Person B is about 32, broad-shouldered and a little taller. Their builds differ, as with real people. Both wear the same workwear.
- CHECK THE SHIRTS: both men wear the charcoal POLO shirt with a flat knit collar and a two-button placket, completely plain: no small emblem, badge, patch or embroidery anywhere on the chest. Neither of them wears a crew-neck T-shirt.
- Both men keep their mouths closed; no teeth are visible.
- There are no cardboard boxes and no trucks or vans in this picture.

- CHECK PERSON A'S FACE: Person A is the man of about 44 from the FIRST attached image: thinning short dark-brown hair that recedes at the temples, a big dark moustache, the lines of a man in his forties and a bit of a belly under the polo. He is NOT a young man and he does NOT have a full head of thick hair.

Person A (the older mover, a man of about 44 from Limburg, medium build with a bit of a belly, thinning short dark-brown hair and a big dark moustache): use the FIRST attached image for face identity, age, skin and expression only; ignore its clothing, headwear and background.
Person B (the younger mover, an Afro-Surinamese Dutch man of about 32 with deep brown skin, short twists, a thin moustache and broad shoulders): use the SECOND attached image for face identity, age, skin and expression only; ignore its clothing, headwear and background.
The people must look clearly like different individuals.

SCENE: An office move in a light corridor of a modern office building with a light grey floor and glass doors. Person A pushes a small low four-wheeled dolly carrying a stack of four closed plain dark-grey plastic moving crates with attached lids, his hands on the top crate and his belly toward the stack. Person B walks one step ahead and holds a glass door open with his back against it and one arm stretched to the door, watching the stack pass the door frame. Seen from the far side of the doorway, so both men come toward the camera at an angle, faces turned to the crates. The crates are completely plain: no text, no label, no logo, no numbers. Daylight comes through the glass door and a window at the end of the corridor behind the camera.

Mood: positive and calm. The people are relaxed and content in their work: a light natural smile with the lips touching each other, or a friendly focused face; the mouth stays closed and no teeth are visible on anyone, never a wide grin, never laughing, no posed cheerfulness, no thumbs up, nobody looking at the camera.

Composition for a wide LANDSCAPE photo on a website: a horizontal frame that may later be cropped to a wider banner, so keep the subject and every face inside the middle band of the height, and leave room at the left and right. Nobody is cut off at a hand or a foot by the border. People who are small in the frame are seen from behind, in profile or turned to their work; a mover who faces the camera with the left chest of his polo in view is close to the camera, so that his chest is large in the frame.

Light: bright, friendly daylight falling in through a window on one side as the one dominant source with a clear direction, mixed white balance with warm 3000K interior light against cool 5800K daylight, soft-edged shadows with real falloff into the corners of the room, a few specular highlights allowed to clip. Faces are never evenly lit: the face sits on its own shadow side or just beside the pool of light. Not flat, not studio, no burning lamps in daylight.

Camera: documentary photograph at 35mm from standing chest height, aperture f/5.6 so the room or the street stays legible, 1/125s, natural handheld framing with a slight tilt, perspective from normal standing distance. No drone view, no fisheye, no tripod-perfect symmetry.

Imperfect framing on purpose: something ordinary is half in the way, a door frame darkening one edge, a chair or a bicycle cut off by the border, a coat over a bannister, a folded blanket on the floor. Lived in and in use, not tidied up for the photograph, not symmetrical, not a magazine interior, but clean and well kept.

A real photograph, not an illustration, not 3D, not a render, not a painting. Visible sensor noise, skin with pores and fine lines, healthy even skin without red patches, true-to-life colour in clear daylight with whites that are truly white, no HDR, no teal-and-orange grading, no glossy plastic skin, no magazine perfection, no vignette, no film border or frame around the picture. The people are ordinary working men of different builds, not models. Each hand has exactly four fingers and one thumb, every visible fingertip belongs to a hand that is itself in the frame, and the grip matches the weight of what it holds: under a heavy load the forearms show the effort. The Netherlands, not America: Dutch brick houses and window frames, Dutch power sockets, Dutch street furniture, yellow licence plates out of focus.

Avoid: text, letters, numbers, a logo, a watermark, a brand name, licence plate characters, stickers, garbled signage; a print, patch, badge or embroidery on any clothing; a hi-vis vest, orange or yellow safety colours, blue work clothes; tape, straps, ropes, cords or film on or around any box or piece of furniture; a box lying on its side; handwriting, marker words or paper labels on a box; certification seals; a wide grin or laughter; thumbs up; identical faces; distorted hands or extra fingers; relaxed hands under a heavy load; hands pressed against empty air; waxy or plastic skin; red blotches on cheeks; a burning table lamp in daylight; American houses, sockets or road signs; snow; rain; harsh glare; cartoon or CGI look.

Photorealistic editorial photograph, aspect ratio 3:2, full-frame camera, natural colours, realistic depth of field. An original scene with original people, not a real recognisable individual.
```
