import { notFound } from 'next/navigation';

import { services } from '@/lib/data/services';
import { states } from '@/lib/data/locations';
import { Card } from '@/components/ui/card';
import { Phone,  Clock, ShieldCheck, Star, Wrench, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

interface ServicePageProps {
  params: {
    service: string;
  };
}

export const dynamicParams = true;

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = services.find(s => s.slug === params.service);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  const title = `${service.title} | IQ Appliances`;
  const description = service.description;
  const url = `https://iqappliances.com/services/${service.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'IQ Appliances',
      type: 'website',
      locale: 'en_US',
      images: [{
        url: service.image,
        width: 1200,
        height: 630,
        alt: `Professional ${service.title}`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@iqappliances',
      site: '@iqappliances',
      images: [service.image],
    },
    alternates: {
      canonical: url,
    },
    keywords: `${service.title.toLowerCase()}, appliance repair, ${service.title.toLowerCase()} near me, appliance maintenance, residential appliances, commercial appliances, appliance technician`,
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find(s => s.slug === params.service);

  if (!service) {
    notFound();
  }

  const phoneNumber = '1-833-366-0402';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/40">
      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url('${service.image}')`,
          backgroundPosition: 'center 30%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Expert appliance repair solutions with fast, reliable service
          </p>
          <a
            href={`tel:${phoneNumber}`}
            className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now: {phoneNumber}</span>
          </a>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">
              Professional {service.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              From quick repairs to comprehensive maintenance, we provide expert appliance repair services for both residential and commercial properties. Our experienced technicians use advanced diagnostic tools and genuine parts to ensure your appliances function efficiently.
            </p>
          </div>

          {/* Service Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="p-6 border-0 shadow-xl rounded-xl bg-white hover:shadow-2xl transition-shadow">
              <div className="flex items-start mb-4">
                <Wrench className="h-8 w-8 text-blue-600 mr-4" />
                <h3 className="text-xl font-bold text-blue-900">Expert Diagnosis</h3>
              </div>
              <p className="text-gray-600">Professional assessment and troubleshooting of appliance issues using advanced diagnostic methods.</p>
            </Card>

            <Card className="p-6 border-0 shadow-xl rounded-xl bg-white hover:shadow-2xl transition-shadow">
              <div className="flex items-start mb-4">
                <Clock className="h-8 w-8 text-blue-600 mr-4" />
                <h3 className="text-xl font-bold text-blue-900">Fast Response</h3>
              </div>
              <p className="text-gray-600">Quick response times and efficient service to minimize disruption to your daily routine.</p>
            </Card>

            <Card className="p-6 border-0 shadow-xl rounded-xl bg-white hover:shadow-2xl transition-shadow">
              <div className="flex items-start mb-4">
                <Star className="h-8 w-8 text-blue-600 mr-4" />
                <h3 className="text-xl font-bold text-blue-900">Quality Service</h3>
              </div>
              <p className="text-gray-600">Professional technicians with extensive experience in appliance repair and maintenance.</p>
            </Card>

            <Card className="p-6 border-0 shadow-xl rounded-xl bg-white hover:shadow-2xl transition-shadow">
              <div className="flex items-start mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-600 mr-4" />
                <h3 className="text-xl font-bold text-blue-900">Genuine Parts</h3>
              </div>
              <p className="text-gray-600">We use high-quality, genuine replacement parts for reliable and long-lasting repairs.</p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-900 to-blue-800 p-8 rounded-xl shadow-lg mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need Appliance Repair?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us today for fast, professional appliance repair service
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now: {phoneNumber}</span>
            </a>
          </div>
        </div>
      </main>

      {/* State Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">Find Professional Appliance Repair Near You</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Expert appliance repair services available across Florida
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {states.filter(state => state.id === 'florida').map((state) => (
              <a
                key={state.id}
                href={`/${state.id}`}
                className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center"
              >
                <span className="font-medium text-gray-800">{state.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}