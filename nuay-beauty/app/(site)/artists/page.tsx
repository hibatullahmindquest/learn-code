'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useLang } from '@/components/LanguageContext';
import { useSiteData, getCopy } from '@/components/SiteDataContext';
import { ArrowRight, InstagramLogo, X, CaretLeft, CaretRight } from '@phosphor-icons/react';

export default function ArtistsPage() {
  const { lang } = useLang();
  const { contact, artists, copy } = useSiteData();
  const t = getCopy(copy, lang);
  const BOOKING_URL = contact.bookingUrl;

  // Lightbox: { artistIndex, imageIndex }
  const [lightbox, setLightbox] = useState<{ ai: number; ii: number } | null>(null);

  const currentGallery = lightbox !== null ? (artists[lightbox.ai].gallery ?? []) : [];

  const prevImage = useCallback(() => {
    setLightbox((lb) => lb ? { ...lb, ii: (lb.ii - 1 + currentGallery.length) % currentGallery.length } : null);
  }, [currentGallery.length]);

  const nextImage = useCallback(() => {
    setLightbox((lb) => lb ? { ...lb, ii: (lb.ii + 1) % currentGallery.length } : null);
  }, [currentGallery.length]);

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

  // Lightbox keyboard
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightbox, prevImage, nextImage]);

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ─────────────── HEADER ─────────────── */}
      <section
        className="relative pt-36 md:pt-44 pb-20 md:pb-24 px-6 lg:px-10 overflow-hidden"
        style={{ background: 'var(--charcoal)' }}
      >
        <div
          className="absolute top-0 right-0 h-full w-[45vw] md:w-[35vw] pointer-events-none hidden md:block"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)',
          }}
        >
          <Image src="/images/nuay-artist.png" alt="" fill className="object-cover object-top" style={{ mixBlendMode: 'luminosity', opacity: 0.18 }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal" style={{ transform: 'translateY(32px)' } as React.CSSProperties}>
            <p className="text-xs tracking-[0.42em] uppercase mb-5" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'The Team' : 'Pasukan Kami'}
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-6"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {lang === 'en' ? (
                <>Meet Our <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Artists</span></>
              ) : (
                <>Kenali <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Artist</span> Kami</>
              )}
            </h1>
            <p className="text-base max-w-md leading-relaxed" style={{ color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>
              {t.artists.sub}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, var(--cream), transparent)' }} />
      </section>

      {/* ─────────────── ARTISTS ─────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-28 md:gap-36">
          {artists.map((artist, i) => (
            <div
              key={artist.id}
              id={artist.id}
              className="scroll-mt-24"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">

                {/* ── Artist Image ── */}
                <div
                  className={`reveal relative overflow-hidden rounded-3xl group ${i % 2 === 1 ? 'md:order-2' : ''}`}
                  style={{ aspectRatio: '3/4', transform: 'translateY(44px)' } as React.CSSProperties}
                >
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'rgba(125,46,53,0.15)' }}
                  />
                  {/* Number badge */}
                  <div
                    className="absolute top-5 left-5 w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono"
                    style={{ background: 'rgba(245,239,230,0.92)', color: 'var(--burgundy)', fontWeight: 600 }}
                  >
                    0{i + 1}
                  </div>
                </div>

                {/* ── Artist Info ── */}
                <div className={`flex flex-col justify-center py-4 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div
                    className="reveal"
                    style={{ transform: 'translateY(32px)', '--delay': '0.1s' } as React.CSSProperties}
                  >
                    <p className="text-xs tracking-[0.38em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
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
                  </div>

                  {/* Specialties */}
                  <div
                    className="reveal mb-8"
                    style={{ transform: 'translateY(24px)', '--delay': '0.18s' } as React.CSSProperties}
                  >
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--burgundy)' }}>
                      {lang === 'en' ? 'Specialises in' : 'Pakar dalam'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {artist.services.map((svc) => (
                        <span
                          key={svc}
                          className="text-xs px-3.5 py-1.5 rounded-full"
                          style={{ background: 'var(--surface)', border: '1px solid var(--beige)', color: 'var(--charcoal-mid)' }}
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── Mini Gallery Grid ── */}
                  {(artist.gallery ?? []).length > 0 && (
                    <div
                      className="reveal mb-8"
                      style={{ transform: 'translateY(24px)', '--delay': '0.24s' } as React.CSSProperties}
                    >
                      <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--burgundy)' }}>
                        {lang === 'en' ? 'Past Work' : 'Hasil Kerja'}
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {(artist.gallery ?? []).slice(0, 4).map((src, gi) => (
                          <div
                            key={gi}
                            className="relative overflow-hidden rounded-xl cursor-pointer group/thumb"
                            style={{ aspectRatio: '1' }}
                            onClick={() => setLightbox({ ai: i, ii: gi })}
                          >
                            <Image
                              src={src}
                              alt={`${artist.name} work ${gi + 1}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                            />
                            {/* Show count on last thumb if more images */}
                            {gi === 3 && artist.gallery.length > 4 && (
                              <div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ background: 'rgba(28,28,28,0.6)' }}
                              >
                                <span className="text-sm font-mono" style={{ color: 'var(--cream)' }}>
                                  +{(artist.gallery ?? []).length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div
                    className="reveal flex items-center gap-4"
                    style={{ transform: 'translateY(20px)', '--delay': '0.3s' } as React.CSSProperties}
                  >
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 active:scale-[0.97]"
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
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                        style={{ border: '1px solid var(--beige)', color: 'var(--muted)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--charcoal)'; e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor = 'var(--charcoal)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--beige)'; }}
                      >
                        <InstagramLogo size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider between artists */}
              {i < artists.length - 1 && (
                <div className="mt-28 md:mt-36 flex items-center gap-6">
                  <div className="flex-1 h-px" style={{ background: 'var(--beige)' }} />
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                  <div className="flex-1 h-px" style={{ background: 'var(--beige)' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── LIGHTBOX ─────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(28,28,28,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            style={{ background: 'rgba(245,239,230,0.1)', color: 'var(--cream)' }}
            onClick={() => setLightbox(null)}
          >
            <X size={18} />
          </button>

          <button
            className="absolute left-4 md:left-8 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            style={{ background: 'rgba(245,239,230,0.1)', color: 'var(--cream)' }}
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <CaretLeft size={18} />
          </button>

          <div
            className="relative w-[90vw] h-[70vh] md:w-[75vw] md:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={artists[lightbox.ai].gallery[lightbox.ii]}
              alt={`${artists[lightbox.ai].name} work`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <button
            className="absolute right-4 md:right-8 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            style={{ background: 'rgba(245,239,230,0.1)', color: 'var(--cream)' }}
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <CaretRight size={18} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--cream)', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
              {artists[lightbox.ai].name}
            </p>
            <p className="text-xs tracking-widest" style={{ color: 'rgba(245,239,230,0.4)' }}>
              {lightbox.ii + 1} / {artists[lightbox.ai].gallery.length}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
