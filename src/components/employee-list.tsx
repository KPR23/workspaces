import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import type { Employee } from "~/lib/mockData"

export default function EmployeeList({ employees }: { employees: Employee[] }) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

