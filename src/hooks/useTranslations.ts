import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageCode } from '@/types/translation';

export const useTranslations = (texts: string[], targetLang?: LanguageCode) => {
  const { translateMany, currentLanguage } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState<string[]>(texts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    
    const performTranslations = async () => {
      const target = targetLang || currentLanguage;
      
      if (target === 'pt') {
        if (!isCancelled) {
          setTranslatedTexts(texts);
        }
        return;
      }

      if (!isCancelled) {
        setIsLoading(true);
      }
      
      try {
        const results = await translateMany(texts, target);
        if (!isCancelled) {
          setTranslatedTexts(results);
        }
      } catch (error) {
        console.error('Batch translation failed:', error);
        if (!isCancelled) {
          setTranslatedTexts(texts); // Fallback to original
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    performTranslations();
    
    return () => {
      isCancelled = true;
    };
  }, [texts, currentLanguage, targetLang, translateMany]);

  return { translatedTexts, isLoading };
};