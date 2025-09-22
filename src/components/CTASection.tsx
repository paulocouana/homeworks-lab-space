import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para Transformar sua Forma de Trabalhar?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais e proprietários que já usam o Homeworks Lab 
            para criar experiências de trabalho flexíveis e produtivas.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center space-y-4">
              <Users className="h-12 w-12 mx-auto opacity-90" />
              <h3 className="text-2xl font-semibold">Para Profissionais</h3>
              <p className="opacity-80">
                Encontre o espaço ideal para trabalhar com máxima flexibilidade.
              </p>
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                Encontrar Espaços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center space-y-4">
              <Building2 className="h-12 w-12 mx-auto opacity-90" />
              <h3 className="text-2xl font-semibold">Para Proprietários</h3>
              <p className="opacity-80">
                Monetize seu espaço e gerencie reservas com facilidade.
              </p>
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                Listar Espaço
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="pt-8">
            <p className="text-lg opacity-80">
              Sem taxas de setup • Suporte 24/7 • Pagamentos seguros
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;