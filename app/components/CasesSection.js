'use client';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query, limit, where } from 'firebase/firestore';

export default function CasesSection() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      const q = query(
  collection(db, 'cases'),
  where('featured', '==', true),
  orderBy('createdAt', 'desc'),
  limit(6)
);
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCases(data);
      setLoading(false);
    };
    fetchCases();
  }, []);

  return (
    <section style={{ backgroundColor: '#111418', padding: '60px 24px' }}>

      <div style={{ marginBottom: '32px' }}>
        <p style={{
          color: '#4FC3F7',
          fontSize: '11px',
          letterSpacing: '3px',
          marginBottom: '8px',
        }}>INSTALLATION CASES</p>
        <h2 style={{
          color: '#F0F6FC',
          fontSize: '26px',
          fontWeight: '300',
          letterSpacing: '-0.5px',
        }}>Recent <strong style={{ fontWeight: '700' }}>Works.</strong></h2>
      </div>

      {loading ? (
        <p style={{ color: '#484F58', fontSize: '13px' }}>불러오는 중...</p>
      ) : cases.length === 0 ? (
        <p style={{ color: '#484F58', fontSize: '13px' }}>등록된 작업사례가 없습니다.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cases.map((item) => (
            <a key={item.id} href={`/cases/detail?id=${item.id}`} style={{
              backgroundColor: '#161b22',
              border: '0.5px solid #21262D',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'block',
            }}>
              <div style={{
                height: '200px',
                overflow: 'hidden',
                backgroundColor: '#1a1f26',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {item.representImage || item.images?.[0] ? (
  <img src={item.representImage || item.images[0]} alt={item.model} style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }} />
) : (
  <span style={{ color: '#484F58', fontSize: '12px', letterSpacing: '2px' }}>PHOTO COMING SOON</span>
)}
              </div>

              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    backgroundColor: '#0d2137',
                    color: '#4FC3F7',
                    fontSize: '10px',
                    letterSpacing: '1px',
                    padding: '3px 10px',
                    borderRadius: '2px',
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

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <a href="/cases" style={{
          border: '0.5px solid #21262D',
          color: '#8B949E',
          padding: '12px 32px',
          fontSize: '12px',
          letterSpacing: '2px',
          borderRadius: '2px',
          display: 'inline-block',
        }}>VIEW ALL CASES</a>
      </div>

    </section>
  );
}