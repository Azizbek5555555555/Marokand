"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES — Backend developer needs these interfaces
// ─────────────────────────────────────────────────────────────────────────────

export type SeatStatus = "available" | "reserved" | "selected" | "vip" | "disabled";
export type SeatCategory = "standard" | "vip" | "premium";

export interface Seat {
  id: string;           // Unique seat ID — e.g. "A-01"
  row: string;          // Row label — e.g. "A", "B"
  number: number;       // Seat number in row — e.g. 1, 2, 3
  status: SeatStatus;
  category: SeatCategory;
  price: number;        // Price in UZS or USD
}

export interface SeatRow {
  label: string;        // Row label
  seats: Seat[];
}

export interface ConcertSeatsData {
  concertId: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  rows: SeatRow[];
  categories: {
    type: SeatCategory;
    label: string;
    price: number;
    color: string;      // Tailwind bg color class
  }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — Replace with real API call
// Backend endpoint: GET /api/concerts/:id/seats
// Returns: ConcertSeatsData
// ─────────────────────────────────────────────────────────────────────────────
function generateMockSeats(concertId: string): ConcertSeatsData {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 12;

  const seatRows: SeatRow[] = rows.map((rowLabel, rowIdx) => ({
    label: rowLabel,
    seats: Array.from({ length: seatsPerRow }, (_, i) => {
      const seatId = `${rowLabel}-${String(i + 1).padStart(2, "0")}`;
      const isVip = rowIdx < 2;
      const isPremium = rowIdx >= 2 && rowIdx < 4;

      // Randomly mark some as reserved
      const reservedSlots = [2, 5, 7, 10];
      const isReserved = reservedSlots.includes(i) && rowIdx % 2 === 0;

      return {
        id: seatId,
        row: rowLabel,
        number: i + 1,
        status: isReserved ? "reserved" : "available",
        category: isVip ? "vip" : isPremium ? "premium" : "standard",
        price: isVip ? 150000 : isPremium ? 100000 : 70000,
      } as Seat;
    }),
  }));

  return {
    concertId,
    title: "Unutulmas konsert",
    date: "Bugun",
    time: "19:00 - 21:00",
    venue: "Marokand Konsert Zali",
    rows: seatRows,
    categories: [
      { type: "vip", label: "VIP", price: 150000, color: "bg-[#C9A84C]" },
      { type: "premium", label: "Premium", price: 100000, color: "bg-[#F47B20]" },
      { type: "standard", label: "Standart", price: 70000, color: "bg-[#1a1a3e]" },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Seat component
// ─────────────────────────────────────────────────────────────────────────────
function SeatButton({
  seat,
  isSelected,
  onToggle,
}: {
  seat: Seat;
  isSelected: boolean;
  onToggle: (seat: Seat) => void;
}) {
  const baseClass =
    "w-8 h-8 rounded-lg text-[10px] font-bold transition-all duration-150 border-2 flex items-center justify-center cursor-pointer select-none";

  if (seat.status === "reserved") {
    return (
      <div
        className={`${baseClass} bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed`}
        title="Band"
      >
        ✕
      </div>
    );
  }

  if (seat.status === "disabled") {
    return (
      <div
        className={`${baseClass} bg-gray-100 border-gray-100 text-transparent cursor-not-allowed`}
      />
    );
  }

  const colorMap: Record<SeatCategory, string> = {
    vip: isSelected
      ? "bg-[#a07830] border-[#a07830] text-white"
      : "bg-[#FFF4EC] border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white",
    premium: isSelected
      ? "bg-[#D4640F] border-[#D4640F] text-white"
      : "bg-[#FFF4EC] border-[#F47B20] text-[#F47B20] hover:bg-[#F47B20] hover:text-white",
    standard: isSelected
      ? "bg-[#1a1a3e] border-[#1a1a3e] text-white"
      : "bg-white border-gray-300 text-gray-600 hover:bg-[#1a1a3e] hover:border-[#1a1a3e] hover:text-white",
  };

  return (
    <button
      onClick={() => onToggle(seat)}
      className={`${baseClass} ${colorMap[seat.category]}`}
      title={`Joy ${seat.id} — ${seat.price.toLocaleString()} so'm`}
      aria-label={`Joy ${seat.row}${seat.number}`}
    >
      {seat.number}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage indicator
// ─────────────────────────────────────────────────────────────────────────────
function Stage() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-full max-w-[480px] bg-gradient-to-b from-gray-200 to-gray-100 border-2 border-gray-300 rounded-2xl py-3 text-center">
        <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
          Sahna
        </span>
      </div>
      {/* Perspective lines */}
      <div className="w-0 h-0 border-l-[60px] border-r-[60px] border-t-[16px] border-l-transparent border-r-transparent border-t-gray-200 mt-0" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Legend
// ─────────────────────────────────────────────────────────────────────────────
function Legend({ categories }: { categories: ConcertSeatsData["categories"] }) {
  return (
    <div className="flex flex-wrap items-center gap-5 mb-8">
      {categories.map((cat) => (
        <div key={cat.type} className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-md ${cat.color}`} />
          <span className="text-gray-600 text-sm">
            {cat.label} — {cat.price.toLocaleString()} so&rsquo;m
          </span>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-gray-200" />
        <span className="text-gray-600 text-sm">Band</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Order summary panel
// ─────────────────────────────────────────────────────────────────────────────
function OrderSummary({
  selectedSeats,
  onRemove,
  concertId,
}: {
  selectedSeats: Seat[];
  onRemove: (seatId: string) => void;
  concertId: string;
}) {
  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <aside className="w-full lg:w-[320px] flex-shrink-0">
      <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3
          className="text-[#1a1a3e] font-bold text-lg mb-5"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Tanlangan joylar
        </h3>

        {selectedSeats.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">
            Hozircha joy tanlanmagan
          </p>
        ) : (
          <>
            <div className="space-y-3 mb-5 max-h-[240px] overflow-y-auto">
              {selectedSeats.map((seat) => (
                <div
                  key={seat.id}
                  className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <span className="text-[#1a1a3e] text-sm font-semibold">
                      Joy {seat.row}{seat.number}
                    </span>
                    <span className="ml-2 text-xs text-gray-400 capitalize">
                      ({seat.category})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 text-sm font-medium">
                      {seat.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onRemove(seat.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-base leading-none"
                      aria-label="O'chirish"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-3 border-t border-gray-200 mb-6">
              <span className="text-gray-500 text-sm font-medium">Jami:</span>
              <span className="text-[#1a1a3e] text-lg font-black">
                {total.toLocaleString()} so&rsquo;m
              </span>
            </div>
          </>
        )}

        {/* Checkout CTA */}
        <button
          disabled={selectedSeats.length === 0}
          className="
            w-full text-center
            bg-[#C9A84C] hover:bg-[#b8943d]
            disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
            text-white font-bold text-sm tracking-widest uppercase
            py-4 rounded-xl
            transition-colors duration-200
          "
          onClick={() => {
            // TODO: Navigate to checkout
            // router.push(`/concerts/${concertId}/checkout?seats=${selectedSeats.map(s=>s.id).join(',')}`)
            alert(`Tanlangan joylar: ${selectedSeats.map((s) => s.id).join(", ")}`);
          }}
        >
          To&rsquo;lovga o&rsquo;tish
        </button>

        {selectedSeats.length > 0 && (
          <p className="text-center text-gray-400 text-xs mt-3">
            {selectedSeats.length} ta joy tanlandi
          </p>
        )}
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main SeatSelectionPage
// ─────────────────────────────────────────────────────────────────────────────
export default function SeatSelectionPage({ concertId }: { concertId: string }) {
  const [data, setData] = useState<ConcertSeatsData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real API call
    // const res = await fetch(`/api/concerts/${concertId}/seats`);
    // const json = await res.json();
    // setData(json);
    setTimeout(() => {
      setData(generateMockSeats(concertId));
      setLoading(false);
    }, 400);
  }, [concertId]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "reserved") return;
    setSelectedSeats((prev) =>
      prev.find((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const removeSeat = (seatId: string) => {
    setSelectedSeats((prev) => prev.filter((s) => s.id !== seatId));
  };

  if (loading) {
    return (
      <main className="w-full bg-white min-h-screen pt-28">
        <div className="max-w-[1200px] mx-auto px-4 py-10">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-100 rounded w-1/3" />
            <div className="h-64 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </main>
    );
  }

  if (!data) return null;

  return (
    <main className="w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-6 pt-28 pb-16">

        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/concerts/${concertId}`}
            className="inline-flex items-center gap-2 text-[#C9A84C] text-sm hover:underline mb-4"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
            Orqaga
          </Link>

          <h1
            className="text-[#1a1a3e] text-3xl font-black mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Joy tanlash
          </h1>
          <p className="text-gray-500 text-sm">
            {data.title} &nbsp;·&nbsp; {data.date} &nbsp;·&nbsp; {data.time} &nbsp;·&nbsp; {data.venue}
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── Seat map ── */}
          <div className="flex-1 min-w-0">
            {/* Legend */}
            <Legend categories={data.categories} />

            {/* Stage */}
            <Stage />

            {/* Seat grid */}
            <div className="overflow-x-auto">
              <div className="inline-block min-w-[520px] w-full">
                {data.rows.map((row) => (
                  <div key={row.label} className="flex items-center gap-2 mb-2">
                    {/* Row label */}
                    <span className="w-6 text-center text-gray-400 text-xs font-semibold flex-shrink-0">
                      {row.label}
                    </span>

                    {/* Seats */}
                    <div className="flex gap-1.5 flex-wrap">
                      {row.seats.map((seat) => (
                        <SeatButton
                          key={seat.id}
                          seat={seat}
                          isSelected={!!selectedSeats.find((s) => s.id === seat.id)}
                          onToggle={toggleSeat}
                        />
                      ))}
                    </div>

                    {/* Row label (right) */}
                    <span className="w-6 text-center text-gray-400 text-xs font-semibold flex-shrink-0">
                      {row.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hint */}
            <p className="text-gray-400 text-xs mt-6 text-center">
              Joyni tanlash uchun ustiga bosing
            </p>
          </div>

          {/* ── Order summary ── */}
          <OrderSummary
            selectedSeats={selectedSeats}
            onRemove={removeSeat}
            concertId={concertId}
          />
        </div>

      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKEND DEVELOPER NOTES:
//
// API Endpoints needed:
//
// 1. GET /api/concerts/:id/seats
//    Returns: ConcertSeatsData (see types above)
//    — seats array with status: available | reserved | vip | disabled
//    — real-time updates recommended (WebSocket or polling)
//
// 2. POST /api/concerts/:id/reserve
//    Body: { seatIds: string[], userId: string }
//    Returns: { reservationId: string, expiresAt: string (ISO), seats: Seat[] }
//    — Temporary reservation (e.g. 10 min timer)
//
// 3. POST /api/concerts/:id/checkout
//    Body: { reservationId: string, paymentMethod: string, userId: string }
//    Returns: { orderId: string, status: "success" | "failed" }
//
// 4. DELETE /api/concerts/:id/reserve/:reservationId
//    — Cancel reservation (user leaves page)
//
// State management tip:
// — Use optimistic updates for seat selection
// — Lock seats on server when user starts checkout
// — Release lock after 10 min if payment not completed
// ─────────────────────────────────────────────────────────────────────────────