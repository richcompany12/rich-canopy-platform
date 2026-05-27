'use client';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      backgroundColor: '#111418',
      borderBottom: '0.5px solid #21262D',
      padding: '0 20px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
 <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
  <img 
    src="/logo.png" 
    alt="Rich Canopy" 
    style={{ height: '70px', width: 'auto', marginLeft: '0' }} 
  />
</a>

      <button onClick={() => setOpen(!open)} style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        padding: '4px',
      }}>
        <span style={{ width: '22px', height: '1.5px', backgroundColor: open ? '#4FC3F7' : '#F0F6FC', display: 'block', transition: 'all 0.3s' }}></span>
        <span style={{ width: '16px', height: '1.5px', backgroundColor: open ? '#4FC3F7' : '#F0F6FC', display: 'block', transition: 'all 0.3s' }}></span>
        <span style={{ width: '22px', height: '1.5px', backgroundColor: open ? '#4FC3F7' : '#F0F6FC', display: 'block', transition: 'all 0.3s' }}></span>
      </button>

      {open && (
        <nav style={{
          position: 'absolute',
          top: '56px',
          left: 0,
          right: 0,
          backgroundColor: '#161b22',
          borderBottom: '0.5px solid #21262D',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 99,
        }}>
         {[
  { label: 'CASES', href: '#cases' },
  { label: 'RAIN TEST', href: '#rain-test' },
  { label: 'FAQ', href: '/faq' },
  { label: 'CONTACT', href: '#contact' },
].map((item) => (
  <a key={item.label} href={item.href} onClick={() => setOpen(false)} style={{
    color: '#8B949E',
    fontSize: '13px',
    letterSpacing: '2px',
  }}>{item.label}</a>
))}
        <a href="/admin" onClick={() => setOpen(false)} style={{
  color: '#484F58',
  fontSize: '11px',
  letterSpacing: '2px',
  marginTop: '20px',
  borderTop: '0.5px solid #21262D',
  paddingTop: '20px',
}}>ADMIN</a>  
        </nav>
      )}
    </header>
  );
}