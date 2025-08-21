import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const VideoSection = () => {
  const { translatedText: seeHowItWorksText } = useTranslation("Veja Como Funciona");
  const { translatedText: discoverText } = useTranslation("Descubra como a Homeworks Lab está revolucionando os espaços de trabalho");
  const { translatedText: tourTitle } = useTranslation("Tour pelos Nossos Espaços");
  const { translatedText: tourDescription } = useTranslation("Conheça os ambientes que oferecemos para o seu trabalho");
  const { translatedText: seeMoreVideosText } = useTranslation("Ver Mais Vídeos");

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {seeHowItWorksText}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {discoverText}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-muted rounded-2xl overflow-hidden aspect-video group cursor-pointer">
            {/* Placeholder for video */}
            <div className="absolute inset-0 bg-gradient-primary/20 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                <Play className="w-12 h-12 text-primary ml-1" fill="currentColor" />
              </div>
            </div>
            
            {/* Video thumbnail overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            
            {/* Video info overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  {tourTitle}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tourDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              {seeMoreVideosText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;