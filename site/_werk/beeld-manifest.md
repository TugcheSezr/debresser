# Beeld-manifest homepage De Kievit (Top Movers-bank)

Per slot: gekozen bron, crop (bronpixels x0,y0,x1,y1), schaalfactor naar de grootste maat en wat er te zien is, voor alt-teksten en claims. Nummers = contactvel sheet1/sheet2 (0-85 topmovers/fotos op ASCII-alfabet, 86-95 fotos-kievit). Alle bestanden staan op de exacte HT-namen en -maten in site/assets/img/; alle kandidaten in site/_werk/beeld/kandidaten/. Werkwijze: echte foto's uit de bank, cutouts met macOS Vision (site/_werk/cutout.py), geen generatief beeld; retouches staan per slot vermeld.

## 1. Hero-achtergrond (`hero-bg`)
Doelvak: hero rand-tot-rand, object-fit cover center top, donkere veil eroverheen; team-cutout staat ervoor.
- GEKOZEN: `laaddok`, bron nr 22 `2021-10_TOPMOVERS-56.jpg` (1800x1200).
  - Te zien: Echte foto (2021-10_TOPMOVERS-56): open bakwagen aan een laaddok bij een bedrijfspand, drie verhuizers in TM-polo met witte TM-dozen. Opschaling 1,07x naar 1920.
  - Maten: 1920 1920x1280 (schaal 1.067, crop [0, 0, 1800, 1200]); 1280 1280x853 (schaal 0.711, crop [0, 0, 1800, 1200]); mobiel 900x1200 (schaal 1.0, crop [439, 0, 1339, 1200])
- Alternatieven: `landweg` (nr 76: Marketingcomposiet (2026-01_lets-move-to-zero): TM-truck frontaal op een landweg tussen bloemenvelden; geen elektrisch-tekst zichtbaar, wel campagnebeeld van de elektrische truck); `verhuislift` (nr 28: Echte foto (2021-10_Verhuur-verhuislift): Sprinter met verhuislift bij een flat, topmovers); `ai-header-afgekeurd` (nr 85: AFGEKEURD: de kandidaat uit de brief (2026-08_tm-header-3) is AI-gegenereerd: dozentekst en kenteken zijn wartaal op 100%).

## 2. Team-cutout in de hero (`team-cutout`)
Doelvak: uitgesneden team, breed, onderin de hero achter de offerte-pill; CSS height:min(420px,54%), width auto.
- GEKOZEN: `bank-echt-heupen`, bron nr 66 `2025-11_TopMovers-mannen-header3-groot.jpeg` (1280x861).
  - Te zien: Echte foto (2025-11_TopMovers-mannen-header3): drie verhuizers op een bank met een witte TM-doos ('aanpakkers met impact!'), TM-logo op de polo's; uitgesneden van kruin tot net onder de doos en de handen (heuphoogte), bank en benen weg.
  - Maten: 1600 1600x925 (schaal 1.538, crop [1040, 592]); 900 900x526 (schaal 0.865, crop [1040, 592])
- Alternatieven: `bank-outpaint-heupen` (nr 81: Zelfde opname, maar 2026-08_TopMovers-header1 is een AI-outpaint van 66 (correlatie 0,96 op schaal 0,93); met de heupsnede zit er geen bijgetekend deel meer in, wel iets meer lucht rond de figuren); `trio-heupen` (nr 67: Echte telefoonfoto (2025-12_Alkmaar-1): drie mannen in TM-polo/sweater met duim omhoog, afgesneden op de heupen).

## 3. Dienst: complete verhuizing (`dienst-compleet`)
Doelvak: boognis, object-fit cover 332x190.
- GEKOZEN: `kast-dragen`, bron nr 3 `2021-09_unnamed-file.jpg` (1080x720).
  - Te zien: Echte foto (2021-09_unnamed-file): twee verhuizers dragen een kast door een woonkamer, TM-doos op de voorgrond. Crop houdt de ledennaam 'Holverda' en het EPV-logo onderaan de doos buiten beeld. Opschaling 1,19x.
  - Maten: 1120 1120x641 (schaal 1.188, crop [60, 0, 1003, 540]); 760 760x435 (schaal 0.806, crop [60, 0, 1003, 540]); 400 400x229 (schaal 0.424, crop [60, 0, 1003, 540])
