import { useEffect, useState } from "react";
export type Language = "pt" | "en";
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
  const [language, setLanguage] = useState<Language>(() =>
    saved("rr-language") === "en" ? "en" : "pt",
  );
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
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    save("rr-language", language);
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
