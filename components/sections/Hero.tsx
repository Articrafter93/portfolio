'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Download } from 'lucide-react';
import { personal } from '@/data/personal';
import { HeroServers } from './HeroServers';

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 1.11, 0.81, 0.99] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center hero-mesh overflow-hidden"
    >
      {/* Cyberpunk server racks with energy traces */}
      <HeroServers reduced={prefersReducedMotion ?? false} />

      {/* Content */}
      <motion.div
        className="container mx-auto flex max-w-4xl flex-col items-center px-4 text-center md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--surface)] px-4 py-1.5 text-sm text-muted-foreground">
            <span
              className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
              aria-hidden="true"
            />
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-6xl font-bold tracking-tight text-foreground md:text-8xl"
        >
          {personal.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="mb-4 text-2xl text-muted-foreground"
        >
          {personal.title}
        </motion.p>

        {/* Headline */}
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl text-xl text-muted-foreground/80"
        >
          {personal.headline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            onClick={() => scrollTo('#projects')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-bold"
          >
            View Projects
          </Button>
          <a
            href={personal.cvUrl}
            download
            aria-label="Download Resume"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-transparent px-9 text-base font-medium text-foreground transition-colors hover:bg-muted font-bold"
          >
            <Download className="h-4.5 w-4.5" />
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        aria-label="Scroll down"
        onClick={() => scrollTo('#about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
