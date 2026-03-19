import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Fabián Cubillos',
  description:
    'Política de privacidad del portafolio profesional de Fabián Cubillos.',
};

const sections = [
  {
    title: 'Datos que recopilo',
    body: 'Cuando usas el formulario de contacto, solo solicito nombre, correo electrónico y el mensaje que deseas enviar.',
  },
  {
    title: 'Finalidad',
    body: 'Los datos se usan únicamente para responder consultas profesionales, evaluar oportunidades laborales o coordinar proyectos.',
  },
  {
    title: 'Base de tratamiento y consentimiento',
    body: 'El envío del formulario requiere consentimiento explícito. No utilizo casillas premarcadas ni reutilizo los datos para fines distintos a la respuesta solicitada.',
  },
  {
    title: 'Retención',
    body: 'Conservo la información solo durante el tiempo necesario para gestionar la conversación o el proceso comercial derivado del contacto.',
  },
  {
    title: 'Derechos del titular',
    body: 'Puedes solicitar actualización, corrección o eliminación de tus datos escribiendo a fcubillos93@gmail.com.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-24 text-foreground md:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-4">
          <Link
            href="/"
            className="w-fit text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Volver al inicio
          </Link>
          <p className="text-base font-bold text-primary">Privacidad</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Politica de privacidad
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Este portafolio cumple un modelo de recolección mínima: solo procesa los
            datos necesarios para responder solicitudes entrantes.
          </p>
        </header>

        <div className="grid gap-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-border bg-[var(--surface)] p-6"
            >
              <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>

        <footer className="rounded-2xl border border-border bg-[var(--surface)] p-6 text-sm text-muted-foreground">
          Ultima actualizacion: 2026-03-18. Para cualquier solicitud sobre tratamiento
          de datos personales, escribe a fcubillos93@gmail.com.
        </footer>
      </div>
    </main>
  );
}
