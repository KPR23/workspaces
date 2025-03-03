import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { employees } from "./employee";
import { relations } from "drizzle-orm";

export const invitations = pgTable("invitations", {
  id,
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  employeeId: integer("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
  used: boolean("used").notNull().default(false),
});

export const invitationRelations = relations(invitations, ({ one }) => ({
  employee: one(employees, {
    fields: [invitations.employeeId],
    references: [employees.id],
  }),
}));
