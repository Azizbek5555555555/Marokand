"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-section 1 — Quote / intro
// ─────────────────────────────────────────────────────────────────────────────
function AboutIntro() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-20 pt-10 pb-24">
      {/* Left: image with asymmetric border-radius */}
      <div className="flex-shrink-0 w-full md:w-[420px] lg:w-[460px]">
        <div
          className="relative w-full overflow-hidden shadow-lg"
          style={{
            aspectRatio: "1 / 1.05",
            borderRadius: "2rem 2rem 2rem 4rem",
          }}
        >
          <Image
            src="/images/about/marokand-stage.jpg"
            alt="Marokand Concert Hall stage"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right: big quote mark + paragraphs */}
      <div className="flex-1 pt-2 md:pt-6">
        <div
          className="text-gray-900 mb-5 leading-none select-none"
          style={{ fontSize: "5rem", fontFamily: "Georgia, serif", lineHeight: 1 }}
          aria-hidden="true"
        >
          &#8220;
        </div>
        <p className="text-gray-700 text-base md:text-[17px] leading-relaxed mb-6">
          Ichki turizm – bu nafaqat hordiq, balki ma&rsquo;naviy ozuqa, ruhiy
          yangilanish va milliy g&rsquo;ururni uyg&rsquo;otish manbai hamdir.
          Ichki turizm – bu nafaqat hordiq, balki ma&rsquo;naviy ozuqa, ruhiy
          yangilanish va milliy g&rsquo;ururni uyg&rsquo;otish manbai hamdir.
        </p>
        <p className="text-gray-700 text-base md:text-[17px] leading-relaxed mb-10">
          Ichki turizm – bu nafaqat hordiq, balki ma&rsquo;naviy ozuqa, ruhiy
          yangilanish va milliy g&rsquo;ururni uyg&rsquo;otish manbai hamdir.
          Ichki turizm – bu nafaqat hordiq, balki ma&rsquo;naviy ozuqa, ruhiy
          yangilanish va milliy g&rsquo;ururni uyg&rsquo;otish manbai hamdir.
        </p>
        <p className="text-gray-500 text-sm md:text-base">
          Yurtimiz mo&rsquo;jizalari
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-section 2 — "Yangi konsertlar" + stacked rotated cards
// ─────────────────────────────────────────────────────────────────────────────
interface StackCard {
  src: string;
  alt: string;
  label: string;
  price: string;
  rotate: string;
  top: string;
  left: string;
  zIndex: number;
  width: string;
  height: string;
  rating?: string;
  showLearnMore?: boolean;
}

const stackCards: StackCard[] = [
  {
    src: "/images/about/card-hallstatt.jpg",
    alt: "Hallstatt",
    label: "Hallstatt L...",
    price: "$640/per",
    rotate: "-7deg",
    top: "10px",
    left: "0px",
    zIndex: 1,
    width: "185px",
    height: "250px",
  },
  {
    src: "/images/about/card-cappadocia.jpg",
    alt: "Cappadocia",
    label: "Cappadocia",
    price: "$640/per",
    rotate: "4deg",
    top: "0px",
    left: "115px",
    zIndex: 2,
    width: "195px",
    height: "260px",
  },
  {
    src: "/images/about/card-yosemite.jpg",
    alt: "Yosemite Park",
    label: "Yosemite Park",
    price: "$640/person",
    rotate: "-2deg",
    top: "55px",
    left: "225px",
    zIndex: 3,
    width: "210px",
    height: "265px",
    rating: "4.2",
    showLearnMore: true,
  },
];

