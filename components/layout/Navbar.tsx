'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { personal } from '@/data/personal';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/90 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <nav className="flex h-20 max-w-full items-center justify-between px-48 md:px-64">
        {/* Logo — inset from left */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="flex-shrink-0 text-lg font-bold text-white hover:text-primary transition-colors"
        >
          Home<span className="text-primary">.</span>
        </button>

        {/* Desktop links — center */}
        <div className="hidden items-center gap-8 md:flex flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-lg font-bold text-white hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side — inset from right */}
        <div className="flex items-center gap-3 md:gap-6">
          <Button
            size="sm"
            className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white font-bold flex-shrink-0"
            onClick={() => handleNavClick('#contact')}
          >
            Hire Me
          </Button>
          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="rounded-md px-3 py-3 text-left text-lg text-white hover:bg-muted hover:text-primary transition-colors font-bold"
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              className="mt-2 bg-primary hover:bg-primary/90 text-white font-bold"
              onClick={() => handleNavClick('#contact')}
            >
              Hire Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
