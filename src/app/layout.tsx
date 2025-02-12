import React from "react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "~/components/theme-provider";
import { Navbar } from "~/components/navbar";
import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Workspaces",
  description: "Workspaces",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
