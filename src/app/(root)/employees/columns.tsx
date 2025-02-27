"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { employees } from "~/server/db/schema/employee";
import { toast } from "sonner";
import { Checkbox } from "~/components/ui/checkbox";
import { deleteEmployee } from "~/server/actions/employeeActions";

export type Employee = typeof employees.$inferSelect;

export type TableMeta = { onDataChange: () => void };

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-4">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Zaznacz wszystko"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-4">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Zaznacz"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="ml-12">Imię i nazwisko</div>,
    accessorFn: (row) => `${row.firstName} ${row.lastName} ${row.email}`,
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      return (
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 min-w-0">
            <div className="truncate font-medium">
              {firstName} {lastName}
            </div>
            <div className="truncate text-sm text-muted-foreground">
              {row.original.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Telefon",
    cell: ({ row }) => {
      const phone = row.original.phone;
      return (
        <div>+48 {phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}</div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Adres",
    cell: ({ row }) => {
      return <div>ul. {row.getValue("address")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data zatrudnienia",
    cell: ({ row }) => {
      const dateString = row.original.createdAt;
      let formattedDate = "-";

      if (dateString) {
        try {
          const date = new Date(dateString);
          formattedDate = date.toLocaleDateString("pl-PL");
        } catch (error) {
          console.error("Error parsing date:", error);
          formattedDate = "Nieprawidłowa data";
        }
      }

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status === "ACTIVE" ? "Aktywny" : "Nieaktywny"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const employee = row.original;

      const handleDelete = async () => {
        try {
          const result = await deleteEmployee(employee.id);

          if (result.success) {
            toast.success("Pracownik został usunięty");
            (table.options.meta as TableMeta).onDataChange();
          } else {
            const errorMessage =
              (result as { error?: string }).error ??
              "Wystąpił błąd podczas usuwania pracownika";
            toast.error(errorMessage);
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Wystąpił błąd podczas usuwania pracownika";
          toast.error(errorMessage);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edytuj</DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleDelete}
            >
              Usuń
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
