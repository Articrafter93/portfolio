import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  alt?: boolean; // alternating background
}

export function SectionWrapper({
  id,
  children,
  className,
  alt = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full py-20 md:py-28',
        alt ? 'bg-[var(--surface)]' : 'bg-background',
        className,
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {children}
      </div>
    </section>
  );
}
