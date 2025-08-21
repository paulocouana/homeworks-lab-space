import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const StatsSection = () => {
  const texts = [
    "Números que fazem a diferença no trabalho",
    "Resultados comprovados que mostram o impacto da Homeworks Lab na produtividade",
    "Aumento na produtividade reportado pelos utilizadores",
    "Profissionais activos utilizando os nossos espaços", 
    "Junte-se aos profissionais que escolheram a excelência",
    "Transforme a sua forma de trabalhar. Encontre o ambiente perfeito para alcançar os seus objectivos profissionais e pessoais.",
    "Encontrar Espaços",
    "Saber Mais"
  ];
  
  const { translatedTexts } = useTranslations(texts);
  const [titleText, subtitleText, productivityText, activeProfessionalsText, joinProfessionalsText, transformWorkText, findSpacesText, learnMoreText] = translatedTexts;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {titleText}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitleText}
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
                      {productivityText}
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
                      {activeProfessionalsText}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Content */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {joinProfessionalsText}
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              {transformWorkText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="min-w-[180px]">
                {findSpacesText}
              </Button>
              <Button variant="outline" size="lg" className="min-w-[180px]">
                {learnMoreText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;