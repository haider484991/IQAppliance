import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact IQ Appliances | Expert Appliance Repair Services',
  description: 'Get in touch with IQ Appliances for professional appliance repair services in NY, NJ & PA. Expert repair and maintenance for all major appliances. Call 1-833-348-1798 today!',
  keywords: 'contact IQ Appliances, appliance repair contact, NY appliance repair, NJ appliance repair, PA appliance repair, refrigerator repair, oven repair, dishwasher repair',
  openGraph: {
    title: 'Contact IQ Appliances | Professional Repair Services',
    description: 'Connect with our appliance repair specialists for expert diagnosis and repair services across NY, NJ & PA.',
    url: 'https://www.iqappliancerepair.com/contact',
    siteName: 'IQ Appliances',
    images: [
      {
        url: '/images/appliances-repair-service.webp',
        width: 1200,
        height: 630,
        alt: 'Contact IQ Appliances',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | IQ Appliances',
    description: 'Professional appliance repair services in NY, NJ & PA',
    images: ['/images/appliances-repair-service.webp'],
    creator: '@iqappliancerepair',
  },
  alternates: {
    canonical: 'https://www.iqappliancerepair.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Hero Section */}
      <header className="relative bg-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-blue-700 opacity-75"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact IQ Appliances</h1>
          <p className="text-xl mb-8">Expert appliance repair services throughout NY, NJ & PA!</p>
          <a
            href="tel:1-833-348-1798"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-blue-100 transition-colors"
            aria-label="Call Us Now"
          >
            <FaPhoneAlt className="mr-2" />
            Call Us Now
          </a>
        </div>
      </header>

      {/* Contact Information */}
      <main className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12 text-blue-700">Contact Information</h2>
          
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-4">
              <FaPhoneAlt className="text-blue-600 text-2xl" />
              <a href="tel:1-833-348-1798" className="text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors">
                1-833-348-1798
              </a>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <FaMapMarkerAlt className="text-blue-600 text-2xl" />
              <div className="text-xl font-medium text-gray-800">
                Serving All Major Cities in NY, NJ & PA
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600">
                We provide expert repair services for all major appliance brands and models throughout New York, 
                New Jersey, and Pennsylvania. Our network of skilled technicians offers comprehensive repair and 
                maintenance services for refrigerators, ovens, dishwashers, washers, dryers, and more.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-blue-700">Our Service Areas Include:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-blue-600">New York</h4>
                  <p className="text-gray-600">Major cities and surrounding areas</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-blue-600">New Jersey</h4>
                  <p className="text-gray-600">Major cities and surrounding areas</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-blue-600">Pennsylvania</h4>
                  <p className="text-gray-600">Major cities and surrounding areas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Call-to-Action */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">Need your appliances repaired by professionals you can trust?</p>
          <a
            href="tel:1-833-348-1798"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-blue-100 transition-colors"
            aria-label="Call Us Now"
          >
            <FaPhoneAlt className="mr-2" />
            Call Us Now
          </a>
        </div>
      </footer>
    </div>
  );
}