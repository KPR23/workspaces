import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import type { Employee } from "./EmployeeManagement"

interface EmployeeScheduleProps {
  employee: Employee
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

export default function EmployeeSchedule({ employee }: EmployeeScheduleProps) {
  const getShift = (day: string) => {
    if (employee.disposition === "morning") return "Morning"
    if (employee.disposition === "evening") return "Evening"
    return daysOfWeek.indexOf(day) % 2 === 0 ? "Morning" : "Evening"
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Schedule</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {daysOfWeek.map((day) => (
              <TableHead key={day}>{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {daysOfWeek.map((day) => (
              <TableCell key={day}>{getShift(day)}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

