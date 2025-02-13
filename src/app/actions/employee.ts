"use server";

import { db } from "~/db/db";
import { employees as employeesTable } from "~/db/schema/employee";
import { availability as availabilityTable } from "~/db/schema/availability";
import { eq } from "drizzle-orm";

export async function deleteEmployee(id: number) {
  try {
    await db.transaction(async (tx) => {
      // Delete related availability records first
      await tx
        .delete(availabilityTable)
        .where(eq(availabilityTable.employeeId, id));

      // Then delete the employee record
      await tx.delete(employeesTable).where(eq(employeesTable.id, id));
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return { success: false, error: "Failed to delete employee" };
  }
}
