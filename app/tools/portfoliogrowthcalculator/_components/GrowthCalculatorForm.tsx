"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { validateInputs } from "../validation"

export type CalculatorInputs = {
  startingValue: number
  returnRate: number
  inflationRate: number
  contribution: number
  duration: number
}

type GrowthCalculatorFormProps = {
  onCalculate: (inputs: CalculatorInputs) => void
}

export function GrowthCalculatorForm({ onCalculate }: GrowthCalculatorFormProps) {
  const [startingValue, setStartingValue] = React.useState("")
  const [returnRate, setReturnRate] = React.useState("")
  const [inflationRate, setInflationRate] = React.useState("")
  const [contribution, setContribution] = React.useState("")
  const [duration, setDuration] = React.useState("")
  const [interval, setInterval] = React.useState("1 month")
  const [isFixedDuration, setIsFixedDuration] = React.useState(true)

  const [errors, setErrors] = React.useState<{ [key: string]: string }>({})

  React.useEffect(() => {
    const result = validateInputs(
      startingValue,
      returnRate,
      inflationRate,
      contribution,
      duration,
      isFixedDuration
    )

    setErrors(result.errors)

    if (result.isValid) {
      onCalculate(result.parsedValues)
    }
  }, [startingValue, returnRate, inflationRate, contribution, duration, isFixedDuration, onCalculate])

  const handleStartingValueChange = (val: string) => {
    if (val === "" || parseFloat(val) >= 0) {
      setStartingValue(val)
    }
  }

  const handleReturnRateChange = (val: string) => {
    if (val === "" || val === "-" || parseFloat(val) > -100) {
      setReturnRate(val)
    }
  }

  const handleInflationRateChange = (val: string) => {
    if (val === "" || val === "-" || parseFloat(val) > -100) {
      setInflationRate(val)
    }
  }

  const handleContributionChange = (val: string) => {
    if (val === "" || parseFloat(val) >= 0) {
      setContribution(val)
    }
  }

  const handleDurationChange = (val: string) => {
    if (val === "" || parseInt(val) >= 0) {
      setDuration(val)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+"].includes(e.key)) {
      e.preventDefault()
    }
  }

  const intervals = [
    { label: "1 week", value: "1 week" },
    { label: "1 month", value: "1 month" },
    { label: "3 months", value: "3 months" },
    { label: "6 months", value: "6 months" },
    { label: "1 year", value: "1 year" },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Calculator Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Starting Value */}
          <div className="space-y-2">
            <Label htmlFor="startingValue">Starting Value</Label>
            <Input
              id="startingValue"
              type="number"
              placeholder="0.00"
              value={startingValue}
              onChange={(e) => handleStartingValueChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className={errors.startingValue ? "border-red-500" : ""}
            />
            {errors.startingValue && (
              <p className="text-sm text-red-500">{errors.startingValue}</p>
            )}
          </div>

          {/* Interval */}
          <div className="space-y-2">
            <Label htmlFor="interval">Interval</Label>
            <Select value={interval} onValueChange={setInterval}>
              <SelectTrigger id="interval">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent className={"bg-white"}>
                {intervals.map((int) => (
                  <SelectItem key={int.value} value={int.value}>
                    {int.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Return */}
          <div className="space-y-2">
            <Label htmlFor="return">Return (% per {interval})</Label>
            <Input
              id="return"
              type="number"
              placeholder="0.00"
              value={returnRate}
              onChange={(e) => handleReturnRateChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className={errors.returnRate ? "border-red-500" : ""}
            />
            {errors.returnRate && (
              <p className="text-sm text-red-500">{errors.returnRate}</p>
            )}
          </div>

          {/* Inflation */}
          <div className="space-y-2">
            <Label htmlFor="inflation">Inflation (% per {interval})</Label>
            <Input
              id="inflation"
              type="number"
              placeholder="0.00"
              value={inflationRate}
              onChange={(e) => handleInflationRateChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className={errors.inflationRate ? "border-red-500" : ""}
            />
            {errors.inflationRate && (
              <p className="text-sm text-red-500">{errors.inflationRate}</p>
            )}
          </div>

          {/* Contribution */}
          <div className="space-y-2">
            <Label htmlFor="contribution">Contribution</Label>
            <Input
              id="contribution"
              type="number"
              placeholder="0.00"
              value={contribution}
              onChange={(e) => handleContributionChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className={errors.contribution ? "border-red-500" : ""}
            />
            {errors.contribution && (
              <p className="text-sm text-red-500">{errors.contribution}</p>
            )}
          </div>

          {/* Mode (Fixed Duration Switch) */}
          <div className="flex items-center space-x-2 pt-8">
            <Switch
              id="duration-mode"
              checked={isFixedDuration}
              onCheckedChange={setIsFixedDuration}
            />
            <Label htmlFor="duration-mode">Fixed Duration Mode</Label>
          </div>

          {/* Duration (shown only in fixed-duration mode) */}
          {isFixedDuration ? (
            <div className="space-y-2">
              <Label htmlFor="duration">Duration ({interval}s)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="12"
                value={duration}
                onChange={(e) => handleDurationChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className={errors.duration ? "border-red-500" : ""}
              />
              {errors.duration && (
                <p className="text-sm text-red-500">{errors.duration}</p>
              )}
            </div>
          ) : (
            <div className="flex items-end pb-1">
               <p className="text-sm text-muted-foreground">Unlimited mode not implemented yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
