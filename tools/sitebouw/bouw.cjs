/* Bouwt alle subpagina's van de De Bresser-site in de opmaak van het project (Kievit-componenten, merkboekkleuren).
   Inhoud: 1-op-1 van debresser.nl (live HTML in ../live, gedownload uit de sitemap).
   Header, footer, CTA en mobiele balk komen letterlijk uit index.html van het project, zodat alle pagina's gelijk lopen.

   Gebruik: node bouw.cjs [--only=bestand.html,bestand.html]
*/
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const S = require('./site.js');
const { esc, tidy, imgQueue, walk } = require('./parse.js');

const LIVE_DIR = process.env.LIVE_DIR || path.join(__dirname, 'live');
const REPO = process.env.REPO || path.join(__dirname, 'ol-debresser'); // clone van github.com/OranjeLift-Tech/debresser (hero-foto's, beelden)
const DOEL = process.env.DOEL || path.join(__dirname, '..', '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const only = args.only ? String(args.only).split(',') : null;

/* ---------- vaste delen uit index.html ---------- */
const INDEX = fs.readFileSync(path.join(DOEL, 'index.html'), 'utf8');
const between = (s, a, b) => { const i = s.indexOf(a); const j = s.indexOf(b, i); if (i < 0 || j < 0) throw new Error('niet gevonden: ' + a); return s.slice(i, j); };
const CHROME_TOP = between(INDEX, '<svg class="svg-sprite"', '<main');                 // sprite, skiplink, header, drawer
const CTA = between(INDEX, '  <section class="cta-band"', '</main>');                     // "Benieuwd wat wij voor u kunnen betekenen?"
const ctaVoorToon = (html) => {
  const tekst = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
  const je = (tekst.match(/\b(je|jij|jou|jouw|jullie)\b/gi) || []).length;
  const u = (tekst.match(/\b(u|uw)\b/gi) || []).length;
  return CTA.trimEnd().split('voor u kunnen betekenen?').join(je && je >= u ? 'voor je kunnen betekenen?' : 'voor u kunnen betekenen?');
};
const CHROME_BOTTOM = INDEX.slice(INDEX.indexOf('<footer class="footer">'), INDEX.indexOf('</body>')); // footer + mobiele balk

/* ---------- kleine helpers ---------- */
const flatBlocks = (g) => g.type === 'group' ? g.children.flatMap(flatBlocks) : [g];
const hasType = (g, t) => flatBlocks(g).some((b) => b.type === t);
const groupText = (g) => flatBlocks(g).map((b) => b.text || b.title || '').join(' ');
function unwrap(g) { while (g.type === 'group' && g.children.length === 1 && g.children[0].type === 'group') g = g.children[0]; return g; }
let uid = 0;
const nextId = (p) => `${p}-${++uid}`;
const PIJL = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
const CARET = '<svg aria-hidden="true"><use href="#i-caret"/></svg>';

function knop(b) {
  const href = b.href || '#';
  const t = esc(b.text);
  if (/^tel:/.test(href)) return `<a class="btn btn--lijn" href="${esc(href)}"><svg aria-hidden="true"><use href="#i-phone"/></svg>${t}</a>`;
  if (/^mailto:/.test(href)) return `<a class="btn btn--lijn" href="${esc(href)}"><svg aria-hidden="true"><use href="#i-mail"/></svg>${t}</a>`;
  const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
  if (/offerte/i.test(b.text)) return `<a class="btn btn--goud btn--groen" href="${esc(href)}"${ext}>${CARET}${t}</a>`;
  return `<a class="btn btn--goud" href="${esc(href)}"${ext}>${t}${PIJL}</a>`;
}

/* ---------- formulier in Kievit-opmaak (lf) ---------- */
const slugName = (s) => tidy(s).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'veld';
function formulier(f, kop) {
  const n = nextId('f');
  const velden = f.fields.map((fl, i) => {
    const id = `${n}-${i}`;
    const req = fl.req ? ' required' : '';
    const ster = fl.req ? ' <span class="lf__ster" aria-hidden="true">*</span>' : '';
    const naam = esc(slugName(fl.label));
    switch (fl.kind) {
      case 'html': return `<div class="lf__html">${fl.html}</div>`;
      case 'textarea': return `<div class="lf__field lf__field--breed"><label for="${id}">${esc(fl.label)}${ster}</label><textarea id="${id}" name="${naam}" rows="5" placeholder="${esc(fl.placeholder)}"${req}></textarea></div>`;
      case 'select': return `<div class="lf__field lf__field--sel"><label for="${id}">${esc(fl.label)}${ster}</label><select id="${id}" name="${naam}"${req}>${fl.options.map((o) => `<option>${esc(o)}</option>`).join('')}</select></div>`;
      case 'radio': case 'checkbox': return `<fieldset class="lf__keuze"><legend>${esc(fl.label)}${ster}</legend>${fl.options.map((o) => `<label class="lf__optie"><input type="${fl.kind}" name="${naam}${fl.kind === 'checkbox' ? '[]' : ''}" value="${esc(o)}"${fl.kind === 'radio' && fl.req ? ' required' : ''}><span>${esc(o)}</span></label>`).join('')}</fieldset>`;
      case 'file': return `<div class="lf__field lf__field--breed"><label for="${id}">${esc(fl.label)}${ster}</label><input id="${id}" name="bestanden[]" type="file" multiple${req}>${[(fl.drop.match(/^Sleep[^.]*?selecteren/) || [''])[0], fl.desc, (fl.max.match(/Maximum file size:\s*\S+/) || [fl.max])[0]].filter(Boolean).map((t) => `<small class="lf__hint">${esc(t)}</small>`).join('')}</div>`;
      default: {
        const type = ['tel', 'email', 'number', 'date'].includes(fl.kind) ? fl.kind : 'text';
        const ac = type === 'tel' ? ' autocomplete="tel"' : type === 'email' ? ' autocomplete="email"' : /naam/i.test(fl.label) ? ' autocomplete="name"' : '';
        return `<div class="lf__field"><label for="${id}">${esc(fl.label)}${ster}</label><input id="${id}" name="${naam}" type="${type}" placeholder="${esc(fl.placeholder)}"${ac}${req}></div>`;
      }
    }
  }).join('\n          ');
  return `<div class="db-formkaart" data-reveal>
        ${kop || ''}
        <form class="lf db-form" action="api/verzend.php" method="post" data-form="${esc(f.title)}"${f.fields.some((x) => x.kind === 'file') ? ' enctype="multipart/form-data"' : ''}>
          <input type="hidden" name="formulier" value="${esc(f.title)}">
          ${velden}
          <label class="lf__hp" aria-hidden="true">Laat dit veld leeg <input name="website_url" type="text" tabindex="-1" autocomplete="off"></label>
          <div class="lf__actions"><button class="btn btn--goud btn--groen btn--lg" type="submit">${esc(f.submit)}${CARET}</button></div>
          <p class="db-form__melding" role="status" aria-live="polite" hidden></p>
        </form>
      </div>`;
}

function faq(b) {
  return `<div class="faq" data-reveal>
${b.items.map((it) => `        <details><summary>${esc(it.q)}<span class="faq__tk" aria-hidden="true"></span></summary><div class="faq__a">${it.a}</div></details>`).join('\n')}
      </div>`;
}

function figuur(b) {
  const img = `<img src="${esc(b.src)}" alt="${esc(b.alt)}" loading="lazy" decoding="async">`;
  return `<figure class="blok__foto" data-reveal>${b.href ? `<a href="${esc(b.href)}">${img}</a>` : img}${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`;
}

function dienstKaarten(run) {
  // Stappen met een genummerd plaatje (videochat: 1, 2, 3): nummer als badge in plaats van het plaatje
  if (run.every((r) => /\d-plan-video-chat/.test(r.src))) {
    return `<ol class="db-kaarten db-stappen">
${run.map((r) => `      <li class="db-kaart" data-reveal><span class="db-stap-nr" aria-hidden="true">${(r.src.match(/(\d)-plan-video-chat/) || [])[1]}</span><h3>${r.href ? `<a href="${esc(r.href)}">${esc(r.title)}</a>` : esc(r.title)}</h3>${r.desc}</li>`).join('\n')}
    </ol>`;
  }
  return `<div class="diensten">
${run.map((r, k) => {
    const inner = `<div class="dienst__nis">${r.src ? `<img src="${esc(r.src)}" alt="${esc(r.alt)}" loading="lazy" decoding="async">` : ''}<span class="dienst__nr" aria-hidden="true">${String(k + 1).padStart(2, '0')}</span></div><div class="dienst__tekst"><h3>${esc(r.title)}</h3>${r.desc}${r.href ? '<span class="dienst__meer">Lees meer</span>' : ''}</div>`;
    return r.href ? `      <a class="dienst" href="${esc(r.href)}" data-reveal>${inner}</a>` : `      <div class="dienst" data-reveal>${inner}</div>`;
  }).join('\n')}
    </div>`;
}

/* Verticale inhoud (tekstkolom) */
function flow(blocks, ctx = {}) {
  const out = [];
  let kopGehad = !!ctx.kopGehad;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const next = blocks[i + 1];
    switch (b.type) {
      case 'heading': {
        const inner = b.href ? `<a href="${esc(b.href)}">${esc(b.text)}</a>` : esc(b.text);
        // Tag volgt debresser.nl (h2 of h3); de eerste kop van een kolom krijgt de opmaak van een sectiekop.
        const tag = b.level <= 2 ? 'h2' : 'h3';
        if (!kopGehad) { out.push(`<${tag} class="kop${tag === 'h3' ? ' kop--sub' : ''}">${inner}</${tag}>`); kopGehad = true; }
        else out.push(`<${tag} class="db-h3">${inner}</${tag}>`);
        break;
      }
      case 'text': {
        if (next && next.type === 'heading' && b.text.length < 45 && !/[.!?:]$/.test(b.text)) { out.push(`<p class="label">${esc(b.text)}</p>`); break; }
        out.push(`<div class="db-tekst">${b.html}</div>`);
        break;
      }
      case 'button': {
        const run = [b];
        while (blocks[i + 1] && blocks[i + 1].type === 'button') run.push(blocks[++i]);
        out.push(`<div class="knoprij${run.length >= 3 ? ' db-knoppen' : ''}">${run.map(knop).join('')}</div>`);
        break;
      }
      case 'iconbox': {
        if (!b.title && b.desc) { out.push(`<div class="db-tekst">${b.desc}</div>`); break; }
        if (!b.desc) { out.push(`<div class="knoprij">${knop({ text: b.title, href: b.href })}</div>`); break; }
        out.push(`<article class="db-kaart" data-reveal><h3>${b.href ? `<a href="${esc(b.href)}">${esc(b.title)}</a>` : esc(b.title)}</h3>${b.desc}</article>`);
        break;
      }
      case 'imagebox': {
        const run = [b];
        while (blocks[i + 1] && blocks[i + 1].type === 'imagebox') run.push(blocks[++i]);
        out.push(dienstKaarten(run));
        break;
      }
      case 'image': {
        if (b.icon) break;
        if (b.svgLogo) { out.push(`<img class="db-logo" src="${esc(b.src)}" alt="${esc(b.alt)}" loading="lazy">`); break; }
        out.push(figuur(b));
        break;
      }
      case 'list': out.push(`<ul class="db-vinklijst">${b.items.map((it) => `<li>${it.href ? `<a href="${esc(it.href)}">${esc(it.text)}</a>` : esc(it.text)}</li>`).join('')}</ul>`); break;
      case 'form': out.push(formulier(b, ctx.formKop)); break;
      case 'faq': out.push(faq(b)); break;
      case 'video': out.push(`<div class="blok__foto db-video" data-reveal><iframe src="${esc(b.src)}" title="${esc(b.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`); break;
      case 'timeline': out.push(`<ol class="hist5__tl db-tijdlijn" data-reveal>${b.items.map((it) => `<li><span class="hist5__jaar">${esc(it.year)}</span><div>${it.title ? `<h3>${esc(it.title)}</h3>` : ''}${it.html}</div></li>`).join('')}</ol>`); break;
      case 'hotspot':
        if (b.img) out.push(figuur({ src: b.img.src, alt: b.img.alt }));
        out.push(`<ul class="db-kaarten">${b.items.map((h) => `<li class="db-kaart"><svg class="db-kaart__ico" aria-hidden="true"><use href="#i-pin"/></svg>${h}</li>`).join('')}</ul>`);
        break;
      case 'posts': {
        out.push(`<ul class="nieuws" data-reveal-groep>
${b.items.map((it) => `        <li><a class="bericht" href="${esc(it.href || '#')}">${it.src ? `<span class="bericht__foto"><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" decoding="async"></span>` : ''}<span class="bericht__tekst"><h3>${esc(it.title)}</h3>${it.desc ? `<p>${esc(it.desc)}</p>` : ''}<span class="bericht__meer">${esc(it.meer || 'Lees meer')}${PIJL}</span></span></a></li>`).join('\n')}
      </ul>`);
        if (b.pag && b.pag.length) out.push(`<nav class="db-paginering" aria-label="Paginering">${b.pag.map((p) => p.current ? `<span aria-current="page"><span class="visueel-verborgen">Pagina </span>${esc(p.text)}</span>` : p.href ? `<a href="${esc(p.href)}">${/^\d+$/.test(p.text) ? '<span class="visueel-verborgen">Pagina </span>' : ''}${esc(p.text)}</a>` : `<span class="db-paginering__uit">${esc(p.text)}</span>`).join('')}</nav>`);
        break;
      }
      case 'team': {
        out.push(`<ul class="db-team" data-reveal-groep>
${b.items.map((t) => `        <li class="db-team__lid">${t.src ? `<img src="${esc(t.src)}" alt="${esc(t.alt)}" width="160" height="160" loading="lazy" decoding="async">` : ''}<h3>${esc(t.naam)}</h3><p class="db-team__functie">${esc(t.functie)}</p>${t.tekst ? `<p>${esc(t.tekst)}</p>` : ''}</li>`).join('\n')}
      </ul>`);
        break;
      }
      case 'group': out.push(inner(b, { ...ctx, kopGehad })); break;
      default: break;
    }
  }
  return out.join('\n      ');
}

