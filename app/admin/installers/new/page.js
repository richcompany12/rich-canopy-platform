// app/admin/installers/new/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  marginBottom: '16px',
  borderRadius: '8px',
  border: '1px solid #30363d',
  background: '#0d1117',
  color: '#F0F6FC',
  fontSize: '14px',
};

const labelStyle = { color: '#8B949E', fontSize: '13px', marginBottom: '6px', display: 'block' };

export default function NewInstallerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    status: '협의중', // '확정' | '협의중' | '보류'
    tier: '일반', // '일반' | '총판'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 카카오 주소 검색 API로 주소 -> 위도/경도 변환
  const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      if (!window.kakao || !window.kakao.maps) {
        reject(new Error('카카오맵 SDK가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.'));
        return;
      }
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
          } else {
            reject(new Error('주소를 찾을 수 없습니다. 정확한 주소인지 확인해주세요.'));
          }
        });
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.address) {
      setError('장착점 이름과 주소는 필수입니다.');
      return;
    }

    setLoading(true);
    try {
      const { lat, lng } = await geocodeAddress(form.address);

      await addDoc(collection(db, 'installers'), {
        ...form,
        lat,
        lng,
        bikes: [],
        createdAt: serverTimestamp(),
      });

      alert('장착점이 등록되었습니다.');
      router.push('/admin/installers');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#F0F6FC', fontSize: '22px', marginBottom: '24px' }}>
        장착점 등록
      </h1>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>장착점 이름 *</label>
        <input
          style={inputStyle}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="예: 경북 영주 장착점"
        />

        <label style={labelStyle}>주소 * (도로명 주소 권장)</label>
        <input
          style={inputStyle}
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="예: 경상북도 영주시 ○○로 123"
        />

        <label style={labelStyle}>연락처</label>
        <input
          style={inputStyle}
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="010-0000-0000"
        />

        <label style={labelStyle}>등급</label>
        <select style={inputStyle} name="tier" value={form.tier} onChange={handleChange}>
          <option value="일반">일반 장착점</option>
          <option value="총판">지역 총판</option>
        </select>

        <label style={labelStyle}>노출 상태 (확정만 지도에 표시됨)</label>
        <select style={inputStyle} name="status" value={form.status} onChange={handleChange}>
          <option value="협의중">협의중 (지도 비노출)</option>
          <option value="확정">확정 (지도 노출)</option>
          <option value="보류">보류 (지도 비노출)</option>
        </select>

        {error && (
          <p style={{ color: '#ff6b6b', marginBottom: '16px', fontSize: '13px' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: '#4FC3F7',
            color: '#0d1117',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '주소 확인 중...' : '등록하기'}
        </button>
      </form>
    </div>
  );
}