import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'metricflow',
    title: 'MetricFlow',
    description:
      'SaaS B2B multi-tenant para analítica de agencias y franquicias. Roles RBAC, invitaciones por magic link y reportes PDF white-label.',
    longDescription:
      'Plataforma SaaS con arquitectura multi-tenant, dashboard dark mode, roles Owner/Manager/Client, invitaciones por magic link via Nodemailer, y exportación de reportes PDF branded con @react-pdf/renderer.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth'],
    imageUrl: '/projects/project-1.webp',
    repoUrl: 'https://github.com/Articrafter93/1-MetricFlow',
    demoUrl: 'https://1-metricflow.vercel.app',
    featured: true,
    year: 2026,
  },
  {
    id: 'pulseboard',
    title: 'PulseBoard',
    description:
      'Tablero Kanban colaborativo en tiempo real inspirado en Linear. Sincronización via Socket.IO + Redis y autenticación con Clerk.',
    longDescription:
      'Kanban board full-stack con persistencia en PostgreSQL, sincronización en tiempo real via Socket.IO y Redis, autenticación con Clerk (modo mock para desarrollo) y tests E2E con Playwright.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.IO', 'Redis'],
    imageUrl: '/projects/project-2.webp',
    repoUrl: 'https://github.com/Articrafter93/2-pulseboard-kanban-linear',
    demoUrl: 'https://2-pulseboard-kanban-linear.vercel.app',
    featured: true,
    year: 2026,
  },
  {
    id: 'social-media-scheduler',
    title: 'Social Media Scheduler Pro',
    description:
      'SaaS multi-tenant para programar y monitorear publicaciones en redes sociales. Colas distribuidas con DLQ, OAuth y observabilidad en tiempo real.',
    longDescription:
      'Plataforma profesional para agencias y equipos de marketing: dashboard de métricas, calendario de publicaciones, monitor de colas en tiempo real con Socket.IO, gestión de cuentas OAuth, composer con media y programación por zona horaria.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.IO', 'Redis', 'Prisma'],
    imageUrl: '/projects/project-3.webp',
    repoUrl: 'https://github.com/Articrafter93/3-social-media-scheduler',
    demoUrl: 'https://3-social-media-scheduler.vercel.app',
    featured: true,
    year: 2026,
  },
  {
    id: 'knowbase-ai',
    title: 'KnowBase AI',
    description:
      'Base de conocimiento personal con chat AI, retrieval híbrido (pgvector + Qdrant) y memoria persistente entre conversaciones.',
    longDescription:
      'Knowledge base con ingestion de PDF, DOCX, TXT, Markdown, imágenes y audio. Backend FastAPI con Celery + Redis para jobs async, orquestación con LangGraph y embeddings con OpenAI.',
    stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'OpenAI'],
    imageUrl: '/projects/project-4.png',
    repoUrl: 'https://github.com/Articrafter93/4-knowbase-ai',
    demoUrl: 'https://4-knowbase-ai.vercel.app',
    featured: true,
    year: 2026,
  },
  {
    id: 'medisync',
    title: 'MediSync Health Solutions',
    description:
      'Plataforma de telesalud premium para PYMEs. Gestión de citas, cumplimiento HIPAA/GDPR y WebRTC para consultas seguras.',
    longDescription:
      'Sistema integral de telesalud con Next.js, PostgreSQL y TimescaleDB para telemetría. Incluye gestión inteligente de zonas horarias para citas internacionales, Socket.io + Fastify para WebRTC signaling y máximo cumplimiento de privacidad (HIPAA, GDPR, Ley 1581 Colombia).',
    stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'TimescaleDB', 'WebRTC'],
    imageUrl: '/projects/project-5.png',
    repoUrl: 'https://github.com/Articrafter93/5-Sistema-de-gesti-n-de-citas-de-telesalud',
    demoUrl: 'https://5-sistema-de-gestion-de-citas-telesalud.vercel.app',
    featured: true,
    year: 2026,
  },
  {
    id: 'nubetic',
    title: 'NubeTIC Corporate',
    description:
      'Sitio corporativo renovado para empresa de cloud, ciberseguridad y telecomunicaciones. Enfocado en conversión B2B y cumplimiento de privacidad.',
    longDescription:
      'Renovación completa del sitio corporativo de NubeTIC S.A.S. con arquitectura multi-página (Home, Servicios, Nosotros, Casos, Blog, Contacto). API interna para contacto con Resend, optimización SEO, formulario de leads con privacidad garantizada y diseño orientado a conversión comercial.',
    stack: ['Next.js', 'TypeScript', 'Resend', 'Vercel'],
    imageUrl: '/projects/project-6.png',
    repoUrl: 'https://github.com/Articrafter93/NubeTIC-2.0',
    demoUrl: 'https://nubetic.vercel.app',
    featured: false,
    year: 2026,
  },
  {
    id: 'gordales',
    title: 'Gordales',
    description:
      'Plataforma web oficial para cadena de comida rápida. Home, menú por categorías, sedes y leads — arquitectura multi-sede expandible.',
    longDescription:
      'Reemplaza dependencia de SaaS de terceros con plataforma propia: menú dinámico con BFF API interna, formulario de leads con rate limiting, SEO local optimizado y arquitectura preparada para Payload CMS en fase 2.',
    stack: ['Next.js', 'TypeScript', 'Zod', 'Vercel'],
    imageUrl: '/projects/project-7.png',
    repoUrl: 'https://github.com/Articrafter93/gordales',
    demoUrl: 'https://gordales.vercel.app',
    featured: false,
    year: 2026,
  },
];
