/* WMS en Meubelpaspoort: mensen en handen stappen bij het scrollen uit de foto.
   Zet --p (0..1) op elk [data-wp-pop]; 1 zodra het midden van de foto op 60%
   van het scherm staat. Zonder JS of met reduced motion blijft --p op 1 (CSS). */
(function () {
  var pops = document.querySelectorAll('[data-wp-pop]');
  if (!pops.length || !('IntersectionObserver' in window)) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  var zichtbaar = new Set();
  var raf = null;

  function meet() {
    raf = null;
    var vh = window.innerHeight;
    zichtbaar.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var midden = r.top + r.height / 2;
      // onderaan het scherm 0, op 60% van de hoogte 1
      var p = (vh - midden) / (vh * 0.4);
      p = Math.max(0, Math.min(1, p));
      p = 1 - Math.pow(1 - p, 2);
      el.style.setProperty('--p', p.toFixed(3));
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
  reduce.addEventListener && reduce.addEventListener('change', function (e) {
    if (e.matches) pops.forEach(function (el) { el.style.setProperty('--p', '1'); });
  });
})();
