'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

export default function FaqList() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFaqs = async () => {
    const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setFaqs(data);
    setLoading(false);
  };

  useEffect(() => { fetchFaqs(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제할까요?')) return;
    await deleteDoc(doc(db, 'faqs', id));
    fetchFaqs();
  };

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/admin/dashboard" style={{ color: '#484F58', fontSize: '13px' }}>← 대시보드</a>
          <h1 style={{ color: '#F0F6FC', fontSize: '20px', fontWeight: '600' }}>FAQ 관리</h1>
        </div>
        <a href="/admin/faq/new" style={{
          backgroundColor: '#4FC3F7', color: '#111418',
          padding: '10px 20px', borderRadius: '4px',
          fontSize: '12px', fontWeight: '700', letterSpacing: '1px',
        }}>+ 새 등록</a>
      </div>

      {loading ? (
        <p style={{ color: '#484F58' }}>불러오는 중...</p>
      ) : faqs.length === 0 ? (
        <p style={{ color: '#484F58' }}>등록된 FAQ가 없습니다.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((item) => (
            <div key={item.id} style={{
              backgroundColor: '#161b22',
              border: '0.5px solid #21262D',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{
                backgroundColor: '#0d2137', color: '#4FC3F7',
                fontSize: '11px', padding: '2px 8px', borderRadius: '2px',
                whiteSpace: 'nowrap', marginTop: '2px',
              }}>순서 {item.order ?? '-'}</div>

              <div style={{ flex: 1 }}>
                <p style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
                  Q. {item.question}
                </p>
                <p style={{ color: '#8B949E', fontSize: '12px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {item.answer}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <a href={`/admin/faq/edit?id=${item.id}`} style={{
                  border: '0.5px solid #21262D', color: '#8B949E',
                  padding: '8px 12px', borderRadius: '4px', fontSize: '11px',
                }}>수정</a>
                <button onClick={() => handleDelete(item.id)} style={{
                  border: '0.5px solid #3d1a1a', color: '#E63946',
                  backgroundColor: 'transparent',
                  padding: '8px 12px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer',
                }}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}