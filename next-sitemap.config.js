/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.iqappliancerepair.com',
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
    '/locations/*'  // Exclude old location structure
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
          '/new_york/*',  // Explicitly allow tri-state URLs
          '/new_jersey/*',
          '/pennsylvania/*'
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
          '/california/*',
          '/texas/*',
          '/arizona/*',
          '/locations/*'
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
    // Only transform paths for tri-state area
    if (path.startsWith('/florida/') || 
        path.startsWith('/california/') || 
        path.startsWith('/texas/') || 
        path.startsWith('/arizona/') ||
        path.startsWith('/locations/')) {
      return null; // Skip these paths
    }

    const priority = path === '/' ? 1.0 : 
                    path.startsWith('/new_york/') || path.startsWith('/new_jersey/') || path.startsWith('/pennsylvania/') ? 0.9 :
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
        const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');

        // Add city page
        result.push({
          loc: `/${state.id}/${citySlug}`,
          priority: 0.9,
          changefreq: 'daily',
          lastmod: new Date().toISOString()
        });

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