export type Point = { x: number; y: number };
type Pin = Point & {
  dx: number;
  dy: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  id: number | null;
};
const vertex = `
attribute vec2 position;
uniform vec4 pins[4];
varying vec2 uv;
void main() {
  uv = position;
  vec2 displacement = vec2(0.0);
  for (int i = 0; i < 4; i++) {
    vec2 delta = position - pins[i].xy;
    float weight = exp(-dot(delta, delta) / 0.027);
    displacement += pins[i].zw * weight;
  }
  vec2 edge = smoothstep(vec2(0.0), vec2(0.13), position) * smoothstep(vec2(0.0), vec2(0.13), 1.0-position);
  vec2 point = position + displacement * edge.x * edge.y;
  gl_Position = vec4(point.x * 2.0 - 1.0, 1.0 - point.y * 2.0, 0.0, 1.0);
}`;
const fragment = `
precision mediump float;
varying vec2 uv;
uniform sampler2D portrait;
void main() { gl_FragColor = texture2D(portrait, uv); }
`;

export function createElasticPortrait(
  canvas: HTMLCanvasElement,
  source: string,
  motion: boolean,
  ready: () => void,
  failed: () => void,
) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: true,
    depth: false,
    powerPreference: "low-power",
  });
  if (!gl) throw new Error("WebGL unavailable");
  const shaders: WebGLShader[] = [];
  const program = gl.createProgram()!;
  const buffer = gl.createBuffer()!;
  const texture = gl.createTexture()!;
  const pins: Pin[] = Array.from({ length: 4 }, () => ({
    x: 0.5,
    y: 0.5,
    dx: 0,
    dy: 0,
    tx: 0,
    ty: 0,
    vx: 0,
    vy: 0,
    id: null,
  }));
  const uniforms = new Float32Array(16);
  let frame = 0,
    last = 0,
    loaded = false,
    disposed = false;
  const releaseResources = () => {
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    shaders.forEach((shader) => gl.deleteShader(shader));
  };
  try {
    for (const [type, source] of [
      [gl.VERTEX_SHADER, vertex],
      [gl.FRAGMENT_SHADER, fragment],
    ] as const) {
      const shader = gl.createShader(type)!;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error("Portrait shader failed");
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error("Portrait program failed");
  } catch (error) {
    releaseResources();
    throw error;
  }
  const vertices: number[] = [];
  const divisions = 80;
  for (let y = 0; y < divisions; y++)
    for (let x = 0; x < divisions; x++) {
      for (const [dx, dy] of [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, 1],
        [1, 0],
        [1, 1],
      ])
        vertices.push((x + dx) / divisions, (y + dy) / divisions);
    }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const pinLocation = gl.getUniformLocation(program, "pins[0]");
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const draw = (now: number) => {
    frame = 0;
    if (disposed || !loaded || document.hidden) return;
    const dt = Math.min((now - last) / 1000 || 1 / 60, 1 / 30);
    last = now;
    let moving = false,
      stretch = 0;
    pins.forEach((pin, i) => {
      for (const [axis, target, velocity] of [
        ["dx", "tx", "vx"],
        ["dy", "ty", "vy"],
      ] as const) {
        if (!motion) {
          pin[axis] = pin[target];
          pin[velocity] = 0;
        } else {
          pin[velocity] +=
            ((pin[target] - pin[axis]) * 300 - pin[velocity] * 24) * dt;
          pin[axis] += pin[velocity] * dt;
        }
        if (
          Math.abs(pin[target] - pin[axis]) + Math.abs(pin[velocity]) >
          0.00008
        )
          moving = true;
        else {
          pin[axis] = pin[target];
          pin[velocity] = 0;
        }
      }
      uniforms.set([pin.x, pin.y, pin.dx, pin.dy], i * 4);
      stretch += Math.abs(pin.dx) + Math.abs(pin.dy);
    });
    gl.uniform4fv(pinLocation, uniforms);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
    canvas.dataset.deformed = String(stretch > 0.0005);
    if (moving) schedule();
  };
  const schedule = () => {
    if (!frame && !disposed && loaded && !document.hidden)
      frame = requestAnimationFrame(draw);
  };
  const resize = () => {
    const side = Math.max(
      1,
      Math.round(canvas.clientWidth * Math.min(devicePixelRatio, 2)),
    );
    canvas.width = side;
    canvas.height = side;
    gl.viewport(0, 0, side, side);
    schedule();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const image = new Image();
  image.onload = () => {
    if (disposed) return;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    loaded = true;
    resize();
    ready();
  };
  image.onerror = () => {
    if (!disposed) failed();
  };
  image.src = source;
  const reset = () => {
    pins.forEach((pin) => {
      pin.id = null;
      pin.tx = 0;
      pin.ty = 0;
    });
    schedule();
  };
  const visibility = () => {
    reset();
    cancelAnimationFrame(frame);
    frame = 0;
    if (!document.hidden) {
      last = performance.now();
      schedule();
    }
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    loaded = false;
    cancelAnimationFrame(frame);
    frame = 0;
    failed();
  };
  document.addEventListener("visibilitychange", visibility);
  canvas.addEventListener("webglcontextlost", contextLost);
  return {
    grip(id: number, point: Point) {
      const pin =
        pins.find(
          (pin) =>
            pin.id === null && Math.abs(pin.dx) + Math.abs(pin.dy) < 0.001,
        ) ?? pins.find((pin) => pin.id === null);
      if (!pin) return;
      Object.assign(pin, {
        ...point,
        id,
        dx: 0,
        dy: 0,
        tx: 0,
        ty: 0,
        vx: 0,
        vy: 0,
      });
    },
    move(id: number, point: Point) {
      const pin = pins.find((pin) => pin.id === id);
      if (!pin) return;
      const x = point.x - pin.x,
        y = point.y - pin.y,
        distance = Math.hypot(x, y);
      const limit = Math.min(1, 0.15 / (distance || 1));
      pin.tx = x * limit;
      pin.ty = y * limit;
      schedule();
    },
    release(id: number) {
      const pin = pins.find((pin) => pin.id === id);
      if (pin) {
        pin.id = null;
        pin.tx = 0;
        pin.ty = 0;
        schedule();
      }
    },
    reset,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", contextLost);
      image.onload = null;
      image.onerror = null;
      releaseResources();
    },
  };
}
export type ElasticPortrait = ReturnType<typeof createElasticPortrait>;
