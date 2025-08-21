import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const TestimonialsSection = () => {
  const { translatedText: testimonialsTitle } = useTranslation("Depoimentos de Clientes");
  const { translatedText: testimonialsSubtitle } = useTranslation("Veja o que os nossos utilizadores dizem sobre a experiência Homeworks Lab");
  const { translatedText: testimonial1 } = useTranslation("A Homeworks Lab transformou completamente a minha produtividade. O ambiente é perfeito para o trabalho criativo e as facilidades são excelentes.");
  const { translatedText: testimonial2 } = useTranslation("Encontrei exactamente o que procurava: um espaço silencioso, bem equipado e com internet rápida. Recomendo a todos os profissionais remotos.");
  const { translatedText: freelancerRole } = useTranslation("Designer Freelancer");
  const { translatedText: developerRole } = useTranslation("Desenvolvedor");
  const { translatedText: ratingText } = useTranslation("4.9/5 baseado em 200+ avaliações");

  const testimonials = [
    {
      name: "Ana Silva",
      role: freelancerRole,
      company: "Design Studio",
      avatar: "AS",
      rating: 5,
      text: testimonial1
    },
    {
      name: "João Santos",
      role: developerRole,
      company: "Tech Solutions",
      avatar: "JS",
      rating: 5,
      text: testimonial2
    }
  ];

  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {testimonialsTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {testimonialsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-elegant hover:shadow-soft transition-all duration-300">
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-soft">
            <div className="flex items-center space-x-1">
              {renderStars(5)}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {ratingText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;