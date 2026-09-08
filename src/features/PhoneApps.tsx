import { useEffect, useRef, useState } from "react";
import type { Locale } from "../i18n";
import { PhoneSettings, type PhonePreferences } from "./PhoneSettings";
import { Browser } from "./phone-apps/Browser";
import { Notes } from "./phone-apps/Notes";
import { Health } from "./phone-apps/Health";
import { Maps } from "./phone-apps/Maps";
import { Wallet } from "./phone-apps/Wallet";
import { Photos } from "./phone-apps/Photos";
import { AppTitle, ProfileRow, words } from "./phone-apps/ui";
import "./phone-apps/apps.css";
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
  | "messages"
  | "search";
const copy = {
  pt: {
    search: "Buscar apps",
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
    today: "Hoje",
    message: "Escrever mensagem",
    send: "Enviar",
    received: "Olá! Este é um espaço para experimentar interfaces.",
    answer: "Mensagem recebida nesta demonstração.",
  },
  en: {
    search: "Search apps",
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
    today: "Today",
    message: "Write a message",
    send: "Send",
    received: "Hi! This is a place to explore interfaces.",
    answer: "Message received in this demo.",
  },
  es: {
    search: "Buscar apps",
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
    today: "Hoy",
    message: "Escribir mensaje",
    send: "Enviar",
    received: "¡Hola! Este es un espacio para explorar interfaces.",
    answer: "Mensaje recibido en esta demostración.",
  },
};
export function PhoneApps({
  app,
  language,
  close,
  settings,
  changeSettings,
  now,
  openApp,
}: {
  app: PhoneApp | null;
  language: Locale;
  close: () => void;
  settings: PhonePreferences;
  changeSettings: (patch: Partial<PhonePreferences>) => void;
  now: Date | null;
  openApp: (app: PhoneApp) => void;
}) {
  const t = copy[language];
  const w = (pt: string, en: string, es: string) => words(language, pt, en, es);
  const [appSearch, setAppSearch] = useState("");
  const [reminderFilter, setReminderFilter] = useState("all");
  const [reminders, setReminders] = useState([
    { id: 1, text: "", done: false },
    { id: 2, text: "", done: true },
  ]);
  const [newReminder, setNewReminder] = useState("");

  const [selectedDay, setDay] = useState<{ month: string; day: number } | null>(
    null,
  );
  const [monthOffset, setMonthOffset] = useState(0);
  const [eventDraft, setEventDraft] = useState("");
  const [events, setEvents] = useState<Record<string, string[]>>({});
  const calendarDate = now
    ? new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
    : null;
  const month = calendarDate
    ? `${calendarDate.getFullYear()}-${calendarDate.getMonth()}`
    : "";
  const day =
    selectedDay?.month === month
      ? selectedDay.day
      : monthOffset === 0
        ? now?.getDate()
        : 1;
  const days = calendarDate
    ? new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() + 1,
        0,
      ).getDate()
    : 0;
  const firstWeekday = calendarDate ? calendarDate.getDay() : 0;

  const back = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (app) {
      if (content.current) content.current.scrollTop = 0;
      back.current?.focus({ preventScroll: true });
    }
  }, [app]);

  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <div
      className="phone-app-window"
      data-dark={settings.dark}
      data-app={app}
      hidden={!app}
    >
      <div className="phone-app-toolbar">
        <button ref={back} onClick={close} aria-label={t.home}>
          ‹
        </button>
        <h4>{app ? t[app] : ""}</h4>
        <span aria-hidden="true">●</span>
      </div>
      <div className="phone-app-content" ref={content}>
        <section hidden={app !== "photos"}>
          <Photos language={language} />
        </section>
        <section hidden={app !== "notes"}>
          <Notes language={language} />
        </section>
        <section hidden={app !== "health"}>
          <Health language={language} />
        </section>
        <section hidden={app !== "maps"}>
          <Maps language={language} />
        </section>
        <section hidden={app !== "wallet"}>
          <Wallet language={language} />
        </section>
        {app === "search" && (
          <>
            <AppTitle title={t.search} />
            <input
              className="ios-search"
              type="search"
              aria-label={t.search}
              value={appSearch}
              onChange={(e) => setAppSearch(e.target.value)}
              placeholder={t.search}
            />
            <div className="ios-app-results">
              {(
                [
                  "photos",
                  "notes",
                  "reminders",
                  "health",
                  "maps",
                  "calendar",
                  "wallet",
                  "settings",
                  "browser",
                  "messages",
                ] as const
              )
                .filter((key) =>
                  t[key]
                    .toLocaleLowerCase(language)
                    .includes(appSearch.toLocaleLowerCase(language)),
                )
                .map((key) => (
                  <button key={key} onClick={() => openApp(key)}>
                    <span className={`ios-search-icon icon-${key}`}>
                      {t[key][0]}
                    </span>
                    {t[key]}
                    <span>›</span>
                  </button>
                ))}
            </div>
          </>
        )}
        {app === "reminders" && (
          <>
            <AppTitle title={t.reminders} />
            <div className="ios-reminder-summary">
              {[
                ["all", w("Todos", "All", "Todos"), reminders.length, "☷"],
                [
                  "open",
                  w("Pendentes", "Pending", "Pendientes"),
                  reminders.filter((r) => !r.done).length,
                  "◷",
                ],
                [
                  "done",
                  w("Concluídos", "Completed", "Completados"),
                  reminders.filter((r) => r.done).length,
                  "✓",
                ],
              ].map(([key, label, count, icon]) => (
                <button
                  key={key}
                  aria-pressed={reminderFilter === key}
                  onClick={() => setReminderFilter(String(key))}
                >
                  <span>{icon}</span>
                  <strong>{count}</strong>
                  <small>{label}</small>
                </button>
              ))}
            </div>
            <h5>{w("Pessoal", "Personal", "Personal")}</h5>
            <div className="mock-reminders">
              {reminders
                .filter(
                  (item) =>
                    reminderFilter === "all" ||
                    item.done === (reminderFilter === "done"),
                )
                .map((item) => (
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
                          pt: ["Separar o kimono", "Uma pausa das telas"],
                          en: ["Pack the gi", "A break from screens"],
                          es: [
                            "Preparar el kimono",
                            "Una pausa de las pantallas",
                          ],
                        }[language][item.id - 1]}
                    </span>
                  </label>
                ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newReminder.trim() && reminders.length < 50) {
                  setReminderFilter("all");
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
              <button disabled={reminders.length >= 50}>{t.add}</button>
            </form>
          </>
        )}
        {app === "calendar" && (
          <>
            <p className="mock-calendar-month ios-calendar-title">
              {calendarDate?.toLocaleDateString(language, {
                month: "long",
                year: "numeric",
              }) ?? "—"}
            </p>
            <div className="ios-actions">
              <button
                aria-label={w("Mês anterior", "Previous month", "Mes anterior")}
                onClick={() => setMonthOffset((v) => v - 1)}
              >
                ‹
              </button>
              <button
                onClick={() => {
                  setMonthOffset(0);
                  setDay(null);
                }}
              >
                {t.today}
              </button>
              <button
                aria-label={w("Próximo mês", "Next month", "Próximo mes")}
                onClick={() => setMonthOffset((v) => v + 1)}
              >
                ›
              </button>
            </div>
            <div className="mock-calendar">
              {Array.from({ length: 7 }, (_, i) => (
                <span key={`weekday-${i}`} className="mock-calendar-weekday">
                  {new Date(2023, 0, i + 1).toLocaleDateString(language, {
                    weekday: "narrow",
                  })}
                </span>
              ))}
              {Array.from({ length: firstWeekday }, (_, i) => (
                <span key={`blank-${i}`} aria-hidden="true" />
              ))}
              {Array.from({ length: days }, (_, i) => (
                <button
                  key={i}
                  aria-pressed={day === i + 1}
                  onClick={() => setDay({ month, day: i + 1 })}
                  aria-current={
                    monthOffset === 0 && now?.getDate() === i + 1
                      ? "date"
                      : undefined
                  }
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="mock-event">
              <strong>{day}</strong>
              <p>
                {monthOffset === 0 && day === now?.getDate()
                  ? t.today
                  : w("Dia selecionado", "Selected day", "Día seleccionado")}
              </p>
              <span>
                {w(
                  "Agenda demonstrativa",
                  "Demo schedule",
                  "Agenda de ejemplo",
                )}
              </span>
              {(events[`${month}-${day}`] ?? []).map((event, i) => (
                <p className="ios-calendar-event" key={i}>
                  {event}
                </p>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const key = `${month}-${day}`;
                if (
                  day &&
                  eventDraft.trim() &&
                  (events[key]?.length ?? 0) < 10
                ) {
                  setEvents((old) => ({
                    ...old,
                    [key]: [...(old[key] ?? []), eventDraft.trim()],
                  }));
                  setEventDraft("");
                }
              }}
            >
              <input
                aria-label={w("Novo evento", "New event", "Nuevo evento")}
                placeholder={w("Novo evento", "New event", "Nuevo evento")}
                maxLength={80}
                value={eventDraft}
                onChange={(e) => setEventDraft(e.target.value)}
              />
              <button
                disabled={
                  !day || (events[`${month}-${day}`]?.length ?? 0) >= 10
                }
              >
                {t.add}
              </button>
            </form>
          </>
        )}
        {app === "settings" && (
          <>
            <AppTitle title={t.settings} />
            <ProfileRow
              subtitle={w(
                "Meu telefone · demonstração",
                "My phone · demo",
                "Mi teléfono · demostración",
              )}
            />
            <PhoneSettings
              language={language}
              settings={settings}
              change={changeSettings}
            />
          </>
        )}
        <section hidden={app !== "browser"}>
          <Browser
            language={language}
            active={app === "browser"}
            offline={settings.airplane || !settings.wifi}
          />
        </section>
        {app === "messages" && (
          <>
            <div className="ios-chat-contact">
              <span>R</span>
              <strong>Raphael</strong>
              <small>
                {w(
                  "Conversa demonstrativa",
                  "Demo conversation",
                  "Conversación de ejemplo",
                )}
              </small>
            </div>
            <div className="mock-messages" role="log" aria-label={t.messages}>
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
                if (draft.trim() && messages.length < 30) {
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
              <button disabled={messages.length >= 30}>{t.send}</button>
            </form>
          </>
        )}
      </div>
      <p className="phone-app-demo">{t.demo}</p>
    </div>
  );
}
