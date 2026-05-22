'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    image: '/hero.png',
    tag: 'PREMIUM SCOOTER CANOPY',
    title: 'Ride in',
    titleBold: 'Any Weather.',
    sub: '어떤 날씨에도, 완벽한 라이딩',
  },
  {
    image: '/hero2.png',
    tag: 'RAIN PROTECTION',
    title: '비로부터,',
    titleBold: '완전한 보호.',
    sub: '폭우 속에서도 거뜬하게',
  },
  {
    image: '/hero3.png',
    tag: 'UV PROTECTION',
    title: '뙤약볕에서도,',
    titleBold: '쾌적하게.',
    sub: '강렬한 햇빛도 막아드립니다',
  },
  {
    image: '/hero4.png',
    tag: 'WIND PROTECTION',
    title: '칼바람에서도,',
    titleBold: '따뜻하게.',
    sub: '매서운 겨울 바람도 문제없어요',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setFade(true);
      }, 800);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section style={{
      backgroundColor: '#111418',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '0 24px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* 배경 이미지 크로스페이드 */}
      {slides.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${s.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: i === current ? (fade ? 1 : 0) : 0,
          transition: i === current ? 'opacity 1.2s ease-in-out' : 'opacity 0.8s ease-in-out',
        }} />
      ))}

      {/* 그라디언트 오버레이 */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '70%',
        background: 'linear-gradient(transparent, rgba(17,20,24,0.97))',
        zIndex: 1,
      }} />

      {/* 슬라이드 인디케이터 */}
      <div style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        display: 'flex',
        gap: '6px',
        zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 300); }}
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: i === current ? '#4FC3F7' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* 텍스트 콘텐츠 */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
      }}>
        <div style={{
          borderLeft: '2px solid #4FC3F7',
          paddingLeft: '16px',
          marginBottom: '16px',
        }}>
          <p style={{
            color: '#4FC3F7',
            fontSize: '11px',
            letterSpacing: '3px',
            marginBottom: '10px',
          }}>{slide.tag}</p>
          <h1 style={{
            color: '#F0F6FC',
            fontSize: '36px',
            fontWeight: '300',
            lineHeight: '1.2',
            letterSpacing: '-1px',
            margin: 0,
          }}>
            {slide.title}<br />
            <strong style={{ fontWeight: '700' }}>{slide.titleBold}</strong>
          </h1>
        </div>

        <p style={{
          color: '#8B949E',
          fontSize: '13px',
          lineHeight: '1.7',
          marginBottom: '32px',
        }}>{slide.sub}</p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="#cases" style={{
            backgroundColor: '#4FC3F7',
            color: '#111418',
            padding: '12px 24px',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '1px',
            borderRadius: '2px',
            textDecoration: 'none',
          }}>EXPLORE</a>
          <a href="#contact" style={{
            border: '0.5px solid #8B949E',
            color: '#8B949E',
            padding: '12px 24px',
            fontSize: '12px',
            letterSpacing: '1px',
            borderRadius: '2px',
            textDecoration: 'none',
          }}>CONTACT</a>
        </div>
      </div>

    </section>
  );
}