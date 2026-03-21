// app/concerts/[id]/seats/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import SeatSelectionPage from "@/components/concerts/Seatselectionpage";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Joy tanlash — Marokand",
  description: "Konsert uchun joy tanlang",
};

export default function SeatSelectionRoute({ params }: Props) {
  return (
    <>
      <Navbar />
      <SeatSelectionPage concertId={params.id} />
    </>
  );
}