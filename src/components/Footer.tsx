import { Facebook, Twitter, Linkedin, Instagram, Leaf } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "@/hooks/useTranslations";

const Footer = () => {
  const texts = [
    "A plataforma líder para descobrir, reservar e gerir espaços de coworking e escritórios em Portugal e Moçambique.",
    "Plataforma",
    "Como Funciona",
    "Pesquisar Espaços", 
    "Listar Espaço",
    "Preços",
    "Suporte",
    "Centro de Ajuda",
    "Contactar Suporte",
    "Termos de Serviço",
    "Política de Privacidade",
    "Engajar",
    "Entre em contacto",
    "Torne-se um parceiro",
    "Eventos",
    "Podcasts",
    "Participar da pesquisa do usuário",
    "Estamos contratando. Faça parte da equipa da HomeWorks",
    "Comunidade do HomeWorks",
    "Sobre a HomeWorks",
    "Privacidade",
    "Termos do site",
    "Termos da plataforma",
    "Carbono neutro desde 2024",
    "Subscrever newsletter",
    "Assinar",
    "Todos os direitos reservados."
  ];
  
  const { translatedTexts } = useTranslations(texts);
  const [description, platformText, howItWorksText, searchSpacesText, listSpaceText, pricingText, supportText, helpCenterText, contactSupportText, termsOfServiceText, privacyPolicyText, engageText, contactUsText, becomePartnerText, eventsText, podcastsText, userResearchText, hiringText, communityText, aboutText, privacyText, siteTermsText, platformTermsText, carbonNeutralText, newsletterPlaceholder, subscribeText, copyrightText] = translatedTexts;

  return (
    <footer className="bg-primary-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold">Homeworks Lab</span>
            </div>
            <p className="text-white/80 mb-4">
              {description}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{platformText}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{howItWorksText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{searchSpacesText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{listSpaceText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{pricingText}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{supportText}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{helpCenterText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{contactSupportText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{termsOfServiceText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{privacyPolicyText}</a></li>
            </ul>
          </div>

          {/* Engajar */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{engageText}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{contactUsText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{becomePartnerText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{eventsText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{podcastsText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{userResearchText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{hiringText}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{communityText}</a></li>
            </ul>
          </div>
        </div>

        {/* Google-style footer bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left - Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">{aboutText}</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">{privacyText}</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">{siteTermsText}</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">{platformTermsText}</a>
            </div>

            {/* Center - Sustainability */}
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Leaf className="w-4 h-4 text-green-400" />
              <span>{carbonNeutralText}</span>
            </div>

            {/* Right - Newsletter and Language */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="email" 
                  placeholder={newsletterPlaceholder}
                  className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm transition-colors">
                  {subscribeText}
                </button>
              </div>
              <LanguageSelector />
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-6 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Homeworks Lab. {copyrightText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;