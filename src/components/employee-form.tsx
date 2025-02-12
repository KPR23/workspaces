"use client";

import { useState } from "react";
import { createEmployeeSchema } from "~/db/schema/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

type EmployeeFormData = z.infer<typeof createEmployeeSchema>;

export function EmployeeForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(createEmployeeSchema),
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium">
          First Name
        </label>
        <input
          {...register("firstName")}
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium">
          Last Name
        </label>
        <input
          {...register("lastName")}
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Employee"}
      </button>
    </form>
  );
}
