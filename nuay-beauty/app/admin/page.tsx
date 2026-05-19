'use client';

import { useState, useEffect, useCallback } from 'react';

type Tab = 'contact' | 'artists' | 'services' | 'images';

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

type Artist = {
  id: string;
  name: string;
  roleEn: string;
  roleBm: string;
  bioEn: string;
  bioBm: string;
  services: string[];
  image: string;
  instagram: string | null;
};

type Service = {
  id: string;
  category: string;
  nameEn: string;
  nameBm: string;
  descEn: string;
  descBm: string;
  price: number;
  duration: string;
  badge: string | null;
};

type GalleryImage = { url: string; label: string; span: string };

type ImageData = {
  hero: string;
  studio: string[];
  gallery: GalleryImage[];
};

const INPUT = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300';
const LABEL = 'block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide';
const SECTION = 'bg-white rounded-xl border border-gray-100 p-6 shadow-sm';
const BTN_SAVE = 'px-5 py-2 rounded-lg text-sm font-medium bg-rose-700 text-white hover:bg-rose-800 active:scale-95 transition-all disabled:opacity-50';
const BTN_SEC = 'px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all';

function StatusBadge({ status }: { status: 'idle' | 'saving' | 'saved' | 'error' }) {
  if (status === 'idle') return null;
  const map = {
    saving: 'bg-yellow-100 text-yellow-700',
    saved: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
  };
  const label = { saving: 'Saving…', saved: 'Saved!', error: 'Error saving' };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${map[status]}`}>
      {label[status]}
    </span>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [tab, setTab] = useState<Tab>('contact');

  const [contact, setContact] = useState<ContactData>({
    whatsapp: '', bookingUrl: '', instagramUrl: '', facebookUrl: '',
    googleMapsEmbed: '', addressEn: '', addressBm: '', hoursEn: '', hoursBm: '',
  });
  const [artists, setArtists] = useState<Artist[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [images, setImages] = useState<ImageData>({ hero: '', studio: ['', '', '', '', ''], gallery: [] });

  const [statuses, setStatuses] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({});

  useEffect(() => {
    const saved = sessionStorage.getItem('nuay_admin_pw');
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  const loadSettings = useCallback(async () => {
    const res = await fetch('/api/settings');
    const data = await res.json();
    if (data.contact) setContact(data.contact);
    if (data.artists) setArtists(data.artists);
    if (data.services) setServices(data.services);
    if (data.images) setImages(data.images);
  }, []);

  useEffect(() => {
    if (authed) loadSettings();
  }, [authed, loadSettings]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ key: '_ping', value: true }),
    });
    if (res.status === 401) {
      setAuthError('Password salah. Cuba lagi.');
      return;
    }
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
    setTimeout(() => setStatuses((s) => ({ ...s, [key]: 'idle' })), 3000);
  }

  function logout() {
    sessionStorage.removeItem('nuay_admin_pw');
    setAuthed(false);
    setPassword('');
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#faf7f4' }}>
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <p className="text-2xl font-light tracking-widest text-rose-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>NUAY</p>
            <p className="text-xs tracking-[0.3em] text-gray-400 mt-0.5">ADMIN PANEL</p>
          </div>
          <form onSubmit={login} className="flex flex-col gap-4">
            <div>
              <label className={LABEL}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={INPUT}
                placeholder="Masukkan password admin"
                required
              />
              {authError && <p className="text-xs text-red-500 mt-1">{authError}</p>}
            </div>
            <button type="submit" className={BTN_SAVE + ' w-full py-3'}>
              Log Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'contact', label: 'Hubungi & URL' },
    { key: 'artists', label: 'Artist' },
    { key: 'services', label: 'Servis' },
    { key: 'images', label: 'Gambar' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#faf7f4' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="font-semibold text-gray-800">Nuay Beauty — CMS</p>
          <p className="text-xs text-gray-400">Kemaskini kandungan website</p>
        </div>
        <button onClick={logout} className={BTN_SEC}>Log Keluar</button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-8 w-fit shadow-sm">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.key ? 'bg-rose-700 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── CONTACT TAB ── */}
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
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-800">Alamat & Waktu Operasi</h2>
              </div>
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
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-800">Google Maps Embed URL</h2>
              </div>
              <label className={LABEL}>Embed URL (dari Google Maps → Share → Embed)</label>
              <textarea
                className={INPUT + ' h-24 resize-none'}
                value={contact.googleMapsEmbed}
                onChange={(e) => setContact({ ...contact, googleMapsEmbed: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
            </div>

            <button onClick={() => save('contact', contact)} className={BTN_SAVE}>
              Simpan Semua Maklumat Hubungan
            </button>
          </div>
        )}

        {/* ── ARTISTS TAB ── */}
        {tab === 'artists' && (
          <div className="flex flex-col gap-6">
            {artists.map((artist, i) => (
              <div key={artist.id} className={SECTION}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-gray-800">{artist.name}</h2>
                  <StatusBadge status={statuses['artists'] ?? 'idle'} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Nama</label>
                    <input className={INPUT} value={artist.name} onChange={(e) => {
                      const updated = [...artists];
                      updated[i] = { ...artist, name: e.target.value };
                      setArtists(updated);
                    }} />
                  </div>
                  <div>
                    <label className={LABEL}>Instagram (URL penuh atau null)</label>
                    <input className={INPUT} value={artist.instagram ?? ''} onChange={(e) => {
                      const updated = [...artists];
                      updated[i] = { ...artist, instagram: e.target.value || null };
                      setArtists(updated);
                    }} placeholder="https://instagram.com/..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className={LABEL}>URL Gambar</label>
                    <input className={INPUT} value={artist.image} onChange={(e) => {
                      const updated = [...artists];
                      updated[i] = { ...artist, image: e.target.value };
                      setArtists(updated);
                    }} placeholder="https://..." />
                    {artist.image && (
                      <img src={artist.image} alt={artist.name} className="mt-2 h-24 w-20 object-cover rounded-lg border border-gray-200" />
                    )}
                  </div>
                  <div>
                    <label className={LABEL}>Role (English)</label>
                    <input className={INPUT} value={artist.roleEn} onChange={(e) => {
                      const updated = [...artists];
                      updated[i] = { ...artist, roleEn: e.target.value };
                      setArtists(updated);
                    }} />
                  </div>
                  <div>
                    <label className={LABEL}>Role (BM)</label>
                    <input className={INPUT} value={artist.roleBm} onChange={(e) => {
                      const updated = [...artists];
                      updated[i] = { ...artist, roleBm: e.target.value };
                      setArtists(updated);
                    }} />
                  </div>
                  <div>
                    <label className={LABEL}>Bio (English)</label>
                    <textarea className={INPUT + ' h-20 resize-none'} value={artist.bioEn} onChange={(e) => {
                      const updated = [...artists];
                      updated[i] = { ...artist, bioEn: e.target.value };
                      setArtists(updated);
                    }} />
                  </div>
                  <div>
                    <label className={LABEL}>Bio (BM)</label>
                    <textarea className={INPUT + ' h-20 resize-none'} value={artist.bioBm} onChange={(e) => {
                      const updated = [...artists];
                      updated[i] = { ...artist, bioBm: e.target.value };
                      setArtists(updated);
                    }} />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => save('artists', artists)} className={BTN_SAVE}>
              Simpan Semua Artist
            </button>
          </div>
        )}

        {/* ── SERVICES TAB ── */}
        {tab === 'services' && (
          <div className="flex flex-col gap-6">
            {services.map((svc, i) => (
              <div key={svc.id} className={SECTION}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-800">{svc.nameEn}</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize">{svc.category}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Nama (English)</label>
                    <input className={INPUT} value={svc.nameEn} onChange={(e) => {
                      const updated = [...services];
                      updated[i] = { ...svc, nameEn: e.target.value };
                      setServices(updated);
                    }} />
                  </div>
                  <div>
                    <label className={LABEL}>Nama (BM)</label>
                    <input className={INPUT} value={svc.nameBm} onChange={(e) => {
                      const updated = [...services];
                      updated[i] = { ...svc, nameBm: e.target.value };
                      setServices(updated);
                    }} />
                  </div>
                  <div>
                    <label className={LABEL}>Harga (RM)</label>
                    <input type="number" className={INPUT} value={svc.price} onChange={(e) => {
                      const updated = [...services];
                      updated[i] = { ...svc, price: Number(e.target.value) };
                      setServices(updated);
                    }} />
                  </div>
                  <div>
                    <label className={LABEL}>Tempoh Masa</label>
                    <input className={INPUT} value={svc.duration} onChange={(e) => {
                      const updated = [...services];
                      updated[i] = { ...svc, duration: e.target.value };
                      setServices(updated);
                    }} placeholder="60 min" />
                  </div>
                  <div>
                    <label className={LABEL}>Deskripsi (English)</label>
                    <textarea className={INPUT + ' h-16 resize-none'} value={svc.descEn} onChange={(e) => {
                      const updated = [...services];
                      updated[i] = { ...svc, descEn: e.target.value };
                      setServices(updated);
                    }} />
                  </div>
                  <div>
                    <label className={LABEL}>Deskripsi (BM)</label>
                    <textarea className={INPUT + ' h-16 resize-none'} value={svc.descBm} onChange={(e) => {
                      const updated = [...services];
                      updated[i] = { ...svc, descBm: e.target.value };
                      setServices(updated);
                    }} />
                  </div>
                  <div>
                    <label className={LABEL}>Badge (kosongkan jika tiada)</label>
                    <input className={INPUT} value={svc.badge ?? ''} onChange={(e) => {
                      const updated = [...services];
                      updated[i] = { ...svc, badge: e.target.value || null };
                      setServices(updated);
                    }} placeholder="Most Popular / New / etc." />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => save('services', services)} className={BTN_SAVE}>
              Simpan Semua Servis
            </button>
          </div>
        )}

        {/* ── IMAGES TAB ── */}
        {tab === 'images' && (
          <div className="flex flex-col gap-6">
            {/* Hero */}
            <div className={SECTION}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-800">Gambar Hero (Latar Utama)</h2>
                <StatusBadge status={statuses['images'] ?? 'idle'} />
              </div>
              <label className={LABEL}>URL Gambar Hero</label>
              <input
                className={INPUT}
                value={images.hero}
                onChange={(e) => setImages({ ...images, hero: e.target.value })}
                placeholder="https://..."
              />
              {images.hero && (
                <img src={images.hero} alt="Hero" className="mt-3 h-32 w-full object-cover rounded-lg border border-gray-200" />
              )}
            </div>

            {/* Studio images */}
            <div className={SECTION}>
              <h2 className="font-semibold text-gray-800 mb-5">Gambar Studio (5 gambar)</h2>
              <div className="flex flex-col gap-4">
                {images.studio.map((url, i) => (
                  <div key={i}>
                    <label className={LABEL}>Gambar Studio {i + 1}</label>
                    <div className="flex gap-3 items-start">
                      <input
                        className={INPUT}
                        value={url}
                        onChange={(e) => {
                          const updated = [...images.studio];
                          updated[i] = e.target.value;
                          setImages({ ...images, studio: updated });
                        }}
                        placeholder="https://..."
                      />
                      {url && (
                        <img src={url} alt={`Studio ${i + 1}`} className="h-12 w-16 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery images */}
            <div className={SECTION}>
              <h2 className="font-semibold text-gray-800 mb-5">Gambar Galeri ({images.gallery.length} gambar)</h2>
              <div className="flex flex-col gap-5">
                {images.gallery.map((img, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600 mb-3">Gambar {i + 1}: {img.label}</p>
                    <div className="flex gap-3 items-start">
                      <div className="flex-1">
                        <label className={LABEL}>URL Gambar</label>
                        <input
                          className={INPUT}
                          value={img.url}
                          onChange={(e) => {
                            const updated = [...images.gallery];
                            updated[i] = { ...img, url: e.target.value };
                            setImages({ ...images, gallery: updated });
                          }}
                          placeholder="https://..."
                        />
                        <label className={LABEL + ' mt-2'}>Label</label>
                        <input
                          className={INPUT}
                          value={img.label}
                          onChange={(e) => {
                            const updated = [...images.gallery];
                            updated[i] = { ...img, label: e.target.value };
                            setImages({ ...images, gallery: updated });
                          }}
                        />
                      </div>
                      {img.url && (
                        <img src={img.url} alt={img.label} className="h-20 w-20 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => save('images', images)} className={BTN_SAVE}>
              Simpan Semua Gambar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
