'use client';

import type { ReactNode } from 'react';
import { ArrowLeft, Trash, FloppyDisk } from '@phosphor-icons/react';
import { btnSecondary, btnPrimary, StatusBadge } from './AdminUI';

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
          {onDelete && (
            <>
              <div className="w-px h-5" style={{ background: 'var(--line)' }} />
              <button
                onClick={onDelete}
                aria-label="Padam"
                title="Padam"
                className="w-7 h-7 flex items-center justify-center rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
              >
                <Trash size={14} weight="bold" />
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={saving} />
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
