/* Internationale m³-calculator, v6 (GO-90-007 v2, proef v2.3, besluiten 14, 15, 16 en 37, 25-10-2026).
   De bezoeker telt de inboedel per kamer met een plus/min-teller per item, zonder m³ per item (besluit 37). Per kamer
   staan hoogstens 20 items in beeld (data-inboedel, veld zichtbaar); met het zoekveld van de kamer komt elk ander item
   erbij, met teller 1. Kamers toevoegen en hernoemen kan, en eigen items met een grootte klein, middel of groot.
   Advies: groupage kan bij elk volume (besluit 15). Daarnaast over de
   weg een eigen vrachtwagen (volle lading) en overzee de kleinste eigen container waar alles in past (Shahab 25-10:
   containers alleen op de zeeroute). Op een keuzepagina is nog geen route gekozen en staat het advies voor beide
   routes er (Shahab 25-10). De telling staat als beheerd blok in Opmerkingen van het
   offerteformulier; de eigen tekst van de bezoeker blijft staan. Er gaat pas iets weg als de bezoeker het formulier
   zelf verstuurt. Catalogus en kamers komen uit data-inboedel, alle tekst uit data-strings (fetch valt onder
   connect-src 'self'). Rekenen gaat in hele liters: de tekst '0,432' wordt cijfer voor cijfer 432, zodat 9 × 0,15
   echt 1,35 is en nooit 1,3499999 (K1). Een kamer of rij is een eigen object met een eigen id; naam en soort zijn
   alleen een label. */
