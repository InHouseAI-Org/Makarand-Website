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

    const fireStation = await prisma.fireStation.create({
      data: {
        ...data,
      },
    });

    return NextResponse.json(fireStation);
  } catch (error) {
    console.error('Error creating fire station:', error);
    return NextResponse.json({ error: "Failed to create fire station" }, { status: 500 });
  }
}
