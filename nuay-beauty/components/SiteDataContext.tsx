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

export type ImageSettings = {
  hero: string;
  studio: string[];
  gallery: Array<{ url: string; label: string; span: string }>;
};

export type SiteData = {
  contact: ContactSettings;
  services: typeof defaultServices;
  artists: typeof defaultArtists;
  testimonials: typeof defaultTestimonials;
  images: ImageSettings;
  loading: boolean;
};

const defaultContact: ContactSettings = {
  whatsapp: WHATSAPP_NUMBER,
  bookingUrl: BOOKING_URL,
  instagramUrl: INSTAGRAM_URL,
  facebookUrl: FACEBOOK_URL,
  googleMapsEmbed: GOOGLE_MAPS_EMBED,
  addressEn: 'Shah Alam, Selangor',
  addressBm: 'Shah Alam, Selangor',
  hoursEn: 'Mon – Sat: 10am – 7pm',
  hoursBm: 'Isnin – Sabtu: 10pg – 7mlm',
};

const defaultImages: ImageSettings = {
  hero: '/images/nuay-hero.avif',
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
    { url: '/images/nuay-studio-1.avif', label: 'Studio', span: 'col-span-2' },
    { url: '/images/nuay-studio-2.avif', label: 'Totok Wajah', span: '' },
    { url: '/images/nuay-studio-3.avif', label: 'Brow Bleach', span: '' },
    { url: '/images/nuay-studio-4.avif', label: 'Laser Treatment', span: '' },
    { url: '/images/nuay-hero.avif', label: 'Brow Wax', span: 'col-span-2' },
    { url: '/images/nuay-studio-1.avif', label: 'Lash Lift', span: '' },
    { url: '/images/nuay-studio-2.avif', label: 'Studio Interior', span: '' },
  ],
};

const initialData: SiteData = {
  contact: defaultContact,
  services: defaultServices,
  artists: defaultArtists,
  testimonials: defaultTestimonials,
  images: defaultImages,
  loading: true,
};

const SiteDataContext = createContext<SiteData>(initialData);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(initialData);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((settings) => {
        setData({
          contact: settings.contact ?? defaultContact,
          services: settings.services ?? defaultServices,
          artists: settings.artists ?? defaultArtists,
          testimonials: settings.testimonials ?? defaultTestimonials,
          images: settings.images ?? defaultImages,
          loading: false,
        });
      })
      .catch(() => {
        setData((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
