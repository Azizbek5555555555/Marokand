// app/blog/page.tsx
import BlogPage from "@/components/blog/BlogPage";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Blog — Marokand Concert Hall",
  description: "So'ngi yangililar va maqolalar",
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF]">
      <Navbar />
      <BlogPage />
      <Footer />
    </div>
  );
}