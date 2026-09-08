import type { ToolName } from "./tool-sites";
import type { Label, Localized } from "./i18n";
export const links = {
  email: "raphaelrochabcc@gmail.com",
  github: "https://github.com/RaphaelSR",
  linkedin: "https://www.linkedin.com/in/raphael-rocha-903014103/",
  resume: `${import.meta.env.BASE_URL}raphael-rocha-resume.pdf`,
};
export interface Experience {
  company: string;
  period: string;
  title: Localized<string>;
  description: Localized<string>;
  tags: Label[];
  highlight?: Localized<string>;
}
export const experience: Experience[] = [
  {
    company: "Xseed Solutions",
    highlight: {
      pt: "Aplicativos mobile · BFFs e backends com NestJS",
      en: "Mobile apps · NestJS BFFs and backend services",
      es: "Aplicaciones móviles · BFFs y backends con NestJS",
    },
    period: "10.2025 —",
    title: {
      pt: "Senior Mobile Software Engineer",
      en: "Senior Mobile Software Engineer",
      es: "Ingeniero sénior de software móvil",
    },
    description: {
      pt: "Desenvolvimento mobile com React Native e Expo, serviços BFF com NestJS e decisões de arquitetura que equilibram qualidade e entrega.",
      en: "Mobile development with React Native and Expo, NestJS BFF services and architectural decisions balancing quality and delivery.",
      es: "Desarrollo móvil con React Native y Expo, servicios BFF con NestJS y decisiones de arquitectura que equilibran calidad y entrega.",
    },
    tags: ["React Native", "Expo", "NestJS"],
  },
  {
    company: "Medely",
    highlight: {
      pt: "Modernização da base mobile e evolução de arquitetura",
      en: "Mobile codebase modernization and architecture",
      es: "Modernización del código móvil y la arquitectura",
    },
    period: "10.2024 — 10.2025",
    title: {
      pt: "Senior Mobile Software Engineer",
      en: "Senior Mobile Software Engineer",
      es: "Ingeniero sénior de software móvil",
    },
    description: {
      pt: "Modernização da base mobile, evolução de arquitetura e funcionalidades com foco em estabilidade, consistência entre plataformas e manutenção.",
      en: "Modernizing the mobile codebase, architecture and core features with a focus on stability, cross-platform consistency and maintainability.",
      es: "Modernización de la base de código móvil, evolución de la arquitectura y funcionalidades con foco en estabilidad, consistencia entre plataformas y mantenimiento.",
    },
    tags: [
      "React Native",
      {
        pt: "Arquitetura",
        en: "Architecture",
        es: "Arquitectura",
      },
    ],
  },
  {
    company: "VisualBoston / O2X",
    period: "03.2024 — 10.2024",
    title: {
      pt: "Senior React Native Engineer",
      en: "Senior React Native Engineer",
      es: "Ingeniero sénior de React Native",
    },
    description: {
      pt: "Integração de uma grande atualização do O2X Tactical Performance, consultoria de performance e colaboração entre equipes dos EUA e Brasil.",
      en: "Integrating a major O2X Tactical Performance update, performance consulting and collaboration across US and Brazilian teams.",
      es: "Integración de una actualización importante de O2X Tactical Performance, consultoría de rendimiento y colaboración entre equipos de Estados Unidos y Brasil.",
    },
    tags: [
      "React Native",
      {
        pt: "Performance",
        en: "Performance",
        es: "Rendimiento",
      },
    ],
  },
  {
    company: "Fluxo",
    period: "04.2024 — 10.2024",
    title: {
      pt: "Lead Mobile Engineer",
      en: "Lead Mobile Engineer",
      es: "Líder de ingeniería móvil",
    },
    description: {
      pt: "Liderança mobile em um projeto fintech para a região amazônica, com foco em segurança, revisão de código e planejamento de infraestrutura.",
      en: "Mobile leadership for a fintech project serving the Amazon region, focusing on security, code reviews and infrastructure planning.",
      es: "Liderazgo móvil en un proyecto fintech para la región amazónica, con foco en seguridad, revisión de código y planificación de infraestructura.",
    },
    tags: ["Mobile", "Fintech"],
  },
  {
    company: "Vix / Grupo Águia Branca",
    period: "07.2022 — 10.2024",
    title: {
      pt: "Mobile Engineering Lead",
      en: "Mobile Engineering Lead",
      es: "Líder de ingeniería móvil",
    },
    description: {
      pt: "Liderança do Vapt-Jornada, com mais de 18 mil usuários ativos. Aplicativos de transporte com rastreamento em tempo real, analytics e registro de jornada offline em Kotlin.",
      en: "Leading Vapt-Jornada, serving over 18,000 active users. Transport apps with real-time tracking, analytics and offline time tracking in Kotlin.",
      es: "Liderazgo de Vapt-Jornada, con más de 18.000 usuarios activos. Aplicaciones de transporte con seguimiento en tiempo real, analítica y registro de jornada sin conexión en Kotlin.",
    },
    tags: ["React Native", "Kotlin", "Google Maps"],
  },
  {
    company: "Wine.com.br",
    period: "10.2021 — 06.2022",
    title: {
      pt: "Front-end Software Engineer",
      en: "Front-end Software Engineer",
      es: "Ingeniero de software frontend",
    },
    description: {
      pt: "Evolução dos aplicativos Brasil e México, integrações e campanha sazonal de e-commerce com React Native e Next.js.",
      en: "Evolving the Brazil and Mexico apps, integrations and a seasonal e-commerce campaign with React Native and Next.js.",
      es: "Evolución de las aplicaciones de Brasil y México, integraciones y una campaña estacional de comercio electrónico con React Native y Next.js.",
    },
    tags: ["React Native", "Next.js", "GraphQL"],
  },
  {
    company: "SEPLAD",
    period: "10.2020 — 10.2021",
    title: {
      pt: "Web & Mobile Developer",
      en: "Web & Mobile Developer",
      es: "Desarrollador web y móvil",
    },
    description: {
      pt: "Aplicações web e mobile para serviços públicos, incluindo DoarPA e acesso a programas governamentais.",
      en: "Web and mobile applications for public services, including DoarPA and access to government programs.",
      es: "Aplicaciones web y móviles para servicios públicos, incluido DoarPA y el acceso a programas gubernamentales.",
    },
    tags: ["React", "React Native"],
  },
  {
    company: "Prodepa",
    period: "03.2020 — 09.2020",
    title: {
      pt: "Front-end Developer",
      en: "Front-end Developer",
      es: "Desarrollador frontend",
    },
    description: {
      pt: "Desenvolvimento de interfaces com React e Vue.",
      en: "Developing interfaces with React and Vue.",
      es: "Desarrollo de interfaces con React y Vue.",
    },
    tags: ["React", "Vue"],
  },
  {
    company: "Casa Civil do Pará",
    period: "03.2019 — 03.2020",
    title: {
      pt: "Analista de Sistemas",
      en: "Systems Analyst",
      es: "Analista de sistemas",
    },
    description: {
      pt: "Infraestrutura de redes e evolução de sistemas internos com React, Node.js e Expo.",
      en: "Network infrastructure and internal system improvements with React, Node.js and Expo.",
      es: "Infraestructura de redes y evolución de sistemas internos con React, Node.js y Expo.",
    },
    tags: ["React", "Node.js", "Expo"],
  },
  {
    company: "LAB3D",
    period: "01.2016 — 07.2019",
    title: {
      pt: "Fundador · Desenvolvimento de projetos",
      en: "Founder · Project Development Manager",
      es: "Fundador · Desarrollo de proyectos",
    },
    description: {
      pt: "Fundação e gestão de uma startup de fabricação e treinamento em impressão 3D no norte do Brasil. Hardware, C/C++, liderança e desenvolvimento de produtos.",
      en: "Founding and running a 3D printer manufacturing and training startup in northern Brazil. Hardware, C/C++, leadership and product development.",
      es: "Fundación y gestión de una startup de fabricación de impresoras 3D y formación en el norte de Brasil. Hardware, C/C++, liderazgo y desarrollo de productos.",
    },
    tags: [
      "C/C++",
      {
        pt: "Impressão 3D",
        en: "3D printing",
        es: "Impresión 3D",
      },
    ],
  },
  {
    company: "Defensoria Pública do Pará",
    period: "01.2016 — 01.2017",
    title: {
      pt: "Estágio em infraestrutura",
      en: "Infrastructure trainee",
      es: "Prácticas en infraestructura",
    },
    description: {
      pt: "Controle de tráfego de rede, manutenção de servidores e planejamento de infraestrutura.",
      en: "Network traffic control, server maintenance and infrastructure planning.",
      es: "Control del tráfico de red, mantenimiento de servidores y planificación de infraestructura.",
    },
    tags: [],
  },
  {
    company: "Fábrica de Software / CESUPA",
    period: "02.2015 — 12.2015",
    title: {
      pt: "Estágio em desenvolvimento",
      en: "Software development trainee",
      es: "Prácticas en desarrollo de software",
    },
    description: {
      pt: "Projetos com Ruby on Rails, Java e C# para empresas da região amazônica.",
      en: "Ruby on Rails, Java and C# projects for companies in the Amazon region.",
      es: "Proyectos con Ruby on Rails, Java y C# para empresas de la región amazónica.",
    },
    tags: [],
  },
  {
    company: "CTIC / CESUPA",
    period: "08.2014 — 01.2015",
    title: {
      pt: "Estágio em desenvolvimento",
      en: "Software development trainee",
      es: "Prácticas en desarrollo de software",
    },
    description: {
      pt: "Sistemas internos em Java e controle de estoque.",
      en: "Internal Java software and stock control systems.",
      es: "Sistemas internos en Java y control de inventario.",
    },
    tags: [],
  },
];
export interface Project {
  id: string;
  name: string;
  category: "product" | "experiment" | "game";
  label: Localized<string>;
  description: Localized<string>;
  contribution: Localized<string>;
  stack: Label[];
  url: string;
}
export const projects: Project[] = [
  {
    id: "modpro",
    name: "ModPro AI",
    category: "product",
    label: {
      pt: "AUTOMOTIVO · COMUNIDADE",
      en: "AUTOMOTIVE · COMMUNITY",
      es: "AUTOMOCIÓN · COMUNIDAD",
    },
    description: {
      pt: "Plataforma automotiva que reúne gestão de veículos, modificações, comunidade e assistência com IA.",
      en: "An automotive platform combining vehicle and modification management, community and AI assistance.",
      es: "Plataforma automotriz que reúne gestión de vehículos, modificaciones, comunidad y asistencia con IA.",
    },
    contribution: {
      pt: "Desenvolvimento mobile com React Native e Expo, aplicações web com Next.js e serviços com NestJS e Supabase. Integrações de IA, autenticação e dados conectam as diferentes experiências do produto.",
      en: "Mobile development with React Native and Expo, web applications with Next.js, and services with NestJS and Supabase. AI, authentication and data integrations connect the product’s different experiences.",
      es: "Desarrollo móvil con React Native y Expo, aplicaciones web con Next.js y servicios con NestJS y Supabase. Las integraciones de IA, autenticación y datos conectan las distintas experiencias del producto.",
    },
    stack: [
      "React Native",
      "Expo",
      "Next.js",
      "NestJS",
      "Supabase",
      "TypeScript",
    ],
    url: "https://modpro.ai/",
  },
  {
    id: "medely",
    name: "Medely",
    category: "product",
    label: {
      pt: "SAÚDE · MOBILE",
      en: "HEALTHCARE · MOBILE",
      es: "SALUD · MOBILE",
    },
    description: {
      pt: "Engenharia mobile para um produto que conecta profissionais e oportunidades na saúde.",
      en: "Mobile engineering for a product connecting healthcare professionals with opportunities.",
      es: "Ingeniería móvil para un producto que conecta a profesionales de la salud con oportunidades laborales.",
    },
    contribution: {
      pt: "Como Senior Mobile Software Engineer, trabalhei na modernização da base mobile, arquitetura, estabilidade e consistência entre plataformas (2024–2025).",
      en: "As a Senior Mobile Software Engineer, I worked on mobile codebase modernization, architecture, stability and cross-platform consistency (2024–2025).",
      es: "Como Senior Mobile Software Engineer, trabajé en la modernización de la base de código móvil, la arquitectura, la estabilidad y la consistencia entre plataformas (2024–2025).",
    },
    stack: [
      "React Native",
      {
        pt: "Arquitetura mobile",
        en: "Mobile architecture",
        es: "Arquitectura móvil",
      },
    ],
    url: "https://medely.com/",
  },
  {
    id: "geometry",
    name: "Geometry",
    category: "experiment",
    label: {
      pt: "3D · FERRAMENTA CRIATIVA",
      en: "3D · CREATIVE TOOL",
      es: "3D · HERRAMIENTA CREATIVA",
    },
    description: {
      pt: "Editor 3D para criar animações com geometrias, materiais e exportação de imagens e vídeos.",
      en: "A 3D editor for creating animations with shapes, materials, and image and video export.",
      es: "Editor 3D para crear animaciones con geometrías, materiales y exportación de imágenes y vídeos.",
    },
    contribution: {
      pt: "Renderização com Three.js e React, controles tipados em TypeScript e integração entre a cena, a linha do tempo e os fluxos de exportação.",
      en: "Rendering with Three.js and React, typed controls in TypeScript, and integration between the scene, timeline and export workflows.",
      es: "Renderizado con Three.js y React, controles tipados en TypeScript e integración entre la escena, la línea de tiempo y los flujos de exportación.",
    },
    stack: ["Three.js", "React", "TypeScript"],
    url: "https://3d.raphaelrocha.com/",
  },
  {
    id: "trivia",
    name: "Trivia",
    category: "game",
    label: {
      pt: "JOGO · INTERAÇÃO",
      en: "GAME · INTERACTION",
      es: "JUEGO · INTERACCIÓN",
    },
    description: {
      pt: "Jogo de perguntas e respostas com painel interativo e pontuação em tempo real.",
      en: "A trivia game with an interactive dashboard and real-time scoring.",
      es: "Juego de preguntas y respuestas con un panel interactivo y puntuación en tiempo real.",
    },
    contribution: {
      pt: "Projeto independente voltado à interface e à dinâmica de um jogo de perguntas e respostas. Código disponível no GitHub.",
      en: "An independent project exploring the interface and mechanics of a trivia game. Source available on GitHub.",
      es: "Proyecto independiente centrado en la interfaz y la dinámica de un juego de preguntas y respuestas. Código disponible en GitHub.",
    },
    stack: [
      "Web",
      {
        pt: "Interface de jogos",
        en: "Game UI",
        es: "Interfaces de juegos",
      },
    ],
    url: "https://trivia.raphaelrocha.com/",
  },

  {
    id: "snake",
    name: "Snake",
    category: "game",
    label: {
      pt: "JOGO · CLÁSSICO",
      en: "GAME · CLASSIC",
      es: "JUEGO · CLÁSICO",
    },
    description: {
      pt: "O clássico jogo da cobra, disponível para jogar direto no navegador.",
      en: "The classic snake game, ready to play in your browser.",
      es: "El clásico juego de la serpiente, para jugar directamente en el navegador.",
    },
    contribution: {
      pt: "Projeto independente de interação e lógica de jogo. Também inspirou a cobra que escapa do telefone neste portfólio.",
      en: "An independent project in interaction and game logic. It also inspired the snake that escapes the phone in this portfolio.",
      es: "Proyecto independiente de interacción y lógica de juego. También inspiró la serpiente que escapa del teléfono en este portafolio.",
    },
    stack: ["Web"],
    url: "https://snake.raphaelrocha.com/",
  },
  {
    id: "mimica",
    name: "Mímica",
    category: "game",
    label: {
      pt: "JOGO · EM GRUPO",
      en: "GAME · GROUP PLAY",
      es: "JUEGO · EN GRUPO",
    },
    description: {
      pt: "Mímica para reunir muita gente em torno de um único celular. Organize as palavras e passe o aparelho a cada rodada.",
      en: "Charades for a whole group with just one phone. Set up the words and pass the phone around between rounds.",
      es: "Mímica para reunir a un grupo con un solo celular. Organiza las palabras y pasa el teléfono en cada ronda.",
    },
    contribution: {
      pt: "Interface mobile com lista editável, temporizador ajustável e opção de ocultar a palavra ao passar o celular.",
      en: "A mobile interface with an editable word list, adjustable timer and a way to hide the word when passing the phone.",
      es: "Interfaz móvil con lista editable, temporizador ajustable y una opción para ocultar la palabra al pasar el celular.",
    },
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://mimica.raphaelrocha.com/",
  },
];
export const toolkit: { title: Label; items: ToolName[] }[] = [
  {
    title: "Mobile",
    items: [
      "React Native",
      "Expo",
      "Kotlin",
      "React Navigation",
      "Reanimated",
      "NativeWind",
    ],
  },
  {
    title: "Web",
    items: [
      "React",
      "Next.js",
      "Vue",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Three.js",
      "Storybook",
    ],
  },
  {
    title: { pt: "Estado e dados", en: "State & data", es: "Estado y datos" },
    items: [
      "TanStack Query",
      "Zustand",
      "Redux",
      "MobX",
      "GraphQL",
      "Zod",
      "React Hook Form",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "REST APIs",
      "MongoDB",
      "SQLite",
      "Supabase",
      "PostgreSQL",
      "Drizzle",
      "Firebase",
    ],
  },
  {
    title: {
      pt: "Infraestrutura e entrega",
      en: "Infrastructure & delivery",
      es: "Infraestructura y entrega",
    },
    items: [
      "Railway",
      "Infisical",
      "Git",
      "GitHub Actions",
      "GitLab",
      "Azure DevOps",
      "AWS",
      "Amazon S3",
      "Azure",
      "Clerk",
    ],
  },
  {
    title: {
      pt: "IA e automação",
      en: "AI & automation",
      es: "IA y automatización",
    },
    items: ["OpenAI", "AI SDK", "Mastra", "Inngest", "Trigger.dev"],
  },
  {
    title: {
      pt: "Qualidade e observabilidade",
      en: "Quality & observability",
      es: "Calidad y observabilidad",
    },
    items: [
      "Jest",
      "Cypress",
      "Maestro",
      "Playwright",
      "Sentry",
      "Rollbar",
      "Statsig",
      "PostHog",
      "LaunchDarkly",
      "Figma",
    ],
  },
  {
    title: {
      pt: "Integrações de produto",
      en: "Product integrations",
      es: "Integraciones de producto",
    },
    items: [
      "Google Maps",
      "Stream",
      "Typesense",
      "Algolia",
      "Customer.io",
      "Intercom",
    ],
  },
  {
    title: {
      pt: "Outras experiências",
      en: "Earlier experience",
      es: "Otras experiencias",
    },
    items: ["Java", "C#", "Ruby on Rails", "C", "C++"],
  },
];
