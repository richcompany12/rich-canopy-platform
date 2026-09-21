// app/smartrider/guide/page.js
// 스마트라이더 사용설명서 — 앱을 설치한 라이더용
// 주소: https://richcanopy.kr/smartrider/guide/
//
// ⚠️ 표시가 붙은 곳은 대표님이 실제 앱과 맞는지 확인할 것
// 문구 원칙(1번 기조): "건물 메모"라고만 말한다. 비밀번호·출입 단어 쓰지 않는다.
//
// 그림 넣는 법: public/smartrider/guide/ 에 파일 → 아래 IMG 의 null 을 경로로 교체

export const metadata = {
  title: '스마트라이더 사용설명서',
  description: '도착 메모, 단축 버튼, 지도, 안전 알림까지 — 스마트라이더 사용법을 한 페이지에 모았습니다.',
};

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.richcompany.smartridernative3';

const IMG = {
  toast: null,     // 토스트 (주황 테두리 상태면 더 좋음)
  shortcut: null,  // 등록 화면 단축 버튼 줄
  map: null,       // 지도 화면
  alert: null,     // 강력알림 화면
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
};

const wrap = { maxWidth: 560, margin: '0 auto', padding: '0 22px' };

const TOC = [
  ['start', '처음 설정'],
  ['register', '건물 등록 · 단축 버튼'],
  ['toast', '도착 알림 (토스트)'],
  ['map', '지도 화면'],
  ['search', '검색'],
  ['alert', '안전 알림 (강력알림)'],
  ['floating', '플로팅 버튼'],
  ['backup', '백업 · 폰 바꿀 때'],
];

function Section({ id, n, title, children }) {
  return (
    <section id={id} style={{ ...wrap, paddingTop: 48, scrollMarginTop: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 6 }}>{String(n).padStart(2, '0')}</div>
      <h2 style={{ fontSize: 23, fontWeight: 800, lineHeight: 1.35, margin: '0 0 16px' }}>{title}</h2>
      {children}
    </section>
  );
}

function P({ children }) {
  return <p style={{ fontSize: 15.5, color: C.sub, lineHeight: 1.75, margin: '0 0 14px' }}>{children}</p>;
}

// 동작 설명 줄: [누르는 방법, 결과]
function Actions({ items }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 14, padding: '6px 16px', margin: '4px 0 16px' }}>
      {items.map(([how, what], i) => (
        <div key={how} style={{
          display: 'flex', gap: 14, padding: '12px 0',
          borderTop: i === 0 ? 'none' : `1px solid ${C.line}`,
        }}>
          <div style={{ flex: '0 0 92px', fontSize: 14.5, fontWeight: 700, color: C.green }}>{how}</div>
          <div style={{ fontSize: 15, color: C.ink, lineHeight: 1.6 }}>{what}</div>
        </div>
      ))}
    </div>
  );
}

function Tip({ children }) {
  return (
    <div style={{
      background: C.greenSoft, borderRadius: 12, padding: '14px 16px', margin: '4px 0 16px',
      fontSize: 15, color: C.greenDeep, lineHeight: 1.7,
    }}>
      {children}
    </div>
  );
}

function Shot({ src, label, alt }) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 14, border: `1px solid ${C.line}`, margin: '4px 0 16px' }} />;
  }
  return (
    <div style={{
      width: '100%', aspectRatio: '16 / 10', borderRadius: 14, margin: '4px 0 16px',
      border: `2px dashed ${C.line}`, background: '#F1F3F2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#98A29E', fontSize: 13, textAlign: 'center', padding: 20,
    }}>
      {label}
    </div>
  );
}

