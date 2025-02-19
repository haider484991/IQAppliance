import { NextResponse } from 'next/server';
import { submitUrlsToGoogleAndIndexNow } from "../../../scripts/vercelDeploy";

interface SubmissionResult {
  success: boolean;
  message: string;
  details?: {
    googleIndexing?: {
      success: number;
      failed: number;
      rateLimitHit?: boolean;
    };
    indexNow?: {
      success: boolean;
      message: string;
    };
  };
  error?: string;
}

// POST endpoint for manual triggers, GET for Vercel cron
export async function POST(request: Request) {
  return handleIndexing();
}

export async function GET() {
  return handleIndexing();
}

async function handleIndexing() {
  try {
    console.log('🚀 Starting URL submission process...');
    
    // Import the function to get URLs
    const { getModifiedUrls } = await import('../../../scripts/vercelDeploy');
    
    // Get the URLs that need to be submitted
    const urls = await getModifiedUrls();
    
    if (!urls || urls.length === 0) {
      console.log('No URLs to submit');
      return NextResponse.json({
        success: false,
        message: 'No URLs to submit',
      });
    }
    
    console.log(`Found ${urls.length} URLs to submit`);
    
    let result: SubmissionResult;
    try {
      const submissionResult = await submitUrlsToGoogleAndIndexNow(urls);
      
      result = {
        success: true,
        message: 'URLs submitted successfully',
        details: submissionResult.details
      };
    } catch (error) {
      console.error('Error during URL submission:', error);
      result = {
        success: false,
        message: 'Failed to submit URLs',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in handleIndexing:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}

// Set maxDuration to 60 seconds (maximum allowed on Hobby plan)
export const maxDuration = 60;

// Configure runtime
export const runtime = 'nodejs';
