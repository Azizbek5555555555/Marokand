"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const faqs: FaqItem[] = [
  {
    id: 1,
    question: "Marokand konsert zalida qanday tadbirlar o'tkaziladi?",
    answer:
      "Marokand konsert zalida milliy va xalqaro miqyosdagi konsertlar, teatr spektakllari, madaniy tadbirlar, korporativ uchrashuvlar va maxsus bayram tadbirlari o'tkaziladi. Zal har qanday formatdagi tadbirlar uchun moslashtirilgan.",
  },
  {
    id: 2,
    question: "Chiptalarni qanday sotib olish mumkin?",
    answer:
      "Chiptalarni saytimiz orqali onlayn, shuningdek kassada bevosita sotib olish mumkin. Onlayn xarid qilish orqali chegirmalar va maxsus takliflardan foydalanish imkoniyatiga ega bo'lasiz.",
  },
  {
    id: 3,
    question: "Zal qancha kishini sig'dira oladi?",
    answer:
      "Marokand konsert zali 2 000 dan ortiq tomoshabinni qabul qilish imkoniyatiga ega. Zamonaviy jihozlar va qulay o'rindiqlar bilan jihozlangan zal barcha mehmonlar uchun yuqori darajadagi qulaylikni ta'minlaydi.",
  },
  {
    id: 4,
    question: "Korporativ tadbirlar uchun zalni ijaraga olish mumkinmi?",
    answer:
      "Ha, Marokand konsert zalini korporativ tadbirlar, konferensiyalar, mahsulot taqdimotlari va boshqa maxsus tadbirlar uchun ijaraga olish mumkin. Batafsil ma'lumot uchun biz bilan bog'laning.",
  },
  {
    id: 5,
    question: "Parking mavjudmi?",
    answer:
      "Ha, konsert zali yonida keng va qulay avtomobil to'xtash joyi mavjud. Parking bepul bo'lib, barcha tadbirlar davomida xizmat ko'rsatadi.",
  },
  {
    id: 6,
    question: "Nogironlar uchun maxsus sharoitlar bormi?",
    answer:
      "Marokand konsert zali har tomonlama qulay muhit yaratish maqsadida nogironlar uchun maxsus o'rindiqlar, lift va rampa bilan jihozlangan. Barcha mehmonlarga teng imkoniyat yaratilgan.",
  },
];

// ---------------------------------------------------------------------------
// FaqItem component
// ---------------------------------------------------------------------------
function FaqAccordionItem({ item, isOpen, onToggle }: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`
        faq-item border-b border-gray-200 last:border-b-0
        transition-colors duration-200
        ${isOpen ? "bg-transparent" : ""}
      `}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        aria-expanded={isOpen}
      >
        {/* Question */}
        <span
          className={`
            text-base md:text-lg font-medium leading-snug transition-colors duration-200
            ${isOpen ? "text-[#C9A84C]" : "text-gray-900 group-hover:text-[#C9A84C]"}
          `}
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {item.question}
        </span>

        {/* Icon */}
        <span
          className={`
            flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center
            transition-all duration-300
            ${isOpen
              ? "border-[#C9A84C] bg-[#C9A84C] rotate-45"
              : "border-gray-300 bg-transparent group-hover:border-[#C9A84C]"
            }
          `}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1V11M1 6H11"
              stroke={isOpen ? "white" : "#6b7280"}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {/* Answer — animated height */}
      <div
        ref={answerRef}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? `${answerRef.current?.scrollHeight ?? 500}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="text-gray-500 text-sm md:text-base leading-relaxed pb-6 pr-12">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FaqSection
// ---------------------------------------------------------------------------
export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
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
          ".faq-header",
          { opacity: 0, y: -24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".faq-header", start: "top 88%" },
          }
        );

        gsap.fromTo(
          ".faq-item",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: ".faq-list",
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
      className="w-full bg-white py-16 px-4 md:px-8 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="faq-header text-center mb-12">
          {/* Eyebrow */}
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            Savol va Javoblar
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
          >
            Ko&rsquo;p so&rsquo;raladigan savollar
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Marokand konsert zali haqida eng ko&rsquo;p beriladigan savollarga
            javoblarni bu yerda topishingiz mumkin.
          </p>
        </div>

        {/* Two-column layout for large screens */}
        <div className="faq-list grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          {/* Left column */}
          <div className="divide-y divide-gray-200">
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>

          {/* Right column */}
          <div className="divide-y divide-gray-200">
            {faqs.slice(Math.ceil(faqs.length / 2)).map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-gray-400 text-sm">
            Savolingizga javob topa olmadingizmi?
          </p>
          <a
            href="/contact"
            className="
              inline-flex items-center gap-2
              border border-[#C9A84C] text-[#C9A84C]
              text-sm font-semibold
              px-6 py-2.5 rounded-full
              transition-all duration-300
              hover:bg-[#C9A84C] hover:text-white hover:shadow-md
              active:scale-95
            "
          >
            Biz bilan bog&rsquo;laning
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 12L12 2M12 2H4M12 2V10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}