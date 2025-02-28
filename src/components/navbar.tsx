"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "~/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Login from "./login";

const navigation = [
  { name: "Pulpit", href: "/dashboard" },
  { name: "Pracownicy", href: "/employees" },
  { name: "Dyspozycja", href: "/availability" },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

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
            <ModeToggle />
            <div className="flex items-center gap-2">
              {session?.user?.image ? (
                <>
                  <Image
                    src={session?.user.image}
                    alt="User avatar"
                    width={24}
                    height={24}
                  />
                  <Button onClick={() => signOut()}>
                    <LogOutIcon className="h-4 w-4" /> Wyloguj się
                  </Button>
                </>
              ) : (
                <Login />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
