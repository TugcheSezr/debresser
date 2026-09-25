# Brief: herontwerp van de vier "Zelf voorbereiden"-pagina's

Opdracht van Shahab, 29-08-2026. Vier sessies, elk EEN pagina. Coordinatie loopt via sessie
`shahabmorshedian-f4` (beeld). Lees deze brief helemaal voor je begint.

| sessie | pagina | bronbestand dat je bewerkt |
|---|---|---|
| shahabmorshedian-aa | Verhuischecklist | `site/_werk/paginas/verhuischecklist.html` |
| shahabmorshedian-39 | Inpaktips | `site/_werk/paginas/inpaktips.html` |
| shahabmorshedian-43 | Dozencalculator | `site/_werk/paginas/dozencalculator.html` |
| shahabmorshedian-64 | M3-calculator | `site/_werk/paginas/m3-calculator.html` |

## Wat Shahab vraagt

> "Het doel is om de pagina's te herdesignen en beter te maken ECHT op basis van de huisstijl van de
> andere pagina's zoals home. Daarnaast is het belangrijk dat tekst niet op zichzelf staat maar ook
> plaatjes erbij heeft, in de design van de homepagina. Je hebt 2 plekken waar je plaatjes mag
> toevoegen per pagina."

Vertaald naar harde eisen:

1. **Geen enkel tekstblok staat alleen.** Elke sectie krijgt een visuele partner: een foto, een
   icoonrij, kaarten, een genummerde stap, een boog, een donker paneel of een cijfer. Nu zijn het
   grotendeels lappen tekst onder elkaar; dat is precies wat weg moet.
2. **Exact TWEE fotoplekken per pagina.** Niet meer. De twee foto's staan hieronder klaar, met naam,
   maat, alt en caption. Links en rechts afwisselen (foto links bij de een, rechts bij de ander).
   Nooit dezelfde foto twee keer op een pagina.
3. **De huisstijl is de homepage, letterlijk.** Open `site/index.html` en gebruik de blokken die daar
   al staan. Verzin geen nieuwe componenten en geen nieuwe kleuren.

## Wat je NIET doet (gedeelde werkboom, vier sessies tegelijk)

- **Niet in `site/assets/css/style.css` schrijven.** Alles wat je nodig hebt bestaat al. Kun je echt
  niet zonder een nieuwe regel: `cat >>` een blok met een duidelijke kopcommentaar aan het EIND van
  het bestand, en schrijf het bestand nooit integraal terug (dan draai je het werk van drie anderen
  stil terug).
- **Niet `build_kievit.py`, `navigatie.py` of `site/index.html` aanraken.** Ook geen cachebuster
  bumpen; regie doet dat in een keer.
- **Niet in `site/_werk/paginabeeld/` schrijven.** Dat is de beeldmap van sessie f4.
- **Niet pushen.** Committen mag, maar uitsluitend met `git commit -- <jouw paden>`, nooit `git add .`
  en nooit `git commit -a`. Doe eerst `git status --short` en kijk of je alleen je eigen bestanden
  meeneemt.
- **Niet de calculator- of checklist-JS slopen.** De dozencalculator, de m3-calculator en de
  afvinkbare checklist met localStorage moeten na je herontwerp nog werken. Test dat echt in de
  browser, niet op gevoel.

## Werkwijze

1. Bewerk alleen `site/_werk/paginas/<jouw-slug>.html`. Dat bestand is de waarheid voor jouw pagina;
   `build_paginas.py` leest hem en schrijft `site/<slug>/index.html`.
2. Draai daarna vanuit `~/website-kieviet`: `python3 site/_werk/build_paginas.py`. Die generator
   herbouwt alle pagina's uit de huidige bronbestanden, dus als een collega tegelijk klaar is pikt
   hij dat gewoon mee. Draai hem aan het eind nog een keer.
3. Controleer op de devserver: `http://127.0.0.1:4740/<slug>/` (die draait al, no-store).
4. Kijk zelf naar het resultaat op 1440px en op 390px, met een headless screenshot. De
   headless-shell staat in
   `~/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`.
   Een screenshot maken is geen bewijs dat het goed is; kijk er ook echt naar.
5. Meld terug met SendMessage naar `shahabmorshedian-f4`: wat je hebt veranderd, wat je hebt gemeten,
   en wat er open blijft.

## Het bouwmateriaal van de homepage

Sectieklassen: `.sectie`, `.sectie--creme2` (lichtteal vlak), `.sectie.ring` (met ringdecoratie).
Kopblok: `.sectiekop` / `.sectiekop--midden` met `<p class="label">`, `<h2 class="kop">`,
`<p class="intro">`.
Tekst-plus-foto: `.blok` met `.blok__tekst` en `.blok__foto`, varianten `.blok--vlak` (goudvlak achter
de foto), `.blok--paneel`, `.blok--navy` (donker paneel), `.blok--stapel`.
Verder beschikbaar en al gestyled: `.usps` / `.usps--rij` (icoonrij), `.tips-grid` met `.tip`,
`.dienst` met `.dienst__nis` / `.dienst__nr` / `.dienst__tekst`, `.stap` met `.stap__nr`, `.trust`,
`.venster`, `.opslag`, `.ringen`, `.split`, `.hist5`, `.zegel`, `.knoprij` met
`.btn--goud .btn--groen` / `.btn--wa` / `.btn--lijn` / `.btn--omlijnd`, `.calc`, `.m3`.
Animatie: `data-reveal` op een blok, `data-reveal-groep` op een grid.

