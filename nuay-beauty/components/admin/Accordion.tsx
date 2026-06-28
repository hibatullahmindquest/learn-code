'use client';

import { useState, type ReactNode } from 'react';
import { sectionClass } from './AdminUI';

type AccordionItemProps = {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function AccordionItem({ title, description, defaultOpen = false, children }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={sectionClass + ' p-0 overflow-hidden'}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <div>
          <h2 className="font-semibold text-sm" style={{ color: 'var(--ink-950)' }}>{title}</h2>
          {description && <p className="text-xs mt-0.5" style={{ color: 'var(--ink-400)' }}>{description}</p>}
        </div>
        <span
          className="text-xs flex-shrink-0 transition-transform"
          style={{ color: 'var(--ink-400)', transform: open ? 'rotate(180deg)' : 'none' }}
        >
          &#9662;
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2" style={{ borderTop: '1px solid var(--line)' }}>
          {children}
        </div>
      )}
    </div>
  );
}
