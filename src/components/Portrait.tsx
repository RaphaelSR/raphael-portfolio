import { useEffect, useRef } from "react";
import "./Portrait.css";
export function Portrait({ motion }: { motion: boolean }) {
  const frame = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = frame.current;
    if (!element || !motion) return;
    let request = 0;
    let x = 0,
      y = 0;
    const pointer = matchMedia("(pointer: fine)");
    const paint = () => {
      request = 0;
      element.style.setProperty("--portrait-x", `${x * 4}deg`);
      element.style.setProperty("--portrait-y", `${-y * 4}deg`);
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType === "touch") return;
      const rect = element.getBoundingClientRect();
      x = Math.max(
        -1,
        Math.min(1, (event.clientX - rect.left - rect.width / 2) / 500),
      );
      y = Math.max(
        -1,
        Math.min(1, (event.clientY - rect.top - rect.height / 2) / 500),
      );
      if (!request) request = requestAnimationFrame(paint);
    };
    const reset = () => {
      x = 0;
      y = 0;
      paint();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      cancelAnimationFrame(request);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      element.removeAttribute("style");
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
    </span>
  );
}
