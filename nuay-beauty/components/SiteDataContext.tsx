'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  services as defaultServices,
  artists as defaultArtists,
  testimonials as defaultTestimonials,
  BOOKING_URL,
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  GOOGLE_MAPS_EMBED,
} from '@/lib/data';

// ── Contact ──────────────────────────────────────────────────────────────────
export type ContactSettings = {
  whatsapp: string;
  bookingUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapsEmbed: string;
  addressEn: string;
  addressBm: string;
  hoursEn: string;
  hoursBm: string;
};

// ── Images ───────────────────────────────────────────────────────────────────
export type ImageSettings = {
  hero: string;
  featuredService: string;
  studio: string[];
  gallery: Array<{ url: string; label: string; span: string }>;
  aboutPhotos: [string, string, string];
};

// ── Copy (all editable text strings) ─────────────────────────────────────────
export type CopyData = {
  hero: {
    taglineEn: string; taglineBm: string;
    headlineEn: string; headlineBm: string;
    subtitleEn: string; subtitleBm: string;
    ctaEn: string; ctaBm: string;
    ctaSubEn: string; ctaSubBm: string;
  };
  sections: {
    servicesTitleEn: string; servicesTitleBm: string;
    servicesSubEn: string; servicesSubBm: string;
    artistsTitleEn: string; artistsTitleBm: string;
    artistsSubEn: string; artistsSubBm: string;
    galleryTitleEn: string; galleryTitleBm: string;
    gallerySubEn: string; gallerySubBm: string;
    testimonialsTitleEn: string; testimonialsTitleBm: string;
    faqTitleEn: string; faqTitleBm: string;
  };
  about: {
    headerSubEn: string; headerSubBm: string;
    beliefHeadingEn: string; beliefHeadingBm: string;
    beliefPara1En: string; beliefPara1Bm: string;
    beliefPara2En: string; beliefPara2Bm: string;
    phoneNumber: string;
  };
  usp: {
    headingLine1En: string; headingLine1Bm: string;
    headingLine2En: string; headingLine2Bm: string;
    subtitleEn: string; subtitleBm: string;
    pillar1TitleEn: string; pillar1TitleBm: string;
    pillar1DescEn: string; pillar1DescBm: string;
    pillar2TitleEn: string; pillar2TitleBm: string;
    pillar2DescEn: string; pillar2DescBm: string;
    pillar3TitleEn: string; pillar3TitleBm: string;
    pillar3DescEn: string; pillar3DescBm: string;
  };
  footer: {
    taglineEn: string; taglineBm: string;
    ctaHeadingEn: string; ctaHeadingBm: string;
    ctaSubEn: string; ctaSubBm: string;
  };
};

