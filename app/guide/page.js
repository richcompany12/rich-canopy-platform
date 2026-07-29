// app/guide/page.js
'use client';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    let videoId = null;
    if (u.hostname.includes('youtu.be')) {
      videoId = u.pathname.slice(1);
    } else if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') videoId = u.searchParams.get('v');
      else if (u.pathname.startsWith('/embed/')) videoId = u.pathname.split('/embed/')[1];
      else if (u.pathname.startsWith('/shorts/')) videoId = u.pathname.split('/shorts/')[1];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export default function GuidePage() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchSteps = async () => {
      const q = query(collection(db, 'guideSteps'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      setSteps(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchSteps();
  }, []);

  const shareGuide = () => {
    const url = 'https://richcanopy.kr/guide';
    if (navigator.share) {
      navigator.share({ title: '리치캐노피 장착 가이드', text: '리치캐노피 셀프 장착 가이드', url });
    } else {
      navigator.clipboard.writeText(url);
      alert('가이드 링크가 복사되었습니다.');
    }
  };

  if (loading) {
    return (
      <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '60px 20px' }}>
        <p style={{ color: '#484F58', textAlign: 'center' }}>불러오는 중...</p>
      </main>
    );
  }

  if (steps.length === 0) {
    return (
      <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '60px 20px' }}>
        <p style={{ color: '#484F58', textAlign: 'center' }}>등록된 가이드가 없습니다.</p>
      </main>
    );
  }

  const step = steps[current];
  const total = steps.length;
  const images = step.images || [];
  const isPending = step.status === 'pending';
  const embedUrl = getYoutubeEmbedUrl(step.videoUrl);

  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '12px', letterSpacing: '3px', marginBottom: '12px' }}>
            SELF ASSEMBLY GUIDE
          </p>
          <h1 style={{ color: '#F0F6FC', fontSize: '26px', fontWeight: '700', marginBottom: '8px' }}>
            리치캐노피 장착 가이드
          </h1>
          <p style={{ color: '#8B949E', fontSize: '13px' }}>
            순서대로 천천히 따라 하시면 누구나 장착할 수 있습니다
          </p>
          <button
            onClick={shareGuide}
            style={{
              marginTop: '16px',
              backgroundColor: 'transparent',
              border: '0.5px solid #21262D',
              borderRadius: '4px',
              color: '#8B949E',
              fontSize: '12px',
              padding: '8px 20px',
              cursor: 'pointer',
              letterSpacing: '1px',
            }}>
            🔗 가이드 링크 공유
          </button>
        </div>

        {/* 진행 바 */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#8B949E', fontSize: '12px', textAlign: 'center', marginBottom: '8px' }}>
            STEP {current + 1} / {total}
          </p>
          <div style={{ display: 'flex', gap: '4px' }}>
            {steps.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setCurrent(i)}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  backgroundColor: i <= current ? '#4FC3F7' : '#21262D',
                  transition: 'background-color 0.2s',
                }}
              />
            ))}
          </div>
        </div>

        {/* 스텝 카드 */}
        <div style={{
          border: '0.5px solid #21262D',
          borderRadius: '8px',
          backgroundColor: '#161b22',
          padding: '28px 24px',
          marginBottom: '20px',
        }}>
          <h2 style={{ color: '#F0F6FC', fontSize: '19px', fontWeight: '600', marginBottom: '20px' }}>
            PART {current + 1}. {step.title}
          </h2>

          {/* 이미지 영역 */}
          {images.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              {images.map((src, i) => (
                <div key={i}>
                  <img
                    src={src}
                    alt={`${step.title} 사진${i + 1}`}
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 3',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      display: 'block',
                    }}
                  />
                  <p style={{ color: '#4FC3F7', fontSize: '12px', marginTop: '6px', textAlign: 'center' }}>
                    사진 {i + 1}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              height: '180px',
              backgroundColor: '#0d1117',
              border: '1px dashed #21262D',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#484F58',
              fontSize: '13px',
              marginBottom: '20px',
            }}>
              📷 사진 업로드 예정
            </div>
          )}

          {/* 영상 */}
          {embedUrl && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '6px', overflow: 'hidden' }}>
                <iframe
                  src={embedUrl}
                  title={`${step.title} 영상`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            </div>
          )}

          {/* 본문 */}
          {isPending ? (
            <p style={{ color: '#8B949E', fontSize: '14px', lineHeight: '1.8' }}>
              이 단계는 아직 상세 내용을 준비 중입니다. 조립 중 궁금한 점이 있으면
              하단 문의처로 편하게 연락 주세요.
            </p>
          ) : (
            <>
              <p style={{
                color: '#8B949E', fontSize: '14.5px',
                lineHeight: '1.9', whiteSpace: 'pre-wrap', marginBottom: step.caution ? '18px' : 0,
              }}>
                {step.content}
              </p>

              {step.caution && (
                <div style={{
                  backgroundColor: '#2b2410',
                  border: '0.5px solid #4a3c14',
                  borderRadius: '6px',
                  padding: '14px 16px',
                }}>
                  <p style={{ color: '#e8c468', fontSize: '13.5px', lineHeight: '1.8' }}>
                    ⚠ 주의사항: {step.caution}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* 이전/다음 버튼 */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: '0.5px solid #21262D',
              borderRadius: '6px',
              color: current === 0 ? '#30363D' : '#8B949E',
              fontSize: '14px',
              padding: '14px',
              cursor: current === 0 ? 'default' : 'pointer',
            }}>
            ← 이전 단계
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            disabled={current === total - 1}
            style={{
              flex: 1,
              backgroundColor: current === total - 1 ? '#21262D' : '#4FC3F7',
              border: 'none',
              borderRadius: '6px',
              color: current === total - 1 ? '#484F58' : '#111418',
              fontSize: '14px',
              fontWeight: '700',
              padding: '14px',
              cursor: current === total - 1 ? 'default' : 'pointer',
            }}>
            다음 단계 →
          </button>
        </div>

        {/* 문의 안내 */}
        <div style={{
          marginTop: '40px', textAlign: 'center',
          padding: '24px', borderRadius: '8px',
          border: '0.5px solid #21262D', backgroundColor: '#161b22',
        }}>
          <p style={{ color: '#8B949E', fontSize: '13.5px', marginBottom: '14px' }}>
            장착 중 막히는 부분이 있으면 편하게 문의해 주세요
          </p>
          <a href="/#contact" style={{
            backgroundColor: '#4FC3F7', color: '#111418',
            padding: '11px 26px', borderRadius: '4px',
            fontSize: '13px', fontWeight: '700', letterSpacing: '1px',
          }}>
            문의하기
          </a>
        </div>

      </div>
    </main>
  );
}