export type ValidationResult = {
  isValid: boolean
  errors: { [key: string]: string }
  parsedValues: {
    startingValue: number
    returnRate: number
    inflationRate: number
    contribution: number
    duration: number
  }
}

export function validateInputs(
  startingValue: string,
  returnRate: string,
  inflationRate: string,
  contribution: string,
  duration: string,
  isFixedDuration: boolean
): ValidationResult {
  const errors: { [key: string]: string } = {}

  const sVal = startingValue === "" ? 0 : parseFloat(startingValue)
  const rRate = (returnRate === "" || returnRate === "-") ? 0 : parseFloat(returnRate)
  const iRate = (inflationRate === "" || inflationRate === "-") ? 0 : parseFloat(inflationRate)
  const cont = contribution === "" ? 0 : parseFloat(contribution)
  const dur = duration === "" ? 12 : parseInt(duration)

  if (startingValue !== "" && isNaN(parseFloat(startingValue))) {
    errors.startingValue = "Please enter a starting value"
  }
  if (returnRate !== "" && returnRate !== "-" && isNaN(parseFloat(returnRate))) {
    errors.returnRate = "Please enter a return rate"
  }
  if (inflationRate !== "" && inflationRate !== "-" && isNaN(parseFloat(inflationRate))) {
    errors.inflationRate = "Please enter an inflation rate"
  }
  if (contribution !== "" && isNaN(parseFloat(contribution))) {
    errors.contribution = "Please enter a contribution"
  }
  if (isFixedDuration && duration !== "" && isNaN(parseInt(duration))) {
    errors.duration = "Please enter a duration"
  }

  // Range checks
  if (!errors.startingValue && startingValue !== "" && sVal < 0) {
    errors.startingValue = "Starting value must be £0 or more"
  }
  if (!errors.contribution && contribution !== "" && cont < 0) {
    errors.contribution = "Contribution must be £0 or more"
  }

  if (!errors.returnRate && returnRate !== "" && returnRate !== "-") {
    if (rRate <= -100) errors.returnRate = "Return must be above -100%"
  }

  if (!errors.inflationRate && inflationRate !== "" && inflationRate !== "-") {
    if (iRate <= -100) errors.inflationRate = "Inflation must be above -100%"
  }

  if (isFixedDuration && !errors.duration && duration !== "") {
    if (dur <= 0) errors.duration = "Duration must be at least 1"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    parsedValues: {
      startingValue: sVal,
      returnRate: rRate / 100,
      inflationRate: iRate / 100,
      contribution: cont,
      duration: isFixedDuration ? dur : 0,
    },
  }
}