// ── Defaults (match all existing hardcoded values) ────────────────────────────
export const defaultCopy: CopyData = {
  hero: {
    taglineEn: 'Where Beauty Meets Sincerity',
    taglineBm: 'Di Mana Kecantikan Bertemu Keikhlasan',
    headlineEn: 'Feel Beautiful,\nStay Pure.',
    headlineBm: 'Rasa Cantik,\nKekal Suci.',
    subtitleEn: 'Specialist lash, brow & wellness treatments crafted for the modern Muslimah \u2014 every product wudhu-friendly.',
    subtitleBm: 'Rawatan lash, brow & wellness yang direka untuk Muslimah moden \u2014 setiap produk mesra wudhu.',
    ctaEn: 'Reserve Your Appointment',
    ctaBm: 'Tempah Temujanji',
    ctaSubEn: 'View Our Services',
    ctaSubBm: 'Lihat Servis Kami',
  },
  sections: {
    servicesTitleEn: 'Our Services', servicesTitleBm: 'Servis Kami',
    servicesSubEn: 'Each treatment is performed with precision, using only wudhu-friendly products.',
    servicesSubBm: 'Setiap rawatan dilakukan dengan teliti, menggunakan produk yang mesra wudhu.',
    artistsTitleEn: 'Meet Your Artists', artistsTitleBm: 'Kenali Artist Kami',
    artistsSubEn: 'Skilled specialists dedicated to bringing out your natural beauty.',
    artistsSubBm: 'Pakar berkemahiran yang berdedikasi untuk menonjolkan kecantikan semula jadi anda.',
    galleryTitleEn: 'Our Work', galleryTitleBm: 'Hasil Kerja Kami',
    gallerySubEn: 'Real results from real clients at Nuay Beauty Studio.',
    gallerySubBm: 'Keputusan sebenar dari pelanggan sebenar di Nuay Beauty Studio.',
    testimonialsTitleEn: 'What Our Clients Say', testimonialsTitleBm: 'Kata-Kata Pelanggan Kami',
    faqTitleEn: 'Common Questions', faqTitleBm: 'Soalan Lazim',
  },
  about: {
    headerSubEn: 'Nuay Beauty was born from a simple belief \u2014 that every woman deserves to feel confident and beautiful without compromising her faith.',
    headerSubBm: 'Nuay Beauty lahir dari kepercayaan yang mudah \u2014 setiap wanita berhak berasa yakin dan cantik tanpa mengorbankan iman.',
    beliefHeadingEn: 'Beauty that honours your faith.',
    beliefHeadingBm: 'Kecantikan yang menghormati agama anda.',
    beliefPara1En: "At Nuay Beauty, we believe that a woman should never have to choose between feeling beautiful and fulfilling her religious obligations. That's why every product, every technique, and every decision at our studio is made with our Muslimah clients at the forefront.",
    beliefPara1Bm: 'Di Nuay Beauty, kami percaya seorang wanita tidak perlu memilih antara berasa cantik dan memenuhi kewajipan agamanya. Itulah sebabnya setiap produk, setiap teknik, dan setiap keputusan di studio kami dibuat dengan mengutamakan pelanggan Muslimah kami.',
    beliefPara2En: 'All products used at Nuay Beauty are water-permeable \u2014 they will not invalidate wudhu. This is not a marketing claim; it is our commitment.',
    beliefPara2Bm: 'Semua produk yang digunakan di Nuay Beauty boleh ditembusi air \u2014 ia tidak akan membatalkan wudhu. Ini bukan tuntutan pemasaran; ia adalah komitmen kami.',
    phoneNumber: '+60 11-5411 4028',
  },
  usp: {
    headingLine1En: 'Beauty without', headingLine1Bm: 'Cantik tanpa',
    headingLine2En: 'compromise.', headingLine2Bm: 'kompromi.',
    subtitleEn: 'Every product we use is water-permeable. You leave our studio looking beautiful \u2014 and ready to pray.',
    subtitleBm: 'Setiap produk kami boleh ditembusi air. Anda keluar dari studio dengan kecantikan \u2014 dan sedia untuk solat.',
    pillar1TitleEn: 'Wudhu-Friendly, Always', pillar1TitleBm: 'Mesra Wudhu, Sentiasa',
    pillar1DescEn: 'Every product \u2014 from lash adhesive to lip treatment \u2014 is water-permeable. No compromise, no exceptions.',
    pillar1DescBm: 'Setiap produk \u2014 dari pelekat lash hingga rawatan bibir \u2014 boleh ditembusi air. Tiada kompromi, tiada pengecualian.',
    pillar2TitleEn: 'Private & Dignified', pillar2TitleBm: 'Peribadi & Bermaruah',
    pillar2DescEn: 'A calm, women-only space designed for your comfort, privacy, and peace of mind.',
    pillar2DescBm: 'Ruang tenang khusus wanita, direka untuk keselesaan, privasi dan ketenangan anda.',
    pillar3TitleEn: 'Certified Korean Technique', pillar3TitleBm: 'Teknik Korean Bersijil',
    pillar3DescEn: 'Our artists are trained in advanced Korean lash and brow methods \u2014 precise, natural, lasting.',
    pillar3DescBm: 'Artist kami terlatih dalam teknik Korean lash dan brow terkini \u2014 tepat, semula jadi, tahan lama.',
  },
  footer: {
    taglineEn: 'Premium beauty, wudhu-friendly.',
    taglineBm: 'Kecantikan premium, mesra wudhu.',
    ctaHeadingEn: 'Book Your Session',
    ctaHeadingBm: 'Tempah Sesi Anda',
    ctaSubEn: 'Ready to feel beautiful?',
    ctaSubBm: 'Bersedia untuk rasa cantik?',
  },
};

