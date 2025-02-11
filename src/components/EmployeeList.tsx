import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import type { Employee, DayAvailability } from "./EmployeeManagement"

interface EmployeeListProps {
  employees: Employee[]
  updateEmployee: (employee: Employee) => void
}

const daysOfWeek = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]

export default function EmployeeList({ employees, updateEmployee }: EmployeeListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id)
  }

  const handleSave = (employee: Employee) => {
    updateEmployee(employee)
    setEditingId(null)
  }

  const handleAvailabilityChange = (employee: Employee, day: string, value: DayAvailability) => {
    const updatedEmployee = {
      ...employee,
      availability: {
        ...employee.availability,
        [day]: value,
      },
    }
    updateEmployee(updatedEmployee)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Position</TableHead>
          {daysOfWeek.map((day) => (
            <TableHead key={day}>{day}</TableHead>
          ))}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              {editingId === employee.id ? (
                <Input value={employee.name} onChange={(e) => updateEmployee({ ...employee, name: e.target.value })} />
              ) : (
                employee.name
              )}
            </TableCell>
            <TableCell>
              {editingId === employee.id ? (
                <Input
                  value={employee.position}
                  onChange={(e) => updateEmployee({ ...employee, position: e.target.value })}
                />
              ) : (
                employee.position
              )}
            </TableCell>
            {daysOfWeek.map((day) => (
              <TableCell key={day}>
                {editingId === employee.id ? (
                  <Input
                    value={employee.availability[day]}
                    onChange={(e) => handleAvailabilityChange(employee, day, e.target.value)}
                  />
                ) : (
                  employee.availability[day]
                )}
              </TableCell>
            ))}
            <TableCell>
              {editingId === employee.id ? (
                <Button onClick={() => handleSave(employee)}>Save</Button>
              ) : (
                <Button onClick={() => handleEdit(employee)}>Edit</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

