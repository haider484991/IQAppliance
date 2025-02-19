import { google } from 'googleapis';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/indexing'];
const BATCH_SIZE = 100;
const DELAY_BETWEEN_BATCHES = 1000; // 1 second delay between batches

async function getAuthClient() {
  try {
    const keyFile = path.join(process.cwd(), 'google-credentials.json');
    const auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: SCOPES,
    });
    return auth.getClient();
  } catch (error) {
    console.error('Error getting auth client:', error);
    throw error;
  }
}

async function submitUrl(authClient: any, url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') {
  const indexing = google.indexing({ version: 'v3', auth: authClient });
  try {
    const result = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type,
      },
    });
    return result.data;
  } catch (error) {
    console.error(`Error submitting URL ${url}:`, error);
    throw error;
  }
}

export async function submitUrlsBatch(urls: string[]) {
  const authClient = await getAuthClient();
  const results = [];

  // Process URLs in batches
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${i / BATCH_SIZE + 1} of ${Math.ceil(urls.length / BATCH_SIZE)}`);

    const batchPromises = batch.map(url => submitUrl(authClient, url));
    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults);

    // Add delay between batches to respect rate limits
    if (i + BATCH_SIZE < urls.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }

  return results;
}

export async function generateSiteUrls() {
  const { states, services } = require('../sitemap-data');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lanlocksmith.com';
  const urls = [];

  // Add static pages
  urls.push(baseUrl);
  urls.push(`${baseUrl}/about`);
  urls.push(`${baseUrl}/contact`);
  urls.push(`${baseUrl}/privacy-policy`);
  urls.push(`${baseUrl}/termsandservices`);

  // Add state pages
  for (const state of states) {
    const stateUrl = `${baseUrl}/${state.abbreviation.toLowerCase()}`;
    urls.push(stateUrl);

    // Add city-service pages
    for (const city of state.cities) {
      for (const service of services) {
        const cityServiceUrl = `${baseUrl}/${state.abbreviation.toLowerCase()}/${city.slug}/${service.slug}`;
        urls.push(cityServiceUrl);
      }
    }
  }

  return urls;
}
