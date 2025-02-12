"use client";

import { useState } from "react";
import { createEmployeeSchema } from "~/db/schema/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { cn } from "~/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { LoadingButton } from "~/components/ui/loading-button";

type EmployeeFormData = z.infer<typeof createEmployeeSchema>;

export function EmployeeForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    },
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

      form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jan"
                        {...field}
                        className={cn(
                          "border",
                          form.formState.errors.firstName
                            ? "border-destructive"
                            : "border-input",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwisko</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Kowalski"
                        {...field}
                        className={cn(
                          "border",
                          form.formState.errors.lastName
                            ? "border-destructive"
                            : "border-input",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jan@example.com"
                      {...field}
                      className={cn(
                        "border",
                        form.formState.errors.email
                          ? "border-destructive"
                          : "border-input",
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="123"
                        maxLength={3}
                        value={field.value?.slice(0, 3) || ""}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 3);
                          const nextInput = e.target
                            .nextElementSibling as HTMLInputElement;
                          if (value.length === 3 && nextInput) {
                            nextInput.focus();
                          }
                          const newValue =
                            value + (field.value?.slice(3) || "");
                          field.onChange(newValue);
                        }}
                        className={cn(
                          "w-20 border text-center",
                          form.formState.errors.phone
                            ? "border-destructive"
                            : "border-input",
                        )}
                      />
                      <Input
                        placeholder="456"
                        maxLength={3}
                        value={field.value?.slice(3, 6) || ""}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 3);
                          const nextInput = e.target
                            .nextElementSibling as HTMLInputElement;
                          if (value.length === 3 && nextInput) {
                            nextInput.focus();
                          }
                          const newValue =
                            (field.value?.slice(0, 3) || "") +
                            value +
                            (field.value?.slice(6) || "");
                          field.onChange(newValue);
                        }}
                        className={cn(
                          "w-20 border text-center",
                          form.formState.errors.phone
                            ? "border-destructive"
                            : "border-input",
                        )}
                      />
                      <Input
                        placeholder="789"
                        maxLength={3}
                        value={field.value?.slice(6, 9) || ""}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 3);
                          const newValue =
                            (field.value?.slice(0, 6) || "") + value;
                          field.onChange(newValue);
                        }}
                        className={cn(
                          "w-20 border text-center",
                          form.formState.errors.phone
                            ? "border-destructive"
                            : "border-input",
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Dodawanie..." : "Dodaj"}
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
