export default function Footer() {
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
          { label: 'FAQ', href: '#faq' },
          { label: 'CONTACT', href: '#contact' },
        ].map((item) => (
          <a key={item.label} href={item.href} style={{
            color: '#484F58',
            fontSize: '12px',
            letterSpacing: '2px',
          }}>{item.label}</a>
        ))}
      </div>

      <div style={{ borderTop: '0.5px solid #21262D', paddingTop: '24px' }}>
        <p style={{ color: '#484F58', fontSize: '11px', lineHeight: '1.7' }}>
          © 2025 Rich Canopy. All rights reserved.<br />
          경기도 화성시
        </p>
      </div>
    </footer>
  );
}