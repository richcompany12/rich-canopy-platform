// app/smartrider/page.js
// 스마트라이더 소개 페이지 — 명함 QR로 들어오는 라이더용
// 주소: https://richcanopy.kr/smartrider/
// 사용설명서: app/smartrider/guide/page.js (https://richcanopy.kr/smartrider/guide/)
//
// 이미지: public/smartrider/ 폴더의 JPG를 아래 IMG 에서 연결
// 배포: npm run build → firebase deploy --only hosting

export const metadata = {
  title: '스마트라이더 — 건물이 먼저 알려주는 라이더 앱',
  description: '자주 가는 건물에 메모를 남겨두면, 도착할 때 먼저 띄워드립니다. 내 메모는 내 폰에만 저장됩니다.',
  openGraph: {
    title: '스마트라이더 — 건물이 먼저 알려주는 라이더 앱',
    description: '한 번 간 건물, 다음엔 헤매지 마세요. 건물이 먼저 알려줍니다.',
        images: ['https://richcanopy.kr/smartrider/og.jpg'],
  },
};

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.richcompany.smartridernative3';

// 스토어 스크린샷과 같은 이미지 (웹용 JPG, public/smartrider/ 에 저장)
// 파일이 아직 없으면 해당 줄을 null 로 바꾸면 회색 자리로 보인다
const IMG = {
  toast: '/smartrider/toast.jpg',       // 도착하면, 내 메모가 먼저 뜹니다
  map: '/smartrider/map.jpg',           // 내 건물을 지도에서 한눈에
  alert: '/smartrider/alert.jpg',       // 후면 단속 구간, 미리 알려드려요
  buttons: '/smartrider/buttons.jpg',   // 자주 쓰는 말은 나만의 버튼으로
  safe: '/smartrider/safe.jpg',         // 내 메모는 내 폰에만
};

const C = {
  green: '#075B4B',
  greenDeep: '#04382E',
  greenSoft: '#E4EFEB',
  ivory: '#FBFAF7',
  ink: '#1C2321',
  sub: '#55605C',
  line: '#DCE3E0',
  orange: '#F28C28',
  red: '#C0392B',
};

const wrap = { maxWidth: 480, margin: '0 auto', padding: '0 22px' };

function Slot({ src, label, alt }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ width: '100%', maxWidth: 340, margin: '0 auto', display: 'block', borderRadius: 14, border: `1px solid ${C.line}` }}
      />
    );
  }
  return (
    <div style={{
      width: '100%', maxWidth: 340, margin: '0 auto', aspectRatio: '9 / 16', borderRadius: 14,
      border: `2px dashed ${C.line}`, background: '#F1F3F2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#98A29E', fontSize: 13, textAlign: 'center', padding: 20,
    }}>
      {label}
    </div>
  );
}

