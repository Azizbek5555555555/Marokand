// app/concerts/[id]/page.tsx
import ConcertDetailPage, { MOCK_CONCERT } from "@/components/concerts/Concertdetailpage";
import { Navbar } from "@/components/layout/Navbar";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

async function getConcert(id: string) {
  // TODO: replace with real API call
  // const res = await fetch(`${process.env.API_URL}/api/concerts/${id}`);
  // if (!res.ok) notFound();
  // return res.json();
  return { ...MOCK_CONCERT, id };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const concert = await getConcert(params.id);
  return {
    title: `${concert.title} — Marokand`,
    description: concert.description[0],
  };
}

export default async function ConcertDetailRoute({ params }: Props) {
  const concert = await getConcert(params.id);
  return (
    <>
      <Navbar />
      <ConcertDetailPage concert={concert} />
    </>
  );
}