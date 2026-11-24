"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

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
  const [startingValue, setStartingValue] = React.useState("0")
  const [returnRate, setReturnRate] = React.useState("0")
  const [inflationRate, setInflationRate] = React.useState("0")
  const [contribution, setContribution] = React.useState("0")
  const [duration, setDuration] = React.useState("12")
  const [interval, setInterval] = React.useState("1 month")
  const [isFixedDuration, setIsFixedDuration] = React.useState(true)

  React.useEffect(() => {
    onCalculate({
      startingValue: parseFloat(startingValue) || 0,
      returnRate: (parseFloat(returnRate) || 0) / 100,
      inflationRate: (parseFloat(inflationRate) || 0) / 100,
      contribution: parseFloat(contribution) || 0,
      duration: isFixedDuration ? (parseInt(duration) || 0) : 0
    })
  }, [startingValue, returnRate, inflationRate, contribution, duration, isFixedDuration, onCalculate])

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
              onChange={(e) => setStartingValue(e.target.value)}
            />
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
              onChange={(e) => setReturnRate(e.target.value)}
            />
          </div>

          {/* Inflation */}
          <div className="space-y-2">
            <Label htmlFor="inflation">Inflation (% per {interval})</Label>
            <Input
              id="inflation"
              type="number"
              placeholder="0.00"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
            />
          </div>

          {/* Contribution */}
          <div className="space-y-2">
            <Label htmlFor="contribution">Contribution</Label>
            <Input
              id="contribution"
              type="number"
              placeholder="0.00"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
            />
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
                onChange={(e) => setDuration(e.target.value)}
              />
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
