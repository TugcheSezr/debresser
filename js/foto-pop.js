/* Foto-pop: mensen stappen bij het scrollen uit de foto.
   Zet --p (0..1) op elk [data-foto-pop]; 1 zodra het midden van de foto op 60%
   van het scherm staat. Zonder JS of met reduced motion blijft --p op 1 (CSS). */
(function () {
  var pops = document.querySelectorAll('[data-foto-pop]');
  if (!pops.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var zichtbaar = new Set();
  var raf = null;

  function meet() {
    raf = null;
    var vh = window.innerHeight;
    zichtbaar.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var p = (vh - (r.top + r.height / 2)) / (vh * 0.4);
      p = Math.max(0, Math.min(1, p));
      el.style.setProperty('--p', (1 - Math.pow(1 - p, 2)).toFixed(3));
    });
  }
  function plan() { if (!raf) raf = requestAnimationFrame(meet); }

  var io = new IntersectionObserver(function (items) {
    items.forEach(function (it) {
      if (it.isIntersecting) zichtbaar.add(it.target); else zichtbaar.delete(it.target);
    });
    plan();
  }, { rootMargin: '10% 0px' });

  pops.forEach(function (el) {
    el.style.setProperty('--p', '0');
    io.observe(el);
  });
  window.addEventListener('scroll', plan, { passive: true });
  window.addEventListener('resize', plan);
})();
