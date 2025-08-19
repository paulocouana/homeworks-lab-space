import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-coworking.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Espaços de Coworking Modernos" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Encontre o Espaço de Trabalho
          <span className="block text-primary-light">Perfeito para Si</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          A plataforma líder para descobrir, reservar e gerir espaços de coworking e escritórios. 
          Conectamos proprietários e profissionais de forma simples e eficiente.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" size="xl" className="min-w-[200px]">
            Encontrar Espaços
          </Button>
          <Button variant="outline-primary" size="xl" className="min-w-[200px] bg-white/10 border-white text-white hover:bg-white hover:text-primary">
            Listar o Meu Espaço
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
            <div className="text-lg opacity-90">Espaços Disponíveis</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
            <div className="text-lg opacity-90">Utilizadores Activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
            <div className="text-lg opacity-90">Cidades</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;