import React from "react";
import { EmployeeService } from "~/services/employeeService";

interface Props {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Props) => {
  try {
    const employee = await EmployeeService.getById(Number(params.id));

    return (
      <div>
        <h1>
          {employee?.firstName} {employee?.lastName}
        </h1>
      </div>
    );
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw new Error("Nie udało się załadować listy pracowników.");
  }
};

export default Page;
