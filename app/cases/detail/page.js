'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CaseDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchCase = async () => {
      const docRef = doc(db, 'cases', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };
    fetchCase();
  }, [id]);

  if (loading) return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#484F58' }}>불러오는 중...</p>
    </div>
  );

  if (!item) return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#484F58' }}>존재하지 않는 작업사례입니다.</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh' }}>

      <div style={{ padding: '24px 24px 0' }}>
        <a href="/cases" style={{ color: '#484F58', fontSize: '13px' }}>← 목록으로</a>
      </div>

      <div style={{ height: '300px', overflow: 'hidden', backgroundColor: '#1a1f26', marginTop: '16px' }}>
        {item.images?.[selectedImage] && (
          <img src={item.images[selectedImage]} alt={item.model} style={{
            width: '100%', height: '100%', objectFit: 'cover',
          }} />
        )}
      </div>

      {item.images?.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', padding: '12px 24px', overflowX: 'auto' }}>
          {item.images.map((url, i) => (
            <img key={i} src={url} alt="" onClick={() => setSelectedImage(i)} style={{
              width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px',
              border: selectedImage === i ? '2px solid #4FC3F7' : '2px solid transparent',
              cursor: 'pointer', flexShrink: 0,
            }} />
          ))}
        </div>
      )}

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{
            backgroundColor: '#0d2137', color: '#4FC3F7',
            fontSize: '10px', letterSpacing: '1px',
            padding: '3px 10px', borderRadius: '2px',
          }}>{item.tag || '작업사례'}</span>
          <span style={{ color: '#484F58', fontSize: '11px' }}>{item.year}</span>
        </div>

        <h1 style={{ color: '#F0F6FC', fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>{item.model}</h1>
        <p style={{ color: '#8B949E', fontSize: '14px', marginBottom: '24px' }}>{item.desc}</p>

        {item.comment && (
          <div style={{
            borderLeft: '2px solid #4FC3F7',
            paddingLeft: '16px',
            marginTop: '24px',
          }}>
            <p style={{ color: '#4FC3F7', fontSize: '10px', letterSpacing: '2px', marginBottom: '8px' }}>COMMENT</p>
            <p style={{ color: '#8B949E', fontSize: '14px', lineHeight: '1.8' }}>{item.comment}</p>
          </div>
        )}

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '0.5px solid #21262D' }}>
          <a href="/#contact" style={{
            backgroundColor: '#4FC3F7', color: '#111418',
            padding: '14px 32px', borderRadius: '4px',
            fontSize: '13px', fontWeight: '700', letterSpacing: '1px',
            display: 'inline-block',
          }}>문의하기</a>
        </div>
      </div>
    </div>
  );
}

export default function CaseDetail() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#111418', minHeight: '100vh' }} />}>
      <CaseDetailContent />
    </Suspense>
  );
}