'use client';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Suspense } from 'react';

function CasesListContent() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      const q = query(collection(db, 'cases'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCases(data);
      setLoading(false);
    };
    fetchCases();
  }, []);

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px' }}>

      <div style={{ marginBottom: '32px' }}>
        <a href="/" style={{ color: '#484F58', fontSize: '13px' }}>← 홈으로</a>
        <h1 style={{ color: '#F0F6FC', fontSize: '26px', fontWeight: '300', marginTop: '12px' }}>
          All <strong style={{ fontWeight: '700' }}>Works.</strong>
        </h1>
        <p style={{ color: '#8B949E', fontSize: '13px', marginTop: '8px' }}>리치캐노피 전체 작업사례</p>
      </div>

      {loading ? (
        <p style={{ color: '#484F58' }}>불러오는 중...</p>
      ) : cases.length === 0 ? (
        <p style={{ color: '#484F58' }}>등록된 작업사례가 없습니다.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cases.map((item) => (
            <a key={item.id} href={`/cases/detail?id=${item.id}`} style={{
              backgroundColor: '#161b22',
              border: '0.5px solid #21262D',
              borderRadius: '8px',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'block',
            }}>
              <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#1a1f26', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.representImage || item.images?.[0] ? (
                  <img src={item.representImage || item.images[0]} alt={item.model} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                  }} />
                ) : (
                  <span style={{ color: '#484F58', fontSize: '12px', letterSpacing: '2px' }}>PHOTO COMING SOON</span>
                )}
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    backgroundColor: '#0d2137', color: '#4FC3F7',
                    fontSize: '10px', letterSpacing: '1px',
                    padding: '3px 10px', borderRadius: '2px',
                  }}>{item.tag || '작업사례'}</span>
                  <span style={{ color: '#484F58', fontSize: '11px' }}>{item.year}</span>
                </div>
                <p style={{ color: '#F0F6FC', fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>{item.model}</p>
                <p style={{ color: '#8B949E', fontSize: '12px' }}>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CasesPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#111418', minHeight: '100vh' }} />}>
      <CasesListContent />
    </Suspense>
  );
}