import { createPortal } from "react-dom";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
  type PointerEvent,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
import type { Locale } from "../../i18n";
import {
  createElasticPortrait,
  type ElasticPortrait,
  type Point,
} from "./elastic-portrait";
import handOpen from "./hand-open.svg?url";
import handGrab from "./hand-grab.svg?url";
import "./portrait-dialog.css";
const copy = {
  pt: {
    title: "Um pouco de elasticidade.",
    hint: "Puxe uma parte do rosto. Solte e deixe voltar.",
    keys: "No teclado, escolha uma região e use as setas sobre a imagem.",
    close: "Fechar retrato",
    reset: "Restaurar",
    loading: "Preparando o retrato…",
    fallback:
      "Retrato ampliado. A interação gráfica não está disponível neste navegador.",
    face: "Rosto interativo de Raphael Rocha",
    parts: [
      "Bochecha esquerda",
      "Nariz",
      "Bochecha direita",
      "Testa",
      "Queixo",
    ],
  },
  en: {
    title: "A little elasticity.",
    hint: "Pull a part of the face. Let go and watch it settle.",
    keys: "With a keyboard, choose a region and use the arrow keys on the image.",
    close: "Close portrait",
    reset: "Reset",
    loading: "Preparing the portrait…",
    fallback:
      "Expanded portrait. The graphics interaction is unavailable in this browser.",
    face: "Interactive portrait of Raphael Rocha",
    parts: ["Left cheek", "Nose", "Right cheek", "Forehead", "Chin"],
  },
  es: {
    title: "Un poco de elasticidad.",
    hint: "Estira una parte del rostro. Suelta y deja que vuelva.",
    keys: "Con el teclado, elige una región y usa las flechas sobre la imagen.",
    close: "Cerrar retrato",
    reset: "Restaurar",
    loading: "Preparando el retrato…",
    fallback:
      "Retrato ampliado. La interacción gráfica no está disponible en este navegador.",
    face: "Retrato interactivo de Raphael Rocha",
    parts: [
      "Mejilla izquierda",
      "Nariz",
      "Mejilla derecha",
      "Frente",
      "Mentón",
    ],
  },
};
const points: Point[] = [
  { x: 0.32, y: 0.58 },
  { x: 0.51, y: 0.54 },
  { x: 0.7, y: 0.56 },
  { x: 0.52, y: 0.31 },
  { x: 0.51, y: 0.78 },
];
export default function PortraitDialog({
  language,
  motion,
  trigger,
  close,
}: {
  language: Locale;
  motion: boolean;
  trigger: RefObject<HTMLButtonElement | null>;
  close: () => void;
}) {
  const t = copy[language],
    id = useId();
  const modal = useRef<HTMLDialogElement>(null),
    surface = useRef<HTMLCanvasElement>(null),
    stage = useRef<HTMLDivElement>(null);
  const renderer = useRef<ElasticPortrait | null>(null);
  const keyboard = useRef<Point | null>(null);
  const pointers = useRef(new Set<number>());
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );
  const [selected, setSelected] = useState(1);
  const source = `${import.meta.env.BASE_URL}raphael-avatar-full.png`;
  useEffect(() => {
    const dialog = modal.current!;
    const before = document.body.style.overflow;
    const origin = trigger.current?.getBoundingClientRect();
    dialog.showModal();
    document.body.style.overflow = "hidden";
    let animation: Animation | undefined;
    if (motion && origin && stage.current) {
      const target = stage.current.getBoundingClientRect();
      animation = stage.current.animate(
        [
          {
            transform: `translate(${origin.x + origin.width / 2 - target.x - target.width / 2}px,${origin.y + origin.height / 2 - target.y - target.height / 2}px) scale(${origin.width / target.width})`,
            opacity: 0.4,
          },
          { transform: "translate(0,0) scale(1)", opacity: 1 },
        ],
        { duration: 420, easing: "cubic-bezier(.18,.75,.25,1)" },
      );
    }
    const opener = trigger.current;
    return () => {
      animation?.cancel();
      dialog.close();
      document.body.style.overflow = before;
      opener?.focus({ preventScroll: true });
    };
  }, [motion, trigger]);
  useEffect(() => {
    try {
      renderer.current = createElasticPortrait(
        surface.current!,
        source,
        motion,
        () => setStatus("ready"),
        () => setStatus("fallback"),
      );
    } catch {
      setStatus("fallback");
    }
    return () => {
      renderer.current?.dispose();
      renderer.current = null;
    };
  }, [motion, source]);
  const point = (event: PointerEvent<HTMLDivElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  };
  const release = (event: PointerEvent<HTMLDivElement>) => {
    renderer.current?.release(event.pointerId);
    pointers.current.delete(event.pointerId);
    event.currentTarget.dataset.dragging = String(pointers.current.size > 0);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const directions: Record<string, Point> = {
      ArrowLeft: { x: -0.035, y: 0 },
      ArrowRight: { x: 0.035, y: 0 },
      ArrowUp: { x: 0, y: -0.035 },
      ArrowDown: { x: 0, y: 0.035 },
    };
    const direction = directions[event.key];
    if (!direction || status !== "ready") return;
    event.preventDefault();
    if (!keyboard.current) {
      keyboard.current = { ...points[selected] };
      renderer.current?.grip(-1, points[selected]);
    }
    keyboard.current.x += direction.x;
    keyboard.current.y += direction.y;
    renderer.current?.move(-1, keyboard.current);
  };
  const releaseKeyboard = () => {
    renderer.current?.release(-1);
    keyboard.current = null;
  };
  return createPortal(
    <dialog
      ref={modal}
      className="portrait-dialog"
      aria-labelledby={`${id}-title`}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === modal.current) close();
      }}
    >
      <div className="portrait-dialog-content">
        <div className="portrait-dialog-heading">
          <span>Raphael Rocha</span>
          <button autoFocus onClick={close} aria-label={t.close}>
            ×
          </button>
        </div>
        <h2 id={`${id}-title`}>{t.title}</h2>
        <p id={`${id}-hint`}>{status === "fallback" ? t.fallback : t.hint}</p>
        <div
          ref={stage}
          className="elastic-portrait"
          role="group"
          tabIndex={status === "ready" ? 0 : -1}
          aria-label={t.face}
          aria-describedby={
            status === "ready" ? `${id}-hint ${id}-keys` : `${id}-hint`
          }
          data-ready={status === "ready"}
          style={
            {
              "--hand-open": `url("${handOpen}") 15 7, grab`,
              "--hand-grab": `url("${handGrab}") 15 14, grabbing`,
            } as CSSProperties
          }
          onPointerDown={(event) => {
            if (status !== "ready" || event.button !== 0) return;
            event.preventDefault();
            event.currentTarget.focus({ preventScroll: true });
            event.currentTarget.setPointerCapture(event.pointerId);
            pointers.current.add(event.pointerId);
            event.currentTarget.dataset.dragging = "true";
            renderer.current?.grip(event.pointerId, point(event));
          }}
          onPointerMove={(event) => {
            if (pointers.current.has(event.pointerId))
              renderer.current?.move(event.pointerId, point(event));
          }}
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={release}
          onKeyDown={onKey}
          onKeyUp={releaseKeyboard}
          onBlur={releaseKeyboard}
        >
          <img
            src={source}
            alt="Raphael Rocha"
            draggable={false}
            onError={(event) => {
              if (!event.currentTarget.src.endsWith("/raphael-avatar.jpg"))
                event.currentTarget.src = `${import.meta.env.BASE_URL}raphael-avatar.jpg`;
              setStatus("fallback");
            }}
          />
          <canvas ref={surface} aria-hidden="true" />
          <span
            className="portrait-key-point"
            style={{
              left: `${points[selected].x * 100}%`,
              top: `${points[selected].y * 100}%`,
            }}
            aria-hidden="true"
          />
        </div>
        {status === "loading" && <p role="status">{t.loading}</p>}
        {status === "ready" && (
          <>
            <div className="portrait-regions" role="group" aria-label={t.face}>
              {t.parts.map((label, index) => (
                <button
                  key={label}
                  aria-pressed={selected === index}
                  onClick={() => {
                    releaseKeyboard();
                    setSelected(index);
                    stage.current?.focus({ preventScroll: true });
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="portrait-dialog-footer">
              <p id={`${id}-keys`}>{t.keys}</p>
              <button
                onClick={() => {
                  keyboard.current = null;
                  renderer.current?.reset();
                }}
              >
                {t.reset} ↺
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>,
    document.body,
  );
}
