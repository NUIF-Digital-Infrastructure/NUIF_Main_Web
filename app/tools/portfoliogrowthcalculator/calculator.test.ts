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

describe("Example B: continuous, yearly", () => {
    // £10,000 start; each year has its own return, inflation and contribution
    const periods: Period[] = [
        { returnRate: 0.09, inflationRate: 0.015, contribution: 500 },
        { returnRate: -0.04, inflationRate: 0.02, contribution: 500 },
        { returnRate: 0.11, inflationRate: 0.02, contribution: 1_000 },
    ]
    let results: PeriodResult[]

    beforeAll(() => {
        results = simulate(10_000, periods)
    })

    it.each([
        // period, nominal,  real
        [0, 10_000.0, 10_000.0],
        [1, 11_400.0, 11_231.53],
        [2, 11_444.0, 11_053.8],
        [3, 13_702.84, 12_976.1],
    ])("year %i", (period, nominal, real) => {
        expect(results[period].nominal).toBeCloseTo(nominal, 2)
        expect(results[period].real).toBeCloseTo(real, 2)
    })

    it("totals the contributions", () => {
        expect(results[3].totalContributed).toBe(2_000)
    })

    it("loses value in year 2 apart from the contribution", () => {
        expect(results[2].nominal).toBeLessThan(results[1].nominal + 500)
    })
})

describe("Example C: fixed duration, monthly", () => {
    // £10,000 start, 0.75% return, 0.2% inflation, £100 contribution, 12 months
    const month: Period = { returnRate: 0.0075, inflationRate: 0.002, contribution: 100 }
    let results: PeriodResult[]

    beforeAll(() => {
        results = simulate(10_000, Array(12).fill(month))
    })

    it("returns the starting point plus one result per month", () => {
        expect(results).toHaveLength(13)
    })

    it.each([
        // period, nominal,  real
        [0, 10_000.0, 10_000.0],
        [1, 10_175.0, 10_154.69],
        [2, 10_351.31, 10_310.03],
        [3, 10_528.95, 10_466.03],
        [4, 10_707.91, 10_622.68],
        [5, 10_888.22, 10_779.99],
        [6, 11_069.89, 10_937.97],
        [7, 11_252.91, 11_096.62],
        [8, 11_437.31, 11_255.95],
        [9, 11_623.09, 11_415.95],
        [10, 11_810.26, 11_576.63],
        [11, 11_998.84, 11_738.0],
        [12, 12_188.83, 11_900.06],
    ])("month %i", (period, nominal, real) => {
        expect(results[period].nominal).toBeCloseTo(nominal, 2)
        expect(results[period].real).toBeCloseTo(real, 2)
    })

    it("totals the contributions", () => {
        expect(results[12].totalContributed).toBe(1_200)
    })
})

describe("Edge cases", () => {
    it("grows only by contributions when return and inflation are both 0%", () => {
        const flat: Period = { returnRate: 0, inflationRate: 0, contribution: 100 }
        const results = simulate(1_000, Array(3).fill(flat))

        expect(results[3].nominal).toBe(1_300)
        expect(results[3].real).toBe(1_300)
    })

    it("starts from £0 when there is a contribution", () => {
        const year: Period = { returnRate: 0.05, inflationRate: 0, contribution: 1_000 }
        const results = simulate(0, Array(2).fill(year))

        expect(results[2].nominal).toBeCloseTo(2_050.0, 2)
    })

    it("shows real value above nominal value when there is deflation", () => {
        const year: Period = { returnRate: 0.05, inflationRate: -0.02, contribution: 0 }
        const results = simulate(10_000, Array(3).fill(year))

        expect(results[3].real).toBeGreaterThan(results[3].nominal)
    })

    it("never goes below £0, even with a −99% return", () => {
        const year: Period = { returnRate: -0.99, inflationRate: 0.02, contribution: 0 }
        const results = simulate(10_000, Array(5).fill(year))

        for (const row of results) {
            expect(row.nominal).toBeGreaterThanOrEqual(0)
            expect(row.real).toBeGreaterThanOrEqual(0)
        }
    })

    it("stays a real number over the maximum 600 intervals", () => {
        const month: Period = { returnRate: 0.01, inflationRate: 0.005, contribution: 100 }
        const results = simulate(10_000, Array(600).fill(month))

        expect(results).toHaveLength(601)
        expect(Number.isFinite(results[600].nominal)).toBe(true)
        expect(Number.isFinite(results[600].real)).toBe(true)
    })

    it("does not change the periods it was given", () => {
        const periods: Period[] = [
            { returnRate: 0.09, inflationRate: 0.015, contribution: 500 },
            { returnRate: -0.04, inflationRate: 0.02, contribution: 500 },
        ]
        const original = structuredClone(periods)

        simulate(10_000, periods)

        expect(periods).toEqual(original)
    })
})