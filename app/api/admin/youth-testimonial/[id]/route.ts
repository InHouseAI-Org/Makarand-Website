import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const youthTestimonial = await prisma.youthTestimonial.findUnique({
      where: { id },
    });

    if (!youthTestimonial) {
      return NextResponse.json({ error: "Youth testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(youthTestimonial);
  } catch (error) {
    console.error('Error fetching youth testimonial:', error);
    return NextResponse.json({ error: "Failed to fetch youth testimonial" }, { status: 500 });
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
    return NextResponse.json({ error: "Failed to delete youth testimonial" }, { status: 500 });
  }
}

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
      data: {
        ...data,
      },
    });

    return NextResponse.json(youthTestimonial);
  } catch (error) {
    console.error('Error updating youth testimonial:', error);
    return NextResponse.json({ error: "Failed to update youth testimonial" }, { status: 500 });
  }
}
