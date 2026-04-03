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

    const wardOfficer = await prisma.wardOfficer.create({
      data: {
        ...data,
      },
    });

    return NextResponse.json(wardOfficer);
  } catch (error) {
    console.error('Error creating ward officer:', error);
    return NextResponse.json({ error: "Failed to create ward officer" }, { status: 500 });
  }
}
