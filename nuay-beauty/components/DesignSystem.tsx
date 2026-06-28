// Shared building blocks for the Nuay Beauty Design System.
// Fonts/tokens themselves live in app/layout.tsx + app/globals.css (site-wide);
// this module only holds the reusable style helpers/components built on top of them.
import { Star } from '@phosphor-icons/react';

export const DISPLAY = { fontFamily: 'var(--font-nuay-display), serif' };
export const BODY = { fontFamily: 'var(--font-nuay-body), sans-serif' };

export function Eyebrow({
  children,
  tone = 'wine',
}: {
  children: React.ReactNode;
  tone?: 'wine' | 'gold' | 'onWine';
}) {
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

export function SectionHead({
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

export function Section({
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

export function Rating({ score }: { score: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
      <Star size={14} weight="fill" color="var(--wine-700)" />
      <span style={{ ...BODY, fontSize: 14, fontWeight: 700, color: 'var(--ink-950)' }}>{score.toFixed(1)}</span>
    </span>
  );
}

export function PriceBadge({ value }: { value: number }) {
  return (
    <span
      style={{
        ...BODY,
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '0.02em',
        color: 'var(--wine-700)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      RM{value.toFixed(2)}
    </span>
  );
}
