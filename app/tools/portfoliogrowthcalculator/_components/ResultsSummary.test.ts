import { describe, expect, it } from "vitest"
import { simulate, type Period } from "../calculator"
import { formatPounds, summarise } from "./summary"

// Example A from the concept document, section 8.
const exampleA: Period[] = Array.from({ length: 5 }, () => ({
    returnRate: 0.09,
    inflationRate: 0.015,
    contribution: 500,
}))

describe("Results summary", () => {
    it("shows the four example A figures", () => {
        const s = summarise(simulate(10000, exampleA), 10000)
        expect(formatPounds(s.finalNominal)).toBe("£18,378.59")
        expect(formatPounds(s.finalReal)).toBe("£17,060.12")
        expect(formatPounds(s.totalContributed)).toBe("£2,500.00")
        expect(formatPounds(s.totalGrowth)).toBe("£5,878.59")
    })

    it("formats pounds with thousands separators and 2 decimals", () => {
        expect(formatPounds(1234567.8)).toBe("£1,234,567.80")
        expect(formatPounds(0)).toBe("£0.00")
    })
})
