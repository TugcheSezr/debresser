/* =====================================================================
   De Bresser · Blog interne verhuizing: kantoor komt uit de laptop
   Onder de intro van blog-interne-verhuizing.html staat een laptop met
   een foto van een interne verhuizing op het scherm. Grijze verhuiskratten,
   een ingepakte bureaustoel, een bureau met monitor en een verhuisdoos
   komen door het scherm naar buiten en richten naast de laptop een
   werkplek in. Daarna vliegt er steeds één stuk naar de bezoeker toe.

   Bouwen (three 0.186): npx esbuild js/src/interne-verhuizing-3d.src.js --bundle
   --loader:.webp=dataurl --loader:.png=dataurl --minify --format=iife --target=es2019 --outfile=js/interne-verhuizing-3d.js
   Test: ?iv-t=5 zet de tijd vast.
   ===================================================================== */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
// ingebakken als data-URL: dan werkt de scène ook als de pagina via file:// geopend wordt
import schermUrl from '../../assets/img/interne-verhuizing/scherm-3d.webp';
import logoUrl from '../../assets/img/interne-verhuizing/logo-256.png';

(function () {
  var host = document.querySelector('[data-iv-laptop]');
  if (!host) return;

  var query = new URLSearchParams(location.search);
  var fixedTime = query.has('iv-t') ? parseFloat(query.get('iv-t')) : null;
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
  canvas.className = 'ivl-stage__canvas';
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (e) { host.classList.add('is-fallback'); return; }
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
  var key = new THREE.DirectionalLight(0xfff4e6, 2.1);
  key.position.set(-3, 6, 5);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xbfe3ff, 1.0);
  rim.position.set(4, 3, -4);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xf2f6ff, 0x3a4458, 0.45));

  var camera = new THREE.PerspectiveCamera(30, 1.6, 0.1, 100);
  var world = new THREE.Group();
  scene.add(world);

  function canvasTex(w, h, draw, color) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    var t = new THREE.CanvasTexture(c);
    if (color !== false) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = aniso;
    t.__draw = function () { draw(c.getContext('2d'), w, h); t.needsUpdate = true; };
    return t;
  }
  var noise = canvasTex(256, 256, function (g, w, h) {
    g.fillStyle = '#808080'; g.fillRect(0, 0, w, h);
    for (var i = 0; i < 3000; i++) {
      g.fillStyle = rnd(i) > 0.5 ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.14)';
      g.fillRect(rnd(i * 1.3) * w, rnd(i * 2.9) * h, 1.5, 1.5);
    }
  }, false);
  noise.wrapS = noise.wrapT = THREE.RepeatWrapping;

  var logo = new Image();
  var logoReady = false;
  var logoTextures = [];

  /* ---------- verhuiskrat (grijs, stapelbaar) ---------- */
  var CW = 1.0, CH = 0.52, CD = 0.68, CT = 0.035;
  function crateSide(long) {
    return canvasTex(long ? 640 : 440, 340, function (g, w, h) {
      var gr = g.createLinearGradient(0, 0, 0, h);
      gr.addColorStop(0, '#9aa0a8'); gr.addColorStop(1, '#7d838c');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
      // bovenrand
      g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(0, 0, w, 16);
      g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(0, 16, w, 4);
      // verticale ribben
      var n = long ? 9 : 6;
      for (var i = 1; i < n; i++) {
        var x = i * w / n;
        g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(x - 5, 26, 4, h - 40);
        g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(x - 1, 26, 3, h - 40);
      }
      // voet
      g.fillStyle = 'rgba(0,0,0,.22)'; g.fillRect(0, h - 22, w, 22);
      if (long) {
        // etikethouder
        g.fillStyle = '#b9bec5'; g.fillRect(w * 0.36, h * 0.36, w * 0.28, h * 0.26);
        g.fillStyle = '#f4f6f8'; g.fillRect(w * 0.38, h * 0.4, w * 0.24, h * 0.18);
        g.fillStyle = '#0f2c59';
        for (var b = 0; b < 26; b++) if (rnd(b + 4) > 0.35) g.fillRect(w * 0.4 + b * 5, h * 0.43, rnd(b) > 0.5 ? 3 : 2, h * 0.08);
        g.fillStyle = '#10b981'; g.fillRect(w * 0.4, h * 0.53, w * 0.12, 5);
      } else {
        // handgreep
        g.beginPath(); g.roundRect(w * 0.3, 34, w * 0.4, 46, 22);
        g.fillStyle = '#23262b'; g.fill();
        g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 3; g.stroke();
      }
    });
  }
  var crateMatLong = new THREE.MeshStandardMaterial({ map: crateSide(true), roughness: 0.55, bumpMap: noise, bumpScale: 0.3 });
  var crateMatShort = new THREE.MeshStandardMaterial({ map: crateSide(false), roughness: 0.55, bumpMap: noise, bumpScale: 0.3 });
  var cratePlain = new THREE.MeshStandardMaterial({ color: 0x858b94, roughness: 0.6 });
  var crateInner = new THREE.MeshStandardMaterial({ color: 0x5d636c, roughness: 0.7 });
  function makeCrate() {
    var g = new THREE.Group();
    var bottom = new THREE.Mesh(new THREE.BoxGeometry(CW - 0.04, CT, CD - 0.04), crateInner);
    bottom.position.y = CT / 2 + 0.02;
    g.add(bottom);
    // lange wanden: ±z tekstuur (volgorde +x,-x,+y,-y,+z,-z)
    [1, -1].forEach(function (s) {
      var m = s > 0 ? [cratePlain, cratePlain, cratePlain, cratePlain, crateMatLong, crateInner] : [cratePlain, cratePlain, cratePlain, cratePlain, crateInner, crateMatLong];
      var wall = new THREE.Mesh(new THREE.BoxGeometry(CW, CH, CT), m);
      wall.position.set(0, CH / 2, s * (CD / 2 - CT / 2));
      g.add(wall);
    });
    [1, -1].forEach(function (s) {
      var m = s > 0 ? [crateMatShort, crateInner, cratePlain, cratePlain, cratePlain, cratePlain] : [crateInner, crateMatShort, cratePlain, cratePlain, cratePlain, cratePlain];
      var wall = new THREE.Mesh(new THREE.BoxGeometry(CT, CH, CD - CT * 2), m);
      wall.position.set(s * (CW / 2 - CT / 2), CH / 2, 0);
      g.add(wall);
    });
    // opstaande rand: 4 latjes
    [[CW + 0.03, CT * 1.4, 0, CD / 2], [CW + 0.03, CT * 1.4, 0, -CD / 2]].forEach(function (d) {
      var b = new THREE.Mesh(new THREE.BoxGeometry(d[0], 0.04, d[1]), cratePlain);
      b.position.set(d[2], CH - 0.02, d[3]); g.add(b);
    });
    [[CD + 0.03, CW / 2], [CD + 0.03, -CW / 2]].forEach(function (d) {
      var b = new THREE.Mesh(new THREE.BoxGeometry(CT * 1.4, 0.04, d[0]), cratePlain);
      b.position.set(d[1], CH - 0.02, 0); g.add(b);
    });
    return g;
  }

  /* ---------- verhuisdoos ---------- */
  function cardboard(g, w, h, seed) {
    g.fillStyle = '#c89a62'; g.fillRect(0, 0, w, h);
    for (var i = 0; i < 60; i++) {
      var x = rnd(seed + i) * w, y = rnd(seed + i * 1.7) * h, r = 30 + rnd(seed + i * 2.3) * 110;
      var gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, rnd(seed + i * 3.1) > 0.5 ? 'rgba(120,80,40,.10)' : 'rgba(235,200,150,.10)');
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    for (var k = 0; k < h; k += 7) { g.fillStyle = 'rgba(120,80,40,.035)'; g.fillRect(0, k, w, 3); }
    var e = g.createLinearGradient(0, 0, 0, h);
    e.addColorStop(0, 'rgba(90,60,30,.25)'); e.addColorStop(0.06, 'rgba(90,60,30,0)');
    e.addColorStop(0.94, 'rgba(90,60,30,0)'); e.addColorStop(1, 'rgba(90,60,30,.3)');
    g.fillStyle = e; g.fillRect(0, 0, w, h);
  }
  function tape(g, x, y, w, h) {
    g.fillStyle = 'rgba(214,176,118,.92)'; g.fillRect(x, y, w, h);
    g.strokeStyle = 'rgba(140,100,50,.35)'; g.lineWidth = 2; g.strokeRect(x + 1, y + 1, w - 2, h - 2);
  }
  function printLogo(g, cx, cy, size) {
    if (!logoReady) return;
    g.save(); g.globalCompositeOperation = 'multiply'; g.globalAlpha = 0.9;
    g.drawImage(logo, cx - size / 2, cy - size / 2, size, size);
    g.restore();
  }
  var BW = 0.9, BH = 0.66, BD = 0.66;
  var boxSide = canvasTex(620, 456, function (g, w, h) {
    cardboard(g, w, h, 11); tape(g, w / 2 - 34, 0, 68, h * 0.2); printLogo(g, w * 0.5, h * 0.58, h * 0.62);
  });
  var boxEnd = canvasTex(456, 456, function (g, w, h) {
    cardboard(g, w, h, 23);
    g.beginPath(); g.ellipse(w / 2, h * 0.24, w * 0.17, h * 0.05, 0, 0, Math.PI * 2);
    g.fillStyle = '#2a1c10'; g.fill();
    printLogo(g, w / 2, h * 0.62, h * 0.42);
  });
  var boxTop = canvasTex(620, 456, function (g, w, h) {
    cardboard(g, w, h, 37);
    g.fillStyle = 'rgba(60,38,18,.55)'; g.fillRect(0, h / 2 - 2, w, 4);
    tape(g, 0, h / 2 - 36, w, 72);
  });
  logoTextures.push(boxSide, boxEnd);
  function boxMats(opts) {
    function m(map) { return new THREE.MeshStandardMaterial(Object.assign({ map: map, bumpMap: noise, bumpScale: 0.4, roughness: 0.88 }, opts || {})); }
    return [m(boxEnd), m(boxEnd), m(boxTop), m(boxTop), m(boxSide), m(boxSide)];
  }
  var boxGeo = new RoundedBoxGeometry(BW, BH, BD, 3, 0.02);
  function makeBox(opts) {
    var g = new THREE.Group();
    var mats = boxMats(opts);
    var b = new THREE.Mesh(boxGeo, mats);
    b.position.y = BH / 2;
    g.add(b);
    g.userData.mats = mats;
    return g;
  }

  /* ---------- bureaustoel in stretchfolie ---------- */
  var fabric = new THREE.MeshStandardMaterial({ color: 0x2b2f36, roughness: 0.92, bumpMap: noise, bumpScale: 0.8 });
  var blackPlastic = new THREE.MeshStandardMaterial({ color: 0x15171b, roughness: 0.45, metalness: 0.1 });
  var chrome = new THREE.MeshPhysicalMaterial({ color: 0xd9dde3, metalness: 1, roughness: 0.18 });
  var film = new THREE.MeshPhysicalMaterial({ color: 0xeaf2ff, roughness: 0.12, metalness: 0, transparent: true, opacity: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, depthWrite: false, side: THREE.DoubleSide });
  function makeChair() {
    var g = new THREE.Group();
    // voet: 5 spaken + wieltjes
    for (var i = 0; i < 5; i++) {
      var a = i / 5 * Math.PI * 2;
      var spoke = new THREE.Mesh(new RoundedBoxGeometry(0.46, 0.05, 0.07, 2, 0.02), blackPlastic);
      spoke.position.set(Math.cos(a) * 0.23, 0.1, Math.sin(a) * 0.23);
      spoke.rotation.y = -a;
      spoke.rotation.z = 0.08;
      g.add(spoke);
      var wheel = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), blackPlastic);
      wheel.position.set(Math.cos(a) * 0.45, 0.045, Math.sin(a) * 0.45);
      wheel.scale.set(1, 1, 0.8);
      g.add(wheel);
    }
    var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.1, 20), blackPlastic);
    hub.position.y = 0.12; g.add(hub);
    var gas = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.36, 20), chrome);
    gas.position.y = 0.34; g.add(gas);
    var mech = new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.06, 0.26, 2, 0.02), blackPlastic);
    mech.position.y = 0.53; g.add(mech);
    var seat = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.11, 0.58, 4, 0.05), fabric);
    seat.position.y = 0.61; g.add(seat);
    // rugleuning licht gebogen
    var back = new THREE.Mesh(new RoundedBoxGeometry(0.56, 0.72, 0.08, 4, 0.04), fabric);
    back.position.set(0, 1.08, -0.3);
    back.rotation.x = -0.12;
    g.add(back);
    var spine = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.5, 0.04, 2, 0.015), blackPlastic);
    spine.position.set(0, 0.78, -0.33); spine.rotation.x = -0.35; g.add(spine);
    [-1, 1].forEach(function (s) {
      var post = new THREE.Mesh(new RoundedBoxGeometry(0.04, 0.22, 0.05, 2, 0.015), blackPlastic);
      post.position.set(s * 0.29, 0.75, 0); g.add(post);
      var pad = new THREE.Mesh(new RoundedBoxGeometry(0.07, 0.035, 0.26, 2, 0.015), blackPlastic);
      pad.position.set(s * 0.29, 0.87, 0.01); g.add(pad);
    });
    // stretchfolie om zitting en leuning
    var wrap1 = new THREE.Mesh(new RoundedBoxGeometry(0.7, 0.2, 0.66, 4, 0.08), film);
    wrap1.position.y = 0.62; g.add(wrap1);
    var wrap2 = new THREE.Mesh(new RoundedBoxGeometry(0.64, 0.82, 0.16, 4, 0.07), film);
    wrap2.position.set(0, 1.08, -0.3); wrap2.rotation.x = -0.12; g.add(wrap2);
    var wrap3 = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.3, 0.3, 3, 0.1), film);
    wrap3.position.set(0, 0.84, -0.02); g.add(wrap3);
    return g;
  }

  /* ---------- bureau met monitor ---------- */
  var oak = canvasTex(512, 256, function (g, w, h) {
    g.fillStyle = '#d9b98c'; g.fillRect(0, 0, w, h);
    for (var i = 0; i < 90; i++) {
      var y = rnd(i * 2.1) * h;
      g.strokeStyle = rnd(i) > 0.5 ? 'rgba(150,105,60,.18)' : 'rgba(255,235,200,.2)';
      g.lineWidth = 1 + rnd(i * 5) * 2;
      g.beginPath(); g.moveTo(0, y);
      for (var x = 0; x <= w; x += 32) g.lineTo(x, y + Math.sin(x * 0.02 + i) * 3);
      g.stroke();
    }
  });
  var whiteMetal = new THREE.MeshStandardMaterial({ color: 0xf1f3f6, roughness: 0.35, metalness: 0.3 });
  var screenBlack = new THREE.MeshStandardMaterial({ color: 0x0b0d12, roughness: 0.3, metalness: 0.3 });
  var monTex = canvasTex(400, 240, function (g, w, h) {
    var gr = g.createLinearGradient(0, 0, w, h);
    gr.addColorStop(0, '#0f2c59'); gr.addColorStop(1, '#00498f');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(255,255,255,.9)';
    g.fillRect(24, 24, 120, 12);
    g.fillStyle = 'rgba(255,255,255,.35)';
    for (var i = 0; i < 4; i++) g.fillRect(24, 52 + i * 18, 170 - i * 20, 8);
    g.fillStyle = '#10b981'; g.fillRect(24, 140, 90, 26);
    if (logoReady) g.drawImage(logo, w - 150, 40, 120, 120);
  });
  logoTextures.push(monTex);
  function makeDesk() {
    var g = new THREE.Group();
    var top = new THREE.Mesh(new RoundedBoxGeometry(1.7, 0.05, 0.85, 3, 0.015), [
      new THREE.MeshStandardMaterial({ color: 0xc9a674, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0xc9a674, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ map: oak, roughness: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0xc9a674, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0xc9a674, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0xc9a674, roughness: 0.6 })
    ]);
    top.position.y = 0.94; g.add(top);
    [-1, 1].forEach(function (s) {
      var leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.9, 0.06), whiteMetal);
      leg.position.set(s * 0.7, 0.46, 0); g.add(leg);
      var foot = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.04, 0.74, 2, 0.015), whiteMetal);
      foot.position.set(s * 0.7, 0.02, 0); g.add(foot);
    });
    var beam = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.05), whiteMetal);
    beam.position.set(0, 0.86, -0.2); g.add(beam);
    // monitor
    var standFoot = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.02, 0.22, 2, 0.008), chrome);
    standFoot.position.set(0.1, 0.975, -0.18); g.add(standFoot);
    var arm = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 0.03), chrome);
    arm.position.set(0.1, 1.15, -0.24); g.add(arm);
    var mon = new THREE.Mesh(new RoundedBoxGeometry(0.95, 0.56, 0.04, 2, 0.012), screenBlack);
    mon.position.set(0.1, 1.42, -0.2); g.add(mon);
    var disp = new THREE.Mesh(new THREE.PlaneGeometry(0.89, 0.5), new THREE.MeshBasicMaterial({ map: monTex, toneMapped: false }));
    disp.position.set(0.1, 1.42, -0.178); g.add(disp);
    // toetsenbord + plantje
    var kb = new THREE.Mesh(new RoundedBoxGeometry(0.46, 0.02, 0.15, 2, 0.008), new THREE.MeshStandardMaterial({ color: 0x2f3238, roughness: 0.5 }));
    kb.position.set(0.05, 0.975, 0.18); g.add(kb);
    var pot = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.055, 0.13, 20), new THREE.MeshStandardMaterial({ color: 0xf4f4f2, roughness: 0.4 }));
    pot.position.set(-0.64, 1.03, -0.15); g.add(pot);
    var leafMat = new THREE.MeshStandardMaterial({ color: 0x3f8f3a, roughness: 0.6 });
    for (var i = 0; i < 7; i++) {
      var leaf = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), leafMat);
      leaf.scale.set(0.5, 1.5, 0.25);
      var a = i / 7 * Math.PI * 2;
      leaf.position.set(-0.64 + Math.cos(a) * 0.04, 1.16 + rnd(i) * 0.04, -0.15 + Math.sin(a) * 0.04);
      leaf.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
      g.add(leaf);
    }
    return g;
  }

  logo.onload = function () {
    logoReady = true;
    logoTextures.forEach(function (t) { t.__draw(); });
    request();
  };
  logo.src = logoUrl;

  /* ---------- laptop ---------- */
  var alu = new THREE.MeshPhysicalMaterial({ color: 0xc3c8d0, metalness: 0.85, roughness: 0.34, clearcoat: 0.3, clearcoatRoughness: 0.4 });
  var dark = new THREE.MeshStandardMaterial({ color: 0x0b0d12, roughness: 0.4, metalness: 0.2 });
  var laptop = new THREE.Group();
  world.add(laptop);
  var LW = 3.3, LD = 2.25, LT = 0.1;
  var base = new THREE.Mesh(new RoundedBoxGeometry(LW, LT, LD, 4, 0.045), alu);
  base.position.y = LT / 2;
  laptop.add(base);
  var keysTex = canvasTex(1024, 360, function (g, w, h) {
    g.fillStyle = '#9ea4ad'; g.fillRect(0, 0, w, h);
    var rows = 5, cols = 14, pad = 6, kw = (w - pad) / cols, kh = (h - pad) / rows;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var ww = kw;
      if (r === 4 && c === 5) ww = kw * 5;
      if (r === 4 && c > 5 && c < 10) continue;
      var x = pad + c * kw, y = pad + r * kh;
      g.fillStyle = '#1d2026';
      g.beginPath(); g.roundRect(x, y, ww - pad, kh - pad, 8); g.fill();
      g.fillStyle = 'rgba(255,255,255,.06)'; g.fillRect(x + 4, y + 3, ww - pad - 8, 2);
    }
  });
  var keys = new THREE.Mesh(new THREE.PlaneGeometry(2.75, 0.97), new THREE.MeshStandardMaterial({ map: keysTex, roughness: 0.6 }));
  keys.rotation.x = -Math.PI / 2;
  keys.position.set(0, LT + 0.002, -0.35);
  laptop.add(keys);
  var tpad = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.62), new THREE.MeshPhysicalMaterial({ color: 0xb4bac3, metalness: 0.6, roughness: 0.22, clearcoat: 0.6 }));
  tpad.rotation.x = -Math.PI / 2;
  tpad.position.set(0, LT + 0.002, 0.62);
  laptop.add(tpad);

  var hinge = new THREE.Group();
  hinge.position.set(0, LT, -LD / 2 + 0.03);
  hinge.rotation.x = -0.22;
  laptop.add(hinge);
  var LH = 2.15;
  var lid = new THREE.Mesh(new RoundedBoxGeometry(LW, LH, 0.07, 4, 0.03), alu);
  lid.position.set(0, LH / 2, -0.035);
  hinge.add(lid);
  var bezel = new THREE.Mesh(new THREE.PlaneGeometry(LW - 0.1, LH - 0.1), dark);
  bezel.position.set(0, LH / 2, 0.001);
  hinge.add(bezel);
  var screenTex = new THREE.TextureLoader().load(schermUrl, function () { request(); });
  screenTex.colorSpace = THREE.SRGBColorSpace;
  screenTex.anisotropy = aniso;
  var SW = 3.0, SH = 1.78;
  var display = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false, color: 0xe4e4e4 }));
  display.position.set(0, LH / 2 + 0.03, 0.003);
  hinge.add(display);
  var shine = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), new THREE.MeshBasicMaterial({
    map: canvasTex(256, 256, function (g, w, h) {
      var gr = g.createLinearGradient(0, 0, w, h);
      gr.addColorStop(0, 'rgba(255,255,255,.22)'); gr.addColorStop(0.35, 'rgba(255,255,255,.02)');
      gr.addColorStop(0.55, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(255,255,255,.06)');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
    }), transparent: true, depthWrite: false, toneMapped: false
  }));
  shine.position.copy(display.position); shine.position.z += 0.002;
  hinge.add(shine);
  var glowTex = canvasTex(256, 256, function (g, w, h) {
    var gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gr.addColorStop(0, 'rgba(200,240,255,1)'); gr.addColorStop(0.35, 'rgba(0,125,194,.7)'); gr.addColorStop(1, 'rgba(0,125,194,0)');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  });
  var glowMat = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, opacity: 0 });
  var glow = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), glowMat);
  glow.position.copy(display.position); glow.position.z += 0.01;
  hinge.add(glow);
  var ringTex = canvasTex(256, 256, function (g, w, h) {
    g.strokeStyle = 'rgba(170,230,140,1)'; g.lineWidth = 7;
    g.beginPath(); g.arc(w / 2, h / 2, w / 2 - 10, 0, Math.PI * 2); g.stroke();
  });
  var rings = [0, 1].map(function () {
    var r = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, opacity: 0 }));
    r.position.copy(display.position); r.position.z += 0.012;
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

  /* ---------- stukken die landen ---------- */
  // obj: groep met oorsprong onderaan; pivot = groep in het midden
  function pivoted(obj, h) {
    var p = new THREE.Group();
    obj.position.y = -h / 2;
    p.add(obj);
    p.visible = false;
    world.add(p);
    p.userData.h = h;
    return p;
  }
  var landers = [
    { make: makeDesk, h: 1.7, at: [3.05, 0, -1.0], yaw: -0.45, s: 0.95, y: 0, t0: 0.35, sw: 2.2, sd: 1.4 },
    { make: makeChair, h: 1.45, at: [2.35, 0, 0.35], yaw: -2.5, s: 0.9, y: 0, t0: 1.15, sw: 1.3, sd: 1.3 },
    { make: makeCrate, h: CH, at: [-2.75, 0, 0.1], yaw: 0.3, s: 1.05, y: 0, t0: 1.95, sw: 1.8, sd: 1.4 },
    { make: makeCrate, h: CH, at: [-2.73, 0, 0.1], yaw: 0.26, s: 1.05, y: CH * 1.05 - 0.02, t0: 2.6, sw: 0, sd: 0 },
    { make: function () { return makeBox(); }, h: BH, at: [-2.05, 0, 1.35], yaw: -0.25, s: 0.8, y: 0, t0: 3.2, sw: 1.2, sd: 1.1 }
  ].map(function (d, i) {
    d.mesh = pivoted(d.make(), d.h);
    d.sh = d.sw ? shadow(d.sw * d.s, d.sd * d.s, 0) : null;
    if (d.sh) { d.sh.position.set(d.at[0], 0.003 + i * 0.001, d.at[2]); d.sh.rotation.z = d.yaw; }
    d.spin = new THREE.Vector3(rnd(i + 1) * 5 - 2.5, rnd(i + 7) * 5 - 2.5, rnd(i + 3) * 3 - 1.5);
    d.target = new THREE.Vector3(d.at[0], d.y + d.h * d.s / 2, d.at[2]);
    return d;
  });

  // vliegers naar de bezoeker: krat, doos, stoel, doos
  var FLY_START = 4.3, FLY_EVERY = 2.5, FLY_DUR = 2.3;
  function fadeable(obj) {
    var mats = [];
    obj.traverse(function (o) {
      if (!o.isMesh) return;
      var list = Array.isArray(o.material) ? o.material : [o.material];
      var cl = list.map(function (m) {
        var c = m.clone();
        c.transparent = true;
        c.userData.base = m.opacity;
        mats.push(c);
        return c;
      });
      o.material = Array.isArray(o.material) ? cl : cl[0];
    });
    obj.userData.fade = mats;
    return obj;
  }
  var flyerKinds = [
    { h: CH, obj: pivoted(fadeable(makeCrate()), CH) },
    { h: BH, obj: pivoted(fadeable(makeBox()), BH) },
    { h: 1.45, obj: pivoted(fadeable(makeChair()), 1.45), s: 0.8 },
    { h: BH, obj: pivoted(fadeable(makeBox()), BH) }
  ];
  flyerKinds.forEach(function (f) { f.obj.renderOrder = 2; });

  var tmp = new THREE.Vector3(), c1 = new THREE.Vector3(), c2 = new THREE.Vector3(), p0 = new THREE.Vector3(), p3 = new THREE.Vector3();
  var euler = new THREE.Euler();

  function place(d, time) {
    var lt = (time - d.t0) / 1.3;
    if (lt <= 0) { d.mesh.visible = false; if (d.sh) d.sh.material.opacity = 0; return 0; }
    d.mesh.visible = true;
    var t = clamp(lt, 0, 1), e = easeInOut(t);
    p0.copy(screenCenter).addScaledVector(screenNormal, -0.55);
    c1.copy(screenCenter).addScaledVector(screenNormal, 2.4).add(tmp.set(d.target.x * 0.2, 0.7, 0));
    c2.copy(d.target).add(tmp.set(0, 2.4, 0.6));
    bezier(d.mesh.position, p0, c1, c2, d.target, e);
    var s = d.s * (0.2 + 0.8 * easeOut(clamp(t / 0.45, 0, 1)));
    var land = clamp((lt - 1) / 0.45, 0, 1);
    var squash = lt > 1 ? Math.sin(land * Math.PI * 2) * (1 - land) * 0.1 : 0;
    d.mesh.scale.set(s * (1 + squash * 0.6), s * (1 - squash), s * (1 + squash * 0.6));
    if (lt > 1) d.mesh.position.y = d.target.y - d.h * d.s * squash / 2;
    var r = 1 - e;
    euler.set(d.spin.x * r, d.yaw + d.spin.y * r, d.spin.z * r);
    d.mesh.rotation.copy(euler);
    if (d.sh) d.sh.material.opacity = 0.7 * clamp(1 - (d.mesh.position.y - d.target.y) / 3, 0, 1) * clamp(t * 1.5, 0, 1);
    return t < 1 ? 1 - Math.abs(t - 0.15) / 0.15 : 0;
  }

  function fly(f, k, time) {
    var lt = (time - FLY_START - k * FLY_EVERY) / FLY_DUR;
    if (lt < 0 || lt > 1) return -1;
    var side = k % 2 === 0 ? -1 : 1, seed = k * 3.7;
    var o = f.obj;
    o.visible = true;
    p0.copy(screenCenter).addScaledVector(screenNormal, -0.55);
    c1.copy(screenCenter).addScaledVector(screenNormal, 1.9);
    p3.set(0.5 + side * (0.2 + rnd(seed) * 0.3), 2.1 + rnd(seed + 1) * 0.3, 5.4);
    c2.copy(p3).add(tmp.set(side * 0.6, 0.6, -2.3));
    var e = easeInOut(lt);
    bezier(o.position, p0, c1, c2, p3, e);
    o.scale.setScalar((f.s || 1) * (0.2 + 1.05 * easeOut(clamp(lt / 0.6, 0, 1))));
    euler.set(lt * (1.6 + rnd(seed + 2)) * side, lt * 3.0 * side + 0.4, lt * 1.1);
    o.rotation.copy(euler);
    var op = 1 - clamp((lt - 0.72) / 0.22, 0, 1);
    o.children[0].userData.fade.forEach(function (m) { m.opacity = op * (m.userData.base == null ? 1 : m.userData.base); });
    return lt < 0.3 ? 1 - Math.abs(lt - 0.12) / 0.12 : 0;
  }

  /* ---------- maat, aanwijzer, lus ---------- */
  var L = { w: 0, h: 0 };
  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h || (w === L.w && h === L.h)) return;
    L.w = w; L.h = h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 600 ? 1.5 : 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 1.3 ? 36 : 30;
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

  var raf = 0, visible = false, t0 = null, started = false;
  function frame(ts) {
    raf = 0;
    if (t0 === null) t0 = ts;
    resize();
    var time = fixedTime !== null ? fixedTime : (ts - t0) / 1000;
    pointer.sx += (pointer.x - pointer.sx) * 0.06;
    pointer.sy += (pointer.y - pointer.sy) * 0.06;
    world.rotation.y = -0.16 + pointer.sx * 0.14;
    world.rotation.x = pointer.sy * 0.05;
    world.position.y = Math.sin(time * 0.9) * 0.03;

    var narrow = camera.aspect < 1.3;
    camera.position.set(0.3, narrow ? 3.3 : 3.0, narrow ? 10.9 : 9.6);
    camera.lookAt(0, 0.95, 0);

    var burst = 0;
    landers.forEach(function (d) { burst = Math.max(burst, place(d, time)); });
    flyerKinds.forEach(function (f) { f.obj.visible = false; });
    if (time > FLY_START) {
      var k = Math.floor((time - FLY_START) / FLY_EVERY);
      for (var j = Math.max(0, k - 1); j <= k; j++) {
        var b = fly(flyerKinds[j % flyerKinds.length], j, time);
        if (b > -1) burst = Math.max(burst, b);
      }
    }
    burst = clamp(burst, 0, 1);
    glowMat.opacity = 0.12 + burst * 0.85;
    glow.scale.setScalar(0.8 + burst * 0.5);
    rings.forEach(function (r, i) {
      var ph = (time * 0.8 + i * 0.5) % 1;
      r.scale.setScalar(0.3 + ph * 2.2);
      r.material.opacity = (1 - ph) * (0.25 + burst * 0.6);
    });
    renderer.render(scene, camera);
    if (visible && fixedTime === null) raf = requestAnimationFrame(frame);
  }
  function request() { if (!raf) raf = requestAnimationFrame(frame); }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !started) { started = true; t0 = null; }
      if (visible) request();
    }, { rootMargin: '0px 0px -10% 0px' }).observe(host);
  } else { visible = true; started = true; }
  window.addEventListener('resize', request);
  request();
})();
