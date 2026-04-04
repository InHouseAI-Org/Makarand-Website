import { prisma } from "@/lib/prisma";
import { MediaPreviewClient } from "./MediaPreviewClient";

export async function MediaPreview() {
  // Fetch awards from Media table (category: 'award')
  const awardsFromDB = await prisma.media.findMany({
    where: {
      category: 'award',
      published: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 2,
  });

  // Fetch press items from Media table (category: 'press')
  const pressItemsFromDB = await prisma.media.findMany({
    where: {
      category: 'press',
      published: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 2,
  });

  // Fetch gallery images
  const galleryImagesFromDB = await prisma.galleryImage.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      displayOrder: 'desc',
    },
    take: 6,
  });

  // Transform awards data
  const awards = awardsFromDB.map(award => ({
    id: award.id,
    title: award.title,
    org: award.source || 'N/A',
    year: new Date(award.publishedAt).getFullYear().toString(),
  }));

  // Transform press items data
  const pressItems = pressItemsFromDB.map(press => ({
    id: press.id,
    title: press.title,
    source: press.source || 'Unknown Source',
    date: new Date(press.publishedAt).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    }),
    image: press.thumbnail,
  }));

  // Transform gallery images data
  const galleryImages = galleryImagesFromDB.map(img => ({
    id: img.id,
    src: img.imageUrl,
    alt: img.altText,
  }));

  return (
    <MediaPreviewClient
      awards={awards}
      pressItems={pressItems}
      galleryImages={galleryImages}
    />
  );
}
