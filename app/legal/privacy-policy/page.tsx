import ScrollToTop from "@/components/ScrollToTop";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400">Last updated: April 18, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400">
            <p>
              Welcome to Evertwine! Your privacy and the security of your
              personal information are our top priorities. This Privacy Policy
              explains how Evertwine, LLC (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) collects, uses, shares, and protects information
              when you use our website, mobile application, and related services
              (collectively, the &quot;Services&quot;). By accessing or using
              the Services, you agree to this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              1. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">
              A. Personal Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account Details:</strong> Name, email address, phone
                number, profile photo.
              </li>
              <li>
                <strong>Verification Data:</strong> Selfie + ID documents
                (optional today, becoming mandatory for full account
                activation), background check data (optional, launching late
                2025), AR-face data (planned Q2 2026).
              </li>
              <li>
                <strong>Location Data:</strong> GPS coordinates or approximate
                location to power our Interactive Map and List View.
              </li>
              <li>
                <strong>Usage & Preferences:</strong> Filters you set, events
                you join or host, message and connection history.
              </li>
              <li>
                <strong>Support & Communications:</strong> Correspondence with
                our support team, survey responses.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">
              B. Non-Personal Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Technical Data:</strong> Device type, operating system,
                browser version, IP address.
              </li>
              <li>
                <strong>Analytics Data:</strong> Feature usage, crash reports,
                performance logs collected via cookies, SDKs, and similar
                technologies.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Provide & Improve Services</strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>
                    Deliver core functionality (map, event discovery,
                    messaging).
                  </li>
                  <li>
                    Analyze usage to optimize performance and develop new
                    features.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Enhance Trust & Security</strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Verify identities and detect fraud or misuse.</li>
                  <li>
                    Monitor for suspicious behavior and enforce our Terms of
                    Service.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Personalize Your Experience</strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Remember preferences and recommend relevant meetups.</li>
                  <li>Tailor in-app prompts based on your activity.</li>
                </ul>
              </li>
              <li>
                <strong>Communicate with You</strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>
                    Send account notifications, feature announcements, and
                    critical security alerts.
                  </li>
                  <li>
                    Provide customer support and respond to your inquiries.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Legal & Compliance</strong>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Respond to lawful requests by public authorities.</li>
                  <li>
                    Enforce our Terms, protect rights, and comply with
                    applicable laws.
                  </li>
                </ul>
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              3. Cookies & Tracking Technologies
            </h2>
            <p>We use cookies, web beacons, and SDKs to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your login and preferences.</li>
              <li>Measure feature adoption and app performance.</li>
              <li>Detect and prevent security threats.</li>
            </ul>
            <p className="mt-4">
              You can manage cookies through your browser or device settings.
              Disabling cookies may limit certain features.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              4. Information Sharing & Disclosure
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> We share data with vendors
                who help operate the app (e.g., hosting, analytics, verification
                services).
              </li>
              <li>
                <strong>Legal Requirements:</strong> We disclose data to comply
                with subpoenas, court orders, or legal processes.
              </li>
              <li>
                <strong>Business Transfers:</strong> If Evertwine is acquired or
                merges, user data may be transferred under the same privacy
                commitments.
              </li>
              <li>
                <strong>Aggregate or De-identified Data:</strong> We may share
                insights that do not identify individual users.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              5. Your Privacy Rights
            </h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information.</li>
              <li>Correct or update inaccuracies.</li>
              <li>Delete your account and personal data.</li>
              <li>Restrict or object to certain processing activities.</li>
              <li>Port your data to another service.</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:support@evertwine.social"
                className="text-blue-400 hover:underline"
              >
                support@evertwine.social
              </a>
              . We may verify your identity before fulfilling requests.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              6. Data Security
            </h2>
            <p>We implement industry-standard safeguards, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit (TLS) and at rest.</li>
              <li>
                Access Controls limiting internal access to authorized
                personnel.
              </li>
              <li>Regular Audits and penetration testing.</li>
            </ul>
            <p className="mt-4">
              While we strive to protect your data, no system is entirely immune
              to breach. We will notify you promptly if a security incident
              affects your personal information.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              7. Data Retention
            </h2>
            <p>We retain your personal data only as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide the Services.</li>
              <li>Comply with legal obligations.</li>
              <li>Resolve disputes or enforce our agreements.</li>
            </ul>
            <p className="mt-4">
              When data is no longer needed, we securely delete or anonymize it.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              8. International Transfers
            </h2>
            <p>
              Currently, all data is collected, processed, and stored within the
              United States. Should we expand internationally or transfer data
              across borders, we will implement appropriate safeguards (e.g.,
              Standard Contractual Clauses) and update this policy accordingly.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Evertwine is intended for users aged 18 and above. We do not
              knowingly collect personal data from anyone under 18. If we learn
              we have collected data from a minor, we will promptly delete it.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy to reflect changes in our
              practices or legal requirements. We will post the revised policy
              with a new &quot;Last updated&quot; date and, where required by
              law, notify you of significant changes. Continued use of the
              Services after such updates constitutes acceptance of the revised
              policy.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              11. Contact Us
            </h2>
            <p>
              If you have questions, requests, or concerns about this Privacy
              Policy or our data practices, please reach out to:
            </p>
            <p>
              <a
                href="mailto:support@evertwine.social"
                className="text-blue-400 hover:underline"
              >
                support@evertwine.social
              </a>
            </p>

            <p className="mt-8 font-medium">
              Thank you for trusting Evertwine with your information. We&apos;re
              committed to keeping your data safe and your experience secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
