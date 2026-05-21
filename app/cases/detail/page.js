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

  const keywords = [
    item.model, '스쿠터 캐노피', '바이크 캐노피', 'PCX 캐노피',
    '오토바이 캐노피', '오토바이 지붕', 'scooter canopy',
    ...(item.tags || [item.tag]),
  ].filter(Boolean).join(', ');

  return (
    <>
      {/* JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${item.model} 스쿠터 캐노피 장착 사례 - Rich Canopy`,
            "description": item.desc || `${item.model}에 리치캐노피 스쿠터 캐노피 시스템 장착 사례입니다.`,
            "image": item.representImage || item.images?.[0],
            "author": {
              "@type": "Organization",
              "name": "Rich Canopy",
              "url": "https://richcanopy.kr"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Rich Canopy - 프리미엄 스쿠터 캐노피 시스템",
              "url": "https://richcanopy.kr"
            },
            "keywords": keywords,
            "datePublished": item.createdAt?.toDate?.()?.toISOString(),
            "mainEntityOfPage": `https://richcanopy.kr/cases/detail?id=${id}`,
            ...(item.review && {
              "review": {
                "@type": "Review",
                "reviewBody": item.review,
                "author": { "@type": "Person", "name": "고객" }
              }
            }),
            ...(item.workTime && {
              "timeRequired": item.workTime
            }),
          })
        }}
      />

      <div style={{ backgroundColor: '#111418', minHeight: '100vh' }}>

        <div style={{ padding: '24px 24px 0' }}>
          <a href="/cases" style={{ color: '#484F58', fontSize: '13px' }}>← 목록으로</a>
        </div>

        {/* 메인 이미지 */}
        <div style={{ height: '300px', overflow: 'hidden', backgroundColor: '#1a1f26', marginTop: '16px' }}>
          {item.images?.[selectedImage] && (
            <img src={item.images[selectedImage]} alt={`${item.model} 스쿠터 캐노피 장착 - ${item.imageCaptions?.[selectedImage] || ''}`} style={{
              width: '100%', height: '100%', objectFit: 'cover',
            }} />
          )}
        </div>

        {/* 사진 설명 */}
        {item.imageCaptions?.[selectedImage] && (
          <div style={{ backgroundColor: '#161b22', padding: '10px 24px' }}>
            <p style={{ color: '#8B949E', fontSize: '12px' }}>{item.imageCaptions[selectedImage]}</p>
          </div>
        )}

        {/* 썸네일 */}
        {item.images?.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', padding: '12px 24px', overflowX: 'auto' }}>
            {item.images.map((url, i) => (
              <div key={i} style={{ flexShrink: 0 }}>
                <img src={url} alt={item.imageCaptions?.[i] || `${item.model} 캐노피 사진 ${i + 1}`}
                  onClick={() => setSelectedImage(i)} style={{
                    width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px',
                    border: selectedImage === i ? '2px solid #4FC3F7' : '2px solid transparent',
                    cursor: 'pointer',
                  }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: '24px' }}>

          {/* 태그 + 연도 */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            {(item.tags || (item.tag ? [item.tag] : [])).map((t, i) => (
              <span key={i} style={{
                backgroundColor: '#0d2137', color: '#4FC3F7',
                fontSize: '10px', letterSpacing: '1px',
                padding: '3px 10px', borderRadius: '2px',
              }}>{t}</span>
            ))}
            <span style={{ color: '#484F58', fontSize: '11px' }}>{item.year}</span>
            {item.workTime && (
              <span style={{ color: '#484F58', fontSize: '11px' }}>· 작업시간 {item.workTime}</span>
            )}
          </div>

          {/* 제목 */}
          <h1 style={{ color: '#F0F6FC', fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
            {item.model} 스쿠터 캐노피 장착
          </h1>
          <p style={{ color: '#8B949E', fontSize: '14px', marginBottom: '24px' }}>{item.desc}</p>

          {/* 사용 부품 */}
          {item.parts?.length > 0 && (
            <div style={{
              backgroundColor: '#161b22', border: '0.5px solid #21262D',
              borderRadius: '8px', padding: '16px', marginBottom: '24px',
            }}>
              <p style={{ color: '#4FC3F7', fontSize: '10px', letterSpacing: '2px', marginBottom: '12px' }}>사용 부품</p>
              {item.parts.map((part, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: i < item.parts.length - 1 ? '0.5px solid #21262D' : 'none' }}>
                  <span style={{ color: '#4FC3F7', fontSize: '10px' }}>▸</span>
                  <span style={{ color: '#8B949E', fontSize: '13px' }}>{part}</span>
                </div>
              ))}
            </div>
          )}

          {/* 작업 내용 */}
          {item.comment && (
            <div style={{
              borderLeft: '2px solid #4FC3F7',
              paddingLeft: '16px', marginBottom: '24px',
            }}>
              <p style={{ color: '#4FC3F7', fontSize: '10px', letterSpacing: '2px', marginBottom: '8px' }}>작업 내용</p>
              <p style={{ color: '#8B949E', fontSize: '14px', lineHeight: '1.8' }}>{item.comment}</p>
            </div>
          )}

          {/* 고객 후기 */}
          {item.review && (
            <div style={{
              backgroundColor: '#161b22', border: '0.5px solid #21262D',
              borderRadius: '8px', padding: '16px', marginBottom: '24px',
            }}>
              <p style={{ color: '#4FC3F7', fontSize: '10px', letterSpacing: '2px', marginBottom: '8px' }}>고객 후기</p>
              <p style={{ color: '#F0F6FC', fontSize: '14px', lineHeight: '1.8', fontStyle: 'italic' }}>"{item.review}"</p>
            </div>
          )}

          {/* SEO 키워드 텍스트 (자연스럽게) */}
          <div style={{ borderTop: '0.5px solid #21262D', paddingTop: '24px', marginBottom: '24px' }}>
            <p style={{ color: '#484F58', fontSize: '12px', lineHeight: '1.8' }}>
              {item.model} 스쿠터 캐노피 장착 사례입니다. 리치캐노피는 PCX, NMAX, Forza 등 다양한 차종에 오토바이 캐노피, 바이크 캐노피 시스템을 장착합니다. 배달 라이더부터 통근, 장거리 투어까지 모든 라이딩 스타일에 맞는 스쿠터 지붕 시스템을 제공합니다.
            </p>
          </div>

          {/* 문의 버튼 */}
          <a href="/#contact" style={{
            backgroundColor: '#4FC3F7', color: '#111418',
            padding: '14px 32px', borderRadius: '4px',
            fontSize: '13px', fontWeight: '700', letterSpacing: '1px',
            display: 'inline-block',
          }}>나도 장착 문의하기</a>

        </div>
      </div>
    </>
  );
}

export default function CaseDetail() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#111418', minHeight: '100vh' }} />}>
      <CaseDetailContent />
    </Suspense>
  );
}