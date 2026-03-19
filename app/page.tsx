import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import AfishaSection from "@/components/sections/AfishasSction";
import Yaqindaotgansection from "@/components/sections/Yaqindaotgansection";
import Xizmatlarsection from "@/components/sections/Xizmatlarsection";
import Faqsection from "@/components/sections/Faqsection";
import Locationsection from "@/components/sections/Locationsection";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#05020B]">
      <Navbar />
      <main>
        <Hero />
        <AfishaSection />
        <Yaqindaotgansection />
        <Xizmatlarsection />
        <Faqsection />
        <Locationsection />
        <Footer />
      </main>
    </div>
  );
}

