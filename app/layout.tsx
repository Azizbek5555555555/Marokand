import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap"
});

export const metadata: Metadata = {
  title: "MAROKAND Concert Hall",
  description: "Premium concert and cultural events platform for MAROKAND."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={plusJakarta.variable}>
      <body className="font-sans bg-[#05020B] text-white">
        {children}
      </body>
    </html>
  );
}

