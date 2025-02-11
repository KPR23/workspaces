"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import type { Employee } from "./EmployeeManagement"
import AvailabilityListView from "./AvailabilityListView"
import ShiftCalendar from "./ShiftCalendar"

interface EmployeeViewProps {
  employee: Employee
  updateEmployee: (employee: Employee) => void
}

export default function EmployeeView({ employee, updateEmployee }: EmployeeViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Information</h2>
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Position:</strong> {employee.position}
        </p>
      </div>
      <Tabs defaultValue="availability" className="w-full">
        <TabsList>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="availability">
          <AvailabilityListView employee={employee} updateEmployee={updateEmployee} />
        </TabsContent>
        <TabsContent value="schedule">
          <ShiftCalendar employee={employee} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

