# Notes for tomorrow (paused 2026-09-24)

Everything is paused at a clean point. Nothing is half-written, committed or deployed.
The dev server runs on http://localhost:4740 (`python site/_werk/devserver.py 4740 site`).

## Done

- **Brand book:** `brandbook-debresser/brandbook-de-bresser.html`. The fact check is in `brandbook-debresser/bevindingen.md` (§3 is the fact sheet). House rules: the green offerte button, the Top Movers chest logo, the 6 faces.
- **Sitemap plan:** `sitemap-debresser/sitemap-de-bresser.md`. It is at most 2 levels deep, has 48 redirects (301) and a 404 page.
- **Approved images** in `beeldronde-debresser/`:
  - `gezichten/`: the 6 faces
  - `werkers/`: workers 4–9, plus cutouts of 6–9
  - `drie-werkers/`: 2 group photos
  - `wagens/`: 2 trucks with lettering
- **image-versions skill:** `~/.claude/skills/image-versions`.
- **Page sources (debresser-8f):** all 65 new sources are in `site/_werk/paginas/` and pass the checker with 0 errors:
  - 6 services, offerte, vacatures (overview + 2), faq, privacyverklaring
  - blog + 11 posts
  - 41 place pages

  Images: 59 in `site/assets/img/bresser/`, mapped in `_bresser-beeld.json`.
- **Rebrand/build (debresser-5c):**
  - A De Bresser CSS layer. The source is now `site/_werk/style.css`; only `style.min.css` ships.
  - A new builder. The homepage, /contact/, /over-ons/ and 404 are built and work on :4740.
  - `vercel.json`: apex → www, 48 redirects (301), and noindex on any host except www.
  - The favicon and `site/README.md` are De Bresser.
  - The old Kievit material was moved, not deleted, to `_archief-kievit/`: 31 routes, 19 sources and 355 assets.

## Pick up here

1. **debresser-8f:** send batches 6c and 6d (the last 20 place pages) to 5c, then send the full report to the coordinator.
2. **debresser-5c:**
   - Extend `site/_werk/blok-offerteformulier.html` with what the /offerte/ copy promises:
     - service choice
     - storage container and duration
     - extras
     - intake choice (videogesprek / per mail)
     - a comments field
   - Place the form below the /offerte/ content.
   - Then build, grep for Kievit/Venlo, and check with Playwright at 1440 and 390 px.
   - Until that build, every route except /, /contact/, /over-ons/ and 404 returns 404. That is expected.
3. **Done 2026-09-25:** r3 (van lettering) and r4 (box print) were made, and r4 versie 2 was approved and filed in `beeldronde-debresser/werkers-aan-het-werk/`. All rounds are deleted, so the r2 path below no longer exists. The original plan was: **debresser-45:** make "workers working" r3, which adds the truck branding.
   - Run with `--neem` from r2 (`_image-versions/werkers-aan-het-werk-r2-20260924/versie-2-merk.png`).
   - Use a copy of `beeldronde-debresser/wagens/werk/merk-op-wagen.py`. Its zones need adapting to this van: seen from the rear corner, cab on the right, and the top of the box cut off. debresser-40 knows the zones.
   - Then an approval page, then delete r2. The final folder is `beeldronde-debresser/werkers-aan-het-werk/`.
4. **Approved images on the site:** they're not placed yet. Decide where they go.

## Decisions needed from you

- **Tone:** the vacature pages use "je", as debresser.nl does; every other page uses "u". Keep "je", or switch to "u"?
- **Place-page FAQs:** some keep debresser.nl's market prices and "7.000 m² opslag", others leave them out. Keep them everywhere, or drop them everywhere?
- **Privacyverklaring** art. 3/8 mention cookies and tracking. Will the new site use any?
- **Truck lettering:**
  - The branches shown are only Oisterwijk, Tilburg and Breda.
  - The Breda number is 076-8200233, but /contact/ gives 076 52 24 100.
  - The tagline "full service in logistiek" is out of date, because logistics was sold in 2024.
  - The slogan "schoonste motoren" is unverified.
- **Logistics:** does the footer PDF "Voorwaarden logistieke services" stay?
- **Content gaps:** these are marked `sb-gat` in the pages:
  - gebouwbeheer 3, assetmanagement 1, offerte 1, vacatures 3, brussel 1
  - also missing: a group portrait with names, a portrait of Ineke Brands, a historic photo, a map of Herastraat 9, the review score and reviews, opening hours, WhatsApp
- **Logo:** a vector logo from De Bresser/Top Movers is needed for production.
- **Old faces:** `BEELDREGELS.md` rule 4 still names the old kop-01..19 faces. It should point to `beeldronde-debresser/gezichten/`.

## Session notes (memory)

Each session saved its own notes in the project memory:

- coordinator: `handoff-2026-09-24.md`
- 5c: `handoff-build-2026-09-24.md` and `site-build.md`
- 8f: `page-sources-progress.md`
- 45: `werkers-aan-het-werk-state.md`