const isMedia = (g) => { const f = flatBlocks(g); return f.length > 0 && f.every((b) => b.type === 'image' || b.type === 'video') && f.some((b) => (b.type === 'image' && !b.icon) || b.type === 'video'); };

function kolom(g, ctx) {
  const f = flatBlocks(g);
  if (isMedia(g)) return { media: true, html: flow(f.filter((b) => !b.icon), ctx) };
  const fi = f.findIndex((b) => b.type === 'form');
  if (fi >= 0) {
    const voor = f.slice(0, fi);
    let start = voor.length;
    while (start > 0 && ['heading', 'text'].includes(voor[start - 1].type) && voor.length - start < 2) start--;
    const kop = voor.slice(start).map((b) => b.type === 'heading' ? `<h3 class="db-formkaart__kop">${esc(b.text)}</h3>` : `<div class="db-formkaart__intro">${b.html}</div>`).join('\n        ');
    return { form: true, html: (start ? flow(voor.slice(0, start), ctx) : '') + flow([f[fi]], { ...ctx, formKop: kop }) + flow(f.slice(fi + 1), ctx) };
  }
  return { html: flow(g.children, ctx) };
}

function inner(g, ctx = {}) {
  g = unwrap(g);
  const kids = g.children;
  const cols = kids.filter((k) => k.type === 'group');
  const widgets = kids.filter((k) => k.type !== 'group');
  const voorCols = widgets.filter((w) => kids.indexOf(w) < kids.indexOf(cols[0]));
  const naCols = widgets.filter((w) => kids.indexOf(w) > kids.indexOf(cols[cols.length - 1]));
  if (cols.length >= 2 && cols.every((c) => flatBlocks(c).every((b) => b.type === 'imagebox'))) return flow(voorCols, ctx) + dienstKaarten(cols.flatMap(flatBlocks)) + flow(naCols, ctx);
  if (cols.length >= 2 && cols.every((c) => flatBlocks(c).every((b) => b.type === 'button'))) return flow([...voorCols, ...cols.flatMap(flatBlocks), ...naCols], ctx);
  if (cols.length === 2 && widgets.length === 0) {
    const a = kolom(cols[0], ctx), b = kolom(cols[1], ctx);
    if (a.media || b.media) {
      const tekst = a.media ? b : a, media = a.media ? a : b;
      return `<div class="blok blok--vlak${a.media ? ' db-foto-links' : ''}">
      <div class="blok__tekst" data-reveal>
      ${tekst.html}
      </div>
      ${media.html}
    </div>`;
    }
    return `<div class="db-twee${a.form || b.form ? ' db-twee--form' : ''}">
      <div class="db-twee__kol">${a.html}</div>
      <div class="db-twee__kol">${b.html}</div>
    </div>`;
  }
  if (cols.length >= 3 && widgets.length === 0) {
    return `<div class="db-kaarten">
${cols.map((c) => {
      const f = flatBlocks(c);
      const h = f.find((b) => b.type === 'heading');
      const m = h && h.text.match(/^(\d+)\.\s*(.+)$/);
      if (f.some((b) => b.type === 'form')) return `      <div class="db-kaarten__form">${kolom(c, ctx).html}</div>`;
      if (m) return `      <article class="db-kaart db-kaart--stap" data-reveal><h3>${esc(h.text)}</h3>${flow(f.filter((b) => b !== h), { ...ctx, kopGehad: true })}</article>`;
      return `      <article class="db-kaart" data-reveal>${flow(c.children, { ...ctx, kopGehad: true })}</article>`;
    }).join('\n')}
    </div>`;
  }
  return flow(kids, ctx);
}

