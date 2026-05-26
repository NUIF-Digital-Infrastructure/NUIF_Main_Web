"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_6.jpg"

const FMP_API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const RESTRICTED_SECTORS = [
  "Advanced Materials", "Advanced Robotics", "Artificial Intelligence",
  "Civil Nuclear", "Communications", "Computing Hardware",
  "Critical Suppliers to Government", "Cryptographic Authentication",
  "Data Infrastructure", "Defence", "Energy", "Military and Dual-Use",
  "Quantum Technologies", "Satellite and Space Technologies",
  "Suppliers to the Emergency Services", "Synthetic Biology", "Transport",
]

const SDG_GOALS = [
  "SDG 1 – No Poverty", "SDG 2 – Zero Hunger",
  "SDG 3 – Good Health and Well-being", "SDG 4 – Quality Education",
  "SDG 5 – Gender Equality", "SDG 6 – Clean Water and Sanitation",
  "SDG 7 – Affordable and Clean Energy",
  "SDG 8 – Decent Work and Economic Growth",
  "SDG 9 – Industry, Innovation and Infrastructure",
  "SDG 10 – Reduced Inequalities",
  "SDG 11 – Sustainable Cities and Communities",
  "SDG 12 – Responsible Consumption and Production",
  "SDG 13 – Climate Action", "SDG 14 – Life Below Water",
  "SDG 15 – Life on Land",
  "SDG 16 – Peace, Justice and Strong Institutions",
  "SDG 17 – Partnerships for the Goals",
]

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type StepStatus = "idle" | "loading" | "pass" | "fail" | "flag" | "manual" | "na"

type StockProfile = {
  companyName: string
  sector: string
  industry: string
  ticker: string
  description: string
  website: string
  mktCap: number
  country: string
}

type Step1Data = {
  profile: StockProfile
  isRestricted: boolean
  matchedSector: string | null
}

type Step2Data = {
  restrictedRevenue: number | null
  groupRevenue: number | null
  isStandalone: boolean
  percentage: number
  belowThreshold: boolean
  year: string
}

type Step3Data = {
  esgScore: number | null
  esgRating: string | null
  alignedSdgs: string[]
  hasSustainability: boolean
}

type Step4Data = {
  controversyScore: number | null
  recentHeadlines: { title: string; date: string; url: string }[]
  hasFlags: boolean
  flagDetails: string
  flagSources: string
}

type Step5Data = {
  exclusionViolation: boolean
  violationDetails: string
  sources: string
  restrictedRevenue: number | null
  groupRevenue: number | null
  isStandalone: boolean
  percentage: number
}

type Step6Data = {
  unethicalEvidence: boolean
  evidenceDetails: string
  sources: string
}

type Step7Data = {
  isCorrected: boolean
  correctionDetails: string
  sources: string
}

type ComplianceReport = {
  ticker: string
  companyName: string
  runAt: string
  decision: "INVEST" | "DO NOT INVEST" | "DISINVEST" | "HOLD" | "PENDING"
  isAlreadyInvested: boolean
  steps: {
    label: string
    status: StepStatus
    summary: string
  }[]
  step1?: Step1Data
  step2?: Step2Data
  step3?: Step3Data
  step4?: Step4Data
  step5?: Step5Data
  step6?: Step6Data
  step7?: Step7Data
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function StatusBadge({ status }: { status: StepStatus }) {
  const map: Record<StepStatus, { bg: string; text: string; label: string }> = {
    idle:    { bg: "bg-gray-100",   text: "text-gray-500",   label: "PENDING"  },
    loading: { bg: "bg-blue-50",    text: "text-blue-600",   label: "LOADING…" },
    pass:    { bg: "bg-green-100",  text: "text-green-700",  label: "PASS"     },
    fail:    { bg: "bg-red-100",    text: "text-red-700",    label: "FAIL"     },
    flag:    { bg: "bg-amber-100",  text: "text-amber-700",  label: "FLAGGED"  },
    manual:  { bg: "bg-purple-100", text: "text-purple-700", label: "MANUAL"   },
    na:      { bg: "bg-gray-100",   text: "text-gray-400",   label: "N/A"      },
  }
  const s = map[status]
  return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  )
}

