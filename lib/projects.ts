export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  thumbnail: string;
  client?: string;
  year?: string;
  description?: string;
  images?: string[];
  services?: string[];
  challenge?: string;
  solution?: string;
  results?: string;
}

export const projects: Project[] = [
  {
    slug: 'ecosfera-urbana',
    title: 'Ecosfera Urbana',
    summary: 'Campaña creativa para promover prácticas sostenibles en ciudades latinoamericanas.',
    tags: ['Branding', 'Campaña'],
    thumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
    client: 'Red Latinoamericana de Ciudades Sostenibles',
    year: '2023',
    description: 'Una iniciativa integral para transformar la relación entre los ciudadanos y su entorno urbano mediante intervenciones artísticas y comunicación estratégica.',
    images: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200'
    ],
    services: ['Estrategia de Marca', 'Diseño Gráfico', 'Redes Sociales'],
    challenge: 'Conectar emocionalmente a los habitantes de grandes urbes con la importancia de la sostenibilidad cotidiana, superando la apatía y el cinismo.',
    solution: 'Desarrollamos una identidad visual vibrante y un tono de voz cercano que celebra las pequeñas acciones, utilizando el arte urbano como canal principal.',
    results: 'Alcance de más de 2 millones de personas en 3 países y un aumento del 40% en la participación de programas municipales de reciclaje.'
  },
  {
    slug: 'conexion-aula',
    title: 'Conexión Aula',
    summary: 'Plataforma educativa que humaniza el aprendizaje digital para comunidades vulnerables.',
    tags: ['UX/UI', 'Producto Digital'],
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    client: 'Fundación Educación para Todos',
    year: '2024',
    description: 'Diseño de experiencia de usuario para una plataforma de aprendizaje remoto diseñada específicamente para zonas con baja conectividad.',
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200'
    ],
    services: ['Investigación UX', 'Diseño de Interfaz', 'Prototipado'],
    challenge: 'Crear una interfaz intuitiva y ligera que funcione en dispositivos antiguos y con conexiones inestables, sin sacrificar la calidad pedagógica.',
    solution: 'Implementamos un diseño "offline-first" con una estética limpia y amigable, priorizando la claridad y la accesibilidad sobre elementos decorativos pesados.',
    results: 'Adopción por más de 50 escuelas rurales y una tasa de finalización de cursos del 85%.'
  },
  {
    slug: 'raices-del-futuro',
    title: 'Raíces del Futuro',
    summary: 'Identidad visual y storytelling para una organización enfocada en reforestación comunitaria.',
    tags: ['Branding', 'Estrategia'],
    thumbnail: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
    client: 'Organización Comunitaria Bosques Vivos',
    year: '2023',
    description: 'Rebranding completo para una ONG que busca empoderar a comunidades locales a través de la reforestación y el cuidado del suelo.',
    images: [
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200'
    ],
    services: ['Identidad Corporativa', 'Narrativa de Marca', 'Material Impreso'],
    challenge: 'La organización era percibida como técnica y distante. Necesitaban una marca que inspirara pertenencia y acción comunitaria.',
    solution: 'Creamos un sistema visual basado en formas orgánicas y colores de la tierra, acompañado de una narrativa que pone a la comunidad en el centro de la historia.',
    results: 'Aumento del 200% en voluntariado local y reconocimiento internacional por mejores prácticas de comunicación ambiental.'
  },
  {
    slug: 'impacto-visual',
    title: 'Impacto Visual',
    summary: 'Diseño de reporte anual interactivo para ONG de derechos humanos.',
    tags: ['Diseño Editorial', 'Web'],
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    client: 'Human Rights Watch',
    year: '2022',
    description: 'Transformación de un reporte denso y técnico en una experiencia digital interactiva y conmovedora.',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200'
    ],
    services: ['Diseño Web', 'Visualización de Datos', 'Dirección de Arte'],
    challenge: 'Hacer accesibles y comprensibles datos complejos sobre violaciones de derechos humanos sin trivializar el sufrimiento.',
    solution: 'Utilizamos scrollytelling y visualización de datos interactiva para guiar al usuario a través de la información, equilibrando datos duros con historias personales.',
    results: 'El reporte más leído en la historia de la organización, con un tiempo promedio de permanencia de 8 minutos.'
  },
  {
    slug: 'voces-nativas',
    title: 'Voces Nativas',
    summary: 'Plataforma de podcast para preservar lenguas indígenas en peligro de extinción.',
    tags: ['Audio', 'Web', 'Cultura'],
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800',
    client: 'UNESCO',
    year: '2024',
    description: 'Un archivo sonoro vivo que celebra la diversidad lingüística y cultural a través de historias contadas en primera persona.',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200',
      'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?w=1200',
      'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=1200'
    ],
    services: ['Diseño Sonoro', 'Plataforma Web', 'Identidad Visual'],
    challenge: 'Preservar lenguas orales en un formato digital moderno que sea atractivo para las nuevas generaciones.',
    solution: 'Diseñamos una experiencia auditiva inmersiva acompañada de una interfaz visual minimalista que da protagonismo a la voz y al paisaje sonoro.',
    results: 'Documentación de 12 lenguas en peligro y creación de una comunidad activa de jóvenes hablantes.'
  },
  {
    slug: 'energia-limpia',
    title: 'Energía Limpia',
    summary: 'Rebranding para startup de energía solar accesible.',
    tags: ['Branding', 'Identidad'],
    thumbnail: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800',
    client: 'SolarTech',
    year: '2023',
    description: 'Redefinición de la marca para una empresa que busca democratizar el acceso a la energía solar en hogares de bajos recursos.',
    images: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200'
    ],
    services: ['Estrategia de Marca', 'Diseño de Identidad', 'Web Corporativa'],
    challenge: 'Diferenciarse en un mercado saturado de tecnología "fría" y conectar con las necesidades reales de las familias.',
    solution: 'Construimos una marca cálida y optimista, centrada en el bienestar y el ahorro familiar, alejándonos del tecnicismo habitual del sector.',
    results: 'Duplicación de las instalaciones mensuales y apertura de dos nuevas sucursales regionales.'
  }
];
