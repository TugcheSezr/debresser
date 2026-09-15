/* =====================================================================
   De Bresser · interactie voor alle pagina's
   01 Header na scrollen
   02 Mega menu Diensten (hover, klik, toetsenbord)
   03 Mobiel menu
   04 Wisselend woord in de hero
   05 3D-tilt en lichtreflectie op kaarten
   06 Scroll-reveal
   07 Actieve link in de aanbod-navigatie
   08 Formulieren: validatie, voorwaardelijke velden, verzenden
   09 Jaartal in de footer
   10 Hero met filmpjes (homepage), 10b hero met YouTube-film
   11 Werkwijze: verhuiswagen langs de stappen (homepage)
   12 Werkwijze: grote vrachtwagen rijdt alleen als hij in beeld is
   ===================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var desktop = window.matchMedia('(min-width: 1024px)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var header = document.querySelector('.header');

  /* ---------- 01 Header na scrollen ---------- */
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 02 Mega menu ---------- */
  var megaItem = document.querySelector('.has-mega');
  var megaBtn = megaItem ? megaItem.querySelector('.menu__link') : null;
  var closeTimer = null;
  var hoverOpenedAt = 0;

  function setMega(open) {
    if (!megaItem) return;
    megaItem.classList.toggle('is-open', open);
    megaBtn.setAttribute('aria-expanded', String(open));
  }

  if (megaItem && megaBtn) {
    megaBtn.addEventListener('click', function () {
      var isOpen = megaBtn.getAttribute('aria-expanded') === 'true';
      if (isOpen && desktop.matches && Date.now() - hoverOpenedAt < 450) return;
      setMega(!isOpen);
    });
    megaItem.addEventListener('mouseenter', function () {
      if (!desktop.matches) return;
      clearTimeout(closeTimer);
      if (megaBtn.getAttribute('aria-expanded') !== 'true') {
        hoverOpenedAt = Date.now();
        setMega(true);
      }
    });
    megaItem.addEventListener('mouseleave', function () {
      if (!desktop.matches) return;
      closeTimer = setTimeout(function () { setMega(false); }, 220);
    });
    megaItem.addEventListener('focusout', function (e) {
      if (desktop.matches && !megaItem.contains(e.relatedTarget)) setMega(false);
    });
    document.addEventListener('click', function (e) {
      if (desktop.matches && !megaItem.contains(e.target)) setMega(false);
    });
  }

  /* ---------- 03 Mobiel menu ---------- */
  var burger = document.querySelector('.burger');
  var bar = document.querySelector('.header__bar');

  function setMenu(open) {
    if (!header || !burger) return;
    if (open && bar) root.style.setProperty('--drawer-top', (bar.getBoundingClientRect().bottom + 10) + 'px');
    header.classList.toggle('is-menu-open', open);
    root.classList.toggle('no-scroll', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    if (!open) setMega(false);
  }
  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
  }
  /* Een ankerlink in het mobiele menu sluit het menu */
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { if (!desktop.matches) setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (header && header.classList.contains('is-menu-open')) { setMenu(false); burger.focus(); }
    else if (megaItem && megaItem.classList.contains('is-open')) { setMega(false); megaBtn.focus(); }
  });
  desktop.addEventListener('change', function () { setMega(false); setMenu(false); });

  /* ---------- 04 Wisselend woord ---------- */
  var rotate = document.querySelector('[data-rotate]');
  if (rotate) {
    var words = rotate.children;
    var index = 0;
    var timer = null;
    var next = function () {
      var current = words[index];
      current.classList.remove('is-active');
      current.classList.add('is-leaving');
      index = (index + 1) % words.length;
      words[index].classList.remove('is-leaving');
      words[index].classList.add('is-active');
      setTimeout(function () { current.classList.remove('is-leaving'); }, 520);
    };
    var start = function () {
      clearInterval(timer);
      timer = null;
      if (!reduceMotion.matches && !document.hidden) timer = setInterval(next, 2600);
    };
    start();
    document.addEventListener('visibilitychange', start);
  }

  /* ---------- 05 3D-tilt ---------- */
  function bindTilt(el) {
    var max = parseFloat(el.getAttribute('data-tilt')) || 8;
    var raf = null;
    el.addEventListener('pointermove', function (e) {
      if (!finePointer.matches || reduceMotion.matches) return;
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        el.style.setProperty('--ry', ((px - .5) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((.5 - py) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
    });
    el.addEventListener('pointerleave', function () {
      if (raf) cancelAnimationFrame(raf);
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }
  document.querySelectorAll('[data-tilt]').forEach(bindTilt);

  /* ---------- 06 Scroll-reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-group');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-visible');
        io.unobserve(el);
        if (el.classList.contains('reveal-group')) {
          setTimeout(function () { el.classList.add('is-done'); }, 1400);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible', 'is-done'); });
  }

  /* ---------- 07 Aanbod-navigatie ---------- */
  var subLinks = Array.prototype.slice.call(document.querySelectorAll('.subnav a[href^="#"]'));
  if (subLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    subLinks.forEach(function (a) {
      var target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) map[target.id] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || !map[entry.target.id]) return;
        subLinks.forEach(function (a) { a.classList.remove('is-active'); });
        map[entry.target.id].classList.add('is-active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { spy.observe(document.getElementById(id)); });
  }

  /* ---------- 08 Formulieren ---------- */
  var EMAIL = 'info@debresser.nl';
  var ENDPOINT = 'api/verzend.php';

  /* Velden die alleen zichtbaar zijn bij een bepaalde keuze: data-show-when="naam=waarde" */
  function updateConditional(form) {
    form.querySelectorAll('[data-show-when]').forEach(function (block) {
      var rule = block.getAttribute('data-show-when').split('=');
      var checked = form.querySelectorAll('[name="' + rule[0] + '"]:checked');
      var show = Array.prototype.some.call(checked, function (i) { return i.value === rule[1]; });
      block.hidden = !show;
      block.querySelectorAll('input, select, textarea').forEach(function (i) { i.disabled = !show; });
    });
  }

  function validateField(field) {
    var wrap = field.closest('.field');
    if (!wrap) return true;
    var ok = field.checkValidity();
    if (ok && field.type === 'file' && field.files && field.files[0] && field.files[0].size > 2 * 1024 * 1024) {
      ok = false;
    }
    wrap.classList.toggle('is-invalid', !ok);
    field.setAttribute('aria-invalid', String(!ok));
    return ok;
  }

  function collect(form) {
    var data = [];
    var seen = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.disabled || el.type === 'submit' || el.classList.contains('hp-input')) return;
      if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
      var label = el.getAttribute('data-label') || el.name;
      var value = el.type === 'file' ? (el.files[0] ? el.files[0].name : '') : el.value.trim();
      if (!value) return;
      if (seen[label] !== undefined) { data[seen[label]].value += ', ' + value; return; }
      seen[label] = data.length;
      data.push({ label: label, value: value });
    });
    return data;
  }

  function mailtoLink(subject, data, page) {
    var body = data.map(function (d) { return d.label + ': ' + d.value; }).join('\n');
    body += '\n\nVerzonden via: ' + page;
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function store(subject, data) {
    try {
      var key = 'debresser-aanvragen';
      var list = JSON.parse(localStorage.getItem(key) || '[]');
      list.push({ onderwerp: subject, datum: new Date().toISOString(), velden: data });
      localStorage.setItem(key, JSON.stringify(list.slice(-25)));
    } catch (err) { /* opslag niet beschikbaar: niet erg */ }
  }

  function showSuccess(form, subject, data, viaMail) {
    var success = form.parentElement.querySelector('.form-success');
    if (!success) return;
    var summary = success.querySelector('[data-summary]');
    if (summary) {
      summary.innerHTML = '';
      data.forEach(function (d) {
        var li = document.createElement('li');
        var b = document.createElement('b');
        b.textContent = d.label + ': ';
        li.appendChild(b);
        li.appendChild(document.createTextNode(d.value));
        summary.appendChild(li);
      });
    }
    var mailLink = success.querySelector('[data-mailto]');
    var mailNote = success.querySelector('[data-mail-note]');
    if (mailLink) {
      mailLink.href = mailtoLink(subject, data, document.title);
      mailLink.hidden = !viaMail;
    }
    if (mailNote) mailNote.hidden = !viaMail;
    form.hidden = true;
    success.classList.add('is-visible');
    success.setAttribute('tabindex', '-1');
    success.focus({ preventScroll: true });
    success.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'center' });
  }

  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var subject = form.getAttribute('data-form') || 'Aanvraag via de website';
    form.setAttribute('novalidate', '');
    updateConditional(form);

    form.addEventListener('change', function (e) {
      updateConditional(form);
      if (e.target.closest('.field')) validateField(e.target);
    });
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.field');
      if (wrap && wrap.classList.contains('is-invalid')) validateField(e.target);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Honeypot: ingevuld = spam, stil negeren */
      var hp = form.querySelector('.hp-input');
      if (hp && hp.value) return;

      var fields = form.querySelectorAll('.field input, .field select, .field textarea');
      var firstInvalid = null;
      fields.forEach(function (f) {
        if (f.disabled) return;
        if (!validateField(f) && !firstInvalid) firstInvalid = f;
      });
      /* Groepen met data-required-group: minstens één vinkje */
      form.querySelectorAll('[data-required-group]').forEach(function (group) {
        if (group.hidden) return;
        var any = group.querySelector('input:checked');
        group.classList.toggle('is-invalid', !any);
        var err = group.querySelector('.field__error');
        if (err) err.style.display = any ? 'none' : 'block';
        if (!any && !firstInvalid) firstInvalid = group.querySelector('input');
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var data = collect(form);
      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Bezig met verzenden…'; }
      store(subject, data);

      var finish = function (viaMail) {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
        showSuccess(form, subject, data, viaMail);
        if (viaMail) window.location.href = mailtoLink(subject, data, document.title);
      };

      /* Op een webserver met PHP: verzenden via api/verzend.php. Lokaal (file://): via e-mailprogramma. */
      if (location.protocol.indexOf('http') === 0 && window.fetch && window.FormData) {
        var fd = new FormData(form);
        fd.append('_onderwerp', subject);
        fd.append('_pagina', document.title);
        fetch(ENDPOINT, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } })
          .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
          .then(function (json) { finish(!(json && json.ok)); })
          .catch(function () { finish(true); });
      } else {
        finish(true);
      }
    });
  });

  /* Nieuw formulier openen na verzenden */
  document.querySelectorAll('[data-form-reset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var success = btn.closest('.form-success');
      var form = success.parentElement.querySelector('form[data-form]');
      form.reset();
      form.hidden = false;
      success.classList.remove('is-visible');
      updateConditional(form);
      var first = form.querySelector('input:not([type=hidden]), select, textarea');
      if (first) first.focus();
    });
  });

  /* Blog: artikel via #anker direct openklappen */
  function openFromHash() {
    if (!location.hash) return;
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    var details = target.querySelector('details');
    if (details) details.open = true;
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  /* Vacatures: bij 'Solliciteren' de vacature alvast in het bericht zetten */
  document.querySelectorAll('[data-vacature]').forEach(function (link) {
    link.addEventListener('click', function () {
      var msg = document.querySelector('#sollicitatie textarea');
      if (msg && !msg.value) msg.value = 'Ik solliciteer op de vacature: ' + link.getAttribute('data-vacature') + '\n\n';
    });
  });

  /* Offerteformulier vooraf invullen vanuit de snelle offerte op de homepage
     (offerte.html?van=...&naar=...&datum=...&type=...) */
  var offerteForm = document.querySelector('form[data-form="Offerteaanvraag"]');
  if (offerteForm && location.search) {
    var q = new URLSearchParams(location.search);
    var fill = function (name, value) {
      var el = offerteForm.querySelector('[name="' + name + '"]');
      if (el && value) el.value = value;
    };
    fill('oude_adres', q.get('van'));
    fill('nieuwe_adres', q.get('naar'));
    fill('datum_verhuizing', q.get('datum'));
    if (q.get('type')) {
      offerteForm.querySelectorAll('[name="type_offerte[]"]').forEach(function (box) {
        if (box.value === q.get('type')) box.checked = true;
      });
    }
    updateConditional(offerteForm);
    var firstEmpty = offerteForm.querySelector('#o-naam');
    if (firstEmpty && q.get('van')) setTimeout(function () { firstEmpty.focus({ preventScroll: true }); }, 400);
  }

  /* ---------- 10 Hero met filmpjes ----------
     De poster staat meteen in beeld. Films laden pas na 'load', alleen vanaf
     761px breed, zonder 'beperk beweging' en zonder databesparing. Twee
     video-elementen wisselen elkaar af met een zachte overgang. */
  var vhero = document.querySelector('[data-vhero]');
  if (vhero) (function () {
    var clipsEl = vhero.querySelector('[data-vhero-clips]');
    var clips = clipsEl ? JSON.parse(clipsEl.textContent) : [];
    var videos = vhero.querySelectorAll('.vhero__video');
    var controls = vhero.querySelector('.vhero__controls');
    var dotsEl = vhero.querySelector('.vhero__dots');
    var pauseBtn = vhero.querySelector('.vhero__pause');
    /* Film altijd als achtergrond, ook op mobiel en bij 'beperk beweging' (pauzeknop blijft) */
    var canPlay = { matches: true, addEventListener: function () {} };
    var saveData = navigator.connection && navigator.connection.saveData;
    var current = -1, front = 0, paused = false, started = false, fading = false;
    if (!clips.length || videos.length < 2 || saveData) return;

    var srcFor = function (clip) { return (window.innerWidth <= 1280 && clip.srcKlein) ? clip.srcKlein : clip.src; };

    /* bolletjes en pauzeknop zijn optioneel: zonder die elementen speelt de film gewoon */
    if (dotsEl) clips.forEach(function (clip, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Film ' + (i + 1) + ': ' + clip.label);
      b.addEventListener('click', function () { show(i); });
      li.appendChild(b);
      dotsEl.appendChild(li);
    });
    var dots = dotsEl ? dotsEl.querySelectorAll('button') : [];
    /* Eén film: geen bolletjes, en aan het eind vloeit hij weer in zijn eigen begin over */
    if (clips.length === 1 && dotsEl) dotsEl.style.display = 'none';

    function show(i) {
      if (fading || (i === current && clips.length > 1)) return;
      var next = videos[1 - front], prev = videos[front];
      current = i;
      dots.forEach(function (d, n) { d.setAttribute('aria-current', String(n === i)); d.style.setProperty('--progress', '0%'); });
      next.src = srcFor(clips[i]);
      next.loop = clips.length === 1; /* nooit stilstaan, ook als de overgang gemist wordt */
      next.currentTime = 0;
      var go = function () {
        next.removeEventListener('canplay', go);
        if (!paused) next.play().catch(function () {});
        fading = true;
        next.classList.add('is-active');
        prev.classList.remove('is-active');
        front = 1 - front;
        setTimeout(function () { prev.pause(); fading = false; }, 1200);
      };
      next.addEventListener('canplay', go);
      next.load();
    }

    videos.forEach(function (v) {
      v.addEventListener('timeupdate', function () {
        if (v !== videos[front] || !v.duration) return;
        if (dots[current]) dots[current].style.setProperty('--progress', (v.currentTime / v.duration * 100).toFixed(1) + '%');
        if (v.duration - v.currentTime < 1.1 && !fading) show((current + 1) % clips.length);
      });
    });

    function setPaused(p) {
      paused = p;
      var v = videos[front];
      if (p) v.pause(); else v.play().catch(function () {});
      pauseBtn.setAttribute('aria-pressed', String(p));
      pauseBtn.querySelector('.vhero__pause-label').textContent = p ? 'Film afspelen' : 'Film pauzeren';
      pauseBtn.querySelector('svg').innerHTML = p
        ? '<path d="M2 1l10 6-10 6z"/>'
        : '<rect x="1" y="1" width="3.5" height="12" rx="1"/><rect x="7.5" y="1" width="3.5" height="12" rx="1"/>';
    }
    if (pauseBtn) pauseBtn.addEventListener('click', function () { setPaused(!paused); });

    function start() {
      if (started || !canPlay.matches) return;
      started = true;
      /* Geen pauzeknop: de film loopt altijd door (controls blijven verborgen) */
      show(0);
    }
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
    canPlay.addEventListener('change', start);

    /* Niet afspelen als de hero of het tabblad uit beeld is */
    document.addEventListener('visibilitychange', function () {
      if (!started || paused) return;
      if (document.hidden) videos[front].pause(); else videos[front].play().catch(function () {});
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (!started || paused) return;
        if (entries[0].isIntersecting) videos[front].play().catch(function () {}); else videos[front].pause();
      }, { threshold: .05 }).observe(vhero);
    }
  })();

  /* ---------- 10b Hero met YouTube-film ----------
     Laadt de YouTube-speler pas na 'load'. De film staat zonder geluid in een
     lus en wordt pas zichtbaar als hij speelt; tot die tijd blijft de poster.
     Buiten beeld of in een ander tabblad wordt hij gepauzeerd. */
  (function () {
    var box = document.querySelector('[data-yt]');
    if (!box) return;
    var id = box.getAttribute('data-yt');
    var player = null, ready = false, visible = true;

    function create() {
      player = new YT.Player(box.querySelector('.vhero__yt-player'), {
        videoId: id,
        host: 'https://www.youtube-nocookie.com',
        playerVars: { autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0, loop: 1, playlist: id, modestbranding: 1, rel: 0, iv_load_policy: 3, playsinline: 1, cc_load_policy: 0 },
        events: {
          onReady: function (e) { ready = true; e.target.mute(); if (visible && !document.hidden) e.target.playVideo(); },
          onStateChange: function (e) {
            if (e.data === 1) box.classList.add('is-playing');
            if (e.data === 0) { e.target.seekTo(0); e.target.playVideo(); }
          },
          onError: function () { box.remove(); }
        }
      });
    }
    function sync() {
      if (!ready) return;
      if (visible && !document.hidden) player.playVideo(); else player.pauseVideo();
    }
    function load() {
      if (window.YT && window.YT.Player) return create();
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () { if (prev) prev(); create(); };
      var s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.async = true;
      document.head.appendChild(s);
    }
    if (document.readyState === 'complete') load(); else window.addEventListener('load', load);
    document.addEventListener('visibilitychange', sync);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; sync(); }, { threshold: .05 }).observe(box.parentNode);
    }
  })();

  /* ---------- 11 Werkwijze: verhuiswagen rijdt langs de stappen ---------- */
  (function () {
    var route = document.querySelector('[data-route]');
    if (!route) return;
    var van = route.querySelector('.route__van');
    var road = route.querySelector('.route__road');
    var steps = Array.prototype.slice.call(route.querySelectorAll('.steps-route .step'));
    if (!van || !road || steps.length < 2) return;

    var LEG = 1400, STOP = 1900, PARTY = 2800;
    var index = -1;          // -1 = nog niet vertrokken, steps.length = weggereden
    var timer = null, running = false, inView = false;
    route.style.setProperty('--leg', LEG + 'ms');

    function vertical() { return !desktop.matches; }

    /* Midden van een stap-halte (of een punt buiten de weg) langs de rij-as */
    function target(i) {
      var r = route.getBoundingClientRect();
      var rr = road.getBoundingClientRect();
      var v = vertical();
      var size = v ? van.offsetHeight : van.offsetWidth;
      var center;
      if (i < 0) center = (v ? rr.top - r.top : rr.left - r.left) - size * .6;
      else if (i >= steps.length) center = (v ? rr.bottom - r.top : rr.right - r.left) + size * .6;
      else {
        var s = steps[i].querySelector('.step__stop').getBoundingClientRect();
        center = v ? s.top + s.height / 2 - r.top : s.left + s.width / 2 - r.left;
      }
      var roadStart = v ? rr.top - r.top : rr.left - r.left;
      var roadLen = v ? rr.height : rr.width;
      return {
        van: center - size / 2,
        trail: Math.max(0, Math.min(roadLen, center - roadStart))
      };
    }

    function place(i, jump) {
      var t = target(i);
      if (jump) route.classList.add('is-jump');
      /* De wagen staat verticaal met rotate: 90deg, dus vooruit is altijd de eigen x-as */
      van.style.transform = 'translate3d(' + t.van + 'px,0,0)';
      route.style.setProperty('--trail', (i < 0 ? 0 : t.trail) + 'px');
      if (jump) { void van.offsetWidth; route.classList.remove('is-jump'); }
    }

    function mark(i) {
      steps.forEach(function (s, n) {
        s.classList.toggle('is-active', n === i);
        s.classList.toggle('is-passed', n < i);
        if (n !== i) s.classList.remove('is-party');
      });
    }

    function later(fn, ms) { clearTimeout(timer); timer = setTimeout(fn, ms); }

    function next() {
      if (!running) return;
      if (index >= steps.length) {                       // opnieuw beginnen
        mark(-1);
        index = -1;
        van.classList.add('is-hidden');
        place(-1, true);
        later(function () { van.classList.remove('is-hidden'); next(); }, 500);
        return;
      }
      if (index < 0) van.classList.remove('is-hidden');
      index++;
      route.classList.add('is-driving');
      van.classList.remove('is-braking');
      if (index === steps.length) van.classList.add('is-hidden');
      place(index);
      later(function () {
        route.classList.remove('is-driving');
        if (index === steps.length) { later(next, 300); return; }
        van.classList.add('is-braking');
        mark(index);
        var last = index === steps.length - 1;
        if (last) steps[index].classList.add('is-party');
        later(next, last ? PARTY : STOP);
      }, LEG);
    }

    function update() {
      var go = inView && !document.hidden && !reduceMotion.matches;
      if (go === running) return;
      running = go;
      if (go) next(); else { clearTimeout(timer); route.classList.remove('is-driving'); }
    }

    if (reduceMotion.matches) {
      /* Geen rijden: wagen staat bij de verhuisdag, alle haltes gehaald */
      mark(steps.length - 1);
      steps[steps.length - 1].classList.remove('is-active');
      steps.forEach(function (s) { s.classList.add('is-passed'); });
      index = steps.length - 1;
      place(index, true);
      route.classList.add('is-ready');
    } else {
      van.classList.add('is-hidden');
      place(-1, true);
      route.classList.add('is-ready');
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
          /* even wachten tot de kaarten zijn ingeschoven */
          setTimeout(update, inView && index < 0 ? 900 : 0);
        }, { threshold: .25 }).observe(route);
      } else { inView = true; update(); }
      document.addEventListener('visibilitychange', update);
    }

    /* Bij formaatwijziging of andere breakpoint direct op de juiste plek */
    var resizeRaf = null;
    window.addEventListener('resize', function () {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(function () {
        place(Math.min(index, steps.length - 1), true);
      });
    });
  })();

  /* ---------- 12 Werkwijze: grote vrachtwagen rijdt alleen in beeld ---------- */
  (function () {
    var stage = document.querySelector('[data-truck]');
    if (!stage || !('IntersectionObserver' in window)) return;
    var visible = false;
    function update() { stage.classList.toggle('is-paused', !visible || document.hidden); }
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      update();
    }, { threshold: 0 }).observe(stage);
    document.addEventListener('visibilitychange', update);
  })();

  /* ---------- 13 Contactformulier in 3D: kantelen + objecten-script laden ---------- */
  (function () {
    var cards = document.querySelectorAll('[data-form3d]');
    if (!cards.length) return;

    cards.forEach(function (card) {
      var raf = null;
      function typing() {
        var el = document.activeElement;
        return el && card.contains(el) && el.matches('input, textarea, select');
      }
      function flat() {
        if (raf) cancelAnimationFrame(raf);
        card.classList.remove('is-tilting');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      }
      card.addEventListener('pointermove', function (e) {
        if (!finePointer.matches || reduceMotion.matches || typing()) return;
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          card.classList.add('is-tilting');
          card.style.setProperty('--ry', ((px - .5) * 7).toFixed(2) + 'deg');
          card.style.setProperty('--rx', ((.5 - py) * 5).toFixed(2) + 'deg');
          card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        });
      });
      card.addEventListener('pointerleave', flat);
      card.addEventListener('focusin', flat);
    });

    var self = document.querySelector('script[src*="main.js"]');
    var src = self ? self.src.replace(/main\.js.*$/, 'contact-3d.js') : 'js/contact-3d.js';
    var loaded = false;
    function load() {
      if (loaded) return;
      loaded = true;
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
    }
    if (!('IntersectionObserver' in window)) { load(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); }
    }, { rootMargin: '900px 0px' });
    cards.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- 14 Werkwijze: lijn groeit mee en knooppunten lichten op ---------- */
  (function () {
    var flow = document.querySelector('[data-wk-flow]');
    if (!flow) return;
    var steps = Array.prototype.slice.call(flow.querySelectorAll('.wk-step'));
    if (reduceMotion.matches) {
      flow.style.setProperty('--wk-p', '100%');
      steps.forEach(function (s) { s.classList.add('is-reached'); });
      return;
    }
    var ticking = false;
    function update() {
      ticking = false;
      var mark = window.innerHeight * .7;
      var r = flow.getBoundingClientRect();
      var p = Math.max(0, Math.min(1, (mark - r.top) / r.height));
      flow.style.setProperty('--wk-p', (p * 100).toFixed(1) + '%');
      steps.forEach(function (s) { s.classList.toggle('is-reached', s.getBoundingClientRect().top + 70 < mark); });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* ---------- 15 Blog: hero-foto's volgen de muis in de diepte ---------- */
  (function () {
    var hero = document.querySelector('[data-blog-hero]');
    if (!hero || reduceMotion.matches || !finePointer.matches) return;
    var raf = null;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width - .5) * 2;
      var y = ((e.clientY - r.top) / r.height - .5) * 2;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        hero.style.setProperty('--hx', x.toFixed(3));
        hero.style.setProperty('--hy', y.toFixed(3));
      });
    });
    hero.addEventListener('pointerleave', function () {
      hero.style.setProperty('--hx', '0');
      hero.style.setProperty('--hy', '0');
    });
  })();

  /* ---------- 16 Contact: kaart en locatiekaarten lichten samen op ---------- */
  (function () {
    var board = document.querySelector('[data-loc-board]');
    if (!board) return;
    var parts = board.querySelectorAll('[data-loc]');
    function activate(name) {
      parts.forEach(function (el) { el.classList.toggle('is-active', el.getAttribute('data-loc') === name); });
    }
    board.querySelectorAll('.loc-card, .loc-pin').forEach(function (el) {
      var name = el.getAttribute('data-loc');
      el.addEventListener('mouseenter', function () { activate(name); });
      el.addEventListener('focusin', function () { activate(name); });
      el.addEventListener('click', function () { activate(name); });
    });
    activate('oisterwijk');
  })();

  /* ---------- 17 Locaties: echte kaart (Leaflet + Esri-straatkaart, werkt zonder sleutel) over de 3D-kaart ----------
     Laadt Leaflet pas als er een locatiebord op de pagina staat. Lukt dat niet
     (offline), dan blijft de getekende 3D-kaart gewoon staan. Kaarten en pinnen
     volgen de actieve locatie uit blok 16; klikken op een kaart vliegt ernaartoe. */
  (function () {
    var board = document.querySelector('[data-loc-board]');
    var panel = board && board.querySelector('.loc-map');
    if (!panel) return;
    var PLACES = {
      tilburg: [51.58918, 5.01356], oisterwijk: [51.58260, 5.19253], breda: [51.60675, 4.75461],
      venlo: [51.38918, 6.18544], reeuwijk: [52.04074, 4.71758], brussel: [50.87354, 4.41736]
    };
    var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/';

    function loadCss(href) { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l); }
    function loadJs(src, done, fail) { var s = document.createElement('script'); s.src = src; s.onload = done; s.onerror = fail; document.head.appendChild(s); }

    function build() {
      var L = window.L;
      var cards = Array.prototype.slice.call(board.querySelectorAll('.loc-card[data-loc]'));
      var box = document.createElement('div');
      box.className = 'loc-real';
      box.setAttribute('aria-label', 'Kaart met de vestigingen van De Bresser');
      panel.appendChild(box);

      var map = L.map(box, { scrollWheelZoom: false, zoomControl: false, attributionControl: true, dragging: !L.Browser.mobile, tap: false });
      L.control.zoom({ position: 'topright' }).addTo(map);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Kaart &copy; Esri, HERE, Garmin, &copy; OpenStreetMap-bijdragers'
      }).addTo(map);

      var markers = {}, bounds = [];
      cards.forEach(function (card) {
        var id = card.getAttribute('data-loc');
        if (!PLACES[id]) return;
        var nr = (card.querySelector('.loc-card__nr') || {}).textContent || '';
        var naam = (card.querySelector('h3') || {}).textContent || id;
        var icon = L.divIcon({
          className: 'loc-real__icon',
          html: '<span class="lr-pin"><span class="lr-pin__label">' + naam + '</span><span class="lr-pin__head"><b>' + nr + '</b></span><span class="lr-pin__pulse"></span></span>',
          iconSize: [0, 0]
        });
        var m = L.marker(PLACES[id], { icon: icon, keyboard: false, title: naam, riseOnHover: true }).addTo(map);
        m.on('click', function () { card.click(); fly(id); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
        markers[id] = m;
        bounds.push(PLACES[id]);
      });
      var all = L.latLngBounds(bounds);
      map.fitBounds(all, { padding: [48, 48] });

      function fly(id) {
        if (!PLACES[id]) return;
        map.flyTo(PLACES[id], 13, { duration: reduceMotion.matches ? 0 : 0.9 });
      }
      function sync() {
        cards.forEach(function (card) {
          var m = markers[card.getAttribute('data-loc')];
          if (!m || !m.getElement()) return;
          var on = card.classList.contains('is-active');
          m.getElement().classList.toggle('is-active', on);
          m.setZIndexOffset(on ? 1000 : 0);
        });
      }
      cards.forEach(function (card) {
        new MutationObserver(sync).observe(card, { attributes: true, attributeFilter: ['class'] });
        card.addEventListener('click', function (e) { if (!e.target.closest('a')) fly(card.getAttribute('data-loc')); });
      });

      /* knop om weer alles te tonen */
      var reset = document.createElement('button');
      reset.type = 'button';
      reset.className = 'loc-real__all';
      reset.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>Alle locaties';
      reset.addEventListener('click', function () { map.flyToBounds(all, { padding: [48, 48], duration: reduceMotion.matches ? 0 : 0.9 }); });
      panel.appendChild(reset);

      panel.classList.add('has-real');
      setTimeout(function () { map.invalidateSize(); map.fitBounds(all, { padding: [48, 48] }); sync(); }, 60);
      window.addEventListener('resize', function () { map.invalidateSize(); });
    }

    function start() {
      if (window.L && window.L.map) return build();
      loadCss(CDN + 'leaflet.min.css');
      loadJs(CDN + 'leaflet.min.js', build, function () {});
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        start();
      }, { rootMargin: '400px 0px' });
      io.observe(panel);
    } else start();
  })();

  /* ---------- 09 Jaartal ---------- */
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
})();
