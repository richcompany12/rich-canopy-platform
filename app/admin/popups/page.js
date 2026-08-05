// app/admin/popups/page.js
'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import {
  collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc,
} from 'firebase/firestore';

export default function AdminPopupsPage() {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPopups = async () => {
    setLoading(true);
    const q = query(collection(db, 'popups'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    setPopups(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('이 팝업을 영구 삭제할까요? (복구 불가)')) return;
    await deleteDoc(doc(db, 'popups', id));
    fetchPopups();
  };

  const moveStep = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= popups.length) return;
    const a = popups[index];
    const b = popups[target];
    await updateDoc(doc(db, 'popups', a.id), { order: b.order });
    await updateDoc(doc(db, 'popups', b.id), { order: a.order });
    fetchPopups();
  };

  const today = new Date();
  const statusOf = (p) => {
    const start = p.startDate ? new Date(p.startDate) : null;
    const end = p.endDate ? new Date(p.endDate) : null;
    if (start && today < start) return { label: '노출 예정', color: '#8B949E' };
    if (end && today > end) return { label: '노출 종료', color: '#484F58' };
    return { label: '노출 중', color: '#4FC3F7' };
  };

  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '48px 20px' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h1 style={{ color: '#F0F6FC', fontSize: '22px', fontWeight: '700' }}>팝업 관리</h1>
          <a href="/admin/popups/new" style={{
            backgroundColor: '#4FC3F7', color: '#111418',
            padding: '10px 20px', borderRadius: '4px',
            fontSize: '13px', fontWeight: '700',
          }}>
            + 새 팝업 추가
          </a>
        </div>

        {loading ? (
          <p style={{ color: '#484F58' }}>불러오는 중...</p>
        ) : popups.length === 0 ? (
          <p style={{ color: '#8B949E', fontSize: '14px', textAlign: 'center', padding: '60px 20px' }}>
            등록된 팝업이 없습니다.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {popups.map((p, i) => {
              const status = statusOf(p);
              return (
                <div key={p.id} style={{
                  border: '0.5px solid #21262D', borderRadius: '8px',
                  backgroundColor: '#161b22', padding: '14px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    {p.imageUrl && (
                      <img src={p.imageUrl} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                    )}
                    <div style={{ minWidth: 0 }}>
                      <p style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '500' }}>{p.title || '(제목 없음)'}</p>
                      <span style={{ fontSize: '11px', color: status.color }}>
                        {status.label} · {p.startDate || '시작일 없음'} ~ {p.endDate || '종료일 없음'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    <button onClick={() => moveStep(i, -1)} disabled={i === 0} style={iconBtnStyle}>↑</button>
                    <button onClick={() => moveStep(i, 1)} disabled={i === popups.length - 1} style={iconBtnStyle}>↓</button>
                    <a href={`/admin/popups/edit?id=${p.id}`} style={{ ...iconBtnStyle, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>수정</a>
                    <button onClick={() => handleDelete(p.id)} style={{ ...iconBtnStyle, color: '#f47174' }}>삭제</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

const iconBtnStyle = {
  backgroundColor: 'transparent',
  border: '0.5px solid #21262D',
  borderRadius: '4px',
  color: '#8B949E',
  fontSize: '12px',
  padding: '8px 12px',
  cursor: 'pointer',
};