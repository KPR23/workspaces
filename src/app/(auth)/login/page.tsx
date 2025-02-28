"use client";

import React from "react";
import Login from "~/components/login";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-primary-foreground p-6 md:p-10">
      <div className="max-w-sm md:max-w-3xl">
        <Login />
      </div>
    </div>
  );
}
