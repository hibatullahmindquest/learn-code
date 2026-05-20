'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Phone, ArrowRight, WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/components/LanguageContext';
import { content, faqs } from '@/lib/data';
import { useSiteData } from '@/components/SiteDataContext';

export default function AboutPage() {
  const { lang } = useLang();
  const t = content[lang];
  const { contact } = useSiteData();
  const BOOKING_URL = contact.bookingUrl;
  const WHATSAPP_NUMBER = contact.whatsapp;
  const GOOGLE_MAPS_EMBED = contact.googleMapsEmbed;

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

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* ─────────────── HEADER ─────────────── */}
      <section
        className="relative pt-36 pb-20 md:pb-24 px-6 lg:px-10 overflow-hidden"
        style={{ background: 'var(--charcoal)' }}
      >
        <div
          className="absolute top-0 right-0 h-full w-[45vw] md:w-[35vw] pointer-events-none hidden md:block"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)',
          }}
        >
          <Image src="/images/nuay-studio-4.avif" alt="" fill className="object-cover" style={{ mixBlendMode: 'luminosity', opacity: 0.18 }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal" style={{ transform: 'translateY(32px)' } as React.CSSProperties}>
            <p className="text-xs tracking-[0.42em] uppercase mb-5" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Who We Are' : 'Siapa Kami'}
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-6"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {lang === 'en' ? (
                <>Our <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Story</span></>
              ) : (
                <>Kisah <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Kami</span></>
              )}
            </h1>
            <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(245,239,230,0.5)', fontWeight: 300 }}>
              {t.about.sub}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, var(--cream), transparent)' }} />
      </section>

      {/* ─────────────── BRAND VALUES ─────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
          <div>
            <div
              className="reveal"
              style={{ transform: 'translateY(28px)' } as React.CSSProperties}
            >
              <p className="text-xs tracking-[0.38em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
                {lang === 'en' ? 'Our Belief' : 'Kepercayaan Kami'}
              </p>
              <h2
                className="text-4xl md:text-5xl tracking-tight leading-tight mb-7"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
              >
                {lang === 'en' ? (
                  <>Beauty that honours<br />your <span style={{ fontStyle: 'italic', fontWeight: 400 }}>faith.</span></>
                ) : (
                  <>Kecantikan yang menghormati<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>agama</span> anda.</>
                )}
              </h2>
            </div>
            <div
              className="reveal"
              style={{ transform: 'translateY(24px)', '--delay': '0.08s' } as React.CSSProperties}
            >
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
                {lang === 'en'
                  ? 'At Nuay Beauty, we believe that a woman should never have to choose between feeling beautiful and fulfilling her religious obligations. That\'s why every product, every technique, and every decision at our studio is made with our Muslimah clients at the forefront.'
                  : 'Di Nuay Beauty, kami percaya seorang wanita tidak perlu memilih antara berasa cantik dan memenuhi kewajipan agamanya. Itulah sebabnya setiap produk, setiap teknik, dan setiap keputusan di studio kami dibuat dengan mengutamakan pelanggan Muslimah kami.'}
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                {lang === 'en'
                  ? 'All products used at Nuay Beauty are water-permeable \u2014 they will not invalidate wudhu. This is not a marketing claim; it is our commitment.'
                  : 'Semua produk yang digunakan di Nuay Beauty boleh ditembusi air \u2014 ia tidak akan membatalkan wudhu. Ini bukan tuntutan pemasaran; ia adalah komitmen kami.'}
              </p>
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="reveal row-span-2 rounded-3xl overflow-hidden relative group"
              style={{ aspectRatio: '2/3', transform: 'scale(0.97)' } as React.CSSProperties}
            >
              <Image src="/images/nuay-artist.png" alt="Studio" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
            <div
              className="reveal rounded-3xl overflow-hidden relative group"
              style={{ aspectRatio: '1', transform: 'scale(0.97)', '--delay': '0.06s' } as React.CSSProperties}
            >
              <Image src="/images/nuay-studio-3.avif" alt="Studio" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
            <div
              className="reveal rounded-3xl overflow-hidden relative group"
              style={{ aspectRatio: '1', transform: 'scale(0.97)', '--delay': '0.12s' } as React.CSSProperties}
            >
              <Image src="/images/nuay-studio-4.avif" alt="Studio" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section
        id="faq"
        className="py-28 md:py-36 px-6 lg:px-10"
        style={{ background: 'var(--cream-dark)' }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="reveal text-center mb-14"
            style={{ transform: 'translateY(24px)' } as React.CSSProperties}
          >
            <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              FAQ
            </p>
            <h2
              className="text-4xl md:text-5xl tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
            >
              {t.faq.title}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="reveal group rounded-2xl"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--beige)',
                  transform: 'translateY(24px)',
                  '--delay': `${i * 0.05}s`,
                } as React.CSSProperties}
              >
                <summary
                  className="flex items-center justify-between cursor-pointer px-7 py-5 list-none"
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
        </div>
      </section>

      {/* ─────────────── CONTACT + MAP ─────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          <div>
            <div
              className="reveal"
              style={{ transform: 'translateY(28px)' } as React.CSSProperties}
            >
              <p className="text-xs tracking-[0.38em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
                {lang === 'en' ? 'Find Us' : 'Jumpa Kami'}
              </p>
              <h2
                className="text-4xl md:text-5xl tracking-tight leading-none mb-10"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
              >
                {lang === 'en' ? (
                  <>Visit the <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Studio</span></>
                ) : (
                  <>Lawati <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Studio</span></>
                )}
              </h2>
            </div>

            <div
              className="reveal flex flex-col gap-6 mb-10"
              style={{ transform: 'translateY(24px)', '--delay': '0.08s' } as React.CSSProperties}
            >
              <div className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--beige)' }}
                >
                  <MapPin size={15} style={{ color: 'var(--burgundy)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--charcoal)' }}>
                    {lang === 'en' ? 'Address' : 'Alamat'}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    8-1 Jalan Metafasa U16/5,<br />
                    Taman Bukit Subang,<br />
                    Shah Alam, Selangor
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--beige)' }}
                >
                  <Clock size={15} style={{ color: 'var(--burgundy)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--charcoal)' }}>
                    {lang === 'en' ? 'Operating Hours' : 'Waktu Operasi'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    {lang === 'en' ? 'Mon \u2013 Sat: 10:00am \u2013 6:30pm' : 'Isnin \u2013 Sabtu: 10:00pg \u2013 6:30mlm'}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                    {lang === 'en' ? 'Sunday: Closed' : 'Ahad: Tutup'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--beige)' }}
                >
                  <Phone size={15} style={{ color: 'var(--burgundy)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--charcoal)' }}>
                    {lang === 'en' ? 'Contact' : 'Hubungi'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    +60 11-5411 4028
                  </p>
                </div>
              </div>
            </div>

            <div
              className="reveal flex flex-col gap-3"
              style={{ transform: 'translateY(20px)', '--delay': '0.16s' } as React.CSSProperties}
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 active:scale-[0.97]"
                style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
              >
                {lang === 'en' ? 'Book Appointment' : 'Tempah Temujanji'}
                <ArrowRight size={13} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm tracking-wide transition-all duration-300"
                style={{ border: '1px solid var(--beige)', color: 'var(--charcoal-mid)' }}
              >
                <WhatsappLogo size={15} />
                {lang === 'en' ? 'WhatsApp Us' : 'WhatsApp Kami'}
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className="reveal rounded-3xl overflow-hidden"
            style={{ minHeight: 380, transform: 'scale(0.97)', '--delay': '0.1s' } as React.CSSProperties}
          >
            <iframe
              src={GOOGLE_MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nuay Beauty Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
