export default function StatsBar() {
  return (
    <div style={{
      backgroundColor: '#161b22',
      borderTop: '0.5px solid #21262D',
      borderBottom: '0.5px solid #21262D',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '24px 20px',
    }}>
      {[
        { num: '200+', label: 'INSTALLED' },
        { num: 'PCX·NMAX', label: 'MODELS' },
        { num: '100%', label: 'WATERPROOF' },
      ].map((item) => (
        <div key={item.label} style={{ textAlign: 'center' }}>
          <div style={{ color: '#4FC3F7', fontSize: '20px', fontWeight: '600' }}>{item.num}</div>
          <div style={{ color: '#484F58', fontSize: '9px', letterSpacing: '1.5px', marginTop: '4px' }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}