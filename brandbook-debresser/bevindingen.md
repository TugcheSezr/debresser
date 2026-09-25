# Bevindingen debresser.nl tegen site/ (stand 24-09-2026)

Wat hier staat: de documenten op debresser.nl, wat die zeggen over de claims in `site/`, en de feiten van debresser.nl waarop de nieuwe De Bresser-site gebouwd kan worden. De gebruiker heeft op 24-09-2026 laten weten dat de huidige De Kievit-site de basis is en dat alles wat De Kievit is eruit gaat. Sectie 3 is daarom de feitenbasis voor die site.

Er is niets aangepast in `site/` of `onderzoek/`. De gebruiker beslist wat erin gaat.

Oordelen:
- **fout**: de site zegt iets wat de bron tegenspreekt.
- **ontbreekt**: de site mist iets wat nodig is of wat de bron wel geeft.
- **bevestigd**: de bron zegt hetzelfde.
- **onbevestigd**: geen bron gevonden, voor en tegen.

Regelnummers gelden voor de gebouwde pagina's in `site/`, stand 24-09. De tekst zelf staat in `site/_werk/build_kievit.py` en `site/_werk/paginas/`. Een andere sessie (debresser-5c) werkt op dit moment in `site/`, dus regelnummers kunnen verschuiven.

---

## 1. Documenten op debresser.nl

De zes voorwaarden staan in de footer van elke pagina. De media-bibliotheek (`/wp-json/wp/v2/media?mime_type=application/pdf`) bevat daarnaast twee oude versies. Brochures, certificaten, een huisstijlgids of een jaarverslag als PDF staan er niet.

| Document | URL | Inhoud | Status |
|---|---|---|---|
| Voorwaarden verhuizingen | https://www.debresser.nl/wp-content/uploads/2019/10/AVVV-PV05-AVBV-AVHD.pdf | AVVV 2025, AVVV-BE 2025, AVBV 2025, AVHD 2025, PV05 2025, in werking 1-1-2025 | actueel. Het pad zegt 2019, de inhoud is 2025. MD5 is gelijk aan de OEV-drukversie uit `onderzoek/04` |
| Voorwaarden bedrijfsverhuizing | https://www.debresser.nl/wp-content/uploads/2019/10/Algemene-voorwaarden-voor-Bedrijfsverhuizingen.pdf | AVB 2020 (OEV) | actueel |
| Algemene vervoerscondities | https://www.debresser.nl/wp-content/uploads/2024/04/6010-Algemene-Vervoerscondities-A4-web-2.pdf | AVC 2002 (Stichting Vervoeradres) | actueel |
| Voorwaarden logistieke services | https://www.debresser.nl/wp-content/uploads/2024/04/Logistieke-Services-Voorwaarden-LSV-2.pdf | LSV, 1 februari 2014 (FENEX/TLN) | actueel |
| CMR conditions | https://www.debresser.nl/wp-content/uploads/2024/04/CMR-Conditions-English-2.pdf | CMR-verdrag, Genève 1956, Engels | actueel |
| Opslagvoorwaarden | https://www.debresser.nl/wp-content/uploads/2025/10/Nederlandse-Opslagvoorwaarden-De-Bresser-opslag-zakelijk.pdf | Nederlandse Opslagvoorwaarden (FENEX, 15-11-1995), voor zakelijke opslag | actueel |
| (niet gelinkt) AVVV-PV05-AVBV-AVHD-2 | https://www.debresser.nl/wp-content/uploads/2024/04/AVVV-PV05-AVBV-AVHD-2.pdf | AVVV/AVBV/AVHD 2015, zelfde MD5 (10c230f3…) als de kopie op de-kievit.nl en topmovers.nl | verouderd |
| (niet gelinkt) Algemene-voorwaarden-voor-Bedrijfsverhuizingen-2 | https://www.debresser.nl/wp-content/uploads/2024/04/Algemene-voorwaarden-voor-Bedrijfsverhuizingen-2.pdf | sVa AVB 2009 | verouderd |
| (extern, op één pagina) Verhuizingen van bedrijven en groei van werkgelegenheid | https://www.pbl.nl/sites/default/files/downloads/Verhuizingen_van_bedrijven_en_groei_van_werkgelegenheid_01.pdf | Ruimtelijk Planbureau 2007 | niet van De Bresser |

