import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import es from "./locales/es.json";
import eu from "./locales/eu.json";
import fr from "./locales/fr.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      eu: { translation: eu },
      fr: { translation: fr },
    },
    lng: typeof window !== "undefined" ? (localStorage.getItem("etx-lang") || undefined) : undefined,
    fallbackLng: "en",
    supportedLngs: ["en", "es", "eu", "fr"],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "etx-lang",
    },
  });

export default i18n;
