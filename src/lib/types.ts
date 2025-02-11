import type { employeeStatusEnum, employeePositionEnum } from "~/server/db/schema"

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