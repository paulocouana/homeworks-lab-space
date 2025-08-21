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

  const translateMany = useCallback(async (texts: string[], targetLang?: LanguageCode): Promise<string[]> => {
    const target = targetLang || currentLanguage;
    
    // Return original texts for Portuguese
    if (target === 'pt') {
      return texts;
    }

    // Check cache for each text and separate cached from uncached
    const results: string[] = new Array(texts.length);
    const uncachedIndices: number[] = [];
    const uncachedTexts: string[] = [];

    texts.forEach((text, index) => {
      const cached = getCachedTranslation(text, target);
      if (cached) {
        results[index] = cached;
      } else {
        uncachedIndices.push(index);
        uncachedTexts.push(text);
      }
    });

    // If all texts are cached, return results
    if (uncachedTexts.length === 0) {
      return results;
    }

    try {
      setIsTranslating(true);
      
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: { texts: uncachedTexts, targetLanguage: target }
      });

      if (error) {
        console.error('Batch translation error:', error);
        // Fallback to original texts for uncached items
        uncachedIndices.forEach((index, i) => {
          results[index] = uncachedTexts[i];
        });
        return results;
      }

      const translatedTexts = data.translatedTexts || uncachedTexts;
      
      // Cache the translations and fill results
      uncachedIndices.forEach((index, i) => {
        const translatedText = translatedTexts[i] || uncachedTexts[i];
        setCachedTranslation(uncachedTexts[i], target, translatedText);
        results[index] = translatedText;
      });
      
      return results;
    } catch (error) {
      console.error('Batch translation failed:', error);
      // Fallback to original texts for uncached items
      uncachedIndices.forEach((index, i) => {
        results[index] = uncachedTexts[i];
      });
      return results;
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage]);

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    translate,
    translateMany,
    isTranslating,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};