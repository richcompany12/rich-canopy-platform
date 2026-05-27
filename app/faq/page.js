'use client';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      setFaqs(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetch();
  }, []);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '12px', letterSpacing: '3px', marginBottom: '12px' }}>
            FAQ
          </p>
          <h1 style={{ color: '#F0F6FC', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            자주 묻는 질문
          </h1>
          <p style={{ color: '#8B949E', fontSize: '14px' }}>
            캐노피 설치에 관해 궁금한 점을 확인하세요
          </p>
        </div>

        {/* FAQ 목록 */}
        {loading ? (
          <p style={{ color: '#484F58', textAlign: 'center' }}>불러오는 중...</p>
        ) : faqs.length === 0 ? (
          <p style={{ color: '#484F58', textAlign: 'center' }}>등록된 FAQ가 없습니다.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((item) => (
              <div
                key={item.id}
                style={{
                  border: '0.5px solid',
                  borderColor: openId === item.id ? '#4FC3F7' : '#21262D',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* 질문 (클릭 토글) */}
                <button
                  onClick={() => toggle(item.id)}
                  style={{
                    width: '100%', textAlign: 'left',
                    backgroundColor: openId === item.id ? '#0d2137' : '#161b22',
                    padding: '18px 20px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', border: 'none',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <span style={{ color: '#F0F6FC', fontSize: '15px', fontWeight: '500', lineHeight: '1.5' }}>
                    Q. {item.question}
                  </span>
                  <span style={{
                    color: '#4FC3F7', fontSize: '18px', flexShrink: 0, marginLeft: '16px',
                    transform: openId === item.id ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    display: 'inline-block',
                  }}>+</span>
                </button>

                {/* 답변 */}
                {openId === item.id && (
                  <div style={{
                    backgroundColor: '#111418',
                    padding: '18px 20px',
                    borderTop: '0.5px solid #21262D',
                  }}>
                    <p style={{
                      color: '#8B949E', fontSize: '14px',
                      lineHeight: '1.8', whiteSpace: 'pre-wrap',
                    }}>
                      A. {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 추가 문의 안내 */}
        <div style={{
          marginTop: '48px', textAlign: 'center',
          padding: '28px', borderRadius: '8px',
          border: '0.5px solid #21262D', backgroundColor: '#161b22',
        }}>
          <p style={{ color: '#8B949E', fontSize: '14px', marginBottom: '16px' }}>
            원하는 답변을 찾지 못하셨나요?
          </p>
          <a href="/#contact" style={{
            backgroundColor: '#4FC3F7', color: '#111418',
            padding: '12px 28px', borderRadius: '4px',
            fontSize: '13px', fontWeight: '700', letterSpacing: '1px',
          }}>
            문의하기
          </a>
        </div>

      </div>
    </main>
  );
}