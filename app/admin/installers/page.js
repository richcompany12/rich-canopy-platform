// app/admin/installers/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

const statusColor = {
  확정: '#4FC3F7',
  협의중: '#e3b341',
  보류: '#8B949E',
};

export default function AdminInstallersPage() {
  const [installers, setInstallers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInstallers = async () => {
    setLoading(true);
    const q = query(collection(db, 'installers'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    setInstallers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchInstallers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`"${name}" 장착점을 삭제하시겠습니까?`)) return;
    await deleteDoc(doc(db, 'installers', id));
    fetchInstallers();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#F0F6FC', fontSize: '22px' }}>장착점 관리</h1>
        <Link
          href="/admin/installers/new"
          style={{
            padding: '10px 16px',
            background: '#4FC3F7',
            color: '#0d1117',
            borderRadius: '8px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          + 장착점 등록
        </Link>
      </div>

      {loading && <p style={{ color: '#8B949E' }}>불러오는 중...</p>}

      {!loading && installers.length === 0 && (
        <p style={{ color: '#8B949E' }}>등록된 장착점이 없습니다.</p>
      )}

      {installers.map((installer) => (
        <div
          key={installer.id}
          style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ color: '#F0F6FC' }}>{installer.name}</strong>
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: statusColor[installer.status] || '#8B949E',
                  color: '#0d1117',
                  fontWeight: 'bold',
                }}
              >
                {installer.status}
              </span>
              <span style={{ fontSize: '11px', color: '#8B949E' }}>{installer.tier}</span>
              <span style={{ fontSize: '11px', color: '#484F58' }}>
                사진 {(installer.photos || []).length}장
              </span>
            </div>
            <div style={{ color: '#8B949E', fontSize: '13px', marginTop: '4px' }}>
              {installer.address}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              href={`/admin/installers/edit?id=${installer.id}`}
              style={{
                background: 'none',
                border: '1px solid #30363d',
                color: '#4FC3F7',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '13px',
                textDecoration: 'none',
              }}
            >
              수정
            </Link>
            <button
              onClick={() => handleDelete(installer.id, installer.name)}
              style={{
                background: 'none',
                border: '1px solid #30363d',
                color: '#ff6b6b',
                borderRadius: '6px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}