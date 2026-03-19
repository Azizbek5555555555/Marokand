"use client";

import { useCallback, useEffect, useState } from "react";
import SessionsSidebar, { FilterState } from "@/components/sessions/SessionsSidebar";
import SessionCard from "@/components/sessions/SessionCard";
import Pagination from "@/components/sessions/Pagination";
import type { Session } from "@/app/api/sessions/route";

// ─────────────────────────────────────────────────────────────────────────────
// Sort option selector
// ─────────────────────────────────────────────────────────────────────────────
type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
};

function SortSelector({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span className="font-medium">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="border-none outline-none text-[#1a1a3e] font-semibold cursor-pointer bg-transparent"
      >
        {Object.entries(SORT_LABELS).map(([v, label]) => (
          <option key={v} value={v}>{label}</option>
        ))}
      </select>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton loader for cards
// ─────────────────────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="flex gap-0 bg-white rounded-2xl border border-gray-100 overflow-hidden min-h-[200px] animate-pulse">
      <div className="w-[195px] bg-gray-100 flex-shrink-0" />
      <div className="flex-1 px-6 py-5 space-y-3">
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="h-5 bg-gray-100 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
      <div className="w-[170px] border-l border-gray-100 px-5 py-5 space-y-4">
        <div className="h-3 bg-gray-100 rounded ml-auto w-2/3" />
        <div className="h-8 bg-gray-100 rounded mt-auto" />
        <div className="h-10 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main SessionsPage
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_FILTERS: FilterState = {
  dateFrom: "",
  dateTo: "",
  types: [],
  minPrice: 0,
  maxPrice: 99999,
  duration: "",
  language: "",
  rating: 0,
  specials: [],
};

export default function SessionsPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const LIMIT = 10;

  // Build query string from filters
  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();
    filters.types.forEach((t) => params.append("type", t));
    if (filters.minPrice > 0) params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice < 99999) params.set("maxPrice", String(filters.maxPrice));
    if (filters.duration) params.set("duration", filters.duration);
    if (filters.language) params.set("language", filters.language);
    if (filters.rating > 0) params.set("rating", String(filters.rating));
    filters.specials.forEach((s) => params.append("specials", s));
    if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
    if (filters.dateTo) params.set("dateTo", filters.dateTo);
    params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", String(LIMIT));
    return params.toString();
  }, [filters, sort, page]);

  // Fetch from API
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/sessions?${buildQuery()}`);
        const json = await res.json();
        setSessions(json.data);
        setMeta({ total: json.meta.total, totalPages: json.meta.totalPages });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [buildQuery]);

  // Reset page when filters/sort change
  const handleFilterChange = (f: FilterState) => {
    setFilters(f);
    setPage(1);
  };
  const handleSortChange = (s: SortOption) => {
    setSort(s);
    setPage(1);
  };

  return (
    <main className="w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-6 py-10">

        {/* Page title */}
        <h1
          className="text-3xl md:text-4xl font-black text-[#1a1a3e] mb-8"
          style={{ fontFamily: "Georgia, serif" }}
        >
          SEANSLAR
        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* ── Sidebar ── */}
          <SessionsSidebar filters={filters} onChange={handleFilterChange} />

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Results bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-[#1a1a3e]">
                  {meta.total.toLocaleString()}
                </span>{" "}
                results
              </p>
              <SortSelector value={sort} onChange={handleSortChange} />
            </div>

            {/* Card list */}
            <div className="space-y-4">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <CardSkeleton key={i} />
                  ))
                : sessions.length === 0
                ? (
                  <div className="text-center py-20 text-gray-400">
                    <p className="text-4xl mb-4">🎭</p>
                    <p className="text-lg font-medium">No sessions found</p>
                    <p className="text-sm mt-1">Try adjusting your filters</p>
                  </div>
                )
                : sessions.map((s) => (
                    <SessionCard key={s.id} session={s} />
                  ))
              }
            </div>

            {/* Pagination */}
            {!loading && sessions.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={meta.totalPages}
                total={meta.total}
                limit={LIMIT}
                onPageChange={setPage}
              />
            )}
          </div>

        </div>
      </div>
    </main>
  );
}