import { getServerSession } from "better-auth/next";
import Link from "next/link";
import LogoutButton from "~/components/LogoutButton";

export default async function Dashboard() {
  console.log("Renderowanie strony Dashboard");

  const session = await getServerSession();

  console.log("Dashboard - dane sesji:", JSON.stringify(session));

  if (!session) {
    console.log(
      "Dashboard - brak sesji, pokazuję komunikat o braku zalogowania",
    );

    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="rounded-lg bg-red-50 p-8 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Nie jesteś zalogowany. Zaloguj się, aby uzyskać dostęp do tej
                strony.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              href="/login"
              className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
            >
              Przejdź do strony logowania
            </Link>
          </div>
        </div>
      </div>
    );
  }

  console.log(
    "Dashboard - sesja znaleziona, pokazuję dashboard dla:",
    session.user.email,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>
        <div className="mb-4">
          <p className="text-gray-700">
            Witaj,{" "}
            <span className="font-semibold">
              {session.user.name || session.user.email}
            </span>
            !
          </p>
          <p className="text-gray-600">
            Jesteś zalogowany jako: {session.user.email}
          </p>
        </div>
        <div className="mt-6 rounded-md bg-gray-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Dane sesji:</h2>
          <pre className="overflow-auto rounded bg-gray-100 p-3 text-sm">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
