import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import Arabic files
import arCommon from "./locales/ar/common.json";
import arBoard from "./locales/ar/board.json";
import arProjects from "./locales/ar/projects.json";
import arNotFound from "./locales/ar/notFound.json";
import arHome from "./locales/ar/home.json";

// Import English files
import enCommon from "./locales/en/common.json";
import enBoard from "./locales/en/board.json";
import enProjects from "./locales/en/projects.json";
import enNotFound from "./locales/en/notFound.json";
import enHome from "./locales/en/home.json";

function applyDirection(lng: string) {
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng);
}

i18n.on("languageChanged", applyDirection);

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    projects: enProjects,
    board: enBoard,
    notFound: enNotFound,
  },
  ar: {
    common: arCommon,
    home: arHome,
    projects: arProjects,
    board: arBoard,
    notFound: arNotFound,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Fallback if a translation is missing
    supportedLngs: ["en", "ar"],
    ns: ["common", "home", "board", "projects", "notFound"], // Your "pages" / namespaces
    defaultNS: "common",
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
