"use server";

import { z } from "zod";
import { PostalCodeService } from "~/server/services/postalCodeService";

const postalCodeSchema = z.string().regex(/^\d{2}-\d{3}$/, {
  message: "Nieprawidłowy format kodu pocztowego",
});

/**
 * Get city name by postal code
 * @param postalCode - Polish postal code in format XX-XXX
 */
export async function getCityByPostalCode(postalCode: string) {
  try {
    // Validate postal code format
    const validatedPostalCode = postalCodeSchema.parse(postalCode);

    // Get city name from service
    const city =
      await PostalCodeService.getCityByPostalCode(validatedPostalCode);

    return {
      success: true,
      data: city,
    };
  } catch (error) {
    console.error("Error in getCityByPostalCode action:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Nieprawidłowy kod pocztowy",
    };
  }
}
