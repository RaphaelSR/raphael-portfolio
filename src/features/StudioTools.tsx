import { useCallback, useEffect, useRef, useState } from "react";
import { copy } from "../messages";
import { links } from "../content";
import { locales, localeNames, type Locale } from "../i18n";
import { featureCopy } from "./copy";
import { Snake } from "./Snake";
import "./tools.css";
export function SnakeInvitation({ language }: { language: Locale }) {
  return (
    <button
      className="snake-invitation"
      onClick={(event) => {
        const rect = event.currentTarget
          .querySelector("svg")!
          .getBoundingClientRect();
        window.dispatchEvent(
          new CustomEvent("portfolio:snake", {
            detail: {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2 + window.scrollY,
            },
          }),
        );
      }}
    >
      <svg width="42" height="24" viewBox="0 0 42 24" aria-hidden="true">
        <path
          d="M4 16 H15 Q23 16 23 9 Q23 4 29 4 H35"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="35" cy="3" r="1" fill="white" />
      </svg>
      <span>{featureCopy[language].invite}</span>
      <span aria-hidden="true">↗</span>
    </button>
  );
}
type Panel = "commands" | "backstage" | "snake" | null;
export function StudioTools({
  language,
  setLanguage,
}: {
  language: Locale;
  setLanguage: (locale: Locale) => void;
}) {
  const t = featureCopy[language],
    page = copy[language];
  const [origin, setOrigin] = useState<{ x: number; y: number }>();
  const [panel, setPanel] = useState<Panel>(null);
  const [query, setQuery] = useState("");
  const [blueprint, setBlueprint] = useState(false);
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const search = useRef<HTMLInputElement>(null);
  const close = useCallback(() => {
    dialog.current?.close();
    setPanel(null);
  }, []);
  const open = useCallback((next: Panel) => {
    if (!dialog.current?.open)
      trigger.current = document.activeElement as HTMLElement;
    setQuery("");
    setPanel(next);
  }, []);
  useEffect(() => {
    const start = (event: Event) => {
      setOrigin((event as CustomEvent<{ x: number; y: number }>).detail);
      open("snake");
    };
    window.addEventListener("portfolio:snake", start);
    return () => window.removeEventListener("portfolio:snake", start);
  }, [open]);
  const active = panel !== null;
  useEffect(() => {
    if (!active) return;
    const modal = dialog.current;
    if (!modal?.open) modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [active]);
  useEffect(() => {
    if (panel === "commands") search.current?.focus();
    else if (panel) dialog.current?.focus();
  }, [panel]);
  useEffect(() => {
    if (blueprint) document.documentElement.dataset.blueprint = "true";
    else delete document.documentElement.dataset.blueprint;
    return () => {
      delete document.documentElement.dataset.blueprint;
    };
  }, [blueprint]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        (event.target as HTMLElement).closest(
          'input,textarea,select,[contenteditable="true"]',
        )
      )
        return;
      if (event.key === "Escape" && !document.querySelector("dialog[open]"))
        setBlueprint(false);
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        !document.querySelector("dialog[open]")
      ) {
        event.preventDefault();
        open("commands");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  const navigate = (anchor: string) => {
    close();
    requestAnimationFrame(() => {
      const element = document.getElementById(anchor);
      element?.scrollIntoView();
      if (element) {
        element.tabIndex = -1;
        element.focus({ preventScroll: true });
      }
    });
  };
  const toggleBlueprint = () => {
    setBlueprint((value) => !value);
    close();
  };
  const commands = [
    ...["home", "experience", "work", "about"].map((anchor, index) => ({
      label: page.nav[index],
      run: () => navigate(anchor),
    })),
    ...locales.map((locale) => ({
      label: localeNames[locale],
      run: () => {
        setLanguage(locale);
        close();
      },
    })),
    {
      label: page.resume,
      run: () => {
        close();
        const link = document.createElement("a");
        link.href = links.resume;
        link.download = "";
        link.click();
      },
    },
    {
      label: page.copyEmail,
      run: async () => {
        try {
          await navigator.clipboard.writeText(links.email);
          setNotice(t.copied);
        } catch {
          setNotice(t.failed);
        }
        close();
      },
    },
    { label: t.backstage, run: () => open("backstage") },
    { label: t.blueprint, run: toggleBlueprint },
    { label: t.snake, run: () => open("snake") },
  ].filter((command) =>
    command.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  return (
    <>
      <div className="studio-tools">
        <button onClick={() => open("commands")}>
          {t.commands} <kbd>⌘ / Ctrl K</kbd>
        </button>
        <button onClick={() => open("backstage")}>{t.backstage}</button>
      </div>
      {blueprint && (
        <button className="blueprint-exit" onClick={() => setBlueprint(false)}>
          {t.blueprintOff} · Esc
        </button>
      )}
      <p className="tools-notice" role="status">
        {notice}
      </p>
      <dialog
        ref={dialog}
        className={`tools-dialog ${panel === "snake" ? "is-snake" : ""}`}
        tabIndex={-1}
        aria-labelledby="tools-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (panel !== "snake" && event.target === event.currentTarget)
            close();
        }}
      >
        {panel === "snake" ? (
          <Snake language={language} close={close} origin={origin} />
        ) : (
          panel && (
            <div className="tools-content">
              <div className="tools-heading">
                <h2 id="tools-title">{t[panel]}</h2>
                <button onClick={close} aria-label={t.close}>
                  ×
                </button>
              </div>
              {panel === "commands" ? (
                <>
                  <input
                    ref={search}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t.search}
                    aria-label={t.search}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        dialog.current
                          ?.querySelector<HTMLButtonElement>("[data-command]")
                          ?.focus();
                      }
                      if (event.key === "Enter") {
                        event.preventDefault();
                        void commands[0]?.run();
                      }
                    }}
                  />
                  <div
                    className="command-list"
                    onKeyDown={(event) => {
                      if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
                      event.preventDefault();
                      const buttons = [
                        ...event.currentTarget.querySelectorAll<HTMLButtonElement>(
                          "button",
                        ),
                      ];
                      const index = buttons.indexOf(
                        document.activeElement as HTMLButtonElement,
                      );
                      buttons[
                        (index +
                          (event.key === "ArrowDown" ? 1 : -1) +
                          buttons.length) %
                          buttons.length
                      ]?.focus();
                    }}
                  >
                    {commands.map((command) => (
                      <button
                        data-command
                        key={command.label}
                        onClick={() => void command.run()}
                      >
                        {command.label}
                        <span aria-hidden="true">↵</span>
                      </button>
                    ))}
                    {!commands.length && <p>{t.empty}</p>}
                  </div>
                </>
              ) : (
                <>
                  <p>{t.intro}</p>
                  <div className="backstage-cards">
                    {t.cards.map(([title, body], index) => (
                      <article key={title}>
                        <span className="mono">0{index + 1}</span>
                        <h3>{title}</h3>
                        <p>{body}</p>
                      </article>
                    ))}
                  </div>
                  <p>{t.hint}</p>
                  <div className="tools-actions">
                    <button onClick={toggleBlueprint}>{t.blueprint}</button>
                    <button onClick={() => open("snake")}>{t.snake}</button>
                  </div>
                </>
              )}
            </div>
          )
        )}
      </dialog>
    </>
  );
}
