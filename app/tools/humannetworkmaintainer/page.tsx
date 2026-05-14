import Link from "next/link"

import { teamPageContent } from "@/data/our-team"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HumanNetworkMaintainerPage() {
  const developer = teamPageContent.members.digitalInfrastructure.find(({ name }) =>
    name.toLowerCase().includes("samraat jain"),
  )
  const developerDisplayName = developer?.name.replace(/\s*\(.+\)$/, "") ?? "Samraat Jain"

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="bg-white pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 transition hover:text-blue-700"
            >
              ← Back
            </Link>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-900">Digital Infrastructure</p>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Human Network Maintainer</h1>
            </div>
            <div className="flex gap-3 text-sm font-semibold text-blue-900">
              <Link href="/tools/humannetworkmaintainer/privacy-policy" className="hover:text-blue-700 transition">
                Privacy Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/tools/humannetworkmaintainer/terms-of-service" className="hover:text-blue-700 transition">
                Terms of Service
              </Link>
            </div>
          </div>

          <section className="mt-10 space-y-4 text-lg text-gray-700">
            <p>
              Human Network Maintainer is a lightweight Google Sheets add-on that keeps meaningful relationships from
              slipping through the cracks. The tool reviews your contact spreadsheet, calculates when it&apos;s time to reach
              out again, and sends gentle reminders to help you stay consistent with personal and professional follow-ups.
            </p>
            <p>
              Built by the Newcastle University Investment Fund&apos;s Digital Infrastructure team, the add-on focuses on
              privacy-first data practices, running entirely within your Google Workspace so your contact information never
              leaves your control.
            </p>
          </section>

          <section className="mt-12 rounded-lg border border-gray-200 bg-gray-50 px-6 py-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-600">Developed and maintained by for the Newcastle University Investment Fund: </h2>
            
            <p className="mt-4 text-lg font-semibold text-gray-900">Developer(s)</p>
            <ul className="mt-2 space-y-2 text-lg text-gray-900">
              <li>
                <Link
                  href="https://www.linkedin.com/in/james-delin-89b737394/"
                  className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  James Delin
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/ryan-duong-97b960328/"
                  className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ryan Duong
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/sarahr15/"
                  className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sarah Rafiepour
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/shalom-ademuwagun-a7318420a/"
                  className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  Shalom Ademuwagun
                </Link>
              </li>
            </ul>

            {developer ? (
              <p className="mt-6 text-lg text-gray-900">
                <span className="font-semibold">Publisher</span>
              </p>
            ) : null}
            
            {developer ? (
              <p className="mt-2 text-lg text-gray-900">
                <Link
                  href={developer.link}
                  className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  {developerDisplayName} | Contact: samraat1official8@gmail.com
                </Link>
              </p>
            ) : null}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
