import { NextResponse } from 'next/server';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'your-indexnow-key';
const BASE_URL = 'https://lanlocksmith.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty URLs array' },
        { status: 400 }
      );
    }

    // Validate URLs
    const validUrls = urls.filter(url =>
      typeof url === 'string' && url.startsWith(BASE_URL)
    );

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs provided' },
        { status: 400 }
      );
    }

    // Submit URLs to IndexNow
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: BASE_URL,
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: validUrls,
      }),
    });

    if (!response.ok) {
      throw new Error(`IndexNow API error: ${response.statusText}`);
    }

    return NextResponse.json({
      success: true,
      message: 'URLs submitted to IndexNow successfully',
      submittedUrls: validUrls,
    });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit URLs to IndexNow' },
      { status: 500 }
    );
  }
}
