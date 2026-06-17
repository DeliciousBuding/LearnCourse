import { locales, type Locale } from '../locales/zh';

let currentLocale = 'zh';

export function setLocale(lang: string) { currentLocale = lang; }

export function t(key: string): string {
  const locale = locales[currentLocale] || locales.zh;
  const keys = key.split('.');
  let result: unknown = locale;
  for (const k of keys) {
    result = (result as Record<string, unknown>)?.[k];
    if (result === undefined) return key; // fallback to key string
  }
  return result as string;
}

/** React hook for i18n */
export function useI18n(): { t: typeof t; locale: string } {
  return { t, locale: currentLocale };
}
