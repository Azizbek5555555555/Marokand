"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface BlogDetailProps {
  post: BlogPostDetail;
}

interface BlogPostDetail {
  id: string;
  breadcrumb: { label: string; href: string }[];
  title: string;
  heroImage: string;
  heroCaption: string;
  bodyParagraphs: string[];
  secondImage?: string;
  sections: BlogSection[];
  outroImage?: string;
  outroHeading?: string;
}

interface BlogSection {
  heading: string;
  intro?: string;
  bullets?: BulletItem[];
  outro?: string;
  link?: { label: string; href: string };
  showBackToTop?: boolean;
}

interface BulletItem {
  text: string;
  italic?: string; // italic portion within text
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock data — replace with API fetch in production
// ─────────────────────────────────────────────────────────────────────────────
export const MOCK_POST: BlogPostDetail = {
  id: "ichki-turizm",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Zicasso Blog", href: "/blog" },
  ],
  title:
    "Siz chet elga chiqmasdan ham unutilmas tajribalarni shu yerning o'zida topishingiz mumkin.",
  heroImage: "/images/blog/blog-ensemble.jpg",
  heroCaption:
    "Ichki turizm orqali o'z tariximizni, o'zligimizni chuqurroq anglab yetamiz.",
  bodyParagraphs: [
    "O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda.O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda.",
    "O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda.O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda.",
    "O'zbekiston ichki turizmi nafaqat tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam olish va sog'lomlashtirish maskanlari bilan ham boyib bormoqda.",
  ],
  secondImage: "/images/blog/blog-stage.jpg",
  sections: [
    {
      heading: "Venetian Charm Without the Crowds",
      intro:
        "Experience authentic canal-side living in a peaceful setting, with unique architectural features.",
      bullets: [
        { text: "Traditional ", italic: "batana" },
        { text: "Ponte dei Trepponti bridge showcases majestic Baroque architecture" },
        { text: "Terraced houses painted in soft, inviting pastels shift hues with changing Adriatic light" },
        { text: "Historic foundations create soothing soundtracks as water gently laps against ancient stones" },
        { text: "Significantly fewer visitors enhance the charm and allow deeper sensory experiences" },
        { text: "Small bridges throughout the inner districts invite leisurely exploration" },
        { text: "Shimmering lagoon reflections create enhanced visual allure compared to crowded alternatives" },
      ],
    },
    {
      heading: "Ancient Eel Traditions and Adriatic Specialties",
      intro: "Comacchio's culinary heritage centers on time-honored seafood preparation methods.",
      bullets: [
        { text: "Local eel is celebrated and prepared in myriad ways, from appetizers to main courses" },
        { text: "Sala dei Fuochi features a massive room with 12 historic fireplaces for traditional roasting and marinating" },
        { text: "Smoky aromas of eel fill the air during autumn and winter preparations" },
        { text: "Scallop and clam appetizers showcase fresh Adriatic shellfish varieties" },
        { text: "Spaghetti with crabs and ", italic: "risotto alla pescatore" },
        { text: "Exquisite mixed grilled platters demonstrate diverse seafood cooking techniques" },
        { text: "A culinary journey deeply rooted in Emilia-Romagna traditions provides authentic regional flavors" },
      ],
      outro: "For more information, see our",
      link: { label: "Italy travel guide", href: "/blog/italy" },
      showBackToTop: true,
    },
  ],
  outroHeading: "O'zbekiston ichida yangi manzillar sizni kutmoqda.",
  outroImage: "/images/blog/blog-hall-interior.jpg",
};

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb
// ─────────────────────────────────────────────────────────────────────────────
function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-5">
      {items.map((item, idx) => (
        <span key={item.href} className="flex items-center gap-2">
          <Link
            href={item.href}
            className="text-[#3B82F6] text-sm hover:underline"
          >
            {item.label}
          </Link>
          {idx < items.length - 1 && (
            <span className="text-gray-400 text-sm">/</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar — sticky right panel
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar() {
  const [formData, setFormData] = useState({ name: "", email: "", agree: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const points = [
    "O'zbekiston ichida yangi manzillar sizni kutmoqda.",
    "Siz bilmagan mo'jizalar yaqin atrofda.",
    "Siz bilmagan mo'jizalar yaqin atrofda.",
  ];

  return (
    <aside className="w-full lg:w-[300px] xl:w-[320px] flex-shrink-0">
      <div className="sticky top-28 space-y-5">

        {/* Premium card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Rating row */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-gray-500 text-xs">Ratings of Zicasso&rsquo;s Service</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="#00B67A">
                  <path d="M7 1l1.5 4H13L9.5 8l1.5 4L7 9.5 3.5 12l1.5-4L1.5 5H5.5z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Heading */}
          <h3
            className="text-[#1a1a3e] font-bold text-lg text-center mb-5 leading-snug"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Premium konsert va tadbirlar
          </h3>

          {/* Numbered list */}
          <ol className="space-y-3 mb-6">
            {points.map((point, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="
                  w-5 h-5 rounded-full border border-gray-300
                  flex items-center justify-center
                  text-[11px] text-gray-500 font-medium
                  flex-shrink-0 mt-0.5
                ">
                  {idx + 1}
                </span>
                <span className="text-gray-600 text-sm leading-snug">{point}</span>
              </li>
            ))}
          </ol>

          {/* CTA */}
          <Link
            href="/sessions"
            className="
              block w-full text-center
              bg-[#F47B20] hover:bg-[#D4640F]
              text-white font-bold text-sm
              py-3 rounded-xl
              transition-colors duration-200
            "
          >
            Kirish
          </Link>
        </div>

        {/* Newsletter signup card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          {/* Watermark */}
          <span
            className="absolute -bottom-3 -right-4 text-gray-100 font-black text-6xl select-none pointer-events-none leading-none"
            aria-hidden="true"
          >
            Zicasso
          </span>

          <h3
            className="text-[#1a1a3e] font-bold text-base mb-2 leading-snug relative z-10"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Sayohatingizni hozir boshlang
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-5 relative z-10">
            Har bir viloyat o'zining betakror tabiati, qadimiy yodgorliklari va
            mehmondo'st aholisi bilan sizni iliq kutib oladi.
          </p>

          {submitted ? (
            <p className="text-green-600 text-sm font-medium text-center py-3">
              ✓ Muvaffaqiyatli yuborildi!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
              <input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="
                  w-full border border-gray-200 rounded-lg px-4 py-2.5
                  text-sm text-gray-700 placeholder-gray-400
                  outline-none focus:border-[#F47B20] focus:ring-1 focus:ring-[#F47B20]/20
                  transition-all duration-200
                "
              />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="
                  w-full border border-gray-200 rounded-lg px-4 py-2.5
                  text-sm text-gray-700 placeholder-gray-400
                  outline-none focus:border-[#F47B20] focus:ring-1 focus:ring-[#F47B20]/20
                  transition-all duration-200
                "
              />
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-0.5 w-4 h-4 accent-[#F47B20] cursor-pointer flex-shrink-0"
                />
                <span className="text-gray-400 text-xs leading-relaxed">
                  I would like to receive weekly travel inspiration from Zicasso&rsquo;s
                  newsletter. We respect your privacy, and your email will be secure.
                </span>
              </label>

              <button
                type="submit"
                className="
                  w-full flex items-center justify-center gap-2
                  bg-gray-800 hover:bg-gray-700
                  text-white font-semibold text-sm
                  py-3 rounded-lg
                  transition-colors duration-200
                "
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="13" height="10" rx="1.5" />
                  <path d="M1 5l6.5 4.5L14 5" />
                </svg>
                Junatish
              </button>
            </form>
          )}
        </div>

      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog body section with heading + bullets
// ─────────────────────────────────────────────────────────────────────────────
function BlogSection({ section }: { section: BlogSection }) {
  return (
    <div className="mb-8">
      <h2 className="text-gray-900 font-bold text-base mb-4 leading-snug">
        {section.heading}
      </h2>
      {section.intro && (
        <p className="text-gray-700 text-sm leading-relaxed mb-4">{section.intro}</p>
      )}
      {section.bullets && (
        <ul className="space-y-2.5 mb-4">
          {section.bullets.map((b, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-gray-500 mt-1 text-xs flex-shrink-0">•</span>
              <span className="text-gray-700 text-sm leading-relaxed">
                {b.italic ? (
                  <>
                    {b.text}
                    <em className="italic">{b.italic}</em>
                    {b.text.endsWith(" ") ? "" : " "}
                    {b.text.includes(b.italic) ? "" : "boat tours provide intimate perspectives of the aquatic landscape and lagoon city"}
                  </>
                ) : (
                  b.text
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
      {section.outro && (
        <p className="text-gray-700 text-sm">
          {section.outro}{" "}
          {section.link && (
            <Link href={section.link.href} className="text-[#3B82F6] hover:underline">
              {section.link.label}
            </Link>
          )}
          {"."}
        </p>
      )}
      {section.showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[#3B82F6] text-sm hover:underline mt-3 block"
        >
          Back to Top
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main BlogDetailPage
// ─────────────────────────────────────────────────────────────────────────────
export default function BlogDetailPage({ post = MOCK_POST }: BlogDetailProps) {
  return (
    <main className="w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">

          {/* ── Main content ── */}
          <article className="flex-1 min-w-0">

            {/* Breadcrumb */}
            <Breadcrumb items={post.breadcrumb} />

            {/* Title */}
            <h1
              className="text-gray-900 font-bold text-2xl md:text-3xl leading-snug mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {post.title}
            </h1>

            {/* Hero image */}
            <div className="relative w-full overflow-hidden rounded-2xl mb-4" style={{ aspectRatio: "16/9" }}>
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Caption */}
            <p className="text-gray-500 text-sm italic mb-7 leading-relaxed">
              {post.heroCaption}
            </p>

            {/* Body paragraphs */}
            <div className="space-y-5 mb-8">
              {post.bodyParagraphs.map((para, idx) => (
                <p key={idx} className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Divider */}
            <hr className="border-gray-200 mb-10" />

            {/* Second image */}
            {post.secondImage && (
              <div className="relative w-full overflow-hidden rounded-2xl mb-10" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={post.secondImage}
                  alt="Concert hall"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Rich sections */}
            {post.sections.map((section, idx) => (
              <BlogSection key={idx} section={section} />
            ))}

            {/* Outro section */}
            {post.outroHeading && (
              <div className="mt-12">
                <h2
                  className="text-gray-900 font-bold text-xl md:text-2xl mb-6 leading-snug"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {post.outroHeading}
                </h2>
                {post.outroImage && (
                  <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src={post.outroImage}
                      alt="Concert hall interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            )}

          </article>

          {/* ── Sticky sidebar ── */}
          <Sidebar />

        </div>
      </div>
    </main>
  );
}