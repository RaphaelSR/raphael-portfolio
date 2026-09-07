import type { Localized } from "./i18n";
const en = {
  nav: ["Home", "Experience", "Work", "About"],
  contact: "Let’s talk",
  skip: "Skip to content",
  eyebrow: "MOBILE · FULL STACK · AI",
  hero: ["Raphael Rocha.", "Senior Mobile Engineer"],
  intro:
    "I’m a software engineer specializing in mobile, with full-stack capabilities. I build complete products, connecting technical decisions, user experience and business goals.",
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
  nowDetail: "React Native · Expo · TypeScript",
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
    "Products I’ve contributed to and independent projects I build to explore new solutions.",
  all: "All",
  product: "Products",
  experiment: "Experiments",
  open: "Explore project",
  detail: "About my contribution",
  close: "Close details",
  role: "CONTRIBUTION",
  tech: "TOOLS",
  aboutLabel: "03 / ABOUT",
  aboutTitle: "Engineering with\na product perspective.",
  aboutText:
    "I’m a software engineer focused on mobile products, with full-stack experience. I combine technical depth and business understanding to turn requirements into reliable, accessible applications that can evolve with the product.",
  aboutText2:
    "I work closely with product and design, with the autonomy to guide development from architecture to release. My work spans mobile apps, complete web applications, BFFs and backends tailored to the needs of each experience.",
  aboutText3:
    "I integrate AI into both product features and engineering processes, including automation and development pipelines. I value pragmatic decisions, clear communication and solutions that balance delivery speed, quality and long-term maintainability.",
  languages: "Native Portuguese · Fluent English · Fluent Spanish",
  education: "Computer Science · CESUPA, 2014–2018",
  toolkit: "TECHNICAL SKILLS",
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
      "Sou engenheiro de software especializado em mobile, com atuação full stack. Desenvolvo produtos completos, conectando decisões técnicas, experiência de uso e objetivos de negócio.",
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
    nowDetail: "React Native · Expo · TypeScript",
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
      "Produtos em que contribuí e projetos independentes que desenvolvo para explorar novas soluções.",
    all: "Todos",
    product: "Produtos",
    experiment: "Experimentos",
    open: "Conhecer projeto",
    detail: "Sobre minha participação",
    close: "Fechar detalhes",
    role: "ATUAÇÃO",
    tech: "FERRAMENTAS",
    aboutLabel: "03 / SOBRE",
    aboutTitle: "Engenharia com\nvisão de produto.",
    aboutText:
      "Sou engenheiro de software com foco em produtos mobile e experiência full stack. Combino profundidade técnica e visão de negócio para transformar requisitos em aplicações confiáveis, acessíveis e preparadas para evoluir.",
    aboutText2:
      "Trabalho próximo de produto e design, com autonomia para conduzir o desenvolvimento da arquitetura à publicação. Minha atuação abrange aplicativos mobile, aplicações web completas, BFFs e backends voltados às necessidades de cada experiência.",
    aboutText3:
      "Integro IA tanto às funcionalidades do produto quanto aos processos de engenharia, incluindo automação e pipelines de desenvolvimento. Valorizo decisões pragmáticas, comunicação clara e soluções que equilibram velocidade de entrega, qualidade e sustentabilidade técnica.",
    languages: "Português nativo · Inglês fluente · Espanhol fluente",
    education: "Ciência da Computação · CESUPA, 2014–2018",
    toolkit: "COMPETÊNCIAS TÉCNICAS",
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
      "Soy ingeniero de software especializado en desarrollo móvil, con experiencia full stack. Desarrollo productos completos, conectando decisiones técnicas, experiencia de uso y objetivos de negocio.",
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
    nowDetail: "React Native · Expo · TypeScript",
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
      "Productos en los que he contribuido y proyectos independientes que desarrollo para explorar nuevas soluciones.",
    all: "Todos",
    product: "Productos",
    experiment: "Experimentos",
    open: "Explorar proyecto",
    detail: "Sobre mi participación",
    close: "Cerrar detalles",
    role: "CONTRIBUCIÓN",
    tech: "HERRAMIENTAS",
    aboutLabel: "03 / SOBRE MÍ",
    aboutTitle: "Ingeniería con\nvisión de producto.",
    aboutText:
      "Soy ingeniero de software enfocado en productos móviles, con experiencia full stack. Combino profundidad técnica y visión de negocio para transformar requisitos en aplicaciones fiables, accesibles y preparadas para evolucionar.",
    aboutText2:
      "Trabajo cerca de los equipos de producto y diseño, con autonomía para guiar el desarrollo desde la arquitectura hasta la publicación. Mi trabajo abarca aplicaciones móviles, aplicaciones web completas, BFFs y backends adaptados a las necesidades de cada experiencia.",
    aboutText3:
      "Integro IA tanto en las funcionalidades del producto como en los procesos de ingeniería, incluida la automatización y los pipelines de desarrollo. Valoro las decisiones pragmáticas, la comunicación clara y las soluciones que equilibran velocidad de entrega, calidad y facilidad de mantenimiento.",
    languages: "Portugués nativo · Inglés fluido · Español fluido",
    education: "Ciencias de la Computación · CESUPA, 2014–2018",
    toolkit: "COMPETENCIAS TÉCNICAS",
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
