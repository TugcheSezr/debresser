# -*- coding: utf-8 -*-
# Ronde 2: wat er na de fixronde van 31-08 nog openstaat.
BESLUITEN = [
{"groep":"Moet snel","zwaarte":"snel","van":"a7",
 "titel":"34 tekst-achtergrondparen halen de contrasteis niet",
 "uitleg":"Geen enkele op de elf dienstpagina's; het zit geconcentreerd op twee routes. "
   "<b>/erkende-verhuizer/</b>: <code>.ev-accent</code> 2,32 tot 2,58:1 op 44,8 en 59,2px (eis 3 voor grote tekst, "
   "zes paren) en <code>.ev-eyebrow</code> 3,61 tot 4,24:1 op 17,3px (eis 4,5, zeven paren). "
   "<b>/certificeringen/</b> en <b>/duurzaamheid/</b>: creme op teal 3,74 tot 4,37:1. Plus twee routes met geel "
   "op teal 2,98:1 en /m3-calculator/ op 4,13:1. "
   "Veel hiervan is marginaal (4,13 tot 4,37 tegen 4,5), maar <code>.ev-accent</code> zit er duidelijk onder. "
   "<b>Belangrijk: deze klassen staan in geen van de twee contrastdossiers. Ze zijn dus niet afgekeurd maar "
   "nooit meegenomen.</b>",
 "opties":[("Alles repareren tot boven de eis","Raakt vooral /erkende-verhuizer/ en /certificeringen/. Kleuren aanpassen, niet de opmaak."),
           ("Alleen de duidelijke gevallen","De zes .ev-accent-paren onder 2,6 en het geel op teal. De marginale 4,1 tot 4,4 laten staan."),
           ("Alleen meten en vastleggen","In het contrastdossier zetten zodat ze niet opnieuw ontdekt worden, verder niets wijzigen."),
           ("Negeren","")]},

{"groep":"Moet snel","zwaarte":"snel","van":"a7",
 "titel":"De toegankelijkheidsverklaring belooft meer dan er gemeten is",
 "uitleg":"Er staat: \"Wij hebben de kleurcombinaties van deze site nagerekend tegen de eis van 4,5 op 1 voor "
   "gewone tekst en 3 op 1 voor grote tekst en vormen.\" De pagina claimt netjes geen WCAG-niveau en beschrijft "
   "de uitzonderingen eerlijk (menubalk, het 99%-regeltje, de gele knop), maar die ene zin is nu breder dan wat "
   "er feitelijk is nagerekend: de 34 paren uit punt 1 zaten er nooit in. <b>Deze keuze hangt aan punt 1: "
   "repareer je die paren, dan wordt de zin vanzelf waar.</b>",
 "opties":[("Zin bijstellen naar wat er echt gemeten is","Eerlijk en meteen klaar, ook als punt 1 blijft liggen."),
           ("Laten staan en punt 1 repareren","Dan klopt de zin weer. Alleen in die volgorde."),
           ("Zin helemaal weghalen","Minder belofte, minder risico, maar ook minder informatie."),
           ("Negeren","")]},

{"groep":"Moet snel","zwaarte":"snel","van":"9f, van gisteravond",
 "titel":"Drie feiten die 9f bewust niet gebruikt heeft",
 "uitleg":"Bij het schrijven van de dienstpagina's hield 9f zich aan mijn briefing dat feiten uitsluitend uit het "
   "claimsregister mochten komen, en liet daarom drie dingen liggen die wel in de gepubliceerde voorwaarden staan: "
   "de <b>voortaxatie van drie jaar</b>, de <b>grens van 25.000 euro</b> voor handels- en beroepsdoeleinden, en het "
   "<b>opdrachtgeverregime bij een zorginstelling</b>. Mijn briefing was op dat punt te strak: bij a7 heb ik "
   "later geoordeeld dat onze eigen voorwaardenpagina een geldige bron is. Het zijn drie sterke zinnen voor "
   "antiek, senioren en zorg. <b>Wel met de les van de pianozin: de aanhef meelezen tot en met het werkwoord "
   "waar de opsomming aan hangt.</b>",
 "opties":[("Alle drie erin, met contextcontrole","Elke bepaling eerst in zijn geheel gelezen, dan pas geschreven."),
           ("Alleen de voortaxatie en de 25.000-grens","Die twee zijn feitelijk het duidelijkst; het opdrachtgeverregime is subtieler."),
           ("Nu niet, later in een aparte ronde","De pagina's zijn af; dit is verrijking, geen reparatie."),
           ("Negeren","")]},

{"groep":"Cosmetisch","zwaarte":"cosmetisch","van":"a7",
 "titel":"Mobiele LCP zit net onder de grens",
 "uitleg":"Home 2,42 / 2,35 / 2,38 seconden bij drie schone metingen, tegen een grens van 2,5. De dienstpagina's "
   "zitten rond 2,03. Lighthouse mobiel 96, 97, 96. De twee kansen die overblijven: renderblokkerende CSS van "
   "ongeveer 460 tot 510ms, en beelden die responsiever kunnen voor 77 tot 98 kB. "
   "<b>Let op: dit is gemeten op localhost met een TTFB van 3 tot 4ms. De echte hosting komt daar nog bovenop, "
   "dus in het veld staat home dichter bij de grens dan deze cijfers suggereren.</b>",
 "opties":[("Allebei aanpakken","Kritieke CSS inlijnen en de beelden responsiever maken."),
           ("Alleen de renderblokkerende CSS","De grootste van de twee, en die raakt elke pagina."),
           ("Eerst op de echte hosting meten","Nu optimaliseren op een localhost-cijfer is gokken."),
           ("Negeren","")]},

{"groep":"Cosmetisch","zwaarte":"cosmetisch","van":"ik",
 "titel":"Twaalf descriptions zitten tussen 74 en 103 tekens",
 "uitleg":"inpaktips 74, duurzaamheid 77, werkwijze 78, cookiebeleid 81, sitemap 87, dozencalculator 88, "
   "veelgestelde-vragen 90, toegankelijkheid 92, erkende-verhuizer 93, verzekering 97, klantervaringen 100, "
   "over-ons 103. Ze zijn niet fout en ze stonden niet op de lijst, want 05 flagde alleen de vier onder de 70. "
   "Een zoekresultaat heeft ruimte tot ongeveer 155, dus er blijft ruimte liggen. Het gereedschap ligt er al: "
   "dezelfde BESCHRIJVING-constante die de vier van gisteren heeft opgelost.",
 "opties":[("Alle twaalf een eigen BESCHRIJVING","Twaalf zinnen schrijven, tegen de pagina zelf gelegd."),
           ("Alleen de kortste vijf","Onder de 90 tekens: inpaktips, duurzaamheid, werkwijze, cookiebeleid, sitemap."),
           ("Laten staan","Ze zijn kort maar kloppen, en kort wordt niet afgestraft."),
           ("Negeren","")]},

{"groep":"Cosmetisch","zwaarte":"cosmetisch","van":"ik",
 "titel":"De 404-pagina hoort in een generator of niet",
 "uitleg":"05 heeft <code>404.html</code> eenmalig samengesteld uit sitemap/index.html, zodat menu, sprite en "
   "voetlijst geen tweede waarheid krijgen. Het bestand komt uit geen enkele bouwer. Ik heb er een hook bij gezet "
   "die alleen de cachebuster gelijktrekt, dus dat loopt niet meer achter. Maar verandert straks het menu of de "
   "voetlijst, dan loopt de 404 stil achter zonder dat iemand het merkt. 05 heeft het samenstelscript nog in zijn "
   "scratchpad staan. Bijvangst: die pagina draagt als enige nog een intern comment van 461 tekens, want de "
   "comment-strip zit in de bouwers en die raken dit bestand niet.",
 "opties":[("Het script in de repo en aan de bouw hangen","Dan volgt de 404 het menu vanzelf, en het comment verdwijnt mee."),
           ("Script in de repo, handmatig draaien","Wel reproduceerbaar, geen automatische koppeling."),
           ("Laten zoals het is","Werkt nu; iemand moet er zelf aan denken bij een menuwijziging."),
           ("Negeren","")]},

{"groep":"Cosmetisch","zwaarte":"cosmetisch","van":"a7",
 "titel":"De sterrenrij haalt de contrasteis niet, en dat mag",
 "uitleg":"De vijf sterretjes staan op 1,71:1 (geel op wit, 12px) op 27 routes. a7 heeft dit expliciet als "
   "GEEN fout gemarkeerd: de rij draagt <code>aria-hidden=\"true\"</code> en de waarde staat er als tekst naast, "
   "\"9,4 uit 779 beoordelingen op Klantenvertellen\". Decoratief, en er gaat geen informatie verloren. Ik zet "
   "het er alleen op zodat het niet bij de volgende controle opnieuw als vondst terugkomt.",
 "opties":[("Vastleggen als bewuste uitzondering","In het contrastdossier, met de reden erbij."),
           ("Sterretjes toch donkerder maken","Kost de herkenbare Google-look van dat blok."),
           ("Niets doen en niet vastleggen","Dan komt hij bij de volgende audit weer boven."),
           ("Negeren","")]},

{"groep":"Blijft openstaan","zwaarte":"snel","van":"buiten de audit gehouden",
 "titel":"De Web3Forms-sleutel staat erin, de verzendtest nog niet",
 "uitleg":"Je leverde de sleutel op 07-09-2026 aan en hij staat nu op alle 27 formulieren; de placeholder is weg. "
   "Daarmee is dit geen blokkade meer. Wat nog ontbreekt is het bewijs dat er ook echt post AANKOMT. "
   "<b>Van Top Feestzaal weten we dat een sleutel invullen nog niet betekent dat het werkt: daar is de "
   "verzendtest nooit gedaan, en er kan een domeinwhitelist op het formulier staan.</b> Een whitelist faalt "
   "pas op de echte host, dus die test hoort na de DNS-omzetting op www.de-kievit.nl.",
 "opties":[("Verzendtest doen zodra het domein om is","Een aanvraag in een gewone browser, daarna kijken of info@de-kievit.nl hem heeft."),
           ("Domeinwhitelist in Web3Forms nakijken","Staat er een lijst, dan moet www.de-kievit.nl erin."),
           ("Niets doen","Dan weet je pas bij de eerste echte klant of het werkt."),
           ("Negeren","")]},
]
