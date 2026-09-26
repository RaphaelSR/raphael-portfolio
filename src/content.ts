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
  stores?: { android: string; ios: string; androidDownloads: number; checkedAt: string };
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
    stores: { android: "https://play.google.com/store/apps/details?id=ai.modpro.app", ios: "https://apps.apple.com/us/app/modpro-ai/id6755011876", androidDownloads: 5000, checkedAt: "2026-09-08" },
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
      "GraphQL",
      {
        pt: "Arquitetura mobile",
        en: "Mobile architecture",
        es: "Arquitectura móvil",
      },
    ],
    url: "https://medely.com/",
    stores: { android: "https://play.google.com/store/apps/details?id=com.medely.proclient", ios: "https://apps.apple.com/us/app/medely-find-healthcare-shifts/id6478015730", androidDownloads: 10000, checkedAt: "2026-09-08" },
  },
{
  "id": "wine",
  "name": "Wine",
  "category": "product",
  "label": {
    "pt": "E-COMMERCE · MOBILE",
    "en": "E-COMMERCE · MOBILE",
    "es": "COMERCIO ELECTRÓNICO · MOBILE"
  },
  "description": {
    "pt": "Loja e clube de vinhos com uma experiência integrada de compra e assinatura.",
    "en": "A wine store and subscription club with an integrated shopping experience.",
    "es": "Tienda y club de vinos con una experiencia integrada de compra y suscripción."
  },
  "contribution": {
    "pt": "Evolução dos aplicativos Brasil e México, integrações e campanha sazonal de e-commerce com React Native e Next.js.",
    "en": "Development of the Brazil and Mexico apps, integrations and a seasonal e-commerce campaign with React Native and Next.js.",
    "es": "Evolución de las aplicaciones de Brasil y México, integraciones y una campaña estacional de comercio electrónico con React Native y Next.js."
  },
  "stack": [
    "React Native",
    "Next.js",
    "GraphQL"
  ],
  "url": "https://www.wine.com.br/institucional/app/",
  "stores": {
    "android": "https://play.google.com/store/apps/details?id=br.com.wine.app",
    "ios": "https://apps.apple.com/br/app/wine-loja-e-clube-de-vinhos/id1411629873",
    "androidDownloads": 1000000,
    "checkedAt": "2026-09-08"
  }
},
{
  "id": "vapt",
  "name": "Vapt Jornada",
  "category": "product",
  "label": {
    "pt": "TRANSPORTE · MOBILE",
    "en": "TRANSPORT · MOBILE",
    "es": "TRANSPORTE · MOBILE"
  },
  "description": {
    "pt": "Aplicativo que facilita a rotina de colaboradores, clientes e parceiros da Vix.",
    "en": "An app supporting everyday workflows for Vix employees, customers and partners.",
    "es": "Aplicación que facilita el día a día de empleados, clientes y socios de Vix."
  },
  "contribution": {
    "pt": "Liderança do desenvolvimento do Vapt Jornada e atuação em aplicativos de transporte com rastreamento em tempo real, analytics e registro de jornada offline, utilizando Kotlin, React Native e Expo.",
    "en": "Led Vapt Jornada development and worked on transport apps with real-time tracking, analytics and offline time tracking, using Kotlin, React Native and Expo.",
    "es": "Liderazgo del desarrollo de Vapt Jornada y trabajo en aplicaciones de transporte con seguimiento en tiempo real, analítica y registro de jornada sin conexión, utilizando Kotlin, React Native y Expo."
  },
  "stack": [
    "Kotlin",
    "React Native",
    "Expo"
  ],
  "url": "https://play.google.com/store/apps/details?id=br.com.globalsys.vaptJornada",
  "stores": {
    "android": "https://play.google.com/store/apps/details?id=br.com.globalsys.vaptJornada",
    "ios": "https://apps.apple.com/br/app/vapt-jornada-vix/id1543761379",
    "androidDownloads": 10000,
    "checkedAt": "2026-09-08"
  }
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
    id: "basilica",
    name: "Basílica de Nazaré",
    category: "experiment",
    label: { pt: "ESTUDO · ARQUITETURA 3D", en: "STUDY · 3D ARCHITECTURE", es: "ESTUDIO · ARQUITECTURA 3D" },
    description: {
      pt: "Miniatura interativa da Basílica de Nazaré, em Belém, que revela sua arquitetura em uma animação de construção.",
      en: "An interactive miniature of the Basilica of Nazaré in Belém, revealing its architecture through a construction animation.",
      es: "Miniatura interactiva de la Basílica de Nazaré, en Belém, que revela su arquitectura mediante una animación de construcción.",
    },
    contribution: {
      pt: "Geometria e materiais procedurais em Three.js, animação de montagem em shaders, linha do tempo e câmeras de detalhe. Interpretação estilizada a partir de referências visuais; não é uma reconstrução métrica do edifício.",
      en: "Procedural geometry and materials in Three.js, shader-driven assembly, a timeline and detail cameras. A stylized interpretation from visual references, not a measured reconstruction of the building.",
      es: "Geometría y materiales procedurales en Three.js, montaje animado con shaders, línea de tiempo y cámaras de detalle. Interpretación estilizada a partir de referencias visuales, no una reconstrucción métrica del edificio.",
    },
    stack: ["Three.js", "React", "TypeScript", "WebGL"],
    url: "https://basilica.raphaelrocha.com/",
  },
  {
    id: "cantinho",
    name: "Cantinho",
    category: "experiment",
    label: {
      pt: "FERRAMENTA CRIATIVA · 3D",
      en: "CREATIVE TOOL · 3D",
      es: "HERRAMIENTA CREATIVA · 3D",
    },
    description: {
      pt: "Um estúdio 3D no navegador para criar casas, editar andares e cômodos, decorar e explorar a luz ao longo do dia.",
      en: "A browser-based 3D studio for creating homes, editing floors and rooms, decorating, and exploring daylight.",
      es: "Un estudio 3D en el navegador para crear casas, editar plantas y habitaciones, decorar y explorar la luz del día.",
    },
    contribution: {
      pt: "Cena em Three.js e React Three Fiber, ferramentas de construção e edição, materiais procedurais, salvamento local e compartilhamento por link sem servidor.",
      en: "A Three.js and React Three Fiber scene with building and editing tools, procedural materials, local saving, and serverless link sharing.",
      es: "Escena en Three.js y React Three Fiber con herramientas de construcción y edición, materiales procedurales, guardado local y enlaces para compartir sin servidor.",
    },
    stack: ["Three.js", "React", "TypeScript"],
    url: "https://cantinho.raphaelrocha.com/",
  },
  {
    id: "flybrain",
    name: "Fly Brain Bench",
    category: "experiment",
    label: { pt: "ESTUDO · SIMULAÇÃO NEURAL", en: "STUDY · NEURAL SIMULATION", es: "ESTUDIO · SIMULACIÓN NEURONAL" },
    description: {
      pt: "Estudo interativo de atividade neural baseado no conectoma FlyWire da mosca-da-fruta. Permite aplicar estímulos e observar a propagação de sinais em um modelo simplificado.",
      en: "An interactive study of neural activity based on the fruit fly’s FlyWire connectome. Apply stimuli and observe signal propagation in a simplified model.",
      es: "Estudio interactivo de actividad neuronal basado en el conectoma FlyWire de la mosca de la fruta. Permite aplicar estímulos y observar la propagación de señales en un modelo simplificado.",
    },
    contribution: {
      pt: "Simulação leaky integrate-and-fire em Web Worker, visualização WebGL2 e pipeline Python para compactar e validar os dados. A animação corporal usa um decodificador computacional; não representa uma reprodução completa do cérebro ou do comportamento real. Dados FlyWire e modelo de Shiu et al., com créditos no projeto.",
      en: "Leaky integrate-and-fire simulation in a Web Worker, WebGL2 visualization and a Python pipeline for data packing and validation. Body animation uses a computational decoder; it is not a complete reproduction of the brain or real behavior. FlyWire data and the Shiu et al. model are credited in the project.",
      es: "Simulación leaky integrate-and-fire en un Web Worker, visualización WebGL2 y pipeline Python para compactar y validar datos. La animación corporal utiliza un decodificador computacional; no es una reproducción completa del cerebro ni del comportamiento real. Datos FlyWire y modelo de Shiu et al., con créditos en el proyecto.",
    },
    stack: ["JavaScript", "WebGL2", "Web Workers", "Python"],
    url: "https://flybrain.raphaelrocha.com/",
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
