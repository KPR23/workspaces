import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";


export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    DATABASE_POSTGRES_URL: z.string().url(),
    DATABASE_POSTGRES_USER: z.string(),
    DATABASE_POSTGRES_HOST: z.string(),
    DATABASE_POSTGRES_PASSWORD: z.string(),
    DATABASE_POSTGRES_DATABASE: z.string(),

    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_POSTGRES_URL: process.env.DATABASE_POSTGRES_URL,
    DATABASE_POSTGRES_USER: process.env.DATABASE_POSTGRES_USER,
    DATABASE_POSTGRES_HOST: process.env.DATABASE_POSTGRES_HOST,
    DATABASE_POSTGRES_PASSWORD: process.env.DATABASE_POSTGRES_PASSWORD,
    DATABASE_POSTGRES_DATABASE: process.env.DATABASE_POSTGRES_DATABASE,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
