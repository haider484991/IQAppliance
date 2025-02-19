import { google } from 'googleapis';
import { getSitemapUrls } from './utils';
import fs from 'fs';
import path from 'path';

interface SubmissionHistory {
  lastSubmissionDate: string;
  lastProcessedIndex: number;
  submittedUrls: {
    url: string;
    date: string;
    success: boolean;
  }[];
  dailySubmissionCount: number;
}


// command to run the script npx ts-node googleIndexing.ts

const HISTORY_FILE = path.join(__dirname, 'google-submission-history.json');
const DAILY_LIMIT = 200;

// Load submission history
async function loadHistory(): Promise<SubmissionHistory> {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = await fs.promises.readFile(HISTORY_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading history:', error);
  }

  // Return default history if file doesn't exist or has error
  return {
    lastSubmissionDate: '',
    lastProcessedIndex: 0,
    submittedUrls: [],
    dailySubmissionCount: 0
  };
}

// Save submission history
async function saveHistory(history: SubmissionHistory): Promise<void> {
  await fs.promises.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
}

// Check if it's a new day
function isNewDay(lastDate: string): boolean {
  if (!lastDate) return true;
  const today = new Date().toISOString().split('T')[0];
  return lastDate !== today;
}

async function submitUrlsToGoogle() {
  try {
    // Load credentials and history
    const credentials = require('../plucky-sound-443612-q1-c4d42dff8c65.json');
    let history = await loadHistory();
    const today = new Date().toISOString().split('T')[0];

    // Reset daily count if it's a new day
    if (isNewDay(history.lastSubmissionDate)) {
      console.log('Starting new day, resetting submission count');
      history.dailySubmissionCount = 0;
      history.lastSubmissionDate = today;
      await saveHistory(history);
    }

    // Check if we've hit the daily limit
    if (history.dailySubmissionCount >= DAILY_LIMIT) {
      console.log(`\nDaily submission limit (${DAILY_LIMIT}) reached. Please try again tomorrow.`);
      console.log(`Last processed index: ${history.lastProcessedIndex}`);
      return;
    }

    // Create JWT client
    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/indexing'],
      undefined
    );

    // Create indexing client
    const indexing = google.indexing({
      version: 'v3',
      auth: auth
    });

    // Get URLs from sitemap
    const urls = await getSitemapUrls();
    console.log(`Found ${urls.length} total URLs`);
    console.log(`Starting from index ${history.lastProcessedIndex}`);
    console.log(`${DAILY_LIMIT - history.dailySubmissionCount} submissions remaining today`);

    // Process URLs in batches, starting from last processed index
    const batchSize = 10; // Smaller batch size for better tracking
    let currentIndex = history.lastProcessedIndex;

    while (currentIndex < urls.length && history.dailySubmissionCount < DAILY_LIMIT) {
      const batchUrls = urls
        .slice(currentIndex, currentIndex + batchSize)
        .map(entry => entry.url);

      console.log(`\nProcessing batch starting at index ${currentIndex}`);
      console.log('Sample URLs:', batchUrls.slice(0, 2));

      try {
        for (const url of batchUrls) {
          // Check if URL was already submitted today
          const submittedToday = history.submittedUrls.some(
            entry => entry.url === url && entry.date === today
          );

          if (submittedToday) {
            console.log(`Skipping ${url} (already submitted today)`);
            continue;
          }

          try {
            await indexing.urlNotifications.publish({
              requestBody: {
                url: url,
                type: 'URL_UPDATED'
              }
            });

            // Update history
            history.submittedUrls.push({
              url,
              date: today,
              success: true
            });
            history.dailySubmissionCount++;
            console.log(`✓ [${history.dailySubmissionCount}/${DAILY_LIMIT}] Submitted: ${url}`);

            // Save progress after each successful submission
            history.lastProcessedIndex = currentIndex;
            await saveHistory(history);

            // Check if we've hit the daily limit
            if (history.dailySubmissionCount >= DAILY_LIMIT) {
              console.log('\n🚫 Daily submission limit reached');
              return;
            }

            // Add small delay between submissions
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (error: any) {
            if (error?.response?.status === 403) {
              console.error('❌ Permission denied. Make sure to:');
              console.error('1. Verify domain ownership in Google Search Console');
              console.error('2. Grant the service account proper permissions');
              throw error; // Stop processing if we don't have proper permissions
            } else if (error?.response?.status === 429) {
              console.log('\n⚠️ Rate limit reached. Saving progress and stopping...');
              return;
            }

            // Log error but continue with next URL
            console.error(`✗ Error submitting ${url}:`, error?.message || 'Unknown error');
            history.submittedUrls.push({
              url,
              date: today,
              success: false
            });
            await saveHistory(history);
          }
        }

        currentIndex += batchSize;
        history.lastProcessedIndex = currentIndex;
        await saveHistory(history);

      } catch (error: any) {
        console.error('\nBatch failed:', error?.message || 'Unknown error');
        // Save progress before stopping
        history.lastProcessedIndex = currentIndex;
        await saveHistory(history);
        throw error;
      }
    }

    // Check if we've processed all URLs
    if (currentIndex >= urls.length) {
      console.log('\n✅ All URLs have been processed!');
      // Reset index for next run
      history.lastProcessedIndex = 0;
      await saveHistory(history);
    }

  } catch (error: any) {
    console.error('Script failed:', error?.message || 'Unknown error');
    process.exit(1);
  }
}

// Run the script
submitUrlsToGoogle();
