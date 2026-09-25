# Merk, huisstijl en website van Top Movers

Stand: 25 augustus 2026. Online bronnen zijn geraadpleegd op 25-08-2026, tenzij anders vermeld.

Padafkortingen in de bronvermeldingen (volledige paden staan onder "Bronnen"):
- `bronteksten/topmovers-nl/` = bronteksten/topmovers-nl/ (crawl van topmovers.nl, 25-08-2026)
- `bronteksten/kievit-faq/` = bronteksten/kievit-faq/
- `bronteksten/topmovers-nl/css/` (stylesheets van topmovers.nl, met curl opgehaald op 25-08-2026)
- `bronteksten/ledensites/` (homepages van ledensites, met curl opgehaald op 25-08-2026)
- `beeldbank/` = ../ (alleen gelezen)

Waar een citaat in de bron een lang streepje of een streepje tussen tijden of bedragen bevat, is dat hier vervangen door een komma of een gewone hyphen; verder is niets aan citaten veranderd.

## Kern in 10 regels

1. De officiële schrijfwijze is "Top Movers", twee woorden, beide met hoofdletter; de rechtspersoon heet Top Movers Nederland B.V., KvK 09190844, Btw-ID NL 8203.04.918.B01, Meander 251, 6825 MC Arnhem (bron: bronteksten/topmovers-nl/pages/contact-met-top-movers.md; https://www.erkendeverhuizers.nl/lid/top-movers-nederland-b-v/).
2. De pay-off is "Aanpakkers met impact!" (WordPress-tagline, op elke pagina in de JSON-LD, en de LinkedIn-tagline); daarnaast lopen de campagneslogan "Let's move to zero!", de ledenafsluiter "Let's move!" en de reviewkop "Ze doen het!" (bron: bronteksten/topmovers-nl/html/home.md; https://nl.linkedin.com/company/top-movers; bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md voor "Let's move!"; bronteksten/topmovers-nl/html/vestigingen__de-kievit-verhuizingen.md voor de reviewkop, die uit een global section komt en niet in de REST-tekst staat).
3. De kernbelofte is "Verhuizen zonder zorgen, dat is wat we doen." en "van A tot Z (compleet) verzorgd"; de site positioneert Top Movers als "een professioneel, innovatief, duurzaam en verhuisbedrijf" (letterlijk, inclusief de grammaticale fout) en op de vestigingspagina's als "een professioneel, proactief en innovatief verhuisbedrijf" (bron: bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md; bronteksten/topmovers-nl/pages/over-ons.md; bronteksten/topmovers-nl/pages/particuliere-verhuizingen.md).
4. Merkkleuren volgens de Elementor-kit van topmovers.nl: primair #00A19B (teal), secundair #C4E4E4, tekst #1D1D1B, accent #EE7203 (oranje), extra #E5F3F3; het bijtje en de "Let's move to zero"-ster gebruiken geel #FFD511 (bron: bronteksten/topmovers-nl/css/post-8.css; beeldbank/topmovers/logos-certificaten/2026-08_LMTZ-ster.png).
5. Lettertypen: Poppins (koppen, gewicht 700), Noto Sans (lopende tekst en knoppen) en Zilla Slab (grote display-koppen en het desktopmenu) (bron: bronteksten/topmovers-nl/css/post-8.css; bronteksten/topmovers-nl/css/post-362.css; bronteksten/topmovers-nl/css/post-6476.css).
6. Het logo is een zwart, cursief kapitaal woordmerk "TOP MOVERS" met een teal swoosh en pijl; er is een witte variant en een "duurzaam"-variant met een bij; de beeldbank heeft alleen PNG's (het hoofdlogo en de witte variant 813x387 px, de duurzaam-variant 824x519 px), geen vectorbestand (bron: ../topmovers/logos-certificaten/; ../topmovers/manifest.csv).
7. Leden noemen zich "<Naam> Top Movers" (Meta Top Movers, Holwerda Top Movers, Harrie van Erp Top Movers, Ter Haar Top Movers, Boudesteijn Top Movers, "de Kievit Top Movers") en tonen het Top Movers-logo naast het eigen logo in de header en/of in een keurmerkenbalk in de footer (bron: bronteksten/ledensites/meta.nl.html; bronteksten/ledensites/holwerdatopmovers.nl.html; bronteksten/ledensites/harrievanerp.nl.html; bronteksten/ledensites/debresser.nl.html; bronteksten/ledensites/de-kievit.nl.html; bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md).
8. topmovers.nl draait op WordPress 7.0.4, Elementor 4.2.1 plus Elementor Pro, thema Rey met child-thema, WPForms, Yoast SEO 28.1, Cookiebot en Google Tag Manager GTM-TDLFPF9; de sitemap telt 213 URL's: 69 pagina-URL's (64 van de 65 gecrawlde REST-pagina's, /bedankt-zakelijk/ ontbreekt in de sitemap, plus de homepage en vier zakelijke dienst-URL's zonder eigen REST-item; daaronder 21 stadslanders "Zakelijk verhuizen in <stad>"), 46 blogposts, 45 vestigingspagina's voor 15 leden plus Top Movers Nederland, 3 vacatures, 14 global sections, 31 tag-archieven, 3 auteursarchieven en 2 archief-URL's (bron: bronteksten/topmovers-nl/html-ruw/home.html; bronteksten/topmovers-nl/INDEX.md; bronteksten/topmovers-nl/urls.txt; bronteksten/topmovers-nl/api/types.json; eigen telling 25-08-2026).
9. Conversie op topmovers.nl loopt via het centrale nummer 088-1990900, info@topmovers.nl, vijf soorten WPForms-formulieren (contact, particuliere offerte, zakelijke offerte, "Bel mij terug!" en een evenementaanmelding), samen 35 verschillende formulier-ID's omdat elk lid een eigen offertepaar heeft, een postcodezoeker en de bedankt-pagina's /bedankt/ en /bedankt-zakelijk/; er is geen chat en geen WhatsApp-knop (bron: bronteksten/topmovers-nl/html-ruw/contact-met-top-movers.html; bronteksten/topmovers-nl/html-ruw/vestigingen__de-kievit-verhuizingen.html; bronteksten/topmovers-nl/html-ruw/home.html).
10. Te vermijden op de Kievit-site: vier dienst-URL's die 404 geven maar 49 tot 51 keer gelinkt zijn, 38 dode gemeentelinks vanuit de stadslanders, 45 vestigingspagina's zonder eigen adres of telefoonnummer, identieke duplicaten met "-2" tot "-7", een testpagina en een oude homepage die live staan, 29 pagina's met dezelfde meta description inclusief typefout, en tegenstrijdige aantallen leden en locaties (15 of 16 bedrijven, 22, 23 of 25 locaties) (bron: bronteksten/topmovers-nl/INDEX.md; bronteksten/topmovers-nl/html/*.md; curl-statuscontrole 25-08-2026, zie sectie 4.8).

## 1. Merk

### 1.1 Naam, schrijfwijze en rechtspersoon

De naam wordt op topmovers.nl vrijwel uitsluitend als "Top Movers" geschreven: 877 treffers in de schone paginateksten (pagina's, posts, vestigingen, vacatures). Afwijkingen: "Topmovers" 1 keer (in een citaat van Stichting Cliniclowns), "Top movers" 2 keer (blogpost "Show, don't tell"), "Top-Movers" 11 keer, uitsluitend in bestandsnamen van PDF's en PNG's, en "TopMovers" alleen in bestandsnamen van foto's (bijvoorbeeld "TopMovers-mannen-header"). De kleine-letter-variant "topmovers" komt 1.810 keer voor, maar dat is de domeinnaam in URL's (bron: bronteksten/topmovers-nl/pages/*.md, bronteksten/topmovers-nl/posts/*.md, bronteksten/topmovers-nl/vestigingen/*.md, bronteksten/topmovers-nl/vacatures/*.md, telling 25-08-2026; ../topmovers/manifest.csv).

Een lid wordt in het enkelvoud "een Top Mover" genoemd: "is er altijd een Top Mover bij u in de buurt" (38 keer, op 38 van de 45 vestigingspagina's; de vier pagina's van Top Movers Nederland, de twee van Van Riemsdijk en een van Vlotweg missen de zin) en "Bent u op zoek naar een Top Mover bij u in de buurt?" (bron: bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md; bronteksten/topmovers-nl/pages/over-ons.md).

De rechtspersoon: "Top Movers Nederland BV, Meander 251 6825 MC Arnhem, 088 199 09 00, Info@topmovers.nl, KvK-nummer: 09190844, Btw-ID: NL 8203.04.918.B01" (bron: bronteksten/topmovers-nl/pages/contact-met-top-movers.md). Postadres in de footer: "Postbus 5085 6802 EB ARNHEM" (bron: bronteksten/topmovers-nl/html/home.md). De ledenpagina van Erkende Verhuizers noemt dezelfde naam en hetzelfde KvK-nummer, maar een ander telefoonnummer: 026-3763465 (bron: https://www.erkendeverhuizers.nl/lid/top-movers-nederland-b-v/, geraadpleegd 25-08-2026). Op zakelijkverhuizen.nl (register Erkende Projectverhuizers) staat eveneens "Top Movers Nederland B.V." met 026-3763465 (bron: https://www.zakelijkverhuizen.nl/vind-hier-uw-erkende-projectverhuizer/top-movers-nederland-bv/, geraadpleegd 25-08-2026). De LinkedIn-bedrijfspagina heet "Top Movers Nederland BV" (bron: https://nl.linkedin.com/company/top-movers, geraadpleegd 25-08-2026). Leden schrijven het op LinkedIn soms aaneen: "P.A. van Rooyen Topmovers" en "Van Riemsdijk verhuizingen BV | Top Movers Amsterdam" (bron: zoekresultaat-titels van https://nl.linkedin.com/in/patrickvanrooyen/nl en https://nl.linkedin.com/company/van-riemsdijk-verhuizingen-amsterdam-top-movers, 25-08-2026).

Herkomst van de naam: Top Movers is in 1988 opgericht na "een SAVAM-studiereis naar de VS"; de naam kwam van "een leraar Engels die door Dirk van der Ent werd gevraagd om een pakkende, internationaal begrepen handelsnaam", en "Top Movers was meteen raak"; het verband groeide "van zeven bedrijven bij de oprichting tot 15 bedrijven met 25 locaties" (bron: https://www.erkendeverhuizers.nl/nieuws/150-jaar-p-a-van-rooyen-top-movers-en-35-jaar-samenwerkingsverband-top-movers/, artikel uit Vakblad Verhuizen 2024-6, geraadpleegd 25-08-2026). De Nationale Franchisegids typeert Top Movers als "samenwerkingsverband van erkende professionele Nederlandse verhuisfirma's", type samenwerking "Hard Franchise", "Werkt met ondernemers sinds" 1998 (dus geen oprichtingsjaar) en bij Inkoop de opmerking "De website wordt gemeenschappelijk geregeld" (bron: https://www.denationalefranchisegids.nl/dienstverlening/top-movers/, geraadpleegd 25-08-2026). LinkedIn vermeldt "Opgericht: 1923" (bron: https://nl.linkedin.com/company/top-movers). Twee bronnen noemen een oprichtingsjaar en ze spreken elkaar tegen: 1988 (Vakblad Verhuizen 2024-6 via erkendeverhuizers.nl, geraadpleegd 25-08-2026) tegenover "Opgericht 1923" op LinkedIn (bron: https://nl.linkedin.com/company/top-movers; lokale kopie bronteksten/topmovers-nl/pdf/li-tm.html). Het jaartal 1998 van de franchisegids staat er als "Werkt met ondernemers sinds" en is dus geen derde oprichtingsjaar. Zie "Open vragen"; 1923 is vermoedelijk het oprichtingsjaar van een lid en niet van het verband [ONZEKER: niet bevestigd].

### 1.2 Pay-offs en slogans

| Slogan | Waar gebruikt | Bron |
|---|---|---|
| "Aanpakkers met impact!" | WordPress-tagline: staat als `WebSite.description` in de JSON-LD van elke pagina (211 keer) en in de Yoast-fallbacktitel "Top Movers - Aanpakkers met impact!"; LinkedIn-tagline "Aanpakkers met impact"; afsluiter van blogs: "Top Movers, aanpakkers met impact"; kop "Aanpakkers met impact" in het netwerkartikel; als tekstbadge (aanpakkers.svg, 68x26 px, teal #34A39F) in de header naast het logo | bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/api/types.json; https://nl.linkedin.com/company/top-movers; bronteksten/topmovers-nl/pages/lets-move-to-zero.md; bronteksten/topmovers-nl/posts/next-level-samenwerken-de-kracht-van-het-top-movers-netwerk.md; bronteksten/topmovers-nl/html-ruw/home.html; beeldbank/topmovers/iconen/2025-11_aanpakkers.svg |
| "Let's move to zero!" (ook "Let's Move To Zero!") | Menu-item onder Duurzaamheid, eigen pagina /lets-move-to-zero/, header-beelden 2026-08, de ster met bij (LMTZ-ster.png, tevens og:image van de homepage), afsluiter "Top Movers, Let's Move To Zero"; omschreven als "het duurzaamheidsinitiatief van Top Movers. Ons doel is het bereiken van nul koolstofuitstoot en nul afval" | bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/pages/lets-move-to-zero.md; bronteksten/topmovers-nl/posts/landelijke-ev-dekking-top-movers.md; ../topmovers/graphics/ |
| "Let's move to Zero Downtime" | Blogtitel van 10 juli 2026, variant op de campagne voor zakelijke verhuizingen | bronteksten/topmovers-nl/posts/lets-move-to-zero-downtime.md |
| "Let's move!" | Afsluiting van het offerteblok op alle 45 vestigingspagina's en van de zakelijke dienstenpagina: "Het succes van uw bedrijfsverhuizing ligt in efficiëntie en een aanpak op maat. Let's move!" | bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md; bronteksten/topmovers-nl/pages/zakelijke-verhuizingen.md |
| "Ze doen het!" | Kop boven het reviewblok op de homepage en op elke vestigingspagina (geschreven als "Ze doen het!" tussen aanhalingstekens); LinkedIn-tekst: "Dat de klant achteraf zegt 'geen idee hoe ze het doen, maar ze doen het!'" | bronteksten/topmovers-nl/html/home.md; https://nl.linkedin.com/company/top-movers |
| "Verhuizen zonder zorgen, dat is wat we doen." | 19 keer, geteld in de volledige paginateksten (in de schone REST-teksten 3 keer, de rest komt uit global sections); H1 van de particuliere dienstenpagina is "Verhuizen zonder zorgen", zakelijk "Zakelijk verhuizen zonder zorgen"; meta description Over ons: "Verhuizen met Top Movers betekent verhuizen zonder zorgen" | bronteksten/topmovers-nl/pages/over-ons.md; bronteksten/topmovers-nl/pages/particuliere-verhuizingen.md; bronteksten/topmovers-nl/pages/zakelijke-verhuizingen.md |
| "Uw verhuizing (compleet) van A tot Z (verzorgd)" | Hero-H1 van alle vestigingspagina's ("Uw verhuizing compleet van A tot Z"), meta title van /verhuizing/, /bedankt/ en /bedankt-zakelijk/ ("Uw verhuizing van A tot Z verzorgd"); "van A tot Z" komt 167 keer voor in de schone REST-teksten (81 van de 159 items), waarvan 83 keer als "compleet van A tot Z" op de vestigingspagina's | bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md; bronteksten/topmovers-nl/pages/bedankt.md |
| "Emissievrij verhuizen van A tot Z verzorgd" | H3 op de homepage | bronteksten/topmovers-nl/html/home.md |
| "Professionele aanpakkers Zakelijk en particulier" | H2 op de oude homepage /verhuizing/ | bronteksten/topmovers-nl/pages/verhuizing.md |
| "Samen sterk voor uw verhuizing" | H2 bovenaan Over ons | bronteksten/topmovers-nl/pages/over-ons.md |
| "Top Movers, because we care!" | Slotzin van de Academy-pagina | bronteksten/topmovers-nl/pages/top-movers-academy.md |
| "Show, don't tell." | Blogtitel en slotzin, mei 2026 | bronteksten/topmovers-nl/posts/show-dont-tell.md |
| "Doe mee aan onze verhuizing naar een duurzamere wereld!" | Duurzaamheidspagina | bronteksten/topmovers-nl/pages/duurzaamheid.md |

Toon in meta descriptions: bijna elke pagina eindigt op een oproep, zoals "Neem vandaag nog contact met ons op!" (bron: bronteksten/topmovers-nl/pages/diensten.md; bronteksten/topmovers-nl/pages/duurzaamheid.md).

### 1.3 Merkbeloften, positionering en kernwaarden

Positionering op de homepage (2026): "Duurzaam verhuizen | Emissievrij verhuizen | Top Movers" als titel en "Top Movers, specialist in duurzaam verhuizen. Uw bedrijf emissievrij verhuizen? Kies voor de efficiënte & milieubewuste aanpak van Top Movers" als meta description; de eerste twee blokken heten "Duurzaam zakelijk verhuizen" en "Duurzaam particulier verhuizen" (bron: bronteksten/topmovers-nl/html/home.md). Vaste positioneringszin: "Kiest u voor Top Movers, dan kiest u voor een professioneel, innovatief, duurzaam en verhuisbedrijf. Van het verhuizen van uw inboedel, het verhuizen van een zorginstelling met bewoners tot het verhuizen van ministeries of kunstcollecties ; alles wat verhuisd kan worden, verhuizen we voor u." (letterlijk, inclusief de grammaticale fout) (bron: bronteksten/topmovers-nl/html/home.md). Op de vestigingspagina's luidt de variant "een professioneel, proactief en innovatief verhuisbedrijf" (bron: bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md).

Ambitie: "Daarbij stellen wij als doel; 'de meest duurzame verhuisorganisatie van Nederland te zijn'." (bron: bronteksten/topmovers-nl/pages/duurzaamheid.md). LinkedIn-zelfbeschrijving: "Wij zijn Top Movers Nederland. Zakelijke verhuizers met een zero emissie streven en oog voor mensen en de wereld." (bron: https://nl.linkedin.com/company/top-movers).

Kernwaarden, letterlijk op de MVO-pagina: "De kernwaarden van Top Movers familiebedrijven, samenwerken, respect voor mens en milieu, kwaliteit en veiligheid" (de zin loopt door in een alinea over Cliniclowns) (bron: bronteksten/topmovers-nl/pages/mvo.md). De zelfidentificatie als familiebedrijven keert terug: "dat wij als familiebedrijven nu eenmaal hebben" (bron: bronteksten/topmovers-nl/pages/mvo.md). Medewerkersbelofte: "Onze verhuizers zijn de beste in de markt, zij hebben een positieve houding, zijn vitaal en bevlogen" en "blije medewerkers maken blije klanten!" (bron: bronteksten/topmovers-nl/pages/top-movers-academy.md).

Zeven "duurzame beloftes" gekoppeld aan SDG 8, 9, 11, 12, 13, 14 en 17 (bron: bronteksten/topmovers-nl/pages/lets-move-to-zero.md). Kwaliteitsbelofte: minimaal één klanttevredenheidsmeting per jaar en "Deze eisen gelden voor alle 25 aangesloten verhuisbedrijven van Top Movers in heel Nederland" (bron: bronteksten/topmovers-nl/pages/gecertificeerd-verhuizen.md).

### 1.4 Tone of voice

Aanspreekvorm per doelgroep, geteld in de schone teksten (woorden u/uw tegenover je/jij/jouw/jou):
- Pagina's (65): u/uw 636 keer, je-vorm 57 keer. De 21 stadslanders: 190 keer u, 0 keer je. Particuliere dienstpagina's (verhuisservice, inboedelopslag, montageservice samen): 57 keer u/uw, 0 keer je (bron: bronteksten/topmovers-nl/pages/*.md, telling 25-08-2026).
- Vestigingspagina's (45): u/uw 609 keer, je-vorm 0 keer (bron: bronteksten/topmovers-nl/vestigingen/*.md).
- Blogposts (46): u/uw 212 keer, je-vorm 165 keer; 27 posts gebruiken de je-vorm, 19 niet. De je-vorm zit in consumententips ("10 dingen die je doet voordat je gaat verhuizen", "Tips om je huisdieren te verhuizen"), de u-vorm in zakelijke artikelen ("Uw bedrijf naar het buitenland verhuizen?", "SDG 9 bij Top Movers: innovatie die u merkt") (bron: bronteksten/topmovers-nl/posts/*.md; bronteksten/topmovers-nl/INDEX.md).
- Vacatures (3): je-vorm 27 keer, u-vorm 0 keer: "Herken jij je hierin, stuur dan snel je cv naar : vacature@topmovers.nl" (bron: bronteksten/topmovers-nl/vacatures/aanpakkers-gezocht.md).

Conclusie voor de Kievit-site: klanten (particulier en zakelijk) worden met "u" aangesproken, sollicitanten met "je". Dit sluit aan bij de u-vorm die al voor De Kievit is vastgelegd (bron: bronteksten/kievit-faq/FEITEN-KIEVIT.md, kop "Toon").

Zinslengte: gemiddeld ongeveer 17,5 tot 18 woorden per zin op de pagina's en op de stadslanders en ongeveer 15 tot 16 in blogposts (bron: bronteksten/topmovers-nl/pages/*.md en bronteksten/topmovers-nl/posts/*.md, berekening 25-08-2026, gesplitst op punt, uitroepteken en vraagteken; de uitkomst schuift enkele tienden op afhankelijk van of koppen, lijsten en linkteksten meetellen, dus gebruik dit als orde van grootte en niet als exact getal). Stijlkenmerken met citaten:
- Korte, uitroepende afsluiters: "Dat is wat voor ons telt!", "Een nieuwe start is zo gemaakt!", "Let's move!" (bron: bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/pages/zakelijke-verhuizingen.md).
- Wij-vorm en "ontzorgen": "Wij denken met u mee en ontzorgen." en "Wij werken om u te ontzorgen." (bron: bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/pages/zakelijke-verhuizingen.md).
- Engelse leenwoorden en campagnetaal: "Handyman service", "Zero Downtime", "Next Level samenwerken", "Show, don't tell", "because we care" (bron: bronteksten/topmovers-nl/INDEX.md; bronteksten/topmovers-nl/pages/top-movers-academy.md).
- Humor is schaars en zit vooral in klantcitaten ("Professionele verhuizers met een goed portie humor.") (bron: bronteksten/topmovers-nl/pages/verhuizing.md). De teksten zijn verder zakelijk-enthousiast, niet grappig.
- Slordigheden komen regelmatig voor: "wordt uw verhuizing wordt" (29 meta descriptions), "lastste", "elektrisciteitsnet", "kilometerr", "waabij" (bron: bronteksten/topmovers-nl/pages/zakelijke-verhuizingen.md; bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/pages/lets-move-to-zero.md).

### 1.5 Terugkerende claims

| Claim | Formulering (citaat) | Bron |
|---|---|---|
| Landelijk | "Met een landelijk netwerk en aanwezigheid in iedere provincie is er altijd een Top Mover bij u in de buurt." ; "100% Landelijke dekking met Top Movers locaties door het hele land" ; "Top Movers heeft een 100% landelijke dekking van emissievrij (EV) transport opgebouwd in Nederland." | bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md; bronteksten/topmovers-nl/pages/lets-move-to-zero.md; bronteksten/topmovers-nl/posts/landelijke-ev-dekking-top-movers.md |
| Lokaal | Lijst van 22 plaatsen onder "Top Movers vindt u hier!" (Almere, Amsterdam Zuidoost, Arnhem, Beverwijk, Breda, Eindhoven, Emmen, Goes, Haarlem, Heerhugowaard, Hoensbroek, Leeuwarden, Mijdrecht, Oisterwijk, Oldenzaal, Oss, Rijswijk, Spijkenisse, Tilburg, Uithoorn, Venlo, Zwolle); "landelijke én internationale dekking met lokale betrokkenheid" | bronteksten/topmovers-nl/pages/over-ons.md; bronteksten/topmovers-nl/posts/next-level-samenwerken-de-kracht-van-het-top-movers-netwerk.md |
| Erkend en gecertificeerd | "Zo werkt Top Movers met de volgende certificaten: Kwaliteitskeurmerk ISO 9001, Certificaat Erkende Verhuizers, Milieucertificaat ISO 14001, Veiligheidscertificaat VCA, Certificaat Erkende Projectverhuizers PPV"; "Top Movers Nederland B.V. is sinds 2010 gecertificeerd voor de normen ISO 9001 en 14001 en VCA**. Sinds de herfst van 2024 beschikken ook alle leden van Top Movers Nederland B.V. over een VCA** certificaat"; ISO 27001 "doorloopt momenteel de auditfase en zal naar verwachting in 2026 volledig te zijn afgerond" | bronteksten/topmovers-nl/pages/erkende-verhuizers.md; bronteksten/topmovers-nl/pages/mvo.md; bronteksten/topmovers-nl/pages/gecertificeerd-verhuizen.md |
| Verzekerd | "Daarmee is uw inboedel tot wel 100.000 euro verzekerd tijdens uw verhuizing." (garantiecertificaat Erkende Verhuizers) | bronteksten/topmovers-nl/pages/erkende-verhuizers.md |
| Duurzaam (let op: het certificaat op topmovers.nl is verlopen; het geldende certificaat is 04189734, 06-05-2026 tot 06-05-2029, en de Kievit-entiteit staat niet meer in de organisatiegrens, zie hoofdstuk 04 sectie 2.5) | CO2-Prestatieladder: "onlangs trede 3 van deze ladder behaalt"; "Momenteel hebben niveau 3 op de CO 2 -prestatieladder bereikt"; reductiedoel "een totale reductie van 25 % in 2026 t.o.v. 2021"; "wagenpark van 80 elektrische voertuigen"; "98% van het verhuismateriaal dat wij gebruiken is milieuvriendelijk en wordt hergebruikt"; leden van "Stichting Positieve Impact, MVO Nederland en de Climate Neutral Group"; partner van Circulair Connect | bronteksten/topmovers-nl/pages/mvo.md; bronteksten/topmovers-nl/pages/duurzaamheid.md; bronteksten/topmovers-nl/pages/lets-move-to-zero.md; bronteksten/topmovers-nl/pages/partner-van-circulair-connect.md |
| Kwaliteit en reviews | "Onze klanten waarderen Top Movers gemiddeld een 9,6." ; reviewlink naar klantenvertellen.nl/reviews/1065348/top_movers_nederland_bv | bronteksten/topmovers-nl/pages/verhuizing.md; bronteksten/topmovers-nl/pages/klanttevredenheid.md; bronteksten/topmovers-nl/html/home.md |
| Mensen | "ongewenst verloop op jaarbasis van slechts 1% op meer dan 500 medewerkers", eigen Top Movers Academy met "ruim 200 (up-to-date) online trainingen". LinkedIn geeft voor dezelfde organisatie bedrijfsgrootte "201 - 500 medewerkers", wat de claim "meer dan 500" tegenspreekt | bronteksten/topmovers-nl/pages/top-movers-academy.md; https://nl.linkedin.com/company/top-movers |
| Maatschappelijk | Jaarlijkse steun aan Stichting Cliniclowns; logo's van Voedselbank, Oxfam en Sophia Kinderziekenhuis Fonds in de mediabibliotheek | bronteksten/topmovers-nl/pages/mvo.md; beeldbank/topmovers/logos-certificaten/2021-09_unnamed.jpg (Voedselbank); 2021-09_oxfam.png; 2022-08_Asset-1-3.png (Sophia Kinderziekenhuis Fonds) |

Aantallen zijn onderling tegenstrijdig en moeten op de Kievit-site vermeden of geverifieerd worden:
- "Top Movers bestaat uit 15 aangesloten verhuisbedrijven" (contactpagina) en "Alle 15 aangesloten verhuisbedrijven" (op 38 van de 45 vestigingspagina's) (bron: bronteksten/topmovers-nl/pages/contact-met-top-movers.md; bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md; telling 25-08-2026).
- "alle 25 aangesloten verhuisbedrijven van Top Movers" en "de 25 locaties" (bron: bronteksten/topmovers-nl/pages/gecertificeerd-verhuizen.md); "Top Movers telt inmiddels 25 vestigingen met 500+ medewerkers" en "Alle 25 Top Movers-locaties doen mee" (bron: bronteksten/topmovers-nl/pages/duurzaamheid.md).
- "onze 22 vestigingen in Nederland én onze internationale partners" (bron: bronteksten/topmovers-nl/posts/next-level-samenwerken-de-kracht-van-het-top-movers-netwerk.md, oktober 2025).
- "Met 25 vestigingen, 500 medewerkers en 16 erkende verhuisbedrijven is opschalen bij grote of gefaseerde projecten geen probleem" (bron: bronteksten/topmovers-nl/posts/sdg-9-bij-top-movers-innovatie-die-u-merkt.md). Dit is een vierde aantal bedrijven: 16 in plaats van 15.
- "15 bedrijven met 25 locaties" (bron: https://www.erkendeverhuizers.nl/nieuws/150-jaar-p-a-van-rooyen-top-movers-en-35-jaar-samenwerkingsverband-top-movers/); franchisegids, onder "Aantal vestigingen": 16 franchise (2024), 15 franchise (2025), 21 franchise (2026) (bron: https://www.denationalefranchisegids.nl/dienstverlening/top-movers/).
- De kaart in het eigen Duurzaamheidsverslag 2025 telt 23 locaties onder 15 bedrijfsnamen (bron: bronteksten/topmovers-nl/pdf/Duurzaamheidsverslag-2025-small.txt); de appendix van het CO2-Prestatieladder-certificaat telt zestien ledenentiteiten (bron: bronteksten/topmovers-nl/pdf/CO2-Prestatieladder-certificaat-Top-Movers-Nederland-B.V-1.txt). Dat zijn de twee meest controleerbare tellingen, want ze staan met naam en plaats in een eigen document van Top Movers.
- De reviewclaim "9,6" staat tegenover de klantenvertellen-pagina van Top Movers Nederland B.V. zelf: "8,8" uit 9 beoordelingen, 88 % beveelt aan (bron: https://www.klantenvertellen.nl/reviews/1065348/top_movers_nederland_bv, geraadpleegd 25-08-2026). De 9,6 is mogelijk een gemiddelde over de ledenprofielen [ONZEKER: berekeningswijze staat nergens].

Beste lezing van de aantallen: 15 of 16 aangesloten bedrijven, samen 22 tot 25 locaties, waarbij het vestigingen-posttype 45 pagina's telt voor 15 bedrijfsnamen plus Top Movers Nederland (bron: bronteksten/topmovers-nl/INDEX.md, sectie vestigingen; eigen telling van de 45 vestigingsbestanden 25-08-2026). Zonder bevestiging van Top Movers Nederland hoort geen van deze getallen op de Kievit-site.

## 2. Huisstijl

### 2.1 Logo en varianten in de beeldbank

Het hoofdlogo (2021-09_TOP-MOVERS-LOGO-RGB.png, 813x387 px, PNG met transparantie) bestaat uit het woord "TOP" in zware zwarte kapitalen, daaronder "MOVERS" in cursieve zwarte kapitalen, met een teal swoosh van linksonder naar een pijlpunt rechts; pixelanalyse geeft precies twee kleuren: zwart #000000 en teal #009FB4 (bron: beeldbank/topmovers/logos-certificaten/2021-09_TOP-MOVERS-LOGO-RGB.png, bekeken en geanalyseerd 25-08-2026; ../topmovers/manifest.csv). De witte variant (2021-09_TOP-MOVERS-LOGO-wit.png, 813x387) is volledig wit en is het logo dat Yoast als `Organization.logo` in de JSON-LD meegeeft (bron: ../topmovers/manifest.csv; bronteksten/topmovers-nl/html/home.md). In de header van topmovers.nl staat de RGB-versie, in de footer de witte (bron: bronteksten/topmovers-nl/html-ruw/home.html).

De "duurzaam"-variant met een bij boven de "P" staat in de mediabibliotheek van de-kievit.nl (2024-03_topmovers-logo-duurzaam.png, 824x519 px; nergens op een pagina gebruikt); kleuren zwart #000000, teal #009A97 en geel #FFD511 (bron: beeldbank/de-kievit-nl/logos/2024-03_topmovers-logo-duurzaam.png, bekeken 25-08-2026; ../de-kievit-nl/manifest.csv, kolom gebruikt_op_paginas = 0). De campagnester "Let's move to zero!" (2026-08_LMTZ-ster.png, 650x706) is een teal stervorm #009A97 met witte tekst, dezelfde bij en geel #FFD511 (bron: beeldbank/topmovers/logos-certificaten/2026-08_LMTZ-ster.png). De teal van het logobestand (#009FB4) wijkt dus af van de teal van de bij-variant en de ster (#009A97) en van de webkleur (#00A19B); welke waarde de officiële merkkleur is, staat nergens vast [ONZEKER: geen huisstijlhandboek gevonden].

Overige logo- en keurmerkbestanden in beeldbank/topmovers/logos-certificaten/ (38 bestanden) (bron: ../topmovers/logos-certificaten/; ../topmovers/manifest.csv):

| Bestand | Wat | Maat |
|---|---|---|
| 2021-09_Erkende-verhuizers-1.png | Logo Erkende Verhuizers (blauw #1B4B95 met oranje #ED8C1F, gemeten in het PNG op 25-08-2026) | 400x200 |
| 2021-09_Erkende-project-verhuizers.png, 2021-09_erkende-project-verhuizers-1.png | Logo Erkende Projectverhuizers | 400x200, 283x142 |
| 2021-09_ppv-logo-png-transparent.png | PPV-logo (oude naam Professionele Projectverhuizers) | 2400x2400 |
| 2021-09_bsi-iso-9001.jpg, 2021-09_bsi-iso-14001.jpg | BSI-certificaatlogo's, alt "Top Movers heeft een ISO 9001 certificering" en "Top Movers werkt duurzaam met ISO 14001" | 1272x591 |
| 2022-09_Gecertificeerd-ISO-9001-Kleur.png, 2022-09_Gecertificeerd-ISO-14001-Kleur.png, 2023-06_Gecertificeerd-CO2-Prestatieladder-Kleur.jpg | Ronde NCI-badges "Gecertificeerd" (op de homepage) | 535x546, 535x548, 535x542 |
| 2025-10_ISO-9001-Top-Movers-2024_2027.png, 2025-10_ISO-14001-Top-Movers-2024_2027.png | Certificaatafbeeldingen geldig 2024-2027 (gelinkt op Over ons) | 480x682, 497x705 |
| 2025-12_NCI-certificaat-CO2.png, 2025-12_NCI-certificaat-CO2-1.png | NCI-certificaat CO2 | 1212x1187 en 1083x1077 |
| 2021-09_VCA_logo_1000x569px_RGB_2.0.png, 2021-09_vca-logo-transparant.png | VCA-logo's | 642x303, 1000x451 |
| 2021-09_co2.png, 2023-04_image001.png, 2025-11_logo-co2-prestatieladder-web.jpg | CO2-Prestatieladder-logo's (image001: twee groene bladeren met "CO2-PRESTATIELADDER") | 309x198, 570x157, 1920x1080 |
| 2025-05_certificaten_volledig_verspreid.png, 2025-05_certificaten_duim_transparant.png | Patroonbeeld op teal met vijf keurmerken: Erkende Verhuizers, Erkende Projectverhuizers, VCA en de NCI-badges ISO 9001 en ISO 14001 (de CO2-Prestatieladder zit er niet in); alt "Top Movers is een gecertificeerd verhuisbedrijf." | 1920x1080 |
| 2025-12_CClogo-TM.png, 2025-12_Circulair-Connect.jpg | Circulair Connect | 432x169, 1280x558 |
| 2021-09_20170912160852_CliniClowns400x300.webp, 2021-11_LogoCliniclowns-x2.png | Cliniclowns | 400x300, 298x98 |
| 2021-09_unnamed.jpg | Voedselbank-logo (oranje hart met vork) | 512x464 |
| 2021-09_oxfam.png | Oxfam | 1787x1786 |
| 2022-08_Asset-1-3.png | Sophia Kinderziekenhuis Fonds (bij "Van der Ent 100 jaar") | 405x155 |
| 2021-10_De-leukste-werkplek.png | Badge "De leukste werkplek" | 364x343 |
| 2021-09_mvo.png, 2021-09_duurzaamheidsverslag.png | MVO-logo en cover duurzaamheidsverslag | 379x186, 525x743 |
| 2026-08_ESG.png, 2026-08_LMTZ-ster.png, 2026-08_results.png, 2026-08_sdgs.png | Vier campagnebeelden 2026 (ESG, ster, resultaten, SDG's) | ESG 650x676, de andere drie 650x706 |
| 2021-09_pngwing.com_.png, 2023-09_Naamloos-1.png | Zwart-witte keurmerken, bekeken 25-08-2026: pngwing is de BSI-badge "ISO 9001 Quality Management" met certificaatnummer FM31060, Naamloos-1 is het logo Erkende Verhuizers in zwart-wit | 1000x574, 400x200 |

De homepage toont onder de content in deze volgorde: een EV-truck (Top-Movers-EV2-2-kopie.webp), het CO2-Prestatieladder-webbeeld (logo-co2-prestatieladder-web.jpg), de Circulair Connect-badge Partner-van-CC-onderin.svg, de cover van het duurzaamheidsverslag, en dan de keurmerkenrij: Erkende verhuizers, Erkende project verhuizers, CO2 (co2.png), MVO (mvo.png), VCA (vca-logo-transparant.png), de drie ronde "Gecertificeerd"-badges ISO 9001, ISO 14001 en CO2-Prestatieladder en 7-SDGs.svg (bron: bronteksten/topmovers-nl/html-ruw/home.html, img-tags in documentvolgorde, telling 25-08-2026). De keurmerkbadges linken extern naar nci-certificering.nl, erkendeverhuizers.nl, erkendeprojectverhuizers.nl en vcagroep.nl (bron: bronteksten/topmovers-nl/html-ruw/home.html, domeinentelling).

Wat ontbreekt: een SVG- of EPS-versie van het Top Movers-logo, een logo met beschermde zone of minimale maat, en een huisstijlhandboek; het merkboek is niet online gevonden (bron: ../topmovers/logos-certificaten/; observatie, geen bewijs dat het niet bestaat).

### 2.2 Kleuren

Elementor-globals van topmovers.nl (kit post-8), letterlijk uit de CSS: `--e-global-color-primary:#00A19B; --e-global-color-secondary:#C4E4E4; --e-global-color-text:#1D1D1B; --e-global-color-accent:#EE7203; --e-global-color-01c6a0a:#E5F3F3;` en `e-page-transition{background-color:#FFBC7D;}` (bron: bronteksten/topmovers-nl/css/post-8.css, https://www.topmovers.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-8.css). Dezelfde vijf globals staan inline in de HTML van holwerdatopmovers.nl, wat wijst op een gedeelde sjabloonkit voor ledensites (bron: bronteksten/ledensites/holwerdatopmovers.nl.html).

| Rol | Hex | Waar gezien | Bron |
|---|---|---|---|
| Primair teal | #00A19B | Elementor primary; vulkleur van 28 van de 34 SVG's uit 2021 (`.st0{fill:#00A19B;}`), namelijk alle diensticonen; linkkleur (`--link-color:var(--e-global-color-primary)`) | bronteksten/topmovers-nl/css/post-8.css; beeldbank/topmovers/iconen/2021-09_verhuisservice.svg; beeldbank/topmovers/iconen/*.svg (telling 25-08-2026); bronteksten/topmovers-nl/html-ruw/home.html |
| Link-hover | #32B3AF | `--link-color-hover:#32b3af` in de Rey-instellingen | bronteksten/topmovers-nl/html-ruw/home.html |
| Teal, nieuwere iconen | #33A39F / #34A39F | 2025-11 iconenset (home.svg, zakelijk.svg) en de header-badge aanpakkers.svg | beeldbank/topmovers/iconen/2025-11_home.svg; 2025-11_aanpakkers.svg |
| Teal, campagne | #009A97 | LMTZ-ster en logo-duurzaam; iconenset gebruikt ook #009A96 (51 keer) | beeldbank/topmovers/logos-certificaten/2026-08_LMTZ-ster.png; beeldbank/topmovers/iconen/*.svg |
| Teal, logobestand | #009FB4 | TOP-MOVERS-LOGO-RGB.png | beeldbank/topmovers/logos-certificaten/2021-09_TOP-MOVERS-LOGO-RGB.png |
| Secundair lichtteal | #C4E4E4 | Elementor secondary; footertekst (`color:#C4E4E4`, Noto Sans 300) | bronteksten/topmovers-nl/css/post-8.css; bronteksten/topmovers-nl/css/post-154.css |
| Lichte tint | #E5F3F3 | Elementor extra global | bronteksten/topmovers-nl/css/post-8.css |
| Iconencirkel | #99D9D7 | Achtergrond van gestapelde iconen op de homepage | bronteksten/topmovers-nl/css/post-6476.css |
| Lichtteal in iconen | #C8E6E5 | 40 fill-declaraties in de SVG-set | beeldbank/topmovers/iconen/*.svg |
| Tekst / donker | #1D1D1B | Elementor text; 285 fill- en 139 stroke-declaraties in de SVG-set | bronteksten/topmovers-nl/css/post-8.css; beeldbank/topmovers/iconen/*.svg |
| Accent oranje | #EE7203 | Elementor accent; knoppen: `.elementor-button{background-color:var( --e-global-color-accent )` | bronteksten/topmovers-nl/css/post-8.css; bronteksten/topmovers-nl/css/post-154.css |
| Paginatransitie | #FFBC7D | `e-page-transition` | bronteksten/topmovers-nl/css/post-8.css |
| Geel (bij, ster) | #FFD511 | LMTZ-ster, logo-duurzaam; iconen gebruiken #FFD500 (98x), #FFD61F (5 vullingen en 10 lijnen) en donkergeel #C7A400 (80x) | beeldbank/topmovers/logos-certificaten/2026-08_LMTZ-ster.png; beeldbank/topmovers/iconen/*.svg |
| Hover geel | #E8C45C | Hover-achtergrond van de dienstkaarten op de homepage | bronteksten/topmovers-nl/css/post-6476.css |
| Donkerblauw vlak | #22314E | Achtergrond van een homepage-sectie (motion-effects layer) | bronteksten/topmovers-nl/css/post-6476.css |
| Navy in iconen | #1B496B | 77 fill- en 10 stroke-declaraties in de SVG-set | beeldbank/topmovers/iconen/*.svg |
| Grijs in iconen | #9D9C9C | 55 fill-declaraties | beeldbank/topmovers/iconen/*.svg |
| Warm wit verloop | #F6F4EC naar #FFFFFF | `linear-gradient(180deg, #F6F4EC 95%, #FFFFFF 83%)` in footer- en homepagesecties | bronteksten/topmovers-nl/css/post-154.css; bronteksten/topmovers-nl/css/post-6476.css |
| Keurmerkkleuren (niet van Top Movers) | Erkende Verhuizers blauw #184890 en oranje #E88818 | Logo-analyse | beeldbank/topmovers/logos-certificaten/2021-09_Erkende-verhuizers-1.png |

De Rey-themakleuren `--colors-green:#7ad03a; --colors-red:#cf2929; --colors-orange:#ffba00; --colors-blue:#2ea2cc` zijn frameworkstandaarden, geen merkkleuren (bron: bronteksten/topmovers-nl/css/ds-c11eb9b70f.css).

### 2.3 Typografie

Letterlijk uit de kit: `--e-global-typography-primary-font-family:"Poppins"; --e-global-typography-secondary-font-family:"Poppins"; --e-global-typography-text-font-family:"Noto Sans"; --e-global-typography-accent-font-family:"Noto Sans"; font-family:"Noto Sans", Sans-serif;` en `h1..h6{font-family:"Poppins", Sans-serif;font-weight:700;}`, `h2{font-size:22px;font-weight:700;line-height:36px;}`, `a{font-weight:700;}` (bron: bronteksten/topmovers-nl/css/post-8.css). Poppins en Noto Sans worden lokaal geserveerd via Elementor (uploads/elementor/google-fonts/bronteksten/topmovers-nl/css/poppins.css en notosans.css); Elementor draait met "google_font-enabled, font_display-auto" (bron: bronteksten/topmovers-nl/html-ruw/home.html, link- en generator-tags).

Zilla Slab wordt van Google Fonts geladen in alle 18 gewichten (`fonts.googleapis.com/css?family=Zilla+Slab:100,...,900italic&display=auto`) en daarnaast zelf gehost als "Zilla" (ZillaSlab-Bold, uploads/2025/11) (bron: bronteksten/topmovers-nl/html-ruw/home.html; bronteksten/topmovers-nl/css/post-362.css). Gebruik: desktopmenu-items `font-family:"Zilla", Sans-serif;font-size:16px;font-weight:600` (bron: bronteksten/topmovers-nl/css/post-362.css), display-koppen van 5em in de footer-/CTA-sectie, 3.2em met tekstschaduw en 45px vet op de homepage, en 40px voor icon-box-titels (bron: bronteksten/topmovers-nl/css/post-154.css; bronteksten/topmovers-nl/css/post-6476.css). Knoppen: `font-family:"Noto Sans", Sans-serif;font-weight:bold;line-height:25px`, icoon 20px, gap 10px (bron: bronteksten/topmovers-nl/css/post-154.css). Containerbreedte: `--container-max-width-x:1140px`; widget-afstand 20px (bron: bronteksten/topmovers-nl/css/post-8.css).

Kopieerbare specificatie: koppen Poppins 700, broodtekst Noto Sans 400 (footer 300), display en menu Zilla Slab 600/700, links vet.

### 2.4 Vormtaal

Afgeronde hoeken: kaarten op de homepage 15px en 10px, elementen in de footer-/CTA-sectie 20px, 10px en 5px, de menu-items in de desktopheader 50px, mobiel menu 30px (bron: bronteksten/topmovers-nl/css/post-6476.css; bronteksten/topmovers-nl/css/post-154.css; bronteksten/topmovers-nl/css/post-362.css; bronteksten/topmovers-nl/css/post-2981.css). Knoppen dragen de accentkleur (#EE7203) met witte Noto Sans-tekst en een pijlicoon; in de footer-global-section (post-154) staan drie knopvarianten met een volledig transparante accentkleur (`background-color:#EE720300`), waarvan er twee op alle breekpunten verborgen zijn (bron: bronteksten/topmovers-nl/css/post-154.css; bronteksten/topmovers-nl/html-ruw/home.html, klassen elementor-hidden-desktop/tablet/mobile). Terugkerende pijltjes: Pijltje.svg, Pijl.svg, witte-pijl.svg, right-arrow.svg (bron: ../topmovers/iconen/; bronteksten/topmovers-nl/html-ruw/home.html, vijf keer Pijltje.svg in de stappensectie).

### 2.5 Beeldstijl

De beeldbank bevat 86 eigen foto's van Top Movers (bron: ../README.md). Kenmerken uit het manifest (bron: ../topmovers/manifest.csv):
- Een fotoserie uit oktober 2021 (bestandsnamen "topmovers-4" tot "TOPMOVERS-R2", grotendeels 1800x1200 px, met uitschieters als TOPMOVERS-R2 1800x1043 en Verhuur-verhuislift-verhuur-topmovers-56s 1920x1280) met verhuiswagens in Top Movers-belettering, verhuizers aan het werk, ICT-verhuizing (alt "ICT verhuizen"), opslag ("opslag-TOPMOVERS-44.jpg"), verhuislift ("Verhuur-verhuislift-verhuur-topmovers-56s.jpg") en een elektrische truck ("100-elektrisch-Top-Mover-truck.jpg", 1800x1198).
- Projectfoto's 2025: schoolverhuizing met gecodeerde kratten (alt "Schoolverhuizing met Gecodeerde kratten en kisten"), Grafisch Lyceum Rotterdam, Kardex-lades, Noordwest Ziekenhuisgroep Alkmaar; teamfoto's "Directeuren samen" en "TopMovers-mannen-header" (drie varianten, 1280x861).
- Headers 2026-08 in webp (1980x1105, 1916x1009) en vier "Let's move to zero"-headers (graphics); truck-cutouts als PNG (TM-truck.png 947x1021, Electric-truck-topmovers-TM-small.png).
- Video: de mediabibliotheek bevat 10 mp4-headerloops (180 MB, niet gedownload); in de gecrawlde HTML worden slechts twee mp4's ingebed, beide in blogposts (POST-CERTIFICATEN.mp4 en TopMover-School-verhuizing-HR-4sec.mp4) (bron: ../README.md; bronteksten/topmovers-nl/html-ruw/maken-certificaten-het-verschil-bij-een-verhuizing.html; bronteksten/topmovers-nl/html-ruw/top-movers-verhuist-2-scholen.html).
- De homepage opent met de LMTZ-ster als eerste contentbeeld en gebruikt geen achtergrondvideo in de gecrawlde HTML (bron: bronteksten/topmovers-nl/html-ruw/home.html).
- Foto's van leden (21 in fotos-leden, zoals "Boudesteijn-Top-movers", "Holwerda-top-movers-almere", "Van-Rooyen-Top-Movers") tonen trucks en panden van andere leden en zijn niet voor De Kievit bedoeld (bron: ../README.md; ../topmovers/manifest.csv).
- Stock: 23 beelden, Unsplash en Pixabay vrij bruikbaar, vier Shutterstock-previews met watermerk en één canstockphoto niet gebruiken (bron: ../README.md).
- Voor De Kievit specifiek staat op de vestigingspagina één foto: topmovers/fotos/2021-10_7e034cf4-f865-44bc-9668-cffc61e3e39f.jpg. Die foto is Kievit-eigen: een witte MAN-trekker met "topmovers.nl" op het front en een oplegger met het Kievit-logo en het opschrift "KIEVIT VERHUIZINGEN", geparkeerd op een oprit naast een woonhuis. De omschrijving "een Top Movers-truck aan zee" in ../README.md is onjuist; het beeld is bij het schrijven van hoofdstuk 02 zelf bekeken (bron: het bestand zelf, bekeken 25-08-2026; dossier/02-leden-en-vestigingen.md sectie 10; foutieve omschrijving in ../README.md). In de JSON-LD van dezelfde pagina staat als thumbnail wel het generieke TM-truck.png (bron: bronteksten/topmovers-nl/html-ruw/vestigingen__de-kievit-verhuizingen.html).

Graphics (42): kaart van Nederland (map-nederland.png 1227x1425), LinkedIn-advertenties 1080x1080, brochurecovers 1195x1498 (bedrijf, verhuizingen, checklist NL, checklist, addendum), infographics uit 2023-09 ("ambitie", "blok", "midden"), "duurzame dozen", Handyman- en Zero Downtime-headers (bron: ../topmovers/graphics/; ../topmovers/manifest.csv).

Praktische regel uit de eerdere beeldsessie: gebruik van Top Movers-beeld is met Top Movers afgestemd (bron: ../README.md).

### 2.6 Iconen

De map iconen/ telt 70 bestanden: 68 SVG's en 2 PNG's (arrowtooltip.png en cropped-arrowtooltip.png) (bron: ../topmovers/iconen/; telling van de map 25-08-2026). Drie generaties:
- 2021-09 diensticonen: 27 van de 34 bestanden uit 2021 hebben `viewBox="0 0 70.4 66.5"`, één vlakke vulkleur `.st0{fill:#00A19B;}` en soms lijnen van 3px met ronde uiteinden (`stroke:#00A19B;stroke-width:3;stroke-linecap:round;stroke-linejoin:round`); één bestand heeft daarnaast een onzichtbaar hulppad (`.st3{fill:none;}`), een zwart basispad zit er niet in (bron: beeldbank/topmovers/iconen/2021-09_verhuisservice.svg; 2021-09_co2-neutraal.svg; 2021-09_verhuislift-1.svg; controle op alle 2021-bestanden 25-08-2026). Titels in het manifest koppelen ze aan diensten: Verhuisservice, Inboedelopslag, Opleverdienst (Cleanservice.svg), Montageservice (handyman.svg), ICT-verhuizing en installatie, Verhuismaterialen huren (in-uitpakken-1.svg), Verhuislift, Internationale verhuizing, Opslag en beheer, Archiefopslag en beheer, Projectmanagement, Kunst verhuizen, Meubeltransport, Onderwijsinstellingen, Zorginstellingen, Facilitaire diensten, MVO (bron: ../topmovers/manifest.csv).
- 2023-09 campagneset (10 SVG's): ambitie, bespaar, bij, blok, initiatief (drie varianten), lets-go en tu, allemaal met de naamstaart "Tekengebied-1" (bron: ../topmovers/iconen/).
- 2025-11 set (24 bestanden): 15 daarvan hebben `viewBox="0 0 25.18 23.78"` en vulling #33A39F (home.svg, zakelijk.svg, 1Tekengebied-reeks), plus de campagne-illustraties BIJ-en-hexagon.svg, Bij-en-stippellijn.svg, aanpakkers.svg en vier pijlen (bron: beeldbank/topmovers/iconen/2025-11_home.svg; ../topmovers/iconen/; telling 25-08-2026).
- Overig: letsmove.svg (wit woordmerk, 300x79), 7-SDGs.svg, Partner-van-CC-bovenin en -onderin (Circulair Connect-badges, de "bovenin" staat in de header), pin1-1.svg (kaartpin), score.svg (bron: ../topmovers/manifest.csv; bronteksten/topmovers-nl/html-ruw/home.html).

Dezelfde 2021-diensticonen (identieke bestandsnamen, uploads/2021/09/) staan op holwerdatopmovers.nl (bron: bronteksten/ledensites/holwerdatopmovers.nl.html). De-kievit.nl heeft vier eigen diensticonen uit 2024-06 (meubels monteren, tijdelijke opslag, in- en uitpakken, klusjes) in PNG (bron: ../README.md).

## 3. Co-branding bij leden

### 3.1 Naamconventie

Op topmovers.nl is de vaste formule "<Naam> Top Movers". De zin "Kiest u voor ..." staat op 38 van de 45 vestigingspagina's en levert vijftien namen op: "Boudesteijn Top Movers", "De Bresser Top Movers" (op de duplicaatpagina "De bresser Top Movers"), "de Kievit Top Movers" (met kleine d), "De Lange Top Movers", "De Wit Top Movers", "Geijtenbeek Top Movers", "Harreman Top Movers", "Harrie van Erp Top Movers", "Holwerda Logistics Top Movers", "Meta Top Movers", "P.A. van Rooyen Top Movers", "Ter Haar Top Movers", "Van der Ent Group Top Movers", "Van Riemsdijk Top Movers" en "Vlotweg Top Movers" (bron: bronteksten/topmovers-nl/vestigingen/*.md, regel "Kiest u voor ...", telling 25-08-2026). In de adreslijst op de homepage staan de leden onder hun eigen bedrijfsnaam ("De Kievit Verhuizingen Van Coehoornstraat 11 5916 PH Venlo"), met uitzondering van De Lange, die als "Leeuwarden (de Lange Top Movers)", "Winschoten (de Lange Top Movers), Jongeneel verhuisgroep" en "Groningen (de Lange Top Movers), Jongeneel verhuisgroep" wordt vermeld (in de bron staat op de plaats van de komma een streepje) (bron: bronteksten/topmovers-nl/html/home.md). Het brancheartikel gebruikt "P.A. van Rooyen Top Movers" als voorbeeld (bron: https://www.erkendeverhuizers.nl/nieuws/150-jaar-p-a-van-rooyen-top-movers-en-35-jaar-samenwerkingsverband-top-movers/).

In het eigen Duurzaamheidsverslag 2025 van Top Movers staat een kaart met de formule "<Naam> Top Movers | <Plaats>", 23 keer, voor 15 bedrijfsnamen: Boudesteijn | Beverwijk, De Bresser | Breda, Oisterwijk en Tilburg, De Kievit | Venlo, De Lange | Emmen, Groningen, Leeuwarden en Winschoten, De Wit | Haarlem, Geijtenbeek | Goes, Harreman | Hoensbroek, Harrie van Erp | Oss, Holwerda | Almere, Meta | Eindhoven, P.A. van Rooyen | Uithoorn en Utrecht, Ter Haar | Oldenzaal en Zwolle, Van der Ent | Rijswijk en Spijkenisse, Van Riemsdijk | Amsterdam, Vlotweg | Arnhem; de pagina sluit af met "AANPAKKERS MET IMPACT!" (bron: bronteksten/topmovers-nl/pdf/Duurzaamheidsverslag-2025-small.txt). Voor De Kievit is de daar gebruikte vorm dus "De Kievit Top Movers | Venlo".

Het CO2-Prestatieladder-certificaat van Top Movers Nederland noemt de entiteit anders: "Jac. de Kievit en Zn. B.V. (h.o.d.n. De Kievit Verhuizingen Top Movers), Voltastraat 27, 5928 PC Venlo", KvK 12015298; de appendix telt zestien ledenentiteiten met een "h.o.d.n."-vorm (bron: bronteksten/topmovers-nl/pdf/CO2-Prestatieladder-certificaat-Top-Movers-Nederland-B.V-1.txt, zie ook hoofdstuk 04).

### 3.2 Ledensites live bekeken (25-08-2026)

| Site | Titel van de homepage | Hoe Top Movers zichtbaar is | Stack en kleuren | Bron |
|---|---|---|---|---|
| debresser.nl | "De Bresser \| Erkende verhuizer \| Verhuisbedrijf Tilburg" | Header: eigen logo plus De-Bresser-Top-movers-1024x489.png (alt "Logo Top movers"). Footer: keurmerkenbalk met Erkende verhuizers, Erkende project verhuizers, TOP-MOVERS-De-Bresser.png (alt "Logo Top Movers", gelinkt naar topmovers.nl), Fedemac, IAM. Tekst: "samen met partners zoals Top Movers". 4 vermeldingen. Noemt zichzelf niet "De Bresser Top Movers". | WordPress 7.1, Elementor 4.2.3, WPML. Kit: primair navy #020D41, secundair blauw #007AC0, accent groen #7BD534, extra #33BCFA, geel #FFC400; font Sora. | bronteksten/ledensites/debresser.nl.html; https://www.debresser.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-8.css |
| meta.nl (Meta Verhuizingen, Eindhoven) | "Verhuisbedrijf Eindhoven - Meta Verhuizingen - Top Movers" | Eigen logo (alt "Meta Movers") in header; hero "Uw verhuizing prettig geregeld met Meta Top Movers!"; in de lopende tekst consequent "Meta Top Movers" (27 vermeldingen); footer: "© 2026 - Meta Movers" met top-movers-logo.png (105x50); Erkende verhuizers-logo. | WordPress met WPML; geen Elementor-kit gevonden. | bronteksten/ledensites/meta.nl.html |
| vanderentgroup.com | "Van der Ent Group \| Duurzame verhuizingen \| Volledig ontzorgd" | Geen Top Movers in header of titel; Top Movers-logo (tmlogo2019-500x240-1.png) als kaart in een keurmerkenrij onderaan, gelinkt naar /kwaliteit/, naast Erkende Verhuizers en Erkende Projectverhuizers; tekst "Circulair Connect Een initiatief van Top Movers" en een klantcitaat "samengewerkt met Van Der Ent Top Movers". 7 vermeldingen. | WordPress 7.0.4, Elementor 4.2.3 (Rey-klassen), WPML. Kit: primair #2D9C97 (teal), secundair #38424F, accent #EC6607 (oranje); fonts Gilroy en Faustina. | bronteksten/ledensites/vanderentgroup.com.html |
| holwerda.nl (Holwerda Logistics) plus holwerdatopmovers.nl | "Holwerda Logistics" resp. "Erkend verhuisbedrijf Almere & Flevoland \| Holwerda Top Movers" | Holwerda splitst logistiek en verhuizen over twee domeinen. holwerda.nl toont het TM-logo (TMLogoRGB_400.jpg) in header en footer en linkt naar holwerdatopmovers.nl. holwerdatopmovers.nl gebruikt een gecombineerd logo "logo-top-movers-holwerda(-wit).png" (alt "Top Movers Holwerda"), 351 vermeldingen, copy "Kiest u voor Holwerda Top Movers", "aangesloten bij de Top Movers en de Erkende Verhuizers", "Meer over Top Movers". | holwerdatopmovers.nl: WordPress 7.1, thema Rey met rey-child, dezelfde Elementor-globals als topmovers.nl (#00A19B, #C4E4E4, #1D1D1B, #EE7203, #E5F3F3), Poppins en Noto Sans lokaal, dezelfde 2021-diensticonen, telefoonnummer 088-1990900 (het centrale nummer), GTM-TCRXG2N, WooCommerce, Site Kit. | bronteksten/ledensites/holwerda.nl.html; bronteksten/ledensites/holwerdatopmovers.nl.html |
| harrievanerp.nl (Oss) | "Verhuisbedrijf Oss - Top Movers" | Headerlogo bijtje.png met alt en title "Harrie van Erp Topmovers" (bij-beeldmerk); og:site_name en de WebSite-naam in de JSON-LD zijn simpelweg "Top Movers"; copy "Verhuizen met Harrie van Erp Top Movers betekent verhuizen met maximale zekerheid!"; foto met alt en title "Harrie van Erp Top Movers"; kaartblok "Harrie van Erp Topmovers, Molenweg 95, 5349 AC Oss"; Erkende Verhuizers- en Erkende Projectverhuizers-logo's. 26 vermeldingen. | WordPress 7.0, Divi 4.27.7 met een child-thema dat letterlijk "topmovers" heet (generator "Topmovers v.4.18.0", wp-content/themes/topmovers/), Source Sans Pro (koppen) en Open Sans (tekst). | bronteksten/ledensites/harrievanerp.nl.html |
| boudesteijn.nl | "Professioneel verhuisbedrijf \| Boudesteijn Top Movers" | 19 vermeldingen (alleen titel en telling vastgesteld). | niet onderzocht | curl 25-08-2026 |
| terhaarverhuizingen.nl | "Zorgeloos verhuizen met Ter Haar Verhuizingen - Ter Haar Top Movers" | 7 vermeldingen (alleen titel en telling vastgesteld). | niet onderzocht | curl 25-08-2026 |
| vlotweg.nl | "Welkom bij vlotweg - Vlotweg Verhuizingen" | 2 vermeldingen (alleen titel en telling). | niet onderzocht | curl 25-08-2026 |
| de-kievit.nl | "De Kievit \| Erkende verhuizer \| Verhuisbedrijf Venlo" | Header: het eerste beeld is het witte Top Movers-logo (TOP-MOVERS-De-Bresser.png, alt "Logo topmovers wit"); een eigen Kievit-logo staat niet als bestand in de header. Footer: foto van een man in Top Movers-polo met Kievit-doos (footer-foto.png), Erkende verhuizers wit, Erkende project verhuizers wit, Top Movers wit (gelinkt naar topmovers.nl), Fedemac wit, IAM wit, De Bresser wit. Copy: "De Kievit is een Erkende Verhuizer aangesloten bij Topmovers" (Baarlo) en "Onze samenwerking met Top Movers heeft geleid tot aanzienlijke vooruitgang in het verduurzamen van verhuisprocessen." 9 vermeldingen (4 spellingen: Top Movers, Topmovers, top movers, topmovers). | WordPress 7.1, Elementor 4.2.3. Kit: primair #007F7B, secundair #025553, accent #05BDB7, geel #FFC400, licht #EBEFF4, donker #001D21; font Sora (alle rollen). Dus een teal-herkleuring van de De Bresser-kit (die navy/blauw/groen is) met dezelfde structuur en post-ID's (post-8, post-4261, post-4462). | bronteksten/ledensites/de-kievit.nl.html; https://www.de-kievit.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-8.css; ../de-kievit-nl/paginastructuur.md; bronteksten/kievit-faq/kievit-profiel-site.md |

De kolom "vermeldingen" telt de vormen "Top Movers", "Top movers", "top movers", "Topmovers", "topmovers" en "TopMovers" in de opgehaalde HTML en laat de koppelteken-varianten uit bestandsnamen (TOP-MOVERS-..., top-movers-...) buiten beschouwing; met die methode zijn alle getallen in de tabel op 25-08-2026 gereproduceerd.

Samengevat: vier van de vijf gevraagde sites (De Bresser, Meta, Holwerda, De Kievit) tonen het Top Movers-logo prominent, Van der Ent alleen in een keurmerkenrij; Meta, Holwerda, Harrie van Erp, Boudesteijn en Ter Haar voeren "Top Movers" in de paginatitel; De Bresser en Van der Ent niet. Kleurgebruik varieert per lid: alleen holwerdatopmovers.nl volgt de Top Movers-kit letterlijk, Van der Ent en De Kievit gebruiken een eigen teal (bron: zie tabel).

### 3.3 Het eigen logo van De Kievit

In de mediabibliotheek van de-kievit.nl staan 18 logo's, waarvan er geen één een volledig Kievit-logo is; het enige Kievit-merkbestand is de favicon cropped-image.jpg (512x512, een zwart uitgesneden deel van het beeldmerk met de letters "VIT VER") (bron: ../de-kievit-nl/logos/; beeldbank/de-kievit-nl/logos/2024-03_cropped-image.jpg, bekeken 25-08-2026). Het volledige logo is alleen op foto's te zien: op de truck en op de verhuisdoos staat een gestileerde kievit (lapwing) van blauwe driehoeken met een groen accent, gevolgd door "DE KIEVIT" in vette blauwe kapitalen en "VERHUIZINGEN" in lichter blauw (bron: beeldbank/de-kievit-nl/fotos-kievit/2024-07_439953851_1038001187676396_894923786241562384_n.jpg; 2024-04_footer-foto.png, bekeken 25-08-2026). Exacte kleurcodes en een vectorbestand ontbreken: zie "Open vragen". De Kievit-truckfoto toont ook een tekstvlak "SLIMME AANPAK" in wit op donkerblauw (bron: zelfde truckfoto).

### 3.4 Naamgeving van De Kievit op externe platforms

| Platform | Naam zoals vermeld | Bron (25-08-2026) |
|---|---|---|
| topmovers.nl vestigingspagina | "De Kievit Verhuizingen" (titel), "de Kievit Top Movers" (tekst), "De Kievit Verhuizingen Van Coehoornstraat 11 5916 PH Venlo" (kaartlijst) | bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md; bronteksten/topmovers-nl/html/home.md |
| Erkende Verhuizers | "de Kievit Verhuizingen Top Movers" (paginatitel), met adres Van Coehoornstraat 11 Venlo, KvK 18014730 en telefoon 077-3232100 | https://www.erkendeverhuizers.nl/lid/de-kievit-verhuizingen-top-movers/ (pagina zelf opgehaald 25-08-2026) |
| Klantenvertellen | "De Kievit Verhuizingen Top Movers" (listing erkende_verhuizer_de_kievit_verhuizingen_top+movers) | https://www.klantenvertellen.nl/reviews/1034282/erkende_verhuizer_de_kievit_verhuizingen_top+movers |
| Facebook | "De Kievit Top Movers \| Venlo" | https://www.facebook.com/dekievitverhuizingen/ (zoekresultaat-titel; de pagina zelf gaf op 25-08-2026 HTTP 400 op een gewone aanvraag) |
| Noord-Limburg Business | "De Kievit Top Movers" | https://www.noordlimburgbusiness.nl/magazine/artikel/626/6207/de-kievit-top-movers-onze-passie-is-verhuizen |
| verhuizerstarieven.nl en TransFirm | "Top Movers De Kievit Verhuizingen"; verhuizerstarieven noemt daarbij adres Maaskade 103 Venlo, telefoon 0773232100 en openingstijden 07:30-17:00 | https://www.verhuizerstarieven.nl/verhuisbedrijven/venlo/top-movers-de-kievit-verhuizingen/; https://www.transfirm.nl/nl/organisatie/12015298-000018538517-top-movers-de-kievit-verhuizingen (zoekresultaat; pagina gaf op 25-08-2026 een foutmelding) |
| verhuizen.nl | "De Kievit Verhuizingen" (URL-slug de-kievit-verhuizingen-top-movers) | https://www.verhuizen.nl/verhuisbedrijf/de-kievit-verhuizingen-top-movers/ |
| Yelp | "DE KIEVIT VERHUIZINGEN", adres Voltastraat 27 (oud adres) | https://www.yelp.com/biz/de-kievit-verhuizingen-venlo (zoekresultaat-titel) |
| Exoskeleton Report (locatievermelding) | "De Kievit Topmover, Coehoornstraat 11" | https://exoskeletonreport.com/venue/location-de-kievit-topmover-coehoornstraat-11-5916-ph-venlo/ (zoekresultaat-titel) |
| LinkedIn | "De Kievit Verhuizingen" | bronteksten/kievit-faq/kievit-profiel-extern.md |
| Duurzaamheidsverslag 2025 van Top Movers | "De Kievit Top Movers \| Venlo" | bronteksten/topmovers-nl/pdf/Duurzaamheidsverslag-2025-small.txt |
| CO2-Prestatieladder-certificaat van Top Movers Nederland | "Jac. de Kievit en Zn. B.V. (h.o.d.n. De Kievit Verhuizingen Top Movers)", Voltastraat 27 Venlo, KvK 12015298 | bronteksten/topmovers-nl/pdf/CO2-Prestatieladder-certificaat-Top-Movers-Nederland-B.V-1.txt |

De naam van het Google Business-profiel kon niet direct worden vastgesteld; de reviewkoppeling van klantenvertellen en de Facebook-naam suggereren "De Kievit Verhuizingen Top Movers" of "De Kievit Top Movers" [ONZEKER: Google Business-profiel niet geraadpleegd, zie Open vragen].

Let op het KvK-nummer: er circuleren drie nummers.
- 18014730 staat in de footer van de-kievit.nl en op de ledenpagina van Erkende Verhuizers; dat is het nummer van De Bresser Verhuizingen B.V. (bron: bronteksten/kievit-faq/kievit-profiel-site.md; https://www.erkendeverhuizers.nl/lid/de-kievit-verhuizingen-top-movers/, geraadpleegd 25-08-2026).
- 12015298 hoort bij "Jac. de Kievit en Zn. B.V." op het CO2-Prestatieladder-certificaat van Top Movers en komt terug in het zoekresultaat van TransFirm voor "Top Movers De Kievit Verhuizingen", met adres Maaskade 103, 5911 EZ Venlo (bron: bronteksten/topmovers-nl/pdf/CO2-Prestatieladder-certificaat-Top-Movers-Nederland-B.V-1.txt; zoekresultaat https://www.transfirm.nl/nl/organisatie/12015298-000018538517-top-movers-de-kievit-verhuizingen). Maaskade 103 wordt bevestigd door verhuizerstarieven.nl (bron: https://www.verhuizerstarieven.nl/verhuisbedrijven/venlo/top-movers-de-kievit-verhuizingen/, geraadpleegd 25-08-2026).
- 56937164 duikt op in een zoekresultaat van TransFirm voor "De Kievit Verhuizingen | Venlo" met adres Maasschriksel 125 [ONZEKER: alleen als zoekresultaat-fragment gezien; beide TransFirm-pagina's gaven op 25-08-2026 een foutmelding (HTTP 500), dus niet aan de bron getoetst] (bron: zoekresultaat https://transfirm.nl/nl/organisatie/56937164-000026427966-de-kievit-verhuizingen).
Daarnaast noemt verhuis-gids.nl "Jac. de Kievit en Zn. BV" (bron: bronteksten/kievit-faq/kievit-profiel-extern.md). Drimble koppelt 12015298 aan Jac. de Kievit en Zn. B.V. (Voltastraat 27) en 56937164 aan de VOF De Kievit (Maasschriksel, Venlo-Centrum) en geeft beide als bedrijfsstatus "Opgeheven"; het derde nummer is daarmee wel aan een bron gekoppeld, maar het adres Maasschriksel 125 uit het TransFirm-fragment is dat niet (bron: https://drimble.nl/bedrijf/venlo/000018538517/top-movers-de-kievit-verhuizingen.html en https://drimble.nl/bedrijf/venlo/000026427966/de-kievit-verhuizingen.html, geraadpleegd 25-08-2026; zie hoofdstuk 07 sectie 1.2). Praktisch betekent dat: 18014730 is het enige nummer dat bij een actieve rechtspersoon hoort. Welk nummer, welke statutaire naam en welk btw-nummer op de nieuwe site komen, blijft ter bevestiging bij De Bresser (zie hoofdstuk 07 open vraag 2 en "Open vragen" hieronder).

## 4. Website topmovers.nl als referentie

### 4.1 Technische stack

- WordPress 7.0.4; Elementor 4.2.1 met "css_print_method-external, google_font-enabled, font_display-auto"; Elementor Pro 4.2.1 (elements-handlers, nested carousel); thema Rey (wp-content/themes/rey en rey-child, Rey-uploads ds-/hs-CSS versie 3.2.0) met plugin rey-core (anime.js); jQuery met jquery-migrate, jQuery UI core, jquery.validate en jquery.blockUI in het child-thema; Swiper 8.4.5; Font Awesome 5.15.3 (solid) plus v4-shims (bron: bronteksten/topmovers-nl/html-ruw/home.html, generator- en script-tags).
- Formulieren: WPForms, met ajax-verzending en Nederlandse validatieteksten. In de 211 gecrawlde pagina's staan 35 verschillende formulier-ID's: contact 2805, terugbelformulier 4997 (op elf zakelijke dienstpagina's), evenementaanmelding 5329 (Van der Ent 100 jaar) en per lid een eigen paar offerteformulieren (particulier en zakelijk), voor De Kievit 2006 en 2007. Robots.txt sluit /wp-content/uploads/wpforms/ uit (bron: bronteksten/topmovers-nl/html-ruw/*.html, telling van `wpforms-form-<id>` 25-08-2026; bronteksten/topmovers-nl/html-ruw/contact-met-top-movers.html; bronteksten/topmovers-nl/html-ruw/vestigingen__de-kievit-verhuizingen.html; https://www.topmovers.nl/robots.txt).
- SEO: Yoast SEO 28.1 (sitemap_index.xml met author-, category-, page-, post_tag-, post-, rey-global-sections-, vacatures- en vestigingen-sitemap) (bron: bronteksten/topmovers-nl/api/types.json; tm/sitemaps.txt).
- Consent en meting: Cookiebot (consent.cookiebot.com, id 5e68c8bb-7194-4ef6-8921-83f1539ad3c1) en Google Tag Manager GTM-TDLFPF9 (bron: bronteksten/topmovers-nl/html-ruw/home.html).
- Custom post types: "vestigingen" (Vestigingen) en "vacatures" (Vacatures); daarnaast Elementor-bibliotheek, snippets en "e-floating-buttons" (bron: bronteksten/topmovers-nl/api/types.json).
- Externe koppelingen: Klantenportaal portal.topmovers.app; Top Movers Academy op topmovers.learnhero.nl (drie inloglinks in de footer: "Inlog TM Academy", "Inlog TM Portaal", "Inlog TM Account", alle drie naar dezelfde login-URL) (bron: bronteksten/topmovers-nl/html/home.md).
- Taal: `<html lang="nl-NL">`, geen hreflang of tweede taal gevonden (bron: bronteksten/topmovers-nl/html-ruw/home.html).

### 4.2 Menu-structuur

Header (absoluut gepositioneerd, klasse rey-siteHeader--362): logo RGB, badge aanpakkers.svg, badge Partner-van-CC-bovenin-1.svg, dan het menu; geen telefoonnummer in de header (bron: bronteksten/topmovers-nl/html-ruw/home.html, header-extractie 25-08-2026). Menulabels en doelen (bron: bronteksten/topmovers-nl/html/home.md):
- Duurzaamheid (/duurzaamheid/): MVO (/mvo/), Duurzaamheidsverslag (PDF Duurzaamheidsverslag-2025-small.pdf, 5,7 MB), Let's move to zero! (/lets-move-to-zero/)
- Diensten (/diensten/), mega-menu: Verhuisregisseur, Handyman service, ICT-verhuisservice, Internationale verhuizing, Kunst verhuizen, Opleverdiensten, Opslag, Verhuislift, Gecertificeerd verhuizen, Duurzaam verhuizen, Verhuisservice (alle onder /diensten/zakelijke-verhuizingen/) en Particuliere verhuizingen (/diensten/particuliere-verhuizingen/)
- Over ons: Klanttevredenheid (/klanttevredenheid/), Over ons (/over-ons/), Vacatures (/vacatures/)
- Blog (/nieuws/)
- Contact (/contact-met-top-movers/)
- Klantenportaal (https://portal.topmovers.app/)

Footer (bron: bronteksten/topmovers-nl/html/home.md):
- Kolom OVER ONS: Top Movers, Vacatures, Duurzaamheid, MVO
- Kolom Diensten, ZAKELIJK (11 links, zie boven) en PARTICULIER (8 links: Verhuisservice, Inboedelopslag, Opleverdiensten, Montageservice, ICT-verhuizing en installatie, Duurzaam verhuizen, Verhuislift, Internationale verhuizing)
- Kolom Contact, HOOFDKANTOOR: "Top Movers Nederland Meander 251 6825 MC ARNHEM, Postbus 5085 6802 EB ARNHEM, T: 088-1990900 info@topmovers.nl"
- "Vul hier uw postcode in:" (postcodezoeker), drie inloglinks, "Download ons duurzaamheidsverslag"
- Onderbalk: "© 2026 Top Movers", Algemene voorwaarden, Privacyverklaring, "TOP" (scroll naar boven)

Mobiel menu (offcanvas 2981): Zakelijke verhuizingen (11), Particuliere verhuizingen (8), Top Movers (Over Top Movers, Vacatures, Duurzaamheid / MVO, Klanten vertellen, Nieuws, Contact, Klantenportaal), Top Movers Academy, adres en telefoon (bron: bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/html-ruw/home.html, data-offcanvas-id="2981"). Twee mobiele links wijken af van de desktoplinks en lopen via een redirect: "Duurzaamheid / MVO" naar /duurzaamheid-en-mvo/ (301 naar /duurzaamheid) en "Contact" naar /contact/ (301 naar /contact-met-top-movers/) (bron: bronteksten/topmovers-nl/html-ruw/home.html, blok elementor-2981; curl-statuscontrole 25-08-2026).

### 4.3 Paginaboom

Totaal 213 URL's uit de sitemap, alle met HTTP 200 (bron: tm/crawl_status.json, 213 regels, alle statuscode 200; bronteksten/topmovers-nl/urls.txt). Samenstelling: 69 pagina-URL's (de homepage, 64 van de 65 REST-pagina's en vier zakelijke dienst-URL's zonder eigen REST-item: /diensten/zakelijke-verhuizingen/ duurzaam-verhuizen, opleverdiensten, verhuislift en verhuisservice; /bedankt-zakelijk/ bestaat wel maar staat niet in de sitemap), 46 blogposts, 45 vestigingspagina's, 3 vacatures, 14 global sections, 31 tag-archieven, 3 auteursarchieven en 2 archief-URL's (het categoriearchief Nieuws en het vacature-archief). Verdeling (bron: bronteksten/topmovers-nl/INDEX.md; eigen telling op bronteksten/topmovers-nl/urls.txt 25-08-2026):

- Home (/) en de oude homepage /verhuizing/ (titel "Homepage", gewijzigd 2023-09-25, nog live met een verouderde ledenlijst waarin "Bandsma Bultje Verhuizingen Leeuwarden" staat) (bron: bronteksten/topmovers-nl/pages/verhuizing.md; curl 25-08-2026 HTTP 200).
- Diensten: overzicht /diensten/; 8 particuliere dienstpagina's onder /diensten/particuliere-verhuizingen/ (duurzaam-verhuizen, ict-verhuizing-en-installatie, inboedelopslag, internationale-verhuizingen, montageservice, opleverdiensten, verhuislift, verhuisservice); 12 zakelijke dienstpagina's onder /diensten/zakelijke-verhuizingen/ (duurzaam-verhuizen, gecertificeerd-verhuizen, handyman-service, ict-verhuisservice, internationale-verhuizing, kunst-verhuizen, opleverdiensten, opslag, partner-van-circulair-connect, verhuis-regisseur, verhuislift, verhuisservice).
- Zes stappenpagina's van "Duurzaam verhuizen in stappen": /intake-planning/, /facilitair-regisseur/, /externe-leveranciers/, /verhuizen-handyman/, /opslag-wms/, /refurbished-circulair/ (bron: bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/INDEX.md).
- 21 stadslanders (zie 4.4).
- Merkpagina's: /over-ons/, /klanttevredenheid/, /erkende-verhuizers/, /duurzaamheid/, /mvo/, /lets-move-to-zero/, /top-movers-academy/, /de-leukste-werkplek/, /nieuws/organisatie-verhuizen/ (een pagina onder het blogpad), /van-der-ent-100-jaar/ (evenementpagina uit 2022).
- Functioneel: /contact-met-top-movers/, /bedankt/, /bedankt-zakelijk/, /algemene-voorwaarden/, /privacyverklaring/, /vacatures/, /nieuws/, /test/.
- Vestigingen (CPT, 45 pagina's): Boudesteijn 2, De Bresser 2, De Kievit 1, De Lange 5, De Wit 1, Geijtenbeek 1, Harreman 1, Harrie van Erp 3, Holwerda Logistics 4, Meta 1, P.A. van Rooyen 7, Ter Haar 5, Top Movers Nederland 4, Van der Ent Group 2, Van Riemsdijk 3, Vlotweg 3. Het archief /vestigingen/ bestaat niet (404) (bron: bronteksten/topmovers-nl/INDEX.md; curl 25-08-2026).
- Blog: 46 posts; 45 daarvan dragen `articleSection:["Nieuws"]`, de enige categorie. Auteurs in het schema: admin, chester en danny (Manuela staat niet bij een blogpost maar als auteur bij twee vacatures). Oudste consumententips uit 2021, nieuwste posts van 2025-2026 over ESG, EV-dekking, Zero Downtime, klantcases (scholen, Noordwest Ziekenhuisgroep, Grafisch Lyceum) en fiscale aspecten (bron: bronteksten/topmovers-nl/html/*.md, telling 25-08-2026; bronteksten/topmovers-nl/pages/nieuws.md; bronteksten/topmovers-nl/pages/vacatures.md).
- Tags: 31 tag-archieven; 17 daarvan zijn normale tags (certificaten, erkende verhuizer, erkende projectverhuizer, Facilitair Regisseur, Gebouwenbeheer, handyman, klusjesman, logistiek, mensen, onderwijsinstellingen, Projectverhuizing, projectverhuizingen, scholen, schoolverhuizing, slimme planning, Stel, zorginstellingen), de rest zijn hele zinsdelen die als tag zijn opgeslagen, zoals "je moet als school verhuizen naar een tijdelijke locatie omdat de huidige locatie wordt afgebroken en herbouwd. In zo'n geval komt er meer bij kijken dan alleen het verplaatsen van de boedel." (bron: bronteksten/topmovers-nl/INDEX.md, sectie html/tag__*).
- Vacatures (CPT, 3 pagina's uit 2021): "Aanpakkers gezocht! M/V", "Chauffeur C", "Direct werk voor de handige handyman"; salarisindicatie "tussen €1900 - € 2500 p.m." (in de bron staat op de plaats van de hyphen een lang streepje), contact vacature@topmovers.nl en 088-1990900 (bron: bronteksten/topmovers-nl/vacatures/*.md).
- 14 rey-global-sections in de sitemap (blog-sidebar, cta-dienst, cta-zakelijk, duurzaamheid-mega-menu, footer, footer-lp, header-height-fix, header-lp, header-wit, kaart, mega-menu-diensten, mobiel-menu, over-ons, search-cover); ze redirecten naar de homepage (bron: bronteksten/topmovers-nl/INDEX.md; curl 25-08-2026, 301).
- 3 auteursarchieven (admin, chester, danny), indexeerbaar met ProfilePage-schema (bron: bronteksten/topmovers-nl/INDEX.md; bronteksten/topmovers-nl/html/author__chester.md).

### 4.4 Sjablonen per paginatype

Particuliere dienstpagina (voorbeeld Verhuisservice): H1 met de dienstnaam, tekstblokken met H2's, blok "Heeft u vragen over Particuliere verhuizingen van Top Movers?" met knop Contact (naar /contact, redirect), CTA "Start uw verhuizing hier, vul uw postcode in!" (postcodezoeker), en een zijmenu met beide dienstenlijsten (bron: bronteksten/topmovers-nl/pages/particuliere-verhuizingen.md; bronteksten/topmovers-nl/html-ruw/diensten__particuliere-verhuizingen__verhuisservice.html).

Zakelijke dienstpagina (voorbeeld Gecertificeerd verhuizen): H2-kop, tekst, "Heeft u vragen over ... van Top Movers?" met Contact-knop, CTA "Laat ons u bellen" met WPForms 4997 (velden Naam, Bedrijfsnaam, Telefoonnummer; knop "Bel mij terug!", tijdens verzenden "Aanvragen..."), zijmenu zakelijke diensten (bron: bronteksten/topmovers-nl/pages/gecertificeerd-verhuizen.md; bronteksten/topmovers-nl/html-ruw/diensten__zakelijke-verhuizingen__gecertificeerd-verhuizen.html).

Stadslander "Zakelijk verhuizen in <stad>" (21 stuks, alle aangemaakt op 3 juni 2026): Aa en Hunze, Aalsmeer, Almere, Amersfoort, Amsterdam, Arnhem, Assen, Breda, Den Bosch, Den Haag (als enige onder /diensten/zakelijk-verhuizen-in-den-haag/), Eindhoven, Emmen, Groningen, Haarlem (met de foute slug /zakelijk-verhuizen-in-middelburg-2/), Leeuwarden, Lelystad, Maastricht, Middelburg, Roermond, Rotterdam, Utrecht (bron: bronteksten/topmovers-nl/INDEX.md; bronteksten/topmovers-nl/pages/zakelijk-verhuizen-in-roermond.md). Vaste opbouw, met de stad en provincie ingevuld (bron: bronteksten/topmovers-nl/pages/zakelijk-verhuizen-in-roermond.md; bronteksten/topmovers-nl/pages/zakelijk-verhuizen-in-middelburg-2.md):
1. H2 "Bedrijf verhuizen in <stad>" met een provinciezin ("In Limburg ziet Top Movers veel verhuisvragen met kantoren, zorginstellingen, scholen, productielocaties en logistieke bedrijven")
2. H2 "Verhuis uw bedrijf, organisatie, school of zorginstelling" met zeven bullets (advies, planning, demontage, veilig transport, tijdelijke opslag, herinrichting, controle na oplevering)
3. H2 "Duurzaam verhuizen"
4. H2 "Emissievrij verhuizen met elektrische verhuiswagens"
5. H2 "Landelijke dekking" met twee links naar buurgemeenten (/verhuizen-in-roerdalen, /verhuizen-in-simpelveld), die 404 geven
6. H2 "Magazijnverhuizing"
7. H2 "Handyman en ICT diensten"
8. H2 "Contact opnemen"
9. Blok "Heeft u vragen over Zakelijk verhuizen in <stad> van Top Movers?" met Contact-knop en het zijmenu zakelijke diensten.
De teksten zijn vrijwel identiek per stad en er staat geen adres, telefoonnummer, vestiging of foto van de regio op. De koppenstructuur is niet consistent: 15 van de 21 stadslanders hebben wel een H1 (13 keer "Bedrijf verhuizen in <stad>", bij Aa en Hunze en Aalsmeer "Zakelijk verhuizen in <stad>"), 6 hebben er geen (Amersfoort, Breda, Den Bosch, Middelburg, /zakelijk-verhuizen-in-middelburg-2/ voor Haarlem en Roermond); daar begint de pagina met een H2 (bron: bronteksten/topmovers-nl/html-ruw/zakelijk-verhuizen-in-*.html en bronteksten/topmovers-nl/html-ruw/diensten__zakelijk-verhuizen-in-den-haag.html, h1-controle op alle 21 pagina's 25-08-2026; bronteksten/topmovers-nl/pages/zakelijk-verhuizen-in-*.md). Alle 21 delen de meta description van de zakelijke dienstenpagina (bron: bronteksten/topmovers-nl/pages/*.md, telling: 29 pagina's met dezelfde description).

Vestigingspagina (45 stuks, identiek sjabloon; voorbeeld De Kievit) (bron: bronteksten/topmovers-nl/html/vestigingen__de-kievit-verhuizingen.md; bronteksten/topmovers-nl/html-ruw/vestigingen__de-kievit-verhuizingen.html):
1. H1 met de ledennaam ("De Kievit Verhuizingen") en knop "offerte aanvragen" (anker #offerte)
2. Tweede H1 "Uw verhuizing compleet van A tot Z" met knop "Meer over Top Movers"
3. Iconengrid met 8 particuliere en 9 zakelijke diensten (met 4 dode links, zie 4.8)
4. H2 "Iedere verhuizing van A tot Z compleet verzorgd" met de sjabloontekst "Kiest u voor de Kievit Top Movers, dan kiest u voor een professioneel, proactief en innovatief verhuisbedrijf. Met een landelijk netwerk en aanwezigheid in iedere provincie is er altijd een Top Mover bij u in de buurt. Alle 15 aangesloten verhuisbedrijven werken met gekwalificeerde vakmensen. ..."
5. H2 "Een offerte voor uw verhuizing aanvragen" met de tekst "U krijgt van ons een goed advies op maat. ... Let's move!" en twee WPForms-formulieren. Elk lid heeft een eigen ID-paar; voor De Kievit zijn dat 2006 (particulier) en 2007 (zakelijk), voor bijvoorbeeld De Bresser 2000 en 2001 en voor Top Movers Nederland 1554 en 1613 (velden in 4.5) (bron: bronteksten/topmovers-nl/html-ruw/vestigingen__*.html, telling 25-08-2026)
6. H3 "Openingstijden" als tabel maandag tot en met zondag: ma-vr "08:00 - 17:00", za en zo "Gesloten"; identiek op 44 van de 45 pagina's, alleen Harreman Verhuizingen heeft "08:30 - 17:00" (in de bron staat op de plaats van de hyphen een streepje) (bron: bronteksten/topmovers-nl/vestigingen/*.md, vergelijking 25-08-2026)
7. Reviewblok "Ze doen het!" met vier citaten (H.J. Nuenen, A Spijkenisse, T. Brielle, C. Gooise Meren) en knop "Bekijk al onze reviews" naar klantenvertellen
8. Standaardfooter.
Op de pagina staan geen adres, geen telefoonnummer, geen e-mailadres, geen kaart en geen foto-onderschrift van het lid; de enige adresgegevens zijn die van het hoofdkantoor in Arnhem (bron: bronteksten/topmovers-nl/html-ruw/vestigingen__de-kievit-verhuizingen.html: enige tel-link is tel:0881990900, enige postcodes zijn 6825 MC en 6802 EB Arnhem). De openingstijden 08:00-17:00 spreken de externe vermelding voor De Kievit (07:30-17:00) tegen (bron: bronteksten/kievit-faq/kievit-profiel-extern.md; https://www.verhuizerstarieven.nl/verhuisbedrijven/venlo/top-movers-de-kievit-verhuizingen/). Twee nuances: het blok op topmovers.nl is geen sjabloonwaarde (Harreman staat er met 08:30-17:00, zie hierboven), en het blok op openingstijden.nl hangt aan het oude adres Voltastraat 27, wat de betrouwbaarheid daarvan beperkt (bron: dossier/07-de-kievit-en-de-bresser.md sectie 4.3; https://www.openingstijden.nl/De-Kievit-verhuizingen/Venlo/Voltastraat-27/). De eigen site noemt helemaal geen openingstijden, dus geen van beide getallen is bruikbaar zonder bevestiging. Geen enkele pagina linkt naar een vestigingspagina, ook de vestigingspagina's zelf niet: de enige verwijzing naar /vestigingen/ in elk van de 45 bestanden is de eigen canonical in de head. Ze zijn dus alleen bereikbaar via de sitemap en via de postcodezoeker (bron: bronteksten/topmovers-nl/html-ruw/*.html, telling van `href="https://www.topmovers.nl/vestigingen/..."` 25-08-2026: 45 bestanden met precies 1 treffer, telkens de eigen canonical).

Blogpost: kop, "Geplaatst op: <datum>" (gelinkt naar een datumarchief), inhoud met H3/H4, afsluitend blok "Nieuws" met recente posts; Article-schema met auteur en trefwoorden (bron: bronteksten/topmovers-nl/posts/next-level-samenwerken-de-kracht-van-het-top-movers-netwerk.md; bronteksten/topmovers-nl/html/schoolverhuizingen-op-rolletjes.md).

Vacature: H2 titel, "Wat heb je minimaal nodig?", "Wat bieden wij jou?", contactregel met mailto en tel (bron: bronteksten/topmovers-nl/vacatures/aanpakkers-gezocht.md). De vacaturepagina's dragen geen JobPosting-schema (bron: bronteksten/topmovers-nl/html/vacatures__chauffeur-c-verhuizer.md, JSON-LD bevat alleen WebPage, ImageObject, BreadcrumbList, WebSite, Organization).

### 4.5 Conversie-elementen

Telefoon en e-mail: 088-1990900 (tel:0881990900) en info@topmovers.nl in footer en contactpagina (op de contactpagina geschreven als "Info@topmovers.nl"); vacatures: vacature@topmovers.nl (bron: bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/pages/contact-met-top-movers.md; bronteksten/topmovers-nl/vacatures/chauffeur-c-verhuizer.md). Erkende Verhuizers vermeldt daarnaast 026-3763465 (bron: https://www.erkendeverhuizers.nl/lid/top-movers-nederland-b-v/).

Contactformulier (WPForms 2805 op /contact-met-top-movers/): een verplicht keuzeveld met het label "Meerkeuze" en de opties "Zakelijk bericht" en "Particulier bericht", Bedrijfsnaam, Voornaam, Achternaam, Email, Telefoonnummer en Postcode (invoermasker "9999 AA", alle zes verplicht) en Bericht (textarea, niet verplicht); knop "Versturen", tijdens verzenden "Versturen..." (bron: bronteksten/topmovers-nl/html-ruw/contact-met-top-movers.html). Boven het formulier: "Zoek een vestiging bij u in de buurt" (postcodezoeker) en "Hoe kunnen wij u helpen? Top Movers bestaat uit 15 aangesloten verhuisbedrijven gevestigd door heel Nederland." (bron: bronteksten/topmovers-nl/pages/contact-met-top-movers.md).

Particulier offerteformulier (WPForms 2006 op elke vestigingspagina): Voornaam, Achternaam, Telefoonnummer, E-mailadres, Gewenste verhuisdatum (datumkiezer d/m/Y), drie vragen met Ja / Nee / Weet ik niet ("Heeft u hulp nodig met het in- en uitpakken?", "Heeft u opslag nodig?", "Wilt u gebruik maken van onze montage service?"), huidig adres (Straatnaam + huisnummer, Woonplaats, Postcode) en nieuw adres (zelfde drie velden); alle velden verplicht; het is een stappenformulier met knoppen "Volgende" en "Vorige"; knop "Versturen" (bron: bronteksten/topmovers-nl/html-ruw/vestigingen__de-kievit-verhuizingen.html, veldlabels uitgelezen 25-08-2026).

Zakelijk offerteformulier (WPForms 2007, zelfde pagina): Bedrijfsnaam, Voornaam contactpersoon (verplicht), Achternaam contactpersoon (verplicht), Telefoonnummer (verplicht), E-mailadres (verplicht), "Waar heeft u interesse in?" als selectievakjes (Verhuisservice, Opslag, Handymanservice, Opleverdiensten, ICT-verhuisservice, Kunst verhuizen, Verhuismaterialen huren, Verhuislift huren, Internationale verhuizingen), Gewenste verhuisdatum, huidig adres (Straatnaam + huisnummer, Woonplaats, Postcode; alle drie verplicht), nieuw adres (dezelfde drie velden, niet verplicht) en "Toelichting project"; ook dit formulier is een stappenformulier met "Volgende" en "Vorige"; knop "Versturen" (bron: bronteksten/topmovers-nl/html-ruw/vestigingen__de-kievit-verhuizingen.html, veldlabels uitgelezen 25-08-2026).

Terugbelformulier zakelijk (WPForms 4997 op zakelijke dienstpagina's): Naam, Bedrijfsnaam, Telefoonnummer; knop "Bel mij terug!" (bron: bronteksten/topmovers-nl/html-ruw/diensten__zakelijke-verhuizingen__gecertificeerd-verhuizen.html).

Postcodezoeker: formulier met klasse zipcode_search, een numeriek veld (maximaal 4 cijfers) en knop "Zoeken", in de footer, op de contactpagina, op de particuliere dienstpagina's en de homepage ("Vul hier uw postcode in:") (bron: bronteksten/topmovers-nl/html-ruw/home.html; bronteksten/topmovers-nl/html-ruw/contact-met-top-movers.html). De kopie van die code in custom.js van het child-thema is volledig uitgecommentarieerd, maar dat is niet de code die draait: bij elke zoeker staat een eigen inline script in de pagina dat wel actief is en dat de ajax-actie "fetchcorrectlocation" naar /wp-admin/admin-ajax.php stuurt, met een blockUI-overlay "Vestiging zoeken..". De zoeker werkt: een testaanroep op 25-08-2026 gaf voor postcode 5916 en 5911 de URL https://www.topmovers.nl/vestigingen/de-kievit-verhuizingen/ terug, voor 1011 die van Van Riemsdijk en voor 9999 die van Top Movers Nederland (bron: https://www.topmovers.nl/wp-content/themes/rey-child/js/custom.js, opgehaald 25-08-2026; bronteksten/topmovers-nl/html-ruw/home.html, inline script bij zipcode_search; POST-test op https://www.topmovers.nl/wp-admin/admin-ajax.php, 25-08-2026).

Bedankt-pagina's: /bedankt/ met "Hartelijk dank" en "Wij nemen zo snel mogelijk contact met u op." en /bedankt-zakelijk/ met "Christian neemt zo snel mogelijk contact met u op."; beide tonen daarna de dienstenblokken, de ledenlijst en reviews en dragen de meta title "Uw verhuizing van A tot Z verzorgd" (bron: bronteksten/topmovers-nl/pages/bedankt.md; bronteksten/topmovers-nl/pages/bedankt-zakelijk.md).

Chat en messaging: geen chatwidget en geen WhatsApp-link; "WhatsApp" komt alleen voor als deelknop-optie in de Elementor-configuratie (bron: bronteksten/topmovers-nl/html-ruw/home.html, telling en context 25-08-2026). Social proof: reviewblokken met klantenvertellen-link, klanttevredenheidspagina met 15 reviewtitels waaronder "Hoe geweldig kan verhuizen zijn als de Kievit dat voor je doet!" (bron: bronteksten/topmovers-nl/pages/klanttevredenheid.md).

### 4.6 SEO-patronen

- Titelpatroon van Yoast: "%%title%% - Top Movers" (scheidingsteken hyphen); 164 van de 211 gecrawlde titels eindigen op " - Top Movers", de rest zijn handmatige titels, waarvan een deel dubbel of fout: "verhuislift" (3 pagina's, waaronder Gecertificeerd verhuizen en Partner van Circulair Connect), "Uw verhuizing van A tot Z verzorgd" (3), "Over ons" (2, ook op Top Movers Academy), "Duurzaamheid verhuizen" (2), "Contact" (2, ook op Van der Ent 100 jaar) (bron: bronteksten/topmovers-nl/pages/*.md, telling van "Meta title"; bronteksten/topmovers-nl/INDEX.md). Homepage-titel: "Duurzaam verhuizen | Emissievrij verhuizen | Top Movers"; Yoast-fallback: "Top Movers - Aanpakkers met impact!" (bron: bronteksten/topmovers-nl/html/home.md; bronteksten/topmovers-nl/api/types.json).
- Meta descriptions: 29 pagina's delen "Binnenkort zakelijk verhuizen? Met Top Movers wordt uw verhuizing wordt van A tot Z verzorgd door de erkende verhuisspecialisten."; 81 van de 159 REST-items (pagina's, posts, vestigingen, vacatures) hebben een lege description, waaronder alle vestigingspagina's (bron: bronteksten/topmovers-nl/pages/*.md; bronteksten/topmovers-nl/vestigingen/*.md; telling 25-08-2026).
- JSON-LD (Yoast) per paginatype (bron: bronteksten/topmovers-nl/html/*.md, JSON-LD-blokken): pagina's, stadslanders, dienstpagina's, vestigingen en vacatures: WebPage, BreadcrumbList, WebSite (name "Top Movers", description "Aanpakkers met impact!", SearchAction) en Organization (name "Top Movers", logo TOP-MOVERS-LOGO-wit.png 813x387), en ImageObject (op alle 211 pagina's, minimaal als Organization.logo; 176 pagina's hebben daarnaast een `primaryImageOfPage`); blogposts: daarbovenop Article (headline, author, wordCount, keywords, articleSection "Nieuws") op 45 pagina's; Person staat op 48 pagina's (45 blogposts plus de 3 auteurspagina's); tag-archieven: CollectionPage (31, uitsluitend tags, datumarchieven zitten niet in de crawl); auteurspagina's: ProfilePage (3); WebPage staat op 177 pagina's, dus niet op de 31 tag- en 3 auteursarchieven. Er is nergens LocalBusiness, MovingCompany, Service, FAQPage of JobPosting; adres en telefoon staan dus niet in het schema.
- Open Graph en Twitter: og:locale nl_NL, og:type website, og:title, og:description, og:url, og:image (homepage: LMTZ-ster.png 650x706), twitter:card summary_large_image (bron: bronteksten/topmovers-nl/html-ruw/home.html).
- Breadcrumbs in schema volgen de URL-hiërarchie (Home > Diensten > Particuliere verhuizingen > Verhuisservice) (bron: bronteksten/topmovers-nl/html/diensten__particuliere-verhuizingen__verhuisservice.md).
- robots.txt: alles toegestaan behalve /wp-content/uploads/wpforms/; sitemap-index vermeld (bron: https://www.topmovers.nl/robots.txt).
- Canonical op elke pagina; auteurs- en tagarchieven zijn indexeerbaar en staan in de sitemap (bron: bronteksten/topmovers-nl/html/home.md; tm/sitemaps.txt).

### 4.7 Interne linkstructuur

Meest gelinkte niet-menu-doelen in de gecrawlde HTML (bron: bronteksten/topmovers-nl/html/*.md, linktelling 25-08-2026): de auteursarchieven /author/danny/ (59) en /author/chester/ (55), de vier dode dienst-URL's /diensten/zakelijke-verhuizingen/verhuismateriaal-huren/ (51), /diensten/particuliere-verhuizingen/verhuismateriaal-huren/ (51), /diensten/zakelijke-verhuizingen/verhuislift-huren/ (50) en /diensten/particuliere-verhuizingen/internationale-verhuizing/ (49), en /contact (42, redirect). De iconengrids op vestigings-, bedankt- en merkpagina's zijn de bron van deze dode links; het menu en de footer linken wel naar de juiste URL's (/verhuislift/ en /internationale-verhuizingen/) (bron: bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md; bronteksten/topmovers-nl/html/home.md). Blogposts linken onderling via het "Nieuws"-blok (elke recente post 19 tot 27 keer gelinkt) (bron: zelfde telling). De stadslanders linken naar 38 verschillende /verhuizen-in-<gemeente>-URL's die niet bestaan (bron: bronteksten/topmovers-nl/html/zakelijk-verhuizen-in-*.md; curl 25-08-2026: alle 38 URL's gecontroleerd, alle 38 geven 404).

### 4.8 Wat er slecht is (om op de Kievit-site te vermijden)

1. Dode links in de dienst-iconengrid: vier URL's geven 404 en zijn 49 tot 51 keer gelinkt (bron: curl-statuscontrole 25-08-2026, alle vier 404; linktelling bronteksten/topmovers-nl/html/*.md: 51, 51, 50 en 49).
2. 38 dode gemeentelinks vanuit de 21 stadslanders (bron: zie 4.7).
3. Vestigingspagina's zonder adres, telefoonnummer, e-mail, kaart, foto-onderschrift of eigen tekst, met op 44 van de 45 pagina's identieke openingstijden en op alle 45 identieke reviews; 45 pagina's voor 15 leden, waarvan de duplicaten (bijvoorbeeld de-bresser-verhuizingen en de-bresser-verhuizingen-2) alleen verschillen in een hoofdletter ("De bresser" tegenover "De Bresser") (bron: bronteksten/topmovers-nl/vestigingen/de-bresser-verhuizingen.md en -2.md, diff 25-08-2026; bronteksten/topmovers-nl/html-ruw/vestigingen__de-kievit-verhuizingen.html).
4. Geen enkele pagina linkt naar de vestigingspagina's, ook de vestigingspagina's onderling niet; de ledenlijst op de homepage is platte tekst zonder links (bron: bronteksten/topmovers-nl/html-ruw/home.html; linktelling 25-08-2026).
5. Testpagina /test/ (alleen zes koppen: ICT Dienst, Handyman, Schoolverhuizing, Zorgverhuizing, Kantoorverhuizing, WMS) en de oude homepage /verhuizing/ staan live en in de sitemap (bron: bronteksten/topmovers-nl/pages/test.md; bronteksten/topmovers-nl/pages/verhuizing.md; curl 25-08-2026).
6. Foute slugs: /zakelijk-verhuizen-in-middelburg-2/ is de pagina voor Haarlem; /het-belang-van-goede-verhuisdozen-2/ is het artikel "Zakelijke verhuizing naar het buitenland? Zo pak je dat aan!"; Den Haag staat als enige stadslander onder /diensten/ (bron: bronteksten/topmovers-nl/INDEX.md).
7. Meta-fouten: 29 identieke descriptions met de typefout "wordt uw verhuizing wordt"; 81 lege descriptions; titels die niet bij de pagina horen ("verhuislift" op Gecertificeerd verhuizen; "Over ons" op de Academy-pagina; "Contact" op Van der Ent 100 jaar; "Duurzaam verhuismateriaal huren" op Verhuisregisseur) (bron: bronteksten/topmovers-nl/pages/gecertificeerd-verhuizen.md; bronteksten/topmovers-nl/INDEX.md; telling 25-08-2026).
8. Tags die uit hele zinnen bestaan (14 van de 31), 31 indexeerbare tagarchieven, drie indexeerbare auteursarchieven met de loginnamen "admin", "chester", "danny" en 14 global sections in de sitemap (bron: bronteksten/topmovers-nl/INDEX.md; bronteksten/topmovers-nl/urls.txt; tm/sitemaps.txt).
9. Koppenstructuur: geen H1 op de homepage en op 6 van de 21 stadslanders (de andere 15 hebben er wel een); twee H1's op alle 45 vestigingspagina's en ook twee op de oude homepage /verhuizing/ (bron: bronteksten/topmovers-nl/html-ruw/home.html; bronteksten/topmovers-nl/html-ruw/zakelijk-verhuizen-in-*.html; bronteksten/topmovers-nl/html-ruw/vestigingen__*.html; bronteksten/topmovers-nl/html-ruw/verhuizing.html, h1-controle 25-08-2026).
10. Ontbrekend lokaal schema: geen LocalBusiness of MovingCompany, geen adres of telefoon in de JSON-LD, geen JobPosting op vacatures (bron: bronteksten/topmovers-nl/html/*.md).
11. Tegenstrijdige cijfers en claims: 15, 16, 22, 23 en 25 leden of locaties; "meer dan 500 medewerkers" tegenover "201 - 500 medewerkers" op LinkedIn; "9,6" tegenover 8,8 op klantenvertellen; 088- tegenover 026-nummer; oprichtingsjaar 1988 tegenover "Opgericht 1923" op LinkedIn (bron: zie 1.5 en 1.1).
12. Techniek en prestaties: Zilla Slab in 18 gewichten van Google Fonts plus een zelfgehoste kopie, jQuery-migrate naast jQuery 3.7.1, een dode kopie van de postcodezoeker in custom.js naast het inline script dat het werk doet, een duurzaamheidsverslag van 5,7 MB als menu-item, og:image van 650x706 px (staand) voor de homepage, foutieve teksten ("professioneel, innovatief, duurzaam en verhuisbedrijf", "lastste") (bron: bronteksten/topmovers-nl/html-ruw/home.html; https://www.topmovers.nl/wp-content/themes/rey-child/js/custom.js; curl PDF 25-08-2026, 5.690.500 bytes; bronteksten/topmovers-nl/html/home.md).
13. Vacatures uit 2021 zonder datumvermelding in de tekst en met een salarisindicatie uit 2021, nog steeds live (bron: bronteksten/topmovers-nl/vacatures/*.md, Datum 2021-10).
14. Verkeerd gekoppelde certificaatlinks op /over-ons/: onder "Certificaat Erkende Verhuizers" staat een knop "Bekijk het certificaat" die naar ISO-14001-Top-Movers-2024_2027.png wijst en onder "Projectverhuizerscertificaat PPV" een knop die naar ISO-9001-Top-Movers-2024_2027.png wijst (bron: bronteksten/topmovers-nl/pages/over-ons.md).
15. De-kievit.nl herhaalt een deel van deze fouten in het klein: 404 in de sitemap, dubbele H1's, 16 stadspagina's buiten het menu, De Bresser-teksten en -beeld onder de Kievit-naam (bron: ../de-kievit-nl/paginastructuur.md, sectie "Opvallend").

## Open vragen

1. Welke teal is de officiële merkkleur van Top Movers: #00A19B (web-kit en iconen), #009A97 (bij-logo en ster) of #009FB4 (logobestand)? Is er een huisstijlhandboek of merkboek van Top Movers, en mag De Kievit de kit-kleuren en de fonts (Poppins, Noto Sans, Zilla Slab) overnemen zoals holwerdatopmovers.nl doet? (aan Top Movers Nederland / De Bresser)
2. Is er een vector- (SVG/EPS) versie van het Top Movers-logo, van de "duurzaam"-variant met bij en van het "Let's move to zero!"-beeldmerk beschikbaar voor de Kievit-site? (aan Top Movers Nederland)
3. Het eigen logo van De Kievit: bestaat er een vectorbestand met kleurcodes (het blauw van het beeldmerk en de tekst, het groen van het accent), of moet het logo uit de truck- en doosfoto's worden nagetekend? Blijft het Kievit-logo na de overname bestaan naast het De Bresser-logo? (aan De Bresser / De Kievit)
4. Welke naamvorm moet de site voeren? Top Movers gebruikt zelf twee vormen: "De Kievit Top Movers | Venlo" in het Duurzaamheidsverslag 2025 en "De Kievit Verhuizingen Top Movers" als handelsnaam op het CO2-Prestatieladder-certificaat; de vestigingspagina op topmovers.nl heet "De Kievit Verhuizingen". Hoe heet het Google Business-profiel nu, en wordt dat gelijkgetrokken met de sitenaam? (aan De Kievit / Top Movers Nederland)
5. Mag de Kievit-site de Top Movers-slogans gebruiken ("Aanpakkers met impact!", "Let's move to zero!", "Let's move!", "Ze doen het!"), en zo ja welke? Zijn er beperkingen voor het gebruik van de campagnebeelden 2026 (ster, ESG, SDG's)? (aan Top Movers Nederland)
6. Welk KvK-nummer hoort in de footer en het schema van de nieuwe site: 18014730 (De Bresser B.V., nu in de footer van de-kievit.nl en op de OEV-ledenpagina), 12015298 (Jac. de Kievit en Zn. B.V. op het CO2-certificaat en in de TransFirm-vermelding, adres Maaskade 103) of 56937164 (tweede TransFirm-vermelding, adres Maasschriksel 125)? Is Maaskade 103 een bestaand vestigingsadres naast Van Coehoornstraat 11? (aan De Bresser)
7. Openingstijden: 08:00-17:00 (topmovers.nl, per lid ingevuld en dus geen sjabloonwaarde) of 07:30-17:00 (openingstijden.nl en verhuizerstarieven.nl, beide gekoppeld aan het oude adres)? En hoe zit het met bereikbaarheid in het weekend en bij spoed, want de eigen FAQ zegt dat verhuizen in het weekend mogelijk is? Kies één antwoord voor de site, het Google Bedrijfsprofiel en de vestigingspagina op topmovers.nl. (aan De Kievit)
8. Moeten de Kievit-formulieren dezelfde velden krijgen als de Top Movers-offerteformulieren (particulier: verhuisdatum, in- en uitpakken, opslag, montage, twee adressen; zakelijk: interesse-vakjes), en wie ontvangt de aanvragen (Venlo, Tilburg of het Top Movers-portaal)? Dat de postcodezoeker van topmovers.nl werkt en Venlose postcodes naar de Kievit-vestigingspagina stuurt is inmiddels getest en bevestigd (zie 4.5); de open vraag is of die zoeker straks naar de nieuwe Kievit-site gaat wijzen. (aan De Kievit / Top Movers)
9. Welke aantallen mogen op de Kievit-site over het netwerk staan (15 of 16 bedrijven, 22, 23 of 25 locaties, 80 elektrische voertuigen, 500+ medewerkers, 9,6 reviewgemiddelde)? De eigen documenten van Top Movers geven zelf al twee verschillende tellingen (23 locaties in het Duurzaamheidsverslag 2025, zestien entiteiten op het CO2-certificaat) en LinkedIn noemt 201 tot 500 medewerkers. Zonder bevestiging geen cijfers gebruiken. (aan Top Movers Nederland)
10. Wil De Kievit de u-vorm voor klanten en de je-vorm voor sollicitanten aanhouden, conform topmovers.nl en de eerder vastgelegde toon? (aan De Kievit)
11. Wordt de Kievit-vestigingspagina op topmovers.nl aangevuld met adres, telefoon en foto zodra de nieuwe site live is, en komt er een link van topmovers.nl naar de-kievit.nl? (aan Top Movers Nederland)

## Bronnen

Lokale bestanden (map `bronteksten/`, 25-08-2026):
- bronteksten/topmovers-nl/INDEX.md
- bronteksten/topmovers-nl/urls.txt
- tm/sitemaps.txt
- tm/crawl_status.json
- bronteksten/topmovers-nl/api/types.json
- bronteksten/topmovers-nl/html-ruw/home.html
- bronteksten/topmovers-nl/html-ruw/contact-met-top-movers.html
- bronteksten/topmovers-nl/html-ruw/vestigingen__de-kievit-verhuizingen.html
- bronteksten/topmovers-nl/html-ruw/diensten__zakelijke-verhuizingen__gecertificeerd-verhuizen.html
- bronteksten/topmovers-nl/html-ruw/diensten__particuliere-verhuizingen__verhuisservice.html
- bronteksten/topmovers-nl/html-ruw/zakelijk-verhuizen-in-roermond.html
- bronteksten/topmovers-nl/html-ruw/maken-certificaten-het-verschil-bij-een-verhuizing.html
- bronteksten/topmovers-nl/html-ruw/top-movers-verhuist-2-scholen.html
- bronteksten/topmovers-nl/html-ruw/*.html (linktellingen, h1-controle)
- bronteksten/topmovers-nl/html/home.md
- bronteksten/topmovers-nl/html/vestigingen__de-kievit-verhuizingen.md
- bronteksten/topmovers-nl/html/schoolverhuizingen-op-rolletjes.md
- bronteksten/topmovers-nl/html/vacatures__chauffeur-c-verhuizer.md
- bronteksten/topmovers-nl/html/diensten__particuliere-verhuizingen__verhuisservice.md
- bronteksten/topmovers-nl/html/author__chester.md
- bronteksten/topmovers-nl/html/*.md (tellingen van slogans, schema-types, links)
- bronteksten/topmovers-nl/pages/over-ons.md
- bronteksten/topmovers-nl/pages/verhuizing.md
- bronteksten/topmovers-nl/pages/erkende-verhuizers.md
- bronteksten/topmovers-nl/pages/diensten.md
- bronteksten/topmovers-nl/pages/particuliere-verhuizingen.md
- bronteksten/topmovers-nl/pages/zakelijke-verhuizingen.md
- bronteksten/topmovers-nl/pages/klanttevredenheid.md
- bronteksten/topmovers-nl/pages/top-movers-academy.md
- bronteksten/topmovers-nl/pages/lets-move-to-zero.md
- bronteksten/topmovers-nl/pages/duurzaamheid.md
- bronteksten/topmovers-nl/pages/mvo.md
- bronteksten/topmovers-nl/pages/gecertificeerd-verhuizen.md
- bronteksten/topmovers-nl/pages/partner-van-circulair-connect.md
- bronteksten/topmovers-nl/pages/test.md
- bronteksten/topmovers-nl/pages/bedankt.md
- bronteksten/topmovers-nl/pages/bedankt-zakelijk.md
- bronteksten/topmovers-nl/pages/contact-met-top-movers.md
- bronteksten/topmovers-nl/pages/nieuws.md
- bronteksten/topmovers-nl/pages/zakelijk-verhuizen-in-roermond.md
- bronteksten/topmovers-nl/pages/zakelijk-verhuizen-in-middelburg-2.md
- bronteksten/topmovers-nl/pages/*.md (tellingen)
- bronteksten/topmovers-nl/posts/next-level-samenwerken-de-kracht-van-het-top-movers-netwerk.md
- bronteksten/topmovers-nl/posts/landelijke-ev-dekking-top-movers.md
- bronteksten/topmovers-nl/posts/show-dont-tell.md
- bronteksten/topmovers-nl/posts/lets-move-to-zero-downtime.md
- bronteksten/topmovers-nl/posts/*.md (tellingen)
- bronteksten/topmovers-nl/vestigingen/de-kievit-verhuizingen.md
- bronteksten/topmovers-nl/vestigingen/de-bresser-verhuizingen.md
- bronteksten/topmovers-nl/vestigingen/de-bresser-verhuizingen-2.md
- bronteksten/topmovers-nl/vestigingen/*.md (tellingen)
- bronteksten/topmovers-nl/vacatures/aanpakkers-gezocht.md
- bronteksten/topmovers-nl/vacatures/chauffeur-c-verhuizer.md
- bronteksten/topmovers-nl/vacatures/handyman.md
- bronteksten/kievit-faq/FEITEN-KIEVIT.md
- bronteksten/kievit-faq/kievit-profiel-site.md
- bronteksten/kievit-faq/kievit-profiel-extern.md
- ../de-kievit-nl/paginastructuur.md
- ../topmovers/manifest.csv
- ../de-kievit-nl/manifest.csv
- ../topmovers/logos-certificaten/
- ../topmovers/graphics/
- ../topmovers/iconen/
- ../de-kievit-nl/logos/
- ../de-kievit-nl/fotos-kievit/
- ../README.md
- bronteksten/topmovers-nl/pdf/Duurzaamheidsverslag-2025-small.txt
- bronteksten/topmovers-nl/pdf/CO2-Prestatieladder-certificaat-Top-Movers-Nederland-B.V-1.txt
- bronteksten/topmovers-nl/pdf/li-tm.html (lokale kopie van de LinkedIn-bedrijfspagina)
- bronteksten/topmovers-nl/api/pages_p1.json, posts_p1.json, vestigingen_p1.json, vacatures_p1.json
- bronteksten/topmovers-nl/css/post-8.css (kopie van https://www.topmovers.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-8.css)
- bronteksten/topmovers-nl/css/post-154.css
- bronteksten/topmovers-nl/css/post-362.css
- bronteksten/topmovers-nl/css/post-2981.css
- bronteksten/topmovers-nl/css/post-6476.css
- bronteksten/topmovers-nl/css/ds-c11eb9b70f.css
- bronteksten/ledensites/debresser.nl.html
- bronteksten/ledensites/meta.nl.html
- bronteksten/ledensites/vanderentgroup.com.html
- bronteksten/ledensites/holwerda.nl.html
- bronteksten/ledensites/holwerdatopmovers.nl.html
- bronteksten/ledensites/harrievanerp.nl.html
- bronteksten/ledensites/de-kievit.nl.html
- bronteksten/ledensites/transfirm-kievit.html
- ../topmovers/logos-certificaten/2021-09_TOP-MOVERS-LOGO-RGB.png
- ../topmovers/logos-certificaten/2021-09_TOP-MOVERS-LOGO-wit.png
- ../topmovers/logos-certificaten/2026-08_LMTZ-ster.png
- ../topmovers/logos-certificaten/2025-05_certificaten_volledig_verspreid.png
- ../topmovers/logos-certificaten/2022-08_Asset-1-3.png
- ../topmovers/logos-certificaten/2021-09_unnamed.jpg
- ../topmovers/logos-certificaten/2023-04_image001.png
- ../topmovers/logos-certificaten/2021-09_Erkende-verhuizers-1.png
- ../topmovers/iconen/2021-09_verhuisservice.svg
- ../topmovers/iconen/2021-09_co2-neutraal.svg
- ../topmovers/iconen/2021-09_verhuislift-1.svg
- ../topmovers/iconen/2025-11_home.svg
- ../topmovers/iconen/2025-11_aanpakkers.svg
- ../topmovers/iconen/*.svg (kleurtelling)
- ../de-kievit-nl/logos/2024-03_cropped-image.jpg
- ../de-kievit-nl/logos/2024-03_topmovers-logo-duurzaam.png
- ../de-kievit-nl/fotos-kievit/2024-07_439953851_1038001187676396_894923786241562384_n.jpg
- ../de-kievit-nl/fotos-kievit/2024-04_footer-foto.png

Online bronnen (geraadpleegd 25-08-2026):
- https://www.topmovers.nl/
- https://www.topmovers.nl/robots.txt
- https://portal.topmovers.app/ en https://topmovers.learnhero.nl/login (alleen als link in de footer van topmovers.nl vastgesteld, niet geopend)
- https://www.topmovers.nl/wp-content/themes/rey-child/js/custom.js
- https://www.topmovers.nl/wp-admin/admin-ajax.php (POST action=fetchcorrectlocation, test van de postcodezoeker 25-08-2026)
- https://www.topmovers.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-8.css
- https://www.topmovers.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-154.css
- https://www.topmovers.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-362.css
- https://www.topmovers.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-2981.css
- https://www.topmovers.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-6476.css
- https://www.topmovers.nl/wp-content/uploads/rey/ds-c11eb9b70f.css
- https://www.topmovers.nl/wp-content/uploads/2021/09/Duurzaamheidsverslag-2025-small.pdf (alleen omvang gecontroleerd)
- https://www.topmovers.nl/verhuizen-in-roerdalen, /verhuizen-in-simpelveld, /verhuizen-in-haarlemmermeer, /diensten/particuliere-verhuizingen/verhuismateriaal-huren/, /diensten/zakelijke-verhuizingen/verhuismateriaal-huren/, /diensten/zakelijke-verhuizingen/verhuislift-huren/, /diensten/particuliere-verhuizingen/internationale-verhuizing/, /contact, /contact/, /over-ons, /duurzaamheid-en-mvo/, /verhuizing/, /test/, /?rey-global-sections=footer, /vestigingen/, /author/manuela/, /duurzaam-verhuizen/ (statuscontrole met curl)
- https://www.erkendeverhuizers.nl/nieuws/150-jaar-p-a-van-rooyen-top-movers-en-35-jaar-samenwerkingsverband-top-movers/
- https://www.erkendeverhuizers.nl/lid/top-movers-nederland-b-v/
- https://www.erkendeverhuizers.nl/lid/de-kievit-verhuizingen-top-movers/
- https://www.denationalefranchisegids.nl/dienstverlening/top-movers/
- https://nl.linkedin.com/company/top-movers
- https://nl.linkedin.com/company/van-riemsdijk-verhuizingen-amsterdam-top-movers (zoekresultaat-titel)
- https://nl.linkedin.com/in/patrickvanrooyen/nl (zoekresultaat-titel)
- https://www.zakelijkverhuizen.nl/vind-hier-uw-erkende-projectverhuizer/top-movers-nederland-bv/
- https://www.klantenvertellen.nl/reviews/1065348/top_movers_nederland_bv
- https://www.klantenvertellen.nl/reviews/1034282/erkende_verhuizer_de_kievit_verhuizingen_top+movers
- https://www.facebook.com/dekievitverhuizingen/
- https://www.noordlimburgbusiness.nl/magazine/artikel/626/6207/de-kievit-top-movers-onze-passie-is-verhuizen
- https://www.verhuizerstarieven.nl/verhuisbedrijven/venlo/top-movers-de-kievit-verhuizingen/
- https://drimble.nl/bedrijf/venlo/000018538517/top-movers-de-kievit-verhuizingen.html (bedrijfsstatus Jac. de Kievit en Zn. B.V., toegevoegd bij de eindredactie 25-08-2026)
- https://drimble.nl/bedrijf/venlo/000026427966/de-kievit-verhuizingen.html (bedrijfsstatus VOF De Kievit, idem)
- https://www.openingstijden.nl/De-Kievit-verhuizingen/Venlo/Voltastraat-27/ (openingstijden gekoppeld aan het oude adres, idem)
- https://www.transfirm.nl/nl/organisatie/12015298-000018538517-top-movers-de-kievit-verhuizingen (alleen zoekresultaat; pagina gaf een foutmelding)
- https://transfirm.nl/nl/organisatie/56937164-000026427966-de-kievit-verhuizingen (alleen zoekresultaat; pagina gaf HTTP 500)
- https://www.verhuizen.nl/verhuisbedrijf/de-kievit-verhuizingen-top-movers/
- https://www.yelp.com/biz/de-kievit-verhuizingen-venlo (zoekresultaat-titel)
- https://exoskeletonreport.com/venue/location-de-kievit-topmover-coehoornstraat-11-5916-ph-venlo/ (zoekresultaat-titel)
- https://www.debresser.nl/
- https://www.debresser.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-8.css
- https://meta.nl/
- https://www.vanderentgroup.com/
- https://www.holwerda.nl/
- https://holwerdatopmovers.nl/
- https://www.harrievanerp.nl/
- https://www.boudesteijn.nl/ (alleen titel en telling)
- https://www.terhaarverhuizingen.nl/ (alleen titel en telling)
- https://www.vlotweg.nl/ (alleen titel en telling)
- https://www.de-kievit.nl/
- https://www.de-kievit.nl/wp-content/uploads/elementor/bronteksten/topmovers-nl/css/post-8.css
- https://www.boudesteijn.nl/, https://www.terhaarverhuizingen.nl/ en https://www.vlotweg.nl/ (titels en tellingen opnieuw opgehaald 25-08-2026)
- https://www.topmovers.nl/verhuizen-in-<gemeente> voor alle 38 gemeentelinks uit de stadslanders (statuscontrole met curl, alle 404)

## Verificatie

Factcheck uitgevoerd op 25 augustus 2026 op de volledige tekst van dit hoofdstuk. Ongeveer 210 losse beweringen zijn getoetst: elke bewering met een lokale bron is teruggezocht in het genoemde bestand (crawl van topmovers.nl, de CSS-kopieën, de ledensites, de manifests en de beeldbank), elke telling is opnieuw uitgevoerd, elke aangehaalde kleurwaarde is uit het bestand of uit de pixels van het beeld gemeten, en elke online bron is opnieuw opgehaald met curl of WebSearch. Statuscodes zijn opnieuw gecontroleerd, waaronder alle 38 gemeentelinks uit de stadslanders.

Gecorrigeerd:
- Sitemap-samenstelling: 31 tag-archieven in plaats van 33, en de verdeling over 213 URL's opnieuw uitgerekend (69 pagina-URL's, 46 posts, 45 vestigingen, 3 vacatures, 14 global sections, 31 tags, 3 auteursarchieven, 2 archief-URL's).
- "164 van de 399 gecrawlde titels" werd "164 van de 211".
- Formulieren: niet vier maar 35 verschillende WPForms-ID's; 2006 en 2007 staan alleen op de Kievit-pagina, elk lid heeft een eigen paar. Het zakelijke formulier heeft twee volledige adresblokken en een veld "Toelichting project" die in de oorspronkelijke opsomming ontbraken; beide offerteformulieren zijn stappenformulieren.
- Postcodezoeker: de bewering dat de zoekercode uitgeschakeld is, is onjuist. De kopie in custom.js is uitgecommentarieerd, maar het inline script per widget werkt wel; een testaanroep gaf voor 5916 en 5911 de Kievit-vestigingspagina terug. Ook punt 12 van 4.8 is hierop aangepast.
- Koppen: 15 van de 21 stadslanders hebben wel een H1, niet nul.
- Openingstijden op de vestigingspagina's zijn identiek op 44 van de 45 pagina's; Harreman heeft 08:30-17:00.
- De 45 vestigingspagina's linken niet naar elkaar; de enige verwijzing naar /vestigingen/ per pagina is de eigen canonical.
- Kleuren van het logo Erkende Verhuizers: gemeten #1B4B95 en #ED8C1F in plaats van #184890 en #E88818.
- Afmetingen: ESG.png is 650x676 (niet 650x706), de drie ronde NCI-badges zijn 535x546, 535x548 en 535x542, de twee NCI-CO2-certificaten 1212x1187 en 1083x1077.
- Iconenmap: 70 bestanden, waarvan 68 SVG en 2 PNG; drie generaties in plaats van twee (de campagneset uit 2023-09 ontbrak); het "lege zwarte basispad" bestaat niet; kleurtellingen bijgesteld (#1D1D1B 285 fills en 139 strokes, #009A96 51, #FFD500 98).
- "is er altijd een Top Mover bij u in de buurt" en "Alle 15 aangesloten verhuisbedrijven" staan op 38 van de 45 vestigingspagina's, niet op alle 45.
- De 50px afronding hoort bij de menu-items in de desktopheader, niet bij een headerknop; de transparante accentknoppen staan in de footer-global-section, niet in de header.
- Het citaat over de certificaten is teruggebracht tot de letterlijke zin; bij het 98%-citaat is de foutieve variant geschrapt.
- Franchisegids: 1998 staat er als "Werkt met ondernemers sinds", niet als oprichtingsjaar; de passage over "drie jaartallen" is herschreven.
- JSON-LD: ImageObject staat op alle 211 pagina's (176 met primaryImageOfPage), Person op 48, Article op 45, CollectionPage alleen op tag-archieven.
- Blogauteurs: admin, chester en danny; Manuela staat bij twee vacatures, niet bij blogposts.
- Mobiel menu: twee afwijkende links met een redirect, niet drie.
- Naamgeving: de lijst met "<Naam> Top Movers" is aangevuld met De Wit, Geijtenbeek en Harreman; bij Harrie van Erp is een citaat geschrapt dat niet in de bron staat.
- Drie streepjes (en-dashes) verwijderd en vervangen door een komma of een hyphen, met een korte vermelding waar de bron een streepje heeft.

Toegevoegd na eigen controle:
- Het Duurzaamheidsverslag 2025 van Top Movers bevat een kaart met 23 locaties onder 15 bedrijfsnamen in de vorm "<Naam> Top Movers | <Plaats>", waaronder "De Kievit Top Movers | Venlo".
- Het CO2-Prestatieladder-certificaat noemt "Jac. de Kievit en Zn. B.V. (h.o.d.n. De Kievit Verhuizingen Top Movers)", KvK 12015298, Voltastraat 27 Venlo.
- Een vierde ledenaantal: "16 erkende verhuisbedrijven" in de SDG 9-blogpost.
- LinkedIn geeft bedrijfsgrootte "201 - 500 medewerkers", wat de siteclaim "meer dan 500 medewerkers" tegenspreekt.
- De twee "onbenoemde" bestanden zijn geïdentificeerd: pngwing.com_.png is de BSI-badge ISO 9001 met nummer FM31060, Naamloos-1.png is het logo Erkende Verhuizers in zwart-wit. De bijbehorende [ONZEKER]-markering is vervallen.
- Op /over-ons/ wijzen twee certificaatknoppen naar het verkeerde certificaatbeeld (punt 14 in 4.8).

Blijft onzeker:
- Welke teal de officiële merkkleur is; er is geen huisstijlhandboek gevonden. Dat is een observatie, geen bewijs dat het niet bestaat.
- Het oprichtingsjaar: 1988 in het brancheartikel tegenover "Opgericht 1923" op LinkedIn.
- De herkomst van het reviewcijfer 9,6; klantenvertellen toont voor Top Movers Nederland B.V. zelf 8,8 uit 9 beoordelingen (opnieuw gecontroleerd op 25-08-2026).
- Het derde KvK-nummer 56937164 met adres Maasschriksel 125; alleen als zoekresultaat gezien, beide TransFirm-pagina's gaven een foutmelding.
- De naam van het Google Business-profiel van De Kievit.
- De Facebook-paginanaam "De Kievit Top Movers | Venlo" komt uit een zoekresultaat; de pagina zelf gaf HTTP 400. Het Duurzaamheidsverslag 2025 gebruikt dezelfde vorm, wat de naam wel aannemelijk maakt.
- De exacte kleurcodes en een vectorbestand van het Kievit-logo; alleen af te leiden uit foto's.
- De gemiddelde zinslengte is als orde van grootte weergegeven, omdat de uitkomst afhangt van de telmethode.

## Eindredactie (25 augustus 2026)

Gelijkgetrokken met de hoofdstukken 02, 04 en 07:

- Sectie 2.5: de foto op de Kievit-vestigingspagina van topmovers.nl is geen "Top Movers-truck aan zee" maar een Kievit-eigen combinatie, een witte MAN-trekker met topmovers.nl op het front en een oplegger met Kievit-logo en "KIEVIT VERHUIZINGEN", op een oprit bij een woonhuis. De omschrijving in ../README.md is fout; hoofdstuk 02 heeft het beeld zelf bekeken. Dit is voor de nieuwe site relevant, want het is bruikbaar Kievit-beeld.
- Sectie 3.4: bij de drie KvK-nummers is de Drimble-status "Opgeheven" van 12015298 en 56937164 toegevoegd, waarmee 18014730 het enige nummer is dat bij een actieve rechtspersoon hoort.
- Sectie 1.5 en sectie 4.4 en open vraag 7: bij de duurzaamheidsclaim staat nu dat het gepubliceerde CO2-certificaat verlopen is en dat de Kievit-entiteit niet in het opvolgende certificaat staat; bij de openingstijden staat nu dat het blok op topmovers.nl per lid is ingevuld en dat de externe 07:30-17:00 aan het oude adres Voltastraat 27 hangt.
