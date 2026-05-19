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
  hero: 'https://picsum.photos/seed/nuay-hero-studio/1600/900',
  studio: [
    'https://picsum.photos/seed/nuay-studio-1/600/800',
    'https://picsum.photos/seed/nuay-studio-2/600/450',
    'https://picsum.photos/seed/nuay-studio-3/600/450',
    'https://picsum.photos/seed/nuay-studio-4/600/450',
    'https://picsum.photos/seed/nuay-studio-5/600/450',
  ],
  gallery: [
    { url: 'https://picsum.photos/seed/nuay-g1/600/600', label: 'Korean Lash Lift', span: 'col-span-2 row-span-2' },
    { url: 'https://picsum.photos/seed/nuay-g2/600/600', label: 'Brow Lamination', span: '' },
    { url: 'https://picsum.photos/seed/nuay-g3/600/600', label: 'Brow Tint', span: '' },
    { url: 'https://picsum.photos/seed/nuay-g4/600/600', label: 'Roma Pink Lips', span: '' },
    { url: 'https://picsum.photos/seed/nuay-g5/600/600', label: 'Studio', span: 'col-span-2' },
    { url: 'https://picsum.photos/seed/nuay-g6/600/600', label: 'Totok Wajah', span: '' },
    { url: 'https://picsum.photos/seed/nuay-g7/600/600', label: 'Brow Bleach', span: '' },
    { url: 'https://picsum.photos/seed/nuay-g8/600/600', label: 'Laser Treatment', span: '' },
    { url: 'https://picsum.photos/seed/nuay-g9/600/600', label: 'Brow Wax', span: 'col-span-2' },
    { url: 'https://picsum.photos/seed/nuay-g10/600/600', label: 'Lash Lift', span: '' },
    { url: 'https://picsum.photos/seed/nuay-g11/600/600', label: 'Studio Interior', span: '' },
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
