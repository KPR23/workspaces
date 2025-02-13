import { db } from "~/db/db";
import { employees, availability } from "~/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const id = parseInt(params.id);

    await db.transaction(async (tx) => {
      await tx.delete(availability).where(eq(availability.employeeId, id));

      const [deletedEmployee] = await tx
        .delete(employees)
        .where(eq(employees.id, id))
        .returning();

      if (!deletedEmployee) {
        throw new Error("Employee not found");
      }

      return NextResponse.json(deletedEmployee);
    });

    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete employee",
      },
      { status: 500 },
    );
  }
}
