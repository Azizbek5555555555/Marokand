"use client";

import Link from "next/link";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const supportLinks = [
  { label: "Forum support", href: "/support/forum" },
  { label: "Help Center", href: "/support/help-center" },
  { label: "Live chat", href: "/support/live-chat" },
  { label: "How it works", href: "/support/how-it-works" },
  { label: "Security", href: "/support/security" },
  { label: "Privacy", href: "/support/privacy" },
  { label: "Charges logs", href: "/support/charges-logs" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Community Blog", href: "/blog" },
  { label: "Jobs and Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
  { label: "Our Awards", href: "/awards" },
  { label: "Agencies", href: "/agencies" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const bottomLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Legal notice", href: "/legal" },
  { label: "Accessibility", href: "/accessibility" },
];

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white">
      {/* ── Top bar: Logo + phone ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-10 pb-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-2xl font-bold tracking-widest uppercase"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          LOGO
        </Link>

        {/* Phone */}
        <div className="flex items-center gap-3">
          {/* Phone icon circle */}
          <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-white/70 text-sm font-medium whitespace-nowrap">
            Need help? Call us
          </span>
          <a
            href="tel:+998662345678"
            className="text-[#C9A84C] font-bold text-base tracking-wide hover:text-[#e0b95a] transition-colors"
          >
            X-XXX-XXX-XXXX
          </a>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <hr className="border-white/10" />
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* Col 1 — About + Social */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-white font-semibold text-base mb-4">About</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Birgalikda kashf qilaylikO&rsquo;zbekiston ichki turizmi nafaqat
              tarixiy maskanlar bilan, balki zamonaviy ekoturizm, oilaviy dam
              olish va sog&rsquo;lomlashtirish maskanlari bilan ham boyib
              bormoqda.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Birgalikda kashf qilaylikO&rsquo;zbekiston ichki turizmi nafaqat
              tarixiy
            </p>
          </div>

          {/* Social */}
          <div>
            <p className="text-white font-semibold text-sm mb-3">Follow us</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    w-9 h-9 rounded-full border border-white/20
                    flex items-center justify-center
                    text-white/70
                    transition-all duration-200
                    hover:border-[#C9A84C] hover:text-[#C9A84C] hover:scale-110
                  "
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2 — Support */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4">Support</h3>
          <ul className="flex flex-col gap-3">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Company */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4">Company</h3>
          <ul className="flex flex-col gap-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact Us + Payments */}
        <div className="flex flex-col gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 flex-shrink-0 text-white/40"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-white/50 text-sm leading-snug">
                  Mirzo Ulugbek St 61, 140100,<br />Samarkand, Uzbekistan
                </span>
              </li>

              {/* Hours */}
              <li className="flex items-center gap-3">
                <svg
                  className="flex-shrink-0 text-white/40"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                </svg>
                <span className="text-white/50 text-sm">
                  Hours: 8:00 – 17:00, Mon – Sat
                </span>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <svg
                  className="flex-shrink-0 text-white/40"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a
                  href="mailto:support@marokand.uz"
                  className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors"
                >
                  support@marokand.uz
                </a>
              </li>
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">
              Payments
            </h3>
            <div className="flex items-center gap-2">
              {/* PayPal */}
              <div className="h-8 px-3 rounded bg-white flex items-center justify-center">
                <svg width="52" height="14" viewBox="0 0 124 33" fill="none">
                  <path d="M46.2 6.8h-9.1c-.6 0-1.2.5-1.3 1.1L32 27.6c-.1.5.3.9.7.9h4.3c.6 0 1.2-.5 1.3-1.1l.9-5.8c.1-.6.6-1.1 1.3-1.1h2.9c5.9 0 9.3-2.9 10.2-8.5.4-2.5 0-4.4-1.1-5.7-1.3-1.5-3.5-2.5-6.3-2.5zm1 8.4c-.5 3.1-2.9 3.1-5.3 3.1h-1.3l.9-5.9c.1-.4.4-.6.8-.6h.6c1.6 0 3.1 0 3.9.9.5.6.6 1.4.4 2.5zM73.2 15.1h-4.3c-.4 0-.7.3-.8.6l-.2 1.3-.3-.5c-1-1.4-3.1-1.9-5.3-1.9-5 0-9.2 3.8-10 9.1-.4 2.6.2 5.1 1.6 6.9 1.3 1.6 3.2 2.3 5.4 2.3 4 0 6.3-2.6 6.3-2.6l-.2 1.3c-.1.5.3.9.7.9h3.9c.6 0 1.2-.5 1.3-1.1l2.3-14.8c.2-.5-.2-1.5-.4-1.5zm-6 8.8c-.4 2.5-2.4 4.2-4.9 4.2-1.3 0-2.3-.4-2.9-1.2-.6-.8-.8-2-.6-3.2.4-2.5 2.4-4.2 4.9-4.2 1.2 0 2.2.4 2.9 1.2.6.9.8 2 .6 3.2zM97 15.1h-4.4c-.4 0-.8.2-1.1.6l-6.3 9.3-2.7-8.9c-.2-.6-.7-.9-1.2-.9h-4.3c-.5 0-.9.5-.7 1l5.1 14.9-4.8 6.7c-.3.5.1 1.1.6 1.1h4.4c.4 0 .8-.2 1.1-.5l15.3-22.1c.4-.5 0-1.2-.5-1.2h-.5z" fill="#003087"/>
                  <path d="M108.3 6.8h-9.1c-.6 0-1.2.5-1.3 1.1l-3.8 24c-.1.5.3.9.7.9h4.6c.4 0 .8-.3.9-.7l1.1-6.8c.1-.6.6-1.1 1.3-1.1h2.9c5.9 0 9.3-2.9 10.2-8.5.4-2.5 0-4.4-1.1-5.7-1.4-1.5-3.6-2.2-6.4-2.2zm1.1 8.4c-.5 3.1-2.9 3.1-5.3 3.1h-1.4l.9-5.9c.1-.4.4-.6.8-.6h.6c1.6 0 3.1 0 3.9.9.5.6.6 1.4.5 2.5zM135.3 15.1H131c-.4 0-.7.3-.8.6l-.2 1.3-.3-.5c-1-1.4-3.1-1.9-5.3-1.9-5 0-9.2 3.8-10 9.1-.4 2.6.2 5.1 1.6 6.9 1.3 1.6 3.2 2.3 5.4 2.3 4 0 6.3-2.6 6.3-2.6l-.2 1.3c-.1.5.3.9.7.9h3.9c.6 0 1.2-.5 1.3-1.1l2.3-14.8c.1-.5-.2-1.5-.4-1.5zm-6 8.8c-.4 2.5-2.4 4.2-4.9 4.2-1.3 0-2.3-.4-2.9-1.2-.6-.8-.8-2-.6-3.2.4-2.5 2.4-4.2 4.9-4.2 1.2 0 2.2.4 2.9 1.2.6.9.8 2.1.6 3.2z" fill="#009cde"/>
                </svg>
              </div>

              {/* Stripe */}
              <div className="h-8 px-3 rounded bg-white flex items-center justify-center">
                <svg width="40" height="16" viewBox="0 0 60 25" fill="none">
                  <path
                    d="M27.5 10.2c0-3.8-1.8-6.7-5.3-6.7-3.5 0-5.7 2.9-5.7 6.7 0 4.4 2.5 6.6 6.1 6.6 1.7 0 3.1-.4 4.1-1v-2.9c-1 .5-2.1.8-3.5.8-1.4 0-2.6-.5-2.7-2.2h6.9c0-.2.1-.9.1-1.3zm-7-.9c0-1.6 1-2.3 1.9-2.3.9 0 1.8.7 1.8 2.3h-3.7zM10.4 3.5C9 3.5 8.1 4.1 7.6 4.6l-.2-1h-3v18.8l3.4-.7v-4.6c.5.4 1.3.9 2.6.9 2.6 0 5-2.1 5-6.8-.1-4.3-2.5-6.7-5-6.7zm-.9 10.3c-.9 0-1.4-.3-1.7-.7V7.5c.4-.4.9-.7 1.7-.7 1.3 0 2.2 1.5 2.2 3.5 0 2.1-.8 3.5-2.2 3.5zM3.5 2.4L.1 3.1v2.8l3.4-.7zM.1 4.6h3.4v12.1H.1zM38.7 5.7l-.2-1.1h-3v12.1h3.4V9c.8-1.1 2.2-.9 2.6-.7V4.6c-.5-.2-2.1-.5-2.8 1.1zM44.5 1.2l-3.3.7v10.7c0 2 1.5 3.5 3.5 3.5 1.1 0 1.9-.2 2.4-.5v-2.8c-.4.2-2.6.8-2.6-1.2V7.4h2.6V4.6h-2.6V1.2zM53.8 6c-1.3-.5-1.9-.7-1.9-1.3 0-.5.4-.7 1.2-.7 1.1 0 2.3.4 3.1.9V2.1c-.8-.3-1.9-.7-3.1-.7-2.6 0-4.3 1.4-4.3 3.6 0 2.2 1.3 3.2 3.5 3.9 1.4.5 1.9.8 1.9 1.4 0 .6-.5.9-1.4.9-1.2 0-2.7-.5-3.8-1.2v2.9c.9.4 2.3.8 3.8.8 2.7 0 4.5-1.3 4.5-3.7C57.3 7.7 56.1 6.8 53.8 6z"
                    fill="#635BFF"
                  />
                </svg>
              </div>

              {/* Mastercard */}
              <div className="h-8 px-2 rounded bg-white flex items-center justify-center gap-0.5">
                <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
                <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90 -ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom divider ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <hr className="border-white/10" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-end gap-4">
        <nav className="flex items-center gap-6 flex-wrap justify-center sm:justify-end">
          {bottomLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/40 text-sm hover:text-white/70 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}