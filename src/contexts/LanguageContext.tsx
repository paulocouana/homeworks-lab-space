import React, { createContext, useContext, useState, useCallback } from 'react';
import { LanguageCode, Language, LanguageContextType } from '@/types/translation';
import { supabase } from '@/integrations/supabase/client';
import { getCachedTranslation, setCachedTranslation } from '@/utils/translationCache';

const LANGUAGE_KEY = 'homeworks_language';

const availableLanguages: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    try {
      return (localStorage.getItem(LANGUAGE_KEY) as LanguageCode) || 'pt';
    } catch {
      return 'pt';
    }
  });
  
  const [isTranslating, setIsTranslating] = useState(false);

  const setLanguage = useCallback((language: LanguageCode) => {
    setCurrentLanguage(language);
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  }, []);

  const translate = useCallback(async (text: string, targetLang?: LanguageCode): Promise<string> => {
    const target = targetLang || currentLanguage;
    
    // Return original text for Portuguese or if target is Portuguese
    if (target === 'pt') {
      return text;
    }

    // Check cache first
    const cached = getCachedTranslation(text, target);
    if (cached) {
      return cached;
    }

    try {
      setIsTranslating(true);
      
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: { text, targetLanguage: target }
      });

      if (error) {
        console.error('Translation error:', error);
        return text; // Fallback to original text
      }

      const translatedText = data.translatedText;
      
      // Cache the translation
      setCachedTranslation(text, target, translatedText);
      
      return translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Fallback to original text
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage]);

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    translate,
    isTranslating,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};