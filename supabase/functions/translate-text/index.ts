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

    // Complete mock translations for all components
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
      "Encontre o Espaço de Trabalho": { en: "Find the Workspace", fr: "Trouvez l'Espace de Travail", es: "Encuentra el Espacio de Trabajo" },
      "Perfeito para Si": { en: "Perfect for You", fr: "Parfait pour Vous", es: "Perfecto para Ti" },
      "A plataforma líder para descobrir, reservar e gerir espaços de coworking e escritórios. Conectamos proprietários e profissionais de forma simples e eficiente.": {
        en: "The leading platform to discover, book and manage coworking spaces and offices. We connect owners and professionals in a simple and efficient way.",
        fr: "La plateforme leader pour découvrir, réserver et gérer des espaces de coworking et des bureaux. Nous connectons propriétaires et professionnels de manière simple et efficace.",
        es: "La plataforma líder para descubrir, reservar y gestionar espacios de coworking y oficinas. Conectamos propietarios y profesionales de forma simple y eficiente."
      },
      "Encontrar Espaços": { en: "Find Spaces", fr: "Trouver des Espaces", es: "Encontrar Espacios" },
      "Listar o Meu Espaço": { en: "List My Space", fr: "Lister Mon Espace", es: "Listar Mi Espacio" },
      "Espaços Disponíveis": { en: "Available Spaces", fr: "Espaces Disponibles", es: "Espacios Disponibles" },
      "Utilizadores Activos": { en: "Active Users", fr: "Utilisateurs Actifs", es: "Usuarios Activos" },
      "Cidades": { en: "Cities", fr: "Villes", es: "Ciudades" },
      "Espaços de Coworking Modernos": { en: "Modern Coworking Spaces", fr: "Espaces de Coworking Modernes", es: "Espacios de Coworking Modernos" },

      // Footer
      "A plataforma líder para descobrir, reservar e gerir espaços de coworking e escritórios em Portugal e Moçambique.": {
        en: "The leading platform to discover, book and manage coworking spaces and offices in Portugal and Mozambique.",
        fr: "La plateforme leader pour découvrir, réserver et gérer des espaces de coworking et des bureaux au Portugal et au Mozambique.",
        es: "La plataforma líder para descubrir, reservar y gestionar espacios de coworking y oficinas en Portugal y Mozambique."
      },
      "Plataforma": { en: "Platform", fr: "Plateforme", es: "Plataforma" },
      "Pesquisar Espaços": { en: "Search Spaces", fr: "Rechercher des Espaces", es: "Buscar Espacios" },
      "Listar Espaço": { en: "List Space", fr: "Lister Espace", es: "Listar Espacio" },
      "Suporte": { en: "Support", fr: "Support", es: "Soporte" },
      "Centro de Ajuda": { en: "Help Center", fr: "Centre d'Aide", es: "Centro de Ayuda" },
      "Contactar Suporte": { en: "Contact Support", fr: "Contacter le Support", es: "Contactar Soporte" },
      "Termos de Serviço": { en: "Terms of Service", fr: "Conditions de Service", es: "Términos de Servicio" },
      "Política de Privacidade": { en: "Privacy Policy", fr: "Politique de Confidentialité", es: "Política de Privacidad" },
      "Engajar": { en: "Engage", fr: "S'engager", es: "Participar" },
      "Entre em contacto": { en: "Contact Us", fr: "Contactez-nous", es: "Contáctanos" },
      "Torne-se um parceiro": { en: "Become a partner", fr: "Devenez partenaire", es: "Hazte socio" },
      "Eventos": { en: "Events", fr: "Événements", es: "Eventos" },
      "Podcasts": { en: "Podcasts", fr: "Podcasts", es: "Podcasts" },
      "Participar da pesquisa do usuário": { en: "Participate in user research", fr: "Participer à la recherche utilisateur", es: "Participar en investigación de usuarios" },
      "Estamos contratando. Faça parte da equipa da HomeWorks": { en: "We're hiring. Join the HomeWorks team", fr: "Nous recrutons. Rejoignez l'équipe HomeWorks", es: "Estamos contratando. Únete al equipo de HomeWorks" },
      "Comunidade do HomeWorks": { en: "HomeWorks Community", fr: "Communauté HomeWorks", es: "Comunidad HomeWorks" },
      "Sobre a HomeWorks": { en: "About HomeWorks", fr: "À propos de HomeWorks", es: "Acerca de HomeWorks" },
      "Privacidade": { en: "Privacy", fr: "Confidentialité", es: "Privacidad" },
      "Termos do site": { en: "Site Terms", fr: "Conditions du Site", es: "Términos del Sitio" },
      "Termos da plataforma": { en: "Platform Terms", fr: "Conditions de la Plateforme", es: "Términos de la Plataforma" },
      "Carbono neutro desde 2024": { en: "Carbon neutral since 2024", fr: "Neutre en carbone depuis 2024", es: "Carbono neutro desde 2024" },
      "Subscrever newsletter": { en: "Subscribe newsletter", fr: "S'abonner à la newsletter", es: "Suscribirse al boletín" },
      "Assinar": { en: "Subscribe", fr: "S'abonner", es: "Suscribirse" },
      "Todos os direitos reservados.": { en: "All rights reserved.", fr: "Tous droits réservés.", es: "Todos los derechos reservados." },

      // Stats Section
      "Números que fazem a diferença no trabalho": { en: "Numbers that make a difference at work", fr: "Chiffres qui font la différence au travail", es: "Números que marcan la diferencia en el trabajo" },
      "Resultados comprovados que mostram o impacto da Homeworks Lab na produtividade": {
        en: "Proven results that show the impact of Homeworks Lab on productivity",
        fr: "Résultats prouvés qui montrent l'impact de Homeworks Lab sur la productivité",
        es: "Resultados comprobados que muestran el impacto de Homeworks Lab en la productividad"
      },
      "Aumento na produtividade reportado pelos utilizadores": { en: "Productivity increase reported by users", fr: "Augmentation de productivité rapportée par les utilisateurs", es: "Aumento de productividad reportado por usuarios" },
      "Profissionais activos utilizando os nossos espaços": { en: "Active professionals using our spaces", fr: "Professionnels actifs utilisant nos espaces", es: "Profesionales activos usando nuestros espacios" },
      "Junte-se aos profissionais que escolheram a excelência": { en: "Join the professionals who chose excellence", fr: "Rejoignez les professionnels qui ont choisi l'excellence", es: "Únete a los profesionales que eligieron la excelencia" },
      "Transforme a sua forma de trabalhar. Encontre o ambiente perfeito para alcançar os seus objectivos profissionais e pessoais.": {
        en: "Transform your way of working. Find the perfect environment to achieve your professional and personal goals.",
        fr: "Transformez votre façon de travailler. Trouvez l'environnement parfait pour atteindre vos objectifs professionnels et personnels.",
        es: "Transforma tu forma de trabajar. Encuentra el ambiente perfecto para alcanzar tus objetivos profesionales y personales."
      },
      "Saber Mais": { en: "Learn More", fr: "En Savoir Plus", es: "Saber Más" },

      // CTA Section
      "Pronto para Começar?": { en: "Ready to Start?", fr: "Prêt à Commencer?", es: "¿Listo para Empezar?" },
      "Junte-se a centenas de proprietários e utilizadores que já confiam na Homeworks Lab para as suas necessidades de espaços de trabalho.": {
        en: "Join hundreds of owners and users who already trust Homeworks Lab for their workspace needs.",
        fr: "Rejoignez des centaines de propriétaires et d'utilisateurs qui font déjà confiance à Homeworks Lab pour leurs besoins d'espaces de travail.",
        es: "Únete a cientos de propietarios y usuarios que ya confían en Homeworks Lab para sus necesidades de espacios de trabajo."
      },
      "Começar como Utilizador": { en: "Start as User", fr: "Commencer comme Utilisateur", es: "Empezar como Usuario" },

      // Testimonials Section
      "Depoimentos de Clientes": { en: "Customer Testimonials", fr: "Témoignages de Clients", es: "Testimonios de Clientes" },
      "Veja o que os nossos utilizadores dizem sobre a experiência Homeworks Lab": {
        en: "See what our users say about the Homeworks Lab experience",
        fr: "Voyez ce que nos utilisateurs disent de l'expérience Homeworks Lab",
        es: "Ve lo que dicen nuestros usuarios sobre la experiencia Homeworks Lab"
      },
      "A Homeworks Lab transformou completamente a minha produtividade. O ambiente é perfeito para o trabalho criativo e as facilidades são excelentes.": {
        en: "Homeworks Lab completely transformed my productivity. The environment is perfect for creative work and the facilities are excellent.",
        fr: "Homeworks Lab a complètement transformé ma productivité. L'environnement est parfait pour le travail créatif et les installations sont excellentes.",
        es: "Homeworks Lab transformó completamente mi productividad. El ambiente es perfecto para el trabajo creativo y las instalaciones son excelentes."
      },
      "Encontrei exactamente o que procurava: um espaço silencioso, bem equipado e com internet rápida. Recomendo a todos os profissionais remotos.": {
        en: "I found exactly what I was looking for: a quiet space, well equipped and with fast internet. I recommend it to all remote professionals.",
        fr: "J'ai trouvé exactement ce que je cherchais: un espace silencieux, bien équipé et avec internet rapide. Je le recommande à tous les professionnels distants.",
        es: "Encontré exactamente lo que buscaba: un espacio silencioso, bien equipado y con internet rápido. Lo recomiendo a todos los profesionales remotos."
      },
      "Designer Freelancer": { en: "Freelance Designer", fr: "Designer Freelance", es: "Diseñador Freelance" },
      "Desenvolvedor": { en: "Developer", fr: "Développeur", es: "Desarrollador" },
      "4.9/5 baseado em 200+ avaliações": { en: "4.9/5 based on 200+ reviews", fr: "4,9/5 basé sur 200+ avis", es: "4.9/5 basado en 200+ reseñas" },

      // Video Section
      "Veja Como Funciona": { en: "See How It Works", fr: "Voyez Comment Ça Marche", es: "Ve Cómo Funciona" },
      "Descubra como a Homeworks Lab está revolucionando os espaços de trabalho": {
        en: "Discover how Homeworks Lab is revolutionizing workspaces",
        fr: "Découvrez comment Homeworks Lab révolutionne les espaces de travail",
        es: "Descubre cómo Homeworks Lab está revolucionando los espacios de trabajo"
      },
      "Tour pelos Nossos Espaços": { en: "Tour Our Spaces", fr: "Visitez Nos Espaces", es: "Tour por Nuestros Espacios" },
      "Conheça os ambientes que oferecemos para o seu trabalho": {
        en: "Discover the environments we offer for your work",
        fr: "Découvrez les environnements que nous offrons pour votre travail",
        es: "Conoce los ambientes que ofrecemos para tu trabajo"
      },
      "Ver Mais Vídeos": { en: "See More Videos", fr: "Voir Plus de Vidéos", es: "Ver Más Videos" },

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