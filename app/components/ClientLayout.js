'use client';
import Header from "./Header";
import PopupManager from "./PopupManager";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isSmartRider = pathname?.startsWith('/smartrider');

  return (
    <>
      {!isAdmin && <Header />}
      {!isAdmin && !isSmartRider && <PopupManager />}
      {children}
    </>
  );
}