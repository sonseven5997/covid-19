import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import viLocale from "../src/locales/vi/index";

const resources = {
  vi: viLocale,
};

i18next.use(initReactI18next).init(
  {
    defaultNS: "common",
    resources,
    lng: "vi",
    fallbackLng: "vi",
    lowerCaseLng: true,
    cleanCode: true,
    nonExplicitSupportedLngs: true,
  },
);

export default i18next;
