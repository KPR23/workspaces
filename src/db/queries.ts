import "server-only";

import { db } from "./db";
import { employees as employeesTable } from "./schema/employee";
import { eq } from "drizzle-orm";
import { availability as availabilityTable } from "./schema/availability";
import { cinemaWeek as cinemaWeekTable } from "./schema/cinemaWeek";

export const QUERIES = {
  getEmployees: async function () {
    return await db.select().from(employeesTable);
  },
  getEmployee: async function (id: number) {
    return await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, id));
  },
  getAvailability: async function () {
    return await db.select().from(availabilityTable);
  },
  getAvailabilityByEmployeeId: async function (employeeId: number) {
    return await db
      .select()
      .from(availabilityTable)
      .where(eq(availabilityTable.employeeId, employeeId));
  },
  getCinemaWeek: async function () {
    return await db.select().from(cinemaWeekTable);
  },
  getAvailabilityByCinemaWeekId: async function (cinemaWeekId: number) {
    return await db
      .select()
      .from(availabilityTable)
      .where(eq(availabilityTable.cinemaWeekId, cinemaWeekId));
  },
};
