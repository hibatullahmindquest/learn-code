'use client';

import { useLang } from '@/components/LanguageContext';
import { content } from '@/lib/data';
import { useSiteData } from '@/components/SiteDataContext';
import { ArrowRight } from '@phosphor-icons/react';

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

  const grouped = categoryOrder.map((cat) => ({
    key: cat,
    label: lang === 'en' ? categoryLabels[cat].en : categoryLabels[cat].bm,
    items: services.filter((s) => s.category === cat),
  }));

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* Header */}
      <section
        className="pt-36 pb-16 px-6 lg:px-10"
        style={{ background: 'var(--charcoal)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
            {lang === 'en' ? 'Full Menu' : 'Menu Penuh'}
          </p>
          <h1
            className="text-5xl md:text-6xl tracking-tight leading-none mb-5"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
          >
            {t.services.title}
          </h1>
          <p className="text-base max-w-lg" style={{ color: 'rgba(245,239,230,0.55)', fontWeight: 300 }}>
            {t.services.sub}
          </p>
        </div>
      </section>

      {/* Service categories */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-16">
          {grouped.map(({ key, label, items }) => (
            <div key={key}>
              <div className="flex items-center gap-4 mb-8">
                <h2
                  className="text-3xl tracking-tight"
                  style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--charcoal)' }}
                >
                  {label}
                </h2>
                <div className="flex-1 h-px" style={{ background: 'var(--beige)' }} />
              </div>

              <div className="flex flex-col divide-y" style={{ borderTop: '1px solid var(--beige)', borderBottom: '1px solid var(--beige)' }}>
                {items.map((svc) => (
                  <div
                    key={svc.id}
                    className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3
                          className="text-xl"
                          style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--charcoal)' }}
                        >
                          {lang === 'en' ? svc.nameEn : svc.nameBm}
                        </h3>
                        {svc.badge && (
                          <span
                            className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
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
                    <div className="flex items-center gap-8 flex-shrink-0">
                      <div className="text-right">
                        <p
                          className="text-2xl"
                          style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 500, color: 'var(--burgundy)' }}
                        >
                          RM {svc.price}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>{svc.duration}</p>
                      </div>
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95 whitespace-nowrap"
                        style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
                      >
                        {lang === 'en' ? 'Book' : 'Tempah'}
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-20 rounded-2xl p-10 text-center"
          style={{ background: 'var(--charcoal)' }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
            {lang === 'en' ? 'Not sure which to choose?' : 'Tak pasti nak pilih yang mana?'}
          </p>
          <h2
            className="text-3xl md:text-4xl mb-5"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
          >
            {lang === 'en' ? 'Let us guide you.' : 'Biar kami bantu.'}
          </h2>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200 active:scale-95"
            style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
          >
            {lang === 'en' ? 'Book a Consultation' : 'Tempah Konsultasi'}
            <ArrowRight size={15} />
          </a>
        </div>
      </section>
    </div>
  );
}