Alle teksten komen overeen met de kopieën in `onderzoek/bronteksten/` (db-* en kv-*). Het onderzoek gebruikte dus al dezelfde versies.

---

## 2. Claims op de site

| # | Bestand en tekst op de site | Oordeel | Bron en toelichting |
|---|---|---|---|
| 1 | `over-ons/index.html:433` "De Bresser Verhuizingen uit Brabant, zelf een familiebedrijf sinds 1923" | **fout** (onnauwkeurig) | https://www.debresser.nl/100-jarig-jubileum/: "2011 Tomas Brands neemt De Bresser over van de derde en laatste generatie Jan de Bresser". De familie De Bresser is dus sinds 2011 geen eigenaar meer. Wel noemt De Bresser zich zelf nog "een stabiel familiebedrijf met bijna 100 jaar ervaring" (https://www.debresser.nl/vacature/verhuizer/), en het bedrijf wordt geleid door het echtpaar Tomas en Ineke Brands (/over-ons/). Veilig: "sinds 1923". |
| 2 | `index.html:321` "1923 De Bresser begint. In Brabant start het familiebedrijf dat ruim een eeuw later De Kievit overneemt." en `over-ons/index.html:398` "In Brabant begint De Bresser … start het familiebedrijf" | **fout** (onnauwkeurig) | Zelfde punt als 1. Preciezer is dat het bedrijf in 1923 in Oisterwijk begon als vervoersbedrijf met paard en wagen, opgericht door Cis de Bresser. Het werd pas vanaf 1951 ook een verhuisbedrijf (https://www.debresser.nl/100-jarig-jubileum/, https://www.debresser.nl/over-ons/). |
| 3 | `over-ons/index.html:438` "een organisatie met zo'n tachtig mensen" en `:457` "zo'n tachtig mensen en meerdere vestigingen" | **fout** (verouderd) | https://www.debresser.nl/over-ons/: 18 mensen op kantoor in de teamslider ("Slide 1 of 18"), plus "± 80 mensen in onze magazijnen en onderweg". Samen ongeveer 100. De "tachtig" kwam uit het persbericht van mei 2024 (`onderzoek/07`). Sinds 19-11-2025 hoort ook Brocken Verhuizingen erbij. |
| 4 | `certificeringen/index.html:450` "De Bresser Verhuizingen B.V. … Eurovergunning 2357 bij de NIWO · geldig tot 19 november 2030" | **bevestigd**, niet via debresser.nl | NIWO-register (https://ondernemersloket.niwo.nl/home/publicatie/zoek-vergunninghouders-2), geraadpleegd 25-08-2026 volgens `onderzoek/04` §2.8 en `onderzoek/bronnen.md`: vergunning 2357, 19-11-2025 tot 19-11-2030, 22 vergunningbewijzen, Herastraat 9 Tilburg. debresser.nl noemt de NIWO en de Eurovergunning nergens. Op 24-09 niet opnieuw opgevraagd (zoeken kan alleen op KvK- of NIWO-nummer). |
| 5 | `certificeringen/index.html:367` ISO 9001 en 14001, `:396` VCA**, `:423` CO2-Prestatieladder niveau 3, telkens "onze vestiging valt hieronder via De Bresser"; `duurzaamheid/index.html:334` hetzelfde voor de CO2-ladder | **onbevestigd** | debresser.nl claimt geen ISO en geen CO2-ladder. Wel: /meubelmontage/ "Met VCA-certificering en NEN-certificering" (voor de handymans), en /over-ons/ zegt dat een KAM-coördinator "verantwoordelijk [is] voor ISO, OEV en EPV Certificering". Het CO2-certificaat 04189734 staat op Top Movers Nederland B.V. (`site/_werk/BEELDREGELS.md` regel 2). Welke vestigingen van De Bresser op de ISO-, VCA- en CO2-certificaten staan, is niet vastgesteld. Voor een De Bresser-site moet De Bresser dat opgeven (claims-register C6). |
| 6 | `duurzaamheid/index.html:352-355` "36 procent minder afval … 2025 ten opzichte van 2024", "Ruim 15 procent elektrisch … drie voertuigen", "35.000 dozen bespaard", "Zes hubs in Nederland en België" | **bevestigd** | https://www.debresser.nl/duurzaam-verhuizen/ zegt dit letterlijk. Kleine afwijking: de site zegt "waardoor leveringen gebundeld kunnen worden", De Bresser zegt "steeds meer leveringen decentraal, wat zorgt voor kortere transportafstanden". Liever de woorden van De Bresser. |
| 7 | Footer en voetpagina's: KvK 18014730, btw NL0055.15.452.B.01 | **bevestigd** | Footer van debresser.nl: "Copyright © 2025 De Bresser B.V. \| KVK 18014730 \| BTW NL0055.15.452.B.01". De naam wijkt af, zie kanttekening 4. |
| 8 | `/privacybeleid/` en `/disclaimer/`: verwerkingsverantwoordelijke "De Bresser Verhuizingen B.V., Herastraat 9, 5047 TX Tilburg, KvK 18014730" | **bevestigd** | https://www.debresser.nl/privacyverklaring/ geeft dezelfde gegevens, plus info@debresser.nl en +31 (0)13 528 23 72. |
| 9 | De Bresser is lid van Erkende Verhuizers en Top Movers (diverse pagina's) | **bevestigd** | https://www.debresser.nl/over-ons/: "De Bresser B.V. is lid van Erkende Verhuizers en Top Movers Nederland". |
| 10 | `over-ons/index.html:365-366` "Tomas Brands, eigenaar van De Kievit Verhuizingen, onderdeel van De Bresser Verhuizingen" | **bevestigd** | https://www.debresser.nl/over-ons/: Tomas Brands, Algemeen Directeur, "heeft in 2011 de aandelen van de 3e generatie van familie de Bresser overgenomen". In een De Bresser-site wordt dit "Algemeen Directeur van De Bresser". |
| 11 | Adres Venlo "Van Coehoornstraat 11, 5916 PH Venlo", 077 - 32 32 100 | **bevestigd** | https://www.debresser.nl/contact/ geeft "Coehoornstraat 11, 5916 PH Venlo, T +31(0)77 32 32 100", zonder "Van". debresser.nl noemt de naam De Kievit nergens. |
| 12 | Reactietermijn "binnen 24 uur contact" (`contact/index.html:235` en andere pagina's) | **bevestigd** voor De Bresser | https://www.debresser.nl/contact/: "wij helpen u binnen 24 uur". Dit sluit open punt 6. |
| 13 | `/algemene-voorwaarden/`: AVVV, AVVV-BE, AVBV, AVHD, PV05 2025 en AVB 2020, met de bedragen en termijnen | **bevestigd** | De footer-PDF's van debresser.nl (sectie 1). Nagelezen clausules: NL-dekking ≥ 100.000 op nieuwwaarde; 40%-dagwaarderegel; lijfsieraden 5.000 in NL en 20% in Europa; "zaken bestemd voor handels- en beroepsdoeleinden" maximaal 25.000 per gebeurtenis; opslag verzekerd 12 maanden in NL en 30 dagen in Europa; AVBV art. 17 schade (direct of binnen 14 dagen); AVBV art. 18 aansprakelijkheid 23.000 per overeenkomst; eigen verzekering 14 dagen vooraf melden; betaling contant of pin "tenzij", anders 14 dagen na factuur; annulering 15/50/75/100%; AVB 2020: 50.000 per wagenzending en per verhuizing binnen een gebouw, CMR 8 1/3 SDR, schriftelijk voorbehoud binnen 1 week, aparte verzekering op verzoek (art. 5 lid 12). |
| 14 | `/algemene-voorwaarden/` bevat alleen de sets van Erkende Verhuizers | **ontbreekt** voor een De Bresser-site | De Bresser voert ook AVC 2002, LSV 2014, CMR en de Nederlandse Opslagvoorwaarden (zakelijke opslag). Die vier horen erbij zodra de site De Bresser is. |
| 15 | `veelgestelde-vragen/index.html:399` "wij verzorgen ook archiefverhuizing en archiefopslag" | **ontbreekt** | De site zegt niet onder welke voorwaarden archiefopslag valt. De AVBV dekt "verhuisgoederen" (inventaris die al in gebruik is). Voor "opslag zakelijk" gebruikt De Bresser de Nederlandse Opslagvoorwaarden (footer-PDF). |
| 16 | `over-ons/index.html:398` "Ruim honderd kilometer verderop" (Oisterwijk tot Venlo) | **onbevestigd** | Hemelsbreed ongeveer 72 km, over de weg ongeveer 95 tot 105 km. Grensgeval. Vervalt waarschijnlijk in een De Bresser-site. |
| 17 | Offerteknoppen in `site/`: `btn btn--goud btn--groen` (o.a. `index.html`, 6 keer) is Top Movers-geel `#FFD500` met donkere tekst; `#c-naar-offerte` (`btn--goud`) is teal `#00A19B` | **fout** volgens de nieuwe huisregel | Regel van de gebruiker, 24-09-2026: "make sure that the offerte button is always green." Specificatie in het merkboek: `#7BD534`, navy tekst, rand `#166909`. De klasse heet al `btn--groen`, maar is geel (`--oranje:#FFD500` in `assets/css/style.css`). |
| 18 | Reviews: 9,4 uit 779 op Klantenvertellen, profiel 1034282 (`index.html:152`, `:250`) | **ontbreekt** voor een De Bresser-site | Dit is het profiel van De Kievit. De Bresser toont op zijn homepage eigen Klantenvertellen-badges: Erkende Verhuizers 9 en EPV 8,3. Dat is afgelezen van de schermafdruk, met een peildatum september 2026. Voor een De Bresser-site eerst het profiel van De Bresser live peilen. |
| 19 | Open punt 7: opname aan huis door "onze verhuisadviseur" | **bevestigd** als werkwijze van De Bresser | https://www.debresser.nl/verhuisbedrijf-venlo/ noemt drie mogelijkheden: telefonisch (dan "een prijs per uur"), een rondleiding per videocall, of een adviseur aan huis. |

### Offerteknop op debresser.nl zelf (huisregel "altijd groen")

Gemeten met de berekende stijl in Chrome en uit de widget-CSS van elke pagina. **Fout** volgens de huisregel, behalve de laatste regel.

| Waar | Kleur nu | Bron |
|---|---|---|
| Header, knop "Offerte", op alle 114 pagina's | lichtblauw `#33BCFA`, witte tekst, hover navy `#020D41` | `post-4462.css`, widget d0503fb |
| Homepage, "offerte aanvragen" | `#33BCFA`, wit, hover groen `#7BD534` | `post-4261.css`, widget 10719e6 |
| "Offerte aanvragen" op 100-jarig-jubileum, assetmanagement (+ 4 subpagina's), gebouwbeheer (+ 3 subpagina's), opslag, verhuizen | `#33BCFA`, wit, hover navy | `post-3988`, `5244`, `5372-5378`, `5164`, `5206`, `5275`, `5281`, `6286`, `4650` .css |
| "Offerte aanvragen" op kantoor-verhuizen (2×), opslagruimte-breda (2×), opslagruimte-den-bosch (2×), verhuisbedrijf-belgie | al groen `#7BD534`, maar met **witte** tekst (1,8 : 1, haalt WCAG AA niet) | berekende stijl; de knoppen vallen terug op de kit-kleur |

---

## 3. Feiten voor de De Bresser-site

Alles hieronder komt van debresser.nl, op 24-09-2026 gelezen uit de opgeslagen pagina's. Claims van De Bresser zelf zijn als zodanig gemarkeerd.

**Bedrijf**
- Namen: "De Bresser B.V." (footer en /contact/), "De Bresser Verhuizingen B.V." (/privacyverklaring/, KvK). KvK 18014730, btw NL0055.15.452.B.01. Zie kanttekening 4.
- Hoofdadres: Herastraat 9, 5047 TX Tilburg (/privacyverklaring/).
- Algemeen: +31 (0)13 52 82 372, info@debresser.nl (header op elke pagina).
- Leiding: "De Bresser wordt geleid door Tomas en Ineke Brands". Tomas is Algemeen Directeur (/over-ons/).
- Team: 18 mensen op kantoor, plus "± 80 mensen in onze magazijnen en onderweg" (/over-ons/).
- Lid van Erkende Verhuizers en Top Movers Nederland (/over-ons/).
- Kernbelofte: "altijd gaan voor 100% tevreden klanten. Daarom is bij ons altijd afspraak = afspraak en staat eerlijkheid voorop" (/over-ons/).
- Payoff: "Erkende verhuizers & uw partner in full service logistiek"; logoregels "Full service in logistiek, geweldig in verhuizen" (homepage). Zie kanttekening 1.
- Omvang: "jaarlijks ruim drieduizend verhuizingen in binnen- en buitenland" (/100-jarig-jubileum/, stand 2023; claim De Bresser).

**Geschiedenis** (https://www.debresser.nl/100-jarig-jubileum/)
- 1923: Cis de Bresser richt het bedrijf op als vervoersbedrijf, John. Lenartzstraat, Oisterwijk. /over-ons/ spelt het "Joh. Lenartzstraat".
- 1951: zoon Jan de Bresser zet het voort als vervoers- en verhuisbedrijf.
- 1983: Jan en Nico de Bresser nemen het over (derde generatie).
- 1995: overname Horsten en Van Disseldorp in Tilburg; tweede vestiging en containerloods op de Vossenberg.
- 2009: eerste tentbed vervoerd.
- 2011: Tomas Brands neemt het bedrijf over van "de derde en laatste generatie".
- 2015: wasserij voor medische hulpmiddelen in Oisterwijk.
- 2017: overname Stoof Verhuizingen, Breda (derde vestiging).
- 2020: label Ontzorgd Verhuizen voor seniorenverhuizingen.
- 2022: logistieke hubs Zwolle en Alphen aan de Rijn.
- 2023: logistieke hub Brussel; 100-jarig jubileum.
- 19-11-2025: Brocken Verhuizingen (Tilburg, seniorenverhuizingen) wordt onderdeel van De Bresser (https://www.debresser.nl/2025/11/19/de-bresser-verwelkomt-brocken-verhuizingen/).
- 1 juni 2024, overname De Kievit: staat **niet** op debresser.nl. Bron is `onderzoek/07`.

**Vestigingen** (https://www.debresser.nl/contact/)

| Plaats | Adres | Telefoon |
|---|---|---|
| Tilburg | Herastraat 9, 5047 TX Tilburg | +31 (0)13 54 25 935 |
| Oisterwijk | Schijfstraat 13, 5061 KA Oisterwijk | +31 (0)13 52 82 372 |
| Oisterwijk | Luxemburgstraat 7, 5061 JW Oisterwijk (alleen in de tweede lijst) | +31 (0)13 52 82 372 |
| Breda | Mijkenbroek 46, 4824 AC Breda | +31 (0)76 52 24 100 |
| Venlo | Coehoornstraat 11, 5916 PH Venlo | +31 (0)77 32 32 100 |
| Reeuwijk | Edisonstraat 1A-B, 2811 EM Reeuwijk | eerste lijst geen, tweede lijst +31 (0)13 54 25 935 |
| Brussel | Bazellaan 8, 1140 Evere, België | eerste lijst +31 (0)13 52 82 372, tweede lijst +32 (0)26 – 701894 |

**Diensten** (hoofdmenu, elke pagina)
- Verhuizen: zakelijk, particulier, internationaal, zorgverhuizing, duurzaam verhuizen.
- Opslag: zakelijk, particulier, DIY-opslag.
- Meubelprojecten: meubeltransport, veilingen, montageservice.
- Gebouwbeheer: onderhoud, verduurzamen, huismeester.
- Assetmanagement: inventarisatie, WMS en Meubelpaspoort, opslag assets, inkoop en verkoop assets, circulair meubilair.
- Duurzame werkomgeving, gemarkeerd "Nieuw!".
- Stadspagina's in Brabant, Limburg, Zuid-Holland en België, waaronder /verhuisbedrijf-venlo/.
- Seniorenverhuizing: "samen met Ontzorgd Verhuizen" (https://www.debresser.nl/senioren-verhuizen/). Ineke Brands heeft "haar eigen bedrijf Ontzorgd Verhuizen Noord-Brabant" (/over-ons/).
- Werkwijze offerte: telefonisch (prijs per uur), videocall of adviseur aan huis (/verhuisbedrijf-venlo/). Reactie "binnen 24 uur" (/contact/).

**Duurzaamheid 2025** (https://www.debresser.nl/duurzaam-verhuizen/; claims van De Bresser)
- 36% minder afval in 2025 ten opzichte van 2024.
- 3 extra elektrische voertuigen; ruim 15% van het wagenpark is elektrisch.
- 35.000 verhuisdozen bespaard. De kartonnen dozen zijn "voor 100% gemaakt van gerecycled materiaal".
- "Vanuit onze 6 hubs in Nederland en België … steeds meer leveringen decentraal, wat zorgt voor kortere transportafstanden".
- Textiel en huisraad krijgen een tweede leven met partner Tex.nl.
- 17 goede doelen en maatschappelijke initiatieven gesteund.
- CO₂-compensatie: bosherstelprojecten en duurzame energie-initiatieven.
- Homepage: "Circulaire Hub, verspreid over 7.000 m²"; met duurzaam meubilair "CO2-uitstoot met 40 tot 90% verminderen".
- Voertuigen met "100% elektrisch" op de belettering (foto `de-kievit-nl/fotos/2024-04_Gebouwenbeheer-De-Bresser.jpg`).

**Voorwaarden**: de zes footer-PDF's uit sectie 1.

**Huisstijl**: zie `brandbook-de-bresser.html` in deze map.

---

## 4. Kanttekeningen (gezien, niet opgelost)

1. Het logo en de payoff zeggen nog "Full service in logistiek", terwijl de logistieke tak volgens `onderzoek/07` in september 2024 is verkocht. Het is De Bressers keuze; wij passen het logo niet aan.
2. "6 hubs" komt overeen met de zes plaatsen op /contact/ (Tilburg, Oisterwijk, Breda, Venlo, Reeuwijk, Brussel). Dat is een interpretatie. De logistieke hubs in Zwolle en Alphen aan de Rijn uit 2022 staan niet meer op /contact/.
3. debresser.nl /verhuisbedrijf-venlo/ presenteert De Bresser als verhuizer in Venlo, met het 013-nummer, en noemt De Kievit nergens. Dat past bij de nieuwe richting.
4. De footer van debresser.nl zegt "De Bresser B.V."; de privacyverklaring en het register zeggen "De Bresser Verhuizingen B.V.". Het is één KvK-nummer. De Bresser moet kiezen welke naam in de footer staat (`onderzoek/07`, vraag 2).
5. `site/_werk/BEELDREGELS.md` regel 4 zegt dat de acht beloftes op naam van Tomas Brands door de klant geaccordeerd moeten worden en "staat op de open-punten-lijst". Dat punt staat **niet** in `site/_werk/open-punten.md`.
6. De twee verouderde voorwaarden-PDF's (2015 en 2009) staan nog in de media-bibliotheek van debresser.nl en zijn met een directe URL op te vragen.
7. Werkkleding op alle foto's draagt het Top Movers-logo, niet het De Bresser-logo (merkboek, sectie Kleding).
8. Op de wagens staan alleen Oisterwijk, Tilburg en Breda. Breda staat daar met 076-8200233, op /contact/ met +31 (0)76 52 24 100.
9. Op /contact/ staan twee lijsten met verschillende nummers: voor Brussel het 013-nummer en +32 (0)26 – 701894, en voor Reeuwijk geen nummer en het Tilburgse nummer.
10. De Bresser zet op de meeste knoppen witte tekst op lichtblauw (2,2 : 1) of op groen (1,8 : 1). Het merkboek adviseert navy tekst.
11. De homepage van De Bresser toont een EPV-badge (8,3), en /over-ons/ noemt EPV-certificering. Voor De Kievit geldt nu "geen EPV" (open punt 15). Voor een De Bresser-site moet opnieuw worden vastgesteld op wiens naam EPV staat (`onderzoek/04`).
12. De Bresser publiceert geen vectorlogo en geen belettering- of kledingspecificatie. Voor wagens en kleding moet het vectorbestand bij De Bresser worden opgevraagd.
