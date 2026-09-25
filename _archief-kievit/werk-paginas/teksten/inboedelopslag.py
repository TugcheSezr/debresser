"""Eigen tekst voor /inboedelopslag/ op de BESTAANDE blokken. Ontwerp blijft ongemoeid.

Pas alleen de TWEEDE string van elk paar aan. Laat je een paar ongewijzigd, dan gebeurt er
niets; je mag zo'n paar ook weghalen. Voeg geen tags toe die een blok maken (section, div,
ul, li, p, h2, h3): build_paginas.py vergelijkt het blokskelet en faalt dan. Inline <a>,
<strong> en <em> mogen wel.

Bronmateriaal met de al geschreven tekst: _werk/paginas/teksten-bewaard/inboedelopslag.html
Herbouwen: python3 _werk/build_paginas.py
"""

BESCHRIJVING = 'Inboedelopslag in Venlo: houten opslagkisten of een eigen container in een verwarmd pand, beveiligd tegen brand en inbraak. Opzegtermijn een maand.'

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
     'Opslag bij De Kievit'),
    # <h2 class=kop>, 30 tekens
    ('Verhuizen zonder verhuisstress',
     'Uw inboedel staat stil, uw afspraken niet'),

    # --- Verhuizen zonder verhuisstress ---
    # <p class=intro>, 426 tekens
    ('Met De Kievit weet u vooraf waar u aan toe bent: wij komen langs, spreken alles met u door en leggen het vast in een offerte, zodat er op de dag zelf niets meer uitgezocht hoeft te worden. Als Erkende Verhuizer werken wij volgens de branchevoorwaarden van de Organisatie voor Erkende Verhuizers, met een Garantiecertificaat en een verzekering van uw inboedel. U houdt van de opname tot de laatste doos hetzelfde aanspreekpunt.',
     'Opslag is juridisch iets anders dan verhuizen. Er geldt een eigen set voorwaarden, er wordt een inventarislijst opgemaakt die u en wij allebei tekenen, en de verzekering loopt niet vanzelf door zolang uw spullen bij ons staan. Wij zetten daarom vooraf op papier hoe lang u gedekt bent, wat er niet de opslag in mag en hoe u uw inboedel weer ophaalt. U houdt van de inslag tot de teruggave hetzelfde aanspreekpunt in Venlo.'),
    # <h3>, 19 tekens
    ('Opgeleid eigen team',
     'Eigen mensen, eigen pand'),
    # <p>, 279 tekens
    ('Ons verhuisteam is in dienst en opgeleid. Van het team dat bij u inpakt, ophaalt en aflevert heeft minstens de helft een erkend verhuisdiploma; dat is de norm van Erkende Verhuizers waar wij aan gebonden zijn. Wij zijn daarnaast erkend leerbedrijf. Geen wisselende invalkrachten.',
     'Het in- en uitslaan doet ons eigen verhuisteam, in dienst en opgeleid. Van het team dat bij u ophaalt, wegzet en terugbrengt heeft minstens de helft een erkend verhuisdiploma; dat is de norm van Erkende Verhuizers waar wij aan gebonden zijn. Geen wisselende invalkrachten aan uw kisten.'),
    # <h3>, 18 tekens
    ('Alles volgens plan',
     'Alles op de lijst'),
    # <p>, 192 tekens
    ('Voor de verhuizing komen wij bij u langs en maken wij samen een plan, zodat u op de dag zelf nergens aan hoeft te denken. U weet vooraf hoe laat wij er zijn en wanneer alles op uw adres staat.',
     'Bij elke bewaarneming wordt een inventarislijst opgemaakt die u en wij ondertekenen. Daarop staat wat er in bewaring gaat en welke gebreken op dat moment al zichtbaar zijn. Bij discussie is dat het vertrekpunt.'),
    # <h3>, 25 tekens
    ('Verzekerd en gegarandeerd',
     'Twaalf maanden, en daarna'),
    # <p>, 225 tekens
    ('Uw inboedel is tijdens een verhuizing binnen Nederland verzekerd tot ten minste 100.000 euro op nieuwwaarde, en het Garantiecertificaat van Erkende Verhuizers beschermt uw aanbetaling en garandeert dat de verhuizing doorgaat.',
     'Gaat de opslag mee als onderdeel van een verhuizing binnen Nederland, dan bent u de eerste twaalf maanden verzekerd op dezelfde voorwaarden als tijdens de verhuizing. Binnen Europa is dat dertig dagen. Daarna kan het tegen vergoeding, mits vooraf afgesproken.'),
    # <p>, 210 tekens
    ('Klanten geven De Kievit op Klantenvertellen een 9,4 uit 779 beoordelingen en 99 procent beveelt ons aan. Die beoordelingen staan met naam, woonplaats en datum op <a href="/klantervaringen/">klantervaringen</a>.',
     'Klanten geven De Kievit op Klantenvertellen een 9,4 uit 779 beoordelingen en 99 procent beveelt ons aan. Die beoordelingen staan met naam, woonplaats en datum op <a href="/klantervaringen/">klantervaringen</a>.'),
    # <p class=label>, 15 tekens
    ('Het verhuisteam',
     'De bewaarplaats'),
    # <h2 class=kop>, 54 tekens
    ('Vakmensen met een verhuisdiploma en verstand van zaken',
     'Houten kisten of een eigen container, in een verwarmd pand'),

    # --- Vakmensen met een verhuisdiploma en verstand van zaken ---
    # <p class=intro>, 437 tekens
    ('De Kievit stelt hoge eisen aan haar medewerkers en materieel. Uw verhuizing wordt uitgevoerd door goed opgeleide vakmensen: gediplomeerde inboedelverhuizers die uw inboedel inpakken, uw meubels demonteren en monteren en alles veilig op de plaats van bestemming brengen. Sinds 1 juni 2024 maakt De Kievit deel uit van De Bresser Verhuizingen; het hele team uit Venlo ging daarbij mee, dus u ziet dezelfde vertrouwde gezichten aan de deur.',
     'De spullen gaan in houten opslagkisten of in een eigen 20 ft- of 25 ft-container, in een verwarmd pand dat beveiligd is tegen brand en inbraak. Wij halen op en zetten weg, of u brengt zelf. Wat u betaalt heet bewaarloon en gaat per afgesproken periode, niet per verhuizing. Wat er tijdens de opslag verzekerd is en hoe lang, staat in de voorwaarden voor bewaarneming; daar doen wij geen eigen belofte overheen.'),
    # <span>, 46 tekens
    ('lid van de Organisatie voor Erkende Verhuizers',
     'lid van de Organisatie voor Erkende Verhuizers'),
    # <span>, 41 tekens
    ('SBB-leerbedrijf voor chauffeur wegvervoer',
     'SBB-leerbedrijf voor chauffeur wegvervoer'),
    # <h2 class=kop>, 40 tekens
    ('Even geen plek? Wij slaan uw inboedel op',
     'Ophalen wanneer u zover bent'),

    # --- Even geen plek? Wij slaan uw inboedel op ---
    # <p class=intro>, 172 tekens
    ('Tijdelijk of voor langere tijd: uw inboedel staat bij De Kievit in houten opslagkisten of een eigen container. Op de afgesproken dag brengen wij alles naar uw nieuwe adres.',
     'U zegt op met een opzegtermijn van een maand. Wij geven de spullen terug op het adres van de bewaarplaats; bezorgen op uw nieuwe adres is een aparte afspraak, geen automatisme.'),
    # <span class=eyebrow>, 26 tekens
    ('Wij zijn Erkende Verhuizer',
     'Wij zijn Erkende Verhuizer'),
    # <h2>, 42 tekens
    ('Acht zekerheden die u er gratis bij krijgt',
     'Acht zekerheden rond de verhuizing zelf'),

    # --- Acht zekerheden die u er gratis bij krijgt ---
    # <p>, 249 tekens
    ('Erkende Verhuizers is de brancheorganisatie van de Nederlandse verhuisbranche. Het keurmerk mag alleen worden gevoerd door bedrijven die aan de eisen voldoen, en De Kievit Verhuizingen staat in het ledenregister. Wat dat u oplevert, staat hieronder.',
     'Erkende Verhuizers is de brancheorganisatie van de Nederlandse verhuisbranche. Het keurmerk mag alleen worden gevoerd door bedrijven die aan de eisen voldoen, en De Kievit Verhuizingen staat in het ledenregister. Deze acht gelden voor de verhuizing; bewaarneming heeft een eigen set.'),
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
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Opslag meeverzekerd</b>Binnen Nederland de eerste twaalf maanden als tijdens de verhuizing, binnen Europa dertig dagen.</span>'),
    # <li>, 225 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Onafhankelijke geschillencommissie</b>De Geschillencommissie Verhuizen, met nakomingsgarantie tot 10.000 euro per bindend advies.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Onafhankelijke geschillencommissie</b>De Geschillencommissie Verhuizen, met nakomingsgarantie tot 10.000 euro per bindend advies.</span>'),
    # <li>, 223 tekens
    ('<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Ook net over de grens</b>Verhuizingen naar Nedersaksen en Noordrijn-Westfalen vallen onder het Nederlandse Garantiecertificaat.</span>',
     '<span class="zeker__ok"><svg aria-hidden="true"><use href="#z-ok"/></svg></span><span><b>Ook net over de grens</b>Verhuizingen naar Nedersaksen en Noordrijn-Westfalen vallen onder het Nederlandse Garantiecertificaat.</span>'),
    # <p class=zeker__bron>, 127 tekens
    ('Volgens de Algemene Voorwaarden Verhuizingen (AVVV 2025) en het Garantiecertificaat van de Organisatie voor Erkende Verhuizers.',
     'Volgens de Algemene Voorwaarden Verhuizingen (<a href="/algemene-voorwaarden/#avvv">AVVV 2025</a>); op de bewaarneming zelf zijn de <a href="/algemene-voorwaarden/#avbv">AVBV 2025</a> van toepassing.'),
    # <p class=label>, 23 tekens
    ('Particulier en zakelijk',
     'Meer dan opslag alleen'),
    # <h2 class=kop>, 51 tekens
    ('E&eacute;n verhuisbedrijf voor alles wat u verhuist',
     'E&eacute;n bedrijf voor de rit en de bewaarperiode'),

    # --- E&eacute;n verhuisbedrijf voor alles wat u verhuist ---
    # <p class=intro>, 301 tekens
    ('Bij De Kievit kunt u terecht voor uw particuliere verhuizing, een bedrijfs- of projectverhuizing, inboedelopslag en een verhuizing naar het buitenland. U krijgt dezelfde planner, hetzelfde team en dezelfde voorwaarden, of u nu een appartement in Blerick verhuist of een kantoor met dertig werkplekken.',
     'Wie zijn inboedel wegzet, verhuist hem meestal ook. Bij De Kievit zit dat bij dezelfde partij: wij halen op, slaan op en brengen op de afgesproken dag weer terug, met dezelfde planner en dezelfde voorwaarden. Daarnaast kunt u bij ons terecht voor een particuliere of zakelijke verhuizing, inpakservice en een verhuizing naar het buitenland.'),
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
     'Opslag voor Venlo en heel Noord- en Midden-Limburg'),

    # --- Verhuizen in Venlo en heel Noord- en Midden-Limburg ---
    # <p class=intro>, 287 tekens
    ('Vanuit Venlo verhuizen wij in de hele regio: van Venray en Horst tot Tegelen, Reuver en Roermond, en over de grens in Duitsland en Belgi&euml;. Als lid van Top Movers regelen wij ook verhuizingen naar de rest van Nederland, samen met collega-leden die net als wij Erkende Verhuizer zijn.',
     'Vanuit Venlo halen wij op in de hele regio: van Venray en Horst tot Tegelen, Reuver en Roermond, en over de grens in Duitsland en Belgi&euml;. De teruggave gebeurt op het adres van de bewaarplaats, tenzij u met ons afspreekt dat wij het bij u thuis afleveren.'),
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
     'Verhuist u naar Duitsland? Voor de grensstreek, Noordrijn-Westfalen en Nedersaksen, geldt de Nederlandse regeling, en dus twaalf maanden opslagdekking in plaats van de dertig dagen die elders in Europa gelden.'),
    # <h2 class=kop>, 16 tekens
    ('Goed om te weten',
     'Vragen over opslag'),

    # --- Goed om te weten ---
    # <p class=faq__door>, 253 tekens
    ('De vragen die het vaakst terugkomen over kosten, verhuisdozen,\n      opslag, verzekering en planning staan bij elkaar op\n      <a href="/veelgestelde-vragen/">veelgestelde vragen</a>. Staat uw vraag er niet bij, bel dan\n      077 - 32 32 100 of app ons.',
     'Wat het bewaarloon bepaalt, of u tussendoor bij uw spullen kunt en hoe u\n      opzegt: die vragen staan bij elkaar op\n      <a href="/veelgestelde-vragen/">veelgestelde vragen</a>. Staat uw vraag er niet bij, bel dan\n      077 - 32 32 100 of app ons.'),
    # <span class=eyebrow>, 20 tekens
    ('Vraag uw offerte aan',
     'Vraag uw opslagofferte aan'),
    # <h2>, 32 tekens
    ('Klaar om zorgeloos te verhuizen?',
     'Klaar om uw inboedel weg te zetten?'),

    # --- Klaar om zorgeloos te verhuizen? ---
    # <p class=lead-p>, 145 tekens
    ('Vul uw gegevens in, dan ontvangt u een gratis en vrijblijvende offerte. Hoe meer u kwijt kunt over uw woning en inboedel, hoe preciezer de prijs.',
     'Vul uw gegevens in, dan ontvangt u een gratis en vrijblijvende offerte. Noem de begindatum en, als u die weet, hoe lang het ongeveer moet blijven staan.'),
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

    # --- opslagblok herbestemd 30-aug: mag per pagina een eigen onderwerp dragen
    # (verzoek Shahab). De foto toont twee verhuizers die dozen stapelen, dus het
    # onderwerp moet daar plausibel bij blijven. De gele knop wijst naar #offerte.
    ('<p class="label">Inboedelopslag</p>',
     '<p class="label">Inpakmateriaal</p>'),
    ('Ophalen wanneer u zover bent',
     'Wat er om uw spullen heen zit'),
    ('U zegt op met een opzegtermijn van een maand. Wij geven de spullen terug op het adres van de bewaarplaats; bezorgen op uw nieuwe adres is een aparte afspraak, geen automatisme.',
     'Hoe iets de kist in gaat bepaalt hoe het er maanden later weer uit komt. Wij leveren de verhuisdozen, meubels gaan in verhuisdekens en wat kwetsbaar is wordt apart ingepakt. Opzeggen doet u met een termijn van een maand.'),
    ('>Vraag opslag aan<',
     '>Vraag inpakmateriaal aan<'),

    # --- werkgebied volledig op het onderwerp van de pagina (Shahab 30-aug):
    # bovenkop, kop, slotalinea en knop. De plaatschips blijven overal gelijk, dat is
    # het werkgebied zelf. De grensstreekclaim (C13) blijft woordelijk staan.
    ('<p class="label">Werkgebied</p>',
     '<p class="label">Waar wij opslaan</p>'),
    ('>App ons uw adressen<',
     '>App ons wat er in moet<'),
]
