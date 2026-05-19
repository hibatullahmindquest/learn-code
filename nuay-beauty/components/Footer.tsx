'use client';

import Link from 'next/link';
import { InstagramLogo, FacebookLogo, MapPin, Clock } from '@phosphor-icons/react';
import { useLang } from './LanguageContext';
import { content } from '@/lib/data';
import { useSiteData } from '@/components/SiteDataContext';

export default function Footer() {
  const { lang } = useLang();
  const t = content[lang];
  const { contact } = useSiteData();
  const { bookingUrl: BOOKING_URL, instagramUrl: INSTAGRAM_URL, facebookUrl: FACEBOOK_URL } = contact;
  const address = lang === 'en' ? contact.addressEn : contact.addressBm;
  const hours = lang === 'en' ? contact.hoursEn : contact.hoursBm;

  return (
    <footer style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}>
      {/* CTA band */}
      <div
        className="py-16 px-6 text-center"
        style={{ background: 'var(--burgundy)' }}
      >
        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(245,239,230,0.6)' }}>
          {lang === 'en' ? 'Ready to feel beautiful?' : 'Bersedia untuk rasa cantik?'}
        </p>
        <h2
          className="text-4xl md:text-5xl mb-6 tracking-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
        >
          {lang === 'en' ? 'Book Your Session' : 'Tempah Sesi Anda'}
        </h2>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-full text-sm tracking-widest transition-all duration-200 active:scale-95"
          style={{ background: 'var(--cream)', color: 'var(--burgundy)', fontWeight: 500 }}
        >
          {t.nav.bookNow}
        </a>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <p
              className="text-xl tracking-[0.3em]"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--gold)' }}
            >
              NUAY
            </p>
            <p className="text-[9px] tracking-[0.4em]" style={{ color: 'var(--muted)' }}>
              BEAUTY
            </p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,239,230,0.6)' }}>
            {t.footer.tagline}
          </p>
          <div className="flex gap-4 mt-5">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>
              <InstagramLogo size={20} />
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>
              <FacebookLogo size={20} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--gold)' }}>
            {lang === 'en' ? 'Quick Links' : 'Pautan Cepat'}
          </p>
          <nav className="flex flex-col gap-3">
            {[
              { href: '/services', label: t.nav.services },
              { href: '/gallery', label: t.nav.gallery },
              { href: '/artists', label: t.nav.artists },
              { href: '/about', label: t.nav.about },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors duration-200 w-fit"
                style={{ color: 'rgba(245,239,230,0.6)' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--gold)' }}>
            {lang === 'en' ? 'Visit Us' : 'Lawat Kami'}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <MapPin size={16} style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }} />
              <span className="text-sm" style={{ color: 'rgba(245,239,230,0.6)' }}>
                {address}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={16} style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }} />
              <span className="text-sm" style={{ color: 'rgba(245,239,230,0.6)' }}>
                {hours}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,239,230,0.3)' }}
      >
        <span>© {new Date().getFullYear()} Nuay Beauty. All rights reserved.</span>
        <span>Shah Alam, Selangor, Malaysia</span>
      </div>
    </footer>
  );
}
