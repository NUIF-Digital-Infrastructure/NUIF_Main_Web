import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_6.jpg"

export default function NewsImpactCalculatorPrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
        image={Background}
        title="News Impact Calculator"
        subtitle="Privacy Policy"
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/tools/newsimpactcalculator"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 transition hover:text-blue-700"
            >
              ← Back
            </Link>

            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">News Impact Calculator - Privacy Policy</h1>
            <p className="mt-2 text-gray-600">
              <strong>Last updated:</strong> May 2026
            </p>

            <p className="mt-6 text-gray-700">
              News Impact Calculator is a research prompt module designed to help users structure analysis of how news events
              may affect equities. The tool is delivered as a static web experience and does not require user accounts.
            </p>

            <section className="mt-8 space-y-4 text-gray-700">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
                <p>
                  We do not collect, store, or transmit personal data. The News Impact Calculator runs in your browser and
                  provides a prompt template; no inputs are sent to our servers as part of the tool&apos;s normal operation.
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Optional clipboard content if you choose to copy the prompt using the built-in button</li>
                  <li>Standard web access logs that may be recorded by the hosting provider</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">2. How Information Is Used</h2>
                <p>
                  Clipboard access is used only to copy the prompt text when you click the copy button. We do not use the data
                  for advertising, analytics, profiling, or any other unrelated purpose.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">3. Data Sharing</h2>
                <p>
                  We do not sell or share personal data. If you choose to use the prompt with third-party AI tools or external
                  sites linked on the page, your data is governed by those services&apos; privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">4. Data Storage, Retention, and Deletion</h2>
                <div className="space-y-4">
                  <p>
                    <strong>Data Storage:</strong> We do not store user-provided content. The prompt is displayed locally in your
                    browser.
                  </p>
                  <p>
                    <strong>Data Retention:</strong> We do not retain user-provided content. Any copies you make of the prompt are
                    stored only in your clipboard or wherever you paste it.
                  </p>
                  <p>
                    <strong>Data Deletion:</strong> Clear your clipboard or any saved copies of the prompt to remove local copies.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">5. Data Security</h2>
                <p>
                  We do not process personal data or store user content. Standard web security practices apply to the hosting
                  environment that serves this page.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">6. AI/ML Disclosure</h2>
                <p>
                  We do not use any user-provided data to train, retrain, or fine-tune Artificial Intelligence or Machine Learning
                  models.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">7. External Links</h2>
                <p>
                  The News Impact Calculator references third-party tools and websites for convenience. We are not responsible for
                  the privacy practices or content of those services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">8. Changes to This Policy</h2>
                <p>This policy may be updated periodically. Updates will be reflected on this page.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">9. Contact</h2>
                <p>If you have questions about this policy, contact the Digital Infrastructure team.</p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
