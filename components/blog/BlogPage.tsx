"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  tag?: string;
  comingSoon?: boolean;
}

interface EditorialPost {
  id: string;
  sectionTitle: string;
  title: string;
  body: string;
  image: string;
  href: string;
  imageLeft: boolean; // true = image left, text right | false = text left, image right
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────────────────────────────────────
const GRID_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "",
    excerpt: "",
    image: "/images/blog/blog-ensemble.jpg",
    href: "/blog/ensemble",
  },
  {
    id: "2",
    title: "",
    excerpt: "",
    image: "/images/blog/blog-scholar.jpg",
    href: "/blog/scholar",
  },
  {
    id: "3",
    title: "",
    excerpt: "",
    image: "/images/blog/blog-stage.jpg",
    href: "/blog/stage",
  },
  {
    id: "4",
    title: "How we design web3 products",
    excerpt: "",
    image: "",
    href: "/blog/web3-design",
    comingSoon: true,
  },
  {
    id: "5",
    title: "",
    excerpt: "",
    image: "/images/blog/blog-performers.jpg",
    href: "/blog/performers",
  },
];

const EDITORIAL_POSTS: EditorialPost[] = [
  {
    id: "tabiat",
    sectionTitle: "Tabiat seni chorlaydi",
    title: "Ichki turizm — ishonchli",
    body: "O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda. O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda.",
    image: "/images/blog/blog-hall-interior.jpg",
    href: "/blog/ichki-turizm",
    imageLeft: true,
  },
  {
    id: "nafaqat",
    sectionTitle: "",
    title: "Nafaqat chet el",
    body: "O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda. O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda.",
    image: "/images/blog/blog-performer-solo.jpg",
    href: "/blog/nafaqat-chet-el",
    imageLeft: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Arrow button — circle with →
// ─────────────────────────────────────────────────────────────────────────────
function ArrowLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="
        w-12 h-12 rounded-full border-2 border-white/50
        flex items-center justify-center
        text-white
        hover:bg-white hover:text-[#1a1a1a]
        transition-all duration-300
        group
      "
      aria-label="Read more"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <path d="M3 9h12M9 3l6 6-6 6" />
      </svg>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 1 — "So'ngi yangililar" photo grid
// Layout (from screenshots):
//
//  LEFT col (narrow ~48%)          RIGHT col (wide ~48%)
//  ┌────────────────────┐          ┌──────────────────────────┐
//  │  img 1 (landscape) │          │  img 2 (portrait, tall,  │
//  ├────────────────────┤          │  spans rows 1–2)         │
//  │  img 3 (landscape) │          │                          │
//  ├────────────────────┤          └──────────────────────────┘
//  │  "coming soon" card│          ┌──────────────────────────┐
//  └────────────────────┘          │  img 5 (landscape)       │
//                                  └──────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────
function SongiYangililar() {
  return (
    <section className="w-full bg-[#1a1a1a] pt-16 pb-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <h1
          className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          So&rsquo;ngi yangililar
        </h1>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-3">
            {/* img 1 — landscape */}
            <Link
              href={GRID_POSTS[0].href}
              className="relative block overflow-hidden rounded-2xl group"
              style={{ aspectRatio: "16/10" }}
            >
              <Image
                src={GRID_POSTS[0].image}
                alt="Ensemble performance"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </Link>

            {/* img 3 — stage */}
            <Link
              href={GRID_POSTS[2].href}
              className="relative block overflow-hidden rounded-2xl group"
              style={{ aspectRatio: "16/10" }}
            >
              <Image
                src={GRID_POSTS[2].image}
                alt="Stage view"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </Link>

            {/* "coming soon" text card */}
            <Link
              href={GRID_POSTS[3].href}
              className="
                bg-[#2a2a2a] rounded-2xl p-7
                flex flex-col justify-between
                min-h-[140px]
                hover:bg-[#333] transition-colors duration-200
                group
              "
            >
              <h3 className="text-white font-bold text-xl leading-snug">
                {GRID_POSTS[3].title}
              </h3>
              <span className="
                inline-block self-start mt-4
                border border-white/30 text-white/60 text-xs font-medium
                px-3 py-1 rounded-full
              ">
                coming soon
              </span>
            </Link>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-3">
            {/* img 2 — tall portrait (scholar) */}
            <Link
              href={GRID_POSTS[1].href}
              className="relative block overflow-hidden rounded-2xl group flex-1"
              style={{ minHeight: "420px" }}
            >
              <Image
                src={GRID_POSTS[1].image}
                alt="Scholar performance"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </Link>

            {/* img 5 — performers group */}
            <Link
              href={GRID_POSTS[4].href}
              className="relative block overflow-hidden rounded-2xl group"
              style={{ aspectRatio: "16/10" }}
            >
              <Image
                src={GRID_POSTS[4].image}
                alt="Performers"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Editorial blocks (alternating image/text)
// ─────────────────────────────────────────────────────────────────────────────
function EditorialBlock({ post }: { post: EditorialPost }) {
  const imageEl = (
    <div
      className="relative flex-shrink-0 w-full md:w-[46%] overflow-hidden rounded-2xl"
      style={{ aspectRatio: "4/3" }}
    >
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover"
      />
    </div>
  );

  const textEl = (
    <div className="flex-1 flex flex-col justify-center py-4">
      <h3
        className="text-white font-black text-2xl md:text-3xl mb-5 leading-snug"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {post.title}
      </h3>
      <p
        className="text-white/75 text-sm md:text-base leading-relaxed mb-8"
        style={{ textAlign: "justify" }}
      >
        {post.body}
      </p>
      <div className={post.imageLeft ? "flex justify-end" : "flex justify-center md:justify-start"}>
        <ArrowLink href={post.href} />
      </div>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto py-16 md:py-20 px-4 md:px-8 lg:px-16">
      {/* Section title (only for first editorial block) */}
      {post.sectionTitle && (
        <h2
          className="text-white font-black text-2xl md:text-3xl mb-10"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {post.sectionTitle}
        </h2>
      )}

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {post.imageLeft ? (
          <>
            {imageEl}
            {textEl}
          </>
        ) : (
          <>
            {textEl}
            {imageEl}
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BlogPage — root export
// ─────────────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Grid images fade in staggered
        gsap.fromTo(
          ".blog-grid-item",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ".blog-grid", start: "top 88%" },
          }
        );

        // Editorial blocks slide in
        gsap.utils.toArray<HTMLElement>(".editorial-block").forEach((el) => {
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
      }, ref);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref} className="w-full bg-[#1a1a1a] min-h-screen">
      {/* Grid section */}
      <SongiYangililar />

      {/* Divider */}
      <div className="h-px bg-white/8 max-w-[1200px] mx-auto" />

      {/* Editorial blocks */}
      <div className="bg-[#1a1a1a]">
        {EDITORIAL_POSTS.map((post) => (
          <div key={post.id} className="editorial-block border-b border-white/[0.06] last:border-0">
            <EditorialBlock post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}