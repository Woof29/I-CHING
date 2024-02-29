import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../locales/en/translation";
import translationZH from "../locales/zh/translation";

const resources = {
  en: {
    translation: translationEN,
  },
  zh: {
    translation: translationZH,
  },
};

const lang = sessionStorage.getItem("lang") || "zh";

i18n.use(initReactI18next).init({
  resources,
  lng: lang,
});

export default i18n;
