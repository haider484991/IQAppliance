import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About IQ Appliances | Trusted Major Appliance Repair in NY, NJ & PA',
  description: 'Learn about IQ Appliances, your trusted connection to expert major appliance repair services in New York, New Jersey, and Pennsylvania. Call 1-833-348-1798 for reliable service today.',
  keywords: 'IQ Appliances, appliance repair services, New York appliance repair, New Jersey appliance repair, Pennsylvania appliance repair, refrigerator repair, oven repair, dishwasher repair, expert technicians',
  openGraph: {
    title: 'About IQ Appliances | Trusted Major Appliance Repair in NY, NJ & PA',
    description: 'Learn about IQ Appliances, your trusted connection to expert major appliance repair services in New York, New Jersey, and Pennsylvania.',
    type: 'website',
    url: 'https://www.iqappliancerepair.com/about',
    siteName: 'IQ Appliances',
    images: [
      {
        url: '/images/appliances-repair-service.webp',
        width: 1200,
        height: 630,
        alt: 'IQ Appliances - Professional Repair Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About IQ Appliances | Trusted Major Appliance Repair',
    description: 'Professional appliance repair services across NY, NJ & PA',
    images: ['/images/appliances-repair-service.webp'],
    creator: '@iqappliancerepair',
  },
  alternates: {
    canonical: 'https://www.iqappliancerepair.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-gray-800">
            About IQ Appliances: Connecting You with Trusted Appliance Repair Experts
          </h1>

          <div className="space-y-8 text-gray-700">
            {/* Introduction Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                Your Go-To Source for Major Appliance Repair in NY, NJ, and PA
              </h2>
              <p className="text-lg md:text-xl">
                At IQ Appliances, we take the hassle out of finding a qualified appliance repair professional. Whether you're a homeowner dealing with a malfunctioning refrigerator or a business owner needing a stove repaired, our network of skilled technicians ensures you receive expert service when you need it most. Serving the Tri-State area (New York, New Jersey, and Pennsylvania), we specialize in connecting customers with trusted appliance repair professionals who can handle a wide range of major household and commercial appliances.
              </p>
            </section>

            {/* Our Mission */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-lg md:text-xl">
                Our mission is simple: to provide homeowners and business owners with access to top-tier appliance repair services quickly and efficiently. We understand that when an appliance breaks down, it disrupts your daily routine. That's why we make it easy to schedule a repair and connect with a technician who has the skills and experience to get your appliance running smoothly again.
              </p>
            </section>

            {/* What We Do */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">What We Do</h2>
              <p className="text-lg md:text-xl mb-6">
                IQ Appliances serves as a reliable link between customers and experienced appliance repair professionals across NY, NJ, and PA. Whether you're dealing with a cooling issue in your refrigerator, an oven that won't heat, or a washer that won't spin, we help you find a solution fast.
              </p>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Services Include Repair for:</h3>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li className="text-lg"><strong>Refrigerators</strong> – Fixing cooling problems, leaks, and electrical issues.</li>
                <li className="text-lg"><strong>Dishwashers</strong> – Repairing drainage issues, poor cleaning performance, and error codes.</li>
                <li className="text-lg"><strong>Stoves & Ovens</strong> – Addressing burner malfunctions, temperature inconsistencies, and ignition failures.</li>
                <li className="text-lg"><strong>Ranges</strong> – Troubleshooting electric and gas range malfunctions.</li>
                <li className="text-lg"><strong>Washers & Dryers</strong> – Solving spin cycle failures, leaks, and heating problems.</li>
              </ul>
              <p className="text-lg mt-4">
                Our network of technicians services top appliance brands, including Whirlpool, GE, Samsung, LG, Maytag, Frigidaire, Bosch, KitchenAid, and more.
              </p>
            </section>

            {/* Why Choose Us */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Why IQ Appliances?</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">1. Convenient and Reliable Service</h3>
                  <p className="text-lg">Finding the right technician doesn't have to be a challenge. We make it easy to connect with experts who can diagnose and repair your appliances efficiently.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">2. Experienced and Knowledgeable Professionals</h3>
                  <p className="text-lg">The appliance repair professionals in our network have the training and expertise to handle a wide range of appliance issues, ensuring that your repairs are done right the first time.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">3. Comprehensive Appliance Repair Solutions</h3>
                  <p className="text-lg">From refrigerators to washers and dryers, our service network covers all major household and commercial appliances.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">4. Serving Homeowners and Businesses Across the Tri-State Area</h3>
                  <p className="text-lg">We cater to both residential and commercial clients, ensuring businesses such as restaurants, hotels, and laundromats receive fast and effective appliance repair services.</p>
                </div>
              </div>
            </section>

            {/* Our Process */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Our Process</h2>
              <p className="text-lg mb-4">We keep things simple and stress-free for our customers:</p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li className="text-lg"><strong>Call Us at 1-833-348-1798</strong> – Get in touch with our team to discuss your appliance issue.</li>
                <li className="text-lg"><strong>Schedule an Appointment</strong> – We connect you with a professional technician at a time that suits you.</li>
                <li className="text-lg"><strong>Expert Diagnosis and Repair</strong> – A skilled technician arrives to assess the problem and complete the necessary repairs.</li>
                <li className="text-lg"><strong>Enjoy a Fully Functional Appliance</strong> – Get back to your routine with confidence in your repaired appliance.</li>
              </ul>
            </section>

            {/* Signs You Need Repair */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Signs You Need Appliance Repair</h2>
              <p className="text-lg mb-4">If you're experiencing any of these issues, it's time to schedule a repair:</p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li className="text-lg"><strong>Refrigerator:</strong> Food spoiling quickly, excessive frost buildup, loud noises.</li>
                <li className="text-lg"><strong>Dishwasher:</strong> Water pooling inside, not cleaning dishes properly, unusual odors.</li>
                <li className="text-lg"><strong>Stove/Oven/Range:</strong> Burner not igniting, uneven cooking, control panel issues.</li>
                <li className="text-lg"><strong>Washing Machine:</strong> Leaking water, excessive vibration, not draining properly.</li>
                <li className="text-lg"><strong>Dryer:</strong> Clothes not drying, burning smell, excessive noise.</li>
              </ul>
              <p className="text-lg mt-4">Ignoring these issues can lead to more serious damage, so don't delay repairs.</p>
            </section>

            {/* Customer Satisfaction */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Our Commitment to Customer Satisfaction</h2>
              <p className="text-lg">
                At IQ Appliances, we prioritize customer satisfaction by ensuring that every repair job is completed with precision, efficiency, and professionalism. We believe in making the repair process as smooth as possible, so you can trust that when you contact us, you're getting high-quality service from experienced professionals.
              </p>
            </section>

            {/* Contact Section */}
            <section className="bg-blue-50 p-8 rounded-xl">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-800">Contact IQ Appliances Today</h2>
              <p className="text-lg mb-6">
                If you're dealing with a broken appliance, don't wait! Call IQ Appliances today at{' '}
                <a href="tel:1-833-348-1798" className="text-blue-600 hover:text-blue-800 font-semibold">
                  1-833-348-1798
                </a>{' '}
                to schedule an appointment with a trusted appliance repair expert in New York, New Jersey, or Pennsylvania. Let us help you restore convenience to your home or business with expert appliance repair services you can count on.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}