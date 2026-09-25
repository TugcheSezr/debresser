# 01. Organisatie voor Erkende Verhuizers (OEV) en het keurmerk Erkende Verhuizers

Leesrapport op basis van lokale bronbestanden (crawl van erkendeverhuizers.nl op 25-08-2026 plus zes OEV-documenten). Geen webraadpleging nodig geweest; alle pagina's waren leesbaar. Bedoeld als feitenbasis voor de nieuwe website van De Kievit Verhuizingen (Venlo, Erkende Verhuizer, lid van Top Movers).

## Bronverwijzingen (legenda)

- `EV/<pad>` = tekstpagina `S/ev_pages/<pad>.txt` van `https://www.erkendeverhuizers.nl/<pad>/`. `home` is de homepage; een dubbele underscore in de bestandsnaam staat voor een slash in het URL-pad (bijv. `EV/waarom-erkende-verhuizer__codekamer-verhuizen` = `/waarom-erkende-verhuizer/codekamer-verhuizen/`).
- `home.html (footer/header)` = de ruwe HTML `S/ev_pages/home.html`; de footer en header worden door het conversiescript weggeknipt en zijn apart uitgelezen.
- `REGL art. x.y.z` = `S/txt/oev_Erkenningsreglement-Erkende-Verhuizers-2024-versie-1.4-19-09-2023.txt`, aangehaald als "Erkenningsreglement EV 2024" (versie 1.4 van 19-09-2023).
- `SVV lid n` = `S/txt/oev_Standaard-verzekeringsverklaring-Erkende-Verhuizers-digitaal-versie-17-9-2024.txt`.
- `INFOG` = `S/txt/oev_Infographic_Codekamer_2.0.txt`.
- `CODE, <hoofdstuk>` = `S/txt/oev_code_verantwoordelijk_marktgedrag.txt`.
- `BEUNHAAS` = `S/txt/oev_Hoe-herkent-u-een-Erkende-Verhuizer-van-een-beunhaas_.txt`.
- `CHECKLIST` = `S/txt/oev_Checklist-Verhuizen-2025-NL.txt`.

Let op: de site verwijst op meerdere plekken naar een "Reglement Erkende Verhuizers 2026 (v.8-12-2025, incl overzicht wijzigingen)" [EV/erkende-verhuizer-worden] en "Erkenningsreglement 2026" [EV/hoe-wordt-u-erkende-verhuizer; EV/voorbereiden-op-uw-erkenning], maar de PDF-link achter die tekst gaat naar het bestand `Erkenningsreglement-Erkende-Verhuizers-2024-versie-1.4-19-09-2023.pdf` [EV/erkende-verhuizer-worden, PDF-LINKS]. Sectie 3 is dus gebaseerd op de 2024-versie; de wijzigingen voor 2026 staan niet in de bronnen (zie sectie 10).

---

## 1. De organisatie

### Naam, rechtsvorm, adres, contact

- Naam: "Organisatie voor Erkende Verhuizers", afgekort OEV. Eigen typering: "de branchevereniging voor de Nederlandse verhuisbranche en schemabeheerder van de branchekeurmerken Erkende Verhuizers (EV) en Erkende Projectverhuizers (EPV)" [EV/contact; home.html footer]. Elders: "de brancheorganisatie voor de Nederlandse verhuisbranche" [EV/over-de-organisatie-voor-erkende-verhuizers].
- Rechtsvorm: vereniging zonder winstoogmerk. Letterlijk: "De vereniging Organisatie voor Erkende Verhuizers (OEV) is de brancheorganisatie voor de Nederlandse verhuisbranche. De OEV heeft geen winstoogmerk." [EV/exposanten]. Het reglement noemt de erkenningsregeling die "van SAVAM, de Organisatie voor Erkende Verhuizers" [REGL art. 1.1]; de advertentieverkoop van het vakblad loopt via "Savamproducts" [EV/vakblad-verhuizen]. Wat SAVAM precies is (vroegere naam, handelsnaam of aparte entiteit) staat nergens uitgelegd.
- Bezoek-/postadres: Bredewater 26, 2715 CA Zoetermeer [EV/contact; EV/privacy; home.html footer].
- Telefoon: 070-3401788 [EV/contact; home.html footer]. Op de exposantenpagina staat 070-3401780 [EV/exposanten]; op de pagina over rechtsvormwijziging staat "079-3401788" [EV/rechtsvormwijziging-of-overname]. Het hoofdnummer is 070-3401788 (contactpagina en footer).
- E-mail: info@erkendeverhuizers.nl [EV/contact; EV/vakblad-verhuizen; EV/marktdossier-verhuisbranche]. Voor exposanten/sponsoring: ryanne@erkendeverhuizers.nl [EV/exposanten].
- KvK 40413355, btw-nummer NL804884870B01 [EV/contact; home.html footer].
- Websites en platforms: "erkendeverhuizers.nl is de offertesite van de Erkende Verhuizers. Verhuizen.nl is het internetplatform van de Erkende Verhuizers, technisch klaar voor de toekomst." [EV/erkende-verhuizer-worden, punt 4]. Ledensite: mijnerkendeverhuizers.nl, met login voor medewerkers van lidbedrijven en toegang tot "het inhuurplatform" [EV/privacy]. Voor EPV bestaat erkendeprojectverhuizers.nl (de Engelse AVB-download verwijst daarheen) [EV/algemene-voorwaarden, PDF-LINKS].
- Verwerkingsverantwoordelijke AVG: "De Organisatie voor Erkende Verhuizers, Bredewater 26 in Zoetermeer"; privacybeleid laatst geactualiseerd 23 mei 2018; online marketing bureau: Tree Online [EV/privacy].

### Oprichting en geschiedenis

- Een oprichtingsjaar staat niet in de bronnen. De site doet drie verschillende leeftijdsclaims:
  - "de Organisatie voor Erkende Verhuizers is al meer dan 60 jaar dé brancheorganisatie voor verhuisbedrijven in Nederland" [EV/verschil-erkende-verhuizers-nkev, punt 1];
  - "In meer dan 55 jaar hebben Erkende Verhuizers samen enkele miljoenen verhuizingen uitgevoerd." [EV/waarom-erkende-verhuizer__vertrouwd-verhuizen];
  - "het merk Erkende Verhuizers, dat in de afgelopen ruim 50 jaar is opgebouwd en uitgegroeid tot een sterk merk" [EV/hoe-wordt-u-erkende-verhuizer].
  De verschillen komen vermoedelijk door de ouderdom van de pagina's; de nieuwste formulering (NKEV-pagina) zegt "meer dan 60 jaar".
- Keurmerk EPV: "Voor grootschalige, risicovolle en complexe verhuizingen van kantoren, bedrijven en instellingen heeft de verhuisbranche in 1999 het keurmerk Erkende Projectverhuizers (EPV) ingesteld, met specifieke kwaliteitseisen." [EV/waarom-erkende-verhuizer__veelzijdig-verhuizen__bedrijfsverhuizing].
- Historische verhalen over leden staan in het nieuwsoverzicht (o.a. "Bots-Ras Verhuizingen viert 100 jaar", "Familiebedrijf Jan van Duuren & Zn, ruim 120 jaar expertise", "Samenwerkingsverband Mondial Movers, al 35 jaar") [EV/nieuws].

### Bestuur, directie, bureau en organen

Namen van bestuurders of een directeur staan niet in de bronnen. Wel worden deze organen genoemd:

- Algemene Vergadering (ALV): stelt jaarlijks de hoogte van de contributie vast [REGL art. 3.11.b]. De ALV 2026 vond plaats op 16 juni 2026 op Slot Loevestein, met exposanten en sponsors [EV/exposanten].
- Algemeen Bestuur: kan het reglement wijzigen [REGL art. 4.d]; is beroepsinstantie tegen besluiten van het CBO [REGL art. 3.4.d] en bij ongegrondverklaring van bezwaren [REGL art. 3.2.e]; stelt de lijst van erkende opleidingen vast [REGL art. 2.4.h, toelichting].
- CBO (Certificatie Besluitvormingsorgaan): "besluit over verlening, verlenging en intrekking van de erkenning" [REGL art. 3.1.a].
- Vakafdelingen: "De Organisatie voor Erkende Verhuizers is de brancheorganisatie voor de Nederlandse verhuisbranche en heeft twee vakafdelingen: Inboedel (Erkende Verhuizers) en EPV (Erkende Projectverhuizers)." [EV/marktdossier-verhuisbranche]. Lidmaatschap van minimaal één vakafdeling is vereist; een vakafdeling kan aanvullende eisen stellen in een vakafdelingsreglement [REGL art. 3.11.a]. Het vakafdelingsbestuur benoemt of wijst de geschilleninstantie aan [REGL art. 3.7.c].
- Bureau van de OEV: ontvangt aanvragen [REGL art. 3.2.a], verstrekt vakafdelingsreglementen [REGL art. 3.11.a], geeft toestemming voor nevennamen [REGL art. 3.9.d].
- Leden kunnen actief zijn "in besturen, commissies of werkgroepen" [EV/privacy].
- Onafhankelijke toetsing: "Bij Erkende Verhuizers worden bedrijven streng getoetst door onafhankelijke certificeringsinstelling KIWA" en "de audit [wordt] volledig onafhankelijk uitgevoerd door een certificerende instelling via KIWA" [EV/verschil-erkende-verhuizers-nkev, punt 3 en 6]. Het reglement 2024 noemt KIWA niet; het spreekt van een bedrijfsbezoek "door of namens het CBO" [REGL art. 3.3.a].

### Ledenaantal, vestigingen, KTO-cijfer

- Ledenregister: "197 leden" [EV/ledenregister], stand 25-08-2026. Het register toont per lid: KTO-cijfer, adres, provincie, KvK-nummer, telefoon, e-mail, website en waar van toepassing het label "Erkende Projectverhuizer" [EV/ledenregister].
- Locatie-overzicht: keuzelijst van gemeenten waar Erkende Verhuizers actief zijn, van Aalsmeer tot Zwijndrecht (ruim 270 gemeenten, waaronder Venlo, Venray, Roermond, Weert en Nederweert) [EV/locatie-overzicht]. Een aantal vestigingen als getal staat nergens.
- Klantwaardering: "9.5" met "12.256 beoordelingen in de laatste 12 maanden" [home.html footer]; "Klanten beoordelen ons met een 9.5!" [home.html header]. Op de verhuisservicepagina: "onafhankelijk gemeten klanttevredenheidsscore gemiddeld 9,4" [EV/verhuisservice].
- Marktcontext: 1.892 verhuisbedrijven in 2020; de grootste samenwerkingsverbanden zijn Top Movers, Mondial Movers, UTS en Euromovers [EV/marktdossier-verhuisbranche]. In het ledenregister en de homepagereviews komen namen voor als "Holwerda Top Movers", "Mondial ..." en "UTS ..." [EV/ledenregister; EV/home].

### Relatie met TLN en andere koepels/partners

- Werkingssfeer: erkenning is alleen mogelijk voor "verhuisondernemingen of netwerken van bedrijven, natuurlijke of rechtspersonen, die lid zijn van een werkgeversorganisatie in het beroepsgoederenvervoer of de logistieke dienstverlening" [REGL art. 1.2].
- Bij een rechtsvormwijziging noemt de OEV als vereiste onder meer "Een nieuw lidmaatschap van TLN." [EV/rechtsvormwijziging-of-overname]. In de praktijk is TLN dus de bedoelde werkgeversorganisatie.
- Belangenbehartiging: "Zowel in Den Haag als Brussel wordt u vertegenwoordigd. De Organisatie voor Erkende Verhuizers zit geregeld met diverse instanties om mee te praten over onderwerpen die voor de verhuisbranche van belang zijn." [EV/erkende-verhuizer-worden, punt 9].
- Vaste partners die de bronnen noemen:
  - Stichting De Geschillencommissie: de Toetsingscommissie toetst de algemene voorwaarden "aan nationale en internationale wet- en regelgeving en de rechtspraak" [EV/algemene-voorwaarden]; de Geschillencommissie Verhuizen behandelt geschillen [EV/over-de-organisatie-voor-erkende-verhuizers].
  - Klantenvertellen: voert de online klantbeoordelingen onafhankelijk uit [EV/over-de-organisatie-voor-erkende-verhuizers].
  - Verhuiscollege: "vakopleidingen, via opleider Verhuiscollege" [EV/over-de-organisatie-voor-erkende-verhuizers]; verhuiscollege.nl [EV/ik-word-verhuizer].
  - Schouten Zekerheid: "assurantiemakelaar Schouten Zekerheid, de uitvoerder van deze certificaten" (Garantiecertificaat) [EV/evenementen; EV/aanmaken-garantiecertificaten].
  - Stichting Code Verantwoordelijk Marktgedrag en de Codekamer Verhuizen [EV/waarom-erkende-verhuizer__codekamer-verhuizen].
  - Consumentenbond en SER: de verzekeringsverklaring spreekt van bescherming "op de manier die het OEV met de Consumentenbond heeft bedoeld en is overeengekomen in de Algemene Voorwaarden binnen de SER" [SVV, voorwoord].
  - De Verhuisfamilie (verhuisfamilie.nl): vrijwilligers en Erkende Verhuizers verhuizen mensen die "én arm en eenzaam" zijn [EV/waarom-erkende-verhuizer__maatschappelijke-inzet].
  - Overheid en handhavers: "In 2020 zijn de Min SZW, Inspectie SZW, Inspectie Leefomgeving en Transport, pensioenfonds, vakbonden en stichting VNB (cao-politie) op initiatief van branche Organisatie voor Erkende Verhuizers en de Codekamer Verhuizen daarom gestart met gezamenlijk onderzoek, handhaving en een voorlichtingscampagne in de verhuisbranche" [EV/marktdossier-verhuisbranche].
  - SOOB (subsidie op opleidingen) en Code 95 [EV/erkende-verhuizer-worden, punt 2].

