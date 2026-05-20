'use client';
import "./globals.css";
import Header from "./components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <html lang="ko">
      <body style={{ backgroundColor: '#111418', minHeight: '100vh' }}>
        {!isAdmin && <Header />}
        {children}
      </body>
    </html>
  );
}