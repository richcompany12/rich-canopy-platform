'use client';
import { useState, useEffect } from 'react';
import { db, storage } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function EditCaseForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
 const [allImages, setAllImages] = useState([]);
const [representIndex, setRepresentIndex] = useState(0);
  const [form, setForm] = useState({
    model: '', year: '', tag: '', desc: '', comment: '',
  });

  const tags = ['배달용', '통근용', '장거리용', '레저용'];
  const models = ['Honda PCX 125', 'Yamaha NMAX 155', 'Honda Forza 350', 'Honda ADV 150', 'Yamaha UHR', '기타'];

  useEffect(() => {
    if (!id) return;
    const fetchCase = async () => {
      const docRef = doc(db, 'cases', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({
          model: data.model || '',
          year: data.year || '',
          tag: data.tag || '',
          desc: data.desc || '',
          comment: data.comment || '',
        });
        setAllImages((data.images || []).map(url => ({ type: 'existing', url })));
        const repIdx = data.images?.indexOf(data.representImage);
        setRepresentIndex(repIdx >= 0 ? repIdx : 0);
      }
      setFetching(false);
    };
    fetchCase();
  }, [id]);

 const handleNewImageAdd = (e) => {
  const files = Array.from(e.target.files);
  const newImgs = files.map((file) => ({
    type: 'new',
    file,
    url: URL.createObjectURL(file),
  }));
  setAllImages((prev) => [...prev, ...newImgs]);
  e.target.value = '';
};

  const handleNewRemove = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.model || !form.year) {
      alert('차종, 연도는 필수입니다.');
      return;
    }
    setLoading(true);
    try {
 const finalUrls = [];
for (const image of allImages) {
  if (image.type === 'existing') {
    finalUrls.push(image.url);
  } else {
    const storageRef = ref(storage, `cases/${Date.now()}_${image.file.name}`);
    await uploadBytes(storageRef, image.file);
    const url = await getDownloadURL(storageRef);
    finalUrls.push(url);
  }
}
const representImage = finalUrls[representIndex] || finalUrls[0];
await updateDoc(doc(db, 'cases', id), {
  ...form, images: finalUrls, representImage,
});
      alert('수정 완료!');
      router.push('/admin/cases');
    } catch (error) {
      console.error(error);
      alert('수정 실패: ' + error.message);
    }
    setLoading(false);
  };

  if (fetching) return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#484F58' }}>불러오는 중...</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/admin/cases" style={{ color: '#484F58', fontSize: '13px' }}>← 목록으로</a>
        <h1 style={{ color: '#F0F6FC', fontSize: '20px', fontWeight: '600' }}>작업사례 수정</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>차종 *</label>
          <select value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} style={{
            width: '100%', backgroundColor: '#161b22', border: '0.5px solid #21262D',
            color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px',
          }}>
            <option value="">선택하세요</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>연도 *</label>
          <input type="text" placeholder="예: 2025" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} style={{
            width: '100%', backgroundColor: '#161b22', border: '0.5px solid #21262D',
            color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px',
          }} />
        </div>

        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>태그</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tags.map((t) => (
              <button key={t} onClick={() => setForm({ ...form, tag: t })} style={{
                backgroundColor: form.tag === t ? '#4FC3F7' : '#161b22',
                color: form.tag === t ? '#111418' : '#8B949E',
                border: '0.5px solid #21262D',
                padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
              }}>{t}</button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>한줄 설명</label>
          <input type="text" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} style={{
            width: '100%', backgroundColor: '#161b22', border: '0.5px solid #21262D',
            color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px',
          }} />
        </div>

        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>상세 코멘트</label>
          <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={4} style={{
            width: '100%', backgroundColor: '#161b22', border: '0.5px solid #21262D',
            color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px', resize: 'vertical',
          }} />
        </div>

        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
            사진 관리 <span style={{ color: '#484F58' }}>(클릭 시 대표사진 설정)</span>
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
 {allImages.map((img, i) => (
  <div key={i} style={{ position: 'relative' }}>
    <img src={img.url} alt="" onClick={() => setRepresentIndex(i)} style={{
      width: '90px', height: '90px', objectFit: 'cover', borderRadius: '4px',
      border: representIndex === i ? '2px solid #4FC3F7' : '2px solid transparent',
      cursor: 'pointer',
    }} />
    {representIndex === i && (
      <div style={{
        position: 'absolute', bottom: '4px', left: 0, right: 0,
        textAlign: 'center', backgroundColor: '#4FC3F7',
        color: '#111418', fontSize: '9px', fontWeight: '700', padding: '2px',
      }}>대표</div>
    )}
    <button onClick={() => handleImageRemove(i)} style={{
      position: 'absolute', top: '2px', right: '2px',
      backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff',
      border: 'none', borderRadius: '50%',
      width: '20px', height: '20px', fontSize: '11px', cursor: 'pointer',
    }}>✕</button>
  </div>
))}
          </div>
          <label style={{
            display: 'inline-block', backgroundColor: '#161b22',
            border: '0.5px solid #21262D', color: '#8B949E',
            padding: '10px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
          }}>
            + 사진 추가
            <input type="file" multiple accept="image/*" onChange={handleNewImageAdd} style={{ display: 'none' }} />
          </label>
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{
          backgroundColor: '#4FC3F7', color: '#111418',
          border: 'none', padding: '14px', borderRadius: '4px',
          fontSize: '14px', fontWeight: '700', cursor: 'pointer',
        }}>
          {loading ? '수정 중...' : '수정 완료'}
        </button>
      </div>
    </div>
  );
}

export default function EditCase() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#111418', minHeight: '100vh' }} />}>
      <EditCaseForm />
    </Suspense>
  );
}