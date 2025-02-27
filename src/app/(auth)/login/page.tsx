"use client";

import React from "react";
import { signIn } from "~/lib/auth-client";

const page = () => {
  return (
    <div>
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};

export default page;
