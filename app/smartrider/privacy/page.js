export const metadata = {
  title: '개인정보처리방침 | 스마트라이더',
  description: '스마트라이더(SmartRider) 개인정보처리방침',
};

function Section({ no, title, children }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{
        color: '#F0F6FC',
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '14px',
        paddingBottom: '10px',
        borderBottom: '0.5px solid #21262D'
      }}>
        {no}. {title}
      </h2>
      <div style={{ color: '#8B949E', fontSize: '14px', lineHeight: '1.9' }}>
        {children}
      </div>
    </section>
  );
}

export default function SmartRiderPrivacy() {
  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <a href="/smartrider/" style={{ color: '#8B949E', fontSize: '13px', textDecoration: 'none' }}>  {/* ★ 새 줄 */}
          ← 스마트라이더                                                                              {/* ★ 새 줄 */}
        </a>                                                                                          {/* ★ 새 줄 */}

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '12px', letterSpacing: '3px', marginBottom: '12px' }}>
            SMARTRIDER
          </p>
          <h1 style={{ color: '#F0F6FC', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            개인정보처리방침
          </h1>
          <p style={{ color: '#8B949E', fontSize: '14px' }}>
            스마트라이더 · 리치컴퍼니
          </p>
        </div>

        <div style={{
          border: '0.5px solid #4FC3F7',
          borderRadius: '6px',
          padding: '20px',
          marginBottom: '40px'
        }}>
          <p style={{ color: '#4FC3F7', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>
            건물 메모는 수집하지 않습니다
          </p>
          <p style={{ color: '#8B949E', fontSize: '13px', lineHeight: '1.8' }}>
            이용자가 건물별로 기록한 메모는 이용자의 기기에만
            저장되며 회사 서버로 전송되지 않습니다. 회사는 해당 정보를 열람할 수 없습니다.
          </p>
        </div>

        <Section no="1" title="수집하는 개인정보">
          <p style={{ marginBottom: '10px' }}>회사는 다음의 정보를 수집합니다.</p>
          {'· 이메일 주소 - 회원 가입 및 로그인'}<br />
          {'· 위치 정보 - 근접 알림 기능 제공'}<br />
          {'· 제보 내용 및 사진 - 이용자가 제보 기능을 이용한 경우에 한함'}<br />
          {'· 광고 ID 등 기기 정보 - 광고 제공 (11조 참고)'}
          <p style={{ marginTop: '14px' }}>
            주민등록번호, 연락처, 결제 정보는 수집하지 않습니다.
          </p>
        </Section>

        <Section no="2" title="수집하지 않는 정보">
          {'· 이용자가 등록한 건물 목록 및 도착 메모'}<br />
          {'· 즐겨찾기 내역'}
          <p style={{ marginTop: '14px' }}>
            위 정보는 이용자 기기 내부 저장소에만 보관되며 서버로 전송되지 않습니다.
            기기의 자동 백업에서도 제외되도록 설정되어 있습니다.
          </p>
        </Section>

        <Section no="3" title="위치 정보의 수집 및 이용">
          <p style={{ marginBottom: '10px' }}>
            스마트라이더는 앱이 종료되거나 화면이 꺼진 상태에서도
            기기의 위치를 확인합니다(백그라운드 위치).
          </p>
          <p style={{ marginBottom: '10px' }}>이용 목적은 다음과 같습니다.</p>
          {'· 이용자가 등록한 건물 근처에 도착했을 때 해당 건물의 정보를 화면에 표시'}<br />
          {'· 교통 단속 장비가 설치된 구간에 진입했을 때 안전운전 안내'}
          <p style={{ marginTop: '14px', color: '#F0F6FC' }}>
            수집된 위치 정보는 서버로 전송되지 않으며, 기기 내에서 처리된 후
            별도로 저장되지 않습니다. 회사는 이용자의 이동 경로를 알 수 없습니다.
          </p>
          <p style={{ marginTop: '14px' }}>
            위치 정보 제공은 기기 설정에서 언제든 철회할 수 있으며,
            철회 시 근접 알림 기능은 동작하지 않습니다.
          </p>
        </Section>

        <Section no="4" title="보유 및 이용 기간">
          {'· 회원 정보 - 회원 탈퇴 시 지체 없이 파기'}<br />
          {'· 제보 내용 및 사진 - 회원 탈퇴 시 함께 삭제'}<br />
          {'· 위치 정보 - 별도로 저장하지 않음'}
        </Section>

        <Section no="5" title="개인정보의 제3자 제공">
          회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
          다만 법령에 따라 수사기관의 적법한 요청이 있는 경우는 예외로 합니다.
          앱에 포함된 광고 모듈의 정보 수집은 11조(광고)를 참고해 주세요.
        </Section>

        <Section no="6" title="처리 위탁">
          <p style={{ marginBottom: '10px' }}>
            회사는 서비스 운영을 위해 다음 업체에 개인정보 처리를 위탁합니다.
          </p>
          {'· Google LLC (Firebase) - 회원 인증, 데이터 보관'}
        </Section>

        <Section no="7" title="이용자의 권리">
          이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리 정지를
          요청할 수 있습니다. 아래 문의처로 연락하시면 지체 없이 처리합니다.
        </Section>

        <Section no="8" title="계정 및 데이터 삭제">
          <p style={{ marginBottom: '14px' }}>
            앱 내 메뉴에서 회원 탈퇴를 선택하면 직접 계정을 삭제할 수 있습니다.
          </p>

          <a          
            href="/smartrider/delete-account"
            style={{
              display: 'inline-block',
              border: '0.5px solid #21262D',
              borderRadius: '4px',
              color: '#4FC3F7',
              fontSize: '13px',
              padding: '10px 20px',
              textDecoration: 'none',
              letterSpacing: '1px'
            }}
          >
            계정 삭제 안내 페이지
          </a>
        </Section>

        <Section no="9" title="개인정보 보호책임자">
          {'성명 - 권순옥'}<br />
          {'소속 - 리치컴퍼니'}<br />
          {'이메일 - kso121258@gmail.com'}
          <p style={{ marginTop: '14px' }}>
            개인정보 침해에 관한 상담이 필요한 경우 아래 기관에 문의할 수 있습니다.
          </p>
          {'· 개인정보침해신고센터 (privacy.kisa.or.kr / 118)'}<br />
          {'· 개인정보분쟁조정위원회 (kopico.go.kr / 1833-6972)'}
        </Section>

        <Section no="10" title="방침의 변경">
          이 방침의 내용이 변경되는 경우 앱 또는 웹사이트를 통해 사전에 공지합니다.
        </Section>


        <Section no="11" title="광고">
          <p style={{ marginBottom: '10px' }}>
            회사는 서비스 운영을 위해 Google LLC의 광고 서비스(AdMob)를 사용합니다.
            광고 제공 과정에서 Google이 다음 정보를 수집·이용할 수 있습니다.
          </p>
          {'· 광고 ID 등 기기 식별자'}<br />
          {'· IP 주소 (대략적인 위치 추정에 사용될 수 있음)'}<br />
          {'· 광고 표시 및 클릭 등 앱 이용 정보'}<br />
          {'· 비정상 종료 기록 등 진단 정보'}
          <p style={{ marginTop: '14px' }}>
            이 정보는 Google이 광고 제공, 광고 성과 측정, 부정 이용 방지를 위해 처리합니다.
            회사는 이용자의 정확한 위치나 건물 메모를 광고에 제공하지 않습니다.
          </p>
          <p style={{ marginTop: '14px' }}>
            이용자는 기기 설정에서 광고 ID를 재설정하거나 삭제할 수 있습니다.
            Google의 정보 처리 방식은 Google 개인정보처리방침(policies.google.com/privacy)에서 확인할 수 있습니다.
          </p>
        </Section>        

        <div style={{
          textAlign: 'center',
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '0.5px solid #21262D',
          color: '#8B949E',
          fontSize: '13px',
          lineHeight: '1.9'
        }}>
          {'시행일 - 2026년 9월 20일'}<br />
          리치컴퍼니
        </div>

      </div>
    </main>
  );
}