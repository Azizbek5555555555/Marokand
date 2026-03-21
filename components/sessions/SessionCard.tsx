"use client";

import Image from "next/image";
import Link from "next/link";
import type { Session } from "@/app/api/sessions/route";

// ─────────────────────────────────────────────────────────────────────────────
// Star rating display
// ─────────────────────────────────────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-sm">
      <span className="text-yellow-400 font-bold">{rating.toFixed(1)}</span>
      <span className="text-yellow-400">★</span>
      <span className="text-gray-400 text-xs">({Math.floor(rating * 60)})</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Session image — left side with badge + multi-image grid
// ─────────────────────────────────────────────────────────────────────────────
function SessionImage({ session }: { session: Session }) {
  return (
    <div className="relative flex-shrink-0 w-[195px] h-full min-h-[200px] rounded-xl overflow-hidden group">
      {/* Main image */}
      <Image
        src={session.images[0]}
        alt={session.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Second image — small overlay bottom-right */}
      {session.images[1] && (
        <div className="absolute bottom-2 right-2 w-[70px] h-[52px] rounded-lg overflow-hidden border-2 border-white shadow-md">
          <Image
            src={session.images[1]}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Badge */}
      {session.badge && (
        <div
          className={`
            absolute top-3 left-3 px-2.5 py-1 rounded-md text-white text-[11px] font-bold uppercase tracking-wide
            ${session.badge === "FEATURED"
              ? "bg-[#1a1a3e]"
              : session.badge === "NEW"
              ? "bg-green-500"
              : "bg-[#F47B20]"
            }
          `}
        >
          {session.badge}
        </div>
      )}

      {/* Expand icon */}
      <button className="absolute bottom-3 right-[86px] w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 2h4M2 2v4M12 2h-4M12 2v4M2 12h4M2 12v-4M12 12h-4M12 12v-4" />
        </svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SessionCard
// ─────────────────────────────────────────────────────────────────────────────
export default function SessionCard({ session }: { session: Session }) {
  return (
    <article className="flex gap-0 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden min-h-[200px]">

      {/* Left: image */}
      <SessionImage session={session} />

      {/* Center: info */}
      <div className="flex-1 px-6 py-5 flex flex-col justify-between border-r border-gray-100">
        {/* Location */}
        <div>
          <p className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wide">
            {session.location}
          </p>

          {/* Title */}
          <Link
            href={`/sessions/${session.id}`}
            className="text-[#1a1a3e] font-bold text-base md:text-[17px] leading-snug hover:text-[#F47B20] transition-colors duration-200 line-clamp-2 mb-2 block"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {session.title}
          </Link>

          {/* Rating */}
          <div className="mb-3">
            <Stars rating={session.rating} />
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {session.description}
          </p>
        </div>

        {/* Specials tags */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          {session.specials.map((s) => (
            <span key={s} className="text-[#F47B20] text-xs font-semibold">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Right: price + CTA */}
      <div className="w-[170px] flex-shrink-0 px-5 py-5 flex flex-col items-end justify-between">
        {/* Duration */}
        <p className="text-gray-400 text-xs text-right">{session.duration}</p>

        {/* Pricing */}
        <div className="text-right">
          <p className="text-gray-400 text-sm line-through mb-0.5">
            ${session.originalPrice.toLocaleString()}
          </p>
          <p className="text-[#1a1a3e] text-xl font-black">
            From{" "}
            <span className="text-[#F47B20]">${session.price}</span>
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/sessions/${session.id}`}
          className="
            w-full text-center
            border-2 border-[#F47B20] text-[#F47B20]
            rounded-xl px-4 py-2.5
            text-sm font-bold
            hover:bg-[#F47B20] hover:text-white
            transition-all duration-200
          "
        >
          View Details
        </Link>
      </div>
    </article>
  );
}