"use server";

import { db } from "~/server/db/db";
import { employees as employeesTable } from "~/server/db/schema/employee";
import { availability as availabilityTable } from "~/server/db/schema/availability";
import { eq } from "drizzle-orm";
import { EmployeeService } from "~/server/services/employeeService";

export async function getEmployees() {
  try {
    const employees = await EmployeeService.getAll();
    return { success: true, data: employees };
  } catch (error) {
    console.error("Get employees action failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Nie udało się załadować danych pracowników.",
    };
  }
}

export async function getEmployee(id: number) {
  try {
    const employee = EmployeeService.getById(id);
    return { success: true, data: employee };
  } catch (error) {
    console.error("Get employee action failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Nie udało się załadować danych pracownika.",
    };
  }
}

export async function createEmployee(data: FormData | Record<string, unknown>) {
  try {
    const formData =
      data instanceof FormData ? Object.fromEntries(data.entries()) : data;

    const email = typeof formData.email === "string" ? formData.email : "";

    const existingEmployee = await EmployeeService.existCheck(email);

    if (existingEmployee.length > 0) {
      return {
        success: false,
        error: "Użytkownik z takim adresem email już istnieje.",
      };
    }

    const employee = await EmployeeService.create(formData);

    return { success: true, data: employee };
  } catch (error) {
    console.error("Create employee action failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Błąd podczas tworzenia profilu pracownika.",
    };
  }
}

export async function deleteEmployee(id: number) {
  try {
    return await db.transaction(async (tx) => {
      await tx
        .delete(availabilityTable)
        .where(eq(availabilityTable.employeeId, id));

      const [deletedEmployee] = await tx
        .delete(employeesTable)
        .where(eq(employeesTable.id, id))
        .returning();

      if (!deletedEmployee) {
        throw new Error("Nie udało się znaleźć pracownika o podanym ID.");
      }

      return { success: true, data: deletedEmployee };
    });
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Nie udało się usunąć pracownika",
    };
  }
}
