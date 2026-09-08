import { useState } from "react";
import type { Locale } from "../../i18n";
import { AppTitle, words } from "./ui";

type Note = { id: number; title: string; body: string };
export function Notes({ language }: { language: Locale }) {
  const w = (pt: string, en: string, es: string) => words(language, pt, en, es);
  const seeds: Note[] = [
    {
      id: 1,
      title: "Jiu-jitsu",
      body: w(
        "Faixa marrom.\n\nUm espaço fora das telas, no tatame. Jiu-jitsu e academia fazem parte dos meus hobbies.",
        "Brown belt.\n\nTime away from screens, on the mat. Jiu-jitsu and the gym are part of my life outside work.",
        "Cinturón marrón.\n\nUn espacio lejos de las pantallas, en el tatami. Jiu-jitsu y gimnasio son parte de mis hobbies.",
      ),
    },
    {
      id: 2,
      title: w("Ideias de produto", "Product ideas", "Ideas de producto"),
      body: w(
        "Apps úteis, interfaces simples.\n\nModPro AI: tecnologia próxima da operação.\nMímica: um grupo inteiro jogando com um celular.\nSnake: um clássico que escapa dos limites.",
        "Useful apps, simple interfaces.\n\nModPro AI: technology close to operations.\nMímica: a whole group playing with one phone.\nSnake: a classic that escapes its boundaries.",
        "Apps útiles, interfaces simples.\n\nModPro AI: tecnología cerca de la operación.\nMímica: un grupo entero jugando con un celular.\nSnake: un clásico que escapa de sus límites.",
      ),
    },
    {
      id: 3,
      title: w("Rascunho livre", "Scratchpad", "Borrador libre"),
      body: "",
    },
  ];
  const [edits, setEdits] = useState<Record<number, Note>>({});
  const [extra, setExtra] = useState<Note[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const notes = [...seeds, ...extra].map((n) => edits[n.id] ?? n);
  const note = notes.find((n) => n.id === active);
  const update = (patch: Partial<Note>) => {
    if (note) setEdits((old) => ({ ...old, [note.id]: { ...note, ...patch } }));
  };
  const title = w("Notas", "Notes", "Notas");
  return (
    <div className="ios-notes">
      {note ? (
        <>
          <div className="ios-actions">
            <button onClick={() => setActive(null)}>‹ {title}</button>
            <span>{w("Nesta sessão", "This session", "En esta sesión")}</span>
          </div>
          <input
            className="ios-note-title"
            aria-label={w("Título da nota", "Note title", "Título de la nota")}
            value={note.title}
            maxLength={80}
            onChange={(e) => update({ title: e.target.value })}
          />
          <textarea
            aria-label={title}
            value={note.body}
            maxLength={3000}
            placeholder={w(
              "Escreva uma ideia…",
              "Write an idea…",
              "Escribe una idea…",
            )}
            onChange={(e) => update({ body: e.target.value })}
          />
          <p className="ios-caption">
            {w(
              "Salvo neste telefone até recarregar a página.",
              "Kept in this phone until the page reloads.",
              "Guardado en este teléfono hasta recargar la página.",
            )}
          </p>
        </>
      ) : (
        <>
          <AppTitle
            title={title}
            subtitle={w("No meu telefone", "On my phone", "En mi teléfono")}
          />
          <input
            type="search"
            className="ios-search"
            aria-label={w("Buscar notas", "Search notes", "Buscar notas")}
            placeholder={w("Buscar", "Search", "Buscar")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="ios-note-list">
            {notes
              .filter((n) =>
                `${n.title} ${n.body}`
                  .toLocaleLowerCase(language)
                  .includes(search.toLocaleLowerCase(language)),
              )
              .map((n) => (
                <button key={n.id} onClick={() => setActive(n.id)}>
                  <strong>
                    {n.title || w("Sem título", "Untitled", "Sin título")}
                  </strong>
                  <span>
                    {n.body.split("\n")[0] ||
                      w(
                        "Toque para escrever",
                        "Tap to write",
                        "Toca para escribir",
                      )}
                  </span>
                  <small>
                    {n.id === 1
                      ? "#jiujitsu"
                      : n.id === 2
                        ? "#product"
                        : "#ideas"}
                  </small>
                </button>
              ))}
          </div>
          <button
            className="ios-new-note"
            disabled={extra.length >= 20}
            onClick={() => {
              const n = {
                id: extra.length + 4,
                title: w("Nova nota", "New note", "Nueva nota"),
                body: "",
              };
              setExtra((old) => [...old, n]);
              setActive(n.id);
            }}
          >
            ＋ {w("Nova nota", "New note", "Nueva nota")}
          </button>
        </>
      )}
    </div>
  );
}
