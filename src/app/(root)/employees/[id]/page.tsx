import { getEmployee } from "~/server/actions/employeeActions";

export default async function EmployeePage({
  params,
}: {
  params: { id: string };
}) {
  const employee = await (await getEmployee(Number(params.id))).data;
  return <div>{employee?.firstName}</div>;
}
