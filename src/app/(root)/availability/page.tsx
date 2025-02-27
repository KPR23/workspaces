import AvailabilityList from "~/components/availability-list";
import { AvailabilityService } from "~/server/services/availabilityService";
import { CinemaWeekService } from "~/server/services/cinemaWeekService";
import { EmployeeService } from "~/server/services/employeeService";

export default async function AvailabilityPage() {
  const availability = await AvailabilityService.getAll();
  const employees = await EmployeeService.getAll();
  const cinemaWeek = await CinemaWeekService.getAll();

  return (
    <main className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Dyspozycja</h1>
      <AvailabilityList
        availability={availability}
        employees={employees}
        cinemaWeek={cinemaWeek}
      />
    </main>
  );
}