function Feature({ title, body, img, label, alt }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <h3 style={{ fontSize: 21, fontWeight: 700, color: C.ink, lineHeight: 1.35, margin: '0 0 8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: 15.5, color: C.sub, lineHeight: 1.7, margin: '0 0 16px' }}>{body}</p>
      <Slot src={img} label={label} alt={alt} />
    </div>
  );
}

function Faq({ q, children }) {
  return (
    <details className="sr-faq">
      <summary>{q}</summary>
      <div style={{ padding: '0 2px 18px', fontSize: 15, color: C.sub, lineHeight: 1.7 }}>{children}</div>
    </details>
  );
}

export default function SmartRiderLanding() {
  return (
    <div style={{ background: C.ivory, color: C.ink, minHeight: '100vh', paddingBottom: 96 }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      <style>{`
        .sr-root, .sr-root * { font-family: 'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; box-sizing: border-box; }
        .sr-toast { animation: srUp 0.7s cubic-bezier(.2,.8,.2,1) 0.9s both; }
        @keyframes srUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .sr-toast { animation: none; } }
        .sr-faq { border-top: 1px solid ${C.line}; }
        .sr-faq:last-child { border-bottom: 1px solid ${C.line}; }
        .sr-faq summary { list-style: none; cursor: pointer; padding: 18px 28px 18px 2px; font-size: 16px; font-weight: 600; color: ${C.ink}; position: relative; }
        .sr-faq summary::-webkit-details-marker { display: none; }
        .sr-faq summary::after { content: '+'; position: absolute; right: 4px; top: 14px; font-size: 22px; font-weight: 400; color: ${C.green}; }
        .sr-faq[open] summary::after { content: '−'; }
        .sr-cta:focus-visible, .sr-faq summary:focus-visible { outline: 3px solid ${C.orange}; outline-offset: 3px; }
      `}</style>

      <div className="sr-root">

        {/* ── 첫 화면 ───────────────────────────────── */}
        <section style={{ background: C.green, color: '#fff', paddingTop: 44, overflow: 'hidden' }}>
          <div style={wrap}>
            <p style={{ fontSize: 15, fontWeight: 600, opacity: 0.85, margin: '0 0 14px' }}>스마트라이더</p>
            <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em', margin: '0 0 14px' }}>
              한 번 간 건물,<br />다음엔 헤매지 마세요.<br />건물이 먼저 알려줍니다.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.9, margin: '0 0 30px' }}>
              자주 가는 건물에 메모를 남겨두면,<br />도착하는 순간 쓰던 앱 화면 위에 먼저 뜹니다.
            </p>

            {/* 코드로 그린 폰 — 흐린 배달앱 위로 토스트가 올라온다 */}
            <div style={{
              width: 260, margin: '0 auto', height: 330, background: '#10201C',
              borderRadius: '34px 34px 0 0', padding: '14px 12px 0', position: 'relative',
              boxShadow: '0 -2px 0 2px #0A1512 inset',
            }}>
              <div style={{ background: '#E9ECEB', borderRadius: '24px 24px 0 0', height: '100%', padding: 16, position: 'relative', overflow: 'hidden' }}>
                {/* 흐린 배달앱 */}
                <div aria-hidden="true" style={{ filter: 'blur(1.5px)', opacity: 0.7 }}>
                  <div style={{ height: 14, width: '55%', background: '#C9CFCD', borderRadius: 4, marginBottom: 14 }} />
                  <div style={{ height: 90, background: '#D5DAD8', borderRadius: 10, marginBottom: 12 }} />
                  <div style={{ height: 10, width: '80%', background: '#C9CFCD', borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 10, width: '65%', background: '#C9CFCD', borderRadius: 4, marginBottom: 16 }} />
                  <div style={{ height: 38, background: '#C3C9C7', borderRadius: 8 }} />
                </div>
                {/* 우리 토스트 */}
                <div className="sr-toast" role="img" aria-label="스마트라이더 알림 예시: 샘플오피스텔, 후문 계단이 빨라요" style={{
                  position: 'absolute', left: 10, right: 10, bottom: 18,
                  background: '#fff', borderRadius: 14, padding: '14px 14px 12px',
                  boxShadow: '0 10px 30px rgba(4,56,46,0.28)', color: C.ink,
                }}>
                  <div style={{ fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 6 }}>도착 · 20m</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>샘플오피스텔</div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: C.green, lineHeight: 1.35 }}>
                    후문 계단이 빨라요
                  </div>
                  <div style={{ fontSize: 12.5, color: C.sub, marginTop: 6 }}>엘베는 안쪽 두 번째</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 공감 ─────────────────────────────────── */}
        <section style={{ ...wrap, paddingTop: 52, paddingBottom: 20 }}>
          <h2 style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.35, margin: '0 0 22px' }}>이런 적 있죠?</h2>
          {[
            '도착해서 요청사항 다시 열어보기',
            '동 입구가 어디였더라, 단지 한 바퀴',
            '지난번에 후문이 빨랐는데… 어디였지',
          ].map((t) => (
            <p key={t} style={{
              fontSize: 16.5, lineHeight: 1.5, margin: '0 0 12px', padding: '14px 16px',
              background: '#fff', border: `1px solid ${C.line}`, borderRadius: 12,
            }}>
              {t}
            </p>
          ))}
          <p style={{ fontSize: 16, color: C.sub, lineHeight: 1.7, margin: '18px 0 0' }}>
            한 콜에 30초씩만 줄어도, 하루면 꽤 큽니다.
          </p>
        </section>

        {/* ── 기능 ─────────────────────────────────── */}
        <section style={{ ...wrap, paddingTop: 44 }}>
          <Feature
            title="도착하면 내 메모가 먼저 뜹니다"
            body="자주 가는 건물에 메모를 한 번 남겨두세요. 다음에 근처에 가면 쓰던 앱 화면 위에 바로 떠요. 폰을 꺼내 뒤질 필요가 없습니다."
            img={IMG.toast}
            label="토스트 이미지"
            alt="다른 앱 화면 위에 뜬 스마트라이더 도착 메모"
          />
          <Feature
            title="내 건물을 지도에서 한눈에"
            body="등록한 건물이 지도에 모여 보입니다. 샛길, 동 배치 같은 나만 아는 정보도 건물마다 적어둘 수 있어요."
            img={IMG.map}
            label="지도 이미지"
            alt="등록한 건물이 지도에 묶음으로 표시된 화면"
          />
          <Feature
            title="후면 단속 구간, 미리 알려드려요"
            body="이륜차 후면번호판 단속 구간에 가까워지면 소리로 알려드립니다. 헬멧을 쓰고 있어도 들리게 만들었어요. 안전운전에 집중하세요."
            img={IMG.alert}
            label="안전 알림 이미지"
            alt="후면 단속 구간 안전 알림 화면"
          />
          <Feature
            title="자주 쓰는 말은 나만의 버튼으로"
            body="버튼을 길게 눌러 원하는 말로 바꾸세요. 한 번 누르면 바로 입력됩니다. 장갑 낀 손으로도 빠르게."
            img={IMG.buttons}
            label="단축 버튼 이미지"
            alt="건물 등록 화면의 나만의 단축 버튼"
          />
        </section>

        {/* ── 안심 ─────────────────────────────────── */}
        <section style={{ background: C.greenSoft, padding: '48px 0', marginTop: 8 }}>
          <div style={wrap}>
            <h2 style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.35, margin: '0 0 14px', color: C.greenDeep }}>
              내 메모는 서버에 없습니다
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: C.ink, margin: '0 0 12px' }}>
              내가 적은 메모는 <strong>내 폰에만</strong> 저장됩니다. 인터넷으로 보내지 않아요.
              만든 저희도 볼 수 없습니다.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: C.ink, margin: '0 0 22px' }}>
              폰을 바꿀 땐 내가 정한 비밀번호로 잠긴 백업 파일로 옮기면 됩니다.
            </p>
            <Slot src={IMG.safe} label="안심 이미지" alt="메모가 폰 안에만 저장된다는 안내 그림" />
          </div>
        </section>

        {/* ── 시작하는 법 (실제 순서라 번호를 쓴다) ───── */}
        <section style={{ ...wrap, paddingTop: 52 }}>
          <h2 style={{ fontSize: 25, fontWeight: 800, margin: '0 0 22px' }}>3분이면 시작</h2>
          {[
            ['설치하고 로그인', '이메일로 가입합니다.'],
            ['권한 3가지 허용', '위치는 꼭 "항상 허용"으로 골라주세요. 휴대폰 설정에서 스마트라이더의 배터리를 "제한 없음"으로 해두면 더 제때 떠요.'],
            ['자주 가는 건물 등록', '오늘 간 건물부터 하나씩. 쌓일수록 빛을 발합니다.'],
          ].map(([t, d], i) => (
            <div key={t} style={{ display: 'flex', gap: 16, marginBottom: 22 }}>
              <div style={{
                flex: '0 0 36px', height: 36, borderRadius: 18, background: C.green, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16,
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, paddingTop: 6 }}>{t}</div>
                <div style={{ fontSize: 15, color: C.sub, lineHeight: 1.65 }}>{d}</div>
              </div>
            </div>
          ))}
          <a href="/smartrider/guide/" style={{
            display: 'block', textAlign: 'center', padding: '14px 0', marginTop: 4,
            border: `1px solid ${C.green}`, borderRadius: 12, color: C.green,
            fontSize: 15.5, fontWeight: 700, textDecoration: 'none', background: '#fff',
          }}>
            설치하셨나요? 사용설명서 보기 →
          </a>
        </section>

        {/* ── 무료 안내 ────────────────────────────── */}
        <section style={{ ...wrap, paddingTop: 20 }}>
          <div style={{ border: `2px solid ${C.orange}`, borderRadius: 16, padding: '24px 22px', background: '#fff' }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: C.orange, lineHeight: 1.1, marginBottom: 10 }}>
              지금은 전부 무료
            </div>
            <p style={{ fontSize: 15, color: C.sub, lineHeight: 1.65, margin: 0 }}>
              도착 메모 자동 표시 기능은 추후 월 구독으로 바뀔 예정이에요.
              먼저 시작하신 분들께는 무료 기간을 드립니다.
              써보시고 불편한 점을 알려주시면 바로 고칩니다.
            </p>
          </div>
        </section>

        {/* ── 자주 묻는 질문 ────────────────────────── */}
        <section style={{ ...wrap, paddingTop: 52 }}>
          <h2 style={{ fontSize: 25, fontWeight: 800, margin: '0 0 12px' }}>자주 묻는 질문</h2>
          <Faq q="아이폰도 되나요?">
            지금은 안드로이드 전용입니다. 다른 앱 위에 정보를 띄우는 기능을 아이폰이 허용하지 않아서요.
          </Faq>
          <Faq q="처음부터 건물 정보가 다 들어 있나요?">
            아니요. 내가 가는 건물을 내가 적어두는 방식입니다. 대신 한 번 적어두면 그 뒤로는 알아서 떠요.
            다만 지나가기만 할 때는 뜨지 않고, 건물 근처에서 멈췄다고 판단되면 5초쯤 뒤에 뜹니다.
            배치도 같은 공용 정보는 지역별로 조금씩 채우고 있습니다.
          </Faq>
          <Faq q="배터리 많이 먹나요?">
            평소 쓰시던 것과 크게 차이 없습니다. 아주 조금 차이가 있을 수 있지만, 크게 못 느끼실 거예요.
          </Faq>
          <Faq q="돈이 드나요?">
            지금은 모든 기능이 무료입니다. 도착 메모 자동 표시는 추후 월 구독으로 바뀔 예정이며,
            먼저 시작하신 분들께는 무료 기간을 드립니다. 앱 안에 광고가 나올 수 있지만,
            달리는 중에 보는 화면에는 광고를 넣지 않습니다.
          </Faq>
          <Faq q="내 메모, 다른 사람이 볼 수 있나요?">
            메모는 서버로 보내지 않고 내 폰에만 저장됩니다. 만든 저희도 볼 수 없고, 서버에 없으니 새어나갈 곳도 없습니다.
            백업 파일도 내가 정한 비밀번호로 잠겨서, 파일만으로는 열 수 없습니다.
          </Faq>
          <Faq q="메모에는 뭘 적으면 되나요?">
            무엇을 적을지는 라이더님이 정합니다. 입구 위치, 주차 자리, 가는 길처럼 다음에 도움이 될 것들이면 충분해요.
            다만 배달하며 알게 된 고객 정보는 배달 목적 외에 쓰거나 다른 사람과 나누지 말아 주세요.
          </Faq>
        </section>

        {/* ── 맨 아래 ──────────────────────────────── */}
        <footer style={{ ...wrap, paddingTop: 44, paddingBottom: 20, fontSize: 13, color: '#8A9490', lineHeight: 1.8 }}>
          <div>스마트라이더 · RichCompany</div>
          <a href="/smartrider/guide/" style={{ color: '#8A9490' }}>사용설명서</a>{' · '}
          <a href="/smartrider/privacy/" style={{ color: '#8A9490' }}>개인정보처리방침</a>
        </footer>

        {/* ── 하단 고정 버튼 ────────────────────────── */}
        <div style={{
          position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 50,
          padding: '12px 16px calc(12px + env(safe-area-inset-bottom, 0px))',
          background: 'rgba(251,250,247,0.94)', borderTop: `1px solid ${C.line}`,
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        }}>
          <a
            className="sr-cta"
            href={PLAY_URL}
            style={{
              display: 'block', maxWidth: 448, margin: '0 auto', textAlign: 'center',
              background: C.green, color: '#fff', textDecoration: 'none',
              fontSize: 17, fontWeight: 700, padding: '16px 0', borderRadius: 12,
            }}
          >
            Google Play에서 받기
          </a>
        </div>

      </div>
    </div>
  );
}