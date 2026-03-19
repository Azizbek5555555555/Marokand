"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ServiceCard {
  id: number;
  name: string;
  tags: string[];
  image: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const row1: [ServiceCard, ServiceCard] = [
  {
    id: 1,
    name: "Lazuli",
    tags: ["Illustration", "Webdesign"],
    image: "/images/services/lazuli.jpg",
    href: "/services/lazuli",
  },
  {
    id: 2,
    name: "Opentri",
    tags: ["Identité"],
    image: "/images/services/opentri.jpg",
    href: "/services/opentri",
  },
];

const row2: [ServiceCard, ServiceCard] = [
  {
    id: 3,
    name: "Marokand",
    tags: ["Branding", "Design"],
    image: "/images/services/marokand.jpg",
    href: "/services/marokand",
  },
  {
    id: 4,
    name: "Samarkand",
    tags: ["Photography"],
    image: "/images/services/samarkand.jpg",
    href: "/services/samarkand",
  },
];

// ---------------------------------------------------------------------------
// ArrowButton
// ---------------------------------------------------------------------------
function ArrowButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      onClick={(e) => e.stopPropagation()}
      className="
        w-11 h-11 rounded-full bg-white
        flex items-center justify-center
        shadow-md flex-shrink-0
        transition-all duration-300
        hover:bg-gray-100 hover:scale-110
        active:scale-95
      "
      aria-label="View details"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 13L13 3M13 3H5M13 3V11"
          stroke="#111"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// TagPill
// ---------------------------------------------------------------------------
function TagPill({ label }: { label: string }) {
  return (
    <span
      className="
        inline-block border border-white/70 text-white
        text-[11px] font-medium
        px-3 py-1 rounded-full
        bg-white/10 backdrop-blur-sm
      "
    >
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// ServiceCardItem
// ---------------------------------------------------------------------------
function ServiceCardItem({
  card,
  className = "",
}: {
  card: ServiceCard;
  className?: string;
}) {
  return (
    <Link
      href={card.href}
      className={`
        service-card group relative block overflow-hidden rounded-2xl cursor-pointer
        ${className}
      `}
    >
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${card.image})` }}
      />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          {/* Name */}
          <h3 className="text-white text-xl font-semibold leading-none">
            {card.name}
          </h3>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* Arrow button */}
        <div className="flex-shrink-0">
          <ArrowButton href={card.href} />
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// StaggeredRow
// Row layout: left card is tall (starts at top), right card is offset down
// OR: left card offset down, right card is tall — controlled by `flip` prop
// ---------------------------------------------------------------------------
function StaggeredRow({
  left,
  right,
  flip = false,
}: {
  left: ServiceCard;
  right: ServiceCard;
  flip?: boolean;
}) {
  return (
    <div className="flex items-start gap-6 w-full">
      {/* Left card */}
      <div
        className={`flex-1 ${flip ? "mt-16" : "mt-0"}`}
      >
        <ServiceCardItem
          card={left}
          className="w-full"
          // Large card: taller
        />
        {/* height via aspect ratio wrapper */}
        <style jsx>{``}</style>
      </div>

      {/* Right card */}
      <div
        className={`flex-1 ${flip ? "mt-0" : "mt-16"}`}
      >
        <ServiceCardItem
          card={right}
          className="w-full"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// XizmatlarSection
// ---------------------------------------------------------------------------
export default function XizmatlarSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".xizmatlar-title",
          { opacity: 0, y: -24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".xizmatlar-title", start: "top 88%" },
          }
        );

        gsap.fromTo(
          ".service-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".xizmatlar-grid",
              start: "top 88%",
            },
          }
        );
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-14 px-4 md:px-8 lg:px-24"
    >
      {/* Title */}
      <h2
        className="xizmatlar-title text-center text-4xl md:text-5xl font-bold text-gray-900 mb-12"
        style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
      >
        Xizmatlar
      </h2>

      {/* Grid */}
      <div className="xizmatlar-grid max-w-5xl mx-auto flex flex-col gap-6">
        {/* Row 1: left card tall, right card offset down */}
        <div className="flex items-start gap-6">
          {/* Left — large, starts at top */}
          <div className="flex-1">
            <div className="relative w-full" style={{ paddingBottom: "110%" }}>
              <div className="absolute inset-0">
                <ServiceCardItem card={row1[0]} className="h-full w-full" />
              </div>
            </div>
          </div>

          {/* Right — smaller, pushed down */}
          <div className="flex-1 mt-20">
            <div className="relative w-full" style={{ paddingBottom: "85%" }}>
              <div className="absolute inset-0">
                <ServiceCardItem card={row1[1]} className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: left card offset down, right card tall — mirrored */}
        <div className="flex items-start gap-6">
          {/* Left — smaller, pushed down */}
          <div className="flex-1 mt-20">
            <div className="relative w-full" style={{ paddingBottom: "85%" }}>
              <div className="absolute inset-0">
                <ServiceCardItem card={row2[0]} className="h-full w-full" />
              </div>
            </div>
          </div>

          {/* Right — large, starts at top */}
          <div className="flex-1">
            <div className="relative w-full" style={{ paddingBottom: "110%" }}>
              <div className="absolute inset-0">
                <ServiceCardItem card={row2[1]} className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}