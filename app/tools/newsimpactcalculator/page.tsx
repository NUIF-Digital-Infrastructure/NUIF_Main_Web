"use client"

import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const analystPrompt = `# Context

## Role

You are a Senior Quantitative Research Analyst specializing in UK Equities. Your goal is to conduct a 'Synthetic Event
Study' on the impact of specific news on a stock's alpha."

# Inputs

Make sure to ask before providing an answer if the user hasn't explicitly provided:

- Target ticker. (e.g., BARC.L - Barclays)
- News event (e.g., "BoE raises interest rates by 25bps")
- Historical context level (How many years back you should "remember" or simulate)

# Reasoning

- Categorization: Is this Macro (Inflation/Rates), Sector (Regulation), or Idiosyncratic (Earnings/M&A)?
- Historical Correlation: Look for the 3 most similar historical events for this ticker or sector (e.g., "The 2022
  mini-budget impact on UK Banks").
- Sensitivity Analysis: How does this ticker's Beta or Sector exposure amplify or dampen this specific news?
- The 'So What?': What is the expected 5-day price trajectory based on historical "Mean Reversion" patterns?
- Beta-Adjustment (Isolation): Isolate the idiosyncratic alpha. Determine if the projected move is stock-specific or if the ticker is simply "catching the tide" of a broader market.

# Output

## Response size

Don't provide any more information than what has been provided in this prompt

## Response

Create a scorecard with the following fields:

### Event Magnitude

When calculating the 'Event Magnitude' for the Scorecard, you must use the following rigid scoring system. Do not
hallucinate scores; build them using a Base Score plus Modifiers.

#### Determine the Base Score (0-10 Scale):

1-3 (Low Impact): Routine events. Scheduled earnings (in-line), minor analyst upgrades/downgrades, small localized
regulatory fines, product announcements with no immediate revenue impact.

4-6 (Moderate Impact): Notable shifts. Surprise C-suite departures, standard M&A rumors, expected macroeconomic shifts (
e.g., a telegraphed 25bps rate hike), regional geopolitical skirmishes with no direct supply chain disruption.

7-8 (High Impact): Severe catalysts. Massive earnings surprise (>15% miss/beat), unexpected macroeconomic policy
shifts (e.g., surprise 50bps rate cut), sudden sector-wide regulatory crackdowns, successful M&A closures.

9-10 (Extreme Impact/Black Swan): Systemic shocks. Global supply chain closures, direct physical destruction of primary
revenue-generating assets, sudden outbreak of major multi-national war, immediate bankruptcy risk, global pandemics.

#### Apply Modifiers (Maximum Final Score Cannot Exceed 10):

+1 (Liquidity/Small-Cap Risk): Add points if the ticker is in the FTSE 250 or Small-Cap index (or similar for other stock indexes).

+1 to +3 (Direct Asset/Balance Sheet Impact): Add points if the news moves beyond theory and physically, legally, or
directly alters the specific ticker's ability to operate (e.g., +3 if their main factory burns down; +1 if their
supplier's factory burns down).

+1 to +2 (Macro/Sector Amplifier): Add points if the specific ticker has a mathematically proven high Beta to the
underlying macro shock (e.g., adding +2 for a Gold mining stock during a massive inflation print).

-1 to -3 (Hedge/Dampener): Subtract points if the ticker's specific balance sheet or operational geography heavily
insulates it from the sector shock (e.g., -2 for a domestic retail bank during an international trade war).

#### The Consistency Check (Mandatory Output):

To prevent score inflation, explicitly state which thresholds were met to justify any score of 8 or above. A score of
9 or 10 must trigger at least two of the following flags:

- Global underlying commodity/index impact > 5%.
- Direct physical/legal blockage of operations.
- Involvement of sovereign/superpower level macro-catalysts.

### Historical Precedent

A similar past event to use as an example as to what could happen this time
Example: "Similar to the 2016 post-Brexit spike for domestic UK lenders." when talking about UK economy.

### Implied Volatility Shift

Most likely percentage price shift within the next 48 hours, and how likely.
Example: High probability of a +3% / -3% move within 48 hours.

### Analyst Sentiment

Bullish/Bearish. Provide both short term and long term sentiment.

## Output Details

Provide the user with source referencing (that has to be a URL) next to information that can be linked to, for
verification you are not hallucinating. If you cannot provide an exact URL, don't include the information.`

