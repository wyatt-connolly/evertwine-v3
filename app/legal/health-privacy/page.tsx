import ScrollToTop from "@/components/ScrollToTop"

export default function HealthPrivacyPage() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Consumer Health Data Privacy Policy</h1>
            <p className="text-gray-400">Last updated: April 18, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400">
            <p>
              Evertwine, LLC ("we," "us," or "our") respects your privacy and wants you to feel comfortable sharing any
              personal details you choose—like fitness goals or activity habits—in your profile bio. This Consumer
              Health Data Privacy Policy describes how we handle voluntary health-related information you enter. It
              supplements our general Privacy Policy and Terms of Service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. What Information Is Covered?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Self-Reported Activity Details:</strong> Anything you choose to write in your profile or bio
                about your exercise, step counts, wellness routines, or other fitness habits (e.g., "I run 2 miles
                daily," "I hit 10,000 steps each day").
              </li>
              <li>
                <strong>No Sensor or Device Data:</strong> We do not automatically collect data from wearables, health
                apps, or sensors. All health-related details are provided at your discretion.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Self-Reported Health Details</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Profile Display & Matching</strong>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>We show your bio text to other users so they can learn about shared interests.</li>
                  <li>
                    Optional filters may use keywords from bios (e.g., "running group") to help match you with relevant
                    meetups.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Personalization</strong>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>
                    We may suggest events (e.g., running clubs, fitness meetups) if your bio indicates those interests.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Internal Analytics (Aggregated & Anonymous)</strong>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>
                    We may tally how many users mention "hiking" or "yoga" to guide feature development—but never link
                    that aggregate data back to your identity.
                  </li>
                </ul>
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Sharing & Disclosure</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Within Evertwine:</strong> Your self-written health details appear only in your profile and
                within the app when other users view your bio.
              </li>
              <li>
                <strong>No Third-Party Sales:</strong> We never sell or share your health-related bio text to
                advertisers or external marketers.
              </li>
              <li>
                <strong>Legal Requests:</strong> Only if required by law (e.g., valid court order) would we disclose any
                part of your profile text, including self-reported health details.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Your Choices & Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Opt Out of Display:</strong> Remove or edit any health-related content from your bio at any time
                via your profile settings.
              </li>
              <li>
                <strong>Data Portability:</strong> You can copy and save your profile text, including any health details
                you provided.
              </li>
              <li>
                <strong>Account Deletion:</strong> Deleting your account removes your entire profile, including
                self-reported health information.
              </li>
            </ul>
            <p className="mt-4">
              To exercise these rights, go to your account settings or contact{" "}
              <a href="mailto:support@evertwine.social" className="text-blue-400 hover:underline">
                support@evertwine.social
              </a>
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Data Security & Retention</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Security Measures:</strong> We encrypt your profile data in transit (TLS) and at rest, and
                restrict internal access to authorized staff only.
              </li>
              <li>
                <strong>Retention Period:</strong> We keep your profile text as long as your account is active. If you
                delete your account, we remove your profile data within 30 days (aside from brief backups which are
                purged within 90 days).
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Changes to This Policy</h2>
            <p>
              We may update this policy to reflect new features or legal requirements. We will post the revised version
              with a new "Last updated" date. Continued use of health-related features constitutes acceptance.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Contact Us</h2>
            <p>
              Questions or concerns? Reach out to{" "}
              <a href="mailto:support@evertwine.social" className="text-blue-400 hover:underline">
                support@evertwine.social
              </a>
              . We're committed to keeping your voluntary health details private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
