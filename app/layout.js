import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "리치캐노피 - PCX 캐노피 NMAX 캐노피 오토바이 지붕 전문",
  description: "리치캐노피 | PCX·NMAX 캐노피, 오토바이 지붕 장착 전문. 비바람 햇빛 완벽 차단. 특허 제품. 전국 장착.",
  keywords: "PCX캐노피, NMAX캐노피, 스쿠터캐노피, 오토바이지붕, 오토바이캐노피, 바이크캐노피, 배달캐노피, 스쿠터지붕, PCX지붕, NMAX지붕, 리치캐노피, richcanopy",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#111418',
  openGraph: {
    title: "리치캐노피 - PCX 캐노피 NMAX 캐노피 오토바이 지붕 전문",
    description: "PCX 캐노피, NMAX 캐노피, 스쿠터 캐노피 장착 전문. 특허 제품. 비바람 햇빛 완벽 차단.",
    url: "https://richcanopy.kr",
    siteName: "리치캐노피",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://richcanopy.kr",
  },
 verification: {
  naver: "45d311eecaf2efae3eff4de1573d00781843f6ca",
  google: "wLfsNQEyf95Uu1m6RhjULbPvIVMt5yjbbUQ7681hpu4",
},
};

export default function RootLayout({ children }) {
return (
  <html lang="ko">
    <head>
      <meta name="naver-site-verification" content="45d311eecaf2efae3eff4de1573d00781843f6ca" />
    </head>
    <body style={{ backgroundColor: '#111418', minHeight: '100vh' }}>
      <ClientLayout>{children}</ClientLayout>
    </body>
  </html>
);
}