import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MediaForm } from "@/app/admin/components/MediaForm";

export default async function EditMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const media = await prisma.media.findUnique({
    where: { id },
  });

  if (!media) {
    notFound();
  }

  // Convert publishedAt to date string for the form
  const initialData = {
    id: media.id,
    category: media.category as 'press' | 'award' | 'video',
    title: media.title,
    source: media.source || '',
    url: media.url || '',
    thumbnail: media.thumbnail || '',
    description: media.description || '',
    publishedAt: new Date(media.publishedAt).toISOString().split('T')[0],
    published: media.published,
  };

  return <MediaForm initialData={initialData} isEdit />;
}
