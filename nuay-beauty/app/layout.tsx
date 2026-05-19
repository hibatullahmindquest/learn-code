import type { Metadata } from 'next';
import { Playfair_Display, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { LanguageProvider } from '@/components/LanguageContext';
import { SiteDataProvider } from '@/components/SiteDataContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-outfit',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${robotoMono.variable}`}>
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ fontFamily: 'var(--font-outfit), monospace', letterSpacing: '-0.02em' }}
      >
        <LanguageProvider>
          <SiteDataProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </SiteDataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
