# Herofilm De Bresser 100 jaar (25-09-2026)

Wens gebruiker: deze film als herovideo op de home, zonder ondertiteling, live van YouTube (geen eigen kopie).

Bron (YouTube-kanaal "De Bresser", @DeBresser):
- https://www.youtube.com/watch?v=TV39Q2X01C0  "De Bresser | Bedankt dat jij verhuizen al 100 jaar geweldig maakt!"
  (40,4 s, 3840x1920, 2:1). Inbedden mag. Geen geuploade ondertitels, wel automatische (spraakherkenning).

De ondertiteling zit in het beeld zelf: de hele film door een regel onderaan, bovenkant rond rij 1640 van 1920
(gemeten op zestien frames). Aanpak (HERO_VIDEO en HERO_VIDEOKNOP in build_paginas.py, .hero__yt in style.css):
- De speler (youtube-nocookie via de IFrame-API) is 2:1, begint 72 px boven de hero en is zo groot dat de bovenste
  vijf zesde (rij 0 tot 1600) de rest van de hero vullen; de onderste zesde valt onder de hero weg.
- Die 72 px zijn voor YouTubes titelregel (logo, filmtitel, kanaalnaam), die na het starten ongeveer 4 s linksboven
  staat. Gemeten bij spelers van 1387 tot 2560 breed: altijd tot rij 52, dus 20 px marge. Daardoor kan de film
  meteen in beeld (lokaal 0,5 s na het laden); bij pauzeren komt de poster terug.
- Vanaf 761 px staat de poster (rij 0 tot 1600, 2,4:1) met dezelfde maten als de speler, zodat de overgang naadloos is.
  Nagemeten op 1024x768, 1440x900, 1920x1080, 2560x1080 en 820x1180: poster en speler vallen samen, titel eindigt
  20 px boven de hero, snede op of onder de onderrand, ondertitelband 16 tot 357 px eronder, geen horizontale scroll.
- YouTubes eigen ondertiteling: cc_load_policy 0 en bij elke start unloadModule('captions'). Getest door ze
  geforceerd aan te zetten: na de volgende start weg.
- Start op 1,44 s, na het zwart en de onscherpe inzoom. Lus: op 39,9 s terug naar 1,44 s. De film eindigt op
  40,38 s; getDuration() gaf na een tijdje afgerond 41, waardoor een lus op "duur min 0,5 s" nooit greep.
- Twee witte momenten blijven staan: een witte flits rond 18 s en de witte eindkaart met logo (33 tot 35 s),
  gerekend vanaf het startpunt.

Poster: het beeld op 1,44 s (uit een eenmalige download, die weer is verwijderd), cwebp -q 78 -m 6, als
assets/img/hero/home-100jaar-900/1280/1920.webp. Telefoon (tot 760 px) en reduced-motion zien alleen de poster en
laden niets van YouTube. montage.jpg: een beeld per seconde vanaf 1,44 s, alleen de bovenste vijf zesde.

Voor livegang: de speler laadt YouTube bij elke desktopbezoeker, en de site heeft geen cookiebanner. Beter nog is
het origineel zonder ondertiteling van De Bresser of hun videomaker: volledig beeld, geen snede nodig.
