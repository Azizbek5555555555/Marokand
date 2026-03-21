"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface ConcertDetail {
  id: string;
  breadcrumb: { label: string; href: string }[];
  title: string;
  heroImage: string;
  description: string[];
  additionalInfo: {
    date: string;
    time: string;
    location: string;
  };
  mapEmbedUrl: string;
  mapsLink: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock data — replace with API
// ─────────────────────────────────────────────────────────────────────────────
export const MOCK_CONCERT: ConcertDetail = {
  id: "unutulmas-konsert",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Afisha", href: "/afisha" },
    { label: "Konsert", href: "#" },
  ],
  title:
    "Unutulmas va esda qolarli konsert va tadbirlar bizning konsert zalimizda kop vaqtdalarda",
  heroImage: "/images/blog/blog-ensemble.jpg",
  description: [
    "O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda. O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda.",
    "O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda. O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda.",
  ],
  additionalInfo: {
    date: "Bugun soat 19:00",
    time: "19:00 - 21:00",
    location: "ул. Алишера Навои, 2Б",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6143.18032391248!2d66.93751554455542!3d39.65893719999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19226375ad35%3A0xb8a9dd6fb3d9029f!2sSamarkand%20Concert%20Hall!5e0!3m2!1sen!2s!4v1773572869152!5m2!1sen!2s",
  mapsLink: "https://maps.app.goo.gl/pqWri7REx7j9Ev8b6",
};

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb
// ─────────────────────────────────────────────────────────────────────────────
function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-4">
      {items.map((item, idx) => (
        <span key={item.href} className="flex items-center gap-1.5">
          <Link
            href={item.href}
            className={`text-sm transition-colors ${
              idx === items.length - 1
                ? "text-gray-400 pointer-events-none"
                : "text-[#C9A84C] hover:underline"
            }`}
          >
            {item.label}
          </Link>
          {idx < items.length - 1 && (
            <span className="text-gray-300 text-sm">/</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar — date, time, location, CTA
// ─────────────────────────────────────────────────────────────────────────────
function ConcertSidebar({ info, concertId }: { info: ConcertDetail["additionalInfo"]; concertId: string }) {
  return (
    <aside className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0">
      <div className="sticky top-28">
        {/* Info card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
          <h3
            className="text-[#1a1a3e] font-bold text-lg mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Qo&rsquo;shimcha ma&rsquo;lumot:
          </h3>

          <div className="space-y-3 mb-8">
            {/* Date */}
            <div className="flex items-start gap-2">
              <span className="text-gray-700 text-sm font-semibold min-w-[52px]">Sana:</span>
              <span className="text-gray-600 text-sm">{info.date}</span>
            </div>

            {/* Time */}
            <div className="flex items-start gap-2">
              <span className="text-gray-700 text-sm font-semibold min-w-[52px]">Vaqt:</span>
              <span className="text-gray-600 text-sm">{info.time}</span>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2">
              <span className="text-gray-700 text-sm font-semibold min-w-[52px]">Lokatsiya:</span>
              <span className="text-gray-600 text-sm">{info.location}</span>
            </div>
          </div>

          {/* CTA — goes to seat selection */}
          <Link
            href={`/concerts/${concertId}/seats`}
            className="
              block w-full text-center
              bg-[#C9A84C] hover:bg-[#b8943d]
              text-white font-bold text-sm tracking-widest uppercase
              py-4 rounded-xl
              transition-colors duration-200
            "
          >
            Sotib olish
          </Link>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Related card — right sidebar top (visible in screenshot)
// ─────────────────────────────────────────────────────────────────────────────
function RelatedCard({ title, imageSrc }: { title: string; imageSrc: string }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-[90px] h-[64px] rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[#1a1a3e] text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#C9A84C] transition-colors"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </p>
        <p className="text-gray-400 text-xs mt-1">Description</p>
      </div>
      {/* Arrow */}
      <svg
        className="flex-shrink-0 text-gray-300 group-hover:text-[#C9A84C] transition-colors"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8h10M8 3l5 5-5 5" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Right sidebar — "Sizni ham qiziqtirishi mumkin"
// ─────────────────────────────────────────────────────────────────────────────
function RecommendationSidebar() {
  const related = [
    { title: "Konsert", imageSrc: "/images/blog/blog-ensemble.jpg" },
    { title: "Konsert", imageSrc: "/images/blog/blog-scholar.jpg" },
    { title: "Konsert", imageSrc: "/images/blog/blog-stage.jpg" },
  ];

  return (
    <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0">
      <div className="sticky top-28">
        <h3
          className="text-[#1a1a3e] font-black text-lg mb-5"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Sizni ham qiziqtirishi mumkin
        </h3>

        <div className="space-y-4">
          {related.map((item, idx) => (
            <RelatedCard key={idx} title={item.title} imageSrc={item.imageSrc} />
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Map Section
// ─────────────────────────────────────────────────────────────────────────────
function MapSection({ embedUrl }: { embedUrl: string }) {
  return (
    <div className="mt-12">
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Konsert zali joylashuvi"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main ConcertDetailPage
// ─────────────────────────────────────────────────────────────────────────────
export default function ConcertDetailPage({
  concert = MOCK_CONCERT,
}: {
  concert?: ConcertDetail;
}) {
  return (
    <main className="w-full bg-white min-h-screen">
      {/* Top padding accounts for fixed Navbar (h ~72px) */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-6 pt-28 pb-16">

        {/* ── TOP SECTION: article + right recommendation sidebar ── */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">

          {/* ── Main article ── */}
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <Breadcrumb items={concert.breadcrumb} />

            {/* Title */}
            <h1
              className="text-gray-900 font-bold text-2xl md:text-[28px] leading-snug mb-6 max-w-[680px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {concert.title}
            </h1>

            {/* Hero image */}
            <div
              className="relative w-full overflow-hidden rounded-2xl mb-8"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={concert.heroImage}
                alt={concert.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Body text */}
            <div className="space-y-5 mb-10">
              {concert.description.map((para, idx) => (
                <p
                  key={idx}
                  className="text-gray-600 text-sm md:text-[15px] leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Divider */}
            <hr className="border-gray-100 mb-10" />

            {/* Additional info + CTA sidebar (mobile: inline, desktop: in right sidebar) */}
            <div className="lg:hidden">
              <ConcertSidebar info={concert.additionalInfo} concertId={concert.id} />
              <div className="mt-8" />
            </div>

            {/* Map */}
            <MapSection embedUrl={concert.mapEmbedUrl} />
          </article>

          {/* ── Right column: Recommendation + Booking sidebar ── */}
          <div className="hidden lg:flex flex-col gap-8 w-[300px] xl:w-[320px] flex-shrink-0">
            {/* "Sizni ham qiziqtirishi mumkin" */}
            <RecommendationSidebar />

            {/* Booking sidebar */}
            <ConcertSidebar info={concert.additionalInfo} concertId={concert.id} />
          </div>
        </div>

      </div>
    </main>
  );
}