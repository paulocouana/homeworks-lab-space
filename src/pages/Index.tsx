import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Benefits from "@/components/Benefits";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <Header />
      <HeroSection />
      

      {/* Para Utilizadores Section */}
      <section id="utilizadores" className="py-12 sm:py-16 lg:py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Para Profissionais e Estudantes
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Encontre o espaço perfeito para o seu trabalho. 
              Produtividade e flexibilidade ao seu alcance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Pesquisa Avançada
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Encontre espaços por localização, comodidades, preço e disponibilidade.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Múltiplos Pagamentos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pague com cartão, PayPal, Stripe, M-Pesa, mKesh ou e-Mola.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Reserva Instantânea
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reserve espaços em tempo real com confirmação imediata.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Flexibilidade Total
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reserve por horas, dias ou meses. Adapta-se às suas necessidades de trabalho.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Comunidade
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conecte-se com outros profissionais e faça networking de qualidade.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Eventos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Participe de eventos de networking e mais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para Proprietários Section */}
      <section id="proprietarios" className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Para Proprietários de Espaços
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Transforme o seu espaço numa fonte de receita constante. 
              Ofereça aos profissionais o ambiente ideal para trabalhar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Dashboard Completo
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gerencie seus espaços, reservas e receitas em um painel intuitivo e completo.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Pagamentos Seguros
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receba pagamentos de forma segura e automática através de múltiplas opções.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Gestão de Utilizadores
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gerencie reservas e comunique directamente com os seus clientes.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-card rounded-lg border border-border">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Maximize Receitas
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Optimize a ocupação do seu espaço e aumente os lucros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoSection />
      <StatsSection />
      <TestimonialsSection />
      <Benefits />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
