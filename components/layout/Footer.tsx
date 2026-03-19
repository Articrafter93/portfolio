import { personal } from '@/data/personal';
import { Github, Linkedin, Mail } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const BRAND_COLORS: Record<string, string> = {
  github: 'bg-[#24292e] dark:bg-[#24292e]',
  linkedin: 'bg-[#0077b5]',
  mail: 'bg-[#ea4335]',
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
                className={`flex h-8 w-8 items-center justify-center rounded-full ${BRAND_COLORS[link.icon] ?? 'bg-muted'} text-white transition-all hover:scale-110 shadow-sm`}
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="/privacidad" className="hover:text-foreground transition-colors">
            Privacidad
          </a>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
