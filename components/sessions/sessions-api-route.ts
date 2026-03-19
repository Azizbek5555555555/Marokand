export type Session = {
    id: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    rating: number;
    price: number;
    originalPrice: number;
    badge?: "FEATURED" | "NEW" | string;
    images: string[];
    specials: string[];
  };