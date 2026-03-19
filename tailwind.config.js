/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF9F2",
          100: "#FFEBD3",
          200: "#FFD0A3",
          300: "#FFB070",
          400: "#FF9249",
          500: "#FF7A2A",
          600: "#E25F1C",
          700: "#B74516",
          800: "#7A2F0F",
          900: "#441708",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.45)",
      },
      borderRadius: {
        "4xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