### Keurmerken die de OEV beheert

- Erkende Verhuizers (EV): "Woord- en beeldmerk Erkende Verhuizers en Garantiecertificaat Erkende Verhuizers zijn op naam van de OEV geregistreerd bij het Benelux Merkenbureau." [REGL art. 3.10.c]. "U herkent Erkende Verhuizers aan dat beschermde woord-/beeldmerk." [EV/verhuizen-met-vakman-of-beunhaas].
- Erkende Projectverhuizers (EPV): ingesteld in 1999 [EV/...__bedrijfsverhuizing]; "hanteren aanvullende kwaliteitseisen gericht op onder meer veiligheid en integriteit, kwaliteit en het vakmanschap van de certificaathouders en de verdere ontwikkeling daarvan" [EV/marktdossier-verhuisbranche].
- Door de OEV erkende diploma's: Inboedelverhuizer, Voorman Inboedelverhuizer, Projectverhuizer, Voorman Projectverhuizer, Projectleider Projectverhuizer [REGL art. 2.4.g] en het handymandiploma [REGL art. 2.4.d].
- Beschermde voorwaarden: "Alleen Erkende Verhuizers mogen de beschermde Algemene voorwaarden (AVVV/AVBV) gebruiken." [EV/verhuizen-met-vakman-of-beunhaas].

### Campagnes

