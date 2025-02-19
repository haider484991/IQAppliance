import Link from 'next/link';
import { Metadata } from 'next';
import { Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | IQ Appliances',
  description: 'The page you are looking for could not be found. Please check the URL or return to our homepage to explore our professional appliance repair services in NY, NJ & PA.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/40 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-900 p-4 rounded-full">
            <Wrench className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. But don&apos;t worry - our expert technicians are available 24/7 for all your appliance repair needs throughout New York, New Jersey, and Pennsylvania.
        </p>
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Return Home
          </Link>
          <div className="mt-4">
            <Link
              href="tel:1-833-348-1798"
              className="text-blue-900 hover:text-blue-800 font-medium flex items-center justify-center gap-2"
            >
              Call Now: 1-833-348-1798
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}