import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Check if the post exists
    const existingPost = await prisma.socialMediaEmbed.findUnique({
      where: { id: params.id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Social media post not found" },
        { status: 404 }
      );
    }

    const updatedPost = await prisma.socialMediaEmbed.update({
      where: { id: params.id },
      data: {
        isPublished: data.isPublished,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return NextResponse.json(
      { error: "Failed to update publish status" },
      { status: 500 }
    );
  }
}
