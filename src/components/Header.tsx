import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
          <a href="#precos" className="text-foreground hover:text-primary transition-colors">
            Preços
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Soluções
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Serviços
          </a>
          <a href="/contacto" className="text-foreground hover:text-primary transition-colors">
            Entre em Contacto com Nossa Equipa
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Icon icon="mdi:account-circle" className="w-4 h-4" />
                  <span>{profile?.first_name || 'Utilizador'}</span>
                  <Icon icon="mdi-light:chevron-down" className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border shadow-elegant z-50" align="end">
                <DropdownMenuItem asChild>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    <Icon icon="mdi:view-dashboard" className="mr-2 h-4 w-4" />
                    Dashboard
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button 
                    onClick={handleSignOut}
                    className="flex w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer text-destructive"
                  >
                    <Icon icon="mdi:logout" className="mr-2 h-4 w-4" />
                    Sair
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                Entrar
              </Button>*
              <Button variant="cta" size="sm" onClick={() => navigate('/auth')}>
                Cadastrar
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;