**Let op de sprite.** `build_paginas.py` kopieert maar tien symbolen naar de subpagina's:
`i-wa`, `i-phone`, `i-caret`, `i-star`, `ik-rating`, `i-users`, `i-plan`, `i-home`, `i-check`, `i-box`.
Gebruik je een ander `<use href="#i-...">` dan is het icoon op de pagina leeg. Wil je meer beeldtaal,
pak dan een van de 90 losse SVG's in `site/assets/img/deco/` met een gewone `<img>` (bijvoorbeeld
`verhuisdoos.svg`, `checklist.svg`, `verhuiswagen.svg`, `dozenstapel.svg`, `steekwagen.svg`,
`klok.svg`, `sleutel.svg`, `trap.svg`, `opslag.svg`, `montage.svg`, `boog-dun.svg`, `honingraat.svg`).
Geef een inline of los geladen SVG altijd `width` en `height` mee, anders wordt hij 300x150.

Palet (staat al in `:root`): navy `#22314E`, teal `#00A19B`, donkere teal `#006C68`, creme `#F6F4EC`,
lichtteal `#E5F3F3`, lijn `#C4E4E4`, geel accent `#FFD500`, tekst `#1D1D1B`.

## Het fotovak is STAAND, niet liggend

Gemeten met `getBoundingClientRect` op de devserver, huidige `.blok__foto` op deze pagina's:

| pagina | 1440px | 1000px | 390px |
|---|---|---|---|
| inpaktips | 479x736 (0,65) | 403x788 (0,51) | 307x384 (0,80) |
| m3-calculator | 524x917 (0,57) | 435x955 (0,46) | 358x448 (0,80) |

Het vak rekt mee met de tekstkolom, dus hoe langer je tekst hoe smaller de foto oogt. De liggende
`dienst-*.webp` (1120x641) die er nu in staan verliezen daar ruim 60% van hun breedte. De nieuwe
foto's zijn daarom 2:3 staand. Houd de tekstkolom naast een foto kort genoeg dat het vak niet
absurd hoog wordt; splits liever in twee blokken dan een blok met een halve pagina tekst ernaast.

## De twee foto's voor jouw pagina

Alle bestanden staan in `site/assets/img/`, twee maten: `-760` is 760x1140, `-1140` is 1140x1710.
Gebruik ze zo (`sizes` aanpassen aan jouw kolombreedte):

```html
<figure class="blok__foto" data-reveal>
  <img src="/assets/img/<naam>-1140.webp"
       srcset="/assets/img/<naam>-760.webp 760w, /assets/img/<naam>-1140.webp 1140w"
       sizes="(max-width:860px) 90vw, 520px"
       width="1140" height="1710" alt="<alt>" loading="lazy" decoding="async">
  <figcaption><caption></figcaption>
</figure>
```

### Verhuischecklist
- `checklist-keukentafel` — alt: "Vrouw aan de keukentafel vinkt haar verhuischecklist af, met
  verhuisdozen van Top Movers naast de tafel" — caption: "Uw eigen data, uw eigen lijst"
- `checklist-dozen` — alt: "Verhuisdozen van Top Movers met KEUKEN en SLAAPKAMER erop geschreven, in
  een half ingepakte woonkamer" — caption: "Kamer op de doos, dan hoeft u niets open te maken"

### Inpaktips
- `inpak-borden` — alt: "Borden worden in blanco inpakpapier gewikkeld en staan rechtop in een
  verhuisdoos van Top Movers" — caption: "Borden op hun kant, nooit plat"
- `inpak-service` — alt: "Verhuizer van De Kievit zet boeken rechtop in een boekendoos van Top
  Movers" — caption: "Liever uit handen geven? Wij pakken in"

### Dozencalculator
- `dozen-stapel` — alt: "Stapels grote en kleine verhuisdozen van Top Movers in een lege woonkamer"
  — caption: "Grote dozen voor licht, kleine voor zwaar"
- `dozen-bezorging` — alt: "Verhuizer brengt verhuisdozen van Top Movers op een steekwagen naar de
  voordeur" — caption: "Wij brengen de dozen ruim voor de verhuisdag"

### M3-calculator
- `m3-laadbak` — alt: "Volle laadbak van een verhuiswagen met dozen tot het dak en meubels in
  verhuisdekens" — caption: "Uw kubieke meters, in de wagen"
- `m3-opname` — alt: "Verhuisadviseur van De Kievit neemt met een klant de inboedel in de woonkamer
  op" — caption: "De adviseur telt het samen met u na"

De bestanden worden door sessie f4 in `site/assets/img/` gezet en zijn er binnen enkele minuten na
deze brief. Bestaat je bestand nog niet, wacht dan niet: bouw de HTML met deze namen af en
controleer de pagina zodra ze er staan.

## Inhoudelijke randvoorwaarden

- De Kievit Verhuizingen, Venlo, sinds 1910, aangesloten bij Top Movers, Erkende Verhuizer.
  Telefoon 077 - 32 32 100.
- Geen EPV/PPV-, CO2-Prestatieladder-, ISO-, VCA-, Fedemac- of IAM-claims, geen "100% elektrisch",
  geen namen of gezichten van De Kievit-personeel. Zie `site/_werk/BEELDREGELS.md`.
- Geen em-dashes in de copy, hyphen of komma.
- Bestaande koppen, teksten en FAQ's mogen herschikt en ingekort, maar gooi geen inhoud weg die
  Shahab er bewust in heeft gezet zonder dat te melden.
