import { inter } from '@/lib/fonts';
import './globals.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { metadata as siteMetadata } from './metadata';

// Loading components
const LoadingHeader = () => (
  <div className="h-20 bg-white shadow-sm animate-pulse"></div>
);

const LoadingFooter = () => (
  <div className="h-40 bg-gray-100 animate-pulse"></div>
);

const LoadingCTA = () => (
  <div className="h-32 bg-blue-50 animate-pulse"></div>
);

// Optimize dynamic imports with loading states and ssr
const Header = dynamic(() => import('@/components/Header'), { 
  loading: LoadingHeader,
  ssr: true
});

const Footer = dynamic(() => import('@/components/Footer'), { 
  loading: LoadingFooter,
  ssr: true
});

const CallToAction = dynamic(() => import('@/components/CallToAction'), { 
  loading: LoadingCTA,
  ssr: true
});

// Lazy load analytics components with error boundaries
const Analytics = dynamic(() => 
  import('@vercel/analytics/react')
    .then(mod => mod.Analytics)
    .catch(() => () => null), // Fallback if analytics fails to load
  { ssr: false }
);

const SpeedInsights = dynamic(() => 
  import('@vercel/speed-insights/next')
    .then(mod => mod.SpeedInsights)
    .catch(() => () => null), // Fallback if speed insights fails to load
  { ssr: false }
);

export { siteMetadata as metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Mobile Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="IQ Appliances" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="IQ Appliances" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        
        {/* Security Headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* Social Media Verification */}
        <meta name="google-site-verification" content="Oa6rm3WoNwtOI9doI2ZMjjvRRdlOA9YL4XsHkx3nsBY" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="CqGDw8tDmu0JUN4Jke6Ng" async></script>
      </head>
      <body className="min-h-screen bg-white flex flex-col">
        <Suspense fallback={<LoadingHeader />}>
          <div className="sticky top-0 z-50 w-full bg-white">
            <Header />
          </div>
        </Suspense>

        <main className="flex-grow pt-20">
          {children}
        </main>

        <Suspense fallback={<LoadingCTA />}>
          <CallToAction />
        </Suspense>
        
        <Suspense fallback={<LoadingFooter />}>
          <Footer />
        </Suspense>

        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}