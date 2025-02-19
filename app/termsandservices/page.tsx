import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | IQ Appliances',
  description: 'Read our Terms of Service to understand the terms and conditions that govern your use of IQ Appliances services and website.',
  openGraph: {
    title: 'Terms of Service | IQ Appliances',
    description: 'Our Terms of Service outline the rules and guidelines for using our appliance repair services and website.',
    url: 'https://www.iqappliancerepair.com/termsandservices',
    siteName: 'IQ Appliances',
    images: [
      {
        url: '/images/appliances-repair-service.webp',
        width: 1200,
        height: 630,
        alt: 'IQ Appliances Terms of Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.iqappliancerepair.com/termsandservices',
  },
};

export default function TermsOfServicePage() {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Terms of Service
            </h1>
            
            <div className="space-y-8 text-lg text-gray-700">
              <section>
                <p>
                  Welcome to iqappliancerepair.com website owned by IQ Appliances (&quot;the Site&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of the Site and the services provided by IQ Appliances (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our Site, you agree to comply with and be bound by these Terms. If you do not agree with any part of these Terms, please do not use our Site.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">1. Services Provided</h2>
                <p>
                  IQ Appliances offers comprehensive appliance repair and maintenance services throughout New York, New Jersey, and Pennsylvania. Our services include repair and maintenance of refrigerators, ovens, dishwashers, washers, dryers, and other major household appliances. Our services are provided subject to availability, and specific terms may apply depending on the type of repair needed.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">2. Eligibility</h2>
                <p>
                  By using our Site, you confirm that you are at least 18 years old or have legal parental or guardian consent and that you have the legal capacity to enter into a binding agreement.
                </p>
              </section>
  
              <section> 
                <h2 className="text-2xl font-semibold mt-8">3. User Responsibilities</h2>
                <p>
                  When using our Site, you agree to:
                </p>
                <ul className="list-disc list-inside">
                  <li>Provide accurate, current, and complete information when scheduling service or making inquiries.</li>
                  <li>Use the Site only for lawful purposes and refrain from engaging in any activity that disrupts or interferes with its proper functioning.</li>
                  <li>Respect all applicable local, state, and federal laws and regulations.</li>
                  <li>Provide safe and reasonable access to appliances requiring service.</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">4. Service Estimates</h2>
                <p>
                  Any estimates provided by IQ Appliances are preliminary and subject to change based on the actual diagnosis of the appliance and parts required. While we strive to provide accurate estimates, the final cost may vary based on the complexity of the repair and any additional issues discovered during service.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">5. Payment Terms</h2>
                <p>
                  All payments for services rendered by IQ Appliances are subject to the following terms:
                </p>
                <ul className="list-disc list-inside">
                  <li>Service Call Fee: A diagnostic fee may apply and will be specified when scheduling service.</li>
                  <li>Payment Methods: We accept major credit cards, cash, and other specified payment methods.</li>
                  <li>Payment Timing: Payment is due upon completion of service unless otherwise specified.</li>
                  <li>Parts Warranty: Parts warranties vary by manufacturer and will be specified in your service agreement.</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">6. Cancellations and Scheduling</h2>
                <p>
                  We require at least 24 hours notice for service cancellations. Late cancellations or no-shows may result in a cancellation fee. We strive to maintain punctual service times but may need to adjust schedules due to emergency repairs or unforeseen circumstances.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">7. Intellectual Property</h2>
                <p>
                  All content on this Site, including text, graphics, logos, images, and software, is the property of IQ Appliances or its content suppliers and is protected by copyright and trademark laws. You may not use, reproduce, or distribute any content without our prior written permission.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">8. Service Warranty</h2>
                <p>
                  Our labor is warranted for 90 days from the date of service. This warranty covers the specific repair performed and does not extend to other parts or issues that may arise. Parts warranties are provided by manufacturers and vary by component.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">9. Disclaimer of Warranties</h2>
                <p>
                  Our services are provided &quot;as is&quot; and &quot;as available.&quot; While we strive for excellence in our repair services, we make no warranties or representations about the accuracy or completeness of the information on our Site. To the fullest extent permitted by law, we disclaim all warranties, whether express or implied.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">10. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, IQ Appliances shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Site or services. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">11. Independent Contractors</h2>
                <p>
                  Our technicians are independent contractors. While we carefully select and verify credentials of our service providers, IQ Appliances does not warrant or guarantee any work performed. Each technician maintains their own liability insurance and professional certifications.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">12. Service Area</h2>
                <p>
                  We provide service throughout major cities in New York, New Jersey, and Pennsylvania. Service availability and response times may vary by location. Additional travel charges may apply for service calls outside our primary service areas.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">13. Changes to Terms</h2>
                <p>
                  We may update these Terms from time to time. Any changes will be posted on this page, and the &quot;Last Updated&quot; date will be revised. Your continued use of the Site following any updates constitutes your acceptance of the new Terms.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">14. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the States of New York, New Jersey, and Pennsylvania, as applicable to your location, without regard to conflict of law provisions.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">15. Contact Information</h2>
                <p>
                  If you have any questions or concerns about these Terms, please contact us:
                </p>
                <p>
                  IQ Appliances<br />
                  Email: support@intouchappliance.com
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }