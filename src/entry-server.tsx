import { renderToString } from "react-dom/server";
import App from "./App";
import { seo, structuredData } from "./seo";
import { documentLanguages, locales, type Locale } from "./i18n";
const origin = "https://portfolio.raphaelrocha.com";
const base = import.meta.env.BASE_URL;
export function renderPage(template: string, locale: Locale, root = false) {
  const { title, description, socialLocale } = seo[locale];
  const escape = (text: string) =>
    text
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;");
  const canonical = `${origin}${base}${locale}/`;
  const structured = structuredData(locale);
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
      "<!-- SEO -->",
      `<title>${escape(title)}</title>
      <meta name="description" content="${escape(description)}" />
      <meta property="og:title" content="${escape(title)}" />
      <meta property="og:description" content="${escape(description)}" />
      <meta property="og:type" content="profile" />
      <meta property="og:site_name" content="Raphael Rocha — Portfolio" />
      <meta property="og:url" content="${canonical}" />
      <meta property="og:locale" content="${socialLocale}" />
      <meta property="og:image" content="${origin}${base}social-card.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Raphael Rocha — Mobile, Full Stack, AI" />
      <meta name="twitter:card" content="summary_large_image" />`,
    )
    .replace(
      "</head>",
      `<link rel="canonical" href="${canonical}" />\n${alternates}\n<link rel="alternate" hreflang="x-default" href="${origin}${base}" />\n<script id="structured-data" type="application/ld+json">${JSON.stringify(structured).replaceAll("<", "\\u003c")}</script>\n</head>`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(<App initialLocale={locale} />)}</div>`,
    );
}
