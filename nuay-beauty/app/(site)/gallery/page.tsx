'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useLang } from '@/components/LanguageContext';
import { useSiteData, getCopy } from '@/components/SiteDataContext';
import { ArrowUpRight, X, CaretLeft, CaretRight, InstagramLogo } from '@phosphor-icons/react';

export default function GalleryPage() {
  const { lang } = useLang();
  const { contact, images, copy } = useSiteData();
  const t = getCopy(copy, lang);
  const galleryImages = images.gallery;

  const [lightbox, setLightbox] = useState<number | null>(null);

  const prevImage = useCallback(() => setLightbox((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null)), [galleryImages.length]);
  const nextImage = useCallback(() => setLightbox((i) => (i !== null ? (i + 1) % galleryImages.length : null)), [galleryImages.length]);

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
        {/* Decorative accent */}
        <div
          className="absolute top-0 right-0 h-full w-[45vw] md:w-[35vw] pointer-events-none hidden md:block"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)',
          }}
        >
          <Image
            src="/images/nuay-studio-2.avif"
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
              {lang === 'en' ? 'Real Results' : 'Keputusan Sebenar'}
            </p>
            <h1
              className="tracking-tight leading-none mb-6"
              style={{ fontSize: 'var(--fs-page-title)', fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {lang === 'en' ? (
                <>Our <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Work</span></>
              ) : (
                <>Hasil <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Kami</span></>
              )}
            </h1>
            <p className="text-base max-w-md leading-relaxed" style={{ color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>
              {t.gallery.sub}
            </p>
          </div>

          {/* Image count */}
          <div
            className="reveal mt-8"
            style={{ transform: 'translateY(16px)', '--delay': '0.15s' } as React.CSSProperties}
          >
            <span className="text-xs tracking-[0.3em] uppercase font-mono" style={{ color: 'rgba(245,239,230,0.4)' }}>
              {String(galleryImages.length).padStart(2, '0')} {lang === 'en' ? 'photos' : 'foto'}
            </span>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, var(--cream), transparent)' }} />
      </section>

      {/* ─────────────── GALLERY GRID ─────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`reveal relative overflow-hidden rounded-2xl md:rounded-3xl group cursor-pointer ${img.span}`}
              style={{ transform: 'scale(0.96)', '--delay': `${i * 0.04}s` } as React.CSSProperties}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.url}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-between p-4 md:p-5"
                style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.8) 0%, rgba(28,28,28,0.05) 55%)' }}
              >
                <span
                  className="text-sm"
                  style={{ color: 'var(--cream)', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, fontStyle: 'italic' }}
                >
                  {img.label}
                </span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(245,239,230,0.15)', backdropFilter: 'blur(8px)' }}
                >
                  <ArrowUpRight size={12} style={{ color: 'var(--cream)' }} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ─────────────── INSTAGRAM ─────────────── */}
        <div
          className="reveal mt-20 md:mt-28 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'var(--charcoal)', transform: 'translateY(32px)' } as React.CSSProperties}
        >
          <div className="text-center md:text-left">
            <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'See More Work' : 'Lihat Lebih Banyak'}
            </p>
            <h2
              className="tracking-tight leading-none"
              style={{ fontSize: 'var(--fs-cta-title)', fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {lang === 'en' ? (
                <>Follow us on <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Instagram</span></>
              ) : (
                <>Ikuti kami di <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Instagram</span></>
              )}
            </h2>
          </div>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 active:scale-[0.97]"
            style={{ background: 'var(--cream)', color: 'var(--charcoal)' }}
          >
            <InstagramLogo size={16} weight="bold" />
            @nuaybeauty
          </a>
        </div>
      </section>

      {/* ─────────────── LIGHTBOX ─────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(28,28,28,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            style={{ background: 'rgba(245,239,230,0.1)', color: 'var(--cream)' }}
            onClick={() => setLightbox(null)}
          >
            <X size={18} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            style={{ background: 'rgba(245,239,230,0.1)', color: 'var(--cream)' }}
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <CaretLeft size={18} />
          </button>

          {/* Image */}
          <div
            className="relative w-[90vw] h-[70vh] md:w-[75vw] md:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightbox].url}
              alt={galleryImages[lightbox].label}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            style={{ background: 'rgba(245,239,230,0.1)', color: 'var(--cream)' }}
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <CaretRight size={18} />
          </button>

          {/* Label + counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--cream)', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
              {galleryImages[lightbox].label}
            </p>
            <p className="text-xs tracking-widest" style={{ color: 'rgba(245,239,230,0.4)' }}>
              {lightbox + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
