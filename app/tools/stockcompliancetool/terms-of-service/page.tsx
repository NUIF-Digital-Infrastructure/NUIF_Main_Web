import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_6.jpg"

export default function StockComplianceToolTermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
        image={Background}
        title="Stock Compliance Tool"
        subtitle="Terms of Service"
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

            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">Stock Compliance Tool - Terms of Service</h1>
            <p className="mt-2 text-gray-600">
              <strong>Last updated:</strong> May 2026
            </p>

            <p className="mt-6 text-gray-700">
              The Stock Compliance Tool is an internal evaluation application designed for the Newcastle University Investment Fund. By using this web dashboard, you agree to comply with the following operational rules and stipulations.
            </p>

            <section className="mt-8 space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">1. Internal Fund Evaluation Use</h2>
                <p>
                  This tool provides a 7-step internal validation check evaluating corporate eligibility based on the UK National Security and Investment (NSI) Act, restricted market sectors, 10% structural revenue filters, and SRI/ESG sustainable asset mandates.
                </p>
                <p className="mt-2">
                  <strong>No Financial Advice Disclaimer:</strong> This application is structured for administrative documentation and organizational due-diligence verification. All calculated outcomes, passing parameters, and validation models are for internal processing logic and do NOT constitute professional investment advice, legal compliance certifications, or official public financial recommendations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">2. Accuracy and Data Dependability</h2>
                <p>
                  Ticker queries leverage external server requests directly to the Financial Modeling Prep (FMP) API runtime (financialmodelingprep.com). We render data models as fetched and accept no liability for external latency, stale profiles, unexpected financial ticker misalignments, missing metrics, or downstream disruptions caused by server errors originating from the provider.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">3. Officer and User Responsibility</h2>
                <p>
                  Compliance officers and fund operators are fully responsible for validating the precision of segment financial figures inputted into the system. All qualitative justifications, text citations, manually toggled UN Sustainable Development Goals (SDGs), and custom compliance override selections remain the absolute execution liability of the operating individual.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">4. Volatile State State and Local Output</h2>
                <p>
                  This platform works strictly inside volatile local React components. No tracking parameters, data structures, or report states are saved to persistent cloud networks. Closing or re-instantiating the browser page immediately triggers complete and permanent deletion of current working parameters. It is the user’s responsibility to manually execute browser print formatting options (window.print()) if hard-copy or PDF documentation archives are needed.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">5. Operational Availability</h2>
                <p>
                  The static application experience is provided "as is". The internal infrastructure team preserves the authority to adjust evaluation mechanisms, rewrite input fields, change underlying threshold rules, or revoke access options at any point without advance notification.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">6. Acceptance</h2>
                <p>By executing corporate queries or operating evaluation steps inside the Stock Compliance Tool, you affirm your alignment with these terms.</p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
