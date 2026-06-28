'use client';

import { useState } from 'react';
import { type FaqItem, uid } from '@/lib/types';
import { CollectionList } from '@/components/admin/CollectionList';
import { CollectionDetail } from '@/components/admin/CollectionDetail';
import { inputClass, labelClass, sectionClass, RequiredLabel } from '@/components/admin/AdminUI';

type Props = {
  faqs: FaqItem[];
  setFaqs: (faqs: FaqItem[]) => void;
  save: (key: string, value: unknown) => Promise<void>;
  status: 'idle' | 'saving' | 'saved' | 'error';
};

export function FaqTab({ faqs, setFaqs, save, status }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (editingId !== null) {
    const i = faqs.findIndex((f) => f.id === editingId);
    const faq = faqs[i];
    if (!faq) {
      setEditingId(null);
      return null;
    }
    const update = (fields: Partial<FaqItem>) => {
      const u = [...faqs];
      u[i] = { ...faq, ...fields };
      setFaqs(u);
    };
    return (
      <CollectionDetail
        title={faq.questionEn || 'Soalan FAQ Baru'}
        onBack={() => setEditingId(null)}
        onDelete={() => {
          if (window.confirm('Padam soalan FAQ ini?')) {
            const u = faqs.filter((_, idx) => idx !== i);
            setFaqs(u);
            save('faqs', u);
            setEditingId(null);
          }
        }}
        onSave={() => {
          if (!faq.questionEn.trim() || !faq.answerEn.trim()) {
            setValidationError('Sila isi Soalan (English) dan Jawapan (English) sebelum simpan.');
            return;
          }
          setValidationError(null);
          save('faqs', faqs);
        }}
        saving={status}
      >
        {validationError && (
          <p className="text-sm" style={{ color: '#dc2626' }}>{validationError}</p>
        )}
        <div className={sectionClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <RequiredLabel>Soalan (English)</RequiredLabel>
              <input className={inputClass} value={faq.questionEn} onChange={(e) => update({ questionEn: e.target.value })} placeholder="e.g. How early should I book?" />
            </div>
            <div>
              <label className={labelClass}>Soalan (BM)</label>
              <input className={inputClass} value={faq.questionBm} onChange={(e) => update({ questionBm: e.target.value })} placeholder="cth. Berapa awal saya perlu tempah?" />
            </div>
            <div>
              <RequiredLabel>Jawapan (English)</RequiredLabel>
              <textarea className={inputClass + ' h-24 resize-none'} value={faq.answerEn} onChange={(e) => update({ answerEn: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Jawapan (BM)</label>
              <textarea className={inputClass + ' h-24 resize-none'} value={faq.answerBm} onChange={(e) => update({ answerBm: e.target.value })} />
            </div>
          </div>
        </div>
      </CollectionDetail>
    );
  }

  return (
    <CollectionList
      items={faqs}
      getId={(f) => f.id}
      status={status}
      columns={[
        { key: 'questionEn', label: 'Soalan (EN)', render: (f) => f.questionEn || '(Tanpa soalan)', sortValue: (f) => f.questionEn.toLowerCase() },
        { key: 'questionBm', label: 'Soalan (BM)', render: (f) => f.questionBm || '—' },
      ]}
      searchableText={(f) => `${f.questionEn} ${f.questionBm} ${f.answerEn} ${f.answerBm}`}
      onEdit={setEditingId}
      onDelete={(id) => {
        const u = faqs.filter((f) => f.id !== id);
        setFaqs(u);
        save('faqs', u);
      }}
      onAdd={() => {
        const newFaq: FaqItem = { id: uid(), questionEn: '', questionBm: '', answerEn: '', answerBm: '' };
        setFaqs([...faqs, newFaq]);
        setEditingId(newFaq.id);
      }}
      onReorder={(u) => { setFaqs(u); save('faqs', u); }}
      addLabel="+ Tambah Soalan FAQ"
      emptyLabel="Tiada soalan FAQ lagi."
    />
  );
}
