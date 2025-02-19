import React from 'react';
import { City, State } from "@/lib/types";

interface SchemaOrgProps {
  name: string;
  description: string;
  city: City;
  state: State;
  service: string;
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({ name, description, city, state, service }) => {
  if (!city || !state) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "provider": {
      "@type": "LocalBusiness",
      "name": "IQ Appliances",
      "telephone": "1-833-348-1798",
      "url": "https://www.iqappliancerepair.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city.name,
        "addressRegion": state.abbreviation,
        "addressCountry": "US"
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$$"
    },
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "state": state.name
    },
    "description": description,
    "serviceType": service,
    "offers": {
      "@type": "Offer",
      "areaServed": {
        "@type": "City",
        "name": city.name,
        "state": state.name
      },
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://www.iqappliancerepair.com/${state.id}/${city.name.toLowerCase().replace(/\s+/g, '-')}`,
      "servicePhone": "1-833-348-1798"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaOrg;