"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import type { Employee, DayAvailability } from "./EmployeeManagement"

interface AvailabilityListViewProps {
  employee: Employee
  updateEmployee: (employee: Employee) => void
}

const daysOfWeek = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]

export default function AvailabilityListView({ employee, updateEmployee }: AvailabilityListViewProps) {
  const [availability, setAvailability] = useState(employee.availability)

  const handleUpdateAvailability = () => {
    updateEmployee({ ...employee, availability })
  }

  const handleAvailabilityChange = (day: string, value: DayAvailability) => {
    setAvailability((prev) => ({ ...prev, [day]: value }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-2">Update Availability</h2>
      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex items-center space-x-4">
            <Label htmlFor={day} className="w-24">
              {day}
            </Label>
            <Select value={availability[day]} onValueChange={(value) => handleAvailabilityChange(day, value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Total">Total</SelectItem>
                <SelectItem value="Off">Off</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            {availability[day] === "Custom" && (
              <Input
                id={`${day}-custom`}
                value={availability[day] === "Custom" ? "" : availability[day]}
                onChange={(e) => handleAvailabilityChange(day, e.target.value)}
                placeholder="e.g., 9:00-17:00"
                className="w-[180px]"
              />
            )}
          </div>
        ))}
      </div>
      <Button onClick={handleUpdateAvailability}>Update Availability</Button>
    </div>
  )
}

