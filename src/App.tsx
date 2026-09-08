import { AppStores } from "./components/AppStores";
import { toolSites } from "./tool-sites";
import { StudioTools } from "./features/StudioTools";
import { PhoneSimulator } from "./features/PhoneSimulator";
import { Portrait } from "./components/Portrait";
import { ExperienceRow } from "./components/ExperienceRow";
import { useActiveSection, usePageMotion } from "./hooks/usePageMotion";
import { copy } from "./messages";
import { isLocale, localeNames, locales, localize, type Locale } from "./i18n";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { experience, links, projects, toolkit, type Project } from "./content";
import { usePreferences } from "./hooks/usePreferences";
import { Icon } from "./components/Icon";
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
export default function App({
  initialLocale = "en",
}: {
  initialLocale?: Locale;
}) {
  const { language, setLanguage, motion, toggleMotion, reduced } =
    usePreferences(initialLocale);
  const t = copy[language];
  const activeSection = useActiveSection();
  usePageMotion(motion);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<"all" | Project["category"]>("product");
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
      if (
        e.key === "Escape" &&
        menu &&
        !document.querySelector("dialog[open]")
      ) {
        setMenu(false);
        menuRef.current?.focus();
      }
    };
    const onPointer = (event: globalThis.PointerEvent) => {
      if (
        menu &&
        event.target instanceof Node &&
        !menuRef.current?.closest("header")?.contains(event.target)
      )
        setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
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
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header
        className="header"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setMenu(false);
        }}
      >
        <div className="header-inner">
          <div className="wordmark">
            <Portrait motion={motion} language={language} />
            <a href="#home" aria-label={`Raphael Rocha — ${t.home}`}>
              Raphael Rocha
              <span className="wordmark-sub">SOFTWARE ENGINEER</span>
            </a>
          </div>
          <nav
            className={menu ? "nav is-open" : "nav"}
            aria-label={t.navigation}
            id="main-nav"
          >
            {t.nav.map((label, i) => (
              <a
                href={`#${anchors[i]}`}
                aria-current={
                  activeSection === anchors[i] ? "location" : undefined
                }
                key={label}
                onClick={() => setMenu(false)}
              >
                <span className="nav-index">0{i}</span>
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="nav-contact"
              onClick={() => setMenu(false)}
              aria-current={
                activeSection === "contact" ? "location" : undefined
              }
            >
              <span className="nav-index">04</span>
              {t.contact}
            </a>
          </nav>
          <div className="header-actions">
            <select
              className="language-button"
              value={language}
              aria-label={t.languageLabel}
              onChange={(event) => {
                if (isLocale(event.target.value))
                  setLanguage(event.target.value);
              }}
            >
              {locales.map((locale) => (
                <option key={locale} value={locale} lang={locale}>
                  {localeNames[locale]}
                </option>
              ))}
            </select>
            <a href="#contact" className="contact-nav">
              {t.contact}
              <Icon name="external" />
            </a>
            <button
              ref={menuRef}
              className="menu-toggle icon-button"
              onClick={() => {
                setMenu((v) => !v);
                if (!menu)
                  requestAnimationFrame(() =>
                    document
                      .querySelector<HTMLAnchorElement>("#main-nav a")
                      ?.focus(),
                  );
              }}
              aria-expanded={menu}
              aria-controls="main-nav"
              aria-label={menu ? t.closeMenu : t.openMenu}
            >
              <Icon name={menu ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
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
            <div className="hero-actions">
              <a className="button primary" href="#work">
                {t.workCta}
                <Icon name="arrow" />
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
          <aside className="focus-panel" aria-label={t.focusLabel}>
            <p className="eyebrow">{t.focusLabel}</p>
            {t.focus.map((item, index) => (
              <div className="focus-item" key={index}>
                <span className="mono">0{index + 1}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </aside>
        </section>
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
          </div>
          <div className="experience-list">
            {experience.slice(0, 6).map((item, index) => (
              <ExperienceRow
                key={item.company}
                item={item}
                language={language}
                current={index === 0}
              />
            ))}
            <details className="earlier">
              <summary>
                {t.earlier}
                <Icon name="chevron" />
              </summary>
              {experience.slice(6).map((item) => (
                <ExperienceRow
                  key={item.company}
                  item={item}
                  language={language}
                />
              ))}
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
            <div className="filters" role="group" aria-label={t.filterProjects}>
              {(["product", "experiment", "game", "all"] as const).map(
                (key) => (
                  <button
                    key={key}
                    aria-pressed={filter === key}
                    aria-controls="project-list"
                    onClick={() => setFilter(key)}
                  >
                    {t[key]}
                    <span>
                      {key === "all"
                        ? projects.length
                        : projects.filter((p) => p.category === key).length}
                    </span>
                  </button>
                ),
              )}
            </div>
            <div className="projects-grid" id="project-list">
              {projects.map((project) => (
                <article
                  className="project-card"
                  key={project.id}
                  hidden={filter !== "all" && filter !== project.category}
                >
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
                          aria-label={`${t.detail}: ${project.name}`}
                        >
                          {project.name}
                          <Icon name="plus" />
                        </button>
                      </h3>
                    </div>
                    <p className="project-summary">
                      {project.description[language]}
                    </p>
                    <p className="project-contribution">
                      <span className="eyebrow">{t.role}</span>
                      {project.contribution[language]}
                    </p>
                    <div className="tags">
                      {project.stack.map((tag) => (
                        <span key={localize(tag, language)}>
                          {localize(tag, language)}
                        </span>
                      ))}
                    </div>
                    {project.stores && <AppStores stores={project.stores} language={language} name={project.name} />}
                    <External href={project.url} className="inline-link">
                      {t.open}
                    </External>
                  </div>
                </article>
              ))}
            </div>
            {(filter === "all" || filter === "game") && (
              <PhoneSimulator language={language} />
            )}
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
            <details className="toolkit-disclosure">
              <summary>
                {t.toolkit}
                <Icon name="plus" />
              </summary>
              <p className="toolkit-intro">{t.toolkitIntro}</p>
              <div className="toolkit">
                {toolkit.map((group) => (
                  <div key={localize(group.title, language)}>
                    <h3>{localize(group.title, language)}</h3>
                    {group.items.map((item) => (
                      <a
                        key={item}
                        href={toolSites[item]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item}
                        <span aria-hidden="true" className="tool-external">
                          ↗
                        </span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </details>
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
        <nav className="footer-languages" aria-label={t.languageLabel}>
          {locales.map((locale) => (
            <a
              key={locale}
              href={`${import.meta.env.BASE_URL}${locale}/`}
              lang={locale}
              hrefLang={locale}
              aria-current={locale === language ? "page" : undefined}
            >
              {localeNames[locale]}
            </a>
          ))}
        </nav>
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
      <StudioTools language={language} setLanguage={setLanguage} />
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
            <div className="dialog-header">
              <span>{selected.name}</span>
              <button
                autoFocus
                className="icon-button"
                aria-label={t.close}
                onClick={close}
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="dialog-content">
              <p className="eyebrow">{selected.label[language]}</p>
              <h2 id="dialog-title">{selected.name}</h2>
              <p>{selected.description[language]}</p>
              <h3 className="eyebrow">{t.role}</h3>
              <p>{selected.contribution[language]}</p>
              <h3 className="eyebrow">{t.tech}</h3>
              <div className="tags">
                {selected.stack.map((s) => (
                  <span key={localize(s, language)}>
                    {localize(s, language)}
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
