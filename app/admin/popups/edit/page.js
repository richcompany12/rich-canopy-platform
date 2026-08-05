// app/admin/popups/edit/page.js
'use client';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditPopupPage() {
  return (
    <Suspense fallback={
      <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '48px 20px' }}>
        <p style={{ color: '#484F58', textAlign: 'center' }}>불러오는 중...</p>
      </main>
    }>
      <EditPopupForm />
    </Suspense>
  );
}

function EditPopupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchPopup = async () => {
      const snap = await getDoc(doc(db, 'popups', id));
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          order: data.order ?? 1,
          title: data.title ?? '',
          imageUrl: data.imageUrl ?? '',
          linkUrl: data.linkUrl ?? '',
          startDate: data.startDate ?? '',
          endDate: data.endDate ?? '',
        });
      }
    };
    fetchPopup();
  }, [id]);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateDoc(doc(db, 'popups', id), {
      order: Number(form.order),
      title: form.title,
      imageUrl: form.imageUrl,
      linkUrl: form.linkUrl,
      startDate: form.startDate,
      endDate: form.endDate,
    });
    router.push('/admin/popups');
  };

  if (!id) {
    return (
      <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '48px 20px' }}>
        <p style={{ color: '#8B949E', textAlign: 'center' }}>잘못된 접근입니다.</p>
      </main>
    );
  }

  if (!form) {
    return (
      <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '48px 20px' }}>
        <p style={{ color: '#484F58', textAlign: 'center' }}>불러오는 중...</p>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '48px 20px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ color: '#F0F6FC', fontSize: '22px', fontWeight: '700', marginBottom: '28px' }}>
          팝업 수정
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Field label="노출 순서 (숫자, 여러 팝업이 겹칠 때 낮은 숫자부터 먼저 노출)">
            <input type="number" value={form.order} onChange={(e) => handleChange('order', e.target.value)} style={inputStyle} required />
          </Field>

          <Field label="제목 (선택, 팝업 내부에 표시됨)">
            <input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} style={inputStyle} />
          </Field>

          <Field label="팝업 이미지 URL">
            <input type="text" value={form.imageUrl} onChange={(e) => handleChange('imageUrl', e.target.value)} style={inputStyle} required />
          </Field>

          <Field label="클릭 시 이동할 링크 (선택)">
            <input type="text" value={form.linkUrl} onChange={(e) => handleChange('linkUrl', e.target.value)} style={inputStyle} />
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