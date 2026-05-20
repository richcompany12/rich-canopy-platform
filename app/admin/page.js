'use client';
import { useState } from 'react';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const ADMIN_EMAIL = 'kso121258@gmail.com';

  const handleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === ADMIN_EMAIL) {
        router.push('/admin/dashboard');
      } else {
        alert('접근 권한이 없습니다.');
        await auth.signOut();
      }
    } catch (error) {
      console.error(error);
      alert('로그인 실패');
    }
    setLoading(false);
  };

  return (
    <div style={{
      backgroundColor: '#111418',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: '#161b22',
        border: '0.5px solid #21262D',
        borderRadius: '12px',
        padding: '48px 36px',
        textAlign: 'center',
        width: '320px',
      }}>
        <p style={{ color: '#4FC3F7', fontSize: '11px', letterSpacing: '3px', marginBottom: '8px' }}>RICH CANOPY</p>
        <h1 style={{ color: '#F0F6FC', fontSize: '22px', fontWeight: '300', marginBottom: '8px' }}>
          관리자 <strong style={{ fontWeight: '700' }}>로그인</strong>
        </h1>
        <p style={{ color: '#484F58', fontSize: '12px', marginBottom: '40px' }}>authorized access only</p>

        <button onClick={handleLogin} disabled={loading} style={{
          backgroundColor: '#4FC3F7',
          color: '#111418',
          border: 'none',
          borderRadius: '4px',
          padding: '14px 32px',
          fontSize: '13px',
          fontWeight: '700',
          letterSpacing: '1px',
          cursor: 'pointer',
          width: '100%',
        }}>
          {loading ? '로그인 중...' : 'Google로 로그인'}
        </button>
      </div>
    </div>
  );
}