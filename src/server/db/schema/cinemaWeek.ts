import { pgTable, date } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { availability } from "./availability";

export const cinemaWeek = pgTable("cinema_week", {
    id: id,
    startWeek: date("start_week").notNull().unique(),
    endWeek: date("end_week").notNull().unique(),
    createdAt: createdAt,
    updatedAt: updatedAt,
  });
  
  export const cinemaWeekRelations = relations(cinemaWeek, ({ many }) => ({
    availability: many(availability),
  }));  