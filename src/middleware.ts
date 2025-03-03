import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Ścieżki publiczne (dostępne bez logowania)
const publicPaths = new Set(["/", "/login", "/verify", "/register"]);

// Ścieżki API, które nie wymagają autoryzacji
const publicApiPaths = new Set(["/api/auth"]);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Pozwól na dostęp do publicznych endpointów API
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Pozwól na dostęp do ścieżek publicznych
  if (publicPaths.has(pathname)) {
    return NextResponse.next();
  }

  // Sprawdź czy istnieje ciasteczko sesji better-auth
  // Nazwa ciasteczka sesji to domyślnie 'better_auth_session'
  const hasSession = request.cookies.has("better_auth_session");

  console.log("Middleware - sprawdzanie ciasteczka sesji:", hasSession);

  if (!hasSession) {
    console.log("Middleware - brak sesji, przekierowanie do /login");
    // Przekieruj do strony logowania z returnUrl
    const url = new URL("/login", request.url);
    url.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(url);
  }

  console.log("Middleware - sesja znaleziona, kontynuacja");
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Wymagaj autoryzacji dla wszystkich ścieżek oprócz:
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
