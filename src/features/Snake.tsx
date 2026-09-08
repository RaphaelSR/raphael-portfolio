import { useEffect, useRef, useState } from "react";
import type { Locale } from "../i18n";
import { featureCopy, snakeUrl } from "./copy";
import {
  canTurn,
  sameCell,
  step,
  type Cell,
  type Direction,
} from "./snake-engine";
const size = 20;
type Letter = Cell & { range: Range };
function readLetters(columns: number, rows: number): Letter[] {
  const main = document.querySelector("main");
  if (!main) return [];
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  const letters = new Map<string, Letter>();
  let node: Node | null;
  while ((node = walker.nextNode()) && letters.size < 500) {
    if (
      node.parentElement?.closest(
        "button, script, style, [aria-hidden=true], dialog",
      )
    )
      continue;
    const text = node.textContent ?? "";
    for (let i = 0; i < text.length; i++) {
      if (!/[\p{L}\p{N}]/u.test(text[i])) continue;
      const range = document.createRange();
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rect = range.getBoundingClientRect();
      if (
        !rect.width ||
        rect.top < 100 ||
        rect.bottom > innerHeight - (innerWidth < 620 ? 280 : 190) ||
        rect.left < 0 ||
        rect.right > innerWidth
      )
        continue;
      const x = Math.floor((rect.left + rect.width / 2) / size),
        y = Math.floor((rect.top + rect.height / 2) / size);
      if (x >= columns || y >= rows) continue;
      letters.set(`${x}:${y}`, { x, y, range });
    }
  }
  return [...letters.values()];
}
export function Snake({
  language,
  close,
}: {
  language: Locale;
  close: () => void;
}) {
  const t = featureCopy[language];
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
    if (!surface || typeof Highlight === "undefined" || !CSS.highlights) {
      setEnded("unavailable");
      return;
    }
    const context = surface.getContext("2d");
    if (!context) {
      setEnded("unavailable");
      return;
    }
    const columns = Math.floor(innerWidth / size),
      rows = Math.floor(innerHeight / size);
    const letters = readLetters(columns, rows);
    if (!letters.length) {
      setEnded("unavailable");
      return;
    }
    const eaten = new Highlight();
    const target = new Highlight();
    CSS.highlights.set("snake-eaten", eaten);
    CSS.highlights.set("snake-target", target);
    surface.width = innerWidth * Math.min(devicePixelRatio, 2);
    surface.height = innerHeight * Math.min(devicePixelRatio, 2);
    context.scale(Math.min(devicePixelRatio, 2), Math.min(devicePixelRatio, 2));
    let body: Cell[] = [
      { x: Math.floor(columns / 2), y: Math.floor(rows / 2) },
      { x: Math.floor(columns / 2) - 1, y: Math.floor(rows / 2) },
    ];
    let direction: Direction = "right",
      next: Direction = "right",
      turned = false,
      stopped = false,
      finished = false,
      count = 0;
    const pickFood = () =>
      letters
        .filter((letter) => !body.some((cell) => sameCell(cell, letter)))
        .sort(
          (a, b) =>
            Math.abs(a.x - body[0].x) +
            Math.abs(a.y - body[0].y) -
            Math.abs(b.x - body[0].x) -
            Math.abs(b.y - body[0].y),
        )[0];
    let food = pickFood();
    const showFood = () => {
      target.clear();
      if (food) target.add(food.range);
    };
    const draw = () => {
      context.clearRect(0, 0, innerWidth, innerHeight);
      if (food) {
        context.strokeStyle = "#ae6718";
        context.lineWidth = 2;
        context.strokeRect(
          food.x * size + 1,
          food.y * size + 1,
          size - 2,
          size - 2,
        );
      }
      body.forEach((cell, index) => {
        context.fillStyle = index === 0 ? "#1c604d" : "#3c806b";
        context.beginPath();
        context.roundRect(
          cell.x * size + 2,
          cell.y * size + 2,
          size - 4,
          size - 4,
          5,
        );
        context.fill();
      });
      context.fillStyle = "#fff";
      context.fillRect(body[0].x * size + 6, body[0].y * size + 6, 3, 3);
      context.fillRect(body[0].x * size + 12, body[0].y * size + 6, 3, 3);
    };
    const toggle = () => {
      if (!finished) {
        stopped = !stopped;
        setPaused(stopped);
      }
    };
    const turn = (value: Direction) => {
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
    const hide = () => {
      if (document.hidden) {
        stopped = true;
        setPaused(true);
      }
    };
    window.addEventListener("keydown", key);
    window.addEventListener("resize", close);
    document.addEventListener("visibilitychange", hide);
    showFood();
    draw();
    const timer = setInterval(() => {
      if (stopped || finished || !food) return;
      direction = next;
      turned = false;
      const result = step(body, direction, food, columns, rows);
      if (result.collision) {
        finished = true;
        setEnded("over");
        return;
      }
      body = result.body;
      if (result.ate) {
        eaten.add(food.range);
        letters.splice(letters.indexOf(food), 1);
        count++;
        setScore(count);
        food = pickFood();
        showFood();
        if (!food) {
          finished = true;
          setEnded("won");
        }
      }
      draw();
    }, 150);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", close);
      document.removeEventListener("visibilitychange", hide);
      CSS.highlights.delete("snake-eaten");
      CSS.highlights.delete("snake-target");
      control.current = null;
    };
  }, [round, close]);
  return (
    <>
      <canvas ref={canvas} className="snake-canvas" aria-hidden="true" />
      <div className="snake-hud">
        <div>
          <h2 id="tools-title">{t.gameTitle}</h2>
          <p>{t.gameHelp}</p>
        </div>
        <p role="status">{ended ? t[ended] : `${t.score}: ${score}`}</p>
        <div className="tools-actions">
          <button onClick={() => control.current?.pause()} disabled={!!ended}>
            {paused ? t.resume : t.pause}
          </button>
          <button
            onClick={() => {
              setScore(0);
              setPaused(false);
              setEnded("");
              setRound((value) => value + 1);
            }}
          >
            {t.restart}
          </button>
          <button onClick={close}>{t.close} · Esc</button>
          <a href={snakeUrl} target="_blank" rel="noopener noreferrer">
            {t.original} ↗
          </a>
        </div>
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
