import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Veja Como Funciona
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Descubra como a Homeworks Lab está revolucionando os espaços de trabalho
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-muted rounded-xl sm:rounded-2xl overflow-hidden aspect-video group cursor-pointer">
            {/* Placeholder for video */}
            <div className="absolute inset-0 bg-gradient-primary/20 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-3 sm:p-4 lg:p-6 group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary ml-0.5" fill="currentColor" />
              </div>
            </div>
            
            {/* Video thumbnail overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            
            {/* Video info overlay */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                  Tour pelos Nossos Espaços
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Conheça os ambientes que oferecemos para o seu trabalho
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Button variant="outline" size="lg" className="text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
              Ver Mais Vídeos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;