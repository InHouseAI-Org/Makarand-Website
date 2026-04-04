import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_GALLERY_IMAGES = 6;

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if we've reached the maximum number of images
    const imageCount = await prisma.galleryImage.count();

    if (imageCount >= MAX_GALLERY_IMAGES) {
      return NextResponse.json(
        { error: `Maximum limit of ${MAX_GALLERY_IMAGES} images reached. Please delete an existing image before adding a new one.` },
        { status: 400 }
      );
    }

    const data = await request.json();

    const galleryImage = await prisma.galleryImage.create({
      data: {
        imageUrl: data.imageUrl,
        altText: data.altText,
        caption: data.caption || null,
        category: data.category || 'general',
        displayOrder: data.displayOrder || 0,
        isPublished: data.isPublished ?? true,
      },
    });

    return NextResponse.json(galleryImage);
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: "Failed to create gallery image" },
      { status: 500 }
    );
  }
}
