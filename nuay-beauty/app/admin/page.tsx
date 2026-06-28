'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

import { defaultCopy, defaultNavItems, type CopyData, type NavItemSetting } from '@/components/SiteDataContext';
import { MediaPicker } from '@/components/MediaPicker';
import { MediaLibraryTab } from '@/components/MediaLibraryTab';
import { type Artist, type Service, type FaqItem, type Testimonial, type ImageData, type FontFamily, ARTIST_DEFAULTS, SERVICE_DEFAULTS, IMAGE_DEFAULTS, FONT_OPTIONS } from '@/lib/types';
import { FaqTab } from './tabs/FaqTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { ServicesTab } from './tabs/ServicesTab';
import { ArtistsTab } from './tabs/ArtistsTab';
import { GalleryTab } from './tabs/GalleryTab';

type Tab = 'dashboard' | 'contact' | 'artists' | 'services' | 'gallery' | 'media' | 'faq' | 'testimonials' | 'content' | 'blog' | 'nav' | 'settings';
type ContentSubTab = 'homepage' | 'about' | 'footer';

type ContactData = {
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

type BlogPost = {
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

// ── Style tokens ────────────────────────────────────────────────────────────
const INPUT = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300';
const LABEL = 'block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide';
const SECTION = 'bg-white rounded-xl border border-gray-100 p-6 shadow-sm';
const BTN_SAVE = 'px-5 py-2 rounded-lg text-sm font-medium bg-rose-700 text-white hover:bg-rose-800 active:scale-95 transition-all disabled:opacity-50';
const BTN_SEC = 'px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all';
const BTN_DANGER = 'px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all';
const BTN_ADD = 'px-4 py-2 rounded-lg text-sm font-medium border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-all w-full mt-2';

function uid() { return Math.random().toString(36).slice(2, 9); }

const KEY_TO_TAB: Record<string, string> = {
  contact: 'contact', artists: 'artists', services: 'services',
  images: 'gallery', faqs: 'faq', testimonials: 'testimonials',
  copy: 'content', blog_posts: 'blog', nav_items: 'nav', font_family: 'settings',
};

function StatusBadge({ status }: { status: 'idle' | 'saving' | 'saved' | 'error' }) {
  if (status === 'idle') return null;
  const map = { saving: 'bg-yellow-100 text-yellow-700', saved: 'bg-green-100 text-green-700', error: 'bg-red-100 text-red-700' };
  const label = { saving: 'Saving…', saved: 'Saved!', error: 'Error saving' };
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${map[status]}`}>{label[status]}</span>;
}

// ── Sidebar nav config ───────────────────────────────────────────────────────
const NAV: { key: Tab; label: string; icon: React.ReactNode }[] = [
  {
    key: 'dashboard', label: 'Dashboard',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    key: 'contact', label: 'Contact & URLs',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.59 5.59l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  },
  {
    key: 'artists', label: 'Artists',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    key: 'services', label: 'Services',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    key: 'gallery', label: 'Gallery',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>,
  },
  {
    key: 'media', label: 'Media Library',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>,
  },
  {
    key: 'faq', label: 'FAQ',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round"/></svg>,
  },
  {
    key: 'testimonials', label: 'Testimonials',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    key: 'content', label: 'Content / Copy',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  },
  {
    key: 'blog', label: 'Blog',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  },
  {
    key: 'nav', label: 'Navigation',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  },
  {
    key: 'settings', label: 'Settings',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  },
];

const PAGE_TITLES: Record<Tab, string> = {
  dashboard: 'Dashboard',
  contact: 'Contact & URLs',
  artists: 'Artists',
  services: 'Services',
  gallery: 'Gallery',
  media: 'Media Library',
  faq: 'FAQ',
  testimonials: 'Testimonials',
  content: 'Content / Copy',
  blog: 'Blog',
  nav: 'Navigation',
  settings: 'Settings',
};

// ── Main component ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');

  const [contact, setContact] = useState<ContactData>({
    whatsapp: '', bookingUrl: '', instagramUrl: '', facebookUrl: '',
    googleMapsEmbed: '', addressEn: '', addressBm: '', hoursEn: '', hoursBm: '',
  });
  const [artists, setArtists] = useState<Artist[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [images, setImages] = useState<ImageData>(IMAGE_DEFAULTS);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [copy, setCopy] = useState<CopyData>(defaultCopy);
  const [contentSubTab, setContentSubTab] = useState<ContentSubTab>('homepage');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogEditIdx, setBlogEditIdx] = useState<number | null>(null);
  const [navItems, setNavItems] = useState<NavItemSetting[]>(defaultNavItems);
  const [fontFamily, setFontFamily] = useState<FontFamily>('default');

  const [statuses, setStatuses] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({});
  const [dirtyTabs, setDirtyTabs] = useState<Set<string>>(new Set());
  const [loadCount, setLoadCount] = useState(0);

  const clearDirty = (saveKey: string) => { const t = KEY_TO_TAB[saveKey] ?? saveKey; setDirtyTabs((prev) => { const n = new Set(prev); n.delete(t); return n; }); };

  useEffect(() => {
    const saved = sessionStorage.getItem('nuay_admin_pw');
    if (saved) { setPassword(saved); setAuthed(true); }
  }, []);

  const loadSettings = useCallback(async () => {
    const res = await fetch('/api/settings');
    const data = await res.json();
    if (data.contact) setContact(data.contact);
    const resolvedServices = data.services ? (data.services as Service[]).map((s) => ({ ...SERVICE_DEFAULTS, ...s })) : services;
    if (data.services) setServices(resolvedServices);
    if (data.artists) {
      setArtists((data.artists as Artist[]).map((a) => {
        const artist = { ...ARTIST_DEFAULTS, ...a };
        artist.services = (a.services ?? [])
          .map((entry) => {
            if (resolvedServices.some((s) => s.id === entry)) return entry;
            const byName = resolvedServices.find((s) => s.nameEn === entry);
            return byName ? byName.id : null;
          })
          .filter((id): id is string => id !== null);
        return artist;
      }));
    }
    if (data.images) setImages({ ...IMAGE_DEFAULTS, ...data.images });
    if (data.faqs) setFaqs(data.faqs);
    if (data.testimonials) setTestimonials(data.testimonials);
    if (data.copy) setCopy({ ...defaultCopy, ...data.copy });
    if (data.blog_posts) setBlogPosts(data.blog_posts);
    if (data.nav_items) setNavItems(data.nav_items);
    if (data.font_family) setFontFamily(data.font_family);
    setLoadCount((c) => c + 1);
  }, []);

  useEffect(() => { if (authed) loadSettings(); }, [authed, loadSettings]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ key: '_ping', value: true }),
    });
    if (res.status === 401) { setAuthError('Password salah. Cuba lagi.'); return; }
    sessionStorage.setItem('nuay_admin_pw', password);
    setAuthed(true);
    setAuthError('');
  }

  async function save(key: string, value: unknown) {
    setStatuses((s) => ({ ...s, [key]: 'saving' }));
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ key, value }),
    });
    setStatuses((s) => ({ ...s, [key]: res.ok ? 'saved' : 'error' }));
    if (res.ok) clearDirty(key);
    setTimeout(() => setStatuses((s) => ({ ...s, [key]: 'idle' })), 3000);
  }

  function logout() {
    if (dirtyTabs.size > 0 && !window.confirm('Ada perubahan yang belum disimpan. Log keluar akan hilangkan semua perubahan. Teruskan?')) return;
    sessionStorage.removeItem('nuay_admin_pw');
    setAuthed(false);
    setPassword('');
  }

  // Per-tab dirty tracking
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'contact'])); }, [contact]);
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'artists'])); }, [artists]);
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'services'])); }, [services]);
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'gallery'])); }, [images]);
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'faq'])); }, [faqs]);
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'testimonials'])); }, [testimonials]);
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'content'])); }, [copy]);
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'blog'])); }, [blogPosts]);
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'nav'])); }, [navItems]);
  useEffect(() => { setDirtyTabs((p) => new Set([...p, 'settings'])); }, [fontFamily]);
  // Runs AFTER all dirty effects above (React fires effects in definition order).
  // When loadCount increments (batched with all setX calls in loadSettings), this
  // clears the set — overriding any dirty marks from the same render cycle.
  useEffect(() => { if (loadCount > 0) setDirtyTabs(new Set()); }, [loadCount]);

  // Warn on browser close/refresh when any tab is dirty
  useEffect(() => {
    if (dirtyTabs.size === 0) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirtyTabs]);

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#faf7f4', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <Image src="/logo/logo-dark.png" alt="Nuay Beauty" width={140} height={81} className="h-10 w-auto mx-auto" />
            <p className="text-xs tracking-[0.3em] text-gray-400 mt-2">ADMIN PANEL</p>
          </div>
          <form onSubmit={login} className="flex flex-col gap-4">
            <div>
              <label className={LABEL}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className={INPUT} placeholder="Masukkan password admin" required />
              {authError && <p className="text-xs text-red-500 mt-1">{authError}</p>}
            </div>
            <button type="submit" className={BTN_SAVE + ' w-full py-3'}>Log Masuk</button>
          </form>
        </div>
      </div>
    );
  }

  // ── Authed layout ───────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 flex flex-col z-20" style={{ width: 240, background: '#1C1C1C' }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: '#8B2252' }}>NB</div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">Nuay Beauty</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {NAV.map((item) => {
            const active = tab === item.key;
            const dirty = dirtyTabs.has(item.key);
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-left text-sm transition-all"
                style={{
                  color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                  background: active ? 'rgba(201,169,110,0.12)' : 'transparent',
                  borderRight: active ? '3px solid #C9A96E' : '3px solid transparent',
                }}
              >
                <span style={{ color: active ? '#C9A96E' : 'rgba(255,255,255,0.4)' }}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {dirty && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#facc15' }} />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button onClick={logout} className="text-xs w-full text-left transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
            Log Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: 240, background: '#faf7f4' }}>
        {/* Topbar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <p className="font-semibold text-gray-800">{PAGE_TITLES[tab]}</p>
            <p className="text-xs text-gray-400">Kemaskini kandungan website</p>
          </div>
          <a href="/" target="_blank" rel="noopener" className={BTN_SEC + ' text-xs'}>Lihat Website ↗</a>
        </div>

        {/* Page content */}
        <div className="max-w-4xl mx-auto w-full px-8 py-8">

          {/* ── DASHBOARD ─────────────────────────────────────────────────── */}
          {tab === 'dashboard' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Artists', value: artists.length, color: '#8B2252' },
                  { label: 'Services', value: services.length, color: '#C9A96E' },
                  { label: 'Gallery Photos', value: images.gallery.length, color: '#1C1C1C' },
                  { label: 'FAQ Items', value: faqs.length, color: '#6b7280' },
                ].map((s) => (
                  <div key={s.label} className={SECTION}>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{s.label}</p>
                    <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className={SECTION}>
                <h2 className="font-semibold text-gray-800 mb-4">Quick Links</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {NAV.filter((n) => n.key !== 'dashboard').map((n) => (
                    <button key={n.key} onClick={() => setTab(n.key)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-100 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all text-left">
                      <span className="text-gray-400">{n.icon}</span>
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className={SECTION}>
                <h2 className="font-semibold text-gray-800 mb-1">Testimonials</h2>
                <p className="text-sm text-gray-500">
                  {testimonials.filter((t) => t.published).length} published &nbsp;·&nbsp;{' '}
                  {testimonials.filter((t) => !t.published).length} pending
                </p>
              </div>
            </div>
          )}

          {/* ── CONTACT ───────────────────────────────────────────────────── */}
          {tab === 'contact' && (
            <div className="flex flex-col gap-6">
              <div className={SECTION}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-gray-800">Nombor & URL</h2>
                  <StatusBadge status={statuses['contact'] ?? 'idle'} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Nombor WhatsApp</label>
                    <input className={INPUT} value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} placeholder="601XXXXXXXX" />
                    <p className="text-xs text-gray-400 mt-1">Format: 601XXXXXXXX (tanpa +)</p>
                  </div>
                  <div>
                    <label className={LABEL}>Booking URL</label>
                    <input className={INPUT} value={contact.bookingUrl} onChange={(e) => setContact({ ...contact, bookingUrl: e.target.value })} placeholder="https://..." />
                  </div>
                  <div>
                    <label className={LABEL}>Instagram URL</label>
                    <input className={INPUT} value={contact.instagramUrl} onChange={(e) => setContact({ ...contact, instagramUrl: e.target.value })} placeholder="https://instagram.com/..." />
                  </div>
                  <div>
                    <label className={LABEL}>Facebook URL</label>
                    <input className={INPUT} value={contact.facebookUrl} onChange={(e) => setContact({ ...contact, facebookUrl: e.target.value })} placeholder="https://facebook.com/..." />
                  </div>
                </div>
              </div>
              <div className={SECTION}>
                <h2 className="font-semibold text-gray-800 mb-5">Alamat & Waktu Operasi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Alamat (English)</label>
                    <input className={INPUT} value={contact.addressEn} onChange={(e) => setContact({ ...contact, addressEn: e.target.value })} />
                  </div>
                  <div>
                    <label className={LABEL}>Alamat (BM)</label>
                    <input className={INPUT} value={contact.addressBm} onChange={(e) => setContact({ ...contact, addressBm: e.target.value })} />
                  </div>
                  <div>
                    <label className={LABEL}>Waktu Operasi (English)</label>
                    <input className={INPUT} value={contact.hoursEn} onChange={(e) => setContact({ ...contact, hoursEn: e.target.value })} placeholder="Mon – Sat: 10am – 7pm" />
                  </div>
                  <div>
                    <label className={LABEL}>Waktu Operasi (BM)</label>
                    <input className={INPUT} value={contact.hoursBm} onChange={(e) => setContact({ ...contact, hoursBm: e.target.value })} placeholder="Isnin – Sabtu: 10pg – 7mlm" />
                  </div>
                </div>
              </div>
              <div className={SECTION}>
                <h2 className="font-semibold text-gray-800 mb-4">Google Maps Embed URL</h2>
                <label className={LABEL}>Embed URL (dari Google Maps → Share → Embed)</label>
                <textarea
                  className={INPUT + ' h-24 resize-none'}
                  value={contact.googleMapsEmbed}
                  onChange={(e) => setContact({ ...contact, googleMapsEmbed: e.target.value })}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
              </div>
              <button onClick={() => save('contact', contact)} className={BTN_SAVE}>Simpan Semua Maklumat Hubungan</button>
            </div>
          )}

          {/* ── ARTISTS ───────────────────────────────────────────────────── */}
          {tab === 'artists' && (
            <ArtistsTab artists={artists} setArtists={setArtists} services={services} save={save} status={statuses['artists'] ?? 'idle'} password={password} />
          )}

          {/* ── SERVICES ──────────────────────────────────────────────────── */}
          {tab === 'services' && (
            <ServicesTab services={services} setServices={setServices} save={save} status={statuses['services'] ?? 'idle'} password={password} />
          )}

          {/* ── GALLERY ───────────────────────────────────────────────────── */}
          {tab === 'gallery' && (
            <GalleryTab images={images} setImages={setImages} save={save} status={statuses['images'] ?? 'idle'} password={password} />
          )}

          {/* ── MEDIA LIBRARY ─────────────────────────────────────────────── */}
          {tab === 'media' && <MediaLibraryTab password={password} />}

          {/* ── FAQ ───────────────────────────────────────────────────────── */}
          {tab === 'faq' && (
            <FaqTab faqs={faqs} setFaqs={setFaqs} save={save} status={statuses['faqs'] ?? 'idle'} />
          )}

          {/* ── CONTENT / COPY ────────────────────────────────────────────── */}
          {tab === 'content' && (
            <div className="flex flex-col gap-6">
              {/* Sub-tabs */}
              <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 w-fit shadow-sm">
                {(['homepage', 'about', 'footer'] as ContentSubTab[]).map((st) => (
                  <button key={st} onClick={() => setContentSubTab(st)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${contentSubTab === st ? 'bg-rose-700 text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                    {st === 'homepage' ? 'Homepage' : st === 'about' ? 'About Page' : 'Footer'}
                  </button>
                ))}
              </div>

              {/* ── Homepage copy ── */}
              {contentSubTab === 'homepage' && (
                <div className="flex flex-col gap-6">
                  <div className={SECTION}>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-semibold text-gray-800">Hero Section</h2>
                      <StatusBadge status={statuses['copy'] ?? 'idle'} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={LABEL}>Tagline (English)</label><input className={INPUT} value={copy.hero.taglineEn} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, taglineEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Tagline (BM)</label><input className={INPUT} value={copy.hero.taglineBm} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, taglineBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Headline (English)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.hero.headlineEn} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, headlineEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Headline (BM)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.hero.headlineBm} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, headlineBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Subtitle (English)</label><textarea className={INPUT + ' h-20 resize-none'} value={copy.hero.subtitleEn} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, subtitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Subtitle (BM)</label><textarea className={INPUT + ' h-20 resize-none'} value={copy.hero.subtitleBm} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, subtitleBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>CTA Button (English)</label><input className={INPUT} value={copy.hero.ctaEn} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, ctaEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>CTA Button (BM)</label><input className={INPUT} value={copy.hero.ctaBm} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, ctaBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Secondary CTA (English)</label><input className={INPUT} value={copy.hero.ctaSubEn} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, ctaSubEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Secondary CTA (BM)</label><input className={INPUT} value={copy.hero.ctaSubBm} onChange={(e) => setCopy({ ...copy, hero: { ...copy.hero, ctaSubBm: e.target.value } })} /></div>
                    </div>
                  </div>

                  <div className={SECTION}>
                    <h2 className="font-semibold text-gray-800 mb-5">Section Headings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={LABEL}>Services Title (EN)</label><input className={INPUT} value={copy.sections.servicesTitleEn} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, servicesTitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Services Title (BM)</label><input className={INPUT} value={copy.sections.servicesTitleBm} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, servicesTitleBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Services Subtitle (EN)</label><input className={INPUT} value={copy.sections.servicesSubEn} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, servicesSubEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Services Subtitle (BM)</label><input className={INPUT} value={copy.sections.servicesSubBm} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, servicesSubBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Artists Title (EN)</label><input className={INPUT} value={copy.sections.artistsTitleEn} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, artistsTitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Artists Title (BM)</label><input className={INPUT} value={copy.sections.artistsTitleBm} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, artistsTitleBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Artists Subtitle (EN)</label><input className={INPUT} value={copy.sections.artistsSubEn} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, artistsSubEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Artists Subtitle (BM)</label><input className={INPUT} value={copy.sections.artistsSubBm} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, artistsSubBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Gallery Title (EN)</label><input className={INPUT} value={copy.sections.galleryTitleEn} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, galleryTitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Gallery Title (BM)</label><input className={INPUT} value={copy.sections.galleryTitleBm} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, galleryTitleBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Gallery Subtitle (EN)</label><input className={INPUT} value={copy.sections.gallerySubEn} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, gallerySubEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Gallery Subtitle (BM)</label><input className={INPUT} value={copy.sections.gallerySubBm} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, gallerySubBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Testimonials Title (EN)</label><input className={INPUT} value={copy.sections.testimonialsTitleEn} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, testimonialsTitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Testimonials Title (BM)</label><input className={INPUT} value={copy.sections.testimonialsTitleBm} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, testimonialsTitleBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>FAQ Title (EN)</label><input className={INPUT} value={copy.sections.faqTitleEn} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, faqTitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>FAQ Title (BM)</label><input className={INPUT} value={copy.sections.faqTitleBm} onChange={(e) => setCopy({ ...copy, sections: { ...copy.sections, faqTitleBm: e.target.value } })} /></div>
                    </div>
                  </div>
                  <div className={SECTION}>
                    <h2 className="font-semibold text-gray-800 mb-5">Our Promise Section</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={LABEL}>Heading Line 1 (EN)</label><input className={INPUT} value={copy.usp.headingLine1En} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, headingLine1En: e.target.value } })} /></div>
                      <div><label className={LABEL}>Heading Line 1 (BM)</label><input className={INPUT} value={copy.usp.headingLine1Bm} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, headingLine1Bm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Heading Line 2 — italic (EN)</label><input className={INPUT} value={copy.usp.headingLine2En} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, headingLine2En: e.target.value } })} /></div>
                      <div><label className={LABEL}>Heading Line 2 — italic (BM)</label><input className={INPUT} value={copy.usp.headingLine2Bm} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, headingLine2Bm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Subtitle (EN)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.usp.subtitleEn} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, subtitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Subtitle (BM)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.usp.subtitleBm} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, subtitleBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 1 Title (EN)</label><input className={INPUT} value={copy.usp.pillar1TitleEn} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar1TitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 1 Title (BM)</label><input className={INPUT} value={copy.usp.pillar1TitleBm} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar1TitleBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 1 Description (EN)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.usp.pillar1DescEn} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar1DescEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 1 Description (BM)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.usp.pillar1DescBm} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar1DescBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 2 Title (EN)</label><input className={INPUT} value={copy.usp.pillar2TitleEn} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar2TitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 2 Title (BM)</label><input className={INPUT} value={copy.usp.pillar2TitleBm} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar2TitleBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 2 Description (EN)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.usp.pillar2DescEn} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar2DescEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 2 Description (BM)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.usp.pillar2DescBm} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar2DescBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 3 Title (EN)</label><input className={INPUT} value={copy.usp.pillar3TitleEn} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar3TitleEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 3 Title (BM)</label><input className={INPUT} value={copy.usp.pillar3TitleBm} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar3TitleBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 3 Description (EN)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.usp.pillar3DescEn} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar3DescEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Pillar 3 Description (BM)</label><textarea className={INPUT + ' h-16 resize-none'} value={copy.usp.pillar3DescBm} onChange={(e) => setCopy({ ...copy, usp: { ...copy.usp, pillar3DescBm: e.target.value } })} /></div>
                    </div>
                  </div>
                  <button onClick={() => save('copy', copy)} className={BTN_SAVE}>Simpan Homepage Copy</button>
                </div>
              )}

              {/* ── About page copy ── */}
              {contentSubTab === 'about' && (
                <div className="flex flex-col gap-6">
                  <div className={SECTION}>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-semibold text-gray-800">Page Header</h2>
                      <StatusBadge status={statuses['copy'] ?? 'idle'} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={LABEL}>Header Subtitle (EN)</label><textarea className={INPUT + ' h-20 resize-none'} value={copy.about.headerSubEn} onChange={(e) => setCopy({ ...copy, about: { ...copy.about, headerSubEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Header Subtitle (BM)</label><textarea className={INPUT + ' h-20 resize-none'} value={copy.about.headerSubBm} onChange={(e) => setCopy({ ...copy, about: { ...copy.about, headerSubBm: e.target.value } })} /></div>
                    </div>
                  </div>
                  <div className={SECTION}>
                    <h2 className="font-semibold text-gray-800 mb-5">Our Belief Section</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={LABEL}>Heading (EN)</label><input className={INPUT} value={copy.about.beliefHeadingEn} onChange={(e) => setCopy({ ...copy, about: { ...copy.about, beliefHeadingEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Heading (BM)</label><input className={INPUT} value={copy.about.beliefHeadingBm} onChange={(e) => setCopy({ ...copy, about: { ...copy.about, beliefHeadingBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Paragraph 1 (EN)</label><textarea className={INPUT + ' h-28 resize-none'} value={copy.about.beliefPara1En} onChange={(e) => setCopy({ ...copy, about: { ...copy.about, beliefPara1En: e.target.value } })} /></div>
                      <div><label className={LABEL}>Paragraph 1 (BM)</label><textarea className={INPUT + ' h-28 resize-none'} value={copy.about.beliefPara1Bm} onChange={(e) => setCopy({ ...copy, about: { ...copy.about, beliefPara1Bm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Paragraph 2 (EN)</label><textarea className={INPUT + ' h-24 resize-none'} value={copy.about.beliefPara2En} onChange={(e) => setCopy({ ...copy, about: { ...copy.about, beliefPara2En: e.target.value } })} /></div>
                      <div><label className={LABEL}>Paragraph 2 (BM)</label><textarea className={INPUT + ' h-24 resize-none'} value={copy.about.beliefPara2Bm} onChange={(e) => setCopy({ ...copy, about: { ...copy.about, beliefPara2Bm: e.target.value } })} /></div>
                      <div><label className={LABEL}>Phone Number</label><input className={INPUT} value={copy.about.phoneNumber} onChange={(e) => setCopy({ ...copy, about: { ...copy.about, phoneNumber: e.target.value } })} placeholder="+60 11-XXXX XXXX" /></div>
                    </div>
                  </div>
                  <button onClick={() => save('copy', copy)} className={BTN_SAVE}>Simpan About Page Copy</button>
                </div>
              )}

              {/* ── Footer copy ── */}
              {contentSubTab === 'footer' && (
                <div className="flex flex-col gap-6">
                  <div className={SECTION}>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-semibold text-gray-800">Footer Text</h2>
                      <StatusBadge status={statuses['copy'] ?? 'idle'} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={LABEL}>Tagline (EN)</label><input className={INPUT} value={copy.footer.taglineEn} onChange={(e) => setCopy({ ...copy, footer: { ...copy.footer, taglineEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>Tagline (BM)</label><input className={INPUT} value={copy.footer.taglineBm} onChange={(e) => setCopy({ ...copy, footer: { ...copy.footer, taglineBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>CTA Heading (EN)</label><input className={INPUT} value={copy.footer.ctaHeadingEn} onChange={(e) => setCopy({ ...copy, footer: { ...copy.footer, ctaHeadingEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>CTA Heading (BM)</label><input className={INPUT} value={copy.footer.ctaHeadingBm} onChange={(e) => setCopy({ ...copy, footer: { ...copy.footer, ctaHeadingBm: e.target.value } })} /></div>
                      <div><label className={LABEL}>CTA Subtitle (EN)</label><input className={INPUT} value={copy.footer.ctaSubEn} onChange={(e) => setCopy({ ...copy, footer: { ...copy.footer, ctaSubEn: e.target.value } })} /></div>
                      <div><label className={LABEL}>CTA Subtitle (BM)</label><input className={INPUT} value={copy.footer.ctaSubBm} onChange={(e) => setCopy({ ...copy, footer: { ...copy.footer, ctaSubBm: e.target.value } })} /></div>
                    </div>
                  </div>
                  <button onClick={() => save('copy', copy)} className={BTN_SAVE}>Simpan Footer Copy</button>
                </div>
              )}
            </div>
          )}

          {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
          {tab === 'testimonials' && (
            <TestimonialsTab
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              save={save}
              status={statuses['testimonials'] ?? 'idle'}
            />
          )}

          {/* ── BLOG ──────────────────────────────────────────────────────── */}
          {tab === 'blog' && (
            <div className="flex flex-col gap-6">
              {/* List view */}
              {blogEditIdx === null ? (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {blogPosts.filter((p) => p.published).length} published &nbsp;·&nbsp;
                      {blogPosts.filter((p) => !p.published).length} draft
                    </p>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={statuses['blog_posts'] ?? 'idle'} />
                      <button
                        className={BTN_SAVE}
                        onClick={() => {
                          const newPost: BlogPost = { id: uid(), slug: '', titleEn: '', titleBm: '', bodyEn: '', bodyBm: '', category: '', featuredImage: '', published: false, createdAt: new Date().toISOString() };
                          const updated = [...blogPosts, newPost];
                          setBlogPosts(updated);
                          setBlogEditIdx(updated.length - 1);
                        }}
                      >
                        + Post Baru
                      </button>
                    </div>
                  </div>
                  {blogPosts.length === 0 ? (
                    <div className={SECTION + ' text-center py-12'}>
                      <p className="text-gray-400 text-sm mb-4">Tiada post lagi.</p>
                      <button className={BTN_SAVE} onClick={() => {
                        const newPost: BlogPost = { id: uid(), slug: '', titleEn: '', titleBm: '', bodyEn: '', bodyBm: '', category: '', featuredImage: '', published: false, createdAt: new Date().toISOString() };
                        setBlogPosts([newPost]);
                        setBlogEditIdx(0);
                      }}>Cipta Post Pertama</button>
                    </div>
                  ) : (
                    <div className={SECTION + ' p-0 overflow-hidden'}>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Tajuk</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Kategori</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                            <th className="px-4 py-3" />
                          </tr>
                        </thead>
                        <tbody>
                          {blogPosts.map((post, i) => (
                            <tr key={post.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                              <td className="px-5 py-3.5">
                                <p className="font-medium text-gray-800">{post.titleEn || '(Tanpa Tajuk)'}</p>
                                {post.slug && <p className="text-xs text-gray-400 mt-0.5">/{post.slug}</p>}
                              </td>
                              <td className="px-4 py-3.5 text-gray-500">{post.category || '—'}</td>
                              <td className="px-4 py-3.5">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                  {post.published ? 'Published' : 'Draft'}
                                </span>
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="flex items-center justify-end gap-2">
                                  <button className={BTN_SEC + ' text-xs px-3 py-1.5'} onClick={() => setBlogEditIdx(i)}>Edit</button>
                                  <button className={BTN_DANGER} onClick={() => { if (window.confirm('Padam blog post ini? Tindakan ini tidak boleh dibatalkan.')) { const u = blogPosts.filter((_, idx) => idx !== i); setBlogPosts(u); save('blog_posts', u); } }}>Padam</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              ) : (
                /* Edit form */
                (() => {
                  const post = blogPosts[blogEditIdx];
                  const update = (fields: Partial<BlogPost>) => {
                    const u = [...blogPosts];
                    u[blogEditIdx] = { ...post, ...fields };
                    setBlogPosts(u);
                  };
                  return (
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-3">
                        <button className={BTN_SEC} onClick={() => setBlogEditIdx(null)}>← Senarai</button>
                        <span className="text-gray-400 text-sm">{post.titleEn || 'Post Baru'}</span>
                      </div>

                      <div className={SECTION}>
                        <div className="flex items-center justify-between mb-5">
                          <h2 className="font-semibold text-gray-800">Maklumat Post</h2>
                          <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={post.published}
                                onChange={(e) => update({ published: e.target.checked })} />
                              <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-rose-700 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                              <span className="ml-2 text-sm text-gray-600">Published</span>
                            </label>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={LABEL}>Tajuk (English)</label>
                            <input className={INPUT} value={post.titleEn} onChange={(e) => update({ titleEn: e.target.value })} placeholder="e.g. 5 Tips for Perfect Brows" />
                          </div>
                          <div>
                            <label className={LABEL}>Tajuk (BM)</label>
                            <input className={INPUT} value={post.titleBm} onChange={(e) => update({ titleBm: e.target.value })} placeholder="cth. 5 Tips untuk Kening Sempurna" />
                          </div>
                          <div>
                            <label className={LABEL}>Slug (URL)</label>
                            <input className={INPUT} value={post.slug} onChange={(e) => update({ slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} placeholder="e.g. tips-for-perfect-brows" />
                            <p className="text-xs text-gray-400 mt-1">URL: /blog/{post.slug || 'slug'}</p>
                          </div>
                          <div>
                            <label className={LABEL}>Kategori</label>
                            <input className={INPUT} value={post.category} onChange={(e) => update({ category: e.target.value })} placeholder="e.g. Brow Care, Lash Tips, Studio News" />
                          </div>
                          <div className="md:col-span-2">
                            <label className={LABEL}>Featured Image</label>
                            <MediaPicker value={post.featuredImage} onChange={(url) => update({ featuredImage: url })} password={password} label="Featured Image" />
                          </div>
                        </div>
                      </div>

                      <div className={SECTION}>
                        <h2 className="font-semibold text-gray-800 mb-5">Kandungan / Body</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={LABEL}>Kandungan (English)</label>
                            <textarea className={INPUT + ' resize-y'} style={{ minHeight: 240 }} value={post.bodyEn} onChange={(e) => update({ bodyEn: e.target.value })} placeholder={'Write your post content here...\n\nSeparate paragraphs with a blank line.'} />
                          </div>
                          <div>
                            <label className={LABEL}>Kandungan (BM)</label>
                            <textarea className={INPUT + ' resize-y'} style={{ minHeight: 240 }} value={post.bodyBm} onChange={(e) => update({ bodyBm: e.target.value })} placeholder={'Tulis kandungan post di sini...\n\nPisahkan perenggan dengan baris kosong.'} />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button onClick={() => { save('blog_posts', blogPosts); }} className={BTN_SAVE}>Simpan Post</button>
                        <button className={BTN_SEC} onClick={() => setBlogEditIdx(null)}>Batal</button>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* ── NAVIGATION ────────────────────────────────────────────────── */}
          {tab === 'nav' && (
            <div className="flex flex-col gap-6">
              <div className={SECTION}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-gray-800">Navigation Menu</h2>
                  <StatusBadge status={statuses['nav_items'] ?? 'idle'} />
                </div>
                <p className="text-xs text-gray-400 mb-5">Toggle visibility dan susun semula urutan link di navigation header.</p>
                <div className="flex flex-col gap-2">
                  {[...navItems].sort((a, b) => a.order - b.order).map((item, idx, arr) => (
                    <div key={item.key} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => {
                            if (idx === 0) return;
                            const prev = arr[idx - 1];
                            setNavItems(navItems.map((n) => {
                              if (n.key === item.key) return { ...n, order: prev.order };
                              if (n.key === prev.key) return { ...n, order: item.order };
                              return n;
                            }));
                          }}
                          disabled={idx === 0}
                          className="w-6 h-6 flex items-center justify-center rounded text-xs text-gray-400 hover:bg-white hover:text-gray-700 disabled:opacity-25 transition-all"
                        >↑</button>
                        <button
                          onClick={() => {
                            if (idx === arr.length - 1) return;
                            const next = arr[idx + 1];
                            setNavItems(navItems.map((n) => {
                              if (n.key === item.key) return { ...n, order: next.order };
                              if (n.key === next.key) return { ...n, order: item.order };
                              return n;
                            }));
                          }}
                          disabled={idx === arr.length - 1}
                          className="w-6 h-6 flex items-center justify-center rounded text-xs text-gray-400 hover:bg-white hover:text-gray-700 disabled:opacity-25 transition-all"
                        >↓</button>
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-700 capitalize">{item.key}</span>
                      <button
                        onClick={() => setNavItems(navItems.map((n) => n.key === item.key ? { ...n, visible: !n.visible } : n))}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${item.visible ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-400'}`}
                      >
                        {item.visible ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => save('nav_items', navItems)} className={BTN_SAVE}>Simpan Navigation</button>
            </div>
          )}

          {/* ── SETTINGS ──────────────────────────────────────────────────── */}
          {tab === 'settings' && (
            <div className="flex flex-col gap-6">
              <div className={SECTION}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-gray-800">Site Font</h2>
                  <StatusBadge status={statuses['font_family'] ?? 'idle'} />
                </div>
                <p className="text-xs text-gray-400 mb-4">Pilih body font untuk seluruh website. Heading font (Cormorant) tidak terjejas.</p>
                <div className="flex flex-col gap-2">
                  {FONT_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all"
                      style={{ borderColor: fontFamily === opt.value ? '#be123c' : '#f3f4f6', background: fontFamily === opt.value ? '#fff1f2' : '#f9fafb' }}
                    >
                      <input
                        type="radio"
                        name="fontFamily"
                        checked={fontFamily === opt.value}
                        onChange={() => setFontFamily(opt.value)}
                      />
                      <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button onClick={() => save('font_family', fontFamily)} className={BTN_SAVE}>Simpan Font</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