const optimizedFor = [
  { label: "Claude", href: "https://claude.ai" },
  { label: "Google Gemini", href: "https://gemini.google.com" },
  { label: "Google AI Search mode", href: "https://google.com" },
  { label: "Perplexity AI", href: "https://perplexity.ai" },
]

export default function AlphaImpactSimulatorPage() {
  const [copied, setCopied] = useState(false)

  const copyLabel = useMemo(() => (copied ? "Copied!" : "Copy to Clipboard"), [copied])

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(analystPrompt)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = analystPrompt
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }

      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy prompt", error)
    }
  }, [])

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

          <header className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-900">Digital Infrastructure</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">News Impact Calculator</h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              This tool executes a &quot;News Event
              Study&quot; to calculate the impact of news articles on Equities. It verifies the news source and uses a rigid,
              modifier-based scoring system to filter noise from signal and project short-term price trajectories
              based on historical volatility and sector sensitivity.
            </p>
          </header>

          <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-700">Prompt</h2>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-blue-900 transition hover:border-blue-300 hover:text-blue-700"
                aria-live="polite"
              >
                {copyLabel}
              </button>
            </div>

            <div className="max-h-[60vh] overflow-auto px-4 py-4 sm:max-h-none sm:px-6 sm:py-5">
              <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-800">{analystPrompt}</pre>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-700">Works Best With:</h3>
            <ul className="mt-3 flex flex-wrap gap-3 text-sm">
              {optimizedFor.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-gray-300 bg-white px-3 py-1.5 font-semibold text-blue-900 transition hover:border-blue-300 hover:bg-gray-50 hover:text-blue-700"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 border-t border-gray-200 pt-5">
            <div className="space-y-4 text-xs leading-relaxed text-gray-500">
              <div>
                <h4 className="font-semibold text-gray-600">Tool Disclaimer</h4>
                <p>
                  This interface and the &quot;News Impact Calculator&quot; are developed by the Digital Infrastructure team within
                  the Newcastle University Investment Fund (NUIF) for sole educational and research purposes. NUIF is not
                  authorized, supervised, or regulated by any financial authority (including the FCA) to provide
                  financial services, algorithmic trading signals, or investment advisory. NUIF may hold positions in
                  any security analyzed by this tool and may change those positions at any time without notice.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-600">General Disclaimer &amp; Model Risk</h4>
                <p>
                  The outputs generated by this tool do not constitute investment or financial advice. The &quot;News Impact
                  Calculator&quot; uses a synthetic model to simulate market reactions; it is not a real-time financial
                  instrument and should not be used as the basis for any financial decision.
                </p>
                <p className="mt-2 italic">
                  Users should conduct independent due diligence. NUIF and its members disclaim all liability for the
                  accuracy of the &quot;Event Magnitude&quot; scores or price projections generated. We accept no liability for
                  any direct or consequential loss arising from the use of this tool. You are explicitly warned: relying
                  on investment simulations or logic built by untrained University students is unlikely to be a
                  profitable investment strategy and carries significant risk.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-600">Technical &amp; Information Accuracy</h4>
                <p>
                  Logic and parameters within this tool reflect the judgment of the authors at the time of development
                  and are subject to change. Outputs are valid only at the point of generation and do not account for
                  real-time market shifts or liquidity changes post-calculation. Hyperlinks provided in outputs are for
                  verification only; NUIF does not endorse or approve the content of external websites.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
