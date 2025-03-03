"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!email) {
      setError("Podaj adres email");
      setLoading(false);
      return;
    }

    try {
      // Send magic link using the API route directly
      const response = await fetch("/api/auth/signin/magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          callbackUrl: returnUrl ?? "/dashboard",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Wystąpił błąd podczas wysyłania linku logowania",
        );
      }

      setSuccess(true);
      toast.success("Link do logowania został wysłany na Twój adres email");
    } catch (err) {
      console.error("Błąd wysyłania linku logowania:", err);
      setError(
        err instanceof Error ? err.message : "Błąd wysyłania linku logowania",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Zaloguj się</h1>
          <p className="mt-2 text-sm text-gray-600">
            Podaj swój adres email, aby otrzymać link do logowania
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Adres email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="twoj@email.com"
              disabled={loading || success}
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Link do logowania został wysłany na Twój adres email
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || success}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Wysyłanie..." : "Wyślij link do logowania"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
