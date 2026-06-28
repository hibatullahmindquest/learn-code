'use client';

import { type ImageData } from '@/lib/types';
import { AccordionItem } from '@/components/admin/Accordion';
import { MediaGrid } from '@/components/admin/MediaGrid';
import { MediaPicker } from '@/components/MediaPicker';
import { labelClass, sectionClass, btnPrimary, StatusBadge } from '@/components/admin/AdminUI';

type Props = {
  images: ImageData;
  setImages: (images: ImageData) => void;
  save: (key: string, value: unknown) => Promise<void>;
  status: 'idle' | 'saving' | 'saved' | 'error';
  password: string;
};

export function GalleryTab({ images, setImages, save, status, password }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold" style={{ color: 'var(--ink-950)' }}>Gallery</h1>
        <StatusBadge status={status} />
      </div>

      <AccordionItem title="Gambar Hero (Latar Utama)">
        <label className={labelClass}>URL Gambar Hero</label>
        <MediaPicker value={images.hero} onChange={(url) => setImages({ ...images, hero: url })} password={password} label="Hero Image" />
      </AccordionItem>

      <AccordionItem title="Gambar Why Nuay (Homepage)" description={'Gambar di sebelah section "Why Nuay" di homepage.'}>
        <label className={labelClass}>URL Gambar Why Nuay</label>
        <MediaPicker value={images.whyNuay ?? ''} onChange={(url) => setImages({ ...images, whyNuay: url })} password={password} label="Why Nuay Image" />
      </AccordionItem>

      <AccordionItem title="Gambar Before & After (Homepage)" description='Gambar untuk slider perbandingan "Before & After" di homepage.'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Gambar Before</label>
            <MediaPicker value={images.beforeAfter?.before ?? ''} onChange={(url) => setImages({ ...images, beforeAfter: { ...images.beforeAfter, before: url } })} password={password} label="Before Image" />
          </div>
          <div>
            <label className={labelClass}>Gambar After</label>
            <MediaPicker value={images.beforeAfter?.after ?? ''} onChange={(url) => setImages({ ...images, beforeAfter: { ...images.beforeAfter, after: url } })} password={password} label="After Image" />
          </div>
        </div>
      </AccordionItem>

      <AccordionItem title="Gambar Featured Service (Homepage)" description="Gambar latar untuk kad servis featured besar di homepage.">
        <label className={labelClass}>URL Gambar Featured Service</label>
        <MediaPicker value={images.featuredService ?? ''} onChange={(url) => setImages({ ...images, featuredService: url })} password={password} label="Featured Service Image" />
      </AccordionItem>

      <AccordionItem title="Gambar Studio (5 gambar)">
        <div className="flex flex-col gap-4">
          {images.studio.map((url, i) => (
            <div key={i}>
              <label className={labelClass}>Gambar Studio {i + 1}</label>
              <MediaPicker value={url} onChange={(newUrl) => { const u = [...images.studio]; u[i] = newUrl; setImages({ ...images, studio: u }); }} password={password} label={`Studio ${i + 1}`} />
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Gambar Halaman About (3 foto grid)" description="Foto yang muncul dalam grid 2-kolum di halaman About — kiri (tall), kanan atas, kanan bawah.">
        <div className="flex flex-col gap-4">
          {(['Foto Kiri (Tall)', 'Foto Kanan Atas', 'Foto Kanan Bawah'] as const).map((lbl, idx) => (
            <div key={idx}>
              <label className={labelClass}>{lbl}</label>
              <MediaPicker
                value={images.aboutPhotos?.[idx] ?? ''}
                onChange={(url) => {
                  const p: [string, string, string] = [...(images.aboutPhotos ?? ['', '', ''])] as [string, string, string];
                  p[idx] = url;
                  setImages({ ...images, aboutPhotos: p });
                }}
                password={password}
                label={lbl}
              />
            </div>
          ))}
        </div>
      </AccordionItem>

      <div className={sectionClass}>
        <h2 className="font-semibold text-sm mb-4" style={{ color: 'var(--ink-950)' }}>Gambar Galeri ({images.gallery.length} gambar)</h2>
        <MediaGrid images={images.gallery} onChange={(gallery) => setImages({ ...images, gallery })} password={password} />
      </div>

      <button onClick={() => save('images', images)} className={btnPrimary + ' w-fit'}>Simpan Semua Gambar</button>
    </div>
  );
}
