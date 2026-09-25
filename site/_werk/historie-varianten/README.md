# Historie-blok (#historie): 4 varianten, sessie -49, 28-aug-2026

Galerij: http://127.0.0.1:4740/_werk/historie-varianten/galerij.html (desktop en 390 px per variant).
Losse pagina's: v1-tijdlijn.html, v2-jaartal.html, v3-toen-nu.html, v4-archief.html, en v5-tijdlijn-collage.html
(Shahabs mix van 1 en 4, 17:20: tijdlijn op navy plus alle drie de archiefbeelden als polaroidstapel in witte
lijsten zoals pro.woodler.nl; bijschriften in Zilla Slab omdat een handschriftletter niet in de huisstijl zit).
Ronde 2 (17:30, Shahab: "goed, maar groter, precies als Woodler met hover, lijsten 25% groter, tekstvak even hoog"):
opzet letterlijk van pro.woodler.nl overgenomen (.hero-art .polaroid: absolute lijsten, padding 14/14/50,
dubbele schaduw, transition .4s; hover = rotate(0) scale(1.03) z-index 10 zwaardere schaduw; mobiel dezelfde
stapel gecentreerd op max 480px). De stapel is align-self:stretch, dus even hoog als het tekstvak; lijsten
82/72/37% van de kolom (25% groter dan ronde 1). Woodler's Caveat-handschrift NIET overgenomen (huisstijl). Per bestand:
het `<style>`-blok = de extra CSS (alleen tokens uit style.css, klassen .hist1 t/m .hist4), de
`<section class="histN" id="historie">` = de sectie-HTML. De `.ctx`-bandjes en de `<link>` zijn
alleen voorbeeldcontext, niet meenemen.

Feiten zijn die van het huidige blok: 12 maart 1910, H. de Kievit & Zoon, grote meubelwagen,
vijf generaties lang familiebedrijf (verleden tijd), 1 juni 2024 De Bresser (familiebedrijf sinds
1923), hele Venlose team mee, Erkende Verhuizer, lid van Top Movers. Geen 1895, geen namen,
geen em-dashes. In v4 telt "116 jaar" mee met het jaar (scriptje onder de sectie; HTML bevat 116).
In v3 heet de truckfoto "Later" omdat het jaartal van die opname nergens gedocumenteerd is.

Beeld (img/, uit de-kievit-nl/fotos-kievit, alleen crop, grijswaarden en autocontrast, geen AI):
- kar-staand-1000/600 (4:5, nr 90 met gevelopschrift), kar-breed-1600/960 (3:2, zonder gescheurde hoek),
  kar-32-1200/700 (3:2 paneel), trucks-breed-1600/960 (16:9, nr 89), trucks-32-1200/700 (3:2 paneel),
  advertentie-1910-300 (nr 87, bronresolutie 300x475).
- v3 gebruikt daarnaast /assets/img/hero-bg-1280.webp als "vandaag".
Bij integratie: gekozen bestanden naar site/assets/img (naamgeving regie), paden in de HTML aanpassen,
`loading="lazy"` staat er al, `data-reveal` naar wens toevoegen.

Mogelijke uitbreiding als de klant open punt 24 (historie) bevestigt: hoofdstuk 07 sectie 2.1 heeft
gedateerde mijlpalen (1986 overname, 1987 loodsen Voltastraat, 1997 kantoor Blerick, 2015 dagelijkse
leiding) voor de tijdlijn van v1.

Ronde 3 (17:45, Shahab: "nee, ze moeten bij elkaar, net als bij Woodler"): ronde 2 had de stapel uitgerekt tot de
hoogte van het tekstvak, waardoor de drie lijsten uit elkaar kwamen. Nu Woodler's verhoudingen letterlijk: vak =
98% van de kolombreedte (padding-bottom, geen aspect-ratio: als grid-item kreeg het vak anders een grotere
automatische hoogte), trucks 88% linksboven (-2,5 graden), kar 46% rechts op 20% met de STAANDE crop (+6 graden),
advertentie 36% onderaan vanaf 28% eroverheen (-3 graden); de groep staat verticaal gecentreerd naast de tekst
(align-self:center), kolommen 1fr/1fr, kleine bleed naar rechts (pad/2). Mobiel dezelfde groep op max 480px.
LET OP: regie had ronde 2 al in style.css gezet (.hist5__stapel min-height:640px, align-self:stretch); het nieuwe
<style>-blok VERVANGT dat blok. Beeld erbij: img/kar-staand-600 en -1000 (4:5).

Ronde 4 (17:40, Shahab: "maak de linkerkant een stuk compacter zodat het 1 geheel lijkt"): kop op twee regels
(.hist5 .kop clamp(1.9rem,2.9vw,2.4rem)), intro op twee regels (de "wat bleef"-zin is weg, zit al in het Nu-item),
tijdlijn-teksten ingekort tot 1-2 regels, gap .75rem, jaarkolom 4.6rem; stapel-bleed = hele --pad, kar right:0.
Gemeten op 1440: tekstvak 583 px, stapel 554 px.

