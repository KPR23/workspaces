import { z } from "zod";
import { availabilityStatuses } from "./availability";

const baseSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Walidacja avatara
const avatarSchema = z
  .string()
  .refine(
    (value) => {
      // Akceptujemy:
      // 1. URLe zdjęć (http/https)
      // 2. Base64 encoded images (data:image/)
      // 3. Ścieżki do plików lokalnych (uploads/)
      return (
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        value.startsWith("data:image/") ||
        value.startsWith("uploads/")
      );
    },
    {
      message:
        "Nieprawidłowy format zdjęcia. Akceptowane są URLe, base64 lub pliki.",
    },
  )
  .optional()
  .nullable();

export const employeeSchema = baseSchema.extend({
  id: z.number(),
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Imię jest wymagane" })
    .max(20, { message: "Imię nie może mieć więcej niż 20 znaków" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Nazwisko jest wymagane" })
    .max(50, { message: "Nazwisko nie może mieć więcej niż 50 znaków" }),
  email: z.string().trim().email({ message: "Nieprawidłowy adres e-mail" }),
  avatar: avatarSchema,
  hireDate: z.date(),
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

export const createEmployeeSchema = employeeSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    hireDate: true,
  })
  .extend({
    firstName: z
      .string()
      .trim()
      .min(1, { message: "Imię jest wymagane" })
      .max(20, { message: "Imię nie może mieć więcej niż 20 znaków" })
      .regex(/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/, {
        message: "Imię może zawierać tylko litery",
      }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "Nazwisko jest wymagane" })
      .max(50, { message: "Nazwisko nie może mieć więcej niż 50 znaków" })
      .regex(/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\-]+$/, {
        message: "Nazwisko może zawierać tylko litery i myślnik",
      }),
    phone: z
      .string()
      .trim()
      .min(9, { message: "Numer telefonu musi mieć 9 cyfr" })
      .max(9, { message: "Numer telefonu musi mieć 9 cyfr" })
      .regex(/^\d+$/, { message: "Numer telefonu może zawierać tylko cyfry" }),
    street: z
      .string()
      .trim()
      .min(1, { message: "Ulica jest wymagana" })
      .max(100, { message: "Nazwa ulicy jest za długa" }),
    houseNumber: z
      .string()
      .trim()
      .min(1, { message: "Numer domu jest wymagany" })
      .max(10, { message: "Numer domu jest za długi" }),
    apartmentNumber: z
      .string()
      .trim()
      .max(10, { message: "Numer mieszkania jest za długi" })
      .optional(),
    postalCode: z
      .string()
      .trim()
      .regex(/^\d{2}-\d{3}$/, {
        message: "Nieprawidłowy format kodu pocztowego",
      }),
    city: z
      .string()
      .trim()
      .min(1, { message: "Miasto jest wymagane" })
      .max(100, { message: "Nazwa miasta jest za długa" }),
    avatar: avatarSchema,
  });

export const createCinemaWeekSchema = z
  .object({
    startWeek: z.date(),
    endWeek: z.date(),
  })
  .refine((data) => data.startWeek <= data.endWeek, {
    message: "End week must be after start week",
  });

const partialCinemaWeekSchema = z.object({
  startWeek: z.date().optional(),
  endWeek: z.date().optional(),
});

export const createAvailabilitySchema = z
  .object({
    employeeId: z.number(),
    cinemaWeekId: z.number(),
    date: z.date(),
    status: z.enum(availabilityStatuses),
    startTime: z.string().regex(timeRegex).nullable(),
    endTime: z.string().regex(timeRegex).nullable(),
  })
  .refine(
    (data) => {
      if (data.status === "CUSTOM") {
        return data.startTime !== null && data.endTime !== null;
      }
      return true;
    },
    {
      message: "Start time and end time are required for CUSTOM status",
    },
  )
  .refine(
    (data) => {
      if (data.status === "CUSTOM" && data.startTime && data.endTime) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "Start time must be before end time",
    },
  );

const partialAvailabilitySchema = z.object({
  employeeId: z.number().optional(),
  cinemaWeekId: z.number().optional(),
  date: z.date().optional(),
  status: z.enum(availabilityStatuses).optional(),
  startTime: z.string().regex(timeRegex).nullable().optional(),
  endTime: z.string().regex(timeRegex).nullable().optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export const updateCinemaWeekSchema = partialCinemaWeekSchema.refine(
  (data) => {
    if (data.startWeek && data.endWeek) {
      return data.startWeek <= data.endWeek;
    }
    return true;
  },
  {
    message: "End week must be after start week",
  },
);

export const updateAvailabilitySchema = partialAvailabilitySchema
  .refine(
    (data) => {
      if (data.status === "CUSTOM") {
        return data.startTime !== null && data.endTime !== null;
      }
      return true;
    },
    {
      message: "Start time and end time are required for CUSTOM status",
    },
  )
  .refine(
    (data) => {
      if (data.status === "CUSTOM" && data.startTime && data.endTime) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "Start time must be before end time",
    },
  );
