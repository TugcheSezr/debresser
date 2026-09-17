/* =====================================================================
   De Bresser · Diepte-laag (hoort bij css/diepte.css)
   01 Scrollbalk bovenaan
   02 Pagina-hero: foto zakt langzamer weg dan de tekst
   03 Foto's schuiven in hun kader mee (parallax)
   Bij prefers-reduced-motion alleen de scrollbalk.
   ===================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var ticking = false;

  /* ---------- 01 Scrollbalk ---------- */
  var bar = document.createElement('div');
  bar.className = 'dp-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  /* ---------- 02 Pagina-hero ---------- */
  var hero = reduce ? null : document.querySelector('.page-hero--photo');
  var heroBg = hero && hero.querySelector('.page-hero__bg img');
  var heroCopy = hero && hero.querySelector('.page-hero__copy');

  /* ---------- 03 Parallax in kaders ---------- */
  var sel = '.img-3d img, .ibox__img img, .info-panel__img img, .photo-card__img img';
  var inView = new Set();
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) inView.add(e.target); else inView.delete(e.target);
      });
      requestTick();
    }, { rootMargin: '10% 0px' });
    document.querySelectorAll(sel).forEach(function (img) {
      if (img.closest('.img-3d--contain, .img-3d--map, .page-blog-artikel')) return;
      io.observe(img);
    });
  }

  function update() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;
    var max = root.scrollHeight - vh;
    bar.style.setProperty('--dp-scroll', max > 0 ? (y / max).toFixed(4) : 0);

    if (hero && y < vh * 1.2) {
      if (heroBg) root.style.setProperty('--dp-hero-y', (y * 0.38).toFixed(1) + 'px');
      if (heroCopy) {
        heroCopy.style.setProperty('--dp-copy-y', (y * 0.18).toFixed(1) + 'px');
        heroCopy.style.setProperty('--dp-copy-o', Math.max(0, 1 - y / (vh * 0.75)).toFixed(3));
      }
    }

    inView.forEach(function (img) {
      var r = img.parentElement.getBoundingClientRect();
      // -1 onderaan het scherm, +1 bovenaan
      var p = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
      var range = r.height * 0.045;
      img.style.setProperty('--dp-py', (p * range).toFixed(1) + 'px');
    });
  }

  function requestTick() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  update();
})();

/* ---------- 04 Menu: laat zien op welke pagina je bent ----------
   Markeert in het Diensten-menu de huidige pagina (exact, met #hash als die in het menu staat).
   Pagina's die niet in het menu staan krijgen hun ouder gemarkeerd (lichtere stijl). */
