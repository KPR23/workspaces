import { z } from "zod";

// Schema for postal code validation
const postalCodeSchema = z.string().regex(/^\d{2}-\d{3}$/, {
  message: "Nieprawidłowy format kodu pocztowego",
});

// Polish postal code database (simplified example)
// In a real application, this would be fetched from a database or external API
const postalCodeDatabase: Record<string, string> = {
  "00-001": "Warszawa",
  "00-002": "Warszawa",
  "00-003": "Warszawa",
  "00-004": "Warszawa",
  "00-005": "Warszawa",
  "00-006": "Warszawa",
  "00-007": "Warszawa",
  "00-008": "Warszawa",
  "00-009": "Warszawa",
  "00-010": "Warszawa",
  "01-001": "Warszawa",
  "02-001": "Warszawa",
  "03-001": "Warszawa",
  "30-001": "Kraków",
  "30-002": "Kraków",
  "31-001": "Kraków",
  "40-001": "Katowice",
  "50-001": "Wrocław",
  "60-001": "Poznań",
  "70-001": "Szczecin",
  "80-001": "Gdańsk",
  "90-001": "Łódź",
  "10-001": "Olsztyn",
  "20-001": "Lublin",
  "15-001": "Białystok",
  "35-001": "Rzeszów",
  "65-001": "Zielona Góra",
  "75-001": "Koszalin",
  "85-001": "Bydgoszcz",
  "25-001": "Kielce",
  "45-001": "Opole",
  "55-001": "Legnica",
};

export class PostalCodeService {
  /**
   * Get city name by postal code
   * @param postalCode - Polish postal code in format XX-XXX
   * @returns City name or null if not found
   */
  static async getCityByPostalCode(postalCode: string) {
    try {
      const validatedPostalCode = postalCodeSchema.parse(postalCode);

      return postalCodeDatabase[validatedPostalCode] ?? null;
    } catch (error) {
      console.error("Error looking up postal code:", error);
      return null;
    }
  }
}
