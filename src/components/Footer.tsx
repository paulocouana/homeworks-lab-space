import { Facebook, Twitter, Linkedin, Instagram, Leaf, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
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
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.platform')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.howItWorks')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.searchSpaces')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.listSpace')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.pricing')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.helpCenter')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.contactSupport')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.privacy')}</a></li>
            </ul>
          </div>

          {/* Engajar */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.engage')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.becomePartner')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.events')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.podcasts')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.feedback')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.hiring')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.community')}</a></li>
            </ul>
          </div>
        </div>

        {/* Google-style footer bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left - Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">{t('footer.about')}</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">{t('footer.terms')}</a>
            </div>

            {/* Center - Sustainability */}
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Leaf className="w-4 h-4 text-green-400" />
              <span>{t('footer.carbonNeutral')}</span>
            </div>

            {/* Right - Newsletter and Language */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="email" 
                  placeholder={t('footer.newsletterPlaceholder')}
                  className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm transition-colors">
                  {t('footer.subscribe')}
                </button>
              </div>
              <div className="flex items-center gap-1 text-white/70 hover:text-white cursor-pointer">
                <Globe className="w-4 h-4" />
                <span className="text-sm">PT</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-6 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
