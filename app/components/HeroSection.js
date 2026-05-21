'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();
  const pressTimer = useRef(null);

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      router.push('/admin');
    }, 4000);
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer.current);
  };

  return (
    <section
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      style={{
        backgroundColor: '#111418',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      padding: '0 24px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <svg
        viewBox="0 0 400 300"
        style={{
  position: 'absolute',
  right: '-20px',
  top: '10%',
  transform: 'none',
  width: '85%',
  opacity: 0.04,
}}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="280" cy="220" rx="60" ry="20" stroke="#4FC3F7" strokeWidth="2"/>
        <ellipse cx="100" cy="220" rx="45" ry="16" stroke="#4FC3F7" strokeWidth="2"/>
        <path d="M100 204 Q120 140 200 120 Q260 105 290 150 L310 195 Q285 188 280 204" stroke="#4FC3F7" strokeWidth="2.5"/>
        <path d="M60 210 Q58 150 100 138 L160 125 Q140 148 138 204" stroke="#8B949E" strokeWidth="1.5"/>
        <path d="M195 120 Q260 60 360 75 Q368 110 310 155" stroke="#4FC3F7" strokeWidth="3"/>
        <path d="M195 120 Q200 85 215 75" stroke="#F0F6FC" strokeWidth="1.5"/>
        <circle cx="100" cy="220" r="8" stroke="#4FC3F7" strokeWidth="1.5"/>
        <circle cx="280" cy="220" r="10" stroke="#4FC3F7" strokeWidth="1.5"/>
      </svg>

      <div style={{
        borderLeft: '2px solid #4FC3F7',
        paddingLeft: '16px',
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{
          color: '#4FC3F7',
          fontSize: '11px',
          letterSpacing: '3px',
          marginBottom: '12px',
        }}>PREMIUM SCOOTER CANOPY SYSTEMS</p>
        <h1 style={{
          color: '#F0F6FC',
          fontSize: '38px',
          fontWeight: '300',
          lineHeight: '1.2',
          letterSpacing: '-1px',
        }}>Ride in<br /><strong style={{ fontWeight: '700' }}>Any Weather.</strong></h1>
      </div>

      <p style={{
        color: '#8B949E',
        fontSize: '14px',
        lineHeight: '1.7',
        marginBottom: '40px',
        maxWidth: '280px',
        position: 'relative',
        zIndex: 1,
      }}>스쿠터를 위한 프리미엄 캐노피 시스템.<br />비, 바람, 햇빛으로부터 완벽한 보호.</p>

      <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 1 }}>
        <a href="#cases" style={{
          backgroundColor: '#4FC3F7',
          color: '#111418',
          padding: '12px 24px',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '1px',
          borderRadius: '2px',
        }}>EXPLORE</a>
        <a href="#contact" style={{
          border: '0.5px solid #21262D',
          color: '#8B949E',
          padding: '12px 24px',
          fontSize: '12px',
          letterSpacing: '1px',
          borderRadius: '2px',
        }}>CONTACT</a>
      </div>
    </section>
  );
}