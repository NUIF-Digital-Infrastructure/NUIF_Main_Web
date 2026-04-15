import Link from "next/link"

import { teamPageContent } from "@/data/our-team"

export default function HumanNetworkMaintainerPage() {
  const developer = teamPageContent.members.digitalInfrastructure.find(({ name }) =>
    name.toLowerCase().includes("samraat jain"),
  )
  const developerDisplayName = developer?.name.replace(/\s*\(.+\)$/, "") ?? "Samraat Jain"

  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-6">
        <div>
          <Link
            href="/tools"
            className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-100 hover:text-indigo-700"
          >
            Back to Tools
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Digital Infrastructure</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Human Network Maintainer</h1>
          </div>
          <div className="flex gap-3 text-sm font-semibold text-indigo-600">
            <Link href="/tools/humannetworkmaintainer/privacy-policy" className="hover:text-indigo-500">
              Privacy Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/tools/humannetworkmaintainer/terms-of-service" className="hover:text-indigo-500">
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
          {developer ? (
            <p className="mt-2 text-lg text-gray-900">
              {" "}
              <Link
                href={developer.link}
                className="text-indigo-600 underline decoration-indigo-200 underline-offset-4 transition hover:text-indigo-500"
                target="_blank"
                rel="noreferrer"
              >
                {developerDisplayName} | Contact: samraat1official8@gmail.com
              </Link>
            </p>
          ) : (
            <p className="mt-2 text-lg text-gray-700">Developer(s): Samraat Jain</p>
          )}
        </section>
      </div>
    </main>
  )
}
