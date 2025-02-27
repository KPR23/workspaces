import { db } from "~/server/db/db";
import { cinemaWeek as cinemaWeekTable } from "~/server/db/schema/cinemaWeek";

export class CinemaWeekService {
  static async getAll() {
    try {
      return await db.select().from(cinemaWeekTable);
    } catch (error) {
      console.error("Error fetching cinema weeks:", error);
      throw new Error("Nie udało się załadować danych.");
    }
  }
}
