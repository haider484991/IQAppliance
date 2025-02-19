/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.iqappliances.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  outDir: 'public',
  generateIndexSitemap: true,
  sitemapSize: 7000,
  exclude: [
    '/404',
    '/500',
    '/api/*',
    '/_next/*',
    '/static/*',
    '/florida/*',  // Exclude Florida URLs
    '/california/*',  // Exclude other state URLs
    '/texas/*',
    '/arizona/*',
    '/locations/*',  // Exclude old location structure
    '/new_york/*',  // Exclude all state URLs by default
    '/new_jersey/*',
    '/pennsylvania/*',
    '!/new_york/*/*/appliance-repair',  // Keep only service pages
    '!/new_jersey/*/*/appliance-repair',
    '!/pennsylvania/*/*/appliance-repair'
  ],
  sitemapBaseFileName: 'sitemap',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/sitemap.xml',
          '/*.js',
          '/*.css',
          '/*.png',
          '/*.jpg',
          '/*.gif',
          '/*.svg',
          '/*.ico',
          '/*.webp',
          '/new_york/*/appliance-repair',  // Only allow service pages
          '/new_jersey/*/appliance-repair',
          '/pennsylvania/*/appliance-repair'
        ],
        disallow: [
          '/404',
          '/500',
          '/api/*',
          '/_next/*',
          '/static/*',
          '/*?*',  // Prevent crawling of URLs with query parameters
          '/*.json',
          '/florida/*',  // Explicitly disallow other state URLs
          '/new_york/*',  // Disallow city landing pages
          '/new_jersey/*',
          '/pennsylvania/*',
          '!/new_york/*/appliance-repair',  // But allow service pages
          '!/new_jersey/*/appliance-repair',
          '!/pennsylvania/*/appliance-repair'
        ],
        crawlDelay: 10
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/new_york/*',
          '/new_jersey/*',
          '/pennsylvania/*'
        ],
        disallow: [
          '/*?*',
          '/api/*',
          '/_next/*',
          '/static/*',
          '/florida/*',
          '/california/*',
          '/texas/*',
          '/arizona/*',
          '/locations/*'
        ]
      }
    ],
  },
  transform: async (config, path) => {
    // Skip city pages and only include service pages
    if (path.match(/\/(new_york|new_jersey|pennsylvania)\/[^/]+$/) || 
        path.match(/\/(florida|california|texas|arizona)\//)) {
      return null;
    }

    const priority = path === '/' ? 1.0 : 
                    path.match(/\/(new_york|new_jersey|pennsylvania)\/[^/]+\/appliance-repair$/) ? 0.8 :
                    path.startsWith('/about') || path.startsWith('/contact') ? 0.8 :
                    config.priority;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    const { states, services } = require('./sitemap-data');
    
    let cityCount = 0;
    let cityServiceCount = 0;

    // Only process tri-state area
    const triStates = states.filter(state => ['new_york', 'new_jersey', 'pennsylvania'].includes(state.id));
    
    for (const state of triStates) {
      // Add service pages for each state's cities
      for (const cityName of state.majorCities) {
        cityCount++;
        const citySlug = `${cityName.toLowerCase().replace(/\s+/g, '-')}-${state.abbreviation.toLowerCase()}`;

        // Skip city pages since we don't want them in sitemap
        // result.push({
        //   loc: `/${state.id}/${citySlug}`,
        //   priority: 0.9,
        //   changefreq: 'daily',
        //   lastmod: new Date().toISOString()
        // });

        // Add service pages for each city
        for (const service of services) {
          cityServiceCount++;
          result.push({
            loc: `/${state.id}/${citySlug}/${service.slug}`,
            priority: 0.8,
            changefreq: 'daily',
            lastmod: new Date().toISOString()
          });
        }
      }
    }

    console.log(`Generated sitemap entries for:
- ${cityCount} cities across NY, NJ, and PA
- ${cityServiceCount} city-service pages
Total URLs: ${result.length}`);

    return result;
  }
};