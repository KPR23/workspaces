import { AddEmployeeDialog } from "~/components/add-employee-dialog";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { QUERIES } from "~/db/queries";

export default async function EmployeesPage() {
  const employees = await QUERIES.getEmployees();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pracownicy ({employees.length})</h1>
        <AddEmployeeDialog />
      </div>
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
