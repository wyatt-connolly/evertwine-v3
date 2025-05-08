import ScrollToTop from "@/components/ScrollToTop";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-400">Last updated: April 18, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400">
            <p>
              Welcome to Evertwine! These Terms of Service (&quot;Terms&quot;)
              are a binding agreement between you (&quot;User,&quot;
              &quot;you,&quot; or &quot;your&quot;) and Evertwine, LLC
              (&quot;Evertwine,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;). They govern your access to and use of our
              website, mobile application, and related services (collectively,
              the &quot;Services&quot;). By accessing or using the Services, you
              accept and agree to these Terms in full. If you do not agree,
              please discontinue use immediately.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              1. Purpose of Evertwine
            </h2>
            <p>
              Evertwine is an activity-based meetup platform for both casual and
              professional connections. We provide an Interactive Map and List
              View to help you discover and join local coffee meetups, fitness
              classes, networking mixers, and more—so you can spend less time
              messaging and more time meeting face-to-face.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              2. License and Access
            </h2>
            <p>
              We grant you a limited, revocable, non-exclusive license to access
              and use the Services for your personal and professional networking
              only. This license does not allow you to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Copy, modify, distribute, or publicly display any part of the
                Services.
              </li>
              <li>Use the Services for unauthorized commercial purposes.</li>
              <li>Reverse-engineer or attempt to extract source code.</li>
              <li>Violate any applicable laws or regulations.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              3. User Accounts & Verification
            </h2>
            <p>
              To use certain features, you must register and create an account.
              You agree to:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Provide accurate, up-to-date information during registration.
              </li>
              <li>Maintain the security of your account credentials.</li>
              <li>
                Complete verification steps when prompted:
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>
                    ID + Selfie Verification is currently optional for enhanced
                    trust features but will become mandatory for full account
                    activation in the near future.
                  </li>
                  <li>
                    Optional Background Checks will roll out in late 2025.
                  </li>
                  <li>AR-Based Facial Recognition is planned for Q2 2026.</li>
                </ul>
              </li>
            </ol>
            <p className="mt-4">
              Failure to complete mandatory verification once required may limit
              or suspend your ability to use certain features.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              4. User Responsibilities
            </h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep your profile information truthful and current.</li>
              <li>Respect other users&apos; privacy and rights.</li>
              <li>Follow all local, state, federal, and international laws.</li>
              <li>
                Use the Services only as intended—do not exploit or misuse
                features.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              5. Prohibited Activities
            </h2>
            <p>You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Harass, intimidate, or defraud other users.</li>
              <li>Post abusive, defamatory, or infringing content.</li>
              <li>Impersonate any person or entity.</li>
              <li>
                Distribute spam, malware, or unauthorized data-scraping tools.
              </li>
              <li>Host or promote unsafe or unlawful meetups.</li>
              <li>Interfere with the operation or security of the Services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              6. User-Generated Content
            </h2>
            <p>
              When you upload text, photos, or other content (&quot;UGC&quot;),
              you grant Evertwine a non-exclusive, royalty-free, worldwide
              license to display, reproduce, and distribute that UGC in
              connection with the Services. You retain ownership, provided it
              does not infringe others&apos; rights or violate applicable laws.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              7. Operation Through App Stores
            </h2>
            <p>
              Our mobile app is distributed via the Apple App Store and Google
              Play Store. You agree to comply with their respective terms and
              policies in addition to these Terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              8. Termination
            </h2>
            <p>
              We may suspend or terminate your access at our discretion—without
              notice—for violating these Terms or for any other reason. Upon
              termination, your rights under these Terms immediately cease.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              9. Disclaimer of Warranties
            </h2>
            <p className="uppercase">
              THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE.&quot; EVERTWINE DISCLAIMS ALL WARRANTIES, EXPRESS OR
              IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NONINFRINGEMENT. WE DO NOT GUARANTEE UNINTERRUPTED OR
              ERROR-FREE SERVICE.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              10. Limitation of Liability
            </h2>
            <p className="uppercase">
              TO THE FULLEST EXTENT PERMITTED BY LAW, EVERTWINE SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES ARISING FROM YOUR USE OF THE SERVICES.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              11. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Evertwine and its
              affiliates from any claim or demand, including reasonable
              attorneys&apos; fees, arising from your breach of these Terms or
              your misuse of the Services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              12. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms are governed by the laws of the State of Nevada,
              without regard to its conflict-of-law rules. Any dispute must be
              brought exclusively in the state or federal courts located in
              Nevada.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              13. Changes to These Terms
            </h2>
            <p>
              We may update these Terms for operational, legal, or regulatory
              reasons. Substantial changes will be communicated via the app or
              email. Continued use after an update constitutes acceptance of the
              revised Terms.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              14. Contact Information
            </h2>
            <p>
              For questions or disputes, please contact us at:
              <br />
              <a
                href="mailto:support@evertwine.social"
                className="text-blue-400 hover:underline"
              >
                support@evertwine.social
              </a>
            </p>

            <p className="mt-8 font-medium text-white">
              Thank you for choosing Evertwine, where real connections happen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
