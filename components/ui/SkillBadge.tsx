'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import * as Si from 'react-icons/si';
import type { Skill } from '@/types';

interface SkillBadgeProps {
  skill: Skill;
  className?: string;
}

// Map icon string → React Icons component
function SkillIcon({ iconName }: { iconName: string }) {
  const icons = Si as Record<string, React.ComponentType<{ className?: string }>>;
  const Icon = icons[iconName];
  if (!Icon) return <span className="h-5 w-5" />;
  return <Icon className="h-5 w-5 shrink-0" />;
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
