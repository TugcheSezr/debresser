/* Meubelprojecten: mensen komen uit laptop en foto naar voren.
   --uit (0..1) loopt mee met het scrollen; muis kantelt het object. */
(function () {
  'use strict';
  var items = document.querySelectorAll('[data-mp-3d]');
  if (!items.length) return;
  var rustig = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fijn = window.matchMedia('(pointer: fine)');

  function uit(el) {
    if (rustig.matches) { el.style.setProperty('--uit', 1); el.classList.add('is-uit'); return; }
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || 800;
    // 0 als de onderkant net in beeld komt, 1 als het midden op 60% van het scherm staat
    var start = vh, eind = vh * .6;
    var midden = r.top + r.height / 2;
    var p = Math.max(0, Math.min(1, (start - midden) / (start - eind)));
    p = 1 - Math.pow(1 - p, 3);
    el.style.setProperty('--uit', p.toFixed(3));
    el.classList.toggle('is-uit', p > .95);
  }

  var zichtbaar = new Set();
  var raf = null;
  function tik() {
    raf = null;
    zichtbaar.forEach(uit);
  }
  function plan() { if (!raf) raf = requestAnimationFrame(tik); }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) zichtbaar.add(e.target); else zichtbaar.delete(e.target);
      });
      plan();
    });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { zichtbaar.add(el); });
  }
  window.addEventListener('scroll', plan, { passive: true });
  window.addEventListener('resize', plan);
  items.forEach(uit);

  items.forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      if (!fijn.matches || rustig.matches) return;
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - .5;
      var py = (e.clientY - r.top) / r.height - .5;
      el.style.setProperty('--ry', (px * 14).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-py * 10).toFixed(2) + 'deg');
    });
    el.addEventListener('pointerleave', function () {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
})();
