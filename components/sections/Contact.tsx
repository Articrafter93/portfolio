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
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type FormData = z.infer<typeof schema>;

type Status = 'idle' | 'loading' | 'success' | 'error';

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
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
          <p className="text-sm font-medium text-primary">Get in touch</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Trabajemos juntos
          </h2>
          <p className="mt-1 max-w-xl text-muted-foreground">
            ¿Tienes un proyecto interesante? Cuéntame. Respondo en menos de 24 horas.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Contact info */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Información de contacto
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
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-[var(--surface)] group-hover:border-primary/40 group-hover:bg-[var(--surface-hover)] transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm">{link.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-[var(--surface)] p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Actualmente disponible para posiciones full-time remote o híbrido, y para proyectos freelance de duración media-larga.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Tu nombre"
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
                placeholder="tu@email.com"
                {...register('email')}
                aria-invalid={!!errors.email}
                className="bg-[var(--surface)] border-border focus:border-primary"
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                placeholder="Cuéntame sobre tu proyecto..."
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
              Tu información solo se usa para responder tu mensaje.
            </p>

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar mensaje
                </>
              )}
            </Button>

            {status === 'success' && (
              <p className="text-sm text-emerald-400 font-medium">
                ¡Mensaje enviado! Te respondo pronto.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-destructive">
                Algo salió mal. Escríbeme directamente a {personal.email}.
              </p>
            )}
          </form>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
