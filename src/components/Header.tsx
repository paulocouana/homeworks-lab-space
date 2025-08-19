import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";

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
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors focus:outline-none">
              <span>Visão Geral</span>
              <Icon icon="mdi-light:chevron-down" className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-border shadow-elegant z-50">
              <DropdownMenuItem asChild>
                <a href="/como-funciona" className="flex w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  Como Funciona
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/proprietarios" className="flex w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  Para Proprietários
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/utilizadores" className="flex w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  Para Utilizadores
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="#precos" className="text-foreground hover:text-primary transition-colors">
            Preços
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Soluções
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Serviços
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Entre em Contacto com Nossa Equipa
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