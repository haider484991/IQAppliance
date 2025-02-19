import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle sitemap and robots.txt requests
  if (request.nextUrl.pathname.endsWith('.xml') || 
      request.nextUrl.pathname === '/robots.txt') {
    const response = NextResponse.next();
    
    // Set appropriate headers for XML files
    if (request.nextUrl.pathname.endsWith('.xml')) {
      response.headers.set('Content-Type', 'application/xml');
    } else {
      response.headers.set('Content-Type', 'text/plain');
    }
    
    // Set caching headers
    response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all XML files and robots.txt
    '/(sitemap.*\\.xml|robots\\.txt)',
    // Match other routes but exclude static files and api
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.ico).*)',
  ],
};
