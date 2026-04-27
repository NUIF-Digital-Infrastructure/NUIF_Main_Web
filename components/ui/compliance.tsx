"use client";

import {useState} from "react";

export type ResultType = "invest" | "reject" | "info"

export interface Stock {
    name: string
    sector: string
    info: string
    revenuePercent: number
}

export default function ComplianceBox(props: { stocks: Record<string, Stock>, restrictedSectors: string[] }) {
    const [ticker, setTicker] = useState("")
    const [stock, setStock] = useState<Stock | null>(null)
    const [step, setStep] = useState(0)
    const [result, setResult] = useState<{ msg: string; type: ResultType } | null>(null)

    const reset = () => {
        setResult(null)
        setStep(0)
        setStock(null)
    }

    const startCheck = () => {
        reset()
        const foundStock = props.stocks[ticker.trim().toUpperCase()]
        if (!foundStock) {
            setResult({msg: "Stock not found. Try: AAPL, RTX, MSFT, BAC, PM", type: "info"})
            return
        }

        setStock(foundStock)

        if (!props.restrictedSectors.includes(foundStock.sector)) {
            setResult({msg: "Step 1 PASS — Not in a restricted sector → INVEST", type: "invest"})
        } else if (foundStock.revenuePercent >= 10) {
            setResult({
                msg: `Step 2 FAIL — ${foundStock.revenuePercent}% revenue in restricted sector (≥ 10%) → REJECT`,
                type: "reject",
            })
        } else {
            setStep(3)
        }
    }

    const handleYes = () => {
        if (step === 3) setStep(4)
        else if (step === 4) setStep(5)
        else if (step === 5) {
            setResult({msg: "Step 5 FAIL — Does not pass exclusion threshold → REJECT", type: "reject"})
            setStep(0)
        } else if (step === 6) setStep(7)
        else if (step === 7) {
            setResult({msg: "Step 7 PASS — Issue corrected → INVEST", type: "invest"})
            setStep(0)
        }
    }

    const handleNo = () => {
        if (step === 3) {
            setResult({msg: "Step 3 FAIL — Does not meet sustainability goals → REJECT", type: "reject"})
            setStep(0)
        } else if (step === 4 || step === 5) setStep(6)
        else if (step === 6) {
            setResult({msg: "Step 6 PASS — No unethical behaviour found → INVEST", type: "invest"})
            setStep(0)
        } else if (step === 7) {
            setResult({msg: "Step 7 FAIL — Issue not corrected → REJECT", type: "reject"})
            setStep(0)
        }
    }

    const getStepContent = () => {
        switch (step) {
            case 3:
                return {
                    label: "Step 3 of 7",
                    question: `Revenue in restricted sector is ${stock?.revenuePercent}% (passes < 10% threshold). Does this investment meet the fund's sustainability goals?`,
                }
            case 4:
                return {
                    label: "Step 4 of 7",
                    question: "Are there any ESG red flags associated with this investment?",
                }
            case 5:
                return {
                    label: "Step 5 of 7",
                    question: "Does the company pass the 10% exclusion threshold for the flagged ESG activity?",
                }
            case 6:
                return {
                    label: "Step 6 of 7",
                    question: "Is there any substantiated evidence of unethical behaviour?",
                }
            case 7:
                return {
                    label: "Step 7 of 7",
                    question: "Has the identified unethical behaviour been corrected or remediated?",
                }
            default:
                return null
        }
    }

    const stepContent = getStepContent()

    return (
        <>
            <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Compliance</p>
                <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Stock Compliance Tool</h1>
            </div>

            <div className="mt-8 space-y-4">
                <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    placeholder="Enter ticker (AAPL, RTX, MSFT, BAC, PM)"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition"
                />
                <button
                    onClick={startCheck}
                    className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Start Check
                </button>
            </div>

            {stock && (
                <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h3 className="font-semibold text-gray-900">{stock.name}</h3>
                    <p className="text-sm text-gray-600">{stock.info}</p>
                    <p className="mt-1 text-sm font-medium text-gray-700">Sector: {stock.sector}</p>
                </div>
            )}

            {stepContent && !result && (
                <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">{stepContent.label}</p>
                    <p className="mt-2 text-lg font-medium text-gray-900">{stepContent.question}</p>
                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={handleYes}
                            className="flex-1 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleNo}
                            className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}

            {result && (
                <div
                    className={`mt-6 rounded-lg border p-4 text-center font-semibold ${
                        result.type === "invest"
                            ? "border-green-200 bg-green-50 text-green-800"
                            : result.type === "reject"
                                ? "border-red-200 bg-red-50 text-red-800"
                                : "border-blue-200 bg-blue-50 text-blue-800"
                    }`}
                >
                    {result.msg}
                </div>
            )}
        </>
    );
}