# Translation brief: De Bresser website NL → EN

You translate the Dutch website text of De Bresser B.V. (recognised removal and logistics company, Oisterwijk, since 1923) into British English.

## Files
- Input: `tools/i18n/nl/<page>.json` = JSON array of Dutch strings, in page order (title, meta, JSON-LD values, then visible text, alt/aria-label/placeholder texts).
- Context: the source page is `<page>.html` in the project root. Open it when a string is a fragment (text split around inline tags such as <strong> or <a>) so the sentence still reads naturally once the fragments are joined back in order.
- Output: `tools/i18n/en/<page>.json` = ONE JSON object mapping EVERY input string (exactly, character for character, as key) to its English translation. Write it with the Write tool. Valid JSON, UTF-8.

## Rules
- Every input string must be a key. If nothing should change (names, place names, numbers), map it to itself.
- Keep HTML entities and inline markup that appear inside a string exactly (`&amp;`, `&nbsp;`, `&quot;`, `<br>` etc.). Do not add HTML.
- British English (recognised, organise, centre). Natural, concrete, not salesy. Formal "you" where the Dutch uses "u"; friendly "you" where it uses "je".
- Never use em dashes or en dashes as sentence punctuation (— or –). Use a comma, colon or full stop instead. Ranges like "9–17" may use a hyphen: "9-17".
- Keep unchanged: De Bresser, De Bresser B.V., person names and initials, street addresses, postcodes, Dutch town and region names (Oisterwijk, Den Bosch, 's-Hertogenbosch, Noord-Brabant), phone numbers, e-mail addresses, KVK/BTW numbers, brand and certificate names (Erkende Verhuizers, Erkende Projectverhuizers, Top Movers, FEDEMAC, IAM, KlantenVertellen, Qwiek.snooze, Satelliet, Brocken Verhuizingen).
- Translate country names: Nederland → the Netherlands, België → Belgium, Duitsland → Germany, Frankrijk → France, Zwitserland → Switzerland, Engeland → England, Luxemburg → Luxembourg.
- Numbers and dates: 1.531 → 1,531; 9,2 → 9.2; € 1.250,- → €1,250; "24 augustus 2026" → "24 August 2026". Keep ISO/table dates like 24-08-2026 as they are.
- Page titles keep their structure, e.g. "Zakelijke verhuizing | De Bresser" → "Business removals | De Bresser".
- Customer reviews and quotes: translate faithfully, keep the customer's tone; keep names/initials and towns.
- Dutch legal document names that link to Dutch PDFs: translate the name and add " (Dutch)" only if the text is a link label to a PDF.

## Fixed terms (use consistently)
Verhuizen / verhuizing = removal(s) (moving for private context is fine: "moving house") · Verhuisbedrijf = removal company · Erkend verhuizer = recognised removal company · Zakelijke verhuizing = business removals · Particuliere verhuizing = private removals · Internationale verhuizing = international removals · Zorgverhuizing = care relocation · Seniorenverhuizing = senior removals · Duurzaam verhuizen = sustainable removals · Kantoorverhuizing = office relocation · Winkelverhuizing = shop relocation · Opslag = storage · Opslagruimte = storage space · Zakelijke / particuliere opslag = business / private storage · DIY-opslag = DIY storage · Meubelprojecten = furniture projects · Meubeltransport = furniture transport · Veilingen = auctions · Montageservice / meubelmontage = assembly service / furniture assembly · Gebouwbeheer = building management · Onderhoud = maintenance · Verduurzamen = sustainability upgrades · Huismeester = caretaker · Assetmanagement = asset management · Inventarisatie = inventory · Meubelpaspoort = Furniture Passport · Circulair meubilair = circular furniture · Duurzame werkomgeving = sustainable work environment · Inkoop en verkoop assets = buying and selling assets · Offerte = quote · Offerte aanvragen = Request a quote · Vrijblijvende offerte = no-obligation quote · Huisbezoek = home visit · Verhuislift = moving lift · Inboedel = household contents · In- en uitpakservice = packing and unpacking service · Lees meer = Read more · Neem contact op = Contact us · Over ons = About us · Vacatures = Vacancies · Solliciteren = Apply · Kruimelpad = Breadcrumb · Veelgestelde vragen = Frequently asked questions · Afspraak = afspraak → "a deal is a deal" · Met oog voor morgen = With an eye on tomorrow · Eén vast aanspreekpunt = one dedicated point of contact · Sinds 1923 = Since 1923.

## When done
Validate every output: `node -e "const n=require('./tools/i18n/nl/PAGE.json'),e=require('./tools/i18n/en/PAGE.json');const miss=n.filter(k=>!(k in e));console.log(miss.length?miss:'ok')"` (replace PAGE). Fix until every file prints ok. Then check that no English value contains "—" or " – ".
