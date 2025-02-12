import Link from "next/link";
import type React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-xl font-bold text-gray-800">
                  EmpAdmin
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900 active:border-indigo-500"
                >
                  Employee List
                </Link>
                <Link
                  href="/availability"
                  className="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900 active:border-indigo-500"
                >
                  Availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
