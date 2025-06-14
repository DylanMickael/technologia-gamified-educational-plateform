import type { Resource, Page } from './types';
import { SUPPORTED_LANGUAGES, NAMESPACES } from './constants';

const resourceFiles = import.meta.glob<{ default: Record<string, string> }>(
    './*/**.json',
    { eager: true }
);

export const loadResources = (): Resource => {
    const resources: Partial<Resource> = {};
    
    SUPPORTED_LANGUAGES.forEach((lang) => {
        resources[lang] = NAMESPACES.reduce((acc, page) => {
            const filePath = `./${lang}/${page}.json`;

            if (!resourceFiles[filePath]) console.warn(`Missing translation file: ${filePath}`);

            acc[page] = resourceFiles[filePath]?.default || {};
            return acc;
        }, {} as Record<Page, Record<string, string>>);
    });

    return resources as Resource;
};