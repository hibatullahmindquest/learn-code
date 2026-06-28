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
  const { contact, navItems } = useSiteData();
  const BOOKING_URL = contact.bookingUrl;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV_HREF: Record<string, string> = { home: '/', services: '/services', gallery: '/gallery', artists: '/artists', about: '/about', blog: '/blog' };
  const NAV_LABEL: Record<string, string> = { home: t.home, services: t.services, gallery: t.gallery, artists: t.artists, about: t.about, blog: 'Blog' };

  const links = [...navItems]
    .filter((item) => item.visible)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({ href: NAV_HREF[item.key], label: NAV_LABEL[item.key] }));

  return (
    <div style={{ fontFamily: 'var(--font-nuay-body), sans-serif' }}>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: 'var(--wine-700)',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 grid grid-cols-3 items-center">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="text-xl tracking-[0.25em] font-semibold"
              style={{ color: 'var(--beige-50)' }}
            >
              NUAY
            </span>
            <span
              className="text-[9px] tracking-[0.4em] font-light"
              style={{ color: 'var(--gold-300)' }}
            >
              BEAUTY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center" style={{ gap: '3rem' }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm tracking-wide transition-colors duration-200"
                style={{
                  color: pathname === l.href ? 'var(--gold-300)' : 'rgba(249,246,243,0.85)',
                  fontWeight: 600,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center justify-end gap-4">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bm' : 'en')}
              className="text-xs tracking-widest px-2 py-1 rounded transition-colors duration-200"
              style={{
                color: 'rgba(249,246,243,0.8)',
                border: '1px solid rgba(249,246,243,0.35)',
              }}
            >
              {lang === 'en' ? 'BM' : 'EN'}
            </button>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-5 py-2 transition-all duration-200 active:scale-95"
              style={{
                background: 'var(--gold-500)',
                color: 'var(--ink-950)',
                letterSpacing: '0.05em',
                borderRadius: 'var(--radius-button)',
              }}
            >
              {t.bookNow}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center justify-end gap-3 col-span-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'bm' : 'en')}
              className="text-xs tracking-widest px-2 py-1 rounded transition-colors duration-300"
              style={{
                color: 'rgba(249,246,243,0.8)',
                border: '1px solid rgba(249,246,243,0.35)',
              }}
            >
              {lang === 'en' ? 'BM' : 'EN'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              style={{ color: 'var(--beige-50)' }}
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
          style={{ background: 'var(--beige-50)' }}
        >
          <nav className="flex flex-col gap-6 mt-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-2xl tracking-tight"
                style={{
                  color: pathname === l.href ? 'var(--wine-700)' : 'var(--ink-950)',
                  fontWeight: pathname === l.href ? '700' : '600',
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
            className="mt-auto w-full text-center py-4 text-sm tracking-widest"
            style={{ background: 'var(--wine-700)', color: 'var(--beige-50)', borderRadius: 'var(--radius-button)' }}
          >
            {t.bookNow}
          </a>
        </div>
      )}
    </div>
  );
}
