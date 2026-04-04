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

    // Validate platform if provided
    if (data.platform) {
      const validPlatforms = ['youtube', 'instagram', 'facebook', 'twitter', 'linkedin'];
      if (!validPlatforms.includes(data.platform)) {
        return NextResponse.json(
          { error: "Invalid platform" },
          { status: 400 }
        );
      }
    }

    // Validate embedType if provided
    if (data.embedType) {
      const validEmbedTypes = ['post', 'reel', 'video', 'story'];
      if (!validEmbedTypes.includes(data.embedType)) {
        return NextResponse.json(
          { error: "Invalid embed type" },
          { status: 400 }
        );
      }
    }

    const updatedPost = await prisma.socialMediaEmbed.update({
      where: { id: params.id },
      data: {
        platform: data.platform,
        postUrl: data.postUrl,
        embedType: data.embedType,
        title: data.title ?? null,
        description: data.description ?? null,
        displayOrder: data.displayOrder !== undefined ? data.displayOrder : undefined,
        isPublished: data.isPublished !== undefined ? data.isPublished : undefined,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating social media post:', error);
    return NextResponse.json(
      { error: "Failed to update social media post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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

    await prisma.socialMediaEmbed.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting social media post:', error);
    return NextResponse.json(
      { error: "Failed to delete social media post" },
      { status: 500 }
    );
  }
}
