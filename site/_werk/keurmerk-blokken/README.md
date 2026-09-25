# Keurmerk-blokken (sessie -49, 28-aug-2026, opdracht Shahab 17:55)

Twee losse blokken, "voor nu onder de footer" van de homepage. Preview met de echte footer erboven:
http://127.0.0.1:4740/_werk/keurmerk-blokken/preview-onder-footer.html (los: zeker-bij-erkende-verhuizers.html
en top-movers.html). Per bestand: `<style>` = extra CSS, `<section>` = de sectie-HTML (inclusief een klein
inline `<symbol>` voor het vinkje, geen sprite nodig). De `.ctx`-band is voorbeeldcontext.

1. `zeker-bij-erkende-verhuizers.html` (.zeker): opzet van het Feitsma-blok "Tien zekerheden die u er gratis
   bij krijgt" (feitsma.nl, sectie .erkend: kaart met keurmerklogo links, eyebrow, kop, intro, tweekoloms lijst
   met vinkjes, knoprij), maar volledig in de huisstijl van DE KIEVIT (alleen tokens uit style.css): navy kaart
   --bruin, rail bovenaan in de teal-trap --goud-diep/--goud/--teal-op-navy, eyebrow --teal-op-navy, vinkjes in
   --goud met navy vink, oranje CTA (.btn--goud.btn--groen) en creme tekst. Het EV-logo staat op een wit plateau
   staat sinds 18:40 WIT op het navy, zonder plateau, met alleen de katrol in oranje (wens Shahab: "de erkende
   verhuizers ook wit net als de Kievit, die oranje mag blijven bij de katrol"); daarvoor is er een nieuwe asset
   img/erkende-verhuizers-wit.svg (kopie van assets/img/keurmerk/erkende-verhuizers.svg met #323286 naar #FFFFFF,
   de 13 oranje #FF9F1A-fills onaangeroerd), die bij integratie naar site/assets/img/keurmerk/ moet en waarnaar
   de src dan wijst. Het logo linkt naar de eigen ledenpagina; rechts staat het Kievit-logo (deco/logo-kievit-wit.svg, wens Shahab
   18:20), hoogte clamp(112px,11vw,144px) na twee keer +25% (18:30 en 18:40) omdat hij op 92px wegviel tegen het
   keurmerk; op mobiel 90px, waardoor de twee logos daar onder elkaar staan in plaats van naast elkaar. Het SVG zelf is scherp (op 400px getest),
   de klacht "betere kwaliteit" was een maatprobleem, geen tracekwaliteit. GEEN De Bresser-huisstijl of -logo in dit blok (besluit Shahab 18:10:
   "die erkende verhuisblok moet van de Kievit worden, niet van De Bresser"); dat De Kievit onderdeel is van
   De Bresser staat al in de footer. Acht punten, allemaal uit onderzoek/08 sectie 2.1 (register,
   Garantiecertificaat, 100.000 euro nieuwwaarde, aanbetaling 25%/1.000/2.000, faillissement, opslag 12 maanden,
   Geschillencommissie 10.000, grensstreek NRW/Nedersaksen); Feitsma's "1,07% schadefrequentie", "zonder eigen
   risico" en "duurzaam en veilig" bewust niet overgenomen (AVVV 2025 kent 50 euro eigen risico; niet in 2.1).
   Bronregel onderaan. Op 390 krijgt de knop de normale .btn-maat, anders breekt het label over twee regels.
   De De Bresser-logo-webp's in img/ (bresser-logo(-wit)-320/640.webp) zijn NIET meer in gebruik; laat staan
   voor het geval er alsnog een De Bresser-blok komt.
2. `top-movers.html` (.tm): volledig Top Movers-huisstijl = de site-tokens (teal --goud/--goud-diep, navy,
   creme, oranje knop) plus de TM-elementen die al in assets staan: logo-topmovers.svg, deco/honingraat.svg
   (raat rechtsboven op 16%), deco/bij.svg (bij rechtsonder). Copy alleen uit 08 sectie 2.1 en hoofdstuk 01/02:
   "landelijk samenwerkingsverband van zelfstandige, erkende verhuisbedrijven, vrijwel allemaal
   familiebedrijven" (01 sectie 1), vestiging voor postcodes 5800-5999 met plaatsen uit 02 sectie 7, link naar
   https://www.topmovers.nl/vestigingen/de-kievit-verhuizingen/. Geen netwerkcijfers, slogans, 9,6, CO2/ISO.

Integratie (regie): beide secties na </footer> in build_kievit.py, CSS-blokken achteraan style.css, de twee
webp's van De Bresser naar assets/img. Klassen .zeker* en .tm* botsen niet met bestaande klassen (gecheckt).

VALKUIL bij het bijwerken: regie heeft dit blok al in style.css staan. Een eigenschap uit mijn blok-CSS WEGLATEN
haalt hem niet weg, want de regel in style.css blijft gelden (cascade per eigenschap). Het witte plateau bleef
daardoor twee rondes zichtbaar in de preview. Nu staan `padding:0;background:none;border-radius:0` expliciet in
.zeker__logo. Bij integratie het bestaande .zeker-blok in style.css VERVANGEN, niet aanvullen.

