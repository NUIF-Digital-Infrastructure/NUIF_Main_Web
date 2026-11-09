/** The assumptions for one interval. Rates are decimals: 0.09 means 9%. */
export type Period = {
    returnRate: number
    inflationRate: number
    contribution: number
}

/** The portfolio after one interval. Values are full precision; round only for display. */
export type PeriodResult = {
    /** 0 is the starting point, 1 is the end of the first interval, and so on. */
    period: number
    /** Pounds in the portfolio. */
    nominal: number
    /** Nominal value in today's money. */
    real: number
    /** Total contributions added so far. */
    totalContributed: number
}

/**
 * Runs the simulation described in section 6 of the concept document.
 * Returns one result per interval, starting with period 0 (the starting value).
 *
 * Maths lead: replace the body of this function.
 */
export function simulate(startValue: number, periods: Period[]): PeriodResult[] {
    let nominal = startValue
    let index = 1
    let totalContributed = 0

    const results: PeriodResult[] = [
        { period: 0, nominal, real: nominal, totalContributed },
    ]

    periods.forEach((p, i) => {
        nominal = nominal * (1 + p.returnRate)   // 1. apply the return
        nominal = nominal + p.contribution       // 2. add the contribution (end of interval)
        index = index * (1 + p.inflationRate)    // 3. update the inflation index
        const real = nominal / index             // 4. real value
        totalContributed += p.contribution

        results.push({ period: i + 1, nominal, real, totalContributed })
    })

    return results
}
