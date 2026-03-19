"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  label: string;
  href: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const items: GalleryItem[] = [
  {
    id: 1,
    src: "/images/zal/cruises.jpg",
    alt: "Cruises",
    label: "Cruises",
    href: "/gallery/cruises",
  },
  {
    id: 2,
    src: "/images/zal/konsert-jarayoni.jpg",
    alt: "Konsert jarayoni",
    label: "Konsert jarayoni",
    href: "/gallery/konsert-jarayoni",
  },
  {
    id: 3,
    src: "/images/zal/ichiki-muhut.jpg",
    alt: "Ichiki muhut",
    label: "Ichiki\nmuhut",
    href: "/gallery/ichiki-muhut",
  },
  {
    id: 4,
    src: "/images/zal/jaraoyon.jpg",
    alt: "Jaraoyon",
    label: "Jaraoyon",
    href: "/gallery/jaraoyon",
  },
  {
    id: 5,
    src: "/images/zal/zal.jpg",
    alt: "zal",
    label: "zal",
    href: "/gallery/zal",
  },
  {
    id: 6,
    src: "/images/zal/joylar.jpg",
    alt: "joylar",
    label: "joylar",
    href: "/gallery/joylar",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Single gallery card
// ─────────────────────────────────────────────────────────────────────────────
function GalleryCard({
  item,
  className = "",
}: {
  item: GalleryItem;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      className={`gallery-card group relative overflow-hidden rounded-2xl block ${className}`}
    >
      {/* Image */}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Subtle bottom gradient so label is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Label */}
      <span
        className="
          absolute bottom-4 left-4
          text-white text-sm font-medium
          leading-snug whitespace-pre-line
          drop-shadow-sm
        "
      >
        {item.label}
      </span>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ZalGallery
//
//  Desktop grid (CSS Grid, exact layout from screenshot):
//
//  col1(~1fr)   col2(~1fr)       col3-left(~0.5fr) col3-right(~0.5fr)
//  ┌──────────┐ ┌──────────────┐ ┌────────────────────────────────────┐
//  │  Cruises │ │              │ │         Ichiki muhut               │
//  │  (short) │ │  Konsert     │ └────────────────────────────────────┘
//  └──────────┘ │  jarayoni    │ ┌──────────────┐ ┌──────────────────┐
//  ┌──────────┐ │  (tall,      │ │     zal      │ │     joylar       │
//  │ Jaraoyon │ │  row-span 2) │ └──────────────┘ └──────────────────┘
//  └──────────┘ └──────────────┘
//
// ─────────────────────────────────────────────────────────────────────────────
export default function ZalGallery() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".gallery-card",
          { opacity: 0, y: 36, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: ".zal-grid", start: "top 88%" },
          }
        );
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  const [cruises, konsert, ichiki, jaraoyon, zal, joylar] = items;

  return (
    <section
      ref={ref}
      className="w-full bg-white px-4 md:px-8 lg:px-20 py-12"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl md:text-3xl font-black text-[#1a1a3e] tracking-wide"
            style={{ fontFamily: "Georgia, serif" }}
          >
            ZAL
          </h2>
          <Link
            href="/gallery"
            className="text-gray-500 text-sm hover:text-gray-800 transition-colors duration-200"
          >
            See all
          </Link>
        </div>

        {/* ── Grid ── */}
        <div
          className="zal-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridTemplateRows: "240px 200px",
            gap: "12px",
          }}
        >
          {/*
           * col 1, row 1 — Cruises (short)
           * col 1, row 2 — Jaraoyon (short)
           * col 2, rows 1-2 — Konsert jarayoni (tall, spans both rows)
           * col 3-4, row 1 — Ichiki muhut (wide, spans 2 cols)
           * col 3, row 2 — zal
           * col 4, row 2 — joylar
           */}

          {/* Cruises — col1 row1 */}
          <GalleryCard
            item={cruises}
            className="relative"
            /* grid placement via style because Tailwind arbitrary col/row needs
               plugin; using inline style for placement only */
          />

          {/* Konsert jarayoni — col2 rows 1-2 (tall) */}
          <div
            className="gallery-card group relative overflow-hidden rounded-2xl"
            style={{ gridColumn: "2", gridRow: "1 / 3" }}
          >
            <Link href={konsert.href} className="block w-full h-full">
              <Image
                src={konsert.src}
                alt={konsert.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow-sm">
                {konsert.label}
              </span>
            </Link>
          </div>

          {/* Ichiki muhut — col3-4 row1 (wide) */}
          <div
            className="gallery-card group relative overflow-hidden rounded-2xl"
            style={{ gridColumn: "3 / 5", gridRow: "1" }}
          >
            <Link href={ichiki.href} className="block w-full h-full">
              <Image
                src={ichiki.src}
                alt={ichiki.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-white text-sm font-medium leading-snug whitespace-pre-line drop-shadow-sm">
                {ichiki.label}
              </span>
            </Link>
          </div>

          {/* Jaraoyon — col1 row2 */}
          <GalleryCard item={jaraoyon} className="relative" />

          {/* zal — col3 row2 */}
          <GalleryCard item={zal} className="relative" />

          {/* joylar — col4 row2 */}
          <GalleryCard item={joylar} className="relative" />
        </div>

      </div>
    </section>
  );
}