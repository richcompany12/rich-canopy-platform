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
        userSelect: 'none',
      }}>

      <img
        src="/hero.png"
        alt="리치캐노피 프리미엄 스쿠터 캐노피 시스템 - 비로부터 완전한 보호"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />

      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(transparent, rgba(17,20,24,0.98))',
        margin: '0 -24px -80px',
        padding: '60px 24px 80px',
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
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
            border: '0.5px solid #8B949E',
            color: '#8B949E',
            padding: '12px 24px',
            fontSize: '12px',
            letterSpacing: '1px',
            borderRadius: '2px',
          }}>CONTACT</a>
        </div>
      </div>
    </section>
  );
}