import { useEffect, useRef, useState } from "react";
import type { Locale } from "../i18n";
import { featureCopy, snakeUrl } from "./copy";
import {
  canTurn,
  step,
  vectors,
  type Cell,
  type Direction,
} from "./snake-engine";
import { SnakeArt } from "./SnakeArt";
import { advancePieces, type LoosePiece } from "./snake-physics";
const size = 20;
type Bite = { ranges: Range[]; elements: Set<HTMLElement | SVGElement> };
function readContent() {
  const food = new Map<string, Bite>();
  const add = (
    rect: DOMRect,
    range?: Range,
    element?: HTMLElement | SVGElement,
  ) => {
    const top = rect.top + window.scrollY;
    for (
      let y = Math.floor(top / size);
      y <= Math.floor((top + rect.height - 1) / size);
      y++
    ) {
      for (
        let x = Math.max(0, Math.floor(rect.left / size));
        x <=
        Math.min(
          Math.floor(innerWidth / size) - 1,
          Math.floor((rect.right - 1) / size),
        );
        x++
      ) {
        const key = `${x}:${y}`;
        const bite = food.get(key) ?? {
          ranges: [],
          elements: new Set<HTMLElement | SVGElement>(),
        };
        if (range) bite.ranges.push(range);
        if (element) bite.elements.add(element);
        food.set(key, bite);
      }
    }
  };
  const root = document.getElementById("root")!;
  const skip =
    'dialog,script,style,.studio-tools,[aria-hidden="true"],[hidden]';
  root
    .querySelectorAll<HTMLElement | SVGElement>(
      "button,a,img,svg,hr,.tags span",
    )
    .forEach((element) => {
      if (element.closest(skip) || element.matches(".snake-invitation")) return;
      const rect = element.getBoundingClientRect();
      if (
        rect.width &&
        rect.height &&
        getComputedStyle(element).visibility !== "hidden"
      )
        add(rect, undefined, element);
    });
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest(skip + ",a,.tags span")) continue;
    if (node.parentElement?.closest("button:not(.snake-invitation)")) continue;
    if (
      node.parentElement &&
      getComputedStyle(node.parentElement).visibility === "hidden"
    )
      continue;
    for (let i = 0; i < (node.textContent?.length ?? 0); i++) {
      if (!node.textContent![i].trim()) continue;
      const range = document.createRange();
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rect = range.getBoundingClientRect();
      if (rect.width && rect.height) add(rect, range);
    }
  }
  return food;
}
export function Snake({
  language,
  close,
  origin,
}: {
  language: Locale;
  close: () => void;
  origin?: { x: number; y: number };
}) {
  const t = featureCopy[language];
  const art = useRef<SVGSVGElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const control = useRef<{
    turn: (direction: Direction) => void;
    pause: () => void;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState<"" | "over" | "won" | "unavailable">("");
  const [round, setRound] = useState(0);
  useEffect(() => {
    const surface = canvas.current;
    const context = surface?.getContext("2d");
    if (
      !surface ||
      !context ||
      typeof Highlight === "undefined" ||
      !CSS.highlights
    ) {
      setEnded("unavailable");
      return;
    }
    const originalScroll = window.scrollY;
    const columns = Math.floor(innerWidth / size),
      rows = Math.ceil(document.documentElement.scrollHeight / size);
    const food = readContent();
    const eaten = new Highlight();
    const hidden = new Map<HTMLElement | SVGElement, string>();
    const consumed = new Set<Range>();
    const wasPlaying =
      document.documentElement.hasAttribute("data-snake-playing");
    document.documentElement.setAttribute("data-snake-playing", "true");
    CSS.highlights.set("snake-eaten", eaten);
    const ratio = Math.min(devicePixelRatio, 2);
    surface.width = innerWidth * ratio;
    surface.height = innerHeight * ratio;
    context.scale(ratio, ratio);
    const start =
      origin &&
      origin.y >= originalScroll &&
      origin.y < originalScroll + innerHeight
        ? origin
        : { x: innerWidth / 2, y: originalScroll + innerHeight * 0.4 };
    let body: Cell[] = Array.from({ length: 4 }, (_, i) => ({
      x: (Math.floor(start.x / size) - i + columns) % columns,
      y: Math.floor(start.y / size),
    }));
    let previous = body.map((cell) => ({ ...cell }));
    let direction: Direction = "right",
      next: Direction = "right",
      turned = false,
      stopped = false,
      finished = false,
      count = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    let lastStep = started + (reduced ? 0 : 650),
      frame = 0;
    let cameraTarget = originalScroll;
    let pointer: Cell | null = null;
    const pieces: LoosePiece[] = [];
    let lastFrame = started;
    const loosen = (cell: Cell) => {
      if (reduced || pieces.length >= 42) return;
      for (const dx of [-2, -1, 0, 1, 2]) {
        const nearby = food.get(`${cell.x + dx}:${cell.y - 1}`);
        for (const range of nearby?.ranges ?? []) {
          if (consumed.has(range) || pieces.length >= 42) continue;
          const rect = range.getBoundingClientRect();
          const style = getComputedStyle(range.startContainer.parentElement!);
          pieces.push({
            x: rect.left,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height,
            vx: dx * 18,
            vy: -30,
            text: range.toString(),
            font: `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
            color: style.color,
          });
          consumed.add(range);
          eaten.add(range);
        }
        for (const element of nearby?.elements ?? []) {
          if (
            hidden.has(element) ||
            pieces.length >= 42 ||
            !element.matches("button,a")
          )
            continue;
          const rect = element.getBoundingClientRect();
          if (rect.width > 300) continue;
          const style = getComputedStyle(element);
          pieces.push({
            x: rect.left,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height,
            vx: dx * 12,
            vy: -20,
            text: element.textContent?.trim() ?? "",
            font: `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
            color: style.color,
            background: style.backgroundColor,
          });
          hidden.set(element, element.style.visibility);
          element.style.visibility = "hidden";
        }
      }
    };
    const support = (piece: LoosePiece) => {
      const x = Math.floor((piece.x + piece.width / 2) / size);
      const base = Math.ceil((piece.y + piece.height) / size);
      for (let y = base; y < Math.min(rows, base + 20); y++) {
        const tile = food.get(`${x}:${y}`);
        if (
          tile?.ranges.some((range) => !consumed.has(range)) ||
          [...(tile?.elements ?? [])].some((element) => !hidden.has(element))
        )
          return y * size;
      }
      return Math.min(rows * size - 20, (base + 20) * size);
    };
    const particles: { x: number; y: number; born: number }[] = [];
    const toggle = () => {
      if (!finished) {
        stopped = !stopped;
        setPaused(stopped);
        lastStep = performance.now();
      }
    };
    const turn = (value: Direction) => {
      pointer = null;
      if (!turned && canTurn(direction, value)) {
        next = value;
        turned = true;
      }
    };
    control.current = { turn, pause: toggle };
    const key = (event: KeyboardEvent) => {
      const keys: Record<string, Direction> = {
        ArrowUp: "up",
        w: "up",
        ArrowDown: "down",
        s: "down",
        ArrowLeft: "left",
        a: "left",
        ArrowRight: "right",
        d: "right",
      };
      const value = keys[event.key];
      if (value) {
        event.preventDefault();
        turn(value);
      } else if (
        event.code === "Space" &&
        !(event.target as HTMLElement).closest("button")
      ) {
        event.preventDefault();
        toggle();
      }
    };
    const guide = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest(".snake-hud")) return;
      pointer = {
        x: Math.floor(event.clientX / size),
        y: Math.floor((event.clientY + window.scrollY) / size),
      };
    };
    const hide = () => {
      if (document.hidden) {
        stopped = true;
        setPaused(true);
      }
    };
    const tick = (now: number) => {
      if (!stopped && !finished && now - lastStep >= 130) {
        lastStep = now;
        if (pointer) {
          const dx = pointer.x - body[0].x,
            dy = pointer.y - body[0].y;
          const choices: Direction[] =
            Math.abs(dx) > Math.abs(dy)
              ? [dx > 0 ? "right" : "left", dy > 0 ? "down" : "up"]
              : [dy > 0 ? "down" : "up", dx > 0 ? "right" : "left"];
          next = choices.find((value) => canTurn(direction, value)) ?? next;
          if (Math.abs(dx) + Math.abs(dy) < 1) pointer = null;
        }
        direction = next;
        turned = false;
        const vector = vectors[direction];
        const destination = {
          x: (body[0].x + vector.x + columns) % columns,
          y: (body[0].y + vector.y + rows) % rows,
        };
        const bite = food.get(`${destination.x}:${destination.y}`);
        const ranges =
          bite?.ranges.filter((range) => !consumed.has(range)) ?? [];
        const elements = [...(bite?.elements ?? [])].filter(
          (element) => !hidden.has(element),
        );
        const falling = pieces.filter(
          (piece) =>
            destination.x * size < piece.x + piece.width &&
            (destination.x + 1) * size > piece.x &&
            destination.y * size < piece.y + piece.height &&
            (destination.y + 1) * size > piece.y,
        );
        const eating =
          ranges.length > 0 || elements.length > 0 || falling.length > 0;
        const result = step(
          body,
          direction,
          eating ? destination : { x: -1, y: -1 },
          columns,
          rows,
        );
        if (result.collision) {
          finished = true;
          setEnded("over");
        } else {
          previous = body;
          body = result.body;
          if (eating) {
            ranges.forEach((range) => {
              consumed.add(range);
              eaten.add(range);
            });
            elements.forEach((element) => {
              hidden.set(element, element.style.visibility);
              element.style.visibility = "hidden";
            });
            falling.forEach((piece) => pieces.splice(pieces.indexOf(piece), 1));
            loosen(destination);
            count += ranges.length + elements.length + falling.length;
            setScore(count);
            particles.push({
              x: body[0].x * size + 10,
              y: body[0].y * size + 10,
              born: now,
            });
          }
          food.delete(`${destination.x}:${destination.y}`);
        }
      }
      const headY = body[0].y * size;
      const bottom =
        innerHeight -
        (document.querySelector<HTMLElement>(".snake-hud")?.offsetHeight ??
          180) -
        30;
      if (
        !stopped &&
        (headY - window.scrollY < 110 || headY - window.scrollY > bottom)
      ) {
        cameraTarget = Math.min(
          document.documentElement.scrollHeight - innerHeight,
          Math.max(0, headY - innerHeight * 0.4),
        );
      }
      if (!stopped && Math.abs(cameraTarget - window.scrollY) > 1) {
        window.scrollTo({
          top: reduced
            ? cameraTarget
            : window.scrollY + (cameraTarget - window.scrollY) * 0.14,
          behavior: "instant",
        });
      }
      context.clearRect(0, 0, innerWidth, innerHeight);
      const progress = Math.min(1, Math.max(0, (now - started) / 650));
      const blend =
        stopped || reduced
          ? 1
          : Math.min(1, Math.max(0, (now - lastStep) / 130));
      const points = body.map((cell, index) => {
        const from = previous[index] ?? previous[previous.length - 1];
        const continuous =
          Math.abs(cell.x - from.x) < 2 && Math.abs(cell.y - from.y) < 2;
        let x =
          (continuous ? from.x + (cell.x - from.x) * blend : cell.x) * size +
          10;
        let y =
          (continuous ? from.y + (cell.y - from.y) * blend : cell.y) * size +
          10;
        if (progress < 1 && !reduced) {
          x = start.x + (x - start.x) * progress;
          y = start.y + (y - start.y) * progress;
        }
        return { x, y: y - window.scrollY };
      });
      let path = "";
      points.forEach((point, index) => {
        const before = points[index - 1],
          after = points[index + 1];
        if (
          !before ||
          Math.hypot(point.x - before.x, point.y - before.y) > size * 2
        )
          path += `M${point.x},${point.y}`;
        else if (
          after &&
          Math.hypot(point.x - after.x, point.y - after.y) < size * 2
        )
          path += `Q${point.x},${point.y} ${(point.x + after.x) / 2},${(point.y + after.y) / 2}`;
        else path += `L${point.x},${point.y}`;
      });
      art.current
        ?.querySelectorAll("[data-snake-body]")
        .forEach((element) => element.setAttribute("d", path));
      const head = art.current?.querySelector("[data-snake-head]");
      head?.setAttribute("visibility", "visible");
      head?.setAttribute(
        "transform",
        `translate(${points[0].x} ${points[0].y}) rotate(${(Math.atan2(vectors[direction].y, vectors[direction].x) * 180) / Math.PI})`,
      );
      if (!stopped && !finished)
        advancePieces(pieces, (now - lastFrame) / 1000, innerWidth, support);
      lastFrame = now;
      surface.dataset.loosePieces = String(pieces.length);
      for (const piece of pieces) {
        context.font = piece.font;
        context.textBaseline = "middle";
        if (piece.background) {
          context.fillStyle = piece.background;
          context.beginPath();
          context.roundRect(
            piece.x,
            piece.y - window.scrollY,
            piece.width,
            piece.height,
            6,
          );
          context.fill();
        }
        context.fillStyle = piece.color;
        context.fillText(
          piece.text,
          piece.x + (piece.background ? 8 : 0),
          piece.y - window.scrollY + piece.height / 2,
          piece.width,
        );
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i],
          age = (now - p.born) / 400;
        if (age > 1) {
          particles.splice(i, 1);
          continue;
        }
        if (reduced) continue;
        context.globalAlpha = 1 - age;
        context.fillStyle = "#3c806b";
        for (let j = 0; j < 5; j++) {
          const angle = (j * Math.PI * 2) / 5;
          context.beginPath();
          context.arc(
            p.x + Math.cos(angle) * age * 22,
            p.y - window.scrollY + Math.sin(angle) * age * 22,
            2 * (1 - age),
            0,
            Math.PI * 2,
          );
          context.fill();
        }
        context.globalAlpha = 1;
      }
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", guide);
    window.addEventListener("resize", close);
    document.addEventListener("visibilitychange", hide);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", key);
      window.removeEventListener("pointerdown", guide);
      window.removeEventListener("resize", close);
      document.removeEventListener("visibilitychange", hide);
      CSS.highlights.delete("snake-eaten");
      hidden.forEach((visibility, element) => {
        element.style.visibility = visibility;
      });
      if (!wasPlaying)
        document.documentElement.removeAttribute("data-snake-playing");
      window.scrollTo({ top: originalScroll, behavior: "instant" });
      control.current = null;
    };
  }, [round, close, origin]);
  return (
    <>
      <canvas ref={canvas} className="snake-canvas" aria-hidden="true" />
      <SnakeArt surface={art} />
      <div className="snake-hud">
        <h2 id="tools-title" className="snake-title">
          {t.gameTitle}
        </h2>
        <p role="status">{ended ? t[ended] : `${t.score}: ${score}`}</p>
        <div className="tools-actions">
          <button
            onClick={() => control.current?.pause()}
            disabled={!!ended}
            aria-label={paused ? t.resume : t.pause}
            title={paused ? t.resume : t.pause}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {paused ? (
                <path d="m9 5 10 7-10 7Z" />
              ) : (
                <path d="M8 5v14M16 5v14" />
              )}
            </svg>
          </button>
          <button
            aria-label={t.restart}
            title={t.restart}
            onClick={() => {
              setScore(0);
              setPaused(false);
              setEnded("");
              setRound((value) => value + 1);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 10a8 8 0 1 1 2 8M4 4v6h6" />
            </svg>
          </button>
          <button
            onClick={close}
            aria-label={`${t.close} · Esc`}
            title={`${t.close} · Esc`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12M6 18 18 6" />
            </svg>
          </button>
        </div>
        <details className="snake-help">
          <summary aria-label={t.help} title={t.help}>
            ?
          </summary>
          <div className="snake-help-content">
            <p>{t.gameHelp}</p>
            <a href={snakeUrl} target="_blank" rel="noopener noreferrer">
              {t.original} ↗
            </a>
          </div>
        </details>
        <div className="snake-directions">
          {(["left", "up", "down", "right"] as const).map(
            (direction, index) => (
              <button
                key={direction}
                aria-label={t[direction]}
                onClick={() => control.current?.turn(direction)}
              >
                {["←", "↑", "↓", "→"][index]}
              </button>
            ),
          )}
        </div>
      </div>
    </>
  );
}
