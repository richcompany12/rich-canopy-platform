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
  const [tags, setTags] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [parts, setParts] = useState(['']);
  const [form, setForm] = useState({
    model: '', year: '', workTime: '', desc: '', comment: '', review: '',
  });

  const defaultTags = ['배달용', '통근용', '장거리용', '레저용', '마실용'];
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
          workTime: data.workTime || '',
          desc: data.desc || '',
          comment: data.comment || '',
          review: data.review || '',
        });
        setAllImages((data.images || []).map((url, i) => ({
          type: 'existing',
          url,
          caption: data.imageCaptions?.[i] || '',
        })));
        setTags(data.tags || (data.tag ? [data.tag] : []));
        setParts(data.parts?.length > 0 ? data.parts : ['']);
        const repIdx = data.images?.indexOf(data.representImage);
        setRepresentIndex(repIdx >= 0 ? repIdx : 0);
      }
      setFetching(false);
    };
    fetchCase();
  }, [id]);

  const toggleTag = (tag) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const addCustomTag = () => {
    if (!customTag.trim()) return;
    if (!tags.includes(customTag.trim())) setTags((prev) => [...prev, customTag.trim()]);
    setCustomTag('');
  };

  const handleNewImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map((file) => ({
      type: 'new', file, url: URL.createObjectURL(file), caption: '',
    }));
    setAllImages((prev) => [...prev, ...newImgs]);
    e.target.value = '';
  };

  const handleImageRemove = (index) => {
    setAllImages((prev) => prev.filter((_, i) => i !== index));
    if (representIndex === index) setRepresentIndex(0);
    if (representIndex > index) setRepresentIndex((prev) => prev - 1);
  };

  const handleCaptionChange = (index, value) => {
    setAllImages((prev) => prev.map((img, i) => i === index ? { ...img, caption: value } : img));
  };

  const handlePartChange = (index, value) => {
    setParts((prev) => prev.map((p, i) => i === index ? value : p));
  };

  const addPart = () => setParts((prev) => [...prev, '']);
  const removePart = (index) => setParts((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (!form.model || !form.year) {
      alert('차종, 연도는 필수입니다.');
      return;
    }
    setLoading(true);
    try {
      const finalImages = [];
      for (const image of allImages) {
        if (image.type === 'existing') {
          finalImages.push({ url: image.url, caption: image.caption });
        } else {
          const storageRef = ref(storage, `cases/${Date.now()}_${image.file.name}`);
          await uploadBytes(storageRef, image.file);
          const url = await getDownloadURL(storageRef);
          finalImages.push({ url, caption: image.caption });
        }
      }
      const representImage = finalImages[representIndex]?.url || finalImages[0]?.url;
      await updateDoc(doc(db, 'cases', id), {
        ...form,
        tags,
        images: finalImages.map((i) => i.url),
        imageCaptions: finalImages.map((i) => i.caption),
        representImage,
        parts: parts.filter((p) => p.trim()),
      });
      alert('수정 완료!');
      router.push('/admin/cases');
    } catch (error) {
      console.error(error);
      alert('수정 실패: ' + error.message);
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', backgroundColor: '#0d1117', border: '0.5px solid #21262D',
    color: '#F0F6FC', padding: '12px', borderRadius: '4px', fontSize: '14px',
  };
  const labelStyle = {
    color: '#8B949E', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '8px',
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>

        {/* 기본정보 */}
        <div style={{ backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '8px', padding: '20px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '11px', letterSpacing: '2px', marginBottom: '16px' }}>기본 정보</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>차종 *</label>
              <select value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} style={inputStyle}>
                <option value="">선택하세요</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>연도 *</label>
                <input type="text" placeholder="예: 2025" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>작업시간</label>
                <input type="text" placeholder="예: 3시간" value={form.workTime} onChange={(e) => setForm({ ...form, workTime: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>한줄 설명</label>
              <input type="text" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* 태그 */}
        <div style={{ backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '8px', padding: '20px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '11px', letterSpacing: '2px', marginBottom: '16px' }}>태그 (중복선택 가능)</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {defaultTags.map((t) => (
              <button key={t} onClick={() => toggleTag(t)} style={{
                backgroundColor: tags.includes(t) ? '#4FC3F7' : '#0d1117',
                color: tags.includes(t) ? '#111418' : '#8B949E',
                border: '0.5px solid #21262D',
                padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
              }}>{t}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="직접 입력" value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomTag()}
              style={{ ...inputStyle, flex: 1 }} />
            <button onClick={addCustomTag} style={{
              backgroundColor: '#4FC3F7', color: '#111418',
              border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: '700',
            }}>+ 추가</button>
          </div>
          {tags.filter(t => !defaultTags.includes(t)).length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {tags.filter(t => !defaultTags.includes(t)).map((t) => (
                <span key={t} style={{
                  backgroundColor: '#4FC3F7', color: '#111418',
                  fontSize: '11px', padding: '4px 10px', borderRadius: '4px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  {t}
                  <button onClick={() => toggleTag(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111418', fontSize: '12px', padding: 0 }}>✕</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 사진 */}
        <div style={{ backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '8px', padding: '20px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '11px', letterSpacing: '2px', marginBottom: '16px' }}>사진 관리 (클릭 시 대표사진)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
            {allImages.map((img, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={img.url} alt="" onClick={() => setRepresentIndex(i)} style={{
                    width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px',
                    border: representIndex === i ? '2px solid #4FC3F7' : '2px solid transparent',
                    cursor: 'pointer',
                  }} />
                  {representIndex === i && (
                    <div style={{
                      position: 'absolute', bottom: '2px', left: 0, right: 0,
                      textAlign: 'center', backgroundColor: '#4FC3F7',
                      color: '#111418', fontSize: '8px', fontWeight: '700', padding: '2px',
                    }}>대표</div>
                  )}
                  <button onClick={() => handleImageRemove(i)} style={{
                    position: 'absolute', top: '2px', right: '2px',
                    backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff',
                    border: 'none', borderRadius: '50%',
                    width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer',
                  }}>✕</button>
                </div>
                <input type="text" placeholder="사진 설명" value={img.caption}
                  onChange={(e) => handleCaptionChange(i, e.target.value)}
                  style={{ ...inputStyle, flex: 1 }} />
              </div>
            ))}
          </div>
          <label style={{
            display: 'inline-block', backgroundColor: '#0d1117',
            border: '0.5px solid #21262D', color: '#8B949E',
            padding: '10px 20px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
          }}>
            + 사진 추가
            <input type="file" multiple accept="image/*" onChange={handleNewImageAdd} style={{ display: 'none' }} />
          </label>
        </div>

        {/* 사용 부품 */}
        <div style={{ backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '8px', padding: '20px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '11px', letterSpacing: '2px', marginBottom: '16px' }}>사용 부품</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {parts.map((part, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px' }}>
                <input type="text" placeholder="예: 밴딩 프로파일 2개" value={part}
                  onChange={(e) => handlePartChange(i, e.target.value)}
                  style={{ ...inputStyle, flex: 1 }} />
                <button onClick={() => removePart(i)} style={{
                  backgroundColor: 'transparent', border: '0.5px solid #3d1a1a',
                  color: '#E63946', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px',
                }}>✕</button>
              </div>
            ))}
            <button onClick={addPart} style={{
              backgroundColor: 'transparent', border: '0.5px solid #21262D',
              color: '#8B949E', padding: '10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
            }}>+ 부품 추가</button>
          </div>
        </div>

        {/* 상세내용 */}
        <div style={{ backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '8px', padding: '20px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '11px', letterSpacing: '2px', marginBottom: '16px' }}>상세 내용</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>작업 내용 / 특이사항</label>
              <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={4}
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <label style={labelStyle}>고객 후기</label>
              <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} rows={3}
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>
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