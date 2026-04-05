import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GalleryImageForm } from "@/app/admin/components/GalleryImageForm";

const MAX_GALLERY_IMAGES = 6;

export default async function NewGalleryImagePage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Check if we've reached the maximum number of images
  const imageCount = await prisma.galleryImage.count();

  if (imageCount >= MAX_GALLERY_IMAGES) {
    // Redirect to gallery page with error message
    redirect("/admin/gallery?error=limit_reached");
  }

  return <GalleryImageForm />;
}
