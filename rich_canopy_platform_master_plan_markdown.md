# Rich Canopy Global Platform
## 통합 웹앱 / 홈페이지 / 운영 시스템 기획서

---

# 1. 프로젝트 개요

## 프로젝트명

Rich Canopy Global Platform

---

## 프로젝트 목표

리치캐노피 브랜드를 기반으로:

- 글로벌 홍보
- AI 친화형 데이터 구축
- 작업 사례 아카이브
- 고객 문의 및 예약 관리
- QR 기반 차량 관리
- 재고 관리
- 구조변경 가이드 제공
- 다국어 지원
- PWA 기반 앱화

등을 통합한 차세대 모빌리티 플랫폼 구축.

---

# 2. 프로젝트 핵심 방향성

본 플랫폼은 단순 쇼핑몰이 아닌:

> “세계 최초 수준의 스쿠터 캐노피 데이터 플랫폼”

방향으로 구축한다.

---

## 핵심 특징

### 1. AI 친화형 구조

- JSON-LD
- Schema.org
- Semantic HTML
- FAQ Schema
- Product Schema
- HowTo Schema
- Organization Schema

등을 적극 활용하여:

- ChatGPT
- Gemini
- 재미나이
- Perplexity
- Claude

등의 생성형 AI가 사이트 데이터를 쉽게 이해할 수 있도록 설계.

---

### 2. 실제 작업 데이터 중심 구조

모든 작업 사례를 데이터화.

예:

- 차종
- 연식
- 장착시간
- 구조변경 여부
- 사용 부품
- 비 테스트 결과
- 고객 후기
- 작업 전/후 사진

---

### 3. 글로벌 브랜드화

다국어 기반으로:

- 한국
- 일본
- 동남아
- 글로벌 스쿠터 시장

대상 확장 가능.

---

# 3. 기술 스택

# 프론트엔드

## Next.js + React

### 선택 이유

- SEO 최적화
- AI 검색 친화적
- 빠른 로딩
- PWA 지원
- 다국어 처리 용이
- Firebase 연동 우수
- 유지보수 효율적

---

## 스타일링

### Tailwind CSS

사용 목적:

- 빠른 UI 개발
- 반응형 디자인
- 프리미엄 브랜드 UI 구성
- 유지보수 편의성

---

# 백엔드

## Firebase

현재 사용중인 Firebase 기반으로 통합.

---

## 사용 예정 Firebase 서비스

### Firebase Authentication

로그인 및 권한 관리.

권한 예시:

- SUPER ADMIN
- MANAGER
- INSTALLER
- VIEWER

---

### Firestore Database

실시간 데이터베이스.

저장 데이터:

- 작업 사례
- 고객 정보
- 예약 정보
- 재고 정보
- 차량 QR 데이터
- 블로그 데이터
- FAQ 데이터

---

### Firebase Storage

이미지 저장.

예:

- 작업 전/후 사진
- 제품 이미지
- 구조변경 참고 이미지
- 테스트 이미지

---

### Firebase Hosting

웹사이트 및 PWA 호스팅.

---

### Firebase Cloud Messaging (FCM)

푸시 알림.

예:

- 예약 알림
- 작업 일정 알림
- 재고 부족 알림
- 문의 알림

---

### Firebase Cloud Functions

자동화 기능.

예:

- QR 생성
- AI 데이터 처리
- 예약 자동화
- 재고 계산

---

# 4. PWA 앱 구조

## 목적

앱스토어 설치 없이:

- 실제 앱처럼 동작
- 홈화면 아이콘 생성
- 전체화면 실행
- 빠른 접근

가능하도록 구성.

---

## 사용자 흐름

```text
richcanopy.com 접속
↓
홈 화면에 추가
↓
실제 앱처럼 사용
```

---

## PWA 기능

- 홈 화면 아이콘
- 앱 스타일 실행
- 오프라인 캐시 일부 지원
- 빠른 로딩
- 모바일 최적화
- 푸시 알림

