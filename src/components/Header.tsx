import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-lg">W</span>
          </div>
          <span className="text-lg sm:text-2xl font-bold text-primary">Homeworks Lab</span>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <a href="#" className="text-foreground hover:text-primary transition-colors text-sm xl:text-base">
            Soluções
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors text-sm xl:text-base">
            Serviços
          </a>
          <a href="#precos" className="text-foreground hover:text-primary transition-colors text-sm xl:text-base">
            Preços
          </a>
          <a href="/contacto" className="text-foreground hover:text-primary transition-colors text-sm xl:text-base">
            Contactar a Nossa Equipa
          </a>
        </nav>

        
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Icon icon="mdi:menu" className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background border-border">
              <div className="flex flex-col space-y-6 mt-8">
                <nav className="flex flex-col space-y-4">
                  <a 
                    href="#" 
                    className="text-foreground hover:text-primary transition-colors text-lg py-2"
                    onClick={handleNavClick}
                  >
                    Soluções
                  </a>
                  <a 
                    href="#" 
                    className="text-foreground hover:text-primary transition-colors text-lg py-2"
                    onClick={handleNavClick}
                  >
                    Serviços
                  </a>
                  <a 
                    href="#precos" 
                    className="text-foreground hover:text-primary transition-colors text-lg py-2"
                    onClick={handleNavClick}
                  >
                    Preços
                  </a>
                  <a 
                    href="/contacto" 
                    className="text-foreground hover:text-primary transition-colors text-lg py-2"
                    onClick={handleNavClick}
                  >
                    Contactar a Nossa Equipa
                  </a>
                </nav>
                
                <div className="border-t border-border pt-6">
                  {user ? (
                    <div className="space-y-4">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-lg py-3"
                        onClick={() => {
                          navigate('/dashboard');
                          handleNavClick();
                        }}
                      >
                        <Icon icon="mdi:view-dashboard" className="mr-2 h-5 w-5" />
                        Dashboard
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-lg py-3 text-destructive"
                        onClick={() => {
                          handleSignOut();
                          handleNavClick();
                        }}
                      >
                        <Icon icon="mdi:logout" className="mr-2 h-5 w-5" />
                        Sair
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        variant="ghost" 
                        className="w-full text-lg py-3" 
                        onClick={() => {
                          navigate('/auth');
                          handleNavClick();
                        }}
                      >
                        Entrar
                      </Button>
                      <Button 
                        variant="cta" 
                        className="w-full text-lg py-3" 
                        onClick={() => {
                          navigate('/auth');
                          handleNavClick();
                        }}
                      >
                        Cadastrar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex items-center space-x-2 sm:space-x-4">
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
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-4" onClick={() => navigate('/auth')}>
                Entrar
              </Button>
              <Button variant="cta" size="sm" className="text-xs sm:text-sm px-2 sm:px-4" onClick={() => navigate('/auth')}>
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