"""Eigen tekst voor /antiek-en-kunst-verhuizen/ op de BESTAANDE blokken. Ontwerp blijft ongemoeid.

Pas alleen de TWEEDE string van elk paar aan. Laat je een paar ongewijzigd, dan gebeurt er
niets; je mag zo'n paar ook weghalen. Voeg geen tags toe die een blok maken (section, div,
ul, li, p, h2, h3): build_paginas.py vergelijkt het blokskelet en faalt dan. Inline <a>,
<strong> en <em> mogen wel.

Bronmateriaal met de al geschreven tekst: _werk/paginas/teksten-bewaard/antiek-en-kunst-verhuizen.html
Herbouwen: python3 _werk/build_paginas.py
"""

BESCHRIJVING = 'Antiek en kunst verhuizen in Venlo en omgeving. Geef de waarde vooraf op, dan staat vast op welke grondslag er bij schade wordt uitgekeerd.'

VERVANG = [
    # --- Uw offerte, gratis en vrijblijvend ---
    # <span>, 64 tekens
    ('<b>9,4 op Klantenvertellen</b>779 beoordelingen, 99% beveelt aan',
     '<b>9,4 op Klantenvertellen</b>779 beoordelingen, 99% beveelt aan'),
    # <span>, 70 tekens
    ('<b>Erkende Verhuizer</b>met Garantiecertificaat en verzekerde inboedel',
     '<b>Erkende Verhuizer</b>met Garantiecertificaat en verzekerde inboedel'),
    # <span>, 63 tekens
    ('<b>Sinds 1910 in Venlo</b>meer dan honderd jaar verhuiservaring',
     '<b>Sinds 1910 in Venlo</b>meer dan honderd jaar verhuiservaring'),
    # <span>, 71 tekens
    ('<b>Lid van Top Movers</b>landelijk netwerk van erkende verhuisbedrijven',
     '<b>Lid van Top Movers</b>landelijk netwerk van erkende verhuisbedrijven'),
    # <p class=label>, 16 tekens
    ('Waarom De Kievit',
     'Antiek en kunst'),
    # <h2 class=kop>, 30 tekens
    ('Verhuizen zonder verhuisstress',
     'Wat kostbaar is, gaat apart'),

    # --- Verhuizen zonder verhuisstress ---
    # <p class=intro>, 426 tekens
    ('Met De Kievit weet u vooraf waar u aan toe bent: wij komen langs, spreken alles met u door en leggen het vast in een offerte, zodat er op de dag zelf niets meer uitgezocht hoeft te worden. Als Erkende Verhuizer werken wij volgens de branchevoorwaarden van de Organisatie voor Erkende Verhuizers, met een Garantiecertificaat en een verzekering van uw inboedel. U houdt van de opname tot de laatste doos hetzelfde aanspreekpunt.',
     'Antiek en kunstvoorwerpen vallen in de voorwaarden onder een eigen categorie: kostbare verhuisgoederen. Dat verandert hoe de waarde wordt vastgesteld en wat u vooraf moet regelen. Wij pakken zulke stukken apart in, geven ze een eigen plek in de wagen en leggen vast in welke staat ze vertrekken. Meld voordat de opdracht rond is welke voorwerpen kostbaar zijn: aan de buitenkant is dat niet te zien.'),
    # <h3>, 19 tekens
    ('Opgeleid eigen team',
     'Eigen, opgeleid team'),
    # <p>, 279 tekens
    ('Ons verhuisteam is in dienst en opgeleid. Van het team dat bij u inpakt, ophaalt en aflevert heeft minstens de helft een erkend verhuisdiploma; dat is de norm van Erkende Verhuizers waar wij aan gebonden zijn. Wij zijn daarnaast erkend leerbedrijf. Geen wisselende invalkrachten.',
     'Ons verhuisteam is in dienst en opgeleid. Van het team dat bij u inpakt, ophaalt en aflevert heeft minstens de helft een erkend verhuisdiploma; dat is de norm van Erkende Verhuizers waar wij aan gebonden zijn. Bij een kostbaar stuk spreken wij vooraf af wie tilt en waar wordt vastgepakt.'),
    # <h3>, 18 tekens
    ('Alles volgens plan',
     'Vastgelegd voor vertrek'),
    # <p>, 192 tekens
    ('Voor de verhuizing komen wij bij u langs en maken wij samen een plan, zodat u op de dag zelf nergens aan hoeft te denken. U weet vooraf hoe laat wij er zijn en wanneer alles op uw adres staat.',
     'Van elk stuk dat als kostbaar wordt aangemerkt leggen wij de staat vast voordat het wordt ingepakt: bestaande krassen, loszittende delen, eerdere restauraties, een scheve poot. Achteraf is dat niet te bewijzen.'),
    # <h3>, 25 tekens
    ('Verzekerd en gegarandeerd',
     'Marktwaarde, geen nieuwwaarde'),
    # <p>, 225 tekens
    ('Uw inboedel is tijdens een verhuizing binnen Nederland verzekerd tot ten minste 100.000 euro op nieuwwaarde, en het Garantiecertificaat van Erkende Verhuizers beschermt uw aanbetaling en garandeert dat de verhuizing doorgaat.',
     'Voor de rest van de inboedel geldt nieuwwaarde, tenzij de dagwaarde minder is dan 40 procent daarvan. Bij kostbare verhuisgoederen geldt een uitkering op basis van marktwaarde, want van een oude kast bestaat geen nieuw exemplaar.'),
    # <p>, 210 tekens
    ('Klanten geven De Kievit op Klantenvertellen een 9,4 uit 779 beoordelingen en 99 procent beveelt ons aan. Die beoordelingen staan met naam, woonplaats en datum op <a href="/klantervaringen/">klantervaringen</a>.',
     'Klanten geven De Kievit op Klantenvertellen een 9,4 uit 779 beoordelingen en 99 procent beveelt ons aan. Die beoordelingen staan met naam, woonplaats en datum op <a href="/klantervaringen/">klantervaringen</a>.'),
    # <p class=label>, 15 tekens
    ('Het verhuisteam',
     'Waar ons werk ophoudt'),
    # <h2 class=kop>, 54 tekens
    ('Vakmensen met een verhuisdiploma en verstand van zaken',
     'Verhuizers, geen restauratoren en geen taxateurs'),

    # --- Vakmensen met een verhuisdiploma en verstand van zaken ---
    # <p class=intro>, 437 tekens
    ('De Kievit stelt hoge eisen aan haar medewerkers en materieel. Uw verhuizing wordt uitgevoerd door goed opgeleide vakmensen: gediplomeerde inboedelverhuizers die uw inboedel inpakken, uw meubels demonteren en monteren en alles veilig op de plaats van bestemming brengen. Sinds 1 juni 2024 maakt De Kievit deel uit van De Bresser Verhuizingen; het hele team uit Venlo ging daarbij mee, dus u ziet dezelfde vertrouwde gezichten aan de deur.',
     'De Kievit stelt hoge eisen aan haar medewerkers en materieel, maar wij stellen geen waarde vast, wij herstellen niets en wij geven geen oordeel over echtheid of herkomst. Voor taxatie verwijzen wij u naar een taxateur, voor conservering naar een restaurator. Wat wij doen is het stuk verplaatsen op een manier die past bij wat het is. Sinds 1 juni 2024 maakt De Kievit deel uit van De Bresser Verhuizingen; het hele team uit Venlo ging daarbij mee.'),
    # <span>, 46 tekens
    ('lid van de Organisatie voor Erkende Verhuizers',
     'lid van de Organisatie voor Erkende Verhuizers'),
    # <span>, 41 tekens
    ('SBB-leerbedrijf voor chauffeur wegvervoer',
     'SBB-leerbedrijf voor chauffeur wegvervoer'),
    # <h2 class=kop>, 40 tekens
    ('Even geen plek? Wij slaan uw inboedel op',
     'Moet een stuk tijdelijk de opslag in?'),

    # --- Even geen plek? Wij slaan uw inboedel op ---
    # <p class=intro>, 172 tekens
    ('Tijdelijk of voor langere tijd: uw inboedel staat bij De Kievit in houten opslagkisten of een eigen container. Op de afgesproken dag brengen wij alles naar uw nieuwe adres.',
     'Oud hout reageert op wisselende temperatuur. Uw inboedel staat bij De Kievit in houten opslagkisten of een eigen container, in een verwarmd pand dat beveiligd is tegen brand en inbraak.'),
    # <span class=eyebrow>, 26 tekens
    ('Wij zijn Erkende Verhuizer',
     'Wij zijn Erkende Verhuizer'),
    # <h2>, 42 tekens
    ('Acht zekerheden die u er gratis bij krijgt',
     'Acht zekerheden die u er gratis bij krijgt'),

    # --- Acht zekerheden die u er gratis bij krijgt ---
    # <p>, 249 tekens
    ('Erkende Verhuizers is de brancheorganisatie van de Nederlandse verhuisbranche. Het keurmerk mag alleen worden gevoerd door bedrijven die aan de eisen voldoen, en De Kievit Verhuizingen staat in het ledenregister. Wat dat u oplevert, staat hieronder.',
     'Erkende Verhuizers is de brancheorganisatie van de Nederlandse verhuisbranche. Het keurmerk mag alleen worden gevoerd door bedrijven die aan de eisen voldoen, en De Kievit Verhuizingen staat in het ledenregister. Wat dat u oplevert, staat hieronder.'),
    # <li>, 227 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>In het register van Erkende Verhuizers</b>Met een eigen vermelding in het ledenregister van de Organisatie voor Erkende Verhuizers.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>In het register van Erkende Verhuizers</b>Met een eigen vermelding in het ledenregister van de Organisatie voor Erkende Verhuizers.</span>'),
    # <li>, 216 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Garantiecertificaat bij elke verhuizing</b>Verplicht bij elke particuliere verhuizing, en tegelijk uw verzekeringspolis.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Garantiecertificaat bij elke verhuizing</b>Verplicht bij elke particuliere verhuizing, en tegelijk uw verzekeringspolis.</span>'),
    # <li>, 192 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Verzekerd tot 100.000 euro</b>Uw verhuisgoederen zijn binnen Nederland verzekerd op nieuwwaarde.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Verzekerd tot 100.000 euro</b>Uw verhuisgoederen zijn binnen Nederland verzekerd op nieuwwaarde.</span>'),
    # <li>, 211 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Veilige aanbetaling</b>Tot 25 procent, met een maximum van 1.000 euro binnen Nederland en 2.000 euro binnen Europa.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Veilige aanbetaling</b>Tot 25 procent, met een maximum van 1.000 euro binnen Nederland en 2.000 euro binnen Europa.</span>'),
    # <li>, 199 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Uw verhuizing gaat door</b>Bij een faillissement neemt een andere Erkende Verhuizer de verhuizing over.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Uw verhuizing gaat door</b>Bij een faillissement neemt een andere Erkende Verhuizer de verhuizing over.</span>'),
    # <li>, 226 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Opslag meeverzekerd</b>Bij een verhuizing binnen Nederland is opslag de eerste twaalf maanden verzekerd als tijdens de verhuizing.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Opslag meeverzekerd</b>Bij een verhuizing binnen Nederland is opslag de eerste twaalf maanden verzekerd als tijdens de verhuizing.</span>'),
    # <li>, 225 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Onafhankelijke geschillencommissie</b>De Geschillencommissie Verhuizen, met nakomingsgarantie tot 10.000 euro per bindend advies.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Onafhankelijke geschillencommissie</b>De Geschillencommissie Verhuizen, met nakomingsgarantie tot 10.000 euro per bindend advies.</span>'),
    # <li>, 223 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Ook net over de grens</b>Verhuizingen naar Nedersaksen en Noordrijn-Westfalen vallen onder het Nederlandse Garantiecertificaat.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Ook net over de grens</b>Verhuizingen naar Nedersaksen en Noordrijn-Westfalen vallen onder het Nederlandse Garantiecertificaat.</span>'),
    # <p class=zeker__bron>, 127 tekens
    ('Volgens de Algemene Voorwaarden Verhuizingen (AVVV 2025) en het Garantiecertificaat van de Organisatie voor Erkende Verhuizers.',
     'Volgens de Algemene Voorwaarden Verhuizingen (AVVV 2025) en het Garantiecertificaat van de Organisatie voor Erkende Verhuizers.'),
    # <p class=label>, 12 tekens
    ('Zo werkt het',
     'Stap voor stap'),
    # <h2 class=kop>, 25 tekens
    ('Zo verloopt uw verhuizing',
     'Zo gaat een kostbaar stuk mee'),

    # --- Zo verloopt uw verhuizing ---
    # <p class=intro>, 223 tekens
    ('Vier stappen, en bij elke stap weet u waar u aan toe bent. Van het eerste telefoontje tot het moment dat de laatste doos binnen staat houdt u hetzelfde aanspreekpunt in Venlo, zodat u nooit opnieuw uw verhaal hoeft te doen.',
     'Vier stappen, en bij elke stap weet u waar u aan toe bent. Bij antiek en kunst valt het meeste werk voor de verhuisdag: wat apart gaat, hoe het verpakt wordt en wat er is vastgelegd, ligt vast voordat er iemand tilt.'),
    # <h3>, 15 tekens
    ('Neem contact op',
     'Meld wat kostbaar is'),
    # <p>, 227 tekens
    ('Bel 077 - 32 32 100 of vraag online een offerte aan. Vertel kort waar u vandaan komt, waar u naartoe gaat en wanneer u wilt verhuizen. Wij kijken meteen of die datum nog vrij is en wat er nodig is aan mensen, materiaal en tijd.',
     'Bel 077 - 32 32 100 of vraag online een offerte aan. Noem welke voorwerpen kostbaar zijn en wat ze waard zijn. Een houten kist van tweehonderd euro en een van twintigduizend euro zien er in een gang hetzelfde uit.'),
    # <h3>, 15 tekens
    ('Opname aan huis',
     'Opname en vastlegging'),
    # <p>, 244 tekens
    ('Onze verhuisadviseur komt bij u langs en maakt een plan: welke meubels uit elkaar moeten, wat er ingepakt wordt en waar de wagen kan staan. U ontvangt daarna een gratis en vrijblijvende offerte waarin precies staat wat wij doen en wat het kost.',
     'Wij bekijken de stukken, spreken af welke apart gaan en leggen de staat vast waarin ze vertrekken. Fotografeer ze zelf ook van meerdere kanten, met detailopnames van wat er al aan mankeert; dat is het beste dossier dat u kunt hebben.'),
    # <h3>, 21 tekens
    ('Inpakken en verhuizen',
     'Inpakken en laden'),
    # <p>, 254 tekens
    ('Op de verhuisdag pakt het team in, demonteert wat nodig is en brengt alles veilig naar uw nieuwe adres. Kwetsbare stukken gaan in verhuisdekens de wagen in en de dozen komen per kamer bij elkaar te staan, zodat u op het nieuwe adres niet hoeft te zoeken.',
     'Kroonlijsten, glasplaten en marmeren bladen gaan eraf als dat kan zonder de constructie aan te tasten, apart verpakt en genummerd. Een schilderij staat rechtop tegen een schot en gaat nooit plat onderop; kostbare stukken worden vastgezet met niets ertegenaan.'),
    # <h3>, 25 tekens
    ('Thuis in uw nieuwe woning',
     'Uitpakken, maar niet meteen'),
    # <p>, 170 tekens
    ('Meubels gemonteerd, wasmachine aangesloten, dozen op hun plek. U betaalt pas na de verhuizing, per bank op factuur, en de lege verhuisdozen halen wij later weer bij u op.',
     'Laat een ingepakt schilderij of een houten object eerst op temperatuur komen voordat de verpakking eraf gaat. Dat spreken wij vooraf af. U betaalt pas na de verhuizing, per bank.'),
    # <p class=label>, 23 tekens
    ('Particulier en zakelijk',
     'Voor huis en galerie'),
    # <h2 class=kop>, 51 tekens
    ('E&eacute;n verhuisbedrijf voor alles wat u verhuist',
     'Een enkel stuk, een verzameling of de hele inboedel'),

    # --- E&eacute;n verhuisbedrijf voor alles wat u verhuist ---
    # <p class=intro>, 301 tekens
    ('Bij De Kievit kunt u terecht voor uw particuliere verhuizing, een bedrijfs- of projectverhuizing, inboedelopslag en een verhuizing naar het buitenland. U krijgt dezelfde planner, hetzelfde team en dezelfde voorwaarden, of u nu een appartement in Blerick verhuist of een kantoor met dertig werkplekken.',
     'Wij verhuizen een los stuk, een hele verzameling en de inboedel eromheen, met opslag ertussen of een rit over de grens als dat nodig is. Hoort de collectie bij uw onderneming, dan is het een bedrijfsverhuizing: dan gelden de <a href="/algemene-voorwaarden/#avb">Algemene Voorwaarden Bedrijfsverhuizingen</a> en niet de particuliere voorwaarden, en geldt het Garantiecertificaat niet.'),
    # <span>, 20 tekens
    ('van studio tot villa',
     'van studio tot villa'),
    # <span>, 26 tekens
    ('kantoor, zorg en onderwijs',
     'kantoor, zorg en onderwijs'),
    # <span>, 26 tekens
    ('opslagkisten en containers',
     'opslagkisten en containers'),
    # <span>, 34 tekens
    ('Duitsland, Belgi&euml; en Engeland',
     'Duitsland, Belgi&euml; en Engeland'),
    # <h2 class=kop>, 51 tekens
    ('Verhuizen in Venlo en heel Noord- en Midden-Limburg',
     'Verhuizen in Venlo en heel Noord- en Midden-Limburg'),

    # --- Verhuizen in Venlo en heel Noord- en Midden-Limburg ---
    # <p class=intro>, 287 tekens
    ('Vanuit Venlo verhuizen wij in de hele regio: van Venray en Horst tot Tegelen, Reuver en Roermond, en over de grens in Duitsland en Belgi&euml;. Als lid van Top Movers regelen wij ook verhuizingen naar de rest van Nederland, samen met collega-leden die net als wij Erkende Verhuizer zijn.',
     'Vanuit Venlo rijden wij in de hele regio: van Venray en Horst tot Tegelen, Reuver en Roermond, en over de grens in Duitsland en Belgi&euml;. Gaat een stuk naar een veilinghuis of een museum, vraag dan de aanlevertijden op voordat u een datum met ons afspreekt.'),
    # <li>, 55 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Venlo',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Venlo'),
    # <li>, 57 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Blerick',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Blerick'),
    # <li>, 57 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Tegelen',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Tegelen'),
    # <li>, 57 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Belfeld',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Belfeld'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Reuver',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Reuver'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Velden',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Velden'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Venray',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Venray'),
    # <li>, 55 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Horst',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Horst'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Lottum',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Lottum'),
    # <li>, 58 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Maasbree',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Maasbree'),
    # <li>, 56 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Baarlo',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Baarlo'),
    # <li>, 59 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Panningen',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Panningen'),
    # <li>, 58 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Roermond',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Roermond'),
    # <li>, 54 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Echt',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Echt'),
    # <li>, 60 tekens
    ('<svg aria-hidden="true"><use href="#i-pin"/></svg>Nederweert',
     '<svg aria-hidden="true"><use href="#i-pin"/></svg>Nederweert'),
    # <p>, 194 tekens
    ('Verhuist u naar Duitsland? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen, geldt het Nederlandse Garantiecertificaat van Erkende Verhuizers, net als bij een verhuizing binnen Nederland.',
     'Verhuist u naar Duitsland? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen, geldt het Nederlandse Garantiecertificaat van Erkende Verhuizers, net als bij een verhuizing binnen Nederland.'),
    # <h2 class=kop>, 16 tekens
    ('Goed om te weten',
     'Voordat u iets inpakt'),

    # --- Goed om te weten ---
    # <p class=faq__door>, 253 tekens
    ('De vragen die het vaakst terugkomen over kosten, verhuisdozen,\n      opslag, verzekering en planning staan bij elkaar op\n      <a href="/veelgestelde-vragen/">veelgestelde vragen</a>. Staat uw vraag er niet bij, bel dan\n      077 - 32 32 100 of app ons.',
     'Wat u zelf al hebt ingepakt kunnen wij niet beoordelen: zit een stuk al in een kist,\n      dan weten wij niet hoe het erin zit. Wat er gedekt is staat op\n      <a href="/verzekering/">verzekering</a>, de rest bij de\n      <a href="/veelgestelde-vragen/">veelgestelde vragen</a>.'),
    # <span class=eyebrow>, 20 tekens
    ('Vraag uw offerte aan',
     'Laat ons eerst kijken'),
    # <h2>, 32 tekens
    ('Klaar om zorgeloos te verhuizen?',
     'Wat staat er, en wat is het waard?'),

    # --- Klaar om zorgeloos te verhuizen? ---
    # <p class=lead-p>, 145 tekens
    ('Vul uw gegevens in, dan ontvangt u een gratis en vrijblijvende offerte. Hoe meer u kwijt kunt over uw woning en inboedel, hoe preciezer de prijs.',
     'Vul uw gegevens in, dan ontvangt u een gratis en vrijblijvende offerte. Noem welke stukken kostbaar zijn, dan weet u vooraf wat ervoor geldt.'),
    # <span class=lead-google__stars>, 35 tekens
    ('&#9733;&#9733;&#9733;&#9733;&#9733;',
     '&#9733;&#9733;&#9733;&#9733;&#9733;'),
    # <span class=lead-google__cnt>, 41 tekens
    ('uit 779 beoordelingen op Klantenvertellen',
     'uit 779 beoordelingen op Klantenvertellen'),
    # <span>, 16 tekens
    ('Weet ik nog niet',
     'Weet ik nog niet'),
    # <span>, 37 tekens
    ('Hoe heeft u ons gevonden? (optioneel)',
     'Hoe heeft u ons gevonden? (optioneel)'),
    # <span class=lfcalc__titel>, 43 tekens
    ('Ik weet nog niet hoeveel dozen ik nodig heb',
     'Ik weet nog niet hoeveel dozen ik nodig heb'),
    # <span>, 13 tekens
    ('Woonoppervlak',
     'Woonoppervlak'),
    # <span>, 15 tekens
    ('Hoeveel spullen',
     'Hoeveel spullen'),
    # <span>, 21 tekens
    ('Zolder of berging vol',
     'Zolder of berging vol'),
    # <span>, 12 tekens
    ('Hobbyspullen',
     'Hobbyspullen'),
    # <p>, 46 tekens
    ('Er ontbreekt nog iets. Controleer deze velden:',
     'Er ontbreekt nog iets. Controleer deze velden:'),

    # --- opslagblok: bovenkop en knop per pagina (verzoek Shahab 30-aug). Kop en intro
    # stonden al paginaspecifiek; deze twee waren nog op alle elf gelijk.
    ('<p class="label">Inboedelopslag</p>',
     '<p class="label">Opslag per stuk</p>'),
    ('>Vraag opslag aan<',
     '>Opslag voor uw stukken<'),

    # --- werkgebied volledig op het onderwerp van de pagina (Shahab 30-aug):
    # bovenkop, kop, slotalinea en knop. De plaatschips blijven overal gelijk, dat is
    # het werkgebied zelf. De grensstreekclaim (C13) blijft woordelijk staan.
    ('<p class="label">Werkgebied</p>',
     '<p class="label">Waar wij stukken halen</p>'),
    ('>App ons uw adressen<',
     '>App ons om welk stuk<'),
    ('Verhuizen in Venlo en heel Noord- en Midden-Limburg',
     'Kostbare stukken verhuizen in Venlo en de hele regio'),
    ('Verhuist u naar Duitsland? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen, geldt het Nederlandse Garantiecertificaat van Erkende Verhuizers, net als bij een verhuizing binnen Nederland.',
     'Gaat een stuk naar Duitsland? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen geldt het Nederlandse Garantiecertificaat van Erkende Verhuizers, net als bij een verhuizing binnen Nederland.'),
]
