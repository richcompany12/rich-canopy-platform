// app/components/InstallerMap.js
'use client';

import { useEffect, useRef, useState } from 'react';

// installers 배열 형식 예시:
// [{ id, name, lat, lng, photos: ["url1", "url2", ...] }]

export default function InstallerMap({ installers = [] }) {
  const mapContainerRef = useRef(null);
  const [selectedInstaller, setSelectedInstaller] = useState(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        setTimeout(initMap, 300);
        return;
      }

      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(36.5, 127.8);
        const map = new window.kakao.maps.Map(mapContainerRef.current, {
          center,
          level: 12,
        });

        installers.forEach((installer) => {
          const position = new window.kakao.maps.LatLng(installer.lat, installer.lng);
          const marker = new window.kakao.maps.Marker({ position, map });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            setSelectedInstaller(installer);
            map.panTo(position);
          });
        });
      });
    };

    initMap();
  }, [installers]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '500px',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 0,
        }}
      />

      {/* 핀 클릭시 장착점 정보 + 대표사진 갤러리 카드 */}
      {selectedInstaller && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            maxWidth: '360px',
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '10px',
            padding: '16px',
            color: '#F0F6FC',
            zIndex: 10,
            maxHeight: '360px',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '16px' }}>{selectedInstaller.name}</strong>
              {selectedInstaller.tier === '총판' && (
                <span
                  style={{
                    marginLeft: '6px',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: '#4FC3F7',
                    color: '#0d1117',
                    fontWeight: 'bold',
                  }}
                >
                  총판
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedInstaller(null)}
              style={{ background: 'none', border: 'none', color: '#8B949E', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          {selectedInstaller.address && (
            <p style={{ color: '#8B949E', fontSize: '12px', marginTop: '4px' }}>
              {selectedInstaller.address}
            </p>
          )}
          {selectedInstaller.phone && (
            <p style={{ color: '#8B949E', fontSize: '12px', marginTop: '2px' }}>
              {selectedInstaller.phone}
            </p>
          )}

          {/* 대표사진 갤러리 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              marginTop: '12px',
            }}
          >
            {(selectedInstaller.photos || []).map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`${selectedInstaller.name} 사진 ${idx + 1}`}
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  borderRadius: '6px',
                }}
              />
            ))}
          </div>

          {(!selectedInstaller.photos || selectedInstaller.photos.length === 0) && (
            <p style={{ color: '#484F58', fontSize: '12px', marginTop: '12px' }}>
              등록된 사진이 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
}