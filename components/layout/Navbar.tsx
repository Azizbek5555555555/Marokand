"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { SearchBar } from "../ui/SearchBar";

type NavItem = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; description?: string }[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Afisha",
    href: "/afisha",
    dropdown: [
      { label: "Yaqin tadbirlar", href: "/afisha/upcoming" },
      { label: "O‘tgan tadbirlar", href: "/afisha/archive" }
    ]
  },
  {
    label: "About",
    href: "/about",
    dropdown: [
      { label: "Zal haqida", href: "/about/hall" },
      { label: "Tarix", href: "/about/history" }
    ]
  },
  {
    label: "Organizer",
    href: "/organizer",
    dropdown: [
      { label: "Tadbir tashkil qilish", href: "/organizer/events" },
      { label: "Hamkorlik", href: "/organizer/partners" }
    ]
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleDropdown = (label: string) => {
    setOpenDropdown((current) => (current === label ? null : label));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="nav-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-center gap-2 text-sm font-semibold uppercase text-white"
            aria-label="MAROKAND bosh sahifaga qaytish"
          >
            <div className="relative h-8 w-[140px] md:h-9 md:w-[160px]">
              <Image
                src="/images/marokand-logo.png"
                alt="Marokand logotipi"
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
            <span className="sr-only">MAROKAND</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden flex-1 items-center justify-between gap-6 md:flex">
            <ul className="flex items-center gap-6 text-sm text-white/80">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const hasDropdown = item.dropdown && item.dropdown.length > 0;

                return (
                  <li key={item.label} className="relative">
                    {hasDropdown ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleToggleDropdown(item.label)}
                          onBlur={(event) => {
                            if (
                              !event.currentTarget.contains(
                                event.relatedTarget as Node
                              )
                            ) {
                              setOpenDropdown(null);
                            }
                          }}
                          className={`inline-flex items-center gap-1 text-sm transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-white/80 hover:text-white"
                          }`}
                          aria-haspopup="menu"
                          aria-expanded={openDropdown === item.label}
                        >
                          {item.label}
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        {openDropdown === item.label && (
                          <div
                            role="menu"
                            className="absolute left-0 top-9 min-w-[220px] rounded-2xl bg-[#101020]/95 border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl py-3"
                          >
                            {item.dropdown!.map((entry) => (
                              <Link
                                key={entry.href}
                                href={entry.href}
                                className="flex flex-col gap-0.5 px-4 py-2.5 text-sm text-white/80 hover:bg-white/6 hover:text-white focus-visible:outline-none"
                                role="menuitem"
                              >
                                <span className="font-medium">
                                  {entry.label}
                                </span>
                                {entry.description && (
                                  <span className="text-xs text-white/55">
                                    {entry.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`text-sm transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <SearchBar />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Navigatsiyani ochish"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-white/12 bg-[#05020B]/95 backdrop-blur-2xl md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
              <SearchBar />
              <ul className="mt-3 flex flex-col gap-1 text-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-white/80 hover:bg-white/10"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{item.label}</span>
                      {item.dropdown && (
                        <span className="text-[11px] uppercase tracking-wide text-white/40">
                          {item.dropdown.length} bo‘lim
                        </span>
                      )}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4">
                        {item.dropdown.map((entry) => (
                          <Link
                            key={entry.href}
                            href={entry.href}
                            className="block rounded-xl px-3 py-2 text-xs text-white/65 hover:bg-white/6"
                            onClick={() => setMobileOpen(false)}
                          >
                            {entry.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

