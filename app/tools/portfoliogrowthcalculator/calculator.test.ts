import { beforeAll, describe, expect, it } from "vitest"
import { simulate, type Period, type PeriodResult } from "./calculator"

// Worked examples from section 8 of the concept document.
// The calculator must reproduce every figure to the penny.

describe("Example A: fixed duration, yearly", () => {
    // £10,000 start, 9% return, 1.5% inflation, £500 contribution, 5 years
    const year: Period = { returnRate: 0.09, inflationRate: 0.015, contribution: 500 }
    let results: PeriodResult[]

    beforeAll(() => {
        results = simulate(10_000, Array(5).fill(year))
    })

    it("returns the starting point plus one result per year", () => {
        expect(results).toHaveLength(6)
    })

    it.each([
        // period, nominal,  real
        [0, 10_000.0, 10_000.0],
        [1, 11_400.0, 11_231.53],
        [2, 12_926.0, 12_546.77],
        [3, 14_589.34, 13_952.03],
        [4, 16_402.38, 15_454.06],
        [5, 18_378.59, 17_060.12],
    ])("year %i", (period, nominal, real) => {
        // toBeCloseTo(x, 2) passes when the value is within half a penny of x
        expect(results[period].nominal).toBeCloseTo(nominal, 2)
        expect(results[period].real).toBeCloseTo(real, 2)
    })

    it("totals the contributions", () => {
        expect(results[5].totalContributed).toBe(2_500)
    })
})

describe("Edge cases", () => {
    it("grows only by contributions when return and inflation are both 0%", () => {
        const flat: Period = { returnRate: 0, inflationRate: 0, contribution: 100 }
        const results = simulate(1_000, Array(3).fill(flat))

        expect(results[3].nominal).toBe(1_300)
        expect(results[3].real).toBe(1_300)
    })
})