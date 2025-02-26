import { db } from "~/db/db";
import { employees as employeesTable } from "~/db/schema/employee";
import { availability as availabilityTable } from "~/db/schema/availability";
import { eq } from "drizzle-orm";
import { createEmployeeSchema } from "~/db/schema/zod";

export class EmployeeService {
  static async getAll() {
    try {
      return await db.select().from(employeesTable);
    } catch (error) {
      console.error("Database error fetching employees:", error);
      throw new Error("Nie udało się załadować listy pracowników.");
    }
  }

  static async getById(id: number) {
    try {
      const result = await db
        .select()
        .from(employeesTable)
        .where(eq(employeesTable.id, id));

      if (result.length === 0)
        throw new Error("Nie znaleziono pracownika o podanym ID.");

      return result[0];
    } catch (error) {
      console.error(`Error fetching employee with ID ${id}:`, error);
      throw error instanceof Error
        ? error
        : new Error("Nie udało się załadować danych pracownika.");
    }
  }

  static async create(data: unknown) {
    try {
      const validatedData = createEmployeeSchema.parse(data);

      const [employee] = await db
        .insert(employeesTable)
        .values({
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          address: `${validatedData.street} ${validatedData.houseNumber}${
            validatedData.apartmentNumber
              ? `/${validatedData.apartmentNumber}`
              : ""
          }, ${validatedData.postalCode} ${validatedData.city}`,
        })
        .returning();

      return employee;
    } catch (error) {
      console.error("Failed to create employee:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to create employee");
    }
  }

  static async delete(id: number) {
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
          throw new Error("Employee not found");
        }

        return deletedEmployee;
      });
    } catch (error) {
      console.error(`Failed to delete employee with ID ${id}:`, error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Nie udało się usunąć profilu pracownika.",
      );
    }
  }
}
