# Beeldregels De Kievit / Top Movers (levende lijst)

Gelden voor elke sessie die beeld kiest, bewerkt of genereert voor de Kievit-site. Bron: Shahab, tenzij anders vermeld.

1. **Top Movers-verhuisdozen hebben GEEN plakband.** Ze sluiten met een kliksluiting: de vier flappen
   aan de bovenkant vouwen in elkaar (zelfsluitende deksel), en hebben handvatgaten in de korte zijden.
   Opdruk: het Top Movers-logo (TOP zwart, MOVERS in losse kapitalen eronder, teal swoosh met pijlpunt),
   www.topmovers.nl onderaan, en per doostype een aanduiding zoals BOEKENDOOS langs de rand. Witte doos
   (klassiek) of kraft met bij (2023+). Gegenereerd beeld met tape over de naad is FOUT; de vijf
   AI-hero-kandidaten van 28-aug (site/_werk/hero/ai/) tonen tape en gelden daarom alleen als
   keuzemateriaal, niet als eindbeeld zonder hergeneratie. (Shahab 28-08-2026, met foto van de doos.)
2. Geen EPV/PPV-, ISO-, VCA-, Fedemac- of IAM-logo's in FOTO'S; "100% elektrisch" en ledennamen van
   andere Top Movers-leden (Van der Ent, P.A. van Rooyen, Holwerda) wegretoucheren.
   (onderzoek/08 sectie 2.2; retouches van 28-aug in site/_werk/beeld-manifest.md)
   **Uitzondering, Shahab 29-08-2026: het CO2-Prestatieladder-LOGO mag wel.** Dat stond hier eerder als
   verbod. Zijn woorden: "CO2-Prestatieladder-logo dat mag wel". Voor de volledigheid van het dossier:
   het certificaat staat op naam van Top Movers Nederland B.V., nummer 04189734, looptijd tot 6 mei
   2029; noem die houder er dus bij waar het logo als keurmerk van De Kievit zou kunnen lezen.
   Beeldmerk klaar in `site/assets/img/keurmerk/co2-prestatieladder-wit.webp` (174x174, wit op
   transparant, zelfde NCI-zegelbehandeling als iso9001-wit en iso14001-wit).
   Let op het verschil dat overeind blijft: dit gaat over een LOGO in de opmaak. In gegenereerde of
   bewerkte FOTO'S blijven merk- en keurmerklogo's ongewenst, want daar zijn ze niet te verantwoorden.
3. De 2026-08 "header"-beelden van topmovers.nl zijn AI-gegenereerd (wartaal op dozen en kenteken) en
   nr 81 is een AI-outpaint van nr 66: niet gebruiken. (beeldsessie 28-aug)
4. Geen namen of gezichten van De Kievit-personeel tot de klant dat bevestigt; De Bresser-portretten
   nooit als "team van De Kievit". Gegenereerde mensen alleen met gezichten uit de mixbibliotheek
   (kop-01 t/m 19, akkoord ligt er).
   **Uitzondering, 29-08-2026: Tomas Brands.** Shahab heeft zijn portret zelf aangeleverd en bevestigd
   dat hij de nieuwe eigenaar is (via De Bresser, 1 juni 2024). Het staat als cutout op
   /over-de-kievit/ met naam en functie, boven acht beloftes op zijn naam. Voor deze ene persoon is
   het uitgangspunt "geen namen en gezichten" dus vervallen; voor het overige personeel geldt het
   nog steeds. LET OP: de acht beloftes staan op naam van een echt persoon en zijn door ons
   geschreven op basis van bestaande site-claims. Ze moeten door de klant zelf geaccordeerd worden
   voordat de site live gaat; staat op de open-punten-lijst.
5. Echte foto's eerst; cutouts via Vision plus randverfijning; nooit een foto twee keer op een pagina.

## Halo meten: elke randpixel tegen zijn EIGEN buur (28-08-2026, uitgezocht in drie rondes)

Bij het uitknippen is de vraag steeds: zit er een lichte franje (halo) van de oude achtergrond langs de contour?
Drie sessie-metingen op dezelfde bestanden gaven eerst tegengestelde antwoorden; de oorzaak is gevonden en dit is
de werkende methode.

**De maat.** Bepaal per randpixel de helderheid van het materiaal er direct naast:
`buur = grey_dilation(np.where(alfa>0.95, L, 0), size=9)`, en kijk naar `L - buur` op de band `0,15 < alfa < 0,85`.
Het beslissende cijfer is niet dat gemiddelde maar de TELLING: hoeveel randpixels zijn lichter dan hun eigen buur
plus 20, en hoe groot is het grootste aaneengesloten cluster.

Geijkt op vier bestanden van deze site:
| Bestand | pixels lichter dan buur+20 | grootste cluster | oordeel |
|---|---|---|---|
| wagen, Vision-uitsnede | 4.369 | 639 | dikke halo, meteen zichtbaar |
| duo-opslag, Vision-uitsnede | 6.100 | 231 | idem |
| wagen na cutout_mat.py | 1.523 | 281 | rest zit op interne doorkijkjes, onzichtbaar |
| duo-opslag na cutout_mat.py | 659 | 70 | schoon |
| trio-cutout (gegenereerd op magenta) | 84 | 6 | schoon |
Duizenden pixels met clusters van honderden is een echte halo; tientallen met clusters onder de tien is niets.

