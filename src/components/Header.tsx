
import { Link } from "react-router-dom";
import { AuthHeader } from './auth/AuthHeader';

const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">CoWork</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link 
              to="/" 
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Início
            </Link>
            <Link 
              to="/spaces" 
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Espaços
            </Link>
            <Link 
              to="/dashboard" 
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <AuthHeader />
      </div>
    </header>
  );
};

export default Header;
