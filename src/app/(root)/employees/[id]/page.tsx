import React from "react";
import { QUERIES } from "~/db/queries";

const page = async ({ params }: { params: { id: string } }) => {
  const employee = await QUERIES.getEmployee(Number(params.id));

  return (
    <div>
      <h1>
        {employee?.firstName} {employee?.lastName}
      </h1>
    </div>
  );
};

export default page;
