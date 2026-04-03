import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validate required fields
    if (!data.platform || !data.postUrl || !data.embedType) {
      return NextResponse.json(
        { error: "Platform, postUrl, and embedType are required" },
        { status: 400 }
      );
    }

    // Validate platform
    const validPlatforms = ['youtube', 'instagram', 'facebook', 'twitter', 'linkedin'];
    if (!validPlatforms.includes(data.platform)) {
      return NextResponse.json(
        { error: "Invalid platform" },
        { status: 400 }
      );
    }

    // Validate embedType
    const validEmbedTypes = ['post', 'reel', 'video', 'story'];
    if (!validEmbedTypes.includes(data.embedType)) {
      return NextResponse.json(
        { error: "Invalid embed type" },
        { status: 400 }
      );
    }

    const socialMediaPost = await prisma.socialMediaEmbed.create({
      data: {
        platform: data.platform,
        postUrl: data.postUrl,
        embedType: data.embedType,
        title: data.title || null,
        description: data.description || null,
        displayOrder: data.displayOrder ?? 0,
        isPublished: data.isPublished ?? true,
      },
    });

    return NextResponse.json(socialMediaPost);
  } catch (error) {
    console.error('Error creating social media post:', error);
    return NextResponse.json(
      { error: "Failed to create social media post" },
      { status: 500 }
    );
  }
}
