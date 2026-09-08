export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;
export type Label = string | Localized<string>;
export const localeNames: Localized<string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};
export const documentLanguages: Localized<string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};
export function isLocale(value: string | null): value is Locale {
  return locales.some((locale) => locale === value);
}
export function resolveLocale(
  saved: string | null,
  preferred: readonly string[],
): Locale {
  if (isLocale(saved)) return saved;
  for (const language of preferred) {
    const locale = language.toLowerCase().split("-")[0];
    if (isLocale(locale)) return locale;
  }
  return "en";
}
export function localize(label: Label, locale: Locale): string {
  return typeof label === "string" ? label : label[locale];
}
export function localeFromPath(path: string): Locale | null {
  const segment = path.slice(import.meta.env.BASE_URL.length).split("/")[0];
  return isLocale(segment) ? segment : null;
}
