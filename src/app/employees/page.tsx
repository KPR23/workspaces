import { EmployeeForm } from "~/components/employee-form";
import EmployeeList from "~/components/employee-list";
import { QUERIES } from "~/db/queries";

export default async function EmployeesPage() {
  const employees = await QUERIES.getEmployees();

  return (
    <div className="mx-auto max-w-2xl p-4">
      <EmployeeList employees={employees} />

      <h1 className="mb-6 text-2xl font-bold">Dodaj nowego pracownika</h1>
      <EmployeeForm />
    </div>
  );
}
