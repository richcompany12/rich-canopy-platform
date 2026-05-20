'use client';
import { useState } from 'react';
import { db, storage } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

export default function NewCase() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [representIndex, setRepresentIndex] = useState(0);
  const [form, setForm] = useState({
    model: '',
    year: '',
    tag: '',
    desc: '',
    comment: '',
  });

  const tags = ['배달용', '통근용', '장거리용', '레저용'];
  const models = ['Honda PCX 125', 'Yamaha NMAX 155', 'Honda Forza 350', 'Honda ADV 150', 'Yamaha UHR', '기타'];

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = '';
  };

  const handleImageRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (representIndex === index) setRepresentIndex(0);
    if (representIndex > index) setRepresentIndex((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!form.model || !form.year || images.length === 0) {
      alert('차종, 연도, 사진은 필수입니다.');
      return;
    }
    setLoading(true);
    try {
      const imageUrls = [];
      for (const image of images) {
        const storageRef = ref(storage, `cases/${Date.now()}_${image.file.name}`);
        await uploadBytes(storageRef, image.file);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }
      await addDoc(collection(db, 'cases'), {
        ...form,
        images: imageUrls,
        representImage: imageUrls[representIndex],
        createdAt: serverTimestamp(),
      });
      alert('등록 완료!');
      router.push('/admin/cases');
    } catch (error) {
      console.error(error);
      alert('등록 실패: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/admin/dashboard" style={{ color: '#484F58', fontSize: '13px' }}>← 대시보드</a>
        <h1 style={{ color: '#F0F6FC', fontSize: '20px', fontWeight: '600' }}>새 작업사례 등록</h1>
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
          <input type="text" placeholder="예: 풀세팅 배달 장착" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} style={{
            width: '100%', backgroundColor: '#161b22', border: '0.5px solid #21262D',
            color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px',
          }} />
        </div>

        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>상세 코멘트</label>
          <textarea placeholder="작업 내용, 특이사항 등..." value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={4} style={{
            width: '100%', backgroundColor: '#161b22', border: '0.5px solid #21262D',
            color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px',
            resize: 'vertical',
          }} />
        </div>

        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
            사진 업로드 * <span style={{ color: '#484F58', fontWeight: '400' }}>(대표사진 선택 가능)</span>
          </label>

          <label style={{
            display: 'inline-block',
            backgroundColor: '#161b22',
            border: '0.5px solid #21262D',
            color: '#8B949E',
            padding: '10px 20px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            marginBottom: '12px',
          }}>
            + 사진 추가
            <input type="file" multiple accept="image/*" onChange={handleImageAdd} style={{ display: 'none' }} />
          </label>

          {images.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {images.map((img, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={img.preview} alt="" style={{
                    width: '90px', height: '90px',
                    objectFit: 'cover', borderRadius: '4px',
                    border: representIndex === i ? '2px solid #4FC3F7' : '2px solid transparent',
                    cursor: 'pointer',
                  }} onClick={() => setRepresentIndex(i)} />
                  {representIndex === i && (
                    <div style={{
                      position: 'absolute', bottom: '4px', left: '0', right: '0',
                      textAlign: 'center', backgroundColor: '#4FC3F7',
                      color: '#111418', fontSize: '9px', fontWeight: '700', padding: '2px',
                    }}>대표</div>
                  )}
                  <button onClick={() => handleImageRemove(i)} style={{
                    position: 'absolute', top: '2px', right: '2px',
                    backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff',
                    border: 'none', borderRadius: '50%',
                    width: '20px', height: '20px', fontSize: '11px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>✕</button>
                </div>
              ))}
            </div>
          )}
          {images.length > 0 && (
            <p style={{ color: '#484F58', fontSize: '11px', marginTop: '8px' }}>사진 클릭 시 대표사진으로 설정됩니다.</p>
          )}
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{
          backgroundColor: '#4FC3F7', color: '#111418',
          border: 'none', padding: '14px', borderRadius: '4px',
          fontSize: '14px', fontWeight: '700', cursor: 'pointer',
        }}>
          {loading ? '등록 중...' : '작업사례 등록'}
        </button>

      </div>
    </div>
  );
}