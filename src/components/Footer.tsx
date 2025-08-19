import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

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
              A plataforma líder para descobrir, reservar e gerir espaços de coworking e escritórios em Portugal.
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

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-white/60" />
                <span className="text-white/80">info@homeworkslab.pt</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white/60" />
                <span className="text-white/80">+351 xxx xxx xxx</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-white/60" />
                <span className="text-white/80">Lisboa, Portugal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60">
            © 2024 Homeworks Lab. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;