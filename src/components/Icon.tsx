import type { SVGProps } from "react";
const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  external: "M6 18 18 6M6 6h12v12",
  download: "M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4",
  copy: "M9 9h11v11H9zM15 9V4H4v11h5",
  plus: "M12 5v14M5 12h14",
  close: "m6 6 12 12M6 18 18 6",
  pause: "M8 5v14M16 5v14",
  play: "m8 5 11 7-11 7z",
  reset: "M4 10a8 8 0 1 1 1 8M4 4v6h6",
  color:
    "M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h3a5 5 0 0 0 5-5c-1-3-5-5-9-5Z",
  mail: "M3 5h18v14H3zM3 5l9 7 9-7",
  menu: "M4 7h16M4 12h16M4 17h16",
  globe:
    "M3 12h18M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18",
  chevron: "m6 9 6 6 6-6",
  check: "m5 12 4 4L19 6",
};
export function Icon({
  name,
  ...props
}: { name: keyof typeof paths } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
