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

    const media = await prisma.media.create({
      data: {
        ...data,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error('Error creating media:', error);
    return NextResponse.json({ error: "Failed to create media" }, { status: 500 });
  }
}
