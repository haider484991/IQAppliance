import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.intouchappliance.com'),
  title: {
    template: '%s | In Touch Appliance Repair',
    default: 'Professional Appliance Repair Services in Florida | In Touch Appliance Repair',
  },
  description: 'Expert Appliance Repair Services: Refrigerators, Ovens, Dishwashers, and More. Fast, Reliable Service Throughout Florida. Call 1-833-366-0402',
  keywords: ['appliance repair', 'refrigerator repair', 'oven repair', 'dishwasher repair', 'washer repair', 'dryer repair', 'Florida appliance repair', 'same day service'],
  authors: [{ name: 'In Touch Appliance Repair' }],
  creator: 'In Touch Appliance Repair',
  publisher: 'In Touch Appliance Repair',
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
    title: 'Professional Appliance Repair Services in Florida',
    description: 'Expert Appliance Repair Services: Refrigerators, Ovens, Dishwashers, and More. Fast, Reliable Service Throughout Florida. Call 1-833-366-0402',
    url: 'https://www.intouchappliancerepair.com',
    siteName: 'In Touch Appliance Repair',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'In Touch Appliance Repair - Professional Appliance Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Appliance Repair Services in Florida',
    description: 'Expert Appliance Repair Services: Refrigerators, Ovens, Dishwashers, and More. Fast, Reliable Service Throughout Florida. Call 1-833-366-0402',
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