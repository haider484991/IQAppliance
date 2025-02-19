import { rateLimit } from './rateLimit';

export const securityConfig = {
  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // CORS configuration
  cors: {
    origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },

  // Authentication configuration
  auth: {
    sessionMaxAge: 7 * 24 * 60 * 60, // 7 days
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/'
    }
  },

  // Password policy
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  },

  // Allowed file types for uploads
  allowedFileTypes: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf'
  ],
  maxFileSize: 5 * 1024 * 1024, // 5MB

  // API Security
  api: {
    rateLimitRequests: 1000,
    rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
    maxBodySize: '10mb'
  }
};
