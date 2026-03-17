import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: 'monitor',
    skills: [
      { name: 'React', icon: 'SiReact' },
      { name: 'Next.js', icon: 'SiNextdotjs' },
      { name: 'TypeScript', icon: 'SiTypescript' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss' },
      { name: 'JavaScript', icon: 'SiJavascript' },
      { name: 'Motion', icon: 'SiFramer' },
    ],
  },
  {
    category: 'Backend',
    icon: 'server',
    skills: [
      { name: 'Node.js', icon: 'SiNodedotjs' },
      { name: 'Python', icon: 'SiPython' },
      { name: 'FastAPI', icon: 'SiFastapi' },
      { name: 'PostgreSQL', icon: 'SiPostgresql' },
      { name: 'Prisma', icon: 'SiPrisma' },
      { name: 'Redis', icon: 'SiRedis' },
    ],
  },
  {
    category: 'DevOps',
    icon: 'cloud',
    skills: [
      { name: 'Vercel', icon: 'SiVercel' },
      { name: 'Docker', icon: 'SiDocker' },
      { name: 'GitHub Actions', icon: 'SiGithubactions' },
      { name: 'Linux', icon: 'SiLinux' },
      { name: 'Nginx', icon: 'SiNginx' },
      { name: 'AWS', icon: 'SiAmazonwebservices' },
    ],
  },
  {
    category: 'Tools',
    icon: 'wrench',
    skills: [
      { name: 'Git', icon: 'SiGit' },
      { name: 'OpenAI', icon: 'SiOpenai' },
      { name: 'Figma', icon: 'SiFigma' },
      { name: 'Zod', icon: 'SiZod' },
      { name: 'Playwright', icon: 'SiPlaywright' },
      { name: 'Socket.IO', icon: 'SiSocketdotio' },
    ],
  },
];
