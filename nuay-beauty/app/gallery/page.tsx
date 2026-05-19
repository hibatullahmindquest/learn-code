'use client';

import Image from 'next/image';
import { useLang } from '@/components/LanguageContext';
import { content } from '@/lib/data';

const galleryImages = [
  { seed: 'nuay-g1', span: 'col-span-2 row-span-2', label: 'Korean Lash Lift' },
  { seed: 'nuay-g2', span: '', label: 'Brow Lamination' },
  { seed: 'nuay-g3', span: '', label: 'Brow Tint' },
  { seed: 'nuay-g4', span: '', label: 'Roma Pink Lips' },
  { seed: 'nuay-g5', span: 'col-span-2', label: 'Studio' },
  { seed: 'nuay-g6', span: '', label: 'Totok Wajah' },
  { seed: 'nuay-g7', span: '', label: 'Brow Bleach' },
  { seed: 'nuay-g8', span: '', label: 'Laser Treatment' },
  { seed: 'nuay-g9', span: 'col-span-2', label: 'Brow Wax' },
  { seed: 'nuay-g10', span: '', label: 'Lash Lift' },
  { seed: 'nuay-g11', span: '', label: 'Studio Interior' },
];

export default function GalleryPage() {
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
            {lang === 'en' ? 'Real Results' : 'Keputusan Sebenar'}
          </p>
          <h1
            className="text-5xl md:text-6xl tracking-tight leading-none mb-5"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
          >
            {t.gallery.title}
          </h1>
          <p className="text-base max-w-lg" style={{ color: 'rgba(245,239,230,0.55)', fontWeight: 300 }}>
            {t.gallery.sub}
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {galleryImages.map((img) => (
            <div
              key={img.seed}
              className={`relative overflow-hidden rounded-2xl group ${img.span}`}
            >
              <Image
                src={`https://picsum.photos/seed/${img.seed}/600/600`}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.7) 0%, transparent 60%)' }}
              >
                <span className="text-sm" style={{ color: 'var(--cream)', fontFamily: 'var(--font-cormorant), serif', fontWeight: 400 }}>
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram note */}
        <div className="mt-14 text-center">
          <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>
            {lang === 'en' ? 'Follow us for more work' : 'Ikuti kami untuk lebih banyak hasil kerja'}
          </p>
          <a
            href="https://www.instagram.com/nuaybeauty/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wide"
            style={{ color: 'var(--burgundy)' }}
          >
            @nuaybeauty
          </a>
        </div>
      </section>
    </div>
  );
}
