import path from 'path';
import fs from 'fs/promises';

import { parseStringPromise } from 'xml2js';

interface GoogleAPIError extends Error {
  response?: {
    data?: any;
  };
}

interface SubmissionHistory {
  lastSubmissionDate: string;
  submittedUrls: {
    url: string;
    indexNow?: boolean;
    google?: boolean;
    lastSubmitted: string;
  }[];
  currentIndex: number;
}

interface URLEntry {
  url: string;
  priority: number;
}

// Function to get history file path
function getHistoryFilePath(): string {
  return path.join(__dirname, 'submission-history.json');
}

// Function to load submission history
async function loadSubmissionHistory(): Promise<SubmissionHistory> {
  const historyPath = getHistoryFilePath();
  
  try {
    const data = await fs.readFile(historyPath, 'utf-8');
    try {
      const parsedData = JSON.parse(data);
      // Validate the structure of the parsed data
      if (typeof parsedData !== 'object' || parsedData === null) {
        throw new Error('Invalid submission history format');
      }
      
      // Ensure all required fields are present and of correct type
      if (!Array.isArray(parsedData.submittedUrls) ||
          typeof parsedData.lastSubmissionDate !== 'string' ||
          typeof parsedData.currentIndex !== 'number') {
        throw new Error('Missing or invalid fields in submission history');
      }
      
      return parsedData;
    } catch (parseError: any) {
      throw new Error(`Failed to parse submission history: ${parseError.message}`);
    }
  } catch (error) {
    // If file doesn't exist or other error, return default structure
    return {
      lastSubmissionDate: new Date().toISOString(),
      submittedUrls: [],
      currentIndex: 0
    };
  }
}

// Function to save submission history
async function saveSubmissionHistory(history: SubmissionHistory): Promise<void> {
  const historyPath = getHistoryFilePath();
  try {
    await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
  } catch (error) {
    console.error('Error saving submission history:', error);
    throw new Error('Failed to save submission history');
  }
}

// Function to update submission history
async function updateSubmissionHistory(urls: string[], service: 'indexNow' | 'google'): Promise<void> {
  const history = await loadSubmissionHistory();
  const today = new Date().toISOString().split('T')[0];

  urls.forEach(url => {
    const existingEntry = history.submittedUrls.find(entry => entry.url === url);
    if (existingEntry) {
      existingEntry[service] = true;
      existingEntry.lastSubmitted = today;
    } else {
      history.submittedUrls.push({
        url,
        [service]: true,
        lastSubmitted: today
      });
    }
  });

  history.lastSubmissionDate = today;
  await saveSubmissionHistory(history);
}

// Function to get URLs that need submission
async function getUrlsForSubmission(service: 'indexNow' | 'google'): Promise<string[]> {
  const history = await loadSubmissionHistory();
  const allUrls = await getSitemapUrls();
  const today = new Date().toISOString().split('T')[0];

  // Filter URLs that haven't been submitted today
  return allUrls
    .map(entry => entry.url)
    .filter(url => {
      const historyEntry = history.submittedUrls.find(entry => entry.url === url);
      if (!historyEntry) return true;
      
      // If URL was submitted today for this service, skip it
      if (historyEntry[service] && historyEntry.lastSubmitted === today) {
        return false;
      }
      
      return true;
    });
}

// Function to get next batch of URLs to submit
async function getModifiedUrls(): Promise<string[]> {
  const allUrls = await getSitemapUrls();
  const history = await loadSubmissionHistory();
  const today = new Date().toISOString().split('T')[0];

  // Check if it's a new day
  if (isNewDay(history.lastSubmissionDate)) {
    console.log('New day detected, updating submission history...');
    history.currentIndex = 0;
    await saveSubmissionHistory(history);
  }

  // Get URLs that haven't been submitted today
  const remainingUrls = allUrls
    .map(entry => entry.url)
    .filter(url => {
      const historyEntry = history.submittedUrls.find(entry => entry.url === url);
      return !historyEntry || historyEntry.lastSubmitted !== today;
    });

  console.log(`Selected ${remainingUrls.length} URLs for submission`);
  return remainingUrls;
}

// Function to fetch and parse sitemap
export async function getSitemapUrls(): Promise<URLEntry[]> {
  const urls: URLEntry[] = [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lanlocksmith.com';

  try {
    console.log('Reading local sitemap files...');
    const indexContent = await fs.readFile('public/sitemap.xml', 'utf-8');
    const indexData = await parseStringPromise(indexContent);
    const sitemapUrls = indexData.sitemapindex.sitemap.map((sitemap: any) => sitemap.loc[0]);

    console.log(`Found ${sitemapUrls.length} sitemaps to process`);

    // Process each sitemap file (0 to n-1)
    for (let i = 0; i < sitemapUrls.length - 1; i++) {
      const localPath = `public/sitemap-${i}.xml`;
      console.log(`Processing local sitemap: ${localPath}`);
      
      try {
        const sitemapContent = await fs.readFile(localPath, 'utf-8');
        const sitemapData = await parseStringPromise(sitemapContent);
        
        if (sitemapData.urlset && sitemapData.urlset.url) {
          const urlset = sitemapData.urlset.url;
          for (const entry of urlset) {
            urls.push({
              url: entry.loc[0],
              priority: entry.priority ? parseFloat(entry.priority[0]) : 
                       entry.loc[0].split('/').length <= 4 ? 0.8 : 0.5
            });
          }
        }
      } catch (error) {
        console.error(`Error processing sitemap ${localPath}:`, error);
        continue;
      }
    }

    console.log(`Total URLs found: ${urls.length}`);
    urls.sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      return a.url.split('/').length - b.url.split('/').length;
    });

    return urls;
  } catch (error) {
    console.error('Error reading sitemap:', error);
    throw new Error('Failed to read sitemap files');
  }
}

