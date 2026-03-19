"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AfishaCard {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  size: "large" | "medium";
}

// ---------------------------------------------------------------------------
// Data  (replace `image` paths with your real assets)
// ---------------------------------------------------------------------------
const cards: AfishaCard[] = [
  {
    id: 1,
    title: "Waking up\nin a far away place",
    image: "/images/afisha/card-1.jpg",
    href: "/events/waking-up",
    size: "large",
  },
  {
    id: 2,
    title: "adventure\nstarts today",
    image: "/images/afisha/card-2.jpg",
    href: "/events/adventure",
    size: "large",
  },
  {
    id: 3,
    title: "Waking up in a far away place",
    image: "/images/afisha/card-3.jpg",
    href: "/events/waking-up-2",
    size: "medium",
  },
  {
    id: 4,
    subtitle: "Dream Vacation",
    title: "Start your\nJourneyNow",
    image: "/images/afisha/card-4.jpg",
    href: "/events/journey",
    size: "medium",
  },
  {
    id: 5,
    subtitle: "Sale Off",
    title: "Book and\nGet best\nDeals now",
    image: "/images/afisha/card-5.jpg",
    href: "/events/deals",
    size: "medium",
  },
];

// ---------------------------------------------------------------------------
// ViewMoreButton
// ---------------------------------------------------------------------------
function ViewMoreButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center gap-2
        bg-[#F5C518] text-black
        font-semibold text-sm
        px-5 py-2.5
        rounded-full
        transition-all duration-300
        hover:bg-yellow-400 hover:scale-105 hover:shadow-lg
        active:scale-95
        group
      "
    >
      View More
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// AfishaCard
// ---------------------------------------------------------------------------
function AfishaCardItem({
  card,
  className = "",
}: {
  card: AfishaCard;
  className?: string;
}) {
  return (
    <Link
      href={card.href}
      className={`
        relative overflow-hidden rounded-2xl block
        group cursor-pointer
        ${className}
      `}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${card.image})` }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        <div>
          {card.subtitle && (
            <p className="text-white/80 text-xs font-medium mb-1 tracking-wide">
              {card.subtitle}
            </p>
          )}
          <h3
            className="
              text-white font-bold leading-tight
              whitespace-pre-line
              drop-shadow-md
            "
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: card.size === "large" ? "clamp(1.1rem, 2vw, 1.5rem)" : "clamp(1.2rem, 2.5vw, 1.75rem)",
              fontStyle: "italic",
            }}
          >
            {card.title}
          </h3>
        </div>

        <div
          className="transition-all duration-300 opacity-100 translate-y-0 group-hover:opacity-100"
          onClick={(e) => e.preventDefault()}
        >
          <ViewMoreButton href={card.href} />
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// AfishaSection  (main export)
// ---------------------------------------------------------------------------
export default function AfishaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP entrance animations
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Title
        gsap.fromTo(
          ".afisha-title",
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".afisha-title",
              start: "top 85%",
            },
          }
        );

        // Cards stagger
        gsap.fromTo(
          ".afisha-card",
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".afisha-grid",
              start: "top 85%",
            },
          }
        );
      }, sectionRef);
    };

    initGSAP();
    return () => ctx?.revert();
  }, []);

  const [c1, c2, c3, c4, c5] = cards;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-10 px-4 md:px-8 lg:px-16"
    >
      {/* Title */}
      <h1
        className="afisha-title text-center text-4xl md:text-5xl font-bold tracking-widest mb-8 text-black"
        style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
      >
        AFISHA
      </h1>

      {/* Grid */}
      <div className="afisha-grid max-w-6xl mx-auto space-y-4">
        {/* Row 1: 2 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AfishaCardItem
            card={c1}
            className="afisha-card h-56 md:h-64 lg:h-72"
          />
          <AfishaCardItem
            card={c2}
            className="afisha-card h-56 md:h-64 lg:h-72"
          />
        </div>

        {/* Row 2: 3 medium cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AfishaCardItem
            card={c3}
            className="afisha-card h-64 md:h-72 lg:h-80"
          />
          <AfishaCardItem
            card={c4}
            className="afisha-card h-64 md:h-72 lg:h-80"
          />
          <AfishaCardItem
            card={c5}
            className="afisha-card h-64 md:h-72 lg:h-80"
          />
        </div>
      </div>
    </section>
  );
}