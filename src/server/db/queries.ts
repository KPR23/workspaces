import { db } from "~/server/db"
import { employees } from "~/server/db/schema"

export async function getEmployees() {
  const results = await db
    .select()
    .from(employees);

  return results.map(employee => ({
    ...employee,
    hireDate: employee.hireDate ? new Date(employee.hireDate) : null,
  }));
}