"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PeriodResult } from "../calculator"
import { formatPounds, summarise } from "./summary"

type ResultsSummaryProps = {
    /** Output of simulate(): period 0 is the starting value, the last entry is the final interval. */
    results: PeriodResult[]
    /** The starting value the user entered. */
    startValue: number
    /** True while the form has a validation error. Nothing is shown in that case. */
    hasError?: boolean
}

export function ResultsSummary({ results, startValue, hasError = false }: ResultsSummaryProps) {
    // Show nothing while the form is invalid or before a run exists.
    if (hasError || results.length === 0) return null

    const { finalNominal, finalReal, totalContributed, totalGrowth } = summarise(results, startValue)

    const figures = [
        { label: "Final nominal value", value: finalNominal },
        { label: "Final real value", value: finalReal },
        { label: "Total contributed", value: totalContributed },
        { label: "Total investment growth", value: totalGrowth },
    ]

    return (
        <section aria-labelledby="results-heading" className="mt-8 space-y-3">
            <h2 id="results-heading" className="text-xl font-semibold">
                Results
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {figures.map(({ label, value }) => (
                    <Card key={label}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{formatPounds(value)}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <p className="text-sm text-muted-foreground">
                Illustrative only. This tool does not predict returns and is not financial advice.
            </p>
        </section>
    )
}
