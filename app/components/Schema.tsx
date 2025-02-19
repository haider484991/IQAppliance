export default function Schema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SCD Garage",
    "description": "Professional garage door repair and installation services across the USA",
    "url": "https://scdgarage.com",
    "telephone": "1-833-315-0173",
    "areaServed": "United States",
    "priceRange": "$$",
    "openingHours": "Mo-Su 00:00-23:59",
    "video": {
      "@type": "VideoObject",
      "name": "SCD Garage Door Services Overview",
      "description": "Learn about our professional garage door repair and installation services",
      "thumbnailUrl": `https://img.youtube.com/vi/ZCnlM_u5rdM/maxresdefault.jpg`,
      "uploadDate": "2024-12-10",
      "contentUrl": "https://www.youtube.com/watch?v=ZCnlM_u5rdM",
      "embedUrl": "https://www.youtube.com/embed/ZCnlM_u5rdM"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
