import type { Metadata } from 'next';
import { Cormorant_Garamond, Poppins } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import { SiteDataProvider } from '@/components/SiteDataContext';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Nuay Beauty Design System — Cormorant Garamond display / Poppins body,
// applied site-wide via CSS variables so no page needs to load these itself.
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

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
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
