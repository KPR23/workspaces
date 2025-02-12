import AvailabilityList from "~/components/availability-list";
import Layout from "~/components/layout";
import { QUERIES } from "~/db/queries";

export default async function AvailabilityPage() {
  const availability = await QUERIES.getAvailability();
  const employees = await QUERIES.getEmployees();
  const cinemaWeek = await QUERIES.getCinemaWeek();

  return (
    <Layout>
      <main className="container py-8">
        <h1 className="mb-8 text-3xl font-bold">Dyspozycja</h1>
        <AvailabilityList
          availability={availability}
          employees={employees}
          cinemaWeek={cinemaWeek}
        />
      </main>
    </Layout>
  );
}
