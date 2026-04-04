import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * API endpoint to run Prisma migrations
 * This is useful for Render free tier where shell access is not available
 *
 * SECURITY WARNING: This endpoint should be protected or removed after initial setup
 */
export async function POST(request: Request) {
  try {
    // Optional: Add authentication check here
    const body = await request.json();
    const { secret } = body;

    // Simple secret check - replace with your own secret
    const MIGRATION_SECRET = process.env.MIGRATION_SECRET || 'change-me-in-production';

    if (secret !== MIGRATION_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Running Prisma DB push...');

    // Run prisma db push
    const { stdout, stderr } = await execAsync('npx prisma db push --skip-generate');

    console.log('Migration output:', stdout);
    if (stderr) console.error('Migration errors:', stderr);

    return NextResponse.json({
      success: true,
      message: 'Database migration completed successfully',
      output: stdout,
      errors: stderr || null,
    });
  } catch (error: any) {
    console.error('Error running migration:', error);
    return NextResponse.json(
      {
        error: 'Failed to run migration',
        details: error.message,
        output: error.stdout,
        stderr: error.stderr,
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check migration status
 */
export async function GET() {
  return NextResponse.json({
    message: 'Migration endpoint ready. Use POST with { "secret": "your-secret" } to run migrations.',
    note: 'Make sure to set MIGRATION_SECRET in your environment variables for security.',
  });
}
