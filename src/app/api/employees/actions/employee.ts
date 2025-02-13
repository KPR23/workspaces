"use server";

import { db } from "~/db/db";
import { employees as employeesTable } from "~/db/schema/employee";
import { availability as availabilityTable } from "~/db/schema/availability";
import { eq } from "drizzle-orm";

export async function deleteEmployee(id: number) {
  try {
    await db.transaction(async (tx) => {
      await tx
        .delete(availabilityTable)
        .where(eq(availabilityTable.employeeId, id));

      await tx.delete(employeesTable).where(eq(employeesTable.id, id));
    });
    return { success: true };
  } catch (error) {
    console.error("Nie udało się usunąć pracownika:", error);
    return { success: false, error: "Nie udało się usunąć pracownika" };
  }
}
