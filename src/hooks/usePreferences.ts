import { copy } from "../messages";
import { useEffect, useState } from "react";
import {
  documentLanguages,
  localeFromPath,
  resolveLocale,
  type Locale,
} from "../i18n";
function saved(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Storage is optional. */
  }
}
export function usePreferences(initialLocale: Locale) {
  const [language, updateLanguage] = useState(initialLocale);
  const [motion, setMotion] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const applyLocation = () =>
      updateLanguage(
        localeFromPath(location.pathname) ??
          resolveLocale(
            saved("rr-language"),
            navigator.languages ?? [navigator.language],
          ),
      );
    document.documentElement.dataset.enhanced = "true";
    applyLocation();
    setMotion(saved("rr-motion") !== "off");
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    window.addEventListener("popstate", applyLocation);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("popstate", applyLocation);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = documentLanguages[language];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy[language].intro);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        "href",
        `https://raphaelrocha.com${import.meta.env.BASE_URL}${language}/`,
      );
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.motion = motion && !reduced ? "on" : "off";
  }, [motion, reduced]);
  const setLanguage = (next: Locale) => {
    save("rr-language", next);
    history.pushState(
      null,
      "",
      `${import.meta.env.BASE_URL}${next}/${location.hash}`,
    );
    updateLanguage(next);
  };
  return {
    language,
    setLanguage,
    motion: motion && !reduced,
    reduced,
    toggleMotion: () =>
      setMotion((value) => {
        save("rr-motion", value ? "off" : "on");
        return !value;
      }),
  };
}
