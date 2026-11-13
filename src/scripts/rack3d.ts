// Armadio di rete in 3D (Three.js), caricato solo quando la sezione si avvicina.
// La scena non ha una sua animazione: ogni fotogramma viene calcolato dal tempo della
// timeline dello scroll (getT) e dalle sue etichette, così 3D e testo restano allineati.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type Labels = Record<string, number>;
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);

// Misure reali: rack 19", 1U = 44,45 mm. Unità in metri.
const U = 0.04445;
const W = 0.482; // larghezza frontale apparato con orecchie
const PX = 4000; // pixel di texture per metro
const TOP = 0.05 + 9 * U; // quota del primo U (armadio 9U)

export function initRack3D(host: HTMLElement, getT: () => number, labels: Labels) {
  const canvas = document.createElement('canvas');
  canvas.className = 'rk__gl';
  host.prepend(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 900 ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const aniso = renderer.capabilities.getMaxAnisotropy();

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.75;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  const target = new THREE.Vector3(0.08, 0.29, -0.14);

  // Luci: principale con ombre morbide, riempimento freddo, controluce
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(1.6, 2.6, 2.2);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -1; key.shadow.camera.right = 1; key.shadow.camera.top = 1; key.shadow.camera.bottom = -0.6;
  key.shadow.radius = 6; key.shadow.bias = -0.0004; key.shadow.normalBias = 0.01;
  scene.add(key);
  scene.add(new THREE.HemisphereLight(0xeaf2ff, 0xb9c3d1, 0.55));
  const rim = new THREE.DirectionalLight(0x9cc6ff, 0.8);
  rim.position.set(-2, 1.5, -1.5);
  scene.add(rim);
  const apLight = new THREE.PointLight(0x3fa2ff, 0, 0.8, 2);
  scene.add(apLight);

  // Parete: trasparente, riceve solo le ombre (sotto si vede lo sfondo della sezione)
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(8, 6), new THREE.ShadowMaterial({ opacity: 0.28 }));
  wall.position.set(0, 0.3, -0.472); wall.receiveShadow = true; scene.add(wall);

  // Materiali
  const powder = new THREE.MeshStandardMaterial({ color: 0x1d2229, metalness: 0.55, roughness: 0.5 });
  const alu = new THREE.MeshStandardMaterial({ color: 0xd9dde3, metalness: 0.8, roughness: 0.32 });
  const aluDark = new THREE.MeshStandardMaterial({ color: 0x2a2f37, metalness: 0.7, roughness: 0.4 });
  const plastic = new THREE.MeshStandardMaterial({ color: 0xeef1f5, metalness: 0, roughness: 0.35 });

  // ---------- Armadio a muro 9U con porta in vetro aperta ----------
  const rack = new THREE.Group();
  scene.add(rack);
  const box = (w: number, h: number, d: number, m: THREE.Material | THREE.Material[], x: number, y: number, z: number) => {
    const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    me.position.set(x, y, z); me.castShadow = true; me.receiveShadow = true; rack.add(me); return me;
  };
  const CW = 0.6, CH = 9 * U + 0.1, CD = 0.5, FZ = 0.028; // misure esterne, filo frontale
  const T = 0.012;
  const sideTex = ventTexture();
  const sideMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: sideTex, metalness: 0.5, roughness: 0.5 });
  for (const sx of [-1, 1]) box(T, CH, CD, [sideMat, sideMat, powder, powder, powder, powder], sx * (CW / 2 - T / 2), CH / 2, FZ - CD / 2);
  box(CW, T, CD, powder, 0, CH - T / 2, FZ - CD / 2);
  box(CW, T, CD, powder, 0, T / 2, FZ - CD / 2);
  box(CW, CH, T, powder, 0, CH / 2, FZ - CD + T / 2);
  // cornice frontale
  box(CW, 0.03, 0.02, powder, 0, CH - 0.015, FZ - 0.01);
  box(CW, 0.03, 0.02, powder, 0, 0.015, FZ - 0.01);
  // montanti 19" forati
  const railH = 9 * U, railY = 0.05 + railH / 2;
  const railMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: holesTexture(railH), metalness: 0.55, roughness: 0.5 });
  for (const sx of [-1, 1]) {
    box(0.016, railH, 0.02, [powder, powder, powder, powder, railMat, powder], sx * (W / 2 - 0.009), railY, -0.01);
    box(0.016, railH, 0.02, powder, sx * (W / 2 - 0.009), railY, -0.36);
  }
  // pressacavo sul tetto
  const gland = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.006, 0.05), new THREE.MeshStandardMaterial({ color: 0x0b0d10, roughness: 0.9 }));
  gland.position.set(0.12, CH + 0.001, -0.1); rack.add(gland);
  // porta: telaio + vetro, aperta sulla sinistra
  const door = new THREE.Group();
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xdfe9f5, metalness: 0, roughness: 0.04, transmission: 0.92, thickness: 0.004, ior: 1.5, transparent: true, opacity: 0.55, envMapIntensity: 1.4 });
  const DH = CH - 0.006, DW = CW - 0.004;
  const fr = (w: number, h: number, x: number, y: number) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.016), powder); m.position.set(x, y, 0); m.castShadow = true; door.add(m); };
  fr(DW, 0.035, DW / 2, DH / 2 - 0.0175); fr(DW, 0.035, DW / 2, -DH / 2 + 0.0175);
  fr(0.035, DH, 0.0175, 0); fr(0.035, DH, DW - 0.0175, 0);
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(DW - 0.06, DH - 0.06), glass);
  pane.position.set(DW / 2, 0, 0); door.add(pane);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.09, 0.02), alu);
  handle.position.set(DW - 0.02, 0, 0.016); door.add(handle);
  door.position.set(-CW / 2, CH / 2, FZ + 0.008);
  door.rotation.y = -THREE.MathUtils.degToRad(112);
  rack.add(door);

  // ---------- Apparati ----------
  type Dev = { g: THREE.Group; front: THREE.MeshStandardMaterial; y: number; ports: Record<string, [number, number][]>; extra?: THREE.Object3D };
  const devices: Record<string, Dev> = {};
  function device(key: string, n: number, units: number, style: 'light' | 'dark', depth: number, draw: Draw) {
    const h = units * U - 0.001;
    const tex = panelTextures(units, style, draw);
    const front = new THREE.MeshStandardMaterial({
      map: tex.map, emissiveMap: tex.emissive, emissive: 0xffffff, emissiveIntensity: 0,
      metalness: style === 'light' ? 0.15 : 0.35, roughness: style === 'light' ? 0.38 : 0.5,
    });
    const body = style === 'light' ? alu : aluDark;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(W - 0.002, h, depth), [body, body, body, body, front, body]);
    mesh.position.z = -depth / 2 + 0.004;
    mesh.castShadow = true; mesh.receiveShadow = true;
    const g = new THREE.Group();
    g.add(mesh);
    const y = TOP - n * U - h / 2;
    g.position.y = y;
    rack.add(g);
    // porte in coordinate 3D (relative al centro del frontale)
    const ports: Record<string, [number, number][]> = {};
    for (const [k, list] of Object.entries(tex.ports)) ports[k] = list.map(([px, py]) => [px / PX - W / 2, y + h / 2 - py / PX]);
    devices[key] = { g, front, y, ports };
    return devices[key];
  }

  device('gw', 0, 1, 'light', 0.28, drawGateway);
  device('fw', 1, 1, 'light', 0.24, drawFirewall);
  device('pp', 2, 1, 'dark', 0.08, drawPatch);
  device('cm', 3, 1, 'dark', 0.06, drawBrush);
  device('sw', 4, 1, 'light', 0.3, drawSwitch);
  device('bl', 5, 1, 'light', 0.02, drawBlank);
  device('ups', 6, 2, 'light', 0.42, drawUps);

  // ---------- Access point a parete ----------
  const ap = new THREE.Group();
  const apBody = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.1, 0.03, 96), plastic);
  apBody.rotation.x = Math.PI / 2; apBody.castShadow = true; ap.add(apBody);
  const apRing = new THREE.Mesh(new THREE.TorusGeometry(0.066, 0.0045, 16, 96), new THREE.MeshStandardMaterial({ color: 0x2f6fe0, emissive: 0x2f8bff, emissiveIntensity: 0, roughness: 0.3 }));
  apRing.position.z = 0.0155; ap.add(apRing);
  const apDot = new THREE.Mesh(new THREE.CircleGeometry(0.012, 32), new THREE.MeshStandardMaterial({ color: 0xe9edf2, roughness: 0.5 }));
  apDot.position.z = 0.0152; ap.add(apDot);
  ap.position.set(0.47, 0.44, -0.452);
  scene.add(ap);
  apLight.position.set(0.5, 0.42, -0.35);

  // ---------- Cavi ----------
  type Cable = { mesh: THREE.Mesh; total: number; boots: THREE.Mesh[] };
  const cables: Record<string, Cable[]> = { wan: [], up: [], patch: [], ap: [] };
  const cableMat = (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.48, metalness: 0.02 });
  const bootMat = new THREE.MeshPhysicalMaterial({ color: 0xdfe8f2, roughness: 0.2, transmission: 0.5, thickness: 0.01 });
  function cable(group: string, pts: THREE.Vector3[], color: number, r = 0.0026, boots = true) {
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const seg = Math.max(40, Math.round(curve.getLength() * 260));
    const geo = new THREE.TubeGeometry(curve, seg, r, 10, false);
    const mesh = new THREE.Mesh(geo, cableMat(color));
    mesh.castShadow = true;
    scene.add(mesh);
    const bs: THREE.Mesh[] = [];
    if (boots) for (const end of [pts[0], pts[pts.length - 1]]) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.0115, 0.0095, 0.022), bootMat);
      b.position.set(end.x, end.y, end.z + 0.009); b.visible = false; scene.add(b); bs.push(b);
    }
    const c = { mesh, total: geo.index!.count, boots: bs };
    geo.setDrawRange(0, 0);
    cables[group].push(c);
    return c;
  }
  const z0 = 0.006; // davanti al frontale
  const P = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const gwP = devices.gw.ports, fwP = devices.fw.ports, ppP = devices.pp.ports, swP = devices.sw.ports;

  // fibra e backup scendono dall'alto e entrano nelle porte WAN del gateway
  [[gwP.wan[0], 0x2cc4e8], [gwP.wan[1], 0x22c55e]].forEach(([p, col], i) => {
    const [x, y] = p as [number, number];
    cable('wan', [P(0.07 + i * 0.03, 1.3, -0.3), P(0.08 + i * 0.03, CH + 0.05, -0.1), P(0.08 + i * 0.03, CH - 0.02, -0.08), P(x + 0.01, TOP - 0.004, 0.02), P(x + 0.004, y + 0.02, 0.05), P(x, y + 0.004, 0.035), P(x, y, z0)], col as number, 0.0024);
  });
  // uplink arancioni: gateway → firewall, firewall → switch
  {
    const [ax, ay] = gwP.lan[0], [bx, by] = fwP.lan[0];
    cable('up', [P(ax, ay, z0), P(ax, ay - 0.004, 0.04), P((ax + bx) / 2, (ay + by) / 2 - 0.012, 0.065), P(bx, by + 0.004, 0.04), P(bx, by, z0)], 0xf29a2e);
    const [cx, cy] = fwP.lan[7], [dx, dy] = swP.sfp[0];
    cable('up', [P(cx, cy, z0), P(cx, cy - 0.004, 0.035), P(W / 2 + 0.035, cy - 0.03, 0.05), P(W / 2 + 0.04, dy + 0.02, 0.05), P(dx + 0.01, dy, 0.04), P(dx, dy, z0)], 0xf29a2e);
  }
  // cavi patch: patch panel → switch, con la pancia che scende nel passacavi
  const colors = [0x2f6fe0, 0xe8ecf1, 0x2f6fe0, 0x43b6f0, 0xe8ecf1, 0x2f6fe0, 0x2f6fe0, 0xe8ecf1, 0x43b6f0, 0x2f6fe0, 0xe8ecf1, 0x2f6fe0];
  const cmY = devices.cm.y;
  for (let i = 0; i < 12; i++) {
    const [px, py] = ppP.p[i], [sx, sy] = swP.p[i];
    const sag = 0.05 + (i % 3) * 0.008;
    cable('patch', [P(px, py, z0), P(px, py - 0.006, 0.03), P(px * 0.6 + sx * 0.4, cmY + 0.004, sag), P(sx, sy + 0.01, 0.035), P(sx, sy, z0)], colors[i]);
  }
  // cavo dell'access point: dallo switch, lungo il fianco dell'armadio, fino alla parete
  {
    const [x, y] = swP.p[23];
    cable('ap', [P(x, y, z0), P(x + 0.01, y - 0.006, 0.035), P(W / 2 + 0.035, y, 0.03), P(0.265, TOP - 0.01, -0.06), P(0.2, CH - 0.02, -0.1), P(0.2, CH + 0.04, -0.1), P(0.3, CH + 0.03, -0.44), P(0.41, 0.49, -0.462), P(0.44, 0.46, -0.462)], 0xe8ecf1, 0.0026, false);
  }

  // ---------- Animazione dal tempo della timeline ----------
  const L = labels;
  const enter = (k: string, t0: number, t: number) => {
    const d = devices[k], p = ease((t - t0) / 1);
    d.g.visible = t > t0;
    d.g.position.z = (1 - p) * 0.55;
    d.g.position.y = d.y + (1 - p) * 0.02;
  };
  const leds = (k: string, t0: number, t: number, max = 1.6) => { devices[k].front.emissiveIntensity = clamp((t - t0) / 0.4) * max; };
  const draw = (c: Cable, p: number) => {
    const n = Math.floor((c.total * clamp(p)) / 60) * 60; // multipli interi di un anello del tubo
    c.mesh.geometry.setDrawRange(0, n);
    c.mesh.visible = n > 0;
    c.boots.forEach((b, i) => (b.visible = i === 0 ? p > 0.01 : p >= 1));
  };

  let mx = 0, my = 0, smx = 0, smy = 0, clock = 0;
  host.addEventListener('pointermove', (e) => {
    const r = host.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width - 0.5; my = (e.clientY - r.top) / r.height - 0.5;
  });
  host.addEventListener('pointerleave', () => { mx = 0; my = 0; });

  function frame(dt: number) {
    clock += dt;
    const t = getT();
    rack.position.y = (1 - ease(t / 0.8)) * -0.04;
    enter('gw', L.gw, t);
    enter('fw', L.fw, t);
    enter('pp', L.sw, t); enter('cm', L.sw + 0.3, t); enter('sw', L.sw + 0.6, t);
    enter('bl', L.ups - 0.2, t); enter('ups', L.ups, t);
    cables.wan.forEach((c, i) => draw(c, (t - L.gw - 0.7 - i * 0.15) / 0.6));
    leds('gw', L.gw + 1.2, t);
    draw(cables.up[0], (t - L.fw - 1) / 0.7);
    draw(cables.up[1], (t - L.fw - 1.6) / 0.7);
    leds('fw', L.fw + 2.1, t);
    cables.patch.forEach((c, i) => draw(c, (t - L.sw - 1.6 - i * 0.08) / 0.5));
    leds('sw', L.sw + 2.5, t, 1.6 + Math.sin(clock * 9) * 0.15);
    leds('pp', 999, t);
    const ap0 = ease((t - L.ap) / 0.8);
    ap.visible = t > L.ap; ap.scale.setScalar(0.6 + 0.4 * ap0); ap.position.z = -0.452 + (1 - ap0) * 0.15;
    draw(cables.ap[0], (t - L.ap - 0.8) / 0.8);
    const ring = clamp((t - L.ap - 1.6) / 0.4);
    (apRing.material as THREE.MeshStandardMaterial).emissiveIntensity = ring * (1.3 + Math.sin(clock * 2.5) * 0.3);
    apLight.intensity = ring * 1.2;
    leds('ups', L.ups + 1, t);

    // camera: parte di tre quarti e si gira lentamente verso il frontale
    const p = clamp(t / (L.done + 1));
    smx += (mx - smx) * 0.06; smy += (my - smy) * 0.06;
    const az = THREE.MathUtils.degToRad(34 - 20 * p + smx * 8);
    const el = THREE.MathUtils.degToRad(10 - smy * 5);
    const rad = (camera.aspect < 1 ? 2.25 : 2.0) - 0.12 * p;
    camera.position.set(target.x + Math.sin(az) * Math.cos(el) * rad, target.y + Math.sin(el) * rad, target.z + Math.cos(az) * Math.cos(el) * rad);
    camera.lookAt(target);
    renderer.render(scene, camera);
  }

  function resize() {
    const r = host.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / Math.max(1, r.height);
    camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(host);

  let on = false, raf = 0, last = 0;
  const loop = (now: number) => { const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now; frame(dt); raf = requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !on) { on = true; last = 0; raf = requestAnimationFrame(loop); }
    else if (!e.isIntersecting && on) { on = false; cancelAnimationFrame(raf); }
  }).observe(host);
  frame(0);

  // ---------- Texture dei frontali (disegnate su canvas) ----------
  type Ctx = CanvasRenderingContext2D;
  type Draw = (c: Ctx, e: Ctx, w: number, h: number, ports: Record<string, [number, number][]>) => void;

  function panelTextures(units: number, style: 'light' | 'dark', drawFn: Draw) {
    const w = Math.round(W * PX), h = Math.round((units * U - 0.001) * PX);
    const mk = () => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
    const cm = mk(), ce = mk();
    const c = cm.getContext('2d')!, e = ce.getContext('2d')!;
    e.fillStyle = '#000'; e.fillRect(0, 0, w, h);
    // fondo del pannello, con bordo e luce sul filo superiore
    const g = c.createLinearGradient(0, 0, 0, h);
    if (style === 'light') { g.addColorStop(0, '#fbfcfd'); g.addColorStop(0.5, '#eef1f5'); g.addColorStop(1, '#dfe4ea'); }
    else { g.addColorStop(0, '#30363f'); g.addColorStop(1, '#1b1f25'); }
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    noise(c, w, h, style === 'light' ? 0.025 : 0.04);
    c.fillStyle = style === 'light' ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.12)'; c.fillRect(0, 0, w, 3);
    c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(0, h - 3, w, 3);
    // orecchie del rack con viti
    for (const x of [0, w - 64]) {
      c.fillStyle = style === 'light' ? 'rgba(0,0,0,.05)' : 'rgba(0,0,0,.25)'; c.fillRect(x, 0, 64, h);
      c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(x === 0 ? 63 : x, 0, 1.5, h);
      const ys = units === 1 ? [h / 2] : [h * 0.2, h * 0.8];
      for (const y of ys) screw(c, x + 32, y);
    }
    const ports: Record<string, [number, number][]> = {};
    drawFn(c, e, w, h, ports);
    const map = new THREE.CanvasTexture(cm), emissive = new THREE.CanvasTexture(ce);
    for (const t of [map, emissive]) { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = aniso; }
    return { map, emissive, ports };
  }

  function noise(c: Ctx, w: number, h: number, a: number) {
    const img = c.getImageData(0, 0, w, h), d = img.data;
    for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - 0.5) * 255 * a; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
    c.putImageData(img, 0, 0);
  }
  function screw(c: Ctx, x: number, y: number) {
    const g = c.createRadialGradient(x - 4, y - 4, 1, x, y, 13);
    g.addColorStop(0, '#f2f4f7'); g.addColorStop(1, '#8a929e');
    c.fillStyle = g; c.beginPath(); c.arc(x, y, 13, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(0,0,0,.45)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(x - 7, y); c.lineTo(x + 7, y); c.moveTo(x, y - 7); c.lineTo(x, y + 7); c.stroke();
  }
  function rr(c: Ctx, x: number, y: number, w: number, h: number, r: number) { c.beginPath(); c.roundRect(x, y, w, h, r); }
  // Porta RJ45 vista di fronte: incavo scuro, 8 contatti dorati, sede del gancio
  function rj45(c: Ctx, x: number, y: number, w = 58, h = 50) {
    rr(c, x - 3, y - 3, w + 6, h + 6, 6); c.fillStyle = 'rgba(0,0,0,.25)'; c.fill();
    rr(c, x, y, w, h, 5);
    const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#05070a'); g.addColorStop(1, '#1a1f27');
    c.fillStyle = g; c.fill();
    for (let i = 0; i < 8; i++) { c.fillStyle = '#c9a24a'; c.fillRect(x + 9 + i * ((w - 18) / 7.5), y + 7, 3, 12); }
    c.fillStyle = '#262c36'; c.fillRect(x + w * 0.32, y + h - 12, w * 0.36, 12);
  }
  function sfp(c: Ctx, x: number, y: number, w = 66, h = 34) {
    rr(c, x, y, w, h, 3); c.fillStyle = '#0a0d12'; c.fill();
    c.strokeStyle = '#9aa3ae'; c.lineWidth = 3; c.stroke();
    c.fillStyle = '#20262f'; c.fillRect(x + 8, y + 8, w - 16, h - 16);
  }
  function led(c: Ctx, e: Ctx, x: number, y: number, w: number, h: number, col: string) {
    rr(c, x, y, w, h, h / 2); c.fillStyle = '#aab6c4'; c.fill();
    rr(e, x, y, w, h, h / 2); e.fillStyle = col; e.fill();
  }
  function label(c: Ctx, t: string, x: number, y: number, size = 26, col = '#8b95a3') {
    c.font = `800 ${size}px Archivo, system-ui, sans-serif`; c.fillStyle = col; c.textBaseline = 'middle';
    c.letterSpacing = '4px'; c.fillText(t, x, y);
  }
  function screen(c: Ctx, e: Ctx, x: number, y: number, w: number, h: number, paint: (e: Ctx) => void) {
    rr(c, x - 4, y - 4, w + 8, h + 8, 12); c.fillStyle = '#0d1016'; c.fill();
    rr(c, x, y, w, h, 8);
    const g = c.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, '#141a24'); g.addColorStop(1, '#070a0f');
    c.fillStyle = g; c.fill();
    c.save(); c.globalAlpha = 0.18; c.fillStyle = '#fff'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + w * 0.5, y); c.lineTo(x + w * 0.2, y + h); c.lineTo(x, y + h); c.fill(); c.restore();
    e.save(); e.beginPath(); e.roundRect(x, y, w, h, 8); e.clip(); paint(e); e.restore();
  }

  function drawGateway(c: Ctx, e: Ctx, w: number, h: number, ports: Record<string, [number, number][]>) {
    screen(c, e, 110, 30, 230, h - 60, (e) => {
      e.strokeStyle = '#3fa2ff'; e.lineWidth = 7; e.beginPath(); e.arc(160, h / 2, 26, 0, Math.PI * 2); e.stroke();
      label(e, 'ONLINE', 205, h / 2 - 14, 22, '#e8f2ff'); label(e, 'WAN · BACKUP', 205, h / 2 + 18, 15, '#7fb8ff');
    });
    label(c, 'GATEWAY', 380, h / 2);
    ports.lan = []; ports.wan = [];
    for (let i = 0; i < 8; i++) { const x = 880 + i * 70 + (i >= 4 ? 18 : 0); rj45(c, x, 34, 56, 48); led(c, e, x + 4, 92, 18, 8, '#3fa2ff'); led(c, e, x + 34, 92, 18, 8, '#22c55e'); ports.lan.push([x + 28, 58]); }
    for (let i = 0; i < 2; i++) { const x = 1510 + i * 82; rj45(c, x, 34, 56, 48); led(c, e, x + 4, 92, 48, 8, i === 0 ? '#2cc4e8' : '#22c55e'); ports.wan.push([x + 28, 58]); }
    sfp(c, 1690, 40);
  }
  function drawFirewall(c: Ctx, e: Ctx, w: number, h: number, ports: Record<string, [number, number][]>) {
    screen(c, e, 110, 34, 300, h - 68, (e) => {
      label(e, 'PROTEZIONE ATTIVA', 128, h / 2 - 12, 18, '#e8f2ff');
      for (let i = 0; i < 14; i++) { e.fillStyle = i < 11 ? '#3fa2ff' : '#1d3f73'; e.fillRect(128 + i * 19, h / 2 + 10, 13, 12); }
    });
    label(c, 'FIREWALL', 450, h / 2);
    led(c, e, 640, h / 2 - 6, 12, 12, '#22c55e');
    ports.lan = [];
    for (let i = 0; i < 8; i++) { const x = 1000 + i * 78; rj45(c, x, 34, 58, 50); led(c, e, x + 6, 96, 46, 7, '#3fa2ff'); ports.lan.push([x + 29, 59]); }
  }
  function drawPatch(c: Ctx, e: Ctx, w: number, h: number, ports: Record<string, [number, number][]>) {
    ports.p = [];
    for (let i = 0; i < 24; i++) {
      const x = 150 + i * 63 + Math.floor(i / 6) * 18;
      c.fillStyle = '#e9edf2'; c.font = '600 18px Archivo, system-ui'; c.textAlign = 'center'; c.fillText(String(i + 1), x + 24, 30); c.textAlign = 'left';
      rr(c, x - 4, 50, 56, 66, 4); c.fillStyle = '#f2f4f7'; c.fill();
      rj45(c, x, 56, 48, 46);
      c.fillStyle = '#ffffff'; c.fillRect(x - 2, 126, 52, 20); c.fillStyle = '#9aa3ae'; c.fillRect(x + 6, 134, 36, 3);
      ports.p.push([x + 24, 79]);
    }
  }
  function drawBrush(c: Ctx, e: Ctx, w: number, h: number) {
    rr(c, 110, h / 2 - 24, w - 220, 48, 24); c.fillStyle = '#05070a'; c.fill();
    c.strokeStyle = 'rgba(40,46,55,.9)'; c.lineWidth = 2;
    for (let x = 120; x < w - 120; x += 5) { c.beginPath(); c.moveTo(x, h / 2 - 22); c.lineTo(x + (Math.random() - 0.5) * 6, h / 2 - 2); c.moveTo(x, h / 2 + 22); c.lineTo(x + (Math.random() - 0.5) * 6, h / 2 + 2); c.stroke(); }
  }
  function drawSwitch(c: Ctx, e: Ctx, w: number, h: number, ports: Record<string, [number, number][]>) {
    screen(c, e, 100, 28, 200, h - 56, (e) => {
      label(e, '24 PoE', 118, h / 2 - 16, 22, '#e8f2ff');
      e.fillStyle = '#3fa2ff'; e.fillRect(118, h / 2 + 8, 150, 8); e.fillStyle = '#1d3f73'; e.fillRect(118, h / 2 + 24, 150, 8); e.fillStyle = '#22c55e'; e.fillRect(118, h / 2 + 24, 96, 8);
    });
    label(c, 'SWITCH', 330, h / 2, 22);
    ports.p = []; ports.sfp = [];
    const pts: [number, number][] = [];
    for (let i = 0; i < 12; i++) {
      const x = 520 + i * 74 + Math.floor(i / 6) * 30;
      for (const row of [0, 1]) {
        const y = row === 0 ? 22 : 92;
        rj45(c, x, y, 60, 54);
        led(c, e, x + 4, y + (row === 0 ? -9 : 58), 22, 6, '#22c55e'); led(c, e, x + 34, y + (row === 0 ? -9 : 58), 22, 6, '#3fa2ff');
        pts[i * 2 + row] = [x + 30, y + 27];
      }
    }
    ports.p = pts;
    for (let i = 0; i < 2; i++) { sfp(c, 1470 + i * 86, 30); sfp(c, 1470 + i * 86, 100); }
    ports.sfp.push([1503, 47]);
  }
  function drawBlank(c: Ctx, e: Ctx, w: number, h: number) {
    for (let y = 40; y < h - 30; y += 26) for (let x = 120 + ((y / 26) % 2) * 13; x < w - 120; x += 26) { c.fillStyle = '#c4ccd6'; c.beginPath(); c.arc(x, y, 7, 0, Math.PI * 2); c.fill(); }
  }
  function drawUps(c: Ctx, e: Ctx, w: number, h: number) {
    screen(c, e, 130, 70, 320, 200, (e) => {
      label(e, 'ONLINE', 160, 120, 40, '#4ade80');
      e.strokeStyle = '#4ade80'; e.lineWidth = 5; e.strokeRect(160, 170, 110, 50); e.fillStyle = '#4ade80'; e.fillRect(272, 185, 10, 20);
      for (let i = 0; i < 4; i++) e.fillRect(168 + i * 25, 178, 19, 34);
      label(e, 'RETE · BATTERIA', 300, 196, 16, '#9be7b5');
    });
    label(c, 'UPS', 500, 120, 34);
    c.beginPath(); c.arc(560, 230, 30, 0, Math.PI * 2); c.fillStyle = '#e2e7ed'; c.fill(); c.strokeStyle = '#b8c1cc'; c.lineWidth = 3; c.stroke();
    e.strokeStyle = '#4ade80'; e.lineWidth = 5; e.beginPath(); e.arc(560, 230, 30, 0, Math.PI * 2); e.stroke();
    for (let r = 0; r < 7; r++) for (let k = 0; k < 9; k++) { rr(c, 820 + k * 100, 60 + r * 36, 80, 14, 7); c.fillStyle = '#c4ccd6'; c.fill(); }
  }
  function ventTexture() {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512;
    const c = cv.getContext('2d')!;
    c.fillStyle = '#20252c'; c.fillRect(0, 0, 512, 512);
    noise(c, 512, 512, 0.04);
    for (let r = 0; r < 4; r++) for (let k = 0; k < 7; k++) { rr(c, 70 + k * 55, 40 + r * 22, 40, 9, 4.5); c.fillStyle = '#0a0c0f'; c.fill(); }
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  function holesTexture(hm: number) {
    const cv = document.createElement('canvas'); cv.width = 64; cv.height = Math.round(hm * 2000);
    const c = cv.getContext('2d')!;
    c.fillStyle = '#23282f'; c.fillRect(0, 0, 64, cv.height);
    const u = U * 2000;
    for (let i = 0; i < 9; i++) for (const k of [0.25, 0.5, 0.75]) { c.fillStyle = '#07090c'; c.fillRect(20, i * u + k * u - 9, 22, 18); }
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
}
