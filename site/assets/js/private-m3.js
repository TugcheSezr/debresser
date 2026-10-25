/* Particuliere m³-calculator (HOOFDLEAD-GO-007, 25-10-2026), afgeleid van intl-m3.js v6 (proef v2.3.3, besluit 37).
   Zelfde kamers, tellers, zoekveld per kamer (hoogstens 20 items in beeld, de rest via zoeken), eigen kamers en eigen
   items klein/middel/groot, geen m³ per item in beeld. Geen vervoerswijze en geen advies (geen groupage, vrachtwagen,
   container of zee): dit is de binnenlandse verhuizing. Rekenen in hele liters zoals intl-m3.js.
   Bestaande ankers blijven werken: de som-kaart staat statisch in de pagina met data-m3totaal, data-m3lijst,
   data-m3leeg, data-m3prijs, data-m3offerte, data-m3balk, data-m3balktotaal en data-m3wis. Dit script zet het
   prijsvolume in dataset.m3 (één decimaal, punt, 1 tot en met 300, anders leeg), precies zoals m3-calculator-pro.js;
   pro-calculators.js neemt het daaruit over naar #vpc-m3 en #pro-m3-summary. Prijsberekening en tarieven blijven in
   verhuisprijscalculator(-pro).js, ongewijzigd.
   data-pm3-prijs: 'pro' (pro-calculators.js doet de overdracht), 'link' (/verhuisprijscalculator/?m3=), 'lokaal'
   (dit script zet #vpc-m3 op dezelfde pagina). data-pm3-offerte: 'pagina' (#offerte-aanvragen) of 'route'
   (/offerte/?m3=, zoals m3-calculator.js op www).
   Boven 300 m³, onder 1 m³ of met een fout veld gaat er geen prijsvolume mee; de kaart zegt waarom. */
