"use server";

import { z } from "zod";
import { InvitationService } from "~/server/services/invitationService";
import {
  employeePositions,
  type EmployeePosition,
} from "~/server/db/schema/employee";

// Schema walidacji dla tworzenia zaproszenia
const createInvitationSchema = z.object({
  employeeId: z.number(),
  email: z.string().email(),
});

type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type SessionUser = {
  id: string;
  positions?: EmployeePosition[];
};

type Session = {
  user?: SessionUser;
};

// Tymczasowa implementacja auth do zastąpienia właściwą
async function auth(): Promise<Session | null> {
  // TODO: Zaimplementować właściwą autoryzację
  return null;
}

/**
 * Generuje nowe zaproszenie dla pracownika
 * Tylko użytkownicy z rolą KIEROWNIK lub DYREKTOR mogą generować zaproszenia
 */
export async function generateInvitation(
  data: z.infer<typeof createInvitationSchema>,
): Promise<ActionResponse<{ invitationUrl: string }>> {
  try {
    const session = await auth();

    // Sprawdź czy użytkownik jest zalogowany
    if (!session?.user) {
      return {
        success: false,
        error: "Musisz być zalogowany, aby wygenerować zaproszenie.",
      };
    }

    // Sprawdź uprawnienia użytkownika
    const canInvite = session.user.positions?.some(
      (position: EmployeePosition) =>
        position === "KIEROWNIK" || position === "DYREKTOR",
    );

    if (!canInvite) {
      return {
        success: false,
        error: "Nie masz uprawnień do generowania zaproszeń.",
      };
    }

    // Walidacja danych
    const validatedData = createInvitationSchema.parse(data);

    // Generuj zaproszenie
    const invitation = await InvitationService.createInvitation(
      validatedData.employeeId,
      validatedData.email,
    );

    if (!invitation) {
      throw new Error("Nie udało się utworzyć zaproszenia.");
    }

    // Generuj URL zaproszenia
    const invitationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/register?token=${invitation.token}`;

    return {
      success: true,
      data: {
        invitationUrl,
      },
    };
  } catch (error) {
    console.error("Generate invitation action failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Nie udało się wygenerować zaproszenia.",
    };
  }
}

/**
 * Weryfikuje token zaproszenia
 */
export async function verifyInvitation(
  token: string,
): Promise<ActionResponse<{ email: string }>> {
  try {
    const invitation = await InvitationService.validateInvitation(token);

    return {
      success: true,
      data: {
        email: invitation.email,
      },
    };
  } catch (error) {
    console.error("Verify invitation action failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Nie udało się zweryfikować zaproszenia.",
    };
  }
}

/**
 * Kończy proces rejestracji przez zaproszenie
 */
export async function completeRegistration(
  token: string,
  userId: string,
): Promise<ActionResponse<void>> {
  try {
    // Sprawdź czy zaproszenie jest ważne
    const invitation = await InvitationService.validateInvitation(token);

    // Oznacz zaproszenie jako wykorzystane
    await InvitationService.markInvitationAsUsed(token);

    // Powiąż konto użytkownika z pracownikiem
    await InvitationService.linkEmployeeToUser(invitation.employeeId, userId);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Complete registration action failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Nie udało się zakończyć procesu rejestracji.",
    };
  }
}
