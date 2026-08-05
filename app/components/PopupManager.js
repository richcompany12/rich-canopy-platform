// app/components/PopupManager.js
'use client';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const HIDE_KEY_PREFIX = 'rc_popup_hide_';

function isHiddenToday(id) {
  if (typeof window === 'undefined') return false;
  const val = window.localStorage.getItem(HIDE_KEY_PREFIX + id);
  if (!val) return false;
  const today = new Date().toDateString();
  return val === today;
}

function hideForToday(id) {
  const today = new Date().toDateString();
  window.localStorage.setItem(HIDE_KEY_PREFIX + id, today);
}

export default function PopupManager() {
  const [popups, setPopups] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPopups = async () => {
      const q = query(collection(db, 'popups'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const now = new Date();

      const active = snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((p) => {
          if (isHiddenToday(p.id)) return false;
          const start = p.startDate ? new Date(p.startDate) : null;
          const end = p.endDate ? new Date(p.endDate) : null;
          if (start && now < start) return false;
          if (end && now > end) return false;
          return true;
        });

      setPopups(active);
    };
    fetchPopups();
  }, []);

  if (popups.length === 0 || index >= popups.length) return null;

  const popup = popups[index];

  const goNext = () => setIndex((i) => i + 1);

  const handleHideToday = () => {
    hideForToday(popup.id);
    goNext();
  };

  const handleImageClick = () => {
    if (popup.linkUrl) {
      window.location.href = popup.linkUrl;
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    }}>
      <div style={{
        backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '10px',
        maxWidth: '360px', width: '100%', overflow: 'hidden',
      }}>
        {popup.imageUrl && (
          <img
            src={popup.imageUrl}
            alt={popup.title || '안내'}
            onClick={handleImageClick}
            style={{ width: '100%', display: 'block', cursor: popup.linkUrl ? 'pointer' : 'default' }}
          />
        )}

        {popup.title && (
          <p style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '600', padding: '14px 16px 0' }}>
            {popup.title}
          </p>
        )}

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 16px', borderTop: '0.5px solid #21262D', marginTop: '10px',
        }}>
          <button onClick={handleHideToday} style={{
            background: 'none', border: 'none', color: '#484F58', fontSize: '12px', cursor: 'pointer',
          }}>
            오늘 하루 안 보기
          </button>
          <button onClick={goNext} style={{
            background: 'none', border: 'none', color: '#8B949E', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          }}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}