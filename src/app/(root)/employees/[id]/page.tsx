import React from "react";
import { EmployeeService } from "~/services/employeeService";

const page = async ({ params }: { params: { id: string } }) => {
  const employee = await EmployeeService.getById(Number(params.id));

  return (
    <div>
      <h1>
        {employee?.firstName} {employee?.lastName}
      </h1>
    </div>
  );
};

export default page;
