import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";

const CTASection = () => {
  const texts = [
    "Pronto para Começar?",
    "Junte-se a centenas de proprietários e utilizadores que já confiam na Homeworks Lab para as suas necessidades de espaços de trabalho.",
    "Começar como Utilizador",
    "Listar o Meu Espaço"
  ];
  
  const { translatedTexts } = useTranslations(texts);
  const [readyToStartText, joinUsText, startAsUserText, listMySpaceText] = translatedTexts;

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {readyToStartText}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {joinUsText}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90 hover:text-primary-dark min-w-[200px]">
              {startAsUserText}
            </Button>
            <Button variant="outline-primary" size="xl" className="border-white text-white hover:bg-white hover:text-primary min-w-[200px]">
              {listMySpaceText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;