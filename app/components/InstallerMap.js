// app/components/InstallerMap.js
'use client';

import { useEffect, useRef, useState } from 'react';

// installers 배열 형식 예시:
// [{ id, name, lat, lng, bikes: [{ bikeId, bikeName, thumbnailUrl }] }]

export default function InstallerMap({ installers = [] }) {
  const mapContainerRef = useRef(null);
  const [selectedInstaller, setSelectedInstaller] = useState(null);

  useEffect(() => {
    // 카카오 SDK가 아직 로드 안됐으면 잠깐 기다렸다가 재시도
    const initMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        setTimeout(initMap, 300);
        return;
      }

      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(36.5, 127.8); // 대한민국 중심 대략 좌표
        const map = new window.kakao.maps.Map(mapContainerRef.current, {
          center,
          level: 12, // 숫자가 클수록 넓게 보임(전국 단위는 11~13 추천)
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

      {/* 핀 클릭시 간략 정보 카드 */}
      {selectedInstaller && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            maxWidth: '320px',
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '10px',
            padding: '16px',
            color: '#F0F6FC',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '16px' }}>{selectedInstaller.name}</strong>
            <button
              onClick={() => setSelectedInstaller(null)}
              style={{ background: 'none', border: 'none', color: '#8B949E', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            {(selectedInstaller.bikes || []).map((bike) => (
              <div
                key={bike.bikeId}
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => {
                  // TODO: 다음 단계에서 상세 모달/페이지 연결
                  console.log('상세보기 클릭:', bike.bikeId);
                }}
              >
                <img
                  src={bike.thumbnailUrl}
                  alt={bike.bikeName}
                  style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ fontSize: '12px', color: '#8B949E', marginTop: '4px' }}>
                  {bike.bikeName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}