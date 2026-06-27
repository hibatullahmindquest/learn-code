'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Cormorant_Garamond, Poppins } from 'next/font/google';
import { ArrowUpRight, Star } from '@phosphor-icons/react';
import { useLang } from '@/components/LanguageContext';
import { BOOKING_URL, services, artists, testimonials, faqs } from '@/lib/data';

// Page-scoped fonts + tokens, ported from the Nuay Beauty Design System
// (Cormorant Garamond display / Poppins body) — scoped to this page only so
// the rest of the site keeps its existing fonts/palette.
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-nuay-display',
  display: 'swap',
});

const body = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-nuay-body',
  display: 'swap',
});

const TOKENS = {
  '--wine-950': '#2E0F0F',
  '--wine-900': '#3A1414',
  '--wine-800': '#4E1818',
  '--wine-700': '#5E1F1F',
  '--wine-600': '#6A2E2E',
  '--gold-600': '#B0884F',
  '--gold-500': '#C8A97E',
  '--gold-300': '#DCC6A4',
  '--gold-100': '#EFE4D2',
  '--ink-950': '#1A1410',
  '--ink-800': '#2B2320',
  '--ink-600': '#5A4F47',
  '--ink-400': '#8A7E74',
  '--sand-500': '#E5DDD5',
  '--beige-100': '#F5F0EA',
  '--beige-50': '#F9F6F3',
  '--line': '#E5DDD3',
  '--radius-button': '3px',
  '--radius-card': '8px',
  '--radius-surface': '16px',
  '--radius-image': '20px',
  '--shadow-md': '0 8px 24px rgba(46, 28, 22, 0.07)',
  '--shadow-lg': '0 18px 48px rgba(46, 28, 22, 0.10)',
  '--shadow-wine': '0 18px 44px rgba(94, 31, 31, 0.22)',
  '--ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
} as React.CSSProperties;

const DISPLAY = { fontFamily: 'var(--font-nuay-display), serif' };
const BODY = { fontFamily: 'var(--font-nuay-body), sans-serif' };

function Eyebrow({ children, tone = 'wine' }: { children: React.ReactNode; tone?: 'wine' | 'gold' | 'onWine' }) {
  const colors = { wine: 'var(--wine-700)', gold: 'var(--gold-600)', onWine: 'var(--gold-300)' };
  return (
    <span
      style={{
        ...BODY,
        display: 'block',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: colors[tone],
      }}
    >
      {children}
    </span>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  center,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div
      style={{
        textAlign: center ? 'center' : 'left',
        maxWidth: center ? 660 : 'none',
        margin: center ? '0 auto 56px' : '0 0 48px',
      }}
    >
      <Eyebrow tone="gold">{eyebrow}</Eyebrow>
      <h2
        style={{
          ...DISPLAY,
          fontSize: 'clamp(2rem, 1.4vw + 1.6rem, 3.5rem)',
          fontWeight: 600,
          lineHeight: 1.08,
          color: 'var(--ink-950)',
          margin: '14px 0 0',
        }}
      >
        {title}
      </h2>
      {sub && (
        <p style={{ ...BODY, fontSize: 18, lineHeight: 1.65, color: 'var(--ink-600)', margin: '16px 0 0' }}>{sub}</p>
      )}
    </div>
  );
}

