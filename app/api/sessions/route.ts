// app/api/sessions/route.ts
import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface Session {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  duration: string;
  originalPrice: number;
  price: number;
  discount?: number;
  badge?: "FEATURED" | "20% OFF" | "NEW";
  images: string[];
  type: SessionType;
  language: string;
  specials: string[];
  date: string; // ISO string
}

export type SessionType =
  | "Nature Tours"
  | "Adventure Tours"
  | "Cultural Tours"
  | "Food Tours"
  | "City Tours"
  | "Cruises Tours";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

// ─────────────────────────────────────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────────────────────────────────────
const ALL_SESSIONS: Session[] = Array.from({ length: 30 }, (_, i) => {
  const types: SessionType[] = [
    "Nature Tours",
    "Adventure Tours",
    "Cultural Tours",
    "Food Tours",
    "City Tours",
    "Cruises Tours",
  ];
  const badges = [undefined, "20% OFF", "FEATURED", "NEW", undefined, "20% OFF"] as const;
  const languages = ["Uzbek", "Russian", "English"];
  const specials = ["Best Price Guarantee", "Free Cancellation"];
  const basePrice = 80 + i * 14;
  const originalPrice = Math.round(basePrice * 1.3 / 10) * 10;

  return {
    id: i + 1,
    title: "Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour",
    location: "Paris, France",
    rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
    reviewCount: 200 + i * 7,
    description:
      "The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip.",
    duration: `${1 + (i % 3)} Days ${i % 2} Nights`,
    originalPrice,
    price: basePrice,
    discount: i % 5 === 0 ? 20 : undefined,
    badge: badges[i % badges.length],
    images: [
      `/images/sessions/session-${(i % 6) + 1}a.jpg`,
      `/images/sessions/session-${(i % 6) + 1}b.jpg`,
    ],
    type: types[i % types.length],
    language: languages[i % languages.length],
    specials,
    date: new Date(2025, 1, 5 + i).toISOString(),
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/sessions
// Query params: type, minPrice, maxPrice, duration, language, rating,
//               specials, dateFrom, dateTo, sort, page, limit
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const types = searchParams.getAll("type") as SessionType[];
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 99999);
  const duration = searchParams.get("duration") || "";
  const language = searchParams.get("language") || "";
  const minRating = Number(searchParams.get("rating") || 0);
  const specials = searchParams.getAll("specials");
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo = searchParams.get("dateTo") || "";
  const sort = (searchParams.get("sort") || "featured") as SortOption;
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(30, Number(searchParams.get("limit") || 10));

  // Filter
  let results = ALL_SESSIONS.filter((s) => {
    if (types.length && !types.includes(s.type)) return false;
    if (s.price < minPrice || s.price > maxPrice) return false;
    if (duration && !s.duration.toLowerCase().includes(duration.toLowerCase()))
      return false;
    if (language && s.language !== language) return false;
    if (s.rating < minRating) return false;
    if (specials.length && !specials.every((sp) => s.specials.includes(sp)))
      return false;
    if (dateFrom && new Date(s.date) < new Date(dateFrom)) return false;
    if (dateTo && new Date(s.date) > new Date(dateTo)) return false;
    return true;
  });

  // Sort
  if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
  else if (sort === "rating") results.sort((a, b) => b.rating - a.rating);

  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const paginated = results.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    data: paginated,
    meta: { total, page, limit, totalPages },
  });
}