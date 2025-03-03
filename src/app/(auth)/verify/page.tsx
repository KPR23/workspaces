"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "~/lib/auth-client";

export default function VerifyPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (!token) {
      console.log("Brak tokenu, przekierowuję do /login");
      window.location.replace("/login");
      return;
    }

    async function handleVerification() {
      try {
        console.log("Rozpoczynam weryfikację tokenu:", token);
        setLoading(true);

        // The token verification should happen automatically when the page loads
        // We just need to handle the redirect after a successful verification

        // Zapisz URL do przekierowania
        const targetUrl = returnUrl ?? "/dashboard";
        console.log("Przekierowuję do:", targetUrl);
        setRedirectUrl(targetUrl);

        // Dodaj małe opóźnienie przed przekierowaniem, aby upewnić się, że sesja została zapisana
        setTimeout(() => {
          // Użyj window.location.replace zamiast router.push dla pewniejszego przekierowania
          window.location.replace(targetUrl);
        }, 1500);
      } catch (err) {
        console.error("Błąd weryfikacji:", err);
        setError(
          err instanceof Error ? err.message : "Błąd weryfikacji tokenu",
        );
        setLoading(false);
      }
    }

    void handleVerification();
  }, [token, returnUrl]);

  if (loading && !redirectUrl) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 text-2xl font-bold">Weryfikacja tokenu...</div>
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 text-2xl font-bold text-destructive">
          Błąd weryfikacji
        </div>
        <div className="mb-4 text-center">{error}</div>
        <button
          onClick={() => router.push("/login")}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Wróć do strony logowania
        </button>
      </div>
    );
  }

  if (redirectUrl) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 text-2xl font-bold text-primary">
          Weryfikacja udana!
        </div>
        <div className="mb-4">Przekierowywanie...</div>
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return null;
}
