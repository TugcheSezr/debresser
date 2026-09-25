# Website De Kieviet: beeldbank

Beeld voor de nieuwe website van De Kieviet Verhuizingen (Venlo, aangesloten bij Top Movers,
onderdeel van De Bresser). Per bron een map; elke map heeft een `manifest.csv` met bron-URL,
afmetingen, alt-tekst en titel per bestand. Bestandsnamen: `jjjj-mm_` is de uploadmaand op de
bronsite, daarna de originele bestandsnaam. Alles in de hoogste resolutie die de server geeft.

## de-kievit-nl/ (de huidige site, 25 augustus 2026)

Bron: https://www.de-kievit.nl, WordPress-mediabibliotheek (REST API) plus crawl van alle 52
sitemap-URL's. De site is een kloon van debresser.nl: de bibliotheek is grotendeels De Bresser-
beeld en maar 71 van de 171 unieke beelden staan echt op een Kievit-pagina. Kolom
`gebruikt_op_paginas` in `de-kievit-nl/manifest.csv` zegt op hoeveel pagina's een beeld staat
(0 = wel in de bibliotheek, nergens getoond).

- `fotos-kievit/` (10): het enige Kievit-specifieke beeld: trucks met Kievit-logo, drie mannen voor de truck, footerfoto met Kievit-doos, twee oude foto's (paardenkar, oude verhuiswagens) en een krantenadvertentie van H. de Kievit & Zoon.
- `fotos/` (72): overige eigen fotografie op de site, vrijwel allemaal De Bresser-branded (trucks, projecten, magazijn Tilburg/Oisterwijk) plus wat Top Movers-beeld.
- `team/` (17): portretten (cirkelfoto's en bureaufoto's), grotendeels De Bresser-medewerkers; check per naam of het Kievit-personeel is.
- `stock/` (15): stock en illustraties (Brussel, handdruk, checklist, agenda, kinderen, rijtjeshuizen, beveiliging).
- `logos/` (18): De Bresser, Top Movers, Erkende Verhuizers, Erkende Projectverhuizers, Fedemac, IAM, PostNL, Stadslogistiek, 100 jaar, Kievit-favicon (`cropped-image.jpg`).
- `iconen/` (33): diensticonen (png en 2 svg), waaronder vier Kievit-iconen uit 2024-06 (meubels monteren, tijdelijke opslag, in- en uitpakken, klusjes).
- `graphics/` (6): kaart Nederland, SDG-blok, honingraat-achtergrond, Cliniclowns-doos.
- `paginastructuur.md`: hoofdmenu, footer, alle 51 live pagina's met title/H1/meta/woordental/laatste wijziging, 18 blogs, 2 vacatures en wat opvalt (404 in sitemap, dubbele H1's, stadspagina's buiten het menu).

Weggelaten: 23 heruploads van hetzelfde beeld, 3 Elementor-placeholders, 2 bestanden die 404
geven (`gebouwbeheer-De-Bresser-Duurzame-werkomgeving.jpg`, `De-Bresser-meubel-instructie-klanten.png`) en 10 PDF's.

## topmovers/ (landelijk Top Movers-beeld, 25 augustus 2026)

Bron: https://www.topmovers.nl, mediabibliotheek (351 items) plus crawl van 177 sitemap-pagina's.
De Kieviet is Top Movers-lid; gebruik van dit beeld is met Top Movers afgestemd.
Vestigingspagina: https://www.topmovers.nl/vestigingen/de-kievit-verhuizingen/ (een eigen foto:
`topmovers/fotos/2021-10_7e034cf4-f865-44bc-9668-cffc61e3e39f.jpg`, een Top Movers-truck aan zee).

- `fotos/` (86): eigen fotografie van Top Movers: trucks, verhuizers, projecten, headers, truck-cutouts (png).
- `fotos-leden/` (21): trucks en panden van andere aangesloten bedrijven. Niet voor De Kieviet, wel referentie.
- `stock/` (23): beeld van derden. Unsplash en Pixabay vrij bruikbaar; de vier `stock-photo-*` (Shutterstock, watermerk) en `canstockphoto*` niet gebruiken.
- `logos-certificaten/` (38): Top Movers-logo's, Erkende (Project)Verhuizers, ISO 9001/14001, VCA, CO2-Prestatieladder, NCI, goede doelen.
- `graphics/` (42): infographics, advertenties, brochurecovers, Let's Move To Zero-headers.
- `iconen/` (70): SVG-diensticonen en pijlen.

Waar WordPress een `-scaled` variant serveert is het ongescaalde origineel gepakt (16 stuks, tot
7360 px). Weggelaten: 22 duplicaten, 10 mp4-headerloops (180 MB), 47 PDF's, 5 kapotte screenshots.
Let op: `topmovers/fotos/2025-02_IMG_0031.jpg` heeft EXIF-oriëntatie 6 (staand); browsers tonen
hem goed, bij bewerken eerst `exif_transpose`.
