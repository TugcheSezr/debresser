# Briefing huisstijl: homepage De Kievit Verhuizingen in de Top Movers-huisstijl

Regie: sessie shahabmorshedian-43 (HTML, copy, QA). Deze brief is voor de huisstijl-terminal.

## Context

- Repo `~/website-kieviet`, nieuwe map `site/` = kopie van de Heerlijk Thuis Ads-lander
  (`~/mijnheerlijkthuis-landing/verhuizen/`). Doel: homepage van De Kievit Verhuizingen (Venlo, lid van
  Top Movers, onderdeel van De Bresser) als exacte kopie van die lander, maar volledig Top Movers.
- Jij bent eigenaar van `site/assets/css/style.css` (nu nog de HT-CSS, 1012 regels), `site/assets/fonts/`
  en de vector- en merkbestanden in `site/assets/img/` (logo's, mark, vinkje, keurmerk/, favicon,
  apple-touch-icon). De HTML-structuur en de klassen veranderen NIET; alleen kleuren, fonts, logo's.
- Bron huisstijl: `onderzoek/06-merk-huisstijl-en-website.md` (sectie 2) en
  `onderzoek/08-implicaties-website-kieviet.md` (sectie 6). Logo's: `topmovers/logos-certificaten/`.

## Top Movers-huisstijl (gemeten, met bron in hoofdstuk 06)

- Primair teal #00A19B; link-hover #32B3AF; nieuwere iconen #33A39F; secundair lichtteal #C4E4E4;
  extra licht #E5F3F3; iconencirkel #99D9D7; tekst #1D1D1B; accent oranje #EE7203 (knoppen);
  donkerblauw sectievlak #22314E; warm wit #F6F4EC; hover geel #E8C45C (dienstkaarten); geel #FFD511
  alleen voor bij en campagnester (niet nodig).
- Fonts: Poppins 700 voor koppen; Noto Sans 400/700 voor lopende tekst en knoppen (footer 300);
  Zilla Slab 600/700 voor display-koppen en het menu. Afronding: kaarten 15 en 10 px, knoppen en
  menu-items 50 px (pil).

## Kleurmapping HT naar TM (in :root en overal waar nog losse hex of rgba van het HT-palet staat)

| HT-token | HT-waarde | TM-waarde |
|---|---|---|
| --goud (vlakken, accenten) | #DBC096 | #00A19B |
| --goud-diep (gekleurde tekst op licht: labels, .kop, sterren) | #7A5F2A | donkere teal met AA op wit EN op #E5F3F3, bv. #00726E; meet het |
| --goud-licht (icoontegels) | #F2E8D3 | #E5F3F3 |
| --goud-donker | #C9AB78 | #33A39F |
| --goud-hover | #E0C9A6 | #32B3AF |
| --zand | #E6D9C1 | #C4E4E4 |
| --creme (body) | #F2F1E9 | #F6F4EC |
| --creme-2, --secundair (secties, chips) | #ECEADA | #E5F3F3 |
| --licht-hover | #EFEDE0 | #D5ECEB |
| --bruin (donkere panelen: footer, calc-uitkomst, badge, opslag-kaart, venster, split, ringen-cirkel) | #553838 | #22314E |
| --ant, --ant-diep | #222A23, #2B2A29 | #1D1D1B |
| --ant-zacht | #5A5F5A | #4B4B49 |
| --lijn | #DCD1BD | #C4E4E4 |
| rgba(43,42,41,x) en rgba(253,251,248,x) in schaduwen, veils, footer-gradients | | dezelfde alfa op #1D1D1B resp. #F6F4EC; footer #2A1C1C/#241818 naar navy-tinten (#22314E, #1A2540) |
| .reviews::before Google/Trustoo-lichten | | Google-kleuren mogen blijven, Trustoo-koraal eruit; watermerk mark-goud.svg wordt mark-teal.svg |

Knoppen:
- .btn--goud en .btn--ant: teal #00A19B. Wit op #00A19B haalt maar 3,0:1, te laag voor de 13px
  uppercase knoptekst: kies donkere tekst #1D1D1B op teal, of een donkerdere teal-achtergrond (bv.
  #00857F) met wit. Kies wat AA haalt en meld het.
- .btn--groen (markeert per sectie de meest geklikte knop; nu WhatsApp-groen met donkere tekst) en
  .of-cta: Top Movers-oranje #EE7203 met donkere tekst #1D1D1B (5,7:1), hover #D9660A, zelfde
  pijl-icoon. Wit op #EE7203 is 2,96:1 en valt af.
- .btn--wa blijft wit met het WhatsApp-groene icoon (merk van derden, niet hertinten).
- .btn--omlijnd en .btn--lijn: zelfde logica, kleuren uit de mapping.

