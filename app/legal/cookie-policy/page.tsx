import ScrollToTop from "@/components/ScrollToTop"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Cookie Policy</h1>
            <p className="text-gray-400">Last updated: April 18, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400">
            <p>
              Evertwine ("we," "us," or "our") uses cookies and similar technologies to make our website and mobile app
              work, to improve performance, and to enhance your experience. This Cookie Policy explains what these
              technologies are, why we use them, and your choices regarding their use. For more details on how we handle
              your data generally, please see our Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit our
              website or use our mobile application. They store information about your activity and preferences.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Essential Cookies</strong>
                <p>
                  Necessary for basic site and app functionality—enabling secure log-in, session management, and core
                  features.
                </p>
              </li>
              <li>
                <strong>Analytical/Performance Cookies</strong>
                <p>
                  Collect anonymous data on how you interact with Evertwine (e.g., pages visited, errors encountered) so
                  we can optimize performance and usability.
                </p>
              </li>
              <li>
                <strong>Functionality Cookies</strong>
                <p>
                  Remember choices you make (e.g., language or region) to personalize your experience and speed up your
                  next visit.
                </p>
              </li>
              <li>
                <strong>Security Cookies</strong>
                <p>
                  Support fraud prevention and account-protection measures, such as login monitoring and breach
                  detection.
                </p>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. How We Use Cookies</h2>
            <p>We deploy cookies to:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Enable Core Functionality</strong>
                <p>Keep you signed in, secure your sessions, and power interactive features.</p>
              </li>
              <li>
                <strong>Improve Performance</strong>
                <p>Analyze usage patterns and troubleshoot issues.</p>
              </li>
              <li>
                <strong>Personalize Your Experience</strong>
                <p>Remember your settings and deliver content that matches your preferences.</p>
              </li>
              <li>
                <strong>Protect Security</strong>
                <p>Detect suspicious activity and help prevent unauthorized access.</p>
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies in Our Mobile Applications</h2>
            <p>While traditional cookies are web-based, our mobile apps use similar technologies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Local Storage</strong>
                <p>Retains user preferences and settings on your device.</p>
              </li>
              <li>
                <strong>Web Beacons & SDKs</strong>
                <p>Track in-app interactions and performance metrics.</p>
              </li>
              <li>
                <strong>Device Fingerprinting</strong>
                <p>Gathers non-personal device details to help prevent fraud.</p>
              </li>
            </ul>
            <p>These function like cookies, improving app stability and customizing your experience.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Third-Party Cookies & Tracking Technologies</h2>
            <p>
              We partner with trusted analytics providers who set their own cookies and use tracking tools to gather
              aggregate data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Analytics</li>
              <li>Firebase Analytics</li>
            </ul>
            <p>
              These services help us understand overall usage trends; they do not collect personally identifiable
              information unless you have given consent elsewhere.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. No Advertising or Targeting Cookies</h2>
            <p>
              Evertwine does not use cookies for advertising or cross-site tracking. You will not be served targeted ads
              based on your activity in our Services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Managing Your Cookie Preferences</h2>
            <p>Most browsers and devices allow you to control cookies via settings:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Browser Settings:</strong> Block or delete cookies in Chrome, Safari, Firefox, Edge, etc.
              </li>
              <li>
                <strong>Device Settings:</strong> On mobile, adjust privacy and storage settings to limit local data.
              </li>
            </ul>
            <p>Disabling certain cookies may prevent features from working properly.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Changes to This Cookie Policy</h2>
            <p>
              We may update this policy to reflect new technologies, legal requirements, or operational changes.
              Significant revisions will be noted by updating the "Last updated" date. Your continued use of our
              Services after changes indicates your acceptance.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact Us</h2>
            <p>If you have questions about our use of cookies, please reach out to:</p>
            <p>
              <a href="mailto:support@evertwine.social" className="text-blue-400 hover:text-blue-300 underline">
                support@evertwine.social
              </a>
            </p>
            <p className="mt-4">
              Thank you for choosing Evertwine. We're committed to protecting your privacy and delivering a seamless,
              personalized experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
