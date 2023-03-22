import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./public/locales/en/translation.json";
import translationPT from "./public/locales/pt/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
