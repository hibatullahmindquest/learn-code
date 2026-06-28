'use client';

import { useState } from 'react';
import { type Artist, type ArtistTier, type Service, uid } from '@/lib/types';
import { CollectionList } from '@/components/admin/CollectionList';
import { CollectionDetail } from '@/components/admin/CollectionDetail';
import { inputClass, labelClass, sectionClass, btnAdd, btnDanger, RequiredLabel } from '@/components/admin/AdminUI';
import { MediaPicker } from '@/components/MediaPicker';

type Props = {
  artists: Artist[];
  setArtists: (artists: Artist[]) => void;
  services: Service[];
  save: (key: string, value: unknown) => Promise<void>;
  status: 'idle' | 'saving' | 'saved' | 'error';
};

export function ArtistsTab({ artists, setArtists, services, save, status }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (editingId !== null) {
    const i = artists.findIndex((a) => a.id === editingId);
    const artist = artists[i];
    if (!artist) {
      setEditingId(null);
      return null;
    }
    const update = (fields: Partial<Artist>) => {
      const u = [...artists];
      u[i] = { ...artist, ...fields };
      setArtists(u);
    };
    return (
      <CollectionDetail
        title={artist.name || 'Artist Baru'}
        onBack={() => setEditingId(null)}
        onDelete={() => {
          if (window.confirm('Padam artist ini? Tindakan ini tidak boleh dibatalkan.')) {
            const u = artists.filter((_, idx) => idx !== i);
            setArtists(u);
            save('artists', u);
            setEditingId(null);
          }
        }}
        onSave={() => {
          if (!artist.name.trim()) {
            setValidationError('Sila isi Nama artist sebelum simpan.');
            return;
          }
          setValidationError(null);
          save('artists', artists);
        }}
        saving={status}
      >
        {validationError && (
          <p className="text-sm" style={{ color: '#dc2626' }}>{validationError}</p>
        )}
        <div className={sectionClass}>
          <div className="flex items-center justify-between mb-4">
            <label className="relative inline-flex items-center cursor-pointer" title={artist.published !== false ? 'Sembunyikan artist' : 'Tunjuk artist'}>
              <input type="checkbox" className="sr-only peer" checked={artist.published !== false} onChange={(e) => update({ published: e.target.checked })} />
              <div className="w-10 h-6 rounded-full peer transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ background: artist.published !== false ? 'var(--wine-700)' : 'var(--line)' }} />
              <span className="ml-2 text-sm" style={{ color: 'var(--ink-600)' }}>{artist.published !== false ? 'Aktif' : 'Disembunyikan'}</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <RequiredLabel>Nama</RequiredLabel>
              <input className={inputClass} value={artist.name} onChange={(e) => update({ name: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Instagram (URL penuh atau kosong)</label>
              <input className={inputClass} value={artist.instagram ?? ''} onChange={(e) => update({ instagram: e.target.value || null })} placeholder="https://instagram.com/..." />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>URL Gambar</label>
              <MediaPicker value={artist.image} onChange={(url) => update({ image: url })} label={artist.name || 'Artist Image'} />
            </div>
            <div>
              <label className={labelClass}>Tahap Artist</label>
              <select className={inputClass} value={artist.tier} onChange={(e) => update({ tier: e.target.value as ArtistTier })}>
                <option value="senior">Senior Artist</option>
                <option value="junior">Junior Artist</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Bio (English)</label>
              <textarea className={inputClass + ' h-20 resize-none'} value={artist.bioEn} onChange={(e) => update({ bioEn: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Bio (BM)</label>
              <textarea className={inputClass + ' h-20 resize-none'} value={artist.bioBm} onChange={(e) => update({ bioBm: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Servis Yang Dicover</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {services.map((svc) => {
                  const checked = artist.services.includes(svc.id);
                  return (
                    <label
                      key={svc.id}
                      className="text-sm px-3 py-1.5 rounded-full border cursor-pointer transition-colors"
                      style={checked
                        ? { background: 'var(--wine-700)', color: 'var(--beige-50)', borderColor: 'var(--wine-700)' }
                        : { background: 'var(--white)', color: 'var(--ink-600)', borderColor: 'var(--line)' }}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={(e) => {
                          const svcIds = e.target.checked
                            ? [...artist.services, svc.id]
                            : artist.services.filter((id) => id !== svc.id);
                          update({ services: svcIds });
                        }}
                      />
                      {svc.nameEn || 'Servis Tanpa Nama'}
                    </label>
                  );
                })}
                {services.length === 0 && <p className="text-sm" style={{ color: 'var(--ink-400)' }}>Tiada servis lagi — tambah servis dahulu di tab Services.</p>}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Gambar Galeri (Portfolio Lightbox)</label>
              <div className="flex flex-col gap-2 mt-1">
                {(artist.gallery ?? []).map((url, gi) => (
                  <div key={gi} className="flex gap-2 items-center">
                    <div className="flex-1">
                      <MediaPicker
                        value={url}
                        onChange={(newUrl) => {
                          const g = [...(artist.gallery ?? [])];
                          g[gi] = newUrl;
                          update({ gallery: g });
                        }}
                        label={`${artist.name} Gallery ${gi + 1}`}
                      />
                    </div>
                    <button
                      className={btnDanger}
                      onClick={() => {
                        if (window.confirm('Padam gambar ini?')) {
                          const g = (artist.gallery ?? []).filter((_, idx) => idx !== gi);
                          update({ gallery: g });
                        }
                      }}
                    >✕</button>
                  </div>
                ))}
                <button className={btnAdd + ' w-full mt-1'} onClick={() => update({ gallery: [...(artist.gallery ?? []), ''] })}>
                  + Tambah Gambar Galeri
                </button>
              </div>
            </div>
          </div>
        </div>
      </CollectionDetail>
    );
  }

  return (
    <CollectionList
      items={artists}
      getId={(a) => a.id}
      status={status}
      statusField={(a) => a.published !== false}
      columns={[
        { key: 'name', label: 'Nama', render: (a) => a.name || 'Artist Baru', sortValue: (a) => a.name.toLowerCase() },
        { key: 'tier', label: 'Tahap', render: (a) => a.tier === 'senior' ? 'Senior' : 'Junior', sortValue: (a) => a.tier },
        { key: 'services', label: 'Servis', render: (a) => `${a.services.length} servis` },
      ]}
      searchableText={(a) => `${a.name} ${a.tier}`}
      onEdit={setEditingId}
      onDelete={(id) => {
        const u = artists.filter((a) => a.id !== id);
        setArtists(u);
        save('artists', u);
      }}
      onAdd={() => {
        const newArtist: Artist = { id: uid(), name: '', tier: 'senior', bioEn: '', bioBm: '', services: [], image: '', instagram: null, gallery: [], published: true };
        setArtists([...artists, newArtist]);
        setEditingId(newArtist.id);
      }}
      onReorder={(u) => { setArtists(u); save('artists', u); }}
      addLabel="+ Tambah Artist"
      emptyLabel="Tiada artist lagi."
    />
  );
}
