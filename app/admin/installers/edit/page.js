// app/admin/installers/edit/page.js
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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

function EditInstallerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    status: '협의중',
    tier: '일반',
  });
  const [photosText, setPhotosText] = useState(''); // 한 줄에 하나씩 URL 입력
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchInstaller = async () => {
      if (!id) return;
      const snap = await getDoc(doc(db, 'installers', id));
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          name: data.name || '',
          address: data.address || '',
          phone: data.phone || '',
          status: data.status || '협의중',
          tier: data.tier || '일반',
        });
        setPhotosText((data.photos || []).join('\n'));
      }
      setLoading(false);
    };
    fetchInstaller();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const photos = photosText
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (photos.length < 5) {
      const proceed = confirm(
        `현재 사진이 ${photos.length}장입니다. 대표사진은 최소 5장을 권장해요. 그래도 저장하시겠어요?`
      );
      if (!proceed) {
        setSaving(false);
        return;
      }
    }

    await updateDoc(doc(db, 'installers', id), {
      ...form,
      photos,
    });

    alert('수정되었습니다.');
    router.push('/admin/installers');
    setSaving(false);
  };

  if (loading) return <p style={{ color: '#8B949E', padding: '40px' }}>불러오는 중...</p>;

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#F0F6FC', fontSize: '22px', marginBottom: '24px' }}>
        장착점 수정
      </h1>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>장착점 이름</label>
        <input style={inputStyle} name="name" value={form.name} onChange={handleChange} />

        <label style={labelStyle}>주소</label>
        <input style={inputStyle} name="address" value={form.address} onChange={handleChange} />
        <p style={{ color: '#484F58', fontSize: '11px', marginTop: '-12px', marginBottom: '16px' }}>
          ※ 주소를 바꿔도 지도 위치(좌표)는 자동으로 갱신되지 않습니다. 위치가 바뀌었다면 새로 등록해주세요.
        </p>

        <label style={labelStyle}>연락처</label>
        <input style={inputStyle} name="phone" value={form.phone} onChange={handleChange} />

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

        <label style={labelStyle}>
          대표사진 URL (한 줄에 하나씩 입력, 정사각형 1200×1200 권장, 최소 5장)
        </label>
        <textarea
          style={{ ...inputStyle, minHeight: '160px', fontFamily: 'monospace', fontSize: '12px' }}
          value={photosText}
          onChange={(e) => setPhotosText(e.target.value)}
          placeholder={'https://.../사진1.jpg\nhttps://.../사진2.jpg\nhttps://.../사진3.jpg'}
        />
        <p style={{ color: '#484F58', fontSize: '11px', marginTop: '-12px', marginBottom: '16px' }}>
          ※ Firebase Storage의 installers/ 폴더에 업로드 후 다운로드 URL을 붙여넣으세요. (간판 사진 + 최근 작업사례 사진 섞어서 등록 권장)
        </p>

        <button
          type="submit"
          disabled={saving}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: '#4FC3F7',
            color: '#0d1117',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? '저장 중...' : '저장하기'}
        </button>
      </form>
    </div>
  );
}

export default function EditInstallerPage() {
  return (
    <Suspense fallback={<p style={{ color: '#8B949E', padding: '40px' }}>불러오는 중...</p>}>
      <EditInstallerForm />
    </Suspense>
  );
}