import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
interface Props {
  motion: boolean;
  color: number;
  reset: number;
  fallback: string;
}
interface Controller {
  update: (motion: boolean, color: number) => void;
  reset: () => void;
}
const colors = ["#294fdc", "#a8472c", "#2b6f62"];
export default function Playground({ motion, color, reset, fallback }: Props) {
  const mount = useRef<HTMLDivElement>(null);
  const controller = useRef<Controller | null>(null);
  const options = useRef({ motion, color });
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    options.current = { motion, color };
    controller.current?.update(motion, color);
  }, [motion, color]);
  useEffect(() => {
    controller.current?.reset();
  }, [reset]);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.append(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(5.4, 3.0, 9.6);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = 0.6;
    controls.maxPolarAngle = 2.0;
    controls.target.set(0, 0.15, 0);
    controls.update();
    controls.saveState();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8b8ca3, 2));
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(-3, 5, 6);
    scene.add(light);
    const device = new THREE.Group();
    device.rotation.set(-0.05, -0.2, -0.12);
    scene.add(device);
    const shell = new THREE.MeshStandardMaterial({
      color: 0xe9e5d9,
      roughness: 0.42,
      metalness: 0.08,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x202b3d,
      roughness: 0.5,
    });
    const accent = new THREE.MeshStandardMaterial({
      color: colors[options.current.color],
      roughness: 0.33,
      metalness: 0.15,
    });
    function box(
      w: number,
      h: number,
      d: number,
      r: number,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) {
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), mat);
      mesh.position.set(x, y, z);
      device.add(mesh);
      return mesh;
    }
    box(3.05, 4.4, 0.58, 0.2, shell, 0, 0, 0);
    box(3.0, 4.32, 0.2, 0.15, accent, 0, 0, -0.27);
    box(2.66, 2.3, 0.12, 0.18, dark, 0, 0.72, 0.32);
    const screen = document.createElement("canvas");
    screen.width = 640;
    screen.height = 440;
    const ctx = screen.getContext("2d")!;
    const screenTexture = new THREE.CanvasTexture(screen);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    function drawScreen(index: number) {
      ctx.fillStyle = colors[index];
      ctx.fillRect(0, 0, 640, 440);
      ctx.strokeStyle = "#ffffff18";
      ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 440);
        ctx.stroke();
      }
      for (let y = 0; y < 440; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(640, y);
        ctx.stroke();
      }
      ctx.fillStyle = "#eef1ff";
      ctx.font = "bold 160px monospace";
      ctx.textAlign = "center";
      ctx.fillText("R/R", 320, 248);
      ctx.font = "20px monospace";
      ctx.fillText("HELLO, WORLD.", 320, 320);
      ctx.font = "15px monospace";
      ctx.textAlign = "left";
      ctx.fillText("POCKET STUDIO", 30, 35);
      ctx.textAlign = "right";
      ctx.fillText("01", 606, 35);
      screenTexture.needsUpdate = true;
    }
    drawScreen(options.current.color);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
    });
    box(2.32, 1.72, 0.02, 0.035, screenMat, 0, 0.78, 0.398);
    box(0.85, 0.27, 0.16, 0.035, dark, -0.78, -0.93, 0.38);
    box(0.27, 0.85, 0.16, 0.035, dark, -0.78, -0.93, 0.39);
    function button(x: number, y: number) {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.16, 32),
        accent,
      );
      mesh.rotation.x = Math.PI / 2;
      mesh.position.set(x, y, 0.39);
      device.add(mesh);
    }
    button(0.67, -1.0);
    button(1.05, -0.65);
    box(0.37, 0.1, 0.08, 0.04, dark, -0.2, -1.65, 0.32);
    box(0.37, 0.1, 0.08, 0.04, dark, 0.32, -1.65, 0.32);
    for (let i = 0; i < 4; i++)
      box(0.06, 0.34, 0.02, 0.025, dark, 0.77 + i * 0.13, -1.65, 0.307);
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 12, 8),
      new THREE.MeshBasicMaterial({ color: 0x8ce5bd }),
    );
    led.position.set(-1.16, 1.67, 0.395);
    device.add(led);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowContext = shadowCanvas.getContext("2d")!;
    const gradient = shadowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(30,36,65,.28)");
    gradient.addColorStop(1, "rgba(30,36,65,0)");
    shadowContext.fillStyle = gradient;
    shadowContext.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 4),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -2.42;
    scene.add(shadow);
    let frame = 0,
      active = true,
      enabled = options.current.motion,
      disposed = false,
      previous = performance.now(),
      elapsed = 0;
    function render() {
      if (!disposed) renderer.render(scene, camera);
    }
    function tick(now: number) {
      frame = 0;
      if (disposed || !enabled || !active || document.hidden) return;
      elapsed += Math.min((now - previous) / 1000, 0.05);
      previous = now;
      device.position.y = Math.sin(elapsed * 0.75) * 0.075;
      device.rotation.z = -0.12 + Math.sin(elapsed * 0.4) * 0.025;
      render();
      frame = requestAnimationFrame(tick);
    }
    function start() {
      if (enabled && active && !document.hidden && !frame && !disposed) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      } else render();
    }
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    const visibility = () => {
      stop();
      start();
    };
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      stop();
      if (active) start();
    });
    observer.observe(host);
    const resize = new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      render();
    });
    resize.observe(host);
    controls.addEventListener("change", render);
    const lost = (event: Event) => {
      event.preventDefault();
      stop();
      setFailed(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    controller.current = {
      update: (motion, index) => {
        enabled = motion;
        accent.color.set(colors[index]);
        drawScreen(index);
        stop();
        start();
      },
      reset: () => {
        controls.reset();
        render();
      },
    };
    start();
    return () => {
      disposed = true;
      stop();
      controller.current = null;
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      controls.dispose();
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((m) => materials.add(m));
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      screenTexture.dispose();
      shadowTexture.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <>
      <div
        ref={mount}
        className="three-mount"
        aria-hidden="true"
        hidden={failed}
      />
      {failed && (
        <div className="three-fallback">
          <span aria-hidden="true">R/R</span>
          <p>{fallback}</p>
        </div>
      )}
    </>
  );
}
