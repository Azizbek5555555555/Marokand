import BlogDetailPage, { MOCK_POST } from "@/components/blog/Blogdetailpage";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
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