(function () {
  'use strict';
  var mega = document.getElementById('mega-diensten');
  if (!mega) return;

  var OUDER = {
    'kantoor-verhuizen.html': 'zakelijke-verhuizing.html',
    'winkelverhuizing.html': 'zakelijke-verhuizing.html',
    'verhuisservice-zakelijk.html': 'zakelijke-verhuizing.html',
    'senioren-verhuizen.html': 'zorg-verhuizing.html',
    'benelux-verhuizing.html': 'internationale-verhuizing.html',
    'internationale-verhuizing-engeland.html': 'internationale-verhuizing.html',
    'verhuisbedrijf-europa.html': 'internationale-verhuizing.html',
    'verhuisbedrijf-belgie.html': 'internationale-verhuizing.html',
    'duitsland.html': 'internationale-verhuizing.html',
    'frankrijk.html': 'internationale-verhuizing.html',
    'zwitserland.html': 'internationale-verhuizing.html',
    'full-service-verhuizing.html': 'diensten-verhuizen.html',
    'groupage-transport.html': 'diensten-verhuizen.html',
    'de-bresser-brussel.html': 'diensten-verhuizen.html',
    'breda.html': 'diensten-verhuizen.html',
    'tilburg.html': 'diensten-verhuizen.html',
    'roosendaal.html': 'diensten-verhuizen.html',
    'bergen-op-zoom.html': 'diensten-verhuizen.html',
    'container-opslag.html': 'diensten-opslag.html',
    /* Engelse pagina's */
    'en-office-relocation.html': 'en-business-removals.html',
    'en-shop-relocation.html': 'en-business-removals.html',
    'en-business-moving-service.html': 'en-business-removals.html',
    'en-senior-removals.html': 'en-care-relocation.html',
    'en-benelux-removals.html': 'en-international-removals.html',
    'en-moving-to-england.html': 'en-international-removals.html',
    'en-removal-company-europe.html': 'en-international-removals.html',
    'en-removal-company-belgium.html': 'en-international-removals.html',
    'en-moving-to-germany.html': 'en-international-removals.html',
    'en-moving-to-france.html': 'en-international-removals.html',
    'en-moving-to-switzerland.html': 'en-international-removals.html',
    'en-full-service-removal.html': 'en-services-removals.html',
    'en-groupage-transport.html': 'en-services-removals.html',
    'en-de-bresser-brussels.html': 'en-services-removals.html',
    'en-removal-company-breda.html': 'en-services-removals.html',
    'en-removal-company-tilburg-region.html': 'en-services-removals.html',
    'en-removal-company-roosendaal.html': 'en-services-removals.html',
    'en-removal-company-bergen-op-zoom.html': 'en-services-removals.html',
    'en-container-storage.html': 'en-services-storage.html'
  };

  var bestand = decodeURIComponent(location.pathname.split('/').pop()) || 'index.html';
  if (!OUDER[bestand]) {
    if (/^verhuisbedrijf-/.test(bestand)) OUDER[bestand] = 'diensten-verhuizen.html';
    else if (/^opslagruimte-/.test(bestand)) OUDER[bestand] = 'diensten-opslag.html';
    else if (/^en-removal-company-/.test(bestand)) OUDER[bestand] = 'en-services-removals.html';
    else if (/^en-storage-space-/.test(bestand)) OUDER[bestand] = 'en-services-storage.html';
  }

  var links = Array.prototype.slice.call(mega.querySelectorAll('a[href]'));
  var btn = document.querySelector('.has-mega > .menu__link');

  function markeer() {
    var hash = location.hash;
    links.forEach(function (a) {
      a.removeAttribute('aria-current');
      a.classList.remove('is-ouder');
      var col = a.closest('.mega__col');
      if (col) col.classList.remove('is-current');
    });

    var treffer = links.filter(function (a) { return a.getAttribute('href') === bestand + hash; });
    if (!treffer.length && hash) treffer = links.filter(function (a) { return a.getAttribute('href') === bestand; });
    // zonder hash: alleen de link zonder #, niet ook "DIY-opslag"
    var ouder = false;
    if (!treffer.length && OUDER[bestand]) {
      treffer = links.filter(function (a) { return a.getAttribute('href') === OUDER[bestand]; });
      ouder = true;
    }

    treffer.forEach(function (a) {
      if (ouder) a.classList.add('is-ouder');
      else a.setAttribute('aria-current', 'page');
      var col = a.closest('.mega__col');
      if (col) col.classList.add('is-current');
    });
    if (btn) btn.classList.toggle('is-current', treffer.length > 0);
  }

  markeer();
  window.addEventListener('hashchange', markeer);
})();

/* ---------- 05 Contact-team: hover op de persoon zelf ----------
   De vier foto's zijn overlappende rechthoeken met doorzichtige randen.
   We kijken naar de pixel onder de muis en kiezen de bovenste foto
   waar daar echt iemand staat. */
(function () {
  'use strict';

  document.querySelectorAll('.ct-team__stage').forEach(function (stage) {
    var fotos = Array.prototype.slice.call(stage.querySelectorAll('.ct-team__p'));
    if (!fotos.length) return;
    var maskers = new Map();
    var actief = null;

    function masker(img) {
      if (maskers.has(img)) return maskers.get(img);
      if (!img.complete || !img.naturalWidth) return null;
      var w = 190, h = Math.round(w * img.naturalHeight / img.naturalWidth);
      var c = document.createElement('canvas');
      c.width = w; c.height = h;
      var ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);
      var m;
      try { m = { w: w, h: h, a: ctx.getImageData(0, 0, w, h).data }; } catch (e) { m = false; }
      maskers.set(img, m);
      return m;
    }

    function raak(img, x, y) {
      var r = img.getBoundingClientRect();
      if (x < r.left || x >= r.right || y < r.top || y >= r.bottom) return false;
      var m = masker(img);
      if (m === false) return true; // canvas geblokkeerd: val terug op de rechthoek
      if (!m) return false;
      var px = Math.floor((x - r.left) / r.width * m.w);
      var py = Math.floor((y - r.top) / r.height * m.h);
      return m.a[(py * m.w + px) * 4 + 3] > 60;
    }

    function zIndex(img) { return parseInt(getComputedStyle(img).zIndex, 10) || 0; }

    function zet(img) {
      if (img === actief) return;
      if (actief) actief.classList.remove('is-hover');
      actief = img;
      if (actief) actief.classList.add('is-hover');
    }

    stage.addEventListener('pointermove', function (e) {
      // de huidige blijft actief zolang de muis op die persoon staat (geen geflikker)
      if (actief && raak(actief, e.clientX, e.clientY)) return;
      var volgorde = fotos.slice().sort(function (a, b) {
        return zIndex(b) - zIndex(a) || fotos.indexOf(b) - fotos.indexOf(a);
      });
      var gevonden = null;
      for (var i = 0; i < volgorde.length; i++) {
        if (raak(volgorde[i], e.clientX, e.clientY)) { gevonden = volgorde[i]; break; }
      }
      zet(gevonden);
    });
    stage.addEventListener('pointerleave', function () { zet(null); });
  });
})();
