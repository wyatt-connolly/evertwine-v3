import ScrollToTop from "@/components/ScrollToTop"

export default function EulaPage() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">End User License Agreement (EULA)</h1>
            <p className="text-gray-400">Last updated: April 18, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400">
            <p>
              This End User License Agreement ("EULA") is a legal contract between you ("User," "you," or "your") and
              Evertwine, LLC ("Evertwine," "we," "us," or "our") governing your use of our website, mobile application,
              and related services (collectively, the "Services"). By accessing or using the Services, you agree to this
              EULA in full and to comply with all other Evertwine policies—including our Privacy Policy, Terms of
              Service, Cookie Policy, and any other guidelines or rules we publish. If you do not agree, do not use the
              Services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. License Grant</h2>
            <p>
              Subject to your compliance with this EULA, Evertwine grants you a limited, non-exclusive,
              non-transferable, revocable license to access and use the Services for personal and professional
              networking. This license does not permit you to:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Modify, reproduce, distribute, or publicly display any part of the Services.</li>
              <li>Use the Services for unauthorized commercial purposes.</li>
              <li>Decompile, reverse-engineer, or extract source code.</li>
              <li>Violate any applicable laws or regulations.</li>
            </ol>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Operation Through App Stores</h2>
            <p>Our mobile app is available via the Apple App Store and Google Play Store. You must also comply with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Apple App Store Terms:</strong> All guidelines on privacy, security, and content.
              </li>
              <li>
                <strong>Google Play Developer Policies:</strong> All requirements for functionality, content, and
                security.
              </li>
            </ul>
            <p>Non-compliance may result in suspension or removal from those platforms.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Obligations</h2>
            <p>You agree to:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Provide Accurate Information:</strong> Registration and profile details must be truthful and up
                to date.
              </li>
              <li>
                <strong>Maintain Account Security:</strong> Safeguard your credentials and report any unauthorized
                access.
              </li>
              <li>
                <strong>Follow All Laws:</strong> Comply with local, state, federal, and international laws.
              </li>
              <li>
                <strong>Respect Others:</strong> Treat all users courteously; do not infringe on their rights.
              </li>
              <li>
                <strong>Avoid Prohibited Content:</strong> Do not post abusive, defamatory, infringing, or unlawful
                material.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Prohibited Uses</h2>
            <p>You may not use Evertwine to:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Engage in fraud, harassment, or other harmful conduct.</li>
              <li>Distribute spam, malware, or malicious software.</li>
              <li>Impersonate individuals or misrepresent affiliations.</li>
              <li>Scrape, harvest, or collect data without permission.</li>
              <li>Host or promote unlawful or unsafe meetups.</li>
              <li>Interfere with platform operations or security.</li>
            </ol>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. User-Generated Content</h2>
            <p>
              By posting content ("UGC"), you grant Evertwine a worldwide, non-exclusive, royalty-free license to use,
              display, reproduce, and distribute your UGC in connection with the Services. You retain ownership, but you
              represent that your UGC does not violate any rights or laws. We may remove any UGC that breaches these
              terms without notice.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Ownership & Intellectual Property</h2>
            <p>
              All aspects of the Services—text, graphics, logos, software, and data—are owned by Evertwine or our
              licensors and protected by copyright, trademark, and other laws. You agree not to use, copy, or create
              derivative works without our prior written permission.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Agreement to Other Policies</h2>
            <p>
              Your use of Evertwine is also governed by our Privacy Policy, Cookie Policy, Terms of Service, and any
              other policies we publish. By using the Services, you acknowledge that you have read, understood, and
              agreed to be bound by all such policies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Meetup Risk & Liability Disclaimer</h2>
            <p>
              While we strive to maintain industry-leading safety standards—including mandatory ID + selfie
              verification—meetups are organized and attended by users in real-world settings. You assume all risks
              associated with attending or hosting any meetup. Evertwine is not responsible for any injury, loss, or
              damage arising out of or in connection with meetups or in-person interactions facilitated through the
              Services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Termination</h2>
            <p>
              We may suspend or terminate your access at any time, with or without cause. Upon termination, your license
              ends immediately. Sections 5 (UGC), 6 (Ownership), 8 (Liability Disclaimer), 9 (Termination), 11
              (Indemnification), and 12 (Governing Law) survive termination.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Disclaimers & Limitation of Liability</h2>
            <p>
              <strong>Disclaimer of Warranties:</strong> The Services are provided "as is" and "as available," without
              warranties of any kind.
            </p>
            <p>
              <strong>Limitation of Liability:</strong> To the fullest extent permitted by law, Evertwine will not be
              liable for any indirect, incidental, special, or consequential damages arising from your use of the
              Services including meetups-related incidents even if advised of the possibility.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Evertwine, its affiliates, officers, and employees from any
              claims, damages, or expenses (including attorneys' fees) arising out of your breach of this EULA, your use
              of the Services, or your participation in any meetups.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">12. Governing Law & Dispute Resolution</h2>
            <p>
              This EULA is governed by Nevada law, without regard to conflict-of-law principles. All disputes must be
              resolved exclusively in the state or federal courts in Nevada. You consent to jurisdiction and venue in
              those courts.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">13. Changes to This EULA</h2>
            <p>
              We may update this EULA for legal, operational, or regulatory reasons. We will notify you of significant
              changes by posting the revised EULA with a new "Last updated" date. Continued use after changes indicates
              acceptance.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">14. Contact Information</h2>
            <p>For questions or concerns about this EULA, please contact:</p>
            <p>
              <a href="mailto:support@evertwine.social" className="text-blue-400 hover:text-blue-300 underline">
                support@evertwine.social
              </a>
            </p>

            <p className="mt-8 font-medium text-white">
              Thank you for using Evertwine. We're committed to providing a safe, engaging, and reliable platform for
              real-world connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
