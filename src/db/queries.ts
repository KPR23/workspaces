import "server-only";

import { db } from "./db";
import { employees as employeesTable } from "./schema/employee";
import { eq } from "drizzle-orm";

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
};
