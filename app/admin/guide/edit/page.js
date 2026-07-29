// app/admin/guide/edit/page.js
'use client';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditGuideStepPage() {
  return (
    <Suspense fallback={
      <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '48px 20px' }}>
        <p style={{ color: '#484F58', textAlign: 'center' }}>불러오는 중...</p>
      </main>
    }>
      <EditGuideStepForm />
    </Suspense>
  );
}

function EditGuideStepForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchStep = async () => {
      const snap = await getDoc(doc(db, 'guideSteps', id));
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          order: data.order ?? 1,
          title: data.title ?? '',
          status: data.status ?? 'pending',
          content: data.content ?? '',
          caution: data.caution ?? '',
          imagesText: (data.images || []).join('\n'),
        });
      }
    };
    fetchStep();
  }, [id]);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const images = form.imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    await updateDoc(doc(db, 'guideSteps', id), {
      order: Number(form.order),
      title: form.title,
      status: form.status,
      content: form.content,
      caution: form.caution,
      images,
    });

    router.push('/admin/guide');
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
          가이드 단계 수정
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Field label="순서 (숫자)">
            <input
              type="number"
              value={form.order}
              onChange={(e) => handleChange('order', e.target.value)}
              style={inputStyle}
              required
            />
          </Field>

          <Field label="제목">
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              style={inputStyle}
              required
            />
          </Field>

          <Field label="상태">
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              style={inputStyle}
            >
              <option value="confirmed">확정 (내용 표시)</option>
              <option value="pending">준비 중 (안내 문구만 표시)</option>
            </select>
          </Field>

          <Field label="설명 내용 (줄바꿈 그대로 표시됩니다)">
            <textarea
              value={form.content}
              onChange={(e) => handleChange('content', e.target.value)}
              style={{ ...inputStyle, minHeight: '160px', resize: 'vertical' }}
            />
          </Field>

          <Field label="주의사항 (선택)">
            <textarea
              value={form.caution}
              onChange={(e) => handleChange('caution', e.target.value)}
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            />
          </Field>

          <Field label="사진 URL (한 줄에 하나씩 입력)">
            <textarea
              value={form.imagesText}
              onChange={(e) => handleChange('imagesText', e.target.value)}
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
              placeholder="https://..."
            />
          </Field>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <a href="/admin/guide" style={{ ...btnStyle, backgroundColor: 'transparent', color: '#8B949E', border: '0.5px solid #21262D' }}>
              취소
            </a>
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
  width: '100%',
  backgroundColor: '#161b22',
  border: '0.5px solid #21262D',
  borderRadius: '6px',
  color: '#F0F6FC',
  fontSize: '14px',
  padding: '10px 12px',
  boxSizing: 'border-box',
};

const btnStyle = {
  flex: 1,
  textAlign: 'center',
  padding: '12px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '700',
  cursor: 'pointer',
  textDecoration: 'none',
};