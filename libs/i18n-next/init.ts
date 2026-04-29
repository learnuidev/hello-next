import { createInstance } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ChainedBackend from "i18next-chained-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { i18nOptions } from "./i18n-config";

const i18nInstance = createInstance();
i18nInstance
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nOptions);
export default i18nInstance;
