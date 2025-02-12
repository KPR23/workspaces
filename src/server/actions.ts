import { db } from "~/db/db";
import { createAvailabilitySchema, createEmployeeSchema } from "~/db/schema/zod";
import { employees as employeesTable } from "~/db/schema/employee";

export async function createEmployee(input: unknown) {
  const data = createEmployeeSchema.parse(input);

  
}

export async function createAvailability(input: unknown) {
  const data = createAvailabilitySchema.parse(input);
  // Validation will ensure:
  // - Valid status
  // - Start/end times present for CUSTOM status
  // - Valid dates and times
  // Proceed with database insertion
} 