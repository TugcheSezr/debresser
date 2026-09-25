> Keuze 25-09-2026: wagen 3 goedgekeurd (staat op /contact/ als assets/img/beeld/wagen-onderweg-uitsnede-700/1100.webp). Wagen 2 viel af; de uitsnede wagen-2-bij-de-loods-uitsnede.png en de werkbestanden ervan zijn verwijderd. De regels hieronder over wagen 2 zijn alleen nog geschiedenis.

# Uitsneden verhuiswagen, sectie 2 "Vanuit onze vestigingen"

Doel: een vrijstaande wagen voor sectie 2 (locations-plate-truck) op /contact/. Het dak steekt boven de
donkerblauwe band uit; een witte plaat met de vestigingen ligt over de wielen.

Bron: de goedgekeurde beelden in `beeldronde-debresser/wagens/` (goedgekeurd 24-09-2026). Er is niets
opnieuw gegenereerd; alleen de achtergrond is weggehaald. Nog niet goedgekeurd en niet op de site.

## Commando's (vanuit de repo-root)

```
python site/_werk/cutout_mat.py beeldronde-debresser/wagens/wagen-2-bij-de-loods.png <scratch>/wagen-2-mat.png --margin 40
python site/_werk/cutout_mat.py beeldronde-debresser/wagens/wagen-3-onderweg-in-brabant.png <scratch>/wagen-3-mat.png --margin 40
python beeldronde-debresser/wagens-uitsnede/werk/schoon.py <scratch>/wagen-2-mat.png beeldronde-debresser/wagens-uitsnede/wagen-2-bij-de-loods-uitsnede.png
python beeldronde-debresser/wagens-uitsnede/werk/schoon.py <scratch>/wagen-3-mat.png beeldronde-debresser/wagens-uitsnede/wagen-3-onderweg-in-brabant-uitsnede.png
python beeldronde-debresser/wagens-uitsnede/werk/bouw_pagina.py
```

`<scratch>` is een tijdelijke map; de `-mat.png`-tussenbestanden en de controlebeelden staan niet in deze
map en komen met de eerste twee regels terug.

- `cutout_mat.py`: BiRefNet-masker (rembg, birefnet-general), trimap, closed-form matting in tegels, alfa-waas
  en losse eilandjes weg, randkleur schoongemaakt. Crop op alfa > 8 plus 40 px.
- `schoon.py` (standaard: `--onder 0.6 --donker 110 --marge 40`): alfa strakker met smoothstep(0.25, 0.85);
  donkere half-doorzichtige pixels in de onderste 40% weg (wegschaduw); in de onderste 15% donkere pixels
  buiten een opening van 5 px weg (schaduwpunten naast de banden); eilandjes < 400 px weg; crop plus 40 px.
- `bouw_pagina.py`: bouwt `index.html` met pagina.py van de image-versions-skill, groot op #020D41 en
  eronder op #F4F6F9.

## Resultaat

| Bestand | Maat | Zachte rand |
|---|---|---|
| wagen-2-bij-de-loods-uitsnede.png | 1916 x 1293 | 0,34% |
| wagen-3-onderweg-in-brabant-uitsnede.png | 1460 x 1061 | 0,46% |

Gecontroleerd op donkerblauw (#020D41) en licht (#F4F6F9), in twee herstelrondes:
1. Na `cutout_mat.py`: een zachte donkere zoom van de wegschaduw onder de bumper en tussen de wielen
   (beide wagens, zichtbaar op licht) en lichte pluizen langs het cabinedak en de antenne van wagen 3
   (zichtbaar op donkerblauw). Opgelost met de alfa-aanscherping en het weghalen van de wegschaduw.
2. Daarna nog kleine dekkende schaduwpunten naast de banden. Opgelost met de opening in de onderste 15%.

Wat nog over is: onder het chassis van wagen 2, bij het achterwiel, een klein donker stuk (onderkant van
de wagen of de tank). Dat valt achter de witte plaat.

## Open tekstpunten op de wagen (ongewijzigd uit de goedgekeurde bronbeelden)

- De vestigingenlijst mist Venlo, Brussel en Reeuwijk.
- Breda: 076 - 8200233 op de wagen, 076 52 24 100 op /contact/.
- De slogan "FULL SERVICE IN LOGISTIEK" (de logistieke tak is in 2024 verkocht).

Wordt een van deze punten beslist, dan komt er eerst een nieuw wagenbeeld (werk/merk-op-wagen.py in
`wagens/`) en daarna een nieuwe uitsnede met de commando's hierboven. Beide moeten opnieuw goedgekeurd worden.
