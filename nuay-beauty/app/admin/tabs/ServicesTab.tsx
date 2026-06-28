'use client';

import { useState } from 'react';
import { type Artist, type Service, SERVICE_DETAIL_IMAGES_MAX, uid } from '@/lib/types';
import { CollectionList } from '@/components/admin/CollectionList';
import { CollectionDetail } from '@/components/admin/CollectionDetail';
import { inputClass, labelClass, sectionClass, btnAdd, btnDanger, RequiredLabel } from '@/components/admin/AdminUI';
import { MediaPicker } from '@/components/MediaPicker';

type Props = {
  services: Service[];
  setServices: (services: Service[]) => void;
  save: (key: string, value: unknown) => Promise<void>;
  status: 'idle' | 'saving' | 'saved' | 'error';
  artists: Artist[];
};

export function ServicesTab({ services, setServices, save, status, artists }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    const usedBy = artists.filter((a) => a.services.includes(id)).map((a) => a.name);
    const message = usedBy.length > 0
      ? `Servis ini digunakan oleh: ${usedBy.join(', ')}. Padam juga?`
      : 'Padam servis ini? Tindakan ini tidak boleh dibatalkan.';
    return window.confirm(message);
  };

  if (editingId !== null) {
    const i = services.findIndex((s) => s.id === editingId);
    const svc = services[i];
    if (!svc) {
      setEditingId(null);
      return null;
    }
    const update = (fields: Partial<Service>) => {
      const u = [...services];
      u[i] = { ...svc, ...fields };
      setServices(u);
    };
    return (
      <CollectionDetail
        title={svc.nameEn || 'Servis Baru'}
        onBack={() => setEditingId(null)}
        onDelete={() => {
          if (confirmDelete(svc.id)) {
            const u = services.filter((_, idx) => idx !== i);
            setServices(u);
            save('services', u);
            setEditingId(null);
          }
        }}
        onSave={() => {
          if (!svc.nameEn.trim() || !svc.price) {
            setValidationError('Sila isi Nama Servis (English) dan Harga sebelum simpan.');
            return;
          }
          setValidationError(null);
          save('services', services);
        }}
        saving={status}
      >
        {validationError && (
          <p className="text-sm" style={{ color: '#dc2626' }}>{validationError}</p>
        )}
        <div className={sectionClass}>
          <div className="flex items-center justify-between mb-4">
            <label className="relative inline-flex items-center cursor-pointer" title={svc.published !== false ? 'Sembunyikan servis' : 'Tunjuk servis'}>
              <input type="checkbox" className="sr-only peer" checked={svc.published !== false} onChange={(e) => update({ published: e.target.checked })} />
              <div className="w-10 h-6 rounded-full peer transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ background: svc.published !== false ? 'var(--wine-700)' : 'var(--line)' }} />
              <span className="ml-2 text-sm" style={{ color: 'var(--ink-600)' }}>{svc.published !== false ? 'Aktif' : 'Disembunyikan'}</span>
            </label>
          </div>
          <div className="mb-4">
            <label className={labelClass}>Gambar Servis</label>
            <MediaPicker value={svc.image} onChange={(url) => update({ image: url })} label={svc.nameEn || 'Servis Baru'} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <RequiredLabel>Nama (English)</RequiredLabel>
              <input className={inputClass} value={svc.nameEn} onChange={(e) => update({ nameEn: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Nama (BM)</label>
              <input className={inputClass} value={svc.nameBm} onChange={(e) => update({ nameBm: e.target.value })} />
            </div>
            <div>
              <RequiredLabel>Harga (RM)</RequiredLabel>
              <input type="number" min={0} className={inputClass} value={svc.price} onChange={(e) => update({ price: Number(e.target.value) || 0 })} />
            </div>
            <div>
              <label className={labelClass}>Tempoh Masa</label>
              <input className={inputClass} value={svc.duration} onChange={(e) => update({ duration: e.target.value })} placeholder="60 min" />
            </div>
            <div>
              <label className={labelClass}>Deskripsi (English)</label>
              <textarea className={inputClass + ' h-16 resize-none'} value={svc.descEn} onChange={(e) => update({ descEn: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Deskripsi (BM)</label>
              <textarea className={inputClass + ' h-16 resize-none'} value={svc.descBm} onChange={(e) => update({ descBm: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Ketahanan (English)</label>
              <input className={inputClass} value={svc.longevityEn} onChange={(e) => update({ longevityEn: e.target.value })} placeholder="Lasts 6-8 weeks" />
            </div>
            <div>
              <label className={labelClass}>Ketahanan (BM)</label>
              <input className={inputClass} value={svc.longevityBm} onChange={(e) => update({ longevityBm: e.target.value })} placeholder="Tahan 6-8 minggu" />
            </div>
            <div>
              <label className={labelClass}>Kategori</label>
              <input className={inputClass} value={svc.category} onChange={(e) => update({ category: e.target.value })} placeholder="eyebrows / lashes / lips / body" />
            </div>
            <div>
              <label className={labelClass}>Badge (kosongkan jika tiada)</label>
              <input className={inputClass} value={svc.badge ?? ''} onChange={(e) => update({ badge: e.target.value || null })} placeholder="Most Popular / New / Bestseller" />
            </div>
            <div>
              <label className={labelClass}>Booking Link (kosongkan untuk guna link default)</label>
              <input className={inputClass} value={svc.bookingUrl ?? ''} onChange={(e) => update({ bookingUrl: e.target.value || null })} placeholder="https://..." />
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 cursor-pointer w-fit">
            <input type="checkbox" checked={svc.featured} onChange={(e) => update({ featured: e.target.checked })} />
            <span className="text-sm" style={{ color: 'var(--ink-600)' }}>Papar di Homepage (Featured Services) — 3 pertama yang ditanda akan dipaparkan</span>
          </label>
        </div>

        <div className={sectionClass}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--ink-950)' }}>Detail Servis (Accordion &quot;Details&quot;)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Detail Penuh (English)</label>
              <textarea className={inputClass + ' h-28 resize-none'} value={svc.detailTextEn ?? ''} onChange={(e) => update({ detailTextEn: e.target.value })} placeholder="Penerangan lanjut tentang rawatan ini..." />
            </div>
            <div>
              <label className={labelClass}>Detail Penuh (BM)</label>
              <textarea className={inputClass + ' h-28 resize-none'} value={svc.detailTextBm ?? ''} onChange={(e) => update({ detailTextBm: e.target.value })} placeholder="Penerangan lanjut tentang rawatan ini..." />
            </div>
          </div>

          <label className={labelClass + ' mt-4'}>Video Link (kosongkan jika tiada)</label>
          <input className={inputClass} value={svc.videoUrl ?? ''} onChange={(e) => update({ videoUrl: e.target.value || null })} placeholder="https://youtube.com/... atau https://tiktok.com/..." />
          <p className="text-xs mt-1" style={{ color: 'var(--ink-400)' }}>
            Link YouTube/TikTok akan dimainkan terus dalam page. Link Instagram akan dipaparkan sebagai butang &quot;Tonton di Instagram&quot; (buka tab baru).
          </p>

          <label className={labelClass + ' mt-4'}>
            Gambar Galeri ({(svc.detailImages ?? []).length}/{SERVICE_DETAIL_IMAGES_MAX})
          </label>
          <div className="flex flex-col gap-2 mt-1">
            {(svc.detailImages ?? []).map((url, gi) => (
              <div key={gi} className="flex gap-2 items-center">
                <div className="flex-1">
                  <MediaPicker
                    value={url}
                    onChange={(newUrl) => {
                      const g = [...(svc.detailImages ?? [])];
                      g[gi] = newUrl;
                      update({ detailImages: g });
                    }}
                    label={`${svc.nameEn || 'Servis'} Detail ${gi + 1}`}
                  />
                </div>
                <button
                  className={btnDanger}
                  onClick={() => {
                    if (window.confirm('Padam gambar ini?')) {
                      const g = (svc.detailImages ?? []).filter((_, idx) => idx !== gi);
                      update({ detailImages: g });
                    }
                  }}
                >✕</button>
              </div>
            ))}
            {(svc.detailImages ?? []).length < SERVICE_DETAIL_IMAGES_MAX && (
              <button className={btnAdd + ' w-full mt-1'} onClick={() => update({ detailImages: [...(svc.detailImages ?? []), ''] })}>
                + Tambah Gambar Galeri
              </button>
            )}
          </div>
        </div>
      </CollectionDetail>
    );
  }

  return (
    <CollectionList
      items={services}
      getId={(s) => s.id}
      status={status}
      statusField={(s) => s.published !== false}
      columns={[
        { key: 'nameEn', label: 'Nama', render: (s) => s.nameEn || 'Servis Baru', sortValue: (s) => s.nameEn.toLowerCase() },
        { key: 'category', label: 'Kategori', render: (s) => s.category || '—', sortValue: (s) => s.category.toLowerCase() },
        { key: 'price', label: 'Harga', render: (s) => `RM ${s.price}`, sortValue: (s) => s.price },
        { key: 'duration', label: 'Tempoh', render: (s) => s.duration || '—' },
      ]}
      searchableText={(s) => `${s.nameEn} ${s.nameBm} ${s.category}`}
      onEdit={setEditingId}
      onDelete={(id) => {
        const usedBy = artists.filter((a) => a.services.includes(id)).map((a) => a.name);
        if (usedBy.length > 0 && !window.confirm(`Servis ini digunakan oleh: ${usedBy.join(', ')}. Padam juga?`)) return;
        const u = services.filter((s) => s.id !== id);
        setServices(u);
        save('services', u);
      }}
      onAdd={() => {
        const newService: Service = { id: uid(), category: '', nameEn: '', nameBm: '', descEn: '', descBm: '', price: 0, duration: '', longevityEn: '', longevityBm: '', image: '', badge: null, bookingUrl: null, featured: false, published: true, detailTextEn: '', detailTextBm: '', detailImages: [], videoUrl: null };
        setServices([...services, newService]);
        setEditingId(newService.id);
      }}
      onReorder={(u) => { setServices(u); save('services', u); }}
      addLabel="+ Tambah Servis"
      emptyLabel="Tiada servis lagi."
    />
  );
}
