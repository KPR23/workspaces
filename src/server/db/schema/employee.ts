import { pgEnum, pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const employeeStatuses = [
  "ACTIVE",
  "INACTIVE",
  "DISMISSED",
  "ON_LEAVE",
] as const;
export type EmployeeStatus = (typeof employeeStatuses)[number];
export const employeeStatusEnum = pgEnum("employee_status", employeeStatuses);

export const employeePositions = [
  "OBSLUGA",
  "BAR",
  "KAWIARNIA",
  "KIEROWNIK",
  "DYREKTOR",
] as const;
export type EmployeePosition = (typeof employeePositions)[number];
export const employeePositionEnum = pgEnum(
  "employee_position",
  employeePositions,
);

// Funkcja pomocnicza do generowania URL awatara z inicjałami
export const generateInitialsAvatarUrl = (
  firstName: string,
  lastName: string,
) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const backgroundColor =
    "#" + Math.floor(Math.random() * 16777215).toString(16); // Losowy kolor tła
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${backgroundColor}"/>
      <text x="50" y="50" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dominant-baseline="central">
        ${initials}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};

export const employees = pgTable("employees", {
  id,
  firstName: varchar("first_name", { length: 20 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 9 }).notNull(),
  address: text("address").notNull(),
  avatar: text("avatar"),
  hireDate: timestamp("hire_date").notNull().defaultNow(),
  createdAt,
  updatedAt,
  status: employeeStatusEnum("status").notNull().default("ACTIVE"),
  positions: employeePositionEnum("positions")
    .array()
    .notNull()
    .default(["OBSLUGA"]),
  userId: text("user_id").references(() => user.id),
  invitationToken: text("invitation_token").unique(),
  invitationExpires: timestamp("invitation_expires"),
});

export const employeeRelations = relations(employees, ({ one }) => ({
  user: one(user, {
    fields: [employees.userId],
    references: [user.id],
  }),
}));