/* ---------- reviews ("Klanten zijn blij met ons") ---------- */
function reviews(kopGroep, kaartGroepen, meer) {
  const f = flatBlocks(kopGroep);
  const label = f.find((b) => b.type === 'text');
  const h = f.find((b) => b.type === 'heading');
  const lijst = [];
  const zoek = (grp) => {
    const inn = grp.children.filter((c) => c.type === 'group');
    if (grp.children.some((c) => c.type === 'rating')) {
      const meta = inn[0] ? flatBlocks(inn[0]).filter((b) => b.type === 'text').map((b) => b.text) : [];
      lijst.push({ wie: meta[0] || '', datum: meta[1] || '', html: grp.children.filter((c) => c.type === 'text').map((b) => b.html).join('') });
    } else inn.forEach(zoek);
  };
  kaartGroepen.forEach(zoek);
  const iso = (d) => { const m = d.match(/(\d{1,2})-(\d{1,2})-(\d{4})/); return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : ''; };
  const id = nextId('reviews');
  return `<section class="sectie reviews" aria-labelledby="${id}">
  <div class="wrap">
    <div class="sectiekop sectiekop--midden" data-reveal>
      ${label ? `<p class="label">${esc(label.text)}</p>` : ''}
      <h2 class="kop" id="${id}">${esc(h ? h.text : '')}</h2>
    </div>
    <ul class="rgrid rgrid--3">
${lijst.map((r) => `      <li class="review" data-reveal><svg class="review__quote" aria-hidden="true"><use href="#i-quote"/></svg><div class="review__tekst">${r.html}</div><p class="review__wie"><b>${esc(r.wie)}</b><time datetime="${iso(r.datum)}">${esc(r.datum)}</time></p></li>`).join('\n')}
    </ul>
${meer ? `    <div class="reviews__voet" data-reveal><p class="reviews__meer"><a href="${esc(meer.href && !/^#/.test(meer.href) ? meer.href : 'https://www.klantenvertellen.nl/reviews/1038076/erkende_verhuizer_de_bresser_verhuizingen_bv?from=widget&amp;lang=nl')}" target="_blank" rel="noopener">${esc(meer.text)}${PIJL}</a></p></div>` : ''}
  </div>
</section>`;
}

