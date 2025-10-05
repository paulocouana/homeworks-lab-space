import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const CTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('cta.title')}
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center space-y-4">
              <Users className="h-12 w-12 mx-auto opacity-90" />
              <h3 className="text-2xl font-semibold">{t('cta.forProfessionals')}</h3>
              <p className="opacity-80">
                {t('cta.forProfessionalsDesc')}
              </p>
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                {t('cta.findSpaces')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center space-y-4">
              <Building2 className="h-12 w-12 mx-auto opacity-90" />
              <h3 className="text-2xl font-semibold">{t('cta.forOwners')}</h3>
              <p className="opacity-80">
                {t('cta.forOwnersDesc')}
              </p>
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                {t('cta.listSpace')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="pt-8">
            <p className="text-lg opacity-80">
              {t('cta.benefits')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;