import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const layers = [
  { name: 'LTO Hub', role: 'Fleet management', detail: 'React / ASP.NET Core', glyph: 'grid', color: '#beecff' },
  { name: 'PrintAI', role: 'Asynchronous image generation', detail: 'Background jobs / Server-sent events', glyph: 'signal', color: '#90baff' },
  { name: 'HPX QAMA', role: 'Agentic test generation', detail: 'TestRail / GitHub', glyph: 'nodes', color: '#c2d5ff' },
  { name: 'PrintOS', role: 'Web automation', detail: 'Playwright / TypeScript', glyph: 'checks', color: '#cef3ff' },
];

function makeFace({ name, role, detail, glyph, color }) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  const wash = ctx.createLinearGradient(0, 0, 1024, 640);
  wash.addColorStop(0, '#10274d');
  wash.addColorStop(1, '#070e21');
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, 1024, 640);
  ctx.strokeStyle = '#91bcff32';
  ctx.lineWidth = 2;
  for (let x = 32; x < 1024; x += 48) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 640); ctx.stroke();
  }
  for (let y = 32; y < 640; y += 48) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.strokeRect(25, 25, 974, 590);
  ctx.fillStyle = color;
  ctx.font = '32px monospace';
  ctx.fillText(role, 62, 109);
  ctx.fillStyle = '#f6f8ff';
  ctx.font = 'bold 100px sans-serif';
  ctx.fillText(name, 58, 241);
  ctx.strokeStyle = color;
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (glyph === 'grid') {
    for (let i = 0; i < 8; i++) {
      const x = 66 + (i % 4) * 100;
      const y = 308 + Math.floor(i / 4) * 89;
      ctx.strokeRect(x, y, 68, 59);
    }
  } else if (glyph === 'signal') {
    ctx.beginPath(); ctx.moveTo(68, 417); ctx.lineTo(141, 417); ctx.lineTo(192, 350); ctx.lineTo(257, 460); ctx.lineTo(319, 315); ctx.lineTo(370, 409); ctx.lineTo(462, 409); ctx.stroke();
  } else if (glyph === 'nodes') {
    const points = [[88, 406], [215, 319], [215, 479], [354, 401], [442, 330]];
    for (const [from, to] of [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]]) {
      ctx.beginPath(); ctx.moveTo(...points[from]); ctx.lineTo(...points[to]); ctx.stroke();
    }
    for (const [x, y] of points) {
      ctx.fillStyle = '#0a152c'; ctx.beginPath(); ctx.arc(x, y, 21, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
  } else {
    for (let i = 0; i < 3; i++) {
      const y = 318 + i * 67;
      ctx.beginPath(); ctx.moveTo(69, y); ctx.lineTo(88, y + 19); ctx.lineTo(119, y - 14); ctx.moveTo(155, y + 3); ctx.lineTo(397 - i * 35, y + 3); ctx.stroke();
    }
  }
  ctx.fillStyle = '#e0edff';
  ctx.font = '29px monospace';
  ctx.fillText(detail, 62, 563);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createWorkScene(host, journey, motion, onReady) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch {
    return () => {};
  }
  host.append(renderer.domElement);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const reflections = pmrem.fromScene(environment, 0.075);
  scene.environment = reflections.texture;
  environment.dispose();
  pmrem.dispose();

  const stack = new THREE.Group();
  scene.add(stack);
  const boardGeometry = new RoundedBoxGeometry(3.7, 2.36, 0.16, 3, 0.07);
  const faceGeometry = new THREE.PlaneGeometry(3.57, 2.23);
  const boards = layers.map((layer) => {
    const group = new THREE.Group();
    const casing = new THREE.MeshPhysicalMaterial({ color: layer.color, metalness: 0.66, roughness: 0.26, clearcoat: 0.8 });
    const texture = makeFace(layer);
    const face = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
    const screen = new THREE.Mesh(faceGeometry, face);
    screen.position.z = 0.083;
    group.add(new THREE.Mesh(boardGeometry, casing), screen);
    stack.add(group);
    return { group, casing, face, texture };
  });
  const light = new THREE.PointLight('#bcdbff', 48);
  light.position.set(3, 4, 4);
  scene.add(light);

  const chapters = Array.from(journey.querySelectorAll('[data-chapter]'));
  const points = [];
  let target = 0;
  let progress = 0;
  let frame = 0;
  let visible = false;
  let contextLost = false;
  const clamp = THREE.MathUtils.clamp;

  function readScroll() {
    const anchor = window.scrollY + window.innerHeight * 0.54;
    const index = points.findIndex(point => point > anchor);
    target = index < 0 ? boards.length - 1 : index === 0 ? 0 :
      index - 1 + clamp((anchor - points[index - 1]) / Math.max(1, points[index] - points[index - 1]), 0, 1);
    schedule();
  }
  function measure() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.set(0, 0, camera.aspect < 1.08 ? 8.6 * 1.08 / camera.aspect : 8.6);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    points.splice(0, points.length, ...chapters.map(chapter => {
      const bounds = chapter.getBoundingClientRect();
      return window.scrollY + bounds.top + bounds.height * 0.36;
    }));
    readScroll();
    draw();
  }
  function draw() {
    if (contextLost) return;
    stack.rotation.set(-0.19 + Math.sin(progress * 1.9) * 0.13, -0.5 + Math.sin(progress * 1.25) * 0.37, 0.06 - progress * 0.035);
    for (const [index, { group }] of boards.entries()) {
      const difference = index - progress;
      const separation = Math.abs(difference);
      group.position.set(difference * 0.48, -difference * 0.48, -separation * 0.64);
      group.rotation.set(-difference * 0.1, difference * 0.1, difference * 0.04);
      group.scale.setScalar(1 - Math.min(separation, 3) * 0.065);
    }
    renderer.render(scene, camera);
    host.dataset.sceneProgress = progress.toFixed(2);
  }
  function tick() {
    frame = 0;
    if (!motion.current || !visible || contextLost) return;
    progress += (target - progress) * 0.105;
    if (Math.abs(target - progress) < 0.005) progress = target;
    draw();
    if (progress !== target) schedule();
  }
  function schedule() { if (!frame && visible && motion.current) frame = requestAnimationFrame(tick); }
  const resize = new ResizeObserver(measure);
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) readScroll(); });
  resize.observe(host);
  resize.observe(journey);
  intersection.observe(host);
  window.addEventListener('scroll', readScroll, { passive: true });
  const resume = () => requestAnimationFrame(readScroll);
  host.addEventListener('scene-resume', resume);
  const lost = (event) => { event.preventDefault(); contextLost = true; onReady(false); };
  const restored = () => { contextLost = false; measure(); onReady(true); };
  renderer.domElement.addEventListener('webglcontextlost', lost);
  renderer.domElement.addEventListener('webglcontextrestored', restored);
  measure();
  progress = target;
  draw();
  onReady(true);
  return () => {
    cancelAnimationFrame(frame);
    resize.disconnect();
    intersection.disconnect();
    host.removeEventListener('scene-resume', resume);
    window.removeEventListener('scroll', readScroll);
    renderer.domElement.removeEventListener('webglcontextlost', lost);
    renderer.domElement.removeEventListener('webglcontextrestored', restored);
    for (const board of boards) {
      board.casing.dispose();
      board.face.dispose();
      board.texture.dispose();
    }
    for (const asset of [boardGeometry, faceGeometry, reflections]) asset.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