/* ---------- hero-foto ---------- */
const HERO_ALIAS = { 'diensten-verhuizen': 'verhuizen', 'diensten-opslag': 'opslag', 'diensten-meubelprojecten': 'meubelprojecten', 'diensten-gebouwbeheer': 'gebouwbeheer', 'diensten-assetmanagement': 'assetmanagement' };
const heroKopie = new Set();
function heroFoto(bestand) {
  const base = bestand.replace(/\.html$/, '');
  const naam = HERO_ALIAS[base] || base;
  // eerst in het project zelf, anders in de repo-clone
  const bron = [path.join(DOEL, 'assets/img/page-hero', naam + '.webp'), path.join(REPO, 'assets/img/page-hero', naam + '.webp')].find((p) => fs.existsSync(p));
  if (!bron) return null;
  heroKopie.add(naam);
  return { groot: `assets/img/page-hero/${naam}.webp`, klein: `assets/img/page-hero/${naam}-960.webp` };
}

/* ---------- kruimelpad: tussenstap voor bekende onderdelen ---------- */
function ouder(bestand) {
  const b = bestand.replace(/\.html$/, '');
  if (/^diensten-/.test(b)) return null;
  if (/^assetmanagement-/.test(b)) return ['Assetmanagement', 'diensten-assetmanagement.html'];
  if (/^gebouwbeheer-/.test(b)) return ['Gebouwbeheer', 'diensten-gebouwbeheer.html'];
  if (/^blog-/.test(b)) return ['Blog', 'blog.html'];
  if (/^vacature-|^tekenbonus$/.test(b)) return ['Vacatures', 'vacatures.html'];
  if (/^(meubeltransport|veilingen|meubelmontage)$/.test(b)) return ['Meubelprojecten', 'diensten-meubelprojecten.html'];
  if (/opslag/.test(b)) return ['Opslag', 'diensten-opslag.html'];
  if (/verhuizing|verhuizen|verhuisbedrijf|verhuisservice|^(duitsland|frankrijk|zwitserland|breda|tilburg|roosendaal|bergen-op-zoom|de-bresser-brussel)$/.test(b)) return ['Verhuizen', 'diensten-verhuizen.html'];
  return null;
}

