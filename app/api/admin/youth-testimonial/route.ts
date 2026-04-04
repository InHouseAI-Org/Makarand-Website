import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET() {
  try {
    const youthTestimonials = await prisma.youthTestimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(youthTestimonials);
  } catch (error) {
    console.error('Error fetching youth testimonials:', error);
    return NextResponse.json({ error: "Failed to fetch youth testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const youthTestimonial = await prisma.youthTestimonial.create({
      data: {
        ...data,
      },
    });

    return NextResponse.json(youthTestimonial);
  } catch (error) {
    console.error('Error creating youth testimonial:', error);
    return NextResponse.json({ error: "Failed to create youth testimonial" }, { status: 500 });
  }
}
