import { NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Extract the file key from the URL
    // Uploadthing URLs look like: https://utfs.io/f/[fileKey]
    const fileKey = url.split('/f/')[1];

    if (!fileKey) {
      return NextResponse.json({ error: 'Invalid Uploadthing URL' }, { status: 400 });
    }

    // Delete the file from Uploadthing
    await utapi.deleteFiles(fileKey);

    return NextResponse.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
