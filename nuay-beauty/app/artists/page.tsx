'use client';

import Image from 'next/image';
import { useLang } from '@/components/LanguageContext';
import { content, artists, BOOKING_URL } from '@/lib/data';
import { ArrowRight, InstagramLogo } from '@phosphor-icons/react';

export default function ArtistsPage() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* Header */}
      <section
        className="pt-36 pb-16 px-6 lg:px-10"
        style={{ background: 'var(--charcoal)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
            {lang === 'en' ? 'Your Artists' : 'Artist Anda'}
          </p>
          <h1
            className="text-5xl md:text-6xl tracking-tight leading-none mb-5"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
          >
            {t.artists.title}
          </h1>
          <p className="text-base max-w-lg" style={{ color: 'rgba(245,239,230,0.55)', fontWeight: 300 }}>
            {t.artists.sub}
          </p>
        </div>
      </section>

      {/* Artists */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-24">
          {artists.map((artist, i) => (
            <div
              key={artist.id}
              id={artist.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
            >
              {/* Image — alternate sides */}
              <div
                className={`relative overflow-hidden rounded-2xl ${i % 2 === 1 ? 'md:order-2' : ''}`}
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute top-4 left-4 text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: 'rgba(245,239,230,0.9)', color: 'var(--burgundy)' }}
                >
                  0{i + 1}
                </div>
              </div>

              {/* Info */}
              <div className={`flex flex-col justify-center py-6 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
                  {lang === 'en' ? artist.roleEn : artist.roleBm}
                </p>
                <h2
                  className="text-5xl md:text-6xl tracking-tight leading-none mb-6"
                  style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
                >
                  {artist.name}
                </h2>
                <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: 'var(--muted)' }}>
                  {lang === 'en' ? artist.bioEn : artist.bioBm}
                </p>

                {/* Services */}
                <div className="mb-8">
                  <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--burgundy)' }}>
                    {lang === 'en' ? 'Specialises in' : 'Pakar dalam'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {artist.services.map((svc) => (
                      <span
                        key={svc}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{ background: 'var(--beige)', color: 'var(--charcoal-mid)' }}
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-200 active:scale-95"
                    style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
                  >
                    {lang === 'en' ? `Book with ${artist.name}` : `Tempah dengan ${artist.name}`}
                    <ArrowRight size={13} />
                  </a>
                  {artist.instagram && (
                    <a
                      href={artist.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--muted)' }}
                    >
                      <InstagramLogo size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery placeholder per artist */}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ background: 'var(--cream-dark)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
            {lang === 'en' ? 'Portfolio' : 'Portfolio'}
          </p>
          <h2
            className="text-4xl md:text-5xl tracking-tight leading-none mb-12"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
          >
            {lang === 'en' ? 'Work Gallery' : 'Galeri Hasil Kerja'}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: '1' }}>
                <Image
                  src={`https://picsum.photos/seed/portfolio-${i + 1}/400/400`}
                  alt={`Portfolio ${i + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
