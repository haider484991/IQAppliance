import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'robots.txt');
    
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Robots.txt not found', { status: 404 });
    }

    const robotsContent = fs.readFileSync(filePath, 'utf-8');

    return new NextResponse(robotsContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error serving robots.txt:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
