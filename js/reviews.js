/* =====================================================================
   De Bresser · Reviewpagina
   Zoeken, filteren (cijfer, plaats, dienst, thema, verbeterpunt),
   sorteren, "meer tonen" en kolommen zonder gaten (masonry).
   Zonder JavaScript staan alle reviews gewoon in een raster.
   ===================================================================== */
(function () {
  'use strict';

  var list = document.querySelector('[data-list]');
  var form = document.querySelector('.rv-toolbar');
  if (!list || !form) return;

  var PAGE = 12;
  var THEMES = {
    'vriendelijk': 'vriendelijk|aardig|behulpzaam|beleefd|gezellig|humeur',
    'afspraken': 'afspra',
    'snel': 'snel|effici|vlot|voortvarend',
    'zorgvuldig': 'zorgvuldig|voorzichtig|netjes|keurig|zorg ',
    'op-tijd': 'op tijd|tijdstip|afgesproken tijd|punctueel|stipt',
    'communicatie': 'communicatie|gebeld|bereikbaar|contact',
    'professioneel': 'professioneel|vakkundig|vakmanschap|deskundig|ervaren',
    'lift': 'lift'
  };
  var SVC_LABEL = { 'De- en montage meubelstukken': 'De- en montage', 'In- uitpakservice': 'In- en uitpakservice', 'Handymanservice': 'Handyman' };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var cards = Array.prototype.slice.call(list.querySelectorAll('.rv-card'));
  cards.forEach(function (card) {
    var title = card.querySelector('.rv-card__title');
    var text = card.querySelector('.rv-card__text');
    card._title = title.textContent;
    card._text = text.innerHTML.split('<br>').map(decode).join('\n');
    card._hay = (card._title + ' ' + card._text + ' ' + card.dataset.city).toLowerCase();
  });

  var state = { q: '', city: '', svc: '', sort: 'new', score: '', theme: '', tip: false, shown: PAGE };

  var els = {
    q: form.elements.q,
    city: form.elements.city,
    svc: form.elements.svc,
    sort: form.elements.sort,
    tip: form.elements.tip,
    count: document.querySelector('[data-count]'),
    countLabel: document.querySelector('[data-count-label]'),
    active: document.querySelector('[data-active]'),
    empty: document.querySelector('[data-empty]'),
    more: document.querySelector('[data-loadmore]'),
    shown: document.querySelector('[data-shown]'),
    total: document.querySelector('[data-total]'),
    progress: document.querySelector('[data-progress]')
  };

  function decode(html) {
    var t = document.createElement('textarea');
    t.innerHTML = html;
    return t.value;
  }
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  /* ---------- Filteren en sorteren ---------- */
  function matchRe() {
    var parts = [];
    if (state.q) parts.push(escapeRe(state.q));
    if (state.theme) parts.push(THEMES[state.theme]);
    return parts.length ? parts : null;
  }

  function matches(card) {
    var d = card.dataset;
    var s = +d.score;
    if (state.score === 'low' && s > 7) return false;
    if (state.score && state.score !== 'low' && s !== +state.score) return false;
    if (state.city && d.city !== state.city) return false;
    if (state.svc && d.svc.split('|').indexOf(state.svc) < 0) return false;
    if (state.tip && d.tip !== '1') return false;
    if (state.theme && (' ' + d.themes + ' ').indexOf(' ' + state.theme + ' ') < 0) return false;
    if (state.q && card._hay.indexOf(state.q.toLowerCase()) < 0) return false;
    return true;
  }

  var sorters = {
    'new': function (a, b) { return a.dataset.date < b.dataset.date ? 1 : -1; },
    'old': function (a, b) { return a.dataset.date > b.dataset.date ? 1 : -1; },
    'high': function (a, b) { return b.dataset.score - a.dataset.score || sorters['new'](a, b); },
    'low': function (a, b) { return a.dataset.score - b.dataset.score || sorters['new'](a, b); },
    'long': function (a, b) { return b.dataset.len - a.dataset.len; }
  };

  function highlight(card, res) {
    var title = card.querySelector('.rv-card__title');
    var text = card.querySelector('.rv-card__text');
    var t = escapeHtml(card._title);
    var b = escapeHtml(card._text);
    if (res) {
      res.forEach(function (src) {
        var re = new RegExp('(' + src + ')', 'gi');
        t = t.replace(re, '<mark>$1</mark>');
        b = b.replace(re, '<mark>$1</mark>');
      });
    }
    title.innerHTML = t;
    text.innerHTML = b.replace(/\n+/g, '<br>');
  }

  /* ---------- Kolommen ---------- */
  var colCount = 0;
  function columnsFor() {
    var w = list.clientWidth;
    return w >= 960 ? 3 : w >= 600 ? 2 : 1;
  }

  function render(opts) {
    opts = opts || {};
    var res = matchRe();
    var hits = cards.filter(matches).sort(sorters[state.sort]);
    var visible = hits.slice(0, state.shown);
    var prevShown = opts.prevShown || 0;

    cards.forEach(function (c) { c.hidden = true; c.classList.remove('is-new'); });

    // Kolommen opnieuw vullen: elke kaart naar de kortste kolom
    var n = columnsFor();
    colCount = n;
    list.classList.add('is-masonry');
    var cols = [];
    list.textContent = '';
    for (var i = 0; i < n; i++) {
      var col = document.createElement('div');
      col.className = 'rv-col';
      list.appendChild(col);
      cols.push(col);
    }
    visible.forEach(function (card, idx) {
      highlight(card, res);
      card.hidden = false;
      if (opts.animate && idx >= prevShown && !reduceMotion.matches) card.classList.add('is-new');
      var shortest = cols[0];
      for (var j = 1; j < cols.length; j++) if (cols[j].offsetHeight < shortest.offsetHeight) shortest = cols[j];
      shortest.appendChild(card);
    });
    // Verborgen kaarten bewaren in de DOM (voor ankers)
    cards.forEach(function (c) { if (c.hidden) cols[0].appendChild(c); });

    els.count.textContent = hits.length;
    els.countLabel.textContent = hits.length === 1 ? 'review' : 'reviews';
    els.empty.hidden = hits.length > 0;
    els.more.hidden = hits.length <= visible.length;
    els.shown.textContent = visible.length;
    els.total.textContent = hits.length;
    els.progress.style.width = (hits.length ? visible.length / hits.length * 100 : 0) + '%';

    renderActive();
    syncButtons();
    updateClamps();
  }

  /* ---------- Actieve filters als chips ---------- */
  var X = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  function renderActive() {
    var items = [];
    if (state.q) items.push(['q', '"' + state.q + '"']);
    if (state.score) items.push(['score', state.score === 'low' ? 'Cijfer 7 en lager' : 'Cijfer ' + state.score]);
    if (state.theme) {
      var btn = document.querySelector('.rv-theme[data-theme="' + state.theme + '"]');
      items.push(['theme', btn ? btn.firstChild.textContent.trim() : state.theme]);
    }
    if (state.city) items.push(['city', state.city]);
    if (state.svc) items.push(['svc', SVC_LABEL[state.svc] || state.svc]);
    if (state.tip) items.push(['tip', 'Met verbeterpunt']);

    els.active.innerHTML = items.map(function (it) {
      return '<button type="button" data-clear="' + it[0] + '" aria-label="Filter ' + escapeHtml(it[1]) + ' verwijderen">' + escapeHtml(it[1]) + X + '</button>';
    }).join('');
    document.querySelectorAll('[data-reset]').forEach(function (b) {
      if (b.classList.contains('rv-reset')) b.hidden = items.length === 0;
    });
  }

  function syncButtons() {
    form.querySelectorAll('[data-score]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.score === state.score));
    });
    document.querySelectorAll('.rv-theme').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.theme === state.theme));
    });
    if (els.q.value !== state.q) els.q.value = state.q;
    els.city.value = state.city;
    els.svc.value = state.svc;
    els.sort.value = state.sort;
    els.tip.checked = state.tip;
  }

  /* ---------- "Lees verder" alleen tonen als de tekst echt is afgekapt ---------- */
  function updateClamps() {
    cards.forEach(function (card) {
      if (card.hidden) return;
      var btn = card.querySelector('.rv-more');
      var body = card.querySelector('.rv-card__body');
      if (!btn || btn.getAttribute('aria-expanded') === 'true') return;
      var text = body.querySelector('.rv-card__text');
      btn.hidden = text.scrollHeight <= text.clientHeight + 2;
    });
  }

  function set(changes, keepPage) {
    for (var k in changes) state[k] = changes[k];
    if (!keepPage) state.shown = PAGE;
    render();
  }

  /* ---------- Gebeurtenissen ---------- */
  var typing;
  els.q.addEventListener('input', function () {
    clearTimeout(typing);
    typing = setTimeout(function () { set({ q: els.q.value.trim() }); }, 180);
  });
  els.city.addEventListener('change', function () { set({ city: els.city.value }); });
  els.svc.addEventListener('change', function () { set({ svc: els.svc.value }); });
  els.sort.addEventListener('change', function () { set({ sort: els.sort.value }); });
  els.tip.addEventListener('change', function () { set({ tip: els.tip.checked }); });

  form.addEventListener('click', function (e) {
    var b = e.target.closest('[data-score]');
    if (b) set({ score: b.dataset.score });
  });

  function scrollToList() {
    var target = document.getElementById('alle-reviews');
    target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }

  document.addEventListener('click', function (e) {
    var dist = e.target.closest('[data-set-score]');
    if (dist) {
      var s = dist.dataset.setScore;
      set({ score: s });
      scrollToList();
      return;
    }
    var theme = e.target.closest('.rv-theme');
    if (theme) {
      var inSummary = !!theme.closest('#samenvatting');
      set({ theme: state.theme === theme.dataset.theme ? '' : theme.dataset.theme });
      if (inSummary && state.theme) scrollToList();
      return;
    }
    var clear = e.target.closest('[data-clear]');
    if (clear) {
      var key = clear.dataset.clear;
      var reset = {};
      reset[key] = key === 'tip' ? false : '';
      set(reset);
      return;
    }
    if (e.target.closest('[data-reset]')) {
      set({ q: '', city: '', svc: '', score: '', theme: '', tip: false });
      return;
    }
    var more = e.target.closest('[data-more]');
    if (more) {
      var prev = state.shown;
      state.shown += PAGE;
      render({ animate: true, prevShown: prev });
      return;
    }
    var read = e.target.closest('.rv-more');
    if (read) {
      var body = read.parentNode.querySelector('.rv-card__body');
      var open = read.getAttribute('aria-expanded') === 'true';
      body.classList.toggle('is-clamped', open);
      read.setAttribute('aria-expanded', String(!open));
      read.firstChild.textContent = open ? 'Lees verder ' : 'Minder tonen ';
    }
  });

  // Kolommen opnieuw indelen bij andere breedte
  var resizeT;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      if (columnsFor() !== colCount) render();
      else updateClamps();
    }, 150);
  });

  // Uitklappen verandert de hoogte: niets opnieuw indelen, dat zou kaarten laten verspringen
  // Link naar een review (reviews.html#r12): zorg dat hij zichtbaar is
  function openHash() {
    var id = location.hash.slice(1);
    if (!/^r\d+$/.test(id)) return false;
    var card = document.getElementById(id);
    if (!card) return false;
    var hits = cards.filter(matches).sort(sorters[state.sort]);
    var pos = hits.indexOf(card);
    if (pos >= state.shown) state.shown = Math.ceil((pos + 1) / PAGE) * PAGE;
    render();
    card.scrollIntoView({ block: 'center' });
    return true;
  }

  if (!openHash()) render();
  window.addEventListener('hashchange', openHash);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { render(); });
})();
