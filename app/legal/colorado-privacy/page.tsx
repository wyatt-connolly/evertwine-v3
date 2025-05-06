import ScrollToTop from "@/components/ScrollToTop"
import Link from "next/link"

export default function ColoradoPrivacyPage() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Colorado Consumer Privacy Notice</h1>
            <p className="text-gray-400">Last updated: April 18, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400">
            <p>
              This notice supplements our general Privacy Policy and applies solely to California and Colorado residents
              as required by the Colorado Privacy Act (CPA), C.R.S. §§ 6-1-1301 et seq.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Controller & Scope</h2>
            <p>
              Evertwine, LLC ("we," "us," or "our") is the data controller for personal data collected through our
              website and mobile application (the "Services"). This notice describes Colorado residents' rights and how
              we process your personal data.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Categories of Personal Data Collected</h2>
            <p>
              Under the CPA, we collect and process the following categories of personal data about Colorado residents:
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-800">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="py-2 px-4 border-b border-r border-gray-800 text-left text-white">Category</th>
                    <th className="py-2 px-4 border-b border-gray-800 text-left text-white">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Identifiers</td>
                    <td className="py-2 px-4">Name, email address, phone number, user ID</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Verification Data</td>
                    <td className="py-2 px-4">Selfie and government-issued ID images (optional)</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Profile & Preference Data</td>
                    <td className="py-2 px-4">
                      Bio text (including any fitness or activity details), filters selected, meetup history
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Location Data</td>
                    <td className="py-2 px-4">GPS coordinates, neighborhood or city-level location</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Usage Data</td>
                    <td className="py-2 px-4">Pages viewed, feature usage, session duration</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Technical Data</td>
                    <td className="py-2 px-4">IP address, device type, operating system</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Communications Data</td>
                    <td className="py-2 px-4">Support inquiries, notifications preferences</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Sources of Personal Data</h2>
            <p>We obtain your personal data directly from you when you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create or update your account</li>
              <li>Enter profile or bio information</li>
              <li>Use or interact with the Services</li>
              <li>Communicate with our support team</li>
            </ul>
            <p className="mt-4">
              We may also collect certain technical and analytics data automatically via cookies and similar
              technologies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Purposes for Processing</h2>
            <p>We process your personal data for these business purposes:</p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-800">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="py-2 px-4 border-b border-r border-gray-800 text-left text-white">Purpose</th>
                    <th className="py-2 px-4 border-b border-gray-800 text-left text-white">CPA Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Provide & operate core features</td>
                    <td className="py-2 px-4">Identifiers, Profile & Preference, Usage, Technical</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">User verification & safety</td>
                    <td className="py-2 px-4">Verification Data, Identifiers</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Personalize recommendations</td>
                    <td className="py-2 px-4">Profile & Preference, Usage</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Security & fraud prevention</td>
                    <td className="py-2 px-4">Identifiers, Usage, Technical</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Customer support & communications</td>
                    <td className="py-2 px-4">Identifiers, Communications</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4 border-r border-gray-800">Compliance & legal obligations</td>
                    <td className="py-2 px-4">Identifiers, Communications</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Colorado Residents' Rights</h2>
            <p>Under the CPA, you have the following rights with respect to your personal data:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Right to Access</strong>
                <p>Request confirmation of whether we process your data and access to a copy.</p>
              </li>
              <li>
                <strong>Right to Correct</strong>
                <p>Request correction of inaccurate personal data.</p>
              </li>
              <li>
                <strong>Right to Delete</strong>
                <p>Request deletion of your personal data, subject to certain exceptions.</p>
              </li>
              <li>
                <strong>Right to Data Portability</strong>
                <p>Request a machine-readable copy of your data.</p>
              </li>
              <li>
                <strong>Right to Opt-Out of Sale or Targeted Advertising</strong>
                <p>
                  You have the right to opt-out if we sell your personal data or use it for targeted advertising.
                  <br />
                  <em>Our Practice: We do not sell personal data or process it for targeted advertising.</em>
                </p>
              </li>
              <li>
                <strong>Right to Non-Discrimination</strong>
                <p>You may not be discriminated against for exercising any of the above rights.</p>
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. How to Exercise Your Rights</h2>
            <p>
              Submit a request by email to{" "}
              <a href="mailto:privacy@evertwine.social" className="text-blue-400 hover:underline">
                privacy@evertwine.social
              </a>{" "}
              with the subject line "CPA Request", and include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your name and email address (must match the account on file)</li>
              <li>The right you wish to exercise (e.g., "Access," "Delete")</li>
              <li>Any relevant details to help us verify your identity and process the request</li>
            </ul>
            <p className="mt-4">
              We will respond within 45 days. We may request additional information to verify your identity but will not
              charge a fee unless permitted by law.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary to fulfill the purposes described above or comply
              with legal obligations. After that, we delete or anonymize your data in a secure manner.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Changes to This Notice</h2>
            <p>
              We may update this notice from time to time. We will post the revised version with a new "Last updated"
              date. Continued use of the Services after changes indicates acceptance.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact Us</h2>
            <p>If you have questions about this Notice or our privacy practices, please contact:</p>
            <p>
              Email:{" "}
              <a href="mailto:privacy@evertwine.social" className="text-blue-400 hover:underline">
                privacy@evertwine.social
              </a>
            </p>

            <p className="mt-8 font-medium">
              Thank you for trusting Evertwine. We're committed to protecting your privacy and giving you control over
              your personal data.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 sm:mb-0">© 2025 Evertwine, LLC. All rights reserved.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/legal/eula" scroll={true} className="text-blue-400 hover:underline text-sm">
                  EULA
                </Link>
                <Link href="/legal/privacy-policy" scroll={true} className="text-blue-400 hover:underline text-sm">
                  Privacy Policy
                </Link>
                <Link href="/legal/cookie-policy" scroll={true} className="text-blue-400 hover:underline text-sm">
                  Cookie Policy
                </Link>
                <Link href="/legal/terms-of-service" scroll={true} className="text-blue-400 hover:underline text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
