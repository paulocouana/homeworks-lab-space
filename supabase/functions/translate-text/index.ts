import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, targetLanguage } = await req.json();
    
    if (!text || !targetLanguage) {
      throw new Error('Text and target language are required');
    }

    console.log(`Translating "${text}" to ${targetLanguage}`);

    // Temporary mock translations for testing (replace with Google Translate API later)
    const mockTranslations: { [key: string]: { [lang: string]: string } } = {
      // Header & Navigation
      "Visão Geral": { en: "Overview", fr: "Aperçu", es: "Visión General" },
      "Como Funciona": { en: "How It Works", fr: "Comment Ça Marche", es: "Cómo Funciona" },
      "Para Proprietários": { en: "For Owners", fr: "Pour Propriétaires", es: "Para Propietarios" },
      "Para Utilizadores": { en: "For Users", fr: "Pour Utilisateurs", es: "Para Usuarios" },
      "Preços": { en: "Pricing", fr: "Tarifs", es: "Precios" },
      "Soluções": { en: "Solutions", fr: "Solutions", es: "Soluciones" },
      "Serviços": { en: "Services", fr: "Services", es: "Servicios" },
      "Entre em Contacto com Nossa Equipa": { en: "Contact Our Team", fr: "Contactez Notre Équipe", es: "Contacta Nuestro Equipo" },
      "Entrar": { en: "Login", fr: "Connexion", es: "Iniciar Sesión" },
      "Começar Agora": { en: "Start Now", fr: "Commencer", es: "Empezar Ahora" },

      // Hero Section
      "Descubra o Futuro do Trabalho": { en: "Discover the Future of Work", fr: "Découvrez l'Avenir du Travail", es: "Descubre el Futuro del Trabajo" },
      "Encontre espaços de coworking perfeitos em Portugal e Moçambique. Conecte-se com uma comunidade vibrante de profissionais e transforme sua forma de trabalhar.": { 
        en: "Find perfect coworking spaces in Portugal and Mozambique. Connect with a vibrant community of professionals and transform your way of working.",
        fr: "Trouvez des espaces de coworking parfaits au Portugal et au Mozambique. Connectez-vous à une communauté dynamique de professionnels et transformez votre façon de travailler.",
        es: "Encuentra espacios de coworking perfectos en Portugal y Mozambique. Conéctate con una comunidad vibrante de profesionales y transforma tu forma de trabajar."
      },
      "Explorar Espaços": { en: "Explore Spaces", fr: "Explorer les Espaces", es: "Explorar Espacios" },
      "Listar Meu Espaço": { en: "List My Space", fr: "Lister Mon Espace", es: "Listar Mi Espacio" },

      // Pages - Proprietarios
      "Para Proprietários de Espaços": { en: "For Space Owners", fr: "Pour Propriétaires d'Espaces", es: "Para Propietarios de Espacios" },
      "Transforme o seu espaço numa fonte de receita constante. Ofereça aos profissionais o ambiente ideal para trabalhar.": {
        en: "Transform your space into a constant source of income. Offer professionals the ideal environment to work.",
        fr: "Transformez votre espace en une source de revenus constante. Offrez aux professionnels l'environnement idéal pour travailler.",
        es: "Transforma tu espacio en una fuente constante de ingresos. Ofrece a los profesionales el ambiente ideal para trabajar."
      },
      "Dashboard Completo": { en: "Complete Dashboard", fr: "Tableau de Bord Complet", es: "Panel Completo" },
      "Gerencie seus espaços, reservas e receitas em um painel intuitivo e completo.": {
        en: "Manage your spaces, bookings and revenue in an intuitive and complete dashboard.",
        fr: "Gérez vos espaces, réservations et revenus dans un tableau de bord intuitif et complet.",
        es: "Gestiona tus espacios, reservas e ingresos en un panel intuitivo y completo."
      },
      "Pagamentos Seguros": { en: "Secure Payments", fr: "Paiements Sécurisés", es: "Pagos Seguros" },
      "Receba pagamentos de forma segura e automática através de múltiplas opções.": {
        en: "Receive payments securely and automatically through multiple options.",
        fr: "Recevez des paiements de manière sécurisée et automatique grâce à plusieurs options.",
        es: "Recibe pagos de forma segura y automática a través de múltiples opciones."
      },
      "Gestão de Utilizadores": { en: "User Management", fr: "Gestion des Utilisateurs", es: "Gestión de Usuarios" },
      "Gerencie reservas e comunique directamente com os seus clientes.": {
        en: "Manage bookings and communicate directly with your clients.",
        fr: "Gérez les réservations et communiquez directement avec vos clients.",
        es: "Gestiona reservas y comunícate directamente con tus clientes."
      },
      "Maximize Receitas": { en: "Maximize Revenue", fr: "Maximisez les Revenus", es: "Maximiza Ingresos" },
      "Optimize a ocupação do seu espaço e aumente os lucros.": {
        en: "Optimize your space occupancy and increase profits.",
        fr: "Optimisez l'occupation de votre espace et augmentez les profits.",
        es: "Optimiza la ocupación de tu espacio y aumenta las ganancias."
      },

      // Pages - Utilizadores
      "Para Profissionais e Estudantes": { en: "For Professionals and Students", fr: "Pour Professionnels et Étudiants", es: "Para Profesionales y Estudiantes" },
      "Encontre o espaço perfeito para o seu trabalho. Produtividade e flexibilidade ao seu alcance.": {
        en: "Find the perfect space for your work. Productivity and flexibility at your fingertips.",
        fr: "Trouvez l'espace parfait pour votre travail. Productivité et flexibilité à portée de main.",
        es: "Encuentra el espacio perfecto para tu trabajo. Productividad y flexibilidad a tu alcance."
      },
      "Pesquisa Avançada": { en: "Advanced Search", fr: "Recherche Avancée", es: "Búsqueda Avanzada" },
      "Encontre espaços por localização, comodidades, preço e disponibilidade.": {
        en: "Find spaces by location, amenities, price and availability.",
        fr: "Trouvez des espaces par emplacement, commodités, prix et disponibilité.",
        es: "Encuentra espacios por ubicación, comodidades, precio y disponibilidad."
      },
      "Múltiplos Pagamentos": { en: "Multiple Payments", fr: "Paiements Multiples", es: "Múltiples Pagos" },
      "Pague com cartão, PayPal, Stripe, M-Pesa, mKesh ou e-Mola.": {
        en: "Pay with card, PayPal, Stripe, M-Pesa, mKesh or e-Mola.",
        fr: "Payez par carte, PayPal, Stripe, M-Pesa, mKesh ou e-Mola.",
        es: "Paga con tarjeta, PayPal, Stripe, M-Pesa, mKesh o e-Mola."
      },
      "Reserva Instantânea": { en: "Instant Booking", fr: "Réservation Instantanée", es: "Reserva Instantánea" },
      "Reserve espaços em tempo real com confirmação imediata.": {
        en: "Book spaces in real time with immediate confirmation.",
        fr: "Réservez des espaces en temps réel avec confirmation immédiate.",
        es: "Reserva espacios en tiempo real con confirmación inmediata."
      },
      "Flexibilidade Total": { en: "Total Flexibility", fr: "Flexibilité Totale", es: "Flexibilidad Total" },
      "Reserve por horas, dias ou meses. Adapta-se às suas necessidades de trabalho.": {
        en: "Book by hours, days or months. Adapts to your work needs.",
        fr: "Réservez par heures, jours ou mois. S'adapte à vos besoins de travail.",
        es: "Reserva por horas, días o meses. Se adapta a tus necesidades de trabajo."
      },
      "Comunidade": { en: "Community", fr: "Communauté", es: "Comunidad" },
      "Conecte-se com outros profissionais e faça networking de qualidade.": {
        en: "Connect with other professionals and do quality networking.",
        fr: "Connectez-vous avec d'autres professionnels et faites du réseautage de qualité.",
        es: "Conéctate con otros profesionales y haz networking de calidad."
      },
      "Eventos": { en: "Events", fr: "Événements", es: "Eventos" },
      "Participe de eventos de networking e mais.": {
        en: "Participate in networking events and more.",
        fr: "Participez à des événements de réseautage et plus.",
        es: "Participa en eventos de networking y más."
      },

      // Contact Page
      "Entre em Contacto": { en: "Contact Us", fr: "Contactez-nous", es: "Contáctanos" },
      "Tem alguma pergunta? Adoraríamos ouvir de si. Envie-nos uma mensagem e responderemos o mais rápido possível.": {
        en: "Have any questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        fr: "Avez-vous des questions? Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.",
        es: "¿Tienes alguna pregunta? Nos encantaría saber de ti. Envíanos un mensaje y responderemos lo antes posible."
      },
      "Primeiro Nome": { en: "First Name", fr: "Prénom", es: "Primer Nombre" },
      "Último Nome": { en: "Last Name", fr: "Nom de Famille", es: "Apellido" },
      "Email": { en: "Email", fr: "Email", es: "Correo" },
      "Empresa": { en: "Company", fr: "Entreprise", es: "Empresa" },
      "Tipo de Consulta": { en: "Inquiry Type", fr: "Type de Demande", es: "Tipo de Consulta" },
      "Vendas e Informações Gerais": { en: "Sales & General Information", fr: "Ventes et Informations Générales", es: "Ventas e Información General" },
      "Parcerias": { en: "Partnerships", fr: "Partenariats", es: "Colaboraciones" },
      "Suporte Técnico": { en: "Technical Support", fr: "Support Technique", es: "Soporte Técnico" },
      "Outro": { en: "Other", fr: "Autre", es: "Otro" },
      "Mensagem": { en: "Message", fr: "Message", es: "Mensaje" },
      "Enviar Mensagem": { en: "Send Message", fr: "Envoyer Message", es: "Enviar Mensaje" },
      "A Enviar...": { en: "Sending...", fr: "Envoi...", es: "Enviando..." },

      // How It Works Section
      "Quatro passos simples para encontrar e reservar o seu espaço de trabalho ideal": {
        en: "Four simple steps to find and book your ideal workspace",
        fr: "Quatre étapes simples pour trouver et réserver votre espace de travail idéal",
        es: "Cuatro pasos simples para encontrar y reservar tu espacio de trabajo ideal"
      },
      "Pesquise": { en: "Search", fr: "Rechercher", es: "Buscar" },
      "Encontre o espaço ideal na sua localização preferida com os nossos filtros avançados.": {
        en: "Find the ideal space in your preferred location with our advanced filters.",
        fr: "Trouvez l'espace idéal dans votre emplacement préféré avec nos filtres avancés.",
        es: "Encuentra el espacio ideal en tu ubicación preferida con nuestros filtros avanzados."
      },
      "Reserve": { en: "Book", fr: "Réserver", es: "Reservar" },
      "Escolha as datas e horários que melhor se adequam à sua agenda de trabalho.": {
        en: "Choose the dates and times that best suit your work schedule.",
        fr: "Choisissez les dates et heures qui conviennent le mieux à votre horaire de travail.",
        es: "Elige las fechas y horarios que mejor se adapten a tu agenda de trabajo."
      },
      "Pague": { en: "Pay", fr: "Payer", es: "Pagar" },
      "Efectue o pagamento de forma segura através de cartão, PayPal, Stripe ou carteiras móveis.": {
        en: "Make payment securely through card, PayPal, Stripe or mobile wallets.",
        fr: "Effectuez le paiement en toute sécurité par carte, PayPal, Stripe ou portefeuilles mobiles.",
        es: "Realiza el pago de forma segura a través de tarjeta, PayPal, Stripe o billeteras móviles."
      },
      "Trabalhe": { en: "Work", fr: "Travailler", es: "Trabajar" },
      "Desfrute do seu espaço de trabalho reservado e concentre-se no que realmente importa.": {
        en: "Enjoy your reserved workspace and focus on what really matters.",
        fr: "Profitez de votre espace de travail réservé et concentrez-vous sur ce qui compte vraiment.",
        es: "Disfruta de tu espacio de trabajo reservado y concéntrate en lo que realmente importa."
      }
    };

    const translatedText = mockTranslations[text]?.[targetLanguage] || text;

    console.log(`Translation successful: "${translatedText}"`);

    return new Response(
      JSON.stringify({ translatedText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in translate-text function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});