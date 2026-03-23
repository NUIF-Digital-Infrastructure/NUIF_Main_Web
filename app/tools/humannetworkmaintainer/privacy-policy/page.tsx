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
          relationships by sending reminder notifications in a secure and privacy-conscious manner.
        </p>

        <section className="mt-8 space-y-4 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
            <p>
              Human Network Maintainer does not collect, store, or transmit personal data outside of the user&apos;s Google
              account. The add-on only accesses information within the user&apos;s Google Sheet in order to perform reminder
              calculations through Google Sheets and Gmail APIs.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Names and related contact details entered into the spreadsheet by the user</li>
              <li>Dates associated with each contact for scheduling reminders</li>
              <li>The user&apos;s email address (to send reminder notifications through Gmail APIs)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">2. How Information Is Used</h2>
            <p>The data accessed by the add-on is used solely to provide the core reminder functionality:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Generate reminder notifications based on the names and dates you maintain</li>
              <li>Send reminder emails via the Gmail API to the address you configure</li>
            </ul>
            <p>We do not use the data for advertising, analytics, profiling, or any other unrelated purpose.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">3. Data Sharing</h2>
            <p>
              We do not sell Google user data and do not share it with third parties. Access is limited to the Google APIs
              necessary to run the add-on, and data is transmitted only as required to send reminder notifications through
              Google Sheets and Gmail services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">4. Data Storage, Retention, and Deletion</h2>
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
            <h2 className="text-2xl font-semibold text-gray-900">5. Data Security</h2>
            <p>
              We protect user data with industry-standard security practices. All data transmitted between the add-on and
              Google APIs is encrypted using Secure Socket Layer (SSL) technology, and access is limited to the minimum set of
              permissions needed to deliver reminder emails.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">6. AI/ML Disclosure</h2>
            <p>Google user data is not used to train, retrain, or fine-tune any Artificial Intelligence or Machine Learning models.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">7. Limited Use Disclosure</h2>
            <p>
              Our use and transfer of information received from Google APIs will adhere to the 
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                className="text-primary underline underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                 Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">8. Changes to This Policy</h2>
            <p>This policy may be updated periodically. Updates will be reflected on this page.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">9. Contact</h2>
            <p>If you have questions about this policy, contact the developer of Human Network Maintainer.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
