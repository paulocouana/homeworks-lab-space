import { Search, Calendar, CreditCard, Building2 } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Pesquise",
      description: "Encontre o espaço ideal na sua localização preferida com os nossos filtros avançados."
    },
    {
      icon: Calendar,
      title: "Reserve",
      description: "Escolha as datas e horários que melhor se adequam à sua agenda de trabalho."
    },
    {
      icon: CreditCard,
      title: "Pague",
      description: "Efectue o pagamento de forma segura através de cartão, PayPal, Stripe ou carteiras móveis."
    },
    {
      icon: Building2,
      title: "Trabalhe",
      description: "Desfrute do seu espaço de trabalho reservado e concentre-se no que realmente importa."
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quatro passos simples para encontrar e reservar o seu espaço de trabalho ideal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-elegant group-hover:shadow-soft transition-all duration-300 group-hover:scale-110">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;