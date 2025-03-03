"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { useTheme } from "next-themes";
import { LogOutIcon, Moon, MonitorCog, Settings, Sun } from "lucide-react";
import { signOut, useSession } from "~/lib/auth-client";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function Navbar() {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const { session, isLoading } = useSession();

  // Pobierz dane użytkownika z sesji
  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name || "",
        email: session.user.email || "",
        avatar: session.user.image,
      }
    : null;

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">Workspaces</span>
          </Link>
          <div className="hidden md:flex">
            <Link
              href="/dashboard"
              className={`flex h-16 items-center border-b-2 px-4 ${
                pathname === "/dashboard"
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/employees"
              className={`flex h-16 items-center border-b-2 px-4 ${
                pathname === "/employees"
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Pracownicy
            </Link>
            <Link
              href="/schedule"
              className={`flex h-16 items-center border-b-2 px-4 ${
                pathname === "/schedule"
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Grafik
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring">
                    <Avatar>
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="mx-2 mb-2.5 mt-1.5 flex flex-col">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-sm text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Motyw</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          <Sun className="mr-2 h-4 w-4" />
                          Jasny
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          <Moon className="mr-2 h-4 w-4" />
                          Ciemny
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          <MonitorCog className="mr-2 h-4 w-4" />
                          System
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" /> Ustawienia
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOutIcon className="mr-2 h-4 w-4" /> Wyloguj się
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Zaloguj się
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
