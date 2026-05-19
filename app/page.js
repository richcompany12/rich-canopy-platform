import HeroSection from "./components/HeroSection";
import StatsBar from "./components/StatsBar";
import CasesSection from "./components/CasesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <CasesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}