function Section({
  children,
  alt,
  style = {},
}: {
  children: React.ReactNode;
  alt?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <section style={{ background: alt ? 'var(--beige-50)' : 'transparent', padding: '96px 24px', ...style }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

function PriceBadge({ value }: { value: number }) {
  return (
    <span
      style={{
        ...BODY,
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: '0.02em',
        color: 'var(--wine-700)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      RM{value.toFixed(2)}
    </span>
  );
}

export default function HeroPage() {
  const { lang } = useLang();
  const en = lang === 'en';

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
    document.querySelectorAll('.nuay-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Force the shared Navbar/Footer onto Poppins only while this page is
  // mounted — they read `--font-cormorant`/`--font-outfit` from the body,
  // so this doesn't touch the components themselves and reverts elsewhere.
  useEffect(() => {
    document.body.classList.add('nuay-hero-fonts');
    return () => document.body.classList.remove('nuay-hero-fonts');
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pos, setPos] = useState(50);

  const featured = services.slice(0, 3);
  const loop = [...testimonials, ...testimonials];

  return (
    <div
      className={`${display.variable} ${body.variable}`}
      style={{ ...TOKENS, ...BODY, background: 'var(--sand-500)' }}
    >
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: 620, overflow: 'hidden' }}>
        <Image
          src="/images/nuay-reception.webp"
          alt="Nuay Beauty studio"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(26,20,16,0.66) 0%, rgba(26,20,16,0.32) 55%, rgba(26,20,16,0.08) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: 1280,
            margin: '0 auto',
            minHeight: 620,
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <Eyebrow tone="onWine">{en ? 'Where Beauty Meets Sincerity' : 'Di Mana Kecantikan Bertemu Keikhlasan'}</Eyebrow>
            <h1
              style={{
                ...DISPLAY,
                fontSize: 'clamp(2.75rem, 3vw + 2rem, 5.25rem)',
                fontWeight: 600,
                lineHeight: 1.03,
                color: 'var(--beige-50)',
                margin: '20px 0 0',
              }}
            >
              {en ? (
                <>Feel Beautiful, <span style={{ fontStyle: 'italic', color: 'var(--gold-300)' }}>Stay Pure.</span></>
              ) : (
                <>Rasa Cantik, <span style={{ fontStyle: 'italic', color: 'var(--gold-300)' }}>Kekal Suci.</span></>
              )}
            </h1>
            <p style={{ ...BODY, fontSize: 18, lineHeight: 1.65, color: 'rgba(249,246,243,0.82)', margin: '24px 0 36px', maxWidth: 460 }}>
              {en
                ? 'Specialist lash, brow & wellness treatments crafted for the modern Muslimah — every product wudhu-friendly.'
                : 'Rawatan lash, brow & wellness pakar yang direka untuk Muslimah moden — setiap produk mesra wudhu.'}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...BODY,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-button)',
                  background: 'var(--wine-700)',
                  color: 'var(--beige-50)',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'background var(--dur-base, 280ms) var(--ease-out)',
                }}
              >
                {en ? 'Reserve Your Appointment' : 'Tempah Temujanji'}
              </a>
              <a
                href="#services"
                style={{
                  ...BODY,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-button)',
                  border: '1px solid rgba(249,246,243,0.5)',
                  color: 'var(--beige-50)',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {en ? 'View Our Services' : 'Lihat Servis Kami'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--wine-700)', padding: '56px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { value: '2k+', labelEn: 'Happy Clients', labelBm: 'Pelanggan Gembira' },
            { value: '100%', labelEn: 'Wudhu-Friendly', labelBm: 'Mesra Wudhu' },
            { value: '3', labelEn: 'Specialist Artists', labelBm: 'Artist Pakar' },
            { value: '4.9', labelEn: 'Average Rating', labelBm: 'Penilaian Purata' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', borderLeft: i ? '1px solid rgba(200,169,126,0.28)' : 'none' }}>
              <div style={{ ...DISPLAY, fontSize: 'clamp(1.75rem, 1vw + 1.4rem, 2.75rem)', fontWeight: 600, color: 'var(--gold-300)', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ ...BODY, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(249,246,243,0.7)', marginTop: 10 }}>
                {en ? s.labelEn : s.labelBm}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Services ─────────────────────────────────────────── */}
      <Section alt style={{ paddingTop: '110px' }}>
        <div id="services" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
          <SectionHead
            eyebrow={en ? 'Signature Treatments' : 'Rawatan Istimewa'}
            title={en ? 'Featured Services' : 'Servis Pilihan'}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {featured.map((s, idx) => (
            <a
              key={s.id}
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nuay-card"
              style={{
                display: 'block',
                background: 'var(--white, #fff)',
                borderRadius: 'var(--radius-card)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 280ms var(--ease-out), box-shadow 280ms var(--ease-out)',
              }}
            >
              <div style={{ aspectRatio: '4 / 3', background: 'var(--beige-100)', overflow: 'hidden' }}>
                <Image
                  src={['/images/nuay-studio-1.avif', '/images/nuay-studio-2.avif', '/images/nuay-studio-3.avif'][idx % 3]}
                  alt={en ? s.nameEn : s.nameBm}
                  width={400}
                  height={300}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: 24 }}>
                <Eyebrow tone="gold">{s.category}</Eyebrow>
                <h3 style={{ ...DISPLAY, fontSize: 24, fontWeight: 500, color: 'var(--ink-950)', margin: '8px 0 6px' }}>
                  {en ? s.nameEn : s.nameBm}
                </h3>
                <p style={{ ...BODY, fontSize: 14, color: 'var(--ink-600)', margin: '0 0 18px', lineHeight: 1.55 }}>
                  {en ? s.descEn : s.descBm}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      ...BODY,
                      fontSize: 10.5,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-600)',
                      background: 'var(--beige-100)',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--radius-sm, 4px)',
                      padding: '4px 8px',
                    }}
                  >
                    {s.duration}
                  </span>
                  <PriceBadge value={s.price} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* ── Before / After ─────────────────────────────────────────────── */}
      <Section>
        <SectionHead
          center
          eyebrow={en ? 'The Difference' : 'Perbezaannya'}
          title={en ? 'Before & After' : 'Sebelum & Selepas'}
          sub={en ? 'Drag to reveal the refinement of a single session.' : 'Seret untuk lihat hasil selepas satu sesi.'}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: 920,
            margin: '0 auto',
            aspectRatio: '16 / 9',
            borderRadius: 'var(--radius-image)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            userSelect: 'none',
          }}
        >
          <Image src="/images/nuay-lounge.webp" alt="After" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, width: `${pos}%`, overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: `${100 / (pos / 100)}%`, height: '100%' }}>
              <Image
                src="/images/nuay-reception.webp"
                alt="Before"
                fill
                style={{ objectFit: 'cover', filter: 'saturate(0.7) brightness(0.92)' }}
              />
            </div>
            <span
              style={{
                position: 'absolute',
                left: 18,
                bottom: 16,
                ...BODY,
                fontSize: 11,
                letterSpacing: '0.16em',
                color: 'var(--beige-50)',
                background: 'rgba(26,20,16,0.5)',
                padding: '5px 10px',
                borderRadius: 3,
              }}
            >
              {en ? 'BEFORE' : 'SEBELUM'}
            </span>
          </div>
          <span
            style={{
              position: 'absolute',
              right: 18,
              bottom: 16,
              ...BODY,
              fontSize: 11,
              letterSpacing: '0.16em',
              color: 'var(--beige-50)',
              background: 'rgba(94,31,31,0.7)',
              padding: '5px 10px',
              borderRadius: 3,
            }}
          >
            {en ? 'AFTER' : 'SELEPAS'}
          </span>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, background: 'var(--beige-50)', transform: 'translateX(-1px)' }}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--beige-50)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: 'var(--wine-700)',
              }}
            >
              ↔
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={pos}
            onChange={(e) => setPos(+e.target.value)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize', margin: 0 }}
          />
        </div>
      </Section>

      {/* ── Why Choose ─────────────────────────────────────────────────── */}
      <Section alt>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center' }} className="nuay-why-grid">
          <div style={{ borderRadius: 'var(--radius-image)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', position: 'relative', aspectRatio: '4/5' }}>
            <Image src="/images/nuay-lounge.webp" alt="The Nuay studio" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <SectionHead eyebrow={en ? 'Why Nuay' : 'Kenapa Nuay'} title={en ? 'A standard you can feel' : 'Standard yang anda boleh rasa'} />
            <div style={{ display: 'grid', gap: 26 }}>
              {[
                { t: en ? 'Wudhu-Friendly, Always' : 'Mesra Wudhu, Sentiasa', d: en ? 'Every product used is water-permeable — beauty without compromising your worship.' : 'Setiap produk boleh ditembusi air — cantik tanpa mengorbankan ibadah anda.' },
                { t: en ? 'Specialist Artists Only' : 'Hanya Artist Pakar', d: en ? 'Every guest is paired with a vetted specialist for precise, gentle results.' : 'Setiap pelanggan dipadankan dengan pakar berkemahiran untuk hasil yang teliti dan lembut.' },
                { t: en ? 'Calm, Private Studio' : 'Studio Tenang & Peribadi', d: en ? 'A cozy, unhurried space designed for full relaxation.' : 'Ruang selesa dan tenang direka untuk relaksasi sepenuhnya.' },
                { t: en ? 'Clean by Design' : 'Bersih Mengikut Reka Bentuk', d: en ? 'A clean, professional environment for every visit.' : 'Persekitaran bersih dan profesional pada setiap lawatan.' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, paddingBottom: 26, borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                  <div style={{ ...BODY, fontSize: 14, color: 'var(--gold-600)', flexShrink: 0, paddingTop: 4 }}>0{i + 1}</div>
                  <div>
                    <h3 style={{ ...DISPLAY, fontSize: 22, fontWeight: 500, color: 'var(--ink-950)', margin: 0 }}>{p.t}</h3>
                    <p style={{ ...BODY, fontSize: 15, color: 'var(--ink-600)', margin: '6px 0 0', lineHeight: 1.6 }}>{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <Section>
        <SectionHead center eyebrow={en ? 'In Their Words' : 'Kata Mereka'} title={en ? 'Held in high regard' : 'Dipandang tinggi'} />
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{ display: 'flex', gap: 24, animation: 'marquee 32s linear infinite', width: 'max-content' }}
          >
            {loop.map((t, i) => (
              <div
                key={i}
                style={{
                  width: 340,
                  flexShrink: 0,
                  background: 'var(--beige-100)',
                  borderRadius: 'var(--radius-surface)',
                  padding: 32,
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={15} weight="fill" color="var(--wine-700)" />
                  ))}
                </div>
                <p style={{ ...DISPLAY, fontStyle: 'italic', fontSize: 19, color: 'var(--ink-800)', margin: '0 0 24px', lineHeight: 1.4 }}>
                  &ldquo;{en ? t.text : t.textBm}&rdquo;
                </p>
                <div style={{ ...BODY, fontSize: 14, fontWeight: 700, color: 'var(--ink-950)' }}>{t.name}</div>
                <div style={{ ...BODY, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-400)', marginTop: 4 }}>
                  {t.service}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Artists ─────────────────────────────────────────────────────── */}
      <Section alt>
        <SectionHead center eyebrow={en ? 'Meet Your Artists' : 'Kenali Artist Kami'} title={en ? 'Held with care' : 'Dijaga dengan teliti'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {artists.map((a) => (
            <div key={a.id} style={{ background: 'var(--white, #fff)', borderRadius: 'var(--radius-card)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ position: 'relative', aspectRatio: '4/5' }}>
                <Image src={a.image} alt={a.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ ...DISPLAY, fontSize: 24, fontWeight: 500, color: 'var(--ink-950)', margin: 0 }}>{a.name}</h3>
                <p style={{ ...BODY, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-600)', margin: '6px 0 14px' }}>
                  {en ? a.roleEn : a.roleBm}
                </p>
                <p style={{ ...BODY, fontSize: 14, color: 'var(--ink-600)', margin: 0, lineHeight: 1.6 }}>{en ? a.bioEn : a.bioBm}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <Section>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <SectionHead center eyebrow={en ? 'Good to Know' : 'Perlu Tahu'} title={en ? 'Questions, answered' : 'Soalan, dijawab'} />
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    padding: '24px 4px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ ...DISPLAY, fontSize: 20, fontWeight: 500, color: 'var(--ink-950)' }}>
                    {en ? f.questionEn : f.questionBm}
                  </span>
                  <ArrowUpRight
                    size={18}
                    color="var(--gold-600)"
                    style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(135deg)' : 'none', transition: 'transform 280ms var(--ease-out)' }}
                  />
                </button>
                <div style={{ maxHeight: openFaq === i ? 240 : 0, overflow: 'hidden', transition: 'max-height 280ms var(--ease-out)' }}>
                  <p style={{ ...BODY, fontSize: 15, color: 'var(--ink-600)', margin: 0, padding: '0 4px 26px', lineHeight: 1.65 }}>
                    {en ? f.answerEn : f.answerBm}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            background: 'var(--wine-700)',
            borderRadius: 24,
            padding: '80px 24px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-wine)',
          }}
        >
          <Eyebrow tone="onWine">{en ? 'Reserve Your Ritual' : 'Tempah Sekarang'}</Eyebrow>
          <h2 style={{ ...DISPLAY, fontSize: 'clamp(1.75rem, 1.6vw + 1.4rem, 3rem)', fontWeight: 600, color: 'var(--beige-50)', margin: '16px 0 0' }}>
            {en ? (
              <>Your appointment, <span style={{ fontStyle: 'italic', color: 'var(--gold-300)' }}>kept for you</span></>
            ) : (
              <>Temujanji anda, <span style={{ fontStyle: 'italic', color: 'var(--gold-300)' }}>terjaga untuk anda</span></>
            )}
          </h2>
          <p style={{ ...BODY, fontSize: 16, color: 'rgba(249,246,243,0.78)', margin: '18px auto 32px', maxWidth: 480, lineHeight: 1.65 }}>
            {en
              ? 'Specialist lash, brow & wellness treatments — every product wudhu-friendly.'
              : 'Rawatan lash, brow & wellness pakar — setiap produk mesra wudhu.'}
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...BODY,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              borderRadius: 'var(--radius-button)',
              background: 'var(--gold-500)',
              color: 'var(--ink-950)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {en ? 'Reserve Your Appointment' : 'Tempah Temujanji'}
          </a>
        </div>
      </section>

      <style jsx global>{`
        .nuay-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        @media (max-width: 860px) {
          .nuay-why-grid {
            grid-template-columns: 1fr !important;
          }
        }
        body.nuay-hero-fonts {
          --font-cormorant: 'Poppins', sans-serif;
          --font-outfit: 'Poppins', sans-serif;
        }
        body.nuay-hero-fonts header nav {
          gap: 3rem !important;
        }
        body.nuay-hero-fonts header nav a {
          font-weight: 700 !important;
        }
      `}</style>
    </div>
  );
}
