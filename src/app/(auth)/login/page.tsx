"use client";

import React from "react";
import { signIn } from "~/lib/auth-client";

const page = () => {
  return (
    <div>
      <button onClick={() => signIn.oauth2({ providerId: "github" })}>
        Zaloguj się
      </button>
    </div>
  );
};

export default page;
