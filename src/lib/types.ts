import type { employeeStatusEnum, employeePositionEnum } from "~/db/schema/employee"

export type Employee = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  hireDate: Date
  status: typeof employeeStatusEnum.enumValues[number]
  positions: Array<typeof employeePositionEnum.enumValues[number]>
} 