import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <form
      role="search"
      className="hidden md:flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-2 backdrop-blur-xl shadow-md shadow-black/40 min-w-[220px] max-w-xs"
    >
      <Search className="h-4 w-4 text-white/70" aria-hidden="true" />
      <input
        type="search"
        placeholder="Izlash..."
        className="w-full bg-transparent text-sm text-white placeholder:text-white/55 focus:outline-none"
        aria-label="Saytdan izlash"
      />
    </form>
  );
}

