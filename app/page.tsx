import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import { ScrollProgress, ScrollToTop } from "@/components/UIExtras";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import CompanyOverview from "@/components/sections/CompanyOverview";
import StatsSection from "@/components/sections/StatsSection";
import StrategicFocus from "@/components/sections/StrategicFocus";
import Services from "@/components/sections/Services";
import FlagshipProjects from "@/components/sections/FlagshipProjects";
import EcadelLabs from "@/components/sections/EcadelLabs";
import ClientProjects from "@/components/sections/ClientProjects";
import Testimonials from "@/components/sections/Testimonials";
import WhyAfrica from "@/components/sections/WhyAfrica";
import Leadership from "@/components/sections/Leadership";
import TechSystems from "@/components/sections/TechSystems";
import Partnerships from "@/components/sections/Partnerships";
import FutureVision from "@/components/sections/FutureVision";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <HeroSection />
        <MarqueeStrip />
        <CompanyOverview />
        <StatsSection />
        <StrategicFocus />
        <Services />
        <FlagshipProjects />
        <EcadelLabs />
        <ClientProjects />
        <Testimonials />
        <WhyAfrica />
        <Leadership />
        <TechSystems />
        <Partnerships />
        <FutureVision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
