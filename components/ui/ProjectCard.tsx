'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Github, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

const TECH_COLORS: Record<string, string> = {
  'Next.js': 'text-white bg-zinc-800',
  TypeScript: 'text-blue-300 bg-blue-950/60',
  React: 'text-cyan-300 bg-cyan-950/60',
  'Tailwind CSS': 'text-teal-300 bg-teal-950/60',
  PostgreSQL: 'text-sky-300 bg-sky-950/60',
  Prisma: 'text-indigo-300 bg-indigo-950/60',
  NextAuth: 'text-purple-300 bg-purple-950/60',
  'Socket.IO': 'text-white bg-zinc-800',
  Redis: 'text-red-300 bg-red-950/60',
  Python: 'text-yellow-300 bg-yellow-950/60',
  FastAPI: 'text-emerald-300 bg-emerald-950/60',
  OpenAI: 'text-green-300 bg-green-950/60',
  Vercel: 'text-white bg-zinc-800',
};

function TechPill({ name }: { name: string }) {
  const colorClass = TECH_COLORS[name] ?? 'text-muted-foreground bg-muted';
  return (
    <span
      className={cn(
        'rounded-md px-2 py-0.5 text-xs font-medium',
        colorClass,
      )}
    >
      {name}
    </span>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl',
        'border border-border bg-[var(--surface)]',
        'hover:border-primary/40 transition-all duration-300',
        'hover:[box-shadow:0_0_30px_var(--accent-glow)]',
      )}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Indigo overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-normal text-foreground leading-snug">
            {project.title}
          </h3>
          <span className="shrink-0 text-xs text-muted-foreground">{project.year}</span>
        </div>

        <p className="flex-1 text-sm text-white leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <TechPill key={tech} name={tech} />
          ))}
        </div>

        {/* Links */}
        <div className="flex w-full gap-2 pt-1 border-t border-border">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver código de ${project.title} en GitHub`}
              className={cn(
                "flex flex-1 items-center justify-center rounded-full py-2.5 transition-all duration-300",
                "bg-black text-white border border-white hover:bg-zinc-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              )}
            >
              <Github className="h-4.5 w-4.5" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver demo de ${project.title}`}
            className={cn(
                "flex flex-1 items-center justify-center rounded-full py-2.5 transition-all duration-300",
                "bg-[#8B5CF6] text-white border border-white hover:bg-[#7C3AED] hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              )}
            >
              <Play className="h-4 w-4 fill-current" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
