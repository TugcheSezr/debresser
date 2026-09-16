/* Schrijf een review (v2)
   - halve sterren = cijfer 1 t/m 10, N.v.t. schakelt de sterren uit
   - totaalscore: gezichtje, cijferlabel, confetti-ruitjes bij 9 en 10
   - voortgangsbalk, live voorbeeld van de review, tekentellers
   Verzenden en validatie doet js/main.js (form[data-form]). */
(function () {
  'use strict';

  var form = document.querySelector('.rs-form');
  if (!form) return;
  var kaart = form.closest('.rs-card');
  var rustig = window.matchMedia('(prefers-reduced-motion: reduce)');
  var EN = /^en/.test(document.documentElement.lang);
  var LEEG_TEKST = EN ? 'Select the number of stars for the overall score' : 'Selecteer het aantal sterren voor de totale score';
  var LOGO = ['#00498f', '#007dc2', '#6db23f', '#ffc400'];
  var DUIM = {
    Ja: '<svg viewBox="0 0 24 24"><path d="M7 11v9H4.5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1zM7 11l4-7.5a2 2 0 0 1 2.6 2.4L12.8 9.5h5.7a2 2 0 0 1 2 2.3l-1.2 7a2 2 0 0 1-2 1.7H7"/></svg>',
    Nee: '<svg viewBox="0 0 24 24"><path d="M7 13V4H4.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1zM7 13l4 7.5a2 2 0 0 0 2.6-2.4l-.8-3.6h5.7a2 2 0 0 0 2-2.3l-1.2-7a2 2 0 0 0-2-1.7H7"/></svg>'
  };

  function gekozen(groep) {
    var r = groep.querySelector('.rs-sterren__radio:checked');
    return r ? Number(r.getAttribute('data-cijfer')) : 0;
  }
  function kleur(groep, n) {
    groep.querySelectorAll('.rs-half').forEach(function (half, i) {
      half.classList.toggle('is-on', i < n);
      half.classList.toggle('is-top', i === n - 1 && groep.classList.contains('is-hover'));
    });
  }

  /* ---------- totaalscore: gezicht, cijfer, confetti ---------- */
  var totaal = form.querySelector('[data-rs-totaal]');
  var mond = totaal && totaal.querySelector('[data-rs-mond]');
  var getal = totaal && totaal.querySelector('[data-rs-getal]');
  var getalBox = getal && getal.parentElement;
  var confetti = totaal && totaal.querySelector('[data-rs-confetti]');

  function gezicht(n) {
    if (!totaal) return;
    // mond: -1 (boos) .. +1 (lach)
    var t = n ? (n - 5.5) / 4.5 : 0;
    var y = 78 + t * 18;
    mond.setAttribute('d', 'M36 ' + (78 - t * 4).toFixed(1) + ' Q60 ' + y.toFixed(1) + ' 84 ' + (78 - t * 4).toFixed(1));
    totaal.setAttribute('data-toon', !n ? '' : n <= 4 ? 'laag' : n <= 7 ? 'midden' : 'hoog');
    var nieuw = n ? String(n) : '–';
    if (getal.textContent !== nieuw) {
      getal.textContent = nieuw;
      getalBox.classList.remove('is-wissel'); void getalBox.offsetWidth; getalBox.classList.add('is-wissel');
    }
  }

  function knal() {
    if (!confetti || rustig.matches) return;
    confetti.innerHTML = '';
    var box = totaal.querySelector('.rs-sterren').getBoundingClientRect();
    var t = totaal.getBoundingClientRect();
    var x0 = box.left - t.left + box.width / 2, y0 = box.top - t.top + box.height / 2;
    for (var i = 0; i < 26; i++) {
      var s = document.createElement('i');
      var hoek = Math.random() * Math.PI * 2, afstand = 70 + Math.random() * 140;
      s.style.setProperty('--x', x0 + 'px');
      s.style.setProperty('--y', y0 + 'px');
      s.style.setProperty('--dx', Math.cos(hoek) * afstand + 'px');
      s.style.setProperty('--dy', Math.sin(hoek) * afstand - 30 + 'px');
      s.style.setProperty('--r', (Math.random() * 540 - 270) + 'deg');
      s.style.setProperty('--k', LOGO[i % LOGO.length]);
      s.style.animationDelay = Math.random() * 120 + 'ms';
      confetti.appendChild(s);
    }
    setTimeout(function () { confetti.innerHTML = ''; }, 1500);
  }

  /* ---------- alle sterrengroepen ---------- */
  form.querySelectorAll('[data-rs-vraag]').forEach(function (vraag) {
    var groep = vraag.querySelector('[data-rs-sterren]');
    var tekst = vraag.querySelector('[data-rs-cijfer]');
    var nvt = vraag.querySelector('[data-rs-nvt]');
    var radios = groep.querySelectorAll('.rs-sterren__radio');
    var isTotaal = vraag === totaal;

    function toon(n, definitief) {
      kleur(groep, n);
      if (isTotaal) gezicht(n);
      if (tekst) {
        var radio = n ? radios[n - 1] : null;
        /* de title van het sterlabel is vertaald; de waarde blijft Nederlands voor het formulier */
        var lab = radio && radio.id ? groep.querySelector('label[for="' + radio.id + '"]') : null;
        tekst.textContent = radio ? ((lab && lab.title) || radio.value) : LEEG_TEKST;
        tekst.classList.toggle('is-gekozen', !!radio && definitief);
      }
    }
    function status() {
      vraag.classList.toggle('is-klaar', gekozen(groep) > 0 || (nvt && nvt.checked));
    }

    groep.querySelectorAll('.rs-half').forEach(function (half, i) {
      half.addEventListener('mouseenter', function () {
        if (groep.classList.contains('is-uit')) return;
        groep.classList.add('is-hover');
        toon(i + 1, false);
      });
    });
    groep.addEventListener('mouseleave', function () {
      groep.classList.remove('is-hover');
      toon(gekozen(groep), true);
    });
    groep.addEventListener('change', function () {
      if (nvt && nvt.checked) { nvt.checked = false; zetNvt(false); }
      var n = gekozen(groep);
      groep.classList.remove('is-hover');
      toon(n, true);
      groep.classList.remove('is-klik'); void groep.offsetWidth; groep.classList.add('is-klik');
      if (isTotaal && n >= 9) knal();
      status();
    });

    function zetNvt(aan) {
      vraag.classList.toggle('is-nvt', aan);
      groep.classList.toggle('is-uit', aan);
      radios.forEach(function (r) { r.disabled = aan; if (aan) r.checked = false; });
      if (aan) {
        kleur(groep, 0);
        var veld = vraag.querySelector('.field');
        if (veld) veld.classList.remove('is-invalid');
      }
      status();
    }
    if (nvt) nvt.addEventListener('change', function () { zetNvt(nvt.checked); voortgang(); });

    form.addEventListener('reset', function () {
      setTimeout(function () { if (nvt) zetNvt(false); toon(0, false); status(); }, 0);
    });
  });

  /* ---------- voortgang ---------- */
  var balk = kaart && kaart.querySelector('[data-rs-balk]');
  var pct = kaart && kaart.querySelector('[data-rs-pct]');
  function voortgang() {
    if (!balk) return;
    var namen = {};
    form.querySelectorAll('[required]').forEach(function (el) { namen[el.name] = true; });
    var totaalN = 0, klaar = 0;
    Object.keys(namen).forEach(function (naam) {
      var els = form.querySelectorAll('[name="' + naam + '"]');
      var eerste = els[0];
      totaalN++;
      if (eerste.type === 'radio') {
        var nvt = form.querySelector('[name="' + naam + '-nvt"]');
        if ((nvt && nvt.checked) || form.querySelector('[name="' + naam + '"]:checked')) klaar++;
      } else if (eerste.type === 'checkbox') {
        if (eerste.checked) klaar++;
      } else if (eerste.value.trim() && eerste.checkValidity()) {
        klaar++;
      }
    });
    var p = totaalN ? Math.round(klaar / totaalN * 100) : 0;
    balk.parentElement.parentElement.style.setProperty('--rs-p', p);
    pct.textContent = p + '%';
    kaart.classList.toggle('is-compleet', p === 100);
  }

  /* ---------- live voorbeeld ---------- */
  var pv = document.querySelector('[data-rs-previewkaart]');
  function p(naam) { return pv && pv.querySelector('[data-rs-p="' + naam + '"]'); }
  function streep(n) {
    var h = '';
    for (var i = 0; i < n; i++) h += '<i class="rs-streep' + (i === n - 1 && n > 1 ? ' rs-streep--kort' : '') + '"></i>';
    return h;
  }
  function zetTekst(el, waarde, strepen) {
    if (!el) return;
    if (waarde) el.textContent = waarde; else el.innerHTML = streep(strepen);
  }
  function voorbeeld() {
    if (!pv) return;
    var naam = form.querySelector('[data-rs-preview="naam"]').value.trim();
    var plaats = form.querySelector('[data-rs-preview="plaats"]').value.trim();
    var zin = form.querySelector('[data-rs-preview="zin"]').value.trim();
    var tekst = form.querySelector('[data-rs-preview="tekst"]').value.trim();
    var aan = form.querySelector('[data-rs-preview="aanbevelen"]:checked');
    var n = totaal ? gekozen(totaal.querySelector('[data-rs-sterren]')) : 0;

    zetTekst(p('naam'), naam, 1);
    zetTekst(p('plaats'), plaats, 1);
    zetTekst(p('zin'), zin ? '“' + zin + '”' : '', 2);
    zetTekst(p('tekst'), tekst, 3);
    p('letter').textContent = naam ? naam.charAt(0).toUpperCase() : '';
    p('cijfer').textContent = n ? String(n) : '–';
    p('sterren').parentElement.style.setProperty('--rs-s', n);
    var duim = p('aanbevelen');
    duim.className = 'rs-preview__duim' + (aan ? (aan.value === 'Ja' ? ' is-ja' : ' is-nee') : '');
    duim.innerHTML = aan ? DUIM[aan.value] : '';
  }

  form.addEventListener('input', function () { voortgang(); voorbeeld(); });
  form.addEventListener('change', function () { voortgang(); voorbeeld(); });
  form.addEventListener('reset', function () { setTimeout(function () { voortgang(); voorbeeld(); }, 0); });

  /* ---------- tekentellers ---------- */
  form.querySelectorAll('[data-rs-teller]').forEach(function (teller) {
    var veld = teller.parentElement.querySelector('input, textarea');
    var max = teller.getAttribute('data-rs-teller');
    function zet() { teller.textContent = veld.value.length ? veld.value.length + ' / ' + max : ''; }
    veld.addEventListener('input', zet);
    zet();
  });

  /* ---------- voorwaarden-link: naar het akkoordvak ---------- */
  var knop = form.querySelector('[data-rs-voorwaarden]');
  var blok = document.getElementById('rs-voorwaarden');
  if (knop && blok) {
    knop.addEventListener('click', function () {
      blok.classList.add('is-uitgelicht');
      var vak = blok.querySelector('input[type="checkbox"]');
      if (vak) vak.focus();
      setTimeout(function () { blok.classList.remove('is-uitgelicht'); }, 1600);
    });
  }

  /* ---------- verstuurknop: vliegtuigje ---------- */
  var verstuur = form.querySelector('.rs-verstuur');
  form.addEventListener('submit', function () {
    if (!verstuur || form.querySelector('.is-invalid')) return;
    verstuur.classList.remove('is-weg'); void verstuur.offsetWidth; verstuur.classList.add('is-weg');
  });

  voortgang();
  voorbeeld();
})();
