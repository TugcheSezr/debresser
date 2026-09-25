# Sitemap nieuwe De Bresser-site (plan, stand 24-09-2026, ronde 2)

Dit is het plan, nog niet de bouw. Er is niets in `site/` aangepast.

> **Wijzigingen ronde 2.** De gebruiker zei: "/werkgebied/ if that page is not on the original https://www.debresser.nl/, then its not needed, add 404 page".
> - **/werkgebied/ is geschrapt.** De 41 plaats- en vestigingspagina's hangen weer direct onder Home (niveau 1, footer), net als op debresser.nl. Het Snelmenu in de footer linkt ernaar (§4).
> - **Dezelfde toets geldt voor de andere nieuwe pagina's:**
>   - **/diensten/ is geschrapt** (ronde 2): op debresser.nl geeft die URL een 404. **Teruggedraaid op 25-09-2026:** de gebruiker vroeg "create a /diensten/ page". /diensten/ is nu een overzichtspagina (niveau 1) achter het menulabel Diensten, dat het mega-menu blijft openen. De zes diensten blijven niveau 1.
>   - **/algemene-voorwaarden/ is geschrapt.** Op debresser.nl linkt de footer direct naar de 6 PDF's onder het kopje "Voorwaarden". Dat blijft zo.
> - **Nieuw: een 404-pagina** (§6). debresser.nl heeft er zelf ook een ("Pagina niet gevonden - De Bresser"). Ze staat buiten de boom.
> - **Telling:** nog steeds 68 blijven, 44 samengevoegd, 2 weggelaten. Nieuwe inhoudspagina's: 0 (was 3); sinds 25-09-2026 1 (/diensten/).

**De regel van de gebruiker:** hooguit twee niveaus. Op debresser.nl staat nu Diensten → Verhuizingen → vijf opties. Straks is het alleen Diensten → Verhuizingen, en staan de opties als secties op de pagina Verhuizingen. De gebruiker zei erbij: "that also includes other pages". Elke tak volgt dus dezelfde regel.

**Bron:** de crawl van debresser.nl op 24-09-2026. Dat zijn 114 pagina's uit de page-, post- en vacature-sitemaps, plus het hoofdmenu (mega-menu), het mobiele menu en het "Snelmenu" in de footer (een keuzelijst met 31 links).

Zo lees je de tabellen:
- Home is de wortel. **Niveau 1** hangt direct onder Home (hoofdmenu of footer), **niveau 2** hangt daaronder.
- **Sectie** betekent dat een losse pagina van debresser.nl een blok op een niveau-2-pagina wordt, bereikbaar met een anker.
- Elke samengevoegde oude URL krijgt een 301-redirect naar zijn nieuwe plek, anker inbegrepen.

---

## 1. De boom

```
Home                                   https://www.debresser.nl/
├─ Diensten (menulabel dat het mega-menu opent; sinds 25-09-2026 ook een overzichtspagina /diensten/, niveau 1)
│  ├─ Verhuizen                          https://www.debresser.nl/verhuizen/
│  ├─ Opslag                             https://www.debresser.nl/opslag/
│  ├─ Meubelprojecten                    https://www.debresser.nl/meubelprojecten/
│  ├─ Gebouwbeheer                       https://www.debresser.nl/gebouwbeheer/
│  ├─ Assetmanagement                    https://www.debresser.nl/assetmanagement/
│  └─ Duurzame werkomgeving              https://www.debresser.nl/duurzame-werkomgeving/
├─ Over ons                              https://www.debresser.nl/over-ons/
├─ Vacatures                             https://www.debresser.nl/overzicht-vacatures/
│  ├─ Verhuizer                          https://www.debresser.nl/vacature/verhuizer/
│  └─ Chauffeur verhuizingen (C/CE)      https://www.debresser.nl/vacature/chauffeur-verhuizingen-c-ce/
├─ Blog                                  https://www.debresser.nl/blog/
│  └─ 11 berichten (zie §5)
├─ Contact                               https://www.debresser.nl/contact/
└─ Offerte (groene knop)                 https://www.debresser.nl/offerte/

Footer, niveau 1 zonder kinderen:
   FAQ                                   https://www.debresser.nl/faq/
   Privacyverklaring                     https://www.debresser.nl/privacyverklaring/
   41 plaats- en vestigingspagina's      via het Snelmenu (zie §4)
   Voorwaarden                           6 PDF-links, geen pagina (zie hieronder)

Buiten de boom:
   404-pagina                            (zie §6)
```

