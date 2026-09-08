import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import "./Portrait.css";
import type { Locale } from "../i18n";
const PortraitDialog = lazy(
  () => import("../features/portrait/PortraitDialog"),
);
const labels = {
  pt: "Ampliar e brincar com o retrato",
  en: "Expand and play with the portrait",
  es: "Ampliar y jugar con el retrato",
};
const eyes = [
  { x: 102, y: 118, angle: -4 },
  { x: 156, y: 114, angle: -5 },
];
export function Portrait({
  motion,
  language,
}: {
  motion: boolean;
  language: Locale;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const frame = useRef<HTMLSpanElement>(null);
  const id = useId();
  useEffect(() => {
    const element = frame.current;
    if (!element || !motion) return;
    let blinkTimer: ReturnType<typeof setTimeout>;
    let visible = false;
    const blink = () => {
      if (!visible || document.hidden) return;
      element.dataset.blink = "true";
      blinkTimer = setTimeout(() => {
        delete element.dataset.blink;
        blinkTimer = setTimeout(blink, 6000 + Math.random() * 4000);
      }, 165);
    };
    const visibility = () => {
      clearTimeout(blinkTimer);
      delete element.dataset.blink;
      if (visible && !document.hidden) blinkTimer = setTimeout(blink, 4000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibility();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      clearTimeout(blinkTimer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      delete element.dataset.blink;
    };
  }, [motion]);
  return (
    <>
      <button
        ref={trigger}
        className="portrait-trigger"
        aria-label={labels[language]}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <span className="portrait" ref={frame} aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}raphael-avatar.jpg`}
            width="64"
            height="64"
            alt=""
            decoding="async"
          />
          {motion && (
            <svg
              className="portrait-eyes"
              viewBox="0 0 256 256"
              focusable="false"
            >
              <defs>
                <linearGradient id={`${id}-skin`} x2="0" y2="1">
                  <stop stopColor="#bc723d" />
                  <stop offset="1" stopColor="#e5a36c" />
                </linearGradient>
                <clipPath id={`${id}-eye`}>
                  <path d="M-11 1 Q-2-7 11 0 Q3 7-11 1Z" />
                </clipPath>
              </defs>
              {eyes.map((eye, index) => (
                <g
                  key={index}
                  transform={`translate(${eye.x} ${eye.y}) rotate(${eye.angle})`}
                >
                  <g clipPath={`url(#${id}-eye)`}>
                    <g className="portrait-eyelid">
                      <path
                        d="M-16-24H16V1Q0 7-16 1Z"
                        fill={`url(#${id}-skin)`}
                      />
                      <path
                        d="M-16 1Q0 7 16 1"
                        fill="none"
                        stroke="#704029"
                        strokeWidth="1.1"
                      />
                    </g>
                  </g>
                </g>
              ))}
            </svg>
          )}
        </span>
      </button>
      {open && (
        <Suspense fallback={null}>
          <PortraitDialog
            language={language}
            motion={motion}
            trigger={trigger}
            close={() => setOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
