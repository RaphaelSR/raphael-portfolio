import { useEffect, useRef, useState } from "react";
import type { Locale } from "../i18n";
import { projects } from "../content";
export type PhoneApp =
  | "photos"
  | "reminders"
  | "notes"
  | "maps"
  | "calendar"
  | "health"
  | "wallet"
  | "settings"
  | "browser"
  | "messages";
const copy = {
  pt: {
    home: "Início",
    demo: "Demonstração · dados fictícios",
    photos: "Fotos",
    reminders: "Lembretes",
    notes: "Notas",
    maps: "Mapas",
    calendar: "Calendário",
    health: "Saúde",
    wallet: "Carteira",
    settings: "Ajustes",
    browser: "Navegador",
    messages: "Mensagens",
    add: "Adicionar",
    reminder: "Novo lembrete",
    note: "Uma ideia para o próximo projeto…",
    today: "Hoje",
    events: "Revisar uma ideia · 15:00",
    steps: "Passos",
    walk: "Simular caminhada",
    dark: "Aparência escura",
    airplane: "Modo avião",
    address: "Endereço do site",
    go: "Ir",
    external: "Abrir fora do telefone ↗",
    blocked: "Alguns sites só permitem abrir em nova aba.",
    invalid: "Use um endereço HTTPS válido.",
    message: "Escrever mensagem",
    send: "Enviar",
    received: "Olá! Este é um espaço para experimentar interfaces.",
    answer: "Mensagem recebida nesta demonstração.",
    back: "Voltar",
    saved: "Rascunho nesta sessão",
    gallery: "Todas as fotos",
    ticket: "Passe de visitante",
    coffee: "Cartão de café",
    place: "Praça",
    river: "Orla",
    studio: "Estúdio",
  },
  en: {
    home: "Home",
    demo: "Demo · fictional data",
    photos: "Photos",
    reminders: "Reminders",
    notes: "Notes",
    maps: "Maps",
    calendar: "Calendar",
    health: "Health",
    wallet: "Wallet",
    settings: "Settings",
    browser: "Browser",
    messages: "Messages",
    add: "Add",
    reminder: "New reminder",
    note: "An idea for the next project…",
    today: "Today",
    events: "Review an idea · 3:00 PM",
    steps: "Steps",
    walk: "Simulate a walk",
    dark: "Dark appearance",
    airplane: "Airplane mode",
    address: "Website address",
    go: "Go",
    external: "Open outside the phone ↗",
    blocked: "Some sites only allow opening in a new tab.",
    invalid: "Enter a valid HTTPS address.",
    message: "Write a message",
    send: "Send",
    received: "Hi! This is a place to explore interfaces.",
    answer: "Message received in this demo.",
    back: "Back",
    saved: "Draft for this session",
    gallery: "All photos",
    ticket: "Visitor pass",
    coffee: "Coffee card",
    place: "Square",
    river: "Waterfront",
    studio: "Studio",
  },
  es: {
    home: "Inicio",
    demo: "Demostración · datos ficticios",
    photos: "Fotos",
    reminders: "Recordatorios",
    notes: "Notas",
    maps: "Mapas",
    calendar: "Calendario",
    health: "Salud",
    wallet: "Cartera",
    settings: "Ajustes",
    browser: "Navegador",
    messages: "Mensajes",
    add: "Añadir",
    reminder: "Nuevo recordatorio",
    note: "Una idea para el próximo proyecto…",
    today: "Hoy",
    events: "Revisar una idea · 15:00",
    steps: "Pasos",
    walk: "Simular caminata",
    dark: "Apariencia oscura",
    airplane: "Modo avión",
    address: "Dirección del sitio",
    go: "Ir",
    external: "Abrir fuera del teléfono ↗",
    blocked: "Algunos sitios solo permiten abrir en otra pestaña.",
    invalid: "Introduce una dirección HTTPS válida.",
    message: "Escribir mensaje",
    send: "Enviar",
    received: "¡Hola! Este es un espacio para explorar interfaces.",
    answer: "Mensaje recibido en esta demostración.",
    back: "Volver",
    saved: "Borrador de esta sesión",
    gallery: "Todas las fotos",
    ticket: "Pase de visitante",
    coffee: "Tarjeta de café",
    place: "Plaza",
    river: "Costanera",
    studio: "Estudio",
  },
};
export function PhoneApps({
  app,
  language,
  close,
  dark,
  setDark,
  airplane,
  setAirplane,
}: {
  app: PhoneApp | null;
  language: Locale;
  close: () => void;
  dark: boolean;
  setDark: (value: boolean) => void;
  airplane: boolean;
  setAirplane: (value: boolean) => void;
}) {
  const t = copy[language];
  const [photo, setPhoto] = useState<number | null>(null);
  const [reminders, setReminders] = useState([
    { id: 1, text: "", done: false },
    { id: 2, text: "", done: true },
  ]);
  const [newReminder, setNewReminder] = useState("");
  const [note, setNote] = useState("");
  const [day, setDay] = useState(7);
  const [steps, setSteps] = useState(4200);
  const [card, setCard] = useState(0);
  const back = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (app) back.current?.focus({ preventScroll: true });
  }, [app]);
  const [place, setPlace] = useState(0);
  const [address, setAddress] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  if (!app) return null;
  const openUrl = (value: string) => {
    try {
      const parsed = new URL(value.includes(":") ? value : `https://${value}`);
      if (parsed.protocol !== "https:") throw new Error();
      setUrl(parsed.href);
      setAddress(parsed.href);
      setError("");
    } catch {
      setError(t.invalid);
    }
  };
  return (
    <div className="phone-app-window" data-dark={dark}>
      <div className="phone-app-toolbar">
        <button ref={back} onClick={close} aria-label={t.home}>
          ‹
        </button>
        <h4>{t[app]}</h4>
        <span>●</span>
      </div>
      <div className="phone-app-content">
        {app === "photos" && (
          <>
            <p>{t.gallery}</p>
            {photo === null ? (
              <div className="mock-gallery">
                {Array.from({ length: 6 }, (_, i) => (
                  <button
                    key={i}
                    className={`mock-photo photo-${i}`}
                    aria-label={`${t.photos} ${i + 1}`}
                    onClick={() => setPhoto(i)}
                  >
                    {i === 0 && (
                      <img
                        src={`${import.meta.env.BASE_URL}raphael-avatar.jpg`}
                        alt="Raphael"
                      />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button onClick={() => setPhoto(null)}>‹ {t.back}</button>
                <div className={`mock-photo mock-photo-large photo-${photo}`}>
                  {photo === 0 && (
                    <img
                      src={`${import.meta.env.BASE_URL}raphael-avatar.jpg`}
                      alt="Raphael"
                    />
                  )}
                </div>
              </>
            )}
          </>
        )}
        {app === "reminders" && (
          <>
            <div className="mock-reminders">
              {reminders.map((item) => (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() =>
                      setReminders((items) =>
                        items.map((r) =>
                          r.id === item.id ? { ...r, done: !r.done } : r,
                        ),
                      )
                    }
                  />
                  <span
                    style={{
                      textDecoration: item.done ? "line-through" : undefined,
                    }}
                  >
                    {item.text ||
                      {
                        pt: ["Revisar uma ideia", "Fazer uma pausa"],
                        en: ["Review an idea", "Take a break"],
                        es: ["Revisar una idea", "Hacer una pausa"],
                      }[language][item.id - 1]}
                  </span>
                </label>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newReminder.trim()) {
                  setReminders((items) => [
                    ...items,
                    {
                      id: Math.max(0, ...items.map((item) => item.id)) + 1,
                      text: newReminder.trim(),
                      done: false,
                    },
                  ]);
                  setNewReminder("");
                }
              }}
            >
              <input
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                placeholder={t.reminder}
                aria-label={t.reminder}
                maxLength={100}
              />
              <button>{t.add}</button>
            </form>
          </>
        )}
        {app === "notes" && (
          <>
            <p>{t.saved}</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.note}
              aria-label={t.notes}
              maxLength={3000}
            />
          </>
        )}
        {app === "calendar" && (
          <>
            <div className="mock-calendar">
              {Array.from({ length: 30 }, (_, i) => (
                <button
                  key={i}
                  aria-pressed={day === i + 1}
                  onClick={() => setDay(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="mock-event">
              <strong>{day}</strong>
              <p>{day === 7 ? t.events : "—"}</p>
            </div>
          </>
        )}
        {app === "maps" && (
          <>
            <div className="mock-map">
              <div className="mock-map-river" />
              {[t.place, t.river, t.studio].map((name, i) => (
                <button
                  key={name}
                  className={`mock-map-pin pin-${i}`}
                  aria-label={name}
                  aria-pressed={place === i}
                  onClick={() => setPlace(i)}
                >
                  ●
                </button>
              ))}
            </div>
            <h5>{[t.place, t.river, t.studio][place]}</h5>
            <div className="mock-place-list">
              {[t.place, t.river, t.studio].map((name, i) => (
                <button key={name} onClick={() => setPlace(i)}>
                  {name}
                </button>
              ))}
            </div>
          </>
        )}
        {app === "health" && (
          <>
            <div className="mock-health">
              <span>♡</span>
              <strong>{steps.toLocaleString(language)}</strong>
              <p>{t.steps}</p>
              <progress value={Math.min(steps, 10000)} max={10000} />
            </div>
            <button onClick={() => setSteps((v) => v + 500)}>
              {t.walk} +500
            </button>
          </>
        )}
        {app === "wallet" && (
          <>
            <div className={`mock-wallet card-${card}`}>
              <span>R / R</span>
              <h5>{card === 0 ? t.ticket : t.coffee}</h5>
              <div className="mock-wallet-code" />
              <small>DEMO · 007</small>
            </div>
            <div className="mock-place-list">
              <button onClick={() => setCard(0)}>{t.ticket}</button>
              <button onClick={() => setCard(1)}>{t.coffee}</button>
            </div>
          </>
        )}
        {app === "settings" && (
          <div className="mock-settings">
            <label>
              <span>{t.dark}</span>
              <input
                type="checkbox"
                role="switch"
                checked={dark}
                onChange={(e) => setDark(e.target.checked)}
              />
            </label>
            <label>
              <span>{t.airplane}</span>
              <input
                type="checkbox"
                role="switch"
                checked={airplane}
                onChange={(e) => setAirplane(e.target.checked)}
              />
            </label>
          </div>
        )}
        {app === "browser" && (
          <>
            <form
              className="mock-address"
              onSubmit={(e) => {
                e.preventDefault();
                openUrl(address);
              }}
            >
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="https://"
                aria-label={t.address}
              />
              <button>{t.go}</button>
            </form>
            {error && <p role="alert">{error}</p>}
            {url ? (
              <>
                <a
                  className="mock-browser-external"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.external}
                </a>
                <iframe
                  src={url}
                  title={t.browser}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  referrerPolicy="no-referrer"
                />
                <p>{t.blocked}</p>
              </>
            ) : (
              <div className="mock-bookmarks">
                {projects
                  .filter((p) => p.category === "experiment")
                  .map((project) => (
                    <button
                      key={project.id}
                      onClick={() => openUrl(project.url)}
                    >
                      {project.name} ↗
                    </button>
                  ))}
              </div>
            )}
          </>
        )}
        {app === "messages" && (
          <>
            <div className="mock-messages">
              <p>{t.received}</p>
              {messages.map((message, i) => (
                <div key={i}>
                  <p className="mock-message-sent">{message}</p>
                  <p>{t.answer}</p>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (draft.trim()) {
                  setMessages((items) => [...items, draft.trim()]);
                  setDraft("");
                }
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t.message}
                aria-label={t.message}
                maxLength={200}
              />
              <button>{t.send}</button>
            </form>
          </>
        )}
      </div>
      <p className="phone-app-demo">{t.demo}</p>
    </div>
  );
}
