import { personal } from '@/data/personal';
import { Github, Linkedin, Mail } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[var(--surface)]">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-8">
        <p className="text-sm text-muted-foreground">
          © {year} {personal.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {personal.social.map((link) => {
            const Icon = ICON_MAP[link.icon] ?? Mail;
            return (
              <a
                key={link.label}
                href={link.url}
                target={link.icon !== 'mail' ? '_blank' : undefined}
                rel={link.icon !== 'mail' ? 'noopener noreferrer' : undefined}
                aria-label={link.label}
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 inline-block"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
