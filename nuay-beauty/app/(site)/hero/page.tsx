'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Libre_Baskerville } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { ArrowUpRight, Plus, Minus, Star } from '@phosphor-icons/react';
import { useLang } from '@/components/LanguageContext';
import { BOOKING_URL, services, artists, testimonials, faqs } from '@/lib/data';

// Page-scoped fonts — duplicated from sseraskin.webflow.io reference:
// Libre Baskerville for headings, Geist for nav/body. Scoped to this page
// only so the rest of the site keeps its existing Cormorant/Outfit fonts.
const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

const HEADING = { fontFamily: 'var(--font-libre-baskerville), serif' };

export default function HeroPage() {
  const { lang } = useLang();

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
    document.querySelectorAll('.hero-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const featured = services.slice(0, 2);
  const categories = [
    { svc: services.find((s) => s.category === 'lash')!, labelEn: 'Lash', labelBm: 'Lash' },
    { svc: services.find((s) => s.category === 'brow')!, labelEn: 'Brow', labelBm: 'Kening' },
    { svc: services.find((s) => s.category === 'lip')!, labelEn: 'Lips', labelBm: 'Bibir' },
    { svc: services.find((s) => s.category === 'facial')!, labelEn: 'Facial', labelBm: 'Wajah' },
  ];
  const signature = [services[0], services[5], services[6]];
  const loop = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div
      className={`${baskerville.variable} ${GeistSans.variable}`}
      style={{ background: 'var(--cream)', fontFamily: 'var(--font-geist-sans), sans-serif' }}
    >
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 pt-16"
        style={{ background: 'var(--burgundy-dark)' }}
      >
        <div className="flex flex-col justify-center px-8 lg:px-16 py-20 md:py-0">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6"
            style={{ ...HEADING, color: 'var(--cream)', fontWeight: 400 }}
          >
            {lang === 'en' ? (
              <>Gentle Hands,<br />Confident Beauty.</>
            ) : (
              <>Tangan Lembut,<br />Kecantikan Yakin.</>
            )}
          </h1>
          <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: 'rgba(245,239,230,0.65)' }}>
            {lang === 'en'
              ? 'Specialist lash, brow & wellness treatments — every product wudhu-friendly.'
              : 'Rawatan lash, brow & wellness pakar — setiap produk mesra wudhu.'}
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-fit px-7 py-3 rounded-full text-sm tracking-wide transition-all duration-200 active:scale-95"
            style={{ background: 'var(--cream)', color: 'var(--burgundy)', fontWeight: 500 }}
          >
            {lang === 'en' ? 'Book Now' : 'Tempah Sekarang'}
          </a>
        </div>

        <div className="relative" style={{ minHeight: 420 }}>
          <Image
            src="https://picsum.photos/seed/nuay-hero-portrait/900/1100"
            alt="Nuay Beauty client"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute bottom-6 right-6 left-6 md:left-auto md:w-64 rounded-xl p-4 shadow-xl"
            style={{ background: 'var(--surface)' }}
          >
            <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--burgundy)' }}>
              {lang === 'en' ? 'Featured Treatment' : 'Rawatan Pilihan'}
            </p>
            <p className="text-sm mb-2" style={{ ...HEADING, color: 'var(--charcoal)' }}>
              {featured[0].nameEn}
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs inline-flex items-center gap-1"
              style={{ color: 'var(--burgundy)', fontWeight: 500 }}
            >
              {lang === 'en' ? 'Shop Now' : 'Tempah'} <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Just In ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 max-w-5xl mx-auto text-center hero-reveal" style={{ '--delay': '0s' } as React.CSSProperties}>
        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
          {lang === 'en' ? 'Just In' : 'Terkini'}
        </p>
        <h2 className="text-3xl md:text-4xl mb-12" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
          {lang === 'en' ? 'Fresh Glow Essentials' : 'Rawatan Glow Terbaharu'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {featured.map((svc) => (
            <div key={svc.id} className="flex items-center gap-5 rounded-xl p-5" style={{ background: 'var(--cream-dark)' }}>
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={`https://picsum.photos/seed/${svc.id}/200/200`} alt={svc.nameEn} fill className="object-cover" />
              </div>
              <div>
                <p className="text-base mb-1" style={{ ...HEADING, color: 'var(--charcoal)' }}>{lang === 'en' ? svc.nameEn : svc.nameBm}</p>
                <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{svc.duration}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--burgundy)' }}>RM {svc.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Find the Perfect Treatment ────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto hero-reveal">
        <h2 className="text-3xl md:text-4xl mb-12 text-center" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
          {lang === 'en' ? 'Find the Perfect Treatment for You' : 'Cari Rawatan Sesuai untuk Anda'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div key={c.svc.id} className="relative rounded-xl overflow-hidden group" style={{ aspectRatio: '3/4' }}>
              <Image src={`https://picsum.photos/seed/cat-${c.svc.id}/300/400`} alt={c.labelEn} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.7), transparent 50%)' }} />
              <p className="absolute bottom-4 left-4 text-sm tracking-wide" style={{ ...HEADING, color: 'var(--cream)' }}>
                {lang === 'en' ? c.labelEn : c.labelBm}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials marquee ───────────────────────────────────────── */}
      <section className="py-20 overflow-hidden hero-reveal" style={{ background: 'var(--beige)' }}>
        <h2 className="text-3xl md:text-4xl mb-12 text-center px-6" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
          {lang === 'en' ? 'What Nuay Lovers Are Saying' : 'Kata Pelanggan Nuay'}
        </h2>
        <div className="w-full overflow-hidden">
          <div className="flex gap-5 w-fit" style={{ animation: 'marquee 28s linear infinite' }}>
            {loop.map((t, i) => (
              <div key={i} className="rounded-xl p-6 flex-shrink-0" style={{ background: 'var(--surface)', width: 300 }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.location}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} weight="fill" style={{ color: 'var(--gold)' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal-mid)' }}>
                  {lang === 'en' ? t.text : t.textBm}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature Treatments ──────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 max-w-5xl mx-auto hero-reveal">
        <h2 className="text-3xl md:text-4xl mb-12 text-center" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
          {lang === 'en' ? 'Signature Treatments' : 'Rawatan Signature'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {signature.map((svc) => (
            <div key={svc.id} className="text-center">
              <div className="relative rounded-xl overflow-hidden mb-4" style={{ aspectRatio: '4/5' }}>
                <Image src={`https://picsum.photos/seed/sig-${svc.id}/300/375`} alt={svc.nameEn} fill className="object-cover" />
              </div>
              <p className="text-lg mb-1" style={{ ...HEADING, color: 'var(--charcoal)' }}>{lang === 'en' ? svc.nameEn : svc.nameBm}</p>
              <p className="text-sm" style={{ color: 'var(--burgundy)' }}>RM {svc.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Full-bleed CTA banner ──────────────────────────────────────── */}
      <section className="relative hero-reveal" style={{ minHeight: 420 }}>
        <Image src="https://picsum.photos/seed/nuay-cta-banner/1600/700" alt="Nuay Beauty treatment" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="rounded-xl p-8 text-center max-w-sm" style={{ background: 'var(--surface)' }}>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Begin Your Routine' : 'Mulakan Rawatan Anda'}
            </p>
            <h3 className="text-2xl mb-5" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
              {lang === 'en' ? 'Ready to Start Your Nuay Journey?' : 'Sedia untuk Mulakan Perjalanan Nuay Anda?'}
            </h3>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3 rounded-full text-sm tracking-wide"
              style={{ background: 'var(--burgundy)', color: 'var(--cream)', fontWeight: 500 }}
            >
              {lang === 'en' ? 'Book Now' : 'Tempah Sekarang'}
            </a>
          </div>
        </div>
      </section>

      {/* ── Loved by the Community ──────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto hero-reveal">
        <h2 className="text-3xl md:text-4xl mb-12 text-center" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
          {lang === 'en' ? 'Loved by the Nuay Community' : 'Disayangi Komuniti Nuay'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artists.concat(artists.slice(0, 1)).slice(0, 4).map((a, i) => (
            <div key={i} className="text-center">
              <div className="relative rounded-xl overflow-hidden mb-3" style={{ aspectRatio: '3/4' }}>
                <Image src={`https://picsum.photos/seed/loved-${a.id}-${i}/300/400`} alt={a.name} fill className="object-cover" />
                <span
                  className="absolute top-2 left-2 text-[10px] tracking-wide uppercase px-2 py-1 rounded-full"
                  style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
                >
                  {lang === 'en' ? 'Specialist' : 'Pakar'}
                </span>
              </div>
              <p className="text-sm" style={{ ...HEADING, color: 'var(--charcoal)' }}>{a.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Limited Offers ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 max-w-6xl mx-auto hero-reveal">
        <h2 className="text-3xl md:text-4xl mb-12 text-center" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
          {lang === 'en' ? 'Limited Offers for Your Best Skin Yet' : 'Tawaran Terhad untuk Kulit Terbaik Anda'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-xl overflow-hidden" style={{ minHeight: 220 }}>
            <Image src="https://picsum.photos/seed/offer-1/700/450" alt="New client offer" fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: 'rgba(28,28,28,0.45)' }} />
            <div className="absolute bottom-6 left-6">
              <p className="text-3xl mb-2" style={{ ...HEADING, color: 'var(--cream)' }}>-20% Off</p>
              <p className="text-sm mb-4" style={{ color: 'rgba(245,239,230,0.8)' }}>
                {lang === 'en' ? 'For first-time clients' : 'Untuk pelanggan baharu'}
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2 rounded-full text-xs tracking-wide" style={{ background: 'var(--cream)', color: 'var(--charcoal)' }}>
                {lang === 'en' ? 'Book Now' : 'Tempah'}
              </a>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden" style={{ minHeight: 220 }}>
            <Image src="https://picsum.photos/seed/offer-2/700/450" alt="Bundle offer" fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: 'rgba(28,28,28,0.45)' }} />
            <div className="absolute bottom-6 left-6">
              <p className="text-3xl mb-2" style={{ ...HEADING, color: 'var(--cream)' }}>{lang === 'en' ? 'Free Add-On' : 'Add-On Percuma'}</p>
              <p className="text-sm mb-4" style={{ color: 'rgba(245,239,230,0.8)' }}>
                {lang === 'en' ? 'On bookings above RM200' : 'Untuk tempahan atas RM200'}
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2 rounded-full text-xs tracking-wide" style={{ background: 'var(--cream)', color: 'var(--charcoal)' }}>
                {lang === 'en' ? 'Book Now' : 'Tempah'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Clients Love Nuay ───────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto hero-reveal">
        <h2 className="text-3xl md:text-4xl mb-12 text-center" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
          {lang === 'en' ? 'Why Clients Love Nuay' : 'Mengapa Pelanggan Sayang Nuay'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative rounded-xl overflow-hidden md:row-span-2" style={{ aspectRatio: '3/4' }}>
            <Image src="https://picsum.photos/seed/why-1/400/600" alt="Studio" fill className="object-cover" />
          </div>
          {[
            { titleEn: 'Mesra Wudhu', titleBm: 'Mesra Wudhu', descEn: 'Every product is water-permeable.', descBm: 'Setiap produk boleh ditembusi air.' },
            { titleEn: 'Private Studio', titleBm: 'Studio Peribadi', descEn: 'A calm, comfortable space just for you.', descBm: 'Ruang tenang dan selesa khusus untuk anda.' },
            { titleEn: 'Expert Artists', titleBm: 'Artist Pakar', descEn: 'Skilled specialists for every treatment.', descBm: 'Pakar berkemahiran untuk setiap rawatan.' },
          ].map((f, i) => (
            <div key={i} className="rounded-xl p-6" style={{ background: 'var(--cream-dark)' }}>
              <p className="text-lg mb-2" style={{ ...HEADING, color: 'var(--burgundy)' }}>{lang === 'en' ? f.titleEn : f.titleBm}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{lang === 'en' ? f.descEn : f.descBm}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Help Center / FAQ ────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 hero-reveal" style={{ background: 'var(--cream-dark)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-12 text-center" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
            {lang === 'en' ? 'Nuay Help Center' : 'Pusat Bantuan Nuay'}
          </h2>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="py-5 cursor-pointer"
                style={{ borderTop: '1px solid var(--beige)' }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base leading-snug" style={{ ...HEADING, color: 'var(--charcoal)', fontWeight: 400 }}>
                    {lang === 'en' ? faq.questionEn : faq.questionBm}
                  </h3>
                  {openFaq === i
                    ? <Minus size={18} style={{ color: 'var(--burgundy)', flexShrink: 0, marginTop: 3 }} />
                    : <Plus size={18} style={{ color: 'var(--muted)', flexShrink: 0, marginTop: 3 }} />}
                </div>
                {openFaq === i && (
                  <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--muted)' }}>
                    {lang === 'en' ? faq.answerEn : faq.answerBm}
                  </p>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--beige)' }} />
          </div>
        </div>
      </section>
    </div>
  );
}
