"use client";

import { useState } from "react";
import { signOut } from "~/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      console.log("Wylogowywanie...");

      // Użyj better-auth client do wylogowania
      await signOut();

      console.log("Wylogowano pomyślnie, przekierowuję do /login");
      // Użyj window.location.replace zamiast router.push dla pewniejszego przekierowania
      window.location.replace("/login");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
    >
      {isLoggingOut ? "Wylogowywanie..." : "Wyloguj się"}
    </button>
  );
}
