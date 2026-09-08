import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "../i18n";
import "./phone.css";
import { PhoneApps, type PhoneApp } from "./PhoneApps";
import { useDeviceTime } from "../hooks/useDeviceTime";
import {
  defaultPhonePreferences,
  type PhonePreferences,
} from "./PhoneSettings";
import { SnakeArt } from "./SnakeArt";
const copy = {
  pt: {
    title: "Um clássico. Uma pequena pausa.",
    text: "Entre aplicativos e interfaces, também há espaço para brincar. Toque no Snake para experimentar.",
    label: "EXPERIMENTO INTERATIVO",
    play: "Jogar Snake",
    maps: "Mapas",
    calendar: "Calendário",
    photos: "Fotos",
    reminders: "Lembretes",
    notes: "Notas",
    health: "Saúde",
    wallet: "Carteira",
    settings: "Ajustes",
    events: "Nenhum evento hoje",
    search: "Buscar",
    loading: "Abrindo Snake…",
    broken: "Opa. A cobra saiu da tela.",
    cancel: "Cancelar animação",
  },
  en: {
    title: "A classic. A little break.",
    text: "Between apps and interfaces, there’s room to play. Tap Snake to give it a try.",
    label: "INTERACTIVE EXPERIMENT",
    play: "Play Snake",
    maps: "Maps",
    calendar: "Calendar",
    photos: "Photos",
    reminders: "Reminders",
    notes: "Notes",
    health: "Health",
    wallet: "Wallet",
    settings: "Settings",
    events: "No events today",
    search: "Search",
    loading: "Opening Snake…",
    broken: "Oops. The snake left the screen.",
    cancel: "Cancel animation",
  },
  es: {
    title: "Un clásico. Una pequeña pausa.",
    text: "Entre aplicaciones e interfaces, también hay espacio para jugar. Toca Snake para probar.",
    label: "EXPERIMENTO INTERACTIVO",
    play: "Jugar Snake",
    maps: "Mapas",
    calendar: "Calendario",
    photos: "Fotos",
    reminders: "Recordatorios",
    notes: "Notas",
    health: "Salud",
    wallet: "Cartera",
    settings: "Ajustes",
    events: "Sin eventos hoy",
    search: "Buscar",
    loading: "Abriendo Snake…",
    broken: "La serpiente salió de la pantalla.",
    cancel: "Cancelar animación",
  },
};
type Phase = "home" | "launching" | "impact" | "escaped";
function SnakeGlyph() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <path
        d="M15 55H43Q57 55 57 40V30Q57 18 43 18H34"
        fill="none"
        stroke="#b9edb6"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <ellipse cx="32" cy="18" rx="11" ry="8" fill="#d4f4c6" />
      <circle cx="28" cy="15" r="2" fill="#183f30" />
      <circle cx="28" cy="21" r="2" fill="#183f30" />
    </svg>
  );
}
export function PhoneSimulator({ language }: { language: Locale }) {
  const t = copy[language];
  const [app, setApp] = useState<PhoneApp | null>(null);
  const [settings, setSettings] = useState(defaultPhonePreferences);
  const changeSettings = useCallback(
    (patch: Partial<PhonePreferences>) =>
      setSettings((current) => ({ ...current, ...patch })),
    [],
  );
  const { dark, airplane } = settings;
  const now = useDeviceTime();
  const time =
    now?.toLocaleTimeString(language, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !settings.hour24,
    }) ?? "--:--";
  const weekday = now?.toLocaleDateString(language, { weekday: "long" }) ?? "—";
  const launcher = useRef<HTMLButtonElement | null>(null);
  const closeApp = useCallback(() => {
    setApp(null);
    requestAnimationFrame(() =>
      launcher.current?.focus({ preventScroll: true }),
    );
  }, []);
  useEffect(() => {
    if (!app) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("dialog[open]"))
        closeApp();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [app, closeApp]);
  const demoArt = useRef<SVGSVGElement>(null);
  const maskId = useId();
  const [phase, setPhase] = useState<Phase>("home");
  const device = useRef<HTMLDivElement>(null);
  const play = useRef<HTMLButtonElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sequence = useRef(false);
  useEffect(() => {
    const reset = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      const wasActive = sequence.current;
      sequence.current = false;
      setPhase("home");
      if (wasActive)
        requestAnimationFrame(() =>
          play.current?.focus({ preventScroll: true }),
        );
      document.documentElement.removeAttribute("data-phone-sequence");
    };
    const cancel = (event: KeyboardEvent) => {
      if (
        sequence.current &&
        !document.querySelector("dialog[open]") &&
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          " ",
          "w",
          "a",
          "s",
          "d",
        ].includes(event.key)
      )
        event.preventDefault();
      if (
        event.key === "Escape" &&
        sequence.current &&
        !document.querySelector("dialog[open]")
      ) {
        reset();
        play.current?.focus({ preventScroll: true });
      }
    };
    const hidden = () => {
      if (
        document.hidden &&
        sequence.current &&
        !document.querySelector("dialog[open]")
      )
        reset();
    };
    window.addEventListener("portfolio:snake-end", reset);
    window.addEventListener("keydown", cancel);
    window.addEventListener("resize", reset);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      document.documentElement.removeAttribute("data-phone-sequence");
      timers.current.forEach(clearTimeout);
      window.removeEventListener("portfolio:snake-end", reset);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("resize", reset);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, []);
  useEffect(() => {
    const phone = device.current!;
    let visible = false;
    const update = () => {
      phone.dataset.idle = String(!visible || document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(phone);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const intro = phase === "launching" || phase === "impact";
  useEffect(() => {
    if (
      !intro ||
      settings.reduceMotion ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "off"
    )
      return;
    const paths = demoArt.current?.querySelectorAll("[data-snake-body]");
    let frame = 0;
    const animate = (time: number) => {
      const points = Array.from({ length: 13 }, (_, i) => {
        const distance = i * 5;
        return `${40 + Math.sin(time / 220 - distance / 13) * 3 * (distance / 60)},${66 - distance}`;
      });
      paths?.forEach((path) => path.setAttribute("d", `M${points.join(" L")}`));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [intro, settings.reduceMotion]);
  useEffect(() => {
    if (!intro) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, [intro]);
  const start = () => {
    if (sequence.current) return;
    setApp(null);
    sequence.current = true;
    device.current?.scrollIntoView({ block: "center", behavior: "instant" });
    document.documentElement.setAttribute("data-phone-sequence", "true");
    const reduced =
      settings.reduceMotion ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "off";
    setPhase("launching");
    timers.current.push(
      setTimeout(() => setPhase("impact"), reduced ? 150 : 1550),
    );
    timers.current.push(
      setTimeout(
        () => {
          const rect = device.current!.getBoundingClientRect();
          setPhase("escaped");
          document.documentElement.removeAttribute("data-phone-sequence");
          window.dispatchEvent(
            new CustomEvent("portfolio:snake", {
              detail: {
                x: rect.left + rect.width / 2,
                y: rect.bottom - 24 + window.scrollY,
                entry: "phone",
                reducedMotion: reduced,
              },
            }),
          );
        },
        reduced ? 350 : 2250,
      ),
    );
  };
  return (
    <div className="phone-experiment">
      <div className="phone-caption">
        <p className="eyebrow">{t.label}</p>
        <h3>{t.title}</h3>
        <p>{t.text}</p>
      </div>
      <div className="phone-stage" data-phase={phase}>
        <div
          ref={device}
          className="phone-device"
          data-dark={dark}
          data-wallpaper={settings.wallpaper}
          data-reduce-motion={settings.reduceMotion}
        >
          <svg width="0" height="0" aria-hidden="true">
            <defs>
              <mask
                id={maskId}
                data-phone-mask
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1000"
                height="2000"
              >
                <rect width="1000" height="2000" fill="white" />
              </mask>
            </defs>
          </svg>
          <div className="phone-shell" style={{ maskImage: `url(#${maskId})` }}>
            <div
              className="phone-screen"
              style={{ filter: `brightness(${settings.brightness / 100})` }}
            >
              <div className="phone-wallpaper" aria-hidden="true" />
              <div className="phone-status" aria-hidden="true">
                <time dateTime={now?.toISOString()}>{time}</time>
                <i className="phone-island" />
                <span className="phone-signals">
                  {airplane ? "✈" : "▂▃▅"}{" "}
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      visibility:
                        settings.wifi && !airplane ? "visible" : "hidden",
                    }}
                  >
                    <path
                      d="M3 8Q12 0 21 8M6 12q6-5 12 0M10 16q2-2 4 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <i className="phone-battery" />
                </span>
              </div>
              <div
                className="phone-home"
                inert={app !== null || phase !== "home"}
                onClickCapture={(event) => {
                  launcher.current = (event.target as HTMLElement).closest(
                    "button",
                  );
                }}
              >
                <div className="phone-widgets">
                  <button aria-label={t.maps} onClick={() => setApp("maps")}>
                    <div className="phone-map-widget">
                      <svg viewBox="0 0 150 150">
                        <path
                          fill="#277f66"
                          d="M0 5 75 0 90 17 133 25 150 57 117 62 108 84 86 96 76 133 63 150 52 124 48 99 34 70 10 52Z"
                        />
                        <path
                          fill="#479776"
                          d="m38 25 28-9 42 15 21 19-44 22-26-18Z"
                        />
                        <path
                          stroke="#94bab7"
                          opacity=".35"
                          d="M0 35H150M0 110H150M38 0V150M115 0V150"
                        />
                        <text x="76" y="65" textAnchor="middle">
                          AMERICA
                        </text>
                        <text x="76" y="83" textAnchor="middle">
                          DO SUL
                        </text>
                      </svg>
                    </div>
                    <span>{t.maps}</span>
                  </button>
                  <button
                    aria-label={t.calendar}
                    onClick={() => setApp("calendar")}
                  >
                    <div className="phone-calendar-widget">
                      <b>{weekday}</b>
                      <strong>{now?.getDate() ?? "—"}</strong>
                      <p>{t.events}</p>
                    </div>
                    <span>{t.calendar}</span>
                  </button>
                </div>
                <div className="phone-apps">
                  <button
                    ref={play}
                    className="phone-snake-app"
                    aria-label={t.play}
                    onClick={start}
                    disabled={phase !== "home"}
                  >
                    <span className="phone-icon snake-app-icon">
                      <SnakeGlyph />
                    </span>
                    <span>Snake</span>
                  </button>
                  <button
                    aria-label={t.photos}
                    onClick={() => setApp("photos")}
                  >
                    <div className="phone-icon photos-app">
                      {Array.from({ length: 8 }, (_, i) => (
                        <i
                          key={i}
                          style={{
                            transform: `rotate(${i * 45}deg)`,
                            background: `hsl(${i * 45} 85% 55% / .78)`,
                          }}
                        />
                      ))}
                    </div>
                    <span>{t.photos}</span>
                  </button>
                  <button
                    aria-label={t.reminders}
                    onClick={() => setApp("reminders")}
                  >
                    <div className="phone-icon reminders-app">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span>{t.reminders}</span>
                  </button>
                  <button aria-label={t.notes} onClick={() => setApp("notes")}>
                    <div className="phone-icon notes-app">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span>{t.notes}</span>
                  </button>
                  <button aria-label={t.maps} onClick={() => setApp("maps")}>
                    <div className="phone-icon maps-app">
                      <span>➤</span>
                    </div>
                    <span>{t.maps}</span>
                  </button>
                  <button
                    aria-label={t.health}
                    onClick={() => setApp("health")}
                  >
                    <div className="phone-icon health-app">
                      <svg viewBox="0 0 60 60">
                        <path
                          fill="#ff3869"
                          d="M30 47 12 29C-2 12 23 3 30 20 38 3 62 12 48 29Z"
                        />
                      </svg>
                    </div>
                    <span>{t.health}</span>
                  </button>
                  <button
                    aria-label={t.wallet}
                    onClick={() => setApp("wallet")}
                  >
                    <div className="phone-icon wallet-app">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span>{t.wallet}</span>
                  </button>
                  <button
                    aria-label={t.settings}
                    onClick={() => setApp("settings")}
                  >
                    <div className="phone-icon settings-app">
                      <span>⚙</span>
                    </div>
                    <span>{t.settings}</span>
                  </button>
                </div>
                <span className="phone-search" aria-hidden="true">
                  ⌕ {t.search}
                </span>
                <div className="phone-dock">
                  <button
                    aria-label={language === "en" ? "Browser" : "Navegador"}
                    onClick={() => setApp("browser")}
                  >
                    <span className="phone-icon browser-app">
                      <i />
                    </span>
                  </button>
                  <button
                    aria-label={
                      language === "pt"
                        ? "Mensagens"
                        : language === "en"
                          ? "Messages"
                          : "Mensajes"
                    }
                    onClick={() => setApp("messages")}
                  >
                    <span className="phone-icon messages-app">
                      <i />
                    </span>
                  </button>
                </div>
              </div>
              <div className="phone-game" aria-hidden="true">
                <div className="phone-game-heading">
                  <span>Snake</span>
                  <span>001</span>
                </div>
                <div className="phone-game-board">
                  <i className="phone-food" />
                  <span className="phone-game-watermark">SNAKE</span>
                </div>
                <div className="phone-demo-pad">
                  ← &nbsp; ↑ &nbsp; ↓ &nbsp; →
                </div>
              </div>
              <div className="phone-demo-snake" aria-hidden="true">
                <SnakeArt surface={demoArt} preview />
              </div>
              <PhoneApps
                app={app}
                language={language}
                close={closeApp}
                settings={settings}
                changeSettings={changeSettings}
                now={now}
              />
              <div className="phone-glitch" aria-hidden="true" />
              <svg
                className="phone-fracture"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="m50 100-4-18 9-9-15-12 5-13M46 82 25 73 28 59M55 73 76 65 84 46M40 61 27 38M50 95 66 85 80 88" />
              </svg>
              <div className="phone-home-bar" aria-hidden="true" />
            </div>
          </div>
          <div className="phone-fragments" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>
        <p className="phone-announcement" role="status">
          {phase === "home" ? "" : phase === "escaped" ? t.broken : t.loading}
        </p>
        {(phase === "launching" || phase === "impact") && (
          <button
            className="phone-cancel"
            onClick={() => {
              timers.current.forEach(clearTimeout);
              sequence.current = false;
              document.documentElement.removeAttribute("data-phone-sequence");
              setPhase("home");
              play.current?.focus();
            }}
          >
            {t.cancel} · Esc
          </button>
        )}
      </div>
    </div>
  );
}
