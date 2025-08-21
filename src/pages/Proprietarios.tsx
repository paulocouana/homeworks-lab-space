import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Users, DollarSign } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Proprietarios = () => {
  const { translatedText: pageTitle } = useTranslation("Para Proprietários de Espaços");
  const { translatedText: pageDescription } = useTranslation("Transforme o seu espaço numa fonte de receita constante. Ofereça aos profissionais o ambiente ideal para trabalhar.");
  const { translatedText: dashboardTitle } = useTranslation("Dashboard Completo");
  const { translatedText: dashboardDesc } = useTranslation("Gerencie seus espaços, reservas e receitas em um painel intuitivo e completo.");
  const { translatedText: paymentsTitle } = useTranslation("Pagamentos Seguros");
  const { translatedText: paymentsDesc } = useTranslation("Receba pagamentos de forma segura e automática através de múltiplas opções.");
  const { translatedText: usersTitle } = useTranslation("Gestão de Utilizadores");
  const { translatedText: usersDesc } = useTranslation("Gerencie reservas e comunique directamente com os seus clientes.");
  const { translatedText: revenueTitle } = useTranslation("Maximize Receitas");
  const { translatedText: revenueDesc } = useTranslation("Optimize a ocupação do seu espaço e aumente os lucros.");

  const ownerFeatures = [
    {
      icon: Shield,
      title: dashboardTitle,
      description: dashboardDesc
    },
    {
      icon: DollarSign,
      title: paymentsTitle,
      description: paymentsDesc
    },
    {
      icon: Users,
      title: usersTitle,
      description: usersDesc
    },
    {
      icon: TrendingUp,
      title: revenueTitle,
      description: revenueDesc
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {pageTitle}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {pageDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ownerFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Proprietarios;