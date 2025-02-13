import { Suspense } from "react";
import { Spinner } from "~/components/ui/spinner";

function TableSkeleton() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="w-full max-w-7xl space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="rounded-lg border bg-card">
        <div className="p-4">
          <Suspense fallback={<TableSkeleton />}>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-4 text-left font-medium">
                    Imię i nazwisko
                  </th>
                  <th className="pb-4 text-left font-medium">Data</th>
                  <th className="pb-4 text-left font-medium">Status</th>
                  <th className="pb-4 text-left font-medium">Początek</th>
                  <th className="pb-4 text-left font-medium">Koniec</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Table rows will go here */}
              </tbody>
            </table>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
