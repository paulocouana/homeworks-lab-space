import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      "header": {
        "solutions": "Soluções",
        "services": "Serviços",
        "pricing": "Preços",
        "contact": "Contactar a Nossa Equipa",
        "login": "Entrar",
        "signup": "Cadastrar",
        "logout": "Sair"
      },
      "footer": {
        "description": "Conectamos proprietários de imóveis com profissionais em busca de espaços flexíveis para trabalhar.",
        "platform": "Plataforma",
        "howItWorks": "Como Funciona",
        "forOwners": "Para Proprietários",
        "forUsers": "Para Utilizadores",
        "support": "Suporte",
        "faq": "FAQ",
        "contact": "Contacto",
        "engage": "Engajar",
        "about": "Sobre a HomeWorks",
        "privacy": "Privacidade",
        "terms": "Termos",
        "sustainability": "Sustentabilidade",
        "newsletter": "Subscrever Newsletter",
        "subscribe": "Assinar",
        "copyright": "HomeWorks. Todos os direitos reservados."
      },
      "dashboard": {
        "loading": "Carregando...",
        "loadingProfile": "Carregando perfil..."
      },
      "notFound": {
        "title": "404",
        "message": "Oops! Página não encontrada",
        "returnHome": "Voltar para a Página Inicial"
      }
    }
  },
  en: {
    translation: {
      "header": {
        "solutions": "Solutions",
        "services": "Services",
        "pricing": "Pricing",
        "contact": "Contact Our Team",
        "login": "Sign In",
        "signup": "Sign Up",
        "logout": "Sign Out"
      },
      "footer": {
        "description": "We connect property owners with professionals looking for flexible workspaces.",
        "platform": "Platform",
        "howItWorks": "How It Works",
        "forOwners": "For Owners",
        "forUsers": "For Users",
        "support": "Support",
        "faq": "FAQ",
        "contact": "Contact",
        "engage": "Engage",
        "about": "About HomeWorks",
        "privacy": "Privacy",
        "terms": "Terms",
        "sustainability": "Sustainability",
        "newsletter": "Subscribe to Newsletter",
        "subscribe": "Subscribe",
        "copyright": "HomeWorks. All rights reserved."
      },
      "dashboard": {
        "loading": "Loading...",
        "loadingProfile": "Loading profile..."
      },
      "notFound": {
        "title": "404",
        "message": "Oops! Page not found",
        "returnHome": "Return to Home"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;
