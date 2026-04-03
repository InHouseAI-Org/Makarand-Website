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
    const { published } = await request.json();

    const youthTestimonial = await prisma.youthTestimonial.update({
      where: { id },
      data: { published },
    });

    return NextResponse.json(youthTestimonial);
  } catch (error) {
    console.error('Error toggling youth testimonial publish status:', error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
