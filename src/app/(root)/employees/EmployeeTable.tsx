"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import type { Employee } from "~/server/db/schema/zod";
import { getEmployees } from "~/server/actions/employeeActions";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";

interface EmployeeTableProps {
  initialEmployees: Employee[];
}

export function EmployeeTable({ initialEmployees }: EmployeeTableProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isLoading, setIsLoading] = useState(false);

  const refreshEmployees = async () => {
    setIsLoading(true);
    try {
      const result = await getEmployees();
      if (result.success) {
        setEmployees(result.data ?? []);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Failed to refresh employees:", error);
      toast.error("Nie udało się odświeżyć listy pracowników");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataTable
      columns={columns as ColumnDef<Employee>[]}
      data={employees}
      onDataChange={refreshEmployees}
      isLoading={isLoading}
    />
  );
}
