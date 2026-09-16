/* =====================================================================
   De Bresser · Opslag: verhuisdozen komen uit de laptop
   Onder de introtekst op diensten-opslag.html staat een laptop met een
   foto van het magazijn op het scherm. Kartonnen verhuisdozen (bruin
   karton, tape, handgrepen, De Bresser-opdruk) komen door het scherm naar
   buiten: drie landen naast de laptop, daarna vliegt er steeds een doos
   naar de bezoeker toe.

   Bouwen (three 0.186): npx esbuild js/src/opslag-dozen.src.js --bundle --minify
   --format=iife --target=es2019 --outfile=js/opslag-dozen.js
   Test: ?od-t=4.5 zet de tijd vast.
   ===================================================================== */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

(function () {
  var host = document.querySelector('[data-ops-dozen]');
  if (!host) return;

  var query = new URLSearchParams(location.search);
  var fixedTime = query.has('od-t') ? parseFloat(query.get('od-t')) : null;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ---------- hulpjes ---------- */
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function rnd(seed) { var v = Math.sin(seed * 91.37 + 12.9) * 43758.5453; return v - Math.floor(v); }
  function bezier(out, a, b, c, d, t) {
    var u = 1 - t;
    out.set(0, 0, 0)
      .addScaledVector(a, u * u * u)
      .addScaledVector(b, 3 * u * u * t)
      .addScaledVector(c, 3 * u * t * t)
      .addScaledVector(d, t * t * t);
    return out;
  }

  var canvas = document.createElement('canvas');
  canvas.className = 'ops-doos__canvas';
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (e) { host.hidden = true; return; }
  host.appendChild(canvas);
  host.classList.add('is-3d');

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  var aniso = renderer.capabilities.getMaxAnisotropy();

  var scene = new THREE.Scene();
  var pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.75;
  pmrem.dispose();
  var key = new THREE.DirectionalLight(0xfff4e6, 2.2);
  key.position.set(-3, 6, 5);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xbfe3ff, 0.9);
  rim.position.set(4, 3, -4);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xf2f6ff, 0x5a4630, 0.45));

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

  /* ---------- karton ---------- */
  var logo = new Image();
  var logoReady = false;

  function cardboard(g, w, h, seed) {
    g.fillStyle = '#c89a62';
    g.fillRect(0, 0, w, h);
    // grove kleurvlekken
    for (var i = 0; i < 70; i++) {
      var x = rnd(seed + i) * w, y = rnd(seed + i * 1.7) * h, r = 30 + rnd(seed + i * 2.3) * 120;
      var gr = g.createRadialGradient(x, y, 0, x, y, r);
      var dark = rnd(seed + i * 3.1) > 0.5;
      gr.addColorStop(0, dark ? 'rgba(120,80,40,.10)' : 'rgba(235,200,150,.10)');
      gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr;
      g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    // vezels
    for (var j = 0; j < 900; j++) {
      var fx = rnd(seed * 3 + j) * w, fy = rnd(seed * 5 + j * 1.3) * h;
      g.strokeStyle = rnd(seed + j * 7) > 0.5 ? 'rgba(90,60,30,.10)' : 'rgba(255,230,190,.10)';
      g.lineWidth = 1;
      g.beginPath(); g.moveTo(fx, fy); g.lineTo(fx + 4 + rnd(j) * 14, fy + (rnd(j * 3) - 0.5) * 3); g.stroke();
    }
    // golfkarton: zachte horizontale ribbels
    for (var k = 0; k < h; k += 7) {
      g.fillStyle = 'rgba(120,80,40,.035)';
      g.fillRect(0, k, w, 3);
    }
    // donkere randen (vuil en slijtage)
    var e = g.createLinearGradient(0, 0, w, 0);
    e.addColorStop(0, 'rgba(90,60,30,.28)'); e.addColorStop(0.05, 'rgba(90,60,30,0)');
    e.addColorStop(0.95, 'rgba(90,60,30,0)'); e.addColorStop(1, 'rgba(90,60,30,.28)');
    g.fillStyle = e; g.fillRect(0, 0, w, h);
    var e2 = g.createLinearGradient(0, 0, 0, h);
    e2.addColorStop(0, 'rgba(90,60,30,.25)'); e2.addColorStop(0.06, 'rgba(90,60,30,0)');
    e2.addColorStop(0.94, 'rgba(90,60,30,0)'); e2.addColorStop(1, 'rgba(90,60,30,.3)');
    g.fillStyle = e2; g.fillRect(0, 0, w, h);
  }
  function tape(g, x, y, w, h) {
    g.fillStyle = 'rgba(214,176,118,.92)';
    g.fillRect(x, y, w, h);
    // glans en kreukels
    var gl = g.createLinearGradient(x, y, x + w, y + h);
    gl.addColorStop(0, 'rgba(255,245,220,.35)'); gl.addColorStop(0.5, 'rgba(255,245,220,.05)'); gl.addColorStop(1, 'rgba(255,245,220,.25)');
    g.fillStyle = gl; g.fillRect(x, y, w, h);
    g.strokeStyle = 'rgba(140,100,50,.35)'; g.lineWidth = 2;
    g.strokeRect(x + 1, y + 1, w - 2, h - 2);
    for (var i = 0; i < 6; i++) {
      g.strokeStyle = 'rgba(255,250,235,.25)'; g.lineWidth = 1.5;
      var px = x + rnd(i * 9 + x) * w, py = y + rnd(i * 4 + y) * h;
      g.beginPath(); g.moveTo(px, py); g.lineTo(px + (w > h ? 40 : 6), py + (w > h ? 6 : 40)); g.stroke();
    }
  }
  function handHole(g, cx, cy, w, h) {
    g.save();
    g.beginPath();
    g.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
    var gr = g.createLinearGradient(0, cy - h / 2, 0, cy + h / 2);
    gr.addColorStop(0, '#1c130b'); gr.addColorStop(1, '#3d2a18');
    g.fillStyle = gr; g.fill();
    g.strokeStyle = 'rgba(240,210,160,.55)'; g.lineWidth = 3; g.stroke();
    g.restore();
  }
  function arrowsUp(g, x, y, s) {
    g.save();
    g.strokeStyle = 'rgba(15,44,89,.8)'; g.fillStyle = 'rgba(15,44,89,.8)'; g.lineWidth = s * 0.09;
    for (var i = 0; i < 2; i++) {
      var ax = x + i * s * 0.55;
      g.beginPath(); g.moveTo(ax, y + s); g.lineTo(ax, y + s * 0.35); g.stroke();
      g.beginPath(); g.moveTo(ax - s * 0.2, y + s * 0.4); g.lineTo(ax, y); g.lineTo(ax + s * 0.2, y + s * 0.4); g.closePath(); g.fill();
    }
    g.fillRect(x - s * 0.25, y + s * 1.05, s * 1.05, s * 0.08);
    g.restore();
  }
  function glass(g, x, y, s) {
    g.save();
    g.strokeStyle = 'rgba(15,44,89,.8)'; g.lineWidth = s * 0.08; g.lineCap = 'round';
    g.beginPath();
    g.moveTo(x, y); g.lineTo(x + s * 0.6, y);
    g.quadraticCurveTo(x + s * 0.62, y + s * 0.5, x + s * 0.3, y + s * 0.55);
    g.quadraticCurveTo(x - s * 0.02, y + s * 0.5, x, y);
    g.moveTo(x + s * 0.3, y + s * 0.55); g.lineTo(x + s * 0.3, y + s);
    g.moveTo(x + s * 0.1, y + s); g.lineTo(x + s * 0.5, y + s);
    g.moveTo(x + s * 0.24, y + s * 0.05); g.lineTo(x + s * 0.34, y + s * 0.22); g.lineTo(x + s * 0.26, y + s * 0.3);
    g.stroke();
    g.restore();
  }
  function printLogo(g, cx, cy, size) {
    if (!logoReady) return;
    g.save();
    g.globalCompositeOperation = 'multiply';
    g.globalAlpha = 0.9;
    g.drawImage(logo, cx - size / 2, cy - size / 2, size, size);
    g.restore();
  }

  // doos: 1.2 breed, 0.86 hoog, 0.86 diep (tekstuur-verhouding volgt dat)
  var BW = 1.2, BH = 0.86, BD = 0.86;
  var faceSide = canvasTex(720, 516, function (g, w, h) {
    cardboard(g, w, h, 11);
    tape(g, w / 2 - 40, 0, 80, h * 0.2);
    printLogo(g, w * 0.3, h * 0.56, h * 0.62);
    arrowsUp(g, w * 0.7, h * 0.36, 70);
    glass(g, w * 0.84, h * 0.34, 72);
    g.fillStyle = 'rgba(15,44,89,.75)';
    g.fillRect(w * 0.62, h * 0.7, w * 0.3, 3);
    g.fillRect(w * 0.62, h * 0.78, w * 0.3, 3);
  });
  var faceEnd = canvasTex(516, 516, function (g, w, h) {
    cardboard(g, w, h, 23);
    handHole(g, w / 2, h * 0.24, w * 0.34, h * 0.1);
    printLogo(g, w / 2, h * 0.62, h * 0.46);
  });
  var faceTop = canvasTex(720, 516, function (g, w, h) {
    cardboard(g, w, h, 37);
    // naad tussen de flappen
    g.fillStyle = 'rgba(60,38,18,.55)';
    g.fillRect(0, h / 2 - 2, w, 4);
    g.fillStyle = 'rgba(255,230,190,.25)';
    g.fillRect(0, h / 2 + 2, w, 2);
    tape(g, 0, h / 2 - 40, w, 80);
  });
  var bump = canvasTex(512, 512, function (g, w, h) {
    g.fillStyle = '#676767'; g.fillRect(0, 0, w, h);
    for (var k = 0; k < h; k += 7) { g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(0, k, w, 3); }
    for (var i = 0; i < 2500; i++) {
      g.fillStyle = rnd(i) > 0.5 ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.12)';
      g.fillRect(rnd(i * 1.3) * w, rnd(i * 2.9) * h, 2, 2);
    }
  }, false);

  function boxMaterials(opts) {
    function m(map) {
      return new THREE.MeshStandardMaterial(Object.assign({ map: map, bumpMap: bump, bumpScale: 0.6, roughness: 0.88, metalness: 0 }, opts || {}));
    }
    // volgorde BoxGeometry: +x, -x, +y, -y, +z, -z
    return [m(faceEnd), m(faceEnd), m(faceTop), m(faceTop), m(faceSide), m(faceSide)];
  }
  var boxGeo = new RoundedBoxGeometry(BW, BH, BD, 3, 0.025);
  var sharedBoxMat = boxMaterials();

  logo.onload = function () {
    logoReady = true;
    [faceSide, faceEnd].forEach(function (t) { t.__draw(); });
    request();
  };
  logo.src = 'assets/img/logo-de-bresser.png';

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
    g.fillStyle = '#2f2f2f'; g.fillRect(0, 0, w, h);
    var rows = 5, cols = 14, pad = 6;
    var kw = (w - pad) / cols, kh = (h - pad) / rows;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var ww = kw;
        if (r === 4 && c === 5) { ww = kw * 5; }
        if (r === 4 && c > 5 && c < 10) continue;
        var x = pad + c * kw, y = pad + r * kh;
        var gr = g.createLinearGradient(0, y, 0, y + kh);
        gr.addColorStop(0, '#2f2f2f'); gr.addColorStop(1, '#2f2f2f');
        g.fillStyle = gr;
        g.beginPath(); g.roundRect(x, y, ww - pad, kh - pad, 8); g.fill();
        g.fillStyle = 'rgba(255,255,255,.05)';
        g.fillRect(x + 4, y + 3, ww - pad - 8, 2);
      }
    }
  });
  var keys = new THREE.Mesh(new THREE.PlaneGeometry(2.75, 0.97), new THREE.MeshStandardMaterial({ map: keysTex, roughness: 0.6 }));
  keys.rotation.x = -Math.PI / 2;
  keys.position.set(0, LT + 0.002, -0.35);
  laptop.add(keys);
  var pad = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.62), new THREE.MeshPhysicalMaterial({ color: 0xb4bac3, metalness: 0.6, roughness: 0.22, clearcoat: 0.6 }));
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(0, LT + 0.002, 0.62);
  laptop.add(pad);

  // deksel scharniert aan de achterkant
  var hinge = new THREE.Group();
  hinge.position.set(0, LT, -LD / 2 + 0.03);
  hinge.rotation.x = -0.24;
  laptop.add(hinge);
  var LH = 2.15;
  var lid = new THREE.Mesh(new RoundedBoxGeometry(LW, LH, 0.07, 4, 0.03), alu);
  lid.position.set(0, LH / 2, -0.035);
  hinge.add(lid);
  var bezel = new THREE.Mesh(new THREE.PlaneGeometry(LW - 0.1, LH - 0.1), dark);
  bezel.position.set(0, LH / 2, 0.001);
  hinge.add(bezel);

  var screenTex = new THREE.TextureLoader().load('assets/img/opslag-dozen/scherm.webp', function () { request(); });
  screenTex.colorSpace = THREE.SRGBColorSpace;
  screenTex.anisotropy = aniso;
  var SW = 3.0, SH = 1.78;
  var display = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false, color: 0xdddddd }));
  display.position.set(0, LH / 2 + 0.03, 0.003);
  hinge.add(display);
  // glasreflectie over het scherm
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
  // groene gloed als er een doos door het scherm komt
  var glowTex = canvasTex(256, 256, function (g, w, h) {
    var gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gr.addColorStop(0, 'rgba(180,255,220,1)'); gr.addColorStop(0.35, 'rgba(16,185,129,.7)'); gr.addColorStop(1, 'rgba(16,185,129,0)');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  });
  var glowMat = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, opacity: 0 });
  var glow = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), glowMat);
  glow.position.copy(display.position); glow.position.z += 0.01;
  hinge.add(glow);
  var ringTex = canvasTex(256, 256, function (g, w, h) {
    g.strokeStyle = 'rgba(160,255,215,1)'; g.lineWidth = 7;
    g.beginPath(); g.arc(w / 2, h / 2, w / 2 - 10, 0, Math.PI * 2); g.stroke();
  });
  var rings = [0, 1].map(function () {
    var r = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: ringTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, opacity: 0 }));
    r.position.copy(display.position); r.position.z += 0.012;
    hinge.add(r);
    return r;
  });

  // schermmidden en -normaal in wereldcoördinaten
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
  var lapShadow = shadow(LW * 1.35, LD * 1.5, 0.75);
  lapShadow.position.z = -0.1;

  /* ---------- dozen ---------- */
  // drie dozen landen naast de laptop
  var landers = [
    { at: new THREE.Vector3(-2.75, 0, 0.35), yaw: 0.35, s: 1.05, y: 0, t0: 0.35 },
    { at: new THREE.Vector3(2.5, 0, 0.25), yaw: -0.3, s: 1.1, y: 0, t0: 1.25 },
    { at: new THREE.Vector3(2.43, 0, 0.23), yaw: -0.1, s: 0.86, y: BH * 1.1, t0: 2.15 }
  ].map(function (d, i) {
    var mesh = new THREE.Mesh(boxGeo, sharedBoxMat);
    mesh.visible = false;
    world.add(mesh);
    var sh = shadow(BW * d.s * 1.7, BD * d.s * 1.9, 0);
    sh.position.set(d.at.x, 0.003 + i * 0.001, d.at.z);
    sh.rotation.z = d.yaw;
    d.mesh = mesh; d.sh = sh;
    d.spin = new THREE.Vector3(rnd(i + 1) * 5 - 2.5, rnd(i + 7) * 5 - 2.5, rnd(i + 3) * 3 - 1.5);
    d.target = new THREE.Vector3(d.at.x, d.y + BH * d.s / 2, d.at.z);
    return d;
  });

  // steeds nieuwe dozen die naar de bezoeker vliegen
  var FLY_START = 3.4, FLY_EVERY = 2.6, FLY_DUR = 2.2;
  var flyers = [0, 1].map(function (i) {
    var mats = boxMaterials({ transparent: true });
    var mesh = new THREE.Mesh(boxGeo, mats);
    mesh.visible = false;
    mesh.renderOrder = 2;
    world.add(mesh);
    return { mesh: mesh, mats: mats };
  });

  var tmp = new THREE.Vector3(), c1 = new THREE.Vector3(), c2 = new THREE.Vector3(), p0 = new THREE.Vector3(), p3 = new THREE.Vector3();
  var euler = new THREE.Euler();

  function place(d, time) {
    var lt = (time - d.t0) / 1.25;
    if (lt <= 0) { d.mesh.visible = false; d.sh.material.opacity = 0; return 0; }
    d.mesh.visible = true;
    var t = clamp(lt, 0, 1);
    var e = easeInOut(t);
    p0.copy(screenCenter).addScaledVector(screenNormal, -0.55);
    c1.copy(screenCenter).addScaledVector(screenNormal, 2.2).add(tmp.set(d.at.x * 0.2, 0.6, 0));
    c2.copy(d.target).add(tmp.set(0, 2.4, 0.6));
    bezier(d.mesh.position, p0, c1, c2, d.target, e);
    var s = d.s * (0.28 + 0.72 * easeOut(clamp(t / 0.45, 0, 1)));
    // stuiteren bij de landing
    var land = clamp((lt - 1) / 0.45, 0, 1);
    var squash = lt > 1 ? Math.sin(land * Math.PI * 2) * (1 - land) * 0.12 : 0;
    d.mesh.scale.set(s * (1 + squash * 0.6), s * (1 - squash), s * (1 + squash * 0.6));
    if (lt > 1) d.mesh.position.y = d.target.y - BH * d.s * squash / 2;
    var r = 1 - e;
    euler.set(d.spin.x * r, d.yaw + d.spin.y * r, d.spin.z * r);
    d.mesh.rotation.copy(euler);
    // rust: heel licht ademen
    if (lt > 1.5 && fixedTime === null) d.mesh.rotation.z += Math.sin(time * 1.3 + d.t0) * 0.004;
    d.sh.material.opacity = 0.7 * clamp((d.mesh.position.y > 0 ? 1 - (d.mesh.position.y - d.target.y) / 3 : 1), 0, 1) * clamp(t * 1.5, 0, 1) * (d.y > 0 ? 0 : 1);
    return t < 1 ? 1 - Math.abs(t - 0.15) / 0.15 : 0;
  }

  function fly(f, k, time) {
    // k-de vliegende doos, start op FLY_START + k * FLY_EVERY
    var lt = (time - FLY_START - k * FLY_EVERY) / FLY_DUR;
    if (lt < 0 || lt > 1) return -1;
    var side = k % 2 === 0 ? -1 : 1;
    var seed = k * 3.7;
    f.mesh.visible = true;
    p0.copy(screenCenter).addScaledVector(screenNormal, -0.55);
    c1.copy(screenCenter).addScaledVector(screenNormal, 1.8);
    p3.set(0.6 + side * (0.15 + rnd(seed) * 0.25), 2.0 + rnd(seed + 1) * 0.4, 5.0);
    c2.copy(p3).add(tmp.set(side * 0.5, 0.5, -2.2));
    var e = easeInOut(lt);
    bezier(f.mesh.position, p0, c1, c2, p3, e);
    var s = 0.28 + 1.0 * easeOut(clamp(lt / 0.6, 0, 1));
    f.mesh.scale.setScalar(s);
    euler.set(lt * (2.2 + rnd(seed + 2)) * side, lt * 3.4 * side + 0.3, lt * 1.3);
    f.mesh.rotation.copy(euler);
    var op = 1 - clamp((lt - 0.72) / 0.22, 0, 1);
    f.mats.forEach(function (m) { m.opacity = op; });
    return lt < 0.3 ? 1 - Math.abs(lt - 0.12) / 0.12 : 0;
  }

  /* ---------- maat en camera ---------- */
  var L = { w: 0, h: 0 };
  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h || (w === L.w && h === L.h)) return;
    L.w = w; L.h = h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 600 ? 1.5 : 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 1.3 ? 34 : 30;
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
  var raf = 0, visible = false, t0 = null, started = false;
  function frame(ts) {
    raf = 0;
    if (t0 === null) t0 = ts;
    resize();
    var time = fixedTime !== null ? fixedTime : (ts - t0) / 1000;

    pointer.sx += (pointer.x - pointer.sx) * 0.06;
    pointer.sy += (pointer.y - pointer.sy) * 0.06;
    world.rotation.y = -0.18 + pointer.sx * 0.12;
    world.rotation.x = pointer.sy * 0.04;
    world.position.y = Math.sin(time * 0.9) * 0.03;

    var narrow = camera.aspect < 1.3;
    camera.position.set(0.3, narrow ? 3.2 : 2.9, narrow ? 9.0 : 9.1);
    camera.lookAt(0, 0.95, 0);

    var burst = 0;
    landers.forEach(function (d) { burst = Math.max(burst, place(d, time)); });
    flyers.forEach(function (f) { f.mesh.visible = false; });
    if (time > FLY_START) {
      var k = Math.floor((time - FLY_START) / FLY_EVERY);
      for (var j = Math.max(0, k - 1); j <= k; j++) {
        var b = fly(flyers[j % 2], j, time);
        if (b > -1) burst = Math.max(burst, b);
      }
    }
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
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      // de animatie begint pas als de laptop in beeld komt
      if (visible && !started) { started = true; t0 = null; }
      if (visible) request();
    }, { rootMargin: '0px 0px -10% 0px' }).observe(host);
  } else { visible = true; started = true; }
  window.addEventListener('resize', request);
  request();
})();
