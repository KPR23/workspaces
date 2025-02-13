import Navbar from "~/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col">
      <Navbar />
      <div className="flex size-full flex-col">{children}</div>
    </div>
  );
}
