// app/admin/guide/page.js
'use client';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import {
  addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc,
} from 'firebase/firestore';

// 최초 1회 seed 시 사용되는 기본 7단계 데이터
const SEED_STEPS = [
  {
    order: 1,
    title: '탑박스 지지대 설치',
    status: 'confirmed',
    content:
      `지지대 자체가 프로파일 구조라서, 안에 들어있는 인서트 너트가 볼트를 풀면 위/아래로 자유롭게 움직이고, 원하는 높이에서 다시 조이면 고정됩니다.

소비자가 헷갈리는 포인트 3가지
1. 어느 볼트가 "높낮이 조절용"인지 (다른 고정용 볼트와 구분)
2. 완전히 빼는 게 아니라 살짝만 풀어서 슬라이딩만 되게 하면 된다는 점
3. 원하는 높이에서 조일 때 좌우 수평(레벨링)을 반드시 같이 맞춰야 한다는 점`,
    caution: '좌우 중 한쪽만 먼저 완전히 조이면 반대쪽이 틀어집니다. 양쪽을 번갈아가며 조여주세요. 레벨링이 틀어지면 이후 슬라이딩 스크린 오작동의 원인이 됩니다.',
    images: [],
  },
  {
    order: 2,
    title: '윈드스크린 파츠 설치',
    status: 'confirmed',
    content:
      `타공 위치는 아래 3가지 조건을 동시에 만족하는 지점에 잡아야 합니다.

1. 롤러 수평 조건: 파츠에 달린 롤러가 포크발과 수평이 되어야 합니다. (포크발과 일직선으로 타공하는 것이 아닙니다 — 밴드가 걸리는 롤러 간격과 타공 간격은 서로 다른 값입니다)
2. 살두께 확보 조건: 윈드스크린은 대부분 사다리꼴(위로 갈수록 좁아짐) 형상이라, 윈드스크린 외곽 라인의 적절히 안쪽, 곡률이 심하지 않은 구간을 골라야 합니다.
3. 오버랩 조건: 전면 슬라이딩 스크린을 완전히 내렸을 때 윈드스크린과 약 5cm 오버랩이 생기는 위치여야 합니다. (비/찬바람 유입 최소화)`,
    caution: '이 3가지 조건의 교집합 지점을 찾는 것이 핵심입니다. 타공 전 반드시 임시 고정(클램프 등)으로 위치를 확정한 뒤 진행하세요.',
    images: [],
  },
  {
    order: 3,
    title: '포크발 간격 조정',
    status: 'confirmed',
    content:
      `포크발의 각도는 이미 밴딩되어 나온 고정값이라 바꿀 수 없지만, 폭(너비)은 조절 가능합니다. 포크발을 잡아주는 스텐 T파이프의 볼트를 풀면 좌우로 벌리거나 좁힐 수 있습니다.

순서가 절대적으로 중요합니다: 윈드스크린 파츠(PART 2)를 먼저 설치한 뒤, 그 파츠 간격보다 3~5cm 더 넓게 포크발 폭을 조정하세요.`,
    caution: '반드시 PART 2(윈드스크린 파츠 설치)가 끝난 뒤 진행하세요. 순서를 반대로 하면 윈드스크린이 예상보다 넓을 경우 장착 자체가 불가능해질 수 있습니다.',
    images: [],
  },
  {
    order: 4,
    title: '포크발 ↔ 윈드스크린 파츠 연결 (루프 위치 조정)',
    status: 'confirmed',
    content:
      `포크발 측면의 빨간 쇽업쇼바를 당기면 루프가 들리고, 밀면 루프가 처집니다. 이는 소비자의 앉은키/헬멧 종류에 따라 달라지는 개인화 조정 포인트입니다.

루프가 들리거나 처지면 포크발 각도가 변하고, 그에 맞춰 루프를 앞/뒤로 이동시켜야 최적 결합 위치를 찾을 수 있습니다.

포크발과 윈드스크린의 각도가 서로 다르기 때문에(예: 포크발 45도, 윈드스크린 70도), 아래쪽을 맞추면 위쪽이 멀어지고 위쪽을 맞추면 아래쪽이 앞으로 튀어나오는 현상이 생깁니다. 프로파일은 4면 모두에 인서트 너트 체결이 가능하므로, 아래쪽 포크발 파츠는 프로파일 뒷면에, 위쪽 포크발 파츠는 앞면에 체결하여 각도 오차를 상쇄합니다.`,
    caution: '결합부에 사용되는 빨간 실리콘 밴드 위치가 안 맞으면 간섭이 생기고, 주행 중 진동으로 쓸려서 쉽게 끊어집니다. 반드시 이 단계에서 위치를 정확히 맞춰주세요.',
    images: [],
  },
  {
    order: 5,
    title: '까치발(서포트 지지대) 연결 및 앉은키 맞춤',
    status: 'pending',
    content: '',
    caution: '',
    images: [],
  },
  {
    order: 6,
    title: '전면 슬라이딩 스크린 ↔ 포크발 결합',
    status: 'pending',
    content: '',
    caution: '',
    images: [],
  },
  {
    order: 7,
    title: '갠트리 롤러 강도(슬라이딩 감도) 조절',
    status: 'pending',
    content: '',
    caution: '',
    images: [],
  },
];

