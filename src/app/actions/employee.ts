"use server";

import { db } from "~/db/db";
import { employees as employeesTable } from "~/db/schema/employee";
import { eq } from "drizzle-orm";

export async function deleteEmployee(id: number) {
  try {
    await db.delete(employeesTable).where(eq(employeesTable.id, id));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return { success: false, error: "Failed to delete employee" };
  }
} 