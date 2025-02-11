"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Toaster, toast } from "sonner";
import type { Employee } from "~/lib/types";
import { Copy } from "lucide-react";
function CopyableCell({ content }: { content: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Skopiowano do schowka");
  };

  return (
    <TableCell>
      <span
        onClick={copyToClipboard}
        className="group relative inline-flex cursor-pointer items-center rounded-md px-4 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        {content}
        <Copy className="ml-1.5 h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-75" />
      </span>
    </TableCell>
  );
}

export default function EmployeeList({ employees }: { employees: Employee[] }) {
  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-8">Imię i nazwisko</TableHead>
              <TableHead className="px-8">E-mail</TableHead>
              <TableHead className="px-8">Telefon</TableHead>
              <TableHead className="px-8">Adres</TableHead>
              <TableHead className="px-8">Data zatrudnienia</TableHead>
              <TableHead className="px-8">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <CopyableCell
                  content={`${employee.firstName} ${employee.lastName}`}
                />
                <CopyableCell content={employee.email} />
                <CopyableCell content={employee.phone} />
                <CopyableCell content={employee.address} />
                <TableCell>{employee.hireDate.toLocaleDateString()}</TableCell>
                <TableCell>{employee.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
