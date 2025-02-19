const fs = require('fs');
const path = require('path');

// Read the TypeScript files directly
const locationsTs = fs.readFileSync(path.join(__dirname, '../lib/data/locations.ts'), 'utf8');
const servicesTs = fs.readFileSync(path.join(__dirname, '../lib/data/services.ts'), 'utf8');

// Extract the data using regex (adjusted for the actual format)
const statesMatch = locationsTs.match(/export\s+const\s+states:\s*State\[\]\s*=\s*\[([\s\S]*?)\];/);
const servicesMatch = servicesTs.match(/export\s+const\s+services:\s*Service\[\]\s*=\s*\[([\s\S]*?)\];/);

if (!statesMatch || !servicesMatch) {
    console.error('Could not find states or services data in TypeScript files');
    process.exit(1);
}

// Process the states data to remove TypeScript types
const statesData = statesMatch[1]
    .replace(/:\s*State(\[\])?/g, '')
    .replace(/:\s*string(\[\])?/g, '')
    .replace(/:\s*number/g, '');

// Process the services data to extract only what we need for the sitemap
const servicesData = servicesMatch[1]
    .split('},')
    .map(service => {
        const idMatch = service.match(/id:\s*'([^']+)'/);
        const slugMatch = service.match(/slug:\s*'([^']+)'/);
        if (idMatch && slugMatch) {
            return `  {
    id: '${idMatch[1]}',
    slug: '${slugMatch[1]}'
  }`;
        }
        return null;
    })
    .filter(Boolean)
    .join(',\n');

// Create the sitemap data
const sitemapData = `// Auto-generated from TypeScript data files
const states = [${statesData}
];

const services = [
${servicesData}
];

module.exports = {
    states,
    services
};`;

// Write the data to sitemap-data.js
console.log('Writing sitemap data...');
fs.writeFileSync(path.join(__dirname, '../sitemap-data.js'), sitemapData);

console.log('Done! Sitemap data has been generated.');
