#!/usr/bin/env python3
"""Schrijft en valideert site/_werk/seo-uitvoering/link-matrix.csv (T2, Fase 4-voorbereiding).

Waarom een script en geen handgeschreven CSV: elke regel noemt een bronblok en een doelfragment,
en die moeten allebei ECHT in de gebouwde HTML staan. Een label als "AVB" of "zakelijke FAQ" is
geen bestemming. Dit bestand controleert daarom bij elke run:

  - bestaat site/<doelroute>/index.html
  - staat `gevalideerd_fragment` als id in die gebouwde pagina
  - staat `bron_contentblok` als id in de gebouwde bronpagina

Blokken die pas in Fase 3 geschreven worden dragen "(nieuw)" en worden op de bron overgeslagen;
hun doelfragment wordt wel gewoon gecontroleerd. De uitkomst gaat in de kolom qa_status, dus de
CSV liegt nooit over een fragment dat niet bestaat.

Draaien na elke build van T1:  python3 site/_werk/seo-uitvoering/linkmatrix.py
"""
import csv, pathlib, re, sys

SITE = pathlib.Path(__file__).resolve().parents[2]
UIT = pathlib.Path(__file__).resolve().parent / "link-matrix.csv"

KOP = ["bronroute", "bron_contentblok", "doelroute", "gevalideerd_fragment", "anker_primair",
       "anker_alternatief", "reden_volgende_gebruikersvraag", "bestandseigenaar",
       "indexvoorwaarde", "activatiestatus", "qa_status"]

# Eigenaar plus bronbestand in een veld, zodat de mandatige kolommenset intact blijft.
T1H = "T1 (_werk/build_kievit.py)"
T1P = "T1 (_werk/build_paginas.py)"
T1N = "T1 (_werk/navigatie.py)"
T2D = "T2 (_werk/paginas/diensten.html)"
T2W = "T2 (_werk/paginas/werkwijze.html)"
T2C = "T2 (_werk/paginas/verhuischecklist.html)"
T2I = "T2 (_werk/paginas/inpaktips.html)"
T2Z = "T2 (_werk/paginas/dozencalculator.html)"
T2M = "T2 (_werk/paginas/m3-calculator.html)"
T2F = "T2 (_werk/blok_veelgestelde_vragen.py)"
T2V = "T2 (_werk/paginas/vacatures.html)"
T2S = "T2 (nieuw servicebronbestand, Fase 3)"
T3O = "T3 (_werk/paginas/over-ons.html)"
T3E = "T3 (_werk/paginas/erkende-verhuizer.html)"
T3C = "T3 (_werk/paginas/certificeringen.html)"
T3V = "T3 (_werk/paginas/verzekering.html)"
T3K = "T3 (_werk/paginas/klachtenregeling.html)"
T3R = "T3 (_werk/paginas/klantervaringen.html)"
T3D = "T3 (_werk/paginas/duurzaamheid.html)"
T3T = "T3 (_werk/paginas/contact.html)"
T3A = "T3 (_werk/paginas/algemene-voorwaarden.html)"
T3P = "T3 (_werk/paginas/privacybeleid.html)"
T3B = "T3 (_werk/paginas/cookiebeleid.html)"
T3S = "T3 (_werk/paginas/disclaimer.html)"
T3G = "T3 (_werk/paginas/toegankelijkheid.html)"

IX = "doelroute is indexeerbaar"
# Een link die in een uit index.html geknipt blok staat, verschijnt op alle twaalf dienstroutes.
GEDEELD = "doelroute is indexeerbaar; GEDEELD BLOK, verschijnt op 12 routes tegelijk"
WIP = "WIP: hubanker zolang de servicroute noindex is"
NA = "pas activeren in het atomaire release-item van de servicroute"