/* ---------- nabewerking per pagina ----------
   Handwerk van andere sessies dat bij opnieuw genereren moet blijven staan. */
const NABEWERKING = {
  // contact.html, Locaties: vlaggen bij de landkoppen en de wereldbol (sessie tugce-85, 24 september 2026).
  // CSS: blok "Contact, Locaties: vlaggen bij de landkoppen + wereldbol" in style.css; JS: "// Contact, Locaties: wereldbol (MapLibre" in main.js.
  'contact.html': (h) => {
    const moet = (oud, nieuw) => { if (!h.includes(oud)) throw new Error('contact.html nabewerking: niet gevonden: ' + oud.slice(0, 80)); h = h.split(oud).join(nieuw); };
    moet('<figure class="blok__foto" data-reveal><img src="assets/img/site/Locaties-De-Bresser-Nederland', '<figure class="blok__foto db-bol" data-db-bol data-reveal><img src="assets/img/site/Locaties-De-Bresser-Nederland');
    moet('<h3 class="kop kop--sub">Nederland</h3>', '<h3 class="kop kop--sub db-land"><span class="db-vlag db-vlag--nl" aria-hidden="true"></span>Nederland</h3>');
    for (const plaats of ['Oisterwijk', 'Tilburg', 'Breda', 'Venlo', 'Reeuwijk']) moet(`<article class="db-kaart" data-reveal><h3 class="db-h3">${plaats}</h3>`, `<article class="db-kaart" data-loc="${plaats.toLowerCase()}" data-reveal><h3 class="db-h3">${plaats}</h3>`);
    moet('<h3 class="db-h3">België</h3>', '<h3 class="kop kop--sub db-land"><span class="db-vlag db-vlag--be" aria-hidden="true"></span>België</h3>');
    moet('<h3 class="db-h3">Brussel</h3>', '<h3 class="db-h3" data-loc="brussel">Brussel</h3>');
    return h;
  },
  // over-ons.html, Ons team: laptopkaarten waar het hoofd boven het scherm uitkomt, zoals in de repo
  // OranjeLift-Tech/debresser (sessie tugce, 24 september 2026). CSS: css/team-laptop.css; foto's:
  // assets/img/team-laptop/<voornaam>.webp (640x840, in het scherm) en <voornaam>-pop.webp (640x460, erboven).
  'over-ons.html': (h) => {
    const moet = (oud, nieuw) => { if (!h.includes(oud)) throw new Error('over-ons.html nabewerking: niet gevonden: ' + oud.slice(0, 80)); h = h.split(oud).join(nieuw); };
    moet('</head>', '<link rel="stylesheet" href="css/team-laptop.css">\n</head>');
    const lijst = h.match(/<section class="sectie">(\s*<div class="wrap">\s*)<ul class="db-team" data-reveal-groep>([\s\S]*?)<\/ul>/);
    if (!lijst) throw new Error('over-ons.html nabewerking: team-lijst (ul.db-team) niet gevonden');
    const leden = [...lijst[2].matchAll(/<li class="db-team__lid">[\s\S]*?<h3>([\s\S]*?)<\/h3><p class="db-team__functie">([\s\S]*?)<\/p><p>([\s\S]*?)<\/p><\/li>/g)];
    if (leden.length < 10) throw new Error('over-ons.html nabewerking: te weinig teamleden gevonden (' + leden.length + ')');
    const bar = '<span class="tm__bar" aria-hidden="true"><i><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg></i><i><svg viewBox="0 0 24 24"><rect x="3" y="7" width="12.5" height="10" rx="2.5"/><path d="m15.5 11 5-3v8l-5-3"/></svg></i><i class="tm__call"><svg viewBox="0 0 24 24"><path d="M6.6 3.8 9 3.3l1.6 4-2 1.4a11 11 0 0 0 6.7 6.7l1.4-2 4 1.6-.5 2.4a2 2 0 0 1-2 1.6A15.8 15.8 0 0 1 5 5.8a2 2 0 0 1 1.6-2Z"/></svg></i></span>';
    const kaarten = leden.map(([, naam, rol, tekst]) => {
      const voornaam = naam.trim().split(/\s+/)[0];
      const id = voornaam.toLowerCase();
      if (!fs.existsSync(path.join(DOEL, 'assets/img/team-laptop', id + '.webp'))) throw new Error('over-ons.html nabewerking: geen laptopfoto voor ' + naam);
      return `
      <li class="tm">
        <div class="tm__laptop">
          <div class="tm__lid">
            <div class="tm__screen">
              <div class="tm__view">
                <img class="tm__photo" src="assets/img/team-laptop/${id}.webp" width="640" height="840" alt="Foto ${voornaam}" loading="lazy" decoding="async">
                <span class="tm__live" aria-hidden="true"><i></i><i></i><i></i></span>
                ${bar}
              </div>
              <div class="tm__popwrap" aria-hidden="true"><img class="tm__pop" src="assets/img/team-laptop/${id}-pop.webp" width="640" height="460" alt="" loading="lazy" decoding="async"></div>
            </div>
          </div>
          <div class="tm__base" aria-hidden="true"></div>
        </div>
        <h3>${naam}</h3>
        <span class="tm__role">${rol}</span>
        <p>${tekst}</p>
      </li>`;
    }).join('');
    moet(lijst[0], `<section class="sectie tm-section">${lijst[1]}<ul class="tm-grid" data-reveal-groep>${kaarten}\n    </ul>`);
    return h;
  },
  // vacatures.html: vacaturekaarten met foto in een lijst waar de mensen bovenuit steken, en de open
  // sollicitatie als Nachtblauwe band, zoals in de repo OranjeLift-Tech/debresser (sessie tugce, 24 september 2026).
  // CSS: css/vacatures-kaarten.css; foto's: assets/img/vacatures/<naam>.webp + <naam>-vrij.webp (760x860).
  // Het formulier in de rechterkolom blijft zoals de generator het maakt.
  'vacatures.html': (h) => {
    const moet = (oud, nieuw) => { if (!h.includes(oud)) throw new Error('vacatures.html nabewerking: niet gevonden: ' + oud.slice(0, 80)); h = h.split(oud).join(nieuw); };
    moet('</head>', '<link rel="stylesheet" href="css/vacatures-kaarten.css">\n</head>');
    const kol = h.match(/<div class="db-twee__kol"><ul class="nieuws" data-reveal-groep>[\s\S]*?<\/ul>\s*<div class="db-tekst"><p>(Momenteel hebben we geen openstaande vacatures[\s\S]*?)<\/p><\/div><\/div>/);
    if (!kol) throw new Error('vacatures.html nabewerking: vacaturelijst (ul.nieuws + db-tekst) niet gevonden');
    for (const deel of ['vacature-chauffeur-verhuizingen-c-ce.html', 'vacature-verhuizer.html']) if (!kol[0].includes(deel)) throw new Error('vacatures.html nabewerking: vacature ontbreekt in de lijst: ' + deel);
    const pijl = '<span class="vac-card__go"><svg class="icon" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg></span>';
    const foto = (naam, nr, pos, oorsprong) => `<figure class="vac-card__photo" aria-hidden="true">
              <img src="assets/img/vacatures/${naam}.webp" alt="" width="760" height="860" loading="lazy" decoding="async" style="object-position: ${pos}">
              <img class="vac-card__mensen" src="assets/img/vacatures/${naam}-vrij.webp" alt="" width="760" height="860" loading="lazy" decoding="async" style="object-position: ${pos}; transform-origin: ${oorsprong}">
              <span class="vac-card__no">${nr}</span>
              ${pijl}
            </figure>`;
    const verder = (href) => `<div class="vac-card__foot">
                <a class="vac-card__more" href="${href}"><span class="vac-card__chev">&gt;</span> Lees verder</a>
              </div>`;
    const kaarten = `<div class="db-twee__kol"><div class="vac-list__grid" data-reveal-groep>
          <article class="vac-card">
            ${foto('chauffeur-verhuizingen', '01', '50% 30%', '26% 100%')}
            <div class="vac-card__body">
              <h3 class="vac-card__title"><a href="vacature-chauffeur-verhuizingen-c-ce.html">Chauffeur Verhuizingen (C/CE) – Fulltime</a></h3>
              <p class="vac-card__places"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg><span>Tilburg</span><i> | </i><span>Oisterwijk</span><i> | </i><span>Breda</span><i> | </i><span>Venlo</span></p>
              <p class="vac-card__intro"><span class="vac-card__dash">– </span>Wil jij méér dan alleen rijden? Bij De Bresser ben je niet zomaar een chauffeur.</p>
              ${verder('vacature-chauffeur-verhuizingen-c-ce.html')}
            </div>
          </article>
          <article class="vac-card">
            ${foto('verhuizer', '02', '50% 42%', '58% 100%')}
            <div class="vac-card__body">
              <h3 class="vac-card__title"><a href="vacature-verhuizer.html">Verhuizer (40 uur of in overleg)</a></h3>
              <p class="vac-card__lead">Een verhuizing is voor klanten een belangrijk moment. Jij maakt het verschil.</p>
              <p class="vac-card__intro">Wij zoeken verhuizers die verantwoordelijkheid nemen, trots zijn op hun werk en voor langere tijd onderdeel willen zijn van een sterk team.</p>
              ${verder('vacature-verhuizer.html')}
            </div>
          </article>
        </div></div>`;
    moet(kol[0], kaarten);
    // open sollicitatie: brede band onder de twee kolommen (formulier + kaarten), mailadres als link
    const mailtekst = kol[1].trim().replace('info@debresser.nl', '<a href="mailto:info@debresser.nl">info@debresser.nl</a>');
    const band = `
    <div class="vac-mail" data-reveal>
      <span class="vac-mail__icon" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg></span>
      <p>${mailtekst}</p>
    </div>`;
    const start = h.indexOf('<div class="db-twee db-twee--form">');
    const eind = h.indexOf('\n  </div>\n</section>', start);
    if (start < 0 || eind < 0) throw new Error('vacatures.html nabewerking: einde van db-twee niet gevonden');
    h = h.slice(0, eind) + band + h.slice(eind);
    return h;
  },
};

