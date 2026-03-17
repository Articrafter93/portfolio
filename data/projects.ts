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
    imageUrl: 'https://placehold.co/800x450/111111/6366f1?text=MetricFlow',
    repoUrl: 'https://github.com/Articrafter93/1-MetricFlow',
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
    imageUrl: 'https://placehold.co/800x450/111111/6366f1?text=PulseBoard',
    repoUrl: 'https://github.com/Articrafter93/2-pulseboard-kanban-linear',
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
    imageUrl: 'https://placehold.co/800x450/111111/6366f1?text=KnowBase+AI',
    repoUrl: 'https://github.com/Articrafter93/4-knowbase-ai',
    featured: true,
    year: 2026,
  },
];
