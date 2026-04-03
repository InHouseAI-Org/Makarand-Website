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

    const governmentProject = await prisma.governmentProject.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        completionDate: data.completionDate ? new Date(data.completionDate) : null,
      },
    });

    return NextResponse.json(governmentProject);
  } catch (error) {
    console.error('Error creating government project:', error);
    return NextResponse.json({ error: "Failed to create government project" }, { status: 500 });
  }
}
