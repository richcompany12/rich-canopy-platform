export const metadata = {
  title: '계정 삭제 안내 | 스마트라이더',
  description: '스마트라이더(SmartRider) 계정 및 데이터 삭제 방법 안내',
};

function Box({ title, children }) {
  return (
    <section style={{
      border: '0.5px solid #21262D',
      borderRadius: '6px',
      padding: '24px',
      marginBottom: '20px'
    }}>
      <h2 style={{ color: '#F0F6FC', fontSize: '16px', fontWeight: '700', marginBottom: '14px' }}>
        {title}
      </h2>
      <div style={{ color: '#8B949E', fontSize: '14px', lineHeight: '1.9' }}>
        {children}
      </div>
    </section>
  );
}

export default function SmartRiderDeleteAccount() {
  return (
    <main style={{ backgroundColor: '#0d1117', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#4FC3F7', fontSize: '12px', letterSpacing: '3px', marginBottom: '12px' }}>
            SMARTRIDER
          </p>
          <h1 style={{ color: '#F0F6FC', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
            계정 삭제 안내
          </h1>
          <p style={{ color: '#8B949E', fontSize: '14px' }}>
            스마트라이더 · 리치컴퍼니
          </p>
        </div>

        <Box title="앱에서 직접 삭제하기">
          <p style={{ marginBottom: '14px', color: '#F0F6FC' }}>
            메뉴 버튼을 누른 뒤 회원 탈퇴를 선택하세요.
          </p>
          비밀번호를 한 번 더 확인한 뒤 계정이 삭제됩니다.
          삭제된 계정은 복구할 수 없습니다.
        </Box>

        <Box title="삭제되는 항목">
          {'· 로그인 계정 (이메일)'}<br />
          {'· 프로필 정보'}<br />
          {'· 이용자가 등록한 제보 내용 및 사진'}
        </Box>

        <Box title="삭제되지 않는 항목">
          {'· 공용 건물 정보'}<br />
          {'· 강력알림(단속 안내) 지점'}
          <p style={{ marginTop: '14px' }}>
            위 항목은 특정 이용자의 개인정보가 아니라
            모든 이용자가 함께 이용하는 자료이므로 삭제 대상이 아닙니다.
          </p>
        </Box>

        <Box title="기기에 저장된 정보">
          이용자가 등록한 건물 목록, 메모, 즐겨찾기는 이용자의 기기에만
          저장되어 있으며 회사 서버에는 존재하지 않습니다.
          <p style={{ marginTop: '14px' }}>
            탈퇴 화면에서 기기의 건물 정보도 함께 삭제하는 항목을 선택하면
            기기에 저장된 정보도 함께 지워집니다.
            선택하지 않으면 기기에 그대로 남으며, 앱을 삭제하면 함께 사라집니다.
          </p>
          <p style={{ marginTop: '14px', color: '#F28C28' }}>
            기기 데이터는 삭제 후 복구할 수 없습니다. 미리 백업하시기 바랍니다.
          </p>
        </Box>

        <Box title="앱을 이미 삭제한 경우">
          앱을 제거하여 직접 탈퇴할 수 없는 경우 아래 이메일로 요청해 주십시오.
          <p style={{ marginTop: '14px', color: '#F0F6FC' }}>
            kso121258@gmail.com
          </p>
          <p style={{ marginTop: '14px' }}>
            메일 제목에 스마트라이더 계정 삭제 요청이라고 적고,
            가입하신 이메일 주소를 함께 보내주시면 확인 후 처리합니다.
            접수일로부터 영업일 기준 7일 이내에 삭제합니다.
          </p>
        </Box>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          
          <a  
            href="/smartrider/privacy"
            style={{
              display: 'inline-block',
              border: '0.5px solid #21262D',
              borderRadius: '4px',
              color: '#8B949E',
              fontSize: '12px',
              padding: '10px 24px',
              textDecoration: 'none',
              letterSpacing: '1px'
            }}
          >
            개인정보처리방침
          </a>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '0.5px solid #21262D',
          color: '#8B949E',
          fontSize: '13px'
        }}>
          리치컴퍼니
        </div>

      </div>
    </main>
  );
}