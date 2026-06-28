'use client';

import { useState } from 'react';
import { type Testimonial, uid } from '@/lib/types';
import { CollectionList } from '@/components/admin/CollectionList';
import { CollectionDetail } from '@/components/admin/CollectionDetail';
import { inputClass, labelClass, sectionClass, RequiredLabel } from '@/components/admin/AdminUI';

type Props = {
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  save: (key: string, value: unknown) => Promise<void>;
  status: 'idle' | 'saving' | 'saved' | 'error';
};

export function TestimonialsTab({ testimonials, setTestimonials, save, status }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (editingId !== null) {
    const i = testimonials.findIndex((t) => t.id === editingId);
    const t = testimonials[i];
    if (!t) {
      setEditingId(null);
      return null;
    }
    const update = (fields: Partial<Testimonial>) => {
      const u = [...testimonials];
      u[i] = { ...t, ...fields };
      setTestimonials(u);
    };
    return (
      <CollectionDetail
        title={t.name || 'Testimoni Baru'}
        onBack={() => setEditingId(null)}
        onDelete={() => {
          if (window.confirm('Padam testimoni ini?')) {
            const u = testimonials.filter((_, idx) => idx !== i);
            setTestimonials(u);
            save('testimonials', u);
            setEditingId(null);
          }
        }}
        onSave={() => {
          if (!t.name.trim() || !t.quoteEn.trim()) {
            setValidationError('Sila isi Nama Pelanggan dan Ulasan (English) sebelum simpan.');
            return;
          }
          setValidationError(null);
          save('testimonials', testimonials);
        }}
        saving={status}
      >
        {validationError && (
          <p className="text-sm" style={{ color: '#dc2626' }}>{validationError}</p>
        )}
        <div className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <RequiredLabel>Nama Pelanggan</RequiredLabel>
              <input className={inputClass} value={t.name} onChange={(e) => update({ name: e.target.value })} placeholder="Sarah K." />
            </div>
            <div>
              <label className={labelClass}>Servis Diambil</label>
              <input className={inputClass} value={t.service} onChange={(e) => update({ service: e.target.value })} placeholder="Eyebrow Lamination" />
            </div>
            <div>
              <label className={labelClass}>Lokasi (pilihan)</label>
              <input className={inputClass} value={t.location ?? ''} onChange={(e) => update({ location: e.target.value })} placeholder="Shah Alam" />
            </div>
            <div>
              <label className={labelClass}>Rating (1–5)</label>
              <select className={inputClass} value={t.rating} onChange={(e) => update({ rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} bintang {'★'.repeat(r)}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-5">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={t.published} onChange={(e) => update({ published: e.target.checked })} />
                <div className="w-10 h-6 rounded-full peer transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ background: t.published ? 'var(--wine-700)' : 'var(--line)' }} />
                <span className="ml-2 text-sm" style={{ color: 'var(--ink-600)' }}>Tunjuk di website</span>
              </label>
            </div>
            <div>
              <RequiredLabel>Ulasan (English)</RequiredLabel>
              <textarea className={inputClass + ' h-20 resize-none'} value={t.quoteEn} onChange={(e) => update({ quoteEn: e.target.value })} placeholder="The service was amazing..." />
            </div>
            <div>
              <label className={labelClass}>Ulasan (BM)</label>
              <textarea className={inputClass + ' h-20 resize-none'} value={t.quoteBm} onChange={(e) => update({ quoteBm: e.target.value })} placeholder="Servis sangat bagus..." />
            </div>
          </div>
        </div>
      </CollectionDetail>
    );
  }

  return (
    <CollectionList
      items={testimonials}
      getId={(t) => t.id}
      status={status}
      statusField={(t) => t.published}
      columns={[
        { key: 'name', label: 'Nama', render: (t) => t.name || 'Pelanggan Baru', sortValue: (t) => t.name.toLowerCase() },
        { key: 'service', label: 'Servis', render: (t) => t.service || '—' },
        { key: 'rating', label: 'Rating', render: (t) => '★'.repeat(t.rating), sortValue: (t) => t.rating },
      ]}
      searchableText={(t) => `${t.name} ${t.service} ${t.quoteEn}`}
      onEdit={setEditingId}
      onDelete={(id) => {
        const u = testimonials.filter((t) => t.id !== id);
        setTestimonials(u);
        save('testimonials', u);
      }}
      onAdd={() => {
        const newTestimonial: Testimonial = { id: uid(), name: '', service: '', rating: 5, quoteEn: '', quoteBm: '', published: false };
        setTestimonials([...testimonials, newTestimonial]);
        setEditingId(newTestimonial.id);
      }}
      onReorder={(u) => { setTestimonials(u); save('testimonials', u); }}
      addLabel="+ Tambah Testimoni"
      emptyLabel="Tiada testimoni lagi."
    />
  );
}
