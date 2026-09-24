/* Parser: zet live Elementor-HTML van debresser.nl om in blokken.
   Overgenomen uit github.com/OranjeLift-Tech/debresser docs/tools/live-sync/build.js (ongewijzigd).
   Alleen localImg is aangepast: plaatjes worden hier alleen geregistreerd. */
const fs = require('fs');
const path = require('path');
const S = require('./site.js');
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const tidy = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const imgQueue = new Map();     // lokaal pad -> live URL
const heroJobs = [];

function localImg(src) {
  if (!src) return '';
  const u = new URL(src, S.LIVE + '/');
  const base = decodeURIComponent(u.pathname.split('/').pop());
  const rel = 'assets/img/site/' + base;
  imgQueue.set(rel, u.href);
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
  const type = ($w.attr('data-widget_type') || '').split('.')[0];
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
    /* Toegevoegd voor het nieuwe project: berichtenlijsten (blog, vacatures) en het team op over-ons */
    case 'loop-grid': case 'loop-carousel': {
      const items = c.find('.e-loop-item').toArray().map((it) => {
        const $it = $(it);
        const img = $it.find('img').first();
        const a = $it.find('a[href]').first();
        return {
          title: tidy($it.find('.elementor-image-box-title, h1, h2, h3, h4').first().text()),
          href: a.length ? S.localHref(a.attr('href')) : null,
          src: img.length ? localImg(img.attr('src')) : '',
          alt: img.attr('alt') || '',
          desc: tidy($it.find('.elementor-image-box-description').first().text()),
          meer: tidy($it.find('.elementor-icon-box-title, .elementor-button-text').first().text()),
        };
      }).filter((x) => x.title);
      const pag = c.find('.page-numbers').toArray().map((p) => ({ text: tidy($(p).clone().find('.elementor-screen-only').remove().end().text()), href: $(p).attr('href') ? S.localHref($(p).attr('href')) : null, current: $(p).hasClass('current') }));
      return items.length ? { type: 'posts', items, pag } : null;
    }
    case 'posts': {
      const items = c.find('article').toArray().map((it) => {
        const $it = $(it);
        const img = $it.find('.elementor-post__thumbnail img').first();
        const a = $it.find('.elementor-post__title a').first();
        return { title: tidy(a.text()), href: a.length ? S.localHref(a.attr('href')) : null, src: img.length ? localImg(img.attr('src')) : '', alt: img.attr('alt') || '',
          desc: tidy($it.find('.elementor-post__excerpt').text()), meer: tidy($it.find('.elementor-post__read-more').text()) };
      }).filter((x) => x.title);
      return items.length ? { type: 'posts', items, pag: [] } : null;
    }
    case 'pp-team-member-carousel': {
      const items = c.find('.pp-tm').toArray().map((it) => {
        const $it = $(it);
        const img = $it.find('.pp-tm-image img').first();
        return { naam: tidy($it.find('.pp-tm-name').text()), functie: tidy($it.find('.pp-tm-position').text()), tekst: tidy($it.find('.pp-tm-description').text()),
          src: img.length ? localImg(img.attr('src')) : '', alt: img.attr('alt') || '' };
      }).filter((x) => x.naam);
      return items.length ? { type: 'team', items } : null;
    }
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
module.exports = { esc, tidy, imgQueue, cleanHtml, widgetBlock, formBlock, walk };
