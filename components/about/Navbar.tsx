"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ---------------------------------------------------------------------------
// Nav links
// ---------------------------------------------------------------------------
const navLinks = [
  { label: "Afisha", href: "/afisha" },
  { label: "About", href: "/about" },
  { label: "Organizator", href: "/organizator" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full px-4 md:px-8 lg:px-16 pt-5 pb-2">
      <nav
        className="
          w-full max-w-[1200px] mx-auto
          bg-[#C9A84C]
          rounded-full
          flex items-center
          px-6 md:px-8
          py-3
          gap-6
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-white font-bold text-2xl tracking-tight mr-6 flex-shrink-0"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          LOGO
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-1 md:gap-2 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    text-white text-sm md:text-base font-medium
                    px-3 py-1.5 rounded-full
                    transition-all duration-200
                    hover:bg-white/20
                    ${isActive ? "bg-white/20" : ""}
                  `}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: Calendar button + flag */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Calendar button */}
          <Link
            href="/calendar"
            className="
              bg-gradient-to-r from-yellow-300 to-orange-400
              text-white text-sm font-semibold
              px-5 py-2 rounded-full
              transition-all duration-200
              hover:opacity-90 hover:shadow-md
              whitespace-nowrap
            "
          >
            Calendar
          </Link>

          {/* Flag / language */}
          <button
            aria-label="Switch language"
            className="
              w-9 h-9 rounded-full overflow-hidden
              border-2 border-white/40
              flex items-center justify-center
              hover:border-white/70 transition-all duration-200
              bg-white/10
              flex-shrink-0
            "
          >
            {/* US flag emoji as placeholder — swap with next/image + real flag */}
            <span className="text-lg leading-none">🇺🇸</span>
          </button>
        </div>
      </nav>
    </header>
  );
}