'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, MapPin } from '@phosphor-icons/react';
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* Header */}
      <section
        className="pt-36 pb-0 px-6 lg:px-10 overflow-hidden"
        style={{ background: 'var(--charcoal)' }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-end">
          <div className="pb-16">
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Who We Are' : 'Siapa Kami'}
            </p>
            <h1
              className="text-5xl md:text-6xl tracking-tight leading-none mb-6"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--cream)' }}
            >
              {t.about.title}
            </h1>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(245,239,230,0.55)', fontWeight: 300, maxWidth: 440 }}>
              {t.about.sub}
            </p>
          </div>
          <div className="relative h-64 md:h-80 rounded-t-2xl overflow-hidden self-end">
            <Image
              src="/images/nuay-studio-2.avif"
              alt="Nuay Beauty Studio"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Brand values */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Our Belief' : 'Kepercayaan Kami'}
            </p>
            <h2
              className="text-4xl md:text-5xl tracking-tight leading-tight mb-6"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
            >
              {lang === 'en'
                ? 'Beauty that honours your faith.'
                : 'Kecantikan yang menghormati agama anda.'}
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
              {lang === 'en'
                ? 'At Nuay Beauty, we believe that a woman should never have to choose between feeling beautiful and fulfilling her religious obligations. That\'s why every product, every technique, and every decision at our studio is made with our Muslimah clients at the forefront.'
                : 'Di Nuay Beauty, kami percaya seorang wanita tidak perlu memilih antara berasa cantik dan memenuhi kewajipan agamanya. Itulah sebabnya setiap produk, setiap teknik, dan setiap keputusan di studio kami dibuat dengan mengutamakan pelanggan Muslimah kami.'}
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              {lang === 'en'
                ? 'All products used at Nuay Beauty are water-permeable — they will not invalidate wudhu. This is not a marketing claim; it is our commitment.'
                : 'Semua produk yang digunakan di Nuay Beauty boleh ditembusi air — ia tidak akan membatalkan wudhu. Ini bukan tuntutan pemasaran; ia adalah komitmen kami.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden row-span-2" style={{ aspectRatio: '2/3' }}>
              <Image src="/images/nuay-artist.png" alt="Studio" width={400} height={600} className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '1' }}>
              <Image src="/images/nuay-studio-3.avif" alt="Studio" width={300} height={300} className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '1' }}>
              <Image src="/images/nuay-studio-4.avif" alt="Studio" width={300} height={300} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ background: 'var(--cream-dark)' }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 text-center" style={{ color: 'var(--gold)' }}>
            FAQ
          </p>
          <h2
            className="text-4xl md:text-5xl tracking-tight leading-none mb-12 text-center"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
          >
            {t.faq.title}
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
                  <h3
                    className="text-lg leading-snug"
                    style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 400, color: 'var(--charcoal)' }}
                  >
                    {lang === 'en' ? faq.questionEn : faq.questionBm}
                  </h3>
                  {openFaq === i
                    ? <Minus size={18} style={{ color: 'var(--burgundy)', flexShrink: 0, marginTop: 3 }} />
                    : <Plus size={18} style={{ color: 'var(--muted)', flexShrink: 0, marginTop: 3 }} />
                  }
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

      {/* Contact + Map */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'en' ? 'Find Us' : 'Jumpa Kami'}
            </p>
            <h2
              className="text-4xl md:text-5xl tracking-tight leading-none mb-8"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--charcoal)' }}
            >
              {lang === 'en' ? 'Visit the Studio' : 'Lawati Studio'}
            </h2>

            <div className="flex flex-col gap-5 mb-8">
              <div className="flex gap-3 items-start">
                <MapPin size={18} style={{ color: 'var(--burgundy)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--charcoal)' }}>
                    {lang === 'en' ? 'Address' : 'Alamat'}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    Shah Alam, Selangor, Malaysia
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--charcoal)' }}>
                  {lang === 'en' ? 'Operating Hours' : 'Waktu Beroperasi'}
                </p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {lang === 'en' ? 'Monday – Saturday: 10:00am – 7:00pm' : 'Isnin – Sabtu: 10:00pg – 7:00mlm'}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-full text-sm tracking-wide transition-all duration-200 active:scale-95"
                style={{ background: 'var(--burgundy)', color: 'var(--cream)' }}
              >
                {lang === 'en' ? 'Book Appointment' : 'Tempah Temujanji'}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-full text-sm tracking-wide transition-all duration-200"
                style={{ border: '1px solid var(--beige)', color: 'var(--charcoal-mid)' }}
              >
                {lang === 'en' ? 'WhatsApp Us' : 'WhatsApp Kami'}
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden" style={{ minHeight: 350 }}>
            <iframe
              src={GOOGLE_MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
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
