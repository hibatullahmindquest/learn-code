import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { LanguageProvider } from '@/components/LanguageContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
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
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
      >
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
