'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Drop, Shield, Star, ArrowUpRight } from '@phosphor-icons/react';
import { useLang } from '@/components/LanguageContext';
import { content, services, artists, testimonials, faqs } from '@/lib/data';
import { useSiteData } from '@/components/SiteDataContext';

// ── Asset notes (replace with real photos when ready) ─────────────────────
// HERO_BG       → /images/nuay-hero.avif            dark moody studio/treatment shot
// HERO_ACCENT   → /images/nuay-studio-1.avif         right-side fade accent
// SVC_FEATURED  → picsum placeholder                 featured service card BG
// STUDIO_GRID   → /images/nuay-studio-{1-4}.avif     gallery section
// ARTISTS       → /images/nuay-artist.png            replace per-artist when ready

const T = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)';

export default function HomePage() {
  const { lang } = useLang();
  const t = content[lang];
  const { contact } = useSiteData();

  // Scroll reveal — IntersectionObserver adds .is-visible to .reveal elements
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

  const featuredServices = services.slice(0, 4);

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ─────────────── HERO ─────────────── */}
      <section
        className="relative min-h-[100dvh] flex items-end pb-20 md:pb-28 overflow-hidden"
        style={{ background: 'var(--charcoal)' }}
      >
        {/* BG image */}
        <div className="absolute inset-0">
          <Image
            src="/images/nuay-hero.avif"
            alt="Nuay Beauty Studio"
            fill
            className="object-cover"
            style={{ opacity: 0.45 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.97) 0%, rgba(28,28,28,0.55) 55%, rgba(28,28,28,0.15) 100%)' }}
          />
        </div>

        {/* Floating accent — right side, fade-masked. REPLACE: swap to a close-up lash/eye photo */}
        <div
          className="reveal absolute top-0 right-0 h-full w-[50vw] md:w-[38vw] pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 100%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 100%)',
            transform: 'translateX(50px)',
            transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s',
          }}
        >
          <Image
            src="/images/nuay-studio-1.avif"
            alt=""
            fill
            className="object-cover object-center"
            style={{ opacity: 0.45 }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div
            className="reveal"
            style={{ transform: 'translateY(44px)', transition: T, '--delay': '0.05s' } as React.CSSProperties}
          >
            <p className="text-xs tracking-[0.42em] uppercase mb-5" style={{ color: 'var(--gold)' }}>
              {t.hero.tagline}
            </p>
            <h1
              className="text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-7"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {lang === 'en' ? (
                <>Feel Beautiful,<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>Stay Pure.</span></>
              ) : (
                <>Rasa Cantik,<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>Kekal Suci.</span></>
              )}
            </h1>
            <p
              className="text-base leading-relaxed mb-9 max-w-md"
              style={{ color: 'rgba(245,239,230,0.58)', fontWeight: 300 }}
            >
              {t.hero.sub}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 active:scale-[0.98]"
                style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
              >
                {t.hero.cta}
                <ArrowRight size={14} />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300"
                style={{ border: '1px solid rgba(245,239,230,0.2)', color: 'var(--cream)' }}
              >
                {t.hero.ctaSub}
              </Link>
            </div>
          </div>

          {/* Wudhu badge — glassmorphism */}
          <div
            className="reveal mt-10"
            style={{ transform: 'translateY(20px)', transition: T, '--delay': '0.25s' } as React.CSSProperties}
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
                {lang === 'en' ? '100% Wudhu-Friendly Products' : 'Produk 100% Mesra Wudhu'}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="w-px h-12 mx-auto" style={{ background: 'linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)' }} />
        </div>
      </section>

      {/* ─────────────── KINETIC TRUST BAR ─────────────── */}
      <div className="py-4 overflow-hidden" style={{ background: 'var(--burgundy)' }}>
        <div
          className="flex gap-14 items-center whitespace-nowrap"
          style={{ animation: 'marquee 24s linear infinite', width: 'max-content' }}
        >
          {[...Array(3)].flatMap((_, ri) =>
            [
              lang === 'en' ? 'Wudhu-Friendly Products' : 'Produk Mesra Wudhu',
              lang === 'en' ? 'Private Studio' : 'Studio Peribadi',
              lang === 'en' ? 'Korean Technique' : 'Teknik Korean',
              lang === 'en' ? 'Certified Artists' : 'Artist Bersijil',
              lang === 'en' ? '4.9 Stars · 213 Reviews' : '4.9 Bintang · 213 Ulasan',
              'Shah Alam, Selangor',
            ].map((item, i) => (
              <div key={`${ri}-${i}`} className="flex items-center gap-3 flex-shrink-0">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(245,239,230,0.78)' }}>
                  {item}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ─────────────── SERVICES ─────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="reveal" style={{ transform: 'translateY(24px)' } as React.CSSProperties}>
            <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'What We Offer' : 'Apa Yang Kami Tawarkan'}
            </p>
            <h2
              className="text-4xl md:text-5xl tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
            >
              {t.services.title}
            </h2>
          </div>
          <Link href="/services" className="reveal flex items-center gap-2 text-sm group self-start md:self-auto" style={{ color: 'var(--burgundy)' }}>
            {lang === 'en' ? 'View all services' : 'Lihat semua servis'}
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetric: large left + 3 stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

          {/* Featured large card */}
          <div
            className="reveal md:col-span-7 relative overflow-hidden rounded-3xl flex flex-col justify-end min-h-[420px] md:min-h-[580px] group cursor-pointer"
            style={{ background: 'var(--charcoal)', transform: 'translateY(44px)' } as React.CSSProperties}
          >
            {/* REPLACE: real service hero photo — lash lift close-up, dark mood */}
            <Image
              src="https://picsum.photos/seed/nuay-lash-feat/800/700"
              alt={lang === 'en' ? services[0].nameEn : services[0].nameBm}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ opacity: 0.5 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.96) 0%, rgba(28,28,28,0.08) 60%)' }} />
            <div className="relative z-10 p-8 md:p-10">
              {services[0].badge && (
                <span className="inline-block text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ background: 'var(--gold)', color: 'var(--charcoal)' }}>
                  {services[0].badge}
                </span>
              )}
              <h3
                className="text-2xl md:text-3xl mb-2.5"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, fontStyle: 'italic', color: 'var(--cream)' }}
              >
                {lang === 'en' ? services[0].nameEn : services[0].nameBm}
              </h3>
              <p className="text-sm leading-relaxed mb-5 max-w-sm" style={{ color: 'rgba(245,239,230,0.52)' }}>
                {lang === 'en' ? services[0].descEn : services[0].descBm}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-2xl" style={{ color: 'var(--gold)', fontFamily: 'var(--font-cormorant), serif' }}>
                  RM {services[0].price}
                </p>
                <span className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ border: '1px solid rgba(245,239,230,0.18)', color: 'rgba(245,239,230,0.45)' }}>
                  {services[0].duration}
                </span>
              </div>
            </div>
          </div>

          {/* 3 smaller right cards */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-5">
            {featuredServices.slice(1).map((svc, i) => (
              <div
                key={svc.id}
                className="reveal relative rounded-2xl p-6 flex flex-col justify-between group cursor-pointer"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--beige)',
                  transform: 'translateY(44px)',
                  '--delay': `${(i + 1) * 0.1}s`,
                } as React.CSSProperties}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--gold)' }}>{svc.duration}</p>
                    {svc.badge && (
                      <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}>
                        {svc.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg mb-1.5" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--charcoal)' }}>
                    {lang === 'en' ? svc.nameEn : svc.nameBm}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {lang === 'en' ? svc.descEn : svc.descBm}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid var(--beige)' }}>
                  <p className="text-lg" style={{ color: 'var(--burgundy)', fontFamily: 'var(--font-cormorant), serif', fontWeight: 500 }}>
                    RM {svc.price}
                  </p>
                  <ArrowUpRight
                    size={15}
                    style={{ color: 'var(--muted)' }}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── DARK USP — Our Promise ─────────────── */}
      <section className="py-28 md:py-44 relative overflow-hidden" style={{ background: 'var(--charcoal)' }}>
        {/* Floating decorative image — right. REPLACE: treatment/product close-up */}
        <div
          className="reveal absolute -right-8 top-0 h-full w-[44vw] pointer-events-none hidden md:block"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at right center, black 20%, transparent 75%)',
            maskImage: 'radial-gradient(ellipse 80% 80% at right center, black 20%, transparent 75%)',
            transform: 'translateX(60px)',
            transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s',
          }}
        >
          <Image src="/images/nuay-studio-2.avif" alt="" fill className="object-cover" style={{ mixBlendMode: 'luminosity', opacity: 0.22 }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">

            {/* Sticky heading */}
            <div className="lg:sticky lg:top-40 self-start h-fit">
              <p
                className="reveal text-xs tracking-[0.4em] uppercase mb-5"
                style={{ color: 'var(--gold)', transform: 'translateY(20px)' } as React.CSSProperties}
              >
                {lang === 'en' ? 'Our Promise' : 'Janji Kami'}
              </p>
              <h2
                className="reveal text-4xl md:text-5xl lg:text-[3.4rem] leading-none tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)', transform: 'translateX(-24px)', '--delay': '0.08s' } as React.CSSProperties}
              >
                {lang === 'en' ? (
                  <>Beauty without<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>compromise.</span></>
                ) : (
                  <>Cantik tanpa<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>kompromi.</span></>
                )}
              </h2>
              <p
                className="reveal mt-6 text-sm leading-relaxed max-w-[34ch]"
                style={{ color: 'rgba(245,239,230,0.42)', fontWeight: 300, transform: 'translateY(16px)', '--delay': '0.16s' } as React.CSSProperties}
              >
                {lang === 'en'
                  ? 'Every product we use is water-permeable. You leave our studio looking beautiful — and ready to pray.'
                  : 'Setiap produk kami boleh ditembusi air. Anda keluar dari studio dengan kecantikan — dan sedia untuk solat.'}
              </p>
            </div>

            {/* Numbered pillars */}
            <div className="flex flex-col gap-12 md:gap-16">
              {[
                {
                  n: '01', icon: <Drop size={20} weight="fill" style={{ color: 'var(--gold)' }} />,
                  titleEn: 'Wudhu-Friendly, Always', titleBm: 'Mesra Wudhu, Sentiasa',
                  descEn: 'Every product — from lash adhesive to lip treatment — is water-permeable. No compromise, no exceptions.',
                  descBm: 'Setiap produk — dari pelekat lash hingga rawatan bibir — boleh ditembusi air. Tiada kompromi, tiada pengecualian.',
                },
                {
                  n: '02', icon: <Shield size={20} weight="fill" style={{ color: 'var(--gold)' }} />,
                  titleEn: 'Private & Dignified', titleBm: 'Peribadi & Bermaruah',
                  descEn: 'A calm, women-only space designed for your comfort, privacy, and peace of mind.',
                  descBm: 'Ruang tenang khusus wanita, direka untuk keselesaan, privasi dan ketenangan anda.',
                },
                {
                  n: '03', icon: <Star size={20} weight="fill" style={{ color: 'var(--gold)' }} />,
                  titleEn: 'Certified Korean Technique', titleBm: 'Teknik Korean Bersijil',
                  descEn: 'Our artists are trained in advanced Korean lash and brow methods — precise, natural, lasting.',
                  descBm: 'Artist kami terlatih dalam teknik Korean lash dan brow terkini — tepat, semula jadi, tahan lama.',
                },
              ].map((item, i) => (
                <div
                  key={item.n}
                  className="reveal relative pl-10 md:pl-14 border-l"
                  style={{ borderColor: 'rgba(245,239,230,0.09)', transform: 'translateY(44px)', '--delay': `${i * 0.12}s` } as React.CSSProperties}
                >
                  <div className="absolute top-0 -left-5 md:-left-[22px]">
                    <div
                      className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-xs font-mono"
                      style={{ background: 'var(--charcoal)', border: '1px solid rgba(245,239,230,0.1)', color: 'rgba(245,239,230,0.35)' }}
                    >
                      {item.n}
                    </div>
                  </div>
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-xl md:text-2xl mb-3" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--cream)' }}>
                    {lang === 'en' ? item.titleEn : item.titleBm}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,239,230,0.42)' }}>
                    {lang === 'en' ? item.descEn : item.descBm}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── ARTISTS ─────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="reveal" style={{ transform: 'translateY(24px)' } as React.CSSProperties}>
            <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'The Team' : 'Pasukan Kami'}
            </p>
            <h2 className="text-4xl md:text-5xl tracking-tight leading-none" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}>
              {t.artists.title}
            </h2>
          </div>
          <Link href="/artists" className="reveal flex items-center gap-2 text-sm group self-start md:self-auto" style={{ color: 'var(--burgundy)' }}>
            {lang === 'en' ? 'Meet all artists' : 'Kenali semua artist'}
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {artists.slice(0, 3).map((artist, i) => (
            <Link
              key={artist.id}
              href={`/artists#${artist.id}`}
              className="reveal group block overflow-hidden rounded-3xl relative"
              style={{ aspectRatio: '3/4', transform: 'translateY(44px)', '--delay': `${i * 0.1}s` } as React.CSSProperties}
            >
              <Image
                src={artist.image || `https://picsum.photos/seed/artist-${artist.id}/500/660`}
                alt={artist.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.9) 0%, rgba(28,28,28,0.08) 55%)' }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'rgba(125,46,53,0.32)' }} />
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(245,239,230,0.88)', color: 'var(--burgundy)', fontWeight: 600 }}>
                0{i + 1}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <h3 className="text-xl mb-0.5" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, color: 'var(--cream)' }}>
                  {artist.name}
                </h3>
                <p className="text-xs tracking-wide" style={{ color: 'rgba(245,239,230,0.58)' }}>
                  {lang === 'en' ? artist.roleEn : artist.roleBm}
                </p>
                <p
                  className="text-xs leading-relaxed mt-2 max-w-[28ch] translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ color: 'rgba(245,239,230,0.68)', transition: 'opacity 0.4s ease-out, transform 0.4s ease-out' }}
                >
                  {(lang === 'en' ? artist.bioEn : artist.bioBm)?.slice(0, 82)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────── TESTIMONIALS ─────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-10" style={{ background: 'var(--charcoal)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-14" style={{ transform: 'translateY(24px)' } as React.CSSProperties}>
            <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Client Stories' : 'Cerita Pelanggan'}
            </p>
            <h2 className="text-4xl md:text-5xl tracking-tight leading-none" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}>
              {t.testimonials.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {testimonials.map((review, i) => (
              <div
                key={review.id}
                className="reveal rounded-2xl p-7"
                style={{
                  background: 'rgba(245,239,230,0.04)',
                  border: '1px solid rgba(245,239,230,0.07)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                  transform: 'translateY(32px)',
                  '--delay': `${i * 0.09}s`,
                } as React.CSSProperties}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={11} weight="fill" style={{ color: 'var(--gold)' }} />
                  ))}
                </div>
                <p className="leading-relaxed mb-5" style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', fontWeight: 300, fontSize: '1.08rem', color: 'rgba(245,239,230,0.72)' }}>
                  &ldquo;{lang === 'en' ? review.text : review.textBm}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(245,239,230,0.07)' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--cream)' }}>{review.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{review.location} · {review.service}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(201,169,110,0.22)' }}>
                    <Image src={review.image} alt={review.name} width={36} height={36} className="object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── STUDIO GALLERY ─────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="reveal" style={{ transform: 'translateY(24px)' } as React.CSSProperties}>
            <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'The Space' : 'Ruang Kami'}
            </p>
            <h2 className="text-4xl md:text-5xl tracking-tight leading-none" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}>
              {lang === 'en' ? (<>A Place to Feel<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>At Ease.</span></>) : (<>Tempat Untuk<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>Rasa Selesa.</span></>)}
            </h2>
          </div>
          <Link href="/gallery" className="flex items-center gap-2 text-sm group self-start md:self-auto" style={{ color: 'var(--burgundy)' }}>
            {lang === 'en' ? 'View gallery' : 'Lihat galeri'}
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
          <div className="reveal col-span-2 md:col-span-5 overflow-hidden rounded-3xl relative" style={{ aspectRatio: '4/5', transform: 'scale(0.97)' } as React.CSSProperties}>
            <Image src="/images/nuay-studio-1.avif" alt="Nuay Beauty Studio" fill className="object-cover transition-transform duration-700 hover:scale-[1.04]" />
          </div>
          <div className="col-span-2 md:col-span-7 grid grid-cols-2 gap-3">
            {['/images/nuay-studio-2.avif', '/images/nuay-studio-3.avif', '/images/nuay-studio-4.avif', 'https://picsum.photos/seed/nuay-studio-5/600/400'].map((src, i) => (
              <div
                key={i}
                className="reveal overflow-hidden rounded-2xl relative"
                style={{ aspectRatio: '4/3', transform: 'scale(0.97)', '--delay': `${(i + 1) * 0.07}s` } as React.CSSProperties}
              >
                <Image src={src} alt="Studio" fill className="object-cover transition-transform duration-700 hover:scale-[1.04]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="reveal" style={{ transform: 'translateY(24px)' } as React.CSSProperties}>
            <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl tracking-tight leading-none" style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}>
              {t.faq.title}
            </h2>
          </div>
          <Link href="/faq" className="reveal flex items-center gap-2 text-sm group self-start md:self-auto" style={{ color: 'var(--burgundy)' }}>
            {lang === 'en' ? 'View all questions' : 'Lihat semua soalan'}
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.slice(0, 3).map((faq, i) => (
            <details
              key={i}
              className="reveal group rounded-2xl"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--beige)',
                transform: 'translateY(32px)',
                '--delay': `${i * 0.08}s`,
              } as React.CSSProperties}
            >
              <summary
                className="flex items-center justify-between cursor-pointer px-7 py-5 text-base list-none"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, color: 'var(--charcoal)' }}
              >
                <span className="text-lg">{lang === 'en' ? faq.questionEn : faq.questionBm}</span>
                <span
                  className="ml-4 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform duration-300 group-open:rotate-45"
                  style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
                >
                  +
                </span>
              </summary>
              <div className="px-7 pb-6 pt-0">
                <p className="text-sm leading-relaxed max-w-[65ch]" style={{ color: 'var(--muted)' }}>
                  {lang === 'en' ? faq.answerEn : faq.answerBm}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}
