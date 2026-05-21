'use client';
import "./globals.css";
import Header from "./components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="리치캐노피 - 프리미엄 스쿠터 캐노피 시스템. PCX, NMAX, Forza 등 다양한 차종에 오토바이 캐노피, 바이크 캐노피 장착. 배달 라이더, 통근, 장거리 투어까지." />
        <meta name="keywords" content="스쿠터 캐노피, 바이크 캐노피, 오토바이 캐노피, PCX 캐노피, NMAX 캐노피, 오토바이 지붕, 배달 캐노피, scooter canopy, Rich Canopy, 리치캐노피" />
        <meta property="og:title" content="Rich Canopy - 프리미엄 스쿠터 캐노피 시스템" />
        <meta property="og:description" content="PCX, NMAX, Forza 등 스쿠터 캐노피 장착 전문. 비, 바람, 햇빛으로부터 완벽한 보호." />
        <meta property="og:url" content="https://richcanopy.kr" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://richcanopy.kr" />
        <link rel="icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <title>Rich Canopy - 프리미엄 스쿠터 캐노피 시스템</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Rich Canopy",
              "alternateName": ["리치캐노피", "Rain Is Complete Honey Canopy"],
              "description": "프리미엄 스쿠터 캐노피 시스템. PCX, NMAX, Forza 등 다양한 차종에 오토바이 캐노피 장착 전문.",
              "url": "https://richcanopy.kr",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "경기도",
                "addressLocality": "화성시",
                "addressCountry": "KR"
              },
              "keywords": "스쿠터 캐노피, 바이크 캐노피, 오토바이 캐노피, PCX 캐노피, NMAX 캐노피, scooter canopy",
              "serviceType": ["스쿠터 캐노피 장착", "오토바이 캐노피", "바이크 캐노피"],
            })
          }}
        />
      </head>
      <body style={{ backgroundColor: '#111418', minHeight: '100vh' }}>
        {!isAdmin && <Header />}
        {children}
      </body>
    </html>
  );
}