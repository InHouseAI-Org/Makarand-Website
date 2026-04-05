import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GalleryImageForm } from "@/app/admin/components/GalleryImageForm";
import { notFound } from "next/navigation";

export default async function EditGalleryImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const galleryImage = await prisma.galleryImage.findUnique({
    where: { id },
  });

  if (!galleryImage) {
    notFound();
  }

  const initialData = {
    id: galleryImage.id,
    imageUrl: galleryImage.imageUrl,
    altText: galleryImage.altText,
    caption: galleryImage.caption || '',
    category: galleryImage.category,
    displayOrder: galleryImage.displayOrder,
    isPublished: galleryImage.isPublished,
  };

  return <GalleryImageForm initialData={initialData} isEdit={true} />;
}
