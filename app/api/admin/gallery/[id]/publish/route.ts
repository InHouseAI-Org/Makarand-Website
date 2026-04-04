import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await request.json();

    const galleryImage = await prisma.galleryImage.update({
      where: { id },
      data: {
        isPublished: data.isPublished,
      },
    });

    return NextResponse.json(galleryImage);
  } catch (error) {
    console.error('Error toggling gallery image publish status:', error);
    return NextResponse.json(
      { error: "Failed to update publish status" },
      { status: 500 }
    );
  }
}
