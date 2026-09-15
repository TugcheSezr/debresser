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
   10 Hero met filmpjes (homepage)
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
    var canPlay = window.matchMedia('(min-width: 761px) and (prefers-reduced-motion: no-preference)');
    var saveData = navigator.connection && navigator.connection.saveData;
    var current = -1, front = 0, paused = false, started = false, fading = false;
    if (!clips.length || videos.length < 2 || saveData) return;

    var srcFor = function (clip) { return (window.innerWidth <= 1280 && clip.srcKlein) ? clip.srcKlein : clip.src; };

    clips.forEach(function (clip, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Film ' + (i + 1) + ': ' + clip.label);
      b.addEventListener('click', function () { show(i); });
      li.appendChild(b);
      dotsEl.appendChild(li);
    });
    var dots = dotsEl.querySelectorAll('button');

    function show(i) {
      if (fading || i === current) return;
      var next = videos[1 - front], prev = videos[front];
      current = i;
      dots.forEach(function (d, n) { d.setAttribute('aria-current', String(n === i)); d.style.setProperty('--progress', '0%'); });
      next.src = srcFor(clips[i]);
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
        dots[current].style.setProperty('--progress', (v.currentTime / v.duration * 100).toFixed(1) + '%');
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
    pauseBtn.addEventListener('click', function () { setPaused(!paused); });

    function start() {
      if (started || !canPlay.matches) return;
      started = true;
      controls.hidden = false;
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

  /* ---------- 09 Jaartal ---------- */
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
})();
