import { db } from "~/db/db";
import { availability as availabilityTable } from "~/db/schema/availability";
import { eq } from "drizzle-orm";

export class AvailabilityService {
  static async getAll() {
    try {
      return await db.select().from(availabilityTable);
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw new Error("Nie udało się załadować danych.");
    }
  }

  static async getByEmployeeId(employeeId: number) {
    try {
      return await db
        .select()
        .from(availabilityTable)
        .where(eq(availabilityTable.employeeId, employeeId));
    } catch (error) {
      console.error(
        `Error fetching availability for employee ${employeeId}:`,
        error,
      );
      throw new Error("Nie udało się załadować danych tego pracownika.");
    }
  }

  static async getByCinemaWeekId(cinemaWeekId: number) {
    try {
      return await db
        .select()
        .from(availabilityTable)
        .where(eq(availabilityTable.cinemaWeekId, cinemaWeekId));
    } catch (error) {
      console.error(
        `Error fetching availability for cinema week ${cinemaWeekId}:`,
        error,
      );
      throw new Error("Nie udało się załadować danych.");
    }
  }
}