**Twee valkuilen, allebei hier ingelopen en pas na drie rondes opgelost:**
1. **Vergelijk nooit twee populatiegemiddelden, dat is selectiebias.** De randpixels vergelijken met een
   binnenwerk-monster dat op L<90 was geselecteerd gaf +30,8 (dus "franje"); exact dezelfde randpixels tegen hun
   eigen buur gaven -37,5. Het monster was door die selectie omlaag getrokken (36 terwijl het materiaal naast de
   contour op 104 zat). En een gemiddelde over de HELE contour is even waardeloos: een lichte en een donkere
   contourhelft heffen elkaar op (+30,8 naast kleding en -47,5 naast huid werden samen +14).
2. **Het oog op 400 procent is ook niet decisief.** Strijklicht op een kraag, schouder of mouw ziet er op die
   vergroting uit als een franje; dezelfde plek werd twee keer anders beoordeeld. Gebruik de telling om de
   verdachte clusters op te zoeken, kijk daar op de ECHTE achtergrond, en laat een enkele indruk op 400 procent
   nooit alleen beslissen.

**Derde en vierde controle, allebei nodig voordat je iets "halo" noemt:**
3. **Splits de telling in buitencontour en interne doorkijkjes.** Op de nieuwe wagen zit van de 3.182 gemarkeerde
   pixels maar 1.299 op de buitencontour; de rest zit onder de spiegel, in de wielkast en tussen de chassisdelen,
   waar je nooit een halo ziet omdat er materiaal omheen staat. Recept: label de transparante gebieden, kijk welke
   labels de beeldrand raken, en tel alleen de randpixels die daaraan grenzen.
4. **Beoordeel op WEERGAVEgrootte, niet op 400 procent van het bronbestand.** De wagen is 1.400 px breed en wordt
   op ongeveer 660 px getoond, dus alles wordt gehalveerd. Wat in het bestand een rafelige onderrand leek, is op de
   pagina (en op 200 procent daarvan) niet te zien. Knip dus altijd uit de PAGINA-screenshot, niet uit de asset.

Uitkomst voor deze site: de bakwagen en de opslag-mannen zijn terecht opnieuw uitgesneden met `_werk/cutout_mat.py`
(BiRefNet plus closed-form matting); de trio-cutout in de hero was en is schoon en is blijven staan. De restsignalen op de nieuwe wagen
(1.299 px buitencontour, grootste cluster 98) en op duo-opslag (969 px, cluster 130) zijn op de pagina zelf
niet zichtbaar: het zijn de onderrand van het chassis, de bovenrand van een kartonnen doos en de haarcontour.

## Onderkant van een vrijstaande wagenfoto: matting volgt de JPEG-blokken van de grondschaduw (29-aug-2026)

Shahab zag op de pagina (wagen op ongeveer 660 px) dat de wagen "niet perfect geknipt" was: trapjes onder de
banden en grijze mist onder chassis en rolluikbox. Dat weerlegt punt 4 hierboven voor DIT soort fout: een halo
valt op weergavegrootte weg, 126 knikken in de onderrand en 7.033 mistpixels niet.

Oorzaak: bron 37 is een vrijstaande foto op zuiver wit MET een zachte grondschaduw. De closed-form matting van
`cutout_mat.py` kan band en schaduw niet scheiden waar ze even donker zijn (direct onder de wagen is de schaduw
net zo zwart als het rubber) en volgt daar de 8x8-blokken van de JPEG; de dilatatieband van 10 px hield
bovendien grijze schaduw half-dekkend vast.

Wat NIET werkte: een helderheidsregel in een zone onder de carrosserie (L <= 65 dekkend, L >= 115 weg). De
diepe contactschaduw is net zo zwart als het rubber, dus die regel plakte een zwarte vloerplaat onder de wagen
(markeringsrender: een grote groene vlek). Kleur of helderheid kan band en contactschaduw niet scheiden; daar is
een vormprior voor nodig.

Wat WEL werkte (`beeld/wagen_onderkant.py`): het BiRefNet-masker (rembg birefnet-general, hard op 0,5, gaussisch
1 px) als alfa in een band van 16 px rond zijn eigen contour, alleen in het onderste deel (bron y >= 880) met een
zachte naad van 20 px naar de matting-alfa erboven. BiRefNet volgt bumper, verre voorband, sideskirt en banden
strak en sluit de schaduw uit (2x-grid met contour: bumperonderkant 970, verre voorband tot 1005, voorband tot
1068, skirt van 952 naar 912, achterband 933). Uitkomst: knikken 126 naar 35, mistpixels 7.033 naar 3.900,
alfa-verschil > 0,5 in maar 1.254 px; op de pagina op 200 procent schoon. Onder de rolluikbox blijft een donkere
wig van ongeveer 30 px staan (BiRefNet neemt de bovenkant van de diepe schaduw mee); die leest als onderkant van
het chassis en heeft een strakke rand, dus laten staan. Invoer bewaard als `beeld/cut/raw-37-matting.png` en
`raw-37-birefnet-masker.png`.

Drie werklessen:
1. Coordinaten van een 1x-grid van 1.180 px breed zaten er 30 px naast (bumperonderkant gelezen als 988, echt
   970; verre voorband 1040, echt 1005). Lees maten op een 2x-grid met de contour erin getekend.
2. De halo-telling (lichter dan de eigen buur) meet dit probleem NIET: oud 3.153 px, nieuw 3.050 px, vrijwel
   gelijk, terwijl het beeld duidelijk beter is. Voor trapjes en mist: het aantal knikken in de onderrand per
   kolom (tweede verschil >= 2 px) en het aantal halftransparante pixels verder dan 3 px van dekkend materiaal.
3. Element-screenshot van een lazy-loaded img onder de vouw met data-reveal: niet scrollen (smooth scroll maakt
   de rect verouderd en captureBeyondViewport rekent in paginacoordinaten), maar `img.loading='eager'` zetten, op
   `complete` wachten en `[data-reveal]{opacity:1!important;transform:none!important}` injecteren.
