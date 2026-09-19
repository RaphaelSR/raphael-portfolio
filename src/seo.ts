import { documentLanguages, type Localized, type Locale } from "./i18n";
import { links } from "./content";
export const seo: Localized<{
  title: string;
  description: string;
  socialLocale: string;
}> = {
  en: {
    title: "Raphael Rocha — Mobile & Full-Stack Engineer | Portfolio",
    description:
      "Portfolio of Raphael Rocha, Senior Mobile Engineer. React Native, Expo, web, backend and applied AI. Explore my contributions to ModPro AI, Medely and Wine.",
    socialLocale: "en_US",
  },
  pt: {
    title: "Raphael Rocha — Engenharia Mobile e Full Stack | Portfólio",
    description:
      "Portfólio de Raphael Rocha, Senior Mobile Engineer. React Native, Expo, web, backend e IA aplicada. Conheça minhas contribuições ao ModPro AI, Medely e Wine.",
    socialLocale: "pt_BR",
  },
  es: {
    title: "Raphael Rocha — Desarrollo Móvil y Full Stack | Portafolio",
    description:
      "Portafolio de Raphael Rocha, Senior Mobile Engineer. React Native, Expo, web, backend e IA aplicada. Conoce mis contribuciones a ModPro AI, Medely y Wine.",
    socialLocale: "es_ES",
  },
};
export const canonicalUrl = (locale: Locale) =>
  `https://portfolio.raphaelrocha.com${import.meta.env.BASE_URL}${locale}/`;
export function updateMetadata(locale: Locale) {
  const { title, description, socialLocale } = seo[locale];
  document.title = title;
  const structured = document.getElementById("structured-data");
  if (structured)
    structured.textContent = JSON.stringify(structuredData(locale));
  for (const [selector, value] of Object.entries({
    'meta[name="description"]': description,
    'meta[property="og:title"]': title,
    'meta[property="og:description"]': description,
    'meta[property="og:url"]': canonicalUrl(locale),
    'meta[property="og:locale"]': socialLocale,
  }))
    document.querySelector(selector)?.setAttribute("content", value);
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", canonicalUrl(locale));
}

export function structuredData(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonicalUrl(locale),
    inLanguage: documentLanguages[locale],
    mainEntity: {
      "@type": "Person",
      "@id": "https://raphaelrocha.com/#person",
      name: "Raphael Rocha",
      jobTitle: "Senior Mobile Engineer",
      url: canonicalUrl("en"),
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
}
