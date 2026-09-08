import { useId, type RefObject } from "react";
export function SnakeArt({
  surface,
  preview = false,
}: {
  surface: RefObject<SVGSVGElement | null>;
  preview?: boolean;
}) {
  const id = useId();
  const path = preview ? "M40 66C37 50 43 25 40 6" : undefined;
  return (
    <svg
      ref={surface}
      className="snake-art"
      viewBox={preview ? "0 0 80 80" : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-satin`}
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#92d4ad" />
          <stop offset=".4" stopColor="#3e987b" />
          <stop offset="1" stopColor="#1a564b" />
        </linearGradient>
        <radialGradient id={`${id}-face`} cx="35%" cy="25%" r="80%">
          <stop stopColor="#a3dfb5" />
          <stop offset=".65" stopColor="#398d70" />
          <stop offset="1" stopColor="#206552" />
        </radialGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} data-snake-body stroke="#205c4c" strokeWidth="20" />
        <path
          d={path}
          data-snake-body
          stroke={`url(#${id}-satin)`}
          strokeWidth="17"
        />
        {!preview && (
          <path
            data-snake-outline
            fill={`url(#${id}-satin)`}
            stroke="#205c4c"
            strokeWidth="1.5"
          />
        )}
        <path
          d={path}
          data-snake-body
          stroke="#b7efd0"
          strokeWidth="3"
          opacity=".35"
          strokeDasharray="1 9"
        />
      </g>
      <g
        data-snake-head
        visibility={preview ? "visible" : "hidden"}
        transform={preview ? "translate(40 66) rotate(90)" : undefined}
      >
        <path
          d="M12 0 H19 l3 -2 M19 0 l3 2"
          stroke="#bc7272"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          rx="14"
          ry="11"
          fill={`url(#${id}-face)`}
          stroke="#205c4c"
          strokeWidth="1"
        />
        <path
          d="M-6 6 Q3 11 10 4"
          stroke="#bce7b5"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity=".65"
        />
        <ellipse cx="5" cy="-6" rx="4" ry="4.6" fill="#f5f5d9" />
        <ellipse cx="5" cy="6" rx="4" ry="4.6" fill="#f5f5d9" />
        <ellipse cx="6.2" cy="-6" rx="1.9" ry="2.8" fill="#153b35" />
        <ellipse cx="6.2" cy="6" rx="1.9" ry="2.8" fill="#153b35" />
        <circle cx="7" cy="-7" r=".8" fill="white" />
        <circle cx="7" cy="5" r=".8" fill="white" />
        <circle cx="11" cy="-2" r=".7" fill="#205c4c" />
        <circle cx="11" cy="2" r=".7" fill="#205c4c" />
      </g>
    </svg>
  );
}