// ── getCopy — drop-in replacement for content[lang] ──────────────────────────
export function getCopy(copy: CopyData, lang: 'en' | 'bm') {
  const L = (en: string, bm: string) => lang === 'en' ? en : bm;
  return {
    hero: {
      tagline: L(copy.hero.taglineEn, copy.hero.taglineBm),
      headline: L(copy.hero.headlineEn, copy.hero.headlineBm),
      sub: L(copy.hero.subtitleEn, copy.hero.subtitleBm),
      cta: L(copy.hero.ctaEn, copy.hero.ctaBm),
      ctaSub: L(copy.hero.ctaSubEn, copy.hero.ctaSubBm),
    },
    services: {
      title: L(copy.sections.servicesTitleEn, copy.sections.servicesTitleBm),
      sub: L(copy.sections.servicesSubEn, copy.sections.servicesSubBm),
    },
    artists: {
      title: L(copy.sections.artistsTitleEn, copy.sections.artistsTitleBm),
      sub: L(copy.sections.artistsSubEn, copy.sections.artistsSubBm),
    },
    gallery: {
      title: L(copy.sections.galleryTitleEn, copy.sections.galleryTitleBm),
      sub: L(copy.sections.gallerySubEn, copy.sections.gallerySubBm),
    },
    testimonials: {
      title: L(copy.sections.testimonialsTitleEn, copy.sections.testimonialsTitleBm),
    },
    faq: {
      title: L(copy.sections.faqTitleEn, copy.sections.faqTitleBm),
    },
    about: {
      sub: L(copy.about.headerSubEn, copy.about.headerSubBm),
      beliefHeading: L(copy.about.beliefHeadingEn, copy.about.beliefHeadingBm),
      beliefPara1: L(copy.about.beliefPara1En, copy.about.beliefPara1Bm),
      beliefPara2: L(copy.about.beliefPara2En, copy.about.beliefPara2Bm),
      phone: copy.about.phoneNumber,
    },
    usp: {
      headingLine1: L(copy.usp.headingLine1En, copy.usp.headingLine1Bm),
      headingLine2: L(copy.usp.headingLine2En, copy.usp.headingLine2Bm),
      subtitle: L(copy.usp.subtitleEn, copy.usp.subtitleBm),
      pillar1Title: L(copy.usp.pillar1TitleEn, copy.usp.pillar1TitleBm),
      pillar1Desc: L(copy.usp.pillar1DescEn, copy.usp.pillar1DescBm),
      pillar2Title: L(copy.usp.pillar2TitleEn, copy.usp.pillar2TitleBm),
      pillar2Desc: L(copy.usp.pillar2DescEn, copy.usp.pillar2DescBm),
      pillar3Title: L(copy.usp.pillar3TitleEn, copy.usp.pillar3TitleBm),
      pillar3Desc: L(copy.usp.pillar3DescEn, copy.usp.pillar3DescBm),
    },
    footer: {
      tagline: L(copy.footer.taglineEn, copy.footer.taglineBm),
      ctaHeading: L(copy.footer.ctaHeadingEn, copy.footer.ctaHeadingBm),
      ctaSub: L(copy.footer.ctaSubEn, copy.footer.ctaSubBm),
    },
    nav: {
      home: lang === 'en' ? 'Home' : 'Utama',
      services: lang === 'en' ? 'Services' : 'Servis',
      gallery: lang === 'en' ? 'Gallery' : 'Galeri',
      artists: lang === 'en' ? 'Artists' : 'Artist',
      about: lang === 'en' ? 'About' : 'Tentang Kami',
      contact: lang === 'en' ? 'Contact' : 'Hubungi',
      bookNow: lang === 'en' ? 'Book Now' : 'Tempah Sekarang',
    },
  };
}

// ── Context ───────────────────────────────────────────────────────────────────
export type Testimonial = {
  id: string;
  name: string;
  service: string;
  location?: string;
  rating: number;
  quoteEn: string;
  quoteBm: string;
  published: boolean;
};

export type FaqItem = {
  id: string;
  questionEn: string;
  questionBm: string;
  answerEn: string;
  answerBm: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  titleEn: string;
  titleBm: string;
  bodyEn: string;
  bodyBm: string;
  category: string;
  featuredImage: string;
  published: boolean;
  createdAt: string;
};

export type ServiceItem = {
  id: string;
  category: string;
  nameEn: string;
  nameBm: string;
  descEn: string;
  descBm: string;
  price: number;
  duration: string;
  longevityEn: string;
  longevityBm: string;
  image: string;
  badge: string | null;
  bookingUrl?: string | null;
  featured: boolean;
  published?: boolean;
};

const SERVICE_DEFAULTS = { longevityEn: '', longevityBm: '', image: '', bookingUrl: null, featured: false };
function normalizeServices(items: ServiceItem[]): ServiceItem[] {
  return items.map((s) => ({ ...SERVICE_DEFAULTS, ...s }));
}

export type NavItemSetting = {
  key: string;
  visible: boolean;
  order: number;
};

export const defaultNavItems: NavItemSetting[] = [
  { key: 'home',     visible: true,  order: 0 },
  { key: 'services', visible: true,  order: 1 },
  { key: 'gallery',  visible: true,  order: 2 },
  { key: 'artists',  visible: true,  order: 3 },
  { key: 'about',    visible: true,  order: 4 },
  { key: 'blog',     visible: false, order: 5 },
];

export type SiteData = {
  contact: ContactSettings;
  services: ServiceItem[];
  artists: typeof defaultArtists;
  testimonials: Testimonial[];
  faqs: FaqItem[];
  blogPosts: BlogPost[];
  images: ImageSettings;
  copy: CopyData;
  navItems: NavItemSetting[];
  loading: boolean;
};

