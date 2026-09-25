# Iconen uit de Shutterstock-bibliotheek

Gemaakt 29-08-2026 met de `icoon-skill`, omdat de dunne sprite-lijniconen (`#i-plan`, `#i-users`,
`#i-check`, `#i-home`, `#i-box`, `#i-star`) in de ronde icoonvlakken te mager oogden (Shahab: "deze
svg's zijn lelijk, we hebben veel betere").

Bron: `~/SynologyDrive/Data Directie NEW/ALGEMEEN ICONS/shutterstock_<set>.pdf`, gevuld ("filled solid")
in navy plus cyaan. Werkwijze: `pdftocairo -svg` over het hele vel, daarna per icoon de bij elkaar horende
paden geclusterd op afstand en uitgeknipt met een viewBox die de volledige bbox plus 6 procent marge omvat,
dus zonder afgesneden randen; labels onder de iconen vallen af omdat ze een eigen, lage groep vormen.
Recolor: donkere paden naar `#22314E` (navy), lichte naar `#00A19B` (teal). Script en contactvellen staan
in de sessie-scratchpad (`extract.py`, `vel.py`); de contactvellen per set zijn de plek om een ander icoon
uit te kiezen.

| bestand | set | betekenis | in gebruik |
|---|---|---|---|
| communicatie.svg | Speaking | twee tekstballonnen | /klantervaringen/ "Duidelijke communicatie" |
| mensen.svg | Speaking | twee mensen in gesprek | /klantervaringen/ "Vriendelijke mensen" |
| op-tijd.svg | Time | klok met vinkje | /klantervaringen/ "Op de afgesproken tijd" |
| meedenken.svg | Speaking | handen dragen een tekstballon | /klantervaringen/ "Meedenken als het anders loopt" |
| bewoners.svg | Teamwork | drie personen | /dozencalculator/ "Extra's per bewoner" |
| doos-inpakken.svg | Logistics | doos met pijl erin | /dozencalculator/ "Garderobedozen apart" |
| rekenen.svg | Accounting | rekenmachine met grafiek | /dozencalculator/ "Marge en afronding" |
| checklist.svg | Checkmark | klembord met vinkjes en adviseur | /dozencalculator/ "Nagelopen bij de opname" |
| gediplomeerd.svg | Checkmark | zegel met vinkje | KLAAR VOOR GEBRUIK: "Gediplomeerde verhuizers" |
| plan.svg | Teamwork | klembord met vinkjes en klok | KLAAR VOOR GEBRUIK: "Alles volgens plan" |
| verzekerd.svg | Checkmark | handen dragen een vinkje | KLAAR VOOR GEBRUIK: "Verzekerd en gegarandeerd" |
| beoordeling.svg | Survey | duim omhoog met vijf sterren | KLAAR VOOR GEBRUIK: "Beoordeeld met een 9,4" |

De laatste vier horen bij het blok "Waarom De Kievit" dat `_werk/build_paginas.py` op twintig pagina's zet
(constante BLOKKEN). Dat bestand is van de generator-sessie, dus daar is de vervanging nog niet doorgevoerd.
Zo gaat het, per icoon een regel:

    <span class="ico"><svg aria-hidden="true"><use href="#i-users"/></svg></span>
    <span class="ico"><img src="/assets/img/icoon/gediplomeerd.svg" alt="" width="30" height="30" loading="lazy" decoding="async"></span>

plus eenmalig in style.css (of in het style-blok van de pagina): `.usps .ico img{width:30px;height:30px;display:block}`.