function StepCard({
                    number, title, status, children, locked,
                  }: {
  number: number
  title: string
  status: StepStatus
  children: React.ReactNode
  locked: boolean
}) {
  return (
      <section
          className={`mt-6 rounded-xl border p-6 transition-all duration-300 ${
              locked
                  ? "border-gray-100 bg-gray-50 opacity-50 pointer-events-none select-none"
                  : status === "pass"
                      ? "border-green-200 bg-green-50"
                      : status === "fail"
                          ? "border-red-200 bg-red-50"
                          : status === "flag"
                              ? "border-amber-200 bg-amber-50"
                              : status === "na"
                                  ? "border-gray-100 bg-gray-50"
                                  : "border-gray-200 bg-white"
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            {number}
          </span>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          </div>
          <StatusBadge status={status} />
        </div>
        {!locked && <div className="mt-4">{children}</div>}
      </section>
  )
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
      <div className="flex justify-between border-b border-gray-100 py-1.5 text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-800">{value}</span>
      </div>
  )
}

function DecisionBanner({ decision }: { decision: ComplianceReport["decision"] }) {
  const map = {
    INVEST:          { bg: "bg-green-600",  label: "✓ INVEST",          sub: "Stock passed all compliance checks." },
    HOLD:            { bg: "bg-blue-600",   label: "◈ HOLD",            sub: "No compliance issues found. Continue holding." },
    "DO NOT INVEST": { bg: "bg-red-600",    label: "✗ DO NOT INVEST",   sub: "Stock failed one or more compliance checks." },
    DISINVEST:       { bg: "bg-orange-600", label: "⚠ DISINVEST",       sub: "Existing positions should be unwound." },
    PENDING:         { bg: "bg-gray-500",   label: "– PENDING",         sub: "Complete all steps to receive a final decision." },
  }
  const d = map[decision]
  return (
      <div className={`mt-8 rounded-xl p-6 text-white ${d.bg}`}>
        <p className="text-2xl font-extrabold tracking-tight">{d.label}</p>
        <p className="mt-1 text-sm opacity-90">{d.sub}</p>
      </div>
  )
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function StockComplianceToolPage() {
  const [ticker, setTicker] = useState("")
  const [loading, setLoading] = useState(false)
  const [isAlreadyInvested, setIsAlreadyInvested] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Step data
  const [step1, setStep1] = useState<Step1Data | null>(null)
  const [step2, setStep2] = useState<Step2Data | null>(null)
  const [step3, setStep3] = useState<Step3Data | null>(null)
  const [step4, setStep4] = useState<Step4Data | null>(null)
  const [step5, setStep5] = useState<Step5Data | null>(null)
  const [step6, setStep6] = useState<Step6Data | null>(null)
  const [step7, setStep7] = useState<Step7Data | null>(null)

  // Step statuses
  const [s1, setS1] = useState<StepStatus>("idle")
  const [s2, setS2] = useState<StepStatus>("idle")
  const [s3, setS3] = useState<StepStatus>("idle")
  const [s4, setS4] = useState<StepStatus>("idle")
  const [s5, setS5] = useState<StepStatus>("idle")
  const [s6, setS6] = useState<StepStatus>("idle")
  const [s7, setS7] = useState<StepStatus>("idle")

  // Step 2 state
  const [groupRevenueInput, setGroupRevenueInput] = useState("")
  const [restrictedRevenueInput, setRestrictedRevenueInput] = useState("")
  const [isStandalone, setIsStandalone] = useState(false)

  // Step 5 revenue inputs (mirrors Step 2)
  const [s5RestrictedRevenueInput, setS5RestrictedRevenueInput] = useState("")
  const [s5GroupRevenueInput, setS5GroupRevenueInput] = useState("")
  const [s5IsStandalone, setS5IsStandalone] = useState(false)

  // Manual inputs for Step 3
  const [selectedSdgs, setSelectedSdgs] = useState<string[]>([])
  const [hasSustainabilityManual, setHasSustainabilityManual] = useState<boolean | null>(null)

  // Manual inputs for Steps 5–7
  const [s5HasViolation, setS5HasViolation] = useState<boolean | null>(null)

  const [s6HasEvidence, setS6HasEvidence] = useState<boolean | null>(null)
  const [s6EvidenceDetails, setS6EvidenceDetails] = useState("")
  const [s6Sources, setS6Sources] = useState("")

  const [s7IsCorrected, setS7IsCorrected] = useState<boolean | null>(null)
  const [s4HasFlags, setS4HasFlags] = useState<boolean | null>(null)
  const [s4FlagDetails, setS4FlagDetails] = useState("")
  const [s4FlagSources, setS4FlagSources] = useState("")
  const [s5Sources, setS5Sources] = useState("")
  const [s7CorrectionDetails, setS7CorrectionDetails] = useState("")
  const [s7Sources, setS7Sources] = useState("")

  const reportRef = useRef<HTMLDivElement>(null)

  // ── Decision logic ────────────────────────────────────────────
  function computeDecision(): ComplianceReport["decision"] {
    if (!step1) return "PENDING"

    if (isAlreadyInvested) {
      if (!step4) return "PENDING"
      if (!step4.hasFlags) return "HOLD"
      if (!step5) return "PENDING"
      if (step5.exclusionViolation) return "DISINVEST"
      if (!step6) return "PENDING"
      if (!step6.unethicalEvidence) return "HOLD"
      if (!step7) return "PENDING"
      return step7.isCorrected ? "HOLD" : "DISINVEST"
    }

    if (!step1.isRestricted) return "INVEST"
    if (!step2) return "PENDING"
    if (!step2.belowThreshold) return "DO NOT INVEST"
    if (!step3) return "PENDING"
    if (!step3.hasSustainability) return "DO NOT INVEST"
    if (!step4) return "PENDING"
    if (!step4.hasFlags) return "INVEST"
    if (!step5) return "PENDING"
    if (step5.exclusionViolation) return "DISINVEST"
    if (!step6) return "PENDING"
    if (!step6.unethicalEvidence) return "INVEST"
    if (!step7) return "PENDING"
    return step7.isCorrected ? "INVEST" : "DISINVEST"
  }

  function buildReport(): ComplianceReport {
    const steps: ComplianceReport["steps"] = [
      {
        label: "Restricted Sector Check",
        status: isAlreadyInvested ? "na" : s1,
        summary: isAlreadyInvested
            ? "Not applicable – stock already held in portfolio"
            : step1
                ? step1.isRestricted
                    ? `Restricted – matched sector: ${step1.matchedSector}`
                    : "Not restricted"
                : "–",
      },
      {
        label: "Revenue Threshold (10%)",
        status: isAlreadyInvested ? "na" : step1 && !step1.isRestricted ? "na" : s2,
        summary: isAlreadyInvested
            ? "Not applicable – stock already held in portfolio"
            : step1 && !step1.isRestricted
                ? "Not applicable – stock is not in a restricted sector"
                : step2?.percentage
                    ? step2.isStandalone
                        ? `Standalone entity – treated as 100% (${step2.year})`
                        : `Restricted segment: ${step2.percentage.toFixed(2)}% of group revenue (${step2.year})`
                    : "–",
      },
      {
        label: "Sustainability Goals",
        status: isAlreadyInvested ? "na" : (s1 === "pass" && !step1?.isRestricted) ? "na" : s2 === "fail" ? "na" : s3,
        summary: isAlreadyInvested
            ? "Not applicable – stock already held in portfolio"
            : step1 && !step1.isRestricted
                ? "Not applicable – stock is not in a restricted sector"
                : s2 === "fail"
                    ? "Not applicable – revenue threshold exceeded"
                    : step3
                        ? step3.hasSustainability
                            ? `Aligned with ${step3.alignedSdgs.length} SDG(s)`
                            : "No sustainability alignment identified"
                        : "–",
      },
      {
        label: "Monitoring Flags",
        status: step1 && !step1.isRestricted ? "na" : s2 === "fail" ? "na" : s3 === "fail" ? "na" : s4,
        summary: step1 && !step1.isRestricted
            ? "Not applicable – stock is not in a restricted sector"
            : s2 === "fail"
                ? "Not applicable – revenue threshold exceeded"
                : s3 === "fail"
                    ? "Not applicable – no sustainability alignment"
                    : step4
                        ? step4.hasFlags
                            ? `Concern flags noted${step4.flagDetails ? `: ${step4.flagDetails.slice(0, 80)}${step4.flagDetails.length > 80 ? "…" : ""}` : ""}`
                            : "No flags detected"
                        : "–",
      },
      {
        label: "10% Exclusion Violation",
        status: !step4 ? "na" : !step4.hasFlags ? "na" : s5,
        summary: !step4
            ? "Not applicable"
            : !step4.hasFlags
                ? "Not applicable – no flags detected"
                : step5
                    ? step5.exclusionViolation
                        ? `Violation confirmed: restricted revenue ${step5.percentage.toFixed(2)}% of group`
                        : `No exclusion violation – restricted revenue ${step5.percentage.toFixed(2)}% of group`
                    : "–",
      },
      {
        label: "Unethical Evidence",
        status: !step5 ? "na" : step5.exclusionViolation ? "na" : s6,
        summary: !step5
            ? "Not applicable"
            : step5.exclusionViolation
                ? "Not applicable – exclusion violation confirmed"
                : step6
                    ? step6.unethicalEvidence
                        ? `Evidence confirmed: ${step6.evidenceDetails}`
                        : "No substantiated unethical evidence"
                    : "–",
      },
      {
        label: "Remediation Check",
        status: !step6 ? "na" : !step6.unethicalEvidence ? "na" : s7,
        summary: !step6
            ? "Not applicable"
            : !step6.unethicalEvidence
                ? "Not applicable – no unethical evidence found"
                : step7
                    ? step7.isCorrected
                        ? `Remediated: ${step7.correctionDetails}`
                        : "Not remediated – disinvest"
                    : "–",
      },
    ]

    return {
      ticker: step1?.profile.ticker ?? ticker.toUpperCase(),
      companyName: step1?.profile.companyName ?? "–",
      runAt: new Date().toLocaleString("en-GB"),
      decision: computeDecision(),
      isAlreadyInvested: isAlreadyInvested ?? false,
      steps,
      step1: step1 ?? undefined,
      step2: step2 ?? undefined,
      step3: step3 ?? undefined,
      step4: step4 ?? undefined,
      step5: step5 ?? undefined,
      step6: step6 ?? undefined,
      step7: step7 ?? undefined,
    }
  }

  // ── Step 1 ────────────────────────────────────────────────────
  const handleStep1 = async () => {
    const trimmed = ticker.trim().toUpperCase()
    if (!trimmed) { setError("Please enter a ticker symbol."); return }

    setLoading(true)
    setError(null)
    setS1("loading")
    setStep1(null); setStep2(null); setStep3(null)
    setStep4(null); setStep5(null); setStep6(null); setStep7(null)
    setS2("idle"); setS3("idle"); setS4("idle"); setS5("idle"); setS6("idle"); setS7("idle")
    setSelectedSdgs([]); setHasSustainabilityManual(null); setS4HasFlags(null); setIsAlreadyInvested(null)
    setS4FlagDetails(""); setS4FlagSources("")
    setS5RestrictedRevenueInput(""); setS5GroupRevenueInput(""); setS5IsStandalone(false); setS5HasViolation(null); setS5Sources("")
    setS7Sources("")

    try {
      const profileRes = await fetch(
          `https://financialmodelingprep.com/stable/profile?symbol=${trimmed}&apikey=${FMP_API_KEY}`
      )
      const profileData = await profileRes.json()
      if (!Array.isArray(profileData) || profileData.length === 0) {
        throw new Error(`No company found for ticker "${trimmed}".`)
      }
      const p = profileData[0]
      const profile: StockProfile = {
        companyName: p.companyName ?? p.name ?? "Unknown",
        sector:      p.sector   ?? "Unknown",
        industry:    p.industry ?? "Unknown",
        ticker:      p.symbol   ?? trimmed,
        description: p.description ?? "",
        website:     p.website ?? "",
        mktCap:      p.mktCap  ?? 0,
        country:     p.country ?? "",
      }

      const matchedSector =
          RESTRICTED_SECTORS.find(
              (s) =>
                  s.toLowerCase() === profile.sector.toLowerCase() ||
                  s.toLowerCase() === profile.industry.toLowerCase() ||
                  profile.sector.toLowerCase().includes(s.toLowerCase()) ||
                  profile.industry.toLowerCase().includes(s.toLowerCase())
          ) ?? null

      const data: Step1Data = { profile, isRestricted: matchedSector !== null, matchedSector }
      setStep1(data)
      setS1(matchedSector ? "flag" : "pass")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unexpected error."
      setError(msg)
      setS1("idle")
    } finally {
      setLoading(false)
    }
  }

  // ── Step 2 ────────────────────────────────────────────────────
  const handleStep2Submit = () => {
    setError(null)

    const restricted = parseFloat(restrictedRevenueInput)
    if (isNaN(restricted) || restricted < 0) {
      setError("Please enter a valid restricted segment revenue.")
      return
    }

    if (isStandalone) {
      setStep2({
        restrictedRevenue: restricted,
        groupRevenue: restricted,
        isStandalone: true,
        percentage: 100,
        belowThreshold: false,
        year: "N/A",
      })
      setS2("fail")
      return
    }

    const group = parseFloat(groupRevenueInput)
    if (isNaN(group) || group <= 0) {
      setError("Please enter a valid parent group revenue greater than zero.")
      return
    }
    if (group < restricted) {
      setError("Group revenue cannot be less than the restricted segment revenue.")
      return
    }

    const pct = (restricted / group) * 100
    const below = pct < 10
    setStep2({
      restrictedRevenue: restricted,
      groupRevenue: group,
      isStandalone: false,
      percentage: pct,
      belowThreshold: below,
      year: "N/A",
    })
    setS2(below ? "pass" : "fail")
  }

  // ── Step 3 ────────────────────────────────────────────────────
  const handleStep3Submit = () => {
    if (hasSustainabilityManual === null) {
      setError("Please indicate whether the stock aligns with any sustainability goals.")
      return
    }
    setError(null)
    setStep3({
      esgScore: null,
      esgRating: null,
      alignedSdgs: selectedSdgs,
      hasSustainability: hasSustainabilityManual,
    })
    setS3(hasSustainabilityManual ? "pass" : "fail")
  }

  // ── Step 4 ────────────────────────────────────────────────────
  const handleStep4Submit = () => {
    if (s4HasFlags === null) return
    setStep4({ controversyScore: null, recentHeadlines: [], hasFlags: s4HasFlags, flagDetails: s4FlagDetails, flagSources: s4FlagSources })
    setS4(s4HasFlags ? "flag" : "pass")
  }

  // ── Step 5: Revenue threshold check (mirrors Step 2) ──────────
  const handleStep5Submit = () => {
    setError(null)

    if (s5HasViolation === null) {
      setError("Please indicate whether an exclusion violation exists.")
      return
    }

    // If user said No – no violation
    if (!s5HasViolation) {
      setStep5({
        exclusionViolation: false,
        violationDetails: "",
        sources: "",
        restrictedRevenue: null,
        groupRevenue: null,
        isStandalone: false,
        percentage: 0,
      })
      setS5("pass")
      return
    }

    // Yes – compute from revenue inputs
    const restricted = parseFloat(s5RestrictedRevenueInput)
    if (isNaN(restricted) || restricted < 0) {
      setError("Please enter a valid restricted segment revenue.")
      return
    }

    if (s5IsStandalone) {
      setStep5({
        exclusionViolation: true,
        violationDetails: "Standalone entity – treated as 100% restricted revenue.",
        sources: s5Sources,
        restrictedRevenue: restricted,
        groupRevenue: restricted,
        isStandalone: true,
        percentage: 100,
      })
      setS5("fail")
      return
    }

    const group = parseFloat(s5GroupRevenueInput)
    if (isNaN(group) || group <= 0) {
      setError("Please enter a valid parent group revenue greater than zero.")
      return
    }
    if (group < restricted) {
      setError("Group revenue cannot be less than the restricted segment revenue.")
      return
    }

    const pct = (restricted / group) * 100
    const isViolation = pct >= 10

    setStep5({
      exclusionViolation: isViolation,
      violationDetails: isViolation
          ? `Restricted segment revenue is ${pct.toFixed(2)}% of group revenue, exceeding the 10% threshold.`
          : "",
      sources: s5Sources,
      restrictedRevenue: restricted,
      groupRevenue: group,
      isStandalone: false,
      percentage: pct,
    })
    setS5(isViolation ? "fail" : "pass")
  }

  // ── Step 6 ────────────────────────────────────────────────────
  const handleStep6Submit = () => {
    if (s6HasEvidence === null) {
      setError("Please indicate whether unethical evidence exists.")
      return
    }
    setError(null)
    setStep6({
      unethicalEvidence: s6HasEvidence,
      evidenceDetails: s6EvidenceDetails,
      sources: s6Sources,
    })
    setS6(s6HasEvidence ? "flag" : "pass")
  }

  // ── Step 7 ────────────────────────────────────────────────────
  const handleStep7Submit = () => {
    if (s7IsCorrected === null) {
      setError("Please indicate whether the issue has been corrected.")
      return
    }
    setError(null)
    setStep7({
      isCorrected: s7IsCorrected,
      correctionDetails: s7CorrectionDetails,
      sources: s7Sources,
    })
    setS7(s7IsCorrected ? "pass" : "fail")
  }

  const handlePrint = () => window.print()

  // ── Derived locking flags ─────────────────────────────────────
  const step2Unlocked = !isAlreadyInvested && !!step1 && step1.isRestricted
  const step3Unlocked = !isAlreadyInvested && !!step2 && s2 === "pass"
  const step4Unlocked = isAlreadyInvested ? !!step1 : (!!step3 && s3 === "pass")
  const step5Unlocked = !!step4 && step4.hasFlags
  const step6Unlocked = !!step5 && !step5.exclusionViolation
  const step7Unlocked = !!step6 && step6.unethicalEvidence

  const display2 = isAlreadyInvested ? "na"
      : (s1 === "pass" && !step1?.isRestricted) ? "na"
          : s2
  const display3 = isAlreadyInvested ? "na"
      : (s1 === "pass" && !step1?.isRestricted) ? "na"
          : s2 === "fail" ? "na"
              : s3
  const display4 = isAlreadyInvested ? s4
      : (s1 === "pass" && !step1?.isRestricted) ? "na"
          : s2 === "fail" ? "na"
              : s3 === "fail" ? "na"
                  : s4
  const display5 = display4 === "na" ? "na"
      : (s4 !== "idle" && !step4?.hasFlags) ? "na"
          : s5
  const display6 = display5 === "na" ? "na"
      : s5 === "fail" ? "na"
          : s6
  const display7 = display6 === "na" ? "na"
      : (s6 !== "idle" && !step6?.unethicalEvidence) ? "na"
          : s7

  const report = buildReport()
  const showReport =
      s1 !== "idle" && isAlreadyInvested !== null && (
          isAlreadyInvested
              ? (s4 !== "idle")
              : (s1 === "pass" || s2 === "fail" || s3 === "fail" ||
                  (s4 !== "idle" && !step4?.hasFlags) || s5 === "fail" ||
                  (s6 !== "idle" && !step6?.unethicalEvidence) || s7 !== "idle")
      )

  const fmt = (n: number) =>
      n >= 1e9 ? `$${(n / 1e9).toFixed(2)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : `$${n.toLocaleString()}`

  // ── Live preview helper for Step 5 ───────────────────────────
  const s5LivePct =
      !s5IsStandalone &&
      s5RestrictedRevenueInput &&
      s5GroupRevenueInput &&
      parseFloat(s5RestrictedRevenueInput) > 0 &&
      parseFloat(s5GroupRevenueInput) > 0
          ? (parseFloat(s5RestrictedRevenueInput) / parseFloat(s5GroupRevenueInput)) * 100
          : null

  return (
      <main className="min-h-screen">
        <Navbar />

        <ParallaxHero
          image={Background}
          title="Stock Compliance Tool"
          subtitle="Digital Infrastructure"
        />

        <style>{`
        @media print {
          body * { visibility: hidden; }
          #compliance-report, #compliance-report * { visibility: visible; }
          #compliance-report { position: absolute; inset: 0; padding: 2rem; }
          .no-print { display: none !important; }
        }
      `}</style>

        <section className="bg-white py-16 print:py-4 px-6">
          <div className="container mx-auto max-w-3xl">

            {/* Header */}
            <div className="no-print">
              <Link
                  href="/tools"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 transition hover:text-blue-700"
              >
                ← Back to Tools
              </Link>
              <div className="mt-6">
                <div className="flex gap-3 text-sm font-semibold text-blue-900">
                  <Link href="/tools/stockcompliancetool/about" className="hover:text-blue-700 transition">
                    About
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/tools/stockcompliancetool/privacy-policy" className="hover:text-blue-700 transition">
                    Privacy Policy
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/tools/stockcompliancetool/terms-of-service" className="hover:text-blue-700 transition">
                    Terms of Service
                  </Link>
                </div>
                <p className="mt-2 text-gray-500 text-sm">
                  7-step compliance decision flow based on the UK NSI Act and SRI/ESG mandates.
                </p>
              </div>
            </div>

            {/* ── STEP 1 ───────────────────────────────────────────── */}
            <StepCard number={1} title="Restricted Sector Check" status={s1} locked={false}>
              <p className="text-sm text-gray-500 mb-3">
                Enter a stock ticker. We&apos;ll verify the company and check if it operates in one of the
                17 NSI Act restricted sectors.
              </p>
              <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="e.g. AAPL, BP, GOOGL"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStep1()}
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                />
                <button
                    onClick={handleStep1}
                    disabled={loading}
                    className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Checking…" : "Check"}
                </button>
              </div>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              {step1 && (
                  <div className="mt-4 space-y-3">
                    <div className="space-y-1">
                      <InfoRow label="Company"   value={step1.profile.companyName} />
                      <InfoRow label="Ticker"    value={step1.profile.ticker} />
                      <InfoRow label="Sector"    value={step1.profile.sector} />
                      <InfoRow label="Industry"  value={step1.profile.industry} />
                      <InfoRow label="Country"   value={step1.profile.country} />
                      {step1.profile.mktCap > 0 && (
                          <InfoRow label="Market Cap" value={fmt(step1.profile.mktCap)} />
                      )}
                    </div>

                    <div className="rounded-md border border-indigo-200 bg-indigo-50 px-4 py-4">
                      <p className="text-sm font-semibold text-indigo-800 mb-3">
                        Is this stock already held in the portfolio?
                      </p>
                      <div className="flex gap-3">
                        <button
                            onClick={() => setIsAlreadyInvested(true)}
                            className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                                isAlreadyInvested === true
                                    ? "border-indigo-500 bg-indigo-600 text-white"
                                    : "border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                            }`}
                        >
                          Yes – Already Invested
                        </button>
                        <button
                            onClick={() => setIsAlreadyInvested(false)}
                            className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                                isAlreadyInvested === false
                                    ? "border-indigo-500 bg-indigo-600 text-white"
                                    : "border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                            }`}
                        >
                          No – Evaluating for Investment
                        </button>
                      </div>
                      {isAlreadyInvested !== null && (
                          <p className="mt-2 text-xs text-indigo-600">
                            {isAlreadyInvested
                                ? "Skipping to Step 4 – monitoring review only."
                                : "Proceeding with full 7-step compliance check."}
                          </p>
                      )}
                    </div>

                    {isAlreadyInvested === false && (
                        step1.isRestricted ? (
                            <div className="rounded-md bg-amber-100 border border-amber-200 px-4 py-2 text-sm text-amber-800">
                              ⚠ Restricted sector matched: <strong>{step1.matchedSector}</strong>. Proceed to Step 2.
                            </div>
                        ) : (
                            <div className="rounded-md bg-green-100 border border-green-200 px-4 py-2 text-sm text-green-800">
                              ✓ Not in a restricted sector. <strong>Recommendation: INVEST.</strong>
                            </div>
                        )
                    )}
                  </div>
              )}
            </StepCard>

            {/* ── STEP 2 ───────────────────────────────────────────── */}
            <StepCard
                number={2}
                title="Revenue Threshold – Below 10% of Group Revenue?"
                status={display2}
                locked={!step2Unlocked}
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Enter the revenue figures from the company's latest annual report or filings.
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restricted Segment Revenue
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    The revenue attributable solely to the restricted activity (e.g. defence contracts, energy operations).
                  </p>
                  <div className="flex gap-2">
                    <span className="flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">$</span>
                    <input
                        type="number" min="0"
                        placeholder="e.g. 5000000000"
                        value={restrictedRevenueInput}
                        onChange={(e) => setRestrictedRevenueInput(e.target.value)}
                        className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
                  <input
                      type="checkbox"
                      checked={isStandalone}
                      onChange={(e) => {
                        setIsStandalone(e.target.checked)
                        if (e.target.checked) setGroupRevenueInput("")
                      }}
                      className="mt-0.5 h-4 w-4 accent-amber-600"
                  />
                  <span className="text-sm text-amber-800">
                  <strong>This company has no parent group.</strong>
                  <br />
                  <span className="text-xs font-normal">
                    It is a standalone entity – its own revenue equals 100% of group revenue.
                    This will be automatically flagged as exceeding the 10% threshold.
                  </span>
                </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parent Group Total Revenue
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Total consolidated revenue of the parent group (from annual report).
                  </p>
                  <div className="flex gap-2">
                  <span className={`flex items-center rounded-l-md border border-r-0 px-3 text-sm transition-colors ${
                      isStandalone ? "border-gray-200 bg-gray-100 text-gray-400" : "border-gray-300 bg-gray-50 text-gray-500"
                  }`}>$</span>
                    <input
                        type="number" min="0"
                        placeholder={isStandalone ? "N/A – standalone company" : "e.g. 50000000000"}
                        value={isStandalone ? "" : groupRevenueInput}
                        onChange={(e) => setGroupRevenueInput(e.target.value)}
                        disabled={isStandalone}
                        className={`flex-1 rounded-r-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                            isStandalone
                                ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "border-gray-300 bg-white text-gray-900"
                        }`}
                    />
                  </div>
                </div>

                {!isStandalone && restrictedRevenueInput && groupRevenueInput &&
                    parseFloat(restrictedRevenueInput) > 0 && parseFloat(groupRevenueInput) > 0 && (
                        <div className="rounded-md bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-600">
                          Estimated share:{" "}
                          <strong className={
                            (parseFloat(restrictedRevenueInput) / parseFloat(groupRevenueInput)) * 100 >= 10
                                ? "text-red-600" : "text-green-700"
                          }>
                            {((parseFloat(restrictedRevenueInput) / parseFloat(groupRevenueInput)) * 100).toFixed(2)}%
                          </strong>
                          {" "}of group revenue
                          {(parseFloat(restrictedRevenueInput) / parseFloat(groupRevenueInput)) * 100 < 10
                              ? " – below 10% ✓" : " – exceeds 10% ✗"}
                        </div>
                    )}

                {(s2 === "pass" || s2 === "fail") && step2 && (
                    <div className="space-y-1">
                      {step2.isStandalone ? (
                          <div className="rounded-md bg-amber-50 border border-amber-200 px-4 py-2 text-xs text-amber-700">
                            Standalone entity – treated as 100% restricted revenue.
                          </div>
                      ) : (
                          <InfoRow label="Parent Group Revenue" value={step2.groupRevenue !== null ? fmt(step2.groupRevenue) : "–"} />
                      )}
                      <InfoRow label="Restricted Revenue % of Group" value={`${step2.percentage.toFixed(2)}%`} />
                      <div className={`mt-2 rounded-md px-4 py-2 text-sm ${
                          step2.belowThreshold ? "bg-green-100 border border-green-200 text-green-800" : "bg-red-100 border border-red-200 text-red-800"
                      }`}>
                        {step2.belowThreshold
                            ? `✓ Below 10% threshold (${step2.percentage.toFixed(2)}%). Proceed to Step 3.`
                            : `✗ Exceeds 10% threshold (${step2.percentage.toFixed(2)}%). Recommendation: DO NOT INVEST.`}
                      </div>
                    </div>
                )}

                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                    onClick={handleStep2Submit}
                    className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {s2 === "pass" || s2 === "fail"
                      ? isStandalone ? "Update (Standalone)" : "Update"
                      : isStandalone ? "Flag as Standalone (100%)" : "Submit"}
                </button>
              </div>
            </StepCard>

            {/* ── STEP 3 ───────────────────────────────────────────── */}
            <StepCard
                number={3}
                title="Sustainability Goals Check"
                status={display3}
                locked={!step3Unlocked}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Based on your research, does this company's core business actively contribute
                  to any UN Sustainable Development Goals (SDGs)?
                </p>

                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto rounded-md border border-gray-200 p-2">
                  {SDG_GOALS.map((sdg) => (
                      <label key={sdg} className="flex items-start gap-2 text-xs text-gray-700 cursor-pointer hover:bg-gray-50 rounded p-1">
                        <input
                            type="checkbox"
                            checked={selectedSdgs.includes(sdg)}
                            onChange={(e) => setSelectedSdgs((prev) =>
                                e.target.checked ? [...prev, sdg] : prev.filter((s) => s !== sdg)
                            )}
                            className="mt-0.5 accent-indigo-600"
                        />
                        {sdg}
                      </label>
                  ))}
                </div>

                <p className="text-sm text-gray-600">Overall sustainability assessment:</p>
                <div className="flex gap-3">
                  <button
                      onClick={() => setHasSustainabilityManual(true)}
                      disabled={s3 === "pass" || s3 === "fail" || selectedSdgs.length === 0}
                      title={selectedSdgs.length === 0 ? "Tick at least one SDG before selecting Yes" : undefined}
                      className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                          s3 === "pass" || s3 === "fail" || selectedSdgs.length === 0
                              ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                              : hasSustainabilityManual === true
                                  ? "border-green-500 bg-green-50 text-green-700"
                                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    ✓ Yes – Contributes to SDGs
                  </button>
                  <button
                      onClick={() => setHasSustainabilityManual(false)}
                      className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                          hasSustainabilityManual === false
                              ? "border-red-400 bg-red-50 text-red-700"
                              : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    ✗ No – No clear contribution
                  </button>
                </div>

                {(s3 === "pass" || s3 === "fail") && step3 && (
                    <>
                      {step3.alignedSdgs.length > 0 && (
                          <div className="text-sm text-gray-700">
                            <p className="font-medium mb-1">Aligned SDGs:</p>
                            <ul className="list-disc list-inside space-y-0.5 text-gray-600">
                              {step3.alignedSdgs.map((s) => <li key={s}>{s}</li>)}
                            </ul>
                          </div>
                      )}
                      <div className={`rounded-md px-4 py-2 text-sm ${
                          step3.hasSustainability
                              ? "bg-green-100 border border-green-200 text-green-800"
                              : "bg-red-100 border border-red-200 text-red-800"
                      }`}>
                        {step3.hasSustainability
                            ? "✓ Sustainability alignment confirmed. Proceed to Step 4."
                            : "✗ No sustainability alignment. Recommendation: DO NOT INVEST."}
                      </div>
                    </>
                )}

                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex gap-2">
                  <button
                      onClick={handleStep3Submit}
                      className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    {s3 === "pass" || s3 === "fail" ? "Update Assessment" : "Confirm Assessment"}
                  </button>
                </div>
              </div>
            </StepCard>

            {/* ── STEP 4 ───────────────────────────────────────────── */}
            <StepCard
                number={4}
                title="Monitoring Flags"
                status={display4}
                locked={!step4Unlocked}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Based on your research, are there any ESG concern flags, controversies, or
                  red flags associated with this company? (e.g. ongoing lawsuits, environmental
                  incidents, labour disputes, bribery allegations)
                </p>
                <div className="flex gap-3">
                  <button
                      onClick={() => setS4HasFlags(true)}
                      className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                          s4HasFlags === true
                              ? "border-amber-400 bg-amber-50 text-amber-700"
                              : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    ⚠ Yes – Flags Exist
                  </button>
                  <button
                      onClick={() => setS4HasFlags(false)}
                      className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                          s4HasFlags === false
                              ? "border-green-500 bg-green-50 text-green-700"
                              : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    ✓ No – No Flags
                  </button>
                </div>

                {s4HasFlags === true && (
                    <div className="space-y-2">
                  <textarea
                      rows={3}
                      placeholder="Describe the concern flags, controversies, or red flags identified…"
                      value={s4FlagDetails}
                      onChange={(e) => setS4FlagDetails(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                      <input
                          type="text"
                          placeholder="Sources (e.g. news articles, regulatory filings, ESG reports)"
                          value={s4FlagSources}
                          onChange={(e) => setS4FlagSources(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                )}

                {(s4 === "pass" || s4 === "flag") && (
                    <div className={`rounded-md px-4 py-2 text-sm ${
                        s4 === "flag"
                            ? "bg-amber-100 border border-amber-200 text-amber-800"
                            : "bg-green-100 border border-green-200 text-green-800"
                    }`}>
                      {s4 === "flag"
                          ? "⚠ Concern flags noted. Proceed to Step 5 for deeper review."
                          : isAlreadyInvested
                              ? "◈ No significant concern flags. Recommendation: HOLD."
                              : "✓ No significant concern flags. Recommendation: INVEST."}
                    </div>
                )}
                <button
                    onClick={handleStep4Submit}
                    disabled={s4HasFlags === null}
                    className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {s4 === "pass" || s4 === "flag" ? "Update" : "Confirm"}
                </button>
              </div>
            </StepCard>

            {/* ── STEP 5 ───────────────────────────────────────────── */}
            <StepCard
                number={5}
                title="10% Exclusion Violation"
                status={display5}
                locked={!step5Unlocked}
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Based on independent research, does this company&apos;s involvement in a restricted
                  activity exceed the 10% threshold when considering the full scope of operations
                  (not just reported segment revenue)? Enter the verified revenue figures below.
                </p>

                {/* Yes / No toggle */}
                <div className="flex gap-3">
                  <button
                      onClick={() => setS5HasViolation(true)}
                      className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                          s5HasViolation === true
                              ? "border-red-400 bg-red-50 text-red-700"
                              : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    ✗ Yes – Potential Violation
                  </button>
                  <button
                      onClick={() => setS5HasViolation(false)}
                      className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                          s5HasViolation === false
                              ? "border-green-500 bg-green-50 text-green-700"
                              : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    ✓ No – No Violation
                  </button>
                </div>

                {/* Revenue form – only shown when Yes is selected */}
                {s5HasViolation === true && (
                    <div className="space-y-4 rounded-md border border-red-100 bg-red-50 p-4">
                      <p className="text-xs font-medium text-red-700">
                        Enter the verified revenue figures to calculate the actual restricted activity percentage.
                      </p>

                      {/* Restricted segment revenue */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Restricted Segment Revenue
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                          The revenue attributable to the restricted activity per your independent research.
                        </p>
                        <div className="flex gap-2">
                          <span className="flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">$</span>
                          <input
                              type="number" min="0"
                              placeholder="e.g. 5000000000"
                              value={s5RestrictedRevenueInput}
                              onChange={(e) => setS5RestrictedRevenueInput(e.target.value)}
                              className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          />
                        </div>
                      </div>

                      {/* Standalone checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
                        <input
                            type="checkbox"
                            checked={s5IsStandalone}
                            onChange={(e) => {
                              setS5IsStandalone(e.target.checked)
                              if (e.target.checked) setS5GroupRevenueInput("")
                            }}
                            className="mt-0.5 h-4 w-4 accent-amber-600"
                        />
                        <span className="text-sm text-amber-800">
                      <strong>This company has no parent group.</strong>
                      <br />
                      <span className="text-xs font-normal">
                        Standalone entity – treated as 100% restricted revenue and will be flagged as a violation.
                      </span>
                    </span>
                      </label>

                      {/* Parent group revenue */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Parent Group Total Revenue
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                          Total consolidated revenue of the parent group.
                        </p>
                        <div className="flex gap-2">
                      <span className={`flex items-center rounded-l-md border border-r-0 px-3 text-sm transition-colors ${
                          s5IsStandalone ? "border-gray-200 bg-gray-100 text-gray-400" : "border-gray-300 bg-gray-50 text-gray-500"
                      }`}>$</span>
                          <input
                              type="number" min="0"
                              placeholder={s5IsStandalone ? "N/A – standalone company" : "e.g. 50000000000"}
                              value={s5IsStandalone ? "" : s5GroupRevenueInput}
                              onChange={(e) => setS5GroupRevenueInput(e.target.value)}
                              disabled={s5IsStandalone}
                              className={`flex-1 rounded-r-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                                  s5IsStandalone
                                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "border-gray-300 bg-white text-gray-900"
                              }`}
                          />
                        </div>
                      </div>

                      {/* Live preview */}
                      {s5LivePct !== null && (
                          <div className="rounded-md bg-white border border-gray-200 px-4 py-2 text-sm text-gray-600">
                            Estimated share:{" "}
                            <strong className={s5LivePct >= 10 ? "text-red-600" : "text-green-700"}>
                              {s5LivePct.toFixed(2)}%
                            </strong>
                            {" "}of group revenue
                            {s5LivePct < 10 ? " – below 10% ✓" : " – exceeds 10% ✗"}
                          </div>
                      )}

                      {/* Sources */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sources</label>
                        <input
                            type="text"
                            placeholder="e.g. annual report URL, regulatory filing, analyst note"
                            value={s5Sources}
                            onChange={(e) => setS5Sources(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                      </div>
                    </div>
                )}

                <button
                    onClick={handleStep5Submit}
                    className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {s5 === "pass" || s5 === "fail" ? "Update" : "Confirm"}
                </button>

                {(s5 === "pass" || s5 === "fail") && (
                    <div className={`rounded-md px-4 py-2 text-sm ${
                        step5?.exclusionViolation
                            ? "bg-red-100 border border-red-200 text-red-800"
                            : "bg-green-100 border border-green-200 text-green-800"
                    }`}>
                      {step5?.exclusionViolation
                          ? `✗ Exclusion violation confirmed (${step5.percentage.toFixed(2)}% ≥ 10%). Recommendation: DISINVEST.`
                          : `✓ No exclusion violation (${step5?.percentage.toFixed(2)}% < 10%). Proceed to Step 6.`}
                    </div>
                )}

                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
            </StepCard>

            {/* ── STEP 6 ───────────────────────────────────────────── */}
            <StepCard
                number={6}
                title="Unethical Evidence – Substantiated?"
                status={display6}
                locked={!step6Unlocked}
            >
              <p className="text-sm text-gray-600 mb-3">
                Based on your independent research, is there <strong>substantiated evidence</strong> (court
                rulings, third-party audits, verified investigative journalism) of serious unethical behaviour?
              </p>

              <div className="flex gap-3 mb-3">
                <button
                    onClick={() => setS6HasEvidence(true)}
                    className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                        s6HasEvidence === true
                            ? "border-red-400 bg-red-50 text-red-700"
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  ✗ Yes – Evidence Exists
                </button>
                <button
                    onClick={() => setS6HasEvidence(false)}
                    className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                        s6HasEvidence === false
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  ✓ No – No Evidence
                </button>
              </div>

              {s6HasEvidence === true && (
                  <div className="space-y-2">
                <textarea
                    rows={3}
                    placeholder="Describe the unethical behaviour and substantiated evidence…"
                    value={s6EvidenceDetails}
                    onChange={(e) => setS6EvidenceDetails(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                    <input
                        type="text"
                        placeholder="Sources (e.g. court ruling reference, audit firm, publication URL)"
                        value={s6Sources}
                        onChange={(e) => setS6Sources(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
              )}

              {(s6 === "pass" || s6 === "flag") && (
                  <div className={`mt-3 rounded-md px-4 py-2 text-sm ${
                      step6?.unethicalEvidence
                          ? "bg-amber-100 border border-amber-200 text-amber-800"
                          : "bg-green-100 border border-green-200 text-green-800"
                  }`}>
                    {step6?.unethicalEvidence
                        ? "⚠ Unethical evidence confirmed. Proceed to Step 7 to assess remediation."
                        : isAlreadyInvested
                            ? "◈ No substantiated unethical evidence. Recommendation: HOLD."
                            : "✓ No substantiated unethical evidence. Recommendation: No further action."}
                  </div>
              )}
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <button
                  onClick={handleStep6Submit}
                  className="mt-3 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {s6 === "pass" || s6 === "flag" ? "Update" : "Confirm"}
              </button>
            </StepCard>

            {/* ── STEP 7 ───────────────────────────────────────────── */}
            <StepCard
                number={7}
                title="Engage – Has It Been Corrected?"
                status={display7}
                locked={!step7Unlocked}
            >
              <p className="text-sm text-gray-600 mb-3">
                Has the company taken verified, substantiated steps to remediate the identified
                unethical behaviour? (e.g. executive dismissals, fines paid, independent audit
                confirming supply chain reform)
              </p>

              <div className="flex gap-3 mb-3">
                <button
                    onClick={() => setS7IsCorrected(true)}
                    className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                        s7IsCorrected === true
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  ✓ Yes – Corrected
                </button>
                <button
                    onClick={() => setS7IsCorrected(false)}
                    className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                        s7IsCorrected === false
                            ? "border-red-400 bg-red-50 text-red-700"
                            : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  ✗ No – Not Corrected
                </button>
              </div>

              <textarea
                  rows={3}
                  placeholder="Describe the remediation evidence or explain why it is insufficient…"
                  value={s7CorrectionDetails}
                  onChange={(e) => setS7CorrectionDetails(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                  type="text"
                  placeholder="Sources (e.g. court settlement reference, audit report URL, press release)"
                  value={s7Sources}
                  onChange={(e) => setS7Sources(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {(s7 === "pass" || s7 === "fail") && (
                  <div className={`mt-3 rounded-md px-4 py-2 text-sm ${
                      step7?.isCorrected
                          ? "bg-green-100 border border-green-200 text-green-800"
                          : "bg-red-100 border border-red-200 text-red-800"
                  }`}>
                    {step7?.isCorrected
                        ? isAlreadyInvested
                            ? "◈ Issue remediated. Recommendation: HOLD."
                            : "✓ Issue remediated. No further action required."
                        : "✗ Issue not corrected. Recommendation: DISINVEST."}
                  </div>
              )}
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <button
                  onClick={handleStep7Submit}
                  className="mt-3 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {s7 === "pass" || s7 === "fail" ? "Update" : "Confirm"}
              </button>
            </StepCard>

            {/* ── COMPLIANCE REPORT ─────────────────────────────────── */}
            {showReport && (
                <div ref={reportRef} id="compliance-report" className="mt-10">
                  <div className="flex items-center justify-between mb-4 no-print">
                    <h2 className="text-xl font-bold text-gray-900">Compliance Report</h2>
                    <button
                        onClick={handlePrint}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Download / Print
                    </button>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="border-b border-gray-100 pb-4 mb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {report.companyName} ({report.ticker})
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Newcastle University Investment Fund – Compliance Review
                          </p>
                        </div>
                        <p className="text-xs text-gray-400">{report.runAt}</p>
                      </div>
                    </div>

                    <table className="w-full text-sm mb-4">
                      <thead>
                      <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <th className="pb-2 w-6">#</th>
                        <th className="pb-2">Step</th>
                        <th className="pb-2 w-24 text-center">Result</th>
                        <th className="pb-2">Summary</th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                      {report.steps.map((step, i) => (
                          <tr key={i} className="align-top">
                            <td className="py-2 text-gray-400 text-xs">{i + 1}</td>
                            <td className="py-2 font-medium text-gray-800 pr-4">{step.label}</td>
                            <td className="py-2 text-center">
                              <StatusBadge status={step.status} />
                            </td>
                            <td className="py-2 text-gray-500 text-xs">{step.summary}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>

                    <DecisionBanner decision={report.decision} />

                    {(step4?.hasFlags || step6?.unethicalEvidence || step5?.exclusionViolation) && (
                        <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm">
                          <p className="font-semibold text-gray-700 mb-2">Compliance Officer Notes</p>
                          {step4?.hasFlags && step4.flagDetails && (
                              <div className="mb-2">
                                <p className="text-xs font-medium text-gray-500">Step 4 – Monitoring Flags</p>
                                <p className="text-gray-700">{step4.flagDetails}</p>
                                {step4.flagSources && (
                                    <p className="text-xs text-gray-400 mt-0.5">Sources: {step4.flagSources}</p>
                                )}
                              </div>
                          )}
                          {step5?.exclusionViolation && step5.violationDetails && (
                              <div className="mb-2">
                                <p className="text-xs font-medium text-gray-500">Step 5 – Violation Details</p>
                                <p className="text-gray-700">{step5.violationDetails}</p>
                                {step5.sources && (
                                    <p className="text-xs text-gray-400 mt-0.5">Sources: {step5.sources}</p>
                                )}
                              </div>
                          )}
                          {step6?.unethicalEvidence && step6.evidenceDetails && (
                              <div className="mb-2">
                                <p className="text-xs font-medium text-gray-500">Step 6 – Evidence</p>
                                <p className="text-gray-700">{step6.evidenceDetails}</p>
                                {step6.sources && (
                                    <p className="text-xs text-gray-400 mt-0.5">Sources: {step6.sources}</p>
                                )}
                              </div>
                          )}
                          {step7?.correctionDetails && (
                              <div>
                                <p className="text-xs font-medium text-gray-500">Step 7 – Remediation</p>
                                <p className="text-gray-700">{step7.correctionDetails}</p>
                                {step7.sources && (
                                    <p className="text-xs text-gray-400 mt-0.5">Sources: {step7.sources}</p>
                                )}
                              </div>
                          )}
                        </div>
                    )}

                    <p className="mt-4 text-xs text-gray-400">
                      This report is generated for informational purposes only and does not constitute
                      investment advice. All manual assessments reflect the judgment of the reviewing
                      compliance officer. Newcastle University Investment Fund.
                    </p>
                  </div>
                </div>
            )}

            <section className="mt-12 no-print rounded-lg border border-gray-200 bg-gray-50 px-6 py-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-600">
                Developed and maintained by and for the Newcastle University Investment Fund:
              </h2>

              <p className="mt-4 text-lg font-semibold text-gray-900">Developer(s)</p>
              <ul className="mt-2 space-y-2 text-lg text-gray-900">
                <li>
                  <a
                    href="https://www.linkedin.com/in/james-delin-89b737394/"
                    className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    James Delin
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/ryan-duong-97b960328/"
                    className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ryan Duong
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/sarahr15/"
                    className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sarah Rafiepour
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/shalom-ademuwagun-a7318420a/"
                    className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shalom Ademuwagun
                  </a>
                </li>
              </ul>

              <p className="mt-6 text-lg text-gray-900">
                <span className="font-semibold">Publisher</span>
              </p>
              <p className="mt-2 text-lg text-gray-900">
                <a
                  href="https://www.linkedin.com/in/samraat-jain/"
                  className="text-blue-900 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Samraat Jain
                </a>
              </p>
            </section>

            <section className="mt-10 border-t border-gray-200 pt-5">
              <div className="space-y-4 text-xs leading-relaxed text-gray-500">
                <div>
                  <h4 className="font-semibold text-gray-600">Tool Disclaimer</h4>
                  <p>
                    This interface and the "Stock Compliance Tool" is developed by the Digital Infrastructure team within
                    the Newcastle University Investment Fund (NUIF) for sole educational and research purposes. NUIF is not
                    authorized, supervised, or regulated by any financial authority (including the FCA) to provide
                    financial services, algorithmic trading signals, or investment advisory. NUIF may hold positions in
                    any security analyzed by this tool and may change those positions at any time without notice.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-600">General Disclaimer &amp; Model Risk</h4>
                  <p>
                    The outputs generated by this tool do not constitute investment or financial advice. The "Stock Compliance
                    Tool" applies a rules-based compliance workflow; it is not a real-time financial instrument and should not
                    be used as the basis for any financial decision.
                  </p>
                  <p className="mt-2 italic">
                    Users should conduct independent due diligence. NUIF and its members disclaim all liability for the
                    accuracy of compliance outcomes or investment decisions derived from this tool. We accept no liability for
                    any direct or consequential loss arising from the use of this tool. You are explicitly warned: relying
                    on compliance logic built by untrained University students is unlikely to be a profitable investment
                    strategy and carries significant risk.
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
        </section>

        <Footer />
      </main>
  )
}