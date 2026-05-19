import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Rich Canopy",
  description: "Premium Scooter Canopy Systems",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ backgroundColor: '#111418', minHeight: '100vh' }}>
        <Header />
        {children}
      </body>
    </html>
  );
}