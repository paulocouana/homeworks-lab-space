import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/hooks/useTranslation";

const Header = () => {
  const { translatedText: overviewText } = useTranslation("Visão Geral");
  const { translatedText: howItWorksText } = useTranslation("Como Funciona");
  const { translatedText: forOwnersText } = useTranslation("Para Proprietários");
  const { translatedText: forUsersText } = useTranslation("Para Utilizadores");
  const { translatedText: pricingText } = useTranslation("Preços");
  const { translatedText: solutionsText } = useTranslation("Soluções");
  const { translatedText: servicesText } = useTranslation("Serviços");
  const { translatedText: contactText } = useTranslation("Entre em Contacto com Nossa Equipa");
  const { translatedText: loginText } = useTranslation("Entrar");
  const { translatedText: startNowText } = useTranslation("Começar");

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
              <span>{overviewText}</span>
              <Icon icon="mdi-light:chevron-down" className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-border shadow-elegant z-50">
              <DropdownMenuItem asChild>
                <a href="/como-funciona" className="flex w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  {howItWorksText}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/proprietarios" className="flex w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  {forOwnersText}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/utilizadores" className="flex w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  {forUsersText}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a href="#precos" className="text-foreground hover:text-primary transition-colors">
            {pricingText}
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            {solutionsText}
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            {servicesText}
          </a>
          <a href="/contacto" className="text-foreground hover:text-primary transition-colors">
            {contactText}
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            {loginText}
          </Button>
          <Button variant="cta" size="sm">
            {startNowText}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;