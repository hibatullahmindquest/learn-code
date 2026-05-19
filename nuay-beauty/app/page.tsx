'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Drop, Shield, Star } from '@phosphor-icons/react';
import { useLang } from '@/components/LanguageContext';
import { content } from '@/lib/data';
import { useSiteData } from '@/components/SiteDataContext';

export default function HomePage() {
  const { lang } = useLang();
  const t = content[lang];
  const { contact, services, artists, testimonials, images } = useSiteData();
  const BOOKING_URL = contact.bookingUrl;

  const featuredServices = services.slice(0, 4);
  const featured = artists.slice(0, 3);

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ── HERO ── */}
      <section
        className="relative min-h-[100dvh] flex items-end pb-16 md:pb-24 overflow-hidden"
        style={{ background: 'var(--charcoal)' }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt="Nuay Beauty Studio"
            fill
            className="object-cover"
            style={{ opacity: 0.35 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(28,28,28,0.95) 30%, rgba(28,28,28,0.3) 100%)',
            }}
          />
        </div>

        {/* Content — bottom-left anchor */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full grid md:grid-cols-2 gap-6 items-end">
          <div>
            <p
              className="text-xs tracking-[0.35em] uppercase mb-5"
              style={{ color: 'var(--gold)' }}
            >
              {t.hero.tagline}
            </p>
            <h1
              className="text-5xl md:text-7xl leading-none tracking-tight mb-6 whitespace-pre-line"
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontWeight: 300,
                color: 'var(--cream)',
              }}
            >
              {t.hero.headline}
            </h1>
            <p
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: 'rgba(245,239,230,0.65)', fontWeight: 300 }}
            >
              {t.hero.sub}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200 active:scale-95"
                style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
              >
                {t.hero.cta}
                <ArrowRight size={15} />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200"
                style={{
                  border: '1px solid rgba(245,239,230,0.25)',
                  color: 'var(--cream)',
                }}
              >
                {t.hero.ctaSub}
              </Link>
            </div>
          </div>

          {/* Wudhu badge */}
          <div className="hidden md:flex justify-end">
            <div
              className="rounded-2xl p-6 max-w-[220px]"
              style={{
                background: 'rgba(245,239,230,0.06)',
                border: '1px solid rgba(245,239,230,0.12)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Drop size={28} weight="fill" style={{ color: 'var(--gold)' }} className="mb-3" />
              <p
                className="text-base mb-1"
                style={{ fontFamily: 'var(--font-cormorant), serif', color: 'var(--cream)', fontWeight: 400 }}
              >
                {lang === 'en' ? 'Wudhu-Friendly' : 'Mesra Wudhu'}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(245,239,230,0.5)' }}>
                {lang === 'en'
                  ? 'All products are water-permeable. No compromise.'
                  : 'Semua produk boleh ditembusi air. Tanpa kompromi.'}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll hint line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)' }}
        />
      </section>

      {/* ── TRUST BAR ── */}
      <div
        className="py-5 overflow-hidden"
        style={{ background: 'var(--burgundy)' }}
      >
        <div className="flex gap-12 items-center justify-center flex-wrap px-6">
          {[
            lang === 'en' ? 'Wudhu-Friendly Products' : 'Produk Mesra Wudhu',
            lang === 'en' ? 'Private Studio' : 'Studio Peribadi',
            lang === 'en' ? 'Korean Technique' : 'Teknik Korean',
            lang === 'en' ? 'Certified Artists' : 'Artist Bersijil',
            lang === 'en' ? 'Shah Alam' : 'Shah Alam',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(245,239,230,0.75)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-24 md:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'What We Offer' : 'Apa Yang Kami Tawarkan'}
            </p>
            <h2
              className="text-4xl md:text-5xl tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
            >
              {t.services.title}
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-sm group"
            style={{ color: 'var(--burgundy)' }}
          >
            {lang === 'en' ? 'View all services' : 'Lihat semua servis'}
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetric 2-col + 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Large card */}
          <div
            className="relative overflow-hidden rounded-2xl p-8 flex flex-col justify-end min-h-[300px] md:row-span-2"
            style={{ background: 'var(--charcoal)' }}
          >
            <Image
              src={artists[0]?.image || 'https://picsum.photos/seed/nuay-lash-lift/600/700'}
              alt="Korean Lash Lift"
              fill
              className="object-cover"
              style={{ opacity: 0.4 }}
            />
            <div className="relative z-10">
              {services[0].badge && (
                <span
                  className="inline-block text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                  style={{ background: 'var(--gold)', color: 'var(--charcoal)' }}
                >
                  {services[0].badge}
                </span>
              )}
              <h3
                className="text-2xl mb-2"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--cream)' }}
              >
                {lang === 'en' ? services[0].nameEn : services[0].nameBm}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,239,230,0.6)' }}>
                {lang === 'en' ? services[0].descEn : services[0].descBm}
              </p>
              <p className="text-xl mt-3" style={{ color: 'var(--gold)', fontFamily: 'var(--font-cormorant), serif' }}>
                RM {services[0].price}
              </p>
            </div>
          </div>

          {/* 3 smaller cards */}
          {featuredServices.slice(1).map((svc) => (
            <div
              key={svc.id}
              className="rounded-2xl p-6 flex flex-col justify-between"
              style={{ background: 'var(--surface)', border: '1px solid var(--beige)' }}
            >
              <div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                  {svc.duration}
                </p>
                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--charcoal)' }}
                >
                  {lang === 'en' ? svc.nameEn : svc.nameBm}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {lang === 'en' ? svc.descEn : svc.descBm}
                </p>
              </div>
              <p
                className="text-lg mt-4"
                style={{ color: 'var(--burgundy)', fontFamily: 'var(--font-cormorant), serif', fontWeight: 500 }}
              >
                RM {svc.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── USP STRIP ── */}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ background: 'var(--cream-dark)' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Drop size={28} weight="fill" style={{ color: 'var(--burgundy)' }} />,
              titleEn: 'Wudhu-Friendly',
              titleBm: 'Mesra Wudhu',
              descEn: 'Every product used is water-permeable. Pray with confidence after every treatment.',
              descBm: 'Setiap produk yang digunakan boleh ditembusi air. Solat dengan yakin selepas setiap rawatan.',
            },
            {
              icon: <Shield size={28} weight="fill" style={{ color: 'var(--burgundy)' }} />,
              titleEn: 'Private & Safe',
              titleBm: 'Peribadi & Selamat',
              descEn: 'A calm, private studio designed exclusively for your comfort and dignity.',
              descBm: 'Studio yang tenang dan peribadi, direka khas untuk keselesaan dan maruah anda.',
            },
            {
              icon: <Star size={28} weight="fill" style={{ color: 'var(--burgundy)' }} />,
              titleEn: 'Expert Artists',
              titleBm: 'Artist Pakar',
              descEn: 'Our certified artists bring years of experience and genuine passion to their craft.',
              descBm: 'Artist bersijil kami membawa pengalaman bertahun-tahun dan minat yang tulus pada kerja mereka.',
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4">
              {item.icon}
              <h3
                className="text-xl"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--charcoal)' }}
              >
                {lang === 'en' ? item.titleEn : item.titleBm}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {lang === 'en' ? item.descEn : item.descBm}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARTISTS PREVIEW ── */}
      <section className="py-24 md:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'The Team' : 'Pasukan Kami'}
            </p>
            <h2
              className="text-4xl md:text-5xl tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
            >
              {t.artists.title}
            </h2>
          </div>
          <Link href="/artists" className="flex items-center gap-2 text-sm group" style={{ color: 'var(--burgundy)' }}>
            {lang === 'en' ? 'Meet all artists' : 'Kenali semua artist'}
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((artist, i) => (
            <Link
              key={artist.id}
              href={`/artists#${artist.id}`}
              className="group block overflow-hidden rounded-2xl"
              style={{ background: 'var(--beige)' }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Index number */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs"
                  style={{ background: 'rgba(245,239,230,0.85)', color: 'var(--burgundy)', fontWeight: 500 }}
                >
                  0{i + 1}
                </div>
              </div>
              <div className="p-5">
                <h3
                  className="text-xl mb-0.5"
                  style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, color: 'var(--charcoal)' }}
                >
                  {artist.name}
                </h3>
                <p className="text-xs tracking-wide" style={{ color: 'var(--muted)' }}>
                  {lang === 'en' ? artist.roleEn : artist.roleBm}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="py-24 md:py-32 px-6 lg:px-10"
        style={{ background: 'var(--charcoal)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Client Stories' : 'Cerita Pelanggan'}
            </p>
            <h2
              className="text-4xl md:text-5xl tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {t.testimonials.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl p-7"
                style={{ background: 'rgba(245,239,230,0.05)', border: '1px solid rgba(245,239,230,0.08)' }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={13} weight="fill" style={{ color: 'var(--gold)' }} />
                  ))}
                </div>
                <p
                  className="text-base leading-relaxed mb-5"
                  style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', color: 'rgba(245,239,230,0.8)', fontWeight: 300, fontSize: '1.1rem' }}
                >
                  &ldquo;{lang === 'en' ? review.text : review.textBm}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--cream)' }}>
                      {review.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>
                      {review.location} · {review.service}
                    </p>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
                    style={{ border: '1px solid rgba(201,169,110,0.3)' }}
                  >
                    <Image src={review.image} alt={review.name} width={36} height={36} className="object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO GLIMPSE ── */}
      <section className="py-24 md:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'The Space' : 'Ruang Kami'}
            </p>
            <h2
              className="text-4xl md:text-5xl tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
            >
              {lang === 'en' ? 'A Place to Feel\nAt Ease.' : 'Tempat Untuk\nRasa Selesa.'}
            </h2>
          </div>
          <Link href="/gallery" className="flex items-center gap-2 text-sm group" style={{ color: 'var(--burgundy)' }}>
            {lang === 'en' ? 'View gallery' : 'Lihat galeri'}
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="col-span-2 md:col-span-1 row-span-2 rounded-2xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <Image src={images.studio[0] || 'https://picsum.photos/seed/nuay-studio-1/600/800'} alt="Studio" width={600} height={800} className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <Image src={images.studio[1] || 'https://picsum.photos/seed/nuay-studio-2/600/450'} alt="Studio" width={600} height={450} className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <Image src={images.studio[2] || 'https://picsum.photos/seed/nuay-studio-3/600/450'} alt="Studio" width={600} height={450} className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <Image src={images.studio[3] || 'https://picsum.photos/seed/nuay-studio-4/600/450'} alt="Studio" width={600} height={450} className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <Image src={images.studio[4] || 'https://picsum.photos/seed/nuay-studio-5/600/450'} alt="Studio" width={600} height={450} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

    </div>
  );
}
