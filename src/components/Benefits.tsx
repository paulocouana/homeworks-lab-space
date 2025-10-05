import { Shield, Clock, Zap, TrendingUp, Globe, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const Benefits = () => {
  const { t } = useTranslation();
  
  const benefits = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('benefits.securePayments'),
      description: t('benefits.securePaymentsDesc')
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t('benefits.totalFlexibility'),
      description: t('benefits.totalFlexibilityDesc')
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('benefits.instantBooking'),
      description: t('benefits.instantBookingDesc')
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: t('benefits.maximizeRevenue'),
      description: t('benefits.maximizeRevenueDesc')
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: t('benefits.nationalNetwork'),
      description: t('benefits.nationalNetworkDesc')
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: t('benefits.community'),
      description: t('benefits.communityDesc')
    }
  ];

  return (
    <section id="vantagens" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('benefits.subtitle')}
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