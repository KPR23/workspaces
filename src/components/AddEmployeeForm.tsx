"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { DayAvailability, Employee } from "./EmployeeManagement";

interface AddEmployeeFormProps {
  addEmployee: (employee: Omit<Employee, "id">) => void;
}

export default function AddEmployeeForm({ addEmployee }: AddEmployeeFormProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [availability, setAvailability] = useState<
    Record<string, DayAvailability>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee({ name, position, availability: {}, role: "employee" });
    setName("");
    setPosition("");
    setAvailability({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="disposition">Disposition</Label>
        <Select
          onValueChange={(value: "morning" | "evening" | "flexible") =>
            setDisposition(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select disposition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="evening">Evening</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Employee</Button>
    </form>
  );
}
