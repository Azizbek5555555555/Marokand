// app/sessions/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import SessionsPage from "@/components/sessions/SessionsPage";
import Footer from "@/components/sections/Footer";
import Locationsection from "@/components/sections/Locationsection";

export const metadata = {
  title: "Seanslar – Marokand Concert Hall",
  description: "Barcha seanslar va tadbirlar ro'yxati",
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF]">
      <Navbar />
      <SessionsPage />
      <Locationsection />
      <Footer />
    </div>
  );
}