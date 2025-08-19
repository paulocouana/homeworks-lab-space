import { Users, TrendingUp, Shield, Clock, Globe, Smartphone, Zap, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const ownerFeatures = [
    {
      icon: TrendingUp,
      title: "Dashboard Completo",
      description: "Acompanhe ocupação, receitas e estado da subscrição em tempo real."
    },
    {
      icon: Shield,
      title: "Pagamentos Seguros",
      description: "Receba pagamentos de forma segura através de múltiplos métodos de pagamento."
    },
    {
      icon: Users,
      title: "Gestão de Utilizadores",
      description: "Gerencie reservas e comunique directamente com os seus clientes."
    },
    {
      icon: TrendingUp,
      title: "Maximize Receitas",
      description: "Optimize a ocupação do seu espaço e aumente os lucros."
    }
  ];

  const userFeatures = [
    {
      icon: Globe,
      title: "Pesquisa Avançada",
      description: "Encontre espaços por localização, preço, comodidades e disponibilidade."
    },
    {
      icon: Smartphone,
      title: "Múltiplos Pagamentos",
      description: "Pague com cartão, PayPal, Stripe, M-Pesa, mKesh ou e-Mola."
    },
    {
      icon: Zap,
      title: "Reserva Instantânea",
      description: "Reserve espaços em tempo real com confirmação imediata."
    },
    {
      icon: Clock,
      title: "Flexibilidade Total",
      description: "Reserve por horas, dias ou meses. Adapta-se às suas necessidades de trabalho."
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Conecte-se com outros profissionais e faça networking de qualidade."
    },
    {
      icon: Calendar,
      title: "Eventos",
      description: "Participe de eventos de networking e mais."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Para Proprietários */}
        <div id="proprietarios" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Para Proprietários de Espaços
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Maximize a ocupação dos seus espaços e aumente as suas receitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ownerFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
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

        {/* Para Utilizadores */}
        <div id="utilizadores">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Para Profissionais e Estudantes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encontre o ambiente de trabalho perfeito para a sua produtividade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
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
      </div>
    </section>
  );
};

export default FeaturesSection;