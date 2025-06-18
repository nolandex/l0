// File: lib/i18n.ts (REVISI FINAL)
// HANYA BOLEH BERISI KODE INI

export const locales = ['en', 'id', 'ja', 'ar', 'es', 'ru'];

export const localeNames: Record<string, string> = {
  en: '🇺🇸 English',
  id: '🇮🇩 Indonesia',
  ja: '🇯🇵 日本語',
  ar: '🇸🇦 العربية',
  es: '🇪🇸 Español',
  ru: '🇷🇺 Русский',
};

export const defaultLocale = 'en';

const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  id: () => import('@/locales/id.json').then((module) => module.default),
  ja: () => import('@/locales/ja.json').then((module) => module.default),
  ar: () => import('@/locales/ar.json').then((module) => module.default),
  es: () => import('@/locales/es.json').then((module) => module.default),
  ru: () => import('@/locales/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!Object.keys(dictionaries).includes(locale)) {
    locale = defaultLocale;
  }
  return dictionaries[locale as keyof typeof dictionaries]();
};
