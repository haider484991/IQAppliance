import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { FaTools, FaHome, FaWrench, FaBroom, FaCog, FaShieldAlt, FaPhoneAlt, FaClock, FaStar, FaBolt } from 'react-icons/fa';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trusted Major Appliance Repair in NY, NJ & PA | IQ Appliances',
  description: 'IQ Appliances connects homeowners and businesses in New York, New Jersey, and Pennsylvania with skilled technicians for expert repair of dishwashers, refrigerators, stoves, ovens, ranges, washers, and dryers. Call 1-833-348-1798 today!',
  keywords: 'appliance repair, NY appliance repair, NJ appliance repair, PA appliance repair, refrigerator repair, washer repair, dryer repair, dishwasher repair, oven repair, stove repair',
  openGraph: {
    title: 'Trusted Major Appliance Repair in NY, NJ & PA | IQ Appliances',
    description: 'Expert appliance repair services in NY, NJ & PA. Professional solutions for all major household appliances.',
    url: 'https://www.iqappliances.com',
    siteName: 'IQ Appliances',
    images: [
      {
        url: 'https://www.iqappliances.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Appliance Repair Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IQ Appliances | Professional Services',
    description: 'Expert appliance repair services across NY, NJ & PA. Fast, reliable solutions for all major appliances.',
    images: ['https://www.iqappliances.com/images/twitter-card.jpg'],
    creator: '@IQAppliances',
  },
  alternates: {
    canonical: 'https://www.iqappliances.com',
  },
};

export default function Home() {
  return (
    <>
      <div>
        {/* Hero Section */}
        <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
          <Image
            src="/images/in-touch-appliance-repair-banner.webp"
            alt="Professional Appliance Repair Services"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 flex items-center">
            <div className="container mx-auto px-4 py-12 md:py-16">
              <div className="max-w-4xl mx-auto bg-blue-900/30 backdrop-blur-sm p-4 md:p-8 rounded-lg text-center animate-fade-in">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white">
                  IQ Appliances: Expert Major Appliance Repair in NY, NJ, and PA
                </h1>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-white/90">
                  Reliable Appliance Repair Services for Homeowners and Businesses
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                  When your essential household appliances break down, you need fast, reliable, and professional repair services to get them back up and running. IQ Appliances proudly serves the Tri-State area (New York, New Jersey, and Pennsylvania) by connecting homeowners and businesses with highly skilled appliance repair experts. Our network of experienced technicians specializes in servicing a wide range of major appliances, ensuring that your kitchen and laundry room appliances function efficiently.
                </p>
                <a
                  href="tel:1-833-348-1798"
                  className="inline-flex items-center bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl font-medium shadow-lg hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-xl"
                >
                  <FaPhoneAlt className="mr-2 md:mr-3 animate-pulse" />
                  <span>Call 1-833-348-1798</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose IQ Appliances?</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Finding a trusted appliance repair expert in NY, NJ, and PA can be overwhelming. IQ Appliances makes the process simple by connecting you with highly trained professionals who provide reliable service and lasting solutions. Here's why homeowners and business owners choose IQ Appliances:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="text-blue-600 mb-4">
                  <FaClock className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">1. Fast & Convenient Scheduling</h3>
                <p className="text-gray-600 text-center">We understand that a broken appliance can disrupt your daily routine. Our team makes it easy to schedule a repair appointment at a time that works best for you.</p>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="text-blue-600 mb-4">
                  <FaTools className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">2. Experienced & Knowledgeable Technicians</h3>
                <p className="text-gray-600 text-center">We connect you with experienced professionals who are well-versed in diagnosing and repairing a wide range of appliance issues. Their expertise ensures accurate troubleshooting and efficient repairs.</p>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="text-blue-600 mb-4">
                  <FaWrench className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">3. Comprehensive Major Appliance Repairs</h3>
                <p className="text-gray-600 text-center">Our network specializes in repairing all major household appliances, ensuring you don't have to juggle multiple service providers.</p>
              </div>
              <div className="bg-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="text-blue-600 mb-4">
                  <FaHome className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">4. Service Across the Tri-State Area</h3>
                <p className="text-gray-600 text-center">IQ Appliances proudly serves New York, New Jersey, and Pennsylvania, offering a seamless repair experience to homeowners and businesses in these regions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Appliance Repair Services</h2>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <p className="text-gray-600 text-lg leading-relaxed">
                At IQ Appliances, we specialize in full-service major appliance repair for both residential and commercial customers. Whether your refrigerator isn't cooling properly or your oven refuses to heat, our expert technicians are ready to diagnose and fix the problem efficiently.
              </p>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">We provide expert repair services for:</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>Refrigerators – Fixing cooling issues, leaks, compressor problems, and more.</li>
                  <li>Dishwashers – Addressing drainage problems, poor cleaning performance, and error codes.</li>
                  <li>Stoves & Ovens – Repairing temperature inconsistencies, burner issues, and ignition failures.</li>
                  <li>Ranges – Troubleshooting electric and gas range malfunctions.</li>
                  <li>Washers & Dryers – Resolving spin cycle failures, leaks, dryer heating problems, and more.</li>
                  </ul>
                </div>
              <div className="mt-8">
                <p className="text-gray-600">
                  Our skilled professionals work on leading appliance brands, including Whirlpool, GE, Samsung, LG, Maytag, Frigidaire, Bosch, KitchenAid, and more.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Refrigerator Repair */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <Image
                    src="/images/refrigerator-repair-professionals-near-me.webp"
                    alt="Expert Refrigerator Repair"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">Refrigerator Repair</h3>
                  <p className="mb-4 text-gray-600">Fixing cooling issues, leaks, compressor problems, and more.</p>
                  <h4 className="font-semibold mb-2 text-blue-600">Common Issues We Fix:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Food spoiling quickly</li>
                    <li>Strange noises</li>
                    <li>Excessive frost buildup</li>
                    <li>Compressor problems</li>
                  </ul>
                </div>
              </div>

              {/* Dishwasher Repair */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <Image
                    src="/images/dishwasher-repair-pros.webp"
                    alt="Professional Dishwasher Repair"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">Dishwasher Repair</h3>
                  <p className="mb-4 text-gray-600">Addressing drainage problems, poor cleaning performance, and error codes.</p>
                  <h4 className="font-semibold mb-2 text-blue-600">Common Issues We Fix:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Dishes not coming out clean</li>
                    <li>Standing water</li>
                    <li>Foul odor</li>
                    <li>Error codes</li>
                  </ul>
                </div>
              </div>

              {/* Stove & Oven Repair */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <Image
                    src="/images/appliances-repair-service.webp"
                    alt="Professional Stove and Oven Repair"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">Stove & Oven Repair</h3>
                  <p className="mb-4 text-gray-600">Repairing temperature inconsistencies, burner issues, and ignition failures.</p>
                  <h4 className="font-semibold mb-2 text-blue-600">Common Issues We Fix:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Uneven cooking</li>
                    <li>Gas smell</li>
                    <li>Burner not igniting</li>
                    <li>Temperature control problems</li>
                  </ul>
                </div>
              </div>

              {/* Washer & Dryer Repair */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative h-64">
                  <Image
                    src="/images/washer-dryer-repairmen.webp"
                    alt="Expert Washer and Dryer Repair"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">Washer & Dryer Repair</h3>
                  <p className="mb-4 text-gray-600">Resolving spin cycle failures, leaks, dryer heating problems, and more.</p>
                  <h4 className="font-semibold mb-2 text-blue-600">Common Issues We Fix:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Water leaks</li>
                    <li>Shaking violently</li>
                    <li>Clothes not drying properly</li>
                    <li>Burning smell</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">The IQ Appliances Process</h2>
            <p className="text-xl text-center mb-12 text-white/90">Getting your appliance repaired is simple with IQ Appliances:</p>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-8 text-lg">
                <li className="flex items-center space-x-4">
                  <div className="bg-white/10 rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl font-bold">1</span>
                </div>
                  <div>
                    <span className="font-semibold">Call Us at 1-833-348-1798</span> – Speak with our team to schedule an appointment.
              </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="bg-white/10 rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl font-bold">2</span>
                </div>
                  <div>
                    <span className="font-semibold">Describe the Issue</span> – Our experts will help diagnose the problem over the phone.
              </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="bg-white/10 rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl font-bold">3</span>
                </div>
                  <div>
                    <span className="font-semibold">Schedule a Service Visit</span> – A skilled technician will arrive at your home or business for a full inspection and repair.
              </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="bg-white/10 rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl font-bold">4</span>
                </div>
                  <div>
                    <span className="font-semibold">Enjoy a Fully Functional Appliance</span> – Get back to your routine with confidence.
              </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tri-State Experts Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Serving Residential & Commercial Clients</h2>
              <p className="text-gray-600 text-lg">
                IQ Appliances caters to both homeowners and businesses across the Tri-State area. Whether you run a restaurant, hotel, laundromat, or other commercial establishment, our network of professionals ensures that your appliances remain in optimal condition, minimizing downtime and maximizing efficiency.
              </p>
            </div>
            
            <h3 className="text-2xl font-bold mb-12 text-center">Signs Your Appliance Needs Repair</h3>
            <div className="max-w-4xl mx-auto text-center mb-8">
              <p className="text-gray-600 text-lg mb-8">
                If you're experiencing any of the following issues, it's time to schedule an appliance repair service:
              </p>
              <ul className="text-gray-600 text-lg space-y-4 text-left max-w-2xl mx-auto">
                <li><strong>Refrigerator:</strong> Food spoiling quickly, strange noises, excessive frost buildup.</li>
                <li><strong>Dishwasher:</strong> Dishes not coming out clean, standing water, foul odor.</li>
                <li><strong>Stove/Oven/Range:</strong> Uneven cooking, gas smell, burner not igniting.</li>
                <li><strong>Washing Machine:</strong> Water leaks, shaking violently, clothes coming out soaked.</li>
                <li><strong>Dryer:</strong> Clothes not drying properly, burning smell, excessive noise.</li>
              </ul>
              <p className="text-gray-600 text-lg mt-8 italic">
                Ignoring these signs can lead to costly replacements, so addressing the issue early is crucial.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact IQ Appliances Today</h2>
              <p className="text-xl mb-12 text-white/90">
                Don't let a malfunctioning appliance disrupt your home or business. Call IQ Appliances today at 1-833-348-1798 to schedule an appointment with a trusted appliance repair expert in New York, New Jersey, or Pennsylvania.
              </p>
              <p className="text-xl mb-12 text-white/90">
                Let us help you get your appliances back in top working condition—fast, efficient, and hassle-free!
              </p>
              <a
                href="tel:1-833-348-1798"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-medium shadow-lg hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-xl"
              >
                <FaPhoneAlt className="mr-3 animate-pulse" />
                <span>Call 1-833-348-1798</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}