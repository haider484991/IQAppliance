'use client';

import React from 'react';
import Head from 'next/head';
import OptimizedVideo from './OptimizedVideo';

interface ServiceVideoProps {
  embedId: string;
  city: string;
  state: string;
  service: string;
  serviceDescription: string;
  thumbnailImage?: string;
}

const ServiceVideo: React.FC<ServiceVideoProps> = ({
  embedId,
  city,
  state,
  service,
  serviceDescription,
  thumbnailImage,
}) => {
  const currentDate = new Date().toISOString();
  const videoData = {
    title: `Professional ${service} Services in ${city}, ${state}`,
    description: `${serviceDescription} Available for emergency response in ${city}, ${state}.`,
    thumbnailUrl: thumbnailImage || `https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`,
    uploadDate: currentDate.split('T')[0],
    duration: "PT2M30S", // Standard duration format: PT[hours]H[minutes]M[seconds]S
  };

  // Enhanced Schema.org markup for better SEO
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoData.title,
    "description": videoData.description,
    "thumbnailUrl": [
      videoData.thumbnailUrl,
      `https://img.youtube.com/vi/${embedId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${embedId}/sddefault.jpg`
    ],
    "uploadDate": videoData.uploadDate,
    "duration": videoData.duration,
    "embedUrl": `https://www.youtube.com/embed/${embedId}`,
    "contentUrl": `https://www.youtube.com/watch?v=${embedId}`,
    "publisher": {
      "@type": "Organization",
      "name": "SCD Garage Door Repair",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.scdgarage.com/logo.png"
      }
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": `https://www.youtube.com/watch?v=${embedId}`
    },
    "locationCreated": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city,
        "addressRegion": state,
        "addressCountry": "US"
      }
    },
    "about": {
      "@type": "Service",
      "name": service,
      "areaServed": {
        "@type": "City",
        "name": city,
        "containedInPlace": {
          "@type": "State",
          "name": state
        }
      },
      "provider": {
        "@type": "LocalBusiness",
        "name": "SCD Garage Door Repair",
        "image": "https://www.scdgarage.com/logo.png",
        "priceRange": "$$",
        "areaServed": `${city}, ${state}`,
        "availableLanguage": "English"
      }
    }
  };

  // Additional service schema for local business optimization
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service} in ${city}, ${state}`,
    "description": serviceDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "SCD Garage Door Repair",
      "image": "https://www.scdgarage.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city,
        "addressRegion": state,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "addressCountry": "US",
          "addressRegion": state,
          "addressLocality": city
        }
      }
    }
  };

  return (
    <>
      <Head>
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        {/* Meta tags for social sharing */}
        <meta property="og:video" content={`https://www.youtube.com/watch?v=${embedId}`} />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta property="og:title" content={videoData.title} />
        <meta property="og:description" content={videoData.description} />
        <meta property="og:image" content={videoData.thumbnailUrl} />
      </Head>
      <article className="w-full max-w-6xl mx-auto px-4" itemScope itemType="https://schema.org/VideoObject">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900" itemProp="name">
              {videoData.title}
            </h2>
            <div itemProp="description" className="mb-4 text-gray-700">
              {serviceDescription}
            </div>
            <OptimizedVideo
              videoId={embedId}
              title={videoData.title}
              thumbnailQuality="maxresdefault"
            />
            <meta itemProp="uploadDate" content={videoData.uploadDate} />
            <meta itemProp="thumbnailUrl" content={videoData.thumbnailUrl} />
            <meta itemProp="duration" content={videoData.duration} />
          </div>
        </div>
      </article>
    </>
  );
};

export default ServiceVideo;