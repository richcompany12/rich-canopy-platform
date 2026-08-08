// app/installers/page.js
'use client';

import { useEffect, useState } from 'react';
import InstallerMap from '../components/InstallerMap';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function InstallersPage() {
  const [installers, setInstallers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstallers = async () => {
      const q = query(collection(db, 'installers'), where('status', '==', '확정'));
      const snap = await getDocs(q);
      setInstallers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchInstallers();
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#F0F6FC', fontSize: '24px', marginBottom: '8px' }}>
        전국 장착점 안내
      </h1>
      <p style={{ color: '#8B949E', marginBottom: '24px' }}>
        지도의 핀을 눌러 가까운 장착점을 확인하세요.
      </p>

      {loading ? (
        <p style={{ color: '#8B949E' }}>지도를 불러오는 중...</p>
      ) : (
        <InstallerMap installers={installers} />
      )}
    </div>
  );
}