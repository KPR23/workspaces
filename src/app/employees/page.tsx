import { EmployeeForm } from "~/components/employee-form";

export default function EmployeesPage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Add New Employee</h1>
      <EmployeeForm />
    </div>
  );
}
