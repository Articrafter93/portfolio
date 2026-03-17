'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, itemVariants } from '@/components/animations/StaggerContainer';
import { motion } from 'motion/react';
import * as Si from 'react-icons/si';
import { personal } from '@/data/personal';
import { useState } from 'react';

// Tech stack shown in the icon grid — refleja el stack real de Fabián
const TECH_ICONS = [
  { name: 'React', icon: 'SiReact', color: '#61DAFB' },
  { name: 'Next.js', icon: 'SiNextdotjs', color: '#ffffff' },
  { name: 'TypeScript', icon: 'SiTypescript', color: '#3178C6' },
  { name: 'Python', icon: 'SiPython', color: '#3776AB' },
  { name: 'Tailwind', icon: 'SiTailwindcss', color: '#06B6D4' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', color: '#4169E1' },
  { name: 'Docker', icon: 'SiDocker', color: '#2496ED' },
  { name: 'FastAPI', icon: 'SiFastapi', color: '#009688' },
  { name: 'Redis', icon: 'SiRedis', color: '#FF4438' },
  { name: 'Prisma', icon: 'SiPrisma', color: '#5A67D8' },
  { name: 'Vercel', icon: 'SiVercel', color: '#ffffff' },
  { name: 'Git', icon: 'SiGit', color: '#F05032' },
];

function TechIconItem({ name, icon, color }: { name: string; icon: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  const icons = Si as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>;
  const Icon = icons[icon];

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex flex-col items-center justify-center gap-1.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-[var(--surface)] transition-all duration-200 hover:border-primary/40 hover:bg-[var(--surface-hover)]">
        {Icon && (
          <Icon
            className="h-6 w-6 transition-transform duration-200 hover:scale-110"
            style={{ color: hovered ? color : undefined }}
          />
        )}
      </div>
      {hovered && (
        <span className="absolute -bottom-6 whitespace-nowrap rounded bg-foreground px-1.5 py-0.5 text-xs text-background z-10">
          {name}
        </span>
      )}
    </motion.div>
  );
}

export function About() {
  return (
    <SectionWrapper id="about" alt>
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-start">
        {/* Text column */}
        <FadeIn>
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-sm font-medium text-primary">About me</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Quién soy
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {personal.bio.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Tech stack icon grid */}
        <FadeIn delay={0.15}>
          <div className="flex flex-col gap-5">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Tech stack
            </p>
            <StaggerContainer
              className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6"
              staggerDelay={0.06}
            >
              {TECH_ICONS.map((tech) => (
                <TechIconItem key={tech.name} {...tech} />
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