(function () {
  var blok = document.querySelector('[data-im3]');
  if (!blok || !window.fetch) return;

  // bovengrens per containerstap in liters, inclusief: 20 en 40 voet en 40 voet high cube uit www (blog
  // zeecontainer-afmetingen), 45 voet high cube uit de containerstandaard (besluit 13); groupage kan bij elk volume
  var STAPPEN = [['c20', 33000], ['c40', 67000], ['c40hc', 76000], ['c45', 86000]];
  // MAX_ZOEK: zoveel treffers staan er hoogstens onder het zoekveld; typ verder om te verfijnen
  var MAX_AANTAL = 99, MAX_KAMERS = 30, MAX_EIGEN = 30, MAX_ZOEK = 8;
  var SVG = 'http://www.w3.org/2000/svg';

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
  // aantal: een heel getal als tekst; leeg is 0, negatief is 0, boven 99 is 99; 1e2, 2,9 en 1 000 zijn fout
  // (null), zodat niets stil als 1 of 2 wordt gelezen
  function leesAantal(t) {
    if (!t.trim()) return 0;
    var m = /^\s*([+-]?)(\d+)\s*$/.exec(t);
    if (!m) return null;
    return m[1] === '-' ? 0 : Math.min(MAX_AANTAL, parseInt(m[2], 10));
  }
  // zoeken zonder hoofdletters, accenten en leestekens: 'Föhn' vindt 'fohn', '2-zitsbank' vindt '2 zitsbank'
  function norm(t) {
    return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  }
  // 0: begint met de zoektekst, 1: een woord begint ermee, 2: staat er ergens in; null als een zoekwoord ontbreekt
  function rang(n, woorden) {
    if (!woorden.every(function (w) { return n.indexOf(w) >= 0; })) return null;
    return n.indexOf(woorden.join(' ')) === 0 ? 0 : (' ' + n).indexOf(' ' + woorden[0]) >= 0 ? 1 : 2;
  }
  // index van de kleinste containerstap waar l liter in past; STAPPEN.length betekent meer dan één container
  function stapVan(l) {
    var i = 0;
    while (i < STAPPEN.length && l > STAPPEN[i][1]) i++;
    return i;
  }

  function bouw(S, D) {
    var een = new Intl.NumberFormat(S.locale, { maximumFractionDigits: 1, useGrouping: false });
    var drie = new Intl.NumberFormat(S.locale, { maximumFractionDigits: 3, useGrouping: false });
    // weergave op een tiende, een halve tiende omhoog, in gehele getallen gerekend
    function tienden(l) { return Math.floor((l + 50) / 100); }
    function m3(l) { return een.format(tienden(l) / 10); }
    function precies(l) { return drie.format(l / 1000); }
    var SOORTEN = {};
    D.kamers.forEach(function (k) { SOORTEN[k.id] = k.zichtbaar; });
    // zoekindex: de naam in de taal van de pagina, plus NL- en EN-namen en synoniemen uit de inboedeldata
    var INDEX = Object.keys(D.liters).map(function (id) {
      return { id: id, naam: norm(S.items[id]), termen: (D.zoek[id] || []).map(function (t) { return { t: t, n: norm(t) }; }) };
    });
    // treffers op de naam eerst, dan op een andere naam of synoniem (die staat er dan bij), dan op het alfabet
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

    // vervoerswijze: de pagina stelt weg of zee voor (data-route); op een keuzepagina (en zonder geldige data-route) is
    // nog niets gekozen: dan 'beide', met het advies voor weg en zee. De bezoeker kan altijd kiezen of wisselen.
    var route = { weg: 'weg', zee: 'zee' }[blok.getAttribute('data-route')] || 'beide';
    var app = blok.querySelector('[data-im3-app]');
    var kamers = [], volgnummer = 0, actief = null;

    var keuze = el('fieldset', { 'class': 'im3-route' }, [el('legend', { text: S.route_label })]);
    ['weg', 'zee'].forEach(function (r) {
      var invoer = el('input', { type: 'radio', name: 'im3-route', value: r });
      invoer.checked = r === route;
      keuze.appendChild(el('label', {}, [invoer, el('span', { text: S['route_' + r] })]));
    });

    var tabs = el('div', { 'class': 'm3c-tabs', role: 'tablist', 'aria-labelledby': 'im3-kamers-label' });
    var panelen = el('div', { 'class': 'm3c-panelen' });
    var kamersLeeg = el('p', { 'class': 'im3-kamers-leeg', text: S.kamers_leeg });

    // kamer toevoegen: staat onder de lijst, buiten de tablist
    var soortKeuze = el('select', { id: 'im3-soort', name: 'im3-soort' }, [el('option', { value: '', text: S.kamer_kies })]);
    D.toevoegen.forEach(function (id) {
      soortKeuze.appendChild(el('option', { value: id, text: id === D.eigen_kamer ? S.kamer_andere_keuze : S.kamers[id] }));
    });
    var eigenKamer = el('input', { type: 'text', id: 'im3-kamernaam', name: 'im3-kamernaam', maxlength: '40', placeholder: S.kamer_naam_voorbeeld, autocomplete: 'off' });
    var eigenKamerVeld = el('p', { 'class': 'im3-erbij__naam' }, [el('label', { 'for': 'im3-kamernaam', text: S.kamer_naam_label }), eigenKamer]);
    eigenKamerVeld.hidden = true;
    var erbijKnop = el('button', { type: 'button', 'class': 'btn btn--omlijnd im3-erbij__knop', text: S.kamer_toevoegen_knop });
    var erbijFout = el('p', { 'class': 'im3-fout', id: 'im3-erbij-fout', text: S.kamer_naam_nodig });
    erbijFout.hidden = true;
    // kamer toevoegen staat boven de kamerlijst (Shahab 25-10): eerst kamers kiezen, dan tellen
    var erbij = el('div', { 'class': 'im3-erbij im3-erbij--boven' }, [
      el('p', { 'class': 'im3-erbij__soort' }, [el('label', { 'for': 'im3-soort', text: S.kamer_toevoegen_label }), soortKeuze]),
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

    // elk veld krijgt een unieke name (Chrome-melding 'form field should have an id or name'); de calculator staat buiten
    // het offerteformulier, dus deze velden gaan nooit zelf mee bij het versturen. Een item toont alleen naam en teller,
    // geen m³ (besluit 37); de liters rekenen wel mee
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
      // eigen item in twee regels: naam en teller, daaronder de grootte en het kruisje (css-raster)
      r.el = el('div', { 'class': 'm3c-rij' + (eigen ? ' im3-eigen' : '') }, [wat, el('div', { 'class': 'm3c-rij__tel' }, [min, invoer, plus]), r.maatKeuze, r.weg]);
      r.el.im3 = r;
      zetLabels(k, r);
      return r;
    }

    function maakKamer(soort, eigenNaam) {
      var id = 'im3-k' + (++volgnummer);
      // volgnummer per soort ligt vast bij het maken: na weghalen van Slaapkamer blijft Slaapkamer 2 zo heten
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
      // zoekveld van de kamer: treffers als knoppen eronder, de status leest een schermlezer voor
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

    // treffers onder het zoekveld; leeg of één teken: geen lijst en geen melding
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
    // een gezocht item: staat het al in de kamer, dan telt het minstens 1; anders een nieuwe rij met teller 1, bovenaan
    // de lijst, direct onder het zoekveld. Een rij blijft daarna staan, ook op 0 (punt 3: met aantal boven 0 altijd)
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

    // de stand van een rij: aantal en liters, of de foutmelding; een eigen item zonder naam is nog een concept
    function staat(r) {
      var n = leesAantal(r.invoer.value);
      var concept = r.eigen && !r.naamInvoer.value.trim();
      return { n: n, l: r.eigen ? D.eigen_maten[r.maatKeuze.value] : r.bron, fout: n === null ? 'fout_aantal' : null, concept: concept };
    }
    // foutmelding zichtbaar maken (bij het verlaten van een veld en bij de offerteknop) of weghalen zodra het klopt
    function toonFout(r, s) {
      if (s.fout) { r.invoer.setAttribute('aria-invalid', 'true'); r.invoer.setAttribute('aria-describedby', r.fout.id); }
      else { r.invoer.removeAttribute('aria-invalid'); r.invoer.removeAttribute('aria-describedby'); }
      r.fout.textContent = s.fout ? S[s.fout] : '';
      r.fout.hidden = !s.fout;
      r.el.classList.toggle('is-fout', !!s.fout);
    }

    var totaalEl = el('b', { text: '0' }), balkTotaal = el('b', { text: '0' });
    var preciesEl = el('p', { 'class': 'im3-precies' });
    var leeg = el('p', { 'class': 'm3c-som__leeg', text: S.leeg });
    var onvolledig = el('p', { 'class': 'im3-onvolledig', role: 'status' });
    var groupageTitel = el('p', { 'class': 'im3-optie__titel' });
    var groupageTekst = el('p', { 'class': 'im3-optie__tekst' });
    var stappen = el('ol', { 'class': 'im3-stappen', 'aria-label': S.stappen_label });
    STAPPEN.forEach(function (s) { stappen.appendChild(el('li', { text: S.stappen[s[0]] })); });
    var containerTitel = el('p', { 'class': 'im3-optie__titel' });
    // bij 'beide' krijgen vrachtwagen en container hun route erboven
    function routeLabel(r) { return el('p', { 'class': 'im3-optie__route', text: S['route_' + r] }); }
    var vrachtOptie = el('div', { 'class': 'im3-optie im3-optie--vrachtwagen' }, [routeLabel('weg'),
      el('p', { 'class': 'im3-optie__titel', text: S.advies.vrachtwagen.titel }),
      el('p', { 'class': 'im3-optie__tekst', text: S.advies.vrachtwagen.tekst })]);
    var containerTekst = el('p', { 'class': 'im3-optie__tekst' });
    var vulStreep = el('span');
    var vulBalk = el('div', { 'class': 'im3-vul', 'aria-hidden': 'true' }, [vulStreep]);
    var minderTekst = el('p', { 'class': 'im3-minder__tekst' });
    var keuzeTekst = el('p', { 'class': 'im3-advies__keuze' });
    var posten = el('ul', { 'class': 'im3-posten' });
    var containerOptie = el('div', { 'class': 'im3-optie im3-optie--container' }, [routeLabel('zee'), containerTitel, stappen, containerTekst, vulBalk]);
    // groupage altijd; over de weg de eigen vrachtwagen, overzee de eigen container, bij 'beide' allebei
    var advies = el('div', { 'class': 'im3-advies', 'aria-live': 'polite' }, [
      el('p', { 'class': 'im3-advies__label', text: S.advies_label }),
      el('div', { 'class': 'im3-optie im3-optie--groupage' }, [groupageTitel, groupageTekst]),
      vrachtOptie, containerOptie,
      keuzeTekst,
      el('div', { 'class': 'im3-minder' }, [
        el('p', { 'class': 'im3-minder__kop', text: S.minder_kop }), minderTekst,
        el('p', { 'class': 'im3-minder__label', text: S.grootste }), posten
      ])
    ]);
    var wis = el('button', { type: 'button', 'class': 'm3c-som__wis', text: S.wis });
    function offerteKnop() { return el('a', { 'class': 'btn btn--offerte im3-offerte', href: '#offerte-aanvragen', text: S.offerte }); }

    var kamersEl = el('div', { 'class': 'm3c-kamers is-klaar' }, [
      keuze, erbij,
      el('p', { 'class': 'm3c-kamers__label', id: 'im3-kamers-label' }, [
        el('img', { 'class': 'm3c-ico', src: '/assets/img/iconen/kleur/adviseur-aan-huis.svg', alt: '', width: '28', height: '28', decoding: 'async' }),
        document.createTextNode(S.kamers_label)
      ]),
      tabs, kamersLeeg, panelen
    ]);
    var somEl = el('aside', { 'class': 'm3c-som', 'aria-labelledby': 'im3-som-label' }, [
      el('div', { 'class': 'm3c-som__kaart' }, [
        el('img', { 'class': 'm3c-som__ico', src: '/assets/img/iconen/wit/vrachtwagen.svg', alt: '', width: '56', height: '56', decoding: 'async' }),
        el('p', { 'class': 'label', id: 'im3-som-label', text: S.som_label }),
        el('p', { 'class': 'm3c-som__cijfer', 'aria-live': 'polite' }, [totaalEl, el('span', { text: S.eenheid })]),
        preciesEl, onvolledig, leeg, advies,
        el('p', { 'class': 'im3-verpakking', text: S.verpakking }),
        el('div', { 'class': 'm3c-som__acties' }, [offerteKnop()]),
        wis
      ])
    ]);
    var balk = el('div', { 'class': 'm3c-balk', role: 'group', 'aria-label': S.balk_label }, [
      el('p', { 'class': 'm3c-balk__som' }, [el('span', { text: S.som_label }), balkTotaal, document.createTextNode(' ' + S.eenheid)]),
      offerteKnop()
    ]);
    app.appendChild(el('div', { 'class': 'm3c-raster' }, [kamersEl, somEl, balk]));

    // het blok in Opmerkingen: tussen een begin- en een eindregel, de rest van het veld is van de bezoeker
    var opm = document.querySelector('#offerte-aanvragen #sb-ob-opm');
    var inventaris = '', fouten = [];
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
      var totaal = 0, rijen = [], regelsPerKamer = [];
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
          if (!telt) return;
          som += s.n * s.l;
          rijen.push({ r: r, k: k, n: s.n, l: s.n * s.l });
          regels.push(vul(S.formulier_regel, { aantal: s.n, item: itemNaam(r), maat: precies(s.l), eenheid: eenheid(r), m3: precies(s.n * s.l) }));
        });
        k.som.textContent = m3(som) + ' ' + S.eenheid;
        k.som.classList.toggle('is-actief', som > 0);
        if (regels.length) regelsPerKamer.push(vul(S.formulier_kamer, { kamer: k.naam, m3: precies(som) }), regels.join('\n'));
        totaal += som;
      });
      totaalEl.textContent = balkTotaal.textContent = m3(totaal);
      var getoond = fouten.filter(function (r) { return r.fout.textContent; }).length;
      onvolledig.textContent = getoond === 1 ? S.onvolledig_een : vul(S.onvolledig, { aantal: getoond });
      onvolledig.hidden = !getoond;
      leeg.hidden = totaal > 0;
      advies.hidden = !(totaal > 0);
      preciesEl.hidden = true;
      kamersLeeg.hidden = kamers.length > 0;
      erbijKnop.disabled = kamers.length >= MAX_KAMERS;
      inventaris = '';
      if (totaal > 0) {
        var i = stapVan(totaal), stap = i < STAPPEN.length ? STAPPEN[i][0] : 'meer';
        // vulgraad uit het exacte totaal, op hele procenten met een halve procent omhoog
        var pct = i < STAPPEN.length ? Math.floor((totaal * 200 + STAPPEN[i][1]) / (2 * STAPPEN[i][1])) : 0;
        var weg = route === 'weg', g = S.advies['groupage_' + route], a = S.advies[stap];
        groupageTitel.textContent = g.titel;
        groupageTekst.textContent = g.tekst;
        vrachtOptie.hidden = route === 'zee';
        containerOptie.hidden = weg;
        advies.classList.toggle('is-beide', route === 'beide');
        Array.prototype.forEach.call(stappen.children, function (li, j) {
          li.classList.toggle('is-nu', j === i);
          li.classList.toggle('is-voorbij', j < i);
        });
        containerTitel.textContent = a.titel;
        containerTekst.textContent = vul(a.tekst, { pct: pct });
        vulBalk.hidden = !pct;
        vulStreep.style.width = Math.min(100, pct) + '%';
        keuzeTekst.textContent = S['keuze_' + route];
        // een tiende afronden kan over een containergrens heen vallen (33,001 toont 33): dan ook het exacte getal
        if (!weg && stapVan(tienden(totaal) * 100) !== i) {
          preciesEl.textContent = vul(S.precies, { m3: precies(totaal), grens: STAPPEN[i - 1][1] / 1000, stap: S.stappen[STAPPEN[i - 1][0]] });
          preciesEl.hidden = false;
        }
        // minder meenemen: hoeveel kuub eraf moet voor de vorige containerstap, naar boven afgerond op een tiende;
        // over de weg zijn er geen containerstappen
        minderTekst.textContent = weg ? S.minder_weg : i === 0 ? S.minder_kleinste
          : vul(S.minder_naar[STAPPEN[i - 1][0]], { minder: een.format(Math.ceil((totaal - STAPPEN[i - 1][1]) / 100) / 10) });
        rijen.sort(function (x, y) { return y.l - x.l; });
        posten.textContent = '';
        // de grootste posten staan bovenaan, zonder m³ per regel (besluit 37a); in Opmerkingen blijft de m³ voor De Bresser
        rijen.slice(0, 3).forEach(function (p) {
          posten.appendChild(el('li', { text: vul(S.post, { aantal: p.n, item: itemNaam(p.r), kamer: p.k.naam }) }));
        });
        inventaris = [S.blok_begin,
          vul(S.formulier_totaal, { m3: m3(totaal), exact: precies(totaal), route: S['route_' + route] }),
          weg ? S.formulier_advies_weg : vul(S[(route === 'beide' ? 'formulier_advies_beide' : 'formulier_advies') + (stap === 'meer' ? '_meer' : '')],
            { stap: S.stappen[stap], pct: pct })]
          .concat(regelsPerKamer)
          .concat(fouten.length ? [vul(S.formulier_onvolledig, { regels: fouten.map(function (r) { return r.kamer.naam + ': ' + itemNaam(r); }).join('; ') })] : [])
          .concat([S.formulier_slot, S.blok_eind]).join('\n');
      }
      zetInFormulier();
    }

    // tabbladen, net als site-pro.js: pijltjes, Home en End wisselen
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
      // zoeken verandert de telling niet, alleen de treffers
      if (k && e.target === k.zoekInvoer) { toonZoek(k); return; }
      if (k && e.target === k.naamInvoer) {
        // hernoemen: alleen het label; leeg is weer de standaardnaam
        k.eigenNaam = k.naamInvoer.value.trim();
        zetNaam(k);
      } else if (rijEl && e.target === rijEl.im3.naamInvoer) {
        zetLabels(rijEl.im3.kamer, rijEl.im3);
      }
      herbereken();
    });
    // zoeken met het toetsenbord: Enter neemt de eerste treffer, de pijltjes gaan door de treffers en terug naar het
    // zoekveld, Escape wist de zoektekst
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
    // bij het verlaten van een veld: een geldig aantal wordt netjes geschreven (+2 wordt 2, 150 wordt 99); een
    // ongeldig veld blijft staan zoals het is getypt en krijgt een melding
    panelen.addEventListener('change', function (e) {
      var paneel = e.target.closest('.m3c-paneel'), k = paneel && paneel.im3, rijEl = e.target.closest('.m3c-rij');
      if (k && e.target === k.naamInvoer) { k.naamInvoer.value = k.naam; return; }
      if (!rijEl) return;
      var r = rijEl.im3, s = staat(r);
      if (e.target === r.invoer && s.n !== null) r.invoer.value = s.n;
      toonFout(r, s);
      herbereken();
    });
    keuze.addEventListener('change', function (e) { route = e.target.value; herbereken(); });
    // alles op nul: alleen de aantallen; kamers, namen, eigen items met hun grootte en gezochte items blijven staan (K1 R09)
    wis.addEventListener('click', function () {
      kamers.forEach(function (k) {
        k.rijen.forEach(function (r) { r.invoer.value = '0'; toonFout(r, staat(r)); });
      });
      herbereken();
    });
    // alle fouten zichtbaar maken; de eerste krijgt de focus, in zijn eigen kamer
    function naarFout() {
      kamers.forEach(function (k) { k.rijen.forEach(function (r) { toonFout(r, staat(r)); }); });
      herbereken();
      if (!fouten.length) return false;
      var r = fouten[0];
      kies(r.kamer);
      r.invoer.focus();
      return true;
    }
    // offerteknop: met een fout eerst verbeteren, anders staat de actuele telling al in Opmerkingen
    app.addEventListener('click', function (e) {
      if (e.target.closest('.im3-offerte') && naarFout()) e.preventDefault();
    });
    // vlak voor het versturen van het offerteformulier (capture, dus voor site-pro.js de velden leest) nog een keer
    // bijwerken, zodat er nooit een oude telling meegaat
    document.addEventListener('submit', function (e) {
      if (opm && e.target === opm.form) herbereken();
    }, true);

    D.standaard.forEach(function (soort) { maakKamer(soort); });
    kies(kamers[0]);
    herbereken();

    // totaalkaart: de site-css zet hem vanaf 1000px sticky op 120px. Is hij hoger dan het beeld, dan bleven het onderste
    // advies en de offerteknop tot het eind van de kamerlijst onbereikbaar (K1 B13-01); dan scrolt hij gewoon mee en
    // neemt de totaalbalk onderin het over, ook boven 1000px (Shahab 25-10, css)
    function plak() { somEl.classList.toggle('im3-som--los', somEl.offsetHeight + 120 + 16 > window.innerHeight); }
    window.addEventListener('resize', plak);
    if ('ResizeObserver' in window) new ResizeObserver(plak).observe(somEl);

    // vaste totaalbalk (css tot 1000px, daarboven alleen bij een kaart die niet meeschuift): zichtbaar zolang de kamers
    // in beeld zijn en het totaalcijfer niet volledig zichtbaar is
    if (!('IntersectionObserver' in window)) return;
    var mcta = document.querySelector('.mcta'), kamersIn = false;
    var cijferEl = somEl.querySelector('.m3c-som__cijfer'), kop = document.querySelector('#topbar');
    var mctaHoogte = 0;
    function meetOnder() {
      // Meet de bel/offertebalk alsof onze balk uit staat; anders verbergt :has hem en gaat de grens heen en weer.
      var actief = balk.classList.contains('is-zichtbaar');
      balk.classList.remove('is-zichtbaar');
      mctaHoogte = mcta ? mcta.offsetHeight : 0;
      balk.classList.toggle('is-zichtbaar', actief);
    }
    meetOnder();
    function zet() {
      // Cookiebanner of menu kan de bel/offertebalk bij het starten nog verbergen.
      if (mcta && !mctaHoogte) meetOnder();
      var onderHoogte = mcta ? mcta.offsetHeight : 0;
      if (onderHoogte > 0) mctaHoogte = onderHoogte;
      var r = cijferEl.getBoundingClientRect(), boven = kop ? Math.max(0, kop.getBoundingClientRect().bottom) : 0;
      var cijferIn = r.top >= boven && r.bottom <= window.innerHeight - mctaHoogte;
      balk.style.setProperty('--m3c-onder', mctaHoogte + 'px');
      balk.classList.toggle('is-zichtbaar', kamersIn && !cijferIn);
    }
    var kijker = new IntersectionObserver(function (items) {
      items.forEach(function (x) { kamersIn = x.isIntersecting; });
      zet();
    });
    kijker.observe(kamersEl);
    if (mcta && 'ResizeObserver' in window) new ResizeObserver(zet).observe(mcta);
    window.addEventListener('scroll', zet, { passive: true });
    window.addEventListener('resize', function () { meetOnder(); zet(); });
  }

  function haal(url) {
    return fetch(url, { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error(url + ' ' + r.status);
      return r.json();
    });
  }
  Promise.all([haal(blok.getAttribute('data-strings')), haal(blok.getAttribute('data-inboedel'))])
    .then(function (x) { bouw(x[0], x[1]); })
    // zonder teksten of inboedel geen half blok: dan verdwijnt de sectie en blijven offerte en telefoon op de pagina
    .catch(function () { blok.hidden = true; });
})();
