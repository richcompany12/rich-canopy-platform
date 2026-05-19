const cases = [
  {
    id: 1,
    model: 'Honda PCX 125',
    year: '2025',
    tag: '배달용',
    desc: '풀세팅 배달 장착',
    color: '#4FC3F7',
  },
  {
    id: 2,
    model: 'Yamaha NMAX 155',
    year: '2024',
    tag: '통근용',
    desc: '심플 통근 세팅',
    color: '#4FC3F7',
  },
  {
    id: 3,
    model: 'Honda Forza 350',
    year: '2024',
    tag: '장거리용',
    desc: '장거리 투어 세팅',
    color: '#4FC3F7',
  },
];

export default function CasesSection() {
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {cases.map((item) => (
          <div key={item.id} style={{
            backgroundColor: '#161b22',
            border: '0.5px solid #21262D',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}>
            <div style={{
              backgroundColor: '#1a1f26',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '0.5px solid #21262D',
            }}>
              <span style={{ color: '#484F58', fontSize: '12px', letterSpacing: '2px' }}>
                PHOTO COMING SOON
              </span>
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
                }}>{item.tag}</span>
                <span style={{ color: '#484F58', fontSize: '11px' }}>{item.year}</span>
              </div>
              <p style={{ color: '#F0F6FC', fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>{item.model}</p>
              <p style={{ color: '#8B949E', fontSize: '12px' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

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