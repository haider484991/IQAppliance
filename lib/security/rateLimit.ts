import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

const ipRequests = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(req: NextRequest, config: RateLimitConfig) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Clean up old entries
  for (const [key, value] of ipRequests.entries()) {
    if (value.resetTime < now) {
      ipRequests.delete(key);
    }
  }

  // Get or create request count for this IP
  const requestInfo = ipRequests.get(ip) || {
    count: 0,
    resetTime: now + config.windowMs,
  };

  // If the window has expired, reset the count
  if (requestInfo.resetTime < now) {
    requestInfo.count = 0;
    requestInfo.resetTime = now + config.windowMs;
  }

  requestInfo.count++;
  ipRequests.set(ip, requestInfo);

  const remaining = Math.max(0, config.max - requestInfo.count);
  const reset = Math.ceil((requestInfo.resetTime - now) / 1000);

  // Set rate limit headers
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', config.max.toString());
  headers.set('X-RateLimit-Remaining', remaining.toString());
  headers.set('X-RateLimit-Reset', reset.toString());

  // If over limit, return error response
  if (requestInfo.count > config.max) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers,
    });
  }

  return null;
}
