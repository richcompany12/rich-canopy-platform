'use client';
// app/admin/notes/edit/page.js
import { useState, useEffect, Suspense } from 'react';
import { db, storage } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_TAGS = ['루프', '탑박스', '슬라이딩스크린', '프로파일절단', '타공', '탭핑'];

const TAG_COLORS = {
  '루프': '#4FC3F7', '탑박스': '#81C784', '슬라이딩스크린': '#FFB74D',
  '프로파일절단': '#F06292', '타공': '#CE93D8', '탭핑': '#80DEEA',
};

function NoteEditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState({ title: '', memo: '' });
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [customTags, setCustomTags] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const snap = await getDoc(doc(db, 'notes', id));
      if (snap.exists()) {
        const d = snap.data();
        setForm({ title: d.title || '', memo: d.memo || '' });
        setTags(d.tags || []);
        setExistingImages(d.images || []);
        setCustomTags((d.tags || []).filter(t => !DEFAULT_TAGS.includes(t)));
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

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

  const handleNewImageAdd = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files.map((file) => ({ file, preview: URL.createObjectURL(file) }))]);
    e.target.value = '';
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) { alert('제목을 입력하세요.'); return; }
    setSaving(true);
    try {
      const uploadedUrls = [];
      for (const img of newImages) {
        const storageRef = ref(storage, `notes/${Date.now()}_${img.file.name}`);
        await uploadBytes(storageRef, img.file);
        uploadedUrls.push(await getDownloadURL(storageRef));
      }
      await updateDoc(doc(db, 'notes', id), {
        title: form.title.trim(),
        memo: form.memo.trim(),
        tags,
        images: [...existingImages, ...uploadedUrls],
      });
      router.push('/admin/notes');
    } catch (err) {
      alert('저장 실패: ' + err.message);
    }
    setSaving(false);
  };

  const allPreviews = [
    ...existingImages.map((url) => ({ src: url })),
    ...newImages.map((img) => ({ src: img.preview })),
  ];

  const inputStyle = {
    width: '100%', backgroundColor: '#0d1117', border: '0.5px solid #30363D',
    color: '#F0F6FC', padding: '12px', borderRadius: '4px',
    fontSize: '15px', boxSizing: 'border-box',
  };

  const labelStyle = { color: '#C9D1D9', fontSize: '13px', display: 'block', marginBottom: '8px', fontWeight: '500' };

  if (loading) return <p style={{ color: '#8B949E', padding: '24px' }}>불러오는 중...</p>;

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px', userSelect: 'none' }}>

      {/* 라이트박스 */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, cursor: 'zoom-out',
        }}>
          <img src={allPreviews[lightbox]?.src} alt="" style={{
            maxWidth: '95vw', maxHeight: '90vh',
            objectFit: 'contain', borderRadius: '4px', touchAction: 'pinch-zoom',
          }} />
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: '16px', right: '16px',
            backgroundColor: 'rgba(255,255,255,0.15)', border: 'none',
            color: '#fff', fontSize: '18px', width: '36px', height: '36px',
            borderRadius: '50%', cursor: 'pointer',
          }}>✕</button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/admin/notes" style={{ color: '#8B949E', fontSize: '13px' }}>← 작업 노트</a>
        <h1 style={{ color: '#F0F6FC', fontSize: '20px', fontWeight: '600' }}>노트 수정</h1>
      </div>

      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* 제목 */}
        <div>
          <label style={labelStyle}>제목 *</label>
          <input type="text" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={inputStyle} />
        </div>

        {/* 태그 */}
        <div>
          <label style={labelStyle}>태그</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {[...DEFAULT_TAGS, ...customTags].map((tag) => (
              <button key={tag} onClick={() => toggleTag(tag)} style={{
                backgroundColor: tags.includes(tag) ? (TAG_COLORS[tag] || '#4FC3F7') : '#0d1117',
                color: tags.includes(tag) ? '#111418' : '#C9D1D9',
                border: `0.5px solid ${TAG_COLORS[tag] || '#30363D'}`,
                padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer',
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
              fontSize: '13px', cursor: 'pointer', fontWeight: '700', whiteSpace: 'nowrap',
            }}>+ 추가</button>
          </div>
        </div>

        {/* 메모 */}
        <div>
          <label style={labelStyle}>메모</label>
          <textarea value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            rows={10}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.9', fontSize: '15px' }} />
        </div>

        {/* 사진 */}
        <div>
          <label style={labelStyle}>사진 (클릭하면 확대)</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {existingImages.map((url, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={url} alt="" onClick={() => setLightbox(i)} style={{
                  width: '88px', height: '88px', objectFit: 'cover', borderRadius: '6px',
                  cursor: 'zoom-in', border: '0.5px solid #30363D',
                }} />
                <button onClick={() => setExistingImages((prev) => prev.filter((_, idx) => idx !== i))} style={{
                  position: 'absolute', top: '2px', right: '2px',
                  backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff',
                  border: 'none', borderRadius: '50%',
                  width: '20px', height: '20px', fontSize: '11px', cursor: 'pointer',
                }}>✕</button>
              </div>
            ))}
            {newImages.map((img, i) => (
              <div key={`new-${i}`} style={{ position: 'relative' }}>
                <img src={img.preview} alt="" onClick={() => setLightbox(existingImages.length + i)} style={{
                  width: '88px', height: '88px', objectFit: 'cover', borderRadius: '6px',
                  cursor: 'zoom-in', border: '1px solid #4FC3F7',
                }} />
                <button onClick={() => setNewImages((prev) => prev.filter((_, idx) => idx !== i))} style={{
                  position: 'absolute', top: '2px', right: '2px',
                  backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff',
                  border: 'none', borderRadius: '50%',
                  width: '20px', height: '20px', fontSize: '11px', cursor: 'pointer',
                }}>✕</button>
              </div>
            ))}
          </div>
          <label style={{
            display: 'inline-block', backgroundColor: '#0d1117',
            border: '0.5px solid #30363D', color: '#C9D1D9',
            padding: '10px 20px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer',
          }}>
            + 사진 추가
            <input type="file" multiple accept="image/*" onChange={handleNewImageAdd} style={{ display: 'none' }} />
          </label>
        </div>

        {/* 저장/취소 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleSubmit} disabled={saving} style={{
            backgroundColor: '#4FC3F7', color: '#111418',
            padding: '14px 36px', borderRadius: '4px',
            fontSize: '14px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer',
            border: 'none', opacity: saving ? 0.6 : 1,
          }}>{saving ? '저장 중...' : '저장'}</button>
          <a href="/admin/notes" style={{
            border: '0.5px solid #30363D', color: '#C9D1D9',
            padding: '14px 36px', borderRadius: '4px', fontSize: '14px',
          }}>취소</a>
        </div>

      </div>
    </div>
  );
}

export default function NoteEdit() {
  return (
    <Suspense fallback={<p style={{ color: '#8B949E', padding: '24px' }}>불러오는 중...</p>}>
      <NoteEditForm />
    </Suspense>
  );
}