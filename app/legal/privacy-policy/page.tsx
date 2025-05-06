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
              explains how Evertwine, LLC (&apos;we,&apos; &apos;us,&apos; or
              &apos;our&apos;) collects, uses, shares, and protects information
              when you use our website, mobile application, and related services
              (collectively, the &apos;Services&apos;). By accessing or using
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

            {/* Additional content continues... */}
          </div>
        </div>
      </div>
    </div>
  );
}
