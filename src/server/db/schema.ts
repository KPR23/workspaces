import { pgEnum, pgTable, serial, text, date } from "drizzle-orm/pg-core";

export const employeeStatusEnum = pgEnum("employee_status", ["ACTIVE", "INACTIVE", "DISMISSED", "ON_LEAVE"]);
export const employeePositionEnum = pgEnum("employee_position", ["OBSLUGA", "BAR", "KAWIARNIA", "KIEROWNIK", "DYREKTOR"]);

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  hireDate: date("hire_date").notNull(),
  status: employeeStatusEnum("status").notNull(),
  positions: employeePositionEnum("positions").array().notNull().default(["OBSLUGA"]),
});
