import React from "react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Workspaces",
  description: "Workspaces",
  icons: {
    icon: "/Light.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${inter.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
