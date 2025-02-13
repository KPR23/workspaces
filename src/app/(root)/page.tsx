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
  return <h1>HomePage</h1>;
}
