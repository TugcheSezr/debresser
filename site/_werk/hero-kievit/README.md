# Hero: Kievit-logo in de balk en merknaam in de H1 (sessie -49, 28-aug 18:45)

Opdracht Shahab: "hier moet het logo van De Kievit komen in plaats van dat van Top Movers" (topbar) en
"in de hero moet ook duidelijk in de H1 komen dat het De Kievit Verhuizingen betreft".

Voorbeeld: http://127.0.0.1:4740/_werk/hero-kievit/hero-varianten.html
Variant A staat boven (aanbevolen, gecontroleerd op 1440 en 390), variant B eronder als alternatief
(alles op een maat, wordt drie regels en leest zwakker).

## Wat regie moet wijzigen in build_kievit.py

1. Topbar-logo, de twee `<img>` in `.topbar__logo`:
   - `/assets/img/logo-topmovers-wit.svg` (813x387)  ->  `/assets/img/deco/logo-kievit-wit.svg` (1520x1040)
   - `/assets/img/logo-topmovers.svg` (813x387)      ->  `/assets/img/deco/logo-kievit-navy.svg` (1520x1040)
   - aria-label van de link: "De Kievit Verhuizingen, naar boven"
   Beide SVG's staan er al; er is geen nieuw beeld nodig. LET OP: het Kievit-logo is een gestapeld lockup
   (vogel boven de naam) met verhouding 1,46:1, terwijl het Top Movers-logo 2,1:1 is. Op de vaste hoogtes
   uit style.css (84px los, 56px in `is-stuck`, 48 tot 60px op de kleinere breekpunten) oogt hij goed, maar
   controleer de `is-stuck`-stand: op 48px wordt de regel "VERHUIZINGEN" klein.

2. Hero-eyebrow: `De Kievit Verhuizingen &middot; Venlo &middot; Erkende Verhuizer` -> `Erkende Verhuizer in Venlo`
   (de merknaam staat nu in de H1, dus dat was dubbel; de korte versie past op 390 op een regel).

3. H1:
   `<h1 class="hero__title hero__title--merk" id="hero-titel" data-reveal style="transition-delay:.08s">De Kievit Verhuizingen<span class="hero__title__sub">verhuisbedrijf in <em>Venlo</em> en heel Noord- en Midden-Limburg</span></h1>`

4. Twee regels bij `.hero__title` in style.css:
   `.hero__title--merk{font-size:clamp(2.4rem,4.4vw,3.35rem)}`
   `.hero__title__sub{display:block;margin-top:.45rem;font-size:.52em;line-height:1.15;letter-spacing:-.01em}`

De teal markering op "Venlo" (`.hero__title em`) blijft werken, nu op de tweede regel.

## Meetnotitie

De hero gebruikt `min-height:min(92vh,860px)`. Wie hem afdrukt met een script dat de viewport op de
paginahoogte zet, komt in een groeilus terecht (viewport hoger -> 92vh hoger -> pagina hoger) en de afdruk
hangt. Meet met een VASTE viewporthoogte en knip met een clip.
