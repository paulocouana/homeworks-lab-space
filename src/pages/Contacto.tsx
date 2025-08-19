import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().min(1, "Primeiro nome é obrigatório"),
  lastName: z.string().min(1, "Último nome é obrigatório"),
  email: z.string().email("Email inválido"),
  company: z.string().optional(),
  inquiryType: z.enum(["partnership", "support", "sales", "other"], {
    required_error: "Selecione o tipo de consulta",
  }),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contacto = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      inquiryType: "sales",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form data:", data);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contacto consigo em breve.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Entre em Contacto
            </h1>
            <p className="text-lg text-muted-foreground">
              Tem alguma pergunta? Adoraríamos ouvir de si. Envie-nos uma mensagem e responderemos o mais rápido possível.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primeiro Nome *</FormLabel>
                        <FormControl>
                          <Input placeholder="João" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Último Nome *</FormLabel>
                        <FormControl>
                          <Input placeholder="Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="joao@exemplo.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inquiryType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tipo de Consulta *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sales" id="sales" />
                            <Label htmlFor="sales">Vendas e Informações Gerais</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="partnership" id="partnership" />
                            <Label htmlFor="partnership">Parcerias</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="support" id="support" />
                            <Label htmlFor="support">Suporte Técnico</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Outro</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Escreva a sua mensagem aqui..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    variant="cta" 
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "A Enviar..." : "Enviar Mensagem"}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  * Campos obrigatórios
                </p>
              </form>
            </Form>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Ou entre em contacto connosco diretamente:
            </p>
            <div className="space-y-2">
              <p className="text-foreground">
                <strong>Email:</strong> contacto@homeworkslab.com
              </p>
              <p className="text-foreground">
                <strong>Telefone:</strong> +351 123 456 789
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;