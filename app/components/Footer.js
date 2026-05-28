'use client';

export default function Footer() {
  const copyAddress = () => {
    navigator.clipboard.writeText('경기도 화성시 동탄반송길28 102호');
    alert('주소가 복사되었습니다.');
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://richcanopy.kr');
    alert('링크가 복사되었습니다.');
  };

  const shareKakao = () => {
    const url = `https://open.kakao.com/o/sqIlZVvi`;
    window.open(url, '_blank');
  };

  const shareLink = (url, text) => {
    if (navigator.share) {
      navigator.share({ title: '리치캐노피', text, url });
    } else {
      navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다.');
    }
  };

  return (
    <footer style={{
      backgroundColor: '#0d1117',
      borderTop: '0.5px solid #21262D',
      padding: '40px 24px 60px',
    }}>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#F0F6FC', fontSize: '15px', fontWeight: '600', letterSpacing: '3px' }}>RICH CANOPY</p>
        <p style={{ color: '#4FC3F7', fontSize: '9px', letterSpacing: '2px', marginTop: '4px' }}>PREMIUM SCOOTER CANOPY SYSTEMS</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
        {[
          { label: 'CASES', href: '#cases' },
          { label: 'RAIN TEST', href: '#rain' },
          { label: 'FAQ', href: '/faq' },
          { label: 'CONTACT', href: '#contact' },
        ].map((item) => (
          <a key={item.label} href={item.href} style={{
            color: '#484F58',
            fontSize: '12px',
            letterSpacing: '2px',
          }}>{item.label}</a>
        ))}
      </div>

      {/* 공유하기 */}
      <div style={{
        borderTop: '0.5px solid #21262D',
        paddingTop: '24px',
        marginBottom: '24px',
      }}>
        <p style={{ color: '#484F58', fontSize: '10px', letterSpacing: '2px', marginBottom: '12px' }}>SHARE</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => shareLink('https://richcanopy.kr', 'PCX·NMAX 캐노피 장착 전문 리치캐노피')}
            style={{
              backgroundColor: '#161b22',
              border: '0.5px solid #21262D',
              borderRadius: '4px',
              color: '#8B949E',
              fontSize: '11px',
              padding: '8px 14px',
              cursor: 'pointer',
              letterSpacing: '1px',
            }}>
            🏠 홈페이지 공유
          </button>
          <button
            onClick={() => shareLink('https://richcanopy.kr/faq', 'PCX·NMAX 캐노피 자주 묻는 질문')}
            style={{
              backgroundColor: '#161b22',
              border: '0.5px solid #21262D',
              borderRadius: '4px',
              color: '#8B949E',
              fontSize: '11px',
              padding: '8px 14px',
              cursor: 'pointer',
              letterSpacing: '1px',
            }}>
            ❓ FAQ 공유
          </button>
        </div>
      </div>

      {/* 주소 + 복사 */}
      <div style={{ borderTop: '0.5px solid #21262D', paddingTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <p style={{ color: '#484F58', fontSize: '11px' }}>
            경기도 화성시 동탄반송길28 102호
          </p>
          <button
            onClick={copyAddress}
            style={{
              backgroundColor: 'transparent',
              border: '0.5px solid #21262D',
              borderRadius: '3px',
              color: '#484F58',
              fontSize: '10px',
              padding: '3px 8px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
            복사
          </button>
        </div>
        <p style={{ color: '#484F58', fontSize: '11px', lineHeight: '1.7' }}>
          © 2025 Rich Canopy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}