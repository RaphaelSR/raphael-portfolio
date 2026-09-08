import { useState } from "react";
import type { Locale } from "../../i18n";
import { projects } from "../../content";
import { AppTitle, words } from "./ui";

const bookmarks = projects.filter((project) => project.category !== "product");

function embedPolicy(url: string, parentOrigin: string) {
  const owned = bookmarks.some((project) => new URL(project.url).href === url);
  // Storage-enabled embeds are limited to known projects on a different origin.
  // On GitHub Pages, sibling projects share our origin and must open separately.
  if (owned && new URL(url).origin === parentOrigin) return "external";
  return owned ? "allow-scripts allow-same-origin" : "allow-scripts";
}

export function Browser({
  language,
  active,
  offline,
}: {
  language: Locale;
  active: boolean;
  offline: boolean;
}) {
  const w = (pt: string, en: string, es: string) => words(language, pt, en, es);
  const [address, setAddress] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const title = w("Navegador", "Browser", "Navegador");
  const policy =
    url && typeof window !== "undefined"
      ? embedPolicy(url, window.location.origin)
      : "allow-scripts";
  const open = (value: string) => {
    try {
      const parsed = new URL(value.includes(":") ? value : `https://${value}`);
      if (parsed.protocol !== "https:" || parsed.username || parsed.password)
        throw new Error();
      setUrl(parsed.href);
      setAddress(parsed.href);
      setError(false);
    } catch {
      setError(true);
    }
  };
  if (offline)
    return (
      <p role="status">
        {w(
          "Sem conexão. Ative o Wi-Fi e desative o modo avião nos Ajustes para navegar.",
          "No connection. Enable Wi-Fi and turn off airplane mode in Settings to browse.",
          "Sin conexión. Activa el Wi-Fi y desactiva el modo avión en Ajustes para navegar.",
        )}
      </p>
    );
  return (
    <>
      <form
        className="mock-address"
        onSubmit={(e) => {
          e.preventDefault();
          open(address);
        }}
      >
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="https://"
          aria-label={w(
            "Endereço do site",
            "Website address",
            "Dirección del sitio",
          )}
          maxLength={2048}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
        <button>{w("Ir", "Go", "Ir")}</button>
      </form>
      {error && (
        <p role="alert">
          {w(
            "Use um endereço HTTPS válido.",
            "Enter a valid HTTPS address.",
            "Introduce una dirección HTTPS válida.",
          )}
        </p>
      )}
      {url ? (
        <>
          <button
            className="ios-link-button"
            onClick={() => {
              setUrl("");
              setAddress("");
              setError(false);
            }}
          >
            {w(
              "Voltar aos favoritos",
              "Back to favorites",
              "Volver a favoritos",
            )}
          </button>
          {policy === "external" && (
            <div className="ios-browser-full-site">
              <AppTitle
                title={
                  bookmarks.find((project) => new URL(project.url).href === url)
                    ?.name ?? title
                }
              />
              <p>
                {w(
                  "Abra a experiência completa em uma nova aba.",
                  "Open the full experience in a new tab.",
                  "Abre la experiencia completa en una nueva pestaña.",
                )}
              </p>
            </div>
          )}
          <a
            className="mock-browser-external"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {w(
              "Abrir fora do telefone ↗",
              "Open outside the phone ↗",
              "Abrir fuera del teléfono ↗",
            )}
          </a>
          {active && policy !== "external" && (
            <iframe
              key={`${url}-${policy}`}
              src={url}
              title={title}
              sandbox={policy}
              referrerPolicy="no-referrer"
            />
          )}
          {policy !== "external" && (
            <p>
              {w(
                "Alguns sites só permitem abrir em nova aba.",
                "Some sites only allow opening in a new tab.",
                "Algunos sitios solo permiten abrir en otra pestaña.",
              )}
            </p>
          )}
        </>
      ) : (
        <>
          <AppTitle
            title={w("Favoritos", "Favorites", "Favoritos")}
            subtitle={w("Feitos por mim", "Made by me", "Hechos por mí")}
          />
          <div className="mock-bookmarks">
            {bookmarks.map((project) => (
              <button key={project.id} onClick={() => open(project.url)}>
                <span
                  className={`ios-bookmark-icon bookmark-${project.id}`}
                  aria-hidden="true"
                >
                  {project.name.slice(0, 1)}
                </span>
                {project.name}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
