export type LanguageCode = 'pt' | 'en' | 'fr' | 'es';

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}

export interface TranslationCache {
  [key: string]: {
    [targetLang: string]: string;
  };
}

export interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  translate: (text: string, targetLang?: LanguageCode) => Promise<string>;
  translateMany: (texts: string[], targetLang?: LanguageCode) => Promise<string[]>;
  isTranslating: boolean;
  availableLanguages: Language[];
}