'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useLang } from '@/components/LanguageContext';
import { useSiteData, getCopy } from '@/components/SiteDataContext';
import { ArrowRight, ArrowUpRight, CaretDown, CaretLeft, CaretRight, Drop, InstagramLogo, Play, X } from '@phosphor-icons/react';

type VideoEmbed =
  | { type: 'youtube'; embedUrl: string }
  | { type: 'tiktok'; embedUrl: string }
  | { type: 'instagram'; originalUrl: string }
  | null;

function getVideoEmbed(url: string | null | undefined): VideoEmbed {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace('www.', '');
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = u.pathname.startsWith('/shorts/') ? u.pathname.split('/')[2] : u.searchParams.get('v');
      if (id) return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${id}` };
    }
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${id}` };
    }
    if (host === 'tiktok.com') {
      const match = u.pathname.match(/\/video\/(\d+)/);
      if (match) return { type: 'tiktok', embedUrl: `https://www.tiktok.com/embed/v2/${match[1]}` };
    }
    if (host === 'instagram.com') {
      return { type: 'instagram', originalUrl: url };
    }
  } catch {
    return null;
  }
  return null;
}

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
  const { contact, services, copy } = useSiteData();
  const t = getCopy(copy, lang);
  const BOOKING_URL = contact.bookingUrl;
  const [activeCategory, setActiveCategory] = useState(categoryOrder[0]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [playingVideoFor, setPlayingVideoFor] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ serviceId: string; index: number } | null>(null);
  const touchStartX = useRef<number | null>(null);

  const lightboxImages = lightbox ? services.find((s) => s.id === lightbox.serviceId)?.detailImages ?? [] : [];

  const prevImage = useCallback(() => {
    setLightbox((cur) => (cur ? { ...cur, index: (cur.index - 1 + lightboxImages.length) % lightboxImages.length } : null));
  }, [lightboxImages.length]);
  const nextImage = useCallback(() => {
    setLightbox((cur) => (cur ? { ...cur, index: (cur.index + 1) % lightboxImages.length } : null));
  }, [lightboxImages.length]);

  const grouped = categoryOrder
    .map((cat) => ({
      key: cat,
      label: lang === 'en' ? categoryLabels[cat].en : categoryLabels[cat].bm,
      items: services.filter((s) => s.category === cat && s.published !== false),
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

  // Lightbox keyboard support
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightbox, prevImage, nextImage]);

  const scrollToCategory = (cat: string) => {
    const el = document.getElementById(`cat-${cat}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ background: 'var(--beige-50)' }}>

      {/* ─────────────── HEADER ─────────────── */}
      <section
        className="relative pt-36 md:pt-44 pb-20 md:pb-24 px-6 lg:px-10"
        style={{ background: 'var(--beige-100)', borderBottom: '1px solid var(--line)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className="reveal"
            style={{ transform: 'translateY(32px)' } as React.CSSProperties}
          >
            <p className="text-xs tracking-[0.42em] uppercase mb-5" style={{ color: 'var(--gold-600)' }}>
              {lang === 'en' ? 'Full Menu' : 'Menu Penuh'}
            </p>
            <h1
              className="tracking-tight leading-none mb-6"
              style={{ fontSize: 'var(--fs-page-title)', fontFamily: 'var(--font-nuay-display), serif', fontWeight: 600, color: 'var(--ink-950)' }}
            >
              {lang === 'en' ? (
                <>Our <span style={{ fontStyle: 'italic', color: 'var(--wine-700)' }}>Services</span></>
              ) : (
                <>Servis <span style={{ fontStyle: 'italic', color: 'var(--wine-700)' }}>Kami</span></>
              )}
            </h1>
            <p className="text-base max-w-md leading-relaxed" style={{ color: 'var(--ink-400)', fontWeight: 300 }}>
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
                background: 'var(--white)',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Drop size={13} weight="fill" style={{ color: 'var(--gold-600)' }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--ink-600)' }}>
                {lang === 'en' ? 'All products are wudhu-friendly' : 'Semua produk mesra wudhu'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── STICKY CATEGORY NAV ─────────────── */}
      <div
        className="sticky top-16 z-30 py-3 px-6 lg:px-10 border-b"
        style={{ background: 'var(--beige-50)', borderColor: 'var(--line)' }}
      >
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {grouped.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => scrollToCategory(key)}
              className="px-4 py-2 rounded-full text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-300"
              style={{
                background: activeCategory === key ? 'var(--ink-950)' : 'transparent',
                color: activeCategory === key ? 'var(--beige-50)' : 'var(--ink-400)',
                border: activeCategory === key ? 'none' : '1px solid var(--line)',
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
                  <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: 'var(--gold-600)' }}>
                    {lang === 'en' ? 'Category' : 'Kategori'}
                  </p>
                  <h2
                    className="tracking-tight leading-none"
                    style={{ fontSize: 'var(--fs-section-title)', fontFamily: 'var(--font-nuay-display), serif', fontWeight: 600, color: 'var(--ink-950)' }}
                  >
                    {label}
                  </h2>
                </div>
                <div className="flex-1 h-px mb-2" style={{ background: 'var(--line)' }} />
                <span className="text-xs font-mono mb-2" style={{ color: 'var(--ink-400)' }}>
                  {String(items.length).padStart(2, '0')} {lang === 'en' ? 'services' : 'servis'}
                </span>
              </div>

              {/* Service rows */}
              <div className="flex flex-col gap-4">
                {items.map((svc, i) => {
                  const detailText = lang === 'en' ? svc.detailTextEn : svc.detailTextBm;
                  const detailImages = svc.detailImages ?? [];
                  const videoEmbed = getVideoEmbed(svc.videoUrl);
                  const hasDetail = Boolean(detailText || detailImages.length > 0 || videoEmbed);
                  const isExpanded = hasDetail && expandedId === svc.id;
                  const isVideoPlaying = isExpanded && playingVideoFor === svc.id;
                  return (
                  <div
                    key={svc.id}
                    className="reveal group"
                    style={{ transform: 'translateY(28px)', '--delay': `${i * 0.06}s` } as React.CSSProperties}
                  >
                    <div
                      className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
                      style={{
                        background: 'var(--white)',
                        borderRadius: isExpanded ? 'var(--radius-card) var(--radius-card) 0 0' : 'var(--radius-card)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {svc.image && (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
                            <Image src={svc.image} alt={lang === 'en' ? svc.nameEn : svc.nameBm} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
                            <h3
                              className="text-xl md:text-[1.35rem]"
                              style={{ fontFamily: 'var(--font-nuay-display), serif', fontWeight: 500, color: 'var(--ink-950)' }}
                            >
                              {lang === 'en' ? svc.nameEn : svc.nameBm}
                            </h3>
                            {svc.badge && (
                              <span
                                className="text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                                style={{ background: 'var(--wine-700)', color: 'var(--beige-50)' }}
                              >
                                {svc.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--ink-400)' }}>
                            {lang === 'en' ? svc.descEn : svc.descBm}
                          </p>
                          {(lang === 'en' ? svc.longevityEn : svc.longevityBm) && (
                            <p className="text-xs mt-1" style={{ color: 'var(--gold-600)' }}>
                              {lang === 'en' ? svc.longevityEn : svc.longevityBm}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
                        <div className="flex items-center gap-4">
                          <span className="text-xs tracking-wide px-3 py-1 rounded-full" style={{ border: '1px solid var(--line)', color: 'var(--ink-400)' }}>
                            {svc.duration}
                          </span>
                          <p
                            className="text-2xl"
                            style={{ fontFamily: 'var(--font-nuay-display), serif', fontWeight: 500, color: 'var(--wine-700)' }}
                          >
                            RM {svc.price}
                          </p>
                        </div>
                        {hasDetail && (
                          <button
                            type="button"
                            onClick={() => {
                              setExpandedId(isExpanded ? null : svc.id);
                              setPlayingVideoFor(null);
                            }}
                            aria-expanded={isExpanded}
                            className="flex items-center gap-1.5 text-sm px-4 py-2.5 transition-all duration-200 active:scale-[0.97] whitespace-nowrap"
                            style={{ border: '1px solid var(--line)', color: 'var(--ink-600)', borderRadius: 'var(--radius-button)' }}
                          >
                            {lang === 'en' ? 'Details' : 'Butiran'}
                            <CaretDown
                              size={13}
                              className="transition-transform duration-300"
                              style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
                            />
                          </button>
                        )}
                        <a
                          href={svc.bookingUrl || BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm px-5 py-2.5 transition-all duration-200 active:scale-[0.97] whitespace-nowrap"
                          style={{ background: 'var(--ink-950)', color: 'var(--beige-50)', borderRadius: 'var(--radius-button)' }}
                        >
                          {lang === 'en' ? 'Book' : 'Tempah'}
                          <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>

                    {/* ── Detail accordion ── */}
                    {hasDetail && (
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: isExpanded ? '640px' : '0px',
                          background: 'var(--beige-50)',
                          borderRadius: '0 0 var(--radius-card) var(--radius-card)',
                          boxShadow: isExpanded ? 'var(--shadow-sm)' : 'none',
                        }}
                      >
                        <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6" style={{ borderTop: '1px solid var(--line)' }}>
                          {detailText && (
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--gold-600)' }}>
                                {lang === 'en' ? 'About this treatment' : 'Tentang rawatan ini'}
                              </p>
                              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-600)' }}>
                                {detailText}
                              </p>
                            </div>
                          )}

                          {(detailImages.length > 0 || videoEmbed) && (
                            <div className="flex flex-col sm:flex-row gap-4 md:w-[420px] flex-shrink-0">
                              {/* Gallery — first image shown, click opens lightbox w/ nav */}
                              {detailImages.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => setLightbox({ serviceId: svc.id, index: 0 })}
                                  className="relative flex-1 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                                  style={{ background: 'var(--beige-100)' }}
                                >
                                  <Image src={detailImages[0]} alt={lang === 'en' ? svc.nameEn : svc.nameBm} fill className="object-cover" />
                                  {detailImages.length > 1 && (
                                    <span
                                      className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full"
                                      style={{ background: 'rgba(26,20,16,0.65)', color: 'var(--beige-50)' }}
                                    >
                                      1 / {detailImages.length}
                                    </span>
                                  )}
                                </button>
                              )}

                              {/* Video — click loads & plays the embed inline, only if videoUrl is set */}
                              {videoEmbed && (
                                <div className="relative flex-1 aspect-[4/3] rounded-xl overflow-hidden" style={{ background: 'var(--ink-950)' }}>
                                  {!isVideoPlaying ? (
                                    <button
                                      type="button"
                                      onClick={() => setPlayingVideoFor(svc.id)}
                                      className="absolute inset-0 flex items-center justify-center text-xs cursor-pointer"
                                      style={{ color: 'var(--beige-50)' }}
                                    >
                                      <span className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: 'var(--wine-700)' }}>
                                        <Play size={18} weight="fill" />
                                      </span>
                                    </button>
                                  ) : videoEmbed.type === 'instagram' ? (
                                    <a
                                      href={videoEmbed.originalUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs"
                                      style={{ color: 'var(--beige-50)' }}
                                    >
                                      <InstagramLogo size={24} />
                                      {lang === 'en' ? 'Watch on Instagram' : 'Tonton di Instagram'}
                                    </a>
                                  ) : (
                                    <iframe
                                      src={videoEmbed.embedUrl}
                                      className="absolute inset-0 w-full h-full"
                                      allow="autoplay; encrypted-media; fullscreen"
                                      allowFullScreen
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ─────────────── BOTTOM CTA ─────────────── */}
        <div
          className="reveal mt-24 md:mt-32 p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: 'var(--wine-700)',
            borderRadius: 'var(--radius-hero)',
            boxShadow: 'var(--shadow-wine)',
            transform: 'translateY(32px)',
          } as React.CSSProperties}
        >
          <div className="relative z-10">
            <p className="text-xs tracking-[0.38em] uppercase mb-4" style={{ color: 'var(--gold-600)' }}>
              {lang === 'en' ? 'Not sure which to choose?' : 'Tak pasti nak pilih yang mana?'}
            </p>
            <h2
              className="mb-4 leading-tight"
              style={{ fontSize: 'var(--fs-cta-title)', fontFamily: 'var(--font-nuay-display), serif', fontWeight: 600, color: 'var(--beige-50)' }}
            >
              {lang === 'en' ? (
                <>Let us <span style={{ fontStyle: 'italic', color: 'var(--gold-300)' }}>guide</span> you.</>
              ) : (
                <>Biar kami <span style={{ fontStyle: 'italic', color: 'var(--gold-300)' }}>bantu</span> anda.</>
              )}
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'rgba(249,246,243,0.45)', fontWeight: 300 }}>
              {lang === 'en'
                ? 'Book a free consultation and we\'ll recommend the perfect treatment for you.'
                : 'Tempah konsultasi percuma dan kami akan cadangkan rawatan terbaik untuk anda.'}
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm tracking-wide transition-all duration-300 active:scale-[0.97]"
              style={{ background: 'var(--gold-500)', color: 'var(--ink-950)', borderRadius: 'var(--radius-button)' }}
            >
              {lang === 'en' ? 'Book a Consultation' : 'Tempah Konsultasi'}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────── GALLERY LIGHTBOX ─────────────── */}
      {lightbox && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(28,28,28,0.95)' }}
          onClick={() => setLightbox(null)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (dx > 50) prevImage();
            else if (dx < -50) nextImage();
          }}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            style={{ background: 'rgba(249,246,243,0.1)', color: 'var(--beige-50)' }}
            onClick={() => setLightbox(null)}
          >
            <X size={18} />
          </button>

          {lightboxImages.length > 1 && (
            <button
              className="absolute left-4 md:left-8 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
              style={{ background: 'rgba(249,246,243,0.1)', color: 'var(--beige-50)' }}
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <CaretLeft size={18} />
            </button>
          )}

          <div className="relative w-[90vw] h-[70vh] md:w-[75vw] md:h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={lightboxImages[lightbox.index]} alt="" fill className="object-contain" sizes="90vw" />
          </div>

          {lightboxImages.length > 1 && (
            <button
              className="absolute right-4 md:right-8 w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
              style={{ background: 'rgba(249,246,243,0.1)', color: 'var(--beige-50)' }}
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <CaretRight size={18} />
            </button>
          )}

          {lightboxImages.length > 1 && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest" style={{ color: 'rgba(249,246,243,0.4)' }}>
              {lightbox.index + 1} / {lightboxImages.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
