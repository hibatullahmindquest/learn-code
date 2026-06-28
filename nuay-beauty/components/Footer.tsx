'use client';

import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { InstagramLogo, FacebookLogo, MapPin, Clock } from '@phosphor-icons/react';
import { useLang } from './LanguageContext';
import { useSiteData, getCopy } from '@/components/SiteDataContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-footer',
  display: 'swap',
});

export default function Footer() {
  const { lang } = useLang();
  const { contact, copy } = useSiteData();
  const t = getCopy(copy, lang);
  const { instagramUrl: INSTAGRAM_URL, facebookUrl: FACEBOOK_URL } = contact;
  const address = lang === 'en' ? contact.addressEn : contact.addressBm;
  const hours = lang === 'en' ? contact.hoursEn : contact.hoursBm;

  return (
    <footer
      className={poppins.variable}
      style={{ background: 'var(--charcoal)', color: 'var(--cream)', fontFamily: 'var(--font-footer), sans-serif' }}
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <p
              className="text-xl tracking-[0.3em] font-semibold"
              style={{ color: 'var(--gold)' }}
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
