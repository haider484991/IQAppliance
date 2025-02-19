const fs = require('fs');
const path = require('path');
const { states, services } = require('../sitemap-data');

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://scdgarage.com';

const videoData = {
  default: {
    embedId: 'ZCnlM_u5rdM',
    duration: '145', // 2:25 minutes = 145 seconds
    uploadDate: '2024-12-10T00:00:00+00:00',
  },
  services: {
    'garage-door': {
      title: 'Professional Garage Door Services - SCD Garage',
      description: 'Expert garage door repair, installation & maintenance services. Professional solutions for residential and commercial properties. Available 24/7 for emergency service.',
      thumbnail: '/images/garage-door.webp',
      slug: 'garage-door-services'
    }
  }
};

function generateVideoSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Homepage Video -->
  <url>
    <loc>${BASE_URL}</loc>
    <video:video>
      <video:thumbnail_loc>${BASE_URL}/images/garage-door.webp</video:thumbnail_loc>
      <video:title>Expert Garage Door Services - SCD Garage</video:title>
      <video:description>Professional garage door services including repairs, installation, maintenance, and 24/7 emergency solutions for residential and commercial properties.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${videoData.default.embedId}</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/${videoData.default.embedId}</video:player_loc>
      <video:duration>${videoData.default.duration}</video:duration>
      <video:publication_date>${videoData.default.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
      <video:platform relationship="allow">web mobile</video:platform>
      <video:restriction relationship="allow">US</video:restriction>
    </video:video>
  </url>`;

  // Add state pages
  states.forEach(state => {
    // Add state-level page
    sitemap += `
  <url>
    <loc>${BASE_URL}/${state.id}</loc>
    <video:video>
      <video:thumbnail_loc>${BASE_URL}/images/garage-door.webp</video:thumbnail_loc>
      <video:title>Expert Garage Door Services in ${state.name} - SCD Garage</video:title>
      <video:description>Professional garage door services in ${state.name}. Expert repairs, installation, maintenance, and 24/7 emergency solutions for residential and commercial properties.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${videoData.default.embedId}</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/${videoData.default.embedId}</video:player_loc>
      <video:duration>${videoData.default.duration}</video:duration>
      <video:publication_date>${videoData.default.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
      <video:platform relationship="allow">web mobile</video:platform>
      <video:restriction relationship="allow">US</video:restriction>
    </video:video>
  </url>`;

    // Add city-service pages
    state.majorCities.forEach(cityName => {
      const citySlug = `${cityName.toLowerCase().replace(/[^a-z0-9]+/g, '')}-${state.abbreviation.toLowerCase()}`;
      const serviceData = videoData.services['garage-door'];
      
      sitemap += `
  <url>
    <loc>${BASE_URL}/${state.id}/${citySlug}/${serviceData.slug}</loc>
    <video:video>
      <video:thumbnail_loc>${BASE_URL}${serviceData.thumbnail}</video:thumbnail_loc>
      <video:title>${serviceData.title} in ${cityName}, ${state.abbreviation}</video:title>
      <video:description>${serviceData.description} in ${cityName}, ${state.abbreviation}</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${videoData.default.embedId}</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/${videoData.default.embedId}</video:player_loc>
      <video:duration>${videoData.default.duration}</video:duration>
      <video:publication_date>${videoData.default.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
      <video:platform relationship="allow">web mobile</video:platform>
      <video:restriction relationship="allow">US</video:restriction>
    </video:video>
  </url>`;
    });
  });

  sitemap += '\n</urlset>';

  fs.writeFileSync(path.join(process.cwd(), 'public', 'video-sitemap.xml'), sitemap);
  console.log('Video sitemap generated successfully!');
}

generateVideoSitemap();
