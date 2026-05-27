'use client';
import { useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function FaqNew() {
  const router = useRouter();
  const [form, setForm] = useState({ question: '', answer: '', order: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      alert('질문과 답변을 모두 입력하세요.');
      return;
    }
    setSaving(true);
    await addDoc(collection(db, 'faqs'), {
      question: form.question.trim(),
      answer: form.answer.trim(),
      order: Number(form.order) || 99,
      createdAt: serverTimestamp(),
    });
    router.push('/admin/faq');
  };

  const inputStyle = {
    width: '100%', backgroundColor: '#161b22',
    border: '0.5px solid #21262D', borderRadius: '4px',
    color: '#F0F6FC', padding: '10px 12px', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/admin/faq" style={{ color: '#484F58', fontSize: '13px' }}>← FAQ 목록</a>
        <h1 style={{ color: '#F0F6FC', fontSize: '20px', fontWeight: '600' }}>FAQ 등록</h1>
      </div>

      <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        <div>
          <label style={{ color: '#8B949E', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
            노출 순서 (숫자가 작을수록 위에 표시)
          </label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
            placeholder="예: 1"
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
            placeholder="자주 묻는 질문을 입력하세요"
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
            placeholder="답변을 입력하세요"
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