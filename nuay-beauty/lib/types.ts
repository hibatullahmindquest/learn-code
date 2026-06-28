// Shared admin/content types — moved out of app/admin/page.tsx so the
// generic List+Detail components and tab files can import them without
// circular deps.

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export type ArtistTier = 'senior' | 'junior';

export type Artist = {
  id: string;
  name: string;
  tier: ArtistTier;
  bioEn: string;
  bioBm: string;
  services: string[];
  image: string;
  instagram: string | null;
  gallery: string[];
  published: boolean;
};

export const ARTIST_DEFAULTS = { published: true, tier: 'senior' as ArtistTier };

export type Service = {
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
  bookingUrl: string | null;
  featured: boolean;
  published: boolean;
};

export const SERVICE_DEFAULTS = { longevityEn: '', longevityBm: '', image: '', bookingUrl: null, featured: false };

export type FaqItem = {
  id: string;
  questionEn: string;
  questionBm: string;
  answerEn: string;
  answerBm: string;
};

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

export type GalleryImage = { url: string; label: string; span: string };

export type ImageData = {
  hero: string;
  featuredService: string;
  studio: string[];
  gallery: GalleryImage[];
  aboutPhotos: [string, string, string];
  beforeAfter: { before: string; after: string };
  whyNuay: string;
};

export const IMAGE_DEFAULTS: ImageData = { hero: '', featuredService: '', studio: ['', '', '', '', ''], gallery: [], aboutPhotos: ['', '', ''], beforeAfter: { before: '', after: '' }, whyNuay: '' };

export type FontFamily = 'default' | 'montserrat' | 'urbanist';

export const FONT_OPTIONS: { value: FontFamily; label: string }[] = [
  { value: 'default', label: 'Default (Poppins)' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'urbanist', label: 'Urbanist' },
];