const defaultContact: ContactSettings = {
  whatsapp: WHATSAPP_NUMBER,
  bookingUrl: BOOKING_URL,
  instagramUrl: INSTAGRAM_URL,
  facebookUrl: FACEBOOK_URL,
  googleMapsEmbed: GOOGLE_MAPS_EMBED,
  addressEn: '8-1 Jalan Metafasa U16/5, Taman Bukit Subang, Shah Alam, Selangor',
  addressBm: '8-1 Jalan Metafasa U16/5, Taman Bukit Subang, Shah Alam, Selangor',
  hoursEn: 'Mon \u2013 Sat: 10:00am \u2013 6:30pm',
  hoursBm: 'Isnin \u2013 Sabtu: 10:00pg \u2013 6:30mlm',
};

const defaultImages: ImageSettings = {
  hero: 'https://fsyqbpaafdorxrjqkemb.supabase.co/storage/v1/object/public/media/uploads/1782574018884-5sa1j.png',
  featuredService: '/images/nuay-hero.avif',
  aboutPhotos: ['/images/nuay-artist.png', '/images/nuay-studio-3.avif', '/images/nuay-studio-4.avif'],
  studio: [
    '/images/nuay-studio-1.avif',
    '/images/nuay-studio-2.avif',
    '/images/nuay-studio-3.avif',
    '/images/nuay-studio-4.avif',
    '/images/nuay-hero.avif',
  ],
  gallery: [
    { url: '/images/nuay-hero.avif', label: 'Korean Lash Lift', span: 'col-span-2 row-span-2' },
    { url: '/images/nuay-studio-2.avif', label: 'Brow Lamination', span: '' },
    { url: '/images/nuay-studio-3.avif', label: 'Brow Tint', span: '' },
    { url: '/images/nuay-studio-4.avif', label: 'Roma Pink Lips', span: '' },
    { url: '/images/nuay-studio-1.avif', label: 'Studio', span: '' },
    { url: '/images/nuay-studio-2.avif', label: 'Totok Wajah', span: 'col-span-2' },
    { url: '/images/nuay-studio-3.avif', label: 'Brow Bleach', span: '' },
    { url: '/images/nuay-studio-4.avif', label: 'Laser Treatment', span: '' },
    { url: '/images/nuay-studio-1.avif', label: 'Lash Lift', span: '' },
    { url: '/images/nuay-studio-2.avif', label: 'Studio Interior', span: '' },
    { url: '/images/nuay-hero.avif', label: 'Brow Wax', span: 'col-span-2' },
  ],
};

const normalizedDefaultServices = normalizeServices(defaultServices as ServiceItem[]);

const initialData: SiteData = {
  contact: defaultContact,
  services: normalizedDefaultServices,
  artists: defaultArtists,
  testimonials: [],
  faqs: [],
  blogPosts: [],
  images: defaultImages,
  copy: defaultCopy,
  navItems: defaultNavItems,
  loading: true,
};

function mapSettings(settings: Record<string, unknown>): SiteData {
  return {
    contact: (settings.contact as ContactSettings) ?? defaultContact,
    services: normalizeServices((settings.services as ServiceItem[]) ?? normalizedDefaultServices),
    artists: (settings.artists as typeof defaultArtists) ?? defaultArtists,
    testimonials: (settings.testimonials as Testimonial[]) ?? [],
    faqs: (settings.faqs as FaqItem[]) ?? [],
    blogPosts: (settings.blog_posts as BlogPost[]) ?? [],
    images: settings.images ? { ...defaultImages, ...(settings.images as Partial<ImageSettings>) } : defaultImages,
    navItems: (settings.nav_items as NavItemSetting[]) ?? defaultNavItems,
    copy: (() => {
      const s = settings.copy as Partial<CopyData> | undefined;
      if (!s) return defaultCopy;
      return {
        hero: { ...defaultCopy.hero, ...s.hero },
        sections: { ...defaultCopy.sections, ...s.sections },
        about: { ...defaultCopy.about, ...s.about },
        usp: { ...defaultCopy.usp, ...s.usp },
        footer: { ...defaultCopy.footer, ...s.footer },
      };
    })(),
    loading: false,
  };
}

const SiteDataContext = createContext<SiteData>(initialData);

export function SiteDataProvider({ children, prefetchedSettings }: { children: ReactNode; prefetchedSettings?: Record<string, unknown> }) {
  const [data, setData] = useState<SiteData>(
    prefetchedSettings ? mapSettings(prefetchedSettings) : initialData
  );

  useEffect(() => {
    if (prefetchedSettings) return;
    fetch('/api/settings')
      .then((r) => r.json())
      .then((settings) => setData(mapSettings(settings)))
      .catch(() => setData((prev) => ({ ...prev, loading: false })));
  }, [prefetchedSettings]);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
