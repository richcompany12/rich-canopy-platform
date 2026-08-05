// app/installer-apply/page.js
'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function InstallerApplyPage() {
  const [form, setForm] = useState({ name: '', phone: '', region: '', experience: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const scrollToForm = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.region) {
      alert('이름, 연락처, 지역은 필수입니다.');
      return;
    }
    setLoading(true);
    try {
      const message =
        `[장착점 지원 문의]\n` +
        `지역: ${form.region}\n` +
        `관련 경험: ${form.experience || '없음'}`;

      await emailjs.send(
        'service_42qx93g',
        'template_9g2xtsv',
        {
          name: form.name,
          phone: form.phone,
          message,
        },
        'GjY5J46VmVNn0x4_e'
      );
      setSent(true);
      setForm({ name: '', phone: '', region: '', experience: '' });
    } catch (error) {
      console.error(error);
      alert('전송 실패. 다시 시도해주세요.');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', backgroundColor: '#161b22', border: '0.5px solid #21262D',
    color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px',
    marginBottom: '12px', boxSizing: 'border-box',
  };

  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh' }}>

      {/* 소개 섹션 */}
      <section style={{ padding: '60px 24px 40px', maxWidth: '720px', margin: '0 auto' }}>
        <p style={{ color: '#4FC3F7', fontSize: '11px', letterSpacing: '3px', marginBottom: '10px' }}>
          INSTALLER PARTNER
        </p>
        <h1 style={{ color: '#F0F6FC', fontSize: '26px', fontWeight: '700', marginBottom: '16px', lineHeight: '1.4' }}>
          리치캐노피 예비 장착점 모집
        </h1>
        <p style={{ color: '#8B949E', fontSize: '14.5px', lineHeight: '1.9', marginBottom: '32px' }}>
          제주도 첫 장착점이 성공적으로 시작되었습니다. 리치캐노피는 전국으로
          장착점 네트워크를 넓혀가고 있으며, 지역 특성에 맞는 합리적인 장착
          비용을 함께 협의합니다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '🤝', title: '첫 작업 직접 방문 지원', desc: '첫 예약 건은 직접 방문해 장착을 도와드리며 노하우를 전수합니다.' },
            { icon: '💰', title: '합리적인 수익 구조', desc: '지역 특성을 반영한 장착 비용을 함께 협의합니다.' },
            { icon: '📍', title: '지역 선점 기회', desc: '지역별로 순차 모집되는 만큼, 먼저 지원할수록 유리합니다.' },
          ].map((item) => (
            <div key={item.title} style={{
              backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '8px',
              padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <div>
                <p style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{item.title}</p>
                <p style={{ color: '#8B949E', fontSize: '13px', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={scrollToForm} style={{
          width: '100%', backgroundColor: '#4FC3F7', color: '#111418',
          border: 'none', padding: '16px', borderRadius: '6px',
          fontSize: '15px', fontWeight: '700', cursor: 'pointer',
        }}>
          장착점 지원 문의하기
        </button>
      </section>

      {/* 지원 폼 */}
      <section id="apply-form" style={{ padding: '20px 24px 80px', maxWidth: '720px', margin: '0 auto' }}>
        {sent ? (
          <div style={{
            backgroundColor: '#0d2137', border: '0.5px solid #4FC3F7',
            borderRadius: '8px', padding: '24px', textAlign: 'center',
          }}>
            <p style={{ color: '#4FC3F7', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>✓ 지원이 접수되었습니다!</p>
            <p style={{ color: '#8B949E', fontSize: '13px' }}>빠른 시일 내에 연락드리겠습니다.</p>
            <button onClick={() => setSent(false)} style={{
              marginTop: '16px', backgroundColor: 'transparent',
              border: '0.5px solid #21262D', color: '#8B949E',
              padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
            }}>다시 지원하기</button>
          </div>
        ) : (
          <div style={{ backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '8px', padding: '24px' }}>
            <p style={{ color: '#F0F6FC', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>장착점 지원 문의</p>

            <div>
              <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>이름 *</label>
              <input type="text" placeholder="홍길동" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle} />
            </div>
            <div>
              <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>연락처 *</label>
              <input type="tel" placeholder="010-0000-0000" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={inputStyle} />
            </div>
            <div>
              <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>지역 (시/군) *</label>
              <input type="text" placeholder="예: 제주시, 서귀포시" value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                style={inputStyle} />
            </div>
            <div>
              <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>관련 경험 (선택)</label>
              <textarea placeholder="오토바이 정비/판매점 운영 경험, 관련 업종 경력 등을 자유롭게 적어주세요" value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <button onClick={handleSubmit} disabled={loading} style={{
              backgroundColor: '#4FC3F7', color: '#111418',
              border: 'none', padding: '14px', borderRadius: '4px',
              fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%',
            }}>
              {loading ? '전송 중...' : '지원 문의 보내기'}
            </button>
          </div>
        )}
      </section>

    </main>
  );
}