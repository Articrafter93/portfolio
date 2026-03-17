export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  stack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl: string;
  featured: boolean;
  year: number;
}

export interface Skill {
  name: string;
  icon: string;
  level?: number;
}

export interface SkillCategory {
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Tools';
  icon: string;
  skills: Skill[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  bio: string[];
  email: string;
  cvUrl: string;
  avatarUrl?: string;
  social: SocialLink[];
}
