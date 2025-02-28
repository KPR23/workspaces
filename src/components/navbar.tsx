"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { signOut, useSession } from "~/lib/auth-client";
import { LogOutIcon, MonitorCog, Settings } from "lucide-react";
import Image from "next/image";
import Login from "./login";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback } from "./ui/avatar";

const navigation = [
  { name: "Pulpit", href: "/dashboard" },
  { name: "Pracownicy", href: "/employees" },
  { name: "Dyspozycja", href: "/availability" },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { setTheme } = useTheme();

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-lg font-semibold">Workspaces</span>
            </div>
            <div className="ml-6 flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              {session?.user ? (
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    {session?.user?.image ? (
                      <Image
                        src={session?.user.image}
                        alt="User avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {session?.user?.name?.[0]}
                          {session?.user?.name?.[1]}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </DropdownMenuTrigger>
              ) : (
                <Login />
              )}
              <DropdownMenuContent>
                <div className="mx-2 mb-2.5 mt-1.5 flex flex-col">
                  <span className="truncate font-medium">
                    {session?.user?.name}
                  </span>
                  <span className="truncate text-sm text-muted-foreground">
                    {session?.user?.email}
                  </span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Sun className="h-4 w-4" />
                    <span>Motyw</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        <Sun className="h-4 w-4" />
                        Jasny
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <Moon className="h-4 w-4" />
                        Ciemny
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        <MonitorCog className="h-4 w-4" />
                        System
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem>
                  <Settings className="h-4 w-4" /> Ustawienia
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div
                    onClick={() => signOut()}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <LogOutIcon className="h-4 w-4" /> Wyloguj się
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
