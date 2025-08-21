import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageCode } from '@/types/translation';

export const useTranslation = (text: string, targetLang?: LanguageCode) => {
  const { translate, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performTranslation = async () => {
      const target = targetLang || currentLanguage;
      
      if (target === 'pt') {
        setTranslatedText(text);
        return;
      }

      setIsLoading(true);
      try {
        const result = await translate(text, target);
        setTranslatedText(result);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedText(text); // Fallback to original
      } finally {
        setIsLoading(false);
      }
    };

    performTranslation();
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