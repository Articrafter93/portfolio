'use client';

import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/animations/FadeIn';
import { personal } from '@/data/personal';

// Bio section
export function About() {
  return (
    <SectionWrapper id="about" alt>
      <div className="max-w-3xl">
        {/* Text column */}
        <FadeIn>
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-base font-bold text-primary">About me</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Who I Am
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {personal.bio.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
