// app/smartrider/terms/page.js
export const metadata = {
  title: '이용약관 | 스마트라이더',
  description: '스마트라이더(SmartRider) 이용약관',
};

function Article({ no, title, children }) {
  return (
    <section style={{ marginBottom: '36px' }}>
      <h2 style={{
        color: '#F0F6FC',
        fontSize: '17px',
        fontWeight: '700',
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: '0.5px solid #21262D'
      }}>
        제{no}조 ({title})
      </h2>
      <div style={{ color: '#8B949E', fontSize: '14px', lineHeight: '1.9' }}>
        {children}
      </div>
    </section>
  );
}

const p = { marginBottom: '8px' };

export default function SmartRiderTerms() {
  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <a href="/smartrider/" style={{ color: '#8B949E', fontSize: '13px', textDecoration: 'none' }}>
          ← 스마트라이더
        </a>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '12px', letterSpacing: '3px', marginBottom: '12px' }}>
            SMARTRIDER
          </p>
          <h1 style={{ color: '#F0F6FC', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            이용약관
          </h1>
          <p style={{ color: '#8B949E', fontSize: '14px' }}>
            스마트라이더 · 리치컴퍼니
          </p>
        </div>

        <Article no="1" title="목적">
          이 약관은 리치컴퍼니(대표 권순옥, 이하 "회사")가 제공하는 스마트라이더 앱(이하 "서비스")의
          이용 조건과 회사와 이용자의 권리·의무를 정합니다.
        </Article>

        <Article no="2" title="서비스 내용">
          회사는 건물 메모 저장, 위치 기반 건물 알림, 교통 단속 장비 안내,
          공용 건물 정보, 제휴 상점 정보 등을 제공합니다.
        </Article>

        <Article no="3" title="개인 데이터">
          <p style={p}>
            이용자가 작성한 메모·즐겨찾기·개인 건물은 이용자의 기기에만 저장되며
            회사 서버로 전송되지 않습니다.
          </p>
          <p>
            기기 분실, 앱 삭제 등으로 생긴 데이터 손실은 회사가 복구할 수 없으므로,
            이용자는 백업 기능을 이용해 직접 보관해야 합니다.
          </p>
        </Article>

        <Article no="4" title="공용 정보와 제보">
          <p style={p}>
            ① 공용 정보란 건물 이름, 위치, 샛길, 특이사항, 사진 등
            모든 이용자에게 보이는 정보를 말합니다.
          </p>
          <p style={p}>
            ② 이용자는 공용 정보나 제보에 출입 비밀번호, 개인 연락처 등
            타인의 권리를 침해하는 정보를 넣어서는 안 됩니다.
          </p>
          <p style={p}>
            ③ 이용자가 제보하거나 등록한 공용 정보에 대해, 이용자는 회사가 이를 무상으로,
            기간과 지역의 제한 없이 이용·수정·편집·가공할 수 있도록 허락합니다.
            이 허락에는 상업적 이용과 제휴사(배달 플랫폼, 배달대행사 등)에 대한 제공이 포함됩니다.
          </p>
          <p>
            ④ 제3항의 허락은 이용자가 탈퇴하거나 서비스가 종료된 뒤에도 유지됩니다.
            다만 개인정보는 개인정보처리방침에 따릅니다.
          </p>
        </Article>

        <Article no="5" title="교통 단속 장비 정보">
          단속 장비 정보는 공공기관 자료와 현장 확인을 바탕으로 한 참고용이며,
          정확성이나 최신성을 보증하지 않습니다. 교통법규 준수의 책임은 이용자에게 있습니다.
        </Article>

        <Article no="6" title="안전 운행">
          운행 중에는 앱을 조작하지 마십시오.
          운행 중 조작으로 생긴 사고에 대해 회사는 책임지지 않습니다.
        </Article>

        <Article no="7" title="광고">
          회사는 앱 안에 광고와 제휴 상점 정보를 게재할 수 있습니다.
        </Article>

        <Article no="8" title="유료 서비스">
          회사는 일부 기능을 유료로 전환하거나 새로운 유료 기능을 도입할 수 있으며,
          시행 30일 전에 앱 안에 알립니다.
        </Article>

        <Article no="9" title="금지 행위">
          <p style={p}>이용자는 다음 행위를 해서는 안 됩니다.</p>
          {'· 허위 정보 등록'}<br />
          {'· 타인의 정보를 동의 없이 게시'}<br />
          {'· 서비스 데이터의 무단 수집·복제·재배포'}<br />
          {'· 앱의 변조 또는 비정상적인 이용'}
          <p style={{ marginTop: '12px' }}>위반 시 회사는 서비스 이용을 제한할 수 있습니다.</p>
        </Article>

        <Article no="10" title="책임의 제한">
          회사는 천재지변, 통신 장애, 이용자 기기의 문제 등
          회사가 통제할 수 없는 사유로 생긴 손해에 대해 책임지지 않습니다.
        </Article>

        <Article no="11" title="약관의 변경">
          회사가 약관을 변경할 때는 시행 7일 전(이용자에게 불리한 변경은 30일 전)에
          앱 또는 웹사이트를 통해 알립니다.
        </Article>

        <Article no="12" title="준거법 및 관할">
          이 약관은 대한민국 법률에 따르며,
          분쟁이 생기면 민사소송법상 관할 법원에서 해결합니다.
        </Article>

        <div style={{
          textAlign: 'center',
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '0.5px solid #21262D',
          color: '#8B949E',
          fontSize: '13px',
          lineHeight: '1.9'
        }}>
          {'시행일 - 2026년 10월 5일'}<br />
          리치컴퍼니<br />
          <a href="/smartrider/privacy" style={{ color: '#4FC3F7', textDecoration: 'none' }}>
            개인정보처리방침 보기
          </a>
        </div>

      </div>
    </main>
  );
}