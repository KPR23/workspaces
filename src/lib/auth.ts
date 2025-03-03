import { betterAuth } from "better-auth";
import type { User } from "better-auth/types";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/server/db/db";
import {
  user,
  account,
  session,
  verification,
} from "~/server/db/schema/auth-schema";
import { employees } from "~/server/db/schema/employee";
import { eq } from "drizzle-orm";
import { magicLink } from "better-auth/plugins";

interface MagicLinkRequestParams {
  email: string;
}

interface MagicLinkUser extends User {
  name: string;
  email: string;
  image?: string | null;
}

export const auth = betterAuth({
  app: {
    name: "Workspaces",
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification,
    },
  }),
  providers: {
    magicLink: {
      type: "magic-link" as const,
      from: "Workspaces <no-reply@workspaces.pl>",
      subject: "Link do logowania w Workspaces",
      async onMagicLinkRequest({ email }: MagicLinkRequestParams) {
        // Sprawdź czy pracownik istnieje
        const [employee] = await db
          .select()
          .from(employees)
          .where(eq(employees.email, email));

        if (!employee) {
          throw new Error("Nie znaleziono pracownika o podanym adresie email.");
        }

        return {
          user: {
            name: `${employee.firstName} ${employee.lastName}`,
            email: employee.email,
            image: employee.avatar ?? null,
          },
        };
      },
      async onUserCreated({ user }: { user: MagicLinkUser }) {
        if (!user.email) {
          throw new Error("Brak adresu email użytkownika");
        }

        // Połącz konto użytkownika z pracownikiem
        await db
          .update(employees)
          .set({ userId: user.id.toString() })
          .where(eq(employees.email, user.email));
      },
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        // W środowisku produkcyjnym należy użyć prawdziwego serwisu do wysyłania emaili
        console.log(`Wysyłanie linku do logowania na adres ${email}`);
        console.log(`Link do logowania: ${url}`);
      },
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              firstName: user.name?.split(" ")[0],
              lastName: user.name?.split(" ")[1],
              image: user.image ?? "",
            },
          };
        },
      },
    },
  },
});
