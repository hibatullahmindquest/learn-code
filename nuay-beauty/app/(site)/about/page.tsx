'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Phone, ArrowRight, NavigationArrow, Briefcase, GraduationCap, WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/components/LanguageContext';
import { useSiteData, getCopy } from '@/components/SiteDataContext';

export default function AboutPage() {
  const { lang } = useLang();
  const { contact, copy, images } = useSiteData();
  const t = getCopy(copy, lang);
  const BOOKING_URL = contact.bookingUrl;
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
    <div style={{ background: 'var(--beige-50)' }}>

      {/* ─────────────── HEADER ─────────────── */}
      <section
        className="relative pt-36 md:pt-44 pb-20 md:pb-24 px-6 lg:px-10"
        style={{ background: 'var(--beige-100)', borderBottom: '1px solid var(--line)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal" style={{ transform: 'translateY(32px)' } as React.CSSProperties}>
            <p className="text-xs tracking-[0.42em] uppercase mb-5" style={{ color: 'var(--gold-600)' }}>
              {lang === 'en' ? 'Who We Are' : 'Siapa Kami'}
            </p>
            <h1
              className="tracking-tight leading-none mb-6"
              style={{ fontSize: 'var(--fs-page-title)', fontFamily: 'var(--font-nuay-display), serif', fontWeight: 600, color: 'var(--ink-950)' }}
            >
              {lang === 'en' ? (
                <>Our <span style={{ fontStyle: 'italic', color: 'var(--wine-700)' }}>Story</span></>
              ) : (
                <>Kisah <span style={{ fontStyle: 'italic', color: 'var(--wine-700)' }}>Kami</span></>
              )}
            </h1>
            <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--ink-400)', fontWeight: 300 }}>
              {t.about.sub}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── BRAND VALUES ─────────────── */}
      <section className="py-28 md:py-36 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
          <div>
            <div
              className="reveal"
              style={{ transform: 'translateY(28px)' } as React.CSSProperties}
            >
              <p className="text-xs tracking-[0.38em] uppercase mb-4" style={{ color: 'var(--gold-600)' }}>
                {lang === 'en' ? 'Our Belief' : 'Kepercayaan Kami'}
              </p>
              <h2
                className="tracking-tight leading-tight mb-7"
                style={{ fontSize: 'var(--fs-section-title)', fontFamily: 'var(--font-nuay-display), serif', fontWeight: 600, color: 'var(--ink-950)' }}
              >
                {t.about.beliefHeading}
              </h2>
            </div>
            <div
              className="reveal"
              style={{ transform: 'translateY(24px)', '--delay': '0.08s' } as React.CSSProperties}
            >
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--ink-400)' }}>
                {t.about.beliefPara1}
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--ink-400)' }}>
                {t.about.beliefPara2}
              </p>
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="reveal row-span-2 rounded-3xl overflow-hidden relative group"
              style={{ aspectRatio: '2/3', transform: 'scale(0.97)' } as React.CSSProperties}
            >
              <Image src={images.aboutPhotos?.[0] || '/images/nuay-artist.png'} alt="Studio" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
            <div
              className="reveal rounded-3xl overflow-hidden relative group"
              style={{ aspectRatio: '1', transform: 'scale(0.97)', '--delay': '0.06s' } as React.CSSProperties}
            >
              <Image src={images.aboutPhotos?.[1] || '/images/nuay-studio-3.avif'} alt="Studio" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
            <div
              className="reveal rounded-3xl overflow-hidden relative group"
              style={{ aspectRatio: '1', transform: 'scale(0.97)', '--delay': '0.12s' } as React.CSSProperties}
            >
              <Image src={images.aboutPhotos?.[2] || '/images/nuay-studio-4.avif'} alt="Studio" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── JOIN US / LEARN WITH US ─────────────── */}
      <section className="relative py-28 md:py-36 px-6 lg:px-10 overflow-hidden">
        <Image
          src="https://fsyqbpaafdorxrjqkemb.supabase.co/storage/v1/object/public/media/uploads/1782651687556-dkn2e.png"
          alt=""
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(28,20,16,0.8) 0%, rgba(28,20,16,0.88) 100%)' }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <div
            className="reveal text-center mb-14"
            style={{ transform: 'translateY(24px)' } as React.CSSProperties}
          >
            <p className="text-xs tracking-[0.38em] uppercase mb-3" style={{ color: 'var(--gold-300)' }}>
              {lang === 'en' ? 'Opportunities' : 'Peluang'}
            </p>
            <h2
              className="tracking-tight leading-none"
              style={{ fontSize: 'var(--fs-section-title)', fontFamily: 'var(--font-nuay-display), serif', fontWeight: 600, color: 'var(--beige-50)' }}
            >
              {lang === 'en' ? 'Grow With Nuay' : 'Berkembang Dengan Nuay'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="reveal rounded-2xl p-8 flex flex-col items-start"
              style={{ background: 'var(--beige-50)', border: '1px solid var(--line)', transform: 'translateY(24px)' } as React.CSSProperties}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'var(--beige-100)', border: '1px solid var(--line)' }}
              >
                <Briefcase size={20} style={{ color: 'var(--wine-700)' }} />
              </div>
              <h3
                className="text-xl mb-3"
                style={{ fontFamily: 'var(--font-nuay-display), serif', fontWeight: 500, color: 'var(--ink-950)' }}
              >
                {t.joinUs.vacancyHeading}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--ink-400)' }}>
                {t.joinUs.vacancyText}
              </p>
              <a
                href={`https://wa.me/${t.joinUs.vacancyWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-auto px-6 py-3 text-sm tracking-wide transition-all duration-300 active:scale-[0.97]"
                style={{ background: 'var(--wine-700)', color: 'var(--beige-50)', borderRadius: 'var(--radius-button)' }}
              >
                <WhatsappLogo size={16} weight="fill" />
                {lang === 'en' ? 'Chat on WhatsApp' : 'Hubungi WhatsApp'}
              </a>
            </div>

            <div
              className="reveal rounded-2xl p-8 flex flex-col items-start"
              style={{ background: 'var(--beige-50)', border: '1px solid var(--line)', transform: 'translateY(24px)', '--delay': '0.08s' } as React.CSSProperties}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'var(--beige-100)', border: '1px solid var(--line)' }}
              >
                <GraduationCap size={20} style={{ color: 'var(--wine-700)' }} />
              </div>
              <h3
                className="text-xl mb-3"
                style={{ fontFamily: 'var(--font-nuay-display), serif', fontWeight: 500, color: 'var(--ink-950)' }}
              >
                {t.joinUs.learningHeading}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--ink-400)' }}>
                {t.joinUs.learningText}
              </p>
              <a
                href={`https://wa.me/${t.joinUs.learningWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-auto px-6 py-3 text-sm tracking-wide transition-all duration-300 active:scale-[0.97]"
                style={{ background: 'var(--wine-700)', color: 'var(--beige-50)', borderRadius: 'var(--radius-button)' }}
              >
                <WhatsappLogo size={16} weight="fill" />
                {lang === 'en' ? 'Chat on WhatsApp' : 'Hubungi WhatsApp'}
              </a>
            </div>
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
              <p className="text-xs tracking-[0.38em] uppercase mb-4" style={{ color: 'var(--gold-600)' }}>
                {lang === 'en' ? 'Find Us' : 'Jumpa Kami'}
              </p>
              <h2
                className="tracking-tight leading-none mb-10"
                style={{ fontSize: 'var(--fs-section-title)', fontFamily: 'var(--font-nuay-display), serif', fontWeight: 600, color: 'var(--ink-950)' }}
              >
                {lang === 'en' ? (
                  <>Visit the <span style={{ fontStyle: 'italic' }}>Studio</span></>
                ) : (
                  <>Lawati <span style={{ fontStyle: 'italic' }}>Studio</span></>
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
                  style={{ background: 'var(--beige-100)', border: '1px solid var(--line)' }}
                >
                  <MapPin size={15} style={{ color: 'var(--wine-700)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--ink-950)' }}>
                    {lang === 'en' ? 'Address' : 'Alamat'}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-400)' }}>
                    {lang === 'en' ? contact.addressEn : contact.addressBm}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--beige-100)', border: '1px solid var(--line)' }}
                >
                  <Clock size={15} style={{ color: 'var(--wine-700)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--ink-950)' }}>
                    {lang === 'en' ? 'Operating Hours' : 'Waktu Operasi'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--ink-400)' }}>
                    {lang === 'en' ? contact.hoursEn : contact.hoursBm}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--beige-100)', border: '1px solid var(--line)' }}
                >
                  <Phone size={15} style={{ color: 'var(--wine-700)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--ink-950)' }}>
                    {lang === 'en' ? 'Contact' : 'Hubungi'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--ink-400)' }}>
                    {t.about.phone}
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
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 text-sm tracking-wide transition-all duration-300 active:scale-[0.97]"
                style={{ background: 'var(--wine-700)', color: 'var(--beige-50)', borderRadius: 'var(--radius-button)' }}
              >
                {lang === 'en' ? 'Book Appointment' : 'Tempah Temujanji'}
                <ArrowRight size={13} />
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://maps.app.goo.gl/Ec1DMm4QCJpZAaG69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 text-sm tracking-wide transition-all duration-300"
                  style={{ border: '1px solid var(--line)', color: 'var(--ink-800)', borderRadius: 'var(--radius-button)' }}
                >
                  <NavigationArrow size={14} />
                  Google Maps
                </a>
                <a
                  href="https://ul.waze.com/ul?place=ChIJmUW_SVxRzDERKZ1a04DTF94&ll=3.16885900%2C101.51710540&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 text-sm tracking-wide transition-all duration-300"
                  style={{ border: '1px solid var(--line)', color: 'var(--ink-800)', borderRadius: 'var(--radius-button)' }}
                >
                  <NavigationArrow size={14} />
                  Waze
                </a>
              </div>
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