R = [
# ---------------------------------------------------------------- / (T1), nu nul contextlinks
("/", "#diensten", "/diensten/", "", "alle verhuisdiensten op een rij", "bekijk wat wij verhuizen",
 "Welke van deze diensten heb ik nodig?", T1H, IX, "TE PLAATSEN"),
("/", "#historie", "/over-ons/", "#tijdlijn", "vijf generaties verhuizen vanuit Venlo", "de geschiedenis van De Kievit",
 "Sinds wanneer bestaat dit bedrijf en wie is het nu?", T1H, IX, "TE PLAATSEN"),
("/", "#opslag", "/diensten/", "#verhuisdiensten", "wat wij aan opslag doen", "opslag in het dienstenoverzicht",
 "Hoe lang kan mijn inboedel blijven staan en wat kost dat?", T1H, WIP, "TE PLAATSEN"),
("/", "#opslag", "/inboedelopslag/", "", "inboedelopslag in houten kisten of een eigen container", "onze inboedelopslag",
 "Hoe lang kan mijn inboedel blijven staan en wat kost dat?", T1H, NA, "NA RELEASE"),
("/", "#dozen", "/dozencalculator/", "#calc", "reken uit hoeveel dozen u nodig heeft", "de dozencalculator",
 "Hoeveel dozen moet ik laten komen?", T1H, IX, "TE PLAATSEN"),
("/", "#werkwijze", "/werkwijze/", "#zo-werkt-het", "zo verloopt een verhuisdag bij ons", "van aanvraag tot oplevering",
 "Wat gebeurt er precies op de dag zelf?", T1H, IX, "TE PLAATSEN"),
("/", "#reviews", "/klantervaringen/", "#kev-reviews-kop", "alle beoordelingen onverkort", "lees wat klanten schreven",
 "Zijn die reviews echt en waar komen ze vandaan?", T1H, IX, "TE PLAATSEN"),
("/", "#ringen", "/certificeringen/", "#top-movers", "wat het Top Movers-lidmaatschap inhoudt", "onze keurmerken en certificaten",
 "Wat betekent dat netwerk voor mijn verhuizing?", T1H, IX, "TE PLAATSEN"),
("/", "#werkgebied", "/contact/", "#contact-adres", "ons adres en onze openingstijden", "waar u ons vindt",
 "Zitten zij bij mij in de buurt en wanneer kan ik bellen?", T1H, IX, "TE PLAATSEN"),
("/", "#faq", "/veelgestelde-vragen/", "", "alle veelgestelde vragen", "meer vragen en antwoorden",
 "Mijn vraag staat er niet bij", T1H, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- /diensten/ (T2, de hub)
("/diensten/", "#verhuizen", "/werkwijze/", "#opname", "het begint met een opname aan huis", "hoe wij uw verhuizing voorbereiden",
 "Hoe komen jullie aan een prijs?", T2D, IX, "TE PLAATSEN"),
("/diensten/", "#verhuizen", "/verhuischecklist/", "#checklist", "wat u zelf op tijd moet regelen", "onze verhuischecklist",
 "Wat moet ik zelf nog doen?", T2D, IX, "TE PLAATSEN"),
("/diensten/", "#verhuisdiensten", "/inpaktips/", "#inpak-start", "zelf inpakken zonder schade", "onze inpaktips",
 "Kan ik dit ook zelf doen?", T2D, IX, "TE PLAATSEN"),
("/diensten/", "#verhuisdiensten", "/dozencalculator/", "#calc", "hoeveel dozen u nodig heeft", "reken uw dozen uit",
 "Hoeveel dozen heb ik nodig als ik het zelf doe?", T2D, IX, "TE PLAATSEN"),
("/diensten/", "#specialistisch", "/verzekering/", "#bedragen", "tot welk bedrag uw inboedel gedekt is", "wat er verzekerd is",
 "En als er iets kapotgaat aan een kostbaar stuk?", T2D, IX, "TE PLAATSEN"),
("/diensten/", "#faq", "/veelgestelde-vragen/", "", "alle veelgestelde vragen", "meer vragen en antwoorden",
 "Mijn vraag staat er niet bij", T1H, GEDEELD, "TE PLAATSEN"),
("/diensten/", "#verhuizen", "/particulier-verhuizen/", "", "particuliere verhuizing", "een woning laten verhuizen",
 "Wat houdt een particuliere verhuizing precies in?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#verhuizen", "/internationale-verhuizing/", "", "internationale verhuizing", "verhuizen over de grens",
 "Verhuizen jullie ook naar het buitenland?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#verhuizen", "/seniorenverhuizing/", "", "seniorenverhuizing", "kleiner gaan wonen",
 "Kan het rustig en in mijn eigen tempo?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#verhuizen", "/spoedverhuizing/", "", "spoedverhuizing", "verhuizen op korte termijn",
 "Kan het volgende week nog?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#verhuisdiensten", "/inpakservice/", "", "inpakservice", "het inpakken uitbesteden",
 "Kan iemand anders het inpakken doen?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#verhuisdiensten", "/montage-demontage/", "", "montage en demontage", "meubels uit elkaar en weer in elkaar",
 "Halen jullie mijn kasten uit elkaar?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#verhuisdiensten", "/inboedelopslag/", "", "inboedelopslag", "tijdelijke opslag van uw inboedel",
 "Waar staan mijn spullen tussendoor?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#specialistisch", "/zorgverhuizing/", "", "zorgverhuizing", "verhuizen in een zorgomgeving",
 "Kunnen jullie met bewoners en zorgpersoneel werken?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#specialistisch", "/piano-verhuizen/", "", "piano verhuizen", "een piano of vleugel verplaatsen",
 "Hoe krijgen jullie mijn vleugel de trap af?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#specialistisch", "/antiek-en-kunst-verhuizen/", "", "antiek en kunst", "waardevolle stukken verhuizen",
 "Wat doen jullie extra bij kwetsbare stukken?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),
("/diensten/", "#specialistisch", "/kantoorverhuizing/", "", "kantoorverhuizing", "een bedrijf of praktijk verhuizen",
 "Hoe lang ligt mijn bedrijf stil?", T2D, "ACTIEF maar wijst nu naar een noindex-route", "TE HERRICHTEN"),

# ---------------------------------------------------------------- /werkwijze/ (T2)
("/werkwijze/", "#opname", "/m3-calculator/", "#m3-intro-kop", "zelf alvast uw volume schatten", "de m3-calculator",
 "Kan ik vooraf al inschatten hoe groot mijn inboedel is?", T2W, IX, "TE PLAATSEN"),
("/werkwijze/", "#zo-werkt-het", "/verhuischecklist/", "#checklist", "wat er van uw kant bij komt kijken", "de verhuischecklist",
 "En wat moet ik zelf regelen?", T2W, IX, "TE PLAATSEN"),
("/werkwijze/", "#verhuisdag", "/verzekering/", "#basis", "waarvoor u onderweg verzekerd bent", "wat er gedekt is",
 "Wat als er onderweg iets gebeurt?", T2W, IX, "TE PLAATSEN"),
("/werkwijze/", "#aanspreekpunt", "/klantervaringen/", "#kev-vaak-kop", "wat klanten hierover schrijven", "ervaringen van klanten",
 "Klopt dit ook in de praktijk?", T2W, IX, "TE PLAATSEN"),
("/werkwijze/", "#werkwijze-vragen", "/verzekering/", "#basis", "verzekering en garantie", "waarvoor u gedekt bent",
 "Is mijn inboedel onderweg verzekerd?", T2W, IX, "ACTIEF, fragment toevoegen"),
("/werkwijze/", "#werkwijze-offerte", "/contact/", "#contact-intro", "even iemand spreken", "bel of mail ons",
 "Ik wil dit liever telefonisch bespreken", T2W, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- /verhuischecklist/ (T2)
("/verhuischecklist/", "#checklist", "/dozencalculator/", "#calc", "dozencalculator", "reken uw dozen uit",
 "Hoeveel dozen bestel ik?", T2C, IX, "ACTIEF, fragment toevoegen"),
("/verhuischecklist/", "#overnemen", "/werkwijze/", "#zo-werkt-het", "wat wij van u overnemen", "onze werkwijze",
 "Welke punten hoef ik niet zelf te doen?", T2C, IX, "TE PLAATSEN"),
("/verhuischecklist/", "#overnemen", "/inpaktips/", "#inpak-start", "zelf inpakken zonder schade", "onze inpaktips",
 "Hoe pak ik dat dan zelf goed in?", T2C, IX, "TE PLAATSEN"),
("/verhuischecklist/", "#valkuilen", "/m3-calculator/", "#m3-fout-kop", "wat mensen bij het volume vergeten", "de m3-calculator",
 "Wat vergeet ik nog meer?", T2C, IX, "TE PLAATSEN"),
("/verhuischecklist/", "#checklist-offerte", "/contact/", "#contact-intro", "zet de verhuizer bovenaan uw lijst", "neem contact op",
 "Wanneer moet ik de verhuizer bellen?", T2C, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- /inpaktips/ (T2)
("/inpaktips/", "#inpak-dozen", "/dozencalculator/", "#calc", "hoeveel dozen u nodig heeft", "de dozencalculator",
 "Hoeveel van elke maat moet ik hebben?", T2I, IX, "TE PLAATSEN"),
("/inpaktips/", "#inpak-breekbaar", "/verzekering/", "#uitsluiting", "wat er geldt bij zelf ingepakte dozen", "waar de dekking stopt",
 "Ben ik verzekerd als ik het zelf inpak?", T2I, IX, "TE PLAATSEN"),
("/inpaktips/", "#inpak-fouten", "/verhuischecklist/", "#valkuilen", "de punten die het vaakst blijven liggen", "de verhuischecklist",
 "Wat vergeet ik nog meer?", T2I, IX, "TE PLAATSEN"),
("/inpaktips/", "#inpak-service", "/diensten/", "#verhuisdiensten", "het inpakken uit handen geven", "onze verhuisdiensten",
 "Kan ik dit ook laten doen?", T2I, WIP, "TE PLAATSEN"),
("/inpaktips/", "#inpak-service", "/inpakservice/", "", "onze inpakservice", "het inpakken uitbesteden",
 "Kan ik dit ook laten doen?", T2I, NA, "NA RELEASE"),
("/inpaktips/", "#inpak-faq", "/veelgestelde-vragen/", "#vgv-vooraf", "meer vragen over de weken ervoor", "alle veelgestelde vragen",
 "Wanneer komen die dozen eigenlijk?", T2I, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- /dozencalculator/ (T2)
("/dozencalculator/", "#rekenen", "/m3-calculator/", "#m3-intro-kop", "het volume van uw inboedel", "de m3-calculator",
 "En hoeveel kubieke meter is dat dan?", T2Z, IX, "ACTIEF, fragment toevoegen"),
("/dozencalculator/", "#aannames", "/verhuischecklist/", "#checklist", "wanneer u begint met inpakken", "de verhuischecklist",
 "Wanneer moet ik hiermee beginnen?", T2Z, IX, "TE PLAATSEN"),
("/dozencalculator/", "#missers", "/inpaktips/", "#inpak-dozen", "hoe u een doos goed vult", "onze inpaktips",
 "Hoe voorkom ik dat ik verkeerd inpak?", T2Z, IX, "TE PLAATSEN"),
("/dozencalculator/", "#dozen-service", "/diensten/", "#verhuisdiensten", "het inpakken uit handen geven", "onze verhuisdiensten",
 "Kan ik het inpakken uitbesteden?", T2Z, WIP, "TE PLAATSEN"),
("/dozencalculator/", "#dozen-service", "/inpakservice/", "", "onze inpakservice", "het inpakken uitbesteden",
 "Kan ik het inpakken uitbesteden?", T2Z, NA, "NA RELEASE"),
("/dozencalculator/", "#offerte-cta", "/werkwijze/", "#opname", "wat er bij de opname gebeurt", "onze werkwijze",
 "Hoe gaat het verder na mijn aanvraag?", T2Z, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- /m3-calculator/ (T2)
("/m3-calculator/", "#m3-opname-kop", "/werkwijze/", "#opname", "waar de verhuisadviseur naar kijkt", "onze werkwijze",
 "Wat voegt een opname aan huis nog toe?", T2M, IX, "TE PLAATSEN"),
("/m3-calculator/", "#m3-fout-kop", "/dozencalculator/", "#calc", "reken uw dozen apart uit", "de dozencalculator",
 "Zitten de dozen hier al in?", T2M, IX, "ACTIEF, fragment toevoegen"),
("/m3-calculator/", "#m3-faq-kop", "/diensten/", "#verhuisdiensten", "wat er niet meegaat en wel de opslag in kan", "onze verhuisdiensten",
 "Wat doe ik met wat niet mee kan?", T2M, WIP, "TE PLAATSEN"),
("/m3-calculator/", "#m3-faq-kop", "/inboedelopslag/", "", "onze inboedelopslag", "tijdelijk opslaan",
 "Wat doe ik met wat niet mee kan?", T2M, NA, "NA RELEASE"),
("/m3-calculator/", "#m3-slot-kop", "/contact/", "#contact-intro", "uw schatting even doorspreken", "neem contact op",
 "Klopt mijn schatting wel?", T2M, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- /veelgestelde-vragen/ (T2)
("/veelgestelde-vragen/", "#vgv-offerte", "/m3-calculator/", "#m3-intro-kop", "m3-calculator", "schat uw volume",
 "Hoe kom ik aan het volume dat zij vragen?", T2F, IX, "ACTIEF, fragment toevoegen"),
("/veelgestelde-vragen/", "#vgv-offerte", "/werkwijze/", "#opname", "wat er bij de opname gebeurt", "onze werkwijze",
 "Wat gebeurt er als de adviseur langskomt?", T2F, IX, "TE PLAATSEN"),
("/veelgestelde-vragen/", "#vgv-vooraf", "/dozencalculator/", "#calc", "dozencalculator", "reken uw dozen uit",
 "Hoeveel dozen heb ik nodig?", T2F, IX, "ACTIEF, fragment toevoegen"),
("/veelgestelde-vragen/", "#vgv-vooraf", "/verhuischecklist/", "#checklist", "verhuischecklist", "wat wanneer moet",
 "Wat moet ik wanneer regelen?", T2F, IX, "ACTIEF, fragment toevoegen"),
("/veelgestelde-vragen/", "#vgv-verhuisdag", "/werkwijze/", "#verhuisdag", "hoe de verhuisdag verloopt", "onze werkwijze",
 "Hoe laat staan jullie voor de deur?", T2F, IX, "TE PLAATSEN"),
("/veelgestelde-vragen/", "#vgv-verhuisdag", "/diensten/", "#verhuisdiensten", "montage en demontage", "wat wij nog meer doen",
 "Sluiten jullie de wasmachine aan?", T2F, WIP, "TE HERRICHTEN, wijst nu naar /montage-demontage/"),
("/veelgestelde-vragen/", "#vgv-verhuisdag", "/montage-demontage/", "", "montage en demontage", "wat wij monteren",
 "Sluiten jullie de wasmachine aan?", T2F, NA, "NA RELEASE"),
("/veelgestelde-vragen/", "#vgv-schade", "/verzekering/", "#bedragen", "verzekering", "tot welk bedrag u gedekt bent",
 "Tot hoeveel ben ik gedekt?", T2F, IX, "ACTIEF, fragment toevoegen"),
("/veelgestelde-vragen/", "#vgv-schade", "/klachtenregeling/", "#melden", "klachtenregeling", "hoe u schade meldt",
 "Hoe meld ik schade?", T2F, IX, "ACTIEF, fragment toevoegen"),
("/veelgestelde-vragen/", "#vgv-schade", "/algemene-voorwaarden/", "#avvv", "de voorwaarden die hierbij gelden", "AVVV 2025 nalezen",
 "Waar staat dat precies?", T2F, IX, "TE PLAATSEN"),
("/veelgestelde-vragen/", "#vgv-opslag", "/diensten/", "#verhuisdiensten", "inboedelopslag", "wat wij aan opslag doen",
 "Waar staan mijn spullen dan?", T2F, WIP, "TE HERRICHTEN, wijst nu naar /inboedelopslag/"),
("/veelgestelde-vragen/", "#vgv-opslag", "/inboedelopslag/", "", "onze inboedelopslag", "opslag van uw inboedel",
 "Waar staan mijn spullen dan?", T2F, NA, "NA RELEASE"),
("/veelgestelde-vragen/", "#vgv-opslag", "/algemene-voorwaarden/", "#avbv", "de bewaarnemingsvoorwaarden AVBV 2025", "de opslagvoorwaarden",
 "Onder welke voorwaarden staat het er?", T2F, IX, "TE PLAATSEN"),
("/veelgestelde-vragen/", "#vgv-zakelijk", "/diensten/", "#specialistisch", "kantoorverhuizing", "wat wij zakelijk doen",
 "Verhuizen jullie ook bedrijven?", T2F, WIP, "TE HERRICHTEN, wijst nu naar /kantoorverhuizing/"),
("/veelgestelde-vragen/", "#vgv-zakelijk", "/kantoorverhuizing/", "", "onze kantoorverhuizing", "zakelijk verhuizen",
 "Verhuizen jullie ook bedrijven?", T2F, NA, "NA RELEASE"),
("/veelgestelde-vragen/", "#vgv-zakelijk", "/diensten/", "#verhuizen", "internationale verhuizing", "verhuizen over de grens",
 "Verhuizen jullie ook naar het buitenland?", T2F, WIP, "TE HERRICHTEN, wijst nu naar /internationale-verhuizing/"),
("/veelgestelde-vragen/", "#vgv-zakelijk", "/internationale-verhuizing/", "", "onze internationale verhuizingen", "verhuizen over de grens",
 "Verhuizen jullie ook naar het buitenland?", T2F, NA, "NA RELEASE"),
("/veelgestelde-vragen/", "#vgv-zakelijk", "/algemene-voorwaarden/", "#avvvbe", "de voorwaarden buiten Europa, AVVV-BE 2025", "de internationale voorwaarden",
 "Welke voorwaarden gelden buiten Europa?", T2F, IX, "TE PLAATSEN"),
("/veelgestelde-vragen/", "#vgv-zakelijk", "/algemene-voorwaarden/", "GEEN BESTEMMING",
 "de bedrijfsverhuisvoorwaarden", "de voorwaarden voor bedrijven",
 "Welke voorwaarden gelden voor mijn bedrijfsverhuizing?", T2F,
 "GEBLOKKEERD: het antwoord noemt een grens van 50.000 euro per wagenzending, maar de set die dat regelt (AVB) staat niet op /algemene-voorwaarden/; die publiceert AVVV, AVVV-BE, AVBV, AVHD en PV05",
 "GEBLOKKEERD, OWNER INPUT NEEDED bij T3"),

# ---------------------------------------------------------------- /vacatures/ (T2)
("/vacatures/", "#vac-start", "/over-ons/", "#wie-wij-zijn", "wie wij zijn", "over De Kievit",
 "Bij wat voor bedrijf kom ik terecht?", T2V, IX, "TE PLAATSEN"),
("/vacatures/", "#vac-dag", "/werkwijze/", "#verhuisdag", "hoe een verhuisdag verloopt", "onze werkwijze",
 "Hoe ziet zo'n dag er echt uit?", T2V, IX, "TE PLAATSEN"),
("/vacatures/", "#vac-opleiding", "/certificeringen/", "#erkende-verhuizers", "wat een erkend leerbedrijf betekent", "onze erkenningen",
 "Krijg ik hier een echt diploma?", T2V, IX, "TE PLAATSEN"),
("/vacatures/", "#vac-slot", "/contact/", "#bedrijfsgegevens", "waar u ons vindt", "onze contactgegevens",
 "Waar moet ik mijn bericht heen sturen?", T2V,
 "sollicitatieactie in plaats van de verhuisoffertefunnel; sollicitatieadres OWNER INPUT NEEDED", "TE PLAATSEN"),

# ---------------------------------------------------------------- /over-ons/ (T3)
("/over-ons/", "#wie-wij-zijn", "/erkende-verhuizer/", "#wat", "wat een Erkende Verhuizer is", "het keurmerk uitgelegd",
 "Wat betekent die erkenning voor mij?", T3O, IX, "TE PLAATSEN"),
("/over-ons/", "#familie", "/werkwijze/", "#zo-werkt-het", "zo verloopt een verhuizing bij ons", "onze werkwijze",
 "Hoe werken zij dan?", T3O, IX, "ACTIEF, fragment toevoegen"),
("/over-ons/", "#familie", "/vacatures/", "#vac-start", "werken bij De Kievit", "onze vacatures",
 "Kan ik hier werken?", T3O, IX, "TE PLAATSEN"),
("/over-ons/", "#de-bresser", "/certificeringen/", "#niwo", "op wiens naam de vergunning staat", "onze certificeringen",
 "Wie is de contractpartij eigenlijk?", T3O, IX, "TE PLAATSEN"),
("/over-ons/", "#de-bresser", "/duurzaamheid/", "#dz-bresser", "wat De Bresser over 2025 rapporteert", "onze duurzaamheid",
 "Wat doet die organisatie aan milieu?", T3O, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- /erkende-verhuizer/ (T3)
("/erkende-verhuizer/", "#wat", "/algemene-voorwaarden/", "#avvv", "de voorwaarden waar dat in staat", "AVVV 2025 nalezen",
 "Waar staan die regels precies?", T3E, IX, "TE PLAATSEN"),
("/erkende-verhuizer/", "#eisen", "/certificeringen/", "#erkende-verhuizers", "op wiens naam de erkenning staat", "onze certificeringen",
 "Staat die erkenning wel op dit bedrijf?", T3E, IX, "TE PLAATSEN"),
("/erkende-verhuizer/", "#grens", "/verzekering/", "#basis", "waarvoor u verzekerd bent", "wat er gedekt is",
 "Tot hoever gaat die garantie?", T3E, IX, "ACTIEF, fragment toevoegen"),
("/erkende-verhuizer/", "#grens", "/klachtenregeling/", "#melden", "als er iets misgaat", "hoe u een klacht meldt",
 "En als er toch iets misgaat?", T3E, IX, "ACTIEF, fragment toevoegen"),

# ---------------------------------------------------------------- /certificeringen/ (T3)
("/certificeringen/", "#erkende-verhuizers", "/erkende-verhuizer/", "#wat", "wat het keurmerk inhoudt", "de erkenning uitgelegd",
 "Wat heb ik aan dat keurmerk?", T3C, IX, "ACTIEF, verplaatsen uit #niwo"),
("/certificeringen/", "#top-movers", "/over-ons/", "#de-bresser", "hoe wij bij dit netwerk horen", "over de organisatie",
 "Bij wie hoort deze vestiging?", T3C, IX, "TE PLAATSEN"),
("/certificeringen/", "#co2", "/duurzaamheid/", "#dz-koepel", "wat wij in Venlo zelf doen", "onze duurzaamheid",
 "Wat merk ik daar als klant van?", T3C, IX, "ACTIEF, fragment toevoegen"),
("/certificeringen/", "#cert-vw-kop", "/algemene-voorwaarden/", "#avvv", "de volledige voorwaarden", "AVVV 2025 nalezen",
 "Welke voorwaarden gelden voor mij?", T3C, IX, "ACTIEF, verplaatsen uit #niwo"),
("/certificeringen/", "#cert-vw-kop", "/algemene-voorwaarden/", "#avbv", "de bewaarnemingsvoorwaarden", "AVBV 2025 nalezen",
 "En als mijn spullen tijdelijk staan?", T3C, IX, "TE PLAATSEN"),
("/certificeringen/", "#cert-vw-kop", "/algemene-voorwaarden/", "#avhd", "de handymanvoorwaarden", "AVHD 2025 nalezen",
 "En bij montagewerk?", T3C, IX, "TE PLAATSEN"),
("/certificeringen/", "#vca", "/diensten/", "#specialistisch", "zakelijk verhuizen met De Kievit", "wat wij zakelijk doen",
 "Wat betekent VCA voor mijn bedrijfsverhuizing?", T3C, WIP, "TE HERRICHTEN, wijst nu naar /kantoorverhuizing/"),
("/certificeringen/", "#vca", "/kantoorverhuizing/", "", "zakelijk verhuizen met De Kievit", "onze kantoorverhuizing",
 "Wat betekent VCA voor mijn bedrijfsverhuizing?", T3C, NA, "NA RELEASE"),

# ---------------------------------------------------------------- /verzekering/ (T3)
("/verzekering/", "#basis", "/algemene-voorwaarden/", "#avvv", "het artikel waar dit in staat", "AVVV 2025 nalezen",
 "Waar staat dat zwart op wit?", T3V, IX, "TE PLAATSEN"),
("/verzekering/", "#bedragen", "/erkende-verhuizer/", "#z-ok", "de acht zekerheden van een Erkende Verhuizer", "wat de erkenning garandeert",
 "Waar komen die bedragen vandaan?", T3V, IX, "TE PLAATSEN"),
("/verzekering/", "#uitsluiting", "/inpaktips/", "#inpak-breekbaar", "hoe u breekbaar zelf goed inpakt", "onze inpaktips",
 "Hoe voorkom ik dat ik buiten de dekking val?", T3V, IX, "TE PLAATSEN"),
("/verzekering/", "#opslag-zakelijk", "/algemene-voorwaarden/", "#avbv", "de bewaarnemingsvoorwaarden AVBV 2025", "de opslagvoorwaarden",
 "Wat geldt er tijdens opslag?", T3V, IX, "TE PLAATSEN"),
("/verzekering/", "#afsluiter", "/klachtenregeling/", "#melden", "er is toch iets misgegaan", "hoe u schade meldt",
 "Hoe meld ik dit?", T3V, IX, "ACTIEF, fragment toevoegen"),

# ---------------------------------------------------------------- /klachtenregeling/ (T3)
("/klachtenregeling/", "#melden", "/verzekering/", "#uitkering", "op welke waarde wordt uitgekeerd", "wat er vergoed wordt",
 "Wat krijg ik dan vergoed?", T3K, IX, "TE PLAATSEN"),
("/klachtenregeling/", "#route", "/algemene-voorwaarden/", "#avvv", "de meldtermijnen in de voorwaarden", "AVVV 2025 nalezen",
 "Hoelang heb ik om te melden?", T3K, IX, "TE PLAATSEN"),
("/klachtenregeling/", "#garantie", "/erkende-verhuizer/", "#z-ok", "het garantiecertificaat", "wat de erkenning garandeert",
 "Wat als jullie de uitspraak niet nakomen?", T3K, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- /klantervaringen/ (T3)
("/klantervaringen/", "#kev-vaak-kop", "/werkwijze/", "#zo-werkt-het", "zo verloopt een verhuizing bij ons", "onze werkwijze",
 "Werkt dat bij mij ook zo?", T3R, IX, "TE PLAATSEN"),
("/klantervaringen/", "#kev-hoe-kop", "/over-ons/", "#wie-wij-zijn", "wie deze verhuizingen doet", "over De Kievit",
 "Wie zijn die mensen?", T3R, IX, "TE PLAATSEN"),
("/klantervaringen/", "#kev-faq-kop", "/erkende-verhuizer/", "#wat", "waarom wij worden nagelopen", "de erkenning uitgelegd",
 "Wie controleert dit bedrijf?", T3R, IX, "TE PLAATSEN"),
("/klantervaringen/", "#kev-slot-kop", "/contact/", "#contact-intro", "even iemand spreken", "neem contact op",
 "Ik wil dit persoonlijk bespreken", T3R, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- /duurzaamheid/ (T3)
("/duurzaamheid/", "#dz-koepel", "/certificeringen/", "#co2", "op wiens naam de CO2-ladder staat", "onze certificeringen",
 "Wie is er nu eigenlijk gecertificeerd?", T3D, IX, "TE PLAATSEN"),
("/duurzaamheid/", "#dz-bresser", "/over-ons/", "#de-bresser", "de organisatie waar wij bij horen", "over De Bresser",
 "Van wie zijn die cijfers?", T3D, IX, "TE PLAATSEN"),
("/duurzaamheid/", "#dz-faq", "/diensten/", "#verhuisdiensten", "herbruikbare dozen en kratten", "onze verhuisdiensten",
 "Hoe voorkom ik afval bij mijn verhuizing?", T3D, WIP, "TE PLAATSEN"),

# ---------------------------------------------------------------- /contact/ (T3)
("/contact/", "#contact-intro", "/diensten/", "", "onze verhuisdiensten", "wat wij doen",
 "Wat kunnen jullie precies voor mij doen?", T3T, IX, "TE PLAATSEN"),
("/contact/", "#contact-intro", "/werkwijze/", "#zo-werkt-het", "hoe het daarna verloopt", "onze werkwijze",
 "Wat gebeurt er na mijn aanvraag?", T3T, IX, "TE PLAATSEN"),
("/contact/", "#contact-faq", "/veelgestelde-vragen/", "", "alle veelgestelde vragen", "meer vragen en antwoorden",
 "Mijn vraag staat er niet bij", T3T, IX, "TE PLAATSEN"),

# ---------------------------------------------------------------- juridische bronpagina's (T3)
("/algemene-voorwaarden/", "(voor eerste id)", "/verzekering/", "#basis", "verzekering en garantie", "waarvoor u gedekt bent",
 "Wat betekent dit voor mijn dekking?", T3A, "alleen in de eigen intro, niet tussen de artikelen", "ACTIEF, fragment toevoegen"),
("/algemene-voorwaarden/", "(voor eerste id)", "/klachtenregeling/", "#melden", "klachtenregeling", "hoe u een klacht meldt",
 "En als ik het er niet mee eens ben?", T3A, "alleen in de eigen intro, niet tussen de artikelen", "ACTIEF, fragment toevoegen"),
("/algemene-voorwaarden/", "(voor eerste id)", "/erkende-verhuizer/", "#wat", "waarom deze voorwaarden gelden", "de erkenning uitgelegd",
 "Waarom zijn dit jullie voorwaarden?", T3A, "alleen in de eigen intro, niet tussen de artikelen", "TE PLAATSEN"),
("/algemene-voorwaarden/", "(voor eerste id)", "/diensten/", "#verhuisdiensten", "opslag van uw inboedel", "onze verhuisdiensten",
 "Welke voorwaarden gelden bij opslag?", T3A, WIP, "TE HERRICHTEN, wijst nu naar /inboedelopslag/"),
("/algemene-voorwaarden/", "(voor eerste id)", "/inboedelopslag/", "", "opslag van uw inboedel", "onze inboedelopslag",
 "Welke voorwaarden gelden bij opslag?", T3A, NA, "NA RELEASE"),

("/privacybeleid/", "#cookies", "/cookiebeleid/", "#geen-cookies", "cookiebeleid", "wat deze site op uw apparaat zet",
 "Zet deze site cookies?", T3P, IX, "ACTIEF, fragment toevoegen"),
("/privacybeleid/", "#rechten", "/toegankelijkheid/", "#hulp", "loopt u vast op de site", "de toegankelijkheidsverklaring",
 "Hoe doe ik dat als de site niet werkt voor mij?", T3P, IX, "TE PLAATSEN"),
("/privacybeleid/", "#wijzigingen", "/contact/", "#bedrijfsgegevens", "onze contactgegevens", "waar u ons bereikt",
 "Bij wie moet ik zijn?", T3P, IX, "ACTIEF, fragment toevoegen"),
("/privacybeleid/", "#delen", "/diensten/", "#verhuisdiensten", "inboedelopslag", "onze verhuisdiensten",
 "Wie krijgt mijn gegevens bij opslag?", T3P, WIP, "TE HERRICHTEN, wijst nu naar /inboedelopslag/"),
("/privacybeleid/", "#delen", "/inboedelopslag/", "", "inboedelopslag", "onze inboedelopslag",
 "Wie krijgt mijn gegevens bij opslag?", T3P, NA, "NA RELEASE"),

("/cookiebeleid/", "#cookie-en-opslag", "/privacybeleid/", "#gegevens", "privacybeleid", "welke gegevens wij krijgen",
 "En wat gebeurt er met mijn gegevens?", T3B, IX, "ACTIEF, fragment toevoegen"),
("/cookiebeleid/", "#vragen", "/contact/", "#contact-intro", "contactpagina", "neem contact op",
 "Bij wie kan ik hierover terecht?", T3B, IX, "ACTIEF, fragment toevoegen"),

("/disclaimer/", "#actueel", "/algemene-voorwaarden/", "#avvv", "algemene voorwaarden", "AVVV 2025 nalezen",
 "Wat geldt er dan wel?", T3S, IX, "ACTIEF, fragment toevoegen"),
("/disclaimer/", "#rekenhulpen", "/dozencalculator/", "#aannames", "waar dit getal vandaan komt", "de dozencalculator",
 "Hoe hard is die schatting?", T3S, IX, "ACTIEF, fragment toevoegen"),
("/disclaimer/", "#rekenhulpen", "/m3-calculator/", "#m3-fout-kop", "wat de calculator niet ziet", "de m3-calculator",
 "Hoe hard is die schatting?", T3S, IX, "ACTIEF, fragment toevoegen"),
("/disclaimer/", "#cijfers", "/klantervaringen/", "#kev-reviews-kop", "klantervaringen", "de beoordelingen zelf",
 "Waar komen die cijfers vandaan?", T3S, IX, "ACTIEF, fragment toevoegen"),

("/toegankelijkheid/", "#waarover", "/privacybeleid/", "#verantwoordelijke", "privacybeleid", "wie verantwoordelijk is",
 "Wie is hier verantwoordelijk voor?", T3G, IX, "ACTIEF, fragment toevoegen"),
("/toegankelijkheid/", "#hulp", "/contact/", "#contact-intro", "de contactpagina", "neem contact op",
 "Bij wie meld ik dat ik vastloop?", T3G, IX, "ACTIEF, fragment toevoegen"),

("/sitemap/", "#sm-diensten", "/diensten/", "#verhuizen", "Onze verhuisdiensten", "alle diensten",
 "Welke pagina zoek ik?", T1N,
 "de elf noindex-services horen hier niet als bestemming zolang zij WIP zijn", "TE HERRICHTEN"),

# ---------------------------------------------------------------- verplicht uitgaand per service, Fase 3
("/particulier-verhuizen/", "#proces (nieuw)", "/werkwijze/", "#zo-werkt-het", "zo verloopt uw verhuisdag", "onze werkwijze",
 "Wat gebeurt er op de dag zelf?", T2S, NA, "NA RELEASE"),
("/particulier-verhuizen/", "#voorbereiding (nieuw)", "/verhuischecklist/", "#checklist", "wat u zelf moet regelen", "de verhuischecklist",
 "Wat blijft er bij mij liggen?", T2S, NA, "NA RELEASE"),
("/particulier-verhuizen/", "#dekking (nieuw)", "/verzekering/", "#basis", "waarvoor u verzekerd bent", "wat er gedekt is",
 "Ben ik verzekerd?", T2S, NA, "NA RELEASE"),
("/particulier-verhuizen/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "even iemand spreken", "neem contact op",
 "Ik wil dit bespreken", T2S, NA, "NA RELEASE"),

("/kantoorverhuizing/", "#draaiboek (nieuw)", "/werkwijze/", "#zo-werkt-het", "onze werkwijze", "hoe wij het aanpakken",
 "Hoe pakken jullie dit projectmatig aan?", T2S, NA, "NA RELEASE"),
("/kantoorverhuizing/", "#milieu (nieuw)", "/duurzaamheid/", "#dz-start", "wat wij aan duurzaam verhuizen doen", "onze duurzaamheid",
 "Voldoen jullie aan onze inkoopcriteria?", T2S, NA, "NA RELEASE"),
("/kantoorverhuizing/", "#voorwaarden (nieuw)", "/verzekering/", "#opslag-zakelijk", "hoe zakelijk werk verzekerd is", "de zakelijke dekking",
 "Wat is de aansprakelijkheidsgrens?", T2S, NA, "NA RELEASE"),
("/kantoorverhuizing/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "een projectgesprek inplannen", "neem contact op",
 "Met wie bespreek ik dit?", T2S, NA, "NA RELEASE"),

("/internationale-verhuizing/", "#voorwaarden (nieuw)", "/algemene-voorwaarden/", "#avvvbe", "de voorwaarden buiten Europa", "AVVV-BE 2025",
 "Welke voorwaarden gelden over de grens?", T2S, NA, "NA RELEASE"),
("/internationale-verhuizing/", "#dekking (nieuw)", "/verzekering/", "#bedragen", "de dekking buiten Nederland", "tot welk bedrag u gedekt bent",
 "Ben ik in het buitenland net zo gedekt?", T2S, NA, "NA RELEASE"),
("/internationale-verhuizing/", "#volume (nieuw)", "/m3-calculator/", "#m3-intro-kop", "schat uw volume", "de m3-calculator",
 "Hoeveel gaat er mee?", T2S, NA, "NA RELEASE"),
("/internationale-verhuizing/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "uw bestemming doorgeven", "neem contact op",
 "Doen jullie mijn bestemming?", T2S, NA, "NA RELEASE"),

("/inboedelopslag/", "#voorwaarden (nieuw)", "/algemene-voorwaarden/", "#avbv", "de bewaarnemingsvoorwaarden", "AVBV 2025",
 "Onder welke voorwaarden staat het er?", T2S, NA, "NA RELEASE"),
("/inboedelopslag/", "#dekking (nieuw)", "/verzekering/", "#opslag-zakelijk", "hoe uw inboedel tijdens opslag gedekt is", "de opslagdekking",
 "Is het verzekerd zolang het staat?", T2S, NA, "NA RELEASE"),
("/inboedelopslag/", "#capaciteit (nieuw)", "/m3-calculator/", "#m3-intro-kop", "schat uw volume", "de m3-calculator",
 "Hoeveel ruimte heb ik nodig?", T2S, NA, "NA RELEASE"),
("/inboedelopslag/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "uw periode doorgeven", "neem contact op",
 "Hoe regel ik dit?", T2S, NA, "NA RELEASE"),

("/inpakservice/", "#zelf-doen (nieuw)", "/inpaktips/", "#inpak-start", "zelf inpakken zonder schade", "onze inpaktips",
 "Wat als ik een deel zelf doe?", T2S, NA, "NA RELEASE"),
("/inpakservice/", "#materiaal (nieuw)", "/dozencalculator/", "#calc", "hoeveel dozen er nodig zijn", "de dozencalculator",
 "Hoeveel dozen worden dat?", T2S, NA, "NA RELEASE"),
("/inpakservice/", "#planning (nieuw)", "/verhuischecklist/", "#checklist", "wanneer het inpakken moet beginnen", "de verhuischecklist",
 "Wanneer komen jullie inpakken?", T2S, NA, "NA RELEASE"),
("/inpakservice/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "uw wensen doorgeven", "neem contact op",
 "Hoe vraag ik dit aan?", T2S, NA, "NA RELEASE"),

("/montage-demontage/", "#voorwaarden (nieuw)", "/algemene-voorwaarden/", "#avhd", "de handymanvoorwaarden AVHD 2025", "de montagevoorwaarden",
 "Onder welke voorwaarden valt dit werk?", T2S, NA, "NA RELEASE"),
("/montage-demontage/", "#proces (nieuw)", "/werkwijze/", "#verhuisdag", "hoe de verhuisdag verloopt", "onze werkwijze",
 "Wanneer op de dag gebeurt dit?", T2S, NA, "NA RELEASE"),
("/montage-demontage/", "#grenzen (nieuw)", "/verzekering/", "#uitsluiting", "waar de dekking stopt", "de uitsluitingen",
 "Wie is aansprakelijk als het misgaat?", T2S, NA, "NA RELEASE"),
("/montage-demontage/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "uw meubels doorgeven", "neem contact op",
 "Hoe geef ik door wat er uit elkaar moet?", T2S, NA, "NA RELEASE"),

("/seniorenverhuizing/", "#proces (nieuw)", "/werkwijze/", "#opname", "wat er bij de opname gebeurt", "onze werkwijze",
 "Hoe gaat dat kennismakingsgesprek?", T2S, NA, "NA RELEASE"),
("/seniorenverhuizing/", "#ervaringen (nieuw)", "/klantervaringen/", "#kev-reviews-kop", "wat andere klanten schreven", "de beoordelingen",
 "Hebben jullie dit vaker gedaan?", T2S, NA, "NA RELEASE"),
("/seniorenverhuizing/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "even samen bellen", "neem contact op",
 "Kan ik hier iemand over spreken?", T2S, NA, "NA RELEASE"),

("/spoedverhuizing/", "#proces (nieuw)", "/werkwijze/", "#zo-werkt-het", "hoe het normaal verloopt", "onze werkwijze",
 "Wat sla ik over bij spoed?", T2S, NA, "NA RELEASE"),
("/spoedverhuizing/", "#dekking (nieuw)", "/verzekering/", "#basis", "waarvoor u verzekerd bent", "wat er gedekt is",
 "Blijft het verzekerd als het snel moet?", T2S, NA, "NA RELEASE"),
("/spoedverhuizing/", "#vervolg (nieuw)", "/contact/", "#contact-adres", "bel ons direct", "onze bereikbaarheid",
 "Wanneer kan ik bellen?", T2S, NA, "NA RELEASE"),

("/zorgverhuizing/", "#proces (nieuw)", "/werkwijze/", "#aanspreekpunt", "een verhuizing, een aanspreekpunt", "onze werkwijze",
 "Met wie hebben onze mensen te maken?", T2S, NA, "NA RELEASE"),
("/zorgverhuizing/", "#organisatie (nieuw)", "/over-ons/", "#wie-wij-zijn", "wie deze verhuizingen doet", "over De Kievit",
 "Aan wie vertrouwen wij dit toe?", T2S, NA, "NA RELEASE"),
("/zorgverhuizing/", "#ervaringen (nieuw)", "/klantervaringen/", "#kev-vaak-kop", "wat klanten hierover schrijven", "de beoordelingen",
 "Hebben jullie hier ervaring mee?", T2S, NA, "NA RELEASE"),
("/zorgverhuizing/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "een gesprek inplannen", "neem contact op",
 "Hoe zetten wij dit in gang?", T2S, NA, "NA RELEASE"),

("/piano-verhuizen/", "#proces (nieuw)", "/werkwijze/", "#opname", "wat wij bij de opname bekijken", "onze werkwijze",
 "Hoe bepalen jullie of het kan?", T2S, NA, "NA RELEASE"),
("/piano-verhuizen/", "#dekking (nieuw)", "/verzekering/", "#bedragen", "tot welk bedrag uw instrument gedekt is", "wat er gedekt is",
 "Wat als mijn vleugel beschadigd raakt?", T2S, NA, "NA RELEASE"),
("/piano-verhuizen/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "uw instrument doorgeven", "neem contact op",
 "Hoe vraag ik een prijs op?", T2S, NA, "NA RELEASE"),

("/antiek-en-kunst-verhuizen/", "#verpakking (nieuw)", "/inpaktips/", "#inpak-breekbaar", "hoe wij breekbaar verpakken", "onze inpaktips",
 "Hoe wordt het ingepakt?", T2S, NA, "NA RELEASE"),
("/antiek-en-kunst-verhuizen/", "#dekking (nieuw)", "/verzekering/", "#uitsluiting", "wat er voor kunst en verzamelingen geldt", "de uitsluitingen",
 "Is mijn collectie wel gedekt?", T2S, NA, "NA RELEASE"),
("/antiek-en-kunst-verhuizen/", "#vervolg (nieuw)", "/contact/", "#contact-intro", "uw objectlijst doorgeven", "neem contact op",
 "Hoe laat ik dit taxeren?", T2S, NA, "NA RELEASE"),
]


def ids_van(route):
    """Alle id-waarden in de gebouwde pagina van deze route; None als de pagina niet bestaat."""
    p = SITE / route.strip("/") / "index.html" if route != "/" else SITE / "index.html"
    if not p.exists():
        return None
    return set(re.findall(r'\sid="([^"]+)"', p.read_text(encoding="utf-8")))


def main():
    cache = {}
    rijen, fouten = [], []
    for r in R:
        bronroute, blok, doel, frag, a1, a2, reden, eig, ixv, act = r
        for route in (bronroute, doel):
            if route not in cache:
                cache[route] = ids_van(route)

        qa = []
        if cache[doel] is None:
            qa.append("DOELROUTE BESTAAT NIET")
        elif frag == "GEEN BESTEMMING":
            qa.append("GEEN GELDIGE BESTEMMING, regel is bewust geblokkeerd")
        elif frag and frag.lstrip("#") not in cache[doel]:
            qa.append(f"FRAGMENT {frag} ONTBREEKT op {doel}")
        else:
            qa.append("fragment geverifieerd tegen gebouwde HTML")

        if "(nieuw)" in blok or blok == "(voor eerste id)":
            qa.append("bronblok wordt in deze fase geschreven, niet gecontroleerd")
        elif cache[bronroute] is None:
            qa.append(f"BRONROUTE {bronroute} BESTAAT NIET")
        elif blok.lstrip("#") not in cache[bronroute]:
            qa.append(f"BRONBLOK {blok} ONTBREEKT op {bronroute}")

        qa.append("T4 OPEN")
        regel = list(r) + ["; ".join(qa)]
        rijen.append(regel)
        # Alles wat als hoofdletterwoord in qa staat is een harde fout. Niet op x.isupper()
        # testen: die is False zodra er ook kleine letters in de melding staan, en dan meldt
        # dit script nul fouten terwijl de CSV ze wel toont (gevonden bij de ijking hieronder).
        stuk = [x for x in qa if "ONTBREEKT" in x or "BESTAAT NIET" in x]
        if stuk:
            fouten.append(f"{bronroute} {blok} -> {doel}{frag}: {'; '.join(stuk)}")

    with UIT.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(KOP)
        w.writerows(rijen)

    ok = sum(1 for r in rijen if r[-1].startswith("fragment geverifieerd"))
    geblok = sum(1 for r in rijen if "GEEN GELDIGE BESTEMMING" in r[-1])
    print(f"{len(rijen)} regels geschreven naar {UIT}")
    print(f"  {ok} met geverifieerd doelfragment of geverifieerde doelroute")
    print(f"  {geblok} bewust geblokkeerd (geen geldige bestemming)")
    print(f"  {len(fouten)} met een ontbrekend fragment of blok")
    for f_ in fouten:
        print("   FOUT:", f_)
    return 1 if fouten else 0


if __name__ == "__main__":
    sys.exit(main())
