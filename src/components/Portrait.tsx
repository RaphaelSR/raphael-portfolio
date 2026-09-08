import { useEffect, useId, useRef } from "react";
import "./Portrait.css";
const eyes = [
  { x: 102, y: 118, angle: -4 },
  { x: 156, y: 114, angle: -5 },
];
export function Portrait({ motion }: { motion: boolean }) {
  const frame = useRef<HTMLSpanElement>(null);
  const id = useId();
  useEffect(() => {
    const element = frame.current;
    if (!element || !motion) return;
    let request = 0;
    let blinkTimer: ReturnType<typeof setTimeout>;
    let restTimer: ReturnType<typeof setTimeout>;
    let scrollTimer: ReturnType<typeof setTimeout>;
    let x = 0,
      y = 0;
    let lastScroll = scrollY;
    let scrolling = false;
    let visible = true;
    const pointer = matchMedia("(pointer: fine)");
    const paint = () => {
      request = 0;
      element.style.setProperty("--portrait-x", `${x * 4}deg`);
      element.style.setProperty("--portrait-y", `${-y * 3}deg`);
      element.style.setProperty("--gaze-x", `${x * 3.6}px`);
      element.style.setProperty("--gaze-y", `${scrolling ? 2.7 : y * 2.2}px`);
    };
    const schedule = () => {
      if (visible && !request) request = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType === "touch") return;
      const rect = element.getBoundingClientRect();
      x = Math.max(
        -1,
        Math.min(1, (event.clientX - rect.left - rect.width / 2) / 380),
      );
      y = Math.max(
        -1,
        Math.min(1, (event.clientY - rect.top - rect.height / 2) / 380),
      );
      clearTimeout(restTimer);
      restTimer = setTimeout(() => {
        x = 0;
        y = 0;
        schedule();
      }, 4500);
      schedule();
    };
    const scroll = () => {
      scrolling = scrollY > lastScroll;
      lastScroll = scrollY;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
        schedule();
      }, 750);
      schedule();
    };
    const blink = () => {
      if (!visible || document.hidden) return;
      element.dataset.blink = "true";
      blinkTimer = setTimeout(() => {
        delete element.dataset.blink;
        blinkTimer = setTimeout(blink, 3200 + Math.random() * 2200);
      }, 145);
    };
    const reset = () => {
      x = 0;
      y = 0;
      scrolling = false;
      schedule();
    };
    const visibility = () => {
      clearTimeout(blinkTimer);
      delete element.dataset.blink;
      if (visible && !document.hidden) blinkTimer = setTimeout(blink, 1400);
      else {
        cancelAnimationFrame(request);
        request = 0;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibility();
    });
    observer.observe(element);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(request);
      clearTimeout(blinkTimer);
      clearTimeout(restTimer);
      clearTimeout(scrollTimer);
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", visibility);
      element.removeAttribute("style");
      delete element.dataset.blink;
    };
  }, [motion]);
  return (
    <span className="portrait" ref={frame} aria-hidden="true">
      <img
        src={`${import.meta.env.BASE_URL}raphael-avatar.jpg`}
        width="64"
        height="64"
        alt=""
        decoding="async"
      />
      {motion && (
        <svg className="portrait-eyes" viewBox="0 0 256 256" focusable="false">
          <defs>
            <radialGradient id={`${id}-iris`}>
              <stop stopColor="#29190f" />
              <stop offset=".65" stopColor="#70462a" />
              <stop offset="1" stopColor="#362318" />
            </radialGradient>
            <linearGradient id={`${id}-white`} x2="0" y2="1">
              <stop stopColor="#b19a7b" />
              <stop offset=".5" stopColor="#e9d9bb" />
              <stop offset="1" stopColor="#ddc7a7" />
            </linearGradient>
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
                <path d="M-14-10H14V11H-14Z" fill={`url(#${id}-white)`} />
                <g className="portrait-iris">
                  <ellipse rx="5.8" ry="6.2" fill={`url(#${id}-iris)`} />
                  <ellipse rx="2.6" ry="3.4" fill="#16120f" />
                  <ellipse
                    cx="-1.6"
                    cy="-2.2"
                    rx="1.1"
                    ry="1.25"
                    fill="#fff3dc"
                  />
                </g>
                <g className="portrait-eyelid">
                  <path d="M-16-24H16V1Q0 7-16 1Z" fill={`url(#${id}-skin)`} />
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
  );
}
