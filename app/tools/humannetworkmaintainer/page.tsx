import Link from "next/link"

export default function HumanNetworkMaintainerPage() {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-6">
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
      </div>
    </main>
  )
}
