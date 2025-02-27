import React from "react";
import { EmployeeService } from "~/server/services/employeeService";

const page = async ({ params }: { params: { id: string } }) => {
  const employeeId = Number(params.id);
  const employee = await EmployeeService.getById(employeeId);

  return (
    <div>
      <h1>
        {employee?.firstName} {employee?.lastName}
      </h1>
    </div>
  );
};

export default page;