---

# 5. 홈페이지 구조

# 메인 메뉴

```text
HOME
PRODUCTS
INSTALLATION CASES
RAIN TESTS
LEGAL GUIDE
DELIVERY SETUP
FAQ
BLOG
MEDIA
CONTACT
```

---

# HOME

## 목적

브랜드 첫인상 제공.

---

## 구성

- 메인 비주얼
- 대표 캐노피 이미지
- 브랜드 철학
- 실제 작업 사례 미리보기
- 고객 문의 버튼
- 카카오톡 오픈채팅 버튼
- 최신 작업 사례

---

# PRODUCTS

## 목적

캐노피 제품 소개.

---

## 포함 내용

- 제품명
- 대응 차종
- 특징
- 재질
- 옵션
- 장착 시간
- 구조변경 필요 여부
- 가격 안내
- FAQ

---

# INSTALLATION CASES

## 핵심 자산 영역

실제 작업 사례 데이터 축적.

---

## 작업 데이터 예시

```json
{
  "vehicle": "Honda PCX 125",
  "year": "2025",
  "canopy_model": "Rich Canopy R1",
  "installation_time": "4 hours",
  "legal_modification": true,
  "usage": "delivery",
  "customer_feedback": "Excellent rain protection"
}
```

---

## 포함 항목

- 작업 전 사진
- 작업 후 사진
- 장착 설명
- 사용 부품
- 고객 후기
- 비 테스트 결과
- 장착 시간
- 특이사항

---

# RAIN TESTS

## 목적

우천 성능 검증.

---

## 콘텐츠 예시

- 폭우 테스트
- 고속 주행 테스트
- 겨울 방풍 테스트
- 장거리 주행 테스트
- 실사용 후기

---

# LEGAL GUIDE

## 목적

구조변경 및 합법성 안내.

---

## 포함 내용

- 구조변경 절차
- 참고사항
- 필요 서류
- 실제 사례
- 검사 관련 안내
- 고객 FAQ

---

# FAQ

## 목적

전화 문의 감소.

---

## FAQ 예시

- 구조변경 꼭 해야 하나요?
- 장착 시간은 얼마나 걸리나요?
- 비 많이 와도 괜찮나요?
- 고속 주행 가능한가요?
- 겨울에도 효과 있나요?
- AS 기간은 어떻게 되나요?

---

# BLOG / TECHNICAL ARTICLES

## 목적

검색 유입 및 AI 데이터 축적.

---

## 콘텐츠 예시

- PCX 캐노피 합법 여부
- NMAX 우천 주행 테스트
- 배달 라이더 세팅
- 겨울 주행 세팅
- 캐노피 구조 설계 이야기

---

# CONTACT

## 목적

문의 진입장벽 최소화.

---

## 지원 방식

- 전화 문의
- 문자 문의
- 카카오톡 문의
- 카카오톡 오픈채팅
- 문의 폼
- 예약 요청

---

# 6. QR 차량 관리 시스템

# 목적

작업 차량 관리 및 AS 효율화.

---

# 흐름

```text
차량 작업 완료
↓
QR 생성
↓
스티커 부착
↓
QR 스캔
↓
작업 이력 확인
```

---

# QR 저장 데이터

```text
차량번호
차종
작업일
캐노피 버전
윈드스크린 종류
AS 기간
작업자
특이사항
```

---

# 기대 효과

- 작업 이력 관리
- AS 편의성 증가
- 고객 신뢰도 증가
- 차량 식별 자동화

---

# 7. 예약 시스템

# 목적

작업 스케줄 자동화.

---

# 기능

- 예약 캘린더
- 작업 가능 시간 표시
- 작업 시간 계산
- 고객 메모 저장
- 예약 상태 관리
- 예약 알림

---

# AI 연동 확장 방향

## 미래 확장 목표