(function () {
  var blok = document.querySelector('[data-pm3]');
  if (!blok || !window.fetch) return;

  var MAX_AANTAL = 99, MAX_KAMERS = 30, MAX_EIGEN = 30, MAX_ZOEK = 8, MAX_PRIJS = 3000; // MAX_PRIJS in tienden m³
  var SVG = 'http://www.w3.org/2000/svg';
  var modusPrijs = blok.getAttribute('data-pm3-prijs') || 'pro', modusOfferte = blok.getAttribute('data-pm3-offerte') || 'pagina';

  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function vul(tekst, waarden) {
    return tekst.replace(/\{(\w+)\}/g, function (m, k) { return k in waarden ? waarden[k] : m; });
  }
  function icoon(pad) {
    var s = document.createElementNS(SVG, 'svg'), p = document.createElementNS(SVG, 'path');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
    p.setAttribute('d', pad); p.setAttribute('stroke', 'currentColor'); p.setAttribute('stroke-width', '2.4');
    p.setAttribute('stroke-linecap', 'round');
    s.appendChild(p);
    return s;
  }
  // aantal: een heel getal als tekst; leeg is 0, negatief is 0, boven 99 is 99; 1e2, 2,9 en 1 000 zijn fout (null)
  function leesAantal(t) {
    if (!t.trim()) return 0;
    var m = /^\s*([+-]?)(\d+)\s*$/.exec(t);
    if (!m) return null;
    return m[1] === '-' ? 0 : Math.min(MAX_AANTAL, parseInt(m[2], 10));
  }
  function norm(t) {
    return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function rang(n, woorden) {
    if (!woorden.every(function (w) { return n.indexOf(w) >= 0; })) return null;
    return n.indexOf(woorden.join(' ')) === 0 ? 0 : (' ' + n).indexOf(' ' + woorden[0]) >= 0 ? 1 : 2;
  }

  // Besluit 34: drie bestaande particuliere presets blijven vindbaar via zoeken.
  // Dit verrijkt alleen de private kopie in geheugen; de gedeelde 270-itemset blijft ongewijzigd.
  var PRIVE_LITERS = { 'prive-eethoek': 1000, 'prive-diversen-klein': 500, 'prive-diversen-groot': 1000 };

  function bouw(S, D) {
    D = Object.assign({}, D, { liters: Object.assign({}, D.liters), zoek: Object.assign({}, D.zoek) });
    S = Object.assign({}, S, { items: Object.assign({}, S.items) });
    Object.keys(PRIVE_LITERS).forEach(function (id) {
      D.liters[id] = PRIVE_LITERS[id];
      D.zoek[id] = S.prive_zoek[id];
      S.items[id] = S.prive_items[id];
    });

    var een = new Intl.NumberFormat(S.locale, { maximumFractionDigits: 1, useGrouping: false });
    var drie = new Intl.NumberFormat(S.locale, { maximumFractionDigits: 3, useGrouping: false });
    var heel = new Intl.NumberFormat(S.locale, { maximumFractionDigits: 0 });
    // tienden m³, een halve tiende omhoog, in gehele getallen: 3250 l is 33 tienden, dus 3,3 m³ (zoals Math.round(x*10)/10)
    function tienden(l) { return Math.floor((l + 50) / 100); }
    function m3(l) { return een.format(tienden(l) / 10); }
    function precies(l) { return drie.format(l / 1000); }
    var SOORTEN = {};
    D.kamers.forEach(function (k) { SOORTEN[k.id] = k.zichtbaar; });
    var INDEX = Object.keys(D.liters).map(function (id) {
      return { id: id, naam: norm(S.items[id]), termen: (D.zoek[id] || []).map(function (t) { return { t: t, n: norm(t) }; }) };
    });
    function zoek(tekst) {
      var woorden = norm(tekst).split(' ').filter(Boolean), uit = [];
      if (woorden.join('').length < 2) return null;
      INDEX.forEach(function (x) {
        var score = rang(x.naam, woorden), via = null;
        if (score === null) {
          x.termen.forEach(function (t) {
            var s = rang(t.n, woorden);
            if (s !== null && (score === null || s + 3 < score)) { score = s + 3; via = t.t; }
          });
        }
        if (score !== null) uit.push({ id: x.id, score: score, via: via });
      });
      return uit.sort(function (a, b) { return a.score - b.score || S.items[a.id].localeCompare(S.items[b.id], S.locale); });
    }

    var raster = blok.querySelector('[data-pm3-raster]'), app = blok.querySelector('[data-im3-app]');
    var somEl = raster.querySelector('.m3c-som'), totaalEl = raster.querySelector('[data-m3totaal]');
    var lijstEl = raster.querySelector('[data-m3lijst]'), leegEl = raster.querySelector('[data-m3leeg]');
    var prijsEl = raster.querySelector('[data-m3prijs]'), offerteEls = [].slice.call(raster.querySelectorAll('[data-m3offerte]'));
    var balk = raster.querySelector('[data-m3balk]'), balkTotaal = raster.querySelector('[data-m3balktotaal]');
    var wis = raster.querySelector('[data-m3wis]');
    var kamers = [], volgnummer = 0, actief = null;

    var tabs = el('div', { 'class': 'm3c-tabs', role: 'tablist', 'aria-labelledby': 'pm3-kamers-label' });
    var panelen = el('div', { 'class': 'm3c-panelen' });
    var kamersLeeg = el('p', { 'class': 'im3-kamers-leeg', text: S.kamers_leeg });

    var soortKeuze = el('select', { id: 'pm3-soort', name: 'pm3-soort' }, [el('option', { value: '', text: S.kamer_kies })]);
    D.toevoegen.forEach(function (id) {
      soortKeuze.appendChild(el('option', { value: id, text: id === D.eigen_kamer ? S.kamer_andere_keuze : S.kamers[id] }));
    });
    var eigenKamer = el('input', { type: 'text', id: 'pm3-kamernaam', name: 'pm3-kamernaam', maxlength: '40', placeholder: S.kamer_naam_voorbeeld, autocomplete: 'off' });
    var eigenKamerVeld = el('p', { 'class': 'im3-erbij__naam' }, [el('label', { 'for': 'pm3-kamernaam', text: S.kamer_naam_label }), eigenKamer]);
    eigenKamerVeld.hidden = true;
    var erbijKnop = el('button', { type: 'button', 'class': 'btn btn--omlijnd im3-erbij__knop', text: S.kamer_toevoegen_knop });
    var erbijFout = el('p', { 'class': 'im3-fout', id: 'pm3-erbij-fout', text: S.kamer_naam_nodig });
    erbijFout.hidden = true;
    var erbij = el('div', { 'class': 'im3-erbij im3-erbij--boven' }, [
      el('p', { 'class': 'im3-erbij__soort' }, [el('label', { 'for': 'pm3-soort', text: S.kamer_toevoegen_label }), soortKeuze]),
      eigenKamerVeld, erbijKnop, erbijFout
    ]);

    function standaardNaam(k) { return S.kamers[k.soort] + (k.nr > 1 ? ' ' + k.nr : ''); }
    function itemNaam(r) {
      return r.eigen ? (r.naamInvoer.value.trim() || S.eigen_standaard) : S.items[r.sleutel];
    }
    function eenheid(r) { return S.eenheden[(!r.eigen && D.eenheden[r.sleutel]) || 'stuk']; }
    function zetLabels(k, r) {
      var w = { item: itemNaam(r), kamer: k.naam, eenheid: eenheid(r) };
      r.invoer.setAttribute('aria-label', vul(S.aria_aantal, w));
      r.min.setAttribute('aria-label', vul(S.aria_minder, w));
      r.plus.setAttribute('aria-label', vul(S.aria_meer, w));
      if (r.eigen) {
        r.naamInvoer.setAttribute('aria-label', vul(S.aria_eigen_naam, w));
        r.maatKeuze.setAttribute('aria-label', vul(S.aria_eigen_maat, w));
        r.weg.setAttribute('aria-label', vul(S.aria_eigen_weg, w));
      }
    }
    function zetNaam(k) {
      k.naam = k.eigenNaam || standaardNaam(k);
      k.tabNaam.textContent = k.naam;
      k.weg.setAttribute('aria-label', vul(S.aria_kamer_weg, { kamer: k.naam }));
      k.zoekInvoer.setAttribute('aria-label', vul(S.aria_zoek, { kamer: k.naam }));
      k.rijen.forEach(function (r) { zetLabels(k, r); });
    }

    function maakRij(k, sleutel, liters, eigen, aantal) {
      var id = k.id + '-r' + (++volgnummer);
      var invoer = el('input', { type: 'text', name: id + '-aantal', inputmode: 'numeric', autocomplete: 'off', value: String(aantal) });
      var min = el('button', { type: 'button', 'class': 'm3c-knop', 'data-stap': '-1' }, [icoon('M5 12h14')]);
      var plus = el('button', { type: 'button', 'class': 'm3c-knop', 'data-stap': '1' }, [icoon('M12 5v14M5 12h14')]);
      var r = { id: id, kamer: k, sleutel: sleutel, bron: liters, eigen: eigen, invoer: invoer, min: min, plus: plus };
      r.fout = el('p', { 'class': 'im3-fout', id: r.id + '-f' });
      r.fout.hidden = true;
      var wat;
      if (eigen) {
        r.naamInvoer = el('input', { type: 'text', name: id + '-naam', 'class': 'im3-eigen__naam', maxlength: '60', placeholder: S.eigen_naam_voorbeeld, autocomplete: 'off' });
        r.maatKeuze = el('select', { name: id + '-maat', 'class': 'im3-eigen__maat' }, Object.keys(D.eigen_maten).map(function (m) {
          return el('option', { value: m, text: S.eigen_maten[m] });
        }));
        r.maatKeuze.value = 'middel';
        r.weg = el('button', { type: 'button', 'class': 'im3-eigen__weg' }, [icoon('M6 6l12 12M18 6L6 18')]);
        r.concept = el('p', { 'class': 'im3-rij__hulp', text: S.eigen_naam_nodig });
        wat = el('div', { 'class': 'm3c-rij__wat' }, [r.naamInvoer, r.concept, r.fout]);
      } else {
        var per = D.eenheden[sleutel] ? el('span', { 'class': 'im3-rij__per', text: S.tel_per[D.eenheden[sleutel]] }) : null;
        var hulp = S.item_hulp[sleutel] ? el('span', { 'class': 'im3-rij__hulp', text: S.item_hulp[sleutel] }) : null;
        wat = el('div', { 'class': 'm3c-rij__wat' }, [el('span', { 'class': 'm3c-rij__naam', text: S.items[sleutel] }), per, hulp, r.fout]);
      }
      r.el = el('div', { 'class': 'm3c-rij' + (eigen ? ' im3-eigen' : '') }, [wat, el('div', { 'class': 'm3c-rij__tel' }, [min, invoer, plus]), r.maatKeuze, r.weg]);
      r.el.im3 = r;
      zetLabels(k, r);
      return r;
    }

    function maakKamer(soort, eigenNaam) {
      var id = 'pm3-k' + (++volgnummer);
      var nr = 1 + kamers.reduce(function (m, x) { return x.soort === soort ? Math.max(m, x.nr) : m; }, 0);
      var k = { id: id, soort: soort, nr: nr, eigenNaam: eigenNaam || '', naam: '', rijen: [] };
      k.tabNaam = el('span', { 'class': 'im3-tab__naam' });
      k.som = el('span', { 'class': 'm3c-tab__som', text: '0 ' + S.eenheid });
      k.tab = el('button', { type: 'button', 'class': 'm3c-tab', role: 'tab', id: id + '-t', 'aria-controls': id + '-p' }, [k.tabNaam, k.som]);
      k.naamInvoer = el('input', { type: 'text', 'class': 'im3-kamer__naam', id: id + '-n', name: id + '-n', maxlength: '40', autocomplete: 'off' });
      k.weg = el('button', { type: 'button', 'class': 'im3-kamer__weg', text: S.kamer_weg });
      k.lijst = el('div', { 'class': 'm3c-paneel__rijen' });
      k.leegHulp = el('p', { 'class': 'm3c-paneel__hulp', text: S.kamer_leeg_hulp });
      k.eigenLijst = el('div', { 'class': 'm3c-paneel__rijen im3-eigenlijst' });
      k.eigenKnop = el('button', { type: 'button', 'class': 'btn btn--omlijnd im3-eigen__erbij', text: S.eigen_toevoegen });
      k.zoekInvoer = el('input', { type: 'search', id: id + '-z', name: id + '-z', 'class': 'im3-zoek__invoer', placeholder: S.zoek_voorbeeld,
                                   autocomplete: 'off', enterkeyhint: 'search', 'aria-describedby': id + '-zs', 'aria-controls': id + '-zl' });
      k.zoekStatus = el('p', { 'class': 'im3-zoek__status', id: id + '-zs', role: 'status' });
      k.zoekLijst = el('ul', { 'class': 'im3-zoek__lijst', id: id + '-zl' });
      k.paneel = el('div', { 'class': 'm3c-paneel', role: 'tabpanel', id: id + '-p', 'aria-labelledby': id + '-t', tabindex: '0' }, [
        el('div', { 'class': 'im3-paneel__kop' }, [
          el('p', { 'class': 'im3-paneel__naam' }, [el('label', { 'for': id + '-n', text: S.kamer_naam_label }), k.naamInvoer]),
          k.weg
        ]),
        el('div', { 'class': 'im3-zoek', role: 'search' }, [k.zoekInvoer, k.zoekStatus, k.zoekLijst]),
        k.leegHulp, k.lijst,
        el('p', { 'class': 'im3-eigen__kop', text: S.eigen_kop }),
        k.eigenLijst, k.eigenKnop
      ]);
      k.paneel.im3 = k;
      (SOORTEN[soort] || []).forEach(function (sleutel) {
        var r = maakRij(k, sleutel, D.liters[sleutel], false, 0);
        k.rijen.push(r);
        k.lijst.appendChild(r.el);
      });
      k.leegHulp.hidden = k.rijen.length > 0;
      kamers.push(k);
      zetNaam(k);
      k.naamInvoer.value = k.naam;
      tabs.appendChild(k.tab);
      panelen.appendChild(k.paneel);
      return k;
    }

    function eigenErbij(k) {
      if (k.rijen.filter(function (r) { return r.eigen; }).length >= MAX_EIGEN) return;
      var r = maakRij(k, null, null, true, 1);
      k.rijen.push(r);
      k.eigenLijst.appendChild(r.el);
      k.eigenKnop.disabled = k.rijen.filter(function (x) { return x.eigen; }).length >= MAX_EIGEN;
      r.naamInvoer.focus();
    }

    function toonZoek(k) {
      var treffers = zoek(k.zoekInvoer.value);
      k.zoekLijst.textContent = '';
      k.zoekStatus.textContent = !treffers ? '' : !treffers.length ? S.zoek_niets
        : treffers.length === 1 ? S.zoek_een : vul(S.zoek_aantal, { aantal: treffers.length });
      (treffers || []).slice(0, MAX_ZOEK).forEach(function (t) {
        k.zoekLijst.appendChild(el('li', {}, [el('button', { type: 'button', 'class': 'im3-zoek__kies', 'data-item': t.id,
          'aria-label': vul(S.aria_zoek_kies, { item: S.items[t.id], kamer: k.naam }) }, [
          el('span', { 'class': 'im3-zoek__naam', text: S.items[t.id] }),
          t.via ? el('span', { 'class': 'im3-zoek__via', text: t.via }) : null,
          icoon('M12 5v14M5 12h14')
        ])]));
      });
    }
    function wisZoek(k) {
      k.zoekInvoer.value = '';
      toonZoek(k);
    }
    function uitZoek(k, sleutel) {
      var r = k.rijen.filter(function (x) { return x.sleutel === sleutel; })[0];
      if (!r) {
        r = maakRij(k, sleutel, D.liters[sleutel], false, 1);
        k.rijen.push(r);
        k.lijst.insertBefore(r.el, k.lijst.firstChild);
        k.leegHulp.hidden = true;
      } else if (!(leesAantal(r.invoer.value) > 0)) {
        r.invoer.value = '1';
        toonFout(r, staat(r));
      }
      wisZoek(k);
      herbereken();
      r.invoer.focus();
    }

    function staat(r) {
      var n = leesAantal(r.invoer.value);
      var concept = r.eigen && !r.naamInvoer.value.trim();
      return { n: n, l: r.eigen ? D.eigen_maten[r.maatKeuze.value] : r.bron, fout: n === null ? 'fout_aantal' : null, concept: concept };
    }
    function toonFout(r, s) {
      if (s.fout) { r.invoer.setAttribute('aria-invalid', 'true'); r.invoer.setAttribute('aria-describedby', r.fout.id); }
      else { r.invoer.removeAttribute('aria-invalid'); r.invoer.removeAttribute('aria-describedby'); }
      r.fout.textContent = s.fout ? S[s.fout] : '';
      r.fout.hidden = !s.fout;
      r.el.classList.toggle('is-fout', !!s.fout);
    }

    // aanvullingen op de bestaande som-kaart: liters, ontbrekende velden en de status van het prijsvolume
    var litersEl = el('p', { 'class': 'pm3-liters', 'data-pm3-liters': '' });
    var onvolledig = el('p', { 'class': 'im3-onvolledig', role: 'status' });
    var prijsStatus = el('p', { 'class': 'pm3-status', id: 'pm3-prijs-status', role: 'status', 'data-pm3-status': '' });
    var kaartCijfer = totaalEl.parentNode;
    kaartCijfer.parentNode.insertBefore(litersEl, kaartCijfer.nextSibling);
    lijstEl.parentNode.insertBefore(onvolledig, lijstEl);
    var acties = raster.querySelector('.m3c-som__acties');
    acties.parentNode.insertBefore(prijsStatus, acties);
    acties.parentNode.insertBefore(el('p', { 'class': 'im3-verpakking', text: S.verpakking }), acties);
    if (prijsEl) prijsEl.setAttribute('aria-describedby', prijsStatus.id);

    var kamersEl = el('div', { 'class': 'm3c-kamers is-klaar' }, [
      erbij,
      el('p', { 'class': 'm3c-kamers__label', id: 'pm3-kamers-label' }, [
        el('img', { 'class': 'm3c-ico', src: '/assets/img/iconen/kleur/adviseur-aan-huis.svg', alt: '', width: '28', height: '28', decoding: 'async' }),
        document.createTextNode(S.kamers_label)
      ]),
      tabs, kamersLeeg, panelen
    ]);
    app.parentNode.replaceChild(kamersEl, app);

    var opm = document.querySelector('#offerte-aanvragen #sb-ob-opm');
    var inventaris = '', fouten = [], prijsM3 = '';
    function zetInFormulier() {
      if (!opm) return;
      var v = opm.value, b = v.indexOf(S.blok_begin), e = b < 0 ? -1 : v.indexOf(S.blok_eind, b);
      var voor = v, na = '';
      if (e >= 0) {
        voor = v.slice(0, b);
        na = v.slice(e + S.blok_eind.length);
        if (voor.slice(-2) === '\n\n') voor = voor.slice(0, -2);
      }
      var nieuw = inventaris ? (voor ? voor + '\n\n' : '') + inventaris + na : voor + na;
      if (nieuw !== v) opm.value = nieuw;
    }

    function herbereken() {
      var totaal = 0, kamerSommen = [], regelsPerKamer = [], concepten = [];
      fouten = [];
      kamers.forEach(function (k) {
        var som = 0, regels = [];
        k.rijen.forEach(function (r) {
          var s = staat(r);
          if (r.concept) r.concept.hidden = !s.concept;
          if (!s.fout && r.fout.textContent) toonFout(r, s);
          var telt = !s.fout && !s.concept && s.n > 0;
          r.el.classList.toggle('is-actief', telt);
          if (s.fout) { fouten.push(r); return; }
          if (s.concept && s.n > 0) concepten.push(k.naam + ': ' + s.n + ' × ' + S.eigen_standaard + ' (' + S.eigen_maten[r.maatKeuze.value] + ')');
          if (!telt) return;
          som += s.n * s.l;
          regels.push(vul(S.formulier_regel, { aantal: s.n, item: itemNaam(r), maat: precies(s.l), eenheid: eenheid(r), m3: precies(s.n * s.l) }));
        });
        k.som.textContent = m3(som) + ' ' + S.eenheid;
        k.som.classList.toggle('is-actief', som > 0);
        if (som > 0) kamerSommen.push([k.naam, som]);
        if (regels.length) regelsPerKamer.push(vul(S.formulier_kamer, { kamer: k.naam, m3: precies(som) }), regels.join('\n'));
        totaal += som;
      });
      totaalEl.textContent = balkTotaal.textContent = m3(totaal);
      litersEl.textContent = totaal > 0 ? vul(S.liters, { liter: heel.format(totaal), exact: precies(totaal) }) : '';
      litersEl.hidden = !(totaal > 0);
      lijstEl.textContent = '';
      kamerSommen.forEach(function (x) {
        lijstEl.appendChild(el('li', {}, [el('span', { text: x[0] }), el('span', { text: m3(x[1]) + ' ' + S.eenheid })]));
      });
      lijstEl.hidden = !kamerSommen.length;
      leegEl.hidden = kamerSommen.length > 0;
      var getoond = fouten.filter(function (r) { return r.fout.textContent; }).length;
      onvolledig.textContent = getoond === 1 ? S.onvolledig_een : vul(S.onvolledig, { aantal: getoond });
      onvolledig.hidden = !getoond;
      kamersLeeg.hidden = kamers.length > 0;
      erbijKnop.disabled = kamers.length >= MAX_KAMERS;

      // prijsvolume: één decimaal, 1 tot en met 300; nooit afkappen naar 300, nooit met een fout veld
      var t = tienden(totaal), status = '';
      prijsM3 = '';
      if (fouten.length) status = S.prijs_fout;
      else if (totaal > MAX_PRIJS * 100) status = vul(S.prijs_te_groot, { m3: m3(totaal) });
      else if (t >= 10) { prijsM3 = String(t / 10); status = vul(S.prijs_volume, { m3: m3(totaal) }); }
      else if (totaal > 0) status = S.prijs_te_klein;
      prijsStatus.textContent = status;
      prijsStatus.hidden = !status;
      prijsStatus.classList.toggle('is-fout', !prijsM3 && !!status);
      if (prijsEl) {
        prijsEl.dataset.m3 = prijsM3;
        prijsEl.href = modusPrijs === 'link' ? '/verhuisprijscalculator/' + (prijsM3 ? '?m3=' + prijsM3 : '') : '#berekenen';
      }
      offerteEls.forEach(function (a) {
        a.dataset.m3 = prijsM3;
        a.href = modusOfferte === 'route' && prijsM3 ? '/offerte/?m3=' + prijsM3 + '#offerte' : '#offerte-aanvragen';
      });

      inventaris = '';
      if (totaal > 0 || concepten.length || fouten.length) {
        inventaris = [S.blok_begin, vul(S.formulier_totaal, { m3: m3(totaal), exact: precies(totaal), liter: heel.format(totaal) }),
          prijsM3 ? vul(S.formulier_prijs, { m3: m3(totaal) }) : totaal > MAX_PRIJS * 100 ? S.formulier_prijs_te_groot : S.formulier_prijs_geen]
          .concat(regelsPerKamer)
          .concat(concepten.length ? [vul(S.formulier_concept, { regels: concepten.join('; ') })] : [])
          .concat(fouten.length ? [vul(S.formulier_onvolledig, { regels: fouten.map(function (r) { return r.kamer.naam + ': ' + itemNaam(r); }).join('; ') })] : [])
          .concat([S.formulier_slot, S.blok_eind]).join('\n');
      }
      // Houd een eerder gekozen volumeschatting gelijk aan de actuele telling.
      var m3veld = document.getElementById('pro-m3-summary');
      var m3rij = document.getElementById('pro-m3-field');
      if (m3veld && m3rij && !m3rij.hidden) {
        if (!prijsM3) {
          m3veld.value = '';
          m3rij.hidden = true;
        } else {
          var delen = kamerSommen.map(function (x) { return x[0] + ' ' + m3(x[1]) + ' ' + S.eenheid; });
          m3veld.value = (S.taal === 'en' ? 'About ' + prijsM3 + ' m³' : 'Ongeveer ' + m3(totaal) + ' m³')
            + (delen.length ? ': ' + delen.join(', ') : '')
            + (S.taal === 'en' ? '. Indicative estimate, not a quote.' : '. Indicatieve schatting, geen offerte.');
        }
      }
      zetInFormulier();
    }

    function kies(k, focus) {
      actief = k;
      kamers.forEach(function (x) {
        var aan = x === k;
        x.tab.setAttribute('aria-selected', aan ? 'true' : 'false');
        x.tab.tabIndex = aan ? 0 : -1;
        x.paneel.classList.toggle('is-actief', aan);
      });
      if (focus && k) k.tab.focus();
    }
    tabs.addEventListener('click', function (e) {
      var tab = e.target.closest('[role=tab]');
      if (tab) kies(kamers.filter(function (k) { return k.tab === tab; })[0]);
    });
    tabs.addEventListener('keydown', function (e) {
      var tab = e.target.closest('[role=tab]');
      if (!tab) return;
      var i = kamers.map(function (k) { return k.tab; }).indexOf(tab), n = kamers.length;
      var j = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: n - 1 }[e.key];
      if (j === undefined) return;
      e.preventDefault();
      kies(kamers[(j + n) % n], true);
    });

    soortKeuze.addEventListener('change', function () {
      eigenKamerVeld.hidden = soortKeuze.value !== D.eigen_kamer;
      erbijFout.hidden = true;
    });
    erbijKnop.addEventListener('click', function () {
      if (!soortKeuze.value) { soortKeuze.focus(); return; }
      var naam = eigenKamer.value.trim().slice(0, 40);
      if (soortKeuze.value === D.eigen_kamer && !naam) {
        erbijFout.hidden = false;
        eigenKamer.setAttribute('aria-invalid', 'true');
        eigenKamer.setAttribute('aria-describedby', erbijFout.id);
        eigenKamer.focus();
        return;
      }
      if (kamers.length >= MAX_KAMERS) return;
      var k = maakKamer(soortKeuze.value, soortKeuze.value === D.eigen_kamer ? naam : '');
      soortKeuze.value = '';
      eigenKamer.value = '';
      eigenKamer.removeAttribute('aria-invalid');
      eigenKamer.removeAttribute('aria-describedby');
      eigenKamerVeld.hidden = erbijFout.hidden = true;
      herbereken();
      kies(k, true);
    });

    panelen.addEventListener('click', function (e) {
      var knop = e.target.closest('button');
      if (!knop) return;
      var paneel = knop.closest('.m3c-paneel'), k = paneel && paneel.im3, rijEl = knop.closest('.m3c-rij');
      if (!k) return;
      if (knop.classList.contains('im3-zoek__kies')) { uitZoek(k, knop.getAttribute('data-item')); return; }
      if (knop.classList.contains('m3c-knop')) {
        var r = rijEl.im3, n = leesAantal(r.invoer.value);
        r.invoer.value = Math.min(MAX_AANTAL, Math.max(0, (n || 0) + parseInt(knop.getAttribute('data-stap'), 10)));
        toonFout(r, staat(r));
      } else if (knop.classList.contains('im3-eigen__weg')) {
        k.rijen.splice(k.rijen.indexOf(rijEl.im3), 1);
        rijEl.parentNode.removeChild(rijEl);
        k.eigenKnop.disabled = false;
        k.eigenKnop.focus();
      } else if (knop === k.eigenKnop) {
        eigenErbij(k);
      } else if (knop === k.weg) {
        var geteld = k.rijen.some(function (x) { var s = staat(x); return !s.concept && s.n > 0; });
        if (geteld && !window.confirm(vul(S.kamer_weg_vraag, { kamer: k.naam }))) return;
        var plek = kamers.indexOf(k);
        kamers.splice(plek, 1);
        tabs.removeChild(k.tab);
        panelen.removeChild(k.paneel);
        if (kamers.length) kies(kamers[Math.min(plek, kamers.length - 1)], true);
        else { kies(null); soortKeuze.focus(); }
      }
      herbereken();
    });
    panelen.addEventListener('input', function (e) {
      var paneel = e.target.closest('.m3c-paneel'), k = paneel && paneel.im3, rijEl = e.target.closest('.m3c-rij');
      if (k && e.target === k.zoekInvoer) { toonZoek(k); return; }
      if (k && e.target === k.naamInvoer) {
        k.eigenNaam = k.naamInvoer.value.trim();
        zetNaam(k);
      } else if (rijEl && e.target === rijEl.im3.naamInvoer) {
        zetLabels(rijEl.im3.kamer, rijEl.im3);
      }
      herbereken();
    });
    panelen.addEventListener('keydown', function (e) {
      var paneel = e.target.closest('.m3c-paneel'), k = paneel && paneel.im3;
      if (!k || !(e.target === k.zoekInvoer || e.target.classList.contains('im3-zoek__kies'))) return;
      var knoppen = Array.prototype.slice.call(k.zoekLijst.querySelectorAll('.im3-zoek__kies')), i = knoppen.indexOf(e.target);
      if (e.key === 'Enter' && e.target === k.zoekInvoer) {
        e.preventDefault();
        if (knoppen.length) uitZoek(k, knoppen[0].getAttribute('data-item'));
      } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && knoppen.length) {
        e.preventDefault();
        var j = i + (e.key === 'ArrowDown' ? 1 : -1);
        (j < 0 ? k.zoekInvoer : knoppen[Math.min(j, knoppen.length - 1)]).focus();
      } else if (e.key === 'Escape' && (k.zoekInvoer.value || i >= 0)) {
        e.preventDefault();
        wisZoek(k);
        k.zoekInvoer.focus();
      }
    });
    panelen.addEventListener('change', function (e) {
      var paneel = e.target.closest('.m3c-paneel'), k = paneel && paneel.im3, rijEl = e.target.closest('.m3c-rij');
      if (k && e.target === k.naamInvoer) { k.naamInvoer.value = k.naam; return; }
      if (!rijEl) return;
      var r = rijEl.im3, s = staat(r);
      if (e.target === r.invoer && s.n !== null) r.invoer.value = s.n;
      toonFout(r, s);
      herbereken();
    });
    // alles op nul: alleen de aantallen; kamers, namen en eigen items blijven staan (zoals intl-m3.js)
    wis.addEventListener('click', function () {
      kamers.forEach(function (k) {
        k.rijen.forEach(function (r) { r.invoer.value = '0'; toonFout(r, staat(r)); });
      });
      herbereken();
    });
    function naarFout() {
      kamers.forEach(function (k) { k.rijen.forEach(function (r) { toonFout(r, staat(r)); }); });
      herbereken();
      if (!fouten.length) return false;
      var r = fouten[0];
      kies(r.kamer);
      r.invoer.focus();
      return true;
    }
    // prijs- en offerteknop: met een fout eerst verbeteren (capture: vóór pro-calculators.js, dat dan een leeg data-m3 ziet)
    raster.addEventListener('click', function (e) {
      var knop = e.target.closest('[data-m3prijs],[data-m3offerte]');
      if (!knop) return;
      if (naarFout()) { e.preventDefault(); return; }
      // lokaal (www /verhuisprijscalculator/): het volume direct in het volumeveld; zonder geldig volume blijft het veld staan
      if (knop === prijsEl && modusPrijs === 'lokaal') {
        var veld = document.getElementById('vpc-m3');
        if (!prijsM3 || !veld) { e.preventDefault(); prijsStatus.setAttribute('tabindex', '-1'); prijsStatus.focus(); return; }
        veld.value = prijsM3;
        veld.dispatchEvent(new Event('input', { bubbles: true }));
      } else if (knop === prijsEl && !prijsM3 && modusPrijs !== 'link') {
        e.preventDefault();
        prijsStatus.setAttribute('tabindex', '-1');
        prijsStatus.focus();
      }
    }, true);
    document.addEventListener('submit', function (e) {
      if (opm && e.target === opm.form) herbereken();
    }, true);

    D.standaard.forEach(function (soort) { maakKamer(soort); });
    kies(kamers[0]);
    herbereken();

    function plak() { somEl.classList.toggle('im3-som--los', somEl.offsetHeight + 120 + 16 > window.innerHeight); }
    window.addEventListener('resize', plak);
    if ('ResizeObserver' in window) new ResizeObserver(plak).observe(somEl);

    if (!('IntersectionObserver' in window)) return;
    var mcta = document.querySelector('.mcta'), kamersIn = false, mctaHoogte = 0;
    var cijferEl = somEl.querySelector('.m3c-som__cijfer'), kop = document.querySelector('#topbar');
    function meetOnderkant() {
      // De eigen totaalbalk verbergt de mobiele sitebalk. Meet zonder die invloed.
      var zichtbaar = balk.classList.contains('is-zichtbaar');
      if (zichtbaar) balk.classList.remove('is-zichtbaar');
      mctaHoogte = mcta ? mcta.offsetHeight : 0;
      if (zichtbaar) balk.classList.add('is-zichtbaar');
    }
    function zet() {
      if (mcta && !mctaHoogte) meetOnderkant();
      if (mcta && mcta.offsetHeight > 0) mctaHoogte = mcta.offsetHeight;
      var r = cijferEl.getBoundingClientRect(), boven = kop ? Math.max(0, kop.getBoundingClientRect().bottom) : 0;
      var cijferIn = r.top >= boven && r.bottom <= window.innerHeight - mctaHoogte;
      balk.style.setProperty('--m3c-onder', mctaHoogte + 'px');
      balk.classList.toggle('is-zichtbaar', kamersIn && !cijferIn);
    }
    var kijker = new IntersectionObserver(function (items) {
      items.forEach(function (x) { kamersIn = x.isIntersecting; });
      zet();
    });
    meetOnderkant();
    kijker.observe(kamersEl);
    if (mcta && 'ResizeObserver' in window) new ResizeObserver(zet).observe(mcta);
    window.addEventListener('scroll', zet, { passive: true });
    window.addEventListener('resize', function () { meetOnderkant(); zet(); });
  }

  function haal(url) {
    return fetch(url, { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error(url + ' ' + r.status);
      return r.json();
    });
  }
  // teksten: de gedeelde strings van v2.3.3 (data-strings, ongewijzigd) met daaroverheen de particuliere teksten
  Promise.all([haal(blok.getAttribute('data-strings')), haal(blok.getAttribute('data-strings-prive')), haal(blok.getAttribute('data-inboedel'))])
    .then(function (x) {
      var S = {};
      Object.keys(x[0]).forEach(function (k) { S[k] = x[0][k]; });
      Object.keys(x[1]).forEach(function (k) { S[k] = x[1][k]; });
      bouw(S, x[2]);
    })
    // zonder teksten of inboedel geen half blok: de sectie verdwijnt, offerte en telefoon blijven
    .catch(function () { blok.hidden = true; });
})();
