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
    throw new Error("simulate() is not implemented yet")
}
