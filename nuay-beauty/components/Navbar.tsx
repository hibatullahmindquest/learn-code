'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X } from '@phosphor-icons/react';
import { useLang } from './LanguageContext';
import { content } from '@/lib/data';
import { useSiteData } from '@/components/SiteDataContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const t = content[lang].nav;
  const { contact } = useSiteData();
  const BOOKING_URL = contact.bookingUrl;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: t.home },
    { href: '/services', label: t.services },
    { href: '/gallery', label: t.gallery },
    { href: '/artists', label: t.artists },
    { href: '/about', label: t.about },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(245,239,230,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,180,160,0.3)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="text-xl tracking-[0.25em] font-semibold transition-colors duration-300"
              style={{ fontFamily: 'var(--font-cormorant), serif', color: scrolled ? 'var(--burgundy)' : 'var(--cream)' }}
            >
              NUAY
            </span>
            <span
              className="text-[9px] tracking-[0.4em] font-light transition-colors duration-300"
              style={{ color: scrolled ? 'var(--muted)' : 'rgba(245,239,230,0.6)' }}
            >
              BEAUTY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm tracking-wide transition-colors duration-200"
                style={{
                  color: scrolled
                    ? (pathname === l.href ? 'var(--burgundy)' : 'var(--charcoal-mid)')
                    : (pathname === l.href ? 'var(--cream)' : 'rgba(245,239,230,0.75)'),
                  fontWeight: pathname === l.href ? '500' : '400',
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bm' : 'en')}
              className="text-xs tracking-widest px-2 py-1 rounded transition-colors duration-200"
              style={{
                color: scrolled ? 'var(--muted)' : 'rgba(245,239,230,0.7)',
                border: scrolled ? '1px solid var(--beige)' : '1px solid rgba(245,239,230,0.3)',
              }}
            >
              {lang === 'en' ? 'BM' : 'EN'}
            </button>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-5 py-2 rounded-full transition-all duration-200 active:scale-95"
              style={{
                background: 'var(--burgundy)',
                color: 'var(--cream)',
                letterSpacing: '0.05em',
              }}
            >
              {t.bookNow}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'bm' : 'en')}
              className="text-xs tracking-widest px-2 py-1 rounded transition-colors duration-300"
              style={{
                color: scrolled ? 'var(--muted)' : 'rgba(245,239,230,0.7)',
                border: scrolled ? '1px solid var(--beige)' : '1px solid rgba(245,239,230,0.3)',
              }}
            >
              {lang === 'en' ? 'BM' : 'EN'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              style={{ color: scrolled ? 'var(--charcoal)' : 'var(--cream)' }}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-20 px-8 pb-10"
          style={{ background: 'var(--cream)' }}
        >
          <nav className="flex flex-col gap-6 mt-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-2xl tracking-tight"
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  color: pathname === l.href ? 'var(--burgundy)' : 'var(--charcoal)',
                  fontWeight: pathname === l.href ? '500' : '300',
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-auto w-full text-center py-4 rounded-full text-sm tracking-widest"
            style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
          >
            {t.bookNow}
          </a>
        </div>
      )}
    </>
  );
}
