import * as THREE from "three";
import { createCharacter } from "./model";
export function mountAvatar(container: HTMLElement, onFailure: () => void) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
  camera.position.set(0, 0.3, 6.9);
  camera.lookAt(0, 0.25, 0);
  scene.add(new THREE.HemisphereLight("#fff4e3", "#6b7895", 2.5));
  const key = new THREE.DirectionalLight("#fff0df", 3);
  key.position.set(-3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight("#d2e1ff", 2.4);
  rim.position.set(3, 2, -2);
  scene.add(rim);
  const { character, head, eyes, pupils, hat, hands } = createCharacter();
  scene.add(character);
  let running = false,
    visible = true,
    requestedMotion = false,
    disposed = false,
    frame = 0;
  let elapsed = 0,
    previous = 0,
    gazeX = 0,
    gazeY = 0,
    lean = 0;
  const target = new THREE.Vector2();
  const finePointer = matchMedia("(pointer: fine)");
  const ease = (a: number, b: number, t: number) => a + (b - a) * t;
  const smooth = (x: number) => {
    const t = THREE.MathUtils.clamp(x, 0, 1);
    return t * t * (3 - 2 * t);
  };
  function pose(dt: number) {
    const rect = container.getBoundingClientRect();
    const targetLean = requestedMotion
      ? smooth((innerHeight * 0.52 - rect.top) / 320)
      : 0;
    const damping = 1 - Math.exp(-7 * dt);
    lean = ease(lean, targetLean, damping);
    gazeX = ease(gazeX, requestedMotion ? target.x : 0, damping);
    gazeY = ease(gazeY, requestedMotion ? target.y : 0, damping);
    const breathe = requestedMotion ? Math.sin(elapsed * 1.7) * 0.009 : 0;
    head.rotation.y = gazeX * 0.2;
    head.rotation.x = -gazeY * 0.12 + lean * 0.14;
    head.rotation.z = requestedMotion ? Math.sin(elapsed * 0.6) * 0.012 : 0;
    character.position.y = breathe;
    const blinkTime = elapsed % 5.4;
    const blink =
      requestedMotion && blinkTime > 4.95
        ? 1 - Math.sin(((blinkTime - 4.95) / 0.45) * Math.PI) * 0.96
        : 1;
    eyes.forEach((eye) => (eye.scale.y = blink));
    pupils.forEach((pupil) => {
      pupil.position.x = gazeX * 0.045;
      pupil.position.y = gazeY * 0.027 - lean * 0.015;
    });
    // A long, eased cycle leaves natural rests between lifting and replacing the hat.
    const cycle = elapsed % 24;
    const lift = requestedMotion
      ? smooth((cycle - 7) / 2.8) * (1 - smooth((cycle - 15) / 3))
      : 0;
    hat.position.set(lift * 0.22, 0.95 + lift * 0.55, -0.05);
    hat.rotation.z = -lift * 0.18;
    hands[0].position.set(-0.78, -0.9 + lean * 0.43, 0.48 + lean * 0.12);
    hands[1].position.set(
      0.78 - lift * 0.12,
      -0.9 + lean * 0.43 + lift * 2.65,
      0.48 + lean * 0.12,
    );
    hands[1].rotation.z = lift * -0.3;
    container.dataset.state = !requestedMotion
      ? "still"
      : lift > 0.02
        ? "hat"
        : lean > 0.3
          ? "peek"
          : "idle";
  }
  function render(time: number) {
    if (!running || disposed) return;
    const dt = Math.min((time - previous) / 1000, 0.04);
    previous = time;
    elapsed += dt;
    pose(dt);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }
  function sync() {
    const next = requestedMotion && visible && !document.hidden;
    container.dataset.running = String(next);
    if (next && !running) {
      running = true;
      previous = performance.now();
      frame = requestAnimationFrame(render);
    }
    if (!next) {
      running = false;
      cancelAnimationFrame(frame);
      if (visible && !disposed) {
        pose(1);
        renderer.render(scene, camera);
      }
    }
  }
  const move = (event: PointerEvent) => {
    if (
      !visible ||
      !requestedMotion ||
      !finePointer.matches ||
      event.pointerType === "touch"
    )
      return;
    const rect = container.getBoundingClientRect();
    target.set(
      THREE.MathUtils.clamp(
        (event.clientX - rect.left - rect.width / 2) / 350,
        -1,
        1,
      ),
      THREE.MathUtils.clamp(
        -(event.clientY - rect.top - rect.height * 0.42) / 280,
        -1,
        1,
      ),
    );
  };
  const reset = () => target.set(0, 0);
  const lost = (event: Event) => {
    event.preventDefault();
    onFailure();
  };
  const resize = new ResizeObserver(() => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  });
  resize.observe(container);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(container);
  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("blur", reset);
  document.addEventListener("visibilitychange", sync);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  pose(1);
  renderer.render(scene, camera);
  return {
    setMotion(value: boolean) {
      requestedMotion = value;
      sync();
    },
    dispose() {
      disposed = true;
      running = false;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", sync);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material])
            materials.add(material);
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