/* ---------- pagina ---------- */
function bouwPagina(liveBestand, slug) {
  uid = 0; // vaste id's per pagina, zodat opnieuw genereren geen onnodige verschillen geeft
  const $ = cheerio.load(fs.readFileSync(liveBestand, 'utf8'));
  const bestand = S.fileFor(slug);
  const titel = tidy($('title').first().text());
  const desc = $('meta[name="description"]').attr('content') || '';
  const root = $('[data-elementor-type="wp-page"],[data-elementor-type="wp-post"],[data-elementor-type="single-post"]').first();
  let top = walk($, root);
  const vindSjabloon = (g) => { while (g && g.type === 'group') { if (g.template) return g; if (g.children.length !== 1) return null; g = g.children[0]; } return null; };
  top = top.flatMap((g) => { const t = vindSjabloon(g); return t ? t.children.flatMap((c) => (c.type === 'group' && !c.children.some((x) => x.type !== 'group') && c.children.length === 1) ? c.children : [c]) : [g]; });

  const jsonld = [];
  const secties = [];
  const knoppenHero = [];
  let hero = null;
  let kruim = null;
  let wissel = 0;
  let wachtKop = '';
  let heeftCta = false;
  let i = 0;
  if (top[0] && top[0].type === 'group' && flatBlocks(top[0]).some((b) => b.type === 'heading') && !flatBlocks(top[0]).some((b) => b.type === 'form')) {
    const f = flatBlocks(top[0]);
    hero = { h: f.find((b) => b.type === 'heading').text, lead: f.filter((b) => b.type === 'text').map((b) => b.html), extra: f.filter((b) => b.type === 'button') };
    i = 1;
  }
  for (; i < top.length; i++) {
    const g = top[i];
    const f = g.type === 'group' ? flatBlocks(g) : [g];
    f.filter((b) => b.type === 'jsonld').forEach((b) => jsonld.push(...b.json));
    const zichtbaar = f.filter((b) => !['jsonld', 'rating', 'social', 'kv'].includes(b.type) && !(b.type === 'image' && b.icon));
    if (!zichtbaar.length) continue;
    if (zichtbaar.every((b) => b.type === 'button' && /^(tel:|mailto:)/.test(b.href || ''))) { knoppenHero.push(...zichtbaar); continue; }
    if (zichtbaar.length === 1 && zichtbaar[0].type === 'crumbs') { kruim = zichtbaar[0].items; continue; }
    if (/Benieuwd wat wij voor/.test(groupText(g))) {
      // kop letterlijk van de live pagina (soms "u", soms "je")
      const kop = flatBlocks(g).find((b) => b.type === 'heading' && /Benieuwd/.test(b.text));
      secties.push(kop ? CTA.trimEnd().split('Benieuwd wat wij voor u kunnen betekenen?').join(esc(kop.text)) : CTA.trimEnd());
      heeftCta = true;
      continue;
    }
    if (f.some((b) => b.type === 'heading' && /Klanten zijn blij met ons/.test(b.text))) {
      const kaarten = [];
      let meer = null;
      while (top[i + 1] && top[i + 1].type === 'group') {
        const nf = flatBlocks(top[i + 1]);
        if (nf.some((b) => b.type === 'rating')) { kaarten.push(top[++i]); continue; }
        const nb = nf.filter((b) => b.type === 'button');
        if (nb.length === 1 && /reviews/i.test(nb[0].text) && nf.length === 1) { meer = nb[0]; i++; continue; }
        break;
      }
      secties.push(reviews(g, kaarten, meer));
      continue;
    }
    const alleenKop = zichtbaar.every((b) => b.type === 'heading' || (b.type === 'text' && b.text.length < 60)) && zichtbaar.some((b) => b.type === 'heading');
    if (alleenKop && top[i + 1]) { wachtKop = `<div class="sectiekop" data-reveal>${flow(zichtbaar)}</div>`; continue; }
    const creme = wissel++ % 2 ? ' sectie--creme2' : '';
    const id = g.id && g.id !== 'aanbod' ? ` id="${esc(g.id)}"` : '';
    const html = g.type === 'group' ? inner(g) : flow([g]);
    secties.push(`<section class="sectie${creme}"${id}>
  <div class="wrap">
    ${wachtKop}${html}
  </div>
</section>`);
    wachtKop = '';
  }
  // CTA-band op elke pagina vlak boven de footer (wens gebruiker, 24 september 2026), ook als de live pagina
  // hem niet heeft; "je" als de pagina de lezer vaker met je/jij aanspreekt dan met u, anders "u"
  if (!heeftCta) secties.push(ctaVoorToon(secties.join(' ') + ' ' + (hero ? hero.lead.join(' ') : '')));

  const foto = heroFoto(bestand);
  const o = ouder(bestand);
  const kruimLijst = [['Home', 'index.html']];
  if (o) kruimLijst.push(o);
  const heroHtml = hero ? `<section class="hero hero--pagina" aria-labelledby="hero-titel">
  ${foto ? `<picture class="hero__bg"><img src="${foto.groot}" srcset="${foto.klein} 960w, ${foto.groot} 1920w" sizes="100vw" width="1920" height="1080" alt="" fetchpriority="high" decoding="async"></picture>` : ''}
  <div class="hero__veil" aria-hidden="true"></div>
  <div class="wrap">
    <div class="hero__content">
      <nav class="pk__kruim" aria-label="Kruimelpad">
        <ol>
          ${kruimLijst.map(([t, h]) => `<li><a href="${h}">${esc(t)}</a></li>`).join('\n          ')}
          <li><span aria-current="page">${esc(hero.h)}</span></li>
        </ol>
      </nav>
      <h1 class="hero__title" id="hero-titel">${esc(hero.h)}</h1>
      ${hero.lead.map((l) => `<div class="hero__lead">${l}</div>`).join('\n      ')}
      ${hero.extra.length || knoppenHero.length ? `<div class="knoprij hero__knoppen">${[...hero.extra, ...knoppenHero].map(knop).join('')}</div>` : ''}
    </div>
  </div>
  <svg class="art-ruit art-ruit--hero" aria-hidden="true"><use href="#i-ruit"/></svg>
</section>` : '';

  const jsonHtml = jsonld.map((j) => `<script type="application/ld+json">\n${j.replace(/https:\/\/www\.debresser\.nl\/wp-content\/uploads\/[^"]*\/([^"/]+)"/g, 'assets/img/site/$1"')}\n</script>`).join('\n');
  const pagina = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(titel)}</title>
