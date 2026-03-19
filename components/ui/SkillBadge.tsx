'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import * as Si from 'react-icons/si';
import type { Skill } from '@/types';

interface SkillBadgeProps {
  skill: Skill;
  className?: string;
}

const BRAND_COLORS: Record<string, string> = {
  SiReact: '#61DAFB',
  SiNextdotjs: '#FFFFFF',
  SiTypescript: '#3178C6',
  SiTailwindcss: '#06B6D4',
  SiJavascript: '#F7DF1E',
  SiFramer: '#0055FF',
  SiNodedotjs: '#339933',
  SiPython: '#3776AB',
  SiFastapi: '#05998B',
  SiPostgresql: '#4169E1',
  SiPrisma: '#2D3748',
  SiRedis: '#FF4438',
  SiVercel: '#FFFFFF',
  SiDocker: '#2496ED',
  SiGithubactions: '#2088FF',
  SiLinux: '#FCC624',
  SiNginx: '#009639',
  SiAmazonwebservices: '#FF9900',
  SiGit: '#F05032',
  SiOpenai: '#10A37F',
  SiFigma: '#F24E1E',
  SiZod: '#3E67B1',
  SiPlaywright: '#2EAD33',
  SiSocketdotio: '#FFFFFF',
};

// Map icon string → React Icons component
function SkillIcon({ iconName }: { iconName: string }) {
  const icons = Si as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>;
  const Icon = icons[iconName];
  if (!Icon) return <span className="h-5 w-5" />;
  
  const brandColor = BRAND_COLORS[iconName];
  
  return (
    <Icon 
      className="h-5 w-5 shrink-0 transition-colors duration-300" 
      style={brandColor ? { color: brandColor } : undefined}
    />
  );
}

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'flex items-center gap-2.5 rounded-lg border border-border bg-[var(--surface)]',
        'px-3 py-2.5 text-sm font-medium text-foreground',
        'hover:border-primary/40 hover:bg-[var(--surface-hover)] transition-colors',
        className,
      )}
    >
      <SkillIcon iconName={skill.icon} />
      <span>{skill.name}</span>
      {skill.level !== undefined && (
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                i < skill.level! ? 'bg-primary' : 'bg-border',
              )}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
