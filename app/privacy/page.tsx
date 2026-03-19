import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Fabián Cubillos',
  description:
    'Privacy policy for Fabián Cubillos\' professional portfolio.',
};

const sections = [
  {
    title: 'Data I Collect',
    body: 'When you use the contact form, I only request your name, email address, and the message you wish to send.',
  },
  {
    title: 'Purpose',
    body: 'The data is used solely to respond to professional inquiries, evaluate job opportunities, or coordinate projects.',
  },
  {
    title: 'Legal Basis and Consent',
    body: 'Submitting the form requires explicit consent. I do not use pre-checked boxes and do not reuse the data for purposes other than the requested response.',
  },
  {
    title: 'Retention',
    body: 'I retain the information only for as long as necessary to manage the conversation or business process resulting from the contact.',
  },
  {
    title: 'Your Rights',
    body: 'You can request updates, corrections, or deletion of your data by writing to fcubillos93@gmail.com.',
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
            Back to home
          </Link>
          <p className="text-base font-bold text-primary">Privacy</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            This portfolio follows a minimal data collection model: it only processes the data necessary to respond to incoming requests.
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
          Last update: 2026-03-18. For any requests regarding personal data processing, write to fcubillos93@gmail.com.
        </footer>
      </div>
    </main>
  );
}
