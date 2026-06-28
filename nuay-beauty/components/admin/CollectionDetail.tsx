'use client';

import type { ReactNode } from 'react';
import { btnSecondary, btnPrimary, btnDanger, StatusBadge } from './AdminUI';

type CollectionDetailProps = {
  title: string;
  onBack: () => void;
  onDelete?: () => void;
  onSave: () => void;
  saving: 'idle' | 'saving' | 'saved' | 'error';
  children: ReactNode;
};

export function CollectionDetail({ title, onBack, onDelete, onSave, saving, children }: CollectionDetailProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className={btnSecondary} onClick={onBack}>← Senarai</button>
          <span className="text-sm" style={{ color: 'var(--ink-400)' }}>{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={saving} />
          {onDelete && <button className={btnDanger} onClick={onDelete}>Padam</button>}
          <button onClick={onSave} className={btnPrimary}>Simpan</button>
        </div>
      </div>
      {children}
    </div>
  );
}
