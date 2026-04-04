import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * One-time setup endpoint to create the initial admin user
 * This endpoint can only be used when no admin users exist
 * After creating the first admin, it will be disabled
 */
export async function POST(request: Request) {
  try {
    // Check if any admin users already exist
    const existingAdmin = await prisma.user.findFirst();

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists. This endpoint is disabled.' },
        { status: 403 }
      );
    }

    // Get credentials from request body
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const admin = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
