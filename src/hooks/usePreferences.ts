import { useEffect, useState } from "react";
import { documentLanguages, resolveLocale, type Locale } from "../i18n";
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
    /* Browsing without storage still works. */
  }
}
export function usePreferences() {
  const [language, updateLanguage] = useState<Locale>(() => {
    return resolveLocale(
      saved("rr-language"),
      navigator.languages ?? [navigator.language],
    );
  });
  const setLanguage = (next: Locale) => {
    save("rr-language", next);
    updateLanguage(next);
  };
  const [motion, setMotion] = useState(() => saved("rr-motion") !== "off");
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = documentLanguages[language];
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.motion = motion && !reduced ? "on" : "off";
    save("rr-motion", motion ? "on" : "off");
  }, [motion, reduced]);
  return {
    language,
    setLanguage,
    motion: motion && !reduced,
    toggleMotion: () => setMotion((v) => !v),
    reduced,
  };
}
