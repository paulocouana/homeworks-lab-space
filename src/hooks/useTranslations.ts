import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageCode } from '@/types/translation';

export const useTranslations = (texts: string[], targetLang?: LanguageCode) => {
  const { translateMany, currentLanguage } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState<string[]>(texts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performTranslations = async () => {
      const target = targetLang || currentLanguage;
      
      if (target === 'pt') {
        setTranslatedTexts(texts);
        return;
      }

      setIsLoading(true);
      try {
        const results = await translateMany(texts, target);
        setTranslatedTexts(results);
      } catch (error) {
        console.error('Batch translation failed:', error);
        setTranslatedTexts(texts); // Fallback to original
      } finally {
        setIsLoading(false);
      }
    };

    performTranslations();
  }, [texts, currentLanguage, targetLang, translateMany]);

  return { translatedTexts, isLoading };
};