/* Bouwt lokale pagina's uit de gedownloade live-HTML van debresser.nl.
   Teksten, links, beelden, formulieren, FAQ's en reviews komen 1-op-1 van de live pagina;
   de opmaak gebruikt de componenten uit css/style.css.

   Gebruik: node build.js <map-met-live-html> <repo-map> [--only=slug,slug] [--force]
   Bestandsnaam live-HTML: pad met "/" vervangen door "__" (home.html voor /).
   Vereist cheerio (NODE_PATH) en sharp voor hero-foto's. */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const S = require('./site.js');
const { svg, P, ruit } = S;

const [liveDir, repo] = process.argv.slice(2);
const args = Object.fromEntries(process.argv.slice(4).map((a) => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const only = args.only ? String(args.only).split(',') : null;

/* Pagina's die met de hand onderhouden worden: niet overschrijven zonder --force */
const HANDMADE = new Set(['index.html', 'diensten-verhuizen.html', 'diensten-opslag.html', 'diensten-meubelprojecten.html', 'diensten-gebouwbeheer.html',
  'diensten-assetmanagement.html', 'duurzame-werkomgeving.html', 'over-ons.html', 'vacatures.html', 'blog.html', 'contact.html', 'offerte.html', 'privacyverklaring.html']);

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const tidy = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const imgQueue = new Map();     // lokaal pad -> live URL
const heroJobs = [];

function localImg(src) {
  if (!src) return '';
  const u = new URL(src, S.LIVE + '/');
  const base = decodeURIComponent(u.pathname.split('/').pop());
  const rel = 'assets/img/site/' + base;
  if (!fs.existsSync(path.join(repo, rel))) imgQueue.set(rel, u.href);
  return rel;
}

/* ---------- inline HTML opschonen ---------- */
function cleanHtml($, el) {
  const $el = $(el).clone();
  $el.find('script,style,noscript,svg,iframe').remove();
  $el.find('*').each((_, n) => {
    const $n = $(n);
    const tag = n.name;
    if (['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'h5', 'h6', 'sup', 'sub', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'blockquote', 'img'].includes(tag)) {
      const keep = {};
      if (tag === 'a') {
        const h = S.localHref($n.attr('href'));
        if (h) keep.href = h; else { $n.replaceWith($n.contents()); return; }
        if (/^https?:/.test(keep.href)) keep.rel = 'noopener';
      }
      if (tag === 'img') { keep.src = localImg($n.attr('src')); keep.alt = $n.attr('alt') || ''; keep.loading = 'lazy'; }
      for (const a of Object.keys(n.attribs || {})) $n.removeAttr(a);
      for (const [k, v] of Object.entries(keep)) $n.attr(k, v);
      if (/^h[2-6]$/.test(tag)) n.name = 'h3';
      if (tag === 'b') n.name = 'strong';
    } else {
      $n.replaceWith($n.contents());
    }
  });
  let html = $el.html() || '';
  html = html.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').replace(/<p>\s*<\/p>/g, '').trim();
  if (!/^<(p|ul|ol|h3|table|blockquote)/.test(html) && html) html = `<p>${html}</p>`;
  return html;
}

/* ---------- live DOM -> tussenvorm ---------- */
function widgetBlock($, w) {
  const $w = $(w);
  const type = ($w.attr('data-widget_type') || '').replace('.default', '');
  const c = $w.find('.elementor-widget-container').first().length ? $w.find('.elementor-widget-container').first() : $w;
  switch (type) {
    case 'heading': {
      const h = c.find('h1,h2,h3,h4,h5,h6,p,div,span').first();
      const tag = h.length && /^h[1-6]$/.test(h[0].name) ? h[0].name : 'h3';
      const a = c.find('a').first();
      return { type: 'heading', level: +tag[1], text: tidy(c.text()), href: a.length ? S.localHref(a.attr('href')) : null };
    }
    case 'text-editor': return { type: 'text', html: cleanHtml($, c), text: tidy(c.text()) };
    case 'button': {
      const a = c.find('a').first();
      const text = tidy(c.find('.elementor-button-text').text() || c.text());
      return text ? { type: 'button', text, href: S.localHref(a.attr('href')) } : null;
    }
    case 'icon-box': {
      const title = tidy(c.find('.elementor-icon-box-title').text());
      const desc = c.find('.elementor-icon-box-description');
      const a = c.find('a[href]').first();
      return { type: 'iconbox', title, desc: desc.length && tidy(desc.text()) ? cleanHtml($, desc) : '', href: a.length ? S.localHref(a.attr('href')) : null };
    }
    case 'image-box': {
      const img = c.find('img').first();
      const a = c.find('a[href]').first();
      const desc = c.find('.elementor-image-box-description');
      return { type: 'imagebox', src: localImg(img.attr('src')), alt: img.attr('alt') || '', title: tidy(c.find('.elementor-image-box-title').text()),
        desc: desc.length && tidy(desc.text()) ? cleanHtml($, desc) : '', href: a.length ? S.localHref(a.attr('href')) : null };
    }
    case 'image': {
      const img = c.find('img').first();
      if (!img.length) return null;
      const src = img.attr('src') || '';
      const a = c.find('a[href]').first();
      return { type: 'image', src: localImg(src), alt: img.attr('alt') || '', icon: /Icoon|icon/i.test(src) && !/\.jpe?g$/i.test(src), svgLogo: /\.svg$/i.test(src),
        href: a.length ? S.localHref(a.attr('href')) : null, caption: tidy(c.find('figcaption').text()) };
    }
    case 'icon-list': return { type: 'list', items: c.find('li').toArray().map((li) => { const a = $(li).find('a[href]').first(); return { text: tidy($(li).text()), href: a.length ? S.localHref(a.attr('href')) : null }; }).filter((i) => i.text) };
    case 'formidable': return formBlock($, c);
    case 'nested-accordion': return { type: 'faq', items: c.find('details.e-n-accordion-item').toArray().map((d) => ({ q: tidy($(d).find('.e-n-accordion-item-title-text').first().text()), a: cleanHtml($, $(d).children('[role=region]').first()) })) };
    case 'pp-advanced-accordion': return { type: 'faq', items: c.find('.pp-accordion-item').toArray().map((d) => ({ q: tidy($(d).find('.pp-accordion-tab-title').first().text()), a: cleanHtml($, $(d).find('.pp-accordion-tab-content').first()) })) };
    case 'html': {
      const raw = c.html() || '';
      const ld = c.find('script[type="application/ld+json"]');
      if (ld.length) return { type: 'jsonld', json: ld.toArray().map((s) => $(s).html().trim()) };
      if (/klantenvertellen/.test(raw)) return { type: 'kv', id: (raw.match(/locationId=(\d+)/) || [])[1] };
      const yt = c.find('iframe').attr('src');
      if (yt) return { type: 'video', src: yt, title: c.find('iframe').attr('title') || 'Video' };
      const txt = tidy(c.text());
      if (/^\s*\{/.test(txt) && /schema\.org/.test(txt)) return { type: 'jsonld', json: [txt] };
      return txt ? { type: 'text', html: cleanHtml($, c), text: txt } : null;
    }
    case 'pp-breadcrumbs': return { type: 'crumbs', items: c.find('li.pp-breadcrumbs-item').toArray().map((e) => tidy($(e).text())).filter(Boolean) };
    case 'pp-timeline': return { type: 'timeline', items: c.find('.pp-timeline-item').toArray().map((it) => ({ year: tidy($(it).find('.pp-timeline-card-date, .pp-timeline-item-date').first().text()), title: tidy($(it).find('.pp-timeline-card-title').first().text()), html: cleanHtml($, $(it).find('.pp-timeline-card-content').first()) })) };
    case 'hotspot': return { type: 'hotspot', img: c.find('img').first().length ? { src: localImg(c.find('img').first().attr('src')), alt: c.find('img').first().attr('alt') || '' } : null, items: c.find('.e-hotspot__tooltip').toArray().map((t) => cleanHtml($, $(t))) };
    case 'rating': return { type: 'rating' };
    case 'social-icons': return { type: 'social', items: c.find('a').toArray().map((a) => ({ href: S.localHref($(a).attr('href')), label: tidy($(a).text()) })) };
    case 'divider': case 'spacer': return null;
    case 'template': return { type: 'group', children: walk($, c), bg: false, template: true };
    default: {
      const txt = tidy(c.text());
      return txt ? { type: 'text', html: cleanHtml($, c), text: txt, unknown: type } : null;
    }
  }
}

function formBlock($, c) {
  const form = c.find('form').first();
  const title = tidy(form.find('legend').first().text());
  const fields = [];
  form.find('.frm_form_field').each((_, f) => {
    const $f = $(f);
    if ($f.hasClass('frm_html_container')) { const h = cleanHtml($, $f); if (tidy($f.text())) fields.push({ kind: 'html', html: h }); return; }
    if ($f.find('input[type=hidden]').length && !$f.find('input:not([type=hidden]),textarea,select').length) return;
    const label = tidy($f.find('.frm_primary_label').first().clone().children('.frm_required').remove().end().text());
    const req = $f.hasClass('frm_required_field');
    const input = $f.find('input:not([type=hidden]),textarea,select').first();
    if (!input.length) return;
    const t = input[0].name === 'input' ? (input.attr('type') || 'text') : input[0].name;
    if (/website|mens/i.test(label) || $f.hasClass('frm_verify')) return;
    const field = { kind: t, label, req, placeholder: input.attr('placeholder') || '', name: input.attr('name') };
    if (t === 'select') field.options = input.find('option').toArray().map((o) => tidy($(o).text())).filter(Boolean);
    if (t === 'radio' || t === 'checkbox') field.options = $f.find('.frm_opt_container label').toArray().map((l) => tidy($(l).text())).filter(Boolean);
    if (t === 'file') { field.desc = tidy($f.find('.frm_description').text()); field.drop = tidy($f.find('.dz-message, .frm_upload_text').first().text()); field.max = tidy($f.find('.frm_small_text').first().text()); }
    fields.push(field);
  });
  const submit = tidy(form.find('.frm_submit button, .frm_submit input[type=submit]').first().text() || form.find('.frm_submit input[type=submit]').attr('value'));
  return { type: 'form', title, fields, submit: submit || 'Verzenden' };
}

function walk($, el) {
  const out = [];
  $(el).children().each((_, ch) => {
    const $c = $(ch);
    const et = $c.attr('data-element_type');
    if (et === 'container' || et === 'section' || et === 'column') {
      const set = JSON.parse($c.attr('data-settings') || '{}');
      const children = walk($, ch);
      if (children.length) out.push({ type: 'group', children, bg: !!set.background_background, grid: /\be-grid\b/.test($c.attr('class') || ''), id: $c.attr('id') || '' });
    } else if ($c.attr('data-widget_type')) {
      const b = widgetBlock($, ch);
      if (b) out.push(b);
    } else {
      out.push(...walk($, ch));
    }
  });
  return out;
}

/* ---------- helpers ---------- */
const flatBlocks = (g) => g.type === 'group' ? g.children.flatMap(flatBlocks) : [g];
const hasType = (g, t) => flatBlocks(g).some((b) => b.type === t);
const groupText = (g) => flatBlocks(g).map((b) => b.text || b.title || '').join(' ');
function unwrap(g) { while (g.type === 'group' && g.children.length === 1 && g.children[0].type === 'group') g = g.children[0]; return g; }

let uid = 0;
const nextId = (p) => `${p}-${++uid}`;

/* ---------- renderers ---------- */
function btnHtml(b, variant) {
  const href = b.href || '#';
  if (/^tel:/.test(href)) return `<a class="chip chip--dark" href="${esc(href)}">${svg(P.phone)}${esc(b.text)}</a>`;
  if (/^mailto:/.test(href)) return `<a class="chip chip--dark" href="${esc(href)}">${svg(P.mail)}${esc(b.text)}</a>`;
  const green = /offerte/i.test(b.text) || variant === 'green';
  const ext = /^https?:/.test(href) ? ' rel="noopener"' : '';
  return `<a class="btn ${green ? 'btn--green' : variant === 'glass' ? 'btn--glass' : 'btn--navy'}" href="${esc(href)}"${ext}>${esc(b.text)} ${svg(P.arrow, 'icon--arrow')}</a>`;
}

function formHtml(f, head) {
  const n = nextId('f');
  const fieldHtml = f.fields.map((fl, i) => {
    const id = `${n}-${i}`;
    const req = fl.req ? ' required' : '';
    const star = fl.req ? '<span class="req" aria-hidden="true">*</span>' : '';
    const full = ['textarea', 'file', 'radio', 'checkbox', 'html'].includes(fl.kind) || /mail/i.test(fl.label) ? ' field--full' : '';
    const dl = `data-label="${esc(fl.label)}"`;
    switch (fl.kind) {
      case 'html': return `            <div class="field field--full form__html">${fl.html}</div>`;
      case 'textarea': return `            <div class="field${full}">\n              <label for="${id}">${esc(fl.label)}${star}</label>\n              <textarea class="textarea" id="${id}" name="${esc(slugName(fl.label))}" ${dl} rows="5" placeholder="${esc(fl.placeholder)}"${req}></textarea>\n            </div>`;
      case 'select': return `            <div class="field${full}">\n              <label for="${id}">${esc(fl.label)}${star}</label>\n              <select class="input select" id="${id}" name="${esc(slugName(fl.label))}" ${dl}${req}>${fl.options.map((o) => `<option>${esc(o)}</option>`).join('')}</select>\n            </div>`;
      case 'radio': case 'checkbox': return `            <fieldset class="fieldset field--full"${fl.req && fl.kind === 'checkbox' ? ' data-required-group' : ''}>\n              <legend>${esc(fl.label)}${star}</legend>\n              <div class="options">\n${fl.options.map((o) => `                <label class="option"><input type="${fl.kind}" name="${esc(slugName(fl.label))}${fl.kind === 'checkbox' ? '[]' : ''}" ${dl} value="${esc(o)}"${fl.kind === 'radio' && fl.req ? ' required' : ''}><span>${esc(o)}</span></label>`).join('\n')}\n              </div>\n            </fieldset>`;
      case 'file': return `            <div class="field field--full">\n              <label for="${id}">${esc(fl.label)}${star}</label>\n              <input class="input" id="${id}" name="bestanden[]" type="file" multiple ${dl}${req}>\n${[fl.drop, fl.max, fl.desc].filter(Boolean).map((t) => `              <span class="small muted">${esc(t)}</span>\n`).join('')}            </div>`;
      default: {
        const type = fl.kind === 'tel' ? 'tel' : fl.kind === 'email' ? 'email' : fl.kind === 'number' ? 'number' : fl.kind === 'date' ? 'date' : 'text';
        const ac = type === 'tel' ? ' autocomplete="tel" pattern="[0-9+()\\s-]{8,}"' : type === 'email' ? ' autocomplete="email"' : /naam/i.test(fl.label) ? ' autocomplete="name"' : '';
        return `            <div class="field${full}">\n              <label for="${id}">${esc(fl.label)}${star}</label>\n              <input class="input" id="${id}" name="${esc(slugName(fl.label))}" ${dl} type="${type}" placeholder="${esc(fl.placeholder)}"${ac}${req}>\n${fl.req ? `              <span class="field__error">${type === 'email' ? 'Vul een geldig e-mailadres in.' : type === 'tel' ? 'Vul een geldig telefoonnummer in.' : 'Vul dit veld in.'}</span>\n` : ''}            </div>`;
      }
    }
  }).join('\n');
  return `<div class="form-card form-3d reveal" data-form3d>
${head || ''}
          <form class="form" data-form="${esc(f.title)}" action="api/verzend.php" method="post"${f.fields.some((x) => x.kind === 'file') ? ' enctype="multipart/form-data"' : ''}>
${fieldHtml}
            <div class="hp" aria-hidden="true">
              <label for="${n}-hp">Indien je een mens bent, laat dit veld leeg:</label>
              <input class="hp-input" id="${n}-hp" name="website_url" type="text" tabindex="-1" autocomplete="off">
            </div>
            <div class="form__foot">
              <button class="btn btn--green" type="submit">${esc(f.submit)}</button>
            </div>
          </form>
          <div class="form-success" role="status" aria-live="polite">
            <span class="icon-tile icon-tile--green">${svg(P.check)}</span>
            <h3 class="h3">Bedankt voor uw bericht!</h3>
            <ul class="check-list" data-summary></ul>
            <div class="actions">
              <a class="btn btn--navy btn--sm" href="mailto:info@debresser.nl" data-mailto hidden aria-label="E-mail">${svg(P.mail)}</a>
            </div>
          </div>
        </div>`;
}
const slugName = (s) => tidy(s).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'veld';

function faqHtml(b) {
  return `<div class="faq reveal-group">
${b.items.map((it) => `        <details class="faq__item card-3d">
          <summary><span>${esc(it.q)}</span>${svg(P.chevron, 'faq__icon')}</summary>
          <div class="faq__a">${it.a}</div>
        </details>`).join('\n')}
      </div>`;
}

/* Rendert een reeks blokken als verticale inhoud (kolom). */
function flow(blocks, ctx = {}) {
  const out = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const next = blocks[i + 1];
    switch (b.type) {
      case 'heading': {
        const lvl = Math.min(Math.max(b.level, 2), 4);
        const tag = `h${lvl === 4 ? 3 : lvl}`;
        const cls = lvl <= 2 ? 'h2' : 'h3';
        const inner = b.href ? `<a href="${esc(b.href)}">${esc(b.text)}</a>` : esc(b.text);
        out.push(`<${tag} class="${cls}">${inner}</${tag}>`);
        break;
      }
      case 'text': {
        if (next && next.type === 'heading' && b.text.length < 45 && !/[.!?]$/.test(b.text)) { out.push(`<p class="eyebrow">${esc(b.text)}</p>`); break; }
        out.push(`<div class="rich">${b.html}</div>`);
        break;
      }
      case 'button': {
        const run = [b];
        while (blocks[i + 1] && blocks[i + 1].type === 'button') run.push(blocks[++i]);
        if (run.length >= 3) out.push(`<ul class="link-grid">${run.map((r) => `<li><a class="link-tile${/offerte/i.test(r.text) ? ' link-tile--green' : ''}" href="${esc(r.href || '#')}">${esc(r.text)} ${svg(P.arrow, 'icon--arrow')}</a></li>`).join('')}</ul>`);
        else out.push(`<div class="actions">${run.map((r) => btnHtml(r, ctx.dark ? 'glass' : '')).join(' ')}</div>`);
        break;
      }
      case 'iconbox': {
        if (!b.title && b.desc) { out.push(`<div class="rich contact-line">${b.desc}</div>`); break; }
        if (!b.desc) { out.push(`<div class="actions">${btnHtml({ text: b.title, href: b.href }, /offerte/i.test(b.title) ? 'green' : '')}</div>`); break; }
        out.push(`<article class="info-panel card-3d" data-tilt="5"><h3>${b.href ? `<a href="${esc(b.href)}">${esc(b.title)}</a>` : esc(b.title)}</h3>${b.desc}</article>`);
        break;
      }
      case 'imagebox': {
        const run = [b];
        while (blocks[i + 1] && blocks[i + 1].type === 'imagebox') run.push(blocks[++i]);
        out.push(imageBoxes(run));
        break;
      }
      case 'image': {
        if (b.icon) break;
        if (b.svgLogo) { out.push(`<img class="logo-img" src="${esc(b.src)}" alt="${esc(b.alt)}" loading="lazy">`); break; }
        const img = `<img src="${esc(b.src)}" alt="${esc(b.alt)}" loading="lazy">`;
        out.push(`<figure class="img-3d" data-tilt="6"><div class="img-3d__frame">${b.href ? `<a href="${esc(b.href)}">${img}</a>` : img}</div>${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`);
        break;
      }
      case 'list': out.push(`<ul class="check-list">${b.items.map((it) => `<li>${it.href ? `<a href="${esc(it.href)}">${esc(it.text)}</a>` : esc(it.text)}</li>`).join('')}</ul>`); break;
      case 'form': {
        const head = ctx.formHead || '';
        out.push(formHtml(b, head));
        break;
      }
      case 'faq': out.push(faqHtml(b)); break;
      case 'video': out.push(`<div class="video-frame img-3d"><div class="img-3d__frame"><iframe src="${esc(b.src)}" title="${esc(b.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>`); break;
      case 'kv': break;
      case 'timeline': out.push(`<ol class="lt-timeline reveal-group">${b.items.map((it) => `<li class="info-panel card-3d"><b class="lt-timeline__year">${esc(it.year)}</b>${it.title ? `<h3>${esc(it.title)}</h3>` : ''}${it.html}</li>`).join('')}</ol>`); break;
      case 'hotspot': if (b.img) out.push(`<figure class="img-3d"><div class="img-3d__frame"><img src="${esc(b.img.src)}" alt="${esc(b.img.alt)}" loading="lazy"></div></figure>`); out.push(`<ul class="loc-list reveal-group">${b.items.map((h) => `<li class="info-panel card-3d">${svg(P.pin)}<div>${h}</div></li>`).join('')}</ul>`); break;
      case 'group': out.push(renderInner(b, ctx)); break;
      default: break;
    }
  }
  return out.join('\n');
}

function imageBoxes(run) {
  return `<ul class="grid-3 ibox-grid reveal-group">${run.map((r) => {
    const title = r.href ? `<a href="${esc(r.href)}">${esc(r.title)}</a>` : esc(r.title);
    return `<li class="ibox card-3d" data-tilt="5">${r.src ? `<div class="ibox__img"><img src="${esc(r.src)}" alt="${esc(r.alt)}" loading="lazy"></div>` : ''}<div class="ibox__body"><h3>${title}</h3>${r.desc}</div></li>`;
  }).join('')}</ul>`;
}

/* Binnen een sectie: groep met kolommen of losse blokken */
function renderInner(g, ctx = {}) {
  g = unwrap(g);
  const kids = g.children;
  const cols = kids.filter((k) => k.type === 'group');
  const widgets = kids.filter((k) => k.type !== 'group');
  // groep met alleen image-boxes in kolommen -> kaartenrij
  if (cols.length >= 2 && cols.every((c) => flatBlocks(c).every((b) => b.type === 'imagebox'))) {
    return flow(widgets.filter((w) => kids.indexOf(w) < kids.indexOf(cols[0])), ctx) + imageBoxes(cols.flatMap(flatBlocks)) + flow(widgets.filter((w) => kids.indexOf(w) > kids.indexOf(cols[cols.length - 1])), ctx);
  }
  // groep met alleen knoppen verdeeld over kolommen -> link-grid
  if (cols.length >= 2 && cols.every((c) => flatBlocks(c).every((b) => b.type === 'button'))) {
    return flow([...widgets.filter((w) => kids.indexOf(w) < kids.indexOf(cols[0])), ...cols.flatMap(flatBlocks)], ctx);
  }
  if (cols.length === 2 && widgets.length === 0) return split(cols[0], cols[1], ctx);
  if (cols.length >= 3 && widgets.length === 0) return cards(cols, ctx);
  return flow(kids, ctx);
}

const isMedia = (g) => { const f = flatBlocks(g); return f.length > 0 && f.every((b) => b.type === 'image' || b.type === 'video') && f.some((b) => (b.type === 'image' && !b.icon) || b.type === 'video'); };

function column(g, ctx) {
  const f = flatBlocks(g);
  if (isMedia(g)) return `<div class="split__media reveal">${flow(f.filter((b) => !b.icon), ctx)}</div>`;
  const formIdx = f.findIndex((b) => b.type === 'form');
  if (formIdx >= 0) {
    // kop + intro die vlak voor het formulier staan horen in de formulierkaart
    const before = f.slice(0, formIdx);
    let headStart = before.length;
    while (headStart > 0 && ['heading', 'text'].includes(before[headStart - 1].type) && before.length - headStart < 2) headStart--;
    const head = before.slice(headStart).map((b) => b.type === 'heading' ? `          <h3 class="h3">${esc(b.text)}</h3>` : `          ${b.html}`).join('\n');
    const rest = before.slice(0, headStart);
    return `<div class="split__form">${rest.length ? flow(rest, ctx) : ''}${flow([f[formIdx]], { ...ctx, formHead: head })}${flow(f.slice(formIdx + 1), ctx)}</div>`;
  }
  const panel = g.bg && f.some((b) => b.type === 'list') && !f.some((b) => b.type === 'image' && !b.icon);
  return `<div class="split__text${panel ? ' info-panel card-3d' : ''} reveal"${panel ? ' data-tilt="5"' : ''}>${flow(g.children, ctx)}</div>`;
}

function split(a, b, ctx) {
  const top = hasType(a, 'form') || hasType(b, 'form') ? ' split--top' : '';
  return `<div class="split${top}">\n        ${column(a, ctx)}\n        ${column(b, ctx)}\n      </div>`;
}

function cards(cols, ctx) {
  return `<div class="grid-3 card-grid reveal-group">${cols.map((c) => {
    const f = flatBlocks(c);
    const h = f.find((b) => b.type === 'heading');
    const m = h && h.text.match(/^(\d+)\.\s*(.+)$/);
    if (m && !f.some((b) => b.type === 'form')) {
      const rest = f.filter((b) => b !== h);
      return `<article class="info-panel card-3d${ctx.dark ? ' card-3d--dark' : ''}" data-tilt="5"><div class="service-card__head"><span class="step__nr">${m[1]}</span><h3>${esc(h.text)}</h3></div>${flow(rest, ctx)}</article>`;
    }
    if (f.some((b) => b.type === 'form')) return `<div class="card-grid__form">${column(c, ctx)}</div>`;
    return `<article class="info-panel card-3d${ctx.dark ? ' card-3d--dark' : ''}" data-tilt="5">${flow(c.children, ctx)}</article>`;
  }).join('\n')}</div>`;
}

/* ---------- vaste secties ---------- */
const STAR = svg(P.star);
function reviewsSection(headGroup, cardGroups, moreBtn) {
  const f = flatBlocks(headGroup);
  const eyebrow = f.find((b) => b.type === 'text');
  const h = f.find((b) => b.type === 'heading');
  const kv = f.filter((b) => b.type === 'kv');
  const reviews = [];
  for (const g of cardGroups) {
    const walkCards = (grp) => {
      const inner = grp.children.filter((c) => c.type === 'group');
      const hasRating = grp.children.some((c) => c.type === 'rating');
      if (hasRating) {
        const meta = inner[0] ? flatBlocks(inner[0]).filter((b) => b.type === 'text').map((b) => b.text) : [];
        const body = grp.children.filter((c) => c.type === 'text');
        reviews.push({ who: meta[0] || '', date: meta[1] || '', html: body.map((b) => b.html).join('') });
      } else inner.forEach(walkCards);
    };
    walkCards(g);
  }
  const hid = nextId('reviews');
  const badges = kv.length ? `
        <div class="score-badges reveal-group">
          ${kv.some((k) => k.id === '1038076') ? '<div class="score glass-dark" data-tilt="8"><span class="score__nr">9</span><span class="score__txt"><b>Klanten waarderen ons bedrijf met een 9</b>Zeker bij Erkende Verhuizers</span></div>' : ''}
          ${kv.some((k) => k.id === '1034815') ? '<div class="score glass-dark" data-tilt="8"><span class="score__nr">8,2</span><span class="score__txt"><b>Klantwaardering</b>Erkende Projectverhuizers</span></div>' : ''}
        </div>` : '';
  const iso = (d) => { const m = d.match(/(\d{1,2})-(\d{1,2})-(\d{4})/); return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : ''; };
  return `  <section class="section section--navy" aria-labelledby="${hid}">
    ${ruit('bg-ruit--tr')}
    <div class="wrap">
      <div class="section-head reveal">
        <div class="section-head__text">
          ${eyebrow ? `<p class="eyebrow">${esc(eyebrow.text)}</p>` : ''}
          <h2 class="h2" id="${hid}">${esc(h ? h.text : '')}</h2>
        </div>${badges}
      </div>
      <ul class="reviews reveal-group">
${reviews.map((r) => `        <li class="review card-3d card-3d--dark" data-tilt="6">
          <div class="review__top">
            <span class="review__who"><span class="review__avatar" aria-hidden="true">${esc((r.who.trim()[0] || '').toUpperCase())}</span>${esc(r.who)}</span>
            <time datetime="${iso(r.date)}">${esc(r.date)}</time>
          </div>
          <span class="stars" role="img" aria-label="Waardering 5 van 5">${STAR.repeat(5)}</span>
          <blockquote>${r.html}</blockquote>
        </li>`).join('\n')}
      </ul>
${moreBtn ? `      <div class="reviews-more reveal">
        <a class="btn btn--glass" href="reviews.html">${esc(moreBtn.text)} ${svg(P.arrow, 'icon--arrow')}</a>
      </div>` : ''}
    </div>
  </section>`;
}

function ctaSection(g) {
  const h = flatBlocks(g).find((b) => b.type === 'heading');
  const btn = flatBlocks(g).find((b) => b.type === 'iconbox' || b.type === 'button');
  const img = flatBlocks(g).find((b) => b.type === 'image');
  return `  <section class="cta-band" aria-labelledby="cta-title">
    <div class="wrap">
      <div class="cta" data-tilt="3">
        <div class="cta__person" aria-hidden="true">
          <img src="${esc(img ? img.src : 'assets/img/site/De-Bresser-Transport-Contact-e1711724004960.png')}" alt="" loading="lazy">
        </div>
        <div class="cta__body">
          <div>
            <h2 id="cta-title">${esc(h.text)}</h2>
            <div class="cta__icons">
              <a class="cta__icon" href="tel:0031135282372" aria-label="Bel +31 (0)13 52 82 372">${svg(P.phone)}</a>
              <a class="cta__icon" href="mailto:info@debresser.nl" aria-label="Mail info@debresser.nl">${svg(P.mail)}</a>
              <a class="cta__icon" href="https://maps.app.goo.gl/fiTtYM83db5SjHLLA" target="_blank" rel="noopener" aria-label="Route naar De Bresser in Google Maps">${svg(P.pin)}</a>
            </div>
          </div>
          <a class="btn btn--navy" href="contact.html">${esc(btn ? (btn.title || btn.text) : 'Neem contact op')} ${svg(P.arrow, 'icon--arrow')}</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- hero-foto ---------- */
const BEELDBANK = path.join(repo, 'assets/img/ai-beelden/debresser-beeldbank');
function beeldbankFiles() {
  const list = [];
  for (const d of fs.readdirSync(BEELDBANK)) { const p = path.join(BEELDBANK, d); if (fs.statSync(p).isDirectory()) for (const f of fs.readdirSync(p)) if (/\.jpe?g$/i.test(f)) list.push(path.join(p, f)); }
  return list;
}
const BB = beeldbankFiles();
const bb = (prefix) => BB.filter((f) => path.basename(f).startsWith(prefix + '-')).sort();
function heroFor(file, liveSlug) {
  const base = file.replace(/\.html$/, '');
  const rel = `assets/img/page-hero/${base}.webp`;
  if (fs.existsSync(path.join(repo, rel))) return rel;
  const last = liveSlug.split('/').pop();
  const hash = [...base].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  let pool = bb(last);
  if (!pool.length) {
    if (/^verhuisbedrijf-|^(breda|tilburg|roosendaal|bergen-op-zoom)$/.test(last)) pool = [...bb('verhuisbedrijf-tilburg'), ...bb('verhuisbedrijf-oisterwijk'), ...bb('breda'), ...bb('particuliere-verhuizing'), ...bb('verhuizen')];
    if (/^opslagruimte-/.test(last)) pool = [...bb('opslag'), ...bb('particuliere-opslag'), ...bb('zakelijke-opslag')];
    if (/engeland|duitsland|frankrijk|zwitserland|belgie|brussel|europa|benelux/.test(last)) pool = [...bb('verhuisbedrijf-europa'), ...bb('zwitserland'), ...bb('internationale-verhuizing')];
    if (/verhuisbedrijf-europa|verhuisbedrijf-belgie/.test(last)) pool = [...bb('verhuisbedrijf-europa'), ...bb('internationale-verhuizing')];
    if (/kantoor|winkel|verhuisservice-zakelijk/.test(last)) pool = [...bb('kantoor-verhuizen'), ...bb('zakelijke-verhuizing')];
    if (/groupage|logistiek/.test(last)) pool = [...bb('logistiek-full-service'), ...bb('meubeltransport')];
    if (/handyman|quick-scan/.test(last)) pool = [...bb('onderhoud'), ...bb('huismeester'), ...bb('meubelmontage')];
    if (/tekenbonus|vacature/.test(last)) pool = bb('overzicht-vacatures');
    if (/faq/.test(last)) pool = [...bb('contact'), ...bb('offerte')];
    if (!pool.length) pool = [...bb('verhuizen'), ...bb('home')];
  }
  const src = pool[hash % pool.length];
  heroJobs.push({ src, out: path.join(repo, rel) });
  return rel;
}

/* ---------- pagina ---------- */
function buildPage(liveFile, liveSlug) {
  const html = fs.readFileSync(liveFile, 'utf8');
  const $ = cheerio.load(html);
  const file = S.fileFor(liveSlug);
  const title = tidy($('title').first().text());
  const desc = $('meta[name="description"]').attr('content') || '';
  const root = $('[data-elementor-type="wp-page"],[data-elementor-type="wp-post"],[data-elementor-type="single-post"]').first();
  let top = walk($, root);
  // pagina's die alleen een Elementor-sjabloon insluiten: sjabloon uitpakken
  const findTpl = (g) => { while (g && g.type === 'group') { if (g.template) return g; if (g.children.length !== 1) return null; g = g.children[0]; } return null; };
  top = top.flatMap((g) => { const t = findTpl(g); return t ? t.children.flatMap((c) => (c.type === 'group' && !c.children.some((x) => x.type !== 'group') && c.children.length === 1) ? c.children : [c]) : [g]; });
  const jsonld = [];
  const sections = [];
  let hero = null;
  const chips = [];
  let crumbs = null;
  let alt = 0;

  let i = 0;
  // hero = eerste groep met kop
  if (top[0] && top[0].type === 'group' && flatBlocks(top[0]).some((b) => b.type === 'heading') && !flatBlocks(top[0]).some((b) => b.type === 'form')) {
    const f = flatBlocks(top[0]);
    hero = { h: f.find((b) => b.type === 'heading').text, lead: f.filter((b) => b.type === 'text').map((b) => b.text) };
    i = 1;
  }
  for (; i < top.length; i++) {
    const g = top[i];
    const f = g.type === 'group' ? flatBlocks(g) : [g];
    f.filter((b) => b.type === 'jsonld').forEach((b) => jsonld.push(...b.json));
    const visible = f.filter((b) => !['jsonld', 'rating', 'social'].includes(b.type) && !(b.type === 'image' && b.icon));
    if (!visible.length && !f.some((b) => b.type === 'kv')) continue;
    // telefoon/mail-knoppen onder de hero
    if (visible.every((b) => b.type === 'button' && /^(tel:|mailto:)/.test(b.href || ''))) { chips.push(...visible); continue; }
    if (visible.length === 1 && visible[0].type === 'crumbs') { crumbs = visible[0].items; continue; }
    const txt = groupText(g);
    if (/Benieuwd wat wij voor/.test(txt)) { sections.push(ctaSection(g)); continue; }
    if (f.some((b) => b.type === 'heading' && /Klanten zijn blij met ons/.test(b.text))) {
      const cardsG = [];
      let more = null;
      while (top[i + 1] && top[i + 1].type === 'group') {
        const nf = flatBlocks(top[i + 1]);
        if (nf.some((b) => b.type === 'rating')) { cardsG.push(top[++i]); continue; }
        const nb = nf.filter((b) => b.type === 'button');
        if (nb.length === 1 && /reviews/i.test(nb[0].text) && nf.length === 1) { more = nb[0]; i++; continue; }
        break;
      }
      sections.push(reviewsSection(g, cardsG, more));
      continue;
    }
    // gewone sectie
    const cls = alt++ % 2 ? 'section section--mist' : 'section';
    const hasFaq = f.some((b) => b.type === 'faq');
    const inner = g.type === 'group' ? renderInner(g) : flow([g]);
    const id = g.id && g.id !== 'aanbod' ? ` id="${esc(g.id)}"` : '';
    const deco = alt % 3 === 0 ? ruit(alt % 2 ? 'bg-ruit--bl' : 'bg-ruit--tr') : '';
    sections.push(`  <section class="${cls}${hasFaq ? ' faq-section' : ''}"${id}>
    ${deco}
    <div class="wrap${hasFaq ? ' wrap--narrow' : ''} flow-section">
      ${inner}
    </div>
  </section>`);
  }

  const heroImg = heroFor(file, liveSlug);
  const heroBase = heroImg.replace(/\.webp$/, '');
  const crumbHtml = crumbs && crumbs.length ? `<nav class="crumbs" aria-label="Kruimelpad">${crumbs.map((c, k) => {
    if (k === crumbs.length - 1) return `<span aria-current="page">${esc(c)}</span>`;
    const href = k === 0 ? 'index.html' : (S.MENU.find((m) => m.title === c) || {}).href || '#';
    return `<a href="${href}">${esc(c)}</a>${svg(P.chevronRight)}`;
  }).join('')}</nav>` : '';

  const heroHtml = hero ? `  <section class="page-hero page-hero--compact page-hero--photo" aria-labelledby="page-title">
    <div class="page-hero__bg" aria-hidden="true"><img src="${heroImg}" srcset="${heroBase}-960.webp 960w, ${heroImg} 1920w" sizes="100vw" alt="" width="1920" height="1080" fetchpriority="high" decoding="async"></div>
    ${ruit('bg-ruit--tr')}
    <div class="wrap page-hero__grid">
      <div class="page-hero__copy">
        ${crumbHtml}
        <h1 class="h1" id="page-title">${esc(hero.h)}</h1>
${hero.lead.map((l) => `        <p class="lead">${esc(l)}</p>`).join('\n')}
${chips.length ? `        <div class="chips">\n          ${chips.map((c) => btnHtml(c)).join('\n          ')}\n        </div>` : ''}
      </div>
    </div>
  </section>` : '';

  const page = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
${desc ? `  <meta name="description" content="${esc(desc)}">\n` : ''}  <meta name="theme-color" content="#0f2c59">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="preload" href="assets/fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="css/style.css">
${jsonld.map((j) => `  <script type="application/ld+json">\n${j.replace(/https:\/\/www\.debresser\.nl\/wp-content\/uploads\/[^"]*\/([^"/]+)"/g, 'assets/img/site/$1"')}\n  </script>`).join('\n')}
</head>
<body class="page-live">

<a class="skip-link" href="#inhoud">Ga naar de inhoud</a>

<!-- Pagina gegenereerd uit ${S.LIVE}/${liveSlug}${liveSlug ? '/' : ''} met docs/tools/live-sync/build.js -->
${S.header(file)}

<main id="inhoud">

${heroHtml}

${sections.join('\n\n')}
</main>

${S.footer()}

<script src="js/main.js" defer></script>
</body>
</html>
`;
  return { file, page };
}

/* ---------- uitvoeren ---------- */
async function main() {
  const files = fs.readdirSync(liveDir).filter((f) => f.endsWith('.html'));
  const written = [];
  for (const f of files) {
    const slug = f === 'home.html' ? '' : f.replace(/\.html$/, '').replace(/__/g, '/');
    const target = S.fileFor(slug);
    if (only && !only.includes(slug) && !only.includes(target)) continue;
    if (HANDMADE.has(target) && !args.force) continue;
    const { file, page } = buildPage(path.join(liveDir, f), slug);
    const outDir = args.out || repo;
    fs.writeFileSync(path.join(outDir, file), page);
    written.push(file);
  }
  console.log('pagina\'s geschreven:', written.length);

  // ontbrekende beelden downloaden
  for (const [rel, url] of imgQueue) {
    const out = path.join(repo, rel);
    if (fs.existsSync(out)) continue;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) { console.warn('beeld mislukt', url, res.status); continue; }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
    console.log('beeld', rel);
  }
  // hero-foto's
  if (heroJobs.length) {
    const sharp = require(process.env.SHARP_PATH || 'sharp');
    const done = new Set();
    for (const j of heroJobs) {
      if (done.has(j.out) || fs.existsSync(j.out)) continue;
      done.add(j.out);
      await sharp(j.src).resize(1920, 1080, { fit: 'cover' }).webp({ quality: 78 }).toFile(j.out);
      await sharp(j.src).resize(960, 540, { fit: 'cover' }).webp({ quality: 76 }).toFile(j.out.replace(/\.webp$/, '-960.webp'));
      console.log('hero', path.basename(j.out), '<-', path.basename(j.src));
    }
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
