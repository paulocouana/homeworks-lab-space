import { Facebook, Twitter, Linkedin, Instagram, Leaf, Globe } from "lucide-react";

const Footer = () => {
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
              A plataforma líder para descobrir, reservar e gerir espaços de coworking e escritórios em Moçambique e Portugal.
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
            <h3 className="text-lg font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Pesquisar Espaços</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Listar Espaço</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Preços</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Centro de Ajuda</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contactar Suporte</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Engajar */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Engajar</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Entre em contacto</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Torne-se um parceiro</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Eventos</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Podcasts</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Estamos contratando</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Comunidade do HomeWorks</a></li>
            </ul>
          </div>
        </div>

        {/* Google-style footer bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left - Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Sobre a HomeWorks</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Termos do site</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Termos da plataforma</a>
            </div>

            {/* Center - Sustainability */}
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Leaf className="w-4 h-4 text-green-400" />
              <span>Carbono neutro desde 2024</span>
            </div>

            {/* Right - Newsletter and Language */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="email" 
                  placeholder="Subscrever newsletter"
                  className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
                <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm transition-colors">
                  Assinar
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
              © {new Date().getFullYear()} Homeworks Lab. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;