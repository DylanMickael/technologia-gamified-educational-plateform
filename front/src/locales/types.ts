import { SUPPORTED_LANGUAGES, NAMESPACES } from './constants';

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export type Page = (typeof NAMESPACES)[number];

export type Resource = Record<
  SupportedLanguage,
  Record<Page, Record<string, string>>
>;