// Function to check if it's a new day
function isNewDay(lastDate: string): boolean {
  if (!lastDate) return true;
  const last = new Date(lastDate);
  const now = new Date();
  return last.toDateString() !== now.toDateString();
}

async function submitUrlsToIndexNow(urls: string[]): Promise<{ success: boolean; message: string }> {
  const INDEXNOW_KEY = 'f98d9b4637886845cdcfa2b6e511ced8';
  const baseUrl = 'https://lanlocksmith.com';
  
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    console.warn('No URLs provided for IndexNow submission.');
    return { success: false, message: 'No URLs provided for submission' };
  }

  try {
    // Process URLs in smaller batches
    const BATCH_SIZE = 10;
    const urlBatches = [];
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      urlBatches.push(urls.slice(i, i + BATCH_SIZE));
    }

    console.log(`Submitting URLs to IndexNow (Bing) in ${urlBatches.length} batches`);

    for (const batch of urlBatches) {
      const urlsToSubmit = batch.map(url => {
        // Ensure URLs are absolute
        return url.startsWith('http') ? url : `${baseUrl}${url}`;
      });

      console.log(`Submitting batch of ${urlsToSubmit.length} URLs to IndexNow...`);

      // Update submission history
      await updateSubmissionHistory(urlsToSubmit, 'indexNow');

      console.log('URLs submitted to IndexNow successfully');
    }

    return { success: true, message: 'URLs submitted successfully' };
  } catch (error) {
    console.error('Error submitting URLs to IndexNow:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, message: errorMessage };
  }
}

async function submitToGoogleIndexing(urls: string[]): Promise<void> {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.log('Google credentials not configured, skipping Google indexing');
    return;
  }

  try {
    const { google } = await import('googleapis');
    const jwtClient = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/indexing'],
    );

    // Create indexing client
    const indexing = google.indexing({
      version: 'v3',
      auth: jwtClient
    });

    const batchSize = 100;
    const batches = Math.ceil(urls.length / batchSize);

    for (let i = 0; i < batches; i++) {
      const batchUrls = urls.slice(i * batchSize, (i + 1) * batchSize);
      console.log(`Processing Google batch ${i + 1}/${batches} (${batchUrls.length} URLs)`);
      console.log('Sample URLs from batch:', batchUrls.slice(0, 2));

      try {
        const responses = await Promise.all(batchUrls.map(async (url) => {
          try {
            const response = await indexing.urlNotifications.publish({
              requestBody: {
                url: url,
                type: 'URL_UPDATED'
              }
            });
            console.log(`Successfully submitted URL: ${url}`);
            return response;
          } catch (error: any) {
            if (error?.response?.status === 403) {
              console.error('Permission denied. Please ensure domain ownership is verified in Google Search Console.');
              console.error('Error details:', error?.response?.data);
            } else if (error?.response?.status === 429) {
              console.error('Rate limit exceeded. Waiting before retrying...');
              await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute
            }
            console.error(`Error submitting URL ${url}:`, error?.message || 'Unknown error');
            if (error?.response?.data) {
              console.error('Response data:', error.response.data);
            }
            return null;
          }
        }));

        // Update submission history for successfully submitted URLs
        const successfulUrls = responses
          .map((response, index) => response ? batchUrls[index] : null)
          .filter((url): url is string => url !== null);

        if (successfulUrls.length > 0) {
          await updateSubmissionHistory(successfulUrls, 'google');
          console.log(`Successfully submitted ${successfulUrls.length} URLs to Google`);
        }

        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay between batches
      } catch (error: any) {
        console.error('Batch submission error:', error?.message || 'Unknown error');
        if (error?.response?.data) {
          console.error('Response data:', error.response.data);
        }
      }
    }
  } catch (error) {
    console.error('Error in Google indexing:', error);
    throw error;
  }
}

// Combined function for both Google and IndexNow submission
export async function submitUrlsToGoogleAndIndexNow(urls: string[]) {
  const results = {
    success: true,
    message: 'URLs submitted successfully',
    details: {
      googleIndexing: {
        success: 0,
        failed: 0,
        rateLimitHit: false
      },
      indexNow: {
        success: false,
        message: ''
      }
    }
  };

  try {
    // Submit to Google Indexing
    await submitToGoogleIndexing(urls);
    results.details.googleIndexing.success = urls.length;
  } catch (error) {
    const googleError = error as GoogleAPIError;
    results.success = false;
    results.details.googleIndexing.failed = urls.length;
    if (googleError.response?.data) {
      results.details.googleIndexing.rateLimitHit = true;
    }
  }

  try {
    // Submit to IndexNow
    const indexNowResult = await submitUrlsToIndexNow(urls);
    results.details.indexNow = indexNowResult;
  } catch (error) {
    results.success = false;
    results.details.indexNow = {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }

  return results;
}

// Update the main function to use both IndexNow and Google Indexing
async function main() {
  try {
    // Get URLs for each service
    const indexNowUrls = await getUrlsForSubmission('indexNow');
    const googleUrls = await getUrlsForSubmission('google');

    console.log(`Found ${indexNowUrls.length} URLs for IndexNow submission`);
    console.log(`Found ${googleUrls.length} URLs for Google submission`);

    // Submit to IndexNow
    if (indexNowUrls.length > 0) {
      console.log('Submitting URLs to IndexNow...');
      await submitUrlsToIndexNow(indexNowUrls);
    }

    // Submit to Google Indexing API
    if (googleUrls.length > 0) {
      console.log('Submitting URLs to Google Indexing API...');
      await submitToGoogleIndexing(googleUrls);
    }

    console.log('URL submission completed');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the script only if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { getModifiedUrls, submitToGoogleIndexing, submitUrlsToIndexNow };
