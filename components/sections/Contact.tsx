'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FadeIn } from '@/components/animations/FadeIn';
import { personal } from '@/data/personal';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine((value) => value, {
    message: 'You must authorize data processing to send the message',
  }),
});

type FormData = z.infer<typeof schema>;

type Status = 'idle' | 'loading' | 'success' | 'error';

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const BRAND_COLORS: Record<string, string> = {
  github: 'bg-[#24292e] dark:bg-[#24292e]',
  linkedin: 'bg-[#0077b5]',
  mail: 'bg-[#ea4335]',
};

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <SectionWrapper id="contact">
      <FadeIn>
        <div className="mb-12 flex flex-col gap-2">
          <p className="text-base font-bold text-primary">Get in touch</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Let's Work Together
          </h2>
          <p className="mt-1 max-w-xl text-muted-foreground">
            Got an interesting project? Tell me about it. I respond within 24 hours.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Contact info */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Contact Information
              </h3>
              <div className="flex flex-col gap-3">
                {personal.social.map((link) => {
                  const Icon = SOCIAL_ICONS[link.icon] ?? Mail;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.url}
                      target={link.icon !== 'mail' ? '_blank' : undefined}
                      rel={link.icon !== 'mail' ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent ${BRAND_COLORS[link.icon] ?? 'bg-[var(--surface)]'} text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-sm">{link.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-[var(--surface)] p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Currently available for full-time remote or hybrid positions, and for medium to long-term freelance projects.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                {...register('name')}
                aria-invalid={!!errors.name}
                className="bg-[var(--surface)] border-border focus:border-primary"
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                {...register('email')}
                aria-invalid={!!errors.email}
                className="bg-[var(--surface)] border-border focus:border-primary"
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                rows={5}
                {...register('message')}
                aria-invalid={!!errors.message}
                className="bg-[var(--surface)] border-border focus:border-primary resize-none"
              />
              {errors.message && (
                <p className="text-xs text-destructive">{errors.message.message}</p>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Your information is only used to respond to your message.
            </p>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="consent"
                className="flex items-start gap-3 rounded-lg border border-border bg-[var(--surface)] px-4 py-3 text-sm text-muted-foreground"
              >
                <input
                  id="consent"
                  type="checkbox"
                  {...register('consent')}
                  aria-invalid={!!errors.consent}
                  className="mt-1 h-4 w-4 rounded border-border accent-primary"
                />
                <span>
                  I authorize the processing of my data to receive a response to this
                  message and accept the{' '}
                  <a href="/privacy" className="text-primary underline underline-offset-4">
                    privacy policy
                  </a>
                  .
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-destructive">{errors.consent.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>

            {status === 'success' && (
              <p className="text-sm text-emerald-400 font-medium">
                Message sent! I'll respond soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-destructive">
                Something went wrong. Write me directly at {personal.email}.
              </p>
            )}
          </form>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
