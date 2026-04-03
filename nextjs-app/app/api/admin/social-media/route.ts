import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper function to extract ID from YouTube URL
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Helper function to extract ID from Instagram URL
function extractInstagramId(url: string): { id: string; type: string } | null {
  const patterns = [
    { regex: /instagram\.com\/reel\/([^\/\?]+)/, type: 'reel' },
    { regex: /instagram\.com\/p\/([^\/\?]+)/, type: 'p' },
    { regex: /instagram\.com\/tv\/([^\/\?]+)/, type: 'p' },
  ];

  for (const { regex, type } of patterns) {
    const match = url.match(regex);
    if (match) return { id: match[1], type };
  }
  return null;
}

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.socialMediaEmbed.findMany({
      orderBy: [
        { platform: 'asc' },
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching social media posts:', error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { postUrl, platform } = data;

    if (!postUrl || !platform) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let extractedId: string;
    let embedType = 'post';

    // Extract ID based on platform
    if (platform === 'youtube') {
      const id = extractYouTubeId(postUrl);
      if (!id) {
        return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
      }
      extractedId = id;
      embedType = 'video';
    } else if (platform === 'instagram') {
      const result = extractInstagramId(postUrl);
      if (!result) {
        return NextResponse.json({ error: "Invalid Instagram URL" }, { status: 400 });
      }
      extractedId = result.id;
      embedType = result.type;
    } else {
      return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
    }

    // Check platform limit (max 3 per platform)
    const platformCount = await prisma.socialMediaEmbed.count({
      where: { platform, isPublished: true }
    });

    if (platformCount >= 3) {
      return NextResponse.json(
        { error: `Maximum of 3 ${platform} posts allowed. Please delete an existing post first.` },
        { status: 400 }
      );
    }

    // Create the post
    const post = await prisma.socialMediaEmbed.create({
      data: {
        platform,
        postUrl,
        extractedId,
        embedType,
        title: data.title,
        displayOrder: data.displayOrder || 0,
        isPublished: data.isPublished !== undefined ? data.isPublished : true,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.error('Error creating social media post:', error);

    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "This post has already been added" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
