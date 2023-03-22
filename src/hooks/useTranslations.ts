import { useEffect, useState } from "react";
import translationsPt from "./../public/locales/pt/translation.json";
import translationsEn from "./../public/locales/en/translation.json";
import { useLanguage } from "../context/LanguageContext";

type Translations = typeof translationsPt;

const translations = {
  pt: translationsPt,
  en: translationsEn,
};

export const useTranslations = (): Translations => {
  const { language } = useLanguage();
  const [currentTranslations, setCurrentTranslations] = useState<Translations>(
    translations.pt
  );

  useEffect(() => {
    setCurrentTranslations(translations[language as keyof typeof translations]);
  }, [language]);

  return currentTranslations;
};
