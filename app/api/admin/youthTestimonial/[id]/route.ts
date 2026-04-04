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

    const youthTestimonial = await prisma.youthTestimonial.update({
      where: { id },
      data,
    });

    return NextResponse.json(youthTestimonial);
  } catch (error) {
    console.error('Error updating youth testimonial:', error);
    return NextResponse.json({ error: "Failed to update youth testimonial" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    await prisma.youthTestimonial.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting youth testimonial:', error);
    return NextResponse.json({ error: "Failed to delete youth testimonial" }, { status: 500 });
  }
}
