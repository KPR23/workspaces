"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { verifyInvitation } from "~/server/actions/invitationActions";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "~/lib/auth-client";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Brak tokenu zaproszenia.");
        setIsLoading(false);
        return;
      }

      try {
        const result = await verifyInvitation(token);

        if (!result.success || !result.data) {
          setError(result.error ?? "Nieprawidłowy token zaproszenia.");
          return;
        }

        setEmail(result.data.email);

        // Automatycznie zaloguj użytkownika za pomocą better-auth
        try {
          await signIn.magicLink({
            email: result.data.email,
            redirectTo: "/dashboard",
          });
          toast.success(
            "Link do logowania został wysłany na Twój adres email.",
          );
        } catch (authError) {
          console.error("Błąd podczas wysyłania linku logowania:", authError);
          toast.error(
            "Nie udało się wysłać linku logowania. Spróbuj ponownie później.",
          );
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Wystąpił błąd podczas weryfikacji zaproszenia.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void verifyToken();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>Weryfikacja zaproszenia...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Błąd</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => (window.location.href = "/")}
            >
              Wróć do strony głównej
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Rejestracja</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Link do logowania został wysłany na adres: <strong>{email}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Sprawdź swoją skrzynkę email i kliknij w link, aby dokończyć proces
            rejestracji.
          </p>
          <Button
            className="mt-4 w-full"
            onClick={() => (window.location.href = "/login")}
          >
            Wróć do strony logowania
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
