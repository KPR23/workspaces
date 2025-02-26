import { db } from "~/db/db";
import { employees } from "~/db/schema/employee";
import { createEmployeeSchema } from "~/db/schema/zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validatedData = createEmployeeSchema.parse(body);

    const [employee] = await db
      .insert(employees)
      .values({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        address: `${validatedData.street} ${validatedData.houseNumber}${
          validatedData.apartmentNumber
            ? `/${validatedData.apartmentNumber}`
            : ""
        }, ${validatedData.postalCode} ${validatedData.city}`,
      })
      .returning();

    return NextResponse.json({ success: true, data: employee });
  } catch (error) {
    console.error("Failed to create employee:", error);
    return NextResponse.json(
      { success: false, error: "Błąd podczas dodawania pracownika." },
      { status: 400 },
    );
  }
}
