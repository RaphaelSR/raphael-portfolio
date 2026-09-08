import { createPortal } from "react-dom";
import {
  useEffect,
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
    close: "Fechar retrato",
    loading: "Preparando o retrato…",
    fallback:
      "Retrato ampliado. A interação gráfica não está disponível neste navegador.",
    face: "Rosto interativo de Raphael Rocha",
  },
  en: {
    close: "Close portrait",
    loading: "Preparing the portrait…",
    fallback:
      "Expanded portrait. The graphics interaction is unavailable in this browser.",
    face: "Interactive portrait of Raphael Rocha",
  },
  es: {
    close: "Cerrar retrato",
    loading: "Preparando el retrato…",
    fallback:
      "Retrato ampliado. La interacción gráfica no está disponible en este navegador.",
    face: "Retrato interactivo de Raphael Rocha",
  },
};
const keyboardOrigin: Point = { x: 0.51, y: 0.54 };
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
  const t = copy[language];
  const modal = useRef<HTMLDialogElement>(null),
    surface = useRef<HTMLCanvasElement>(null),
    stage = useRef<HTMLDivElement>(null);
  const renderer = useRef<ElasticPortrait | null>(null);
  const openingMotion = useRef(motion);
  const keyboard = useRef<Point | null>(null);
  const pointers = useRef(new Set<number>());
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );
  const source = `${import.meta.env.BASE_URL}raphael-avatar-full.png`;
  useEffect(() => {
    const dialog = modal.current!;
    const before = document.body.style.overflow;
    const origin = trigger.current?.getBoundingClientRect();
    dialog.showModal();
    document.body.style.overflow = "hidden";
    let animation: Animation | undefined;
    if (openingMotion.current && origin && stage.current) {
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
  }, [trigger]);
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
      keyboard.current = { ...keyboardOrigin };
      renderer.current?.grip(-1, keyboardOrigin);
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
      aria-label={t.face}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === modal.current) close();
      }}
    >
      <div className="portrait-dialog-content">
        <button
          className="portrait-dialog-close"
          autoFocus
          onClick={close}
          aria-label={t.close}
        >
          ×
        </button>
        <div
          ref={stage}
          className="elastic-portrait"
          role="group"
          tabIndex={status === "ready" ? 0 : -1}
          aria-label={t.face}
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
        </div>
        <p className="portrait-status" role="status">
          {status === "loading"
            ? t.loading
            : status === "fallback"
              ? t.fallback
              : ""}
        </p>
      </div>
    </dialog>,
    document.body,
  );
}
