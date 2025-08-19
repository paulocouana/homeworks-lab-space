import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-2xl font-bold text-primary">Homeworks Lab</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#como-funciona" className="text-foreground hover:text-primary transition-colors">
            Como Funciona
          </a>
          <a href="#proprietarios" className="text-foreground hover:text-primary transition-colors">
            Para Proprietários
          </a>
          <a href="#utilizadores" className="text-foreground hover:text-primary transition-colors">
            Para Utilizadores
          </a>
          <a href="#precos" className="text-foreground hover:text-primary transition-colors">
            Preços
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button variant="cta" size="sm">
            Começar Agora
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;