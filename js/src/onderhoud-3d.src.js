/* =====================================================================
   De Bresser · Onderhoud: gereedschap komt uit de laptop
   Op gebouwbeheer-onderhoud.html staat de handyman-foto op een laptop.
   Voor elk punt uit "Onderhoud op het gebied van" komt een 3D-object door
   het scherm naar buiten (pion, pand, hamer, verfroller, sleutel, camera,
   plant, spuitfles) en blijft rond de laptop staan of zweven. Daarna springt
   steeds een object naar de bezoeker toe; het bijbehorende lijstpunt licht op.
   Hover of focus op een lijstpunt laat dat object naar voren komen.

   Bouwen (three 0.186): npx esbuild js/src/onderhoud-3d.src.js --bundle --minify
   --format=iife --target=es2019 --outfile=js/onderhoud-3d.js
   Test: ?ond-t=5 zet de tijd vast.
   ===================================================================== */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

(function () {
  var host = document.querySelector('[data-ond-3d]');
  if (!host) return;
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-ond-list] li'));

  var query = new URLSearchParams(location.search);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fixedTime = query.has('ond-t') ? parseFloat(query.get('ond-t')) : (reduce ? 60 : null);
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function rnd(seed) { var v = Math.sin(seed * 91.37 + 12.9) * 43758.5453; return v - Math.floor(v); }
  function bezier(out, a, b, c, d, t) {
    var u = 1 - t;
    return out.set(0, 0, 0)
      .addScaledVector(a, u * u * u).addScaledVector(b, 3 * u * u * t)
      .addScaledVector(c, 3 * u * t * t).addScaledVector(d, t * t * t);
  }

  var canvas = document.createElement('canvas');
  canvas.className = 'ond-scene__canvas';
  canvas.setAttribute('aria-hidden', 'true');
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (e) { return; }
  host.appendChild(canvas);
  host.classList.add('is-3d');

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  var aniso = renderer.capabilities.getMaxAnisotropy();

  var scene = new THREE.Scene();
  var pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.8;
  pmrem.dispose();
  var key = new THREE.DirectionalLight(0xfff4e6, 2.3);
  key.position.set(-3, 6, 5);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xbfe3ff, 1.0);
  rim.position.set(4, 3, -4);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xf2f6ff, 0x3a4a60, 0.45));

  var camera = new THREE.PerspectiveCamera(30, 1.4, 0.1, 100);
  var world = new THREE.Group();
  scene.add(world);

  function canvasTex(w, h, draw, color) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    var t = new THREE.CanvasTexture(c);
    if (color !== false) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = aniso;
    return t;
  }
  function std(color, rough, metal, extra) {
    return new THREE.MeshStandardMaterial(Object.assign({ color: color, roughness: rough, metalness: metal || 0 }, extra || {}));
  }
  function mesh(geo, mat, x, y, z) {
    var m = new THREE.Mesh(geo, mat);
    m.position.set(x || 0, y || 0, z || 0);
    return m;
  }

  var NAVY = 0x020d41, GREEN = 0x7bd534;

  /* ---------- laptop ---------- */
  var alu = new THREE.MeshPhysicalMaterial({ color: 0xc3c8d0, metalness: 0.85, roughness: 0.34, clearcoat: 0.3, clearcoatRoughness: 0.4 });
  var dark = std(0x0b0d12, 0.4, 0.2);
  var laptop = new THREE.Group();
  world.add(laptop);

  var LW = 3.3, LD = 2.25, LT = 0.1;
  laptop.add(mesh(new RoundedBoxGeometry(LW, LT, LD, 4, 0.045), alu, 0, LT / 2, 0));
  var keysTex = canvasTex(1024, 360, function (g, w, h) {
    g.fillStyle = '#2f2f2f'; g.fillRect(0, 0, w, h);
    var rows = 5, cols = 14, pad = 6, kw = (w - pad) / cols, kh = (h - pad) / rows;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var ww = kw;
        if (r === 4 && c === 5) ww = kw * 5;
        if (r === 4 && c > 5 && c < 10) continue;
        var x = pad + c * kw, y = pad + r * kh;
        var gr = g.createLinearGradient(0, y, 0, y + kh);
        gr.addColorStop(0, '#2f2f2f'); gr.addColorStop(1, '#2f2f2f');
        g.fillStyle = gr;
        g.beginPath(); g.roundRect(x, y, ww - pad, kh - pad, 8); g.fill();
      }
    }
  });
  var keys = mesh(new THREE.PlaneGeometry(2.75, 0.97), std(0xffffff, 0.6, 0, { map: keysTex }), 0, LT + 0.002, -0.35);
  keys.rotation.x = -Math.PI / 2;
  laptop.add(keys);
  var pad = mesh(new THREE.PlaneGeometry(1.1, 0.62), new THREE.MeshPhysicalMaterial({ color: 0xb4bac3, metalness: 0.6, roughness: 0.22, clearcoat: 0.6 }), 0, LT + 0.002, 0.62);
  pad.rotation.x = -Math.PI / 2;
  laptop.add(pad);

  var hinge = new THREE.Group();
  hinge.position.set(0, LT, -LD / 2 + 0.03);
  hinge.rotation.x = -0.22;
  laptop.add(hinge);
  var LH = 2.15;
  hinge.add(mesh(new RoundedBoxGeometry(LW, LH, 0.07, 4, 0.03), alu, 0, LH / 2, -0.035));
  hinge.add(mesh(new THREE.PlaneGeometry(LW - 0.1, LH - 0.1), dark, 0, LH / 2, 0.001));

  var screenTex = new THREE.TextureLoader().load(host.getAttribute('data-ond-3d') || 'assets/img/onderhoud/scherm.webp', function () { request(); });
  screenTex.colorSpace = THREE.SRGBColorSpace;
  screenTex.anisotropy = aniso;
  var SW = 3.0, SH = 1.78;
  var display = mesh(new THREE.PlaneGeometry(SW, SH), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false, color: 0xdddddd }), 0, LH / 2 + 0.03, 0.003);
  hinge.add(display);
  var shine = mesh(new THREE.PlaneGeometry(SW, SH), new THREE.MeshBasicMaterial({
    map: canvasTex(256, 256, function (g, w, h) {
      var gr = g.createLinearGradient(0, 0, w, h);
      gr.addColorStop(0, 'rgba(255,255,255,.22)'); gr.addColorStop(0.35, 'rgba(255,255,255,.02)');
      gr.addColorStop(0.55, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(255,255,255,.06)');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
    }), transparent: true, depthWrite: false, toneMapped: false
  }), 0, LH / 2 + 0.03, 0.005);
  hinge.add(shine);

  var glowMat = new THREE.MeshBasicMaterial({
    map: canvasTex(256, 256, function (g, w, h) {
      var gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
      gr.addColorStop(0, 'rgba(180,255,220,1)'); gr.addColorStop(0.35, 'rgba(16,185,129,.7)'); gr.addColorStop(1, 'rgba(16,185,129,0)');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
    }), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, opacity: 0
  });
  var glow = mesh(new THREE.PlaneGeometry(2.4, 2.4), glowMat, 0, LH / 2 + 0.03, 0.013);
  hinge.add(glow);
  var ringTex = canvasTex(256, 256, function (g, w, h) {
    g.strokeStyle = 'rgba(160,255,215,1)'; g.lineWidth = 7;
    g.beginPath(); g.arc(w / 2, h / 2, w / 2 - 10, 0, Math.PI * 2); g.stroke();
  });
  var rings = [0, 1].map(function () {
    var r = mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, opacity: 0 }), 0, LH / 2 + 0.03, 0.015);
    hinge.add(r);
    return r;
  });

  laptop.updateMatrixWorld(true);
  var screenCenter = display.getWorldPosition(new THREE.Vector3());
  var screenNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(display.getWorldQuaternion(new THREE.Quaternion())).normalize();

  /* ---------- schaduwen ---------- */
  var shadowTex = canvasTex(128, 128, function (g, w, h) {
    var gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gr.addColorStop(0, 'rgba(10,20,40,.55)'); gr.addColorStop(0.6, 'rgba(10,20,40,.2)'); gr.addColorStop(1, 'rgba(10,20,40,0)');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  });
  function shadow(w, d, o) {
    var s = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: o }));
    s.rotation.x = -Math.PI / 2;
    s.position.y = 0.002;
    world.add(s);
    return s;
  }
  shadow(LW * 1.35, LD * 1.5, 0.75).position.z = -0.1;

  /* ---------- de acht objecten ---------- */
  // elk object is een groep met de oorsprong op de onderkant (grond) of in het midden (zwevend)

  function makeCone() {
    var g = new THREE.Group();
    var stripes = canvasTex(256, 256, function (c, w, h) {
      c.fillStyle = '#ffc400'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#ebeff4';
      c.fillRect(0, h * 0.28, w, h * 0.14);
      c.fillRect(0, h * 0.56, w, h * 0.12);
    });
    var body = mesh(new THREE.CylinderGeometry(0.05, 0.33, 0.95, 40, 1, true), std(0xffffff, 0.45, 0, { map: stripes, side: THREE.DoubleSide }), 0, 0.55, 0);
    g.add(body);
    g.add(mesh(new THREE.SphereGeometry(0.05, 16, 8), std(0xff5a14, 0.45), 0, 1.02, 0));
    g.add(mesh(new RoundedBoxGeometry(0.82, 0.08, 0.82, 3, 0.03), std(0x22262e, 0.7), 0, 0.04, 0));
    return g;
  }

  function makeBuilding() {
    var g = new THREE.Group();
    var facade = canvasTex(512, 512, function (c, w, h) {
      c.fillStyle = '#ebeff4'; c.fillRect(0, 0, w, h);
      for (var r = 0; r < 3; r++) {
        for (var k = 0; k < 4; k++) {
          var x = 40 + k * 116, y = 40 + r * 140;
          var gr = c.createLinearGradient(x, y, x + 80, y + 100);
          gr.addColorStop(0, '#c7c7c7'); gr.addColorStop(0.5, '#007ac0'); gr.addColorStop(1, '#020d41');
          c.fillStyle = gr; c.fillRect(x, y, 80, 100);
          c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x + 6, y + 6, 12, 88);
        }
      }
      c.fillStyle = '#020d41'; c.fillRect(0, h - 44, w, 44);
      c.fillStyle = '#7bd534'; c.fillRect(0, h - 50, w, 6);
      c.fillStyle = '#020d41'; c.fillRect(w / 2 - 40, h - 44, 80, 44);
    });
    var side = std(0xffffff, 0.55, 0.05, { map: facade });
    var body = mesh(new RoundedBoxGeometry(0.95, 1.05, 0.7, 3, 0.03), side, 0, 0.525, 0);
    g.add(body);
    g.add(mesh(new RoundedBoxGeometry(1.0, 0.07, 0.75, 2, 0.02), std(0x2b3440, 0.6, 0.3), 0, 1.08, 0));
    // installatie op het dak
    g.add(mesh(new RoundedBoxGeometry(0.28, 0.16, 0.22, 2, 0.02), std(0xb9c1cc, 0.35, 0.7), -0.2, 1.19, -0.08));
    // kleine steiger voor het pand: onderhoud
    var pipe = std(0xc9ced6, 0.3, 0.9);
    [-0.4, 0.4].forEach(function (x) {
      var p = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.9, 10), pipe, x, 0.45, 0.45);
      g.add(p);
    });
    var bar = mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.8, 10), pipe, 0, 0.62, 0.45);
    bar.rotation.z = Math.PI / 2;
    g.add(bar);
    g.add(mesh(new THREE.BoxGeometry(0.84, 0.03, 0.16), std(0xd9a04a, 0.8), 0, 0.6, 0.47));
    return g;
  }

  function makeHammer() {
    var g = new THREE.Group();
    var wood = canvasTex(64, 256, function (c, w, h) {
      c.fillStyle = '#c28a4f'; c.fillRect(0, 0, w, h);
      for (var i = 0; i < 40; i++) { c.fillStyle = 'rgba(110,65,25,.18)'; c.fillRect(rnd(i) * w, 0, 1 + rnd(i * 3) * 2, h); }
    });
    g.add(mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.15, 20), std(0xffffff, 0.6, 0, { map: wood }), 0, -0.05, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.42, 20), std(GREEN, 0.55), 0, -0.42, 0));
    var steel = std(0x9aa3ad, 0.28, 1);
    var head = mesh(new RoundedBoxGeometry(0.52, 0.16, 0.16, 3, 0.03), steel, -0.04, 0.55, 0);
    g.add(head);
    var face = mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.1, 24), steel, 0.24, 0.55, 0);
    face.rotation.z = Math.PI / 2;
    g.add(face);
    // klauw: twee taps toelopende tanden die naar beneden buigen
    [-0.035, 0.035].forEach(function (z) {
      var tooth = mesh(new THREE.CylinderGeometry(0.012, 0.05, 0.3, 10), steel, -0.38, 0.5, z);
      tooth.rotation.z = -1.05;
      g.add(tooth);
    });
    return g;
  }

  function makeRoller() {
    var g = new THREE.Group();
    var paint = std(GREEN, 0.95, 0);
    var roll = mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.72, 32), paint, 0, 0.42, 0);
    roll.rotation.z = Math.PI / 2;
    g.add(roll);
    var caps = std(0xe8ebef, 0.4, 0.2);
    [-0.37, 0.37].forEach(function (x) {
      var c = mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03, 24), caps, x, 0.42, 0);
      c.rotation.z = Math.PI / 2;
      g.add(c);
    });
    var wire = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.4, 0.42, 0), new THREE.Vector3(0.48, 0.42, 0), new THREE.Vector3(0.5, 0.2, 0),
      new THREE.Vector3(0.2, 0.05, 0), new THREE.Vector3(0, -0.05, 0), new THREE.Vector3(0, -0.2, 0)
    ]);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(wire, 40, 0.022, 10), std(0xb8bec6, 0.25, 1)));
    g.add(mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.6, 20), std(NAVY, 0.45), 0, -0.5, 0));
    // verfdruppels
    [0, 1, 2].forEach(function (i) {
      var d = mesh(new THREE.SphereGeometry(0.03 + i * 0.008, 12, 8), paint, -0.25 + i * 0.22, 0.22 - i * 0.03, 0.05);
      d.scale.y = 1.5;
      g.add(d);
    });
    return g;
  }

  function makeKey() {
    var g = new THREE.Group();
    var gold = std(0xd8ad4f, 0.28, 1);
    g.add(mesh(new THREE.TorusGeometry(0.22, 0.06, 16, 40), gold, 0, 0.35, 0));
    var shaft = mesh(new RoundedBoxGeometry(0.1, 0.8, 0.06, 2, 0.02), gold, 0, -0.25, 0);
    g.add(shaft);
    [[0.1, -0.5, 0.12], [0.09, -0.36, 0.08], [0.1, -0.6, 0.06]].forEach(function (t) {
      g.add(mesh(new THREE.BoxGeometry(t[2] + 0.06, 0.07, 0.06), gold, t[0], t[1], 0));
    });
    // toegangspas aan de ring
    var card = canvasTex(256, 160, function (c, w, h) {
      c.fillStyle = '#020d41'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#7bd534'; c.fillRect(0, h - 26, w, 26);
      c.fillStyle = '#d8ad4f'; c.fillRect(24, 46, 50, 38);
      c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 5;
      for (var i = 0; i < 3; i++) { c.beginPath(); c.arc(170, 66, 16 + i * 14, -0.8, 0.8); c.stroke(); }
    });
    var badge = mesh(new RoundedBoxGeometry(0.52, 0.33, 0.02, 2, 0.01), std(0xffffff, 0.35, 0.1, { map: card }), -0.42, 0.18, -0.03);
    badge.rotation.z = 0.35;
    g.add(badge);
    return g;
  }

  function makeCamera() {
    var g = new THREE.Group();
    var white = std(0xf1f3f6, 0.35, 0.1);
    var body = mesh(new RoundedBoxGeometry(0.34, 0.3, 0.72, 4, 0.08), white, 0, 0.1, 0.05);
    g.add(body);
    var hood = mesh(new RoundedBoxGeometry(0.4, 0.05, 0.8, 2, 0.02), white, 0, 0.27, 0.08);
    g.add(hood);
    var lens = mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.06, 32), std(0x0a0c10, 0.2, 0.5), 0, 0.1, 0.43);
    lens.rotation.x = Math.PI / 2;
    g.add(lens);
    var glassL = mesh(new THREE.SphereGeometry(0.07, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: 0x1b3a6a, roughness: 0.05, metalness: 0.2, clearcoat: 1 }), 0, 0.1, 0.46);
    glassL.rotation.x = Math.PI / 2;
    g.add(glassL);
    g.add(mesh(new THREE.SphereGeometry(0.022, 12, 8), new THREE.MeshBasicMaterial({ color: 0xc4302b, toneMapped: false }), 0.11, 0.2, 0.42));
    var arm = mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 12), std(0x8a929c, 0.4, 0.8), 0, 0.05, -0.38);
    arm.rotation.x = 0.9;
    g.add(arm);
    g.add(mesh(new RoundedBoxGeometry(0.3, 0.3, 0.05, 2, 0.02), std(0x8a929c, 0.4, 0.8), 0, -0.1, -0.55));
    g.rotation.x = 0.12;
    return g;
  }

  function makePlant() {
    var g = new THREE.Group();
    var pot = mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.42, 32), std(NAVY, 0.5), 0, 0.21, 0);
    g.add(pot);
    var rim = mesh(new THREE.TorusGeometry(0.3, 0.025, 8, 32), std(GREEN, 0.45), 0, 0.42, 0);
    rim.rotation.x = Math.PI / 2;
    g.add(rim);
    g.add(mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.02, 24), std(0x3b2a1c, 1), 0, 0.4, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.03, 0.045, 0.45, 10), std(0x6b4a2e, 0.9), 0, 0.62, 0));
    var leafMats = [0x2f9e4f, 0x3fbf6a, 0x237a3d].map(function (c) { return std(c, 0.7, 0, { flatShading: true }); });
    [[0, 0.95, 0, 0.3], [-0.2, 0.85, 0.08, 0.22], [0.2, 0.86, -0.05, 0.24], [0.05, 1.15, 0.05, 0.2], [-0.08, 0.9, -0.2, 0.2]].forEach(function (b, i) {
      var blob = mesh(new THREE.IcosahedronGeometry(b[3], 1), leafMats[i % 3], b[0], b[1], b[2]);
      blob.rotation.set(i, i * 2, 0);
      g.add(blob);
    });
    return g;
  }

  function makeSpray() {
    var g = new THREE.Group();
    var bottle = new THREE.MeshPhysicalMaterial({ color: 0x9fdcf5, roughness: 0.15, metalness: 0, clearcoat: 1, transparent: true, opacity: 0.55 });
    g.add(mesh(new THREE.CylinderGeometry(0.19, 0.21, 0.72, 32), bottle, 0, -0.2, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.175, 0.195, 0.48, 32), std(0x2fb3e8, 0.3, 0, { transparent: true, opacity: 0.85 }), 0, -0.32, 0));
    // etiket
    var label = canvasTex(256, 128, function (c, w, h) {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#020d41'; c.fillRect(0, 0, w, 20);
      c.fillStyle = '#7bd534';
      c.beginPath(); c.arc(w * 0.25, h * 0.6, 22, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.arc(w * 0.75, h * 0.6, 22, 0, Math.PI * 2); c.fill();
    });
    g.add(mesh(new THREE.CylinderGeometry(0.212, 0.212, 0.26, 32, 1, true, -Math.PI * 0.45, Math.PI * 0.9), std(0xffffff, 0.5, 0, { map: label }), 0, -0.18, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.08, 0.17, 0.14, 24), std(0xf1f3f6, 0.4), 0, 0.23, 0));
    var head = mesh(new RoundedBoxGeometry(0.2, 0.2, 0.44, 3, 0.04), std(GREEN, 0.45), 0, 0.38, 0.08);
    g.add(head);
    var trigger = mesh(new RoundedBoxGeometry(0.08, 0.26, 0.06, 2, 0.02), std(0xf1f3f6, 0.4), 0, 0.2, 0.2);
    trigger.rotation.x = 0.35;
    g.add(trigger);
    var nozzle = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 12), std(NAVY, 0.4), 0, 0.38, 0.32);
    nozzle.rotation.x = Math.PI / 2;
    g.add(nozzle);
    return g;
  }

  // volgorde = volgorde van de lijst op de pagina
  var defs = [
    { make: makeCone, at: [-2.65, 0, 0.2], ground: true, s: 0.95, yaw: 0.3 },       // Onderhoud bedrijfsterrein
    { make: makeBuilding, at: [2.45, 0, 0.15], ground: true, s: 0.95, yaw: -0.45 },  // Onderhoud bedrijfspand
    { make: makeHammer, at: [-2.35, 1.95, 0.3], s: 0.85, rot: [0, 0.3, -0.7] },     // Klein-bouwkundig onderhoud
    { make: makeRoller, at: [2.2, 2.1, 0.5], s: 0.9, rot: [0.2, -0.4, 0.55] },    // Schilderwerken
    { make: makeKey, at: [-1.6, 2.95, 0.6], s: 0.8, rot: [0.1, 0.4, 0.25] },        // Toegangsverlening
    { make: makeCamera, at: [1.3, 3.0, 0.5], s: 0.9, rot: [0.05, -0.7, 0] },       // Beveiligingsdiensten
    { make: makePlant, at: [-1.6, 0, 1.95], ground: true, s: 0.85, yaw: 0 },       // Groenonderhoud
    { make: makeSpray, at: [1.6, 0.48, 2.05], ground: true, s: 0.85, yaw: -0.5, lift: 0.48 } // Schoonmaakdienstverlening
  ];

  var objs = defs.map(function (d, i) {
    var inner = d.make();
    inner.traverse(function (o) { if (o.isMesh) o.renderOrder = 2; });
    var pivot = new THREE.Group();
    pivot.add(inner);
    pivot.visible = false;
    world.add(pivot);
    var home = new THREE.Vector3(d.at[0], d.at[1], d.at[2]);
    var rest = new THREE.Euler(d.rot ? d.rot[0] : 0, d.rot ? d.rot[1] : d.yaw, d.rot ? d.rot[2] : 0);
    var sh = shadow(d.ground ? 1.3 * d.s : 1.0 * d.s, d.ground ? 1.1 * d.s : 0.8 * d.s, 0);
    sh.position.set(home.x, 0.003 + i * 0.0005, home.z);
    return {
      d: d, pivot: pivot, home: home, rest: rest, sh: sh,
      t0: 0.5 + i * 0.7,
      spin: new THREE.Vector3(rnd(i + 1) * 6 - 3, rnd(i + 7) * 6 - 3, rnd(i + 3) * 4 - 2),
      pop: -10
    };
  });

  var tmp = new THREE.Vector3(), c1 = new THREE.Vector3(), c2 = new THREE.Vector3(), p0 = new THREE.Vector3(), near = new THREE.Vector3();
  var FLY = 1.5;
  var INTRO_END = objs[objs.length - 1].t0 + FLY + 0.6;
  var POP_EVERY = 3.2, POP_DUR = 2.2;

  function nearPoint(o, out) {
    // punt vlak voor de camera, iets naar de kant van het object
    return out.set(o.home.x * 0.2, 1.6 + (o.home.y > 1 ? 0.5 : 0), 5.0);
  }

  function update(o, time) {
    var lt = (time - o.t0) / FLY;
    var burst = 0;
    if (lt <= 0) { o.pivot.visible = false; o.sh.material.opacity = 0; return 0; }
    o.pivot.visible = true;
    var t = clamp(lt, 0, 1);
    var e = easeInOut(t);
    var P = o.pivot.position;

    // intro: door het scherm naar buiten, eerst richting bezoeker, dan naar de plek
    p0.copy(screenCenter).addScaledVector(screenNormal, -0.6);
    nearPoint(o, c1);
    c2.copy(o.home).add(tmp.set(0, o.d.ground ? 2.2 : 1.0, 1.4));
    bezier(P, p0, c1, c2, o.home, e);
    var s = o.d.s * (0.25 + 0.75 * easeOut(clamp(t / 0.35, 0, 1)));
    // groter in de buurt van de camera
    s *= 1 + Math.sin(t * Math.PI) * 0.35;
    var r = 1 - e;
    o.pivot.rotation.set(o.rest.x + o.spin.x * r, o.rest.y + o.spin.y * r, o.rest.z + o.spin.z * r);
    if (t < 0.25) burst = 1 - Math.abs(t - 0.1) / 0.15;

    // landing
    var land = clamp((lt - 1) / 0.5, 0, 1);
    var squash = 0;
    if (lt > 1 && o.d.ground) squash = Math.sin(land * Math.PI * 2) * (1 - land) * 0.1;

    // rust: zweven of stilstaan
    if (lt > 1 && !o.d.ground && fixedTime === null) {
      P.y += Math.sin(time * 1.4 + o.t0) * 0.06;
      o.pivot.rotation.y += Math.sin(time * 0.7 + o.t0) * 0.12;
    }
    if (lt > 1 && o.d.ground && fixedTime === null && !o.d.lift) o.pivot.rotation.y += Math.sin(time * 0.5 + o.t0) * 0.03;

    // pop: object springt naar de bezoeker en terug
    var pt = (time - o.pop) / POP_DUR;
    if (pt > 0 && pt < 1) {
      var k = Math.sin(pt * Math.PI);
      var ke = easeInOut(k);
      nearPoint(o, near);
      P.lerp(near, ke * (o.d.ground ? 0.5 : 0.65));
      s *= 1 + ke * (o.d.ground ? 0.15 : 0.35);
      o.pivot.rotation.y += easeInOut(pt) * Math.PI * 2;
      o.pivot.rotation.x += ke * 0.25;
    }

    o.pivot.scale.set(s * (1 + squash * 0.6), s * (1 - squash), s * (1 + squash * 0.6));
    var height = Math.max(0, P.y - (o.d.lift || 0));
    var base = o.d.ground ? 0.75 : 0.35;
    o.sh.material.opacity = base * clamp(t * 1.4, 0, 1) * clamp(1 - height / 4, 0, 1);
    o.sh.position.x = P.x; o.sh.position.z = Math.min(P.z, 2.6);
    return burst;
  }

  /* ---------- lijst koppelen ---------- */
  var active = -1;
  function setActive(i) {
    if (i === active) return;
    active = i;
    items.forEach(function (li, n) { li.classList.toggle('is-live', n === i); });
  }
  var hoverUntil = 0;
  items.forEach(function (li, i) {
    function go() {
      if (!objs[i]) return;
      var now = clock();
      if (now < objs[i].t0 + FLY) return;
      if (!(now - objs[i].pop < POP_DUR)) objs[i].pop = now;
      hoverUntil = now + POP_DUR;
      setActive(i);
      request();
    }
    li.addEventListener('mouseenter', go);
    li.addEventListener('focusin', go);
  });

  /* ---------- maat en camera ---------- */
  var L = { w: 0, h: 0 };
  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h || (w === L.w && h === L.h)) return;
    L.w = w; L.h = h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 600 ? 1.5 : 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 1.2 ? 36 : 31;
    camera.updateProjectionMatrix();
  }

  var pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  window.addEventListener('pointermove', function (e) {
    if (!fine.matches) return;
    var r = host.getBoundingClientRect();
    pointer.x = clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1);
    pointer.y = clamp((e.clientY - (r.top + r.height / 2)) / r.height, -1, 1);
    request();
  }, { passive: true });

  /* ---------- lus ---------- */
  var raf = 0, visible = false, t0 = null, lastTs = 0;
  function clock() { return fixedTime !== null ? fixedTime : (t0 === null ? 0 : (lastTs - t0) / 1000); }
  var lastPop = -1;

  function frame(ts) {
    raf = 0;
    if (t0 === null) t0 = ts;
    lastTs = ts;
    resize();
    var time = clock();

    pointer.sx += (pointer.x - pointer.sx) * 0.06;
    pointer.sy += (pointer.y - pointer.sy) * 0.06;
    world.rotation.y = -0.12 + pointer.sx * 0.14;
    world.rotation.x = pointer.sy * 0.05;
    world.position.y = fixedTime === null ? Math.sin(time * 0.9) * 0.03 : 0;

    var narrow = camera.aspect < 1.2;
    camera.position.set(0.2, narrow ? 3.4 : 3.0, narrow ? 10.8 : 9.2);
    camera.lookAt(0, 1.3, 0.5);

    // na de intro komt steeds een volgend object naar voren
    if (fixedTime === null && time > INTRO_END && time > hoverUntil) {
      var n = Math.floor((time - INTRO_END) / POP_EVERY);
      if (n !== lastPop) {
        lastPop = n;
        var o = objs[n % objs.length];
        o.pop = time;
        setActive(n % objs.length);
      }
    }
    // tijdens de intro volgt de lijst het object dat uit het scherm komt
    if (time <= INTRO_END && time > hoverUntil) {
      var cur = -1;
      objs.forEach(function (o, i) { if (time >= o.t0 + 0.2) cur = i; });
      setActive(cur);
    }

    var burst = 0;
    objs.forEach(function (o) { burst = Math.max(burst, update(o, time)); });
    burst = clamp(burst, 0, 1);
    glowMat.opacity = 0.15 + burst * 0.85;
    glow.scale.setScalar(0.8 + burst * 0.5);
    rings.forEach(function (r, i) {
      var ph = ((time * 0.8 + i * 0.5) % 1);
      r.scale.setScalar(0.3 + ph * 2.2);
      r.material.opacity = (1 - ph) * (0.25 + burst * 0.6);
    });

    renderer.render(scene, camera);
    if (visible && fixedTime === null) raf = requestAnimationFrame(frame);
  }
  function request() { if (!raf) raf = requestAnimationFrame(frame); }

  if ('IntersectionObserver' in window) {
    var started = false;
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !started) { started = true; t0 = null; }
      if (visible) request();
    }, { rootMargin: '0px 0px -12% 0px' }).observe(host);
  } else { visible = true; }
  window.addEventListener('resize', request);
  request();
})();
