import { AddEmployeeDialog } from "~/components/add-employee-dialog";
import { Suspense } from "react";
import { EmployeeService } from "~/services/employeeService";
import { EmployeeTable } from "./EmployeeTable";

export default async function EmployeesPage() {
  const employees = await EmployeeService.getAll();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pracownicy ({employees.length})</h1>
        <AddEmployeeDialog />
      </div>
      <Suspense
        fallback={<div className="py-10 text-center">Ładowanie...</div>}
      >
        <EmployeeTable initialEmployees={employees} />
      </Suspense>
    </div>
  );
}
