'use client';

import type { ReactNode } from 'react';
import { ArrowLeft, Trash, FloppyDisk } from '@phosphor-icons/react';
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
          <button className={btnSecondary + ' inline-flex items-center gap-1.5'} onClick={onBack}>
            <ArrowLeft size={14} weight="bold" />
            <span>Senarai</span>
          </button>
          <span className="text-sm" style={{ color: 'var(--ink-400)' }}>{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={saving} />
          {onDelete && (
            <button className={btnDanger + ' inline-flex items-center gap-1.5'} onClick={onDelete}>
              <Trash size={14} weight="bold" />
              <span>Padam</span>
            </button>
          )}
          <button onClick={onSave} className={btnPrimary + ' inline-flex items-center gap-1.5'}>
            <FloppyDisk size={14} weight="bold" />
            <span>Simpan</span>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
