import type { Project } from "../content";
import type { Locale } from "../i18n";

const messages = {
  pt: { downloads: "downloads no Android", checked: "Faixa pública · consultada em", store: "Ver na App Store" },
  en: { downloads: "Android downloads", checked: "Public range · checked on", store: "View on the App Store" },
  es: { downloads: "descargas en Android", checked: "Rango público · consultado el", store: "Ver en App Store" },
};

export function AppStores({ stores, language, name }: {
  stores: NonNullable<Project["stores"]>;
  language: Locale;
  name: string;
}) {
  const t = messages[language];
  const locale = { pt: "pt-BR", en: "en-US", es: "es-ES" }[language];
  const count = new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 0 }).format(stores.androidDownloads);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(new Date(`${stores.checkedAt}T00:00:00Z`));
  return (
    <div className="app-stores">
      <div className="app-store-links">
        <a href={stores.android} target="_blank" rel="noopener noreferrer" aria-label={`${name}: ${count}+ ${t.downloads} · Google Play`}>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="m6.8 6.1-1.4-2.4.9-.5 1.5 2.5a10 10 0 0 1 8.4 0l1.5-2.5.9.5-1.4 2.4A8 8 0 0 1 21 13H3a8 8 0 0 1 3.8-6.9ZM7 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm8 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM3 15h18v3a2 2 0 0 1-2 2h-1v2h-2v-2H8v2H6v-2H5a2 2 0 0 1-2-2Z" /></svg>
          <span><strong>{count}+</strong><small>{t.downloads}</small></span>
        </a>
        <a href={stores.ios} target="_blank" rel="noopener noreferrer" aria-label={`${name}: ${t.store}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M16.7 2c.2 1.5-.5 3-1.3 3.9-.9 1-2.3 1.7-3.6 1.6-.2-1.4.5-2.9 1.4-3.8.9-1 2.4-1.7 3.5-1.7ZM20.5 17.4c-.5 1.2-.8 1.8-1.5 2.8-.9 1.3-2.1 2.9-3.6 2.9-1.3 0-1.6-.9-3.4-.9s-2.2.9-3.5.9c-1.5 0-2.6-1.5-3.5-2.8C2.5 16.6 2 11.4 3.6 9c1.1-1.7 2.9-2.7 4.6-2.7 1.4 0 2.4.9 3.5.9s2.8-1.1 4.5-1c1.4.1 2.8.8 3.7 1.9-3.3 1.9-2.8 6.6.6 8.3Z" /></svg>
          <span>iOS<small>App Store ↗</small></span>
        </a>
      </div>
      <small className="store-source">Google Play · {t.checked} <time dateTime={stores.checkedAt}>{date}</time></small>
    </div>
  );
}
