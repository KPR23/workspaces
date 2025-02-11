import { db } from "~/db/db"
import { employees } from "~/db/schema/employee"

export async function getEmployees() {
  const results = await db
    .select()
    .from(employees);
    
  return results.map(employee => ({
    ...employee,
    hireDate: employee.hireDate ? new Date(employee.hireDate) : null,
  }));
}