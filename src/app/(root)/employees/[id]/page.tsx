import { getEmployee } from "~/server/actions/employeeActions";
import { notFound } from "next/navigation";

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) {
      return notFound();
    }

    const response = await getEmployee(employeeId);
    if (!response.success || !response.data) {
      return notFound();
    }

    const employee = await response.data;
    if (!employee) {
      return notFound();
    }

    return (
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">
          {employee.firstName} {employee.lastName}
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Phone:</strong> {employee.phone}
            </p>
            <p>
              <strong>Address:</strong> {employee.address}
            </p>
          </div>
          <div>
            <p>
              <strong>Status:</strong> {employee.status}
            </p>
            <p>
              <strong>Hired:</strong>{" "}
              {new Date(employee.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading employee:", error);
    return notFound();
  }
}
