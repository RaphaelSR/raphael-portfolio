export function ProjectArt({ id }: { id: string }) {
  if (id === "modpro")
    return (
      <div className="project-art art-modpro" aria-hidden="true">
        <span className="art-stamp">MODPRO / GARAGE</span>
        <svg viewBox="0 0 560 260">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m70 160 45-20 60-57h145l83 52 66 21v38H65z" />
            <path d="m149 137 47-42h62v42zm124-42h43l62 42H273zM73 161h58m279 0h51M202 186h150" />
            <circle cx="158" cy="192" r="37" fill="#dfe6ff" />
            <circle cx="158" cy="192" r="21" />
            <circle cx="391" cy="192" r="37" fill="#dfe6ff" />
            <circle cx="391" cy="192" r="21" />
            <path
              d="M39 238h474M158 240v12m233-12v12M35 84v110m-5-110h10m-10 110h10"
              strokeDasharray="3 4"
            />
          </g>
        </svg>
        <span className="art-note">01 / BUILD SOMETHING YOURS</span>
      </div>
    );
  if (id === "medely")
    return (
      <div className="project-art art-medely" aria-hidden="true">
        <span className="art-stamp">MEDELY / MOBILE</span>
        <div className="health-orbit">
          <span>m</span>
          <i />
          <i />
          <i />
        </div>
        <div className="health-note">
          <span className="tiny-cross">+</span>
          <div>
            People first.
            <br />
            <small>Every interaction.</small>
          </div>
        </div>
      </div>
    );
  if (id === "geometry")
    return (
      <div className="project-art art-geometry" aria-hidden="true">
        <span className="art-stamp">GEOMETRY / MOTION STUDY</span>
        <svg viewBox="0 0 560 260">
          <g
            transform="translate(280,125) rotate(-20)"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <ellipse rx="112" ry="64" />
            <ellipse rx="112" ry="64" transform="rotate(60)" />
            <ellipse rx="112" ry="64" transform="rotate(120)" />
            <circle r="11" fill="currentColor" />
          </g>
          <path
            d="M65 220h70m-35-35v70m326-160h50m-25-25v50"
            stroke="currentColor"
            opacity=".35"
          />
        </svg>
        <span className="art-note">SHAPE → MATERIAL → MOTION</span>
      </div>
    );
  return (
    <div className="project-art art-trivia" aria-hidden="true">
      <span className="art-stamp">TRIVIA / PLAY TOGETHER</span>
      <div className="trivia-tiles">
        <b>?</b>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </div>
      <span className="art-note">A LITTLE FRIENDLY COMPETITION.</span>
    </div>
  );
}
