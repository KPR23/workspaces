"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { generateInvitation } from "~/server/actions/invitationActions";
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
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CopyButton } from "../ui/copy-button";

const invitationFormSchema = z.object({
  employeeId: z.number(),
  email: z.string().email("Nieprawidłowy adres email"),
});

type InvitationFormData = z.infer<typeof invitationFormSchema>;

interface GenerateInvitationProps {
  employeeId: number;
  employeeEmail: string;
}

export function GenerateInvitation({
  employeeId,
  employeeEmail,
}: GenerateInvitationProps) {
  const [invitationUrl, setInvitationUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InvitationFormData>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      employeeId,
      email: employeeEmail,
    },
  });

  const onSubmit = async (data: InvitationFormData) => {
    try {
      setIsLoading(true);
      const result = await generateInvitation(data);

      if (!result.success || !result.data) {
        toast.error(result.error ?? "Nie udało się wygenerować zaproszenia");
        return;
      }

      setInvitationUrl(result.data.invitationUrl);
      toast.success("Zaproszenie zostało wygenerowane");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas generowania zaproszenia",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generowanie zaproszenia</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Generowanie..." : "Wygeneruj zaproszenie"}
            </Button>

            {invitationUrl && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Link do zaproszenia:</p>
                <div className="flex items-center gap-2">
                  <Input
                    value={invitationUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <CopyButton value={invitationUrl} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Link jest ważny przez 48 godzin. Po tym czasie wygeneruj nowy.
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
