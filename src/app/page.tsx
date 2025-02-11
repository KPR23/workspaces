import EmployeeList from "~/components/employee-list";
import Layout from "~/components/layout";
import { Employee } from "~/lib/types";
import { getEmployees } from "~/server/db/queries";

export default async function HomePage() {
  const employees = await getEmployees();

  return (
    <Layout>
      <main className="container py-8">
        <h1 className="mb-8 text-3xl font-bold">Employees</h1>
        <EmployeeList employees={employees as Employee[]} />
      </main>
    </Layout>
  );
}
