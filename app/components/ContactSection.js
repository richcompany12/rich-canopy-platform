export default function ContactSection() {
  return (
    <section id="contact" style={{ backgroundColor: '#111418', padding: '60px 24px' }}>

      <div style={{ marginBottom: '40px' }}>
        <p style={{
          color: '#4FC3F7',
          fontSize: '11px',
          letterSpacing: '3px',
          marginBottom: '8px',
        }}>CONTACT</p>
        <h2 style={{
          color: '#F0F6FC',
          fontSize: '26px',
          fontWeight: '300',
          letterSpacing: '-0.5px',
        }}>문의 <strong style={{ fontWeight: '700' }}>하기.</strong></h2>
        <p style={{
          color: '#8B949E',
          fontSize: '13px',
          marginTop: '12px',
          lineHeight: '1.7',
        }}>장착 문의, 견적 상담, 차종 확인 등<br />편하신 방법으로 연락주세요.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        <a href="tel:010-0000-0000" style={{
          backgroundColor: '#161b22',
          border: '0.5px solid #21262D',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            backgroundColor: '#0d2137',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}>📞</div>
          <div>
            <p style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '500' }}>전화 문의</p>
            <p style={{ color: '#8B949E', fontSize: '12px', marginTop: '2px' }}>010-0000-0000</p>
          </div>
        </a>

        <a href="sms:010-0000-0000" style={{
          backgroundColor: '#161b22',
          border: '0.5px solid #21262D',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            backgroundColor: '#0d2137',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}>💬</div>
          <div>
            <p style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '500' }}>문자 문의</p>
            <p style={{ color: '#8B949E', fontSize: '12px', marginTop: '2px' }}>문자로 차종 + 문의내용 보내주세요</p>
          </div>
        </a>

        <a href="https://open.kakao.com/o/리치캐노피" target="_blank" style={{
          backgroundColor: '#1a1500',
          border: '0.5px solid #3d3000',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            backgroundColor: '#FEE500',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}>💛</div>
          <div>
            <p style={{ color: '#FEE500', fontSize: '14px', fontWeight: '500' }}>카카오톡 문의</p>
            <p style={{ color: '#8B949E', fontSize: '12px', marginTop: '2px' }}>카카오 오픈채팅으로 빠른 상담</p>
          </div>
        </a>

      </div>
    </section>
  );
}