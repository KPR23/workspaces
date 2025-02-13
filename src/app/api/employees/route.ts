import { db } from "~/db/db";
import { employees } from "~/db/schema/employee";
import { createEmployeeSchema } from "~/db/schema/zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const data = createEmployeeSchema.parse(body);

    const [employee] = await db
      .insert(employees)
      .values({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: `${data.street} ${data.houseNumber}${
          data.apartmentNumber ? `/${data.apartmentNumber}` : ""
        }, ${data.postalCode} ${data.city}`,
      })
      .returning();

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Failed to create employee:", error);
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 400 },
    );
  }
}
