import { pgEnum, pgTable, date, integer, time, primaryKey } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { employees } from "./employee";
import { relations } from "drizzle-orm";
import { cinemaWeek } from "./cinemaWeek";

export const availabilityStatuses = ["OFF", "TOTAL", "CUSTOM"] as const;
export type AvailabilityStatus = (typeof availabilityStatuses)[number];
export const availabilityStatusEnum = pgEnum("availability_status", availabilityStatuses);


export const availability = pgTable("availability", {
    employeeId: integer("employee_id")
        .notNull()
        .references(() => employees.id, { onDelete: "cascade" }),
    cinemaWeekId: integer("cinema_week_id")
        .notNull()
        .references(() => cinemaWeek.id),
    date: date("date").notNull(),
    status: availabilityStatusEnum("status").notNull().default("OFF"),
    startTime: time("start_time"),
    endTime: time("end_time"),
    createdAt: createdAt,
    updatedAt: updatedAt,
}, (t) => ({
    pk: primaryKey({ name: "pk_availability", columns: [t.employeeId, t.cinemaWeekId, t.date] })
}));

export const availabilityRelations = relations(availability, ({ one }) => ({
    employee: one(employees, {
        fields: [availability.employeeId],
        references: [employees.id],
    }),
    cinemaWeek: one(cinemaWeek, {
        fields: [availability.cinemaWeekId],
        references: [cinemaWeek.id],
    }),
}));