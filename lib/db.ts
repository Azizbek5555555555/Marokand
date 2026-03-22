// lib/db.ts
// Simple JSON file-based "database"
// TODO: Replace with Prisma/Drizzle + PostgreSQL in production

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(collection: string) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readCollection<T>(collection: string): T[] {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T[];
}

function writeCollection<T>(collection: string, data: T[]): void {
  const filePath = getFilePath(collection);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s\u0400-\u04FF]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80);
}

// ─── Blog ───────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  heroCaption: string;
  body: string;
  secondImage?: string;
  outroHeading?: string;
  outroImage?: string;
  tag?: string;
  createdAt: string;
  updatedAt: string;
}

export const BlogDB = {
  getAll(): BlogPost[] {
    return readCollection<BlogPost>("blogs");
  },

  getBySlug(slug: string): BlogPost | null {
    const all = this.getAll();
    return all.find((b) => b.slug === slug) ?? null;
  },

  create(data: Omit<BlogPost, "id" | "slug" | "createdAt" | "updatedAt"> & { titleForSlug?: string }): BlogPost {
    const all = this.getAll();
    const slug = generateSlug(data.titleForSlug ?? data.title);
    const now = new Date().toISOString();

    let finalSlug = slug;
    let counter = 1;
    while (all.find((b) => b.slug === finalSlug)) {
      finalSlug = `${slug}-${counter++}`;
    }

    const newPost: BlogPost = {
      id: `blog_${Date.now()}`,
      slug: finalSlug,
      title: data.title,
      heroImage: data.heroImage,
      heroCaption: data.heroCaption,
      body: data.body,
      secondImage: data.secondImage,
      outroHeading: data.outroHeading,
      outroImage: data.outroImage,
      tag: data.tag,
      createdAt: now,
      updatedAt: now,
    };

    writeCollection("blogs", [...all, newPost]);
    return newPost;
  },

  update(id: string, data: Partial<BlogPost>): BlogPost | null {
    const all = this.getAll();
    const idx = all.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    const updated = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
    all[idx] = updated;
    writeCollection("blogs", all);
    return updated;
  },

  delete(id: string): boolean {
    const all = this.getAll();
    const filtered = all.filter((b) => b.id !== id);
    if (filtered.length === all.length) return false;
    writeCollection("blogs", filtered);
    return true;
  },
};

// ─── Concert ────────────────────────────────────────────────────────────────

export interface Concert {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price?: string;
  tag?: string;
  status: "active" | "draft" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export const ConcertDB = {
  getAll(): Concert[] {
    return readCollection<Concert>("concerts");
  },

  getBySlug(slug: string): Concert | null {
    const all = this.getAll();
    return all.find((c) => c.slug === slug) ?? null;
  },

  create(data: Omit<Concert, "id" | "slug" | "createdAt" | "updatedAt">): Concert {
    const all = this.getAll();
    const slug = generateSlug(data.title);
    const now = new Date().toISOString();

    let finalSlug = slug;
    let counter = 1;
    while (all.find((c) => c.slug === finalSlug)) {
      finalSlug = `${slug}-${counter++}`;
    }

    const newConcert: Concert = {
      id: `concert_${Date.now()}`,
      slug: finalSlug,
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    writeCollection("concerts", [...all, newConcert]);
    return newConcert;
  },

  update(id: string, data: Partial<Concert>): Concert | null {
    const all = this.getAll();
    const idx = all.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    const updated = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
    all[idx] = updated;
    writeCollection("concerts", all);
    return updated;
  },

  delete(id: string): boolean {
    const all = this.getAll();
    const filtered = all.filter((c) => c.id !== id);
    if (filtered.length === all.length) return false;
    writeCollection("concerts", filtered);
    return true;
  },
};