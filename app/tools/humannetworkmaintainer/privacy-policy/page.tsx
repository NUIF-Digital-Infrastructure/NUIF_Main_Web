export default function HumanNetworkMaintainerPrivacyPolicyPage() {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold text-gray-900">Human Network Maintainer - Privacy Policy</h1>
        <p className="mt-2 text-gray-600">
          <strong>Last updated:</strong> March 2026
        </p>

        <p className="mt-6 text-gray-700">
          Human Network Maintainer is a Google Sheets add-on designed to help users maintain personal and professional
          relationships by sending reminder notifications.
        </p>

        <section className="mt-8 space-y-4 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
            <p>
              Human Network Maintainer does not collect, store, or transmit personal data outside of the user&apos;s Google
              account. The add-on only accesses information within the user&apos;s Google Sheet in order to perform reminder
              calculations.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Spreadsheet data entered by the user</li>
              <li>The user&apos;s email address (to send reminder notifications)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">2. How Information Is Used</h2>
            <p>The data accessed by the add-on is used solely to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Generate reminder notifications</li>
              <li>Send reminder emails to the email address configured by the user</li>
            </ul>
            <p>No information is stored on external servers or shared with third parties.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">3. Data Storage, Retention, and Deletion</h2>
            <div className="space-y-4">
              <p>
                <strong>Data Storage:</strong> Human Network Maintainer does not maintain an external database. All user data
                (contact names, dates, and email addresses) resides exclusively within your own Google Spreadsheet.
              </p>
              <p>
                <strong>Data Retention:</strong> We do not retain any Google user data on our own infrastructure. Data is only
                accessed in real time within your Google account to execute the script&apos;s functions (e.g., sending reminders).
                Once the script execution is complete, no data is held by the application.
              </p>
              <p>
                <strong>Data Deletion:</strong> Because the data is stored within your Google Sheet, you can delete the data at
                any time by clearing the cells in the spreadsheet. To completely remove the application&apos;s access to your data,
                you may uninstall the add-on or revoke its permissions via the
                <a
                  href="https://myaccount.google.com/connections?filters=3,4&hl=en"
                  className="text-primary underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Security Settings page
                </a>
                .
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">4. Third-Party Services</h2>
            <p>This add-on uses Google services such as Google Sheets and Gmail APIs in order to function.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">5. Changes to This Policy</h2>
            <p>This policy may be updated periodically. Updates will be reflected on this page.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">6. Contact</h2>
            <p>If you have questions about this policy, contact the developer of Human Network Maintainer.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
