import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/animations/FadeIn';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { Monitor, Server, Cloud, Wrench } from 'lucide-react';
import { skillCategories } from '@/data/skills';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: Monitor,
  Backend: Server,
  DevOps: Cloud,
  Tools: Wrench,
};

export function Skills() {
  return (
    <SectionWrapper id="skills" alt>
      <FadeIn>
        <div className="mb-12 flex flex-col gap-2">
          <p className="text-sm font-medium text-primary">Expertise</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Skills
          </h2>
          <p className="mt-1 max-w-xl text-muted-foreground">
            Las herramientas y tecnologías con las que trabajo día a día.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((cat, i) => {
          const Icon = CATEGORY_ICONS[cat.category] ?? Monitor;
          return (
            <FadeIn key={cat.category} delay={i * 0.08}>
              <div className="flex flex-col gap-4 rounded-xl border border-border bg-[var(--surface)] p-5 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {cat.category}
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  {cat.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
