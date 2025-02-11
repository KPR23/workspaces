import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import EmployeeList from "./EmployeeList"
import AddEmployeeForm from "./AddEmployeeForm"
import ShiftCalendar from "./ShiftCalendar"
import type { Employee } from "./EmployeeManagement"

interface AdminViewProps {
  employees: Employee[]
  addEmployee: (employee: Omit<Employee, "id">) => void
  updateEmployee: (employee: Employee) => void
}

export default function AdminView({ employees, addEmployee, updateEmployee }: AdminViewProps) {
  return (
    <Tabs defaultValue="employees" className="w-full">
      <TabsList>
        <TabsTrigger value="employees">Employees</TabsTrigger>
        <TabsTrigger value="add">Add Employee</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
      <TabsContent value="employees">
        <EmployeeList employees={employees} updateEmployee={updateEmployee} />
      </TabsContent>
      <TabsContent value="add">
        <AddEmployeeForm addEmployee={addEmployee} />
      </TabsContent>
      <TabsContent value="schedule">
        <div className="space-y-8">
          {employees.map((employee) => (
            <div key={employee.id}>
              <h3 className="text-lg font-semibold mb-2">{employee.name}'s Schedule</h3>
              <ShiftCalendar employee={employee} />
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

