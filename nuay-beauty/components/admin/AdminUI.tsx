'use client';

// Token-based style primitives for the admin panel, built on the Nuay Beauty
// Design System CSS variables (wine/gold/ink/beige) instead of generic
// Tailwind rose/gray. Used by CollectionList/CollectionDetail and the four
// rewritten tabs (FAQ, Testimonials, Services, Artists).

export const inputClass =
  'w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 transition-colors border-[var(--line)] text-[var(--ink-950)] focus:ring-[var(--gold-300)]';
export const labelClass =
  'block text-xs font-medium mb-1 uppercase tracking-wide text-[var(--ink-400)]';
export const sectionClass =
  'bg-white rounded-[var(--radius-card)] border border-[var(--line)] p-6 shadow-[var(--shadow-sm)]';
export const btnPrimary =
  'px-5 py-2 rounded-[var(--radius-button)] text-sm font-medium bg-[var(--wine-700)] text-[var(--beige-50)] hover:bg-[var(--wine-800)] active:scale-95 transition-all disabled:opacity-50';
export const btnSecondary =
  'px-4 py-2 rounded-[var(--radius-button)] text-sm font-medium border border-[var(--line)] text-[var(--ink-600)] hover:bg-[var(--beige-100)] transition-all';
export const btnDanger =
  'px-3 py-1.5 rounded-[var(--radius-button)] text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all';
export const btnAdd =
  'px-4 py-2 rounded-[var(--radius-button)] text-sm font-medium border border-dashed border-[var(--line)] text-[var(--ink-400)] hover:border-[var(--gold-600)] hover:text-[var(--ink-600)] transition-all';

export function StatusBadge({ status }: { status: 'idle' | 'saving' | 'saved' | 'error' }) {
  if (status === 'idle') return null;
  const map = { saving: 'bg-yellow-100 text-yellow-700', saved: 'bg-green-100 text-green-700', error: 'bg-red-100 text-red-700' };
  const label = { saving: 'Saving…', saved: 'Saved!', error: 'Error saving' };
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${map[status]}`}>{label[status]}</span>;
}
