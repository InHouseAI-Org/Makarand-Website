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

    const governmentProject = await prisma.governmentProject.update({
      where: { id },
      data: { published },
    });

    return NextResponse.json(governmentProject);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update government project" }, { status: 500 });
  }
}
