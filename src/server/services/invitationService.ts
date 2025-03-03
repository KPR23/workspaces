import { db } from "~/server/db/db";
import { invitations } from "~/server/db/schema/invitation";
import { employees } from "~/server/db/schema/employee";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

class InvitationError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message);
    this.name = "InvitationError";
  }
}

export class InvitationService {
  static async createInvitation(employeeId: number, email: string) {
    try {
      // Sprawdź czy pracownik istnieje
      const [employee] = await db
        .select()
        .from(employees)
        .where(eq(employees.id, employeeId));

      if (!employee) {
        throw new InvitationError("Nie znaleziono pracownika.");
      }

      // Sprawdź czy nie ma już aktywnego zaproszenia
      const existingInvitations = await db
        .select()
        .from(invitations)
        .where(
          and(
            eq(invitations.employeeId, employeeId),
            eq(invitations.used, false),
          ),
        );

      if (existingInvitations.length > 0) {
        throw new InvitationError("Pracownik ma już aktywne zaproszenie.");
      }

      // Generuj token i datę wygaśnięcia (48h od teraz)
      const token = nanoid(32);
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 48);

      // Utwórz nowe zaproszenie
      const [invitation] = await db
        .insert(invitations)
        .values({
          employeeId,
          email,
          token,
          expiresAt,
          used: false,
        })
        .returning();

      return invitation;
    } catch (error) {
      console.error("Failed to create invitation:", error);
      if (error instanceof InvitationError) {
        throw error;
      }
      throw new InvitationError(
        error instanceof Error
          ? error.message
          : "Nie udało się utworzyć zaproszenia.",
      );
    }
  }

  static async validateInvitation(token: string) {
    try {
      const invitationList = await db
        .select()
        .from(invitations)
        .where(and(eq(invitations.token, token), eq(invitations.used, false)));

      const invitation = invitationList[0];

      if (!invitation) {
        throw new InvitationError(
          "Nieprawidłowy lub wykorzystany token zaproszenia.",
        );
      }

      if (invitation.expiresAt < new Date()) {
        throw new InvitationError("Token zaproszenia wygasł.");
      }

      return invitation;
    } catch (error) {
      console.error("Failed to validate invitation:", error);
      if (error instanceof InvitationError) {
        throw error;
      }
      throw new InvitationError(
        error instanceof Error
          ? error.message
          : "Nie udało się zweryfikować zaproszenia.",
      );
    }
  }

  static async markInvitationAsUsed(token: string) {
    try {
      const [updatedInvitation] = await db
        .update(invitations)
        .set({ used: true })
        .where(eq(invitations.token, token))
        .returning();

      if (!updatedInvitation) {
        throw new InvitationError("Nie znaleziono zaproszenia.");
      }

      return updatedInvitation;
    } catch (error) {
      console.error("Failed to mark invitation as used:", error);
      if (error instanceof InvitationError) {
        throw error;
      }
      throw new InvitationError(
        error instanceof Error
          ? error.message
          : "Nie udało się zaktualizować statusu zaproszenia.",
      );
    }
  }

  static async linkEmployeeToUser(employeeId: number, userId: string) {
    try {
      const [updatedEmployee] = await db
        .update(employees)
        .set({ userId })
        .where(eq(employees.id, employeeId))
        .returning();

      if (!updatedEmployee) {
        throw new InvitationError("Nie znaleziono pracownika.");
      }

      return updatedEmployee;
    } catch (error) {
      console.error("Failed to link employee to user:", error);
      if (error instanceof InvitationError) {
        throw error;
      }
      throw new InvitationError(
        error instanceof Error
          ? error.message
          : "Nie udało się powiązać pracownika z kontem użytkownika.",
      );
    }
  }
}