- "Zeker bij Erkende Verhuizers": de huidige campagne. Campagnepagina met downloads voor leden: campagnebeelden, behind the scenes, fotoshoot, logo, bedrukkingen (voorbeeld), roll-up banners (8 stuks), checklist NL-versie en UK-version [EV/campagne]. De pay-off komt terug op de homepage ("Zeker bij Erkende Verhuizers") [EV/home] en in "Zo hoort het, vinden wij. Zeker bij Erkende Verhuizers." [EV/waarom-erkende-verhuizer].
- "3 miljoenste verhuizing": op elke pagina staat de oproep "Word jij onze 3 miljoenste verhuizing? Vraag vandaag nog een gratis offerte aan. Wie weet ben jij de gelukkige!" [EV/home en alle andere EV-pagina's]. Mechaniek, looptijd of prijs staan nergens beschreven.
- Tom: "Tom's Erkende Verhuistips", een videoreeks van "Erkende Verhuizer Tom" met drie afleveringen: "5 onmisbare zaken die je moet regelen in de weken voor je verhuizing", "5 tips om de beste verhuizer te vinden" en "7 tips om je verhuizing soepel te laten verlopen" [EV/verhuistips-van-tom en de drie subpagina's]. Over wie Tom is (naam, bedrijf) staat niets.
- "Verhuizen is leuk!": positieve-framing pagina ("Verhuizen is een feest") [EV/verhuizen-is-leuk; EV/verhuistips-van-tom].
- Arbeidsmarktcampagne "Werken bij een Erkende Verhuizer": "De mooie en veelzijdige verhuisbranche zit te schreeuwen om nieuwe medewerkers", met portretten van Frits (inboedelverhuizer), Luandi (projectverhuizer) en voorman Romano [EV/ik-word-verhuizer].
- "Campagne Eerlijk, veilig en gezond werken in de verhuisbranche" (link op de Codekamerpagina) [EV/waarom-erkende-verhuizer__codekamer-verhuizen].
- Naamsbekendheid: "Circa 83% van de consumenten is bekend met het keurmerk Erkende Verhuizers." [EV/erkende-verhuizer-worden, punt 3].
- Collectieve promotie: "Met collectieve promotie brengt de organisatie de voordelen voor de klant van de keuze voor een Erkende Verhuizer in beeld." [EV/over-de-organisatie-voor-erkende-verhuizers].

### Vakblad

- Titel "Verhuizen", "Vakblad van de Nederlandse verhuisbranche". Verschijnt zesmaal per jaar. "Een niet-leden abonnement binnen NL kost € 144,00 (2026)." Redactie en abonnementen: OEV (info@erkendeverhuizers.nl); adverteren: Savamproducts (advertentieverkoop@savamproducts.nl) [EV/vakblad-verhuizen].
- Het vakblad is ook het officiële publicatiekanaal: erkenningsaanvragen worden er gepubliceerd (30 dagen bezwaartermijn) [REGL art. 3.2.c] en meldingen van naams- of structuurwijzigingen ook [REGL art. 3.6.b]. "De nieuwe erkenning moet eerst gepubliceerd worden in het vakblad Verhuizen. Dit duurt gemiddeld 2 maanden." [EV/rechtsvormwijziging-of-overname].
- Leden: "Tegen een kleine vergoeding sluit u een abonnement af op vakblad Verhuizen." [EV/erkende-verhuizer-worden, punt 6].

### Evenementen (voor leden)

Alle uit [EV/evenementen], tenzij anders vermeld:

- 17 september 2026, 10:00: "Online vragenuur Garantiecertificaat" via MS Teams, met experts van Schouten Zekerheid en de OEV; "bij uitstek bedoeld voor uw medewerkers die dagelijks met verzekeringen en algemene voorwaarden werken".
- 21 september 2026: "Erkende Verhuizers Verzekeringsdag 2026" in KEEP!, Alphen aan den Rijn (onderkomen van Helicon Conservation Support), met 's ochtends "Het landelijke binnendienstoverleg" en "De landelijke plannerstafel" en 's middags een inhoudelijk programma.
- Regiobijeenkomsten najaar 2026: Halfweg bij Mondial Aad de Wit Verhuizingen (30-9), Kolham bij Mondial Oostland Verhuizingen (1-10), Vught bij Eduard Strang Verhuizingen (5-10), Den Hoorn bij SG Verpakkingen (8-10).
- Kosten: "Uw deelname als lid is kosteloos, maar bij niet afmelden binnen 48 uur voor de bijeenkomst hanteren wij een no-show fee van € 50 p.p."
- ALV 16 juni 2026 op Slot Loevestein, met standhouders en sponsors (zie sectie 9 voor tarieven) [EV/exposanten].
- "KTO evenement": de pagina bestaat, maar bevat geen inhoud [EV/kto-evenement].

### KTO (klanttevredenheidsonderzoek)

- Verplicht en collectief: "neemt elke certificaathouder deel aan het doorlopende collectieve klanttevredenheidsonderzoek van Erkende Verhuizers (KTO EV Erkende Verhuizers), waarvan de uitnodiging geautomatiseerd wordt verzonden na de verhuizing. Dit meet de relevante aspecten van de verhuisopdracht: communicatie, voorbereiding, uitvoering, flexibiliteit, nazorg, financiële afhandeling en open feedback." [REGL art. 2.6.a].
- Publicatieplicht: het lid "maakt de KTO Erkende Verhuizers klantbeoordelingen openbaar benaderbaar via zijn website (met de KTO Erkende Verhuizers widget) en draagt hij er zorg voor dat het KTO EV cijfer dat hij toont in zijn uitingen, actueel is." [REGL art. 2.6.b].
- Uitvoering door Klantenvertellen; "Het klantwaarderingscijfer wordt dagelijks geactualiseerd en transparant weergegeven op deze site." [EV/wat-te-doen-bij-geschil].
- Cijfers: 9.5 op basis van 12.256 beoordelingen in 12 maanden [home.html footer]; gemiddeld 9,4 [EV/verhuisservice].

---

## 2. Wat het keurmerk belooft aan de consument

### De "10 redenen voor een Erkende Verhuizer" (letterlijk) [EV/waarom-erkende-verhuizer]

1. Professionele service: "vriendelijke, ervaren en gediplomeerde vakmensen"
2. Heldere prijsafspraak vooraf: "geen nare verrassing achteraf"
3. Zorgeloos verhuizen: "lage kans op schade (slechts 1,07% schadefrequentie NL, Year to date)"
4. Uitstekend verzekerd: "verhuisgoederen standaard verzekerd tot € 100.000 zonder eigen risico, tussentijdse opslag tot 12 maanden verzekerd"
5. Verhuisgarantie: "je verhuizing gaat ook door bij faillissement of surseance van het verhuisbedrijf"
6. Veilige aanbetaling: "beschermd tot € 1.000 (NL) of € 2.000 (Europa)"
7. Consumentenvoorwaarden: "goedgekeurd door de Toetsingscommissie van de Stichting De Geschillencommissie"
8. Onafhankelijke geschillencommissie: "eerlijke oplossing bij onverhoopte discussie"
9. Nakoming gegarandeerd: "tot € 10.000 bij uitspraak in een geschil"
10. Duurzaam en veilig: "aandacht voor milieu en veiligheid"

Inleidende zin: "Een verhuizing is al spannend genoeg. Met een Erkende Verhuizer kies je voor zekerheid, kwaliteit en gemak." [EV/waarom-erkende-verhuizer].

### Vertrouwd verhuizen [EV/waarom-erkende-verhuizer__vertrouwd-verhuizen]

Kern: "Erkende Verhuizers zijn ervaren vakspecialisten die dit als geen ander snappen. Zij stellen je op je gemak, zijn vriendelijk, geven goed advies en doen hun uiterste best om er een leuke dag van te maken. Vakkundig en discreet gaan zij met jouw spullen om. Deze zijn in vertrouwde handen! In meer dan 55 jaar hebben Erkende Verhuizers samen enkele miljoenen verhuizingen uitgevoerd. Zij staan borg voor ervaring, service en kwaliteit. De stabiel hoge score in klantwaardering getuigt hiervan (onafhankelijk gemeten)."

### Verantwoord verhuizen (garanties) [EV/waarom-erkende-verhuizer__verantwoord-verhuizen-garanties]

- Toetsing: "Erkende Verhuizers voldoen aan kwaliteitseisen op het gebied van kwaliteit, milieu en veiligheid. Hierop wordt regelmatig onafhankelijk getoetst. Ook de klant toetst mee, door middel van het doorlopend, onafhankelijke reviewsysteem van Klantenvertellen."
- Algemene voorwaarden 2025 (AVVV verhuizen, AVBV opslag, AVHD handymandiensten), "Afgesproken met de Toetsingscommissie van de Stichting De Geschillencommissie".
- Garantiecertificaat: "uitgebreide verzekering op basis van nieuwwaarde", "uw aanbetaling is gegarandeerd (tot max. 25%/€ 1.000)", "uw verhuizing binnen NL wordt ook uitgevoerd als uw Erkende Verhuizers onverhoopt failliet gaat".
- CO2-neutraal verhuizen: "verhuist u met Erkende Verhuizers CO2-neutraal ... Wat overblijft compenseren we in twee Gold standard compensatieprojecten: een waterpompproject in Malawi en een project voor efficiënte kachels en verwarming en isolatie voor woningen in Mongolië." (De pagina maatschappelijke inzet noemt "een WNF Gold standard compensatieproject: een cookstove project in Malawi" [EV/waarom-erkende-verhuizer__maatschappelijke-inzet].)
- Geschillencommissie: "Onafhankelijke juristen beoordelen de zaak en doen een uitspraak die voor alle partijen bindend is. De nakoming is gewaarborgd in de Algemene voorwaarden (AVVV)."
- "Alle garanties op een rij" met artikelverwijzing naar de AVVV 2025 (letterlijk):
  - "Uw inboedel is verzekerd tot een bedrag van tenminste € 100.000 op basis van nieuwwaarde tijdens de binnenlandse verhuizing en tussentijdse opslag tot maximaal 12 maanden. Het Garantiecertificaat geldt tevens als verzekeringspolis (4 AVVV 2025);"
  - "uw binnenlandse verhuizing wordt alsnog, met bekwame spoed, door een door de Organisatie voor Erkende Verhuizers aan te wijzen andere Erkende Verhuizer uitgevoerd [als] uw Erkende Verhuizer wegens faillissement of surseance van betaling niet meer in staat is de verhuizing uit te voeren. Gevolgschade is uitgesloten (8 AVVV 2025);"
  - "Uw aanbetaling tot maximaal 25 procent van de overeengekomen verhuisprijs (max. € 1.000 verhuizing binnen NL en € 2.000 verhuizing binnen Europa) is door de Organisatie voor Erkende Verhuizers gegarandeerd, als de verhuizing alsnog door een andere Erkende Verhuizer wordt uitgevoerd. Dit geldt alleen in combinatie met de verhuisgarantie (8 AVVV 2025);"
  - "De Organisatie voor Erkende Verhuizers staat voor binnenlandse verhuizingen naar u als consument garant voor de nakoming van een bindend advies van de Geschillencommissie Verhuizen tot max. € 10.000 per bindend advies (behoudens een gang naar de rechter) (23 AVVV 2025)."

### Veelzijdig verhuizen [EV/waarom-erkende-verhuizer__veelzijdig-verhuizen]

Dienstenlijst: tijdelijke opslag (halen, brengen, opslag), volledig ontzorgde verhuizing, alleen grote of losse stukken, seniorenverhuizing, piano verhuizen, internationale verhuizing (EU, wereld, overzee), bedrijfsverhuizing, vaste opslag (zolderinhoud, winterbanden), leegruimen en bezemschoon opleveren, in- en uitpakwerk "(ook als het pas achteraf blijkt tegen te vallen)", de- en montage van meubels, kleine handymanklusjes, professioneel verhuismateriaal "ook als je zelf gaat verhuizen". Subpagina's: bedrijfsverhuizing (verwijst naar EPV) en internationaal verhuizen ("Meestal is een verhuisbedrijf gespecialiseerd in bepaalde landen") [EV/...__bedrijfsverhuizing; EV/...__internationaal-verhuizen].

### Verhuizen en tijdelijke opslag [EV/waarom-erkende-verhuizer__verhuizen-en-tijdelijke-opslag]

"Laat je een inboedelverhuizing binnen Nederland uitvoeren door een Erkende Verhuizer dan is bij het Garantiecertificaat Erkende Verhuizers NL standaard 12 maanden tussentijdse opslagverzekering inbegrepen, waarbij je inboedel op basis van nieuwwaarde is verzekerd tot max. 100.000 euro." Ook op [EV/verhuisservice]: "standaard 12 maanden tijdelijke opslagverzekering inbegrepen, allrisk verzekerd tot standaard max. € 100.000" en [EV/ledenregister]: "En standaard 12 maanden tussentijdse opslagverzekering inbegrepen."

### Offertes via de site

- Homepage: "Vraag vrijblijvend een offerte aan. Vind de dichtstbijzijnde Erkende Verhuizer (max. 3)". Stappen: "Stap 1: Vul je postcode in", "Stap 2: Vind alle Erkende Verhuizers in de buurt", "Stap 3: Vraag maximaal 3 offertes aan. Eenvoudig, gratis en uiteraard vrijblijvend!" [EV/home].
- "Vind Erkende Verhuizers bij jou in de buurt en vraag direct een vrijblijvende offerte aan (maximaal 3). Binnen 5 minuten ingevuld!" [EV/waarom-erkende-verhuizer; de blogpagina's].
- Voor leden: "Deze leveren jaarlijks duizenden kwalitatief goede verhuisoffertes op [en] er nemen uitsluitend Erkende Verhuizers aan deel. Bovendien is het uurtarief veruit het voordeligste van alle verhuisoffertesites." [EV/erkende-verhuizer-worden, punt 4].
- Privacy: de OEV verwerkt bij een offerteaanvraag "tevens het oude en nieuwe adres" en geeft gegevens alleen door aan aangesloten bedrijven [EV/privacy].

### Reviews en KTO-score

Zie sectie 1 (KTO). Aanvullend de schadecijfers die de site noemt, met drie verschillende waarden:
- "slechts 1,07% schadefrequentie NL, Year to date" [EV/waarom-erkende-verhuizer];
- "een schadepercentage van gemiddeld minder dan 1% (Year to date gemeten, 2022)" [EV/wat-te-doen-bij-verhuisschade];
- "gemiddelde schadefrequentie 0,8%" [EV/verhuisservice].

### Schade en geschil: het stappenplan [EV/wat-te-doen-bij-verhuisschade; EV/wat-te-doen-bij-geschil]

1. "Meld schade zo snel mogelijk bij jouw Erkende Verhuizer (art. 15 AVVV), bij voorkeur schriftelijk of per e-mail (heb je bewijs, zoals foto's, stuur dit dan mee)." Het Garantiecertificaat "is het verzekeringsbewijs". De checklist zegt: "Meld eventuele verhuisschade binnen 14 dagen bij je Erkende Verhuizer" [CHECKLIST, "Na je verhuizing"].
2. Bepaald wordt of een schade-expert nodig is; "De schade-expert rapporteert aan de verzekeraar, deze beslist. Keert de verzekeraar uit, dan vindt uitkering plaats aan de Erkende Verhuizer."
3. "De Erkende Verhuizer keert de schade-uitkering vervolgens binnen een redelijke termijn uit aan de consument." (Reglement: binnen 14 dagen na ontvangst [REGL art. 2.12.d].)
4. Blijft de verhuizer in gebreke: Geschillencommissie Verhuizen, bindend advies. "De Organisatie voor Erkende Verhuizers staat garant voor nakoming van de uitspraak van de Geschillencommissie door de Erkende Verhuizer."
5. Verwezen wordt naar art. 15-18 AVVV en de polisvoorwaarden PV05 (pagina 9-11 van de brochure).

### Verzekering: het verschil met niet-erkende verhuizers [EV/blog__welke-verzekering-afsluiten-verhuizing]

"In het algemeen hanteren verhuizers voorwaarden waarin slechts hun aansprakelijkheid is geregeld volgens de wet. ... de aansprakelijkheid [is] meestal gemaximeerd tot hetgeen in de wet is bepaald, namelijk € 23.000. Bij Erkende Verhuizers ontvang je het Garantiecertificaat Erkende Verhuizers. Hiermee heb je een allrisk goederenverzekering tot een maximumbedrag van € 100.000 op basis van nieuwwaarde (tenzij de dagwaarde 40% of minder dan de nieuwwaarde is). Bovendien biedt het Garantiecertificaat Erkende Verhuizers een verhuisgarantie (je wordt gegarandeerd verhuisd) en een aanbetalingsgarantie." Opslag: "1 jaar opslag bij de Erkende Verhuizer is inbegrepen".

### Overige consumentenbeloften per dienstpagina

- Piano's: kunst/kostbaarhedencertificaat op maat "zonder eigen risico"; "Gedurende de eerste 6 maanden opslag blijft uw piano of vleugel verzekerd onder het kunst/kostbaarhedencertificaat", verlengbaar met 6 maanden; "In de meeste gevallen wordt een verhuislift ingezet en vier tot zes verhuizers" [EV/piano-verhuizen].
- Verhuislift: soorten en bereik (opbouwlift/aanhangwagenlift brandstof tot ca. 25 m, 9e verdieping, 250 kg; elektrisch tot ca. 20 m, 7e verdieping, 250 kg; meubellift/ladderwagen tot ca. 30 m, 12e verdieping, 400 kg; ladderlift tot ca. 15 m, 4e verdieping, 250 kg); kale huur zelfbediening vanaf globaal € 100; met bediening vanaf ruim € 75 per uur [EV/verhuislift-huren].
- Verhuisdozen: tilnorm 23 kg (Arbowet); vuistregel 16-20 dozen per persoon [EV/verhuisdozen].
- Kosten verhuisbedrijf: "Gemiddeld verhuizen consumenten eens in de zeven jaar"; "De gemiddelde inboedelverhuizing is op basis van de statistieken 25 m³" [EV/kosten-verhuisbedrijf].
- Verhuisbus huren: huurprijzen "van iets minder dan vier tientjes tot ruim € 120 per dag"; alternatief "Two man and a truck" via de lokale Erkende Verhuizer [EV/verhuisbus-huren].
- Checklist verhuizen in zes stappen, downloadbaar (NL en UK) [EV/verhuizing-voorbereiden__checklist-verhuizen; CHECKLIST].
- Engelstalig: "Recognised Movers" met "General terms ... Removals, Removal items placed into Storage and ... Handyman services" en checklist [EV/terms-and-conditions].

---

## 3. Erkenningsreglement EV 2024, artikel voor artikel

Bron: REGL (versie 1.4, 19-09-2023, "kan worden aangehaald als Erkenningsreglement EV 2024" [art. 4.e]). Het reglement spreekt over "certificaathouder" (= de Erkende Verhuizer).

### Hoofdstuk 1. Algemeen

- Art. 1.1 Doel: het reglement "maakt deel uit van de erkenningsregeling van SAVAM, de Organisatie voor Erkende Verhuizers" en heeft tot doel: "bieden van gecontroleerde waarborgen aan klanten/opdrachtgevers; versterken van het kwaliteitsimago van de verhuisbranche; behartigen van de belangen van de Erkende Verhuizers ...; bevorderen en herkenbaar maken van de kwaliteit van Erkende Verhuizers en hun dienstverlening."
- Art. 1.2 Werkingssfeer (wie kan lid worden): "verhuisondernemingen of netwerken van bedrijven, natuurlijke of rechtspersonen, die lid zijn van een werkgeversorganisatie in het beroepsgoederenvervoer of de logistieke dienstverlening."

### Hoofdstuk 2. Kwaliteitseisen

Art. 2.1 Naleving van wet- en regelgeving ("Om bonafide ondernemerschap te waarborgen"):
- a. Minimaal twee jaar ingeschreven bij de KvK "met verhuisactiviteiten als bedrijfsomschrijving (met SBI-code 4942 verhuisvervoer als eerste SBI-code). De erkenning is niet overdraagbaar en onlosmakelijk verbonden aan deze inschrijving bij de Kamer van Koophandel."
- b. "bij voortduring in het bezit van een vergunning voor het vervoer van goederen over de weg op grond van de Wet wegvervoer goederen (NIWO), afgegeven op het KvK nummer waarop de erkenning rust." (Een aparte "Eurovergunning" wordt in geen enkele bron genoemd; de site spreekt van "NIWO vergunning" en "WVG-vergunning".)
- c. Belang van naleving van wet- en regelgeving intern kenbaar maken en naleven.
- d. Financiële eis: "Verklaring betalingsgedrag nakoming fiscale verplichtingen van de Belastingdienst (niet ouder dan 3 maanden)", herleidbaar via RSIN of BSN, voor een onderneming die minimaal twee jaar is ingeschreven. "In uitzonderlijke gevallen kan worden volstaan met een verklaring van een accountant"; dan na een jaar alsnog de Belastingdienstverklaring.
- e. Bijzondere situaties voor die verklaring (letterlijke strekking):
  - Nieuw zelfstandig bedrijf onder dezelfde holding: initiële beoordeling, herbeoordeling na één jaar, dan alsnog recente verklaring.
  - Wijziging van rechtsvorm: verklaring van zowel de certificaathouder als de nieuwe onderneming; initiële beoordeling; herbeoordeling na één jaar.
  - Splitsing in nieuwe bedrijven met eigen KvK-nummer: hoeven niet aan d te voldoen "mits het gehele bedrijf onder de erkenningsregeling blijft vallen"; beide initiële beoordeling en herbeoordeling na één jaar.
  - Gebruik van de naam van een failliete certificaathouder voor een nieuwe onderneming onder dezelfde holding: toegestaan mits "geen sprake is van een doorstart" en de eigen naam aan de handelsnaam wordt verbonden.
  - Verkoop van een nevenvestiging aan een bestuurs- of personeelslid: nieuwe onderneming hoeft niet aan d te voldoen, initiële beoordeling, herbeoordeling na één jaar.

Art. 2.2 Zekerheden voor de klant:
- a. Verhuisovereenkomst schriftelijk of elektronisch, "niet mondeling", conform art. 3 lid 2 AVVV 2015 (een door de klant geaccordeerde offerte volstaat).
- b. Meerwerk in de overeenkomst of op een door de klant afgetekende werkbon.
- c. Contractuele aansprakelijkheid voor verhuizingen en bewaarneming verzekerd "met een minimale dekking van € 23.000 per overeenkomst en per inboedel. Het eigen risico voor de certificaathouder mag maximaal € 1.000 bedragen."
- d. Wettelijke aansprakelijkheid: "aansprakelijkheidsverzekering voor bedrijven met een minimale dekking van € 2.500.000 per gebeurtenis."
- e. Laatste versie AVVV op iedere particuliere verhuisovereenkomst van toepassing verklaren en de integrale tekst uiterlijk bij totstandkoming verstrekken (digitaal mag met uitdrukkelijke instemming).
- f. Garantiecertificaat: "vraagt de certificaathouder voor alle door hem met de consument overeengekomen consumentenverhuizingen een Garantiecertificaat Erkende Verhuizers voor de klant aan": binnen Nederland het "Garantiecertificaat Erkende Verhuizers NL"; voor "alle na 31-12-2023 overeengekomen consumentenverhuizingen binnen Europa het Garantiecertificaat Erkende Verhuizers Europa". Het certificaat maakt samen met de verzekeringskaart (IPID) (en voor Europa het addendum op de AVVV) "deel uit van de AVVV en de verhuisovereenkomst".
- g. Laatste versie AVBV op iedere opslagovereenkomst.
- h. Laatste versie AVB (gedeponeerd bij de KvK Den Haag onder de OEV) op iedere bedrijfsverhuizing.

Art. 2.3 Zorgvuldig verhuisproces:
- a. Beschreven kwaliteits-, milieu- en arbobeleid met verbeterdoelen, "getekend door de directeur", jaarlijks geactualiseerd, met nadruk op effectieve klantcommunicatie, bekend bij al het personeel.
- b. Structuur van (minimaal summier genotuleerd) werkoverleg over klantcommunicatie ("inbegrepen vriendelijkheid naar de klant"), herkenbare uitstraling van medewerkers, klachten en herstelmaatregelen, veilig en gezond werken.
- c. Taken, verantwoordelijkheden en bevoegdheden beschreven voor kwaliteitsmanager, verkoopleider, operationeel manager, voorman en verhuizer. "In een klein bedrijf kunnen al deze functies verenigd zijn in de bedrijfsleider/eigenaar".
- d. Kwaliteitssysteem met procedures voor: bereikbaarheid voor klanten; inkoop (specificaties verbruiksgoederen, apparatuur, diensten); apparatuur (onderhoud, toestemming voor werk aan apparatuur, "met name de hijswerktuigen"); afwijkingen (schades/klachten, registratie bij aflevering, verklaring "beëindiging van het werk"); ongeval/incident/mislukte levering; bewaking van de uitvoering; klachtafhandeling.
- e. Alle kwaliteitsdocumenten in een kwaliteitssysteem onder verantwoordelijkheid van de kwaliteitsmanager.

Art. 2.4 Vakbekwaam personeel (geldt voor "eigen personeel/inhuur/0-uren/ZZP"):
- a. "de inpak-, ophaal- en afleveringswerkzaamheden worden uitgevoerd door een team van verhuizers van wie tenminste de helft een door de OEV erkend verhuisdiploma bezit."
- b. Uitvoering "onder leiding van een voorman die in dienst van het bedrijf is en relevante vakopleidingen volgt of heeft gevolgd (door de OEV erkend diploma voorman of vergelijkbaar)."
- c. "alle verhuizers die langer dan twee jaar bij de onderneming in dienst zijn, beschikken minimaal over een door de OEV erkend verhuisdiploma."
- d. Handymandiensten op basis van een handymanovereenkomst alleen door een medewerker met OEV-erkend handymandiploma (niet nodig voor bijv. een schilderij ophangen tijdens de verhuizing).
- e. Aantoonbare opleidingsregistratie per medewerker.
- f. Personeel in de gelegenheid stellen een OEV-erkend verhuisdiploma te behalen.
- g. Erkende diploma's: Inboedelverhuizer, Voorman Inboedelverhuizer, Projectverhuizer, Voorman Projectverhuizer, Projectleider Projectverhuizer.
- h. Nascholing: de onder c bedoelde medewerkers "(tot de leeftijdsgrens van 60 jaar) behalen minimaal eenmaal per vijf jaar een opleiding of cursus die voorkomt op de lijst van door de OEV aangewezen opleidingen". De lijst staat in hoofdstuk 5 (bijlage): o.a. Bedrijfsmanagement, BHV, Calculatie, MS Office, Export packer, ICT-verhuizer, EHBO, Internationaal chauffeur, JVO-ontwikkeltraject van de OEV, Lading zekeren, Manoeuvreren, Module Communicatie, Module Fysieke belasting, Art handler, Facility Management, Handyman, Inboedelverhuizer, Meubelbezorger, Projectleider projectverhuizen, Projectverhuizer, Voorman inboedelverhuizer, Voorman projectverhuizer, Praktisch leidinggeven, Rijopleiding C, E achter B, E bij C, Rijoptimalisatie, Rijvaardigheid, Sociale veiligheid en omgaan met stress, Vakbekwaamheid transportondernemers, Vakbekwaamheid vorkheftruck, VCA Basis, VCA Vol, Veiligheidscertificaat vorkheftruck, Vervolgopleiding export packer, "Overige opleidingen en cursussen waarop Code95 van kracht is".
- i. "Certificaathouder voert geen werkzaamheden uit die haar eigen vakkundigheid overstijgt."

Art. 2.5 Vakbekwame onderaannemers: uitbesteed werk op basis van een contract met de verplichting aan dit reglement te voldoen (a); de hoofd-dienstverlener blijft verantwoordelijk (b).

Art. 2.6 Klanttevredenheid:
- a. Verplichte deelname aan het collectieve KTO (zie sectie 1).
- b. KTO-beoordelingen openbaar via de eigen website met de KTO-widget; getoond cijfer moet actueel zijn.
- c. Klachten verzamelen, analyseren, herstelmaatregelen nemen; "Ontvangen klachten worden zo snel als mogelijk afgehandeld."
- d. "bedraagt aantal gegronde klachten per kalenderjaar niet meer ... dan 5 procent van het aantal uitgevoerde inboedelverhuizingen in dat jaar." Klacht = aantoonbare schriftelijke of elektronische uiting van onvrede.
- e. Procedure gericht op voorkomen van herhaling.
- f. "komt de certificaathouder bindende uitspraken van de Geschillencommissie na binnen veertien dagen na de uitspraak."
- g. "niet meer dan twee, naar het oordeel van de Geschillencommissie, gegronde klachten per kalenderjaar."

Art. 2.7 Veilig werken: RI&E jonger dan 5 jaar (a); lijst verstrekte PBM's per werknemer, gebruik "gecontroleerd en afgedwongen" (b); BHV-plan met calamiteiten, brandbestrijding, EHBO, vluchtwegen (c); registratie ongevallen/incidenten en vervolgacties (d); verzuimregistratie per werknemer (e); aantoonbare aandacht voor veiligheid van derden (f).

Art. 2.8 Duurzaam ondernemen: "wordt de CO2 die vrijkomt bij inboedelverhuizingen binnen Nederland gecompenseerd via het Garantiecertificaat Erkende Verhuizers" (a); afvalstromen geborgd (scheiding/registratie) (b); milieuvergunning Wet Milieubeheer of Activiteitenbesluit (c); voorschriften bekend in het bedrijf (d); wasplaats en brandstofinstallatie conform milieueisen (vloeistofdichte vloer, olie/waterafscheider, slibafvoer), indien van toepassing (e).

Art. 2.9 Gezond marktgedrag: onderschrijven van "de brede code verantwoordelijk marktgedrag" en de principes intern kenbaar maken (a); naleving, "onder meer als het gaat om naleving van de geldende cao-beroepsgoederenvervoer" (b); "dragen certificaathouder en diens medewerkers in woord en gedrag positief bij aan de reputatie van de verhuisbranche" (c); zich onthouden van alles wat het imago van de branche of de reputatie van andere certificaathouders kan schaden, "Inbegrepen het zich onthouden van mededelingen die misleidend zijn ten aanzien van tarieven, voorwaarden, bekwaamheid of vergelijking met diensten van andere certificaathouders" (d).

Art. 2.10 Opslag (eisen aan huisvesting/opslagruimte): opslaginventarislijst als bijlage bij de bewaarnemingsovereenkomst, zo mogelijk met waarde (a); beveiligingssysteem tegen brand en inbraak, geïnstalleerd door een erkend installatiebedrijf, periodiek onderhouden, conform eisen verzekeraar (b); nooduitgangen aangegeven en vrij (c); aantoonbare ongediertebestrijding (d); goederen in kisten, containers of op pallets "traceerbaar, geïdentificeerd en geïnventariseerd. Los opgeslagen goederen zijn niet toegestaan." (e); opslagruimte "verwarmd, wind- en waterdicht en schoon en opgeruimd" (f); veilig en stabiel gestapeld of in stellingen (g).

Art. 2.11 Hulpmiddelen (materieel): verhuismaterieel "waterdicht, droog en uitgerust met een bevestigingsrails en/of bekleding", deuren met sloten (a); verpakkingsmateriaal schoon en van juiste vorm, grootte en sterkte (b); werktuigen alleen door opgeleid personeel (c); materieel en werktuigen wettelijk ontworpen, gefabriceerd en "periodiek gekeurd/getest" (d); verhuisvoertuigen in goede staat van onderhoud (e). Een minimumaantal voertuigen of een C-rijbewijs-eis staat niet in dit reglement (de site noemt wel "Ten minste één C-rijbewijs verhuisauto" [EV/hoe-wordt-u-erkende-verhuizer]; zie sectie 10).

Art. 2.12 Schadebeheersing: beleid schadepreventie en -afhandeling (a); "het schadepercentage van de certificaathouder maximaal 2,5 procent bedraagt" voor inboedelverhuizingen binnen Nederland, gemeten over 4 jaar of korter, aan te tonen met de ondertekende OEV standaard verzekeringsverklaring (b); voldoende kennis van schadepreventie, -afhandeling en AVVV (c); "keert de certificaathouder de door de schadeverzekeraar aan de certificaathouder uitgekeerde schadevergoeding binnen 14 dagen na ontvangst uit aan de klant" (d).

Art. 2.13 Bemiddeling (relevant voor samenwerkingsverbanden zoals Top Movers): bemiddeling = als Erkende Verhuizer optreden als tussenpersoon tussen opdrachtgever en een ander verhuisbedrijf (a); opdrachtgever in de zin van AVVV of AVB (b); "ongeacht de wijze van bemiddeling dient de verhuisovereenkomst te worden gesloten tussen de opdrachtgever en het uitvoerende verhuisbedrijf, waarbij ook de feitelijke uitvoering van de verhuizing door het in de verhuisovereenkomst genoemde verhuisbedrijf moet gebeuren" (c); het uitvoerende bedrijf moet zelf een geldige erkenning hebben, de bemiddelaar ziet daarop toe (d); in digitale of gedrukte media moet duidelijk zijn welke Erkende Verhuizer bemiddelt, met wie de overeenkomst wordt gesloten, wie feitelijk uitvoert en dat AVVV (consument) dan wel AVB (zakelijk) van toepassing is (e).

### Hoofdstuk 3. Erkenning

Art. 3.1 Algemeen: CBO besluit over verlening, verlenging, intrekking (a); erkenning en predicaat aan bedrijven die "bij toetreding (en daarna zolang bij voortduring)" voldoen (b); "Erkenning wordt afgegeven voor een periode van maximaal 3 jaar." (c); inlichtingenplicht "desgevraagd binnen 14 dagen" (d).

Art. 3.2 Aanvraagprocedure:
- a. Aanvraagformulier indienen bij het bureau van de OEV.
- b. "kan pas in behandeling worden genomen nadat de factuur voor de aanvraagkosten is voldaan (ongeacht de uitkomst)." Bedrag niet genoemd.
- c. Publicatie in het vakblad; "Erkende Verhuizers hebben gedurende 30 dagen na publicatie recht om bezwaar te maken tegen de aanvraag."
- d. Geen publicatieplicht bij rechtsvormwijziging van een bestaand lid, mits: KvK-inschrijving herleidbaar naar de oorspronkelijke onderneming; beide rechtsvormen leveren een verklaring betalingsgedrag; schriftelijke verklaring van voortzetting en verval van de oude erkenning.
- e. Bezwaar door andere Erkende Verhuizers: schriftelijk/elektronisch bij het CBO, gemotiveerd op basis van het reglement, met bewijsstukken; bij ongegrondverklaring gemotiveerd bericht; beroep bij het Algemeen Bestuur.

Art. 3.3 Onderzoek van aanvraag: bedrijfsbezoek door of namens het CBO ter verificatie (a); inzage bedrijfsadministratie kan worden gevorderd (b); rapport voor het CBO (c).

Art. 3.4 Beslissing op aanvraag:
- a. Beoordeling op reglement, verstrekte gegevens, bezoekrapport, bezwaarschriften, overige informatie.
- b. CBO kan nadere voorwaarden stellen of nader onderzoek laten doen.
- c. Doorlooptijd: "Het CBO neemt een beslissing op de aanvraag binnen drie maanden na de vergadering waarin de behandeling van de aanvraag voor de eerste maal heeft plaatsgevonden. Deze termijn van drie maanden kan eenmaal met ten hoogste drie maanden (door het CBO) worden verlengd."
- d. Beroep: "Binnen een maand na het CBO besluit kan daartegen schriftelijk of elektronisch beroep worden aangetekend bij het Algemeen bestuur van de OEV."
- e. "De aanvraag komt te vervallen als de aanvrager niet binnen drie maanden na het indienen van de aanvraag aantoonbaar aan de eisen voldoet."
- f. Bewust verzwijgen of onjuiste opgave: aanvraag buiten behandeling.
- g. Eerdere merkinbreuk: uitsluiting "voor de duur van twee jaar na beëindiging van die inbreuk", plus mogelijk "een vergoeding ... ter hoogte van de door de Organisatie misgelopen contributie".

Art. 3.5 Periodieke beoordeling: "Minimaal eenmaal per drie jaren vindt ter verificatie van het voldoen aan dit reglement een herbeoordeling plaats, waarvan de kosten voor rekening komen van de Erkende Verhuizer." (a); alle bepalingen van toepassing behalve de publicatieplicht (b); continu voldoen (c).

Art. 3.6 Wijzigingen en de erkenning: iedere wijziging van naam, ondernemingsstructuur of zeggenschap gelijktijdig met de bekendmaking schriftelijk melden aan het CBO (a); melding gepubliceerd in het vakblad (b); bij het eerstvolgende onderzoek aantonen dat nog wordt voldaan (c); "Erkenning is niet overdraagbaar op een ander bedrijf of een andere ondernemer. Bij overname vervalt de erkenning en zal de nieuwe ondernemer een aanvraag moeten indienen." (d).

Art. 3.7 Verval van de erkenning (sancties en royement):
- a. Erkenning voor 3 jaar, "vervalt automatisch tenzij voor het verstrijken van de termijn door middel van herbeoordeling door het CBO is vastgesteld dat het betreffende bedrijf aan alle eisen voldoet."
- b. Bij niet naleven, "waaronder begrepen het niet betalen van de verschuldigde contributie en/of het niet reageren binnen vastgestelde termijnen op verzoeken van het CBO", is het CBO bevoegd tot intrekking en "eventuele andere sancties".
- c. Verval daarnaast: bij weigering een geschiluitspraak na te leven; bij intrekking van de NIWO-vergunning; op eigen verzoek (opzegging schriftelijk "tegen het einde van het verenigingsjaar met een opzegtermijn van tenminste drie maanden"); bij faillissement; "bij misbruik van het beeldmerk en/of naam Erkende Verhuizers".

Art. 3.8 Gevolgen van verval: na faillissement geen nieuwe erkenning aan de onderneming of feitelijk leidinggevenden "binnen twee jaren nadat het faillissement is uitgesproken", tenzij het CBO anders oordeelt (a); overgenomen handelsnaam van een failliet bedrijf alleen in combinatie met de eigen handelsnaam (b); intrekking wegens merkmisbruik = uitsluiting "voor de duur van minimaal twee jaar" (c); alle rechten op naam en beeldmerk vervallen per direct, "Alle uitingen dienen door het bedrijf per direct aangepast te worden" (d); "Er kan geen aanspraak worden gemaakt op restitutie van betaalde lidmaatschapsgelden of andere bijdragen." (e).

Art. 3.9 Netwerken van bedrijven, nevenvestigingen en nevennamen: alle bij een netwerk aangesloten bedrijven moeten zelf erkend zijn; het netwerk moet bij aanvraag minimaal twee jaar bestaan (a); een nevenvestiging die erkend wil worden dient een formele aanvraag in (b); nevenvestigingen die zelfstandig niet voldoen kunnen erkenning ontlenen aan de hoofdvestiging, "tenzij de nevenvestiging functioneert als een zelfstandige operationele eenheid" (c); een andere handelsnaam voeren als Erkende Verhuizer vereist vooraf toestemming van het bureau (d); verzekeringen van de hoofdvestiging moeten ook nevennaam/nevenvestiging dekken (e); nevennaam alleen toegestaan als eerder verbonden aan een Erkende Verhuizer of met toestemming, en ingeschreven op het adres van de hoofdvestiging (f); definities van hoofdvestiging, nevenvestiging, handelsnaam en "Netwerk van vestigingen: een groep van bedrijven met een permanent bestaan en een inschrijving in het handelsregister. Hieronder vallen ook samenwerkingsverbanden." (h).

Art. 3.10 Gebruik van woord- en beeldmerk (logo/huisstijl): toestemming om "woordmerk en beeldmerk Erkende Verhuizers en Garantiecertificaat Erkende Verhuizers te gebruiken in al zijn bedrijfsmatige uitingen" (a); alleen zolang aan het reglement wordt voldaan; na einde erkenning "per omgaande" staken (b); registratie Benelux Merkenbureau (c); merk verwijderen van verhuiswagens en hulpmiddelen die niet langer voor het verhuisbedrijf worden gebruikt (d); rechtsmaatregelen bij misbruik en uitsluiting voor twee jaar (e).

Art. 3.11 Lidmaatschap en contributie: vakafdelingen, minimaal één vereist (a); "Ongeacht het moment van erkenning of beëindiging van de erkenning betaalt de Erkende Verhuizer de volledige jaarcontributie. De hoogte van de contributie wordt jaarlijks vastgesteld door de Algemene Vergadering van de OEV. De contributie moet worden voldaan binnen twee maanden na ontvangst van de contributienota" (b). Bedragen staan niet in het reglement.

### Hoofdstuk 4. Slotbepalingen

Leden moeten aan het reglement voldoen (a); bij wijziging "binnen één jaar na wijziging van dit reglement" aan de gewijzigde bepalingen voldoen (b); "In alle gevallen waarin door dit reglement niet wordt voorzien, beslist het CBO." (c); wijziging door het Algemeen Bestuur (d); citeertitel "Erkenningsreglement EV 2024" (e).

### Hoofdstuk 5. Bijlage scholingsmogelijkheden

Toelichting op eis 2.4.h: doel is "de kwaliteit te borgen en liefst te verbeteren, door de ontwikkeling van verhuismedewerkers te bevorderen"; keuze uit meerdaagse opleidingen en eendaagse cursussen (lijst hierboven bij 2.4.h).

### Samenvatting per onderwerp uit de opdracht

- Wie kan lid worden: verhuisonderneming of netwerk, lid van een werkgeversorganisatie in het beroepsgoederenvervoer/logistiek [1.2]; minimaal twee jaar KvK met SBI 4942 als eerste code [2.1.a]; site: "een goede kwaliteit verhuisbedrijf dat minimaal 2 jaar bestaat" [EV/erkende-verhuizer-worden].
- Vakbekwaamheid en diploma's: [2.4.a-h]; vergunningen: NIWO/WVG [2.1.b]; verzekeringen: € 23.000 per overeenkomst/inboedel met max. € 1.000 eigen risico, AVB € 2.500.000 per gebeurtenis, Garantiecertificaat [2.2.c, d, f]; financieel: verklaring betalingsgedrag Belastingdienst [2.1.d, e]; materieel: [2.11]; personeel: [2.4, 2.7]; huisvesting/opslag: [2.10, 2.8.c-e].
- Audits/controles: bedrijfsbezoek bij aanvraag [3.3], herbeoordeling minimaal elke 3 jaar op eigen kosten [3.5], na rechtsvormwijziging na 1 jaar [2.1.e], inlichtingen binnen 14 dagen [3.1.d]; KIWA voert de audit uit volgens de site [EV/verschil-erkende-verhuizers-nkev]; voorbereiding met "Checklist EV audit" en de standaard verzekeringsverklaring [EV/voorbereiden-op-uw-erkenning].
- Verplichtingen: voorwaarden gebruiken [2.2.e, g, h], Garantiecertificaat aanvragen [2.2.f], KTO-widget op de eigen website [2.6.b], merkgebruik [3.10], code en cao [2.9], geen misleidende mededelingen [2.9.d], wijzigingen melden [3.6].
- Contributie/kosten: aanvraagkosten [3.2.b], herbeoordelingskosten [3.5.a], jaarcontributie [3.11.b], geen restitutie [3.8.e]; geen bedragen in de bronnen.
- Sancties/royement: [3.7, 3.8, 3.10.e, 3.4.g].
- Rechtsvormwijziging/overname: [2.1.e, 3.2.d, 3.6.d, 3.8.a-b] plus sitepagina: "Uitschrijving bij de Kamer van Koophandel = verval erkenning!", "De erkenning is niet overdraagbaar naar een nieuwe eigenaar", nieuwe inschrijving vraagt initiële audit, publicatie ("gemiddeld 2 maanden"), herbeoordeling na 1 jaar, nieuwe NIWO-vergunning, nieuwe verklaring Belastingdienst, nieuw TLN-lidmaatschap, overzetten verzekeringen [EV/rechtsvormwijziging-of-overname].
- Bezwaar/beroep: bezwaar door andere leden binnen 30 dagen [3.2.c, e]; beroep tegen CBO-besluit binnen een maand bij het Algemeen Bestuur [3.4.d]; beroep bij ongegrond bezwaar [3.2.e].

---

## 4. Garantiecertificaat Erkende Verhuizers

### Wat het is en wat het regelt

- Consumentenpagina: "Op uw binnenlandse inboedelverhuizing is namelijk het Garantiecertificaat Erkende Verhuizers van toepassing. Dit certificaat zorgt ervoor dat u onbezorgd kunt verhuizen dankzij unieke garanties en de verhuisverzekering." [EV/waarom-erkende-verhuizer__garantiecertificaat-erkende-verhuizers].
- Het certificaat is tegelijk polis en verzekeringsbewijs: "Het Garantiecertificaat geldt tevens als verzekeringspolis (4 AVVV 2025)" [EV/...__verantwoord-verhuizen-garanties]; "Het Garantiecertificaat Erkende Verhuizers, dat je bij het sluiten van de verhuisovereenkomst van jouw Erkende Verhuizers heeft ontvangen, is het verzekeringsbewijs." [EV/wat-te-doen-bij-verhuisschade].
- Het maakt "samen met de standaard verzekeringskaart voor de verhuisverzekering (IPID), deel uit ... van de AVVV en de verhuisovereenkomst" [REGL art. 2.2.f].
- Drie garanties: verzekering op nieuwwaarde, verhuisgarantie, aanbetalingsgarantie [EV/...__verantwoord-verhuizen-garanties; EV/erkende-verhuizer-worden, punt 7]. Voor leden geformuleerd als: "Zijn inboedel is verzekerd tot €100.000 op basis van nieuwwaarde. De verhuis- en aanbetalingsgarantie bieden de zekerheid dat bij faillissement of surseance van betaling, de verhuizing alsnog door een Erkende Verhuizer wordt uitgevoerd." [EV/erkende-verhuizer-worden, punt 7].
- Ook de CO2-compensatie loopt via het certificaat [REGL art. 2.8.a].

### Verplichting

- Voor alle consumentenverhuizingen: NL-certificaat binnen Nederland; Europa-certificaat voor alle na 31-12-2023 gesloten consumentenverhuizingen binnen Europa [REGL art. 2.2.f].
- Het woord- en beeldmerk "Garantiecertificaat Erkende Verhuizers" is merkrechtelijk beschermd [REGL art. 3.10.a, c].

### Dekking (bedragen)

- Verzekerd bedrag NL: "tenminste EUR 100.000 tegen alle verliezen van en materiële schade aan de inboedel, zoals nader omschreven in de Algemene verzekeringsvoorwaarden voor particuliere verhuisgoederen PV05, naar welke voorwaarden wordt verwezen in de AVVV (laatste versie) artikel 7, Garantiecertificaat Erkende Verhuizers" [SVV lid 3]. Site: "tot een bedrag van tenminste € 100.000 op basis van nieuwwaarde" [EV/...__verantwoord-verhuizen-garanties]; nieuwwaarde "tenzij de dagwaarde 40% of minder dan de nieuwwaarde is" [EV/blog__welke-verzekering-afsluiten-verhuizing].
- Eigen risico: "zonder eigen risico" [EV/waarom-erkende-verhuizer]; "Een eventuele rechtstreekse schade-uitkering van een bedrag aan de consument vindt plaats zonder inhouding van een eigen risico (er geldt alleen de franchise van € 23 ex art. 18, vierde lid AVVV)." [SVV lid 3].
- Opslag: site en AVVV 2025: "tussentijdse opslag tot maximaal 12 maanden" [EV/...__verantwoord-verhuizen-garanties]. De verzekeringsverklaring (versie 17-9-2024, die nog naar de AVVV 2015 verwijst) zegt: "Bij bewaarneming als onderdeel van de verhuizing binnen Nederland is de inboedel de eerste 6 maanden verzekerd als bij een verhuizing." [SVV lid 3]. Zie sectie 10.
- Verhuisgarantie: andere Erkende Verhuizer "met bekwame spoed", aangewezen door de OEV; gevolgschade uitgesloten (art. 8 AVVV 2025) [EV/...__verantwoord-verhuizen-garanties].
- Aanbetalingsgarantie: max. 25% van de verhuisprijs, max. € 1.000 (NL) en € 2.000 (Europa), alleen in combinatie met de verhuisgarantie (art. 8 AVVV 2025) [EV/...__verantwoord-verhuizen-garanties].
- Nakomingsgarantie (via de OEV, niet via het certificaat): max. € 10.000 per bindend advies (art. 23 AVVV 2025) [EV/...__verantwoord-verhuizen-garanties].
- Europa-certificaat: "voor een bedrag afkomstig van de consument wiens verhuisgoederen worden verhuist. Het minimum verzekerde bedrag bedraagt EUR 5.000"; bij bewaarneming "de eerste 30 dagen verzekerd als bij een verhuizing" [SVV lid 4].

### Hoe het wordt aangemaakt

- "Erkende Verhuizers kunnen hier Garantiecertificaten aanvragen via de module van verzekeringsmakelaar Schouten Zekerheid." [EV/aanmaken-garantiecertificaten]. De tweede pagina met vrijwel dezelfde naam bevat geen tekst [EV/garantiecertificaten-aanmaken]. De footer linkt naar "Aanmaken Garantiecertificaten" [home.html footer].
- Schouten Zekerheid is "de uitvoerder van deze certificaten"; vragen kunnen in het online vragenuur van 17 september 2026 [EV/evenementen].
- Leden mogen het risico ook zelf verzekeren: "Verzekerde maakt gebruik van de vrijheid om de verzekeringsdekking behorende bij het Garantiecertificaat Erkende Verhuizers primair zelf te verzekeren. Uitdrukkelijk wordt verklaard dat deze verzekering niet is afgesloten in de vorm van een aansprakelijkheidsverzekering ten name van verzekerde, maar overeenkomstig de bepalingen van de algemene verzekeringsvoorwaarden voor particuliere verhuisgoederen PV05." [SVV lid 3].
- Uitkering: "Schade-uitkering op grond van het Garantiecertificaat Erkende Verhuizers vindt overeenkomstig de PV05 plaats aan verzekerde" (het verhuisbedrijf) [SVV lid 3]; de verhuizer betaalt binnen 14 dagen door aan de klant [REGL art. 2.12.d].

### Consumentenbijsluiter (IPID)

- Downloads: "consumentenbijsluiter Garantiecertificaat NL (IPID, 2025)", "consumentenbijsluiter Garantiecertificaat Europa (IPID, 2025)" en de Engelse "Insurance Product Information Document Garantiecertificaat (IPID 2025)" [EV/algemene-voorwaarden]; in het Handboek Verzekeren onder 9.e en 9.f [EV/handboek-verzekeren]. De inhoud van de IPID zelf zit niet bij de bronnen.

### Wat de Standaard verzekeringsverklaring 2024 regelt [SVV]

- Doel (voorwoord): bij audits bleek "regelmatig ... onduidelijkheid ... over de wijze waarop de door het verhuisbedrijf afgesloten verzekeringen dienen te voldoen aan de eisen uit het erkenningsreglement"; de verklaring, ondertekend door de verzekeraar(s), moet voorkomen "dat de Erkende Verhuizers op het verkeerde been worden gezet met verzekeringsdekkingen die onvoldoende aansluiten bij feitelijke risico's".
- Lid 1 Logistieke aansprakelijkheid: contractuele aansprakelijkheid uit AVVV/AVBV/AVB en het reglement verzekerd, "per verhuisovereenkomst dan wel bewaarnemingsovereenkomst" of per inboedel/inventaris; dekking in overeenstemming met de maximale aansprakelijkheid volgens de voorwaarden.
- Lid 2 Aansprakelijkheid (AVB): "minimaal € 2.268.901 per aanspraak"; premie lopend jaar voldaan; eigen risico "niet hoger ... dan € 1.000 per gebeurtenis". (Het reglement eist € 2.500.000 per gebeurtenis [REGL art. 2.2.d]; zie sectie 10.)
- Lid 3 Garantiecertificaat Nederland: zie dekking hierboven; verzekeraar vermeldt het schadepercentage over 4 jaar, of anders het absolute aantal schades per jaar over de 4 voorafgaande kalenderjaren; "Wij verklaren dat er geen betalingsachterstand is in de premiebetaling."
- Lid 4 Garantiecertificaat Europa: zie hierboven.
- Per lid: polisnummer, contractsvervaldatum, verzekeraar, ondertekenaar. "Elke wijziging of aanvulling in de tekst van deze standaard verzekeringsverklaring maakt de verklaring ongeldig."
- Uitsluitingen worden in de verklaring niet opgesomd; die staan in de PV05 (niet in deze bronnenset).

---

## 5. Codekamer Verhuizen

### Wat en wie [EV/waarom-erkende-verhuizer__codekamer-verhuizen]

- "De Codekamer Verhuizen heeft tot doel om gezond marktgedrag in de verhuisbranche te bevorderen. Net als de sectoren schoonmaak, beveiliging en contractcatering is ook de verhuisbranche aangesloten bij de Code Verantwoordelijk Marktgedrag. Elke aangesloten sector heeft hiervoor een Codekamer, die toeziet op de naleving van de code."
- Taken: "stimuleert de implementatie van de code in de verhuisbranche, de verbreiding van de code en de behandeling van meldingen over niet-naleving door ondertekenaars van de code."
- Samenstelling: "vertegenwoordigers van opdrachtgevers, opdrachtnemers, vakbonden, intermediairs en brancheorganisatie OEV en heeft een onafhankelijke voorzitter."
- Instrumenten: tekensessies ("Ik teken de code"); kennisdelen (Code, Handreiking inkoop verhuisdiensten, Handreiking "de kunst van het gewogen oordeel", Handreiking indexatie-afspraken); klachten: "Als de Codekamer de klacht in behandeling neemt, kan deze de dialoog aangaan, een moreel appèl doen op de betrokken partij(en) en desnoods een gele kaart uitreiken (publiciteit)."
- Binding voor leden: "Erkende Verhuizers zijn via het branchekeurmerk aan de code gebonden." en [REGL art. 2.9].
- Cao-naleving: cao beroepsgoederenvervoer over de weg; vermoedens van ontduiking kunnen naar de Inspectie SZW; in Transport en Logistiek ook Stichting VNB (onderdeel van FNV).

### Wanneer

- Een oprichtingsdatum staat niet in de bronnen. Aanwijzingen: de infographic is geüpload in september 2019 [EV/...codekamer-verhuizen, PDF-LINKS: /2019/09/Infographic_Codekamer_2.0.pdf]; nieuws "Rijkswaterstaat, categoriemanagement juli 2019: Samen respectvol zakendoen"; persbericht coronatijd 2020; gezamenlijk onderzoek met SZW e.a. gestart in 2020 [EV/marktdossier-verhuisbranche].
- Infographic: "Doe dit in een zo vroeg mogelijk stadium en wees volledig. Zodat de codekamer uw klacht of vraag ook in een breder perspectief kan beoordelen en in actie kan komen." [INFOG].

### Voorwaarden voor een klacht [EV/...codekamer-verhuizen__voorwaarden-voor-klacht-bij-codekamer-verhuizen] (letterlijk)

- "een klacht moet betrekking hebben op marktgedrag binnen de verhuisbranche (code);"
- "een klacht dient eerst gericht te worden aan de organisatie waarover wordt geklaagd (klachten over contractuele geschillen worden niet in behandeling genomen);"
- "een klacht kan worden ingediend via info@erkendeverhuizers.nl;"
- "een klacht moet tijdig worden ingediend (in geval van een klacht over een aanbesteding: uiterlijk 10 dagen voor de sluitingsdatum)."
- "De klachtprocedure van de Codekamer is geen juridische klachtenprocedure."

Onderwerpen volgens de infographic [INFOG]: "Beperkte aandacht voor duurzaamheid, innovatie of circulariteit", "Marktconsultatie, wat moet er eigenlijk gevraagd worden", "Toegeschreven op 1 leverancier", "Niet eens met tariefstelling", "Geen afdoende antwoord bij vragen", "Onmogelijke of niet uitvoerbare eisen", "Uitvraag biedt geen flexibiliteit". Vervolg: "In sommige gevallen kunnen we u eenvoudig en snel helpen of doorverwijzen, dus ook wanneer het eigenlijk een individueel verzoek is. Is een zaak al wat verder gevorderd, dan streven we er in elk geval naar om een advies te geven."

### Verschil met de Geschillencommissie Verhuizen

- Geschillencommissie: voor contractuele geschillen tussen consument en Erkende Verhuizer; "Onafhankelijke juristen beoordelen de zaak en doen een uitspraak die voor alle partijen bindend is" [EV/...__verantwoord-verhuizen-garanties]; nakoming door de OEV gegarandeerd tot € 10.000 [idem]; de verhuizer moet binnen 14 dagen nakomen [REGL art. 2.6.f]; ieder lid is "automatisch aangesloten" [EV/erkende-verhuizer-worden, punt 8].
- Codekamer: voor marktgedrag (aanbestedingen, inkoop, cao-naleving, oneerlijke concurrentie), uitdrukkelijk niet voor contractuele geschillen; geen juridische procedure; uitkomst is dialoog, moreel appèl, advies of gele kaart, geen bindende uitspraak [EV/...voorwaarden-voor-klacht; EV/...codekamer-verhuizen; INFOG].

### Kosten en termijnen

- Kosten van een Codekamerklacht: niet genoemd. Kosten van de Geschillencommissie: niet genoemd in deze bronnen.
- Termijnen: aanbestedingsklacht uiterlijk 10 dagen voor sluiting [EV/...voorwaarden-voor-klacht]; Geschillencommissie-uitspraak nakomen binnen 14 dagen [REGL art. 2.6.f]; maximaal 2 gegronde GC-klachten per kalenderjaar [REGL art. 2.6.g].
- Contact Code (landelijk): codevm@atriumgroep.nl / 0183-822960; voorzitter stichting: Kees Blokland [EV/gezond-marktgedrag-juist-nu].

---

## 6. Code Verantwoordelijk Marktgedrag

### Wat de OEV ermee doet

- Aansluiting en verankering: "Erkende Verhuizers zijn aangesloten bij de Code verantwoordelijk marktgedrag. Dit is een brede code waarbij ook de sectoren schoonmaak, beveiliging en contractcatering zijn aangesloten. ... Erkende Verhuizers hebben de naleving van de code in hun branchekeurmerk verankerd. De Codekamer Verhuizen ziet toe op de code in de verhuisbranche." [EV/waarom-erkende-verhuizer__maatschappelijke-inzet]; reglementair via [REGL art. 2.9]. Voor EPV geldt hetzelfde: "De naleving van de code in de verhuisbranche is vastgelegd in de branchekeurmerken Erkende Verhuizers en Erkende Projectverhuizers (EPV)." [EV/marktdossier-verhuisbranche].
- Motief: "Erkende Verhuizers willen actief zijn met de code, omdat zij de overtuiging hebben dat deze kan bijdragen aan een gezond marktklimaat. Dit klimaat staat nu onder druk door toenemende prijsdruk, onbalans in prijs-kwaliteit en oneerlijke concurrentie door aanbieders die wettelijke regels overtreden" [EV/...__maatschappelijke-inzet], in het marktdossier gespecificeerd als "(WVG-vergunning, belastingen en sociale premies)" [EV/marktdossier-verhuisbranche].
- Handhaving op initiatief van OEV en Codekamer sinds 2020 (SZW, ILT, pensioenfonds, vakbonden, VNB) [EV/marktdossier-verhuisbranche]; effect: "Mede door het effect van de Code verantwoordelijk marktgedrag, leggen verhuisaanbestedingen (steeds meer) het accent op kwaliteit en niet alleen op prijs." [idem].
- Persbericht in coronatijd (Kees Blokland): "Verantwoord marktgedrag is juist nu uw afspraken nakomen", met oproep "Respecteer elkaar en gemaakte afspraken; Praat met elkaar over de mogelijkheden in plaats van onmogelijkheden; Zorg voor elkaar, we hebben elkaar nodig." [EV/gezond-marktgedrag-juist-nu].

### Wat "gezond marktgedrag" inhoudt volgens de code zelf [CODE]

- Inleiding: "Deze code doet een moreel appèl op opdrachtgevers, opdrachtnemers, inleners, vakbonden en tussenpersonen om sociaal verantwoord en met respect voor de kwaliteit van de dienstverlening opdrachten uit te zetten, aan te nemen en uit te voeren." De code is "een verbreding van de eerder opgestelde Code Verantwoordelijk Marktgedrag in de schoonmaaksector en glazenwassersbranche", in lijn met het sociaal akkoord van 11 april 2013. Aansluiting van een sector vereist afspraken tussen cao-partijen over "paritaire controle naleving cao", scholingsfaciliteiten voor vakbondskaderleden en "toegang tot de werkvloer voor de vakbonden".
- Algemene principes: "Zorgvuldig, transparant en controleerbaar" (met de zin "Brancheorganisaties nemen onderschrijving van de code op in hun lidmaatschaps- en/of keurmerkeisen"); "Verantwoordelijkheid en samenwerking"; "Kwaliteit van dienstverlening en arbeid" ("Kwaliteit en prijs staan in een realistische verhouding tot elkaar"); "Duurzaam bestendigen" (zo lang mogelijke contractperiode; "structureel werk zoveel mogelijk door medewerkers in een structureel c.q. vast dienstverband"); "Sociaal, gezond, veilig en plezierig"; "Belangenbehartiging" (recht op vakbondsvertegenwoordiging); "Respecteren, wet- en regelgeving" (wet, cao, goed werkgeverschap art. 7:611 BW, NEVI gedragscode).
- Opdrachtgeverschap: "in geval van dienstverlening altijd het principe 'prijs volgt kwaliteit' hanteren, met bijvoorbeeld de 'total cost of ownership' als een belangrijk uitgangspunt"; zorgvuldig contractmanagement waarbij "de cao leidend is"; "Minimaal eenmaal per jaar praat de opdrachtgever met (een vertegenwoordiging van) de uitvoerende medewerkers".
- Opdrachtnemer- en werkgeverschap: sociaal beleid, niet discrimineren (NVP Sollicitatiecode), "Offertes maken inzichtelijk wat de opdrachtgever mag verwachten", toetsing op naleving toestaan, contracten zo opstellen dat kwaliteit mogelijk is "met inachtneming van de sociale verantwoordelijkheid tegenover de werknemer".
- Werknemerschap: inzet, opleiding, Arboregels, betrokkenheid; signaleren van code-overtredingen zonder represailles.
- Goed makelaar- en adviseurschap: objectief, transparant, onafhankelijk, "passen geen verdienmodel op basis van provisie toe", geen financieel belang bij de uitkomst van een tender.
- Branchespecifiek facilitair (schoonmaak, beveiliging, catering): structurele banen; bij contractwisseling "minimaal een periode van twee maanden, geteld vanaf datum van gunning"; beheersing Nederlandse taal.
- Implementatie en naleving: de Commissie Verantwoordelijk Marktgedrag verzorgt voorlichting, benchmarking, "groene kaart" voor best practices, "gele kaart" bij niet-naleving, monitoring (eventueel per branche), jaarlijkse rapportage; evaluatie van de code drie jaar na aanbieding.

### Marktcijfers die de OEV bij "gezond marktgedrag" aanhaalt [EV/marktdossier-verhuisbranche]

- "minimaal 70% van de kostprijs [wordt] bepaald door de factor arbeid".
- Vechtmarkt: volgens SOOB-onderzoek 2018 "het aantal aanbieders van verhuisdiensten bijna dubbel zo groot ... als de groep verhuisbedrijven die bij de Kamer van Koophandel zijn geregistreerd met Verhuisvervoer 4942 als eerste SBI code. Minder dan een kwart ... draagt als werkgever premie af aan pensioenfonds Vervoer, nog minder verhuisbedrijven zijn in het bezit van de wettelijke vergunning".
- Offertesites: "bedrijven die de regels niet naleven worden gefaciliteerd: eenvoudig, tegen lage kosten en onopvallend."

---

## 7. Verschil Erkende Verhuizers, NKEV en andere labels

### Erkende Verhuizers versus NKEV [EV/verschil-erkende-verhuizers-nkev]

De pagina zet zeven verschillen op een rij (kernzinnen letterlijk):

1. Jarenlange ervaring: "de Organisatie voor Erkende Verhuizers is al meer dan 60 jaar dé brancheorganisatie voor verhuisbedrijven in Nederland."
2. Het keurmerk: "Een keurmerk is pas een keurmerk als het voldoet aan duidelijke, objectieve criteria. Denk aan transparante beoordelingsregels, toegankelijkheid voor alle partijen en onafhankelijke toetsing. In tegenstelling tot NKEV voldoet het branchekeurmerk Erkende Verhuizers aantoonbaar aan alle criteria. ... Daarmee is het het officiële branchekeurmerk van de Nederlandse verhuissector."
3. Transparantie en controle: "Bij Erkende Verhuizers worden bedrijven streng getoetst door onafhankelijke certificeringsinstelling KIWA. ... Hoe dit bij NKEV wordt geregeld, wordt niet gedeeld."
4. Opleidingen: "volgen medewerkers bij Erkende Verhuizers verplichte opleidingen, trainingen en bijscholing. Hoewel er bij NKEV wordt gesproken over opleidingen en ervaring, is er geen bewijs van structurele of gecertificeerde scholing."
5. Voorwaarden: voorwaarden met de Toetsingscommissie overeengekomen; "je inboedel standaard verzekerd tot €100.000,- tegen nieuwwaarde, zonder eigen risico. Daarnaast krijg je verhuis- en aanbetalingsgarantie, toegang tot de onafhankelijke Geschillencommissie en een nakomingsgarantie tot €10.000,-. Bij NKEV is dit niet het geval."
6. Onafhankelijke toetsing en toezicht: "Daarnaast zijn ook de besluitvorming én het toezicht onafhankelijk geregeld. Voor NKEV is niet duidelijk of zulke onafhankelijke toetsing plaatsvindt."
7. Klanttevredenheid: "doorlopend en onafhankelijk gemeten via Klantenvertellen ... Hoe klanttevredenheid bij NKEV wordt gemeten of beoordeeld, is niet bekendgemaakt."

Wat NKEV precies is (afkorting, organisatie) legt de pagina niet uit; de pagina schrijft eenmaal "KEV".

### Vakman of beunhaas [EV/verhuizen-met-vakman-of-beunhaas]

- Risico's bij een onbetrouwbare verhuizer: "Niet verschijnen op de verhuisdag; Onnodige vertragingen en lange uitloop; Schade aan uw inboedel zonder heldere afhandeling; Hoge onverwachte extra kosten."
- Waarborgen van een Erkende Verhuizer: "vakbekwaam personeel; een uitstekende verzekering van uw inboedel; toegang tot de onafhankelijke Geschillencommissie; algemene voorwaarden die met de Toetsingscommissie van de Stichting De Geschillencommissie zijn overeengekomen; naleving van de cao en arboregels voor verhuizers (de rechten van werknemers); en belangrijke garanties door de brancheorganisatie van de Nederlandse verhuisbranche: verhuis-, aanbetalings- en nakomingsgarantie."
- "Bedrijven die niet langer voldoen aan de kwaliteitseisen verliezen hun predicaat."
- Kenmerken van een onbetrouwbare verhuizer (de pagina kondigt "8 kenmerken" aan en werkt er meer uit): "Te mooi om waar te zijn" (aanbod via offertesite, platform, marktplaats of "verhuisadvies"-website, "Platforms willen snel en makkelijk geld verdienen met leads en controleren aanbieders matig"); "Niet bekend bij KvK"; "Geen NIWO vergunning" ("Dan kan uw verhuiswagen van de weg worden gehaald en staat uw inboedel aan de kant"); "Nepkeurmerken en misleiding" ("Ook zijn er neplabel en -keurmerken in omloop"); "Misbruik branchevoorwaarden" ("Alleen Erkende Verhuizers mogen de beschermde Algemene voorwaarden (AVVV/AVBV) gebruiken"); "Onduidelijke of ontbrekende verzekering"; "Geen factuur of btw"; "Ongeschikt materiaal en onveilige werkwijze"; "Opvallend laag getaxeerd volume"; "Onrealistisch lage prijzen" (met verwijzing naar Consumentenbond-onderzoek naar prijsverschillen); "Onverwacht hoge rekeningen achteraf" ("verhuizen per uur" met "een onverwacht hoge nacalculatie van soms wel 100% of meer (van soms duizenden euro's). Dit is al snel in strijd met de wet.").
- Andere labels dan NKEV worden niet bij naam genoemd.

### Beunhaas-checklist (PDF) [BEUNHAAS]

Acht tegenstellingen "Erkende Verhuizer" versus "beunhaas" (samengevat, met de kern letterlijk):
1. "optimaal beschermd tegen mogelijke schade met een allrisk verzekering tegen nieuwwaarde" versus "U weet vooraf niet of u eigen risico moet betalen."
2. kwaliteitsgaranties "vastgelegd in de Algemene Voorwaarden (AVV/AVBV)" versus garanties "onduidelijk uitgelegd of u heeft ze helemaal niet".
3. "zekerheid van betaling, zelfs bij uitstel van betaling of als het verhuisbedrijf failliet gaat" versus "Bij uitstel van betaling of bij faillissement staat de branche niet borg."
4. "verhuismedewerkers hebben vakopleidingen gevolgd, om eerlijk, veilig & gezond te kunnen werken" versus "Ze worden vooral ingezet om te sjouwen."
5. "een onafhankelijke commissie met een bindende uitspraak over de nakomingsgarantie" versus geen commissie, geen bindende uitspraak, geen nakomingsgarantie.
6. helpt "bij alle soorten verhuizingen, zoals internationale, bedrijfs- of seniorenverhuizingen" versus "vaak alleen ... één of twee verschillende soorten verhuizingen".
7. "goed op de hoogte van de wetgeving en wordt regelmatig door het keurmerk gecontroleerd" versus "actief zonder de benodigde vergunningen en er is nauwelijks of geen controle".
8. "klantreviews worden onafhankelijk afgenomen en gecontroleerd. Cijfers worden niet op verzoek aangepast." versus "Kloppen de reviews wel?"
Afsluiting: "Wilt u ook veilig, vertrouwd en vlekkeloos verhuizen? Kies dan voor een Erkende Verhuizer! Check uw verhuizer".

### Aanvullend: offertesites en uurtarieven [EV/verhuisservice; EV/kosten-verhuisbedrijf]

"Er zijn nogal wat verhuizers die met erg lage tarieven werken, maar nader bekeken niet volgens de regels te werken. Bijvoorbeeld zonder een wettelijke vervoersvergunning ..., niet volgens de arboregels ..., onvoldoende verzekerd ..., zich niet aan de cao houden (uitbuiting) of zonder factuur ('zwart') werken. ... Vaak bieden deze partijen zich aan via offerteplatforms. Let in het bijzonder op de reviews, of deze niet erg veel op elkaar lijken." [EV/verhuisservice].

---

## 8. Hoe word je Erkend Verhuizer

### Instapvoorwaarden zoals de site ze samenvat

- "Heeft u een goede kwaliteit verhuisbedrijf dat minimaal 2 jaar bestaat en zoekt u zichtbare erkenning van uw kwaliteit?" [EV/erkende-verhuizer-worden].
- "Wij hebben interesse in actieve en betrokken nieuwe leden die waarde toevoegen aan het merk Erkende Verhuizers" [EV/hoe-wordt-u-erkende-verhuizer].
- Uitgelichte eisen [EV/hoe-wordt-u-erkende-verhuizer]: "Een geldige NIWO vergunning"; "Het bedrijf staat minimaal twee jaar ingeschreven bij de Kamer van Koophandel met SBI code 4942 (verhuisvervoer)"; "alle verhuizers, die langer dan twee jaar bij uw onderneming in dienst zijn, moeten beschikken minimaal over een door de OEV erkend verhuisdiploma. Elk ingezet verhuisteam moet tenminste voor de helft bestaan uit mensen die in het bezit zijn van een OEV-erkend verhuisdiploma. En elk verhuisteam moet worden aangestuurd door voorman die beschikt over het OEV-erkende voormandiploma."; "Ten minste één C-rijbewijs verhuisauto."
- Volledige eisen: sectie 3.

### Stappen (samengesteld uit REGL en site)

1. Kennisnemen van het reglement: "Voordat u een aanvraag indient is het belangrijk dat u kennisneemt van het Erkenningsreglement 2026, waarin de kwaliteitseisen zijn opgenomen." [EV/hoe-wordt-u-erkende-verhuizer].
2. Interesse melden via de contactaanvraag op de pagina (formulier) [EV/hoe-wordt-u-erkende-verhuizer; EV/erkende-verhuizer-worden "Meer informatie?"]. De pagina "Aanmeldformulier" bevat geen inhoud [EV/aanmeldformulier].
3. Aanvraagformulier indienen bij het bureau van de OEV en de factuur voor de aanvraagkosten betalen; pas daarna wordt de aanvraag in behandeling genomen [REGL art. 3.2.a-b].
4. Publicatie van de aanvraag in vakblad Verhuizen; 30 dagen bezwaartermijn voor bestaande leden [REGL art. 3.2.c]; volgens de site duurt publicatie "gemiddeld 2 maanden" [EV/rechtsvormwijziging-of-overname].
5. Voorbereiden op de audit met: het reglement, de "Checklist EV audit (versie 12-12-2025 reglement 2026)" en de "Standaard verzekeringsverklaring Erkende Verhuizers digitaal (versie 17-9-2024)" waarmee "u aan[toont] dat uw verzekeringen voor elkaar zijn en wat uw schadepercentage is" [EV/voorbereiden-op-uw-erkenning].
6. Bedrijfsbezoek/audit ter verificatie, met eventueel inzage in de administratie; rapport aan het CBO [REGL art. 3.3]. Volgens de site uitgevoerd door KIWA [EV/verschil-erkende-verhuizers-nkev].
7. Besluit van het CBO binnen drie maanden na de eerste behandeling, eenmaal met drie maanden te verlengen [REGL art. 3.4.c]; de aanvraag vervalt als het bedrijf niet binnen drie maanden na indiening aantoonbaar aan de eisen voldoet [REGL art. 3.4.e]; beroep binnen een maand bij het Algemeen Bestuur [REGL art. 3.4.d].
8. Erkenning voor maximaal 3 jaar; herbeoordeling minimaal elke drie jaar op eigen kosten [REGL art. 3.1.c, 3.5.a]; na een rechtsvormwijziging of nieuw bedrijf een herbeoordeling na 1 jaar [REGL art. 2.1.e; EV/rechtsvormwijziging-of-overname].
9. Opname in het ledenregister met KTO-cijfer, contactgegevens en eventueel het label "Erkende Projectverhuizer" [EV/ledenregister]; toegang tot mijnerkendeverhuizers.nl [EV/privacy].

### Doorlooptijd

Uit de bronnen samen: publicatie gemiddeld 2 maanden [EV/rechtsvormwijziging-of-overname], besluit CBO binnen 3 maanden na eerste behandeling, verlengbaar met 3 maanden [REGL art. 3.4.c]. Een totale doorlooptijd van aanvraag tot erkenning wordt niet genoemd.

### Kosten

- Aanvraagkosten (factuur vooraf, "ongeacht de uitkomst") [REGL art. 3.2.b]; kosten herbeoordeling voor rekening van het lid [REGL art. 3.5.a]; volledige jaarcontributie ongeacht instapmoment, hoogte jaarlijks door de ALV, betaling binnen twee maanden [REGL art. 3.11.b]; geen restitutie bij verval [REGL art. 3.8.e]. Geen bedragen in de bronnen.
- Baten volgens de OEV ("10 redenen om Erkende Verhuizer te worden") [EV/erkende-verkende-verhuizer-worden; correcte bron: EV/erkende-verhuizer-worden]: kwaliteit en externe audit; voordelige vakopleiding bij Verhuiscollege "met SOOB subsidie en bij de meeste opleidingen Code 95 uren"; naamsbekendheid 83%; voordelige offerteaanvragen via erkendeverhuizers.nl en verhuizen.nl; algemene voorwaarden; producten en diensten "veelal gratis, zoals promotiemateriaal, een Branche RI&E, (thema)bijeenkomsten en workshops"; garanties voor de klant; automatische aansluiting bij de Geschillencommissie; vertegenwoordiging in Den Haag en Brussel; "Persoonlijke meerwaarde".

### Werken bij een Erkende Verhuizer (voor medewerkers)

"Met Verhuiscollege word jij de expert. Het erkende vakdiploma is het startbewijs om te werken als verhuizer." [EV/ik-word-verhuizer].

---

## 9. Overige diensten en producten van de OEV voor leden

### Bestellen van ledenproducten [EV/bestellen-van-producten]

- "Brochure Algemene Voorwaarden (AVVV/AVBV/AVHD) (inclusief inlegvel addendum/erratum)": per 250 stuks, max. 500 per bestelling, "alleen verzend- en handlingkosten".
- "Inlegvel addendum/erratum voorwaardenboekje (afzonderlijk, zonder brochure)": per 250, max. 500, alleen verzend- en handlingkosten.
- "Flyer Checklist verhuizen": A4-boekje van 2 pagina's, per 50, max. 500, alleen verzend- en handlingkosten.
- "Bloc Bewaarnemingsovereenkomsten met vuistpandrecht en partnerverklaring": blok van 50 doorslagvellen, max. 20 blokken, betaalproduct.
- "Bloc Opslaginventarislijst": blok van 50 doorslagvellen, max. 20, betaalproduct.

### Handboek Verzekeren 2026 [EV/handboek-verzekeren]

Downloadlijst bij het "OEV-handboek verzekeren 2026":
- 9. Algemene voorwaarden: 9.a AVVV, AVVV-BE, AVBV, AVHD, PV05 2025 NL (druk 27-11-2025); 9.b idem UK; 9.c NL met eigen bedrijfslogo; 9.d UK met eigen bedrijfslogo; 9.e Consumentenbijsluiter garantiecertificaat (IPID); 9.f Consumer leaflet (IPID UK); 9.g Algemene Opslagvoorwaarden (2022); 9.h AVSST 2018; 9.i AVSST 2018 UK; 9.j AVSST 2018 UK met eigen logo; 9.k AVB 2020 NL EV met logovak (01-05-2020); 9.l AVB 2020 UK EV met logovak.
- 10. Modelformulieren: 10.a AVHD Opdrachtformulier handymandiensten (consumenten); 10.b AVHD Clausuleblad; 10.c/10.d Modelovereenkomst Self-storage (HOVK-AVSST 2018, NL en UK); 10.e "Model Verhuisofferte- en overeenkomst 2025 digitaal"; 10.f/10.g "Model Bewaarnemingsovereenkomst 2025" NL en UK.
- Het handboek zelf (de hoofdstukken 1-8) zit niet bij de bronnen.

### Marktdossier verhuisbranche [EV/marktdossier-verhuisbranche]

- Doelgroep: "Voor inkopers van verhuisdiensten" (aanbestedende diensten, facilitair managers).
- Inhoud: typering projectverhuizingen; verhuisdiensten (advies, handyman, opslag, archivering, arthandling, digitaliseren, kantoorinrichting, ICT-afkoppeling, ergonomie, schoonmaak, conciërgediensten, afval); typering leveranciers (klein: omzet max. € 400.000, 2 wagens, max. 5 medewerkers; middel: € 400.000-750.000, 3 wagens, 5-10 medewerkers; groot: boven € 1.500.000, meer dan 4 wagens, meer dan 20 medewerkers); samenwerkingsverbanden; marktverhoudingen; vechtmarkt; dynamiek (ca. 25% omzet uit andere diensten; dalende volumes per projectverhuizing door flexplekken en digitalisering); trends; keurmerken; branchevereniging; "Handreiking inkoop verhuisdiensten" met "8 praktische tips" en voorbeeld-bestekteksten; AVB 2020 voor zakelijke verhuizingen; "Milieuzones: voor verhuiswagens geldt een ontheffingsregeling op grond van bijzondere voertuigen tot 2030."; MVI-criteria van het Rijk (categorie Verhuisdiensten); WVG-vergunningcheck.

### Gebruikersovereenkomst [EV/gebruikersovereenkomst]

Disclaimer van de website: geen aansprakelijkheid voor verouderde of onjuiste informatie of voor sites van derden; "Niets uit de tekst of grafische voorstellingen in deze internetsite mag worden verveelvoudigd en/of openbaar gemaakt ... zonder schriftelijke toestemming van de Organisatie voor Erkende Verhuizers."

### Exposanten en sponsoring ALV [EV/exposanten]

- Stand binnen 1 x 3 meter incl. statafel (dubbele stand mogelijk), inclusief deelname aan het hele programma met catering en logovermelding in uitingen van de OEV "waaronder vakblad Verhuizen en de ledensite".
- Tarieven (excl. btw): adverteerders in vakblad Verhuizen € 336 per stand en € 28 per persoon (max. 3 per bedrijf); niet-adverteerders € 437 per stand en € 36 per persoon; sponsors 50 procent korting.
- Sponsoropties: poffertjeskraam € 600 (gereserveerd), ijscokar € 1.000 (gereserveerd), barista € 850 (gereserveerd), troubadour € 700, borrel/dinerbuffet € 2.000, activiteiten (boogschieten, zwaardvechten, fietstocht Woudrichem) variabel.
- Geregistreerde leveranciers zonder stand: welkom bij borrel/dinerbuffet vanaf 17.00 uur (max. 2 per bedrijf).

### Overig ledenaanbod

- Campagnemateriaal (beelden, logo, banners, checklists) [EV/campagne].
- Ledensite mijnerkendeverhuizers.nl met inhuurplatform [EV/privacy]; "Via onze ledensite blijft u op de hoogte van alle ontwikkelingen." [EV/erkende-verhuizer-worden, punt 6].
- Branche RI&E, (thema)bijeenkomsten, workshops, promotiemateriaal, "veelal gratis" [EV/erkende-verhuizer-worden, punt 6].
- Opleidingen via Verhuiscollege met SOOB-subsidie en Code 95 [EV/erkende-verhuizer-worden, punt 2].
- Offerteleads via erkendeverhuizers.nl en verhuizen.nl, "uitsluitend Erkende Verhuizers" [EV/erkende-verhuizer-worden, punt 4].
- KTO-widget voor de eigen website [REGL art. 2.6.b].
- Vakblad en evenementen (sectie 1); Garantiecertificaatmodule bij Schouten Zekerheid (sectie 4).
- Geschillencommissie: automatische aansluiting via de OEV [EV/erkende-verhuizer-worden, punt 8].

---

## 10. Niet gevonden / open vragen

1. Oprichtingsjaar en formele rechtsvorm: alleen "vereniging" en drie uiteenlopende leeftijdsclaims (ruim 50, meer dan 55, meer dan 60 jaar); geen statuten of oprichtingsdatum. Betekenis van "SAVAM" (REGL art. 1.1) en de relatie met "Savamproducts" onbekend.
2. Namen van bestuur, directie en bureaumedewerkers: niet in de bronnen (alleen een voornaam-e-mailadres "ryanne@").
3. Bedragen: aanvraagkosten, auditkosten, jaarcontributie per vakafdeling, kosten Geschillencommissie voor de consument, eventuele kosten Codekamer: nergens genoemd. Wel bekend: vakbladabonnement niet-leden € 144 (2026), no-show fee € 50, exposantentarieven.
4. Reglementsversie: de site spreekt van "Reglement Erkende Verhuizers 2026 (v.8-12-2025, incl overzicht wijzigingen)" en "Checklist EV audit (versie 12-12-2025 reglement 2026)", maar de gelinkte PDF is het reglement 2024 (v1.4, 19-09-2023). Wijzigingen 2024 naar 2026 zijn onbekend. De site-eis "Ten minste één C-rijbewijs verhuisauto" staat niet in het reglement 2024 en is mogelijk een 2026-toevoeging.
5. KIWA: de site noemt KIWA als certificerende instelling, het reglement 2024 niet (bedrijfsbezoek "door of namens het CBO"). Contract, auditfrequentie en auditduur onbekend.
6. Ledenaantal per regio, aantal vestigingen, aantal EPV-leden: niet als getal beschikbaar; alleen "197 leden" totaal en de gemeentelijst.
7. Tegenstrijdige cijfers in de bronnen zelf (bij gebruik op de Kievit-site één bron kiezen en dateren):
   - schadefrequentie: 1,07% (YTD) [EV/waarom-erkende-verhuizer], "minder dan 1%" (YTD 2022) [EV/wat-te-doen-bij-verhuisschade], 0,8% [EV/verhuisservice];
   - klantwaardering: 9.5 (footer, 12.256 reviews in 12 maanden) versus "gemiddeld 9,4" [EV/verhuisservice];
   - telefoonnummer: 070-3401788 (contact/footer), 070-3401780 (exposanten), 079-3401788 (rechtsvormwijziging);
   - AVB-dekking: € 2.500.000 per gebeurtenis [REGL art. 2.2.d] versus "minimaal € 2.268.901 per aanspraak" [SVV lid 2];
   - opslagdekking Garantiecertificaat NL: 12 maanden (site, AVVV 2025) versus "de eerste 6 maanden" [SVV lid 3, versie 17-9-2024, verwijst naar AVVV 2015];
   - CO2-compensatie: "twee Gold standard compensatieprojecten: een waterpompproject in Malawi en een project ... in Mongolië" [EV/...verantwoord-verhuizen-garanties] versus "een WNF Gold standard compensatieproject: een cookstove project in Malawi" [EV/...maatschappelijke-inzet].
8. "3 miljoenste verhuizing": geen uitleg van de actie (wat wint de klant, looptijd, telling).
9. Tom: geen achternaam, bedrijf of productiegegevens van de videoreeks.
10. Lege pagina's op de site: "Aanmeldformulier", "Garantiecertificaten aanmaken", "KTO evenement", "Offerte aanvragen" (alleen de standaard CTA in de tekstexport; de formulieren zelf zijn dynamisch).
11. Exacte artikelteksten van de AVVV 2025 (art. 4, 8, 23, 15-18), de PV05-polisvoorwaarden en de IPID-bijsluiter zitten niet in deze bronnenset; de site verwijst er wel naar. Ook het "OEV-handboek verzekeren 2026" zelf en de "Checklist EV audit" ontbreken.
12. NKEV: de OEV-pagina legt niet uit waar NKEV voor staat of wie erachter zit; andere concurrerende labels worden niet bij naam genoemd.
13. "Euro-vergunning": niet genoemd; de bronnen spreken uitsluitend van de NIWO-vergunning op grond van de Wet wegvervoer goederen (WVG).
14. Relatie OEV en TLN: alleen indirect (werkgeversorganisatie vereist; bij rechtsvormwijziging "nieuw lidmaatschap van TLN"); of TLN-lidmaatschap formeel verplicht is voor alle leden staat niet letterlijk in het reglement.
15. Top Movers: alleen genoemd als een van de vier grootste samenwerkingsverbanden [EV/marktdossier-verhuisbranche] en in een ledennaam ("Holwerda Top Movers"); over de verhouding tussen het keurmerk en het samenwerkingsverband zeggen de bronnen alleen dat netwerken en samenwerkingsverbanden onder REGL art. 3.9 en de bemiddelingsregels van art. 2.13 vallen.
