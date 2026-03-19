"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TourCard {
  id: number;
  title: string;
  days: string;
  image: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const tours: TourCard[] = [
  {
    id: 1,
    title: "Sayohat – yangi nafas",
    days: "16 days from",
    image: "/images/tours/tour-1.jpg",
    href: "/tours/sayohat-yangi-nafas",
  },
  {
    id: 2,
    title: "Tadbir vaqt olingan va namoyish qilingan rasmlar",
    days: "18 days from",
    image: "/images/tours/tour-2.jpg",
    href: "/tours/tadbir-vaqt",
  },
  {
    id: 3,
    title: "Qulay, xavfsiz, unutilmas tadbir tajribasi.",
    days: "16 days from",
    image: "/images/tours/tour-3.jpg",
    href: "/tours/qulay-xavfsiz-1",
  },
  {
    id: 4,
    title: "Qulay, xavfsiz, unutilmas tadbir .Qulay, xavfsiz, unutilm",
    days: "15 days from",
    image: "/images/tours/tour-4.jpg",
    href: "/tours/qulay-xavfsiz-2",
  },
  {
    id: 5,
    title: "Sayohat – yangi nafas",
    days: "14 days from",
    image: "/images/tours/tour-5.jpg",
    href: "/tours/sayohat-5",
  },
];

// ---------------------------------------------------------------------------
// Arrow Button
// ---------------------------------------------------------------------------
function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className={`
        w-10 h-10 rounded-full border border-gray-300 bg-white
        flex items-center justify-center
        text-gray-500 text-base font-light
        transition-all duration-200
        hover:border-gray-500 hover:text-gray-800 hover:shadow-md
        disabled:opacity-30 disabled:cursor-not-allowed
        flex-shrink-0
        z-10
      `}
    >
      {direction === "left" ? "‹" : "›"}
    </button>
  );
}

// ---------------------------------------------------------------------------
// TourCard
// ---------------------------------------------------------------------------
function TourCardItem({ card }: { card: TourCard }) {
  return (
    <Link
      href={card.href}
      className="tour-card group relative flex-shrink-0 w-[calc(25%-12px)] rounded-xl overflow-hidden block cursor-pointer"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${card.image})` }}
      />

      {/* Gradient overlay — strong at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end">
        {/* Title + days */}
        <div className="px-4 pb-0">
          <h3
            className="text-white font-semibold text-base leading-snug mb-3"
            style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
          >
            {card.title}
          </h3>
          <p className="text-white/70 text-xs font-normal mb-3">{card.days}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 mx-0" />

        {/* Footer row */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-white text-[11px] font-semibold tracking-widest uppercase">
            VIEW THIS TOUR
          </span>
          {/* Circle icon */}
          <span className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8L8 2M8 2H3M8 2V7"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// YaqindaOtganSection
// ---------------------------------------------------------------------------
export default function YaqindaOtganSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;
  const maxIndex = Math.max(0, tours.length - visibleCount);

  // Slide carousel
  const slideTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
  };

  // GSAP entrance
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".yaqinda-header",
          { opacity: 0, y: -24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".yaqinda-header", start: "top 88%" },
          }
        );

        gsap.fromTo(
          ".tour-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".yaqinda-carousel",
              start: "top 88%",
            },
          }
        );
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  // Compute translate offset
  // Each card is 25% of track width + gap
  const cardWidthPercent = 25;
  const gapPx = 16; // gap-4

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-14 px-4 md:px-8 lg:px-20"
    >
      {/* Header */}
      <div className="yaqinda-header text-center mb-10 max-w-3xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
        >
          Yaqinda O&rsquo;tgan
        </h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          O&rsquo;zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki
          zamonaviy ekoturizm, oilaviy dam olish va sog&rsquo;lomlashtirish
          maskanlari bilan ham boyib bormoqda.
        </p>
      </div>

      {/* Carousel wrapper */}
      <div className="yaqinda-carousel flex items-center gap-4 max-w-6xl mx-auto">
        {/* Left arrow */}
        <ArrowButton
          direction="left"
          onClick={() => slideTo(currentIndex - 1)}
          disabled={currentIndex === 0}
        />

        {/* Track container */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex} * (25% + ${gapPx / visibleCount}px)))`,
            }}
          >
            {tours.map((card) => (
              <TourCardItem key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <ArrowButton
          direction="right"
          onClick={() => slideTo(currentIndex + 1)}
          disabled={currentIndex >= maxIndex}
        />
      </div>
    </section>
  );
}