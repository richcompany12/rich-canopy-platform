'use client';
import { useState } from 'react';
import { db, storage } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

const DEFAULT_TAGS = ['루프', '탑박스', '슬라이딩스크린', '프로파일절단', '타공', '탭핑'];

const TAG_COLORS = {
  '루프': '#4FC3F7', '탑박스': '#81C784', '슬라이딩스크린': '#FFB74D',
  '프로파일절단': '#F06292', '타공': '#CE93D8', '탭핑': '#80DEEA',
};

export default function NoteNew() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', memo: '' });
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [customTags, setCustomTags] = useState([]);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [lightbox, setLightbox] = useState(null); // 확대 이미지

  const toggleTag = (tag) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const addCustomTag = () => {
    const t = customTag.trim();
    if (!t || customTags.includes(t) || DEFAULT_TAGS.includes(t)) return;
    setCustomTags((prev) => [...prev, t]);
    setTags((prev) => [...prev, t]);
    setCustomTag('');
  };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImgs]);
    e.target.value = '';
  };

  const handleImageRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) { alert('제목을 입력하세요.'); return; }
    setSaving(true);
    try {
      const uploadedUrls = [];
      for (const img of images) {
        const storageRef = ref(storage, `notes/${Date.now()}_${img.file.name}`);
        await uploadBytes(storageRef, img.file);
        const url = await getDownloadURL(storageRef);
        uploadedUrls.push(url);
      }
      await addDoc(collection(db, 'notes'), {
        title: form.title.trim(),
        memo: form.memo.trim(),
        tags,
        images: uploadedUrls,
        createdAt: serverTimestamp(),
      });
      router.push('/admin/notes');
    } catch (err) {
      alert('저장 실패: ' + err.message);
    }
    setSaving(false);
  };

  const inputStyle = {
    width: '100%', backgroundColor: '#0d1117', border: '0.5px solid #21262D',
    color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px' }}>

      {/* 라이트박스 (사진 확대) */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, cursor: 'zoom-out',
        }}>
          <img
            src={images[lightbox]?.preview}
            alt=""
            style={{
              maxWidth: '95vw', maxHeight: '90vh',
              objectFit: 'contain', borderRadius: '4px',
              touchAction: 'pinch-zoom',
            }}
          />
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: '16px', right: '16px',
            backgroundColor: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', fontSize: '20px', width: '36px', height: '36px',
            borderRadius: '50%', cursor: 'pointer',
          }}>✕</button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/admin/notes" style={{ color: '#484F58', fontSize: '13px' }}>← 작업 노트</a>
        <h1 style={{ color: '#F0F6FC', fontSize: '20px', fontWeight: '600' }}>새 노트 작성</h1>
      </div>

      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* 제목 */}
        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', display: 'block', marginBottom: '8px' }}>제목 *</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="예: PCX 탑박스 와셔 규격" style={inputStyle} />
        </div>

        {/* 태그 */}
        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', display: 'block', marginBottom: '8px' }}>태그</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {DEFAULT_TAGS.map((tag) => (
              <button key={tag} onClick={() => toggleTag(tag)} style={{
                backgroundColor: tags.includes(tag) ? (TAG_COLORS[tag] || '#4FC3F7') : '#0d1117',
                color: tags.includes(tag) ? '#111418' : '#8B949E',
                border: `0.5px solid ${TAG_COLORS[tag] || '#21262D'}`,
                padding: '6px 14px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
              }}>{tag}</button>
            ))}
            {customTags.map((tag) => (
              <button key={tag} onClick={() => toggleTag(tag)} style={{
                backgroundColor: tags.includes(tag) ? '#4FC3F7' : '#0d1117',
                color: tags.includes(tag) ? '#111418' : '#8B949E',
                border: '0.5px solid #21262D',
                padding: '6px 14px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
              }}>{tag}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="태그 직접 추가" value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomTag()}
              style={{ ...inputStyle, flex: 1 }} />
            <button onClick={addCustomTag} style={{
              backgroundColor: '#4FC3F7', color: '#111418',
              border: 'none', padding: '8px 16px', borderRadius: '4px',
              fontSize: '12px', cursor: 'pointer', fontWeight: '700', whiteSpace: 'nowrap',
            }}>+ 추가</button>
          </div>
        </div>

        {/* 메모 */}
        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', display: 'block', marginBottom: '8px' }}>메모</label>
          <textarea value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })}
            placeholder="치수, 순서, 꿀팁 등 자유롭게 작성..."
            rows={8} style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.7' }} />
        </div>

        {/* 사진 업로드 */}
        <div>
          <label style={{ color: '#8B949E', fontSize: '11px', display: 'block', marginBottom: '8px' }}>
            사진 첨부 (클릭하면 확대)
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {images.map((img, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={img.preview} alt="" onClick={() => setLightbox(i)} style={{
                  width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px',
                  cursor: 'zoom-in', border: '0.5px solid #21262D',
                }} />
                <button onClick={() => handleImageRemove(i)} style={{
                  position: 'absolute', top: '2px', right: '2px',
                  backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff',
                  border: 'none', borderRadius: '50%',
                  width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer',
                }}>✕</button>
              </div>
            ))}
          </div>
          <label style={{
            display: 'inline-block', backgroundColor: '#0d1117',
            border: '0.5px solid #21262D', color: '#8B949E',
            padding: '10px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
          }}>
            + 사진 추가
            <input type="file" multiple accept="image/*" onChange={handleImageAdd} style={{ display: 'none' }} />
          </label>
        </div>

        {/* 저장 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleSubmit} disabled={saving} style={{
            backgroundColor: '#4FC3F7', color: '#111418',
            padding: '14px 32px', borderRadius: '4px',
            fontSize: '13px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer',
            border: 'none', opacity: saving ? 0.6 : 1,
          }}>{saving ? '저장 중...' : '저장'}</button>
          <a href="/admin/notes" style={{
            border: '0.5px solid #21262D', color: '#8B949E',
            padding: '14px 32px', borderRadius: '4px', fontSize: '13px',
          }}>취소</a>
        </div>

      </div>
    </div>
  );
}