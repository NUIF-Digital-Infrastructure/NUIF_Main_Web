import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_6.jpg"

export default function StockComplianceToolAboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
        image={Background}
        title="Stock Compliance Tool"
        subtitle="About the Tool"
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

            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">About the Stock Compliance Tool</h1>
            <p className="mt-2 text-gray-600">
              <strong>Overview & Operational Guidelines</strong>
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed">
              The Stock Compliance Tool is an internal evaluation dashboard developed for the <strong>Newcastle University Investment Fund</strong>.
              It provides compliance officers and analysts with a rigorous, structured 7-step workflow to verify asset eligibility against
              the UK National Security and Investment (NSI) Act, mandate-defined restricted sectors, strict revenue criteria, and comprehensive SRI/ESG principles.
            </p>

            <section className="mt-8 space-y-8 text-gray-700">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">The 7-Step Evaluation Framework</h2>
                <p className="mt-2">
                  The dashboard guides the user through a systematic auditing sequence to ensure compliance with internal fund guidelines and national regulations:
                </p>
                <ol className="list-decimal space-y-3 pl-6 mt-4">
                  <li>
                    <strong>Ticker Initialisation:</strong> Fetches live operational attributes (Sector, Industry, Market Capitalization, and Country of Origin) directly via real-time integration with the Financial Modeling Prep (FMP) API.
                  </li>
                  <li>
                    <strong>UK National Security & Investment (NSI) Act Check:</strong> Cross-references company operations with statutory sensitive domains such as Advanced Materials, AI, Civil Nuclear, Computing Hardware, Quantum Technologies, and Synthetic Biology.
                  </li>
                  <li>
                    <strong>Restricted Sector Revenue Filters:</strong> Evaluates company segment financial distributions against an absolute 10% maximum revenue ceiling for prohibited industries.
                  </li>
                  <li>
                    <strong>Parent & Group Structure Check:</strong> Verifies the ultimate holding company identity, jurisdiction, and consolidated financial positions.
                  </li>
                  <li>
                    <strong>SRI/ESG Mandate Alignment:</strong> Maps and logs alignment with the United Nations Sustainable Development Goals (SDGs 1 through 17).
                  </li>
                  <li>
                    <strong>Qualitative Assessment:</strong> Captures manual auditing evidence, internal references, and localized risk-assessment narratives.
                  </li>
                  <li>
                    <strong>Remediation Logging & Status Declaration:</strong> Finalizes official mitigation actions and formalizes a definitive compliance status: <span className="font-semibold text-green-700">PASS</span>, <span className="font-semibold text-red-700">FAIL</span>, or <span className="font-semibold text-yellow-700">FLAGGED</span>.
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Technical Architecture</h2>
                <p className="mt-2">
                  Built as a high-performance, client-side React component, this application ensures maximum security and data minimization by design:
                </p>
                <ul className="list-disc space-y-2 pl-6 mt-3">
                  <li>
                    <strong>Zero-Persistence Architecture:</strong> Evaluation states, financial summaries, and descriptions exist strictly within the browser session memory (useState). Refreshing or closing the browser tab wipes all work parameters instantaneously.
                  </li>
                  <li>
                    <strong>Direct API Ingestion:</strong> Communicates securely over HTTPS directly from your client browser to the FMP endpoints to source basic asset classifications.
                  </li>
                  <li>
                    <strong>Print-Ready Assessment Reports:</strong> Incorporates localized print styling overrides (window.print()), permitting compliance officers to instantly render, serialize, and print or save comprehensive assessment reports as PDFs for historical record-keeping.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Disclaimer & Use Constraints</h2>
                <p className="mt-2">
                  This tool operates exclusively under a deterministic rule-based calculation framework managed via user inputs and manual override permissions. It contains no automated machine learning components or predictive recommendation logic. Outputs generated do not constitute formal investment advice or legal certifications on behalf of Newcastle University.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
