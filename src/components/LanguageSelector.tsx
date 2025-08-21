import React from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, availableLanguages, isTranslating } = useLanguage();

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer transition-colors focus:outline-none">
        <Globe className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
        <span className="text-sm">{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background border-border shadow-elegant">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground ${
              currentLanguage === language.code ? 'bg-accent/50' : ''
            }`}
          >
            <span>{language.flag}</span>
            <span className="text-sm">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;