**Hoofdmenu:** Diensten (mega-menu met de zes niveau-2-pagina's), Over ons, Vacatures, Blog, Contact en de groene knop Offerte.

**Footer:** FAQ, Privacyverklaring, het Snelmenu met de plaatspagina's, en onder het kopje "Voorwaarden" dezelfde zes PDF-links als nu op debresser.nl:
- Voorwaarden verhuizingen: https://www.debresser.nl/wp-content/uploads/2019/10/AVVV-PV05-AVBV-AVHD.pdf
- Algemene vervoerscondities: https://www.debresser.nl/wp-content/uploads/2024/04/6010-Algemene-Vervoerscondities-A4-web-2.pdf
- Voorwaarden bedrijfsverhuizing: https://www.debresser.nl/wp-content/uploads/2019/10/Algemene-voorwaarden-voor-Bedrijfsverhuizingen.pdf
- Voorwaarden logistieke services: https://www.debresser.nl/wp-content/uploads/2024/04/Logistieke-Services-Voorwaarden-LSV-2.pdf
- CMR conditions: https://www.debresser.nl/wp-content/uploads/2024/04/CMR-Conditions-English-2.pdf
- Opslagvoorwaarden: https://www.debresser.nl/wp-content/uploads/2025/10/Nederlandse-Opslagvoorwaarden-De-Bresser-opslag-zakelijk.pdf

---

## 2. Diensten: welke pagina's secties worden

### Verhuizen: https://www.debresser.nl/verhuizen/

| Sectie (anker) | Neemt op (oude pagina op debresser.nl) |
|---|---|
| Zakelijk `#zakelijk` | https://www.debresser.nl/zakelijke-verhuizing/ (menu), https://www.debresser.nl/kantoor-verhuizen/, https://www.debresser.nl/winkelverhuizing/, https://www.debresser.nl/verhuisservice-zakelijk/ (Snelmenu); /zakelijk-verhuizen/ is nu al een 301 |
| Particulier `#particulier` | https://www.debresser.nl/particuliere-verhuizing/ (menu), https://www.debresser.nl/full-service-verhuizing/ |
| Internationaal `#internationaal` | https://www.debresser.nl/internationale-verhuizing/ (menu), https://www.debresser.nl/internationale-verhuizing/engeland/ (nu al niveau 3 in de URL), https://www.debresser.nl/duitsland/, https://www.debresser.nl/frankrijk/, https://www.debresser.nl/zwitserland/, https://www.debresser.nl/benelux-verhuizing/, https://www.debresser.nl/verhuisbedrijf-belgie/, https://www.debresser.nl/verhuisbedrijf-europa/, https://www.debresser.nl/groupage-transport/ (kleine en deelverhuizingen binnen Europa via Top Movers) |
| Zorg en senioren `#zorg` | https://www.debresser.nl/zorg-verhuizing/ (menu), https://www.debresser.nl/senioren-verhuizen/ (Ontzorgd Verhuizen, Brocken) |
| Duurzaam verhuizen `#duurzaam` | https://www.debresser.nl/duurzaam-verhuizen/ (menu) |

### Opslag: https://www.debresser.nl/opslag/

| Sectie | Neemt op |
|---|---|
| Zakelijk `#zakelijk` | https://www.debresser.nl/zakelijke-opslag/ (menu linkt via 301 /opslag-zakelijk/) |
| Particulier `#particulier` | https://www.debresser.nl/particuliere-opslag/ (menu linkt via 301 /opslag-particulier/) |
| DIY-opslag `#diy` | nu al een anker op particuliere-opslag (`/opslag-particulier#diy-opslag`) |
| Containeropslag `#container` | https://www.debresser.nl/container-opslag/ (Snelmenu) |
| Opslag in de regio `#regio` | korte lijst met links naar de plaatspagina's; de zes opslagruimte-pagina's gaan naar hun plaatspagina (§4) |

### Meubelprojecten: https://www.debresser.nl/meubelprojecten/

| Sectie | Neemt op |
|---|---|
| Meubeltransport `#transport` | https://www.debresser.nl/meubeltransport/ |
| Veilingen `#veilingen` | https://www.debresser.nl/veilingen/ |
| Montageservice `#montage` | https://www.debresser.nl/meubelmontage/ (menu linkt via 301 /montage-service/) |

### Gebouwbeheer: https://www.debresser.nl/gebouwbeheer/

| Sectie | Neemt op |
|---|---|
| Onderhoud `#onderhoud` | https://www.debresser.nl/gebouwbeheer/onderhoud/ |
| Verduurzamen `#verduurzamen` | https://www.debresser.nl/gebouwbeheer/verduurzamen/ |
| Huismeester `#huismeester` | https://www.debresser.nl/gebouwbeheer/huismeester/ |
| Handyman `#handyman` | https://www.debresser.nl/handyman-services/ (niet in het menu; "ondersteuner van uw facilitaire organisatie") |
| Gratis quick scan `#quick-scan` | https://www.debresser.nl/quick-scan/ (actie voor bedrijfspanden) |

### Assetmanagement: https://www.debresser.nl/assetmanagement/

| Sectie | Neemt op |
|---|---|
| Inventarisatie `#inventarisatie` | https://www.debresser.nl/assetmanagement/inventarisatie/ |
| WMS en Meubelpaspoort `#wms` | https://www.debresser.nl/assetmanagement/wms-en-meubelpaspoort/ |
| Opslag assets `#opslag` | https://www.debresser.nl/assetmanagement/opslag-assets/ |
| Inkoop en verkoop `#inkoop-verkoop` | https://www.debresser.nl/assetmanagement/inkoop-en-verkoop-assets/ |
| Circulair meubilair `#circulair` | https://www.debresser.nl/assetmanagement/circulair-meubilair/ |

### Duurzame werkomgeving: https://www.debresser.nl/duurzame-werkomgeving/

Niveau 2 zonder secties van elders. Op debresser.nl is dit de "Nieuw!"-dienst in het mega-menu en op de homepage.

---

## 3. Overige niveau-1-pagina's: wat erin opgaat

| Niveau 1 | Neemt op als sectie | Blijft niveau 2 |
|---|---|---|
| Over ons (https://www.debresser.nl/over-ons/) | https://www.debresser.nl/100-jarig-jubileum/ → `#geschiedenis` (tijdlijn 1923–2023) | — |
| Vacatures (https://www.debresser.nl/overzicht-vacatures/) | https://www.debresser.nl/tekenbonus/ → `#tekenbonus` | de twee vacatures; elke vacature houdt een eigen pagina om op te solliciteren |
| Offerte (https://www.debresser.nl/offerte/) | https://www.debresser.nl/videogesprek/ → `#videogesprek` (offerte via videocall) | — |
| Blog (https://www.debresser.nl/blog/) | — | 11 berichten (§5) |
| Contact (https://www.debresser.nl/contact/) | — (de zes vestigingen staan hier al met adres) | — |

---

## 4. Plaats- en vestigingspagina's (niveau 1, footer)

Op debresser.nl hangen deze pagina's nergens onder: de URL staat direct onder Home. Ze zijn bereikbaar via het Snelmenu in de footer of via Google, en ze staan niet in het hoofdmenu. Dat blijft zo. Een overzichtspagina /werkgebied/ komt er niet, want die bestaat niet op debresser.nl (ronde 2). Elke plaatspagina is dus niveau 1. Wat erin opgaat, wordt een sectie op die pagina.

**Snelmenu:** nu staan er 18 plaatspagina's in (Breda, Den Bosch, Dordrecht, Eindhoven, Etten-Leur, Goirle, Maastricht, Oisterwijk, Oosterhout, Oss, Roermond, Roosendaal, Sint-Oedenrode, Venlo, Vught, Waalwijk, Weert, Zevenbergen). De andere 23 zijn alleen via Google of sitemap.xml te vinden. *Advies:* zet alle 41 in het Snelmenu en haal de samengevoegde pagina's eruit (kantoor-verhuizen, zakelijk-verhuizen, winkelverhuizing, verhuisservice-zakelijk, container-opslag, de 6 opslagruimte-pagina's, verhuisbedrijf-belgie, verhuisbedrijf-europa).

**Vestigingen** (adres op /contact/): elk houdt een eigen pagina.

| Plaats | Pagina | Neemt op |
|---|---|---|
| Tilburg | https://www.debresser.nl/verhuisbedrijf-tilburg/ | https://www.debresser.nl/tilburg/ (dubbele Tilburg-pagina) |
| Oisterwijk | https://www.debresser.nl/verhuisbedrijf-oisterwijk/ | — |
| Breda | https://www.debresser.nl/breda/ | https://www.debresser.nl/opslagruimte-breda/ → `#opslag` |
| Venlo | https://www.debresser.nl/verhuisbedrijf-venlo/ | — |
| Brussel | https://www.debresser.nl/de-bresser-brussel/ | — |
| Reeuwijk | geen pagina op debresser.nl | — |

**Overige plaatsen:** 36 pagina's, elk niveau 1. Waar een opslagruimte-pagina bij hoort, wordt die een sectie `#opslag` op de plaatspagina.

| Plaats | Pagina | Neemt op |
|---|---|---|
| Baarle-Nassau | https://www.debresser.nl/verhuisbedrijf-baarle-nassau/ | |
| Bavel | https://www.debresser.nl/verhuisbedrijf-bavel/ | |
| Bergen op Zoom | https://www.debresser.nl/bergen-op-zoom/ | |
| Best | https://www.debresser.nl/verhuisbedrijf-best/ | |
| Boxtel | https://www.debresser.nl/verhuisbedrijf-boxtel/ | |
| Den Bosch | https://www.debresser.nl/verhuisbedrijf-den-bosch/ | https://www.debresser.nl/opslagruimte-den-bosch/ |
| Dongen | https://www.debresser.nl/verhuisbedrijf-dongen/ | |
| Dordrecht | https://www.debresser.nl/verhuisbedrijf-dordrecht/ | |
| Drunen | https://www.debresser.nl/verhuisbedrijf-drunen/ | |
| Eindhoven | https://www.debresser.nl/verhuisbedrijf-eindhoven/ | |
| Etten-Leur | https://www.debresser.nl/verhuisbedrijf-etten-leur/ | https://www.debresser.nl/opslagruimte-etten-leur/ |
| Goirle | https://www.debresser.nl/verhuisbedrijf-goirle/ | https://www.debresser.nl/opslagruimte-goirle/ |
| Helvoirt | https://www.debresser.nl/verhuisbedrijf-helvoirt/ | |
| Hilvarenbeek | https://www.debresser.nl/verhuisbedrijf-hilvarenbeek/ | |
| Kaatsheuvel | https://www.debresser.nl/verhuisbedrijf-kaatsheuvel/ | |
| Maastricht | https://www.debresser.nl/verhuisbedrijf-maastricht/ | |
| Moerdijk | https://www.debresser.nl/verhuisbedrijf-moerdijk/ | |
| Oirschot | https://www.debresser.nl/verhuisbedrijf-oirschot/ | https://www.debresser.nl/opslagruimte-oirschot/ |
| Oosterhout | https://www.debresser.nl/verhuisbedrijf-oosterhout/ | |
| Oss | https://www.debresser.nl/verhuisbedrijf-oss/ | |
| Oudenbosch | https://www.debresser.nl/verhuisbedrijf-oudenbosch/ | |
| Poppel (BE) | https://www.debresser.nl/verhuisbedrijf-poppel/ | |
| Raamsdonksveer | https://www.debresser.nl/verhuisbedrijf-raamsdonksveer/ | |
| Roermond | https://www.debresser.nl/verhuisbedrijf-roermond/ | |
| Roosendaal | https://www.debresser.nl/roosendaal/ | https://www.debresser.nl/opslagruimte-roosendaal/ |
| Rucphen | https://www.debresser.nl/verhuisbedrijf-rucphen/ | |
| Schijndel | https://www.debresser.nl/verhuisbedrijf-schijndel/ | |
| Sint-Oedenrode | https://www.debresser.nl/verhuisbedrijf-sint-oedenrode/ | |
| Steenbergen | https://www.debresser.nl/verhuisbedrijf-steenbergen/ | |
| Udenhout | https://www.debresser.nl/verhuisbedrijf-udenhout/ | |
| Vlijmen | https://www.debresser.nl/verhuisbedrijf-vlijmen/ | |
| Vught | https://www.debresser.nl/verhuisbedrijf-vught/ | |
| Waalwijk | https://www.debresser.nl/verhuisbedrijf-waalwijk/ | |
| Weert | https://www.debresser.nl/verhuisbedrijf-weert/ | |
| Zevenbergen | https://www.debresser.nl/verhuisbedrijf-zevenbergen/ | |
| Zundert | https://www.debresser.nl/verhuisbedrijf-zundert/ | |

---

## 5. Blog (niveau 2 onder /blog/)

Blijven: 11 berichten.
- https://www.debresser.nl/2026/06/11/samen-bouwen-aan-succes/
- https://www.debresser.nl/2025/11/19/de-bresser-verwelkomt-brocken-verhuizingen/
- https://www.debresser.nl/2025/11/06/verhuizen-met-kinderen/
- https://www.debresser.nl/2024/03/29/de-populairste-reden-om-te-verhuizen/
- https://www.debresser.nl/2024/03/29/nieuw-qwiek-snooze-reinigingsservice/
- https://www.debresser.nl/2024/03/29/interne-verhuizing/
- https://www.debresser.nl/2024/03/29/verhuislift-maakt-alles-makkelijker/
- https://www.debresser.nl/2024/03/29/de-drie-grootste-verhuisblunders/
- https://www.debresser.nl/2024/03/29/spullen-weg-doen-waarom-is-het-zo-moeilijk/
- https://www.debresser.nl/2024/03/29/waarom-verhuizen-met-een-erkende-verhuizer/
- https://www.debresser.nl/2024/03/29/inhuren-professionals-kan-stressniveau-verminderen/

---

## 6. 404-pagina (nieuw in ronde 2)

debresser.nl heeft een 404-pagina: titel "Pagina niet gevonden - De Bresser", tekst "Deze pagina kon niet worden gevonden. Het lijkt erop dat er niets is gevonden op deze locatie." Daaronder staat alleen de footer. (Bron: https://www.debresser.nl/diensten/, geeft HTTP 404, opgehaald 24-09-2026.)

In de nieuwe site:
- **Plaats:** buiten de boom. De pagina staat niet in het menu en niet in sitemap.xml, en krijgt `noindex`. De host toont haar bij elke onbekende URL met HTTP-status 404 (op Vercel: `404.html` in de root). Oude URL's die een 301 krijgen (§2–§4) komen hier niet terecht.
- **Inhoud:** de gewone header en footer. Daartussen een kop "Pagina niet gevonden" en één zin, dan de links:
  - Home
  - de zes dienstpagina's: Verhuizen, Opslag, Meubelprojecten, Gebouwbeheer, Assetmanagement, Duurzame werkomgeving
  - Contact
  - de groene knop Offerte

---

## 7. Telling

| Groep | Aantal | Wat |
|---|---|---|
| Blijft een eigen pagina | 68 | home 1; niveau 1: over-ons, overzicht-vacatures, blog, contact, offerte, faq, privacyverklaring (7); diensten niveau 2 (6); vacatures (2); blogberichten (11); plaats- en vestigingspagina's (41: 40 plaatsen + Brussel) |
| Samengevoegd als sectie | 44 | Verhuizen 18, Opslag 3, Meubelprojecten 3, Gebouwbeheer 5, Assetmanagement 5, Over ons 1, Vacatures 1, Offerte 1, dubbel Tilburg 1, opslagruimte-pagina's 6 |
| Weggelaten | 2 | https://www.debresser.nl/logistiek-full-service/ en https://www.debresser.nl/2024/03/29/logistieke-dienstverlening/: de logistieke tak is volgens `onderzoek/07` in september 2024 verkocht. Blijft De Bresser logistiek aanbieden, dan komt het terug als dienst in het mega-menu. |
| Nieuw | 1 inhoudspagina + de 404-pagina | /diensten/ (25-09-2026, op verzoek van de gebruiker; de site telt daarmee 69 routes). /werkgebied/ en /algemene-voorwaarden/ zijn in ronde 2 geschrapt: ze bestaan niet op debresser.nl |
| **Totaal op debresser.nl** | **114** | 68 + 44 + 2 |

---

## 8. Kanttekeningen (gezien, niet opgelost)

1. Het menu linkt naar /opslag-zakelijk/, /opslag-particulier/ en /montage-service/, en het Snelmenu naar /zakelijk-verhuizen/. Alle vier geven nu een 301 naar een andere URL. In de nieuwe site linkt het menu direct naar de ankers.
2. /diensten/ geeft op debresser.nl een 404; daar is "Diensten" alleen een menulabel. In de nieuwe site is /diensten/ sinds 25-09-2026 een overzichtspagina met de zes diensten. Het menulabel linkt ernaar en opent het mega-menu, en de kruimels van de dienstpagina's linken er ook naar.
3. Er zijn twee Tilburg-pagina's (/tilburg/ en /verhuisbedrijf-tilburg/), en de naamgeving van de plaatspagina's is ongelijk: /breda/, /roosendaal/ en /bergen-op-zoom/ hebben geen "verhuisbedrijf-" ervoor. De slugs blijven in dit plan zoals ze zijn, om geen extra redirects te maken.
4. Reeuwijk is een vestiging op /contact/, maar heeft geen pagina.
5. De titel van /full-service-verhuizing/ gaat over verhuizen, maar de tekst gaat over opslag met inpakken. De pagina staat hier bij Verhuizen → Particulier; de tekst moet worden nagekeken.
6. Duurzaam verhuizen is inhoudelijk het MVO-verhaal van het hele bedrijf (afval, elektrische wagens, goede doelen). Het staat hier op Verhuizen, zoals de gebruiker vroeg. Het had ook op Over ons gekund.
7. Via WPML bestaat er een Engelse versie (/en/). Die staat in geen enkele sitemap en valt buiten dit plan.
8. De opbouw van de huidige `site/` (De Kievit) komt niet overeen met deze boom. `site/` heeft al een `404.html` en /privacybeleid/ die als sjabloon kunnen dienen; plaatspagina's heeft `site/` niet. /algemene-voorwaarden/ in `site/` hoort niet bij deze boom (/diensten/ wel weer, sinds 25-09-2026). Dat is werk voor de bouw (`site/_werk/navigatie.py`, `build_paginas.py`), niet voor dit plan.
9. De 44 redirects horen in de hostingconfiguratie (Vercel) zodra de site live gaat. Ze staan hier alleen als mapping.
10. De PDF "Voorwaarden logistieke services" hoort bij de logistieke tak, die verkocht is (zie §7, Weggelaten). De gebruiker beslist of die link in de footer blijft.
11. 23 van de 41 plaatspagina's staan niet in het Snelmenu. 21 daarvan krijgen op debresser.nl geen enkele interne link, ook de vestigingen /verhuisbedrijf-tilburg/ en /de-bresser-brussel/ niet. Best en Dongen krijgen alleen een link vanuit een andere plaatspagina (zie §4, advies).
