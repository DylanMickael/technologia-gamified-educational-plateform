import type { InitOptions } from 'i18next';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './constants';

export const i18nConfig: InitOptions = {
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['cookie', 'navigator'],
    caches: ['cookie'],
  },
};