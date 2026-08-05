// app/admin/popups/new/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function NewPopupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    order: 1,
    title: '',
    imageUrl: '',
    linkUrl: '',
    startDate: '',
    endDate: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await addDoc(collection(db, 'popups'), {
      order: Number(form.order),
      title: form.title,
      imageUrl: form.imageUrl,
      linkUrl: form.linkUrl,
      startDate: form.startDate,
      endDate: form.endDate,
    });
    router.push('/admin/popups');
  };

  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '48px 20px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ color: '#F0F6FC', fontSize: '22px', fontWeight: '700', marginBottom: '28px' }}>
          새 팝업 추가
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Field label="노출 순서 (숫자, 여러 팝업이 겹칠 때 낮은 숫자부터 먼저 노출)">
            <input type="number" value={form.order} onChange={(e) => handleChange('order', e.target.value)} style={inputStyle} required />
          </Field>

          <Field label="제목 (선택, 팝업 내부에 표시됨)">
            <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} style={inputStyle} placeholder="예: 예비 장착점 모집" />
          </Field>

          <Field label="팝업 이미지 URL">
            <input type="text" value={form.imageUrl} onChange={(e) => handleChange('imageUrl', e.target.value)} style={inputStyle} placeholder="https://..." required />
          </Field>

          <Field label="클릭 시 이동할 링크 (선택)">
            <input type="text" value={form.linkUrl} onChange={(e) => handleChange('linkUrl', e.target.value)} style={inputStyle} placeholder="/#contact 또는 https://..." />
          </Field>

          <Field label="노출 시작일">
            <input type="date" value={form.startDate} onChange={(e) => handleChange('startDate', e.target.value)} style={inputStyle} />
          </Field>

          <Field label="노출 종료일">
            <input type="date" value={form.endDate} onChange={(e) => handleChange('endDate', e.target.value)} style={inputStyle} />
          </Field>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <a href="/admin/popups" style={{ ...btnStyle, backgroundColor: 'transparent', color: '#8B949E', border: '0.5px solid #21262D' }}>취소</a>
            <button type="submit" disabled={saving} style={{ ...btnStyle, backgroundColor: '#4FC3F7', color: '#111418', border: 'none' }}>
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ color: '#8B949E', fontSize: '13px', display: 'block', marginBottom: '6px' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '6px',
  color: '#F0F6FC', fontSize: '14px', padding: '10px 12px', boxSizing: 'border-box',
};

const btnStyle = {
  flex: 1, textAlign: 'center', padding: '12px', borderRadius: '6px',
  fontSize: '14px', fontWeight: '700', cursor: 'pointer', textDecoration: 'none',
};