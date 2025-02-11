import Layout from "~/components/layout"
import EmployeeList from "~/components/employee-list"
import { employees } from "~/lib/mockData"

export default function Home() {
  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Employee List</h1>
        <EmployeeList employees={employees} />
      </div>
    </Layout>
  )
}

