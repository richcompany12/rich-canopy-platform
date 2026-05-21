'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.message) {
      alert('이름과 문의내용은 필수입니다.');
      return;
    }
    setLoading(true);
    try {
      await emailjs.send(
        'service_42qx93g',  
        'template_9g2xtsv',
        {
          name: form.name,
          phone: form.phone,
          message: form.message,
        },
        'GjY5J46VmVNn0x4_e'
      );
      setSent(true);
      setForm({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('전송 실패. 다시 시도해주세요.');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', backgroundColor: '#161b22', border: '0.5px solid #21262D',
    color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px',
    marginBottom: '12px',
  };

  return (
    <section id="contact" style={{ backgroundColor: '#111418', padding: '60px 24px' }}>

      <div style={{ marginBottom: '40px' }}>
        <p style={{ color: '#4FC3F7', fontSize: '11px', letterSpacing: '3px', marginBottom: '8px' }}>CONTACT</p>
        <h2 style={{ color: '#F0F6FC', fontSize: '26px', fontWeight: '300', letterSpacing: '-0.5px' }}>
          문의 <strong style={{ fontWeight: '700' }}>하기.</strong>
        </h2>
        <p style={{ color: '#8B949E', fontSize: '13px', marginTop: '12px', lineHeight: '1.7' }}>
          장착 문의, 견적 상담, 차종 확인 등<br />편하신 방법으로 연락주세요.
        </p>
      </div>

      {sent ? (
        <div style={{
          backgroundColor: '#0d2137', border: '0.5px solid #4FC3F7',
          borderRadius: '8px', padding: '24px', textAlign: 'center',
        }}>
          <p style={{ color: '#4FC3F7', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>✓ 문의가 접수되었습니다!</p>
          <p style={{ color: '#8B949E', fontSize: '13px' }}>빠른 시일 내에 연락드리겠습니다.</p>
          <button onClick={() => setSent(false)} style={{
            marginTop: '16px', backgroundColor: 'transparent',
            border: '0.5px solid #21262D', color: '#8B949E',
            padding: '8px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
          }}>다시 문의하기</button>
        </div>
      ) : (
        <div style={{ backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '8px', padding: '24px' }}>
          <div>
            <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>이름 *</label>
            <input type="text" placeholder="홍길동" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle} />
          </div>
          <div>
            <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>연락처</label>
            <input type="tel" placeholder="010-4747-4763" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle} />
          </div>
          <div>
            <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>문의내용 *</label>
            <textarea placeholder="차종, 문의내용을 입력해주세요..." value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <button onClick={handleSubmit} disabled={loading} style={{
            backgroundColor: '#4FC3F7', color: '#111418',
            border: 'none', padding: '14px', borderRadius: '4px',
            fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%',
          }}>
            {loading ? '전송 중...' : '문의 보내기'}
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
        <a href="tel:010-4747-4763" style={{
          backgroundColor: '#161b22', border: '0.5px solid #21262D',
          borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none',
        }}>
          <div style={{ width: '44px', height: '44px', backgroundColor: '#0d2137', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📞</div>
          <div>
            <p style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '500' }}>전화 문의</p>
            <p style={{ color: '#8B949E', fontSize: '12px', marginTop: '2px' }}>010-0000-0000</p>
          </div>
        </a>

        <a href="https://open.kakao.com/o/sqIlZVvi" target="_blank" style={{
          backgroundColor: '#1a1500', border: '0.5px solid #3d3000',
          borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none',
        }}>
          <div style={{ width: '44px', height: '44px', backgroundColor: '#FEE500', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>💛</div>
          <div>
            <p style={{ color: '#FEE500', fontSize: '14px', fontWeight: '500' }}>카카오톡 문의</p>
            <p style={{ color: '#8B949E', fontSize: '12px', marginTop: '2px' }}>카카오 오픈채팅으로 빠른 상담</p>
          </div>
        </a>
      </div>

    </section>
  );
}