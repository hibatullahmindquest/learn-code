'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

type MediaFile = { name: string; url: string };

type Props = {
  value: string;
  onChange: (url: string) => void;
  password: string;
  label?: string;
};

const INPUT = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300';

export function MediaPicker({ value, onChange, password, label }: Props) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media', { headers: { 'x-admin-password': password } });
      const data = await res.json();
      if (data.files) setFiles(data.files);
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (open) loadMedia();
  }, [open, loadMedia]);

  async function handleUpload(file: File) {
    setUploading(true);
    setUploadError('');
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-password': password },
        body: form,
      });
      const data = await res.json();
      if (data.url) {
        await loadMedia();
        onChange(data.url);
        setOpen(false);
      } else {
        setUploadError(data.error ?? 'Upload failed');
      }
    } catch {
      setUploadError('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(f: MediaFile) {
    setDeleting(f.name);
    try {
      const checkRes = await fetch(`/api/admin/media?checkUrl=${encodeURIComponent(f.url)}`, {
        headers: { 'x-admin-password': password },
      });
      const checkData = await checkRes.json();
      const usedIn: string[] = checkData.usedIn ?? [];

      const warning = usedIn.length > 0
        ? `Amaran: gambar ini sedang digunakan di — ${usedIn.join(', ')}.\n\nJika anda padam, paparan di tempat tersebut mungkin rosak. Padam juga?`
        : 'Padam gambar ini secara kekal dari storage?';

      if (!window.confirm(warning)) {
        setDeleting(null);
        return;
      }

      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ name: f.name }),
      });
      const data = await res.json();
      if (data.success) {
        if (value === f.url) onChange('');
        await loadMedia();
      } else {
        window.alert(data.error ?? 'Gagal padam gambar');
      }
    } finally {
      setDeleting(null);
    }
  }

  return (
    <>
      <div className="flex gap-2 items-start">
        {/* Preview thumbnail */}
        {value && (
          <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
            <Image src={value} alt="" fill className="object-cover" unoptimized={value.startsWith('blob:') || value.length < 4} />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-1.5">
          <input
            className={INPUT}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... atau pilih dari library"
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all w-fit"
          >
            Browse Media Library
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-800">Media Library</p>
                {label && <p className="text-xs text-gray-400 mt-0.5">Pilih untuk: {label}</p>}
              </div>
              <div className="flex items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50"
                  style={{ background: '#8B2252' }}
                >
                  {uploading ? 'Uploading…' : '+ Upload Gambar'}
                </button>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none">&times;</button>
              </div>
            </div>

            {uploadError && (
              <p className="px-6 py-2 text-xs text-red-500 bg-red-50">{uploadError}</p>
            )}

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-sm text-gray-400">Memuatkan…</p>
                </div>
              ) : files.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3">
                  <p className="text-sm text-gray-400">Tiada gambar lagi.</p>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="text-sm px-4 py-2 rounded-lg border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 transition-all"
                  >
                    Upload gambar pertama
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {files.map((f) => (
                    <div
                      key={f.name}
                      className="relative group rounded-xl overflow-hidden border-2 transition-all hover:border-rose-600"
                      style={{
                        aspectRatio: '1',
                        borderColor: value === f.url ? '#8B2252' : 'transparent',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => { onChange(f.url); setOpen(false); }}
                        className="absolute inset-0"
                      >
                        <Image src={f.url} alt={f.name} fill className="object-cover" />
                        {value === f.url && (
                          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(139,34,82,0.4)' }}>
                            <span className="text-white text-lg">✓</span>
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleDelete(f); }}
                        disabled={deleting === f.name}
                        title="Padam gambar"
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-100"
                        style={{ background: 'rgba(0,0,0,0.6)' }}
                      >
                        {deleting === f.name ? '…' : '🗑'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
