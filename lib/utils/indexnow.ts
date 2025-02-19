const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://lanlocksmith.com/';

export async function notifySearchEngines(paths: string[]) {
  try {
    // Convert paths to full URLs
    const urls = paths.map(path => {
      const fullUrl = new URL(path, BASE_URL).toString();
      return fullUrl.replace(/\/$/, ''); // Remove trailing slash
    });

    // Remove duplicates
    const uniqueUrls = Array.from(new Set(urls));

    // Only proceed if we have URLs to submit
    if (uniqueUrls.length === 0) return;

    // Submit URLs to our IndexNow API endpoint
    const response = await fetch(`${BASE_URL}/api/indexnow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls: uniqueUrls }),
    });

    if (!response.ok) {
      console.error('Failed to notify search engines:', await response.text());
    }
  } catch (error) {
    console.error('Error notifying search engines:', error);
  }
}
