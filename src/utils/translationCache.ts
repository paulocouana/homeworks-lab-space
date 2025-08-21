import { TranslationCache } from '@/types/translation';

const CACHE_KEY = 'homeworks_translations';

export const getTranslationCache = (): TranslationCache => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

export const setTranslationCache = (cache: TranslationCache): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Failed to save translation cache:', error);
  }
};

export const getCachedTranslation = (text: string, targetLang: string): string | null => {
  const cache = getTranslationCache();
  return cache[text]?.[targetLang] || null;
};

export const setCachedTranslation = (text: string, targetLang: string, translation: string): void => {
  const cache = getTranslationCache();
  if (!cache[text]) {
    cache[text] = {};
  }
  cache[text][targetLang] = translation;
  setTranslationCache(cache);
};