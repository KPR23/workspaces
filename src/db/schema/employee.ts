import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { id, createdAt } from "../schemaHelpers";

export const employeeStatuses = ["ACTIVE", "INACTIVE", "DISMISSED", "ON_LEAVE"] as const
export type EmployeeStatus = (typeof employeeStatuses)[number]
export const employeeStatusEnum = pgEnum("employee_status", employeeStatuses);

export const employeePositions = ["OBSLUGA", "BAR", "KAWIARNIA", "KIEROWNIK", "DYREKTOR"] as const
export type EmployeePosition = (typeof employeePositions)[number];
export const employeePositionEnum = pgEnum("employee_position", employeePositions);

export const employees = pgTable("employees", {
  id: id,
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  createdAt: createdAt,
  status: employeeStatusEnum("status").notNull().default("ACTIVE"),
  positions: employeePositionEnum("positions").array().notNull().default(["OBSLUGA"]),

});