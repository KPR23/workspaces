"use client"

import { useState } from "react"
import AdminView from "./AdminView"
import EmployeeView from "./EmployeeView"
import NavBar from "./NavBar"

export type DayAvailability = "Total" | "Off" | string // string represents custom hours

export interface Employee {
  id: number
  name: string
  position: string
  availability: {
    [key: string]: DayAvailability // Friday to Thursday
  }
  role: "admin" | "employee"
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Manager",
    availability: {
      Friday: "Total",
      Saturday: "Off",
      Sunday: "9:00-17:00",
      Monday: "Total",
      Tuesday: "Total",
      Wednesday: "13:00-21:00",
      Thursday: "Off",
    },
    role: "employee",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Developer",
    availability: {
      Friday: "9:00-17:00",
      Saturday: "Off",
      Sunday: "Off",
      Monday: "Total",
      Tuesday: "Total",
      Wednesday: "Total",
      Thursday: "9:00-17:00",
    },
    role: "employee",
  },
  // Add more employees as needed
]

interface EmployeeManagementProps {
  user: { name: string; role: "admin" | "employee" }
  onLogout: () => void
}

export default function EmployeeManagement({ user, onLogout }: EmployeeManagementProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)

  const addEmployee = (employee: Omit<Employee, "id">) => {
    const newEmployee = { ...employee, id: employees.length + 1 }
    setEmployees([...employees, newEmployee])
  }

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar userRole={user.role} onLogout={onLogout} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Employee Management System</h1>
        {user.role === "admin" ? (
          <AdminView employees={employees} addEmployee={addEmployee} updateEmployee={updateEmployee} />
        ) : (
          <EmployeeView employee={employees.find((emp) => emp.name === user.name)!} updateEmployee={updateEmployee} />
        )}
      </div>
    </div>
  )
}

