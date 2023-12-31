import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "./locales/en/translations";
import ES from "./locales/es/translations";
import KR from "./locales/kr/translations";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: window.localStorage.getItem("lang") || "en",
  resources: {
    en: {
      translations: EN,
    },
    es: {
      translations: ES,
    },
    kr: {
      translations: KR,
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "es", "kr"];

export default i18n;
