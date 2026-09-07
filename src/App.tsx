import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  copy,
  experience,
  links,
  projects,
  toolkit,
  type Experience,
  type Project,
} from "./content";
import { usePreferences } from "./hooks/usePreferences";
import { Icon } from "./components/Icon";
import { ProjectArt } from "./components/ProjectArt";
const Playground = lazy(() => import("./components/Playground"));
const anchors = ["home", "experience", "work", "about"];
function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i}>{line}</span>
      ))}
    </>
  );
}
function External({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Icon name="external" />
    </a>
  );
}
export default function App() {
  const { language, setLanguage, motion, toggleMotion, reduced } =
    usePreferences();
  const t = copy[language];
  const [menu, setMenu] = useState(false);
  const [color, setColor] = useState(0);
  const [reset, setReset] = useState(0);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "done" | "failed">(
    "idle",
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu) {
        setMenu(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);
  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      lastTrigger.current?.focus();
    };
  }, [selected]);
  const selectProject = (project: Project, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setSelected(project);
  };
  const close = () => {
    dialog.current?.close();
    setSelected(null);
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopyState("done");
    } catch {
      setCopyState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState("idle"), 4000);
  };
  const renderExperience = (item: Experience, index: number) => (
    <details
      className="experience-row"
      key={item.company}
      open={index === 0 ? true : undefined}
    >
      <summary>
        <span className="experience-date mono">
          {item.period} {index === 0 ? t.present : ""}
        </span>
        <span className="experience-name">
          <strong>{item.company}</strong>
          <span>{item.title[language]}</span>
        </span>
        <Icon name="plus" />
      </summary>
      <div className="experience-detail">
        <p>{item.description[language]}</p>
        <div className="tags">
          {item.tags.map((tag) => (
            <span key={tag}>
              {tag.includes(" / ")
                ? tag.split(" / ")[language === "pt" ? 0 : 1]
                : tag}
            </span>
          ))}
        </div>
      </div>
    </details>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="header">
        <div className="header-inner">
          <a
            href="#home"
            className="wordmark"
            aria-label="Raphael Rocha — home"
          >
            <span className="monogram">
              r<span>/</span>r
            </span>
            <span>
              Raphael Rocha
              <span className="wordmark-sub">
                MOBILE & CREATIVE ENGINEERING
              </span>
            </span>
          </a>
          <nav
            className={menu ? "nav is-open" : "nav"}
            aria-label={
              language === "pt" ? "Navegação principal" : "Main navigation"
            }
            id="main-nav"
          >
            {t.nav.map((label, i) => (
              <a
                href={`#${anchors[i]}`}
                key={label}
                onClick={() => setMenu(false)}
              >
                <span className="nav-index">0{i}</span>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="language-button"
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              aria-label={
                language === "pt" ? "Switch to English" : "Mudar para português"
              }
            >
              <Icon name="globe" />
              <span>{language.toUpperCase()}</span>
            </button>
            <a href="#contact" className="contact-nav">
              {t.contact}
              <Icon name="external" />
            </a>
            <button
              ref={menuRef}
              className="menu-toggle icon-button"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="main-nav"
              aria-label={
                menu
                  ? language === "pt"
                    ? "Fechar menu"
                    : "Close menu"
                  : language === "pt"
                    ? "Abrir menu"
                    : "Open menu"
              }
            >
              <Icon name={menu ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section
          className="hero section-shell"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="square-dot" />
              {t.eyebrow}
            </p>
            <h1 id="hero-title">
              {t.hero[0]}
              <br />
              <span>{t.hero[1]}</span>
            </h1>
            <p className="hero-intro">{t.intro}</p>
            <p className="location">
              <span className="location-line" />
              {t.location}
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                {t.workCta}
                <Icon name="arrow" />
              </a>
              <a className="button text-button" href={links.resume} download>
                {t.resume}
                <Icon name="download" />
              </a>
            </div>
            <div className="current-note">
              <span className="mono">{t.now}</span>
              <p>
                {t.nowText}
                <span>{t.nowDetail}</span>
              </p>
            </div>
          </div>
          <div className="playground-window">
            <div className="window-title">
              <span>
                <span className="window-icon" />
                playground.exe
              </span>
              <div aria-hidden="true" className="window-decoration">
                <span>−</span>
                <span>□</span>
              </div>
            </div>
            <div className="playground-area">
              <div className="playground-grid" />
              <span className="art-corner mono">PERSONAL OBJECT / 001</span>
              <Suspense
                fallback={
                  <div
                    className="three-loading"
                    aria-label={
                      language === "pt"
                        ? "Carregando experimento 3D"
                        : "Loading 3D experiment"
                    }
                  >
                    <span>R/R</span>
                  </div>
                }
              >
                <Playground
                  motion={motion}
                  color={color}
                  reset={reset}
                  fallback={t.fallback}
                />
              </Suspense>
              <div className="playground-caption">
                <span className="mono">{t.visualHint}</span>
                <div>
                  <button
                    className="icon-button"
                    disabled={reduced}
                    aria-label={reduced ? t.reduced : motion ? t.pause : t.play}
                    onClick={toggleMotion}
                  >
                    <Icon name={motion ? "pause" : "play"} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={t.color}
                    onClick={() => setColor((v) => (v + 1) % 3)}
                  >
                    <Icon name="color" />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={t.rotate}
                    onClick={() => setReset((v) => v + 1)}
                  >
                    <Icon name="reset" />
                  </button>
                </div>
              </div>
            </div>
            <div className="window-status">
              <span>
                <span className="status-dot" />
                {t.visualTitle}
              </span>
              <span className="mono">WEBGL</span>
            </div>
          </div>
        </section>
        <div className="expertise-strip">
          <div className="section-shell">
            <span className="mono">MOBILE AT HEART.</span>
            <span>
              React Native <i>↗</i> {language === "pt" ? "Produto" : "Product"}{" "}
              <i>↗</i> Web <i>↗</i> 3D
            </span>
            <span className="mono">ALWAYS EXPLORING.</span>
          </div>
        </div>
        <section
          id="experience"
          className="section-shell section-grid experience-section"
          aria-labelledby="experience-title"
        >
          <div className="section-heading">
            <p className="eyebrow">{t.pathLabel}</p>
            <h2 id="experience-title">
              <Lines text={t.pathTitle} />
            </h2>
            <p>{t.pathIntro}</p>
            <a href={links.resume} download className="inline-link">
              {t.resume} PDF
              <Icon name="download" />
            </a>
          </div>
          <div className="experience-list">
            {experience.slice(0, 6).map(renderExperience)}
            <details className="earlier">
              <summary>
                {t.earlier}
                <Icon name="chevron" />
              </summary>
              {experience
                .slice(6)
                .map((item, i) => renderExperience(item, i + 6))}
            </details>
            <p className="small-note">{t.concurrent}</p>
          </div>
        </section>
        <section
          id="work"
          className="work-section"
          aria-labelledby="work-title"
        >
          <div className="section-shell">
            <div className="work-heading">
              <div>
                <p className="eyebrow">{t.projectsLabel}</p>
                <h2 id="work-title">
                  <Lines text={t.projectsTitle} />
                </h2>
              </div>
              <p>{t.projectsIntro}</p>
            </div>
            <div
              className="filters"
              role="group"
              aria-label={
                language === "pt" ? "Filtrar projetos" : "Filter projects"
              }
            >
              {(["all", "product", "experiment"] as const).map((key) => (
                <button
                  key={key}
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                >
                  {t[key]}
                  <span>
                    {key === "all"
                      ? projects.length
                      : projects.filter((p) => p.category === key).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="projects-grid">
              {projects
                .filter((p) => filter === "all" || filter === p.category)
                .map((project, i) => (
                  <article className="project-card" key={project.id}>
                    <button
                      className="project-art-button"
                      onClick={(e) => selectProject(project, e.currentTarget)}
                      aria-label={`${t.detail}: ${project.name}`}
                    >
                      <ProjectArt id={project.id} />
                      <span className="project-open">
                        <Icon name="external" />
                      </span>
                    </button>
                    <div className="project-description">
                      <p className="mono project-category">
                        {project.label[language]}
                      </p>
                      <div className="project-title">
                        <h3>
                          <button
                            onClick={(e) =>
                              selectProject(project, e.currentTarget)
                            }
                          >
                            {project.name}
                          </button>
                        </h3>
                        <span className="mono">0{i + 1}</span>
                      </div>
                      <p>{project.description[language]}</p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
        <section
          id="about"
          className="section-shell section-grid about-section"
          aria-labelledby="about-title"
        >
          <div className="section-heading">
            <p className="eyebrow">{t.aboutLabel}</p>
            <h2 id="about-title">
              <Lines text={t.aboutTitle} />
            </h2>
            <div className="personal-signature">
              <span className="signature-mark" aria-hidden="true">
                r/r
              </span>
              <div>
                <strong>Raphael Rocha</strong>
                <span>Belém → Buenos Aires</span>
              </div>
            </div>
          </div>
          <div className="about-content">
            <p className="about-lead">{t.aboutText}</p>
            <p>{t.aboutText2}</p>
            <p>{t.aboutText3}</p>
            <div className="about-facts">
              <p>
                <Icon name="globe" />
                {t.languages}
              </p>
              <p>
                <span aria-hidden="true">↗</span>
                {t.education}
              </p>
            </div>
            <p className="eyebrow toolkit-label">{t.toolkit}</p>
            <div className="toolkit">
              {toolkit.map((group) => (
                <div key={group[0]}>
                  <h3>
                    {group[0].includes(" / ")
                      ? group[0].split(" / ")[language === "pt" ? 0 : 1]
                      : group[0]}
                  </h3>
                  {group.slice(1).map((s) => (
                    <span key={s}>
                      {s.includes(" / ") &&
                      [
                        "Qualidade / Quality",
                        "Acessibilidade / Accessibility",
                      ].includes(s)
                        ? s.split(" / ")[language === "pt" ? 0 : 1]
                        : s}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <details className="recognition">
              <summary>
                {t.recognition}
                <Icon name="plus" />
              </summary>
              <div>
                <p>{t.award1}</p>
                <p>{t.award2}</p>
                <p>{t.volunteer}</p>
              </div>
            </details>
          </div>
        </section>
        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="section-shell">
            <p className="eyebrow">{t.contactLabel}</p>
            <div className="contact-heading">
              <h2 id="contact-title">
                <Lines text={t.contactTitle} />
              </h2>
              <span className="contact-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
            <p>{t.contactText}</p>
            <div className="email-row">
              <a href={`mailto:${links.email}`}>{links.email}</a>
              <button
                className="icon-button"
                onClick={copyEmail}
                aria-label={t.copyEmail}
              >
                <Icon name={copyState === "done" ? "check" : "copy"} />
              </button>
            </div>
            <p role="status" className="copy-status">
              {copyState === "done"
                ? t.copied
                : copyState === "failed"
                  ? t.copyFailed
                  : ""}
            </p>
            <div className="social-links">
              <External href={links.linkedin}>LinkedIn</External>
              <External href={links.github}>GitHub</External>
              <a href={links.resume} download>
                {t.resume}
                <Icon name="download" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer section-shell">
        <span>{t.footer}</span>
        <div>
          <button
            onClick={toggleMotion}
            disabled={reduced}
            title={reduced ? t.reduced : undefined}
            aria-label={reduced ? t.reduced : motion ? t.pause : t.play}
          >
            <Icon name={motion ? "pause" : "play"} />
            <span>{reduced ? t.reduced : motion ? t.pause : t.play}</span>
          </button>
          <a href="#home" aria-label={t.back}>
            ↑
          </a>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className="project-dialog"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="dialog-title"
      >
        {selected && (
          <>
            <div className="window-title">
              <span>project / {selected.id}</span>
              <button
                autoFocus
                className="icon-button"
                aria-label={t.close}
                onClick={close}
              >
                <Icon name="close" />
              </button>
            </div>
            <ProjectArt id={selected.id} />
            <div className="dialog-content">
              <p className="eyebrow">{selected.label[language]}</p>
              <h2 id="dialog-title">{selected.name}</h2>
              <p>{selected.description[language]}</p>
              <h3 className="eyebrow">{t.role}</h3>
              <p>{selected.contribution[language]}</p>
              <h3 className="eyebrow">{t.tech}</h3>
              <div className="tags">
                {selected.stack.map((s) => (
                  <span key={s}>
                    {s.includes(" / ")
                      ? s.split(" / ")[language === "pt" ? 0 : 1]
                      : s}
                  </span>
                ))}
              </div>
              <External href={selected.url} className="button primary">
                {t.open}
              </External>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
