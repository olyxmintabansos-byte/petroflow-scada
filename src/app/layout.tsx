import type { Metadata } from "next";
import "./globals.css";
import { PetroProvider } from "@/context/PetroContext";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PetroFlow SCADA - Offshore Wellhead & Pipeline ERP",
  description: "Enterprise Offshore Oil & Gas Gathering SCADA, 3-Phase Separator & Multiphase Pipeline Transient Simulator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased">
        <PetroProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
        </PetroProvider>
      </body>
    </html>
  );
}
