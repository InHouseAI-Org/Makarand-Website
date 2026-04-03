import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const data = await request.json();

    const post = await prisma.socialMediaEmbed.update({
      where: { id },
      data: {
        isPublished: data.isPublished,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
