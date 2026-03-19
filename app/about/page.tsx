// app/about/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import AboutHero from "@/components/about/AboutHero";
import Zalgallery from "@/components/about/Zalgallery";
import Aboutfeatures from "@/components/about/Aboutfeatures";
import Locationsection from "@/components/sections/Locationsection";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "About – Marokand Concert Hall",
  description: "Learn about Marokand Concert Hall",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHero />
      <Zalgallery />
      <Aboutfeatures />
      <Locationsection />
      <Footer />
    </main>
  );
}