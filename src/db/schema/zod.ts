import { z } from "zod";
import { availabilityStatuses } from "./availability";

const baseSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const employeeSchema = baseSchema.extend({
  id: z.number(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

export const cinemaWeekSchema = baseSchema
  .extend({
    id: z.number(),
    startWeek: z.date(),
    endWeek: z.date(),
  })
  .strict();

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const availabilitySchema = baseSchema
  .extend({
    employeeId: z.number(),
    cinemaWeekId: z.number(),
    date: z.date(),
    status: z.enum(availabilityStatuses),
    startTime: z.string().regex(timeRegex).nullable(),
    endTime: z.string().regex(timeRegex).nullable(),
  })
  .strict();

export type Employee = z.infer<typeof employeeSchema>;
export type CinemaWeek = z.infer<typeof cinemaWeekSchema>;
export type Availability = z.infer<typeof availabilitySchema>;

export const createEmployeeSchema = employeeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createCinemaWeekSchema = z.object({
  startWeek: z.date(),
  endWeek: z.date(),
}).refine((data) => data.startWeek <= data.endWeek, {
  message: "End week must be after start week",
});

const partialCinemaWeekSchema = z.object({
  startWeek: z.date().optional(),
  endWeek: z.date().optional(),
});

export const createAvailabilitySchema = z.object({
  employeeId: z.number(),
  cinemaWeekId: z.number(),
  date: z.date(),
  status: z.enum(availabilityStatuses),
  startTime: z.string().regex(timeRegex).nullable(),
  endTime: z.string().regex(timeRegex).nullable(),
}).refine(data => {
  if (data.status === "CUSTOM") {
    return data.startTime !== null && data.endTime !== null;
  }
  return true;
}, {
  message: "Start time and end time are required for CUSTOM status"
}).refine((data) => {
  if (data.status === "CUSTOM" && data.startTime && data.endTime) {
    return data.startTime < data.endTime;
  }
  return true;
}, {
  message: "Start time must be before end time",
});

const partialAvailabilitySchema = z.object({
  employeeId: z.number().optional(),
  cinemaWeekId: z.number().optional(),
  date: z.date().optional(),
  status: z.enum(availabilityStatuses).optional(),
  startTime: z.string().regex(timeRegex).nullable().optional(),
  endTime: z.string().regex(timeRegex).nullable().optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export const updateCinemaWeekSchema = partialCinemaWeekSchema.refine((data) => {
  if (data.startWeek && data.endWeek) {
    return data.startWeek <= data.endWeek;
  }
  return true;
}, {
  message: "End week must be after start week",
});

export const updateAvailabilitySchema = partialAvailabilitySchema.refine(data => {
  if (data.status === "CUSTOM") {
    return data.startTime !== null && data.endTime !== null;
  }
  return true;
}, {
  message: "Start time and end time are required for CUSTOM status"
}).refine((data) => {
  if (data.status === "CUSTOM" && data.startTime && data.endTime) {
    return data.startTime < data.endTime; // Dodano sprawdzenie kolejności
  }
  return true;
}, {
  message: "Start time must be before end time",
});
