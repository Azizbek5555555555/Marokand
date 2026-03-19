"use client";

import Image from "next/image";
import { useState } from "react";

const flags = [
  { code: "uz", label: "O‘zbekcha", icon: "/flags/uz.svg" },
  { code: "ru", label: "Русский", icon: "/flags/ru.svg" },
  { code: "en", label: "English", icon: "/flags/us.svg" },
  { code: "zh", label: "中文", icon: "/flags/cn.svg" }
];

export function LanguageSwitcher() {
  const [activeCode, setActiveCode] = useState<string>("en");
  const [open, setOpen] = useState(false);

  const active = flags.find((f) => f.code === activeCode) ?? flags[0];

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Tilni almashtirish"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-md shadow-black/40 backdrop-blur-md hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src={active.icon}
          alt={active.label}
          fill
          className="rounded-full object-cover"
          sizes="36px"
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 rounded-2xl bg-[#101020]/95 border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl py-2 text-sm">
          {flags.map((flag) => (
            <button
              key={flag.code}
              type="button"
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-white/80 hover:bg-white/10 ${
                flag.code === activeCode ? "bg-white/10" : ""
              }`}
              onClick={() => {
                setActiveCode(flag.code);
                setOpen(false);
              }}
            >
              <span className="relative inline-flex h-5 w-5 overflow-hidden rounded-full border border-white/30 bg-white/10">
                <Image
                  src={flag.icon}
                  alt={flag.label}
                  fill
                  className="object-cover"
                  sizes="20px"
                />
              </span>
              <span>{flag.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