function StackedCard({ card }: { card: StackCard }) {
  return (
    <div
      className="stack-card absolute bg-white shadow-2xl overflow-hidden"
      style={{
        width: card.width,
        height: card.height,
        top: card.top,
        left: card.left,
        transform: `rotate(${card.rotate})`,
        zIndex: card.zIndex,
        borderRadius: "16px",
      }}
    >
      {/* Photo */}
      <div className="relative w-full" style={{ height: "68%" }}>
        <Image
          src={card.src}
          alt={card.alt}
          fill
          className="object-cover"
        />
      </div>

      {/* Info strip */}
      <div className="px-3 py-2">
        <p className="text-gray-600 text-[11px] truncate">{card.label}</p>
        <p className="text-gray-900 text-sm font-bold">{card.price}</p>

        {card.rating && (
          <div className="flex items-center justify-between mt-1">
            <span className="flex items-center gap-0.5 text-[#C9A84C] text-xs font-semibold">
              ★ {card.rating}
            </span>
            {card.showLearnMore && (
              <button className="bg-[#C9A84C] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Learn More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function YangiKonsertlar() {
  return (
    <div className="pb-28">
      <div className="flex flex-col md:flex-row items-start gap-10 lg:gap-16">

        {/* Left: heading + long body text */}
        <div className="flex-1 max-w-[500px]">
          <h2
            className="text-3xl md:text-[2.6rem] font-bold text-gray-900 mb-7 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Yangi konsertlar
          </h2>
          <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
            O&rsquo;zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki
            zamona ekoturizm, oilaviy dam olish va sog&rsquo;lomlashtirish
            maskanlari bilan ham boyib bormoqda. O&rsquo;zbekiston ichki turizmi
            nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy
            dam olish va sog&rsquo;lomlashtirish maskanlari bilan ham boyib
            bormoqda. O&rsquo;zbekiston ichki turizmi nafaqat tarixiy maskanlar
            bilan, balki zamonaviy ekoturizm, oilaviy dam olish va
            sog&rsquo;lomlashtirish maskanlari bilan ham boyib bormoqda.
            O&rsquo;zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki
            zamonaviy ekoturizm, oilaviy dam olish va sog&rsquo;lomlashtirish
            maskanlari bilan ham boyib bormoqda. O&rsquo;zbekiston ichki turizmi
            nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy
            dam olish va sog&rsquo;lomlashtirish maskanlari bilan ham boyib
            bormoqda.
          </p>
        </div>

        {/* Right: stacked rotated photo cards */}
        <div className="stacked-cards flex-shrink-0 w-full md:w-[460px] lg:w-[500px]">
          {/* Yellow star accent top */}
          <div className="relative" style={{ height: "340px" }}>
            {/* Top-right yellow star */}
            <span
              className="absolute #C9A84C font-bold text-3xl select-none pointer-events-none"
              style={{ top: "-24px", right: "80px", zIndex: 20 }}
              aria-hidden="true"
            >
              ✦
            </span>
            {/* Bottom squiggle accent */}
            <span
              className="absolute select-none pointer-events-none"
              style={{ bottom: "-16px", right: "12px", zIndex: 20, fontSize: "28px", color: "#C9A84C", letterSpacing: "-4px" }}
              aria-hidden="true"
            >
              ～
            </span>

            {stackCards.map((card) => (
              <StackedCard key={card.alt} card={card} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-section 3 — "Konsert zal" — stage image left, text + heading right
// ─────────────────────────────────────────────────────────────────────────────
function KonsertZal() {
  return (
    <div className="pb-24">
      <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-20">

        {/* Left: stage image — rounded top, sharp bottom-right, large bottom-left */}
        <div className="flex-shrink-0 w-full md:w-[400px] lg:w-[440px]">
          <div
            className="relative w-full overflow-hidden shadow-md"
            style={{
              aspectRatio: "4 / 4.8",
              borderRadius: "2rem 2rem 2rem 0.5rem",
            }}
          >
            <Image
              src="/images/about/konsert-zal.jpg"
              alt="Marokand Konsert Zal interior"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: paragraphs then bold heading */}
        <div className="flex-1 pt-2 md:pt-8">
          <p className="text-gray-700 text-base md:text-[17px] leading-relaxed mb-7">
            O&rsquo;zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki
            zamonaviy ekoturizm, oilaviy dam olish va sog&rsquo;lomlashtirish
            maskanlari bilan ham boyib bormoqda.
          </p>
          <p className="text-gray-700 text-base md:text-[17px] leading-relaxed mb-14">
            O&rsquo;zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki
            zamonaviy ekoturizm, oilaviy dam olish va sog&rsquo;lomlashtirish
            maskanlari bilan ham boyib bormoqda. O&rsquo;zbekiston ichki turizmi
            nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy
            dam olish va sog&rsquo;lomlashtirish maskanlari bilan ham boyib
            bormoqda.
          </p>
          <h3
            className="text-3xl md:text-[2.6rem] font-bold text-gray-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Konsert zal
          </h3>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export — all three sub-sections in one file
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Each major block fades up on scroll
        gsap.utils.toArray<HTMLElement>(".about-fade").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 87%" },
            }
          );
        });

        // Stacked cards pop in with stagger
        gsap.fromTo(
          ".stack-card",
          { opacity: 0, scale: 0.85, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            ease: "back.out(1.5)",
            stagger: 0.13,
            scrollTrigger: { trigger: ".stacked-cards", start: "top 85%" },
          }
        );
      }, ref);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref} className="w-full bg-white px-4 md:px-8 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="about-fade"><AboutIntro /></div>
        <div className="about-fade"><YangiKonsertlar /></div>
        <div className="about-fade"><KonsertZal /></div>
      </div>
    </div>
  );
}