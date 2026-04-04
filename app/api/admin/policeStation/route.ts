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

    const policeStation = await prisma.policeStation.create({
      data: {
        ...data,
      },
    });

    return NextResponse.json(policeStation);
  } catch (error) {
    console.error('Error creating police station:', error);
    return NextResponse.json({ error: "Failed to create police station" }, { status: 500 });
  }
}
