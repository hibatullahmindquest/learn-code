'use client';

import { useState } from 'react';
import { PencilSimple, Trash, Plus, ArrowUp, ArrowDown, CaretUp, CaretDown } from '@phosphor-icons/react';
import { inputClass, sectionClass, btnSecondary, btnAdd, StatusBadge } from './AdminUI';

export type CollectionColumn<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  sortValue?: (item: T) => string | number;
};

type CollectionListProps<T> = {
  items: T[];
  getId: (item: T) => string;
  columns: CollectionColumn<T>[];
  searchableText: (item: T) => string;
  statusField?: (item: T) => boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onReorder: (newItems: T[]) => void;
  addLabel: string;
  emptyLabel?: string;
  status?: 'idle' | 'saving' | 'saved' | 'error';
};

export function CollectionList<T>({
  items, getId, columns, searchableText, statusField,
  onEdit, onDelete, onAdd, onReorder, addLabel, emptyLabel = 'Tiada item lagi.', status,
}: CollectionListProps<T>) {
  const [search, setSearch] = useState('');
  const [sortState, setSortState] = useState<{ key: string; dir: 1 | -1 } | null>(null);

  const filtered = search.trim()
    ? items.filter((item) => searchableText(item).toLowerCase().includes(search.trim().toLowerCase()))
    : items;

  const sortBy = (col: CollectionColumn<T>) => {
    if (!col.sortValue) return;
    const dir: 1 | -1 = sortState?.key === col.key ? (sortState.dir * -1 as 1 | -1) : 1;
    const sorted = [...items].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv));
      return cmp * dir;
    });
    setSortState({ key: col.key, dir });
    onReorder(sorted);
  };

  const move = (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((item) => getId(item) === id);
    const swapIdx = idx + dir;
    if (idx === -1 || swapIdx < 0 || swapIdx >= items.length) return;
    const updated = [...items];
    [updated[idx], updated[swapIdx]] = [updated[swapIdx], updated[idx]];
    onReorder(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <input
          className={inputClass + ' max-w-xs'}
          placeholder="Cari..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex-1" />
        {status && <StatusBadge status={status} />}
        <button className={btnAdd + ' inline-flex items-center gap-1.5'} onClick={onAdd}>
          <Plus size={14} weight="bold" />
          {addLabel.replace(/^\+\s*/, '')}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className={sectionClass + ' text-center py-12'}>
          <p className="text-sm" style={{ color: 'var(--ink-400)' }}>
            {items.length === 0 ? emptyLabel : 'Tiada hasil carian.'}
          </p>
        </div>
      ) : (
        <div className={sectionClass + ' p-0 overflow-hidden'}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <th className="px-3 py-3 w-12" />
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-left px-4 py-3 text-xs font-medium uppercase tracking-wide ${col.sortValue ? 'cursor-pointer' : ''}`}
                    style={{ color: 'var(--ink-400)' }}
                    onClick={() => sortBy(col)}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {sortState?.key === col.key && (
                        sortState.dir === 1 ? <CaretUp size={11} /> : <CaretDown size={11} />
                      )}
                    </span>
                  </th>
                ))}
                {statusField && (
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--ink-400)' }}>
                    Status
                  </th>
                )}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const id = getId(item);
                const idx = items.findIndex((it) => getId(it) === id);
                return (
                  <tr key={id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td className="px-3 py-2">
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => move(id, -1)}
                          disabled={idx === 0}
                          aria-label="Alih ke atas"
                          title="Alih ke atas"
                          className="w-6 h-6 flex items-center justify-center rounded text-xs transition-all disabled:opacity-25"
                          style={{ color: 'var(--ink-400)' }}
                        ><ArrowUp size={14} weight="bold" /></button>
                        <button
                          onClick={() => move(id, 1)}
                          disabled={idx === items.length - 1}
                          aria-label="Alih ke bawah"
                          title="Alih ke bawah"
                          className="w-6 h-6 flex items-center justify-center rounded text-xs transition-all disabled:opacity-25"
                          style={{ color: 'var(--ink-400)' }}
                        ><ArrowDown size={14} weight="bold" /></button>
                      </div>
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3.5" style={{ color: 'var(--ink-800)' }}>
                        {col.render(item)}
                      </td>
                    ))}
                    {statusField && (
                      <td className="px-4 py-3.5">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={statusField(item)
                            ? { background: 'rgba(34,197,94,0.12)', color: '#15803d' }
                            : { background: 'var(--beige-100)', color: 'var(--ink-400)' }}
                        >
                          {statusField(item) ? 'Published' : 'Hidden'}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-3">
                        <button className={btnSecondary + ' text-xs px-3 py-1.5 inline-flex items-center gap-1.5'} onClick={() => onEdit(id)}>
                          <PencilSimple size={14} weight="bold" />
                          <span>Edit</span>
                        </button>
                        <div className="w-px h-5" style={{ background: 'var(--line)' }} />
                        <button
                          onClick={() => { if (window.confirm('Padam item ini?')) onDelete(id); }}
                          aria-label="Padam"
                          title="Padam"
                          className="w-7 h-7 flex items-center justify-center rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash size={14} weight="bold" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
