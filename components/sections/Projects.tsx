'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, itemVariants } from '@/components/animations/StaggerContainer';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { motion } from 'motion/react';
import { projects } from '@/data/projects';

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <FadeIn>
        <div className="mb-12 flex flex-col gap-2">
          <p className="text-sm font-medium text-primary">Work</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Proyectos
          </h2>
          <p className="mt-1 max-w-xl text-muted-foreground">
            Una selección de proyectos que demuestran mi rango técnico — desde productos SaaS hasta herramientas de desarrollo.
          </p>
        </div>
      </FadeIn>

      <StaggerContainer
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.1}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
