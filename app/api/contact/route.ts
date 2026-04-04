import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received contact submission:', body);

    const {
      name,
      email,
      phone,
      subject,
      message,
      category,
      ward,
      skills,
      program,
      formType
    } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      console.error('Validation failed:', { name: !!name, phone: !!phone, message: !!message });
      return NextResponse.json(
        {
          error: 'Name, phone, and message are required',
          details: { name: !!name, phone: !!phone, message: !!message }
        },
        { status: 400 }
      );
    }

    // Check if prisma.contactSubmission exists
    if (!prisma.contactSubmission) {
      console.error('Prisma contactSubmission model not found');
      return NextResponse.json(
        { error: 'Database model not initialized. Please restart the server.' },
        { status: 500 }
      );
    }

    // Create contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email: email || null,
        phone,
        subject: subject || null,
        message,
        category: category || null,
        ward: ward || null,
        skills: skills || null,
        program: program || null,
        formType: formType || 'contact',
        status: 'new',
        read: false,
      },
    });

    console.log('Contact submission created:', submission.id);
    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    return NextResponse.json(
      {
        error: 'Failed to save submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const formType = searchParams.get('formType');
    const read = searchParams.get('read');

    const where: any = {};
    if (status) where.status = status;
    if (formType) where.formType = formType;
    if (read !== null && read !== undefined) where.read = read === 'true';

    const submissions = await prisma.contactSubmission.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