export default function AdminGuidePage() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSteps = async () => {
    setLoading(true);
    const q = query(collection(db, 'guideSteps'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    setSteps(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleSeed = async () => {
    if (!confirm('기본 7단계 데이터를 불러올까요? (최초 1회만 실행하세요)')) return;
    for (const s of SEED_STEPS) {
      await addDoc(collection(db, 'guideSteps'), s);
    }
    fetchSteps();
  };

  const handleDelete = async (id) => {
    if (!confirm('이 단계를 삭제할까요?')) return;
    await deleteDoc(doc(db, 'guideSteps', id));
    fetchSteps();
  };

  const moveStep = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= steps.length) return;
    const a = steps[index];
    const b = steps[target];
    await updateDoc(doc(db, 'guideSteps', a.id), { order: b.order });
    await updateDoc(doc(db, 'guideSteps', b.id), { order: a.order });
    fetchSteps();
  };

  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '48px 20px' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h1 style={{ color: '#F0F6FC', fontSize: '22px', fontWeight: '700' }}>장착 가이드 관리</h1>
          <a href="/admin/guide/new" style={{
            backgroundColor: '#4FC3F7', color: '#111418',
            padding: '10px 20px', borderRadius: '4px',
            fontSize: '13px', fontWeight: '700',
          }}>
            + 새 단계 추가
          </a>
        </div>

        {loading ? (
          <p style={{ color: '#484F58' }}>불러오는 중...</p>
        ) : steps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#8B949E', fontSize: '14px', marginBottom: '20px' }}>
              등록된 가이드 단계가 없습니다.
            </p>
            <button onClick={handleSeed} style={{
              backgroundColor: '#4FC3F7', color: '#111418',
              padding: '12px 24px', borderRadius: '4px',
              fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer',
            }}>
              기본 7단계 불러오기 (최초 1회)
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {steps.map((step, i) => (
              <div key={step.id} style={{
                border: '0.5px solid #21262D', borderRadius: '8px',
                backgroundColor: '#161b22', padding: '16px 18px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                  <span style={{ color: '#4FC3F7', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>
                    #{i + 1}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ color: '#F0F6FC', fontSize: '14.5px', fontWeight: '500' }}>{step.title}</p>
                    <span style={{
                      fontSize: '11px',
                      color: step.status === 'pending' ? '#e8c468' : '#4FC3F7',
                    }}>
                      {step.status === 'pending' ? '내용 준비 중' : '확정'}
                      {' · 사진 '}{(step.images || []).length}장
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button onClick={() => moveStep(i, -1)} disabled={i === 0} style={iconBtnStyle}>↑</button>
                  <button onClick={() => moveStep(i, 1)} disabled={i === steps.length - 1} style={iconBtnStyle}>↓</button>
                  <a href={`/admin/guide/edit?id=${step.id}`} style={{ ...iconBtnStyle, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>수정</a>
                  <button onClick={() => handleDelete(step.id)} style={{ ...iconBtnStyle, color: '#f47174' }}>삭제</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const iconBtnStyle = {
  backgroundColor: 'transparent',
  border: '0.5px solid #21262D',
  borderRadius: '4px',
  color: '#8B949E',
  fontSize: '12px',
  padding: '8px 12px',
  cursor: 'pointer',
};