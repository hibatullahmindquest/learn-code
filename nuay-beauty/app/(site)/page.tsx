'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useLang } from '@/components/LanguageContext';
import { useSiteData, getCopy } from '@/components/SiteDataContext';
import { BOOKING_URL } from '@/lib/data';
import { DISPLAY, BODY, Eyebrow, SectionHead, Section, Rating, PriceBadge } from '@/components/DesignSystem';

const CATEGORY_LABELS: Record<string, { en: string; bm: string }> = {
  lash: { en: 'Lash', bm: 'Lash' },
  brow: { en: 'Brows', bm: 'Kening' },
  lip: { en: 'Lips', bm: 'Bibir' },
  facial: { en: 'Facial', bm: 'Rawatan Wajah' },
  hair: { en: 'Hair Removal', bm: 'Buang Bulu' },
};

export default function HomePage() {
  const { lang } = useLang();
  const { images, services, artists, copy, testimonials, faqs } = useSiteData();
  const en = lang === 'en';
  const t = getCopy(copy, lang);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pos, setPos] = useState(50);

  const featured = services.filter((s) => s.featured && s.published !== false).slice(0, 3);
  const publishedTestimonials = testimonials.filter((t) => t.published !== false);
  const homepageTestimonials = publishedTestimonials.slice(0, 5);
  const loop = [...homepageTestimonials, ...homepageTestimonials, ...homepageTestimonials];
  const publishedArtists = artists.filter((a) => a.published !== false);
  const averageRating = publishedTestimonials.length > 0
    ? (publishedTestimonials.reduce((sum, item) => sum + (item.rating ?? 5), 0) / publishedTestimonials.length).toFixed(1)
    : '4.9';

  return (
    <div style={{ ...BODY, background: 'var(--sand-500)' }}>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: 620, overflow: 'hidden' }}>
        <Image
          src={images.hero || '/images/nuay-hero.avif'}
          alt={en ? 'Nuay Beauty studio' : 'Studio Nuay Beauty'}
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(26,20,16,0.82) 0%, rgba(26,20,16,0.5) 55%, rgba(26,20,16,0.15) 100%)',
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
                className="nuay-btn nuay-btn-primary"
                style={{
                  ...BODY,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-button)',
                  background: 'var(--wine-700)',
                  color: 'var(--beige-50)',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {en ? 'Reserve Your Appointment' : 'Tempah Temujanji'}
              </a>
              <a
                href="#services"
                className="nuay-btn nuay-btn-ghost-onwine"
                style={{
                  ...BODY,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-button)',
                  border: '1px solid rgba(249,246,243,0.5)',
                  color: 'var(--beige-50)',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
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
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
          {[
            { value: '2k+', labelEn: 'Happy Clients', labelBm: 'Pelanggan Gembira' },
            { value: '100%', labelEn: 'Wudhu-Friendly', labelBm: 'Mesra Wudhu' },
            { value: String(publishedArtists.length), labelEn: 'Specialist Artists', labelBm: 'Artist Pakar' },
            { value: averageRating, labelEn: 'Average Rating', labelBm: 'Penilaian Purata' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
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
      {featured.length > 0 && (
      <Section alt style={{ paddingTop: '110px' }}>
        <div id="services" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
          <SectionHead
            eyebrow={en ? 'Signature Treatments' : 'Rawatan Istimewa'}
            title={t.services.title}
            sub={t.services.sub}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {featured.map((s) => (
            <Link
              key={s.id}
              href={`/services#cat-${s.category}`}
              className="nuay-card"
              style={{
                display: 'block',
                background: 'var(--white)',
                borderRadius: 'var(--radius-surface)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 280ms var(--ease-out), box-shadow 280ms var(--ease-out)',
              }}
            >
              <div className="nuay-card-image" style={{ aspectRatio: '4 / 3', background: 'var(--beige-100)', overflow: 'hidden' }}>
                <Image
                  src={s.image || '/images/nuay-hero.avif'}
                  alt={en ? s.nameEn : s.nameBm}
                  width={400}
                  height={300}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 520ms var(--ease-out)' }}
                />
              </div>
              <div style={{ padding: '22px 24px 26px' }}>
                <Eyebrow tone="gold">{en ? (CATEGORY_LABELS[s.category]?.en ?? s.category) : (CATEGORY_LABELS[s.category]?.bm ?? s.category)}</Eyebrow>
                <h3 style={{ ...DISPLAY, fontSize: 26, fontWeight: 500, color: 'var(--ink-950)', margin: '8px 0 6px', lineHeight: 1.1 }}>
                  {en ? s.nameEn : s.nameBm}
                </h3>
                <p style={{ ...BODY, fontSize: 14, color: 'var(--ink-600)', margin: '0 0 16px', lineHeight: 1.55 }}>
                  {en ? s.descEn : s.descBm}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 8,
                    paddingTop: 16,
                    borderTop: '1px solid var(--line)',
                  }}
                >
                  <span
                    style={{
                      ...BODY,
                      fontSize: 10.5,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-600)',
                      background: 'var(--beige-100)',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '5px 11px',
                    }}
                  >
                    {s.duration}
                  </span>
                  <PriceBadge value={s.price} />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link
            href="/services"
            style={{
              ...BODY,
              fontSize: 14.5,
              fontWeight: 600,
              color: 'var(--wine-700)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--wine-700)',
              paddingBottom: 2,
            }}
          >
            {en ? 'View All Services →' : 'Lihat Semua Servis →'}
          </Link>
        </div>
      </Section>
      )}

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
          <Image src={images.beforeAfter?.after || '/images/nuay-lounge.webp'} alt="After" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, width: `${pos}%`, overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: `${100 / (Math.max(pos, 1) / 100)}%`, height: '100%' }}>
              <Image
                src={images.beforeAfter?.before || '/images/nuay-reception.webp'}
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
                borderRadius: 'var(--radius-button)',
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
            aria-label={en ? 'Before and after comparison slider' : 'Slider perbandingan sebelum dan selepas'}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize', margin: 0 }}
          />
        </div>
      </Section>

      {/* ── Why Choose ─────────────────────────────────────────────────── */}
      <Section alt>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center' }} className="nuay-why-grid">
          <div style={{ borderRadius: 'var(--radius-image)', overflow: 'hidden', position: 'relative', aspectRatio: '4/5' }}>
            <Image src={images.whyNuay || '/images/nuay-lounge.webp'} alt={en ? 'The Nuay studio' : 'Studio Nuay'} fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <SectionHead
              eyebrow={en ? 'Why Nuay' : 'Kenapa Nuay'}
              title={<>{en ? copy.usp.headingLine1En : copy.usp.headingLine1Bm} <em style={{ fontStyle: 'italic', fontWeight: 500 }}>{en ? copy.usp.headingLine2En : copy.usp.headingLine2Bm}</em></>}
              sub={en ? copy.usp.subtitleEn : copy.usp.subtitleBm}
            />
            <div style={{ display: 'grid', gap: 26 }}>
              {[
                { t: en ? copy.usp.pillar1TitleEn : copy.usp.pillar1TitleBm, d: en ? copy.usp.pillar1DescEn : copy.usp.pillar1DescBm },
                { t: en ? copy.usp.pillar2TitleEn : copy.usp.pillar2TitleBm, d: en ? copy.usp.pillar2DescEn : copy.usp.pillar2DescBm },
                { t: en ? copy.usp.pillar3TitleEn : copy.usp.pillar3TitleBm, d: en ? copy.usp.pillar3DescEn : copy.usp.pillar3DescBm },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, paddingBottom: 26, borderBottom: i < 2 ? '1px solid var(--line)' : 'none' }}>
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
      {publishedTestimonials.length > 0 && (
      <Section>
        <SectionHead center eyebrow={en ? 'In Their Words' : 'Kata Mereka'} title={t.testimonials.title} />
        <div style={{ overflow: 'hidden' }}>
          <div
            className="nuay-marquee"
            style={{ display: 'flex', gap: 24, animation: 'marquee 32s linear infinite', width: 'max-content' }}
          >
            {loop.map((item, i) => (
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
                <div style={{ marginBottom: 18 }}>
                  <Rating score={item.rating ?? 5} />
                </div>
                <p style={{ ...DISPLAY, fontStyle: 'italic', fontSize: 19, color: 'var(--ink-800)', margin: '0 0 24px', lineHeight: 1.4 }}>
                  &ldquo;{en ? item.quoteEn : item.quoteBm}&rdquo;
                </p>
                <div style={{ ...BODY, fontSize: 14, fontWeight: 700, color: 'var(--ink-950)' }}>{item.name}</div>
                <div style={{ ...BODY, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-400)', marginTop: 4 }}>
                  {item.service}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link
            href="/artists#testimonials"
            style={{
              ...BODY,
              fontSize: 14.5,
              fontWeight: 600,
              color: 'var(--wine-700)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--wine-700)',
              paddingBottom: 2,
            }}
          >
            {en ? 'See More Reviews →' : 'Lihat Lagi Testimoni →'}
          </Link>
        </div>
      </Section>
      )}

      {/* ── Artists ─────────────────────────────────────────────────────── */}
      {publishedArtists.length > 0 && (
      <Section alt>
        <SectionHead center eyebrow={en ? 'Meet Your Artists' : 'Kenali Artist Kami'} title={t.artists.title} sub={t.artists.sub} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {publishedArtists.map((a) => (
            <Link key={a.id} href={`/artists#${a.id}`} style={{ background: 'var(--white)', borderRadius: 'var(--radius-card)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'block' }}>
              <div style={{ position: 'relative', aspectRatio: '4/5' }}>
                <Image
                  src={a.image || '/images/nuay-artist.png'}
                  alt={`${a.name}, ${a.tier === 'junior' ? (en ? 'Junior Artist' : 'Artis Junior') : (en ? 'Senior Artist' : 'Artis Senior')}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ ...DISPLAY, fontSize: 24, fontWeight: 500, color: 'var(--ink-950)', margin: 0 }}>{a.name}</h3>
                <p style={{ ...BODY, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-600)', margin: '6px 0 14px' }}>
                  {a.tier === 'junior' ? (en ? 'Junior Artist' : 'Artis Junior') : (en ? 'Senior Artist' : 'Artis Senior')}
                </p>
                <p style={{ ...BODY, fontSize: 14, color: 'var(--ink-600)', margin: 0, lineHeight: 1.6 }}>{en ? a.bioEn : a.bioBm}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      )}

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
      <Section>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <SectionHead center eyebrow={en ? 'Good to Know' : 'Perlu Tahu'} title={t.faq.title} />
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
      )}

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            background: 'var(--wine-700)',
            borderRadius: 'var(--radius-hero)',
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
            className="nuay-btn nuay-btn-gold"
            style={{
              ...BODY,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '18px 38px',
              borderRadius: 'var(--radius-button)',
              background: 'var(--gold-500)',
              color: 'var(--ink-950)',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.16em',
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
        .nuay-card:hover .nuay-card-image img {
          transform: scale(1.05);
        }
        .nuay-btn {
          transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out),
            border-color var(--dur-fast) var(--ease-out);
        }
        .nuay-btn-primary:hover {
          background: var(--wine-800) !important;
        }
        .nuay-btn-ghost-onwine:hover {
          background: rgba(249, 246, 243, 0.12) !important;
          border-color: var(--beige-50) !important;
        }
        .nuay-btn-gold:hover {
          background: var(--gold-600) !important;
        }
        @media (max-width: 860px) {
          .nuay-why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
