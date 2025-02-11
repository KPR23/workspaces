import EmployeeList from "~/components/employee-list";
import Layout from "~/components/layout";
import { QUERIES } from "~/db/queries";

export default async function HomePage() {
  const employees = await QUERIES.getEmployees();

  return (
    <Layout>
      <main className="container py-8">
        <h1 className="mb-8 text-3xl font-bold">
          Pracownicy ({employees.length})
        </h1>
        <EmployeeList employees={employees} />
      </main>
    </Layout>
  );
}
