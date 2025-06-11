import i18n from 'i18next';
import type { i18n as I18nType } from 'i18next';
import { loadResources } from './utils';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nConfig } from './config';

export const initializeI18n = async (): Promise<I18nType> => {
  const resources = loadResources();

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...i18nConfig,
      resources,
    });

  return i18n;
};

initializeI18n().catch(console.error);

export default i18n;