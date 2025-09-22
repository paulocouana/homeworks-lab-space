import { Shield, Clock, Zap, TrendingUp, Globe, Heart } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Pagamentos Seguros",
      description: "Sistema de pagamento integrado e seguro com emissão automática de recibos."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexibilidade Total",
      description: "Reserve por horas, dias ou meses. Adapte-se às suas necessidades de trabalho."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Reserva Instantânea",
      description: "Confirmação imediata das suas reservas. Sem esperas, sem complicações."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Maximize Receitas",
      description: "Para proprietários: otimize a ocupação do seu espaço e aumente os lucros."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Rede Nacional",
      description: "Acesso a espaços em todo o país. Trabalhe onde quiser, quando quiser."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Comunidade",
      description: "Conecte-se com outros profissionais e faça networking de qualidade."
    }
  ];

  return (
    <section id="vantagens" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Precisa de mais motivos para escolher o Homeworks?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A plataforma que revoluciona a forma como você trabalha e gerencia espaços.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;