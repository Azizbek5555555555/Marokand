"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface FilterState {
  dateFrom: string;
  dateTo: string;
  types: string[];
  minPrice: number;
  maxPrice: number;
  duration: string;
  language: string;
  rating: number;
  specials: string[];
}

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

const TOUR_TYPES = [
  "Nature Tours",
  "Adventure Tours",
  "Cultural Tours",
  "Food Tours",
  "City Tours",
  "Cruises Tours",
];

const DURATIONS = ["", "1 Day", "2 Days", "3 Days", "4+ Days"];
const LANGUAGES = ["", "Uzbek", "Russian", "English"];
const RATINGS = [0, 3, 3.5, 4, 4.5];
const SPECIALS = ["Best Price Guarantee", "Free Cancellation"];

// ─────────────────────────────────────────────────────────────────────────────
// Accordion section
// ─────────────────────────────────────────────────────────────────────────────
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-5 mb-5">
      <button
        className="w-full flex items-center justify-between mb-4 group"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-bold text-[#1a1a3e] text-base">{title}</span>
        <span className="text-gray-400 text-lg transition-transform duration-200 group-hover:text-[#F47B20]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}>
          ˄
        </span>
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SessionsSidebar
// ─────────────────────────────────────────────────────────────────────────────
export default function SessionsSidebar({ filters, onChange }: Props) {
  const [showAllTypes, setShowAllTypes] = useState(false);
  const visibleTypes = showAllTypes ? TOUR_TYPES : TOUR_TYPES.slice(0, 6);

  const toggle = (field: "types" | "specials", value: string) => {
    const arr = filters[field] as string[];
    onChange({
      ...filters,
      [field]: arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value],
    });
  };

  return (
    <aside className="w-full md:w-[300px] flex-shrink-0">

      {/* Date picker card */}
      <div className="bg-[#F47B20] rounded-2xl p-5 mb-7">
        <p className="text-white text-sm font-semibold mb-3">
          When are you traveling?
        </p>
        <div className="bg-white rounded-xl px-4 py-2.5 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <input
            type="text"
            placeholder="February 05 ~ March 14"
            value={
              filters.dateFrom && filters.dateTo
                ? `${filters.dateFrom} ~ ${filters.dateTo}`
                : ""
            }
            readOnly
            className="text-sm text-gray-600 w-full outline-none cursor-pointer bg-transparent"
          />
        </div>
      </div>

      {/* Tour Type */}
      <FilterSection title="Tour Type">
        {visibleTypes.map((t) => (
          <label key={t} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.types.includes(t)}
              onChange={() => toggle("types", t)}
              className="w-4 h-4 rounded border-gray-300 accent-[#F47B20] cursor-pointer"
            />
            <span className="text-gray-600 text-sm group-hover:text-[#F47B20] transition-colors">
              {t}
            </span>
          </label>
        ))}
        <button
          onClick={() => setShowAllTypes((s) => !s)}
          className="text-[#F47B20] text-sm font-medium hover:underline mt-1"
        >
          {showAllTypes ? "Show Less" : "See More"}
        </button>
      </FilterSection>

      {/* Filter Price */}
      <FilterSection title="Filter Price" defaultOpen={false}>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Min ($)</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F47B20]"
                min={0}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Max ($)</label>
              <input
                type="number"
                value={filters.maxPrice === 99999 ? "" : filters.maxPrice}
                onChange={(e) =>
                  onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : 99999 })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F47B20]"
                min={0}
                placeholder="Any"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Duration */}
      <FilterSection title="Duration" defaultOpen={false}>
        <select
          value={filters.duration}
          onChange={(e) => onChange({ ...filters, duration: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#F47B20]"
        >
          {DURATIONS.map((d) => (
            <option key={d} value={d}>{d || "Any duration"}</option>
          ))}
        </select>
      </FilterSection>

      {/* Language */}
      <FilterSection title="Language" defaultOpen={false}>
        <select
          value={filters.language}
          onChange={(e) => onChange({ ...filters, language: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#F47B20]"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>{l || "Any language"}</option>
          ))}
        </select>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Rating" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {RATINGS.map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, rating: r })}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200
                ${filters.rating === r
                  ? "bg-[#F47B20] text-white border-[#F47B20]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#F47B20] hover:text-[#F47B20]"
                }
              `}
            >
              {r === 0 ? "All" : `${r}+★`}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Specials */}
      <FilterSection title="Specials" defaultOpen={false}>
        {SPECIALS.map((s) => (
          <label key={s} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.specials.includes(s)}
              onChange={() => toggle("specials", s)}
              className="w-4 h-4 rounded border-gray-300 accent-[#F47B20] cursor-pointer"
            />
            <span className="text-gray-600 text-sm group-hover:text-[#F47B20] transition-colors">
              {s}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Reset */}
      <button
        onClick={() =>
          onChange({
            dateFrom: "",
            dateTo: "",
            types: [],
            minPrice: 0,
            maxPrice: 99999,
            duration: "",
            language: "",
            rating: 0,
            specials: [],
          })
        }
        className="w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-[#F47B20] hover:text-[#F47B20] transition-all duration-200 font-medium"
      >
        Reset filters
      </button>
    </aside>
  );
}