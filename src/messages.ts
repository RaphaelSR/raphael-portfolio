import type { Localized } from "./i18n";
const en = {
  nav: ["Home", "Experience", "Work", "About"],
  contact: "Let’s talk",
  skip: "Skip to content",
  eyebrow: "MOBILE · FULL STACK · AI",
  hero: ["Raphael Rocha.", "Senior Mobile Engineer"],
  intro:
    "I build mobile products from architecture to release, connecting apps, web experiences and backend services. I work closely with product and design to turn business needs into reliable software.",
  workCta: "Explore my work",
  resume: "Résumé",
  focusLabel: "HOW I CONTRIBUTE",
  scope: "Mobile · Full stack · Applied AI",
  focus: [
    {
      title: "Architecture through delivery",
      description:
        "Architecture, development and release, with a focus on quality and maintainability.",
    },
    {
      title: "Full-stack development",
      description:
        "Mobile and web applications, BFFs and backend services shaped around the product.",
    },
    {
      title: "AI in engineering practice",
      description:
        "AI integrations in products and automation across development workflows.",
    },
  ],
  now: "CURRENTLY",
  nowText: "Xseed Solutions · Senior Mobile Engineer",
  nowDetail: "Cross-platform apps and backend services",
  pause: "Pause animations",
  play: "Enable animations",
  reduced: "Reduced motion follows your system",
  pathLabel: "01 / EXPERIENCE",
  pathTitle: "Professional experience.",
  pathIntro:
    "Experience building products in healthcare, mobility, financial services and e-commerce, across engineering and technical leadership roles.",
  earlier: "Explore earlier experience",
  concurrent: "Some roles ran concurrently.",
  present: "present",
  projectsLabel: "02 / SELECTED WORK",
  projectsTitle: "Selected work.",
  projectsIntro:
    "Professional contributions, independent tools and games. Explore each category to see the work behind them.",
  all: "All",
  product: "Products",
  experiment: "Experiments",
  game: "Online games",
  open: "Explore project",
  detail: "About my contribution",
  close: "Close details",
  role: "CONTRIBUTION",
  tech: "TOOLS",
  aboutLabel: "03 / ABOUT",
  aboutTitle: "Engineering with\na product perspective.",
  aboutText:
    "My experience spans healthcare, mobility, fintech, e-commerce and public services, alongside founding a hardware business. That range shapes how I connect technical decisions with the realities of a product and its operation.",
  aboutText2:
    "I work closely with product and design, taking ownership from requirements and architecture through implementation and release. I pay attention to the parts that make a difference in use: performance, offline behavior, accessibility and reliable integrations.",
  aboutText3:
    "My work extends to web applications, BFFs and backend services. I use AI in product features and development pipelines, combining automation with testing, review and clear technical judgment.",
  languages: "Native Portuguese · Fluent English · Fluent Spanish",
  education: "Computer Science · CESUPA, 2014–2018",
  toolkit: "Tools I’ve worked with",
  toolkitIntro:
    "Across professional work and personal projects. My core is mobile; the broader toolkit supports integrations, delivery and experimentation.",
  recognition: "Beyond code",
  award1: "1st place · Hackathon Insern, 2021",
  award2: "Top 5 · Amazon Launch, 2017",
  volunteer:
    "Sharing technology at more than 27 school events, alongside workshops on innovation in healthcare.",
  contactLabel: "04 / CONTACT",
  contactTitle: "Let’s talk about\nyour next product.",
  contactText:
    "For conversations about product development, technical challenges or opportunities to work together.",
  copyEmail: "Copy email",
  copied: "Email copied",
  copyFailed: "Could not copy. The address is available in the email link.",
  footer: "Raphael Rocha · Software engineering",
  back: "Back to top",
  navigation: "Main navigation",
  languageLabel: "Select language",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  filterProjects: "Filter projects",
  home: "Home",
};
export type Messages = typeof en;
export const copy: Localized<Messages> = {
  en,
  pt: {
    nav: ["Início", "Trajetória", "Trabalhos", "Sobre"],
    contact: "Vamos conversar",
    skip: "Pular para o conteúdo",
    eyebrow: "MOBILE · FULL STACK · AI",
    hero: ["Raphael Rocha.", "Senior Mobile Engineer"],
    intro:
      "Desenvolvo produtos mobile da arquitetura à publicação, conectando aplicativos, web e serviços de backend. Trabalho próximo de produto e design para transformar necessidades de negócio em software confiável.",
    workCta: "Conheça meu trabalho",
    resume: "Currículo",
    focusLabel: "COMO EU CONTRIBUO",
    scope: "Mobile · Full stack · IA aplicada",
    focus: [
      {
        title: "Da arquitetura à entrega",
        description:
          "Arquitetura, desenvolvimento e publicação, com foco em qualidade e manutenção.",
      },
      {
        title: "Desenvolvimento full stack",
        description:
          "Aplicações mobile e web, BFFs e serviços de backend orientados ao produto.",
      },
      {
        title: "IA aplicada à engenharia",
        description:
          "Integrações de IA no produto e automação de fluxos de desenvolvimento.",
      },
    ],
    now: "ATUALMENTE",
    nowText: "Xseed Solutions · Senior Mobile Engineer",
    nowDetail: "Aplicativos multiplataforma e serviços de backend",
    pause: "Pausar animações",
    play: "Ativar animações",
    reduced: "Movimento reduzido pelo sistema",
    pathLabel: "01 / TRAJETÓRIA",
    pathTitle: "Experiência profissional.",
    pathIntro:
      "Experiência em produtos de saúde, mobilidade, serviços financeiros e e-commerce, com atuação em desenvolvimento e liderança técnica.",
    earlier: "Ver experiências anteriores",
    concurrent: "Algumas atuações aconteceram em paralelo.",
    present: "atual",
    projectsLabel: "02 / TRABALHOS SELECIONADOS",
    projectsTitle: "Trabalhos selecionados.",
    projectsIntro:
      "Contribuições profissionais, ferramentas independentes e jogos. Explore cada categoria para conhecer os projetos e minha atuação.",
    all: "Todos",
    product: "Produtos",
    experiment: "Experimentos",
    game: "Jogos online",
    open: "Conhecer projeto",
    detail: "Sobre minha participação",
    close: "Fechar detalhes",
    role: "ATUAÇÃO",
    tech: "FERRAMENTAS",
    aboutLabel: "03 / SOBRE",
    aboutTitle: "Engenharia com\nvisão de produto.",
    aboutText:
      "Minha experiência passa por saúde, mobilidade, fintech, e-commerce e serviços públicos, além da criação de um negócio de hardware. Essa trajetória orienta como conecto decisões técnicas às necessidades do produto e de sua operação.",
    aboutText2:
      "Trabalho próximo de produto e design, com autonomia dos requisitos e da arquitetura à implementação e publicação. Cuido dos detalhes que fazem diferença no uso: performance, funcionamento offline, acessibilidade e integrações confiáveis.",
    aboutText3:
      "Minha atuação também abrange aplicações web, BFFs e serviços de backend. Uso IA em funcionalidades de produto e pipelines de desenvolvimento, combinando automação com testes, revisão e critério técnico.",
    languages: "Português nativo · Inglês fluente · Espanhol fluente",
    education: "Ciência da Computação · CESUPA, 2014–2018",
    toolkit: "Ferramentas com que trabalhei",
    toolkitIntro:
      "Em trabalhos profissionais e projetos pessoais. Mobile é minha especialidade; as demais ferramentas apoiam integrações, entrega e experimentação.",
    recognition: "Além do código",
    award1: "1º lugar · Hackathon Insern, 2021",
    award2: "Top 5 · Amazon Launch, 2017",
    volunteer:
      "Tecnologia compartilhada em mais de 27 eventos em escolas, além de oficinas sobre inovação na saúde.",
    contactLabel: "04 / CONTATO",
    contactTitle: "Vamos falar sobre\nseu próximo produto.",
    contactText:
      "Para conversar sobre desenvolvimento de produtos, desafios técnicos ou oportunidades de colaboração.",
    copyEmail: "Copiar e-mail",
    copied: "E-mail copiado",
    copyFailed: "Não foi possível copiar. O endereço está disponível no link.",
    footer: "Raphael Rocha · Engenharia de software",
    back: "Voltar ao início",
    navigation: "Navegação principal",
    languageLabel: "Selecionar idioma",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    filterProjects: "Filtrar projetos",
    home: "Início",
  },
  es: {
    nav: ["Inicio", "Experiencia", "Proyectos", "Sobre mí"],
    contact: "Hablemos",
    skip: "Saltar al contenido",
    eyebrow: "MOBILE · FULL STACK · IA",
    hero: ["Raphael Rocha.", "Senior Mobile Engineer"],
    intro:
      "Desarrollo productos móviles desde la arquitectura hasta la publicación, conectando aplicaciones, web y servicios de backend. Trabajo junto a producto y diseño para convertir necesidades de negocio en software fiable.",
    workCta: "Conoce mi trabajo",
    resume: "Currículum",
    focusLabel: "CÓMO CONTRIBUYO",
    scope: "Mobile · Full stack · IA aplicada",
    focus: [
      {
        title: "De la arquitectura a la entrega",
        description:
          "Arquitectura, desarrollo y publicación, con atención a la calidad y al mantenimiento.",
      },
      {
        title: "Desarrollo full stack",
        description:
          "Aplicaciones móviles y web, BFFs y servicios de backend orientados al producto.",
      },
      {
        title: "IA aplicada a la ingeniería",
        description:
          "Integración de IA en productos y automatización de los flujos de desarrollo.",
      },
    ],
    now: "ACTUALMENTE",
    nowText: "Xseed Solutions · Senior Mobile Engineer",
    nowDetail: "Aplicaciones multiplataforma y servicios de backend",
    pause: "Pausar animaciones",
    play: "Activar animaciones",
    reduced: "Movimiento reducido según el sistema",
    pathLabel: "01 / EXPERIENCIA",
    pathTitle: "Experiencia profesional.",
    pathIntro:
      "Experiencia en productos de salud, movilidad, servicios financieros y comercio electrónico, tanto en desarrollo como en liderazgo técnico.",
    earlier: "Ver experiencia anterior",
    concurrent: "Algunos puestos se desarrollaron en paralelo.",
    present: "actualidad",
    projectsLabel: "02 / PROYECTOS SELECCIONADOS",
    projectsTitle: "Proyectos seleccionados.",
    projectsIntro:
      "Contribuciones profesionales, herramientas independientes y juegos. Explora cada categoría para conocer los proyectos y mi participación.",
    all: "Todos",
    product: "Productos",
    experiment: "Experimentos",
    game: "Juegos online",
    open: "Explorar proyecto",
    detail: "Sobre mi participación",
    close: "Cerrar detalles",
    role: "CONTRIBUCIÓN",
    tech: "HERRAMIENTAS",
    aboutLabel: "03 / SOBRE MÍ",
    aboutTitle: "Ingeniería con\nvisión de producto.",
    aboutText:
      "Mi experiencia abarca salud, movilidad, fintech, comercio electrónico y servicios públicos, además de fundar un negocio de hardware. Ese recorrido orienta cómo conecto las decisiones técnicas con las necesidades del producto y su operación.",
    aboutText2:
      "Trabajo cerca de producto y diseño, con autonomía desde los requisitos y la arquitectura hasta la implementación y publicación. Cuido los detalles que marcan la diferencia en el uso: rendimiento, funcionamiento sin conexión, accesibilidad e integraciones fiables.",
    aboutText3:
      "Mi trabajo también abarca aplicaciones web, BFFs y servicios de backend. Utilizo IA en funcionalidades de producto y pipelines de desarrollo, combinando automatización con pruebas, revisión y criterio técnico.",
    languages: "Portugués nativo · Inglés fluido · Español fluido",
    education: "Ciencias de la Computación · CESUPA, 2014–2018",
    toolkit: "Herramientas con las que he trabajado",
    toolkitIntro:
      "En trabajos profesionales y proyectos personales. Mi especialidad es el desarrollo móvil; las demás herramientas apoyan integraciones, entrega y experimentación.",
    recognition: "Más allá del código",
    award1: "1.er puesto · Hackathon Insern, 2021",
    award2: "Top 5 · Amazon Launch, 2017",
    volunteer:
      "Divulgación tecnológica en más de 27 eventos escolares y talleres sobre innovación en salud.",
    contactLabel: "04 / CONTACTO",
    contactTitle: "Hablemos de\ntu próximo producto.",
    contactText:
      "Para conversar sobre desarrollo de productos, desafíos técnicos u oportunidades de colaboración.",
    copyEmail: "Copiar correo",
    copied: "Correo copiado",
    copyFailed: "No se pudo copiar. La dirección está disponible en el enlace.",
    footer: "Raphael Rocha · Ingeniería de software",
    back: "Volver al inicio",
    navigation: "Navegación principal",
    languageLabel: "Seleccionar idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    filterProjects: "Filtrar proyectos",
    home: "Inicio",
  },
};
