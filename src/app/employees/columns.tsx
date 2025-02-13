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
import type { employees } from "~/db/schema/employee";
import { deleteEmployee } from "~/app/actions/employee";
import { toast } from "sonner";

export type Employee = typeof employees.$inferSelect;

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Imię i nazwisko",
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      return (
        <div className="flex items-center space-x-4 px-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
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
      return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
    },
  },
  {
    accessorKey: "address",
    header: "Adres",
    cell: ({ row }) => {
      return <div className="pl-4">{row.getValue("address")}</div>;
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
    cell: ({ row }) => {
      const handleDelete = async () => {
        const result = await deleteEmployee(row.original.id);
        if (result.success) {
          toast.success("Pracownik został usunięty");
          // window.location.reload();
        } else {
          toast.error(
            result.error ?? "Wystąpił błąd podczas usuwania pracownika",
          );
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
