'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Trash, Plus } from '@phosphor-icons/react';
import { type GalleryImage } from '@/lib/types';
import { MediaPicker } from '@/components/MediaPicker';
import { inputClass, labelClass, sectionClass, btnAdd, btnSecondary, btnDanger } from './AdminUI';

type Props = {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
  password: string;
};

export function MediaGrid({ images, onChange, password }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const update = (i: number, fields: Partial<GalleryImage>) => {
    const u = [...images];
    u[i] = { ...u[i], ...fields };
    onChange(u);
  };

  const remove = (i: number) => {
    onChange(images.filter((_, idx) => idx !== i));
    setEditingIndex(null);
  };

  if (editingIndex !== null) {
    const img = images[editingIndex];
    if (!img) {
      setEditingIndex(null);
      return null;
    }
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button className={btnSecondary + ' inline-flex items-center gap-1.5'} onClick={() => setEditingIndex(null)}>
            <ArrowLeft size={14} weight="bold" />
            <span>Kembali ke Galeri</span>
          </button>
          <button className={btnDanger + ' inline-flex items-center gap-1.5'} onClick={() => { if (window.confirm('Padam gambar ini?')) remove(editingIndex); }}>
            <Trash size={14} weight="bold" />
            <span>Padam</span>
          </button>
        </div>
        <div className={sectionClass}>
          <label className={labelClass}>URL Gambar</label>
          <MediaPicker
            value={img.url}
            onChange={(url) => update(editingIndex, { url })}
            password={password}
            label={img.label || `Gallery ${editingIndex + 1}`}
          />
          <label className={labelClass + ' mt-4'}>Label</label>
          <input className={inputClass} value={img.label} onChange={(e) => update(editingIndex, { label: e.target.value })} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {images.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--ink-400)' }}>Tiada gambar galeri lagi.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setEditingIndex(i)}
              className="relative group rounded-lg overflow-hidden border transition-colors"
              style={{ aspectRatio: '1', borderColor: 'var(--line)' }}
            >
              {img.url ? (
                <Image src={img.url} alt={img.label} fill className="object-cover" unoptimized={img.url.startsWith('blob:') || img.url.length < 4} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs" style={{ background: 'var(--beige-100)', color: 'var(--ink-400)' }}>
                  Tiada URL
                </div>
              )}
              <div
                className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 60%)' }}
              >
                <span className="text-white text-xs px-2 py-1.5 truncate w-full text-left">{img.label || `Gambar ${i + 1}`}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      <button
        className={btnAdd + ' inline-flex items-center gap-1.5'}
        onClick={() => {
          onChange([...images, { url: '', label: '', span: '1' }]);
          setEditingIndex(images.length);
        }}
      >
        <Plus size={14} weight="bold" />
        <span>Tambah Gambar Galeri</span>
      </button>
    </div>
  );
}
