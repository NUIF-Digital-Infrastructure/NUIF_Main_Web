import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_6.jpg"

export default function HumanNetworkMaintainerTermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
        image={Background}
        title="Human Network Maintainer"
        subtitle="Terms of Service"
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/tools/humannetworkmaintainer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 transition hover:text-blue-700"
            >
              ← Back
            </Link>

            <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">Human Network Maintainer - Terms of Service</h1>
            <p className="mt-2 text-gray-600">
              <strong>Last updated:</strong> March 2026
            </p>

            <p className="mt-6 text-gray-700">
              Human Network Maintainer is a free Google Sheets add-on that helps users maintain contact reminders. By using this
              add-on, you agree to the following terms.
            </p>

            <section className="mt-8 space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">1. Use of the Add-on</h2>
                <p>
                  Human Network Maintainer is provided as a productivity tool to assist with personal contact reminders. Users are
                  responsible for the data they enter into their spreadsheets.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">2. No Warranty</h2>
                <p>
                  This add-on is provided "as is" without warranties of any kind. The developer makes no guarantees regarding
                  reliability, availability, or accuracy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">3. Limitation of Liability</h2>
                <p>
                  The developer of Human Network Maintainer shall not be held liable for any damages arising from the use or
                  inability to use the add-on.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">4. User Responsibility</h2>
                <p>
                  Users are responsible for maintaining their own data and ensuring that reminder information entered into the
                  spreadsheet is accurate.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">5. Modifications</h2>
                <p>The developer may update or modify the add-on at any time.</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">6. Acceptance</h2>
                <p>By installing or using Human Network Maintainer, you agree to these terms.</p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
