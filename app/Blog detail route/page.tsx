// app/blog/[slug]/page.tsx
import BlogDetailPage, { MOCK_POST } from "@/components/blog/Blogdetailpage";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

// In production: fetch post by slug from your API/CMS
async function getPost(slug: string) {
  // TODO: replace with real API call
  // const res = await fetch(`${process.env.API_URL}/api/blog/${slug}`);
  // if (!res.ok) notFound();
  // return res.json();
  return { ...MOCK_POST, id: slug };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: `${post.title} — Marokand Blog`,
    description: post.heroCaption,
  };
}

export default async function BlogDetailRoute({ params }: Props) {
  const post = await getPost(params.slug);
  return <BlogDetailPage post={post} />;
}