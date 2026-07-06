import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_6.jpg"

export default function StockComplianceToolPrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
        image={Background}
        title="Stock Compliance Tool"
        subtitle="Privacy Policy"
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/tools/stockcompliancetool"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 transition hover:text-blue-700"
            >
              ← Back
            </Link>

            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">Stock Compliance Tool - Privacy Policy</h1>
            <p className="mt-2 text-gray-600">
              <strong>Last updated:</strong> May 2026
            </p>

            <p className="mt-6 text-gray-700">
              The Stock Compliance Tool is an internal evaluation dashboard developed for the Newcastle University Investment Fund.
              It provides a 7-step compliance workflow based on the UK National Security and Investment (NSI) Act, restricted sectors, and SRI/ESG mandates.
              The application processes stock evaluation data entirely client-side as a static web experience and does not require user accounts.
            </p>

            <section className="mt-8 space-y-4 text-gray-700">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">1. Information Processed and Collected</h2>
                <p>
                  We prioritize data minimization. The tool operates primarily within your local browser ecosystem:
                </p>
                <ul className="list-disc space-y-2 pl-6 mt-2">
                  <li>
                    <strong>Ticker Queries:</strong> When you input a stock ticker, the application communicates directly with the Financial Modeling Prep (FMP) API (financialmodelingprep.com) from your browser to pull basic company data, sectors, and metrics.
                  </li>
                  <li>
                    <strong>User-Provided Financial and Qualitative Inputs:</strong> All segment revenue values, parent group financials, SDG goals, evidence descriptions, and remediation notes remain purely inside your local browser memory state. They are not submitted or transmitted back to our application servers.
                  </li>
                  <li>
                    <strong>Standard Server Logs:</strong> Basic, non-identifying technical metadata (such as IP address and user-agent string) may be stored in short-term infrastructure access logs standard to our static hosting provider.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">2. How Information Is Used</h2>
                <p>
                  Any information processed is exclusively used to calculate compliance statuses (PASS, FAIL, FLAGGED, or N/A), evaluate the 10% revenue threshold rules, map selected UN Sustainable Development Goals (SDGs), and render the printable compliance assessment report. We do not engage in analytics monitoring, user tracking, profiling, or monetization.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">3. Third-Party Data Sharing</h2>
                <p>
                  Your stock ticket queries are relayed directly to the Financial Modeling Prep API to source company profile definitions. No confidential asset valuations, portfolio holdings, or manual auditing justifications are shared with third parties or external providers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">4. Data Storage, Retention, and Deletion</h2>
                <div className="space-y-4">
                  <p>
                    <strong>Data Storage & Retention:</strong> We do not store or persist evaluation data. All dashboard states, compliance report models, and inputs are volatile and held inside the stateful lifecycle of your browser tab session.
                  </p>
                  <p>
                    <strong>Data Deletion:</strong> Closing your browser tab or refreshing the page instantly purges all inputs, financial figures, and generated assessment parameters.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">5. Data Security</h2>
                <p>
                  Because data stays local to your client runtime, the primary layer of security relies on your machine’s safety and standard encrypted transport protocols (HTTPS) utilized to connect with the hosting infrastructure and external stock profiling services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">6. AI/ML Disclosure</h2>
                <p>
                  The Stock Compliance Tool utilizes a strict rule-based checking engine based on fixed revenue filters and manual overrides. No user text justifications, corporate figures, or decision logs are captured, aggregated, or processed to train, refine, or evaluate machine learning configurations or artificial intelligence models.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">7. Changes to This Policy</h2>
                <p>This policy is maintained by the Digital Infrastructure team and may be altered to match internal audit mandates. Changes become functional immediately upon page re-compilation.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">8. Contact</h2>
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
