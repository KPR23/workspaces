import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const employeeStatuses = ["ACTIVE", "INACTIVE", "DISMISSED", "ON_LEAVE"] as const
export type EmployeeStatus = (typeof employeeStatuses)[number]
export const employeeStatusEnum = pgEnum("employee_status", employeeStatuses);

export const employeePositions = ["OBSLUGA", "BAR", "KAWIARNIA", "KIEROWNIK", "DYREKTOR"] as const
export type EmployeePosition = (typeof employeePositions)[number];
export const employeePositionEnum = pgEnum("employee_position", employeePositions);

export const employees = pgTable("employees", {
  id,
  firstName: varchar("first_name", { length: 20 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 9 }).notNull(),
  address: text("address").notNull(),
  createdAt,
  updatedAt,
  status: employeeStatusEnum("status").notNull().default("ACTIVE"),
  positions: employeePositionEnum("positions").array().notNull().default(["OBSLUGA"]),
});