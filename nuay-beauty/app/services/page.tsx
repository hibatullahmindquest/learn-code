'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/components/LanguageContext';
import { content } from '@/lib/data';
import { useSiteData } from '@/components/SiteDataContext';
import { ArrowRight, ArrowUpRight, Drop } from '@phosphor-icons/react';

const categoryLabels: Record<string, { en: string; bm: string }> = {
  lash: { en: 'Lash', bm: 'Lash' },
  brow: { en: 'Brows', bm: 'Kening' },
  lip: { en: 'Lips', bm: 'Bibir' },
  facial: { en: 'Facial', bm: 'Rawatan Wajah' },
  hair: { en: 'Hair Removal', bm: 'Buang Bulu' },
};

const categoryOrder = ['lash', 'brow', 'lip', 'facial', 'hair'];

export default function ServicesPage() {
  const { lang } = useLang();
  const t = content[lang];
  const { contact, services } = useSiteData();
  const BOOKING_URL = contact.bookingUrl;
  const [activeCategory, setActiveCategory] = useState(categoryOrder[0]);

  const grouped = categoryOrder
    .map((cat) => ({
      key: cat,
      label: lang === 'en' ? categoryLabels[cat].en : categoryLabels[cat].bm,
      items: services.filter((s) => s.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Track active category on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id.replace('cat-', ''));
          }
        });
      },
      { threshold: 0.15, rootMargin: '-120px 0px -50% 0px' }
    );
    categoryOrder.forEach((cat) => {
      const el = document.getElementById(`cat-${cat}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (cat: string) => {
    const el = document.getElementById(`cat-${cat}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ─────────────── HEADER ─────────────── */}
      <section
        className="relative pt-36 pb-20 md:pb-24 px-6 lg:px-10 overflow-hidden"
        style={{ background: 'var(--charcoal)' }}
      >
        {/* Decorative accent image */}
        <div
          className="absolute top-0 right-0 h-full w-[45vw] md:w-[35vw] pointer-events-none hidden md:block"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)',
          }}
        >
          <Image
            src="/images/nuay-studio-3.avif"
            alt=""
            fill
            className="object-cover"
            style={{ mixBlendMode: 'luminosity', opacity: 0.18 }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className="reveal"
            style={{ transform: 'translateY(32px)' } as React.CSSProperties}
          >
            <p className="text-xs tracking-[0.42em] uppercase mb-5" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Full Menu' : 'Menu Penuh'}
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-6"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {lang === 'en' ? (
                <>Our <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Services</span></>
              ) : (
                <>Servis <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Kami</span></>
              )}
            </h1>
            <p className="text-base max-w-md leading-relaxed" style={{ color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>
              {t.services.sub}
            </p>
          </div>

          {/* Wudhu badge */}
          <div
            className="reveal mt-8"
            style={{ transform: 'translateY(16px)', '--delay': '0.15s' } as React.CSSProperties}
          >
            <div
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full"
              style={{
                background: 'rgba(245,239,230,0.06)',
                border: '1px solid rgba(201,169,110,0.28)',
                backdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              <Drop size={13} weight="fill" style={{ color: 'var(--gold)' }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(245,239,230,0.7)' }}>
                {lang === 'en' ? 'All products are wudhu-friendly' : 'Semua produk mesra wudhu'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, var(--cream), transparent)' }} />
      </section>

      {/* ─────────────── STICKY CATEGORY NAV ─────────────── */}
      <div
        className="sticky top-16 z-30 py-3 px-6 lg:px-10 border-b"
        style={{ background: 'var(--cream)', borderColor: 'var(--beige)' }}
      >
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {grouped.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => scrollToCategory(key)}
              className="px-4 py-2 rounded-full text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-300"
              style={{
                background: activeCategory === key ? 'var(--charcoal)' : 'transparent',
                color: activeCategory === key ? 'var(--cream)' : 'var(--muted)',
                border: activeCategory === key ? 'none' : '1px solid var(--beige)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────── SERVICE CATEGORIES ─────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-20 md:gap-28">
          {grouped.map(({ key, label, items }) => (
            <div key={key} id={`cat-${key}`} className="scroll-mt-32">

              {/* Category header */}
              <div
                className="reveal flex items-end gap-6 mb-10"
                style={{ transform: 'translateY(24px)' } as React.CSSProperties}
              >
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: 'var(--gold)' }}>
                    {lang === 'en' ? 'Category' : 'Kategori'}
                  </p>
                  <h2
                    className="text-4xl md:text-5xl tracking-tight leading-none"
                    style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
                  >
                    {label}
                  </h2>
                </div>
                <div className="flex-1 h-px mb-2" style={{ background: 'var(--beige)' }} />
                <span className="text-xs font-mono mb-2" style={{ color: 'var(--muted)' }}>
                  {String(items.length).padStart(2, '0')} {lang === 'en' ? 'services' : 'servis'}
                </span>
              </div>

              {/* Service rows */}
              <div className="flex flex-col">
                {items.map((svc, i) => (
                  <div
                    key={svc.id}
                    className="reveal group"
                    style={{ transform: 'translateY(28px)', '--delay': `${i * 0.06}s` } as React.CSSProperties}
                  >
                    <div
                      className="py-6 md:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 -mx-5 rounded-2xl transition-colors duration-300"
                      style={{ borderBottom: '1px solid var(--beige)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <h3
                            className="text-xl md:text-[1.35rem]"
                            style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--charcoal)' }}
                          >
                            {lang === 'en' ? svc.nameEn : svc.nameBm}
                          </h3>
                          {svc.badge && (
                            <span
                              className="text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                              style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
                            >
                              {svc.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--muted)' }}>
                          {lang === 'en' ? svc.descEn : svc.descBm}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
                        <div className="flex items-center gap-4">
                          <span className="text-xs tracking-wide px-3 py-1 rounded-full" style={{ border: '1px solid var(--beige)', color: 'var(--muted)' }}>
                            {svc.duration}
                          </span>
                          <p
                            className="text-2xl"
                            style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, color: 'var(--burgundy)' }}
                          >
                            RM {svc.price}
                          </p>
                        </div>
                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm px-5 py-2.5 rounded-full transition-all duration-200 active:scale-[0.97] whitespace-nowrap"
                          style={{ background: 'var(--charcoal)', color: 'var(--cream)' }}
                        >
                          {lang === 'en' ? 'Book' : 'Tempah'}
                          <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─────────────── BOTTOM CTA ─────────────── */}
        <div
          className="reveal mt-24 md:mt-32 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{ background: 'var(--charcoal)', transform: 'translateY(32px)' } as React.CSSProperties}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full pointer-events-none"
            style={{ background: 'rgba(125,46,53,0.15)', filter: 'blur(80px)' }}
          />
          <div className="relative z-10">
            <p className="text-xs tracking-[0.38em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Not sure which to choose?' : 'Tak pasti nak pilih yang mana?'}
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {lang === 'en' ? (
                <>Let us <span style={{ fontStyle: 'italic', fontWeight: 400 }}>guide</span> you.</>
              ) : (
                <>Biar kami <span style={{ fontStyle: 'italic', fontWeight: 400 }}>bantu</span> anda.</>
              )}
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'rgba(245,239,230,0.45)', fontWeight: 300 }}>
              {lang === 'en'
                ? 'Book a free consultation and we\'ll recommend the perfect treatment for you.'
                : 'Tempah konsultasi percuma dan kami akan cadangkan rawatan terbaik untuk anda.'}
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-300 active:scale-[0.97]"
              style={{ background: 'var(--cream)', color: 'var(--charcoal)' }}
            >
              {lang === 'en' ? 'Book a Consultation' : 'Tempah Konsultasi'}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
