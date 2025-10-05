import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const TestimonialsSection = () => {
  const { t } = useTranslation();
  
  const testimonials = [
    {
      name: t('testimonials.testimonial1.name'),
      role: t('testimonials.testimonial1.role'),
      company: t('testimonials.testimonial1.company'),
      avatar: "AS",
      rating: 5,
      text: t('testimonials.testimonial1.text')
    },
    {
      name: t('testimonials.testimonial2.name'),
      role: t('testimonials.testimonial2.role'),
      company: t('testimonials.testimonial2.company'),
      avatar: "JS",
      rating: 5,
      text: t('testimonials.testimonial2.text')
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
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
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
              4.9/5 {t('testimonials.rating')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;