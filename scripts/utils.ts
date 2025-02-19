import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import fs from 'fs';
import path from 'path';

interface SitemapUrl {
  url: string;
  lastmod?: string;
}

export async function getSitemapUrls(): Promise<SitemapUrl[]> {
  try {
    const publicDir = path.join(process.cwd(), '..', 'public');
    const mainSitemapPath = path.join(publicDir, 'sitemap.xml');
    const mainSitemapContent = fs.readFileSync(mainSitemapPath, 'utf-8');
    
    // Parse the main sitemap index
    const mainResult = await parseStringPromise(mainSitemapContent);
    const sitemapFiles = mainResult.sitemapindex.sitemap.map((entry: any) => {
      const loc = entry.loc[0];
      return path.join(publicDir, path.basename(loc));
    });

    // Fetch and parse each sitemap file
    const allUrls: SitemapUrl[] = [];
    for (const sitemapFile of sitemapFiles) {
      try {
        const content = fs.readFileSync(sitemapFile, 'utf-8');
        const result = await parseStringPromise(content);
        
        if (result.urlset && result.urlset.url) {
          const urls = result.urlset.url.map((entry: any) => ({
            url: entry.loc[0],
            lastmod: entry.lastmod ? entry.lastmod[0] : undefined
          }));
          allUrls.push(...urls);
        }
      } catch (error) {
        console.error(`Error processing sitemap file ${sitemapFile}:`, error);
      }
    }

    return allUrls;
  } catch (error) {
    console.error('Error fetching sitemap URLs:', error);
    throw error;
  }
}
