'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Copy, Check, Trash, ArrowsClockwise } from '@phosphor-icons/react';
import { sectionClass } from '@/components/admin/AdminUI';

type MediaFile = { name: string; url: string };

export function MediaLibraryTab() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      if (data.files) setFiles(data.files);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  async function handleDelete(f: MediaFile) {
    setDeleting(f.name);
    try {
      const checkRes = await fetch(`/api/admin/media?checkUrl=${encodeURIComponent(f.url)}`);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name }),
      });
      const data = await res.json();
      if (data.success) {
        setFiles((prev) => prev.filter((file) => file.name !== f.name));
      } else {
        window.alert(data.error ?? 'Gagal padam gambar');
      }
    } finally {
      setDeleting(null);
    }
  }

  function handleCopy(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className={sectionClass}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-gray-800">Media Library</h2>
            <p className="text-xs text-gray-400 mt-0.5">{loading ? 'Memuatkan…' : `${files.length} gambar`}</p>
          </div>
          <button
            onClick={loadMedia}
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all inline-flex items-center gap-1.5"
          >
            <ArrowsClockwise size={13} weight="bold" />
            Muat Semula
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-sm text-gray-400">Memuatkan…</p>
          </div>
        ) : files.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-sm text-gray-400">Tiada gambar lagi. Muat naik melalui mana-mana &quot;Browse Media Library&quot; di tab lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((f) => (
              <div key={f.name} className="relative group rounded-xl overflow-hidden border border-gray-200">
                <div className="relative w-full" style={{ aspectRatio: '1' }}>
                  <Image src={f.url} alt={f.name} fill className="object-cover" />
                </div>
                <div className="absolute top-1.5 right-1.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleCopy(f.url)}
                    title="Salin URL"
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                  >
                    {copied === f.url ? <Check size={13} weight="bold" /> : <Copy size={13} weight="bold" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(f)}
                    disabled={deleting === f.name}
                    title="Padam gambar"
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs disabled:opacity-100"
                    style={{ background: 'rgba(139,0,0,0.75)' }}
                  >
                    {deleting === f.name ? '…' : <Trash size={13} weight="bold" />}
                  </button>
                </div>
                <p className="px-2 py-1.5 text-[11px] text-gray-400 truncate" title={f.name}>{f.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
