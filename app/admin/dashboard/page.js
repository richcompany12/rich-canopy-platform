'use client';
import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/admin');
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin');
  };

  if (!user) return null;

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px' }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        borderBottom: '0.5px solid #21262D',
        paddingBottom: '20px',
      }}>
        <div>
          <p style={{ color: '#4FC3F7', fontSize: '11px', letterSpacing: '3px' }}>RICH CANOPY</p>
          <h1 style={{ color: '#F0F6FC', fontSize: '20px', fontWeight: '600', marginTop: '4px' }}>관리자 대시보드</h1>
        </div>
        <button onClick={handleLogout} style={{
          backgroundColor: 'transparent',
          border: '0.5px solid #21262D',
          color: '#8B949E',
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer',
        }}>로그아웃</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {[
          { label: '작업사례 관리', desc: '등록 / 수정 / 삭제', href: '/admin/cases' },
          { label: '새 작업사례 등록', desc: '사진 + 내용 업로드', href: '/admin/cases/new' },
          { label: '작업 스케줄', desc: '예약 및 일정 관리', href: '/admin/schedule' },
        ].map((item) => (
          <a key={item.label} href={item.href} style={{
            backgroundColor: '#161b22',
            border: '0.5px solid #21262D',
            borderRadius: '8px',
            padding: '24px 16px',
            textDecoration: 'none',
            display: 'block',
          }}>
            <p style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ color: '#484F58', fontSize: '11px' }}>{item.desc}</p>
          </a>
        ))}
      </div>

    </div>
  );
}