"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Constants — Marokand Concert Hall coordinates (Samarkand, Uzbekistan)
// ---------------------------------------------------------------------------
const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6143.18032391248!2d66.93751554455542!3d39.65893719999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19226375ad35%3A0xb8a9dd6fb3d9029f!2sSamarkand%20Concert%20Hall!5e0!3m2!1sen!2s!4v1773572869152!5m2!1sen!2s";

// Direct Google Maps link to open
const MAPS_LINK = "https://maps.app.goo.gl/pqWri7REx7j9Ev8b6";

// ---------------------------------------------------------------------------
// Info items
// ---------------------------------------------------------------------------
interface InfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

const infoItems: InfoItem[] = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          fill="currentColor"
        />
      </svg>
    ),
    label: "Manzil",
    value: "Mirzo Ulugbek St 61, 140100, Samarkand, Samarqand Region, Uzbekistan",
    href: MAPS_LINK,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
          fill="currentColor"
        />
      </svg>
    ),
    label: "Telefon",
    value: "+998 66 234 56 78",
    href: "tel:+998662345678",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
          fill="currentColor"
        />
      </svg>
    ),
    label: "Email",
    value: "info@marokand.uz",
    href: "mailto:info@marokand.uz",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"
          fill="currentColor"
        />
      </svg>
    ),
    label: "Ish vaqti",
    value: "Dushanba – Yakshanba: 09:00 – 22:00",
  },
];

// ---------------------------------------------------------------------------
// InfoCard
// ---------------------------------------------------------------------------
function InfoCard({ item }: { item: InfoItem }) {
  const content = (
    <div className="flex items-start gap-4 group">
      {/* Icon circle */}
      <div
        className="
          flex-shrink-0 w-11 h-11 rounded-full
          bg-[#C9A84C]/10 text-[#C9A84C]
          flex items-center justify-center
          transition-colors duration-300
          group-hover:bg-[#C9A84C] group-hover:text-white
        "
      >
        {item.icon}
      </div>

      {/* Text */}
      <div className="pt-0.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
          {item.label}
        </p>
        <p className="text-gray-800 text-sm md:text-base font-medium leading-snug">
          {item.value}
        </p>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

// ---------------------------------------------------------------------------
// LocationSection
// ---------------------------------------------------------------------------
export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".location-header",
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".location-header", start: "top 88%" },
          }
        );

        gsap.fromTo(
          ".location-map",
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".location-map", start: "top 88%" },
          }
        );

        gsap.fromTo(
          ".location-info-item",
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".location-info",
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="location-header text-center mb-12">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">
            Bizning joylashuv
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
          >
            Bizni toping
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Marokand konsert zali Samarqand shahrining markazida,
            qulay transport infratuzilmasi yaqinida joylashgan.
          </p>
        </div>

        {/* Body: map left, info right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Map — takes 3/5 of the width */}
          <div className="location-map lg:col-span-3">
            <div className="relative w-full h-[420px] lg:h-full min-h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Marokand Concert Hall Location"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Info panel — takes 2/5 */}
          <div className="location-info lg:col-span-2 flex flex-col justify-between gap-6">
            {/* Info cards */}
            <div className="flex flex-col gap-7">
              {infoItems.map((item) => (
                <div key={item.label} className="location-info-item">
                  <InfoCard item={item} />
                </div>
              ))}
            </div>

            {/* CTA button */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                w-full bg-[#C9A84C] text-white
                font-semibold text-sm tracking-wide
                px-6 py-4 rounded-xl
                transition-all duration-300
                hover:bg-[#b8943d] hover:shadow-lg hover:scale-[1.02]
                active:scale-95
                mt-2
              "
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="white"
                />
              </svg>
              Google Maps'da ochish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}