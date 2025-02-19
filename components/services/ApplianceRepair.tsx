"use client";

import { City, State } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SchemaOrg from "@/components/schema-org";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Head from "next/head";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => (
    <div className="flex items-center justify-center w-full h-[200px]">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  ),
  ssr: false,
});

interface ServiceProps {
  city: City;
  state: State;
}

export default function ApplianceRepair({ city, state }: ServiceProps) {
  return (
    <>
      <SchemaOrg
        name={`${city.name} ${state.abbreviation} Appliance Repair | IQ Appliance Repair`}
        description={`Major Appliance repair ${city.name} ${state.abbreviation}. IQ Appliances repairs refrigerators, dishwashers, stoves, ovens, washers, dryers, and more. Call 1-833-348-1798 today!`}
        city={city}
        state={state}
        service="Appliance Repair"
      />

      <main className="w-full">
        {/* Hero Section */}
        <header className="relative w-full min-h-[400px] md:min-h-[500px] bg-gradient-to-r from-blue-500 to-blue-700 overflow-hidden flex items-center justify-center py-12 px-4">
          <Image
            src="/images/appliances-repair-service.webp"
            alt={`Professional appliance repair services in ${city.name} ${state.abbreviation} - Expert technicians for all major brands`}
            fill
            priority
            style={{ objectFit: "cover" }}
            className="opacity-70"
            sizes="100vw"
            quality={90}
          />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
            <div className="bg-black bg-opacity-40 rounded-xl p-4 sm:p-6 md:p-8 backdrop-blur-sm">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                Reliable Major Appliance Repair in {city.name} {state.abbreviation}
            </h1>
              <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-6">
                When a major appliance in your home or business stops working, it can disrupt your daily routine and cause unnecessary stress. At IQ Appliances, we make it easy to find trusted and experienced appliance repair professionals in {city.name} {state.abbreviation}. Our network of highly skilled technicians is ready to restore your appliances to peak performance quickly and efficiently.
            </p>
              <div className="mt-6 sm:mt-8">
              <a
                  href="tel:1-833-348-1798"
                  className="inline-flex items-center justify-center bg-white text-blue-700 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-md text-base sm:text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                  Call 1-833-348-1798
              </a>
              </div>
            </div>
          </div>
        </header>

        {/* Comprehensive Services Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 text-center mb-6">
              Comprehensive Appliance Repair Services in {city.name} {state.abbreviation}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-center text-gray-700 mb-12">
              IQ Appliances specializes in full-service major appliance repair, ensuring that homeowners and businesses in {city.name} {state.abbreviation} receive fast, reliable, and high-quality service. Whether your refrigerator is not cooling properly or your washer refuses to spin, our experts are here to help.
            </p>

            <h3 className="text-xl font-bold text-blue-700 mb-6">We Service the Following Major Appliances:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/refrigerator-repair-professionals-near-me.webp"
                    alt={`Professional refrigerator repair services in ${city.name} ${state.abbreviation}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h4 className="text-lg font-bold text-blue-700 mb-4">Refrigerators</h4>
                <p className="text-gray-700">Fixing cooling problems, leaks, compressor failures, and more.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/dishwasher-repair-pros.webp"
                    alt={`Expert dishwasher repair in ${city.name} ${state.abbreviation}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h4 className="text-lg font-bold text-blue-700 mb-4">Dishwashers</h4>
                <p className="text-gray-700">Addressing drainage issues, poor cleaning performance, and faulty pumps.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/appliances-repair-service.webp"
                    alt={`Professional stove and oven repair services in ${city.name} ${state.abbreviation}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h4 className="text-lg font-bold text-blue-700 mb-4">Stoves & Ovens</h4>
                <p className="text-gray-700">Repairing temperature inconsistencies, burner problems, and ignition issues.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/appliances-repair-service.webp"
                    alt={`Range repair services in ${city.name} ${state.abbreviation}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h4 className="text-lg font-bold text-blue-700 mb-4">Ranges</h4>
                <p className="text-gray-700">Troubleshooting electric and gas range malfunctions.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/washer-dryer-repairmen.webp"
                    alt={`Washer and dryer repair in ${city.name} ${state.abbreviation}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h4 className="text-lg font-bold text-blue-700 mb-4">Washers & Dryers</h4>
                <p className="text-gray-700">Resolving spin cycle failures, water leaks, dryer heating issues, and more.</p>
            </div>
            </div>

            <div className="text-center mb-12">
              <p className="text-gray-700 mb-4">
                Our technicians in {city.name} {state.abbreviation} are experienced with all major appliance brands, including:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Whirlpool', 'GE', 'Samsung', 'LG', 'Maytag', 'Frigidaire', 'Bosch', 'KitchenAid'].map((brand) => (
                  <Badge key={brand} variant="secondary" className="text-sm">
                    {brand}
                  </Badge>
                ))}
            </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 text-center mb-8">
              Why Choose IQ Appliances for Repairs in {city.name} {state.abbreviation}?
            </h2>
            <p className="text-center text-gray-700 mb-8">
              We understand that appliance issues can arise unexpectedly, causing major inconveniences in your home or business. IQ Appliances provides a streamlined process to connect you with knowledgeable technicians who offer prompt, professional service in {city.name} {state.abbreviation}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">1. Convenient Scheduling</h3>
                <p className="text-gray-700">
                  We work around your schedule, making it easy to book a repair appointment at a time that works for you.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">2. Skilled and Experienced Technicians</h3>
                <p className="text-gray-700">
                  Our network consists of highly trained professionals who are well-versed in diagnosing and repairing a wide range of major appliance problems.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">3. Comprehensive Repair Solutions</h3>
                <p className="text-gray-700">
                  No need to contact multiple providers—IQ Appliances connects you with experts who repair all major household appliances.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">4. Serving Homeowners and Businesses</h3>
                <p className="text-gray-700">
                  Whether you own a home, a restaurant, a laundromat, or another commercial space, we provide expert appliance repair solutions tailored to your needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 text-center mb-8">
              Common Appliance Issues We Repair in {city.name} {state.abbreviation}
            </h2>
            <p className="text-center text-gray-700 mb-8">
              If you're experiencing any of these issues, it's time to call IQ Appliances:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Refrigerator</h3>
                <p className="text-gray-700">Food spoiling too quickly, excessive frost buildup, loud or unusual noises.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Dishwasher</h3>
                <p className="text-gray-700">Dishes not getting clean, standing water, bad odors.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Stove/Oven/Range</h3>
                <p className="text-gray-700">Burners not igniting, uneven heating, gas smell.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Washing Machine</h3>
                <p className="text-gray-700">Not draining, excessive shaking, water leaks.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Dryer</h3>
                <p className="text-gray-700">Clothes taking too long to dry, burning smell, loud noises.</p>
              </div>
            </div>
            <p className="text-center text-gray-700 mt-8">
              Ignoring these warning signs can lead to costly replacements—address them early with professional repair services in {city.name} {state.abbreviation}.
            </p>
          </div>
        </section>

        {/* Service Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 text-center mb-8">
              How Our Appliance Repair Service Works
            </h2>
            <p className="text-center text-gray-700 mb-8">
              Getting your appliances repaired in {city.name} {state.abbreviation} is simple with IQ Appliances:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Call Us at 1-833-348-1798</h3>
                <p className="text-gray-700">Tell us about your appliance issue and schedule a service appointment.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Describe the Problem</h3>
                <p className="text-gray-700">Our experts will assist with diagnosing the issue over the phone.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Schedule an In-Home or Business Visit</h3>
                <p className="text-gray-700">A skilled technician will arrive to inspect and repair the appliance.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Enjoy a Fully Functional Appliance</h3>
                <p className="text-gray-700">Get back to your routine with confidence in your repaired appliance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Residential & Commercial Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 text-center mb-8">
              Residential & Commercial Appliance Repair in {city.name} {state.abbreviation}
            </h2>
            <p className="text-center text-gray-700 mb-8">
              IQ Appliances proudly serves both homeowners and business owners in {city.name} {state.abbreviation}. Whether your restaurant's refrigerator is malfunctioning or your home's washer isn't working properly, we connect you with experienced professionals who specialize in repairing appliances in both residential and commercial settings.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/appliances-repair-service.webp"
                    alt={`Home appliance repair services in ${city.name} ${state.abbreviation}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">Appliance Repair for Homes</h3>
                <p className="text-gray-700">
                  A broken appliance can disrupt your daily life. We ensure quick and efficient repairs so your home appliances run smoothly again.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/in-touch-appliance-repair-banner.webp"
                    alt={`Commercial appliance repair in ${city.name} ${state.abbreviation}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">Appliance Repair for Businesses</h3>
                <p className="text-gray-700">
                  If you own a business in {city.name} {state.abbreviation}, you can't afford downtime caused by faulty appliances. From commercial kitchens to laundromats, we help businesses keep their operations running efficiently with expert appliance repair services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
              Schedule Your Appliance Repair in {city.name} {state.abbreviation} Today!
            </h2>
            <p className="text-lg mb-8">
              Don't let a broken appliance disrupt your home or business. Call IQ Appliances today at 1-833-348-1798 to schedule an appointment with a trusted appliance repair expert in {city.name} {state.abbreviation}.
            </p>
            <p className="text-lg mb-8">
              Whether it's a refrigerator, dishwasher, stove, oven, range, washer, or dryer, our expert technicians are ready to restore your appliances to top working condition. Let us help you get back to your routine—quickly and hassle-free!
            </p>
            <a
              href="tel:1-833-348-1798"
              className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-md text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Call 1-833-348-1798
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
