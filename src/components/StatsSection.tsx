import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users } from "lucide-react";

const StatsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Números que fazem a diferença no trabalho
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Resultados comprovados que mostram o impacto da Homeworks Lab na produtividade
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats Cards */}
          <div className="space-y-8">
            <Card className="border-none shadow-elegant hover:shadow-soft transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      87%
                    </div>
                    <p className="text-muted-foreground">
                      Aumento na produtividade reportado pelos utilizadores
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-elegant hover:shadow-soft transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      2,500+
                    </div>
                    <p className="text-muted-foreground">
                      Profissionais activos utilizando os nossos espaços
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Content */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Junte-se aos profissionais que escolheram a excelência
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Transforme a sua forma de trabalhar. Encontre o ambiente perfeito para 
              alcançar os seus objectivos profissionais e pessoais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="min-w-[180px]">
                Encontrar Espaços
              </Button>
              <Button variant="outline" size="lg" className="min-w-[180px]">
                Saber Mais
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;