${desc ? `<meta name="description" content="${esc(desc)}">\n` : ''}<meta name="theme-color" content="#020D41">
<link rel="icon" href="assets/img/db/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="assets/img/db/apple-touch-icon.png">
<script src="js/main.js"></script>
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/sora-latin.woff2" crossorigin>
<link rel="stylesheet" href="css/style.css">
<link rel="canonical" href="${S.LIVE}/${slug}${slug ? '/' : ''}">
${jsonHtml}
</head>
<body class="subpagina">

${CHROME_TOP}<main id="top" tabindex="-1">

${heroHtml}

${secties.join('\n\n')}

</main>

${CHROME_BOTTOM}</body>
</html>
`;
  return { bestand, pagina };
}

/* ---------- uitvoeren ---------- */
(async () => {
  const bestanden = fs.readdirSync(LIVE_DIR).filter((f) => f.endsWith('.html') && f !== 'home.html');
  const geschreven = [];
  for (const f of bestanden) {
    const slug = f.replace(/\.html$/, '').replace(/__/g, '/');
    const doel = S.fileFor(slug);
    if (only && !only.includes(doel)) continue;
    const { bestand, pagina } = bouwPagina(path.join(LIVE_DIR, f), slug);
    fs.writeFileSync(path.join(DOEL, bestand), NABEWERKING[bestand] ? NABEWERKING[bestand](pagina) : pagina);
    geschreven.push(bestand);
  }
  console.log('pagina\'s:', geschreven.length);

  // hero-foto's uit de repo
  fs.mkdirSync(path.join(DOEL, 'assets/img/page-hero'), { recursive: true });
  for (const n of heroKopie) for (const s of ['', '-960']) {
    const bron = path.join(REPO, 'assets/img/page-hero', n + s + '.webp');
    const doel = path.join(DOEL, 'assets/img/page-hero', n + s + '.webp');
    if (fs.existsSync(bron) && !fs.existsSync(doel)) fs.copyFileSync(bron, doel);
  }
  // beelden: eerst uit de repo, anders van debresser.nl
  let gekopieerd = 0, gedownload = 0;
  for (const [rel, url] of imgQueue) {
    const doel = path.join(DOEL, rel);
    if (fs.existsSync(doel)) continue;
    fs.mkdirSync(path.dirname(doel), { recursive: true });
    const bron = path.join(REPO, rel);
    if (fs.existsSync(bron)) { fs.copyFileSync(bron, doel); gekopieerd++; continue; }
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) { console.warn('beeld mislukt', url, res.status); continue; }
    fs.writeFileSync(doel, Buffer.from(await res.arrayBuffer()));
    gedownload++;
  }
  console.log('beelden gekopieerd:', gekopieerd, 'gedownload:', gedownload);
})().catch((e) => { console.error(e); process.exit(1); });
