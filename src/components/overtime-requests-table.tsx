"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import { cn } from "~/lib/utils";

type OvertimeRequest = {
  id: number;
  requestDate: Date;
  overtimeDate: Date;
  employee: {
    id: number;
    name: string;
    avatar?: string;
  };
  duration: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
};

function StatusBadge({ status }: { status: OvertimeRequest["status"] }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
        {
          "bg-muted text-muted-foreground": status === "pending",
          "bg-green-100 text-green-700": status === "approved",
          "bg-red-100 text-red-700": status === "rejected",
        },
      )}
    >
      {status === "approved" && <Check className="h-3 w-3" />}
      {status === "rejected" && <X className="h-3 w-3" />}
      {status === "approved" && "Approved"}
      {status === "rejected" && "Rejected"}
      {status === "pending" && "Pending"}
    </div>
  );
}

export function OvertimeRequestsTable() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request Date</TableHead>
            <TableHead>Overtime Date</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Overtime</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{formatDate(request.requestDate)}</TableCell>
              <TableCell>{formatDate(request.overtimeDate)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={request.employee.avatar} />
                    <AvatarFallback>
                      {request.employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{request.employee.name}</span>
                </div>
              </TableCell>
              <TableCell>{request.duration}</TableCell>
              <TableCell>
                {request.startTime} — {request.endTime}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {request.reason}
              </TableCell>
              <TableCell>
                {request.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      <Check className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      <X className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                ) : (
                  <StatusBadge status={request.status} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
