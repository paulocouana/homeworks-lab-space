import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Smartphone, Zap, Clock, Users, Calendar } from "lucide-react";

const Utilizadores = () => {
  const userFeatures = [
    {
      icon: Search,
      title: "Pesquisa Avançada",
      description: "Encontre espaços por localização, comodidades, preço e disponibilidade."
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
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Para Profissionais e Estudantes
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Encontre o espaço perfeito para o seu trabalho. 
                Produtividade e flexibilidade ao seu alcance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userFeatures.map((feature, index) => (
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

export default Utilizadores;