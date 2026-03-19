"use client";

import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Premium SVG Line Icons — 28×28 viewBox, strokeWidth 1.5, round caps/joins
// Color is controlled via `currentColor` so Tailwind can drive it.
// ─────────────────────────────────────────────────────────────────────────────

function IconStage() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Stage platform */}
      <path d="M2 22h24" />
      <path d="M5 22V14" />
      <path d="M23 22V14" />
      {/* Stage surface */}
      <path d="M4 14h20" />
      {/* Curtain left */}
      <path d="M5 14C5 10 7 6 9 5" />
      <path d="M5 5v9" />
      {/* Curtain right */}
      <path d="M23 14C23 10 21 6 19 5" />
      <path d="M23 5v9" />
      {/* Spotlight beams */}
      <path d="M10 5L8 2" />
      <path d="M14 4V1" />
      <path d="M18 5l2-3" />
      {/* Center star / performer dot */}
      <circle cx="14" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconAcoustic() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Speaker body */}
      <rect x="8" y="9" width="6" height="10" rx="1" />
      {/* Speaker cone */}
      <path d="M14 11l6-4v14l-6-4" />
      {/* Sound waves */}
      <path d="M22 10.5a6 6 0 0 1 0 7" />
      <path d="M24 8a10 10 0 0 1 0 12" />
      {/* Mute slash line — removed, keeping clean */}
      {/* Stand */}
      <line x1="11" y1="19" x2="11" y2="23" />
      <line x1="8" y1="23" x2="14" y2="23" />
    </svg>
  );
}

function IconGallery() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Frame outer */}
      <rect x="3" y="4" width="22" height="17" rx="2" />
      {/* Picture landscape inside */}
      <path d="M3 17l6-5 5 4 3-3 8 4" />
      {/* Sun/circle in picture */}
      <circle cx="20" cy="9" r="2.5" />
      {/* Hanging wire */}
      <line x1="10" y1="4" x2="8" y2="2" />
      <line x1="18" y1="4" x2="20" y2="2" />
      {/* Base label */}
      <line x1="10" y1="21" x2="18" y2="21" />
      <line x1="14" y1="21" x2="14" y2="24" />
    </svg>
  );
}

function IconVip() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Crown shape */}
      <path d="M4 20h20l-2-10-5 5-3-8-3 8-5-5z" />
      {/* Crown base */}
      <line x1="4" y1="23" x2="24" y2="23" />
      {/* Jewels */}
      <circle cx="4" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14" cy="7" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="10" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconParking() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Car body */}
      <path d="M4 17h20v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4z" />
      <path d="M4 17l3-7h14l3 7" />
      {/* Windows */}
      <path d="M8 17l1.5-4h9L20 17" />
      {/* Wheels */}
      <circle cx="8" cy="22" r="2" />
      <circle cx="20" cy="22" r="2" />
      {/* Building behind — location pin */}
      <path d="M13 6a3 3 0 1 1 2 2.8" />
      <line x1="14" y1="11" x2="14" y2="9" />
    </svg>
  );
}

function IconAccessibility() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Person head */}
      <circle cx="14" cy="5" r="2" />
      {/* Wheelchair seat */}
      <path d="M11 10h6l1 7H10" />
      {/* Wheel */}
      <circle cx="16" cy="21" r="3.5" />
      {/* Foot rest */}
      <path d="M10 17H7l-1 4" />
      {/* Arm raised */}
      <path d="M14 8v3" />
      <path d="M14 11l-3 2" />
      {/* Ramp / arrow */}
      <path d="M3 24l4-4" />
      <path d="M3 24h4v-4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature data — icon is now a React component reference
// ─────────────────────────────────────────────────────────────────────────────
interface Feature {
  Icon: React.FC;
  title: string;
  body: string;
}

const features: Feature[] = [
  {
    Icon: IconStage,
    title: "Zamonaviy sahna",
    body: "110 m² zamonaviy sahnasi, LED ekranlar va professional yoritish tizimlari bilan jihozlangan.",
  },
  {
    Icon: IconAcoustic,
    title: "Akustik tizim",
    body: "Dunyo standartlariga javob beradigan surround sound va professional akustik qurilmalar.",
  },
  {
    Icon: IconGallery,
    title: "Ko'rgazma zallari",
    body: "San'at asarlari va ko'rgazmalar uchun alohida jihozlangan maxsus galeriya maydonlari.",
  },
  {
    Icon: IconVip,
    title: "VIP xizmat",
    body: "Premium mehmonlar uchun alohida VIP zallar, bufet va to'liq xizmat ko'rsatish imkoniyati.",
  },
  {
    Icon: IconParking,
    title: "Qulay joylashuv",
    body: "500 avtomobil sig'adigan yopiq avtoturargoh va qulay transport infratuzilmasi.",
  },
  {
    Icon: IconAccessibility,
    title: "Maxsus imkoniyatlar",
    body: "Nogironligi bo'lgan mehmonlar uchun maxsus kirish joylari va lift tizimlari.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FeatureCard
// ─────────────────────────────────────────────────────────────────────────────
function FeatureCard({ feature }: { feature: Feature }) {
  const { Icon } = feature;
  return (
    <div
      className="
        feature-card group
        bg-white rounded-2xl px-7 py-8
        border border-gray-100
        hover:border-[#C9A84C]/40 hover:shadow-lg
        transition-all duration-300 cursor-default
      "
    >
      {/* Icon container */}
      <div
        className="
          w-14 h-14 rounded-2xl
          bg-[#FFF4EC] text-[#C9A84C]
          flex items-center justify-center
          mb-6
          transition-all duration-300
          group-hover:bg-[#C9A84C] group-hover:text-white group-hover:scale-110
          group-hover:shadow-md
        "
      >
        <Icon />
      </div>

      {/* Title */}
      <h3
        className="text-[#1a1a3e] font-bold text-lg mb-3"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {feature.title}
      </h3>

      {/* Body */}
      <p className="text-gray-500 text-sm leading-relaxed">{feature.body}</p>

      {/* Subtle bottom accent */}
      <div className="w-8 h-0.5 bg-[#C9A84C]/30 mt-6 transition-all duration-300 group-hover:w-14 group-hover:bg-[#F47B20]" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AboutFeatures
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutFeatures() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".feature-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ".features-grid", start: "top 87%" },
          }
        );
        gsap.fromTo(
          ".features-heading",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".features-heading", start: "top 88%" },
          }
        );
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full bg-white py-20 px-4 md:px-8 lg:px-20"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="features-heading flex flex-col md:flex-row md:items-end gap-8 mb-14">
          <div className="flex-1">
            <span className="inline-block text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-4">
              Imkoniyatlar
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1a1a3e] leading-snug"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Konsert zalimiz<br />
              afzalliklari
            </h2>
          </div>
          <div className="flex-1 md:max-w-[480px]">
            <p className="text-gray-500 text-base leading-relaxed">
              Marokand konsert zali — zamonaviy texnologiyalar va
              qulay muhitni o&rsquo;zida mujassam etgan, har qanday
              tadbirni unutilmas qiladigan makon.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>

      </div>
    </section>
  );
}