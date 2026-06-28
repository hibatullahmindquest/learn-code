import type { Metadata } from 'next';
import { Cormorant_Garamond, Poppins, Montserrat, Urbanist } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import { SiteDataProvider } from '@/components/SiteDataContext';
import { supabase } from '@/lib/supabase';
import { type FontFamily } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Nuay Beauty Design System — Cormorant Garamond display, body font is
// admin-selectable (Poppins default, Montserrat, Urbanist). All three body
// font options are loaded up front (next/font requires static calls) and
// --font-nuay-body picks the active one via the html[data-body-font] CSS
// rule in globals.css.
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-nuay-display',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nuay Beauty — Lash, Brow & Wellness Studio Shah Alam',
  description: 'Premium lash lift, brow lamination, Roma Pink Lips, Totok Wajah and laser hair removal in Shah Alam. Wudhu-friendly products. Book your appointment today.',
  keywords: 'lash lift shah alam, brow lamination, mesra wudhu, nuay beauty, korean lash lift',
  openGraph: {
    title: 'Nuay Beauty',
    description: 'Premium lash, brow & wellness studio. Wudhu-friendly.',
    locale: 'ms_MY',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: rows } = await supabase.from('site_settings').select('key, value');
  const prefetchedSettings: Record<string, unknown> = {};
  for (const row of rows ?? []) prefetchedSettings[row.key] = row.value;
  const fontFamily = (prefetchedSettings.font_family as FontFamily) || 'default';

  return (
    <html
      lang="en"
      data-body-font={fontFamily}
      className={`${display.variable} ${poppins.variable} ${montserrat.variable} ${urbanist.variable}`}
    >
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ fontFamily: 'var(--font-nuay-body), sans-serif', letterSpacing: '-0.02em' }}
      >
        <LanguageProvider>
          <SiteDataProvider prefetchedSettings={prefetchedSettings}>
            {children}
          </SiteDataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