export default function SmartRiderGuide() {
  return (
    <div style={{ background: C.ivory, color: C.ink, minHeight: '100vh', paddingBottom: 60 }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      <style>{`
        .sr-root, .sr-root * { font-family: 'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; box-sizing: border-box; }
        .sr-toc a { display: block; padding: 11px 2px; color: ${C.ink}; text-decoration: none; font-size: 15.5px; border-top: 1px solid ${C.line}; }
        .sr-toc a:last-child { border-bottom: 1px solid ${C.line}; }
        .sr-toc a:focus-visible { outline: 3px solid ${C.orange}; outline-offset: 2px; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      <div className="sr-root">

        {/* ── 머리 ─────────────────────────────────── */}
        <header style={{ background: C.green, color: '#fff', padding: '40px 0 34px' }}>
          <div style={wrap}>
            <a href="/smartrider/" style={{ color: '#fff', opacity: 0.8, fontSize: 14, textDecoration: 'none' }}>← 스마트라이더</a>
            <h1 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.3, margin: '14px 0 10px' }}>사용설명서</h1>
            <p style={{ fontSize: 15.5, opacity: 0.9, lineHeight: 1.65, margin: 0 }}>
              처음 10분만 읽어두면, 그다음부터는 앱이 알아서 합니다.
            </p>
          </div>
        </header>

        {/* ── 목차 ─────────────────────────────────── */}
        <nav className="sr-toc" aria-label="목차" style={{ ...wrap, paddingTop: 28 }}>
          {TOC.map(([id, t], i) => (
            <a key={id} href={`#${id}`}>
              <span style={{ color: C.green, fontWeight: 700, marginRight: 10 }}>{String(i + 1).padStart(2, '0')}</span>{t}
            </a>
          ))}
        </nav>

        {/* ── 01 처음 설정 ─────────────────────────── */}
        <Section id="start" n={1} title="처음 설정">
          <P>로그인하면 권한 안내 화면이 나옵니다. 세 가지를 모두 허용해 주세요.</P>
          <Actions items={[
            ['위치', '반드시 "항상 허용". 배달앱을 보고 있을 때도 도착을 알아채려면 필요해요.'],
            ['알림', '안전 알림 소리와 앱 상태 표시에 씁니다.'],
            ['다른 앱 위에 표시', '배달앱 화면 위에 내 메모를 띄우는 데 씁니다.'],
          ]} />
          <Tip>
            <strong>알림이 늦게 뜬다면</strong><br />
            폰 설정 → 애플리케이션 → 스마트라이더 → 배터리 → <strong>제한 없음</strong><br />
            폰이 배터리를 아끼려고 위치 확인을 늦추는 경우가 있어요.
          </Tip>
        </Section>

        {/* ── 02 건물 등록 ─────────────────────────── */}
        <Section id="register" n={2} title="건물 등록 · 단축 버튼">
          <P>
            건물 앞에서 등록하면 지금 위치가 그대로 저장됩니다.
            <strong> 도착 메모</strong>에는 다음에 왔을 때 알고 싶은 것을 적어두세요.
            입구 위치, 가는 길, 주차 자리처럼요. 무엇을 적을지는 라이더님이 정합니다.
          </P>
          <P>자주 쓰는 말은 입력칸 위 <strong>단축 버튼</strong>으로 만들어두면 한 번에 들어갑니다.</P>
          <Actions items={[
            ['한 번 탭', '커서 자리에 글자가 들어갑니다.'],
            ['길게 누르기', '버튼 이름 바꾸기 · 삭제'],
            ['+ 버튼', '새 단축 버튼 추가 (최대 12개, 한 개당 10자)'],
          ]} />
          <Tip>
            처음엔 <strong>길게 · 눌러 · 수정</strong> 세 버튼이 들어 있어요. 버튼 이름 자체가 사용법입니다.
            길게 눌러서 내가 자주 쓰는 말로 바꿔 보세요.<br />
            건물 이름 줄에 만든 버튼은 <strong>검색 화면에서도 그대로</strong> 쓸 수 있어요.
          </Tip>
          <Shot src={IMG.shortcut} label="그림 — 등록 화면 단축 버튼 줄" alt="건물 등록 화면의 단축 버튼" />
        </Section>

        {/* ── 03 토스트 ───────────────────────────── */}
        <Section id="toast" n={3} title="도착 알림 (토스트)">
          <P>
            등록한 건물 근처(약 20m)에서 <strong>멈췄다고 판단되면 5초쯤 뒤</strong>에
            배달앱 화면 위로 내 메모가 올라옵니다. 그냥 지나갈 때는 뜨지 않아요.
          </P>
          <Actions items={[
            ['한 번 탭', <>테두리가 <strong style={{ color: C.orange }}>주황색</strong>으로 바뀌고 자동으로 닫히는 타이머가 멈춥니다. 천천히 보세요.</>],
            ['옆으로 밀기', '바로 닫힙니다.'],
            ['여러 개', '가까이 붙은 건물은 두 개 이상 함께 뜰 수 있어요.'],
          ]} />
          <Shot src={IMG.toast} label="그림 — 배달앱 위에 뜬 토스트" alt="배달앱 위에 뜬 스마트라이더 메모 알림" />
        </Section>

        {/* ── 04 지도 ─────────────────────────────── */}
        <Section id="map" n={4} title="지도 화면">
          <P>내가 등록한 건물이 지도에 모여 보입니다. 많이 모인 곳은 숫자 묶음으로 표시되고, 누르면 펼쳐져요.</P>
          <Actions items={[
            ['핀 한 번 탭', '메모 카드가 떠요. 필요한 것만 빠르게 확인합니다.'],
            ['메모카드 두 번 탭', '상세 화면으로 이동합니다.'],
            ['빈 곳 길게 누르기', '그 자리에 건물을 등록합니다. 복사등록/새로등록 두 가지 방법 중 고를 수 있어요.'],
          ]} />
          <Actions items={[
            ['복사해서 등록', '근처에 등록된 건물 정보를 불러와서, 달라진 것 몇 가지만 고치면 끝. 같은 단지 다른 동을 등록할 때 가장 빠릅니다.'],
            ['새로 등록', '처음부터 직접 입력합니다.'],
          ]} />
          <Shot src={IMG.map} label="그림 — 지도 화면" alt="등록한 건물이 표시된 지도 화면" />
        </Section>

        {/* ── 05 검색 ─────────────────────────────── */}
        <Section id="search" n={5} title="검색">
          <P>이름 일부만, 순서 상관없이, 초성으로도 찾을 수 있어요. 글자와 숫자를 붙여 써도 됩니다.</P>
          <Actions items={[
            ['순서 반대', '"마을 하늘" → 하늘마을'],
            ['초성', '"ㅎㄴㅁㅇ" → 하늘마을'],
            ['붙여 쓰기', '"ㅎㄴ103" → 하늘마을 103동'],
          ]} />
          <Tip>입력한 조각이 <strong>모두</strong> 들어 있는 건물만 나옵니다. 안 나오면 조각을 하나 줄여 보세요.</Tip>
        </Section>

        {/* ── 06 강력알림 ─────────────────────────── */}
        <Section id="alert" n={6} title="안전 알림 (강력알림)">
           <P>
            이륜차 후면번호판 단속 구간에 가까워지면 <strong>소리</strong>로 먼저 알려드립니다.
            헬멧을 쓰고 있어도 들리게 만들었어요. 내가 등록하지 않아도 모든 라이더에게 똑같이 울립니다.
          </P>
          <Actions items={[
            ['알림 거리', '기본 100m 전. 설정 화면에서 50m · 100m · 200m 중에 고를 수 있어요.'],
            ['목록 보기', '홈 화면 강력알림 탭에서 전체 구간을 볼 수 있습니다.'],
          ]} />
          <Tip>안전운전을 돕는 알림입니다. 알림이 없어도 늘 안전속도를 지켜 주세요.</Tip>
          <Shot src={IMG.alert} label="그림 — 안전 알림 화면" alt="후면 단속 구간 안전 알림 화면" />
        </Section>

        {/* ── 07 플로팅 버튼 ──────────────────────── */}
        <Section id="floating" n={7} title="플로팅 버튼">
          <P>
            앱을 켜두면 화면 가장자리에 작은 버튼이 떠 있어요. 버튼이 보이면 앱이 잘 돌아가고 있다는 뜻입니다.
          </P>
          <Actions items={[                                                   
            ['한 번 탭', '앱 열기 · 지도 열기 버튼이 나타납니다.'],                 
            ['앱 열기', '스마트라이더 홈 화면으로 바로 갑니다.'],                   
            ['지도 열기', '내 주변 등록 건물을 지도로 바로 봅니다.'],               
          ]} />
        </Section>

        {/* ── 08 백업 ─────────────────────────────── */}
        <Section id="backup" n={8} title="백업 · 폰 바꿀 때">
          <P>
            내 메모는 서버가 아니라 <strong>이 폰에만</strong> 있습니다.
            그래서 앱을 지우거나 폰을 바꾸면 메모도 함께 사라져요. 가끔 백업해 두세요.
          </P>
          <Actions items={[
            ['백업', '메뉴 → 백업. 내가 정한 비밀번호로 잠긴 파일이 만들어집니다.'],
            ['보관', '폰 밖 두 군데에 (예: 카톡 나에게 보내기 + PC).'],
            ['복원', '새 폰에서 로그인 → 권한 허용 → 메뉴 → 복원'],
          ]} />
          <Tip>
            백업 비밀번호를 잊으면 파일을 열 수 없습니다. 꼭 따로 적어두세요.<br />
            백업 파일은 단체방이나 공용 폴더에 올리지 마세요.
          </Tip>
        </Section>

        {/* ── 맨 아래 ──────────────────────────────── */}
        <section style={{ ...wrap, paddingTop: 48 }}>
          <a href={PLAY_URL} style={{
            display: 'block', textAlign: 'center', background: C.green, color: '#fff', textDecoration: 'none',
            fontSize: 17, fontWeight: 700, padding: '16px 0', borderRadius: 12,
          }}>
            아직 설치 전이라면 — Google Play에서 받기
          </a>
        </section>

        <footer style={{ ...wrap, paddingTop: 36, fontSize: 13, color: '#8A9490', lineHeight: 1.8 }}>
          <div>스마트라이더 · RichCompany</div>
          <a href="/smartrider/" style={{ color: '#8A9490' }}>소개</a>{' · '}
          <a href="/smartrider/privacy/" style={{ color: '#8A9490' }}>개인정보처리방침</a>
        </footer>

      </div>
    </div>
  );
}