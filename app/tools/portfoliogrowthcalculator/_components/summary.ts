import type { PeriodResult } from "../calculator"

/** Pounds with thousands separators and 2 decimal places, e.g. £18,378.59. */
export function formatPounds(value: number): string {
    return value.toLocaleString("en-GB", { style: "currency", currency: "GBP" })
}

/** The four headline figures. Full precision; round only when formatting. */
export function summarise(results: PeriodResult[], startValue: number) {
    const last = results[results.length - 1]
    return {
        finalNominal: last.nominal,
        finalReal: last.real,
        totalContributed: last.totalContributed,
        totalGrowth: last.nominal - startValue - last.totalContributed,
    }
}