Fonts:
- --font-titel (h1-h4, .kop, .of-title, .dozen h2, .leadblock h2) naar 'Poppins' 700.
- --font-kop (labels, knoppen, chips, cijfers, .stap__nr, .score__cijfer, .calc__getal, .badge) naar
  'Noto Sans' 700 voor knoppen/labels/chips; voor de grote cijfers (.stap__nr, .score__cijfer,
  .calc__getal, .review::before) 'Zilla Slab' 700 als display, dat is de Top Movers-display.
- --font-tekst naar 'Noto Sans' 400.
- Zelf hosten als woff2 in `site/assets/fonts/` (latin en latin-ext, variabel of losse gewichten;
  Poppins 400/600/700 staat al als woff2 in `~/speedyservice-pro/assets/fonts/`). @font-face bovenin
  style.css bijwerken en unicode-range houden. Geef mij de exacte bestandsnamen van de twee of drie
  bestanden die preload verdienen (de body-font en de kopfont), dan zet ik de `<link rel=preload>`
  in index.html.

Logo en beeldmerk:
- `topmovers/logos-certificaten/2021-09_TOP-MOVERS-LOGO-RGB.png` (813x387; zwart #000000 plus teal
  #009FB4) en `2021-09_TOP-MOVERS-LOGO-wit.png`. Vectoriseer naar `site/assets/img/logo-topmovers.svg`
  (kleur) en `logo-topmovers-wit.svg`; en het beeldmerk apart (alleen swoosh plus pijlpunt) als
  `mark.svg` (teal), `mark-wit.svg` en `mark-teal.svg` (vervangt het H-beeldmerk van HT als watermerk
  in hero, dozenkaart, reviews, venster en opslag-band; zelfde bestandsnamen als HT waar mogelijk,
  dan hoef ik niets te hernoemen). Tracing met potrace, vtracer of autotrace (brew of pip), anders
  natekenen; vergelijk op 900px met de PNG, letters en pijlpunt moeten strak zijn.
- `heerlijk-script-wit.svg` (script-woord in de opslag-band) vervalt: daar komt `logo-topmovers-wit.svg`.
- `vinkje-goud-v2.svg` naar `vinkje-teal.svg` (zelfde vorm, teal).
- De Kievit heeft geen vectorlogo (alleen op foto's: blauwe kievit van driehoeken met groen accent,
  DE KIEVIT VERHUIZINGEN). Niet natekenen, staat als open klantvraag; header en footer krijgen het
  Top Movers-logo, zoals de huidige de-kievit.nl ook doet.

Keurmerken (hoofdstuk 08 sectie 2.2 is leidend):
- Erkende Verhuizers: `topmovers/logos-certificaten/2021-09_Erkende-verhuizers-1.png` (400x200) naar
  `site/assets/img/keurmerk/erkende-verhuizers.svg` of een schone transparante png.
- Klantenvertellen (reviewbron: 9,4 uit 779): probeer een officieel logo (svg/png) van
  klantenvertellen.nl of hun widget-assets te halen naar `keurmerk/klantenvertellen.svg`; lukt dat
  niet, dan een tekstchip in de CSS.
- Google-G zit al als sprite in de HTML. Trustoo-bestanden mogen weg.
- NIET: Erkende Projectverhuizers/EPV/PPV, CO2-Prestatieladder, ISO 9001/14001, VCA, Fedemac, IAM,
  jubileumlogo De Bresser 100 jaar.

Favicon: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` (180x180) uit het TM-beeldmerk
(teal op wit of wit op teal). og.jpg maakt de beeld-terminal.

## Werken en meten

- Devserver: `python3 site/_werk/devserver.py 4740 site` geeft http://127.0.0.1:4740/ (ik zet de
  paden in index.html om van /verhuizen/assets naar /assets).
- Screenshots: `node site/_werk/shoot.mjs http://127.0.0.1:4740/ 1440 site/_werk/shots/desk.png`
  (chrome-headless via CDP, zie de kop van het script), `python3 site/_werk/stitch.py <uit.png>`.
- Contrast: lever `site/_werk/contrast.txt` met alle tekst/achtergrond-paren (zoals de HT-lander),
  alles AA.
- Cachebuster: `?v=` staat in index.html en is van mij. Zodra jouw CSS staat: bericht met "CSS klaar"
  plus de fontbestandsnamen, dan bump ik.

## Regels

- Alleen jouw bestanden (style.css, fonts/, logo's, mark, vinkje, keurmerk/, favicon). `site/index.html`
  is van de regie-sessie; foto's en cutouts zijn van de beeld-terminal (shahabmorshedian-39).
- Geen git commit of push; de regie-sessie commit.
- Rapporteer via SendMessage naar `shahabmorshedian-43` bij (1) tokens plus fonts klaar, (2) logo,
  mark en keurmerken klaar, (3) volledige CSS-pass klaar met contrastrapport en screenshots.
