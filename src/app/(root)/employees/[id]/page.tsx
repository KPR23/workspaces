import React from "react";
import { EmployeeService } from "~/services/employeeService";
import type { Metadata } from "next";

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
    return <div>Error: Could not load employee details.</div>;
  }
};

export const metadata: Metadata = {
  title: "Employee Details",
};

export default Page;
