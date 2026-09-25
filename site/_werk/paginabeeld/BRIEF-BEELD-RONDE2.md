# Ronde 2: vijf vrijstaande cutouts rechts naast een kop

Opdracht van Shahab, 29-08-2026, met screenshots van de vijf plekken. Coordinatie via
`shahabmorshedian-f4`. Dit komt BOVENOP het herontwerp dat je net hebt opgeleverd.

## Wat hij vraagt

Op vijf plekken staat een kop met tekst links en een grote lege rechterhelft. Daar hoort een van de
vier bestaande Top Movers-cutouts. Waar de kop nu GECENTREERD staat, moet hij naar links en komt de
cutout rechts.

## Er is GEEN nieuwe CSS nodig

De homepage heeft dit component al: `.werkwijze__top` (grid van twee kolommen, `align-items:end`,
op max-width 900px een kolom met de figuur gecentreerd op 88%) met daarin `.sectiekop` links en
`<figure class="werkwijze__wagen">` rechts. Zie `site/index.html` rond "Zo verloopt uw verhuizing".
De figuurklasse heet historisch "wagen" maar is gewoon de vrijstaande-cutout-figuur; zet er een
HTML-commentaar bij dat je hem voor een mensen-cutout gebruikt.

**Raak style.css dus niet aan.** De regels staan op 874-882 en gelden al op elke pagina.

Markup, letterlijk over te nemen:

```html
<div class="werkwijze__top">
  <div class="sectiekop" data-reveal>
    <p class="label">...</p>
    <h2 class="kop" id="...">...</h2>
    <p class="intro">...</p>
  </div>
  <!-- .werkwijze__wagen is de vrijstaande-cutout-figuur van de homepage, hier met mensen -->
  <figure class="werkwijze__wagen" data-reveal aria-hidden="true">
    <img src="/assets/img/<naam>-<groot>.webp"
         srcset="/assets/img/<naam>-<klein>.webp <klein>w, /assets/img/<naam>-<groot>.webp <groot>w"
         sizes="(max-width:900px) 88vw, 46vw"
         width="<breedte>" height="<hoogte>" alt="" loading="lazy" decoding="async">
  </figure>
</div>
```

De rest van de sectie (de stappen, de icoonrij, de calculator) blijft er gewoon ONDER staan, precies
zoals op de homepage. Staat er nu `sectiekop sectiekop--midden`, haal dan `--midden` weg, dat is de
"naar links schuiven" die Shahab vraagt.

`alt=""` en `aria-hidden="true"`: deze cutouts zijn decoratief, de inhoud staat in de tekst ernaast.
Zo doet de homepage het ook.

## De vijf plekken

| sessie | pagina | kop | cutout |
|---|---|---|---|
| aa | verhuischecklist | "Zet het verhuisbedrijf bovenaan uw lijst" | `wagen-heerlijkthuis` |
| 39 | inpaktips | "Zo pakt u uw huis in zonder dat er onderweg iets sneuvelt" (nu gecentreerd, naar links) | `figuur-duo-lachen` |
| 39 | inpaktips | "Vier regels voor elke doos die u dichtplakt" | `duo-opslag` |
| 43 | dozencalculator | "Zo weet u vooraf hoeveel dozen er moeten komen" | `figuur-duo-dozen` |
| 43 | dozencalculator | "Een prijs die bij uw inboedel past" (nu gecentreerd, naar links) | `wagen-heerlijkthuis` |

Bestanden en maten, allemaal al aanwezig in `site/assets/img/`, transparante webp:

| naam | groot | klein |
|---|---|---|
| `wagen-heerlijkthuis` | 1400x883 | 900x568 |
| `figuur-duo-lachen` | 1100x907 | 700x577 |
| `duo-opslag` | 1600x1663 | 1000x1039 |
| `figuur-duo-dozen` | 1600x976 | 900x549 |

`duo-opslag` is bijna vierkant en dus fors hoog in een halve kolom; loopt hij uit de hand naast een
korte kop, geef de figure dan een `max-width` mee in de HTML (geen CSS-bestand aanraken).

## Val niet in deze drie

1. **Het zijn CUTOUTS, geen foto's in een vak.** Nooit in `.blok__foto` (dat vak heeft
   `overflow:hidden` en `object-fit:cover` op een achtergrondvlak en snijdt de figuur af).
2. **Nooit `clip-path` en `filter: drop-shadow()` op hetzelfde element.** Dat geeft op een licht vlak
   een vaag vak in de vorm van de clip, en je zoekt je dan suf in de foto terwijl het de CSS is.
   `.werkwijze__wagen img` heeft al een drop-shadow; laat die staan en zet er geen clip-path bij.
3. **Meet de bedekking met paint order, niet met rechthoeken.** Controleer met `elementFromPoint` op
   een paar punten per knop of de figuur geen knop of tekst overlapt, op 390, 700, 900, 1024, 1360 en
   1920 px. Nul gemeten knoppen betekent dat je meting stuk is, niet dat het goed is.

## Verder

Zelfde spelregels als ronde 1: alleen je eigen bronbestand bewerken (bij m3 is dat de generator, bij
de andere drie `_werk/paginas/<slug>.html`), daarna `build_paginas.py`, niet in style.css /
build_kievit.py / navigatie.py / index.html schrijven, geen buster bumpen, niet pushen, committen
alleen met `git commit -- <paden>`.

Melden bij `shahabmorshedian-f4`: wat je hebt geplaatst, de gemeten figuurmaten op 1440 en 390 px, en
of er ergens iets overlapt.

Voor sessie 64 (m3-calculator) zit er in deze ronde niets bij.
