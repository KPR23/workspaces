import { serial, timestamp } from "drizzle-orm/pg-core"

export const id = serial("id").primaryKey()

export const hireDate = timestamp("hire_date", { mode: "date" })
  .notNull()
  .defaultNow()

export const updatedAt = timestamp("updated_at")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())