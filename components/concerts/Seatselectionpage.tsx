"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type SeatType = "VIP" | "A" | "B" | "BALCONY";
type SeatStatus = "available" | "occupied" | "selected";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  status: SeatStatus;
  price: number;
}

interface Section {
  id: string;
  name: string;
  type: SeatType;
  rows: Row[];
}

interface Row {
  label: string;
  seats: Seat[];
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const SEAT_PRICES: Record<SeatType, number> = {
  VIP: 35,
  A: 25,
  B: 25,
  BALCONY: 15,
};

const SEAT_COLORS: Record<SeatType, { bg: string; border: string; selected: string; text: string }> = {
  VIP: {
    bg: "bg-blue-500/90",
    border: "border-blue-400",
    selected: "bg-yellow-400 border-yellow-300",
    text: "text-blue-100",
  },
  A: {
    bg: "bg-red-500/90",
    border: "border-red-400",
    selected: "bg-yellow-400 border-yellow-300",
    text: "text-red-100",
  },
  B: {
    bg: "bg-emerald-500/90",
    border: "border-emerald-400",
    selected: "bg-yellow-400 border-yellow-300",
    text: "text-emerald-100",
  },
  BALCONY: {
    bg: "bg-purple-500/90",
    border: "border-purple-400",
    selected: "bg-yellow-400 border-yellow-300",
    text: "text-purple-100",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SEAT GENERATION
// ─────────────────────────────────────────────────────────────────────────────

function generateSeats(
  rowLabel: string,
  count: number,
  type: SeatType,
  occupiedIndices: Set<number> = new Set()
): Seat[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${rowLabel}-${i + 1}`,
    row: rowLabel,
    number: i + 1,
    type,
    status: occupiedIndices.has(i) ? "occupied" : "available",
    price: SEAT_PRICES[type],
  }));
}

// Generate ~750 seats total
function generateHallLayout(): Section[] {
  const rand = (max: number) => Math.floor(Math.random() * max);

  // VIP Section - 2 rows, ~40 seats each = ~80
  const vipOccupied1 = new Set([2, 5, 12, 18, 25, 31]);
  const vipOccupied2 = new Set([0, 8, 15, 22, 30, 38]);

  // A Section - 8 rows, ~26 seats each = ~208
  const aOccupied: Set<number>[] = Array.from({ length: 8 }, () => {
    const s = new Set<number>();
    for (let i = 0; i < 5; i++) s.add(rand(26));
    return s;
  });

  // B Section - 8 rows, ~26 seats each = ~208
  const bOccupied: Set<number>[] = Array.from({ length: 8 }, () => {
    const s = new Set<number>();
    for (let i = 0; i < 6; i++) s.add(rand(26));
    return s;
  });

  // C Section - 5 rows, ~20 seats each = ~100
  const cOccupied: Set<number>[] = Array.from({ length: 5 }, () => {
    const s = new Set<number>();
    for (let i = 0; i < 4; i++) s.add(rand(20));
    return s;
  });

  // Balcony - 2 rows of ~77 seats each = ~154 total
  const balcOccupied1 = new Set([3, 10, 20, 30, 45, 60, 70]);
  const balcOccupied2 = new Set([5, 15, 25, 40, 55, 65]);

  return [
    {
      id: "vip",
      name: "VIP",
      type: "VIP",
      rows: [
        { label: "VIP1", seats: generateSeats("VIP1", 40, "VIP", vipOccupied1) },
        { label: "VIP2", seats: generateSeats("VIP2", 40, "VIP", vipOccupied2) },
      ],
    },
    {
      id: "a",
      name: "A",
      type: "A",
      rows: ["A", "B", "C", "D", "E", "F", "G", "H"].map((r, i) => ({
        label: r,
        seats: generateSeats(r, 26, "A", aOccupied[i]),
      })),
    },
    {
      id: "b",
      name: "B",
      type: "B",
      rows: ["I", "J", "K", "L", "M", "N", "O", "P"].map((r, i) => ({
        label: r,
        seats: generateSeats(r, 26, "B", bOccupied[i]),
      })),
    },
    {
      id: "c",
      name: "C",
      type: "B",
      rows: ["Q", "R", "S", "T", "U"].map((r, i) => ({
        label: r,
        seats: generateSeats(r, 20, "B", cOccupied[i]),
      })),
    },
    {
      id: "balcony",
      name: "Balkon",
      type: "BALCONY",
      rows: [
        { label: "楼座L", seats: generateSeats("楼座L", 37, "BALCONY", balcOccupied1) },
        { label: "楼座R", seats: generateSeats("楼座R", 37, "BALCONY", balcOccupied2) },
      ],
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// SEAT BUTTON COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface SeatButtonProps {
  seat: Seat;
  isSelected: boolean;
  onToggle: (seat: Seat) => void;
  scale: number;
}

function SeatButton({ seat, isSelected, onToggle, scale }: SeatButtonProps) {
  const colors = SEAT_COLORS[seat.type];
  const isOccupied = seat.status === "occupied";

  const seatSize = Math.max(14, Math.round(22 * scale));
  const fontSize = Math.max(6, Math.round(8 * scale));

  if (isOccupied) {
    return (
      <div
        title={`Joy ${seat.id} - Band`}
        style={{ width: seatSize, height: seatSize, fontSize }}
        className="rounded-sm bg-gray-600/40 border border-gray-600/30 cursor-not-allowed flex items-center justify-center flex-shrink-0"
      >
        <span className="text-gray-500" style={{ fontSize: Math.max(6, fontSize - 1) }}>✕</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => onToggle(seat)}
      title={`Joy ${seat.id} — $${seat.price}`}
      aria-label={`${seat.type} qator ${seat.row}, o'rin ${seat.number}`}
      style={{ width: seatSize, height: seatSize, fontSize }}
      className={`
        rounded-sm border flex-shrink-0 flex items-center justify-center
        font-bold transition-all duration-150 cursor-pointer
        hover:scale-110 hover:z-10 relative
        ${isSelected
          ? `${colors.selected} shadow-lg shadow-yellow-400/50 scale-110 z-10`
          : `${colors.bg} ${colors.border} hover:brightness-110`
        }
      `}
    >
      {scale > 0.7 && (
        <span className={isSelected ? "text-gray-900" : colors.text} style={{ fontSize }}>
          {seat.number}
        </span>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEGEND
// ─────────────────────────────────────────────────────────────────────────────

function Legend() {
  const items = [
    { type: "VIP" as SeatType, label: "VIP", price: 35, color: "bg-blue-500" },
    { type: "A" as SeatType, label: "A — oddiy", price: 25, color: "bg-red-500" },
    { type: "B" as SeatType, label: "B — oddiy", price: 25, color: "bg-emerald-500" },
    { type: "BALCONY" as SeatType, label: "Balkon", price: 15, color: "bg-purple-500" },
    { type: null, label: "Band", price: null, color: "bg-gray-600/40 border border-gray-600" },
    { type: null, label: "Tanlangan", price: null, color: "bg-yellow-400" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-5 justify-center">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className={`w-4 h-4 rounded-sm ${item.color} flex-shrink-0`} />
          <span className="text-gray-300 text-xs whitespace-nowrap">
            {item.label}{item.price !== null ? ` — $${item.price}` : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────────────────────────────────────

interface CartProps {
  selectedSeats: Seat[];
  onRemove: (seatId: string) => void;
  onClear: () => void;
  concertId: string;
}

function Cart({ selectedSeats, onRemove, onClear, concertId }: CartProps) {
  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="text-white font-bold text-sm">Savat</span>
          {selectedSeats.length > 0 && (
            <span className="bg-yellow-400 text-gray-900 text-xs font-black px-2 py-0.5 rounded-full">
              {selectedSeats.length}
            </span>
          )}
        </div>
        {selectedSeats.length > 0 && (
          <button
            onClick={onClear}
            className="text-gray-500 hover:text-red-400 text-xs transition-colors"
          >
            Barchasini o'chir
          </button>
        )}
      </div>

      {/* Seats list */}
      <div className="max-h-[260px] overflow-y-auto">
        {selectedSeats.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-gray-600 text-3xl mb-2">🎭</div>
            <p className="text-gray-500 text-sm">Joy tanlanmagan</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {selectedSeats.map((seat) => {
              const colors = SEAT_COLORS[seat.type];
              return (
                <div key={seat.id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/3 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${colors.bg.replace('/90', '')} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-white text-sm font-semibold">
                      {seat.type} · Qator {seat.row}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">O'rin {seat.number}</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-sm">${seat.price}</span>
                  <button
                    onClick={() => onRemove(seat.id)}
                    className="text-gray-600 hover:text-red-400 transition-colors ml-1 w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-400/10"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Total + CTA */}
      {selectedSeats.length > 0 && (
        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">{selectedSeats.length} ta joy</span>
            <div className="text-right">
              <span className="text-gray-400 text-xs block">Jami</span>
              <span className="text-white text-2xl font-black">${total}</span>
            </div>
          </div>
          <button
            className="
              w-full py-3.5 rounded-xl
              bg-gradient-to-r from-yellow-400 to-yellow-500
              text-gray-900 font-black text-sm tracking-wide uppercase
              hover:from-yellow-300 hover:to-yellow-400
              transition-all duration-200
              shadow-lg shadow-yellow-500/20
              active:scale-[0.98]
            "
            onClick={() => alert(`Tanlangan joylar: ${selectedSeats.map(s => s.id).join(", ")}\nJami: $${total}`)}
          >
            To'lovga o'tish →
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS PANEL
// ─────────────────────────────────────────────────────────────────────────────

function StatsPanel({ sections }: { sections: Section[] }) {
  const stats = useMemo(() => {
    let total = 0, occupied = 0;
    const byType: Record<SeatType, { total: number; available: number }> = {
      VIP: { total: 0, available: 0 },
      A: { total: 0, available: 0 },
      B: { total: 0, available: 0 },
      BALCONY: { total: 0, available: 0 },
    };
    sections.forEach(sec => {
      sec.rows.forEach(row => {
        row.seats.forEach(seat => {
          total++;
          byType[seat.type].total++;
          if (seat.status === "occupied") occupied++;
          else byType[seat.type].available++;
        });
      });
    });
    return { total, occupied, available: total - occupied, byType };
  }, [sections]);

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {(["VIP", "A", "B"] as SeatType[]).map(type => {
        const colors = SEAT_COLORS[type];
        const stat = stats.byType[type];
        return (
          <div key={type} className="bg-white/5 rounded-xl p-3">
            <div className={`text-xs font-bold mb-1 ${type === "VIP" ? "text-blue-400" : type === "A" ? "text-red-400" : "text-emerald-400"}`}>
              {type} — ${SEAT_PRICES[type]}
            </div>
            <div className="text-white font-black text-lg">{stat.available}</div>
            <div className="text-gray-500 text-xs">bo'sh / {stat.total}</div>
          </div>
        );
      })}
      <div className="bg-white/5 rounded-xl p-3">
        <div className="text-xs font-bold mb-1 text-yellow-400">Jami</div>
        <div className="text-white font-black text-lg">{stats.available}</div>
        <div className="text-gray-500 text-xs">bo'sh / {stats.total}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HALL MAP (main seating component)
// ─────────────────────────────────────────────────────────────────────────────

interface HallMapProps {
  sections: Section[];
  selectedIds: Set<string>;
  onToggle: (seat: Seat) => void;
  scale: number;
}

function HallMap({ sections, selectedIds, onToggle, scale }: HallMapProps) {
  const gap = Math.max(2, Math.round(3 * scale));

  return (
    <div className="flex flex-col items-center" style={{ gap: Math.max(8, 16 * scale) }}>
      {/* Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: Math.max(200, 520 * scale), marginBottom: Math.max(8, 20 * scale) }}
      >
        <div
          className="w-full bg-gradient-to-b from-gray-300/20 to-gray-300/5 border border-gray-400/30 rounded-xl flex items-center justify-center"
          style={{ height: Math.max(28, 44 * scale) }}
        >
          <span className="text-gray-400 font-semibold tracking-widest uppercase" style={{ fontSize: Math.max(9, 12 * scale) }}>
            SAHNA · STAGE
          </span>
        </div>
        {/* Perspective lines */}
        <div
          className="absolute left-0 right-0 border-l-[30px] border-r-[30px] border-b-[0px] border-l-transparent border-r-transparent"
          style={{ bottom: -Math.max(10, 16 * scale), borderTopWidth: Math.max(10, 16 * scale), borderTopColor: "rgba(156,163,175,0.1)" }}
        />
      </div>

      {/* Sections */}
      {sections.map((section) => {
        if (section.id === "balcony") return null; // Render separately

        return (
          <div key={section.id} className="flex flex-col items-center" style={{ gap }}>
            {/* Section label */}
            <div className="flex items-center gap-2 opacity-60">
              <div className="h-px bg-gray-600" style={{ width: Math.max(30, 60 * scale) }} />
              <span className="text-gray-400 text-xs font-semibold tracking-widest">
                {section.name === "A" ? "Seksiya A" : section.name === "B" || section.name === "C" ? "Seksiya B/C" : section.name}
              </span>
              <div className="h-px bg-gray-600" style={{ width: Math.max(30, 60 * scale) }} />
            </div>

            {/* Rows */}
            {section.rows.map((row) => (
              <div key={row.label} className="flex items-center" style={{ gap }}>
                {/* Row label left */}
                <span
                  className="text-gray-500 font-mono text-right flex-shrink-0 select-none"
                  style={{ width: Math.max(18, 28 * scale), fontSize: Math.max(8, 11 * scale) }}
                >
                  {row.label}
                </span>

                {/* Seats */}
                <div className="flex items-center" style={{ gap }}>
                  {row.seats.map((seat) => (
                    <SeatButton
                      key={seat.id}
                      seat={seat}
                      isSelected={selectedIds.has(seat.id)}
                      onToggle={onToggle}
                      scale={scale}
                    />
                  ))}
                </div>

                {/* Row label right */}
                <span
                  className="text-gray-500 font-mono flex-shrink-0 select-none"
                  style={{ width: Math.max(18, 28 * scale), fontSize: Math.max(8, 11 * scale) }}
                >
                  {row.label}
                </span>
              </div>
            ))}
          </div>
        );
      })}

      {/* Balcony - two side sections */}
      {(() => {
        const balcony = sections.find(s => s.id === "balcony");
        if (!balcony) return null;
        return (
          <div className="flex items-center justify-between w-full" style={{ marginTop: Math.max(8, 16 * scale) }}>
            {/* Left balcony */}
            <div className="flex flex-col items-end" style={{ gap }}>
              {balcony.rows.map((row) => (
                <div key={`L-${row.label}`} className="flex items-center" style={{ gap }}>
                  {row.seats.slice(0, Math.ceil(row.seats.length / 2)).map((seat) => (
                    <SeatButton key={seat.id} seat={seat} isSelected={selectedIds.has(seat.id)} onToggle={onToggle} scale={scale} />
                  ))}
                  <span className="text-gray-600 text-xs ml-1 select-none" style={{ fontSize: Math.max(7, 9 * scale) }}>楼座</span>
                </div>
              ))}
            </div>

            {/* Center label */}
            <div className="text-gray-600 text-xs text-center px-4 select-none" style={{ fontSize: Math.max(8, 11 * scale) }}>
              BALKON
            </div>

            {/* Right balcony */}
            <div className="flex flex-col items-start" style={{ gap }}>
              {balcony.rows.map((row) => (
                <div key={`R-${row.label}`} className="flex items-center" style={{ gap }}>
                  <span className="text-gray-600 text-xs mr-1 select-none" style={{ fontSize: Math.max(7, 9 * scale) }}>楼座</span>
                  {row.seats.slice(Math.ceil(row.seats.length / 2)).map((seat) => (
                    <SeatButton key={seat.id} seat={seat} isSelected={selectedIds.has(seat.id)} onToggle={onToggle} scale={scale} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SeatSelectionPage({ concertId = "unutulmas-kecha-simfonik-konsert" }: { concertId?: string }) {
  const [sections] = useState<Section[]>(() => generateHallLayout());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [scale, setScale] = useState(0.85);
  const MIN_SCALE = 0.4;
  const MAX_SCALE = 1.6;

  const allSeats = useMemo(() => {
    const map = new Map<string, Seat>();
    sections.forEach(s => s.rows.forEach(r => r.seats.forEach(seat => map.set(seat.id, seat))));
    return map;
  }, [sections]);

  const selectedSeats = useMemo(() =>
    Array.from(selectedIds).map(id => allSeats.get(id)!).filter(Boolean),
    [selectedIds, allSeats]
  );

  const toggleSeat = useCallback((seat: Seat) => {
    if (seat.status === "occupied") return;
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(seat.id)) next.delete(seat.id);
      else next.add(seat.id);
      return next;
    });
  }, []);

  const removeSeat = useCallback((id: string) => {
    setSelectedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
  }, []);

  const clearAll = useCallback(() => setSelectedIds(new Set()), []);

  const zoomIn = () => setScale(s => Math.min(MAX_SCALE, +(s + 0.1).toFixed(1)));
  const zoomOut = () => setScale(s => Math.max(MIN_SCALE, +(s - 0.1).toFixed(1)));
  const zoomReset = () => setScale(0.85);

  return (
    <main className="min-h-screen bg-[#08080f]">
      {/* Header */}
      <div className="border-b border-white/8 bg-[#0a0a14]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href={`/concerts/${concertId}`}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
            Orqaga
          </Link>

          <div className="text-center">
            <h1 className="text-white font-black text-sm md:text-base tracking-wide">JOY TANLASH</h1>
            <p className="text-gray-500 text-xs">Simfonik konsert · 15 Aprel · 19:00</p>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
            <button
              onClick={zoomOut}
              disabled={scale <= MIN_SCALE}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-lg font-bold"
              title="Kichiklashtirish"
            >
              −
            </button>
            <button
              onClick={zoomReset}
              className="px-2 h-8 rounded-lg text-gray-400 hover:bg-white/10 transition-all text-xs font-mono"
              title="Asl o'lcham"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={zoomIn}
              disabled={scale >= MAX_SCALE}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-lg font-bold"
              title="Kattalashtirish"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Legend bar */}
      <div className="border-b border-white/5 bg-[#09090f] py-2.5 px-4">
        <Legend />
      </div>

      {/* Main layout */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Hall map */}
          <div className="flex-1 min-w-0">
            {/* Stats */}
            <div className="mb-5">
              <StatsPanel sections={sections} />
            </div>

            {/* Scrollable map */}
            <div
              className="relative bg-[#0c0c18] border border-white/8 rounded-2xl overflow-auto"
              style={{ minHeight: 500, maxHeight: "calc(100vh - 280px)" }}
            >
              {/* Hint */}
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-white/5 backdrop-blur-md rounded-lg px-3 py-1.5 text-gray-500 text-xs">
                  Joyni tanlash uchun bosing
                </div>
              </div>

              {/* The actual seat map */}
              <div
                className="p-6 md:p-10 flex justify-center"
                style={{ minWidth: Math.max(400, 700 * scale) }}
              >
                <HallMap
                  sections={sections}
                  selectedIds={selectedIds}
                  onToggle={toggleSeat}
                  scale={scale}
                />
              </div>
            </div>

            {/* Mobile hint */}
            <p className="text-center text-gray-600 text-xs mt-3 lg:hidden">
              ← Chapga/o'ngga suring →
            </p>
          </div>

          {/* Sidebar: Cart */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="sticky top-[88px]">
              <Cart
                selectedSeats={selectedSeats}
                onRemove={removeSeat}
                onClear={clearAll}
                concertId={concertId}
              />

              {/* Quick tip */}
              <div className="mt-4 bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-4">
                <p className="text-yellow-400/80 text-xs leading-relaxed">
                  💡 Bir nechta joy tanlashingiz mumkin. Joyni qayta bosish uni savatdan olib tashlaydi.
                </p>
              </div>

              {/* Price reference */}
              <div className="mt-4 bg-white/3 rounded-xl p-4 space-y-2">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Narxlar</p>
                {(["VIP", "A", "B"] as SeatType[]).map(type => {
                  const colors = SEAT_COLORS[type];
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-sm ${colors.bg.replace('/90', '')}`} />
                        <span className="text-gray-400 text-sm">{type === "VIP" ? "VIP" : `Seksiya ${type}`}</span>
                      </div>
                      <span className="text-white font-bold text-sm">${SEAT_PRICES[type]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}