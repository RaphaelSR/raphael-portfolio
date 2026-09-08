import { useEffect, useId, useRef } from "react";
import "./Portrait.css";
export function Portrait({ motion }: { motion: boolean }) {
  const frame = useRef<HTMLDivElement>(null);
  const clip = useId();
  const canvas = useRef<HTMLDivElement>(null);
  const controller = useRef<ReturnType<
    typeof import("../avatar/scene").mountAvatar
  > | null>(null);
  const motionRef = useRef(motion);
  useEffect(() => {
    motionRef.current = motion;
    controller.current?.setMotion(motion);
  }, [motion]);
  useEffect(() => {
    const element = frame.current;
    const host = canvas.current;
    if (!element || !host) return;
    let cancelled = false;
    const fallback = () => {
      element.dataset.ready = "false";
      controller.current?.dispose();
      controller.current = null;
    };
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        try {
          const { mountAvatar } = await import("../avatar/scene");
          if (cancelled) return;
          controller.current = mountAvatar(host, fallback);
          controller.current.setMotion(motionRef.current);
          element.dataset.ready = "true";
        } catch {
          fallback();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      fallback();
    };
  }, []);
  return (
    <div className="portrait" ref={frame} aria-hidden="true">
      <div className="portrait-canvas" ref={canvas} />
      <svg
        className="portrait-fallback"
        viewBox="0 0 128 140"
        fill="none"
        focusable="false"
      >
        <defs>
          <clipPath id={clip}>
            <circle cx="64" cy="64" r="55" />
          </clipPath>
        </defs>
        <circle cx="64" cy="64" r="59" fill="#edf0f7" stroke="#d0d8e5" />
        <g clipPath={`url(#${clip})`}>
          <path
            d="M18 132v-21c0-21 21-31 46-31s46 10 46 31v21"
            fill="#334765"
          />
          <path d="M52 78v14c7 7 17 7 24 0V78" fill="#d7a681" />
          <g className="portrait-head">
            <ellipse cx="37" cy="62" rx="6" ry="8" fill="#e3b796" />
            <ellipse cx="91" cy="62" rx="6" ry="8" fill="#e3b796" />
            <path
              d="M38 44c0-23 52-23 52 0v24c0 18-12 26-26 26S38 83 38 67Z"
              fill="#efc7a5"
            />
            <path
              d="M37 55c-6-18 1-36 20-37 9-8 27-3 34 7 8 11 4 25-1 31l-5-18c-10 4-25 2-31-4-2 8-7 12-13 13l-2 12Z"
              fill="#263246"
            />
            <path
              d="M46 52c3-2 7-2 10 0M72 52c3-2 7-2 10 0"
              stroke="#534438"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <ellipse cx="51" cy="61" rx="7" ry="8" fill="#fffaf4" />
            <ellipse cx="77" cy="61" rx="7" ry="8" fill="#fffaf4" />
            <g className="portrait-pupils" fill="#263246">
              <ellipse cx="51" cy="62" rx="3.2" ry="4.2" />
              <ellipse cx="77" cy="62" rx="3.2" ry="4.2" />
              <circle cx="52" cy="60.5" r="1" fill="white" />
              <circle cx="78" cy="60.5" r="1" fill="white" />
            </g>
            <path
              d="m63 65-2 8h5"
              stroke="#ce9673"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M56 81c5 4 11 4 16 0"
              stroke="#875a47"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
          <path
            d="M52 96 64 104 76 96"
            stroke="#6c7b93"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g
          className="portrait-hands"
          fill="#efc7a5"
          stroke="#d4a07d"
          strokeWidth="1.2"
        >
          <path d="M25 102c0-5 4-7 6-3 0-5 5-6 7-1 2-4 6-3 7 1 4-2 7 1 6 5l-3 10c-1 6-8 9-13 6-5-3-10-11-10-18Z" />
          <path d="M103 102c0-5-4-7-6-3 0-5-5-6-7-1-2-4-6-3-7 1-4-2-7 1-6 5l3 10c1 6 8 9 13 6 5-3 10-11 10-18Z" />
          <path
            d="m32 103 3 8m3-9 3 8m48-8-3 8m9-7-3 8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
