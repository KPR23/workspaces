"use client";

import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "~/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { availability as availabilityTable } from "~/server/db/schema";
import { employees as employeesTable } from "~/server/db/schema/employee";
import { cinemaWeek as cinemaWeekTable } from "~/server/db/schema/cinemaWeek";

export default function AvailabilityList(props: {
  availability: (typeof availabilityTable.$inferSelect)[];
  employees: (typeof employeesTable.$inferSelect)[];
  cinemaWeek: (typeof cinemaWeekTable.$inferSelect)[];
}) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("all");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const getEmployeeName = (employeeId: number) => {
    const employee = props.employees.find((emp) => emp.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : "Nieznany";
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "OFF":
        return "Niedostępny";
      case "TOTAL":
        return "Cały dzień";
      case "CUSTOM":
        return "Własne godziny";
      default:
        return status;
    }
  };

  const formatTime = (time: string | null) => {
    if (!time) return "-";
    return time.slice(0, 5);
  };

  // Filter by employee and date range
  const filteredAvailability = props.availability.filter((a) => {
    const matchesEmployee =
      selectedEmployeeId === "all" ||
      a.employeeId === parseInt(selectedEmployeeId);
    const availabilityDate = new Date(a.date);
    const matchesDateRange =
      !date?.from ||
      !date?.to ||
      (availabilityDate >= date.from && availabilityDate <= date.to);

    return matchesEmployee && matchesDateRange;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="w-[250px]">
          <Select
            value={selectedEmployeeId}
            onValueChange={setSelectedEmployeeId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz pracownika" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszyscy pracownicy</SelectItem>
              {props.employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id.toString()}>
                  {employee.firstName} {employee.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-auto justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd LLLL", { locale: pl })} -{" "}
                      {format(date.to, "dd LLLL", { locale: pl })}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y", { locale: pl })
                  )
                ) : (
                  <span>Wybierz zakres dat</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={pl}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-8">Imię i nazwisko</TableHead>
              <TableHead className="px-8">Data</TableHead>
              <TableHead className="px-8">Status</TableHead>
              <TableHead className="px-8">Początek</TableHead>
              <TableHead className="px-8">Koniec</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAvailability.map((availability) => (
              <TableRow key={`${availability.employeeId}-${availability.date}`}>
                <TableCell>
                  {getEmployeeName(availability.employeeId)}
                </TableCell>
                <TableCell>
                  {format(new Date(availability.date), "EEEE, d MMMM", {
                    locale: pl,
                  })}
                </TableCell>
                <TableCell>{formatStatus(availability.status)}</TableCell>
                <TableCell>
                  {availability.status === "CUSTOM"
                    ? formatTime(availability.startTime)
                    : "-"}
                </TableCell>
                <TableCell>
                  {availability.status === "CUSTOM"
                    ? formatTime(availability.endTime)
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
