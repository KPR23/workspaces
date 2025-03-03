"use client";

import { useState, useTransition } from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import { createEmployeeSchema } from "~/server/db/schema/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { LoadingButton } from "~/components/ui/loading-button";
import { createEmployee } from "~/server/actions/employeeActions";
import { getCityByPostalCode } from "~/server/actions/postalCodeActions";
import { toast } from "sonner";

type EmployeeFormData = z.infer<typeof createEmployeeSchema>;

interface EmployeeFormProps {
  onSuccess?: () => void;
  onDataChange?: () => void;
}

export function EmployeeForm({ onSuccess, onDataChange }: EmployeeFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoadingCity, setIsLoadingCity] = useState(false);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      houseNumber: "",
      apartmentNumber: "",
      postalCode: "",
      city: "",
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    setError(null);

    startTransition(async () => {
      const result = await createEmployee(data);

      if (!result.success) {
        toast.error(result.error ?? "Błąd podczas dodawania pracownika.");
        setError(result.error ?? "Błąd podczas dodawania pracownika.");
      } else {
        form.reset();
        onSuccess?.();
        toast.success("Pracownik został dodany");
        onDataChange?.();
      }
      setIsSubmitting(false);
    });
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
            <div className="space-y-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Ulica</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Kwiatowa"
                          {...field}
                          className={cn(
                            "border",
                            form.formState.errors.street
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
                  name="houseNumber"
                  render={({ field }) => (
                    <FormItem className="w-24">
                      <FormLabel>Nr domu</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="42"
                          {...field}
                          className={cn(
                            "border",
                            form.formState.errors.houseNumber
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
                  name="apartmentNumber"
                  render={({ field }) => (
                    <FormItem className="w-24">
                      <FormLabel>Nr mieszk.</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="12"
                          {...field}
                          className={cn(
                            "border",
                            form.formState.errors.apartmentNumber
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
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem className="w-32">
                      <FormLabel>Kod pocztowy</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00-000"
                          maxLength={6}
                          {...field}
                          onChange={(e) => {
                            let value = e.target.value.replace(/[^\d-]/g, "");
                            if (value.length === 2 && !value.includes("-")) {
                              value = value + "-";
                            }
                            field.onChange(value);

                            // Check if the postal code is valid (XX-XXX format)
                            if (/^\d{2}-\d{3}$/.test(value)) {
                              setIsLoadingCity(true);
                              // Fetch city name based on postal code
                              startTransition(async () => {
                                try {
                                  const result =
                                    await getCityByPostalCode(value);
                                  if (result.success && result.data) {
                                    // Update city field with the fetched city name
                                    form.setValue("city", result.data);
                                  }
                                } catch (error) {
                                  console.error("Error fetching city:", error);
                                } finally {
                                  setIsLoadingCity(false);
                                }
                              });
                            }
                          }}
                          className={cn(
                            "border",
                            form.formState.errors.postalCode
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
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Miasto</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Warszawa"
                          {...field}
                          className={cn(
                            "border",
                            form.formState.errors.city
                              ? "border-destructive"
                              : "border-input",
                            isLoadingCity ? "opacity-50" : "",
                          )}
                          disabled={isLoadingCity}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}

            <LoadingButton
              type="submit"
              isLoading={isSubmitting || isPending}
              className="w-full"
              disabled={isPending}
            >
              {isSubmitting || isPending ? "Dodawanie..." : "Dodaj"}
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
