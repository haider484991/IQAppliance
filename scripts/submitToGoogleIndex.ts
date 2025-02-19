import { generateSiteUrls, submitUrlsBatch } from '../lib/googleIndexing';

async function main() {
  try {
    console.log('Generating site URLs...');
    const urls = await generateSiteUrls();
    console.log(`Generated ${urls.length} URLs`);

    console.log('Submitting URLs to Google Indexing API...');
    const results = await submitUrlsBatch(urls);

    // Log results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log('\nIndexing Summary:');
    console.log(`Total URLs: ${urls.length}`);
    console.log(`Successfully submitted: ${successful}`);
    console.log(`Failed submissions: ${failed}`);
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

main();
