/* =====================================================================
   De Bresser · Contactformulier in 3D
   Rond elk formulier met data-form3d komen zarf, telefoon, chatballon,
   papieren vliegtuig, locatiepin en klok uit het kaartoppervlak naar voren
   en zweven om de kaart. Ze reageren op het formulier:
   naam/bericht -> chatballon, telefoon -> telefoon gaat over,
   e-mail -> zarf, verzonden -> het vliegtuig vliegt weg.

   Het canvas staat absoluut naast de kaart in de pagina (scrolt dus
   gewoon mee en blijft onder de header). Eén canvas per kaart.

   Bouwen (three 0.186): npx esbuild js/src/contact-3d.src.js --bundle --minify
   --format=iife --target=es2019 --outfile=js/contact-3d.js
   Test: ?f3d-t=4.5 zet de tijd vast, ?f3d-motion negeert reduced motion.
   ===================================================================== */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-form3d]'));
  if (!cards.length) return;

  var query = new URLSearchParams(location.search);
  var fixedTime = query.has('f3d-t') ? parseFloat(query.get('f3d-t')) : null;
  var reduce = query.has('f3d-motion') ? { matches: false } : window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ---------- hulpjes ---------- */
  var HANDSET = new Path2D('M5 3.5h3.5l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.5 1.5C10.6 20.5 3.5 13.4 3.5 5A1.5 1.5 0 0 1 5 3.5z');
  var FONT = 'Sora, Arial, sans-serif';
  function hash(a, b, c) { var v = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return v - Math.floor(v); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function smooth(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeIn(t) { return t * t * t; }
  function easeOutBack(t) { var c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  function roundRectShape(w, h, r) {
    var s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }

  var pointer = { x: 0.5, y: 0.5 };
  window.addEventListener('pointermove', function (e) {
    pointer.x = e.clientX / window.innerWidth;
    pointer.y = e.clientY / window.innerHeight;
  }, { passive: true });

  /* ---------- objecten (per canvas opnieuw gebouwd) ---------- */
  function Kit(renderer) {
    var aniso = renderer.capabilities.getMaxAnisotropy();
    function tex(w, h, draw) {
      var c = document.createElement('canvas');
      c.width = w; c.height = h;
      draw(c.getContext('2d'), w, h);
      var t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = aniso;
      return t;
    }
    this.tex = tex;

    this.envelope = function () {
      var g = new THREE.Group();
      var map = tex(600, 400, function (c, w, h) {
        c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
        c.fillStyle = 'rgba(15,44,89,.045)';
        c.beginPath(); c.moveTo(0, h); c.lineTo(w / 2, h * 0.5); c.lineTo(w, h); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(15,44,89,.16)'; c.lineWidth = 3;
        c.beginPath(); c.moveTo(4, h - 4); c.lineTo(w * 0.43, h * 0.58); c.moveTo(w - 4, h - 4); c.lineTo(w * 0.57, h * 0.58); c.stroke();
        c.fillStyle = '#0f2c59'; c.font = '600 30px ' + FONT; c.textAlign = 'right';
        c.fillText('De Bresser', w - 40, h - 44);
        c.fillStyle = '#10b981'; c.fillRect(w - 190, h - 34, 150, 5);
      });
      var paper = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.75, sheen: 0.5, sheenColor: new THREE.Color(0xffffff) });
      var front = new THREE.MeshPhysicalMaterial({ map: map, roughness: 0.75, sheen: 0.5, sheenColor: new THREE.Color(0xffffff) });
      g.add(new THREE.Mesh(new RoundedBoxGeometry(150, 100, 3, 2, 1.2), [paper, paper, paper, paper, front, paper]));
      var flapShape = new THREE.Shape();
      flapShape.moveTo(-74, 49); flapShape.lineTo(74, 49); flapShape.lineTo(0, -6); flapShape.closePath();
      var shade = new THREE.Mesh(new THREE.ShapeGeometry(flapShape), new THREE.MeshBasicMaterial({ color: 0x0a1f40, transparent: true, opacity: 0.1, depthWrite: false }));
      shade.position.set(0, -2.5, 1.62);
      g.add(shade);
      var flap = new THREE.Mesh(new THREE.ShapeGeometry(flapShape), new THREE.MeshPhysicalMaterial({ color: 0xeef2f8, roughness: 0.7, sheen: 0.4, sheenColor: new THREE.Color(0xffffff) }));
      flap.position.z = 1.75;
      g.add(flap);
      var sealMap = tex(128, 128, function (c, w) {
        var gr = c.createRadialGradient(w * 0.4, w * 0.35, 4, w / 2, w / 2, w / 2);
        gr.addColorStop(0, '#6ee7b7'); gr.addColorStop(0.5, '#10b981'); gr.addColorStop(1, '#047857');
        c.fillStyle = gr; c.fillRect(0, 0, w, w);
        c.strokeStyle = '#fff'; c.lineWidth = 12; c.lineCap = 'round'; c.lineJoin = 'round';
        c.beginPath(); c.moveTo(38, 66); c.lineTo(56, 84); c.lineTo(90, 46); c.stroke();
      });
      sealMap.center.set(0.5, 0.5);
      sealMap.rotation = Math.PI / 2;
      var green = new THREE.MeshPhysicalMaterial({ color: 0x0e9f6e, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 });
      var seal = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 4, 40), [green, new THREE.MeshPhysicalMaterial({ map: sealMap, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 }), green]);
      seal.rotation.x = Math.PI / 2;
      seal.position.set(0, -2, 3.8);
      g.add(seal);
      return g;
    };

    this.phone = function () {
      var g = new THREE.Group();
      g.add(new THREE.Mesh(new RoundedBoxGeometry(80, 164, 10, 4, 11), new THREE.MeshPhysicalMaterial({ color: 0x1c2436, metalness: 0.85, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08 })));
      var map = tex(360, 740, function (c, w, h) {
        var gr = c.createLinearGradient(0, 0, 0, h);
        gr.addColorStop(0, '#1b4580'); gr.addColorStop(0.55, '#0f2c59'); gr.addColorStop(1, '#061430');
        c.fillStyle = gr; c.fillRect(0, 0, w, h);
        c.fillStyle = 'rgba(255,255,255,.9)'; c.font = '600 22px ' + FONT; c.textAlign = 'left';
        c.fillText('09:41', 34, 52);
        c.textAlign = 'center';
        c.fillStyle = '#c9d5ea'; c.font = '400 22px ' + FONT;
        c.fillText('Inkomende oproep', w / 2, 168);
        [100, 80].forEach(function (r, i) {
          c.strokeStyle = 'rgba(16,185,129,' + (0.25 + i * 0.2) + ')'; c.lineWidth = 3;
          c.beginPath(); c.arc(w / 2, 292, r, 0, Math.PI * 2); c.stroke();
        });
        var av = c.createLinearGradient(w / 2 - 62, 230, w / 2 + 62, 354);
        av.addColorStop(0, '#34d399'); av.addColorStop(1, '#047857');
        c.fillStyle = av; c.beginPath(); c.arc(w / 2, 292, 62, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#fff'; c.font = '700 46px ' + FONT; c.fillText('DB', w / 2, 309);
        c.font = '600 36px ' + FONT; c.fillText('De Bresser', w / 2, 438);
        c.fillStyle = '#c9d5ea'; c.font = '400 25px ' + FONT; c.fillText('013 52 82 372', w / 2, 480);
        function btn(x, col, angle) {
          c.fillStyle = col; c.beginPath(); c.arc(x, 626, 44, 0, Math.PI * 2); c.fill();
          c.save(); c.translate(x, 626); c.rotate(angle); c.scale(2.1, 2.1); c.translate(-12, -12);
          c.fillStyle = '#fff'; c.fill(HANDSET); c.restore();
        }
        btn(w * 0.27, '#ef4444', Math.PI * 0.75);
        btn(w * 0.73, '#10b981', 0);
      });
      var screen = new THREE.Mesh(new THREE.PlaneGeometry(72, 150), new THREE.MeshPhysicalMaterial({ map: map, emissiveMap: map, emissive: 0xffffff, emissiveIntensity: 0.8, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.02 }));
      screen.position.z = 5.05;
      g.add(screen);
      var island = new THREE.Mesh(new THREE.ShapeGeometry(roundRectShape(22, 6.5, 3.2), 6), new THREE.MeshBasicMaterial({ color: 0x000000 }));
      island.position.set(0, 66, 5.2);
      g.add(island);
      g.userData.ring = true;
      return g;
    };

    this.chat = function () {
      var g = new THREE.Group();
      var w = 128, h = 86, r = 32;
      var s = new THREE.Shape();
      s.moveTo(-w / 2 + r, -h / 2);
      s.lineTo(w / 2 - r, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      s.lineTo(w / 2, h / 2 - r); s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      s.lineTo(-w / 2 + r, h / 2); s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      s.lineTo(-w / 2, -h / 2 + 14);
      s.quadraticCurveTo(-w / 2 - 4, -h / 2 - 14, -w / 2 - 16, -h / 2 - 22);
      s.quadraticCurveTo(-w / 2 + 12, -h / 2 - 16, -w / 2 + r, -h / 2);
      var geo = new THREE.ExtrudeGeometry(s, { depth: 14, bevelEnabled: true, bevelThickness: 7, bevelSize: 6, bevelSegments: 6, curveSegments: 20 });
      geo.center();
      g.add(new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: 0x10b981, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.05 })));
      var white = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.3, clearcoat: 1 });
      g.userData.dots = [-30, 0, 30].map(function (x) {
        var d = new THREE.Mesh(new THREE.SphereGeometry(9, 28, 18), white);
        d.position.set(x, 4, 12);
        g.add(d);
        return d;
      });
      return g;
    };

    this.plane = function () {
      var N = [78, 0, 0], L = [-52, 60, 12], R = [-52, -60, 12], T = [-34, 0, -2], K = [-40, 0, -26], F = [-46, 8, 4], G = [-46, -8, 4];
      var v = [].concat(N, L, F, N, F, T, N, T, G, N, G, R, N, K, T, N, T, K);
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
      geo.computeVertexNormals();
      var g = new THREE.Group();
      g.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, side: THREE.DoubleSide, flatShading: true })));
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 1), new THREE.LineBasicMaterial({ color: 0xc3cfdd })));
      return g;
    };

    this.pin = function () {
      var s = new THREE.Shape();
      s.moveTo(0, -64);
      s.bezierCurveTo(-10, -40, -42, -18, -42, 10);
      s.absarc(0, 10, 42, Math.PI, 0, true);
      s.bezierCurveTo(42, -18, 10, -40, 0, -64);
      var hole = new THREE.Path();
      hole.absarc(0, 10, 16, 0, Math.PI * 2, false);
      s.holes.push(hole);
      var geo = new THREE.ExtrudeGeometry(s, { depth: 12, bevelEnabled: true, bevelThickness: 6, bevelSize: 5, bevelSegments: 6, curveSegments: 32 });
      geo.center();
      var g = new THREE.Group();
      g.add(new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: 0x0068b0, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.06 })));
      return g;
    };

    this.clock = function () {
      var g = new THREE.Group();
      var face = tex(512, 512, function (c, w) {
        var gr = c.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
        gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.85, '#f1f5fa'); gr.addColorStop(1, '#dfe7f1');
        c.fillStyle = gr; c.fillRect(0, 0, w, w);
        c.translate(w / 2, w / 2);
        for (var i = 0; i < 60; i++) {
          var big = i % 5 === 0;
          c.save(); c.rotate(i * Math.PI / 30);
          c.fillStyle = big ? '#0f2c59' : '#9fb0c6';
          c.fillRect(big ? -5 : -2, -228, big ? 10 : 4, big ? 36 : 16);
          c.restore();
        }
        c.textAlign = 'center';
        c.fillStyle = '#10b981'; c.font = '700 54px ' + FONT; c.fillText('24 uur', 0, 118);
        c.fillStyle = '#0f2c59'; c.font = '600 28px ' + FONT; c.fillText('De Bresser', 0, -92);
      });
      face.center.set(0.5, 0.5);
      face.rotation = Math.PI / 2;
      var side = new THREE.MeshPhysicalMaterial({ color: 0x10b981, metalness: 0.4, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 });
      var body = new THREE.Mesh(new THREE.CylinderGeometry(52, 52, 16, 64), [side, new THREE.MeshPhysicalMaterial({ map: face, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.03 }), side]);
      body.rotation.x = Math.PI / 2;
      g.add(body);
      var rim = new THREE.Mesh(new THREE.TorusGeometry(52, 4.5, 20, 72), new THREE.MeshPhysicalMaterial({ color: 0xe4eaf1, metalness: 1, roughness: 0.14 }));
      rim.position.z = 8;
      g.add(rim);
      var navy = new THREE.MeshStandardMaterial({ color: 0x0f2c59, roughness: 0.4 });
      function hand(w, l, z, mat) {
        var geo = new THREE.BoxGeometry(w, l, 1.6);
        geo.translate(0, l / 2 - 6, 0);
        var m = new THREE.Mesh(geo, mat);
        m.position.z = z;
        g.add(m);
        return m;
      }
      g.userData.hour = hand(6, 30, 9.2, navy);
      g.userData.minute = hand(4, 42, 10.4, navy);
      g.userData.second = hand(1.8, 46, 11.6, new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 }));
      var cap = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 2, 24), navy);
      cap.rotation.x = Math.PI / 2; cap.position.z = 12.6;
      g.add(cap);
      return g;
    };
  }

  /* ---------- per kaart: canvas, scène, plekken rond de kaart ---------- */
  var DIST = 1600;       /* afstand oog tot pagina in px */
  var DUR = 12;          /* seconden per rondje van één object */
  var FIELD_TO_ITEM = { naam: 'chat', bericht: 'chat', telefoon: 'phone', email: 'envelope' };

  /* x/y: px vanaf linksboven van de kaart (cw = kaartbreedte), z: px voor de pagina */
  var SLOTS_DESKTOP = {
    envelope: function (cw) { return [-40, 80, 200]; },
    chat:     function (cw) { return [cw - 20, -70, 170]; },
    phone:    function (cw) { return [cw + 60, 190, 240]; },
    plane:    function (cw) { return [cw * 0.42, -115, 220]; },
    pin:      function (cw) { return [-30, 340, 210]; },
    clock:    function (cw) { return [cw + 30, 430, 250]; }
  };
  var SLOTS_MOBILE = {
    envelope: function (cw) { return [cw * 0.16, -34, 110]; },
    plane:    function (cw) { return [cw * 0.5, -62, 130]; },
    chat:     function (cw) { return [cw * 0.84, -34, 110]; }
  };
  function slotsFor(leftFree, rightFree) {
    if (leftFree && rightFree) return SLOTS_DESKTOP;
    var s = {};
    Object.keys(SLOTS_DESKTOP).forEach(function (k) { s[k] = SLOTS_DESKTOP[k]; });
    if (!leftFree || !rightFree) s.plane = function (cw) { return [cw * 0.4, -58, 160, 0.78]; };
    if (!leftFree) {
      s.envelope = function (cw) { return [cw * 0.13, -34, 150, 0.78]; };
      delete s.pin;
    }
    if (!rightFree) {
      s.phone = function (cw) { return [cw * 0.9, -40, 180, 0.78]; };
      s.chat = function (cw) { return [cw * 0.66, -46, 140, 0.78]; };
      delete s.clock;
    }
    return s;
  }
  var TILT = {
    envelope: [-0.2, 0.35, -0.12], phone: [0.08, -0.38, 0.1], chat: [0.05, -0.3, 0.08],
    plane: [0.35, 0.35, 0.45], pin: [0, 0.45, -0.1], clock: [-0.15, -0.3, 0.05]
  };
  var SIZE = { envelope: [170, 120], phone: [100, 185], chat: [150, 105], plane: [150, 90], pin: [100, 130], clock: [120, 120] };
  var ORDER = ['envelope', 'chat', 'phone', 'plane', 'pin', 'clock'];

  function Stage(card) {
    var self = this;
    var parent = card.parentElement;
    if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

    var canvas = document.createElement('canvas');
    canvas.className = 'f3d-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) { this.failed = true; return; }
    parent.insertBefore(canvas, card.nextSibling);
    card.classList.add('has-3d');

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 0.95;

    var scene = new THREE.Scene();
    var pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.6;
    pmrem.dispose();
    var key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(-0.6, 1, 1.3);
    scene.add(key);
    scene.add(new THREE.HemisphereLight(0xe6f4ff, 0x0f2c59, 0.5));
    var camera = new THREE.PerspectiveCamera(30, 1, 5, DIST + 3000);

    var kit = new Kit(renderer);
    var shadowTex = kit.tex(128, 128, function (g, w) {
      var gr = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
      gr.addColorStop(0, 'rgba(6,20,48,.8)');
      gr.addColorStop(0.45, 'rgba(6,20,48,.35)');
      gr.addColorStop(1, 'rgba(6,20,48,0)');
      g.fillStyle = gr; g.fillRect(0, 0, w, w);
    });

    var items = ORDER.map(function (name, i) {
      var obj = kit[name]();
      scene.add(obj);
      var shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, toneMapped: false }));
      shadow.renderOrder = -1;
      scene.add(shadow);
      var mats = [];
      /* alleen het vliegtuig vervaagt (bij verzenden); de rest blijft ondoorzichtig */
      if (name === 'plane') obj.traverse(function (o) { if (o.material) [].concat(o.material).forEach(function (m) { m.transparent = true; mats.push(m); }); });
      return { name: name, index: i, obj: obj, shadow: shadow, mats: mats, att: 0 };
    });

    /* formulier-koppeling */
    var focusName = '';
    card.addEventListener('focusin', function (e) { focusName = FIELD_TO_ITEM[(e.target.name || '').toLowerCase()] || ''; request(); });
    card.addEventListener('focusout', function () { focusName = ''; });
    var launchAt = -1;
    var success = card.querySelector('.form-success');
    if (success && 'MutationObserver' in window) {
      new MutationObserver(function () {
        if (success.classList.contains('is-visible') && launchAt < 0) { launchAt = now(); request(); }
        if (!success.classList.contains('is-visible')) launchAt = -1;
      }).observe(success, { attributes: true, attributeFilter: ['class'] });
    }

    var L = { W: 0, H: 0, cardX: 0, cardY: 0, cw: 0, mobile: false, S: 1, leftFree: true, rightFree: true };

    /* Staat er naast de kaart andere inhoud (bijv. een tweede kolom)? Dan komen
       de objecten van die kant boven de kaart, zodat ze niets afdekken. */
    var roomsAt = -1e9;
    function rooms() {
      if (now() - roomsAt < 1000) return;
      roomsAt = now();
      var cr = card.getBoundingClientRect();
      var top = cr.top - 200, bottom = cr.top + 660;
      var left = cr.left, right = window.innerWidth - cr.right;
      for (var el = card; el && el !== document.body && !el.matches('section, footer'); el = el.parentElement) {
        var sibs = el.parentElement ? el.parentElement.children : [];
        for (var i = 0; i < sibs.length; i++) {
          var sib = sibs[i];
          if (sib === el || sib.tagName === 'CANVAS' || sib.tagName === 'SCRIPT' || getComputedStyle(sib).position === 'absolute') continue;
          var r = sib.getBoundingClientRect();
          if (!r.width || !r.height || r.bottom < top || r.top > bottom) continue;
          if (r.right <= cr.left + 4) left = Math.min(left, cr.left - r.right);
          if (r.left >= cr.right - 4) right = Math.min(right, r.left - cr.right);
        }
      }
      L.leftFree = left > 150;
      L.rightFree = right > 150;
    }
    function layout() {
      var vw = document.documentElement.clientWidth;
      var mobile = vw < 700;
      var pr = parent.getBoundingClientRect();
      var cw = card.offsetWidth, cl = card.offsetLeft, ct = card.offsetTop;
      var mx = mobile ? 20 : 260, above = mobile ? 130 : 220, below = mobile ? 60 : 660;
      var left = Math.max(cl - mx, -pr.left);
      var right = Math.min(cl + cw + mx, vw - pr.left);
      var W = Math.max(1, Math.round(right - left));
      var H = Math.round(above + Math.min(card.offsetHeight, below));
      canvas.style.left = Math.round(left) + 'px';
      canvas.style.top = Math.round(ct - above) + 'px';
      if (W !== L.W || H !== L.H) {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75));
        renderer.setSize(W, H);
        camera.aspect = W / H;
        camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan((H / 2) / DIST));
        camera.updateProjectionMatrix();
      }
      L.W = W; L.H = H; L.cardX = cl - left; L.cardY = above; L.cw = cw; L.mobile = mobile;
      L.S = mobile ? 0.6 : clamp(vw / 1400, 0.78, 1);
    }

    var px = 0, py = 0;
    var vSlot = new THREE.Vector3(), vFrom = new THREE.Vector3(), vTmp = new THREE.Vector3();
    var qA = new THREE.Quaternion(), qB = new THREE.Quaternion(), eul = new THREE.Euler();

    this.render = function (time, dt) {
      layout();
      rooms();
      var W = L.W, H = L.H, slots = L.mobile ? SLOTS_MOBILE : slotsFor(L.leftFree, L.rightFree);
      var moving = !reduce.matches;

      if (moving) {
        var tx = (pointer.x - 0.5) * 70, ty = -(pointer.y - 0.5) * 50;
        if (!fine.matches) { tx = Math.sin(time * 0.5) * 30; ty = Math.cos(time * 0.37) * 20; }
        px += (tx - px) * Math.min(1, dt * 3);
        py += (ty - py) * Math.min(1, dt * 3);
      }
      camera.position.set(px, py, DIST);
      camera.setViewOffset(W, H, -px, py, W, H);

      var active = ORDER.filter(function (n) { return slots[n]; });
      items.forEach(function (it) {
        var slotFn = slots[it.name];
        it.obj.visible = !!slotFn;
        it.shadow.visible = false;
        if (!slotFn) return;
        var i = active.indexOf(it.name), n = active.length;

        /* plek in canvas-pixels -> wereld (midden canvas = 0,0; y omhoog) */
        var s = slotFn(L.cw);
        /* binnen het canvas houden, rekening houdend met perspectief (dichterbij = verder naar buiten) */
        var edge = (L.mobile ? 48 : 95) * L.S;
        var sx = clamp(L.cardX + s[0], edge, W - edge);
        var sy = clamp(L.cardY + s[1], edge, H - edge);
        var persp = (DIST - s[2] - 60) / DIST;
        vSlot.set((sx - W / 2) * persp, (H / 2 - sy) * persp, s[2]);

        var cyc = time / DUR - i / n + 10;
        var round = Math.floor(cyc);
        var t = moving ? cyc - round : 0.5;
        var rnd = function (k) { return hash(it.index + 1, round, k); };
        vFrom.set(L.cardX + L.cw * (0.3 + rnd(1) * 0.4) - W / 2, H / 2 - (L.cardY + 50 + rnd(2) * 90), 0);

        var tilt = TILT[it.name];
        eul.set(tilt[0] + Math.sin(time * 0.8 + i) * 0.08, tilt[1] + Math.cos(time * 0.6 + i) * 0.12, tilt[2]);
        qB.setFromEuler(eul);
        eul.set(-1.4, (rnd(3) - 0.5) * 1.5, (rnd(4) - 0.5) * 1.2);
        qA.setFromEuler(eul);

        var o = it.obj, sc = L.S * (s[3] || 1), alpha = 1;
        if (moving) {
          vSlot.x += Math.sin(time * 1.3 + i) * 6;
          vSlot.y += Math.cos(time * 1.7 + i * 2) * 9;
          vSlot.z += Math.sin(time * 0.9 + i) * 22;
        }
        if (t < 0.12) {                                   /* komt uit de kaart omhoog */
          var e = t / 0.12;
          var p = easeOutBack(e);
          o.position.lerpVectors(vFrom, vSlot, p);
          o.quaternion.slerpQuaternions(qA, qB, easeOut(e));
          sc *= 0.05 + 0.95 * easeOut(e);
        } else if (t < 0.9) {                             /* zweeft */
          o.position.copy(vSlot);
          o.quaternion.copy(qB);
        } else {                                          /* duikt terug de kaart in */
          var k = easeIn((t - 0.9) / 0.1);
          o.position.lerpVectors(vSlot, vFrom, k);
          o.quaternion.slerpQuaternions(qB, qA, k);
          sc *= 1 - 0.95 * k;
        }

        /* reageert op het veld waar je typt */
        var target = focusName === it.name ? 1 : 0;
        it.att += (target - it.att) * Math.min(1, dt * 6);
        if (reduce.matches) it.att = target;
        if (it.att > 0.001) {
          vTmp.set(L.cardX + L.cw / 2 - W / 2, o.position.y, o.position.z);
          o.position.lerp(vTmp, 0.12 * it.att);
          o.position.z += 140 * it.att;
          sc *= 1 + 0.15 * it.att;
          if (o.userData.ring && moving) o.rotation.z += Math.sin(time * 38) * 0.14 * it.att;
        }

        /* verzonden: vliegtuig vliegt weg */
        if (it.name === 'plane' && launchAt >= 0) {
          var lt = (now() - launchAt) / 1000;
          if (lt < 2.2) {
            var f = easeIn(clamp(lt / 1.6, 0, 1));
            o.position.x += f * 260;
            o.position.y += f * 160;
            o.position.z += f * 900;
            o.rotation.z += f * 0.6;
            alpha = 1 - smooth(0.9, 1.6, lt);
          } else alpha = 0;
        }

        o.scale.setScalar(Math.max(sc, 0.001));
        it.mats.forEach(function (m) { if (m.userData.baseOpacity === undefined) m.userData.baseOpacity = m.opacity; m.opacity = m.userData.baseOpacity * alpha; });

        if (o.userData.dots) {
          var speed = focusName === 'chat' ? 12 : 7;
          o.userData.dots.forEach(function (d, j) { d.position.y = 4 + (moving ? Math.max(0, Math.sin(time * speed - j * 0.9)) * 7 : 0); });
        }
        if (o.userData.minute) {
          o.userData.second.rotation.z = -time * 3;
          o.userData.minute.rotation.z = -time * 0.6;
          o.userData.hour.rotation.z = -time * 0.05 - 1;
        }

        /* zachte schaduw op de pagina */
        var z = o.position.z, sh = it.shadow;
        var fade = smooth(0, 50, z) * alpha * clamp(sc / (L.S * (s[3] || 1)), 0, 1);
        sh.visible = fade > 0.01;
        sh.position.set(o.position.x + z * 0.12, o.position.y - z * 0.28, 0);
        var grow = 1 + z / 900;
        sh.scale.set(SIZE[it.name][0] * sc * grow, SIZE[it.name][1] * sc * grow * 0.8, 1);
        sh.material.opacity = 0.42 * fade;
      });

      renderer.render(scene, camera);
    };

    this.visible = false;
    this.card = card;
    this.layout = layout;
  }

  /* ---------- lus: alleen tekenen wat in beeld is ---------- */
  var stages = [];
  var raf = 0, last = 0, t0 = performance.now();
  function now() { return performance.now(); }
  function frame(ts) {
    raf = 0;
    var dt = Math.min(0.05, (ts - last) / 1000 || 0.016);
    last = ts;
    var time = fixedTime !== null ? fixedTime : (ts - t0) / 1000;
    var any = false;
    stages.forEach(function (s) { if (s.visible) { s.render(time, dt); any = true; } });
    if (any && !reduce.matches && fixedTime === null) request();
  }
  function request() { if (!raf) raf = requestAnimationFrame(frame); }

  function start() {
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var s = e.target.__f3d;
        if (s) s.visible = e.isIntersecting;
      });
      request();
    }, { rootMargin: '250px 0px' }) : null;
    cards.forEach(function (card) {
      var s = new Stage(card);
      if (s.failed) return;
      card.__f3d = s;
      stages.push(s);
      if (io) io.observe(card); else s.visible = true;
    });
    window.addEventListener('resize', request);
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(request);
      cards.forEach(function (c) { ro.observe(c); });
    }
    if (reduce.addEventListener) reduce.addEventListener('change', request);
    request();
  }

  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 1500); })]).then(start);
})();
