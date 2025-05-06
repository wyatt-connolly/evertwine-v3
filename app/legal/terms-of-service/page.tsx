import ScrollToTop from "@/components/ScrollToTop"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last updated: April 18, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400">
            <p>
              Welcome to Evertwine! These Terms of Service ("Terms") are a binding agreement between you ("User," "you,"
              or "your") and Evertwine, LLC ("Evertwine," "we," "us," or "our"). They govern your access to and use of
              our website, mobile application, and related services (collectively, the "Services"). By accessing or
              using the Services, you accept and agree to these Terms in full. If you do not agree, please discontinue
              use immediately.
            </p>

            {/* Additional content continues... */}
          </div>
        </div>
      </div>
    </div>
  )
}
