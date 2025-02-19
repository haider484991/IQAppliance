import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | IQ Appliances',
  description: 'Learn about how IQ Appliances protects your privacy and handles your personal information. Read our comprehensive privacy policy.',
  openGraph: {
    title: 'Privacy Policy | IQ Appliances',
    description: 'Our commitment to protecting your privacy and personal information.',
    url: 'https://www.iqappliancerepair.com/privacy-policy',
    siteName: 'IQ Appliances',
    images: [
      {
        url: '/images/appliances-repair-service.webp',
        width: 1200,
        height: 630,
        alt: 'IQ Appliances Privacy Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.iqappliancerepair.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Privacy Policy
            </h1>
            
            <div className="space-y-8 text-lg text-gray-700">
              <section>
                <p>
                  IQ Appliances (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates iqappliancerepair.com (the &quot;Site&quot;). We are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our Site or use our services.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">1. Information We Collect</h2>
                <p>We collect information to provide better services to our customers. The types of information we collect include:</p>
                <h3 className="text-xl font-semibold mt-4">a. Personal Information</h3>
                <ul className="list-disc list-inside">
                  <li>Contact Information: Name, email address, phone number, and physical address when provided via contact forms or service requests.</li>
                  <li>Service Information: Details about your appliances, service history, and repair requirements.</li>
                  <li>Payment Information: Credit card or payment details when you pay for our services (processed securely by third-party providers).</li>
                </ul>
                <h3 className="text-xl font-semibold mt-4">b. Non-Personal Information</h3>
                <ul className="list-disc list-inside">
                  <li>Usage Data: We may collect data about how you access and use the Site, such as your IP address, browser type, operating system, and pages visited.</li>
                  <li>Cookies and Tracking Technologies: We use cookies and similar tracking technologies to monitor activity on our Site and store certain information.</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">2. How We Use Your Information</h2>
                <p>We use the collected information for various purposes, including:</p>
                <ul className="list-disc list-inside">
                  <li>To provide and maintain our appliance repair services.</li>
                  <li>To schedule and manage service appointments.</li>
                  <li>To respond to your inquiries and provide customer support.</li>
                  <li>To process your transactions and send related information.</li>
                  <li>To communicate with you about service updates and maintenance tips.</li>
                  <li>To monitor and analyze usage and trends to improve our Site and services.</li>
                  <li>To comply with legal obligations and protect our rights.</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">3. How We Share Your Information</h2>
                <p>We do not sell or rent your personal information. We may share your data in the following ways:</p>
                <ul className="list-disc list-inside">
                  <li>Service Providers: We may share your information with technicians and third-party vendors who help us provide repair services, process payments, or operate the Site.</li>
                  <li>Legal Requirements: We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">4. Cookies and Tracking Technologies</h2>
                <p>Cookies are small files stored on your device that help us enhance your experience on our Site. We use cookies to:</p>
                <ul className="list-disc list-inside">
                  <li>Remember your service preferences and settings.</li>
                  <li>Analyze Site traffic and usage patterns.</li>
                  <li>Improve our service scheduling system.</li>
                </ul>
                <p>You can manage your cookie preferences through your browser settings. However, disabling cookies may affect the functionality of the Site.</p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">5. Security of Your Information</h2>
                <p>We take reasonable precautions to protect your information from unauthorized access, loss, misuse, or alteration. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">6. Your Rights and Choices</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside">
                  <li>Access Your Data: Request access to the personal information we hold about you.</li>
                  <li>Update Your Data: Correct or update your personal information if it is inaccurate or incomplete.</li>
                  <li>Delete Your Data: Request the deletion of your personal information, subject to certain exceptions.</li>
                  <li>Opt-Out: Unsubscribe from marketing communications at any time by following the instructions in the email or contacting us.</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">7. Third-Party Links</h2>
                <p>Our Site may contain links to other websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">8. Children&apos;s Privacy</h2>
                <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a minor, please contact us, and we will take steps to delete it.</p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mt-8">9. Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We encourage you to review this Privacy Policy periodically for any updates.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-8">10. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our practices, please contact us:
                </p>
                <p className="mt-4">
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