- Alternatieven: `lift-balkon` (nr 39: Echte foto (2021-10_topmovers-51): verhuislift naar een balkon, verhuizer neemt een kist aan, TM-bakwagen met 'Erkende Verhuizers'); `laadklep-kast` (nr 72: Echte telefoonfoto (2025-12_GLR2): twee verhuizers rijden een kast op een hondje bij de laadklep, tweede TM-truck erachter).

## 4. Dienst: inpakservice (`dienst-inpak`)
Doelvak: boognis, object-fit cover 332x190.
- GEKOZEN: `plant-inpakken`, bron nr 25 `2021-10_TOPMOVERS-ZAKELIJK.jpg` (1800x1200).
  - Te zien: Echte foto (2021-10_TOPMOVERS-ZAKELIJK): verhuizer pakt een plant in noppenfolie, collega vult een TM-doos, stapel witte TM-dozen ('max. 20 kg', klein Erkende Verhuizers-logo). RETOUCHE: EU-keurmerklogo op de bovenste doos weggevuld.
  - Maten: 1120 1120x641 (schaal 0.949, crop [620, 500, 1800, 1175]); 760 760x435 (schaal 0.644, crop [620, 500, 1800, 1175]); 400 400x229 (schaal 0.339, crop [620, 500, 1800, 1175])
- Alternatieven: `plant-inpakken-breed` (nr 14: Zelfde opstelling als 25, ander kader (2021-10_TM-zakelijk)); `doos-dragen` (nr 2: Echte foto (2021-09_topmovers-9): verhuizer draagt een witte TM-'VERHUISDOOS' naar binnen; EU-keurmerklogo onderaan de doos valt buiten de crop, kleine gedraaide EPV-regel op de bovenkant van de doos is op tegelmaat onleesbaar).

## 5. Dienst: montage (`dienst-montage`)
Doelvak: boognis, object-fit cover 332x190.
- GEKOZEN: `lamp-ophangen`, bron nr 19 `2021-10_TOPMOVERS-39.jpg` (6000x4000).
  - Te zien: Echte foto (2021-10_TOPMOVERS-39, 6000px): verhuizer hangt een hanglamp op onder een open trap, groene fauteuils, houten kisten. Geen logo's in beeld.
  - Maten: 1120 1120x641 (schaal 0.32, crop [1898, 98, 5398, 2102]); 760 760x435 (schaal 0.217, crop [1898, 98, 5398, 2102]); 400 400x229 (schaal 0.114, crop [1898, 98, 5398, 2102])
- Alternatieven: `lamp-bank` (nr 77: Echte foto (2026-02_Handyman2): zelfde ruimte, verhuizer hangt een lamp op naast een gele bank); `lamp-onder` (nr 18: Echte foto (2021-10_TOPMOVERS-37): kikvorsperspectief, verhuizer draait een lamp vast onder de trap).

## 6. Dienst: opslag (`dienst-opslag`)
Doelvak: boognis, object-fit cover 332x190.
- GEKOZEN: `container-open`, bron nr 31 `2021-10_opslag-TOPMOVERS-44.jpg` (1800x1200).
  - Te zien: Echte foto (2021-10_opslag-TOPMOVERS-44): open opslagcontainer in een loods, deuren met 'Erkende Verhuizers', binnenin TM-dozen (o.a. 'SCHILDERIJBOX') en ingepakte inboedel. RETOUCHE: adreslabel van een ander lid (P.A. van Rooyen, Uithoorn) op de schilderijbox weggevuld.
  - Maten: 1120 1120x641 (schaal 0.622, crop [0, 85, 1800, 1115]); 760 760x435 (schaal 0.422, crop [0, 85, 1800, 1115]); 400 400x229 (schaal 0.222, crop [0, 85, 1800, 1115])
- Alternatieven: `container-kraan` (nr 33: Echte foto (2021-10_opslag-46weglogo): TM-container hangt aan de loodskraan tussen gestapelde containers); `container-nieuw-logo` (nr 21: Echte foto (2021-10_TOPMOVERS-44new-logos): dezelfde open container als 31 met nieuwere logo's).

## 7. Dienst: zakelijk (`dienst-zakelijk`)
Doelvak: boognis, object-fit cover 332x190.
- GEKOZEN: `kratten-kantoor`, bron nr 15 `2021-10_TOPMOVERS-21.jpg` (1800x1200).
  - Te zien: Echte foto (2021-10_TOPMOVERS-21): verhuizer duwt een rolwagen met drie groene verhuiskratten door een kantoor. Crop laat de klantnaam op de muur links buiten beeld.
  - Maten: 1120 1120x641 (schaal 0.747, crop [299, 60, 1799, 919]); 760 760x435 (schaal 0.507, crop [299, 60, 1799, 919]); 400 400x229 (schaal 0.267, crop [299, 60, 1799, 919])
- Alternatieven: `handdruk-kratten` (nr 53: Echte telefoonfoto (2025-02_IMG_0045): overdracht met handdruk bij stapels groene kratten, twee TM-medewerkers en twee klanten); `ict-kabels` (nr 11: Echte foto (2021-10_ICT-TOPMOVERS-11): handen bundelen netwerkkabels (ICT-verhuizing)).

## 8. Dienst: verhuisplan op locatie (`dienst-plan`)
Doelvak: boognis, object-fit cover 332x190.
- GEKOZEN: `handdruk-gang`, bron nr 68 `2025-12_Alkmaar2-scaled-1.jpg` (2560x1920).
  - Te zien: Echte telefoonfoto (2025-12_Alkmaar2): verhuisadviseur in TM-polo schudt een klant de hand, beiden duim omhoog, in een kantoorgang met ingepakte meubels.
  - Maten: 1120 1120x641 (schaal 0.438, crop [0, 131, 2560, 1597]); 760 760x435 (schaal 0.297, crop [0, 131, 2560, 1597]); 400 400x229 (schaal 0.156, crop [0, 131, 2560, 1597])
- Alternatieven: `overleg-tafel` (nr 64: Echte telefoonfoto (2025-11_TopMovers-mannen-header): twee TM-medewerkers aan een tafel in een hal vol verhuismaterieel); `zwaaien-truck` (nr 57: Echte foto (2025-06_facilitair-regisseur): medewerker zwaait vanuit de deur van de wagen; kijkt in de lens).

## 9. Duo-cutout opslagblok (`duo-opslag`)
Doelvak: cutout op de schuine band, onderkant via clip-path schuin afgesneden.
- GEKOZEN: `kraftdozen-duo`, bron nr 78 `2026-03_TopMovers_CTWC_12september2023-9.jpg` (4000x6000).
  - Te zien: Echte foto (2026-03_TopMovers_CTWC, 4000x6000): verhuizer vouwt de flappen van een kraft TM-doos in elkaar (kliksluiting, geen plakband), collega stapelt er nog zes ('TOP MOVERS' met bij, 'Max. 20 kg', 'Aangesloten BIJ erkende verhuizers'); zeecontainers op de achtergrond zijn weggesneden. Verkleind 0,45x. Uitgesneden met ../cutout_mat.py (BiRefNet + closed-form matting + randdecontaminatie, 28-aug): zachte rand 2,5%, randhelderheid gelijk aan het binnenwerk. De eerdere Vision-uitsnede (cutout.py) had een zachte rand van 8% met lichte halo en hield witte container tussen mouw en doos en vloer onder de dozen vast.
  - Maten: 1600 1600x1663 (schaal 0.461, crop [3473, 3567]); 1000 1000x1039 (schaal 0.288, crop [3473, 3567])
- Alternatieven: `laaddok-duo` (nr 22: Echte foto (2021-10_TOPMOVERS-56): verhuizer met TM-doos in de laadbak en collega leunend op een stapel witte TM-dozen; derde man in de bak viel weg).

## 10. Dozenkaart (`dozen-vak`)
Doelvak: vierkant, object-fit cover center 35%.
- GEKOZEN: `dozen-laadklep`, bron nr 75 `2025-12_header-verhuisdozen.jpg` (1920x1180).
  - Te zien: Echte foto (2025-12_header-verhuisdozen): kraft TM-verhuisdozen (bij-logo, 'Aangesloten BIJ erkende verhuizers') op de laadklep van de verhuislift, verhuizer ernaast.
  - Maten: 1100 1100x1100 (schaal 0.932, crop [301, 0, 1481, 1180]); 700 700x700 (schaal 0.593, crop [301, 0, 1481, 1180])
- Alternatieven: `doos-gevel` (nr 36: Echte foto (2021-10_topmovers-4): witte TM-doos op het liftplateau, grachtenpand erachter); `dozen-containers` (nr 78: Echte foto (2026-03_TopMovers_CTWC, 4000x6000): verhuizer sluit een kraft TM-doos (flappen in elkaar, geen plakband) tussen zeecontainers, collega stapelt; is de standaard voor duo-opslag, dus alleen hier als die wisselt).

## 11. Figuur in de boog (vensterblok) (`figuur-tafel`)
Doelvak: cutout op cream boog met gouden ring, bottom 0.
- GEKOZEN: `handdruk-vier`, bron nr 53 `2025-02_IMG_0045.jpg` (3264x2448).
  - Te zien: Echte telefoonfoto (2025-02_IMG_0045): vier personen, twee TM-medewerkers (zwarte polo, bruine TM-jas) en twee klanten (roze trui, donkerblauwe trui) schudden elkaar de hand; groene kratten zijn weggesneden; afgesneden op de knieen (beeldrand).
  - Maten: 1100 1322x1100 (schaal 0.641, crop [2064, 1541]); 700 841x700 (schaal 0.407, crop [2064, 1541])
- Alternatieven: `doos-aangeven` (nr 9: Echte foto (2021-10_Home-part-topmovers-14): verhuizer bukt over de liftrand en geeft een witte TM-'VERHUISDOOS' aan een lachende collega); `laaddok-duo` (nr 22: Echte foto (2021-10_TOPMOVERS-56): twee verhuizers met witte TM-dozen).

## 12. Wagen bij de werkwijze-kop (`wagen-heerlijkthuis`)
Doelvak: cutout rechts van de kop, width 100% van de kolom, drop-shadow.
- GEKOZEN: `volvo-driekwart`, bron nr 37 `2021-10_topmovers-47-NO-NAME-vrij.jpg` (1800x1200).
  - Te zien: Echte foto (2021-10_topmovers-47-NO-NAME-vrij): witte Volvo FL bakwagen driekwart van voren, 'TOP MOVERS' groot op de laadbak, klein 'Erkende Verhuizers'-logo op de hoek, kenteken 27-BKK-9, chauffeur in TM-polo achter het raam. RETOUCHE: CO2-Neutraal-logo en kleine EPV-tekst op de cabinezijde deterministisch weggevuld (De Kievit voert die niet). Uitgesneden met ../cutout_mat.py (BiRefNet + closed-form matting, 28-aug): randhelderheid 128 tegen binnenwerk 130, waar de Vision-uitsnede een lichte halo van +35 rond de hele wagen had. ONDERKANT 29-aug hersteld met wagen_onderkant.py: in een band van 16 px rond de BiRefNet-contour (bron y >= 880) vervangt het geblurde BiRefNet-masker de matting-alfa, die onder de banden de JPEG-blokken van de grondschaduw volgde (trapjes) en schaduwmist onder chassis en rolluikbox vasthield; knikken in de onderrand 126 naar 35, mistpixels 7.033 naar 3.900, op de pagina op 200% schoon.
  - Maten: 1400 1400x883 (schaal 0.879, crop [1227, 1004]); 900 900x568 (schaal 0.566, crop [1227, 1004])
- Alternatieven: `volvo-front` (nr 76: Marketingcomposiet (2026-01_lets-move-to-zero): TM-truck frontaal, 'TOP MOVERS' op het dak en 'topmovers); `actros-front` (nr 0: Echte foto (2021-09_TM-truck).

## 13. Foto in boog: verhuisteam aan het werk (`team-boog`)
Doelvak: staand, object-fit cover.
- GEKOZEN: `lachen-magazijn`, bron nr 61 `2025-09_lachen.jpg` (3024x4032).
  - Te zien: Echte telefoonfoto (2025-09_lachen, 3024x4032): twee lachende mannen in een magazijn met stellingen, een in TM-polo, een in oranje veiligheidshesje (klant/magazijnmedewerker).
  - Maten: 1200 1200x1789 (schaal 0.444, crop [160, 0, 2864, 4032]); 800 800x1193 (schaal 0.296, crop [160, 0, 2864, 4032])
- Alternatieven: `laden-stelling` (nr 56: Echte telefoonfoto (2025-04_Snel-en-efficient-laden): verhuizer schuift materiaal in de stellingen van de laadbak, verhuisdekens op de voorgrond); `team-trap-nap` (nr 59: Echte telefoonfoto (2025-09_IMG_0207): vier mannen (drie in TM-shirt) poseren op een trap naast een NAP-meetlat).

## 14. Teamfoto liggend (`verhuisteam`)
Doelvak: object-fit cover, object-position 65% 50%.
- GEKOZEN: `overleg-tafel`, bron nr 64 `2025-11_TopMovers-mannen-header-groot.jpeg` (1280x861).
  - Te zien: Echte telefoonfoto (2025-11_TopMovers-mannen-header): twee TM-medewerkers in grijze TM-jassen aan een tafel in een hal vol verhuismaterieel (rolcontainers, dozen). Verkleind 0,94x.
  - Maten: 1200 1200x800 (schaal 0.938, crop [0, 4, 1280, 857]); 800 800x533 (schaal 0.625, crop [0, 4, 1280, 857])
- Alternatieven: `trio-duim` (nr 67: Echte telefoonfoto (2025-12_Alkmaar-1): drie TM-medewerkers met duim omhoog in een kantoorgang); `lachen-liggend` (nr 61: Echte telefoonfoto (2025-09_lachen), liggende crop van de twee lachende mannen (standaard van team-boog, dus niet samen kiezen)).

## 15. Staande figuur voor de ringen (`figuur-piano`)
Doelvak: cutout, height 100% van het vak, bottom 0.
- GEKOZEN: `kratten-rolwagen`, bron nr 15 `2021-10_TOPMOVERS-21.jpg` (1800x1200).
  - Te zien: Echte foto (2021-10_TOPMOVERS-21): verhuizer in TM-polo duwt een rolwagen met drie groene verhuiskratten (label 'PLAATS LABEL HIER'), ten voeten uit.
  - Maten: 1100 808x1100 (schaal 1.129, crop [368, 974]); 700 514x700 (schaal 0.719, crop [368, 974])
- Alternatieven: `doos-dragen` (nr 2: Echte foto (2021-09_topmovers-9): lachende verhuizer met bril draagt een witte TM-'VERHUISDOOS'); `stofzuigen` (nr 16: Echte foto (2021-10_TOPMOVERS-25): verhuizer stofzuigt het tapijt van een kantoor (oplevering)).

## 16. Scene in afgeronde rechthoek (vierkant-blok) (`trap-scene`)
Doelvak: object-fit cover center 34%, 340x470.
- GEKOZEN: `doos-aangeven-lift`, bron nr 9 `2021-10_Home-part-topmovers-14.jpg` (1800x1200).
  - Te zien: Echte foto (2021-10_Home-part-topmovers-14): verhuizer geeft een witte TM-'VERHUISDOOS' aan zijn collega bij de verhuislift, bewoner kijkt toe vanaf het bordes van een grachtenpand. Opschaling 1,12x. Klein Erkende Verhuizers-logo op de doos.
  - Maten: 1000 1000x1339 (schaal 1.116, crop [848, 0, 1744, 1200]); 640 640x857 (schaal 0.714, crop [848, 0, 1744, 1200])
- Alternatieven: `doos-gevel` (nr 36: Echte foto (2021-10_topmovers-4): witte TM-doos op het liftplateau, grachtenpand erachter); `lift-balkon` (nr 39: Echte foto (2021-10_topmovers-51): verhuislift naar een balkon, verhuizer neemt een kist aan; ledennaam rechtsonder buiten de crop).

## 17. Foto in boog: een verhuisbedrijf voor alles (`familie`)
Doelvak: object-fit cover; caption 'Ook voor uw bedrijfsverhuizing'.
- GEKOZEN: `laadklep-kast`, bron nr 72 `2025-12_GLR2.jpg` (1920x1079).
  - Te zien: Echte telefoonfoto (2025-12_GLR2): twee verhuizers rijden een kast op een hondje bij de laadklep van de TM-bakwagen, kantoorspullen op de klep, tweede TM-truck erachter; past bij 'Ook voor uw bedrijfsverhuizing'. RETOUCHE: ledenlogo 'VAN DER ENT' op een doos op de klep weggevuld.
  - Maten: 1200 1200x800 (schaal 0.75, crop [1, 6, 1601, 1073]); 800 800x533 (schaal 0.5, crop [1, 6, 1601, 1072])
- Alternatieven: `kantoor-inpakken` (nr 25: Echte foto (2021-10_TOPMOVERS-ZAKELIJK): inpakken op kantoor, TM-dozen; is de standaard van dienst-inpak, dus niet samen kiezen); `handdruk-kratten` (nr 53: Echte telefoonfoto (2025-02_IMG_0045): overdracht met handdruk bij groene kratten).

## 18. Foto in boog: werkgebied Venlo en Limburg (`huisje`)
Doelvak: object-fit cover.
- GEKOZEN: `landweg`, bron nr 76 `2026-01_lets-move-to-zero.png` (3077x1726).
  - Te zien: Marketingcomposiet (2026-01_lets-move-to-zero): TM-truck frontaal op een landweg tussen bloemenvelden, 'topmovers.nl' op de zonneklep; is ook hero-alternatief, dus niet samen kiezen.
  - Maten: 1200 1200x900 (schaal 0.522, crop [388, 0, 2689, 1726]); 800 800x600 (schaal 0.348, crop [388, 0, 2689, 1726])
- Alternatieven: `truck-pand` (nr 58: Echte telefoonfoto (2025-09_IMG_0179): TM-bakwagen ('TOP MOVERS', 'Erkende Verhuizers') met laadklep bij een bakstenen pand); `gracht-bovenaf` (nr 35: Echte foto (2021-10_topmovers-28-header): van bovenaf langs de verhuislift op een TM-bakwagen aan een gracht).

## 19. Figuur voor de gouden cirkel (split-blok, 'honderd jaar') (`figuur-wasmachine-v2`)
Doelvak: cutout, height clamp(380px,40vw,540px), bottom 0.
- GEKOZEN: `medaillon-1910-wagen`, bron nr 90 `2024-07_12239250_1157422357620783_6411693261208133292_o.jpg` (2048x1360).
  - Te zien: Historische foto van De Kievit (fotos-kievit, zwart-wit): paard en wagen met kinderen erop en een jongen ernaast voor het pand 'W. de Kievit Expeditie en Verhuizingen'; als ovaal medaillon met zachte rand voor de gouden cirkel bij 'Meer dan honderd jaar verhuizen vanuit Venlo'.
  - Maten: 1280 1280x1278 (schaal 0.985, crop [579, 62, 1879, 1360]); 820 820x819 (schaal 0.631, crop [579, 62, 1879, 1360])
- Alternatieven: `medaillon-oude-trucks` (nr 89: Historische foto (fotos-kievit, zwart-wit): twee vrachtwagens 'Firma W).

## 20. Foto naast het offerteformulier (`leadblock-plant`)
Doelvak: boven 820px staand 504x775 center top, eronder 16/10 liggend 50% 30%.
- GEKOZEN: `trio-duim-staand`, bron nr 67 `2025-12_Alkmaar-1-scaled-1.jpg` (2560x1920).
  - Te zien: Echte telefoonfoto (2025-12_Alkmaar-1): drie TM-medewerkers (grijze sweater, zwarte polo's met TM-logo) met duim omhoog in een kantoorgang met glaswand. Staande crop, koppen bovenin (object-position center top).
  - Maten: 1240 1240x1848 (schaal 1.097, crop [746, 236, 1876, 1920]); 820 820x1222 (schaal 0.726, crop [746, 236, 1876, 1920])
- Alternatieven: `handdruk-staand` (nr 53: Echte telefoonfoto (2025-02_IMG_0045): handdruk bij groene kratten, staande crop op de handdruk); `laden-stelling` (nr 56: Echte telefoonfoto (2025-04_Snel-en-efficient-laden): verhuizer in de stellingen van de laadbak).

## 21. Footer rand-tot-rand (`footer-avond`)
Doelvak: donkere gradient eroverheen, object-position 58% 30% (mobiel 44% 34%).
- GEKOZEN: `truck-avondlucht`, bron nr 6 `2021-10_100-elektrisch-Top-Mover-truck.jpg` (1800x1198).
  - Te zien: Echte foto (2021-10_100-elektrisch-Top-Mover-truck): TM-bakwagen driekwart op een landweg onder een oranje-blauwe avondlucht, 'TOP MOVERS' groot op de bak, klein Erkende Verhuizers-logo. RETOUCHE: '100% elektrisch' op de deur en '100% elektrische verhuizingen' op de dorpel deterministisch weggevuld.
  - Maten: 1600 1600x1073 (schaal 0.896, crop [7, 0, 1793, 1198]); 900 900x604 (schaal 0.504, crop [7, 0, 1793, 1198])
- Alternatieven: `truck-pand` (nr 58: Echte telefoonfoto (2025-09_IMG_0179): TM-bakwagen ('TOP MOVERS' groot op de zijkant, klein 'Erkende Verhuizers'-logo) met laadklep bij een bakstenen bedrijfspand, daglicht; cabine schuilt achter de hoek van het pand); `gracht-bovenaf` (nr 35: Echte foto (2021-10_topmovers-28-header): van bovenaf langs de verhuislift op een TM-bakwagen aan een gracht).

## 22. Social-beeld (og.jpg) (`og`)
Doelvak: 1200x630.
- GEKOZEN: `team-doos`, bron nr 66 `2025-11_TopMovers-mannen-header3-groot.jpeg` (1280x861).
  - Te zien: Echte foto (2025-11_TopMovers-mannen-header3): drie verhuizers op een bank met TM-doos ('aanpakkers met impact!') voor een Mercedes Actros met 'topmovers.nl', liggende social-crop. RETOUCHE: jubileumlogo '100 Van der Ent Group' (ander lid) op de cabinedeur weggevuld.
  - Maten: 1200 1200x630 (schaal 0.938, crop [0, 51, 1280, 723])
- Alternatieven: `laaddok` (nr 22: Echte foto (2021-10_TOPMOVERS-56): drie verhuizers met TM-dozen bij de laadbak aan het dok).

## Losse figuren buiten de 22 slots
Later toegevoegd door de regie-sessie uit de hero-kandidatenronde; niet uit produceer.py, wel hier vastgelegd.

- `figuur-duo-dozen-1600/900.webp` (1600x976, 900x549), ringen-blok "Lokaal verhuisbedrijf, landelijk netwerk". Bron: AI-variant AI-02 uit `_werk/hero/ai/cut/hero-02.png` (Nano Banana Pro, gezichten uit de mixbibliotheek, geen echte medewerkers). Te zien: twee verhuizers in donkere TM-polo, links een man met een witte TM-doos voor de borst, rechts een man met twee gestapelde dozen; borstprint en dozenlogo op 100 procent gecontroleerd, TOP MOVERS correct. LET OP: de dozen zijn met tape dichtgeplakt, wat tegen beeldregel 1 ingaat (Top Movers-dozen sluiten met een kliksluiting); staat als open punt bij Shahab.
- `figuur-duo-lachen-1100/700.webp` (1100x907, 700x577), venster-blok "Benieuwd naar de kosten". Bron: `_werk/hero/ai61/cut/duo61-02-fix2.png`, een GEGENEREERDE plaat op magenta van de regie-sessie, gebaseerd op foto 61 `2025-09_lachen.jpg` (zelfde twee mannen, hesje en TM-polo); het zijn dus geen echte medewerkers en de gelijkenis is nagemaakt. Te zien: twee lachende mannen met de arm om elkaars schouder, links een man in oranje veiligheidshesje (GEEN TM-kleding), rechts een verhuizer in grijs TM-poloshirt met borstlogo. 28-aug bijgewerkt met `randfix.py --despill 6 --trim 0.06` omdat de magenta-key een paarse gloed langs hoofd en schouders had achtergelaten die op het donkerblauwe vlak oplichtte (35.181 px langs de contour geneutraliseerd; alleen magenta-achtige pixels, dus hesje en navy mouw ongemoeid). Kadrering identiek aan de goedgekeurde versie (silhouet-IoU 0,983). Backups in `_werk/beeld/orig/`: `-voor-randfix` is de versie met gloed, `-echte-foto-variant` is dezelfde uitsnede uit de ECHTE foto 61 via `raw-61.png`, die klaarstaat als Shahab liever geen gegenereerde gezichten wil.
