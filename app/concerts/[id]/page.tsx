// app/concerts/[id]/page.tsx
import { notFound } from "next/navigation";
import { ConcertDB } from "@/lib/db";
import ConcertDetailPage from "@/components/concerts/Concertdetailpage";
import { Navbar } from "@/components/layout/Navbar";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const concert = ConcertDB.getBySlug(params.id);
  if (!concert) return { title: "Konsert topilmadi" };
  return {
    title: `${concert.title} — Marokand`,
    description: concert.description.substring(0, 160),
  };
}

export default function ConcertDetailRoute({ params }: Props) {
  const concert = ConcertDB.getBySlug(params.id);
  if (!concert) notFound();

  const mapped = {
    id: concert.id,
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Afisha", href: "/" },
      { label: concert.title.substring(0, 30) + "...", href: "#" },
    ],
    title: concert.title,
    heroImage: concert.heroImage,
    description: concert.description.split("\n\n").filter(Boolean),
    additionalInfo: {
      date: concert.date,
      time: concert.time,
      location: concert.location,
    },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6143.18032391248!2d66.93751554455542!3d39.65893719999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19226375ad35%3A0xb8a9dd6fb3d9029f!2sSamarkand%20Concert%20Hall!5e0!3m2!1sen!2s!4v1773572869152!5m2!1sen!2s",
    mapsLink: "https://maps.app.goo.gl/pqWri7REx7j9Ev8b6",
  };

  return (
    <>
      <Navbar />
      <ConcertDetailPage concert={mapped} />
    </>
  );
}