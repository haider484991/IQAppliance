import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://iqappliances.com'),
  title: {
    template: '%s | IQ Appliances',
    default: ' IQ Appliances connects homeowners and businesses in New York, New Jersey, and Pennsylvania with skilled technicians for expert repair of dishwashers, refrigerators, stoves, ovens, ranges, washers, and dryers. Call 1-833-348-1798 today! | IQ Appliances',
  },
  description: 'IQ Appliances connects homeowners and businesses in New York, New Jersey, and Pennsylvania with skilled technicians for expert repair of dishwashers, refrigerators, stoves, ovens, ranges, washers, and dryers. Call 1-833-348-1798 today!',
  keywords: ['appliance repair', 'refrigerator repair', 'oven repair', 'dishwasher repair', 'washer repair', 'dryer repair', 'New York appliance repair', 'New Jersey appliance repair', 'Pennsylvania appliance repair', 'same day service'],
  authors: [{ name: 'IQ Appliances' }],
  creator: 'IQ Appliances',
  publisher: 'IQ Appliances',
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/images/apple-touch-icon.png',
    shortcut: '/images/favicon.ico',
  },
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: 'Professional Appliance Repair Services in New York, New Jersey, and Pennsylvania',
    description: 'IQ Appliances connects homeowners and businesses in New York, New Jersey, and Pennsylvania with skilled technicians for expert repair of dishwashers, refrigerators, stoves, ovens, ranges, washers, and dryers. Call 1-833-348-1798 today!',
    url: 'https://iqappliances.com',
    siteName: 'IQ Appliances',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IQ Appliances - Professional Appliance Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
      title: 'Professional Appliance Repair Services in New York, New Jersey, and Pennsylvania',
    description: 'IQ Appliances connects homeowners and businesses in New York, New Jersey, and Pennsylvania with skilled technicians for expert repair of dishwashers, refrigerators, stoves, ovens, ranges, washers, and dryers. Call 1-833-348-1798 today!',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};