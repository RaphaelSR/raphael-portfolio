import { renderToString } from "react-dom/server";
import App from "./App";
import { copy } from "./messages";
import { documentLanguages, locales, type Locale } from "./i18n";
import { links } from "./content";
const origin = "https://raphaelsr.github.io";
const base = import.meta.env.BASE_URL;
export function renderPage(template: string, locale: Locale, root = false) {
  const canonical = `${origin}${base}${locale}/`;
  const structured = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonical,
    inLanguage: documentLanguages[locale],
    mainEntity: {
      "@type": "Person",
      name: "Raphael Rocha",
      jobTitle: "Senior Mobile Engineer",
      url: `${origin}${base}en/`,
      sameAs: [links.github, links.linkedin],
      knowsLanguage: ["Portuguese", "English", "Spanish"],
      knowsAbout: [
        "React Native",
        "Expo",
        "TypeScript",
        "Mobile development",
        "Full-stack development",
        "NestJS",
      ],
    },
  };
  const alternates = locales
    .map(
      (lang) =>
        `<link rel="alternate" hreflang="${lang}" href="${origin}${base}${lang}/" />`,
    )
    .join("\n");
  return template
    .replace(
      '<html lang="en">',
      `<html lang="${documentLanguages[locale]}" data-locale="${locale}" data-root="${root}">`,
    )
    .replace(
      /(<meta name="description" content=")[^"]*("\s*\/>)/,
      `$1${copy[locale].intro}$2`,
    )
    .replace(
      "</head>",
      `<link rel="canonical" href="${canonical}" />\n${alternates}\n<link rel="alternate" hreflang="x-default" href="${origin}${base}" />\n<script type="application/ld+json">${JSON.stringify(structured).replaceAll("<", "\\u003c")}</script>\n</head>`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(<App initialLocale={locale} />)}</div>`,
    );
}
