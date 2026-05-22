import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Rich Canopy - 프리미엄 스쿠터 캐노피 시스템",
  description: "리치캐노피 - 프리미엄 스쿠터 캐노피 시스템. PCX, NMAX, Forza 등 다양한 차종에 오토바이 캐노피, 바이크 캐노피 장착.",
  keywords: "스쿠터 캐노피, 바이크 캐노피, 오토바이 캐노피, PCX 캐노피, NMAX 캐노피, 오토바이 지붕, 배달 캐노피, scooter canopy, Rich Canopy, 리치캐노피",
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
    title: "Rich Canopy - 프리미엄 스쿠터 캐노피 시스템",
    description: "PCX, NMAX, Forza 등 스쿠터 캐노피 장착 전문. 비, 바람, 햇빛으로부터 완벽한 보호.",
    url: "https://richcanopy.kr",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ backgroundColor: '#111418', minHeight: '100vh' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}