#!/usr/bin/env python3
"""Beeld per dienstpagina: de hero en de drie foto's in de tekstblokken.

Gegenereerd en gekozen op 29-08-2026 (77 kandidaten in _werk/dienstbeeld, keuze van Shahab in
dienstbeeld/gekozen.json, geleverd met dienstbeeld/lever.py). build_paginas.py importeert deze
tabel en vervangt daarmee per dienstpagina de gedeelde foto's uit de staart.

HERO   : href -> (naam, alt).  Bestanden: hero-<naam>-1920.webp (1920x815), -1280.webp (1280x543),
         -mobiel.webp (900x1034). Het hero-mechanisme zit al in build_paginas.hero().
BLOKKEN: href -> lijst van (bestand, alt, figcaption) voor de fotovakken in de staart, op volgorde.
         Bestanden: <naam>-760.webp (760x1140) en <naam>-1140.webp (1140x1710), staand 2:3.
Een lege plek in de lijst betekent: laat de bestaande foto staan.
"""

# Shahab, 29-08-2026: ALLE dienstpagina's krijgen dezelfde hero, de zorgfoto (zor7). De eerder
# geleverde eigen hero's per dienst (hero-par, hero-int, ...) blijven in assets/img liggen voor het
# geval hij ze terug wil.
ALT_DIENST = ("Projectleider van De Kievit neemt de plattegrond door met de facilitair manager van "
              "een zorginstelling, achter hen rijden twee verhuizers een rolcontainer door de gang")

HERO = {
 "/particulier-verhuizen/": ("zor", ALT_DIENST),
 "/internationale-verhuizing/": ("zor", ALT_DIENST),
 "/seniorenverhuizing/": ("zor", ALT_DIENST),
 "/spoedverhuizing/": ("zor", ALT_DIENST),
 "/inpakservice/": ("zor", ALT_DIENST),
 "/montage-demontage/": ("zor", ALT_DIENST),
 "/inboedelopslag/": ("zor", ALT_DIENST),
 "/zorgverhuizing/": ("zor", ALT_DIENST),
 "/piano-verhuizen/": ("zor", ALT_DIENST),
 "/antiek-en-kunst-verhuizen/": ("zor", ALT_DIENST),
 "/kantoorverhuizing/": ("zor", ALT_DIENST),
}

BLOKKEN = {
 "/particulier-verhuizen/": [
   ("par-1", "Verhuizer van De Kievit tilt een Top Movers-doos van de stapel in de woonkamer", "Wij tillen, u wijst aan"),
   ("par-2", "Verhuizer stapelt dozen in de laadbak, meubels eromheen in verhuisdekens", "Alles gaat in dekens de wagen in"),
   ("par-3", "Verhuizer draagt een doos naar de voordeur, het stel staat met de sleutels op de stoep", "De sleutel om, wij lopen door"),
 ],
 "/internationale-verhuizing/": [
   ("int-1", "Verhuisadviseur neemt aan de eettafel de internationale verhuizing door met een stel", "Eerst het plan, dan de grens over"),
   ("int-2", "Volgeladen laadbak met dozen en meubels in dekens voor een lange rit", "Ingepakt voor honderden kilometers"),
   ("int-3", "Verhuizer legt ingepakte schilderijen in een houten exportkist", "Exportkisten voor wat kwetsbaar is"),
 ],
 "/seniorenverhuizing/": [
   ("sen-1", "Twee verhuizers dragen een fauteuil in verhuisdekens de bungalow uit", "Wij dragen, u kijkt toe"),
   ("sen-2", "Verhuizer loopt met een doos naast een mevrouw met rollator de seniorenwoning binnen", "Uw eigen tempo is het tempo"),
 ],
 "/spoedverhuizing/": [
   ("spo-1", "Vrouw belt in haar half ingepakte woonkamer, drie Top Movers-dozen staan klaar", "Vandaag gebeld, snel geregeld"),
   ("spo-2", "Verhuizer draagt een doos door een smal Nederlands trappenhuis", "Ook op de vierde zonder lift"),
   ("spo-3", "Planner van De Kievit belt met de planning aan de muur", "De planner zoekt de ruimte"),
 ],
 "/inpakservice/": [
   ("inp-1", "Verhuizer wikkelt een bord in inpakpapier, de borden staan rechtop in de doos", "Borden op hun kant, nooit plat"),
   ("inp-2", "Verhuizer zet boeken rechtop in een boekendoos bij de boekenkast", "Boeken in de kleine doos"),
   ("inp-3", "Verhuizer wikkelt een televisie in een verhuisdeken", "Beeldscherm in de deken"),
 ],
 "/montage-demontage/": [
   ("mon-1", "Verhuizer draait een bed uit elkaar met een accuschroevendraaier", "Uit elkaar bij u thuis"),
   ("mon-2", "Twee verhuizers zetten een kast in elkaar in de nieuwe slaapkamer", "En weer in elkaar op het nieuwe adres"),
   ("mon-3", "Handen monteren een scharnier op een kastdeur op een verhuisdeken", "Ook het kleine werk"),
 ],
 "/inboedelopslag/": [
   ("ops-1", "Verhuizer sluit de deuren van een witte opslagcontainer in de loods", "Uw inboedel achter slot"),
   ("ops-2", "Verhuizer neemt met een tablet de inhoud van een opslagcontainer op", "Alles staat op de lijst"),
 ],
 "/zorgverhuizing/": [
   ("zor-1", "Verhuizer draagt een groene verhuiskrat door de gang van een gezondheidscentrum", "Kratten in plaats van dozen"),
   ("zor-2", "Twee verhuizers rijden een leeg ziekenhuisbed door de gang van een zorgcentrum", "Bedden rijden op eigen wielen"),
 ],
 "/piano-verhuizen/": [
   ("pia-1", "Meisje speelt de eerste noten op de piano in de nieuwe woonkamer", "De eerste noten op het nieuwe adres"),
   ("pia-2", "Twee verhuizers wikkelen een vleugel in verhuisdekens", "Een vleugel gaat in dekens"),
 ],
 "/antiek-en-kunst-verhuizen/": [
   ("ant-1", "Verhuizer vouwt een deken om een volledig ingepakt schilderij", "Eerst papier, dan de deken"),
   ("ant-2", "Verhuizer wikkelt een Delfts blauwe vaas in inpakpapier", "Stuk voor stuk in papier"),
 ],
 "/kantoorverhuizing/": [
   ("kan-1", "Projectleider van De Kievit loopt met de officemanager door het nieuwe kantoor", "Een draaiboek, een aanspreekpunt"),
 ],
}
