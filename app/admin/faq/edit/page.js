'use client';
import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function FaqEditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState({ question: '', answer: '', order: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const snap = await getDoc(doc(db, 'faqs', id));
      if (snap.exists()) {
        const d = snap.data();
        setForm({ question: d.question || '', answer: d.answer || '', order: d.order ?? '' });
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      alert('질문과 답변을 모두 입력하세요.');
      return;
    }
    setSaving(true);
    await updateDoc(doc(db, 'faqs', id), {
      question: form.question.trim(),
      answer: form.answer.trim(),
      order: Number(form.order) || 99,
    });
    router.push('/admin/faq');
  };

  const inputStyle = {
    width: '100%', backgroundColor: '#161b22',
    border: '0.5px solid #21262D', borderRadius: '4px',
    color: '#F0F6FC', padding: '10px 12px', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box',
  };

  if (loading) return <p style={{ color: '#484F58', padding: '24px' }}>불러오는 중...</p>;

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/admin/faq" style={{ color: '#484F58', fontSize: '13px' }}>← FAQ 목록</a>
        <h1 style={{ color: '#F0F6FC', fontSize: '20px', fontWeight: '600' }}>FAQ 수정</h1>
      </div>

      <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        <div>
          <label style={{ color: '#8B949E', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
            노출 순서
          </label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
            style={{ ...inputStyle, width: '120px' }}
          />
        </div>

        <div>
          <label style={{ color: '#8B949E', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
            질문 *
          </label>
          <input
            type="text"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ color: '#8B949E', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
            답변 *
          </label>
          <textarea
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            rows={6}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              backgroundColor: '#4FC3F7', color: '#111418',
              padding: '12px 28px', borderRadius: '4px',
              fontSize: '13px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer',
              border: 'none', opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? '저장 중...' : '저장'}
          </button>
          <a href="/admin/faq" style={{
            border: '0.5px solid #21262D', color: '#8B949E',
            padding: '12px 28px', borderRadius: '4px', fontSize: '13px',
          }}>취소</a>
        </div>

      </div>
    </div>
  );
}

export default function FaqEdit() {
  return (
    <Suspense fallback={<p style={{ color: '#484F58', padding: '24px' }}>불러오는 중...</p>}>
      <FaqEditForm />
    </Suspense>
  );
}