export interface Employee {
  id: number
  name: string
  position: string
  department: string
  email: string
}

export const employees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Product Manager",
    department: "Product",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "UX Designer",
    department: "Design",
    email: "mike.johnson@example.com",
  },
  {
    id: 4,
    name: "Sarah Brown",
    position: "Marketing Specialist",
    department: "Marketing",
    email: "sarah.brown@example.com",
  },
  {
    id: 5,
    name: "Chris Lee",
    position: "HR Manager",
    department: "Human Resources",
    email: "chris.lee@example.com",
  },
]

