'use client';
// app/admin/notes/page.js
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

const TAG_COLORS = {
  '루프': '#4FC3F7', '탑박스': '#81C784', '슬라이딩스크린': '#FFB74D',
  '프로파일절단': '#F06292', '타공': '#CE93D8', '탭핑': '#80DEEA',
};

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState('전체');
  const [allTags, setAllTags] = useState(['전체']);
  const [lightbox, setLightbox] = useState(null);

  const fetchNotes = async () => {
    const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setNotes(data);
    const tags = new Set();
    data.forEach((n) => (n.tags || []).forEach((t) => tags.add(t)));
    setAllTags(['전체', ...Array.from(tags)]);
    setLoading(false);
  };

  useEffect(() => { fetchNotes(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제할까요?')) return;
    await deleteDoc(doc(db, 'notes', id));
    fetchNotes();
  };

  const filtered = filterTag === '전체' ? notes : notes.filter((n) => (n.tags || []).includes(filterTag));

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '24px', userSelect: 'none' }}>

      {/* 라이트박스 */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, cursor: 'zoom-out',
        }}>
          <img
            src={lightbox.images[lightbox.index]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '95vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px', touchAction: 'pinch-zoom' }}
          />
          {lightbox.images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length }); }} style={{
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.15)', border: 'none',
                color: '#fff', fontSize: '24px', width: '44px', height: '44px',
                borderRadius: '50%', cursor: 'pointer',
              }}>‹</button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length }); }} style={{
                position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.15)', border: 'none',
                color: '#fff', fontSize: '24px', width: '44px', height: '44px',
                borderRadius: '50%', cursor: 'pointer',
              }}>›</button>
            </>
          )}
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: '16px', right: '16px',
            backgroundColor: 'rgba(255,255,255,0.15)', border: 'none',
            color: '#fff', fontSize: '18px', width: '36px', height: '36px',
            borderRadius: '50%', cursor: 'pointer',
          }}>✕</button>
          <div style={{ position: 'absolute', bottom: '16px', color: '#8B949E', fontSize: '13px' }}>
            {lightbox.index + 1} / {lightbox.images.length}
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/admin/dashboard" style={{ color: '#484F58', fontSize: '13px' }}>← 대시보드</a>
          <h1 style={{ color: '#F0F6FC', fontSize: '20px', fontWeight: '600' }}>작업 노트</h1>
        </div>
        <a href="/admin/notes/new" style={{
          backgroundColor: '#4FC3F7', color: '#111418',
          padding: '10px 20px', borderRadius: '4px',
          fontSize: '12px', fontWeight: '700', letterSpacing: '1px',
        }}>+ 새 노트</a>
      </div>

      {/* 태그 필터 */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {allTags.map((tag) => (
          <button key={tag} onClick={() => setFilterTag(tag)} style={{
            backgroundColor: filterTag === tag ? '#4FC3F7' : '#161b22',
            color: filterTag === tag ? '#111418' : '#C9D1D9',
            border: '0.5px solid #21262D',
            padding: '8px 16px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer',
          }}>{tag}</button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#8B949E' }}>불러오는 중...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: '#8B949E' }}>등록된 노트가 없습니다.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{
              backgroundColor: '#161b22',
              border: '0.5px solid #21262D',
              borderRadius: '8px',
              padding: '20px',
            }}>
              {/* 태그 */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {(item.tags || []).map((tag) => (
                  <span key={tag} style={{
                    backgroundColor: '#0d1117',
                    color: TAG_COLORS[tag] || '#4FC3F7',
                    fontSize: '11px', padding: '3px 10px', borderRadius: '2px',
                    border: `0.5px solid ${TAG_COLORS[tag] || '#4FC3F7'}`,
                  }}>{tag}</span>
                ))}
              </div>

              {/* 제목 */}
              <p style={{ color: '#F0F6FC', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{item.title}</p>

              {/* 메모 미리보기 */}
              {item.memo && (
                <p style={{ color: '#C9D1D9', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap', marginBottom: '12px' }}>
                  {item.memo.length > 120 ? item.memo.slice(0, 120) + '...' : item.memo}
                </p>
              )}

              {/* 사진 썸네일 */}
              {item.images?.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  {item.images.slice(0, 4).map((url, i) => (
                    <img key={i} src={url} alt=""
                      onClick={() => setLightbox({ images: item.images, index: i })}
                      style={{
                        width: '72px', height: '72px', objectFit: 'cover', borderRadius: '6px',
                        cursor: 'zoom-in', border: '0.5px solid #21262D',
                      }} />
                  ))}
                  {item.images.length > 4 && (
                    <div onClick={() => setLightbox({ images: item.images, index: 4 })} style={{
                      width: '72px', height: '72px', borderRadius: '6px',
                      backgroundColor: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#8B949E', fontSize: '13px', cursor: 'zoom-in',
                    }}>+{item.images.length - 4}</div>
                  )}
                </div>
              )}

              {/* 하단 날짜 + 버튼 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <span style={{ color: '#484F58', fontSize: '12px' }}>
                  {item.createdAt?.toDate?.()?.toLocaleDateString('ko-KR') || ''}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={`/admin/notes/edit?id=${item.id}`} style={{
                    border: '0.5px solid #21262D', color: '#C9D1D9',
                    padding: '8px 14px', borderRadius: '4px', fontSize: '12px',
                  }}>수정</a>
                  <button onClick={() => handleDelete(item.id)} style={{
                    border: '0.5px solid #3d1a1a', color: '#E63946',
                    backgroundColor: 'transparent',
                    padding: '8px 14px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
                  }}>삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}