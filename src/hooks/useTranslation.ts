import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageCode } from '@/types/translation';

export const useTranslation = (text: string, targetLang?: LanguageCode) => {
  const { translate, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    
    const performTranslation = async () => {
      const target = targetLang || currentLanguage;
      
      if (target === 'pt') {
        if (!isCancelled) {
          setTranslatedText(text);
        }
        return;
      }

      if (!isCancelled) {
        setIsLoading(true);
      }
      
      try {
        const result = await translate(text, target);
        if (!isCancelled) {
          setTranslatedText(result);
        }
      } catch (error) {
        console.error('Translation failed:', error);
        if (!isCancelled) {
          setTranslatedText(text); // Fallback to original
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    performTranslation();
    
    return () => {
      isCancelled = true;
    };
  }, [text, currentLanguage, targetLang, translate]);

  return { translatedText, isLoading };
};

export const useTranslationText = () => {
  const { translate, currentLanguage } = useLanguage();

  const t = async (text: string): Promise<string> => {
    if (currentLanguage === 'pt') {
      return text;
    }
    return await translate(text, currentLanguage);
  };

  return { t, currentLanguage };
};