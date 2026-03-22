// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { BlogDB } from "@/lib/db";
import BlogDetailPage from "@/components/blog/Blogdetailpage";
import { Navbar } from "@/components/layout/Navbar";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BlogDB.getBySlug(params.slug);
  if (!post) return { title: "Blog topilmadi" };
  return {
    title: `${post.title} — Marokand Blog`,
    description: post.heroCaption,
  };
}

export default function BlogDetailRoute({ params }: Props) {
  const post = BlogDB.getBySlug(params.slug);
  if (!post) notFound();

  const mapped = {
    id: post.id,
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: post.title.substring(0, 40) + "...", href: "#" },
    ],
    title: post.title,
    heroImage: post.heroImage,
    heroCaption: post.heroCaption,
    bodyParagraphs: post.body.split("\n\n").filter(Boolean),
    secondImage: post.secondImage,
    sections: [],
    outroHeading: post.outroHeading,
    outroImage: post.outroImage,
  };

  return (
    <>
      <Navbar />
      <BlogDetailPage post={mapped} />
    </>
  );
}