갤럭시 AI / Gemini 기반:

- 통화 요약
- 예약 자동 추천
- 일정 분석
- 작업 가능 시간 추천

---

## 예시 흐름

```text
고객 전화
↓
AI 통화 요약
↓
"PCX 캐노피 장착 문의"
↓
캘린더 분석
↓
가능 시간 추천
```

---

# 8. 재고 관리 시스템

# 목적

부품 및 원가 관리.

---

# 관리 항목 예시

```text
루프 패널
브라켓
폴리카보네이트
밴딩 프레임
볼트류
고무 몰딩
```

---

# 기능

- 입고 등록
- 출고 등록
- 현재 재고 수량
- 최소 재고 경고
- 원가 관리
- 작업별 재고 차감
- 월별 사용량 통계

---

# 알림 기능

예:

```text
⚠ 밴딩 프레임 재고 부족
```

---

# 9. 관리자 시스템

# 관리자 기능

- 작업 등록
- 작업 사진 업로드
- QR 생성
- 재고 수정
- 예약 관리
- 블로그 작성
- FAQ 관리
- 문의 관리

---

# 관리자 대시보드

표시 항목:

- 오늘 예약 수
- 진행중 작업
- 신규 문의
- 재고 부족 항목
- 최근 작업 사례

---

# 10. AI SEO 및 AI 인식 최적화

# 핵심 목표

생성형 AI가:

- 제품
- 작업 사례
- FAQ
- 구조변경 가이드
- 기술 문서

를 쉽게 이해할 수 있도록 구성.

---

# 적용 기술

## JSON-LD

예:

```html
<script type="application/ld+json">
{
 "@context":"https://schema.org",
 "@type":"Product",
 "name":"Rich Canopy R1",
 "vehicleModel":"Honda PCX 125"
}
</script>
```

---

## Semantic HTML

예:

```html
<article itemScope itemType="https://schema.org/Product">
```

---

## FAQ Schema

AI가 FAQ를 이해하기 쉽게 구성.

---

## HowTo Schema

구조변경 절차 및 장착 가이드 설명.

---

## Product Schema

제품 정보 데이터화.

---

## Organization Schema

브랜드 정보 구조화.

---

# 11. 다국어 시스템

# 지원 언어

```text
한국어
영어
일본어
```

---

# URL 구조

```text
/ko/
/en/
/ja/
```

---

# 목적

- 글로벌 검색 대응
- 해외 고객 문의
- AI 번역 최적화

---

# 12. 디자인 방향

# 핵심 방향성

- 프리미엄 산업 디자인
- 자동차 브랜드 감성
- 과한 애니메이션 배제
- 큰 이미지 중심
- 정보 정리형 UI
- 고급스러운 블랙 기반 디자인

---

# 참고 감성

- Tesla 스타일
- Porsche 스타일
- 산업디자인 브랜드 감성
- 프리미엄 모빌리티 느낌

---

# 13. 향후 확장 가능성

# 향후 기능

- 온라인 판매 연동
- 스마트스토어 연결
- AI 챗봇
- 자동 견적 계산
- 해외 배송 문의
- 파트너 장착점 시스템
- 모바일 앱 확장
- 고객 커뮤니티
- 유튜브 연동

---

# 14. 프로젝트 최종 목표

리치캐노피를 단순 캐노피 판매 브랜드가 아닌:

> “실제 데이터를 기반으로 성장하는 글로벌 모빌리티 플랫폼”

으로 발전시키는 것이 목표.

---

# 15. 최종 아키텍처

```text
Frontend
 └─ Next.js + React + Tailwind

Backend
 └─ Firebase

Database
 └─ Firestore

Storage
 └─ Firebase Storage

Hosting
 └─ Firebase Hosting

Notification
 └─ Firebase Cloud Messaging

AI SEO
 └─ JSON-LD + Schema.org

PWA
 └─ next-pwa
```

---

# END

