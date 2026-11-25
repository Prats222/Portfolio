import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function createScene(host, running, reducedMotion, onReady) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const reflections = pmrem.fromScene(environment, 0.043);
  scene.environment = reflections.texture;
  scene.environmentIntensity = 1.06;
  environment.dispose();
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 45);
  camera.position.set(0, 0, 8.15);
  const sculpture = new THREE.Group();
  const knot = new THREE.TorusKnotGeometry(1.1, 0.32, 224, 32, 2, 3);
  const vertices = knot.getAttribute('position');
  const colors = new Float32Array(vertices.count * 3);
  const violet = new THREE.Color('#8659e9');
  const lilac = new THREE.Color('#d5b3ff');
  const blue = new THREE.Color('#75cefc');
  const mixed = new THREE.Color();
  for (let i = 0; i < vertices.count; i++) {
    const band = (Math.sin(vertices.getY(i) * 2.3 + vertices.getX(i) * 1.6) + 1) * 0.5;
    mixed.copy(violet).lerp(lilac, band).lerp(blue, THREE.MathUtils.smoothstep(vertices.getZ(i), 0.2, 1.5) * 0.68);
    mixed.toArray(colors, i * 3);
  }
  knot.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const metal = new THREE.MeshPhysicalMaterial({
    vertexColors: true, metalness: 0.76, roughness: 0.19, clearcoat: 1, clearcoatRoughness: 0.13,
    iridescence: 0.44, iridescenceIOR: 1.25, iridescenceThicknessRange: [170, 340],
  });
  sculpture.add(new THREE.Mesh(knot, metal));
  scene.add(sculpture);
  const light = new THREE.PointLight('#d8bcff', 72);
  light.position.set(3, 4, 4);
  const rim = new THREE.PointLight('#93d3ff', 45);
  rim.position.set(-4, -2, 1);
  scene.add(light, rim);

  const orbit = new THREE.Group();
  const ring = new THREE.TorusGeometry(2.28, 0.0045, 6, 110);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: '#b998f7', transparent: true, opacity: 0.39 });
  for (const [x, z] of [[0.55, 0.65], [1.05, -0.6]]) {
    const path = new THREE.Mesh(ring, ringMaterial);
    path.rotation.set(x, 0, z);
    orbit.add(path);
  }
  const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 12), new THREE.MeshBasicMaterial({ color: '#c3f2ff' }));
  orbit.add(satellite);
  scene.add(orbit);

  const dust = new THREE.BufferGeometry();
  const starPositions = new Float32Array(115 * 3);
  for (let i = 0; i < starPositions.length; i += 3) {
    const angle = (i / 3) * 2.39996;
    const radius = 1.7 + (i % 41) / 32;
    starPositions[i] = Math.cos(angle) * radius;
    starPositions[i + 1] = Math.sin(angle) * radius;
    starPositions[i + 2] = ((i % 19) - 9) / 16;
  }
  dust.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: '#b398ef', size: 0.022, transparent: true, opacity: 0.7 });
  const stars = new THREE.Points(dust, starMaterial);
  scene.add(stars);

  let frame = 0;
  let elapsed = 0;
  let previous = 0;
  let visible = true;
  const pointer = new THREE.Vector2();
  const tilt = new THREE.Vector2();
  function draw() {
    sculpture.rotation.set(0.37 + tilt.y + Math.sin(elapsed * 0.42) * 0.18, -0.42 + elapsed * 0.28 + tilt.x, -0.22 + Math.cos(elapsed * 0.37) * 0.13);
    orbit.rotation.z = elapsed * 0.12;
    const angle = elapsed * 0.65 + 0.6;
    satellite.position.set(Math.cos(angle) * 2.06, Math.sin(angle) * 1.32, Math.sin(angle) * 0.85);
    stars.rotation.z = -elapsed * 0.025;
    renderer.render(scene, camera);
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 0.91 ? 8.15 * 0.91 / camera.aspect : 8.15;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    draw();
  }
  function tick(now) {
    const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    if (running.current && !reducedMotion.matches && visible && !document.hidden) {
      elapsed += dt;
      tilt.lerp(pointer, 0.045);
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  const watchSize = new ResizeObserver(resize);
  const watchVisibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  watchSize.observe(host);
  watchVisibility.observe(host);
  const interaction = host.parentElement;
  function aim(event) {
    if (event.pointerType === 'touch') return;
    const { left, top, width, height } = host.getBoundingClientRect();
    pointer.set(((event.clientX - left) / width - 0.5) * 0.65, ((event.clientY - top) / height - 0.5) * 0.52);
  }
  function resetAim() { pointer.set(0, 0); }
  function lost(event) { event.preventDefault(); onReady(false); }
  function restored() { resize(); onReady(true); }
  interaction.addEventListener('pointermove', aim);
  interaction.addEventListener('pointerleave', resetAim);
  renderer.domElement.addEventListener('webglcontextlost', lost);
  renderer.domElement.addEventListener('webglcontextrestored', restored);
  resize();
  frame = requestAnimationFrame(tick);
  onReady(true);
  return () => {
    cancelAnimationFrame(frame);
    watchSize.disconnect();
    watchVisibility.disconnect();
    interaction.removeEventListener('pointermove', aim);
    interaction.removeEventListener('pointerleave', resetAim);
    renderer.domElement.removeEventListener('webglcontextlost', lost);
    renderer.domElement.removeEventListener('webglcontextrestored', restored);
    for (const asset of [knot, metal, ring, ringMaterial, satellite.geometry, satellite.material, dust, starMaterial, reflections]) asset.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
