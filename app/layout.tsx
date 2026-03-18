import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

// Inter para body text
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fabian-cubillos.vercel.app'),
  title: 'Fabián Cubillos | Full-Stack Developer',
  description:
    'Full-Stack Developer especializado en Next.js, TypeScript y Node.js. Construyo productos web rápidos, accesibles y bien diseñados.',
  openGraph: {
    title: 'Fabián Cubillos | Full-Stack Developer',
    description:
      'Full-Stack Developer especializado en Next.js, TypeScript y Node.js.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fabián Cubillos | Full-Stack Developer',
    description:
      'Full-Stack Developer especializado en Next.js, TypeScript y Node.js.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geist.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
